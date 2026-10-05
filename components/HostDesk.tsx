"use client";
import {normalizeMapLocation,type VillaMapLocation} from "../lib/villaMapLocation";
import HostAvailability from "./HostAvailability";

import Link from "next/link";
import PropertyEditor from "./PropertyEditor";
import HostPhoto from "./HostPhoto";
import HostOverview from './HostOverview';
import {remoteProperty} from '../lib/hostDashboard';
import HostInquiryDesk from "./HostInquiryDesk";
import {briefAsk,type HostStay} from "../lib/hostInquiries";
import VillaDetail from "./VillaDetail";
import {propertyVilla} from "../lib/villaListing";
import {parisIsoDay} from "../lib/localCalendar";
import {publishVilla,pauseVilla,removeVilla} from "../lib/publishVilla";
import {supabase} from "../lib/supabase";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import type { Locale } from "../lib/i18n";

type Role = "owner" | "concierge";
type Visibility = "public" | "private" | "request";
type ListingStatus = "draft" | "published" | "paused";
export type Property = {
  titleFr?:string;titleEn?:string;descriptionFr?:string;descriptionEn?:string;highlightsFr?:string[];highlightsEn?:string[];
  mapLocation?:VillaMapLocation;district?:string;
  online?:boolean;announcerType?:'owner'|'agency';
  id:string;
  name:string;
  location:string;
  guests:number;
  bedrooms:number;
  bathrooms:number;
  visibility:Visibility;
  managedBy:string;
  status:ListingStatus;
  price:number;
  distanceFromSaintTropez:number;
  description:string;
  amenities:string[];
  images:string[];
};
type Stay = HostStay;

const seedProperties: Property[] = [
  {
    id:"villa-eden", name:"Villa Eden", location:"Ramatuelle", guests:8, bedrooms:4, bathrooms:4,
    visibility:"public", managedBy:"Owner", status:"published", price:12000, distanceFromSaintTropez:10,
    description:"A calm Ramatuelle base with pool, space and easy access to Pampelonne.",
    amenities:["Pool","Air conditioning","Parking","Outdoor dining","Wi-Fi"], images:["/villas/villa-eden.jpg"],
  },
];
const seedStays: Stay[] = [
  { id:"stay-demo", sourceInquiryId:"demo:stay-demo", guest:"Smith family", property:"Villa Eden", arrival:"2026-07-12", departure:"2026-07-19", guests:8, status:"planning" },
];

function normalizeProperty(raw:Partial<Property>):Property {
  return {
    mapLocation:normalizeMapLocation(raw.mapLocation),district:typeof raw.district==='string'?raw.district.slice(0,80):'',
    online:raw.online===true,announcerType:raw.announcerType==='agency'?'agency':'owner',
    id:raw.id || `property-${crypto.randomUUID()}`,
    name:raw.name || "Untitled property",
    location:raw.location || "Golfe de Saint-Tropez",
    guests:Number(raw.guests || 2), bedrooms:Number(raw.bedrooms || 1), bathrooms:Number(raw.bathrooms || 1),
    visibility:(raw.visibility || "request") as Visibility, managedBy:raw.managedBy || "Owner",
    status:(raw.status || "draft") as ListingStatus, price:Number(raw.price || 0),
    distanceFromSaintTropez:Number(raw.distanceFromSaintTropez || 0), description:raw.description || "", titleFr:raw.titleFr,titleEn:raw.titleEn,descriptionFr:raw.descriptionFr,descriptionEn:raw.descriptionEn,highlightsFr:raw.highlightsFr,highlightsEn:raw.highlightsEn,
    amenities:Array.isArray(raw.amenities)?raw.amenities:[], images:Array.isArray(raw.images)?raw.images:[],
  };
}

