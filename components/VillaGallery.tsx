'use client';
import {useEffect,useRef,useState} from 'react';
import HostPhoto from './HostPhoto';
export type VillaPhoto={src:string;alt:string};
export default function VillaGallery({name,photos,locale='fr'}:{name:string;photos:VillaPhoto[];locale?:'fr'|'en'}){
 const fr=locale==='fr',count=photos.length,featured=Math.min(count,5);
 const [index,setIndex]=useState(0),[opened,setOpened]=useState(false),[mobileIndex,setMobileIndex]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement|null>(null),swipe=useRef<{x:number;y:number}|null>(null);
 useEffect(()=>{if(!opened)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;};},[opened]);
 function open(at:number,event:React.MouseEvent<HTMLButtonElement>){trigger.current=event.currentTarget;setIndex(at);dialog.current?.showModal();setOpened(true);}
 function reset(){setOpened(false);trigger.current?.focus();}
 function close(){dialog.current?.close();}
 function step(by:number){setIndex(i=>(i+by+count)%count);}
 if(!count)return <div className="flex min-h-[320px] items-end bg-[#071D2B] p-7 text-white md:min-h-[500px] md:p-12"><p className="max-w-full break-words text-5xl font-black uppercase tracking-[-.06em] md:text-8xl [overflow-wrap:anywhere]">{name}</p></div>;
 const photo=photos[index]||photos[0];
 const columns=featured<=2?'md:grid-cols-2':featured===3?'md:grid-cols-[2fr_1fr]':'md:grid-cols-[2fr_1fr_1fr]';
 const showAll=fr?(count===1?'Voir la photo':`Voir les ${count} photos`):(count===1?'View photo':`Show all ${count} photos`);
 return <div>
  <div className="relative isolate">
   <div className={`flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:h-[clamp(340px,38vw,560px)] md:overflow-hidden ${count===1?'md:grid-cols-1':columns} ${featured>=3?'md:grid-rows-2':''}`} aria-label={fr?`Galerie de ${name}`:`${name} gallery`} onScroll={e=>{const el=e.currentTarget,first=el.firstElementChild as HTMLElement|null;if(first)setMobileIndex(Math.min(count-1,Math.max(0,Math.round(el.scrollLeft/(first.offsetWidth+8)))));}}>
    {photos.map((p,i)=><button key={p.src+i} type="button" onClick={e=>open(i,e)} aria-label={`${fr?'Voir la photo':'View photo'} ${i+1} ${fr?'de':'of'} ${name}`} className={`group relative aspect-[4/3] shrink-0 snap-center overflow-hidden bg-neutral-100 text-left focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white md:aspect-auto md:h-full md:min-h-0 md:w-auto ${count===1?'w-full':'w-[88%]'} ${i===0&&featured>=3?'md:row-span-2':''} ${featured===4&&i===3?'md:col-span-2':''} ${i>=5?'md:hidden':''}`}>
     <HostPhoto src={p.src} alt={p.alt} loading={i===0?'eager':'lazy'} fetchPriority={i===0?'high':'auto'} className="h-full w-full object-cover transition duration-500 group-hover:brightness-90 motion-reduce:transition-none"/>
    </button>)}
   </div>
   {count>1&&<span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white md:hidden" aria-hidden="true">{mobileIndex+1} / {count}</span>}
   <button type="button" onClick={e=>open(mobileIndex,e)} className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-black/15 bg-white px-4 py-3 text-xs font-bold text-black shadow-sm transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:bottom-5 md:right-5" aria-label={`${showAll} — ${name}`}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="3" height="3" rx=".5"/><rect x="6.5" y="1" width="3" height="3" rx=".5"/><rect x="12" y="1" width="3" height="3" rx=".5"/><rect x="1" y="6.5" width="3" height="3" rx=".5"/><rect x="6.5" y="6.5" width="3" height="3" rx=".5"/><rect x="12" y="6.5" width="3" height="3" rx=".5"/><rect x="1" y="12" width="3" height="3" rx=".5"/><rect x="6.5" y="12" width="3" height="3" rx=".5"/><rect x="12" y="12" width="3" height="3" rx=".5"/></svg>{showAll}</button>
  </div>
  <dialog ref={dialog} onClose={reset} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-[#090D10] p-0 text-white backdrop:bg-black" aria-label={fr?`Photos de ${name}`:`Photos of ${name}`}>
   <div className="flex h-full flex-col px-4 pb-5 sm:px-8">
    <div className="flex shrink-0 items-center justify-between gap-5 py-5"><p className="min-w-0 truncate text-sm font-bold">{name}</p><div className="flex shrink-0 items-center gap-4"><span className="text-xs text-white/65" aria-live="polite">{index+1} / {count}</span><button type="button" onClick={close} className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold hover:bg-white/10" autoFocus>{fr?'Fermer':'Close'} ×</button></div></div>
    <div className="relative flex min-h-0 flex-1 items-center justify-center" onTouchStart={e=>{const p=e.touches[0];swipe.current={x:p.clientX,y:p.clientY};}} onTouchEnd={e=>{const p=e.changedTouches[0],start=swipe.current;swipe.current=null;if(start&&Math.abs(p.clientX-start.x)>60&&Math.abs(p.clientX-start.x)>Math.abs(p.clientY-start.y))step(p.clientX<start.x?1:-1);}}>
     <HostPhoto src={photo.src} alt={photo.alt} className="max-h-full max-w-full object-contain"/>
     {count>1&&<><button type="button" onClick={()=>step(-1)} aria-label={fr?'Photo précédente':'Previous photo'} className="absolute left-0 rounded-full border border-white/20 bg-black/65 p-3 text-2xl sm:p-4">←</button><button type="button" onClick={()=>step(1)} aria-label={fr?'Photo suivante':'Next photo'} className="absolute right-0 rounded-full border border-white/20 bg-black/65 p-3 text-2xl sm:p-4">→</button></>}
    </div>
    <p className="mt-4 shrink-0 text-center text-xs text-white/65">{photo.alt}</p>
    {count>1&&<div className="mt-4 flex shrink-0 justify-start gap-2 overflow-x-auto py-1" aria-label={fr?'Choisir une photo':'Choose a photo'}>{photos.map((p,i)=><button key={p.src+i} type="button" onClick={()=>setIndex(i)} aria-label={`${fr?'Photo':'Photo'} ${i+1}`} aria-current={index===i?'true':undefined} className={`h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 sm:h-14 sm:w-20 ${index===i?'border-white':'border-transparent opacity-50 hover:opacity-100'}`}><HostPhoto src={p.src} alt="" loading="lazy" className="h-full w-full object-cover"/></button>)}</div>}
   </div>
  </dialog>
 </div>;
}
