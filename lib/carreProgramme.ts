import type {GolfeEvent,EventCategory} from '../data/events';
export const carreProgrammeUrl='https://billetterie-carresaintemaxime.mapado.com/';
const months:Record<string,string>={janv:'01',fevr:'02',mars:'03',avr:'04',mai:'05',juin:'06',juil:'07',aout:'08',sept:'09',oct:'10',nov:'11',dec:'12'};
const aliases:Record<string,string>={'759294':'boreale-carre','733149':'justina-lee-brown'};
function plain(value:string){value=value.replace(/&#x27;/g,"'");return value.replace(/<[^>]*>/g,' ').replace(/&(?:amp|nbsp|quot|apos|#39|#x27|lt|gt);/g,entity=>({'&amp;':'&','&nbsp;':' ','&quot;':'"','&apos;':"'",'&#39;':"'",'&lt;':'<','&gt;':'>'}[entity]??'')).replace(/\s+/g,' ').trim();}
export function parseCarreProgramme(html:string,checked:string):GolfeEvent[]{
 if(html.length>2_000_000)return [];
 const found=new Map<string,GolfeEvent>();
 for(const match of html.matchAll(/<a\b[^>]*href="\/event\/(\d{1,9}-[a-z0-9-]{1,180})"[^>]*>([\s\S]*?)<\/a>/g)){
  const [,slug,body]=match,title=plain(body.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1]??'');
  if(!title||title.length>240)continue;
  const dateText=plain([...body.matchAll(/<span\b[^>]*class="block"[^>]*>([\s\S]*?)<\/span>/g)].map(m=>m[1]).join(' ')).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const sessions=[...dateText.matchAll(/\b(\d{1,2})\s+(janv|fevr|mars|avr|mai|juin|juil|aout|sept|oct|nov|dec)\.?\s+(20\d{2})\s+a\s+(\d{1,2}:\d{2})\b/gi)].flatMap(m=>{
   const start=`${m[3]}-${months[m[2].toLowerCase()]}-${m[1].padStart(2,'0')}`,time=m[4].padStart(5,'0');
   const date=new Date(start+'T12:00:00Z');
   if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)||Number.isNaN(date.getTime())||date.toISOString().slice(0,10)!==start)return [];
   return [{start,time}];
  }).sort((a,b)=>a.start.localeCompare(b.start)||a.time.localeCompare(b.time));
  if(!sessions.length)continue;
  const imageSrc=plain(body.match(/<img\b[^>]*src="([^"]+)"/)?.[1]??'');
  const original=imageSrc.replace(/_thumbs\/.*$/,'');
  const imageUrl=original.startsWith('//')?'https:'+original:original;
  const officialImage=/^https:\/\/img\.mapado\.net\/[a-zA-Z0-9_./%-]+\.(?:jpe?g|png|webp)$/i.test(imageUrl)?imageUrl:undefined;
  const numericId=slug.split('-')[0],id=aliases[numericId]??`carre-${numericId}`;
  let category:EventCategory='culture';
  if(/JUSTINA|GREG ZLAP|MANOUKIAN|ABD AL MALIK|SOUAD MASSI/.test(title))category='music';
  if(/BOREALE|CHIFFONADE|CAMUS EST HIP HOP/.test(title))category='family';
  found.set(id,{id,officialImage,title,titleFr:title,start:sessions[0].start,time:sessions[0].time,sessions,location:'Sainte-Maxime',venue:'Le Carré Léon Gaumont',streetAddress:'107 Route du Plan de la Tour',postalCode:'83120',category,summary:'A performance in Le Carré’s official programme. See the venue for booking and current details.',summaryFr:'Un spectacle de la programmation officielle du Carré. Consultez le lieu pour réserver et confirmer les informations.',why:'A cultural stop to build into a Sainte-Maxime visit.',whyFr:'Une étape culturelle à intégrer à une journée à Sainte-Maxime.',source:carreProgrammeUrl+'event/'+slug,sourceLabel:'Le Carré · billetterie officielle',sourceCheckedAt:checked});
 }
 return [...found.values()].sort((a,b)=>a.start.localeCompare(b.start));
}

export function mergeCarreProgramme(base:GolfeEvent[],programme:GolfeEvent[]){
 const updates=new Map(programme.map(e=>[e.id,e]));
 const merged=base.map(e=>{const update=updates.get(e.id);if(!update)return e;updates.delete(e.id);return {...e,...update,title:e.title,titleFr:e.titleFr,summary:e.summary,summaryFr:e.summaryFr,why:e.why,whyFr:e.whyFr,category:e.category,featured:e.featured};});
 return [...merged,...updates.values()];
}
