import type {GolfeEvent} from "../data/events";
import {eventSessions,isIsoDay} from "./agendaCalendar";
const norm=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
export function isValidAgendaEvent(event:GolfeEvent){
 const sessions=eventSessions(event);
 return !!event.id&&!!event.title&&!!event.source?.startsWith("https://")&&sessions.length>0&&sessions.every(s=>isIsoDay(s.start)&&(!s.end||(isIsoDay(s.end)&&s.end>=s.start))&&(!s.time||/^([01]\d|2[0-3]):[0-5]\d$/.test(s.time)));
}
function identity(e:GolfeEvent){
 const session=eventSessions(e)[0],title=norm(e.titleFr||e.title),venue=norm(e.venue||e.location);
 return [title,venue,session.start,session.time||""].join("|");
}
// Conservative: exact event/date/time/venue keys, never merge different sessions.
export function qualityAgendaEvents(events:GolfeEvent[]){
 const byKey=new Map<string,GolfeEvent>();
 for(const event of events){
  if(!isValidAgendaEvent(event))continue;
  const key=identity(event),old=byKey.get(key);
  if(!old){byKey.set(key,event);continue;}
  const score=(e:GolfeEvent)=>(e.sourceCheckedAt?2:0)+(e.sessions?.length||0)+(e.streetAddress?1:0)+(e.officialImage?1:0);
  if(score(event)>score(old))byKey.set(key,event);
 }
 return [...byKey.values()];
}
