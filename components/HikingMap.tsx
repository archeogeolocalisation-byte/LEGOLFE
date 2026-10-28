'use client';
import {useEffect,useRef,useState} from 'react';
import {mapPointPixels} from '../lib/villaMapLocation';
import {hikingMapFrame,type HikingPoint} from '../lib/hikingTrack';
import type {Locale} from '../lib/i18n';
import styles from './SanPeireRoutes.module.css';

export default function HikingMap({index,locale,points:coordinates,label}:{index:number;locale:Locale;points:readonly HikingPoint[];label:string}){
 const fr=locale==='fr',route={points:coordinates},container=useRef<HTMLDivElement>(null);
 const [width,setWidth]=useState(800),[view,setView]=useState({zoomOffset:0,dx:0,dy:0}),[failed,setFailed]=useState(false);
 useEffect(()=>{const node=container.current;if(!node)return;const measure=()=>{const w=Math.round(node.getBoundingClientRect().width);if(w>0)setWidth(w);};measure();if(typeof ResizeObserver==='undefined')return;const observer=new ResizeObserver(measure);observer.observe(node);return()=>observer.disconnect();},[]);
 const height=width<640?300:480,initial=hikingMapFrame(width,height,route.points),zoomLevel=Math.max(10,Math.min(16,initial.zoom+view.zoomOffset));
 const scale=2**(zoomLevel-initial.zoom),left=initial.center.x*scale-width/2+view.dx,top=initial.center.y*scale-height/2+view.dy;
 const points=route.points.map(p=>mapPointPixels(p.lat,p.lon,zoomLevel)),selected=points[index],first=points[0],last=points[route.points.reduce((best,p,i,rows)=>p.elevation>rows[best].elevation?i:best,0)]!;
 const tiles=[];
 for(let y=Math.floor(top/256);y<=Math.floor((top+height)/256);y++)for(let x=Math.floor(left/256);x<=Math.floor((left+width)/256);x++){const url=(process.env.NEXT_PUBLIC_MAP_TILE_URL||'https://tile.openstreetmap.org/{z}/{x}/{y}.png').replace('{z}',String(zoomLevel)).replace('{x}',String(x)).replace('{y}',String(y));tiles.push({x:x*256-left,y:y*256-top,url});}
 function zoom(by:number){setFailed(false);setView(v=>({...v,zoomOffset:Math.max(-1,Math.min(16-initial.zoom,v.zoomOffset+by)),dx:v.dx*2**by,dy:v.dy*2**by}));}
 return <div ref={container} className={styles.map}><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}><rect width={width} height={height} fill="#e0edf0"/>{tiles.map(tile=><image key={tile.url} href={tile.url} x={tile.x} y={tile.y} width="256" height="256" onError={()=>setFailed(true)}/>)}<><polyline points={points.map(p=>`${p.x-left},${p.y-top}`).join(' ')} fill="none" stroke="white" strokeWidth="8" strokeLinejoin="round"/><polyline points={points.map(p=>`${p.x-left},${p.y-top}`).join(' ')} fill="none" stroke="#075f91" strokeWidth="4" strokeLinejoin="round"/></><circle cx={first.x-left} cy={first.y-top} r="10" fill="#246452" stroke="white" strokeWidth="3"/><><circle cx={last.x-left} cy={last.y-top} r="10" fill="#0b3046" stroke="white" strokeWidth="3"/><circle cx={selected.x-left} cy={selected.y-top} r="6" fill="white" stroke="#075f91" strokeWidth="3"/></></svg>
  <div className={styles.controls}><button type="button" disabled={zoomLevel>=16} onClick={()=>zoom(1)} aria-label={fr?'Zoomer':'Zoom in'}>+</button><button type="button" disabled={zoomLevel<=initial.zoom-1} onClick={()=>zoom(-1)} aria-label={fr?'Dézoomer':'Zoom out'}>−</button><button type="button" onClick={()=>{setView({zoomOffset:0,dx:0,dy:0});setFailed(false);}} aria-label={fr?'Recentrer le parcours':'Fit the route'}>↺</button></div>
  <div className={styles.mapFooter}><div>{[['←',-150,0,fr?'Ouest':'West'],['↑',0,-100,fr?'Nord':'North'],['↓',0,100,fr?'Sud':'South'],['→',150,0,fr?'Est':'East']].map(([icon,dx,dy,label])=><button type="button" key={icon} aria-label={String(label)} onClick={()=>setView(v=>({...v,dx:v.dx+Number(dx),dy:v.dy+Number(dy)}))}>{icon}</button>)}</div><span>{fr?'● Départ · ● Point haut':'● Start · ● High point'}</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a></div>{failed&&<p role="status" className={styles.note}>{fr?'Le fond de carte est indisponible. Réessayez avec le bouton Recentrer ou consultez le document source.':'Map tiles are unavailable. Retry with Fit the route or open the source document.'}</p>}
 </div>;
}
