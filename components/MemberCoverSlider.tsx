"use client";

import {useState} from "react";

export default function MemberCoverSlider({photos,fr}:{photos:string[];fr:boolean}){
  const [index,setIndex]=useState(0);
  const images=photos.slice(0,3);
  if(!images.length)return null;
  const active=Math.min(index,images.length-1);
  return <section className="mt-10" aria-label={fr?"Photos de couverture du membre":"Member cover photos"}>
    <div className="relative overflow-hidden bg-neutral-100">
      <img src={images[active]} alt={fr?`Photo de couverture ${active+1} sur ${images.length}`:`Cover photo ${active+1} of ${images.length}`} className="aspect-[16/9] w-full object-cover"/>
      {images.length>1&&<>
        <button type="button" aria-label={fr?"Photo précédente":"Previous image"} onClick={()=>setIndex(i=>(i+images.length-1)%images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 px-4 py-3 font-black">‹</button>
        <button type="button" aria-label={fr?"Photo suivante":"Next image"} onClick={()=>setIndex(i=>(i+1)%images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 px-4 py-3 font-black">›</button>
      </>}
    </div>
    {images.length>1&&<div className="mt-3 flex justify-center gap-3">{images.map((_,i)=><button type="button" aria-label={fr?`Afficher la photo ${i+1}`:`Show photo ${i+1}`} aria-current={active===i?"true":undefined} onClick={()=>setIndex(i)} className={`h-2.5 w-2.5 rounded-full ${active===i?"bg-[var(--lg-blue)]":"bg-neutral-300"}`} key={i}/>)}</div>}
  </section>;
}
