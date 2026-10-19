import type {GolfeEvent} from '../data/events';
import {eventSessions,isIsoDay} from './agendaCalendar';
const norm=(s:string)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const time=(v:string)=>/^([01]\d|2[0-3]):[0-5]\d$/.test(v);
const categories=new Set(['music','culture','sport','local','family','sailing','cinema']);
export function isValidAgendaEvent(event:GolfeEvent){
 try{
 const sessions=eventSessions(event);let safeSource=false;try{const u=new URL(event.source);safeSource=u.protocol==='https:'&&!u.username&&!u.password;}catch{/* Invalid source. */}
 return !event.cancelled&&/^[a-z0-9][a-z0-9-]{0,119}$/i.test(event.id)&&!!event.title?.trim()&&!!event.location?.trim()&&categories.has(event.category)&&safeSource&&sessions.length>0&&sessions.every(s=>isIsoDay(s.start)&&(!s.end||(isIsoDay(s.end)&&s.end>=s.start))&&(!s.time||time(s.time))&&(!s.endTime||time(s.endTime)&&(!s.time||s.endTime>=s.time||!!s.end&&s.end>s.start)));
 }catch{return false;}
}
export function agendaProviderId(event:GolfeEvent){try{const u=new URL(event.source);if(u.hostname==='www.domainedurayol.org'&&/^apidae-\d{5,10}$/.test(event.id))return event.id.slice(7);if(!['gassin.eu','www.ramatuelle-tourisme.com','www.golfe-saint-tropez-information.com','www.golfe-sainttropez-tourisme.fr','www.lacroixvalmertourisme.com','www.cavalairesurmer.fr'].includes(u.hostname))return;return u.pathname.match(/-(\d{5,10})\/?$/)?.[1];}catch{return;}}
function identity(e:GolfeEvent){
 const provider=agendaProviderId(e),title=norm(e.titleFr||e.title),venue=norm(e.venue||e.location);
 const sessions=eventSessions(e).map(s=>[s.start,s.end||s.start,s.time||'',s.endTime||'',s.version||''].join('/')).sort();
 return [provider?'apidae-'+provider:title,norm(e.location),provider?'':venue,...sessions].join('|');
}
// Exact date/time/venue keys, never merge different sessions or municipality.
export function qualityAgendaEvents(events:GolfeEvent[]){
 const byKey=new Map<string,GolfeEvent>();
 const cancelled=new Set(events.filter(e=>e.cancelled).map(e=>agendaProviderId(e)??e.id));
 for(const original of events){
  if(cancelled.has(agendaProviderId(original)??original.id)||!isValidAgendaEvent(original))continue;
  const sessions=[...new Map(eventSessions(original).map(s=>[JSON.stringify([s.start,s.end??'',s.time??'',s.endTime??'',s.version??'']),s])).values()];
  const event=original.sessions?{...original,sessions}:original;
  const key=identity(event),old=byKey.get(key);if(!old){byKey.set(key,event);continue;}
  const score=(e:GolfeEvent)=>(e.sourceCheckedAt?2:0)+(e.sessions?.length||0)+(e.streetAddress?1:0)+(e.officialImage?1:0);
  if(score(event)>score(old))byKey.set(key,{...event,id:old.id});
 }
 return [...byKey.values()];
}
// Provider IDs update dates without breaking the existing editorial event URL.
export function mergeOfficialAgenda(base:GolfeEvent[],official:GolfeEvent[]){
 const updates=new Map(official.map(e=>[e.id,e]));
 const merged=base.map(e=>{
  const provider=agendaProviderId(e);
  const update=[...updates.values()].find(candidate=>(!!provider&&agendaProviderId(candidate)===provider)||candidate.source.replace(/\/$/,'')===e.source.replace(/\/$/,''));
  if(!update)return e;updates.delete(update.id);
  return {...e,...update,id:e.id,title:e.title,titleFr:e.titleFr,summary:e.summary,summaryFr:e.summaryFr,why:e.why,whyFr:e.whyFr,category:e.category,featured:e.featured,venue:update.venue??e.venue};
 });
 return [...merged,...updates.values()];
}
