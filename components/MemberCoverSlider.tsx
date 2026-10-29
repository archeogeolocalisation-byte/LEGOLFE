"use client";

import {useId,useState} from "react";

export default function MemberCoverSlider({photos,fr}:{photos:string[];fr:boolean}){
  const [index,setIndex]=useState(0);
  const imageId=useId();
  const images=photos.slice(0,3);
  if(!images.length)return null;
  const active=Math.min(index,images.length-1);
  const label=fr?`Photo personnelle ${active+1} sur ${images.length}`:`Personal photo ${active+1} of ${images.length}`;
  return <section className="member-cover" aria-label={fr?"Photos personnelles du membre":"Member’s personal photos"}>
    <div className="member-cover-stage">
      <img id={imageId} src={images[active]} alt={label} width={1000} height={800} className="member-cover-image"/>
      <div className="member-cover-caption"><span>{fr?"SON REGARD SUR LE GOLFE":"THEIR VIEW OF THE GOLFE"}</span><span role="status" aria-live="polite" aria-atomic="true">{active+1} / {images.length}</span></div>
      {images.length>1&&<div className="member-cover-arrows">
        <button type="button" aria-label={fr?"Photo précédente":"Previous image"} aria-controls={imageId} onClick={()=>setIndex((active+images.length-1)%images.length)}>‹</button>
        <button type="button" aria-label={fr?"Photo suivante":"Next image"} aria-controls={imageId} onClick={()=>setIndex((active+1)%images.length)}>›</button>
      </div>}
    </div>
    {images.length>1&&<div className="member-cover-thumbs" role="group" aria-label={fr?"Choisir une photo":"Choose a photo"}>{images.map((src,i)=><button type="button" aria-label={fr?`Afficher la photo ${i+1}`:`Show photo ${i+1}`} aria-pressed={active===i} aria-controls={imageId} onClick={()=>setIndex(i)} key={i}><img src={src} alt="" width={120} height={80} loading="lazy"/></button>)}</div>}
  </section>;
}
