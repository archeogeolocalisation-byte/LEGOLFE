import {supabase} from './supabase';
import {parseInquiry,type HostInquiry,type InquiryStatus} from './hostInquiries';
const columns='id,listing_id,name,email,phone,arrival,departure,guests,message,status,owner_notes,created_at,updated_at,villa_listings(payload)';
export async function loadHostInquiries(inquiryId?:string){const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)throw new Error('SIGN_IN_REQUIRED');const base=supabase.from('villa_inquiries').select(columns);const query=inquiryId?base.eq('id',inquiryId):base;const {data,error}=await query.order('created_at',{ascending:false}).limit(100).abortSignal(AbortSignal.timeout(15000));if(error)throw error;return {userId:user.id,rows:(data||[]).flatMap(row=>{const value=parseInquiry(row);return value?[value]:[];})};}
export async function saveInquiry(current:HostInquiry,status:InquiryStatus,notes:string){
 if(notes.length>2000)throw new Error('NOTES_TOO_LONG');
 const {data,error}=await supabase.from('villa_inquiries').update({status,owner_notes:notes}).eq('id',current.id).eq('updated_at',current.updated_at).select(columns).abortSignal(AbortSignal.timeout(15000)).maybeSingle();
 if(error)throw error;if(!data)throw new Error('CONFLICT');const row=parseInquiry(data);if(!row)throw new Error('INVALID_RESPONSE');return row;
}
