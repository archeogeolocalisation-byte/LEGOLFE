import { pageMetadata } from "../../../../lib/seo";
import Link from "next/link";
import {notFound} from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import PlaceCard from "../../../../components/PlaceCard";
import {getCategory,places} from "../../../../data/places";
import {categoryFR,isLocale,ui} from "../../../../lib/i18n";

export default async function Page({params}:{params:Promise<{locale:string;category:string}>}){
 const {locale:l,category:id}=await params;if(!isLocale(l))notFound();const c=getCategory(id);if(!c)notFound();
 const name=l==="fr"?categoryFR[id].name:c.name,desc=l==="fr"?categoryFR[id].description:c.description;const list=places.filter(p=>p.category===id);
 return <main className="min-h-screen bg-white text-black"><SiteHeader locale={l} path={`/explore/${id}`}/>
  <section className="lg-shell pb-20 pt-10 md:pb-28 md:pt-16">
   <Link href={`/${l}/explore`} className="text-[10px] font-black uppercase tracking-[.14em]">← {ui[l].backGuide}</Link>
   <div className="mt-12 grid gap-8 md:grid-cols-[1fr_340px] md:items-end">
    <div><p className="lg-kicker">{c.label}</p><h1 className="lg-display mt-5 text-[19vw] md:text-[135px]">{name}</h1></div>
    <div className="border-t border-black pt-5"><p className="lg-copy">{desc}</p><p className="mt-5 text-[10px] font-black uppercase tracking-[.14em] text-black/40">{list.length} {l==="fr"?"sélections":"selections"}</p></div>
   </div>
   {id==="party" && <div className="mt-12 bg-black px-5 py-12 text-white md:px-10 md:py-16"><p className="lg-kicker text-[var(--lg-blue)]">LE GOLFE / NIGHT</p><p className="mt-5 max-w-5xl text-[12vw] font-black uppercase leading-[.78] tracking-[-.07em] md:text-[86px]">{l==="fr"?<>PREMIER VERRE.<br/>DERNIER <span className="text-[var(--lg-blue)]">MORCEAU.</span></>:<>FIRST DRINK.<br/>LAST <span className="text-[var(--lg-blue)]">TRACK.</span></>}</p><p className="mt-8 max-w-2xl text-base font-semibold leading-7 text-white/60">{l==="fr"?"Pub, dîner-show, dinner-club ou vraie boîte : choisissez d'abord le type de nuit, puis l'adresse.":"Pub, dinner-show, dinner-club or a proper nightclub: choose the kind of night first, then the venue."}</p></div>}
   <div className="mt-14 grid gap-x-8 md:grid-cols-2">{list.map(p=><PlaceCard key={p.id} place={p} locale={l}/>)}</div>
  </section>
 </main>
}

export async function generateMetadata({params}:{params:Promise<{locale:string;category:string}>}) {
 const {locale,category}=await params; if(!isLocale(locale))notFound();const c=getCategory(category);if(!c)notFound();
 return pageMetadata({title:`${locale === "fr" ? categoryFR[category].name : c.name} · Golfe de Saint-Tropez`,description:locale === "fr" ? categoryFR[category].description : c.description,path:`/${locale}/explore/${category}`,locale});
}
