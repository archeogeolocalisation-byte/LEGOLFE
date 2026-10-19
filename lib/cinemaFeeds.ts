import {cinemas} from '../data/cinemas';
import {cinemaSnapshot} from '../data/cinemaSnapshot';
import type {GolfeEvent} from '../data/events';
import {parsePagnol,parseRaimu,parseMiramar,pagnolWeeks,type CinemaFilm,type CinemaShow,type CinemaOption} from './cinemaParser';
import {addDays} from './agendaCalendar';
import {parisIsoDay} from './localCalendar';

async function read(url:string,signal:AbortSignal){
 const response=await fetch(url,{next:{revalidate:1800},signal,redirect:'error',headers:{accept:'text/html, application/json'}});
 if(!response.ok)throw new Error('Cinema programme unavailable');
 const reader=response.body?.getReader();if(!reader)throw new Error('Empty cinema programme');
 const chunks:Uint8Array[]=[];let size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>2_000_000){await reader.cancel();throw new Error('Cinema programme too large');}chunks.push(value);}
 const bytes=Buffer.concat(chunks),latin=/charset=(?:iso-8859-1|windows-1252)/i.test(response.headers.get('content-type')??'');
 return {text:new TextDecoder(latin?'windows-1252':'utf-8').decode(bytes),checked:response.headers.get('date')?parisIsoDay(new Date(response.headers.get('date')!)):parisIsoDay()};
}
export function freshCinemaEvents(events:GolfeEvent[],today=parisIsoDay(),fallback=false){return events.filter(e=>!fallback||!!e.sourceCheckedAt&&e.sourceCheckedAt>=addDays(today,-2)&&e.sourceCheckedAt<=today).flatMap(e=>{const sessions=e.sessions?.filter(s=>s.start>=today);return sessions?.length?[{...e,start:sessions[0].start,time:sessions[0].time,sessions}]:[];});}
function mergeFilms(events:GolfeEvent[]){const records=new Map<string,GolfeEvent>();for(const e of events){const old=records.get(e.id);records.set(e.id,old?{...e,sessions:[...new Map([...(old.sessions??[]),...(e.sessions??[])].map(s=>[`${s.start}|${s.time}|${s.version??''}`,s])).values()].sort((a,b)=>a.start.localeCompare(b.start)||(a.time??'').localeCompare(b.time??'')),start:old.start,time:old.time}:e);}return [...records.values()];}
export async function getCinemaFeed(id:'pagnol'|'raimu'|'miramar'){
 const signal=AbortSignal.timeout(8000),today=parisIsoDay();
 try{
  if(id==='pagnol'){
   const page=await read(cinemas[0].url,signal),first=parsePagnol(page.text,page.checked);
   const more=await Promise.all(pagnolWeeks(page.text).slice(1).map(async week=>{try{const next=await read(cinemas[0].url+'?dprog='+week,signal);return parsePagnol(next.text,next.checked);}catch{return [];} }));
   return freshCinemaEvents(mergeFilms([...first,...more.flat()]),today);
  }
  if(id==='raimu'){const page=await read(cinemas[1].url,signal);return freshCinemaEvents(parseRaimu(page.text,page.checked),today);}
  const home=await read('https://cinema-cavalaire.fr/',signal);
  // This identifier is published in the cinema's public HTML for its public timetable widget.
  // Read it in memory on refresh; do not persist it or require an account/session.
  const token=home.text.match(/<meta\s+name="api_token"\s+content="([a-f0-9-]{36})"/i)?.[1];if(!token)throw new Error('Public timetable not available');
  const data=await Promise.all(['media','shows','mediaoptions'].map(route=>read(`https://cavalaireecranbleu.cineoffice.fr/vad/${route}?api_token=${encodeURIComponent(token)}`,signal)));
  const films=JSON.parse(data[0].text) as CinemaFilm[],shows=JSON.parse(data[1].text) as CinemaShow[],options=JSON.parse(data[2].text) as CinemaOption[];
  return freshCinemaEvents(parseMiramar(films,shows,options,data[1].checked),today);
 }catch{return freshCinemaEvents(cinemaSnapshot.filter(e=>e.id.startsWith('cinema-'+id+'-')),today,true);}
}
export async function getCinemaProgramme(){return (await Promise.all((['pagnol','raimu','miramar'] as const).map(getCinemaFeed))).flat();}
