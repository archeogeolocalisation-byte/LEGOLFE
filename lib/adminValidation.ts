import {RequestError} from './security';

export function isAdminId(id:string,allowlist:string|undefined){
  return (allowlist||'').split(',').map(value=>value.trim()).filter(Boolean).includes(id);
}
export function validateAdminChange(value:unknown){
  if(!value||typeof value!=='object'||Array.isArray(value))throw new RequestError('INVALID_CHANGE',400);
  const v=value as Record<string,unknown>;
  if(v.kind==='user'&&typeof v.id==='string'&&/^[0-9a-f-]{36}$/i.test(v.id)&&['traveler','owner','concierge'].includes(String(v.accountType))){
    return {kind:'user' as const,id:v.id,accountType:String(v.accountType)};
  }
  if(v.kind!=='listing'||typeof v.id!=='string'||!/^property-[a-zA-Z0-9-]{1,100}$/.test(v.id)||!['draft','published','paused'].includes(String(v.status))||!['public','private','request'].includes(String(v.visibility)))throw new RequestError('INVALID_CHANGE',400);
  const fields:Record<string,string>={};
  for(const [key,max] of Object.entries({name:160,location:120,description:4000,descriptionEn:4000})){
    if(typeof v[key]!=='string'||v[key].length>max||(['name','location'].includes(key)&&!v[key].trim()))throw new RequestError('INVALID_CHANGE',400);
    fields[key]=v[key].trim();
  }
  if(typeof v.ownerId!=='string'||!/^[0-9a-f-]{36}$/i.test(v.ownerId))throw new RequestError('INVALID_CHANGE',400);
  return {kind:'listing' as const,id:v.id,status:String(v.status),visibility:String(v.visibility),ownerId:v.ownerId,fields};
}
