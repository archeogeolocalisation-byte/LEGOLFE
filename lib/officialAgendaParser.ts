import type {GolfeEvent,EventCategory,EventSession} from '../data/events';
import type {OfficialAgendaSource} from '../data/officialAgendaSources';
import {eventParticipant} from './eventStructuredData';
import {addDays,isIsoDay} from './agendaCalendar';

import {agendaTowns as towns} from '../data/agendaTowns';

export function agendaPlain(value:string){return value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&#(x[0-9a-f]+|\d+);/gi,(_,s:string)=>{const n=s[0].toLowerCase()==='x'?parseInt(s.slice(1),16):Number(s);return n>0&&n<=0x10ffff?String.fromCodePoint(n):'';}).replace(/&(amp|quot|apos|nbsp|lt|gt);/g,(_,s:string)=>({amp:'&',quot:'"',apos:"'",nbsp:' ',lt:'<',gt:'>'}[s]??'')).replace(/\s+/g,' ').trim();}
function attr(tag:string,key:string){return tag.match(new RegExp('\\b'+key+'=["\']([^"\']*)["\']','i'))?.[1];}
function meta(html:string,key:string){for(const m of html.matchAll(/<meta\b[^>]*>/gi))if(attr(m[0],'itemprop')===key)return attr(m[0],'content');}
function prop(html:string,key:string){return agendaPlain(html.match(new RegExp('<(?:span|div)[^>]*itemprop=["\']'+key+'["\'][^>]*>([^<]*)<','i'))?.[1]??'');}
function jsonLd(html:string):Record<string,unknown>[] {const out:Record<string,unknown>[]=[];for(const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{const value=JSON.parse(m[1]);const list=Array.isArray(value)?value:[value,...(value['@graph']??[])];out.push(...list.filter(x=>x&&typeof x==='object'));}catch{continue;}}return out;}
export function officialDetailUrl(raw:string,source:OfficialAgendaSource){try{const u=new URL(raw.replaceAll('\\/','/'),source.url),base=new URL(source.url);if(u.origin!==base.origin||u.username||u.password||u.search||u.hash)return undefined;const allowed=source.format==='apidae'?/^\/fr\/animation\/[^/]+\/([^/]+)\/[^/]+-\d{5,10}\/$/.exec(u.pathname):/^\/agenda\/[a-z0-9-]+\/$/.exec(u.pathname);if(!allowed||source.format==='apidae'&&!towns[allowed[1]])return undefined;return u.href;}catch{return undefined;}}
export function officialAgendaDetailUrls(html:string,source:OfficialAgendaSource){
 if(html.length>2_000_000)return [];
 if(source.format==='iris')return [...new Set(jsonLd(html).filter(n=>n['@type']==='ItemList').flatMap(n=>Array.isArray(n.itemListElement)?n.itemListElement:[]).flatMap(item=>{const url=officialDetailUrl(String(item.url??''),source);return url?[url]:[]}))].slice(0,source.limit);
 const groups=new Map<string,string[]>();
 for(const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)){
  // Only one-day cards: a broad first/last period is not a daily recurrence.
  if(!m[2].includes('date-simple'))continue;const url=officialDetailUrl(m[1],source);if(!url)continue;
  const town=new URL(url).pathname.split('/')[4],group=groups.get(town)??[];if(!group.includes(url))group.push(url);groups.set(town,group);
 }
 const out:string[]=[];for(let i=0;out.length<source.limit;i++){const row=[...groups.values()].flatMap(group=>group[i]?[group[i]]:[]);if(!row.length)break;out.push(...row);}return out.slice(0,source.limit);
}
function category(title:string,path:string):EventCategory {const s=(title+' '+path).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();return /regate|voile|nautis/.test(s)?'sailing':/concert|musique|regg[ae]+|festival.*jazz/.test(s)?'music':/enfant|famille|halloween|pichoun/.test(s)?'family':/\/sports\/|randonnee|marche solidaire/.test(s)?'sport':/\/culture\/|formation|visite|exposition|theatre/.test(s)?'culture':'local';}
const weekdays=['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI'];
const validTime=(v:unknown):v is string=>typeof v==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(v);
export function parseOfficialAgendaDetail(html:string,url:string,source:OfficialAgendaSource,checked:string):GolfeEvent|undefined {
 if(html.length>2_000_000||!officialDetailUrl(url,source)||!isIsoDay(checked))return;
 const candidates=jsonLd(html).filter(n=>n['@type']==='Event');
 const structured=candidates.find(n=>n.url===url||n['@id']===url)??(candidates.length===1?candidates[0]:undefined);
 const organizer=eventParticipant(structured?.organizer);
 const performers=(Array.isArray(structured?.performer)?structured.performer:[structured?.performer]).flatMap(p=>{const valid=eventParticipant(p,true);return valid?[valid]:[];});
 const cancelled=/Cancelled|Postponed/.test(String(structured?.eventStatus??''));
 let title='',location='',streetAddress='',postalCode='',identifier='',sessions:EventSession[]=[];
 if(source.format==='apidae'){
  const main=html.match(/<main\b[^>]*itemtype=["']https?:\/\/schema.org\/Event["'][^>]*>([\s\S]*?)<\/main>/i)?.[1];if(!main)return;
  const start=meta(main,'startDate'),end=meta(main,'endDate');if(!start||!isIsoDay(start)||end&&end!==start)return;
  const opening=agendaPlain(main.match(/<span\b[^>]*class="category[^\"]*"[^>]*>([\s\S]*?)<\/span>/)?.[1]??'');
  if(!opening||/\b(du|tous|chaque|sauf)\b/i.test(opening))return;
  const months=['janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'];
  const normalized=opening.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const written=normalized.match(/\b(\d{1,2})\s+(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\s+(20\d{2})\b/);
  if(!written||`${written[3]}-${String(months.indexOf(written[2])+1).padStart(2,'0')}-${written[1].padStart(2,'0')}`!==start)return;
  const hour=opening.match(/(?:^|\s)(?:à|de)\s*(\d{1,2})h(\d{2})?\b/i),time=hour?hour[1].padStart(2,'0')+':'+(hour[2]??'00'):undefined;
  if(time&&!validTime(time))return;
  title=prop(main,'name');location=towns[new URL(url).pathname.split('/')[4]];streetAddress=prop(main,'streetAddress');postalCode=prop(main,'postalCode');identifier=new URL(url).pathname.match(/-(\d+)\/$/)![1];
  const range=opening.match(/\bde\s+\d{1,2}h(?:\d{2})?\s*[àa]\s*(\d{1,2})h(\d{2})?\b/i),endTime=range?range[1].padStart(2,'0')+':'+(range[2]??'00'):undefined;
  sessions=[{start,time,...(endTime&&validTime(endTime)?{endTime,...(time&&endTime<time?{end:addDays(start,1)}:{})}:{})}];
 }else{
  const raw=html.match(/var IRISCollectionTheme\s*=\s*(\{[\s\S]*?\});/)?.[1];if(!raw)return;
  let fields;try{fields=JSON.parse(raw).queriedObject?.wpetFields;}catch{return;}
  if(!fields||!Array.isArray(fields.periodes))return;
  if(!structured)return;
  title=agendaPlain(String(fields.nom??''));location='Rayol-Canadel-sur-Mer';streetAddress=agendaPlain(String(fields['adresse-1']??''));postalCode=String(fields['code-postal']??'');identifier=String(fields.identifiant??'');
  if(!/^\d{5,10}$/.test(identifier))return;
  for(const period of fields.periodes){
   const start=String(period.datedebut??'').slice(0,10),end=String(period.datefin??'').slice(0,10);if(!isIsoDay(start)||!isIsoDay(end)||end<start||end>addDays(start,366)||period.touslesans)continue;
   const days=Array.isArray(period.jour)?period.jour:[];
   if(start!==end&&!days.length)continue;
   for(let day=start;day<=end;day=addDays(day,1)){
    const weekday=weekdays[new Date(day+'T12:00:00Z').getUTCDay()];if(days.length&&!days.includes(weekday))continue;
    const hours=period.horaires?.[weekday];
    if(Array.isArray(hours)&&hours.length){for(const slot of hours){if(!slot.debut&&!slot.fin){sessions.push({start:day});continue;}if(validTime(slot.debut)&&(!slot.fin||validTime(slot.fin)))sessions.push({start:day,time:slot.debut,endTime:slot.fin||undefined});}}
    else sessions.push({start:day});
   }
  }
 }
 if(!title||title.length>240||!location||!sessions.length||sessions.length>800)return;
 sessions=[...new Map(sessions.map(s=>[[s.start,s.time??'',s.endTime??''].join('|'),s])).values()].sort((a,b)=>a.start.localeCompare(b.start)||(a.time??'').localeCompare(b.time??''));
 return {...(organizer?{organizer}:{}),...(performers.length?{performers}:{}),cancelled:cancelled||/annul[eé]|cancelled|canceled/i.test(title)||undefined,id:'apidae-'+identifier,title,titleFr:title,start:sessions[0].start,time:sessions[0].time,sessions,location,streetAddress:streetAddress||undefined,postalCode:postalCode||undefined,category:category(title,new URL(url).pathname),summary:'An event in the official local programme. Check the organiser’s page for details and booking.',summaryFr:'Un rendez-vous du programme local officiel. Consultez la fiche de l’organisateur pour le détail et les réservations.',why:'Combine this event with places in the same commune, allowing time for travel.',whyFr:'Complétez ce rendez-vous avec des lieux de la même commune, en prévoyant les déplacements.',source:url,sourceLabel:source.label,sourceCheckedAt:checked};
}
