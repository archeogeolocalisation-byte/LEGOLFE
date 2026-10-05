import type { GolfeEvent, EventSession } from "../data/events";
export type AgendaRange = "today" | "tomorrow" | "weekend" | "7days" | "month";
export type DateWindow = {from:string;to:string};
export function isIsoDay(value:string):boolean {
 if(!/^20\d{2}-\d{2}-\d{2}$/.test(value))return false;
 const date=new Date(value+"T12:00:00Z");return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10)===value;
}
export function addDays(day:string,amount:number):string {
 if(!isIsoDay(day))throw new Error("Invalid calendar day");
 const d=new Date(day+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+amount);return d.toISOString().slice(0,10);
}
export function monthWindow(month:string):DateWindow|undefined {
 if(!/^20\d{2}-(0[1-9]|1[0-2])$/.test(month))return undefined;
 const from=month+"-01",d=new Date(from+"T12:00:00Z");d.setUTCMonth(d.getUTCMonth()+1);d.setUTCDate(0);return {from,to:d.toISOString().slice(0,10)};
}
export function dateWindow(range:AgendaRange,today:string):DateWindow {
 if(!isIsoDay(today))throw new Error("Invalid calendar day");
 if(range==="tomorrow"){const day=addDays(today,1);return {from:day,to:day};}
 if(range==="7days")return {from:today,to:addDays(today,6)};
 if(range==="month")return monthWindow(today.slice(0,7))!;
 if(range==="weekend"){
  const weekday=new Date(today+"T12:00:00Z").getUTCDay();
  const saturday=addDays(today,weekday===0?-1:6-weekday);return {from:saturday,to:addDays(saturday,1)};
 }
 return {from:today,to:today};
}
export function eventSessions(event:GolfeEvent):EventSession[]{return event.sessions?.length ? event.sessions : [{start:event.start,end:event.end,time:event.time}];}
export function sessionsInWindow(event:GolfeEvent,window:DateWindow):EventSession[]{return eventSessions(event).filter(s=>isIsoDay(s.start) && (!s.end||isIsoDay(s.end)) && (s.end||s.start)>=s.start && s.start<=window.to && (s.end||s.start)>=window.from);}
export function eventOverlaps(event:GolfeEvent,from:string,to:string){return sessionsInWindow(event,{from,to}).length>0;}
export function firstSessionInWindow(event:GolfeEvent,window:DateWindow){return sessionsInWindow(event,window).sort((a,b)=>a.start.localeCompare(b.start))[0];}
export function eventsInWindow(events:GolfeEvent[],window:DateWindow):GolfeEvent[]{return events.filter(e=>sessionsInWindow(e,window).length).sort((a,b)=>firstSessionInWindow(a,window)!.start.localeCompare(firstSessionInWindow(b,window)!.start) || a.id.localeCompare(b.id));}
export function catalogMonths(events:GolfeEvent[]):string[]{
 const months=new Set<string>();
 for(const e of events)for(const s of eventSessions(e)){
  if(!isIsoDay(s.start) || (s.end&&!isIsoDay(s.end)) || (s.end||s.start)<s.start)continue;
  let month=s.start.slice(0,7);const last=(s.end||s.start).slice(0,7);
  for(let count=0;count<36 && month<=last;count++){
   months.add(month);const d=new Date(month+"-01T12:00:00Z");d.setUTCMonth(d.getUTCMonth()+1);month=d.toISOString().slice(0,7);
  }
 }
 return [...months].sort();
}
export function agendaPaths(events:GolfeEvent[],today:string){return [
 ...(eventsInWindow(events,dateWindow("today",today)).length?["/whats-on/today"]:[]),
 ...(eventsInWindow(events,dateWindow("weekend",today)).length?["/whats-on/this-weekend"]:[]),
 ...catalogMonths(events).map(month=>`/whats-on/${month}`),
];}
export function formatCalendarDay(day:string,locale:"fr"|"en",short=false){return new Intl.DateTimeFormat(locale==="fr"?"fr-FR":"en-GB",{day:"numeric",month:short?"short":"long",year:"numeric",timeZone:"UTC"}).format(new Date(day+"T12:00:00Z"));}
export function formatCalendarMonth(month:string,locale:"fr"|"en"){return new Intl.DateTimeFormat(locale==="fr"?"fr-FR":"en-GB",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(month+"-01T12:00:00Z"));}
