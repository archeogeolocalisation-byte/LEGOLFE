import Link from "next/link";
import {notFound} from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import SiteFooter from "../../../../components/SiteFooter";
import {getPublicContributions,getPublicMembers,memberIdPattern} from "../../../../lib/publicMembers";

export const dynamic="force-dynamic";
export const metadata={robots:{index:false,follow:false}};
export default async function MemberPage({params}:{params:Promise<{locale:string;id:string}>}){
  const {locale:raw,id}=await params;
  const locale=raw==="fr"?"fr":"en",fr=locale==="fr";
  if(!memberIdPattern.test(id))notFound();
  const [member]=await getPublicMembers([id]);
  if(!member)notFound();
  const contributions=await getPublicContributions(id);
  return <main className="min-h-screen bg-white text-black">
    <SiteHeader locale={locale} path="/explore"/>
    <section className="lg-shell py-16 md:py-24">
      <p className="lg-kicker lg-accent">{fr?"COMMUNAUTÉ / MEMBRE":"COMMUNITY / MEMBER"}</p>
      <div className="mt-8 flex flex-wrap items-center gap-7 border-t border-black pt-8">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0B4F6C] text-3xl font-black text-white">
          {member.avatarUrl?<img src={member.avatarUrl} alt={fr?"Photo de profil":"Profile photo"} className="h-full w-full object-cover"/>:<span aria-hidden="true">LG</span>}
        </div>
        <div className="min-w-0">
          <h1 className="lg-title text-4xl md:text-6xl">{member.name}</h1>
          {member.connection&&<p className="mt-3 text-xs font-black uppercase tracking-[.12em] text-[var(--lg-blue)]">{member.connection==="local"?(fr?"Je vis dans le Golfe":"I live in the Golfe"):(fr?"Je suis de passage":"I am visiting")}</p>}
        </div>
      </div>
      {member.bio&&<p className="mt-8 max-w-2xl whitespace-pre-wrap text-lg leading-8 text-black/75">{member.bio}</p>}
      <div className="mt-12 border-t border-black pt-8">
        <h2 className="lg-title text-3xl md:text-5xl">{fr?"SES CONTRIBUTIONS.":"THEIR CONTRIBUTIONS."}</h2>
        <p className="mt-3 text-sm text-black/60">{fr?"Seuls les commentaires et photos approuvés par la modération apparaissent ici.":"Only moderator-approved comments and photos appear here."}</p>
        {!contributions.length&&<p className="mt-8 text-sm font-bold">{fr?"Aucune contribution publique pour le moment.":"No public contributions yet."}</p>}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {contributions.map(item=><article key={item.id} className="min-w-0 border-b border-black/20 pb-6">
            {item.imageUrl&&<img src={item.imageUrl} alt={item.comment|| (fr?"Photo partagée":"Shared photo")} className="mb-4 aspect-[4/3] w-full bg-neutral-100 object-cover"/>}
            <p className="lg-kicker lg-accent">{item.imageUrl?(fr?"PHOTO PARTAGÉE":"SHARED PHOTO"):(fr?"COMMENTAIRE":"COMMENT")}</p>
            {item.comment&&<p className="mt-3 whitespace-pre-wrap break-words text-base leading-7">{item.comment}</p>}
            <p className="mt-3 text-xs text-black/50">{new Date(item.created_at).toLocaleDateString(fr?"fr-FR":"en-GB")}</p>
            <Link href={`/${locale}/place/${encodeURIComponent(item.place_id)}`} className="mt-4 inline-flex text-xs font-black uppercase tracking-[.08em] underline underline-offset-4">{fr?"Voir la fiche":"View place"} ↗</Link>
          </article>)}
        </div>
      </div>
      <Link href={`/${locale}/explore`} className="lg-btn mt-10">← {fr?"Explorer les adresses":"Explore places"}</Link>
    </section><SiteFooter locale={locale}/>
  </main>;
}
