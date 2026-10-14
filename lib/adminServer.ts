import 'server-only';
import {createClient} from '@supabase/supabase-js';
import {RequestError} from './security';
import {isAdminId} from './adminValidation';

export async function requireStaff(request:Request){
  const token=request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if(!token)throw new RequestError('SIGN_IN_REQUIRED',401);
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)throw new RequestError('ADMIN_NOT_CONFIGURED',503);
  const auth=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await auth.auth.getUser(token);
  if(error||!data.user)throw new RequestError('SIGN_IN_REQUIRED',401);
  const secret=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!secret)throw new RequestError('ADMIN_NOT_CONFIGURED',503);
  const db=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  const actorId=data.user.id;
  // Never trust user_metadata; only server-controlled app_metadata and the bootstrap allowlist.
  const isAdmin=isAdminId(actorId,process.env.LEGOLFE_ADMIN_USER_IDS)||data.user.app_metadata?.legolfe_role==='admin';
  if(isAdmin)return {db,actorId,role:'admin' as const};
  const {data:member,error:membershipError}=await db.from('community_moderators').select('user_id').eq('user_id',actorId).maybeSingle();
  if(membershipError)throw new RequestError('ADMIN_UNAVAILABLE',503);
  if(!member)throw new RequestError('ADMIN_REQUIRED',403);
  return {db,actorId,role:'moderator' as const};
}

export async function requireAdmin(request:Request){
  const staff=await requireStaff(request);
  if(staff.role!=='admin')throw new RequestError('ADMIN_REQUIRED',403);
  return staff.db;
}
