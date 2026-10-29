import {addDays,isIsoDay} from './agendaCalendar';
import type {SavedEvent} from './savedEvents';
export const STAY_PLAN_KEY='le-golfe-stay-plan-v1';
export const STAY_SETTINGS_KEY='le-golfe-stay-settings-v1';
export const STAY_PLAN_EVENT='le-golfe:stay-plan';
export const periods=['morning','lunch','afternoon','evening'] as const;
export type StayPeriod=typeof periods[number];
export type StayItem={id:string;day:number;period:StayPeriod};
export type StaySettings={version:1;startDate:string;days:number;town:string;baseId:string};
export function parseStayItems(raw:string|null):StayItem[]{
 const value:unknown=raw?JSON.parse(raw):[];
 if(!Array.isArray(value))throw Error('Invalid plan');
 const ids=new Set<string>();
 return value.filter((item):item is StayItem=>{
  if(!item||typeof item!=='object'||typeof item.id!=='string'||item.id.length>150||!item.id||!Number.isInteger(item.day)||item.day<1||item.day>14||!periods.includes(item.period)||ids.has(item.id))return false;
  ids.add(item.id);return true;
 }).map(({id,day,period})=>({id,day,period}));
}
export function parseStaySettings(raw:string|null,minDays=1,legacyBase=''):StaySettings{
 if(!raw)return {version:1,startDate:'',days:Math.max(3,minDays),town:'',baseId:legacyBase.slice(0,150)};
 const value=JSON.parse(raw);
 if(!value||value.version!==1||!Number.isInteger(value.days)||value.days<1||value.days>14||typeof value.startDate!=='string'||value.startDate!==''&&!isIsoDay(value.startDate)||typeof value.town!=='string'||value.town.length>80||typeof value.baseId!=='string'||value.baseId.length>150)throw Error('Invalid settings');
 return {version:1,startDate:value.startDate,days:Math.max(value.days,minDays),town:value.town,baseId:value.baseId};
}
export function stayDate(settings:StaySettings,day:number):string|undefined{return settings.startDate&&isIsoDay(settings.startDate)?addDays(settings.startDate,day-1):undefined;}
export function dayForDate(settings:StaySettings,date:string):number|undefined{
 if(!settings.startDate||!isIsoDay(date))return undefined;
 for(let day=1;day<=settings.days;day++)if(stayDate(settings,day)===date)return day;
 return undefined;
}
export function stayEventsOnDay(events:SavedEvent[],date:string|undefined):SavedEvent[]{
 if(!date)return [];
 return events.filter(e=>e.session.start<=date&&(e.session.end||e.session.start)>=date).sort((a,b)=>(a.session.time||'').localeCompare(b.session.time||''));
}
export function stayEventClashes(events:SavedEvent[],date:string|undefined):[SavedEvent,SavedEvent][]{
 if(!date)return [];
 const at=(day:string,time:string)=>Date.parse(day+'T'+time+':00Z');
 const timed=stayEventsOnDay(events,date).filter(e=>e.session.time&&e.session.endTime);
 const result:[SavedEvent,SavedEvent][]=[];
 for(let a=0;a<timed.length;a++)for(let b=a+1;b<timed.length;b++){
  const x=timed[a].session,y=timed[b].session;
  if(Math.max(at(x.start,x.time!),at(y.start,y.time!),at(date,'00:00'))<Math.min(at(x.end||x.start,x.endTime!),at(y.end||y.start,y.endTime!),at(addDays(date,1),'00:00')))result.push([timed[a],timed[b]]);
 }
 return result;
}
export function placePeriod(category:string):StayPeriod{return category==='eat'?'lunch':category==='beach'||category==='sea'?'afternoon':category==='party'?'evening':'morning';}
export function addStayItem(items:StayItem[],id:string,day:number,period:StayPeriod):StayItem[]{return items.some(item=>item.id===id)?items:[...items,{id,day,period}];}
export function reorderStayItem(items:StayItem[],id:string,offset:-1|1):StayItem[]{
 const index=items.findIndex(item=>item.id===id);if(index<0)return items;
 const item=items[index],group=items.map((v,i)=>({v,i})).filter(({v})=>v.day===item.day&&v.period===item.period),position=group.findIndex(({i})=>i===index),target=group[position+offset];
 if(!target)return items;const next=[...items];[next[index],next[target.i]]=[next[target.i],next[index]];return next;
}
