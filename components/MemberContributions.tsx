"use client";

import {useState} from "react";
import Link from "next/link";
import type {PublicContribution} from "../lib/publicMembers";

export type MemberEntry=PublicContribution&{isPhoto:boolean;placeTitle:string;location:string;href:string|null;dateLabel:string|null};
type Filter="all"|"photos"|"comments";
export default function MemberContributions({entries,fr}:{entries:MemberEntry[];fr:boolean}){
  const [filter,setFilter]=useState<Filter>("all");
  const photos=entries.filter(item=>item.isPhoto).length;
  const filters:{id:Filter;label:string;count:number}[]=[
    {id:"all",label:fr?"Tout":"All",count:entries.length},
    {id:"photos",label:fr?"Photos":"Photos",count:photos},
    {id:"comments",label:fr?"Commentaires":"Comments",count:entries.length-photos},
  ];
  const shown=entries.filter(item=>filter==="all"||(filter==="photos"?item.isPhoto:!item.isPhoto));
  return <>
    {entries.length>0&&<div className="member-filters" role="group" aria-label={fr?"Filtrer les contributions":"Filter contributions"}>{filters.map(option=><button key={option.id} type="button" aria-pressed={filter===option.id} onClick={()=>setFilter(option.id)}>{option.label}<span>{option.count}</span></button>)}</div>}
    <p className="sr-only" role="status">{shown.length} {fr?(shown.length===1?"contribution affichée":"contributions affichées"):(shown.length===1?"contribution shown":"contributions shown")}</p>
    {!shown.length?<div className="member-empty"><span aria-hidden="true">↗</span><h3>{entries.length?(fr?"Rien ici pour le moment":"Nothing here yet"):(fr?"Un carnet à écrire":"A journal waiting to begin")}</h3><p>{entries.length?(fr?"Essayez un autre filtre pour retrouver ses découvertes.":"Try another filter to see their discoveries."):(fr?"Les premières contributions approuvées apparaîtront ici.":"Their first approved contributions will appear here.")}</p>{entries.length>0&&<button type="button" onClick={()=>setFilter("all")}>{fr?"Voir toutes les contributions":"View all contributions"}</button>}</div>:
    <div className="member-entry-grid">{shown.map(item=><article key={item.id} className={`member-entry ${item.isPhoto?"member-entry-photo":"member-entry-comment"}`}>
      {item.imageUrl&&<img src={item.imageUrl} alt={fr?`Photo partagée · ${item.placeTitle}`:`Shared photo · ${item.placeTitle}`} loading="lazy" width={800} height={600} className="member-entry-image"/>}
      <div className="member-entry-body"><div className="member-entry-meta"><span>{item.isPhoto?(fr?"PHOTO PARTAGÉE":"SHARED PHOTO"):(fr?"COMMENTAIRE":"COMMENT")}</span>{item.dateLabel&&<time dateTime={item.created_at}>{item.dateLabel}</time>}</div>
        <h3>{item.href?<Link href={item.href}>{item.placeTitle} ↗</Link>:item.placeTitle}</h3>
        {item.location&&<p className="member-entry-location">{item.location}</p>}
        {item.comment&&<p className="member-entry-text">{!item.isPhoto&&<span className="member-quote" aria-hidden="true">“</span>}{item.comment}</p>}
        {item.href&&<Link href={item.href} className="member-entry-link">{fr?"Découvrir ce lieu":"Discover this place"}<span aria-hidden="true">↗</span></Link>}
      </div>
    </article>)}</div>}
  </>;
}
