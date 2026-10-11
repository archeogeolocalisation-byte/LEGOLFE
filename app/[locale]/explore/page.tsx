import DestinationLinks from "../../../components/DestinationLinks";
import { pageMetadata } from "../../../lib/seo";
import {notFound} from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import ExploreIntentGrid from "../../../components/ExploreIntentGrid";
import {places} from "../../../data/places";
import {isLocale,ui} from "../../../lib/i18n";

import { resolveExploreFilter } from "../../../lib/exploreFilters";

export default async function Page({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{filter?:string;mood?:string}>}){
 const {locale:l}=await params;if(!isLocale(l))notFound();const t=ui[l];
 const sp=await searchParams;const initialFilter=resolveExploreFilter(sp.filter,sp.mood);
 return <main className="min-h-screen bg-white text-black"><SiteHeader locale={l} path={`/explore${initialFilter === "all" ? "" : `?filter=${initialFilter}`}`}/>
  <section className="lg-shell pb-16 pt-12 md:pb-24 md:pt-20">
   <p className="lg-kicker">LE GOLFE / GUIDE</p>
   <h1 className="lg-display mt-6 max-w-[1200px] text-[18vw] md:text-[138px]">{t.guideTitle}</h1>
   <div className="mt-10 grid gap-8 border-t border-black pt-6 md:grid-cols-2"><p className="lg-copy max-w-2xl">{t.guideDesc}</p><p className="max-w-md text-[12px] font-bold uppercase leading-5 tracking-[.08em] text-black/45 md:justify-self-end">{places.length} {l==="fr"?"adresses sélectionnées. Pas un annuaire.":"selected places. Not a directory."}</p></div>
   <ExploreIntentGrid places={places} locale={l} filter={initialFilter}/><DestinationLinks locale={l}/>
  </section>
  <SiteFooter locale={l}/>
 </main>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 return pageMetadata({ title: locale === "fr" ? "Explorer le Golfe de Saint-Tropez : bonnes adresses et villages" : "Explore the Golfe de Saint-Tropez: places and villages", description: locale === "fr" ? "Restaurants, plages, villages, bars et services : découvrez les adresses du Golfe de Saint-Tropez selon vos envies." : "Discover restaurants, beaches, villages, bars and useful services around the Golfe de Saint-Tropez.", path: `/${locale}/explore`, locale });
}
