"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { supabase } from "../../../lib/supabase";
import { editorialSources } from "../../../data/agendaSources";

type Item={
  id:string;content_type:"event"|"news";source_label:string;external_url:string;title:string;title_fr:string|null;
  summary:string|null;summary_fr:string|null;why:string|null;why_fr:string|null;start_date:string|null;end_date:string|null;
  event_time:string|null;location:string|null;venue:string|null;category:string|null;image_url:string|null;created_at:string;
};

export default function EditorialDesk(){
  const params=useParams<{locale:string}>(); const locale=params.locale==="fr"?"fr":"en"; const fr=locale==="fr";
  const [allowed,setAllowed]=useState<boolean|null>(null); const [items,setItems]=useState<Item[]>([]);
  const [busy,setBusy]=useState<string|null>(null); const [syncing,setSyncing]=useState(false); const [report,setReport]=useState<any>(null);
  const [type,setType]=useState<"all"|"event"|"news">("all");

  async function load(){
    const {data:moderator}=await supabase.rpc("is_community_moderator");
    if(!moderator){setAllowed(false);return}
    setAllowed(true);
    const {data}=await supabase.from("editorial_inbox").select("*").eq("status","pending").order("start_date",{ascending:true});
    setItems((data as Item[]|null)??[]);
  }
  useEffect(()=>{load()},[]);
  const shown=useMemo(()=>type==="all"?items:items.filter(i=>i.content_type===type),[items,type]);

  function patch(id:string,key:keyof Item,value:any){setItems(cur=>cur.map(x=>x.id===id?{...x,[key]:value}:x))}

  async function sync(){
    setSyncing(true);setReport(null);
    const {data:{session}}=await supabase.auth.getSession();
    if(!session){setSyncing(false);return}
    const res=await fetch("/api/editorial/refresh",{method:"POST",headers:{Authorization:`Bearer ${session.access_token}`}});
    const json=await res.json();setReport(json);setSyncing(false);await load();
  }

  async function review(item:Item,status:"approved"|"rejected"){
    setBusy(item.id);
    const {data:{user}}=await supabase.auth.getUser();
    const {error}=await supabase.from("editorial_inbox").update({
      status,title:item.title,title_fr:item.title_fr,summary:item.summary,summary_fr:item.summary_fr,
      why:item.why,why_fr:item.why_fr,category:item.category,start_date:item.start_date,end_date:item.end_date,
      event_time:item.event_time,location:item.location,venue:item.venue,
      reviewed_at:new Date().toISOString(),reviewed_by:user?.id??null,updated_at:new Date().toISOString()
    }).eq("id",item.id);
    if(!error)setItems(cur=>cur.filter(x=>x.id!==item.id));
    setBusy(null);
  }

  return <main className="min-h-screen bg-white text-black">
    <SiteHeader locale={locale}/>
    <section className="lg-shell py-16 md:py-24">
      <p className="lg-kicker text-[var(--lg-blue)]">LE GOLFE / EDITORIAL DESK</p>
      <div className="mt-5 grid gap-8 border-b-4 border-black pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <h1 className="lg-title text-[17vw] uppercase leading-[.78] md:text-[120px]">{fr?<>À<br/><span className="lg-accent">VALIDER.</span></>:<>TO<br/><span className="lg-accent">REVIEW.</span></>}</h1>
        <button onClick={sync} disabled={syncing||allowed!==true} className="lg-btn lg-btn--dark">{syncing?(fr?"Synchronisation…":"Syncing…"):(fr?"Actualiser les sources":"Refresh sources")}</button>
      </div>

      {allowed===false&&<div className="mt-12 border-y border-black py-10"><p className="text-2xl font-black uppercase">{fr?"Accès modérateur uniquement.":"Moderator access only."}</p><Link href={`/${locale}/account`} className="lg-btn mt-6">{fr?"Compte":"Account"}</Link></div>}
      {allowed===null&&<div className="mt-12 h-40 animate-pulse bg-neutral-100"/>}

      {allowed&&<>
        <div className="mt-10 flex flex-wrap gap-2">
          {(["all","event","news"] as const).map(x=><button key={x} onClick={()=>setType(x)} className={`border px-4 py-3 text-[10px] font-black uppercase tracking-[.14em] ${type===x?"border-black bg-black text-white":"border-black/20"}`}>{x==="all"?(fr?"Tout":"All"):x==="event"?(fr?"Agenda":"Events"):"Local"}</button>)}
        </div>

        {report&&<div className="mt-8 border-l-4 border-[var(--lg-blue)] bg-neutral-50 p-5"><p className="text-sm font-black uppercase">{report.ok?`${report.inserted||0} ${fr?"éléments traités":"items processed"}`:(report.error||"Sync error")}</p></div>}

        <div className="mt-10 grid gap-3 border-y border-black py-6 md:grid-cols-2 lg:grid-cols-4">
          {editorialSources.map(s=><a key={s.key} href={s.url} target="_blank" rel="noreferrer" className="border-t border-black/20 pt-3"><p className="text-[9px] font-black uppercase tracking-[.14em] text-[var(--lg-blue)]">{s.type} · {s.location}</p><p className="mt-2 text-sm font-black uppercase">{s.label} ↗</p></a>)}
        </div>

        {shown.length===0?<div className="mt-12 border-y border-black py-12"><p className="text-3xl font-black uppercase">{fr?"Rien en attente.":"Nothing pending."}</p></div>:
        <div className="mt-12 border-t-4 border-black">
          {shown.map(item=><article key={item.id} className="grid gap-8 border-b border-black py-8 lg:grid-cols-[180px_1fr_180px]">
            <div>
              <p className="lg-kicker text-[var(--lg-blue)]">{item.content_type==="event"?"WHAT'S ON":"LOCAL"}</p>
              <p className="mt-3 text-xs font-black uppercase">{item.source_label}</p>
              <p className="mt-2 text-[10px] font-bold uppercase text-black/45">{item.start_date||"—"} · {item.location||"—"}</p>
              {item.image_url&&<img src={item.image_url} alt="" className="mt-4 aspect-square w-full object-cover"/>}
            </div>
            <div className="space-y-4">
              <input value={item.title_fr||""} onChange={e=>patch(item.id,"title_fr",e.target.value)} placeholder="Titre FR" className="w-full border-b-2 border-black bg-transparent py-2 text-2xl font-black uppercase outline-none"/>
              <input value={item.title||""} onChange={e=>patch(item.id,"title",e.target.value)} placeholder="Title EN" className="w-full border-b border-black/25 bg-transparent py-2 text-lg font-bold outline-none"/>
              <textarea value={item.summary_fr||""} onChange={e=>patch(item.id,"summary_fr",e.target.value)} placeholder="Résumé FR" className="min-h-24 w-full border border-black/20 p-3 text-sm font-semibold outline-none"/>
              <textarea value={item.why_fr||""} onChange={e=>patch(item.id,"why_fr",e.target.value)} placeholder="Pourquoi LE GOLFE le retient ?" className="min-h-20 w-full border-l-4 border-[var(--lg-blue)] bg-neutral-50 p-3 text-sm font-black outline-none"/>
              <div className="grid gap-3 md:grid-cols-3">
                <input value={item.category||""} onChange={e=>patch(item.id,"category",e.target.value)} placeholder={item.content_type==="event"?"music / culture / family…":"need / new / around"} className="border border-black/20 p-3 text-xs font-bold"/>
                <input value={item.location||""} onChange={e=>patch(item.id,"location",e.target.value)} placeholder="Lieu" className="border border-black/20 p-3 text-xs font-bold"/>
                <input value={item.venue||""} onChange={e=>patch(item.id,"venue",e.target.value)} placeholder="Venue" className="border border-black/20 p-3 text-xs font-bold"/>
              </div>
              <a href={item.external_url} target="_blank" rel="noreferrer" className="inline-block text-[10px] font-black uppercase tracking-[.12em] text-[var(--lg-blue)]">{fr?"Voir la source":"Open source"} ↗</a>
            </div>
            <div className="flex gap-2 lg:flex-col">
              <button disabled={busy===item.id} onClick={()=>review(item,"approved")} className="lg-btn lg-btn--dark">{fr?"Publier":"Publish"}</button>
              <button disabled={busy===item.id} onClick={()=>review(item,"rejected")} className="lg-btn">{fr?"Ignorer":"Reject"}</button>
            </div>
          </article>)}
        </div>}
      </>}
    </section>
    <SiteFooter locale={locale}/>
  </main>
}
