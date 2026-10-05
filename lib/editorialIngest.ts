import type { EditorialSource } from "../data/agendaSources";

type Candidate = {
  content_type: "event" | "news";
  source_key: string;
  source_label: string;
  external_url: string;
  fingerprint: string;
  title: string;
  title_fr?: string | null;
  summary?: string | null;
  summary_fr?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  event_time?: string | null;
  location?: string | null;
  venue?: string | null;
  category?: string | null;
  image_url?: string | null;
  raw: unknown;
};


const frMonths:Record<string,string>={janvier:"01",février:"02",fevrier:"02",mars:"03",avril:"04",mai:"05",juin:"06",juillet:"07",août:"08",aout:"08",septembre:"09",octobre:"10",novembre:"11",décembre:"12",decembre:"12"};
function dateFromText(v:string){
  const iso=v.match(/\b(20\d{2})[-\/](\d{1,2})[-\/](\d{1,2})\b/);
  if(iso)return `${iso[1]}-${iso[2].padStart(2,"0")}-${iso[3].padStart(2,"0")}`;
  const fr=v.toLowerCase().match(/\b(\d{1,2})\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)(?:\s+(20\d{2}))?/);
  if(fr)return `${fr[3]||new Date().getFullYear()}-${frMonths[fr[2]]}-${fr[1].padStart(2,"0")}`;
  const compact=v.match(/\b(\d{1,2})[.\/](\d{1,2})[.\/](20\d{2})\b/);
  if(compact)return `${compact[3]}-${compact[2].padStart(2,"0")}-${compact[1].padStart(2,"0")}`;
  return null;
}
function absoluteUrl(href:string,base:string){try{return new URL(href,base).toString()}catch{return base}}
function fallbackAnchors(html:string,source:EditorialSource):Candidate[]{
  const out:Candidate[]=[];
  const re=/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m:RegExpExecArray|null;
  while((m=re.exec(html))){
    const title=strip(m[2]); if(!title||title.length<4||title.length>140)continue;
    const around=strip(html.slice(Math.max(0,m.index-260),Math.min(html.length,re.lastIndex+180)))||"";
    const date=dateFromText(around); if(!date)continue;
    const url=absoluteUrl(m[1],source.url);
    if(!url.startsWith("http"))continue;
    const content_type: "event"|"news" = source.type==="news"?"news":"event";
    out.push({
      content_type,source_key:source.key,source_label:source.label,external_url:url,
      fingerprint:fp(source.key,url,title,date),title,title_fr:title,summary:null,summary_fr:null,
      start_date:date,location:source.location,category:content_type==="event"?"local":"around",raw:{fallback:true,context:around}
    });
  }
  return [...new Map(out.map(x=>[x.fingerprint,x])).values()].slice(0,80);
}
function decode(s:string){
  return s.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g," ");
}
function strip(s?:string|null){
  if(!s)return null;
  return decode(s.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()).slice(0,1200);
}
function arr<T>(v:T|T[]|undefined|null):T[]{return v==null?[]:Array.isArray(v)?v:[v]}
function walk(node:any,out:any[]=[]):any[]{
  if(!node)return out;
  if(Array.isArray(node)){node.forEach(n=>walk(n,out));return out;}
  if(typeof node==="object"){
    if(node["@type"])out.push(node);
    Object.values(node).forEach(v=>{if(typeof v==="object")walk(v,out)});
  }
  return out;
}
function jsonLd(html:string){
  const blocks=[...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const all:any[]=[];
  for(const b of blocks){try{walk(JSON.parse(b[1]),all)}catch{}}
  return all;
}
function typeHas(item:any,t:string){return arr(item?.["@type"]).some(x=>String(x).toLowerCase()===t.toLowerCase())}
function dateOnly(v?:string|null){if(!v)return null;const m=String(v).match(/^\d{4}-\d{2}-\d{2}/);return m?.[0]||null}
function timeOnly(v?:string|null){if(!v)return null;const m=String(v).match(/T(\d{2}:\d{2})/);return m?.[1]||null}
function imageOf(v:any){const i=Array.isArray(v)?v[0]:v;return typeof i==="string"?i:(i?.url||i?.contentUrl||null)}
function locationOf(item:any, fallback:string){
  const loc=Array.isArray(item.location)?item.location[0]:item.location;
  return strip(loc?.address?.addressLocality || loc?.name || fallback) || fallback;
}
function venueOf(item:any){
  const loc=Array.isArray(item.location)?item.location[0]:item.location;
  return strip(loc?.name);
}
function urlOf(item:any,source:EditorialSource){return item.url || item.mainEntityOfPage?.["@id"] || source.url}
function fp(source:string,url:string,title:string,date:string|null){
  return `${source}|${url}|${title}|${date||""}`.toLowerCase().replace(/\s+/g," ").slice(0,900);
}

export async function fetchSourceCandidates(source:EditorialSource):Promise<Candidate[]>{
  const res=await fetch(source.url,{headers:{"user-agent":"LE-GOLFE/1.0 (+editorial-monitor)","accept":"text/html,application/xhtml+xml"},cache:"no-store"});
  if(!res.ok)throw new Error(`${source.label}: HTTP ${res.status}`);
  const html=await res.text();
  const nodes=jsonLd(html);
  const out:Candidate[]=[];
  for(const item of nodes){
    const isEvent=typeHas(item,"Event");
    const isNews=typeHas(item,"NewsArticle")||typeHas(item,"Article");
    if(isEvent && source.type!=="news"){
      const title=strip(item.name); if(!title)continue;
      const start=dateOnly(item.startDate);
      const url=urlOf(item,source);
      out.push({
        content_type:"event",source_key:source.key,source_label:source.label,external_url:url,
        fingerprint:fp(source.key,url,title,start),title,title_fr:title,
        summary:strip(item.description),summary_fr:strip(item.description),
        start_date:start,end_date:dateOnly(item.endDate),event_time:timeOnly(item.startDate),
        location:locationOf(item,source.location),venue:venueOf(item),image_url:imageOf(item.image),
        category:"local",raw:item
      });
    }
    if(isNews && source.type!=="event"){
      const title=strip(item.headline||item.name); if(!title)continue;
      const date=dateOnly(item.datePublished||item.dateModified);
      const url=urlOf(item,source);
      out.push({
        content_type:"news",source_key:source.key,source_label:source.label,external_url:url,
        fingerprint:fp(source.key,url,title,date),title,title_fr:title,
        summary:strip(item.description),summary_fr:strip(item.description),
        start_date:date,location:source.location,image_url:imageOf(item.image),
        category:"around",raw:item
      });
    }
  }
  const normalized=[...new Map(out.map(x=>[x.fingerprint,x])).values()];
  if(normalized.length>0)return normalized;
  return fallbackAnchors(html,source);
}
