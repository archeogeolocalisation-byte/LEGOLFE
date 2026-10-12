import DestinationLinks from "../../../components/DestinationLinks";
import { pageMetadata } from "../../../lib/seo";
import {notFound} from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import ExploreIntentGrid from "../../../components/ExploreIntentGrid";
import {places} from "../../../data/places";
import {isLocale,ui} from "../../../lib/i18n";

import { resolveExploreFilter, resolveExploreSearch, exploreFilterHref } from "../../../lib/exploreFilters";

export default async function Page({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{filter?:string;mood?:string;q?:string;town?:string}>}){
 const {locale:l}=await params;if(!isLocale(l))notFound();const t=ui[l];
 const sp=await searchParams;const initialFilter=resolveExploreFilter(sp.filter,sp.mood);const {query,town}=resolveExploreSearch(sp.q,sp.town);
 return <main className="min-h-screen bg-white text-black"><SiteHeader locale={l} path={exploreFilterHref(l,initialFilter,query,town).slice(3)}/>
  <section className="lg-shell explore-page">
   <div className="explore-intro">
    <div>
     <p className="lg-kicker lg-accent">LE GOLFE / {l==="fr"?"LE CARNET D’ADRESSES":"THE ADDRESS BOOK"}</p>
     <h1 className="lg-display explore-title">{t.guideTitle}</h1>
     <p className="explore-deck">{l==="fr"?"Villages, tables, plages et sorties. Les bonnes adresses, selon vos envies.":"Villages, tables, beaches and nights out. The right places for your mood."}</p>
    </div>
    <div className="explore-edition"><span className="explore-edition-count">{String(places.length).padStart(2,"0")}</span><p className="lg-kicker">{l==="fr"?"ADRESSES / UNE SÉLECTION":"PLACES / ONE SELECTION"}</p><p>{l==="fr"?"Le Golfe, à votre rythme.":"The Golfe, at your pace."}</p></div>
   </div>
   <ExploreIntentGrid places={places} locale={l} filter={initialFilter} query={query} town={town}/>
   <details className="explore-about"><summary>{l==="fr"?"Comment nous choisissons ces adresses":"How we select these places"}</summary><p>{t.guideDesc}</p></details>
   <DestinationLinks locale={l}/>
  </section>
  <SiteFooter locale={l}/>
 </main>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 return pageMetadata({ title: locale === "fr" ? "Explorer le Golfe de Saint-Tropez : bonnes adresses et villages" : "Explore the Golfe de Saint-Tropez: places and villages", description: locale === "fr" ? "Restaurants, plages, villages, bars et services : découvrez les adresses du Golfe de Saint-Tropez selon vos envies." : "Discover restaurants, beaches, villages, bars and useful services around the Golfe de Saint-Tropez.", path: `/${locale}/explore`, locale });
}
