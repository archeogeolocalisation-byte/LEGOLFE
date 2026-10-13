import {parsePublicVilla} from '../../../lib/villaListing';
import {requireAdmin} from '../../../lib/adminServer';
import {validateAdminChange} from '../../../lib/adminValidation';
import {checkOrigin,readJson,RequestError} from '../../../lib/security';
export const runtime='nodejs';
function response(body:object,status=200){return Response.json(body,{status,headers:{'Cache-Control':'no-store, private','Vary':'Authorization'}});}
function failure(error:unknown){return response({error:error instanceof RequestError?error.message:'ADMIN_UNAVAILABLE'},error instanceof RequestError?error.status:503);}
export async function GET(request:Request){
  try{
    const db=await requireAdmin(request);
    const url=new URL(request.url);
    if(url.searchParams.get('access')==='1')return response({ok:true});
    const section=url.searchParams.get('section')||'listings';
    const page=Math.max(1,Math.min(10000,Number(url.searchParams.get('page'))||1));
    if(!Number.isInteger(page)||!['users','listings'].includes(section))throw new RequestError('INVALID_QUERY',400);
    if(section==='users'){
      const {data,error}=await db.auth.admin.listUsers({page,perPage:50});
      if(error)throw error;
      return response({users:data.users.map(u=>({id:u.id,email:u.email||'',name:typeof u.user_metadata?.legolfe_display_name==='string'?u.user_metadata.legolfe_display_name:'',accountType:u.user_metadata?.legolfe_account_type||'traveler',createdAt:u.created_at,confirmed:!!u.email_confirmed_at})),hasNext:data.users.length===50});
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
    return response({listings:(data||[]).map(row=>({...row,ownerEmail:emails.get(row.owner_id)||''})),hasNext:data?.length===50});
  }catch(error){return failure(error);}
}
export async function PATCH(request:Request){
  try{
    checkOrigin(request);
    const db=await requireAdmin(request);
    const change=validateAdminChange(await readJson(request,16000));
    if(change.kind==='user'){
      const existing=await db.auth.admin.getUserById(change.id);if(existing.error)throw existing.error;
      const {error}=await db.auth.admin.updateUserById(change.id,{user_metadata:{...existing.data.user.user_metadata,legolfe_account_type:change.accountType}});if(error)throw error;
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