export default function HostDesk({locale}:{locale:Locale}) {
  const fr = locale === "fr";
  const [role,setRole] = useState<Role|null>(null);
  const [properties,setProperties] = useState<Property[]>([]);
  const [stays,setStays] = useState<Stay[]>([]);
  const [view,setView] = useState<"today"|"properties"|"stays"|"inquiries"|"confirmed">("today");
  const [openInquiry,setOpenInquiry]=useState<{id?:string;token:number}|undefined>();
  const [showProperty,setShowProperty] = useState(false);
  const [showStay,setShowStay] = useState(false);
  const [editingProperty,setEditingProperty] = useState<Property|null>(null);
  const [previewProperty,setPreviewProperty] = useState<Property|null>(null);
  const [calendarProperty,setCalendarProperty]=useState<Property|null>(null);
  const [publishing,setPublishing]=useState(false);

  const [storageError,setStorageError]=useState("");
  const [briefNotice,setBriefNotice]=useState("");
  const [hydrated,setHydrated] = useState(false);

  useEffect(()=>{
    try {
    const savedRole = localStorage.getItem("legolfe_host_role") as Role|null;
    const parsedProperties = JSON.parse(localStorage.getItem("legolfe_host_properties") || "null") as Partial<Property>[]|null;
    const savedStays = JSON.parse(localStorage.getItem("legolfe_host_stays") || "null");
    setRole(savedRole);
    setProperties((parsedProperties || seedProperties).map(p=>({...normalizeProperty(p),announcerType:p.announcerType||(savedRole==='concierge'?'agency':'owner')})));
    setStays(savedStays || seedStays);
    setHydrated(true);
    }catch{setStorageError(fr?"Impossible de lire les annonces enregistrées sur ce navigateur.":"Unable to read listings saved in this browser.");}
  },[]);
  useEffect(()=>{ if(hydrated)try{localStorage.setItem("legolfe_host_properties",JSON.stringify(properties));}catch{setStorageError(fr?"Enregistrement impossible : libérez de l’espace sur cet appareil.":"Unable to save: free up storage on this device.");} },[properties,hydrated]);
  useEffect(()=>{if(hydrated)try{localStorage.setItem("legolfe_host_stays",JSON.stringify(stays));}catch{setStorageError(fr?"Impossible de conserver les séjours sur cet appareil.":"Unable to save stays on this device.");}},[stays,hydrated]);

  function chooseRole(next:Role){ setRole(next); localStorage.setItem("legolfe_host_role",next); }
  function openCreateProperty(){ setEditingProperty(null); setShowProperty(true); }
  function openEditProperty(property:Property){ setEditingProperty(property); setShowProperty(true); }
  function closeProperty(){ setEditingProperty(null); setShowProperty(false); }

  async function saveProperty(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const amenities=String(fd.get("amenities")||"").split(",").map(x=>x.trim()).filter(Boolean);
    const images=JSON.parse(String(fd.get("images")||"[]")) as string[];
    const item:Property={
      mapLocation:normalizeMapLocation(JSON.parse(String(fd.get('mapLocation')||'null'))),district:String(fd.get('district')||'').trim().slice(0,80),
      announcerType:role==='concierge'?'agency':'owner',
      id:editingProperty?.id || `property-${crypto.randomUUID()}`,
      name:String(fd.get("name")||""), location:String(fd.get("location")||""), guests:Number(fd.get("guests")||0),
      bedrooms:Number(fd.get("bedrooms")||0), bathrooms:Number(fd.get("bathrooms")||0),
      visibility:String(fd.get("visibility")) as Visibility,
      managedBy:String(fd.get("managedBy")||""),
      status:String(fd.get("status")) as ListingStatus,
      price:Number(fd.get("price")||0), distanceFromSaintTropez:Number(fd.get("distance")||0),
      description:String(fd.get("description")||""), amenities, images,
      titleFr:String(fd.get("titleFr")||""),titleEn:String(fd.get("titleEn")||""),descriptionFr:String(fd.get("descriptionFr")||""),descriptionEn:String(fd.get("descriptionEn")||""),highlightsFr:JSON.parse(String(fd.get("highlightsFr")||"[]")),highlightsEn:JSON.parse(String(fd.get("highlightsEn")||"[]")),
    };
    if(editingProperty?.online){setPublishing(true);try{if(item.status==='published'&&item.visibility==='public'){const result=await publishVilla(item);Object.assign(item,result);}else {await pauseVilla(item.id);item.online=true;}}catch{setStorageError(fr?'La mise à jour en ligne a échoué. Le formulaire reste ouvert ; réessayez.':'Online update failed. The form stays open; please retry.');return;}finally{setPublishing(false);}}
    const next=editingProperty&&properties.some(p=>p.id===item.id)?properties.map(p=>p.id===item.id?item:p):[item,...properties];
    try{localStorage.setItem("legolfe_host_properties",JSON.stringify(next));}catch{setStorageError(fr?"Enregistrement impossible : libérez de l’espace sur cet appareil.":"Unable to save: free up storage on this device.");return;}
    setStorageError("");setProperties(next);
    closeProperty();
  }
  function duplicateProperty(property:Property){
    const copy={...property,id:`property-${crypto.randomUUID()}`,name:`${property.name} — COPY`,status:"draft" as ListingStatus,online:false};
    setProperties(list=>[copy,...list]);
  }
  async function deleteProperty(property:Property){
    if(!window.confirm(fr?`Supprimer définitivement ${property.name} ?`:`Delete ${property.name} permanently?`)) return;
    if(property.online){try{await removeVilla(property.id);}catch{setStorageError(fr?'Impossible de retirer l’annonce en ligne. Réessayez avant de la supprimer.':'Unable to remove the online listing. Please retry.');return;}}
    setProperties(list=>list.filter(p=>p.id!==property.id));
  }
  async function togglePublish(property:Property){
    if(property.status!=="published"&&!window.confirm(fr?"Avez-vous relu et validé le texte et les informations de cette annonce ?":"Have you reviewed and approved this listing’s copy and details?"))return;
    const next:ListingStatus=property.status==="published"?"paused":"published";
    if(property.online){try{if(next==='published'&&property.visibility==='public')await publishVilla({...property,status:next});else await pauseVilla(property.id);}catch{setStorageError(fr?'Impossible de mettre en pause la fiche publique. Réessayez.':'Unable to pause the public listing. Please retry.');return;}}
    setProperties(list=>list.map(p=>p.id===property.id?{...p,status:next}:p));
  }
  async function putOnline(property:Property){if(publishing)return;setPublishing(true);setStorageError('');try{const result=await publishVilla(property);const next=properties.map(p=>p.id===property.id?result:p);localStorage.setItem('legolfe_host_properties',JSON.stringify(next));setProperties(next);}catch(e){setStorageError(e instanceof Error&&e.message.includes('Connectez')?e.message:(fr?'Mise en ligne non confirmée. Vérifiez votre connexion et l’activation du stockage des annonces. Votre annonce locale est conservée.':'Publishing not confirmed. Check sign-in and listing storage setup. Your local listing is preserved.'));}finally{setPublishing(false);}}
  async function syncListings(){setStorageError('');try{const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)throw new Error('SIGN_IN_REQUIRED');const {data,error}=await supabase.from('villa_listings').select('id,payload,status,visibility').eq('owner_id',user.id).order('created_at',{ascending:false}).limit(200).abortSignal(AbortSignal.timeout(15000));if(error)throw error;const remote=(data||[]).flatMap(row=>{const p=remoteProperty(row);return p?[p]:[];});const {data:{user:current}}=await supabase.auth.getUser();if(current?.id!==user.id)throw new Error('SIGN_IN_REQUIRED');setProperties(previous=>[...remote,...previous.filter(p=>!p.online&&!remote.some(r=>r.id===p.id))]);}catch(e){setStorageError(e instanceof Error&&e.message==='SIGN_IN_REQUIRED'?(fr?'Connectez-vous pour retrouver vos annonces en ligne.':'Sign in to load your online listings.'):(fr?'Impossible de charger les annonces en ligne.':'Unable to load online listings.'));}}
  function showInquiry(id?:string){setOpenInquiry(previous=>({id,token:(previous?.token||0)+1}));setView('inquiries');}
  function createInquiryBrief(stay:HostStay){
    try{const items=JSON.parse(localStorage.getItem('legolfe_host_stays')||'[]') as Stay[];if(!Array.isArray(items))throw new Error('Invalid stays');const next=items.some(s=>s.sourceInquiryId===stay.sourceInquiryId)?items:[stay,...items];localStorage.setItem('legolfe_host_stays',JSON.stringify(next));setStays(next);setBriefNotice(fr?'Brief conservé sur cet appareil. Aucune réservation n’est confirmée.':'Brief saved on this device. No booking has been confirmed.');setView('stays');return true;}catch{setStorageError(fr?'Impossible de conserver le brief sur cet appareil.':'Unable to save the brief on this device.');return false;}
  }

  function addStay(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); const fd=new FormData(e.currentTarget);
    const item:Stay={id:`stay-${Date.now()}`,guest:String(fd.get("guest")),property:String(fd.get("property")),arrival:String(fd.get("arrival")),departure:String(fd.get("departure")),guests:Number(fd.get("guests")),status:"brief"};
    setStays(s=>[item,...s]); setShowStay(false); e.currentTarget.reset();
  }

  if(!role) return <section className="lg-shell py-16 md:py-24">
    <p className="lg-kicker lg-accent">HOST / PARTNER DESK</p>
    <h1 className="lg-display mt-6 text-[16vw] md:text-[118px]">{fr?<>QUI<br/>ÊTES-VOUS?</>:<>WHO<br/>ARE YOU?</>}</h1>
    <div className="mt-14 grid border-y border-black md:grid-cols-2">
      {[{key:"owner" as Role,n:fr?"PROPRIÉTAIRE":"PRIVATE OWNER",d:fr?"Une ou quelques propriétés. Publiez vos annonces, recevez les demandes et construisez le séjour de vos voyageurs.":"One or a few properties. Publish listings, receive requests and build the guest stay."},{key:"concierge" as Role,n:fr?"CONCIERGERIE / AGENCE":"CONCIERGE / AGENCY",d:fr?"Gérez un portefeuille, plusieurs annonces, séjours clients et vos propres recommandations.":"Manage a portfolio, multiple listings, guest stays and your own recommendations."}].map((o,i)=><button key={o.key} onClick={()=>chooseRole(o.key)} className={`group px-0 py-12 text-left md:p-12 ${i===0?"border-b border-black md:border-b-0 md:border-r":""}`}>
        <p className="lg-kicker">0{i+1}</p><h2 className="mt-5 text-4xl font-black tracking-[-.05em] md:text-6xl group-hover:text-[var(--lg-blue)]">{o.n}</h2><p className="mt-5 max-w-md text-base font-semibold leading-7 text-black/55">{o.d}</p><span className="mt-8 inline-block text-2xl">↗</span>
      </button>)}
    </div>
  </section>;

  return <section className="lg-shell py-12 md:py-20">
    {storageError&&<p role="alert" className="border border-red-600 p-4">{storageError}</p>}{briefNotice&&<p role="status" className="mb-6 border border-black/20 p-4 text-sm">{briefNotice}</p>}
    <div className="flex flex-wrap items-end justify-between gap-8 border-b border-black pb-8">
      <div><p className="lg-kicker lg-accent">{role==="concierge"?(fr?"CONCIERGERIE / AGENCE":"CONCIERGE / AGENCY"):(fr?"PROPRIÉTAIRE":"PRIVATE OWNER")}</p><h1 className="lg-title mt-4 text-[13vw] md:text-[86px]">HOST DESK.</h1></div>
      <button onClick={()=>{localStorage.removeItem("legolfe_host_role");setRole(null)}} className="text-[10px] font-black uppercase tracking-[.14em] underline underline-offset-4">{fr?"Changer de profil":"Switch profile"}</button>
    </div>

    <p className="mt-5 text-sm leading-6 text-black/55">{fr?"Vos brouillons et aperçus sont conservés sur cet appareil. Utilisez Mettre en ligne pour créer une fiche publique après connexion.":"Drafts and previews stay on this device. Use Publish online to create a public page after signing in."}</p><div className="sticky top-0 z-20 -mx-5 flex gap-5 overflow-x-auto border-b border-black bg-white px-5 py-4 text-[10px] font-black uppercase tracking-[.14em] md:-mx-8 md:px-8">
      {[["today",fr?"Tableau de bord":"Dashboard"],["properties",fr?"Annonces":"Listings"],["confirmed",fr?"Séjours confirmés":"Confirmed stays"],["stays",fr?"Briefs":"Briefs"],["inquiries",fr?"Demandes":"Enquiries"]].map(([k,l])=><button key={k} onClick={()=>setView(k as typeof view)} className={view===k?"text-[var(--lg-blue)]":""}>{l}</button>)}
    </div>

    {(view==='today'||view==='confirmed')&&<HostOverview key={view} fr={fr} properties={properties} mode={view==='confirmed'?'stays':'overview'} onProperty={openEditProperty} onCalendar={setCalendarProperty} onInquiry={showInquiry} onListings={()=>{setView('properties');void syncListings();}} onConfirmed={()=>setView('confirmed')} onCreate={openCreateProperty}/>}

    {view==="properties" && <div className="py-12">
      <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="lg-kicker">{fr?"MES ANNONCES":"MY LISTINGS"}</p><h2 className="lg-title mt-4 text-6xl md:text-8xl">{properties.length} {fr?"MAISON(S).":"HOME(S)."}</h2></div><button onClick={openCreateProperty} className="lg-btn lg-btn--dark">{fr?"Ajouter une annonce":"Add listing"} +</button></div>
      <button onClick={()=>void syncListings()} disabled={publishing} className="lg-btn mt-6">{fr?"Retrouver mes annonces en ligne":"Load my online listings"} ↻</button><div className="mt-10 border-t border-black">{properties.map(p=><article key={p.id} className="grid gap-6 border-b border-black py-7 md:grid-cols-[160px_1.1fr_.6fr_auto] md:items-center">
        <div className="aspect-[4/3] overflow-hidden bg-black/[.04]">{p.images[0]?<HostPhoto src={p.images[0]} alt="" className="h-full w-full object-cover"/>:<div className="flex h-full items-end p-4 text-[10px] font-black uppercase tracking-[.14em] text-black/35">{fr?"Photo à ajouter":"Add a photo"}</div>}</div>
        <div><div className="flex flex-wrap gap-2"><StatusBadge status={p.status} fr={fr}/><span className="border border-black px-2 py-1 text-[9px] font-black uppercase tracking-[.12em]">{p.visibility}</span></div><p className="lg-kicker mt-4 text-black/45">{p.location} · {p.distanceFromSaintTropez} km ST-TROPEZ</p><h3 className="mt-2 text-4xl font-black tracking-[-.05em]">{p.name}</h3><p className="mt-2 text-sm font-bold text-black/45">{fr?"Géré par":"Managed by"} {p.managedBy}</p></div>
        <div><p className="text-2xl font-black">{p.price?`${p.price.toLocaleString(fr?"fr-FR":"en-GB")} € / ${fr?"sem.":"week"}`:(fr?"Prix sur demande":"Price on request")}</p><p className="mt-2 text-sm font-bold text-black/45">{p.guests} {fr?"voyageurs":"guests"} · {p.bedrooms} {fr?"ch.":"beds"} · {p.bathrooms} {fr?"sdb":"baths"}</p></div>
        <div className="flex flex-wrap gap-2 md:justify-end"><button onClick={()=>setPreviewProperty(p)} className="lg-btn">{fr?"Aperçu voyageur":"Guest preview"}</button>{p.status==="published"&&p.visibility==="public"&&!p.online&&<button disabled={publishing} onClick={()=>void putOnline(p)} className="lg-btn lg-btn--dark">{publishing?(fr?"Mise en ligne…":"Publishing…"):(fr?"Mettre en ligne":"Publish online")}</button>}{p.online&&p.status==="published"&&p.visibility==="public"&&<Link href={`/villa/${p.id}`} className="lg-btn">{fr?"Voir la fiche publique":"View public page"} ↗</Link>}{p.online&&<button disabled={publishing} onClick={()=>setCalendarProperty(p)} className="lg-btn">{fr?"Disponibilités":"Availability"}</button>}<button disabled={publishing} onClick={()=>openEditProperty(p)} className="lg-btn">{fr?"Modifier":"Edit"}</button><button disabled={publishing} onClick={()=>togglePublish(p)} className="lg-btn lg-btn--dark">{p.status==="published"?(fr?"Mettre en pause":"Pause"):(fr?"Publier":"Publish")}</button><button onClick={()=>duplicateProperty(p)} className="px-2 text-lg" title={fr?"Dupliquer":"Duplicate"}>⧉</button><button disabled={publishing} onClick={()=>deleteProperty(p)} className="px-2 text-lg" title={fr?"Supprimer":"Delete"}>×</button></div>
      </article>)}</div>
    </div>}

    {view==="stays" && <div className="py-12"><div className="flex items-end justify-between"><div><p className="lg-kicker">{fr?"BRIEFS SUR CET APPAREIL":"BRIEFS ON THIS DEVICE"}</p><h2 className="lg-title mt-4 text-6xl md:text-8xl">{fr?"À ORGANISER.":"TO PLAN."}</h2></div><button onClick={()=>setShowStay(true)} className="lg-btn lg-btn--dark">{fr?"Nouveau brief":"New brief"} +</button></div><div className="mt-10 border-t border-black">{stays.map(s=><article key={s.id} className="grid gap-5 border-b border-black py-7 md:grid-cols-[1.1fr_.8fr_.5fr_auto] md:items-center"><div><p className="text-3xl font-black tracking-[-.04em]">{s.guest}</p><p className="mt-1 text-sm font-bold text-black/45">{s.property}</p>{s.sourceInquiryId?.startsWith("demo:")&&<p className="mt-2 text-xs font-bold text-[var(--lg-blue)]">{fr?"EXEMPLE FICTIF":"FICTIONAL SAMPLE"}</p>}{s.message&&<details className="mt-4 text-sm"><summary className="cursor-pointer font-bold">{fr?"Attentes du voyageur":"Guest expectations"}</summary><p className="mt-3 whitespace-pre-line leading-6">{s.message}</p></details>}</div><p className="font-black">{s.arrival}<br/>→ {s.departure}</p><span className="lg-kicker text-[var(--lg-blue)]">{s.status==='brief'?(fr?'BRIEF À PRÉPARER':'BRIEF TO PREPARE'):s.status==='planning'?(fr?'EN ORGANISATION':'PLANNING'):(fr?'CONFIRMÉ (DÉCLARÉ)':'CONFIRMED (DECLARED)')}</span><div className="flex flex-wrap gap-3"><Link href={`/${locale}/ask?q=${encodeURIComponent(briefAsk(s,fr))}`} className="lg-btn">{fr?'Organiser le séjour':'Plan the stay'} ↗</Link>{s.status==='brief'&&<button className="lg-btn" onClick={()=>setStays(items=>items.map(item=>item.id===s.id?{...item,status:'planning'}:item))}>{fr?'Passer en organisation':'Move to planning'}</button>}</div></article>)}</div></div>}

    <div hidden={view!=='inquiries'}><HostInquiryDesk openInquiry={openInquiry} fr={fr} onCreateBrief={createInquiryBrief} briefIds={stays.flatMap(s=>s.sourceInquiryId?[s.sourceInquiryId]:[])}/></div>
    {showProperty && <>{publishing&&<div role="status" className="fixed inset-0 z-[70] flex items-center justify-center bg-white/90 text-2xl font-black">{fr?"Mise à jour en cours…":"Updating…"}</div>}<PropertyEditor fr={fr} role={role} property={editingProperty} onClose={closeProperty} onSubmit={saveProperty}/></>} 
    {showStay && <StayEditor fr={fr} properties={properties} onClose={()=>setShowStay(false)} onSubmit={addStay}/>} 
    {calendarProperty&&<HostAvailability key={calendarProperty.id} id={calendarProperty.id} name={calendarProperty.name} fr={fr} onClose={()=>setCalendarProperty(null)}/>}
    {previewProperty && <PropertyPreview fr={fr} property={previewProperty} onClose={()=>setPreviewProperty(null)}/>} 
  </section>;
}

