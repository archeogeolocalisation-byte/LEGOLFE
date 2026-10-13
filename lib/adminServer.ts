import 'server-only';
import {createClient} from '@supabase/supabase-js';
import {RequestError} from './security';
import {isAdminId} from './adminValidation';

export async function requireAdmin(request:Request){
  const token=request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if(!token)throw new RequestError('SIGN_IN_REQUIRED',401);
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)throw new RequestError('ADMIN_NOT_CONFIGURED',503);
  const auth=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await auth.auth.getUser(token);
  if(error||!data.user)throw new RequestError('SIGN_IN_REQUIRED',401);
  // Authorization never uses editable user_metadata or a browser-provided role.
  if(!isAdminId(data.user.id,process.env.LEGOLFE_ADMIN_USER_IDS))throw new RequestError('ADMIN_REQUIRED',403);
  const secret=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!secret)throw new RequestError('ADMIN_NOT_CONFIGURED',503);
  return createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
}
