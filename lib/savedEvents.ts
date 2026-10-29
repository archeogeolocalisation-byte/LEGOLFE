import {isIsoDay,sessionAnchor} from './agendaCalendar';
import type {EventSession,GolfeEvent} from '../data/events';
export const SAVED_EVENTS_KEY='le-golfe-saved-events-v1';
export const SAVED_EVENTS_EVENT='le-golfe:saved-events';
export type SavedEvent={id:string;title:string;titleFr:string;location:string;venue?:string;streetAddress?:string;session:EventSession};
export function savedEventKey(event:SavedEvent){return `${event.id}/${sessionAnchor(event.session)}`;}
export function savedEvent(event:GolfeEvent,session:EventSession):SavedEvent {
 return {id:event.id,title:event.title,titleFr:event.titleFr||event.title,location:event.location,venue:event.venue,streetAddress:event.streetAddress,session};
}
export function parseSavedEvents(raw:string|null):SavedEvent[]{
 try{
  const items:unknown=JSON.parse(raw||'[]');if(!Array.isArray(items))return [];
  const result:SavedEvent[]=[];
  const text=(value:unknown):value is string=>typeof value==='string'&&value.length>0&&value.length<=500;
  for(const item of items){
   if(!item||typeof item!=='object')continue;
   const {id,title,titleFr,location,venue,streetAddress,session}=item;
   if(!text(id)||! /^[a-z0-9][a-z0-9-]{0,119}$/i.test(id)||!text(title)||!text(titleFr)||!text(location)||!session||typeof session!=='object'||!isIsoDay(session.start))continue;
   if(session.end&&(!isIsoDay(session.end)||session.end<session.start))continue;
   if(session.time&&(typeof session.time!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(session.time)))continue;
   if(session.endTime&&(typeof session.endTime!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(session.endTime)||!!session.time&&session.endTime<session.time&&(!session.end||session.end===session.start)))continue;
   if(session.version&&(typeof session.version!=='string'||! /^[a-z0-9-]{1,30}$/i.test(session.version)))continue;
   const clean:SavedEvent={id,title,titleFr,location,venue:text(venue)?venue:undefined,streetAddress:text(streetAddress)?streetAddress:undefined,session:{start:session.start,end:session.end||undefined,time:session.time||undefined,endTime:session.endTime||undefined,version:session.version||undefined}};
   if(!result.some(e=>savedEventKey(e)===savedEventKey(clean)))result.push(clean);
   if(result.length===50)break;
  }
  return result;
 }catch{return [];}
}
