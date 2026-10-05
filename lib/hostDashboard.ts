import {supabase} from './supabase';
import {parsePublicVilla} from './villaListing';
import {parseInquiry,type HostInquiry} from './hostInquiries';
import {parseBooking,type VillaBooking} from './villaBooking';
import {parseCalendar,type VillaCalendar} from './villaAvailability';
import type {Property} from '../components/HostDesk';
export type DashboardBooking=VillaBooking&{guest:string;guests:number};
export type HostDashboardData={userId:string;houses:Property[];inquiries:HostInquiry[]|null;bookings:DashboardBooking[]|null;calendars:VillaCalendar[]|null;warnings:string[]};
export function remoteProperty(row:{id:string;payload:unknown;status:string;visibility:string}):Property|null{
 const v=parsePublicVilla(row.id,row.payload);if(!v||!['draft','published','paused'].includes(row.status)||!['public','private','request'].includes(row.visibility))return null;
 return {mapLocation:v.mapLocation,district:v.district,id:v.id,name:v.name,location:v.location,price:v.price,guests:v.guests,bedrooms:v.bedrooms,bathrooms:v.bathrooms,description:v.description,descriptionFr:v.description,descriptionEn:v.descriptionEn,titleFr:v.titleFr,titleEn:v.titleEn,highlightsFr:v.highlights,highlightsEn:v.highlightsEn,amenities:v.amenities,images:v.photos.map(p=>p.src),managedBy:v.announcer?.name||'',announcerType:v.announcer?.kind||'owner',distanceFromSaintTropez:v.saintTropezDistance||0,status:row.status as Property['status'],visibility:row.visibility as Property['visibility'],online:true};
}
function validRows<T>(rows:(T|null)[]|null|undefined):T[]|null{return rows&&!rows.some(r=>r===null)?rows as T[]:null;}
export async function loadHostDashboard(today:string):Promise<HostDashboardData>{
 const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)throw new Error('SIGN_IN_REQUIRED');
 const listings=await supabase.from('villa_listings').select('id,payload,status,visibility').eq('owner_id',user.id).order('created_at',{ascending:false}).limit(200).abortSignal(AbortSignal.timeout(15000));
 if(listings.error)throw new Error('LISTINGS_UNAVAILABLE');const houses=(listings.data||[]).map(remoteProperty);if(houses.some(p=>!p))throw new Error('LISTINGS_UNAVAILABLE');
 const ids=houses.map(p=>p!.id);const warnings:string[]=[];
 let inquiries:HostInquiry[]|null=[],bookings:DashboardBooking[]|null=[],calendars:VillaCalendar[]|null=[];
 if(ids.length){
  const results=await Promise.allSettled([
   supabase.from('villa_inquiries').select('id,listing_id,name,email,phone,arrival,departure,guests,message,status,owner_notes,created_at,updated_at,villa_listings(payload)').in('listing_id',ids).order('created_at',{ascending:false}).limit(200).abortSignal(AbortSignal.timeout(15000)),
   supabase.from('villa_bookings').select('inquiry_id,listing_id,arrival,departure,status,total_price,conditions,updated_at,villa_inquiries(name,guests)').in('listing_id',ids).in('status',['quote','confirmed']).gt('departure',today).order('arrival',{ascending:true}).limit(200).abortSignal(AbortSignal.timeout(15000)),
   supabase.from('villa_calendars').select('*').in('listing_id',ids).abortSignal(AbortSignal.timeout(15000))
  ]);
  const data=(i:number)=>{const r=results[i];return r.status==='fulfilled'&&!r.value.error?r.value.data:null;};
  const ir=data(0),br=data(1),cr=data(2);
  inquiries=validRows(ir?.map(parseInquiry));
  bookings=validRows(br?.map((raw:Record<string,unknown>)=>{const b=parseBooking(raw),guest=raw.villa_inquiries as {name?:unknown;guests?:unknown}|null;return b?{...b,guest:typeof guest?.name==='string'?guest.name:'',guests:typeof guest?.guests==='number'?guest.guests:0}:null;}));
  calendars=validRows(cr?.map(parseCalendar));
  if(!inquiries)warnings.push('inquiries');if(!bookings)warnings.push('bookings');if(!calendars)warnings.push('calendars');
 }
 const {data:{user:current},error}=await supabase.auth.getUser();if(error||current?.id!==user.id)throw new Error('SESSION_CHANGED');
 return {userId:user.id,houses:houses as Property[],inquiries,bookings,calendars,warnings};
}
export function dashboardSummary(data:HostDashboardData,today:string){
 const confirmed=data.bookings?.filter(b=>b.status==='confirmed'&&b.departure>today).sort((a,b)=>a.arrival.localeCompare(b.arrival))??null;
 const quotes=data.bookings?.filter(b=>b.status==='quote'&&b.departure>today)??null;
 const requests=data.inquiries?.filter(r=>r.departure>today&&['new','reviewing'].includes(r.status)&&!confirmed?.some(b=>b.inquiry_id===r.id)&&!quotes?.some(b=>b.inquiry_id===r.id))??null;
 const calendars=data.calendars?data.houses.filter(p=>p.status==='published'&&p.visibility==='public'&&!data.calendars!.some(c=>c.listing_id===p.id&&c.enabled)):null;
 return {confirmed,quotes,requests,calendars,published:data.houses.filter(p=>p.status==='published'&&p.visibility==='public').length,paused:data.houses.filter(p=>p.status==='paused').length,drafts:data.houses.filter(p=>p.status==='draft').length};
}
