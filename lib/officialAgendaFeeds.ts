import {officialAgendaSources,type OfficialAgendaSource} from '../data/officialAgendaSources';
import {officialAgendaSnapshot} from '../data/officialAgendaSnapshot';
import {officialAgendaDetailUrls,parseOfficialAgendaDetail} from './officialAgendaParser';
import {parisIsoDay} from './localCalendar';

async function read(url:string,signal:AbortSignal){
 const response=await fetch(url,{next:{revalidate:21600},signal,redirect:'error',headers:{accept:'text/html'}});if(!response.ok)throw new Error('Agenda unavailable');
 const reader=response.body?.getReader();if(!reader)throw new Error('Empty agenda');
 const chunks:Uint8Array[]=[];let size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>2_000_000){await reader.cancel();throw new Error('Agenda too large');}chunks.push(value);}
 const date=new Date(response.headers.get('date')??'');return {html:Buffer.concat(chunks).toString('utf8'),checked:Number.isNaN(date.getTime())?parisIsoDay():parisIsoDay(date)};
}
export async function getOfficialAgendaFeed(source:OfficialAgendaSource){
 const fallback=officialAgendaSnapshot.filter(e=>new URL(e.source).origin===new URL(source.url).origin);
 const signal=AbortSignal.timeout(6000);
 try{
  const listing=await read(source.url,signal),urls=officialAgendaDetailUrls(listing.html,source);if(!urls.length)return fallback;
  const records=new Map(fallback.map(e=>[e.source,e]));let cursor=0;
  await Promise.all(Array.from({length:Math.min(6,urls.length)},async()=>{
   while(cursor<urls.length&&!signal.aborted){const url=urls[cursor++];try{const detail=await read(url,signal);const event=parseOfficialAgendaDetail(detail.html,url,source,detail.checked);records.delete(url);if(event)records.set(url,event);}catch{/* Keep this source's checked snapshot on network failure. */}}
  }));return [...records.values()];
 }catch{return fallback;}
}
export async function getOfficialAgendaFeeds(){return (await Promise.all(officialAgendaSources.map(getOfficialAgendaFeed))).flat();}
