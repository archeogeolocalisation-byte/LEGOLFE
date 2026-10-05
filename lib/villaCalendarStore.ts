import {supabase} from './supabase';
import {mergePeriods,parseCalendar,type VillaCalendar,type BlockedPeriod} from './villaAvailability';
// Public calendar contains dates only. '*' also keeps V54 installations compatible until V56 is activated.
const columns='*';
function failure(error:{code?:string}|null){return new Error(error&&['42P01','PGRST205'].includes(error.code||'')?'CALENDAR_NOT_CONFIGURED':'CALENDAR_UNAVAILABLE');}
export async function loadVillaCalendars(ids:string[]):Promise<Record<string,VillaCalendar>>{
 const valid=Array.from(new Set(ids.filter(id=>/^property-[a-zA-Z0-9-]{1,100}$/.test(id))));if(!valid.length)return {};
 const {data,error}=await supabase.from('villa_calendars').select(columns).in('listing_id',valid).abortSignal(AbortSignal.timeout(8000));if(error)throw failure(error);
 const result:Record<string,VillaCalendar>={};for(const row of data||[]){const calendar=parseCalendar(row);if(!calendar)throw new Error('CALENDAR_UNAVAILABLE');if(valid.includes(calendar.listing_id))result[calendar.listing_id]=calendar;}return result;
}
export async function loadVillaCalendar(id:string){return (await loadVillaCalendars([id]))[id]||null;}
export async function saveVillaCalendar(id:string,enabled:boolean,blocks:BlockedPeriod[],version:string|null):Promise<VillaCalendar>{
 const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)throw new Error('SIGN_IN_REQUIRED');
 const {data:owned,error:ownershipError}=await supabase.from('villa_listings').select('id').eq('id',id).eq('owner_id',user.id).abortSignal(AbortSignal.timeout(8000)).maybeSingle();if(ownershipError||!owned)throw new Error('OWNER_REQUIRED');
 const payload={enabled,blocks:mergePeriods(blocks)};
 const query=version?supabase.from('villa_calendars').update(payload).eq('listing_id',id).eq('updated_at',version):supabase.from('villa_calendars').insert({listing_id:id,...payload});
 const {data,error}=await query.select(columns).abortSignal(AbortSignal.timeout(10000)).maybeSingle();if(error){if(error.code==='23505')throw new Error('CALENDAR_CONFLICT');throw failure(error);}if(!data)throw new Error('CALENDAR_CONFLICT');const calendar=parseCalendar(data);if(!calendar)throw new Error('CALENDAR_UNAVAILABLE');return calendar;
}
