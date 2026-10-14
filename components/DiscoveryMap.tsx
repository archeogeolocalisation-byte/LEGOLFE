'use client';
import Link from 'next/link';
import {useCallback,useEffect,useMemo,useRef,useState,type PointerEvent,type WheelEvent} from 'react';
import type {Locale} from '../lib/i18n';

export type DiscoveryMapPlace={id:string;name:string;category:string;location:string;lat:number;lon:number;kind:'area'|'venue'};
const TILE=256;
const initial={lat:43.245,lon:6.563,zoom:11};
const clamp=(n:number,min:number,max:number)=>Math.min(max,Math.max(min,n));
function world(lat:number,lon:number,zoom:number){
 const scale=TILE*2**zoom;
 const x=(lon+180)/360*scale;
 const sin=Math.sin(clamp(lat,-85.0511,85.0511)*Math.PI/180);
 const y=(.5-Math.log((1+sin)/(1-sin))/(4*Math.PI))*scale;
 return {x,y};
}
function fromWorld(x:number,y:number,zoom:number){
 const scale=TILE*2**zoom;
 const lon=(x/scale)*360-180;
 const lat=Math.atan(Math.sinh(Math.PI*(1-2*y/scale)))*180/Math.PI;
 return {lat:clamp(lat,-85,85),lon:clamp(lon,-180,180)};
}
const types=['all','eat','beach','do','sea','party','wellness','services','places'] as const;
const labels:Record<string,[string,string]>={
 all:['Toutes les fiches','All places'],eat:['Restaurants','Restaurants'],beach:['Plages','Beaches'],do:['À faire','Things to do'],sea:['Mer & bateaux','Sea & boats'],party:['Sortir','Nightlife'],wellness:['Bien-être','Wellness'],services:['Services','Services'],places:['Villages','Villages']};
