import { pageMetadata } from "../../../lib/seo";
import Link from "next/link";
import {notFound} from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import {localNews, type LocalNewsItem} from "../../../data/localNews";
import {isLocale} from "../../../lib/i18n";
import {mediaForLocal} from "../../../lib/localMedia";
import {getApprovedNews} from "../../../lib/editorialDb";

const labels={need:{fr:"À SAVOIR",en:"NEED TO KNOW"},new:{fr:"NOUVEAU",en:"NEW"},around:{fr:"AUTOUR DU GOLFE",en:"AROUND THE GOLFE"}};
function d(date:string,fr:boolean){return new Intl.DateTimeFormat(fr?"fr-FR":"en-GB",{day:"numeric",month:"long",year:"numeric"}).format(new Date(date+"T12:00:00"));}
function title(n:LocalNewsItem,fr:boolean){return fr?n.titleFr:n.title} function summary(n:LocalNewsItem,fr:boolean){return fr?n.summaryFr:n.summary}

export const dynamic="force-dynamic";

export default async function LocalPage({params}:{params:Promise<{locale:string}>}){
 const {locale:l}=await params;if(!isLocale(l))notFound();const fr=l==="fr";
 const liveNews=await getApprovedNews();
 const allNews=[...liveNews,...localNews.filter(n=>!liveNews.some(x=>x.source===n.source&&x.title===n.title))];
 const lead=allNews.find(n=>n.featured)||allNews[0]; const rest=allNews.filter(n=>n.id!==lead.id);
 return <main className="min-h-screen bg-[#f7f6f2] text-black"><SiteHeader locale={l} path="/local"/>
  <section className="lg-shell pb-10 pt-10 md:pb-14 md:pt-16">
   <div className="grid gap-8 border-b-4 border-black pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
    <div><p className="lg-kicker text-[var(--lg-blue)]">LE GOLFE / LOCAL EDITION</p><h1 className="mt-5 max-w-5xl text-[18vw] font-black uppercase leading-[.76] tracking-[-.075em] md:text-[128px]">{fr?<>LE GOLFE.<br/><span className="lg-accent">AUJOURD'HUI.</span></>:<>THE GOLFE.<br/><span className="lg-accent">TODAY.</span></>}</h1></div>
    <div className="max-w-sm border-t border-black pt-4 lg:border-t-0 lg:pb-2"><p className="text-[10px] font-black uppercase tracking-[.18em] text-black/45">02.10.2026 · {fr ? "ÉDITION LOCALE" : "LOCAL EDITION"}</p><p className="mt-3 text-sm font-bold leading-6 text-black/60">{fr?"Ce qui change vraiment votre séjour : accès, mobilité, nouveaux lieux, littoral et vie locale. Pas tout. Juste l'utile.":"What can genuinely change your stay: access, mobility, new openings, the coast and local life. Not everything. Only what matters."}</p></div>
   </div>
  </section>

  <section className="lg-shell pb-16 md:pb-24">
   <article className="grid gap-0 border-b-4 border-black lg:grid-cols-[1.35fr_.65fr]">
    <div className="lg-image min-h-[420px] md:min-h-[620px]"><img src={mediaForLocal(lead.id).src} alt={mediaForLocal(lead.id).alt}/></div>
    <div className="flex flex-col justify-between border-t-4 border-black bg-white p-6 md:p-10 lg:border-l-4 lg:border-t-0">
      <div><p className="lg-kicker text-[var(--lg-blue)]">{fr?labels[lead.kind].fr:labels[lead.kind].en} · {lead.location}</p><h2 className="mt-5 text-5xl font-black uppercase leading-[.87] tracking-[-.06em] md:text-7xl">{title(lead,fr)}</h2><p className="mt-6 text-base font-semibold leading-7 text-black/60">{summary(lead,fr)}</p></div>
      <div className="mt-10"><p className="border-l-4 border-[var(--lg-blue)] pl-4 text-lg font-black leading-7">{fr?lead.whyFr:lead.why}</p><div className="mt-6 flex items-center justify-between border-t border-black pt-4"><span className="text-[10px] font-black uppercase tracking-[.14em] text-black/45">{d(lead.date,fr)}</span><a href={lead.source} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-[.14em] text-[var(--lg-blue)]">{fr?"Lire la source":"Read source"} ↗</a></div></div>
    </div>
   </article>
   <p className="lg-credit">Photo: {mediaForLocal(lead.id).credit} · {mediaForLocal(lead.id).license}</p>
  </section>

  <section className="lg-shell pb-20 md:pb-28">
   <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
    {rest.map((n,i)=>{const m=mediaForLocal(n.id);return <article key={n.id} className={`${i===0?"md:col-span-2 lg:col-span-2":""} border-t-4 border-black pt-4`}>
      <div className={`lg-image ${i===0?"aspect-[16/8]":"aspect-[4/3]"}`}><img src={m.src} alt={m.alt}/></div>
      <div className="mt-4 flex items-center justify-between gap-4"><p className="lg-kicker text-[var(--lg-blue)]">{fr?labels[n.kind].fr:labels[n.kind].en}</p><p className="text-[9px] font-black uppercase tracking-[.12em] text-black/35">{d(n.date,fr)}</p></div>
      <h2 className={`mt-4 font-black uppercase leading-[.9] tracking-[-.055em] ${i===0?"text-5xl md:text-7xl":"text-3xl md:text-4xl"}`}>{title(n,fr)}</h2>
      <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/55">{summary(n,fr)}</p>
      <div className="mt-5 flex items-center justify-between border-t border-black/20 pt-4"><span className="text-[10px] font-black uppercase tracking-[.12em]">{n.location}</span><a href={n.source} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-[.12em] text-[var(--lg-blue)]">SOURCE ↗</a></div>
      <p className="lg-credit">Photo: {m.credit} · {m.license}</p>
    </article>})}
   </div>
  </section>

  <section className="bg-black text-white"><div className="lg-shell py-16 md:py-24"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="lg-kicker text-[#7fc4df]">LOCAL INTELLIGENCE</p><h2 className="lg-title mt-4 max-w-5xl text-5xl md:text-8xl">{fr?<>L'INFO N'EST UTILE QUE SI ELLE <span className="text-[#7fc4df]">CHANGE VOTRE PLAN.</span></>:<>NEWS MATTERS WHEN IT <span className="text-[#7fc4df]">CHANGES YOUR PLAN.</span></>}</h2></div><Link href={`/${l}/ask`} className="lg-btn border-white bg-white text-black">Ask Le Golfe →</Link></div></div></section>
  <SiteFooter locale={l}/>
 </main>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 return pageMetadata({ title: locale === "fr" ? "Actualités et informations locales du Golfe de Saint-Tropez" : "Golfe de Saint-Tropez local news and practical updates", description: locale === "fr" ? "Les informations pratiques et actualités locales pour préparer votre séjour dans le Golfe de Saint-Tropez." : "Local news and practical updates to help plan your stay around the Golfe de Saint-Tropez.", path: `/${locale}/local`, locale });
}
