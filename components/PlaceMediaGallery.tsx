'use client';
import {useEffect,useRef,useState} from 'react';
import type {VillagePhoto} from '../data/villageMedia';
import type {Locale} from '../lib/i18n';

export default function PlaceMediaGallery({name,photos,locale}:{name:string;photos:VillagePhoto[];locale:Locale}){
 const fr=locale==='fr';
 const [index,setIndex]=useState(0),[opened,setOpened]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>{if(!opened)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before;};},[opened]);
 if(!photos.length)return null;
 const photo=photos[index]??photos[0];
 function open(at:number,button:HTMLButtonElement){opener.current=button;setIndex(at);dialog.current?.showModal();setOpened(true);}
 function reset(){setOpened(false);opener.current?.focus();}
 function close(){dialog.current?.close();reset();}
 function step(by:number){setIndex(i=>(i+by+photos.length)%photos.length);}
 function credit(p:VillagePhoto){if(!p.credit&&!p.license)return null;return <><a href={p.source} target="_blank" rel="noreferrer" className="underline">{p.credit}</a> · <a href={p.licenseUrl} target="_blank" rel="noreferrer" className="underline">{p.license}</a></>;}
 return <section className="lg-shell pb-12" aria-label={fr?`Galerie de ${name}`:`${name} gallery`}>
  <div className="grid gap-3 md:grid-cols-2">
   {photos.map((p,i)=><figure key={p.src} className={i===0||i===photos.length-1&&photos.length%2===0?'md:col-span-2':''}>
    <button type="button" onClick={e=>open(i,e.currentTarget)} className={`group relative block w-full overflow-hidden bg-neutral-100 text-left ${i===0?'aspect-[4/5] md:aspect-[16/8]':'aspect-[4/3]'} ${i===photos.length-1&&photos.length%2===0?'md:aspect-[16/8]':''}`} aria-label={`${fr?'Ouvrir la photo':'Open photo'} ${i+1} — ${p.caption[locale]}`}>
     <img src={p.src} alt={p.caption[locale]} loading={i===0?'eager':'lazy'} fetchPriority={i===0?'high':'auto'} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"/>
     {p.contextual&&<span className="absolute left-4 top-4 bg-black/80 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">{fr?"Photos des environs":"Surroundings"}</span>}
     <span className="absolute bottom-4 right-4 bg-black/85 px-4 py-3 text-xs font-bold text-white">{i===0?(photos.length===1?(fr?'Voir la photo':'View photo'):`${fr?'Voir les':'View'} ${photos.length} photos`):`0${i+1}`} ↗</span>
    </button><figcaption className="py-3 text-[11px] leading-5 text-black/55"><span className="block font-bold text-black/75">{p.contextual?(fr?"Environs · ":"Surroundings · "):""}{p.caption[locale]}</span>{credit(p)}{(p.credit||p.license)&&' · '}{fr?'Recadrage d’affichage':'Display crop'}</figcaption>
   </figure>)}
  </div>
  <dialog ref={dialog} onClose={reset} onCancel={()=>setOpened(false)} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-black" aria-label={fr?`Photos de ${name}`:`Photos of ${name}`}>
   <div className="flex h-full flex-col px-4 pb-5 sm:px-8"><div className="flex items-center justify-between gap-4 py-5"><p className="text-sm font-bold">{name} · {index+1} / {photos.length}</p><button type="button" autoFocus onClick={close} className="border border-white/40 px-4 py-2 text-sm font-bold">{fr?'Fermer':'Close'} ×</button></div>
    <div className="relative flex min-h-0 flex-1 items-center justify-center"><img src={photo.src} alt={photo.caption[locale]} className="max-h-full max-w-full object-contain"/>{photos.length>1&&<><button type="button" onClick={()=>step(-1)} aria-label={fr?'Photo précédente':'Previous photo'} className="absolute left-0 rounded-full bg-black/75 p-4 text-3xl">←</button><button type="button" onClick={()=>step(1)} aria-label={fr?'Photo suivante':'Next photo'} className="absolute right-0 rounded-full bg-black/75 p-4 text-3xl">→</button></>}</div>
    <div className="mt-4 text-center text-xs leading-5 text-white/70" aria-live="polite"><p className="font-bold text-white">{photo.contextual?(fr?"Environs · ":"Surroundings · "):""}{photo.caption[locale]}</p>{credit(photo)}</div>
   </div>
  </dialog>
 </section>;
}
