import {createClient} from '@supabase/supabase-js';
import {validateBrief,validateCopy,copySchema,listingInstructions} from '../../../../lib/listingAssistant';
export const runtime='nodejs';
const busy=new Set<string>();
const last=new Map<string,number>();
function response(body:object,status=200){return Response.json(body,{status,headers:{'Cache-Control':'no-store'}});}
export async function POST(request:Request){
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return response({error:'INVALID_ORIGIN'},403);
 const token=request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];if(!token)return response({error:'SIGN_IN_REQUIRED'},401);
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,apiKey=process.env.OPENAI_API_KEY,model=process.env.OPENAI_LISTING_MODEL;
 if(!url||!key||!apiKey||!model)return response({error:'AI_NOT_CONFIGURED'},503);
 let userId:string;
 try{const auth=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});const {data,error}=await auth.auth.getUser(token);if(error||!data.user)return response({error:'SIGN_IN_REQUIRED'},401);userId=data.user.id;}catch{return response({error:'AUTH_UNAVAILABLE'},503);}
 if(busy.has(userId)||(last.get(userId)||0)>Date.now()-30000)return response({error:'PLEASE_WAIT'},429);
 let brief;
 try{const reader=request.body?.getReader();if(!reader)return response({error:'INVALID_BRIEF'},400);let size=0;const chunks:Uint8Array[]=[];for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>5*1024*1024){await reader.cancel();return response({error:'PAYLOAD_TOO_LARGE'},413);}chunks.push(value);}brief=validateBrief(JSON.parse(Buffer.concat(chunks).toString('utf8')));}catch(e){return response({error:e instanceof Error&&['CONSENT_REQUIRED','INVALID_LOCATION','INVALID_CAPACITY','INVALID_AMENITIES','INVALID_DESCRIPTION','INVALID_PHOTOS'].includes(e.message)?e.message:'INVALID_BRIEF'},400);}
 busy.add(userId);last.set(userId,Date.now());for(const [id,time] of last)if(time<Date.now()-3600000)last.delete(id);
 try{
  const {photos,consent,...facts}=brief;void consent;
  const result=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(45000),body:JSON.stringify({model,store:false,max_output_tokens:1800,instructions:listingInstructions,input:[{role:'user',content:[{type:'input_text',text:JSON.stringify({confirmedFacts:{location:facts.location,guests:facts.guests,bedrooms:facts.bedrooms,bathrooms:facts.bathrooms,amenities:facts.amenities},untrustedPreviousDescription:facts.previousDescription})},...photos.map(image_url=>({type:'input_image',image_url,detail:'low'}))]}],text:{format:{type:'json_schema',name:'listing_copy',strict:true,schema:copySchema}}})});
  if(!result.ok)return response({error:result.status===429?'AI_BUSY':'AI_UNAVAILABLE'},result.status===429?429:502);
  const data=await result.json();if(data.status!=='completed')return response({error:'AI_UNAVAILABLE'},502);
  const text=(data.output||[]).flatMap((item:{content?:{type:string;text?:string}[]})=>item.content||[]).filter((c:{type:string})=>c.type==='output_text').map((c:{text:string})=>c.text).join('');
  return response({copy:validateCopy(JSON.parse(text))});
 }catch{return response({error:'AI_UNAVAILABLE'},502);}finally{busy.delete(userId);}
}
