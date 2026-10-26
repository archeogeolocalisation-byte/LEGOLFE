import {RequestError} from './security';
import {isVillaDistinction} from './villaCollections';
export function validateCollectionReview(input:Record<string,unknown>){
 if(typeof input.id!=='string'||!/^property-[a-zA-Z0-9-]{1,100}$/.test(input.id)||!(input.collection===null||isVillaDistinction(input.collection)))throw new RequestError('INVALID_COLLECTION',400);
 if(!input.expectedPayload||typeof input.expectedPayload!=='object'||Array.isArray(input.expectedPayload))throw new RequestError('INVALID_COLLECTION',400);
 const fr=typeof input.reasonFr==='string'?input.reasonFr.trim():'';
 const en=typeof input.reasonEn==='string'?input.reasonEn.trim():'';
 if(input.collection&&(fr.length<10||en.length<10||fr.length>600||en.length>600))throw new RequestError('COLLECTION_REASON_REQUIRED',400);
 return {p_id:input.id,p_collection:input.collection,p_reason_fr:fr,p_reason_en:en,p_expected_payload:input.expectedPayload};
}
