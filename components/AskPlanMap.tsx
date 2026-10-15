"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import type {Locale} from "../lib/i18n";
import type {AskPlanMarker} from "../lib/askPlanMap";
import {pointMapUrl} from "../lib/placeMapLinks";

const TILE=256;
const initial={lat:43.245,lon:6.563,zoom:11};
function project(lat:number,lon:number,zoom:number){
 const n=TILE*2**zoom;
 const safe=Math.max(-85,Math.min(85,lat));
 const x=(lon+180)/360*n;
 const sin=Math.sin(safe*Math.PI/180);
 const y=(.5-Math.log((1+sin)/(1-sin))/(4*Math.PI))*n;
 return {x,y};
}
export default function AskPlanMap({markers,total,locale}:{markers:AskPlanMarker[];total:number;locale:Locale}){
 const fr=locale==="fr";
 const [focus,setFocus]=useState<{lat:number;lon:number;zoom:number}>(initial);
 const [selected,setSelected]=useState<string|null>(null);
 const center=project(focus.lat,focus.lon,focus.zoom);
 const width=1000,height=470;
 const tiles=useMemo(()=>{
  const output:{x:number;y:number;url:string;left:number;top:number}[]=[];
  const count=2**focus.zoom;
  const startX=Math.floor((center.x-width/2)/TILE)-1,endX=Math.ceil((center.x+width/2)/TILE)+1;
  const startY=Math.max(0,Math.floor((center.y-height/2)/TILE)-1),endY=Math.min(count-1,Math.ceil((center.y+height/2)/TILE)+1);
  for(let y=startY;y<=endY;y++)for(let x=startX;x<=endX;x++){
   output.push({x,y,url:`https://tile.openstreetmap.org/${focus.zoom}/${((x%count)+count)%count}/${y}.png`,left:x*TILE-center.x+width/2,top:y*TILE-center.y+height/2});
  }
  return output;
 },[center.x,center.y,focus.zoom]);
 const selectedMarker=markers.find(m=>m.id===selected)??null;
 const choose=(m:AskPlanMarker)=>{setSelected(m.id);setFocus({lat:m.point.latitude,lon:m.point.longitude,zoom:Math.max(12,focus.zoom)});};
 return <section className="mt-7 border border-white/30 bg-[#102c3b] p-4 md:p-6" aria-label={fr?"Carte des étapes du programme":"Map of planned stops"}>
  <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="lg-kicker text-[#b9e9f4]">{fr?"VOS ÉTAPES SUR LA CARTE":"YOUR STOPS ON THE MAP"}</p><p className="mt-2 text-sm font-semibold text-white/70">{markers.length} / {total} {fr?"étapes avec repère géographique sourcé":"stops with sourced map references"}</p></div>
  {markers.length>0&&<button type="button" onClick={()=>{setFocus(initial);setSelected(null)}} className="border border-white/40 px-3 py-2 text-xs font-bold text-white hover:bg-white/15">{fr?"Vue du Golfe":"Golfe overview"}</button>}</div>
  {markers.length>0?<div className="mt-5">
    <div className="relative mx-auto aspect-[1000/470] w-full overflow-hidden bg-[#dce6e6]" role="group" aria-label={fr?"Carte de repères sélectionnables":"Map with selectable pins"}>
      <div className="absolute left-0 top-0 h-full w-full" style={{containerType:"inline-size"}}>
        <div className="absolute left-1/2 top-1/2" style={{width:1000,height:470,transform:"translate(-50%,-50%) scale(min(1, 1))",transformOrigin:"center"}}>
          {tiles.map(tile=><img key={`${focus.zoom}-${tile.x}-${tile.y}`} src={tile.url} alt="" aria-hidden="true" draggable={false} className="pointer-events-none absolute max-w-none select-none" style={{left:tile.left,top:tile.top,width:TILE,height:TILE}}/>)}
          {markers.map(m=>{
            const xy=project(m.point.latitude,m.point.longitude,focus.zoom);
            const left=xy.x-center.x+width/2,top=xy.y-center.y+height/2;
            if(left<0||left>width||top<0||top>height)return null;
            return <button type="button" key={m.id} onClick={()=>choose(m)} title={m.name} aria-label={`${m.order}. ${m.name}`} aria-pressed={selected===m.id}
              className={`absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border-2 border-white text-sm font-black shadow-lg focus-visible:outline-4 focus-visible:outline-[#0B4F6C] ${selected===m.id?"bg-[#071D2B] text-white":"bg-[#0B4F6C] text-white"}`} style={{left,top}}>{m.order}</button>;
          })}
        </div>
      </div>
      <div className="absolute right-3 top-3 z-20 flex flex-col border border-black/20 bg-white text-black"><button type="button" onClick={()=>setFocus(v=>({...v,zoom:Math.min(14,v.zoom+1)}))} disabled={focus.zoom>=14} aria-label={fr?"Zoomer":"Zoom in"} className="h-10 w-10 text-xl font-bold disabled:opacity-40">+</button><button type="button" onClick={()=>setFocus(v=>({...v,zoom:Math.max(9,v.zoom-1)}))} disabled={focus.zoom<=9} aria-label={fr?"Dézoomer":"Zoom out"} className="h-10 w-10 border-t border-black/20 text-xl font-bold disabled:opacity-40">−</button></div>
      <div className="absolute bottom-2 left-2 z-20 bg-white/90 px-2 py-1 text-[10px] text-black">© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> contributors</div>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">{markers.map(m=><button key={m.id} type="button" onClick={()=>choose(m)} aria-pressed={selected===m.id} className={`border px-3 py-2 text-xs font-bold ${selected===m.id?"border-[#b9e9f4] bg-[#b9e9f4] text-[#071D2B]":"border-white/30 text-white hover:bg-white/10"}`}>{m.order}. {m.name}</button>)}</div>
    {selectedMarker&&<div className="mt-4 border-t border-white/25 pt-4"><p className="text-sm font-bold">{selectedMarker.name} · {selectedMarker.location}</p><p className="mt-2 text-xs leading-6 text-white/65">{selectedMarker.point.note[locale]}</p><div className="mt-3 flex flex-wrap gap-4 text-xs font-bold"><Link href={`/${locale}/place/${selectedMarker.id}`} className="underline underline-offset-4">{fr?"Voir la fiche":"View place"} ↗</Link><a href={pointMapUrl(selectedMarker.point)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{fr?"Ouvrir le repère":"Open reference"} ↗</a><a href={selectedMarker.point.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{fr?"Source cartographique":"Map source"} ↗</a></div></div>}
  </div>:<p className="mt-5 text-sm leading-6 text-white/70">{fr?"Aucune coordonnée suffisamment documentée pour ces étapes : les fiches restent consultables ci-dessus.":"No sufficiently documented coordinates for these stops; the place listings above remain available."}</p>}
  <p className="mt-5 border-t border-white/20 pt-4 text-xs leading-6 text-white/60">{fr?"Les repères de secteur ne garantissent ni accès direct ni stationnement. Les numéros indiquent les étapes éditoriales, pas un itinéraire calculé.":"Area markers do not guarantee direct access or parking. Numbers denote editorial stops, not a calculated route."}</p>
 </section>;
}
