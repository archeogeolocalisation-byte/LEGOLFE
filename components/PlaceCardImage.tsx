"use client";
/* eslint-disable @next/next/no-img-element -- Mixed catalogue sources load directly; keep the error fallback and existing URLs. */

import {useState} from "react";
import type {Locale} from "../lib/i18n";

type Props={src?:string;alt?:string;name:string;label:string;locale:Locale;contextual?:boolean;eager?:boolean};

// Keep the link and its reserved image space usable when a remote image fails.
export default function PlaceCardImage({src,alt,name,label,locale,contextual=false,eager=false}:Props){
 const [failedSrc,setFailedSrc]=useState<string>();
 if(!src||failedSrc===src)return <div role="img" aria-label={locale==="fr"?`Visuel indisponible : ${name}`:`Image unavailable: ${name}`} className="place-card-image-fallback">
  <span aria-hidden="true" className="explore-placeholder-monogram">LG</span>
  <span className="relative"><span className="lg-kicker block">LE GOLFE / {label}</span><span className="place-card-image-name">{name}</span></span>
 </div>;
 return <><img ref={node=>{if(node?.complete&&node.naturalWidth===0)setFailedSrc(src);}} src={src} alt={alt||name} loading={eager?"eager":"lazy"} decoding="async" width={1200} height={800} onError={()=>setFailedSrc(src)}/>{contextual&&<span className="absolute bottom-3 left-3 bg-white/95 px-2 py-1 text-[9px] font-black uppercase tracking-[.08em]">{locale==="fr"?"Photo du secteur":"Area photograph"}</span>}</>;
}
