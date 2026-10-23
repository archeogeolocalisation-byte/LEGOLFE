import {localFeedSources} from '../data/localFeedSources';
import {addDays} from './agendaCalendar';
import {parisIsoDay} from './localCalendar';
import {localFeedSnapshotChecked,localFeedSnapshot} from '../data/localFeedSnapshot';
import {parseLocalRss,type LocalFeedItem} from './localRss';
export type LocalFeed={key:string;label:string;url:string;location:string;items:LocalFeedItem[];fallback:boolean;mode:"rss"|"link";sourceUrl?:string};
// Public headline cards are a recent feed, while curated articles keep their permanent archives.
export function recentLocalHeadlines(items:LocalFeedItem[],today=parisIsoDay(),checked?:string){
 if(checked&&(checked>today||checked<addDays(today,-7)))return [];
 return items.filter(item=>item.date<=today&&item.date>=addDays(today,-90));
}
export async function getLocalFeeds(today=parisIsoDay()):Promise<LocalFeed[]>{
 return Promise.all(localFeedSources.map(async source=>{
  if(source.format==="link"||source.publicHeadlines===false)return {...source,items:[],fallback:false,mode:"link" as const,sourceUrl:source.sourceUrl??source.url};
  try{
   const response=await fetch(source.url,{next:{revalidate:21600},signal:AbortSignal.timeout(4000),redirect:'error',headers:{accept:'application/rss+xml,application/xml'}});
   if(!response.ok)throw new Error('Feed unavailable');
   const reader=response.body?.getReader();if(!reader)throw new Error('Empty feed');
   const chunks:Uint8Array[]=[];let size=0;
   for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>2_000_000){await reader.cancel();throw new Error('Feed too large');}chunks.push(value);}
   const items=parseLocalRss(Buffer.concat(chunks).toString('utf8'),source,today);
   if(!items.length)throw new Error('No valid headlines');
   return {...source,items:recentLocalHeadlines(items,today),fallback:false,mode:"rss" as const};
  }catch{return {...source,items:recentLocalHeadlines(localFeedSnapshot.filter(item=>item.sourceKey===source.key),today,localFeedSnapshotChecked),fallback:true,mode:"rss" as const};}
 }));
}
