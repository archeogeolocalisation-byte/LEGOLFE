"use client";

import Link from "next/link";
import { FormEvent, use, useEffect, useMemo, useState } from "react";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { isLocale } from "../../../lib/i18n";
import { places, getCategory } from "../../../data/places";
import { events } from "../../../data/events";
import { localNews } from "../../../data/localNews";
import { villas } from "../../../data/villas";
import { mediaForPlace } from "../../../lib/placeMedia";

const STOP = new Set(["le","la","les","un","une","des","de","du","au","aux","et","ou","pour","avec","dans","sur","près","proche","nous","je","veux","on","the","a","an","and","or","for","with","in","near","we","i","want","to","of","this","that"]);
const SYNONYMS: Record<string,string[]> = {
  calme:["quiet","village","forest","countryside"], quiet:["quiet","village","forest"],
  plage:["beach","pampelonne","sea","coast"], beach:["beach","pampelonne","sea"],
  enfant:["family","kids","children"], enfants:["family","kids","children"], kids:["family","children"], family:["family","kids"],
  restaurant:["eat","lunch","dinner","table"], déjeuner:["eat","lunch","restaurant"], diner:["eat","dinner","restaurant"], dinner:["eat","restaurant"],
  bateau:["boat","sea","catamaran"], boat:["boat","sea","catamaran"],
  vue:["view","sea-view","panorama"], view:["view","sea-view","panorama"],
  marcher:["walk","walking","hike"], balade:["walk","walking","hike"], walk:["walking","hike"],
  culture:["culture","music","theatre","museum"], spectacle:["culture","music","theatre"],
  maison:["villa","stay","house"], villa:["villa","stay","house"], house:["villa","stay"],
};
function words(q:string){return q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(/[^a-z0-9-]+/).filter(x=>x.length>2&&!STOP.has(x));}
function hay(v:unknown){return JSON.stringify(v).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function score(q:string, item:unknown){const w=words(q);const h=hay(item);let s=0;for(const x of w){if(h.includes(x))s+=3;for(const y of SYNONYMS[x]||[]){if(h.includes(y))s+=1;}}return s;}

export default function Page({params}:{params:Promise<{locale:string}>}){
  const {locale:raw}=use(params); const l=isLocale(raw)?raw:"en"; const fr=l==="fr";
  const [q,setQ]=useState(""); const [sent,setSent]=useState(false);
  useEffect(()=>{const sp=new URLSearchParams(window.location.search);const place=sp.get("place");const location=sp.get("location");const shortlist=sp.get("shortlist");if(shortlist)setQ(shortlist);else if(place)setQ(fr?`Je veux intégrer ${place}${location?` à ${location}`:""} à mon séjour. Que me conseilles-tu autour ?`:`I want to include ${place}${location?` in ${location}`:""} in my stay. What would you build around it?`);},[fr]);

  const result=useMemo(()=>{
    if(!sent||!q.trim())return null;
    const placeHits=places.map(p=>({p,s:score(q,p)})).sort((a,b)=>b.s-a.s).filter(x=>x.s>0).slice(0,4);
    const eventHits=events.map(e=>({e,s:score(q,e)})).sort((a,b)=>b.s-a.s).filter(x=>x.s>0).slice(0,3);
    const villaHits=villas.map(v=>({v,s:score(q,v)})).sort((a,b)=>b.s-a.s).filter(x=>x.s>0).slice(0,2);
    const newsHits=localNews.map(n=>({n,s:score(q,n)})).sort((a,b)=>b.s-a.s).filter(x=>x.s>0).slice(0,2);
    if(placeHits.length===0){for(const p of places.filter(p=>p.featured).slice(0,3))placeHits.push({p,s:1});}
    const main=placeHits[0]?.p;
    const take=fr
      ? main?`Je partirais de ${main.name}. C’est le meilleur point d’ancrage dans le guide pour cette demande, puis je construirais autour plutôt que d’empiler des adresses.`:"Je construirais d’abord le rythme de la journée, puis seulement les adresses."
      : main?`I’d start with ${main.name}. It is the strongest anchor in the guide for this request, then build around it rather than stack more places.`:"I’d build the rhythm first, then the addresses.";
    return {placeHits,eventHits,villaHits,newsHits,take};
  },[sent,q,fr]);

  const ex=fr?["Deux familles, cinq enfants, déjeuner au calme près de Pampelonne.","Un week-end romantique sans courir partout.","Que faire samedi soir autour de Sainte-Maxime ?","Une journée bateau pour 8 avec un bon déjeuner après."]:["Two families, five kids, calm lunch near Pampelonne.","A romantic weekend without rushing around.","What should we do Saturday night around Sainte-Maxime?","A boat day for eight with a good lunch afterwards."];
  function submit(e:FormEvent){e.preventDefault();if(q.trim())setSent(true)}

  return <main className="min-h-screen bg-black text-white"><SiteHeader light={false} locale={l} path="/ask"/>
    <section className="lg-shell pb-24 pt-12 md:pt-20">
      <div className="grid gap-10 md:grid-cols-[1fr_320px] md:items-end"><div><p className="lg-kicker text-[var(--lg-blue)]">ASK LE GOLFE / LOCAL INTELLIGENCE</p><h1 className="lg-display mt-6 max-w-[1100px] text-[17vw] md:text-[128px]">{fr?<>DITES-NOUS.<br/><span className="lg-accent">ON RELIE.</span></>:<>TELL US.<br/><span className="lg-accent">WE CONNECT.</span></>}</h1></div><p className="max-w-sm text-lg font-semibold leading-8 text-white/55">{fr?"Maisons, tables, plages, événements, services et infos locales — reliés selon votre situation, pas affichés comme un catalogue.":"Homes, tables, beaches, events, services and local updates — connected around your situation, not shown as a catalogue."}</p></div>

      <form onSubmit={submit} className="mt-12 border-y border-white bg-white text-black"><textarea value={q} onChange={e=>{setQ(e.target.value);setSent(false)}} rows={4} placeholder={fr?"Deux familles, cinq enfants, quelque chose de calme près de Pampelonne…":"Two families, five kids, somewhere calm near Pampelonne…"} className="w-full resize-none bg-transparent p-5 text-lg font-bold outline-none md:p-8 md:text-2xl"/><div className="flex items-center justify-between border-t border-black p-3"><span className="hidden text-[9px] font-black uppercase tracking-[.14em] text-black/35 sm:block">{fr?"GUIDE + AGENDA + STAY + LOCAL":"GUIDE + AGENDA + STAY + LOCAL"}</span><button className="lg-btn bg-[var(--lg-blue)] text-white !border-[var(--lg-blue)]">{fr?"Construire":"Build it"} →</button></div></form>

      {result&&<section className="mt-12 border-t border-white/35 pt-8">
        <div className="grid gap-8 md:grid-cols-[260px_1fr]"><div><p className="lg-kicker text-[var(--lg-blue)]">LE GOLFE TAKE</p><div className="lg-blue-rule mt-5"/></div><p className="max-w-4xl text-3xl font-black leading-[1.02] tracking-[-.04em] md:text-5xl">{result.take}</p></div>

        {result.placeHits.length>0&&<div className="mt-14"><div className="flex items-end justify-between border-b border-white/30 pb-4"><div><p className="lg-kicker text-white/40">01 / {fr?"ADRESSES À CONSIDÉRER":"PLACES TO CONSIDER"}</p><h2 className="mt-3 text-5xl font-black uppercase tracking-[-.055em] md:text-7xl">{fr?"LE BON MIX.":"THE RIGHT MIX."}</h2></div><Link href={`/${l}/explore`} className="text-[10px] font-black uppercase tracking-[.12em] text-white/50">Explore →</Link></div><div className="grid md:grid-cols-2">{result.placeHits.map(({p},i)=>{const m=mediaForPlace(p.id);return <Link key={p.id} href={`/${l}/place/${p.id}`} className={`group grid min-h-[260px] border-b border-white/30 ${i%2===0?"md:border-r":""}`}><div className="relative overflow-hidden bg-white/5">{m&&<img src={m.src} alt={m.alt} className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-[1.02]"/>}<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/><div className="absolute bottom-0 p-5"><p className="lg-kicker text-white/55">{getCategory(p.category)?.label} · {p.location}</p><h3 className="mt-2 text-4xl font-black uppercase tracking-[-.055em]">{p.name}</h3><p className="mt-3 max-w-md text-sm font-semibold leading-6 text-white/65">{p.description}</p></div></div></Link>})}</div></div>}

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div><div className="border-b border-white/30 pb-4"><p className="lg-kicker text-white/40">02 / {fr?"À L’AGENDA":"ON THE AGENDA"}</p><h2 className="mt-3 text-4xl font-black uppercase tracking-[-.05em]">{fr?"À NE PAS RATER.":"WORTH KNOWING."}</h2></div>{result.eventHits.length?result.eventHits.map(({e})=><a key={e.id} href={e.source} target="_blank" rel="noreferrer" className="block border-b border-white/20 py-5"><p className="lg-kicker text-[var(--lg-blue)]">{e.start} · {e.location}</p><p className="mt-2 text-2xl font-black uppercase tracking-[-.035em]">{fr&&e.titleFr?e.titleFr:e.title}</p><p className="mt-2 text-sm font-semibold leading-6 text-white/50">{fr?e.whyFr:e.why}</p></a>):<p className="py-5 text-white/45">{fr?"Aucun événement directement lié à cette demande.":"No event directly tied to this request."}</p>}</div>
          <div><div className="border-b border-white/30 pb-4"><p className="lg-kicker text-white/40">03 / STAY</p><h2 className="mt-3 text-4xl font-black uppercase tracking-[-.05em]">{fr?"OÙ POSER LES VALISES.":"WHERE TO STAY."}</h2></div>{result.villaHits.length?result.villaHits.map(({v})=><Link key={v.id} href={`/villa/${v.id}`} className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/20 py-5"><img src={v.image} alt={v.name} className="aspect-[4/3] h-full w-full object-cover"/><div><p className="lg-kicker text-white/40">{v.location} · {v.guests} {fr?"voyageurs":"guests"}</p><p className="mt-2 text-2xl font-black uppercase tracking-[-.035em]">{v.name}</p><p className="mt-2 text-sm font-semibold text-white/50">€{v.price.toLocaleString("fr-FR")} / {fr?"semaine":"week"}</p></div></Link>):<div className="py-5"><p className="text-white/45">{fr?"Pas de maison assez pertinente dans le stock démo.":"No strong house match in the demo stock."}</p><Link href="/match" className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[.12em] underline decoration-[var(--lg-blue)] decoration-2 underline-offset-4">{fr?"Affiner le séjour":"Refine stay"} →</Link></div>}</div>
        </div>

        {result.newsHits.length>0&&<div className="mt-14 border-y border-white/30 py-6"><p className="lg-kicker text-white/40">04 / LOCAL CONTEXT</p><div className="mt-4 grid gap-6 md:grid-cols-2">{result.newsHits.map(({n})=><a key={n.id} href={n.source} target="_blank" rel="noreferrer"><p className="text-xl font-black uppercase tracking-[-.03em]">{fr?n.titleFr:n.title}</p><p className="mt-2 text-sm font-semibold leading-6 text-white/50">{fr?n.whyFr:n.why}</p></a>)}</div></div>}
      </section>}

      {!sent&&<><p className="lg-kicker mt-16 text-white/35">{fr?"ESSAYEZ":"TRY ASKING"}</p><div className="mt-5 grid border-t border-white/30 md:grid-cols-2">{ex.map((x,i)=><button key={x} onClick={()=>{setQ(x);setSent(false)}} className={`min-h-28 border-b border-white/30 p-5 text-left text-sm font-semibold text-white/65 hover:bg-white hover:text-black md:p-6 ${i%2===0?"md:border-r":""}`}>“{x}”</button>)}</div></>}
    </section><SiteFooter locale={l}/></main>
}
