import type {EventParticipant,EventSession,GolfeEvent} from '../data/events';
import type {Locale} from './i18n';
import {eventSessions,isIsoDay,sessionAnchor} from './agendaCalendar';
import {mediaForEvent} from './eventMedia';
import {absoluteUrl,siteOrigin} from './seo';

export function eventParticipant(value:unknown,performer=false):EventParticipant|undefined{
 if(!value||typeof value!=='object')return;
 const p=value as Record<string,unknown>,type=p.type??p['@type'];
 if(!(performer?['Person','PerformingGroup']:['Person','Organization']).includes(String(type)))return;
 if(typeof p.name!=='string')return;
 const name=p.name.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();if(!name||name.length>240)return;
 let url:string|undefined;try{const u=new URL(String(p.url));if(u.protocol==='https:'&&!u.username&&!u.password)url=u.href;}catch{/* Optional URL. */}
 return {type:type as EventParticipant['type'],name,...(url?{url}:{})};
}
const paris=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
// Resolve real Paris offsets; ambiguous or nonexistent DST clock times stay date-only.
export function eventDateTime(day:string,time?:string):string{
 if(!isIsoDay(day)||!time||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))return day;
 const target=`${day}T${time}`,utc=Date.parse(target+':00Z');
 const offsets=[60,120].filter(offset=>{
  const parts=Object.fromEntries(paris.formatToParts(new Date(utc-offset*60000)).map(p=>[p.type,p.value]));
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`===target;
 });
 return offsets.length===1?`${target}:00+0${offsets[0]/60}:00`:day;
}
export function eventSessionDates(session:EventSession){
 const startDate=eventDateTime(session.start,session.time);
 let endDate:string|undefined;
 if(session.endTime&&(session.end||session.start)>=(session.start)){
  const candidate=eventDateTime(session.end||session.start,session.endTime);
  if(candidate.includes('T')&&startDate.includes('T')&&Date.parse(candidate)>=Date.parse(startDate))endDate=candidate;
 }else if(session.end&&isIsoDay(session.end)&&session.end>=session.start)endDate=session.end;
 return {startDate,...(endDate?{endDate}:{})};
}
export function eventStructuredData(event:GolfeEvent,locale:Locale){
 if(!siteOrigin())return;
 const title=locale==='fr'?event.titleFr||event.title:event.title,image=mediaForEvent(event);
 const organizer=eventParticipant(event.organizer),performers=event.performers?.flatMap(p=>{const valid=eventParticipant(p,true);return valid?[{'@type':valid.type,name:valid.name,...(valid.url?{url:valid.url}:{})}]:[];});
 const status=event.cancelled?'EventCancelled':(['EventScheduled','EventCancelled','EventPostponed','EventRescheduled'].includes(event.eventStatus??'')?event.eventStatus:'EventScheduled');
 return {'@context':'https://schema.org','@graph':eventSessions(event).map(session=>{
  const url=absoluteUrl(`/${locale}/event/${event.id}#${sessionAnchor(session)}`);
  return {'@type':event.category==='cinema'?'ScreeningEvent':'Event','@id':url,url,name:title,description:locale==='fr'?event.summaryFr:event.summary,
   ...eventSessionDates(session),eventStatus:`https://schema.org/${status}`,
   ...(organizer?{organizer:{'@type':organizer.type,name:organizer.name,...(organizer.url?{url:organizer.url}:{})}}:{}),
   ...(performers?.length?{performer:performers}:{}),
   ...(image.kind==='official'?{image:[absoluteUrl(image.src)]}:{}),
   ...(event.category==='cinema'?{workPresented:{'@type':'Movie',name:title,...(event.filmDurationMinutes?{duration:`PT${event.filmDurationMinutes}M`}:{})}}:{}),
   location:{'@type':'Place',name:event.venue||event.location,address:{'@type':'PostalAddress',addressLocality:event.location,addressCountry:'FR',streetAddress:event.streetAddress,postalCode:event.postalCode}}
  };
 })};
}
