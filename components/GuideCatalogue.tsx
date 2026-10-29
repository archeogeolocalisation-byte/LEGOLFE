'use client';
import {useState,type ReactNode} from 'react';
import {guideTopics,type GuideTopic} from '../lib/guideTopics';
export default function GuideCatalogue({items,fr}:{items:{slug:string;topics:GuideTopic[];card:ReactNode}[];fr:boolean}){
 const [topic,setTopic]=useState<GuideTopic|'all'>('all');
 const shown=items.filter(item=>topic==='all'||item.topics.includes(topic));
 const options=[{id:'all' as const,fr:'Tous les guides',en:'All guides'},...guideTopics].filter(option=>option.id==='all'||items.some(item=>item.topics.includes(option.id as GuideTopic)));
 return <div id="tous-les-guides" className="guide-catalogue">
  <div className="guide-library-heading"><div><p className="lg-kicker">{fr?'À CHACUN SON GOLFE':'FIND YOUR GOLFE'}</p><h2>{fr?'De quoi avez-vous envie ?':'What takes your fancy?'}</h2></div><p>{fr?'Choisissez une envie, puis préparez votre sortie.':'Choose an interest, then plan your outing.'}</p></div>
  <div className="guide-topic-filters" role="group" aria-label={fr?'Filtrer les guides par envie':'Filter guides by interest'}>{options.map(option=><button key={option.id} type="button" aria-pressed={topic===option.id} onClick={()=>setTopic(option.id)}>{fr?option.fr:option.en}<span>{option.id==='all'?items.length:items.filter(item=>item.topics.includes(option.id as GuideTopic)).length}</span></button>)}</div>
  <p className="guide-results" role="status" aria-live="polite">{shown.length} {fr?(shown.length===1?'guide pour votre prochaine sortie':'guides pour votre prochaine sortie'):(shown.length===1?'guide for your next outing':'guides for your next outing')}</p>
  <div className="guide-library-grid">{shown.map(item=><div key={item.slug}>{item.card}</div>)}</div>
 </div>;
}
