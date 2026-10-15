"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {places} from "../data/places";
import type {Locale} from "../lib/i18n";
import {parseSavedDayPlan,SAVED_DAY_PLAN_EVENT,SAVED_DAY_PLAN_KEY,type SavedDayPlan} from "../lib/savedDayPlan";
export default function SavedDayPlanSection({locale}:{locale:Locale}){
 const fr=locale==="fr";
 const [plan,setPlan]=useState<SavedDayPlan|null>(null);
 const [error,setError]=useState("");
 useEffect(()=>{
  function refresh(){try{setPlan(parseSavedDayPlan(localStorage.getItem(SAVED_DAY_PLAN_KEY),places));}catch{setPlan(null);}}
  refresh();window.addEventListener("storage",refresh);window.addEventListener(SAVED_DAY_PLAN_EVENT,refresh);
  return()=>{window.removeEventListener("storage",refresh);window.removeEventListener(SAVED_DAY_PLAN_EVENT,refresh);};
 },[]);
 function update(ids:string[]){
  try{
   if(!ids.length){localStorage.removeItem(SAVED_DAY_PLAN_KEY);setPlan(null);}
   else if(plan){const next={...plan,placeIds:ids,updatedAt:new Date().toISOString()};localStorage.setItem(SAVED_DAY_PLAN_KEY,JSON.stringify(next));setPlan(next);}
   window.dispatchEvent(new Event(SAVED_DAY_PLAN_EVENT));setError("");
  }catch{setError(fr?"Impossible de modifier le programme sur cet appareil.":"Unable to update this plan on this device.");}
 }
 if(!plan)return null;
 return <section className="mt-14 border-t border-white/25 pt-8" aria-label={fr?"Mon programme enregistré":"My saved plan"}>
  <p className="lg-kicker text-[#b9e9f4]">{fr?"MON PROGRAMME":"MY PLAN"}</p>
  <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">{fr?"UN SÉJOUR À VOTRE RYTHME.":"YOUR STAY, YOUR PACE."}</h2>
  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">{plan.format==="half"?(fr?"Demi-journée":"Half day"):(fr?"Journée":"Full day")} · {fr?"Sauvegardé sur cet appareil, sans compte ni synchronisation. Vérifiez trajets, horaires et réservations.":"Saved on this device only, without account sync. Check travel, opening times and bookings."}</p>
  <ol className="mt-7 grid gap-3 md:grid-cols-3">{plan.placeIds.map((id,index)=>{const p=places.find(p=>p.id===id);if(!p)return null;return <li key={id} className="border border-white/30 p-5">
   <p className="lg-kicker text-[#b9e9f4]">{String(index+1).padStart(2,"0")} / {p.location}</p>
   <Link href={`/${locale}/place/${id}`} className="mt-3 block text-xl font-black uppercase hover:underline">{p.name} ↗</Link>
   <div className="mt-5 flex gap-2">
    <button type="button" onClick={()=>{if(index===0)return;const ids=[...plan.placeIds];[ids[index-1],ids[index]]=[ids[index],ids[index-1]];update(ids);}} disabled={index===0} aria-label={fr?"Monter":"Move up"} className="border border-white/40 px-3 py-2 text-xs disabled:opacity-30">↑</button>
    <button type="button" onClick={()=>{if(index===plan.placeIds.length-1)return;const ids=[...plan.placeIds];[ids[index+1],ids[index]]=[ids[index],ids[index+1]];update(ids);}} disabled={index===plan.placeIds.length-1} aria-label={fr?"Descendre":"Move down"} className="border border-white/40 px-3 py-2 text-xs disabled:opacity-30">↓</button>
    <button type="button" onClick={()=>update(plan.placeIds.filter(x=>x!==id))} className="border border-white/40 px-3 py-2 text-xs">{fr?"Retirer":"Remove"}</button>
   </div>
  </li>})}</ol>
  <div className="mt-5 flex flex-wrap items-center gap-4"><Link href={`/${locale}/ask`} className="text-xs font-bold text-[#b9e9f4] underline">{fr?"Créer un autre programme":"Create another plan"} ↗</Link><button type="button" onClick={()=>update([])} className="text-xs font-bold text-white/65 underline">{fr?"Effacer ce programme":"Delete this plan"}</button></div>
  {error&&<p role="alert" className="mt-3 text-sm text-red-200">{error}</p>}
 </section>;
}
