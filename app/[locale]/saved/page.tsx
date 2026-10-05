"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { places, getCategory, placeDescriptionFr } from "../../../data/places";
import { villas } from "../../../data/villas";
import { isLocale } from "../../../lib/i18n";
import { mediaForPlace } from "../../../lib/placeMedia";
import VillaComparison from "../../../components/VillaComparison";
import StayPlanner from "../../../components/StayPlanner";

const STORAGE_KEY = "le-golfe-saved-places";
const VILLA_STORAGE_KEY = "le-golfe-saved-villas";

export default function SavedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = use(params);
  const locale = isLocale(raw) ? raw : "en";
  const fr = locale === "fr";
  const [storageError,setStorageError]=useState("");
  const [ready,setReady]=useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [villaIds, setVillaIds] = useState<string[]>([]);

  useEffect(() => {
    function refresh(){
      try { const places=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"),villas=JSON.parse(localStorage.getItem(VILLA_STORAGE_KEY)||"[]");setIds(Array.isArray(places)?places.filter(x=>typeof x==='string'):[]);setVillaIds(Array.isArray(villas)?villas.filter(x=>typeof x==='string'):[]);setStorageError("");}
      catch {setStorageError(fr?"Impossible de lire la sélection de ce navigateur.":"Unable to read this browser’s shortlist.");}
      setReady(true);
    }
    refresh();window.addEventListener('storage',refresh);window.addEventListener('le-golfe:saved-villas',refresh);window.addEventListener('le-golfe:saved-places',refresh);
    return()=>{window.removeEventListener('storage',refresh);window.removeEventListener('le-golfe:saved-villas',refresh);window.removeEventListener('le-golfe:saved-places',refresh);};
  }, [fr]);

  const savedPlaces = useMemo(() => ids.map((id) => places.find((p) => p.id === id)).filter(Boolean) as typeof places, [ids]);
  const categories = useMemo(() => Array.from(new Set(savedPlaces.map((p) => p.category))), [savedPlaces]);
  const savedVillas = useMemo(() => villaIds.map((id) => villas.find((v) => v.id === id)).filter(Boolean) as typeof villas, [villaIds]);

  function persist(key:string,next:string[],apply:()=>void,event:string){try{localStorage.setItem(key,JSON.stringify(next));apply();setStorageError("");window.dispatchEvent(new Event(event));}catch{setStorageError(fr?"Modification non enregistrée. Vérifiez l’espace disponible sur cet appareil.":"Change not saved. Check storage on this device.");}}
  function remove(id:string){const next=ids.filter(x=>x!==id);persist(STORAGE_KEY,next,()=>setIds(next),'le-golfe:saved-places');}
  function removeVilla(id:string){const next=villaIds.filter(x=>x!==id);persist(VILLA_STORAGE_KEY,next,()=>setVillaIds(next),'le-golfe:saved-villas');}

  const askQuery = [...savedPlaces.map((p) => p.name), ...savedVillas.map((v) => v.name)].join(", ");
  const prompt = fr ? `Construis-moi un séjour autour de cette sélection : ${askQuery}. Propose le bon rythme, les meilleurs moments de la journée et les compromis à connaître.` : `Build me a stay around this shortlist: ${askQuery}. Suggest the right rhythm, best times of day and trade-offs I should know.`;

  return <main className="min-h-screen bg-white text-black">
    <SiteHeader locale={locale} path="/saved" />
    <section className="lg-shell pb-20 pt-12 md:pt-20">
      <p className="lg-kicker">MY STAY / {String(savedPlaces.length + savedVillas.length).padStart(2, "0")}</p>
      <h1 className="lg-display mt-6 text-[18vw] md:text-[140px]">{fr ? <>MON<br/><span className="lg-accent">SÉJOUR.</span></> : <>MY<br/><span className="lg-accent">STAY.</span></>}</h1>
      <div className="mt-8 grid gap-8 border-t border-black pt-6 md:grid-cols-[1fr_auto] md:items-start">
        <div><p className="max-w-2xl text-lg font-bold leading-7 text-black/55">{fr ? "Votre sélection devient un brief. LE GOLFE peut maintenant relier ces lieux, éviter les mauvais enchaînements et construire un rythme de séjour cohérent." : "Your shortlist becomes a brief. LE GOLFE can connect these places, avoid bad combinations and build a coherent stay rhythm."}</p>
        {categories.length>0 && <div className="mt-5 flex flex-wrap gap-2">{categories.map((id)=><span key={id} className="border border-black px-3 py-2 text-[9px] font-black uppercase tracking-[.12em]">{getCategory(id)?.label}</span>)}</div>}</div>
        {(savedPlaces.length > 0 || savedVillas.length > 0) && <Link href={`/${locale}/ask?shortlist=${encodeURIComponent(prompt)}`} className="lg-btn bg-[var(--lg-blue)] text-white !border-[var(--lg-blue)]">{fr ? "Construire mon séjour" : "Build my stay"} →</Link>}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="text-xs leading-5 text-black/50">{fr?"Sélection conservée sur ce navigateur, sans compte.":"Shortlist saved in this browser, no account required."}</p><Link href="/requests" className="lg-btn">{fr?"Mes demandes de séjour":"My stay requests"} →</Link></div>
      {storageError&&<p role="alert" className="mt-5 border border-red-700 p-4 text-sm">{storageError}</p>}
      {!ready?<p className="mt-12" role="status">{fr?"Chargement de votre sélection…":"Loading your shortlist…"}</p>:savedPlaces.length === 0 && savedVillas.length === 0 ? <div className="mt-20 border-y border-black py-14"><p className="text-3xl font-black tracking-[-.04em]">{fr ? "Votre séjour commence ici." : "Your stay starts here."}</p><Link href={`/${locale}/explore`} className="mt-6 inline-flex lg-btn">Explore →</Link><Link href={`/${locale}/stay`} className="lg-btn ml-3 mt-6">{fr?'Choisir une maison':'Choose a home'} →</Link></div> : <>
      <div className="mt-16 grid gap-2 md:grid-cols-12">
        {savedPlaces.slice(0,4).map((p,i)=>{const m=mediaForPlace(p.id);const spans=["md:col-span-7","md:col-span-5","md:col-span-5","md:col-span-7"];return <Link key={p.id} href={`/${locale}/place/${p.id}`} className={`group relative min-h-[260px] overflow-hidden bg-black ${spans[i]||"md:col-span-6"}`}>{m?<img src={m.src} alt={m.alt} className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-[1.015]"/>:<div className="absolute inset-0 bg-black"/>}<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/><div className="absolute bottom-0 left-0 p-5 text-white"><p className="lg-kicker text-white/60">{p.location}</p><p className="mt-2 text-4xl font-black uppercase leading-[.88] tracking-[-.06em] md:text-5xl">{p.name}</p></div></Link>})}
      </div>

      {savedVillas.length > 0 && <section className="mt-16">
        <div className="flex items-end justify-between border-b border-black pb-4"><div><p className="lg-kicker text-[var(--lg-blue)]">STAY / SAVED</p><h2 className="mt-3 text-5xl font-black uppercase tracking-[-.055em] md:text-7xl">{fr ? "VOTRE MAISON." : "YOUR HOME."}</h2></div><span className="text-[10px] font-black uppercase tracking-[.12em] text-black/40">{String(savedVillas.length).padStart(2,"0")}</span></div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {savedVillas.map((villa)=><article key={villa.id} className="grid gap-5 border-b border-black pb-6 sm:grid-cols-[180px_1fr]">
            <Link href={`/villa/${villa.id}`} className="block aspect-[4/3] overflow-hidden bg-neutral-100"><img src={villa.image} alt={villa.name} className="h-full w-full object-cover"/></Link>
            <div className="flex flex-col justify-between"><div><p className="lg-kicker text-black/40">STAY · {villa.location}</p><Link href={`/villa/${villa.id}`} className="mt-2 block text-4xl font-black uppercase tracking-[-.05em]">{villa.name}</Link><p className="mt-3 text-sm font-bold text-black/50">€{villa.price.toLocaleString(fr ? "fr-FR" : "en-GB")} / {fr ? "semaine" : "week"} · {villa.guests} {fr ? "voyageurs" : "guests"}</p></div><button onClick={()=>removeVilla(villa.id)} className="mt-5 self-start text-[10px] font-black uppercase tracking-[.12em] underline decoration-[var(--lg-blue)] decoration-2 underline-offset-4">{fr?"Retirer":"Remove"}</button></div>
          </article>)}
        </div>
      <VillaComparison items={savedVillas} locale={locale}/>
      </section>}

      <StayPlanner places={savedPlaces} villas={savedVillas} locale={locale} />

      <div className="mt-14 border-t border-black">
        {savedPlaces.map((p, i) => {
          const media = mediaForPlace(p.id);
          return <article key={p.id} className="grid gap-6 border-b border-black py-7 md:grid-cols-[150px_1fr_auto] md:items-center">
            <Link href={`/${locale}/place/${p.id}`} className="block aspect-[4/3] overflow-hidden bg-neutral-100">{media ? <img src={media.src} alt={media.alt} className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-4xl font-black">{String(i+1).padStart(2,"0")}</div>}</Link>
            <div><p className="lg-kicker text-black/45">{getCategory(p.category)?.label} · {p.location}</p><Link href={`/${locale}/place/${p.id}`} className="mt-2 block text-4xl font-black uppercase tracking-[-.05em] md:text-5xl">{p.name}</Link><p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-black/50">{fr ? (placeDescriptionFr[p.id] || p.description) : p.description}</p></div>
            <button onClick={() => remove(p.id)} className="justify-self-start text-[10px] font-black uppercase tracking-[.12em] underline decoration-[var(--lg-blue)] decoration-2 underline-offset-4 md:justify-self-end">{fr ? "Retirer" : "Remove"}</button>
          </article>;
        })}
      </div></>}
    </section>
    <SiteFooter locale={locale}/>
  </main>;
}
