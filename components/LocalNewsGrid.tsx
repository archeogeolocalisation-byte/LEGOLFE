"use client";
import {useState} from 'react';
import type {LocalNewsItem,LocalNewsKind} from '../data/localNews';
import {mediaForLocal} from '../lib/localMedia';
import styles from './LocalJournal.module.css';
const labels:Record<LocalNewsKind,{fr:string;en:string}>={need:{fr:'À savoir',en:'Need to know'},new:{fr:'Du nouveau',en:'What’s new'},around:{fr:'Vie du Golfe',en:'Around the Golfe'}};
export default function LocalNewsGrid({news,locale,archive=false}:{news:LocalNewsItem[];locale:'fr'|'en';archive?:boolean}){
 const fr=locale==='fr';const [kind,setKind]=useState<'all'|LocalNewsKind>('all');const [location,setLocation]=useState('all');
 const filtered=news.filter(n=>(kind==='all'||n.kind===kind)&&(location==='all'||n.location===location));
 const ordered=archive?filtered:[...filtered.filter(n=>n.featured),...filtered.filter(n=>!n.featured)];
 const date=(value:string)=>new Intl.DateTimeFormat(fr?'fr-FR':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value+'T12:00:00Z'));
 return <section className={styles.journal} aria-labelledby="local-selection">
  <div className={styles.sectionHead}><div><p className="lg-kicker">{archive?(fr?'L’ÉDITION CONSERVÉE':'THE SAVED EDITION'):(fr?'LA SÉLECTION LE GOLFE':'LE GOLFE’S SELECTION')}</p><h2 id="local-selection">{fr?'Quelques nouvelles à savoir.':'A few things worth knowing.'}</h2></div><p aria-live="polite">{ordered.length} {fr?'nouvelles':'stories'}</p></div>
  <div className={styles.filters}><div className={styles.tabs} role="group" aria-label={fr?'Type d’actualité':'News category'}>{(['all','need','new','around'] as const).map(key=><button key={key} type="button" aria-pressed={kind===key} onClick={()=>setKind(key)}>{key==='all'?(fr?'Toutes':'All'):labels[key][locale]}</button>)}</div><label>{fr?'Commune':'Place'}<select value={location} onChange={e=>setLocation(e.target.value)}><option value="all">{fr?'Tout le Golfe':'All the Golfe'}</option>{[...new Set(news.map(n=>n.location))].sort().map(place=><option key={place}>{place}</option>)}</select></label></div>
  {ordered.length?<div className={styles.mosaic}>{ordered.map((n,index)=>{const image=mediaForLocal(n.id,n.location),illustrated=index===0||index%3===2;return <article id={n.id} key={n.id} data-local-news={n.id} className={`${styles.card} ${index===0?styles.lead:''} ${index%5===1?styles.navy:index%5===3?styles.sky:''}`}>
   {illustrated&&<div className={styles.visual}><img src={image.src} alt={image.alt} loading="lazy"/><span>{image.kind==='illustration'?(fr?'Illustration de contexte':'Context illustration'):(fr?'Photo de contexte':'Context photo')}</span></div>}
   <div className={styles.copy}><div className={styles.meta}><span>{labels[n.kind][locale]}</span><time dateTime={n.date}>{date(n.date)}</time></div><h3>{fr?n.titleFr:n.title}</h3><p className={styles.summary}>{fr?n.summaryFr:n.summary}</p><p className={styles.why}>{fr?n.whyFr:n.why}</p><div className={styles.cardFoot}><span>{n.location}</span><a href={n.source} target="_blank" rel="noopener noreferrer">{fr?'Lire la source':'Read the source'} ↗<span className="sr-only"> · {n.sourceLabel}</span></a></div><p className={styles.source}>{n.sourceLabel}</p>{illustrated&&<p className={styles.credit}>{image.credit} · {image.license}</p>}</div>
  </article>;})}</div>:<p className={styles.empty}>{fr?'Aucune nouvelle dans cette sélection. Essayez une autre commune ou catégorie.':'No stories in this selection. Try another place or category.'}</p>}
 </section>;
}
