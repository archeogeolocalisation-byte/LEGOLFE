import {validNewsDate,canonicalNewsUrl} from './localNewsCatalog';
import {createHash} from 'node:crypto';
import type {LocalFeedSource} from '../data/localFeedSources';
import {parisIsoDay} from './localCalendar';
export type LocalFeedItem={id:string;title:string;date:string;source:string;sourceKey:string;sourceLabel:string;location:string};
const entities:Record<string,string>={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};
function text(value:string){return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]*>/g,' ').replace(/&#(x[0-9a-f]+|[0-9]+);/gi,(_,code:string)=>{const n=code[0].toLowerCase()==='x'?parseInt(code.slice(1),16):Number(code);return n>0&&n<=0x10ffff?String.fromCodePoint(n):'';}).replace(/&(amp|lt|gt|quot|apos|nbsp);/g,(_,key:string)=>entities[key]??'').replace(/\s+/g,' ').trim();}
function field(item:string,key:string){return text(item.match(new RegExp('<'+key+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+key+'>','i'))?.[1]??'');}
/** Titles, publication dates and links only; never render provider HTML or expand XML entities. */
export function parseLocalRss(xml:string,source:Omit<LocalFeedSource,"format">,today=parisIsoDay()):LocalFeedItem[]{
 if(xml.length>2_000_000||/<!DOCTYPE|<!ENTITY/i.test(xml))return [];
 const found=new Map<string,LocalFeedItem>();
 for(const match of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)){
  const title=field(match[1],'title'),link=field(match[1],'link'),rawDate=field(match[1],'pubDate')||field(match[1],'dc:date');
  if(/^20\d{2}-\d{2}-\d{2}/.test(rawDate)&&!validNewsDate(rawDate.slice(0,10)))continue;
  const published=new Date(rawDate);if(!title||title.length>240||!rawDate||Number.isNaN(published.getTime()))continue;
  const date=parisIsoDay(published);if(date>today)continue;
  try{const url=new URL(link),origin=new URL(source.url);if(url.protocol!=='https:'||url.origin!==origin.origin||url.username||url.password||url.pathname==='/'||source.paths&&!source.paths.some(path=>url.pathname.startsWith(path)))continue;
   const key=canonicalNewsUrl(url.href);if(!key)continue;const previous=found.get(key);if(previous&&previous.date>=date)continue;found.set(key,{id:'rss-'+source.key+'-'+createHash('sha256').update(key).digest('hex').slice(0,16),title,date,source:key,sourceKey:source.key,sourceLabel:source.label,location:source.location});
  }catch{continue;}
 }
 return [...found.values()].sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id)).slice(0,20);
}
