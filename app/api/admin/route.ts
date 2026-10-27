import {validateCollectionReview} from '../../../lib/villaCollectionValidation';
import {parsePublicVilla} from '../../../lib/villaListing';
import {requireAdmin,requireStaff} from '../../../lib/adminServer';
import {isAdminId,validateAdminChange} from '../../../lib/adminValidation';
import {checkOrigin,readJson,RequestError} from '../../../lib/security';
export const runtime='nodejs';
function response(body:object,status=200){return Response.json(body,{status,headers:{'Cache-Control':'no-store, private','Vary':'Authorization'}});}
function failure(error:unknown){return response({error:error instanceof RequestError?error.message:'ADMIN_UNAVAILABLE'},error instanceof RequestError?error.status:503);}
export async function GET(request:Request){
  try{
    const {db,role}=await requireStaff(request);
    const url=new URL(request.url);
    if(url.searchParams.get('access')==='1')return response({ok:true,role});
    const section=url.searchParams.get('section')||'listings';
    const page=Math.max(1,Math.min(10000,Number(url.searchParams.get('page'))||1));
    if(!Number.isInteger(page)||!['users','listings','moderation'].includes(section))throw new RequestError('INVALID_QUERY',400);
    if(section==='moderation'){
      const status=url.searchParams.get('status')||'pending';
      if(!['pending','approved','rejected'].includes(status))throw new RequestError('INVALID_QUERY',400);
      const {data,error}=await db.from('community_posts').select('id,place_id,user_id,image_path,comment,type,status,created_at,moderated_at').eq('status',status).order('created_at',{ascending:false}).range((page-1)*50,page*50-1);
      if(error)throw error;
      const posts=await Promise.all((data||[]).map(async post=>{
        if(!post.image_path)return {...post,imageUrl:null};
        const signed=await db.storage.from('community-photos').createSignedUrl(post.image_path,300);
        return {...post,imageUrl:signed.error?null:signed.data.signedUrl};
      }));
      return response({posts,hasNext:posts.length===50});
    }
    if(role!=='admin')throw new RequestError('ADMIN_REQUIRED',403);
    if(section==='users'){
      const {data,error}=await db.auth.admin.listUsers({page,perPage:50});
      if(error)throw error;
      const {data:mods,error:modsError}=await db.from('community_moderators').select('user_id').in('user_id',data.users.map(u=>u.id).length?data.users.map(u=>u.id):['00000000-0000-0000-0000-000000000000']);
      if(modsError)throw modsError;
      const moderatorIds=new Set((mods||[]).map(row=>row.user_id));
      return response({users:data.users.map(u=>({id:u.id,email:u.email||'',name:typeof u.user_metadata?.legolfe_display_name==='string'?u.user_metadata.legolfe_display_name:'',role:isAdminId(u.id,process.env.LEGOLFE_ADMIN_USER_IDS)||u.app_metadata?.legolfe_role==='admin'?'admin':moderatorIds.has(u.id)?'moderator':'user',protected:isAdminId(u.id,process.env.LEGOLFE_ADMIN_USER_IDS),createdAt:u.created_at,confirmed:!!u.email_confirmed_at})),hasNext:data.users.length===50});
    }
    const q=(url.searchParams.get('q')||'').trim().slice(0,160);
    let query=db.from('villa_listings').select('id,owner_id,status,visibility,payload,created_at').order('created_at',{ascending:false}).order('id',{ascending:true}).range((page-1)*50,page*50-1);
    if(q)query=query.ilike('payload->>name',`%${q.replace(/[%_\\]/g,'\\$&')}%`);
    const {data,error}=await query.abortSignal(AbortSignal.timeout(10000));if(error)throw error;
    const owners=await Promise.all([...new Set((data||[]).map(row=>row.owner_id as string))].map(async id=>{
      const result=await db.auth.admin.getUserById(id);if(result.error)throw result.error;
      return [id,result.data.user.email||''] as const;
    }));
    const emails=new Map(owners);
    let reviews:Record<string,unknown>={};let collectionsReady=true;
    try{
      if(data?.length){
        const result=await db.from('villa_collection_reviews').select('listing_id,collection,reason_fr,reason_en').in('listing_id',data.map(row=>row.id));
        if(result.error)collectionsReady=false;
        else reviews=Object.fromEntries((result.data||[]).map(row=>[row.listing_id,row]));
      }
    }catch{collectionsReady=false;}
    return response({listings:(data||[]).map(row=>({...row,collectionReview:reviews[row.id]||null,collectionsReady,ownerEmail:emails.get(row.owner_id)||''})),hasNext:data?.length===50});
  }catch(error){return failure(error);}
}
export async function PATCH(request:Request){
  try{
    checkOrigin(request);
    const {db,role,actorId}=await requireStaff(request);
    const input=await readJson(request,60000) as Record<string,unknown>;
    if(input?.kind==='moderation'){
      if(typeof input.id!=='string'||!/^[0-9a-f-]{36}$/i.test(input.id)||!['approved','rejected','pending'].includes(String(input.status)))throw new RequestError('INVALID_CHANGE',400);
      const {data:post,error:postError}=await db.from('community_posts').select('id,status,image_path').eq('id',input.id).single();
      if(postError)throw postError;
      if(post.status===input.status)return response({ok:true});
      const {error}=await db.from('community_posts').update({status:input.status,moderated_at:new Date().toISOString(),moderated_by:actorId}).eq('id',input.id).eq('status',post.status).select('id').single();
      if(error)throw error;
      return response({ok:true});
    }
    if(role!=='admin')throw new RequestError('ADMIN_REQUIRED',403);
    if(input?.kind==='collection'){
      const review=validateCollectionReview(input);
      const {error}=await db.rpc('review_villa_collection',review);
      if(error){
        if(String(error.message).includes('COLLECTION_REVIEW_CONFLICT'))throw new RequestError('COLLECTION_REVIEW_CONFLICT',409);
        if(['42883','42P01','PGRST202','PGRST205'].includes(error.code||''))throw new RequestError('COLLECTIONS_NOT_CONFIGURED',503);
        throw error;
      }
      return response({ok:true});
    }
    const change=validateAdminChange(input);
    if(change.kind==='user'){
      const existing=await db.auth.admin.getUserById(change.id);if(existing.error)throw existing.error;
      if(change.id===actorId&&change.role!=='admin')throw new RequestError('CANNOT_REMOVE_OWN_ADMIN',400);
      if(isAdminId(change.id,process.env.LEGOLFE_ADMIN_USER_IDS)&&change.role!=='admin')throw new RequestError('PROTECTED_ADMIN',400);
      const previousRole=existing.data.user.app_metadata?.legolfe_role;
      const {error}=await db.auth.admin.updateUserById(change.id,{app_metadata:{...existing.data.user.app_metadata,legolfe_role:change.role}});if(error)throw error;
      const result=change.role==='moderator' ? await db.from('community_moderators').upsert({user_id:change.id}) : await db.from('community_moderators').delete().eq('user_id',change.id);
      if(result.error){await db.auth.admin.updateUserById(change.id,{app_metadata:{...existing.data.user.app_metadata,legolfe_role:previousRole||'user'}});throw result.error;}
    }else{
      const {data:existing,error}=await db.from('villa_listings').select('payload').eq('id',change.id).single();if(error)throw error;
      // Verify the destination account exists before changing ownership.
      const owner=await db.auth.admin.getUserById(change.ownerId);if(owner.error)throw new RequestError('OWNER_NOT_FOUND',400);
      const payload={...existing.payload,...change.fields};
      if(!parsePublicVilla(change.id,payload))throw new RequestError('INVALID_CHANGE',400);
      const result=await db.from('villa_listings').update({status:change.status,visibility:change.visibility,owner_id:change.ownerId,payload}).eq('id',change.id).select('id').single();if(result.error)throw result.error;
    }
    return response({ok:true});
  }catch(error){return failure(error);}
}
