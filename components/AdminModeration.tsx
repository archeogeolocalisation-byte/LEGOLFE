"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {supabase} from "../lib/supabase";

type Post={id:string;place_id:string;user_id:string;type:string;status:string;comment:string|null;image_path:string|null;imageUrl:string|null;created_at:string;};
type State="pending"|"approved"|"rejected";
export default function AdminModeration({fr,locale}:{fr:boolean;locale:"fr"|"en"}){
  const [status,setStatus]=useState<State>("pending");
  const [posts,setPosts]=useState<Post[]>([]);
  const [page,setPage]=useState(1);
  const [hasNext,setHasNext]=useState(false);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState("");
  const [error,setError]=useState("");
  const [refresh,setRefresh]=useState(0);
  const generation=useRef(0);
  useEffect(()=>{
    const controller=new AbortController(),ticket=++generation.current;
    async function load(){
      setLoading(true);setPosts([]);setError("");
      try{
        const {data}=await supabase.auth.getSession();
        if(!data.session)throw new Error("SIGN_IN_REQUIRED");
        const params=new URLSearchParams({section:"moderation",status,page:String(page)});
        const response=await fetch("/api/admin?"+params,{headers:{Authorization:"Bearer "+data.session.access_token},cache:"no-store",signal:controller.signal});
        const result=await response.json();
        if(!response.ok)throw new Error(result.error);
        if(ticket===generation.current){setPosts(result.posts||[]);setHasNext(result.hasNext===true);}
      }catch(e){if(ticket===generation.current&&!controller.signal.aborted)setError(fr?"Impossible de charger les contributions.":"Unable to load contributions.");}
      finally{if(ticket===generation.current)setLoading(false);}
    }
    void load();return()=>{controller.abort();generation.current++;};
  },[status,page,refresh,fr]);
  async function moderate(post:Post,next:State){
    if(busy)return;
    setBusy(post.id);setError("");
    try{
      const {data}=await supabase.auth.getSession();
      if(!data.session)throw new Error("SIGN_IN_REQUIRED");
      const response=await fetch("/api/admin",{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:"Bearer "+data.session.access_token},body:JSON.stringify({kind:"moderation",id:post.id,status:next})});
      if(!response.ok)throw new Error("MODERATION_FAILED");
      setPosts(previous=>previous.filter(item=>item.id!==post.id));
    }catch{setError(fr?"Action impossible. Réessayez.":"Action failed. Please retry.");}
    finally{setBusy("");}
  }
  return <section className="mt-7 border-t border-black pt-6" aria-label={fr?"Modération communautaire":"Community moderation"}>
    <div className="flex flex-wrap gap-3">{(["pending","approved","rejected"] as const).map(value=><button type="button" key={value} aria-pressed={status===value} className={"lg-btn "+(status===value?"lg-btn--dark":"")} onClick={()=>{setStatus(value);setPage(1);}}>{value==="pending"?(fr?"En attente":"Pending"):value==="approved"?(fr?"Approuvés":"Approved"):(fr?"Refusés":"Rejected")}</button>)}<button type="button" className="lg-btn" onClick={()=>setRefresh(v=>v+1)}>{fr?"Actualiser":"Refresh"} ↻</button></div>
    {error&&<p role="alert" className="mt-5 text-sm font-bold text-red-700">{error}</p>}
    {loading?<p role="status" className="mt-8">{fr?"Chargement…":"Loading…"}</p>:posts.length===0?<p className="mt-8 text-sm font-bold">{fr?"Aucune contribution dans cette catégorie.":"No contributions in this category."}</p>:<div className="mt-6">{posts.map(post=><article key={post.id} className="grid gap-5 border-b border-black/20 py-6 md:grid-cols-[180px_1fr_auto]">
      <div>{post.imageUrl?<img src={post.imageUrl} alt={fr?"Photo soumise":"Submitted photo"} className="aspect-square w-full object-cover" />:<div className="flex aspect-square items-center justify-center bg-neutral-100 text-xs">{post.image_path?(fr?"Aperçu indisponible":"Preview unavailable"):(fr?"Commentaire":"Comment")}</div>}</div>
      <div className="min-w-0"><p className="lg-kicker">{post.type==="photo"?(fr?"Photo":"Photo"):(fr?"Commentaire":"Comment")}</p><p className="mt-3 whitespace-pre-wrap break-words text-base font-bold">{post.comment|| (fr?"Photo sans commentaire":"Photo without comment")}</p><p className="mt-3 break-all text-xs text-black/60">{fr?"Auteur":"Author"} : {post.user_id}</p><p className="mt-2 text-xs text-black/60">{new Date(post.created_at).toLocaleString(fr?"fr-FR":"en-GB")}</p><Link className="mt-3 inline-block text-sm font-bold underline" href={`/${locale}/place/${encodeURIComponent(post.place_id)}`}>{fr?"Voir la fiche":"View place"} ↗</Link><p className="mt-2 break-all text-xs text-black/50">{post.place_id}</p></div>
      <div className="flex flex-wrap items-start gap-2 md:flex-col">{status!=="approved"&&<button type="button" disabled={!!busy} className="lg-btn lg-btn--dark" onClick={()=>void moderate(post,"approved")}>{fr?"Approuver":"Approve"}</button>}{status!=="rejected"&&<button type="button" disabled={!!busy} className="lg-btn" onClick={()=>void moderate(post,"rejected")}>{fr?"Refuser / retirer":"Reject / remove"}</button>}</div>
    </article>)}</div>}
    <div className="mt-6 flex items-center gap-4"><button className="lg-btn" disabled={page===1||loading||!!busy} onClick={()=>setPage(p=>p-1)}>← {fr?"Précédent":"Previous"}</button><span className="text-sm">{fr?"Page":"Page"} {page}</span><button className="lg-btn" disabled={!hasNext||loading||!!busy} onClick={()=>setPage(p=>p+1)}>{fr?"Suivant":"Next"} →</button></div>
  </section>;
}
