"use client";
import {useEffect,useState} from "react";
import {supabase} from "../lib/supabase";
import {fetchCloudDayPlan,saveCloudDayPlan,deleteCloudDayPlan} from "../lib/cloudDayPlan";
import Link from "next/link";
import {places} from "../data/places";
import type {Locale} from "../lib/i18n";
import {parseSavedDayPlan,SAVED_DAY_PLAN_EVENT,SAVED_DAY_PLAN_KEY,type SavedDayPlan} from "../lib/savedDayPlan";
export default function SavedDayPlanSection({locale}:{locale:Locale}){
 const fr=locale==="fr";
 const [plan,setPlan]=useState<SavedDayPlan|null>(null);
 const [error,setError]=useState("");
 const [cloud,setCloud]=useState<SavedDayPlan|null>(null);
 const [accountId,setAccountId]=useState<string|null>(null);
 const [cloudError,setCloudError]=useState(false);
 const [busy,setBusy]=useState(false);
 useEffect(()=>{
  function refresh(){try{setPlan(parseSavedDayPlan(localStorage.getItem(SAVED_DAY_PLAN_KEY),places));}catch{setPlan(null);}}
  refresh();window.addEventListener("storage",refresh);window.addEventListener(SAVED_DAY_PLAN_EVENT,refresh);
  return()=>{window.removeEventListener("storage",refresh);window.removeEventListener(SAVED_DAY_PLAN_EVENT,refresh);};
 },[]);
 useEffect(()=>{
  let active=true;
  async function load(){
   setCloud(null);setAccountId(null);setCloudError(false);
   try{const remote=await fetchCloudDayPlan();if(!active)return;setAccountId(remote.userId);setCloud(remote.plan);}
   catch{if(active)setCloudError(true);}
  }
  void load();
  const {data:listener}=supabase.auth.onAuthStateChange(()=>{queueMicrotask(()=>{if(active)void load();});});
  return()=>{active=false;listener.subscription.unsubscribe();};
 },[]);
 async function syncLocal(){
  if(!plan)return;
  setBusy(true);setError("");
  try{const success=await saveCloudDayPlan(plan);if(success)setCloud(plan);else setError(fr?"Connectez-vous pour synchroniser.":"Sign in to sync.");}
  catch{setCloudError(true);setError(fr?"Synchronisation indisponible ; la copie locale est conservée.":"Sync unavailable; local copy preserved.");}
  finally{setBusy(false);}
 }
 function useCloud(){
  if(!cloud)return;
  try{localStorage.setItem(SAVED_DAY_PLAN_KEY,JSON.stringify(cloud));setPlan(cloud);window.dispatchEvent(new Event(SAVED_DAY_PLAN_EVENT));setError("");}
  catch{setError(fr?"Stockage indisponible.":"Storage unavailable.");}
 }
 async function removeCloud(){
  setBusy(true);setError("");
  try{if(await deleteCloudDayPlan())setCloud(null);}
  catch{setError(fr?"Suppression du compte impossible.":"Unable to delete account copy.");}
  finally{setBusy(false);}
 }
 function addStopsToSavedPlaces(){
  try{
   const key="le-golfe-saved-places";
   const raw=JSON.parse(localStorage.getItem(key)||"[]");
   const current=Array.isArray(raw)?raw.filter((id):id is string=>typeof id==="string"&&places.some(p=>p.id===id)):[];
   const next=[...new Set([...current,...displayPlan.placeIds])];
   localStorage.setItem(key,JSON.stringify(next));
   window.dispatchEvent(new Event("le-golfe:saved-places"));
   setError(fr?"Étapes ajoutées aux adresses enregistrées.":"Stops added to saved places.");
  }catch{setError(fr?"Ajout impossible sur cet appareil.":"Unable to add stops on this device.");}
 }
 function update(ids:string[]){
  try{
   if(!ids.length){localStorage.removeItem(SAVED_DAY_PLAN_KEY);setPlan(null);}
   else if(displayPlan){const next={...displayPlan,placeIds:ids,updatedAt:new Date().toISOString()};localStorage.setItem(SAVED_DAY_PLAN_KEY,JSON.stringify(next));setPlan(next);}
   window.dispatchEvent(new Event(SAVED_DAY_PLAN_EVENT));setError("");
  }catch{setError(fr?"Impossible de modifier le programme sur cet appareil.":"Unable to update this plan on this device.");}
 }
 if(!plan&&!cloud)return null;
 const displayPlan=plan??cloud!;
 const conflict=!!plan&&!!cloud&&(plan.format!==cloud.format||plan.placeIds.join("|")!==cloud.placeIds.join("|"));
 return <section id="programme" className="mt-14 scroll-mt-24 border-t border-white/25 pt-8" aria-label={fr?"Mon programme enregistré":"My saved plan"}>
  <p className="lg-kicker text-[#b9e9f4]">{fr?"MON PROGRAMME":"MY PLAN"}</p>
  <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">{fr?"UN SÉJOUR À VOTRE RYTHME.":"YOUR STAY, YOUR PACE."}</h2>
  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">{displayPlan.format==="half"?(fr?"Demi-journée":"Half day"):(fr?"Journée":"Full day")} · {fr?"Conservé sur cet appareil, et synchronisable avec un compte. Vérifiez trajets, horaires et réservations.":"Stored on this device, with optional account sync. Check travel, opening times and bookings."}</p>
  {accountId&&<div className="mt-6 border border-white/30 p-4"><p className="text-sm font-bold">{fr?"Synchronisation du compte":"Account sync"}</p>
   <p className="mt-2 text-xs text-white/65">{conflict?(fr?"Deux versions différentes : choisissez celle à conserver. Aucun écrasement automatique.":"Two versions differ: choose which to keep. Nothing is overwritten automatically."):(fr?"Programme du compte et copie locale gérés séparément.":"Account and local copies are kept separately.")}</p>
   <div className="mt-3 flex flex-wrap gap-3">
    {plan&&<button type="button" disabled={busy} onClick={()=>void syncLocal()} className="border border-white/40 px-3 py-2 text-xs font-bold">{fr?"Envoyer la version locale au compte":"Upload local copy"}</button>}
    {cloud&&<button type="button" disabled={busy} onClick={useCloud} className="border border-white/40 px-3 py-2 text-xs font-bold">{fr?"Retrouver la version du compte":"Use account copy"}</button>}
    {cloud&&<button type="button" disabled={busy} onClick={()=>void removeCloud()} className="border border-white/40 px-3 py-2 text-xs font-bold">{fr?"Supprimer la copie cloud":"Delete cloud copy"}</button>}
   </div></div>}
  {cloudError&&<p role="status" className="mt-4 text-xs text-amber-200">{fr?"Synchronisation indisponible. Le programme local reste accessible.":"Sync unavailable. Local plan remains accessible."}</p>}
  <ol className="mt-7 grid gap-3 md:grid-cols-3">{displayPlan.placeIds.map((id,index)=>{const p=places.find(p=>p.id===id);if(!p)return null;return <li key={id} className="border border-white/30 p-5">
   <p className="lg-kicker text-[#b9e9f4]">{String(index+1).padStart(2,"0")} / {p.location}</p>
   <Link href={`/${locale}/place/${id}`} className="mt-3 block text-xl font-black uppercase hover:underline">{p.name} ↗</Link>
   <div className="mt-5 flex gap-2">
    <button type="button" onClick={()=>{if(index===0)return;const ids=[...displayPlan.placeIds];[ids[index-1],ids[index]]=[ids[index],ids[index-1]];update(ids);}} disabled={index===0} aria-label={fr?"Monter":"Move up"} className="border border-white/40 px-3 py-2 text-xs disabled:opacity-30">↑</button>
    <button type="button" onClick={()=>{if(index===displayPlan.placeIds.length-1)return;const ids=[...displayPlan.placeIds];[ids[index+1],ids[index]]=[ids[index],ids[index+1]];update(ids);}} disabled={index===displayPlan.placeIds.length-1} aria-label={fr?"Descendre":"Move down"} className="border border-white/40 px-3 py-2 text-xs disabled:opacity-30">↓</button>
    <button type="button" onClick={()=>update(displayPlan.placeIds.filter(x=>x!==id))} className="border border-white/40 px-3 py-2 text-xs">{fr?"Retirer":"Remove"}</button>
   </div>
  </li>})}</ol>
  <div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={addStopsToSavedPlaces} className="lg-btn lg-btn--accent">{fr?"Ajouter les étapes à mes adresses":"Add stops to saved places"} →</button><Link href={`/${locale}/stay`} className="lg-btn">{fr?"Choisir une maison":"Find a home"} →</Link></div>
  <div className="mt-5 flex flex-wrap items-center gap-4"><Link href={`/${locale}/ask`} className="text-xs font-bold text-[#b9e9f4] underline">{fr?"Créer un autre programme":"Create another plan"} ↗</Link><button type="button" onClick={()=>update([])} className="text-xs font-bold text-white/65 underline">{fr?"Effacer ce programme":"Delete this plan"}</button></div>
  {error&&<p role="alert" className="mt-3 text-sm text-red-200">{error}</p>}
 </section>;
}
