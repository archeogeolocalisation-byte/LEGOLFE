'use client';
import {useRef,useState,type PointerEvent} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {touristMapPlaces} from '../data/touristMap';
import {clampTouristView,touristMapPoint,touristMapTransform,touristViewForPoint,type TouristMapView} from '../lib/touristMap';
import type {Locale} from '../lib/i18n';
import styles from './TouristMap.module.css';

const positionedPlaces=touristMapPlaces.map(place=>({...place,point:touristMapPoint(place.latitude,place.longitude)}));
const overview:TouristMapView={zoom:1,panX:0,panY:0};
export default function TouristMap({locale}:{locale:Locale}){
 const fr=locale==='fr';
 const [selected,setSelected]=useState('grimaud'),[view,setView]=useState<TouristMapView>(overview),[dragging,setDragging]=useState(false);
 const drag=useRef<{pointerId:number;x:number;y:number;width:number;height:number;view:TouristMapView}|null>(null);
 const chosen=positionedPlaces.find(p=>p.id===selected)??positionedPlaces[0],copy=chosen.copy[locale];
 function select(id:string){const place=positionedPlaces.find(p=>p.id===id);if(!place)return;setSelected(id);setView(v=>touristViewForPoint(v.zoom,place.point));}
 function zoom(by:number){setView(v=>touristViewForPoint(v.zoom+by,chosen.point));}
 function startDrag(e:PointerEvent<HTMLDivElement>){
  if(view.zoom<=1||e.button!==0||(e.target as HTMLElement).closest('button,a,select'))return;
  const rect=e.currentTarget.getBoundingClientRect();drag.current={pointerId:e.pointerId,x:e.clientX,y:e.clientY,width:rect.width,height:rect.height,view};e.currentTarget.setPointerCapture(e.pointerId);setDragging(true);e.preventDefault();
 }
 function moveDrag(e:PointerEvent<HTMLDivElement>){const start=drag.current;if(!start||start.pointerId!==e.pointerId)return;setView(clampTouristView({...start.view,panX:start.view.panX+(e.clientX-start.x)/start.width*100,panY:start.view.panY+(e.clientY-start.y)/start.height*100}));}
 function endDrag(e:PointerEvent<HTMLDivElement>){if(drag.current?.pointerId!==e.pointerId)return;drag.current=null;setDragging(false);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}
 return <section className={styles.root} aria-label={fr?'Carte touristique du Golfe de Saint-Tropez':'Tourist map of the Golfe de Saint-Tropez'}>
  <div className={styles.heading}><div><p className={styles.kicker}>{fr?'Villages · Littoral · Paysages':'Villages · Coast · Landscapes'}</p><h2>{fr?'Le Golfe, autrement.':'Another view of the Golfe.'}</h2></div><div className={styles.picker}><label htmlFor="tourist-map-place">{fr?'Choisir un lieu':'Choose a place'}</label><select id="tourist-map-place" value={selected} onChange={e=>select(e.target.value)}>{touristMapPlaces.map(place=><option key={place.id} value={place.id}>{place.name}</option>)}</select></div></div>
  <div className={styles.stage}>
   <div className={styles.viewport} tabIndex={0} role="region" aria-label={fr?'Carte : zoomez pour la déplacer. Les flèches déplacent la vue lorsqu’elle est zoomée.':'Map: zoom in to move the view. Arrow keys move the view when zoomed.'} style={{touchAction:view.zoom>1?'none':'pan-y',cursor:view.zoom>1?(dragging?'grabbing':'grab'):undefined}} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={()=>{drag.current=null;setDragging(false);}} onKeyDown={e=>{
    if(e.target!==e.currentTarget||view.zoom<=1)return;const direction:Record<string,[number,number]>={ArrowLeft:[7,0],ArrowRight:[-7,0],ArrowUp:[0,7],ArrowDown:[0,-7]};const delta=direction[e.key];if(delta){e.preventDefault();setView(v=>clampTouristView({...v,panX:v.panX+delta[0],panY:v.panY+delta[1]}));}
   }}>
    <div className={styles.content} style={{transform:touristMapTransform(view)}}>
     <div className={styles.sea}/><Image className={styles.relief} src="/media/tourist-map/relief.webp" alt={fr?'Relief stylisé des Maures et littoral du Golfe de Saint-Tropez':'Stylised Maures relief and Golfe de Saint-Tropez coastline'} width={1000} height={763} sizes="(max-width: 1100px) 100vw, 1100px" preload draggable={false}/>
     <svg className={styles.marks} viewBox="0 0 1000 763" aria-hidden="true"><text className={styles.landName} x="135" y="88">{fr?'Massif des Maures':'Maures hills'}</text><text className={styles.seaName} x="620" y="296" transform="rotate(-8 620 296)">Golfe de Saint-Tropez</text><text className={styles.seaLabel} x="705" y="642">{fr?'MÉDITERRANÉE':'MEDITERRANEAN'}</text>{positionedPlaces.map(place=><g key={place.id}><path d={`M${place.point.x},${place.point.y} L${place.point.x+place.labelOffset[0]},${place.point.y+place.labelOffset[1]}`} className={styles.leader}/><circle cx={place.point.x} cy={place.point.y} r="5" className={styles.dot}/>{selected===place.id&&<circle cx={place.point.x} cy={place.point.y} r="12" className={styles.ring}/>}</g>)}</svg>
     {positionedPlaces.map(place=><button type="button" className={styles.label} key={place.id} aria-pressed={selected===place.id} aria-label={place.name} onClick={()=>select(place.id)} onFocus={e=>{if(view.zoom>1&&e.currentTarget.matches(':focus-visible'))setView(v=>touristViewForPoint(v.zoom,place.point));}} style={{left:`${(place.point.x+place.labelOffset[0])/10}%`,top:`${(place.point.y+place.labelOffset[1])/763*100}%`}}>{place.shortName}</button>)}
    </div>
   </div>
   <div className={styles.controls} aria-label={fr?'Commandes de la carte':'Map controls'}><button type="button" onClick={()=>zoom(-.5)} disabled={view.zoom<=1} aria-label={fr?'Dézoomer':'Zoom out'}>−</button><button type="button" onClick={()=>zoom(.5)} disabled={view.zoom>=2.5} aria-label={fr?'Zoomer':'Zoom in'}>+</button><button type="button" onClick={()=>setView(overview)}>{fr?'Vue d’ensemble':'Overview'}</button></div>
   <aside className={styles.detail} aria-live="polite" aria-atomic="true">
    {chosen.illustration&&<figure className={styles.detailFigure}><Image src={chosen.illustration} alt={fr?`Illustration de ${chosen.name} · LE GOLFE`:`Illustration of ${chosen.name} · LE GOLFE`} width={600} height={400} sizes="(max-width: 760px) 30vw, 260px"/><figcaption>{fr?'Illustration · LE GOLFE':'Illustration · LE GOLFE'}</figcaption></figure>}
    <div className={styles.detailText}><p className={styles.kicker}>{copy.kicker}</p><h3>{chosen.name}</h3><p className={styles.description}>{copy.description}</p>{chosen.path?<Link className={styles.action} href={`/${locale}${chosen.path}`}>{chosen.linkLabel?.[locale]??(fr?'Découvrir ce lieu':'Discover this place')} →</Link>:<a className={styles.action} href={chosen.externalUrl} target="_blank" rel="noopener noreferrer">{fr?'Informations touristiques':'Tourist information'} ↗</a>}<a className={styles.pointSource} href={chosen.source} target="_blank" rel="noopener noreferrer">{fr?'Source du repère':'Location reference source'} ↗</a></div>
   </aside>
  </div>
  <div className={styles.footer}><span>{fr?'Carte touristique · Relief et couleurs stylisés':'Tourist map · Stylised relief and colours'}</span><span>{fr?'Repères de découverte, pour préparer votre visite.':'Discovery references to help plan your visit.'} <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a></span></div>
  <details className={styles.sources}><summary>{fr?'Sources cartographiques et crédits':'Map sources and credits'}</summary><p>{fr?'Points : OpenStreetMap et offices de tourisme, consultés le 13 octobre 2026. Relief : Terrain Tiles / Mapzen, données européennes Copernicus financées par l’Union européenne (EU-DEM), données USGS (SRTM, GMTED2010) et NOAA (ETOPO1). Couleurs et ombrage adaptés par LE GOLFE. Illustrations créées pour LE GOLFE. Cette carte touristique ne sert pas à la navigation.':'Locations: OpenStreetMap and tourist offices, consulted on 13 October 2026. Relief: Terrain Tiles / Mapzen, European Copernicus data funded by the European Union (EU-DEM), USGS data (SRTM, GMTED2010) and NOAA data (ETOPO1). Colours and shading adapted by LE GOLFE. Illustrations created for LE GOLFE. This tourist map is not intended for navigation.'}</p><a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank" rel="noopener noreferrer">{fr?'Sources et licences des données de relief':'Relief data sources and licences'} ↗</a></details>
 </section>;
}
