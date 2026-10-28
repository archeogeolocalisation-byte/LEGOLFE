import {cinemaPoster} from "./cinemaPoster";
import type {GolfeEvent,EventSession} from '../data/events';
import {cinemas,type Cinema} from '../data/cinemas';
import {isIsoDay,addDays} from './agendaCalendar';
import {agendaPlain} from './officialAgendaParser';

type Node={tag:string;attrs:Record<string,string>;children:Node[];text:string};
// Small inert HTML reader for the two server-rendered timetables; never executes source scripts.
function document(html:string):Node {
 const root:Node={tag:'root',attrs:{},children:[],text:''},stack=[root];
 const clean=html.replace(/<!--[^]*?-->|<(script|style)\b[^>]*>[^]*?<\/\1>/gi,'');
 for(const token of clean.match(/<[^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>|[^<]+/g)??[]){
  if(token.startsWith('</')){const tag=token.match(/^<\/([\w-]+)/)?.[1].toLowerCase();for(let i=stack.length-1;i>0;i--)if(stack[i].tag===tag){stack.length=i;break;}continue;}
  if(token.startsWith('<')){const tag=token.match(/^<([\w-]+)/)?.[1].toLowerCase();if(!tag)continue;
   const attrs:Record<string,string>={};for(const m of token.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))attrs[m[1].toLowerCase()]=agendaPlain(m[2]??m[3]);
   const node:Node={tag,attrs,children:[],text:''};stack.at(-1)!.children.push(node);
   if(!/^(img|br|hr|input|meta|link|source|wbr|area|embed|param|col)$/.test(tag)&&!token.endsWith('/>'))stack.push(node);
  }else stack.at(-1)!.children.push({tag:'#text',attrs:{},children:[],text:token});
 }
 return root;
}
const all=(n:Node,test:(n:Node)=>boolean):Node[]=>n.children.flatMap(c=>[...(test(c)?[c]:[]),...all(c,test)]);
const cls=(n:Node,c:string)=>(n.attrs.class??'').split(/\s+/).includes(c);
const text=(n:Node):string=>agendaPlain(n.text+' '+n.children.map(text).join(' '));
const first=(n:Node,tag:string)=>all(n,c=>c.tag===tag)[0];
const clock=(value:string)=>{const m=value.match(/\b([01]?\d|2[0-3])[h:]([0-5]\d)\b/);return m?m[1].padStart(2,'0')+':'+m[2]:undefined;};
const version=(v:string):EventSession["version"]=>/VOST|VERSION_ORIGINAL_LOCAL/.test(v)?'VOSTFR':/\bVO\b|VERSION_ORIGINAL/.test(v)?'VO':/\bVF\b|VERSION_LOCAL/.test(v)?'VF':undefined;

