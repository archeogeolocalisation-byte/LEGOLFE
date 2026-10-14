import "server-only";
import {createClient} from "@supabase/supabase-js";

export const memberIdPattern=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const avatarPattern=/^[0-9a-f-]{36}\/legolfe-profile\/[0-9a-f-]{36}\.jpg$/i;

function privateClient(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key)return null;
  return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}

export type PublicMember={id:string;name:string;bio:string;avatarUrl:string|null;galleryUrls:string[];connection:"local"|"visiting"|null};
export type PublicContribution={id:string;place_id:string;type:string;comment:string|null;imageUrl:string|null;created_at:string};

export async function getPublicMembers(ids:string[]):Promise<PublicMember[]>{
  const selected=[...new Set(ids)].filter(id=>memberIdPattern.test(id)).slice(0,30);
  const db=privateClient();
  if(!db||selected.length===0)return [];
  const {data:profiles}=await db.from("community_profiles").select("user_id,display_name").in("user_id",selected);
  const names=new Map((profiles||[]).map(p=>[p.user_id,p.display_name]));
  const result=await Promise.all(selected.map(async id=>{
    const {data,error}=await db.auth.admin.getUserById(id);
    if(error||!data.user)return null;
    const metadata=data.user.user_metadata||{};
    const publicName=names.get(id);
    const fallbackName=typeof metadata.legolfe_display_name==="string"?metadata.legolfe_display_name:"";
    const name=(typeof publicName==="string"&&publicName.trim()?publicName:fallbackName).trim().slice(0,40)||"Membre LE GOLFE";
    const path=metadata.legolfe_avatar_path;
    let avatarUrl:null|string=null;
    if(typeof path==="string"&&path.startsWith(id+"/legolfe-profile/")&&avatarPattern.test(path)){
      const signed=await db.storage.from("community-photos").createSignedUrl(path,3600);
      if(!signed.error)avatarUrl=signed.data.signedUrl;
    }
    const galleryPaths=Array.isArray(metadata.legolfe_gallery_paths)?metadata.legolfe_gallery_paths.filter((path:unknown)=>typeof path==="string"&&path.startsWith(id+"/legolfe-profile/")&&avatarPattern.test(path)).slice(0,3) as string[]:[];
    const galleryUrls=(await Promise.all(galleryPaths.map(async path=>{
      const signed=await db.storage.from("community-photos").createSignedUrl(path,3600);
      return signed.error?null:signed.data.signedUrl;
    }))).filter((url):url is string=>!!url);
    const connection=metadata.legolfe_connection==="local"||metadata.legolfe_connection==="visiting"?metadata.legolfe_connection:null;
    return {id,name,bio:typeof metadata.legolfe_bio==="string"?metadata.legolfe_bio.slice(0,280):"",avatarUrl,galleryUrls,connection} satisfies PublicMember;
  }));
  return result.filter((member):member is PublicMember=>member!==null);
}

export async function getPublicContributions(id:string):Promise<PublicContribution[]>{
  if(!memberIdPattern.test(id))return [];
  const db=privateClient();if(!db)return [];
  const {data,error}=await db.from("community_posts").select("id,place_id,type,comment,image_path,created_at").eq("user_id",id).eq("status","approved").order("created_at",{ascending:false}).limit(100);
  if(error)return [];
  return Promise.all((data||[]).map(async post=>{
    let imageUrl:null|string=null;
    if(typeof post.image_path==="string"&&post.image_path.startsWith(id+"/")){
      const signed=await db.storage.from("community-photos").createSignedUrl(post.image_path,3600);
      if(!signed.error)imageUrl=signed.data.signedUrl;
    }
    return {id:post.id,place_id:post.place_id,type:post.type,comment:post.comment,imageUrl,created_at:post.created_at};
  }));
}
