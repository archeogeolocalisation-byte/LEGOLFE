import {supabase} from './supabase';
export type VillaHeartSummary={count:number;liked:boolean;signedIn:boolean;canVote:boolean};
export function parseVillaHeart(value:unknown):VillaHeartSummary{
 if(!value||typeof value!=='object')throw new Error('HEART_UNAVAILABLE');
 const s=value as VillaHeartSummary;
 if(!Number.isSafeInteger(s.count)||s.count<0||typeof s.liked!=='boolean'||typeof s.signedIn!=='boolean'||typeof s.canVote!=='boolean'||(!s.signedIn&&(s.liked||s.canVote)))throw new Error('HEART_UNAVAILABLE');
 return {count:s.count,liked:s.liked,signedIn:s.signedIn,canVote:s.canVote};
}
export async function villaHeartRequest(id:string,liked?:boolean):Promise<VillaHeartSummary>{
 const {data,error}=await (liked===undefined?supabase.rpc('villa_heart_summary',{p_listing_id:id}):supabase.rpc('set_villa_heart',{p_listing_id:id,p_liked:liked})).abortSignal(AbortSignal.timeout(8000));
 if(error)throw new Error(error.code==='PGRST202'||error.message==='LISTING_UNAVAILABLE'?'HEART_NOT_ENABLED':'HEART_UNAVAILABLE');
 return parseVillaHeart(data);
}
