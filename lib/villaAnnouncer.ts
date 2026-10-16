import 'server-only';
import {createClient} from '@supabase/supabase-js';
import {getPublicMembers,memberIdPattern} from './publicMembers';

export type VillaAnnouncerProfile={id:string;name:string;avatarUrl:string|null};

// Resolve ownership from the published row, never from advertiser-supplied payload fields.
export async function getVillaAnnouncer(id:string):Promise<VillaAnnouncerProfile|null>{
 if(!/^property-[a-zA-Z0-9-]{1,100}$/.test(id))return null;
 try{
  const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await db.from('villa_listings').select('owner_id').eq('id',id).eq('status','published').eq('visibility','public').abortSignal(AbortSignal.timeout(5000)).maybeSingle();
  if(error||!data||!memberIdPattern.test(data.owner_id))return null;
  const [member]=await getPublicMembers([data.owner_id]);
  return member?{id:member.id,name:member.name,avatarUrl:member.avatarUrl}:null;
 }catch{return null;}
}