function StatusBadge({status,fr}:{status:ListingStatus;fr:boolean}){
  const label=status==="published"?(fr?"PUBLIÉE":"PUBLISHED"):status==="paused"?(fr?"EN PAUSE":"PAUSED"):(fr?"BROUILLON":"DRAFT");
  return <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-[.12em] ${status==="published"?"bg-[var(--lg-blue)] text-white":"border border-black"}`}>{label}</span>;
}

function StayEditor({fr,properties,onClose,onSubmit}:{fr:boolean;properties:Property[];onClose:()=>void;onSubmit:(e:FormEvent<HTMLFormElement>)=>void}){
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4 md:p-10"><div className="ml-auto min-h-full max-w-2xl bg-white p-7 md:p-12"><button onClick={onClose} className="float-right text-2xl">×</button><form onSubmit={onSubmit}><p className="lg-kicker lg-accent">{fr?"NOUVEAU SÉJOUR":"NEW STAY"}</p><h3 className="lg-title mt-5 text-5xl">{fr?"CRÉER LE BRIEF.":"CREATE THE BRIEF."}</h3><Field label={fr?"CLIENT":"GUEST"}><input required name="guest" className="editor-input text-2xl font-black"/></Field><Field label={fr?"PROPRIÉTÉ":"PROPERTY"}><select name="property" className="editor-input bg-white font-black">{properties.map(p=><option key={p.id}>{p.name}</option>)}</select></Field><div className="grid grid-cols-2 gap-5"><Field label={fr?"ARRIVÉE":"ARRIVAL"}><input required type="date" name="arrival" className="editor-input"/></Field><Field label={fr?"DÉPART":"DEPARTURE"}><input required type="date" name="departure" className="editor-input"/></Field></div><Field label={fr?"VOYAGEURS":"GUESTS"}><input required min="1" type="number" name="guests" defaultValue="2" className="editor-input text-2xl font-black"/></Field><button className="lg-btn lg-btn--dark mt-8">{fr?"Créer le brief":"Create brief"}</button></form></div></div>;
}

function PropertyPreview({fr,property,onClose}:{fr:boolean;property:Property;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);useEffect(()=>{const previous=document.body.style.overflow;document.body.style.overflow='hidden';dialog.current?.showModal();return()=>{document.body.style.overflow=previous;};},[]);
 return <dialog ref={dialog} onCancel={onClose} onClose={onClose} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-white p-0 text-black backdrop:bg-black/70" aria-label={fr?'Aperçu de la fiche villa':'Villa page preview'}><div className="sticky top-0 z-20 border-b border-black bg-white"><div className="lg-shell flex items-center justify-between gap-5 py-4"><p className="lg-kicker">{fr?'APERÇU VOYAGEUR / ANNONCE LOCALE':'GUEST PREVIEW / LOCAL LISTING'}</p><button onClick={onClose} className="lg-btn">{fr?'Retour à l’édition':'Back to editor'} ×</button></div></div><VillaDetail villa={propertyVilla(property)} today={parisIsoDay()} preview locale={fr?'fr':'en'}/></dialog>;
}

function Field({label,children}:{label:string;children:ReactNode}){return <label className="mt-7 block"><span className="lg-kicker">{label}</span><div className="mt-2">{children}</div></label>}
