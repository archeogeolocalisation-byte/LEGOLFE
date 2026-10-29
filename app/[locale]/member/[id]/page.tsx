import Link from "next/link";
import {notFound} from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import MemberPrivateLinks from "../../../../components/MemberPrivateLinks";
import MemberCoverSlider from "../../../../components/MemberCoverSlider";
import MemberContributions from "../../../../components/MemberContributions";
import {getPublicContributions,getPublicMembers,memberIdPattern} from "../../../../lib/publicMembers";
import {places} from "../../../../data/places";
import {placeName} from "../../../../lib/placeNames";

export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  return {title:locale==="fr"?"Carnet d’un membre":"Member journal",robots:{index:false,follow:false}};
}
export default async function MemberPage({params}:{params:Promise<{locale:string;id:string}>}){
  const {locale:raw,id}=await params;
  if(raw!=="fr"&&raw!=="en")notFound();
  const locale=raw,fr=locale==="fr";
  if(!memberIdPattern.test(id))notFound();
  const [member]=await getPublicMembers([id]);
  if(!member)notFound();
  const contributions=await getPublicContributions(id);
  const entries=contributions.map(item=>{
    const place=places.find(p=>p.id===item.place_id);
    const date=new Date(item.created_at);
    return {...item,isPhoto:item.type==="photo"||!!item.imageUrl,
      placeTitle:place?placeName(place,locale):(fr?"Lieu indisponible":"Place unavailable"),
      location:place?.location||"",href:place?`/${locale}/place/${encodeURIComponent(place.id)}`:null,
      dateLabel:Number.isNaN(date.getTime())?null:date.toLocaleDateString(fr?"fr-FR":"en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Paris"})};
  });
  const photos=entries.filter(item=>item.isPhoto).length;
  const comments=entries.length-photos;
  const placeCount=new Set(entries.filter(item=>item.href).map(item=>item.place_id)).size;
  const stats=[
    {value:photos,label:fr?(photos===1?"photo partagée":"photos partagées"):(photos===1?"shared photo":"shared photos")},
    {value:comments,label:fr?(comments===1?"commentaire":"commentaires"):(comments===1?"comment":"comments")},
    {value:placeCount,label:fr?(placeCount===1?"lieu évoqué":"lieux évoqués"):(placeCount===1?"place featured":"places featured")},
  ];
  return <main className="member-page min-h-screen">
    <SiteHeader locale={locale} path={`/member/${id}`}/>
    <div className="lg-shell member-content">
      <div className="member-topline"><p className="lg-kicker">{fr?"LES GENS DU GOLFE":"PEOPLE OF THE GOLFE"}</p><Link href={`/${locale}/explore`}>← {fr?"Explorer les adresses":"Explore places"}</Link></div>
      <section className={`member-profile${member.galleryUrls.length?" member-profile-with-photos":""}`} aria-labelledby="member-name">
        <div className="member-profile-intro">
          <div className="member-identity">
            <div className="member-avatar">
              {member.avatarUrl?<img src={member.avatarUrl} alt={fr?`Photo de profil de ${member.name}`:`${member.name}’s profile photo`} width={104} height={104}/>:<span aria-hidden="true">{Array.from(member.name)[0]?.toLocaleUpperCase(locale)||"LG"}</span>}
            </div>
            <div className="min-w-0"><p className="lg-kicker">{fr?"SON CARNET DU GOLFE":"THEIR GOLFE JOURNAL"}</p><h1 id="member-name">{member.name}</h1></div>
          </div>
          {member.connection&&<p className="member-connection">{member.connection==="local"?(fr?"Je vis dans le Golfe":"I live in the Golfe"):(fr?"Je suis de passage":"I am visiting")}</p>}
          {member.bio?<p className="member-bio">{member.bio}</p>:<p className="member-bio member-bio-fallback">{fr?"Le Golfe à travers ses photos et ses mots.":"The Golfe through their photos and words."}</p>}
          <a href="#contributions" className="member-journal-link">{fr?"Découvrir ses contributions":"Explore their contributions"} ↓</a>
          <dl className="member-stats" aria-label={fr?"Contributions publiques affichées":"Public contributions shown"}>{stats.map(stat=><div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
        </div>
        <MemberCoverSlider photos={member.galleryUrls} fr={fr}/>
      </section>
      <MemberPrivateLinks memberId={id} locale={locale}/>
      <section className="member-contributions" id="contributions" aria-labelledby="member-contributions-title">
        <div className="member-section-heading"><div><p className="lg-kicker">{fr?"PHOTOS, MOTS & DÉCOUVERTES":"PHOTOS, WORDS & DISCOVERIES"}</p><h2 id="member-contributions-title">{fr?"Ses contributions":"Their contributions"}</h2></div><p>{fr?"Seuls les commentaires et photos approuvés par la modération apparaissent ici.":"Only moderator-approved comments and photos appear here."}</p></div>
        <MemberContributions entries={entries} fr={fr}/>
      </section>
      <aside className="member-explore"><div><p className="lg-kicker">{fr?"À VOTRE TOUR":"YOUR TURN"}</p><h2>{fr?"Le Golfe se partage.":"The Golfe is for sharing."}</h2><p>{fr?"Une balade, une plage, une bonne adresse… Retrouvez les lieux du guide et partagez votre expérience depuis leur fiche.":"A walk, a beach, a favourite spot… Explore the guide and share your experience on a place’s page."}</p></div><Link href={`/${locale}/explore`} className="lg-btn">{fr?"Trouver un lieu à découvrir":"Find a place to explore"} ↗</Link></aside>
    </div>
  </main>;
}
