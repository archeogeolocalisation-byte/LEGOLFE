"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import type {AskDayPlan} from "../lib/askMatching";
import type {Locale} from "../lib/i18n";
import {categoryFR} from "../lib/i18n";
import {mapAskPlan} from "../lib/askPlanMap";
import AskPlanMap from "./AskPlanMap";
import {places} from "../data/places";
import {SAVED_DAY_PLAN_KEY,SAVED_DAY_PLAN_EVENT,makeSavedDayPlan} from "../lib/savedDayPlan";
export default function EditableAskPlan({plan,locale}:{plan:AskDayPlan;locale:Locale}){
 const fr=locale==="fr";
 const [ids,setIds]=useState<string[]>(()=>plan.steps.map(x=>x.match.p.id));
 const [status,setStatus]=useState<"idle"|"saved"|"error">("idle");
 const signature=plan.steps.map(x=>x.match.p.id).join("|")+"|"+plan.format;
 useEffect(()=>{setIds(plan.steps.map(x=>x.match.p.id));setStatus("idle");},[signature]);
 const edited=useMemo(()=>({...plan,steps:ids.map(id=>plan.steps.find(s=>s.match.p.id===id)).filter((step):step is AskDayPlan["steps"][number]=>!!step)}),[plan,ids]);
 const mapped=useMemo(()=>mapAskPlan(edited),[edited]);
 function update(next:string[]){setIds(next);setStatus("idle");}
 function move(index:number,delta:number){const next=[...ids],to=index+delta;if(to<0||to>=next.length)return;[next[index],next[to]]=[next[to],next[index]];update(next);}
 function save(){
  const record=makeSavedDayPlan(ids,plan.format,places,new Date().toISOString());
  if(!record){setStatus("error");return;}
  try{localStorage.setItem(SAVED_DAY_PLAN_KEY,JSON.stringify(record));window.dispatchEvent(new Event(SAVED_DAY_PLAN_EVENT));setStatus("saved");}
  catch{setStatus("error");}
 }
 return <div className="mt-6">
  <div className="flex flex-wrap items-center gap-3">
   <button type="button" onClick={()=>update(plan.steps.map(s=>s.match.p.id))} className="border border-white/40 px-4 py-3 text-xs font-black uppercase">{fr?"Réinitialiser":"Reset"}</button>
   <button type="button" disabled={!ids.length} onClick={save} className="bg-[#b9e9f4] px-4 py-3 text-xs font-black uppercase text-[#082235] disabled:opacity-40">{fr?"Enregistrer dans Mon séjour":"Save to My Stay"} ↗</button>
   {status==="saved"&&<Link href={`/${locale}/saved`} className="text-xs font-bold text-[#b9e9f4] underline">{fr?"Programme enregistré — Mon séjour":"Saved — My Stay"} ↗</Link>}
   {status==="error"&&<p role="alert" className="text-xs text-red-200">{fr?"Impossible d’enregistrer ce programme sur cet appareil.":"Could not save this plan on this device."}</p>}
  </div>
  <ol className="mt-6 grid gap-3 md:grid-cols-3">{edited.steps.map((step,index)=><li key={step.match.p.id} className="border border-white/25 p-5">
   <p className="lg-kicker text-[#b9e9f4]">{String(index+1).padStart(2,"0")} / {fr?categoryFR[step.category].name:step.category}</p>
   <h3 className="mt-3 text-2xl font-black uppercase"><Link href={`/${locale}/place/${step.match.p.id}`} className="hover:underline">{step.match.p.name} ↗</Link></h3>
   <p className="mt-2 text-xs text-white/65">{step.match.p.location}</p>
   {step.source==="complementary"&&<p className="mt-3 text-xs text-[#b9e9f4]">{fr?"Suggestion complémentaire":"Complementary suggestion"}</p>}
   <div className="mt-5 flex gap-2">
    <button type="button" disabled={index===0} onClick={()=>move(index,-1)} aria-label={fr?"Monter l’étape":"Move stop up"} className="border border-white/40 px-3 py-2 text-xs disabled:opacity-30">↑</button>
    <button type="button" disabled={index===ids.length-1} onClick={()=>move(index,1)} aria-label={fr?"Descendre l’étape":"Move stop down"} className="border border-white/40 px-3 py-2 text-xs disabled:opacity-30">↓</button>
    <button type="button" onClick={()=>update(ids.filter(id=>id!==step.match.p.id))} className="border border-white/40 px-3 py-2 text-xs">{fr?"Retirer":"Remove"}</button>
   </div>
   {step.match.reasons.length>0&&<p className="mt-4 text-xs leading-5 text-white/65">{step.match.reasons.join(" · ")}</p>}
  </li>)}</ol>
  {ids.length>0&&<AskPlanMap markers={mapped.mapped} total={mapped.total} locale={locale}/>}
  {mapped.missing.length>0&&<p className="mt-3 text-xs text-white/55">{fr?"Sans coordonnées sourcées : ":"Without sourced coordinates: "}{mapped.missing.map(x=>x.name).join(" · ")}</p>}
  <p className="mt-4 text-xs leading-6 text-white/60">{fr?"Ce programme est éditorial : ordre des étapes modifiable, sans calcul de trajet ni disponibilité garantie. Enregistrement sur cet appareil uniquement.":"This is an editorial plan: reorder stops as you like; routes and availability are not verified. Saved on this device only."}</p>
 </div>;
}