export default function DiscoveryMap({locale,places}:{locale:Locale;places:DiscoveryMapPlace[]}){
 const fr=locale==='fr';
 const [base,setBase]=useState<'road'|'satellite'>('road');
 const [map,setMap]=useState(initial);
 const [category,setCategory]=useState('all');
 const [selected,setSelected]=useState<string|null>(null);
 const [size,setSize]=useState({w:1000,h:520});
 const root=useRef<HTMLDivElement|null>(null);
 const drag=useRef<{id:number;x:number;y:number;startX:number;startY:number;zoom:number;moved:boolean}|null>(null);
 const suppressClick=useRef(false);
 useEffect(()=>{
  const node=root.current;if(!node)return;
  const update=()=>{const rect=node.getBoundingClientRect();if(rect.width>0)setSize({w:rect.width,h:rect.height});};
  update();const observer=new ResizeObserver(update);observer.observe(node);return()=>observer.disconnect();
 },[]);
 const center=world(map.lat,map.lon,map.zoom);
 const visible=useMemo(()=>places.filter(p=>category==='all'||p.category===category),[places,category]);
 const tiles=useMemo(()=>{
  const count=2**map.zoom;
  const startX=Math.floor((center.x-size.w/2)/TILE)-1,endX=Math.ceil((center.x+size.w/2)/TILE)+1;
  const startY=Math.max(0,Math.floor((center.y-size.h/2)/TILE)-1),endY=Math.min(count-1,Math.ceil((center.y+size.h/2)/TILE)+1);
  const list:{x:number;y:number;left:number;top:number;url:string}[]=[];
  for(let y=startY;y<=endY;y++)for(let x=startX;x<=endX;x++){
   const wrapped=((x%count)+count)%count;
   const url=base==='road'? `https://tile.openstreetmap.org/${map.zoom}/${wrapped}/${y}.png`:`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${map.zoom}/${y}/${wrapped}`;
   list.push({x,y,left:x*TILE-center.x+size.w/2,top:y*TILE-center.y+size.h/2,url});
  }
  return list;
 },[base,map.zoom,center.x,center.y,size.w,size.h]);
 const focus=(p:DiscoveryMapPlace)=>{
  setMap(v=>({...v,lat:p.lat,lon:p.lon,zoom:Math.max(v.zoom,12)}));setSelected(p.id);
 };
 const changeZoom=(next:number)=>{
  setMap(v=>({...v,zoom:clamp(next,9,16)}));
 };
 function start(e:PointerEvent<HTMLDivElement>){
  if(e.button!==0||(e.target as HTMLElement).closest('button,a,select'))return;
  const origin=world(map.lat,map.lon,map.zoom);
  drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,startX:origin.x,startY:origin.y,zoom:map.zoom,moved:false};
  e.currentTarget.setPointerCapture(e.pointerId);
 }
 function move(e:PointerEvent<HTMLDivElement>){
  const d=drag.current;if(!d||d.id!==e.pointerId)return;
  const dx=e.clientX-d.x,dy=e.clientY-d.y;
  if(Math.abs(dx)+Math.abs(dy)>4)d.moved=true;
  const coords=fromWorld(d.startX-dx,d.startY-dy,d.zoom);
  setMap(v=>({...v,...coords}));
 }
 function end(e:PointerEvent<HTMLDivElement>){
  if(drag.current?.id!==e.pointerId)return;
  suppressClick.current=!!drag.current.moved;
  drag.current=null;
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
 }
 function wheel(e:WheelEvent<HTMLDivElement>){
  if(!e.ctrlKey)return;
  e.preventDefault();changeZoom(map.zoom+(e.deltaY<0?1:-1));
 }
 const chosen=places.find(p=>p.id===selected&&visible.includes(p))||null;
 return <section className="mt-14 border-t border-black/20 pt-10" aria-label={fr?'Carte interactive des adresses du Golfe':'Interactive map of Golfe places'}>
  <div className="flex flex-wrap items-end justify-between gap-5">
   <div><p className="lg-kicker text-[var(--lg-blue)]">{fr?'LE GOLFE SUR LA CARTE':'THE GOLFE ON THE MAP'}</p>
    <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">{fr?'Les bonnes adresses, au bon endroit.':'Places worth finding.'}</h2>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-black/65">{fr?'Déplacez la carte ou choisissez une catégorie. Seules les fiches disposant d’un repère géographique vérifié sont affichées.':'Pan the map or filter by category. Only places with a verified geographic reference appear.'}</p>
   </div>
   <div className="flex border border-black/30 text-xs font-black uppercase" role="group" aria-label={fr?'Fond cartographique':'Map style'}>
    <button type="button" aria-pressed={base==='road'} className={`px-4 py-3 ${base==='road'?'bg-[#0B4F6C] text-white':'bg-white'}`} onClick={()=>setBase('road')}>{fr?'Plan':'Map'}</button>
    <button type="button" aria-pressed={base==='satellite'} className={`border-l border-black/20 px-4 py-3 ${base==='satellite'?'bg-[#0B4F6C] text-white':'bg-white'}`} onClick={()=>setBase('satellite')}>Satellite</button>
   </div>
  </div>
  <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={fr?'Filtrer les fiches':'Filter places'}>
   {types.filter(type=>type==='all'||places.some(p=>p.category===type)).map(type=><button key={type} type="button" aria-pressed={category===type} onClick={()=>{setCategory(type);setSelected(null)}} className={`border px-3 py-2 text-[10px] font-black uppercase tracking-wider ${category===type?'border-[#0B4F6C] bg-[#0B4F6C] text-white':'border-black/20 bg-white hover:border-[#0B4F6C]'}`}>{labels[type][fr?0:1]}</button>)}
  </div>
  <div className="mt-4 overflow-hidden border border-black/20 bg-[#dde9e6]">
   <div ref={root} role="region" aria-label={fr?'Carte déplaçable, utiliser les boutons plus et moins pour zoomer':'Pannable map, use plus and minus to zoom'} className="relative h-[410px] cursor-grab touch-none overflow-hidden active:cursor-grabbing sm:h-[530px]" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onWheel={wheel} onClick={()=>{if(suppressClick.current){suppressClick.current=false;return;}setSelected(null)}}>
    {tiles.map(tile=><img key={`${base}-${map.zoom}-${tile.x}-${tile.y}`} src={tile.url} alt="" draggable={false} aria-hidden="true" className="pointer-events-none absolute max-w-none select-none" style={{left:tile.left,top:tile.top,width:TILE,height:TILE}}/>)}
    {visible.map(p=>{const pt=world(p.lat,p.lon,map.zoom);const left=pt.x-center.x+size.w/2,top=pt.y-center.y+size.h/2;
      if(left< -20||top< -20||left>size.w+20||top>size.h+20)return null;
      const active=selected===p.id;
      return <button key={p.id} type="button" onPointerDown={e=>e.stopPropagation()} onClick={e=>{e.stopPropagation();setSelected(p.id)}} title={p.name} aria-label={`${p.name}, ${p.location}`} aria-pressed={active} className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border-2 border-white text-sm font-black shadow-md transition-transform hover:scale-125 focus-visible:outline-4 focus-visible:outline-[#0B4F6C] ${active?'scale-125 bg-[#071D2B] text-white':'bg-[#0B4F6C] text-white'}`} style={{left,top}}><span className="sr-only">{p.name}</span><span aria-hidden="true">{p.category==='eat'?'●':p.category==='beach'?'≈':p.category==='party'?'♫':'•'}</span></button>;
    })}
    <div className="absolute right-3 top-3 z-20 flex flex-col overflow-hidden border border-black/20 bg-white shadow" role="group" aria-label={fr?'Zoom de la carte':'Map zoom'}>
     <button type="button" className="h-11 w-11 text-2xl font-black hover:bg-neutral-100" disabled={map.zoom>=16} onClick={()=>changeZoom(map.zoom+1)} aria-label={fr?'Zoomer':'Zoom in'}>+</button>
     <button type="button" className="h-11 w-11 border-t border-black/20 text-2xl font-black hover:bg-neutral-100" disabled={map.zoom<=9} onClick={()=>changeZoom(map.zoom-1)} aria-label={fr?'Dézoomer':'Zoom out'}>−</button>
     <button type="button" className="h-11 w-11 border-t border-black/20 text-lg font-black hover:bg-neutral-100" onClick={()=>{setMap(initial);setSelected(null)}} aria-label={fr?'Recentrer sur le Golfe':'Reset map center'}>⌖</button>
    </div>
    <div className="absolute bottom-2 left-2 z-20 bg-white/90 px-2 py-1 text-[9px] font-semibold">{base==='road'?<>© <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer" target="_blank" className="underline">OpenStreetMap</a> contributors</>:<>Imagery © Esri, Maxar, Earthstar Geographics and the GIS User Community</>}</div>
   </div>
   <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/15 bg-white px-4 py-3 text-xs">
    <p role="status" className="font-bold">{visible.length} {fr?'fiches géolocalisées':'mapped places'}</p>
    <p className="text-black/55">{fr?'Zoom avec + / − ; glisser pour déplacer.':'Zoom with + / −; drag to pan.'}</p>
   </div>
   {chosen&&<div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/20 bg-[#f4f0e7] px-5 py-5" aria-live="polite">
    <div><p className="text-[10px] font-black uppercase tracking-[.13em] text-[#0B4F6C]">{labels[chosen.category]?.[fr?0:1]||chosen.category} · {chosen.kind==='area'?(fr?'Repère de secteur':'Area marker'):chosen.location}</p><h3 className="mt-2 text-xl font-black">{chosen.name}</h3><p className="mt-1 text-sm text-black/60">{chosen.location}</p></div>
    <div className="flex flex-wrap gap-2"><Link href={`/${locale}/place/${encodeURIComponent(chosen.id)}`} className="lg-btn lg-btn--dark">{fr?'Voir la fiche':'View place'} ↗</Link><button type="button" onClick={()=>focus(chosen)} className="lg-btn">{fr?'Recentrer':'Center here'}</button></div>
   </div>}
  </div>
  <p className="mt-3 text-xs leading-6 text-black/55">{fr?'Les repères de secteur ne constituent pas un point d’entrée ni une adresse de stationnement. Vérifiez l’itinéraire depuis la fiche.':'Area references are not guaranteed entrances or parking locations. Check directions on each place page.'}</p>
 </section>;
}
