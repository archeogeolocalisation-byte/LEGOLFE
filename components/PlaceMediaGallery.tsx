'use client';
import {useEffect,useRef,useState} from 'react';
import type {VillagePhoto} from '../data/villageMedia';
import type {Locale} from '../lib/i18n';

export default function PlaceMediaGallery({name,photos,locale}:{name:string;photos:VillagePhoto[];locale:Locale}){
 const fr=locale==='fr',slides=photos.slice(0,3);
 const touchStart=useRef<{x:number;y:number}|null>(null),swiped=useRef(false);
 const [index,setIndex]=useState(0),[opened,setOpened]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>{if(!opened)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before;};},[opened]);
 if(!slides.length)return null;
 const active=index%slides.length,photo=slides[active];
 function open(at:number,button:HTMLButtonElement){opener.current=button;setIndex(at);dialog.current?.showModal();setOpened(true);}
 function reset(){setOpened(false);opener.current?.focus();}
 function close(){dialog.current?.close();reset();}
 function step(by:number){setIndex(i=>(i+by+slides.length)%slides.length);}
 function credit(p:VillagePhoto){if(!p.credit&&!p.license)return null;return <><a href={p.source} target="_blank" rel="noreferrer" className="underline">{p.credit}</a> · <a href={p.licenseUrl} target="_blank" rel="noreferrer" className="underline">{p.license}</a></>;}
 return <section className="lg-shell pb-12" aria-label={fr?`Galerie de ${name}`:`${name} gallery`}>
  <div role="group" aria-roledescription={fr?'carrousel':'carousel'} aria-label={fr?'Photos du lieu':'Place photos'} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}}>
   <figure>
    <div className="relative">
    <button type="button" onClick={e=>{if(swiped.current){swiped.current=false;return;}open(active,e.currentTarget);}} onTouchStart={e=>{swiped.current=false;touchStart.current=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;}} onTouchEnd={e=>{const start=touchStart.current;touchStart.current=null;if(start===null||!e.changedTouches.length)return;const delta=e.changedTouches[0].clientX-start.x,vertical=e.changedTouches[0].clientY-start.y;if(Math.abs(delta)>60&&Math.abs(delta)>Math.abs(vertical)){swiped.current=true;step(delta<0?1:-1);}}} onTouchCancel={()=>{touchStart.current=null;swiped.current=false;}} className="group relative block aspect-[4/5] w-full overflow-hidden bg-neutral-100 text-left md:aspect-[16/8]" aria-label={`${fr?'Ouvrir la photo':'Open photo'} ${active+1} — ${photo.caption[locale]}`}>
     <img src={photo.src} alt={photo.caption[locale]} loading="eager" fetchPriority={active===0?'high':'auto'} className="h-full w-full object-cover"/>
     {photo.contextual&&<span className="absolute left-4 top-4 bg-black/80 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">{fr?'Photos des environs':'Surroundings'}</span>}
     <span className="absolute bottom-4 right-4 bg-black/85 px-4 py-3 text-xs font-bold text-white">{fr?'Agrandir':'View full size'} ↗</span>
    </button>
    {slides.length>1&&<><button type="button" onClick={()=>step(-1)} aria-label={fr?'Photo précédente':'Previous photo'} className="absolute left-3 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/80 text-2xl font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">←</button><button type="button" onClick={()=>step(1)} aria-label={fr?'Photo suivante':'Next photo'} className="absolute right-3 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/80 text-2xl font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">→</button></>}
    </div>
    <figcaption className="py-3 text-[11px] leading-5 text-black/55" aria-live="polite" aria-atomic="true"><span className="sr-only">{fr?`Photo ${active+1} sur ${slides.length}. `:`Photo ${active+1} of ${slides.length}. `}</span><span className="block font-bold text-black/75">{photo.contextual?(fr?'Environs · ':'Surroundings · '):''}{photo.caption[locale]}</span>{credit(photo)}{(photo.credit||photo.license)&&' · '}{fr?'Recadrage d’affichage':'Display crop'}</figcaption>
   </figure>

  </div>
  <dialog ref={dialog} onClose={reset} onCancel={()=>setOpened(false)} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-black" aria-label={fr?`Photos de ${name}`:`Photos of ${name}`}>
   <div className="flex h-full flex-col px-4 pb-5 sm:px-8"><div className="flex items-center justify-between gap-4 py-5"><p className="text-sm font-bold">{name} · {active+1} / {slides.length}</p><button type="button" autoFocus onClick={close} className="border border-white/40 px-4 py-2 text-sm font-bold">{fr?'Fermer':'Close'} ×</button></div>
    <div className="relative flex min-h-0 flex-1 items-center justify-center"><img src={photo.src} alt={photo.caption[locale]} className="max-h-full max-w-full object-contain"/>{slides.length>1&&<><button type="button" onClick={()=>step(-1)} aria-label={fr?'Photo précédente':'Previous photo'} className="absolute left-0 rounded-full bg-black/75 p-4 text-3xl">←</button><button type="button" onClick={()=>step(1)} aria-label={fr?'Photo suivante':'Next photo'} className="absolute right-0 rounded-full bg-black/75 p-4 text-3xl">→</button></>}</div>
    <div className="mt-4 text-center text-xs leading-5 text-white/70" aria-live="polite"><p className="font-bold text-white">{photo.contextual?(fr?"Environs · ":"Surroundings · "):""}{photo.caption[locale]}</p>{credit(photo)}</div>
   </div>
  </dialog>
 </section>;
}