function event(cinema:Cinema,key:string,title:string,sessions:EventSession[],source:string,checked:string,poster?:string,durationMinutes?:number):GolfeEvent|undefined {
 const valid=[...new Map(sessions.filter(s=>isIsoDay(s.start)&&!!s.time&&s.start>=checked&&s.start<=addDays(checked,60)).map(s=>[`${s.start}|${s.time}|${s.version??''}`,s])).values()].sort((a,b)=>a.start.localeCompare(b.start)||a.time!.localeCompare(b.time!));
 if(!title||!valid.length||!isIsoDay(checked)||!/^[-\w]{1,55}$/.test(key))return;
 return {organizer:{type:'Organization',name:cinema.name,url:cinema.url},id:`cinema-${cinema.id}-${key}`.toLowerCase(),title,titleFr:title,category:'cinema',location:cinema.town,venue:cinema.name,streetAddress:cinema.address,postalCode:cinema.postalCode,start:valid[0].start,time:valid[0].time,sessions:valid,source,sourceLabel:cinema.name,sourceCheckedAt:checked,officialImage:poster?cinemaPoster(poster):undefined,filmDurationMinutes:durationMinutes&&durationMinutes>0&&durationMinutes<600?durationMinutes:undefined,summary:`${title} at ${cinema.name}. See the dated screenings below.`,summaryFr:`${title} — ${cinema.name}, ${cinema.town}. Séances et horaires publiés par le cinéma.`,why:'Check the cinema’s programme for booking, age ratings and any schedule changes.',whyFr:'Consultez le programme du cinéma pour réserver, vérifier les restrictions d’âge et les éventuels changements d’horaires.'};
}
export function pagnolWeeks(html:string):string[]{const root=document(html),select=all(root,n=>n.tag==='select'&&n.attrs.id==='selecteurSemaine')[0];return select?all(select,n=>n.tag==='option').map(n=>n.attrs.value).filter(isIsoDay).slice(0,3):[];}
export function parsePagnol(html:string,checked:string):GolfeEvent[]{
 const root=document(html),select=all(root,n=>n.tag==='select'&&n.attrs.id==='selecteurSemaine')[0];
 const week=select&&all(select,n=>n.tag==='option'&&'selected' in n.attrs)[0]?.attrs.value;
 // Boolean selected is also accepted; source normally uses selected="selected".
 if(!week||!isIsoDay(week))throw new Error('Cinema week not dated');
 const blocks=all(root,n=>cls(n,'fiche-film-div')&&cls(n,'row')&&!!first(n,'h3'));if(!blocks.length)throw new Error('Cinema timetable missing');
 return blocks.flatMap(block=>{
  const link=all(block,n=>n.tag==='a'&&n.attrs.href?.includes('/fiche-film-cinema/'))[0]?.attrs.href;
  if(!link||new URL(link,'https://cinemapagnol-stemaxime.com').origin!=='https://cinemapagnol-stemaxime.com')return [];
  const key=link.match(/\/fiche-film-cinema\/([\w-]+)\//)?.[1];if(!key)return [];
  const versions=all(block,n=>cls(n,'b-seance')).map(n=>version(text(n))),rows=all(block,n=>cls(n,'ligne_ach1'));
  const sessions=rows.flatMap((row,i)=>{const cells=all(row,n=>cls(n,'heure-seance'));if(cells.length!==7)return [];
   return cells.flatMap((cell,offset)=>all(cell,n=>cls(n,'container-seance')).flatMap(n=>{const time=clock(text(n));return time?[{start:addDays(week,offset),time,version:versions[i]}]:[];}));});
  const poster=all(block,n=>n.tag==='img'&&!!n.attrs['data-original'])[0]?.attrs['data-original'];const duration=text(block).match(/\b(\d{2})h(\d{2})\b/);
  const result=event(cinemas[0],key,text(first(block,'h3')!),sessions,link,checked,poster,duration?+duration[1]*60+ +duration[2]:undefined);return result?[result]:[];
 });
}
export function parseRaimu(html:string,checked:string):GolfeEvent[]{
 const root=document(html),blocks=all(root,n=>cls(n,'hr_film'));if(!blocks.length)throw new Error('Cinema timetable missing');
 return blocks.flatMap(block=>{
  const h=first(block,'h2'),link=h&&first(h,'a');if(!link)return [];
  const source=link.attrs.href,key=source?.match(/^https:\/\/www\.cineode\.fr\/le-raimu\/film\/(\d+)\/$/)?.[1];if(!key)return [];
  const days=all(block,n=>cls(n,'hr_jour'));
  // The published timetable may start earlier this week. Anchor both weekday and day
  // to the response date, then validate every column before importing any sessions.
  const matches=(label:string,day:string)=>label.toLowerCase().startsWith(['dim','lun','mar','mer','jeu','ven','sam'][new Date(day+'T12:00:00Z').getUTCDay()])&&new RegExp(`\\b${Number(day.slice(8))}$`).test(label);
  const anchor=Array.from({length:7},(_,offset)=>addDays(checked,-offset)).find(day=>days[0]&&matches(text(days[0]),day));
  if(!anchor||days.some((heading,index)=>!matches(text(heading),addDays(anchor,index))))throw new Error('Cinema date headings mismatch');
  const sessions=all(block,n=>cls(n,'tab_seances')).flatMap(tab=>{const index=Number(tab.attrs.class.match(/\bjour(\d+)\b/)?.[1])-1;if(index<0||index>=days.length)return [];
   const day=addDays(anchor,index);
   return all(tab,n=>cls(n,'frow')).flatMap(row=>{const tags=all(row,n=>n.tag==='img').map(n=>n.attrs.class+' '+n.attrs.alt).join(' ');const v=version(tags.replace(/tag-/g,''));return all(row,n=>cls(n,'hor')).flatMap(n=>{const time=clock(text(n));return time?[{start:day,time,version:v}]:[];});});});
  const poster=all(block,n=>cls(n,'hr_aff'))[0]?.attrs.src,duration=text(block).match(/Durée\s*:\s*(\d+)h(\d{2})/i);
  const result=event(cinemas[1],key,text(link),sessions,source,checked,poster,duration?+duration[1]*60+ +duration[2]:undefined);return result?[result]:[];
 });
}
// Public CineOffice programme fields only; the loader discards all unrelated payload fields.
export type CinemaFilm={id:number;title:string;posterpath?:string;duration?:number;active?:boolean;deleted?:boolean;excludefrominternet?:boolean};
export type CinemaShow={id:number;mediaid:{id:number};cinemaid:string;showtime:string;deleted?:boolean;canceled?:boolean;draft?:boolean;school?:boolean;languagemediaoptionsid?:number};
export type CinemaOption={id:number;label:string};
export function parseMiramar(films:CinemaFilm[],shows:CinemaShow[],options:CinemaOption[],checked:string):GolfeEvent[]{
 if(!Array.isArray(films)||!Array.isArray(shows)||!Array.isArray(options))throw new Error('Invalid cinema programme');
 return films.filter(f=>f.active!==false&&!f.deleted&&!f.excludefrominternet).flatMap(f=>{
  const sessions=shows.filter(s=>s.mediaid?.id===f.id&&s.cinemaid==='cavalaireecranbleu'&&!s.deleted&&!s.canceled&&!s.draft&&!s.school).flatMap(s=>{
   if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{4}$/.test(s.showtime))return [];
   const instant=new Date(s.showtime.replace(/([+-]\d{2})(\d{2})$/,'$1:$2'));if(Number.isNaN(instant.getTime()))return [];
   const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(instant);const part=(name:string)=>parts.find(p=>p.type===name)!.value;
   return [{start:`${part('year')}-${part('month')}-${part('day')}`,time:`${part('hour')}:${part('minute')}`,version:version(options.find(o=>o.id===s.languagemediaoptionsid)?.label??'')}];
  });
  const result=event(cinemas[2],String(f.id),f.title,sessions,`https://cinema-cavalaire.fr/film.html#/media/${f.id}`,checked,f.posterpath,f.duration?Math.round(f.duration/60):undefined);return result?[result]:[];
 });
}
