import {localFeedSources} from '../data/localFeedSources';
import {localFeedSnapshot} from '../data/localFeedSnapshot';
import {parseLocalRss,type LocalFeedItem} from './localRss';
export type LocalFeed={key:string;label:string;url:string;location:string;items:LocalFeedItem[];fallback:boolean;mode:"rss"|"link";sourceUrl?:string};
export async function getLocalFeeds():Promise<LocalFeed[]>{
 return Promise.all(localFeedSources.map(async source=>{
  if(source.publicHeadlines===false)return {...source,items:[],fallback:false,mode:"link" as const};
  try{
   const response=await fetch(source.url,{next:{revalidate:21600},signal:AbortSignal.timeout(4000),redirect:'error',headers:{accept:'application/rss+xml,application/xml'}});
   if(!response.ok)throw new Error('Feed unavailable');
   const reader=response.body?.getReader();if(!reader)throw new Error('Empty feed');
   const chunks:Uint8Array[]=[];let size=0;
   for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>2_000_000){await reader.cancel();throw new Error('Feed too large');}chunks.push(value);}
   const items=parseLocalRss(Buffer.concat(chunks).toString('utf8'),source);
   if(!items.length)throw new Error('No valid headlines');
   return {...source,items,fallback:false,mode:"rss" as const};
  }catch{return {...source,items:localFeedSnapshot.filter(item=>item.sourceKey===source.key),fallback:true,mode:"rss" as const};}
 }));
}
