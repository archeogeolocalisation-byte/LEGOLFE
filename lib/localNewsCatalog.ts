import type {LocalNewsItem} from '../data/localNews';
/** Remove only known tracking parameters; meaningful article queries remain distinct. */
export function canonicalNewsUrl(value:string):string|undefined {
 try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)return;
  u.hash='';for(const key of [...u.searchParams.keys()])if(/^utm_/i.test(key)||/^(fbclid|gclid|mc_cid|mc_eid)$/i.test(key))u.searchParams.delete(key);
  u.searchParams.sort();u.pathname=u.pathname.replace(/\/$/,'')||'/';return u.href;
 }catch{return;}
}
export function validNewsDate(date:string){if(!/^20\d{2}-\d{2}-\d{2}$/.test(date))return false;const d=new Date(date+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===date;}
export function validNewsMonth(month:string){return /^20\d{2}-(0[1-9]|1[0-2])$/.test(month);}
export function newsMonths(news:LocalNewsItem[]){return [...new Set(news.filter(n=>validNewsDate(n.date)).map(n=>n.date.slice(0,7)))].sort().reverse();}
export function newsForMonth(news:LocalNewsItem[],month:string){return validNewsMonth(month)?news.filter(n=>n.date.startsWith(month+'-')):[];}
export function newsMonthLabel(month:string,locale:string){return new Intl.DateTimeFormat(locale==='fr'?'fr-FR':'en-GB',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(month+'-01T12:00:00Z'));}
export function mergeLocalNews(approved:LocalNewsItem[],base:LocalNewsItem[],today:string){
 const seen=new Set<string>();
 return [...approved,...base].filter(item=>{if(!validNewsDate(item.date)||item.date>today)return false;const key=canonicalNewsUrl(item.source);if(!key)return false;
  if(seen.has(key))return false;seen.add(key);return true;
 }).sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
}
