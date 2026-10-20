import Link from "next/link";
import {hasExploreParameters,type PublicSearchParams} from "../../../lib/publicRouteUrls";
import { pageMetadata } from "../../../lib/seo";
import {notFound} from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import ExploreIntentGrid from "../../../components/ExploreIntentGrid";
import {places} from "../../../data/places";
import {isLocale,ui} from "../../../lib/i18n";

import { isExploreAddress, resolveExploreFilter, resolveExploreSearch, exploreFilterHref } from "../../../lib/exploreFilters";

type Props={params:Promise<{locale:string}>;searchParams?:Promise<PublicSearchParams>};

export default async function Page({params,searchParams}:Props){
 const {locale:l}=await params;if(!isLocale(l))notFound();const t=ui[l];
 const sp=await searchParams??{};const initialFilter=resolveExploreFilter(sp.filter,sp.mood);const {query,town}=resolveExploreSearch(sp.q,sp.town);
 return <main className="explore-background min-h-screen text-black"><SiteHeader locale={l} path={exploreFilterHref(l,initialFilter,query,town).slice(3)}/>
  <section className="lg-shell explore-page">
   <div className="explore-intro">
    <div>
     <p className="lg-kicker lg-accent">LE GOLFE / {l==="fr"?"LE CARNET D’ADRESSES":"THE ADDRESS BOOK"}</p>
     <h1 className="lg-menu-title ">{t.guideTitle}</h1>
     <p className="explore-deck">{l==="fr"?"Tables, plages, sorties et activités. Les bonnes adresses, selon vos envies.":"Restaurants, beaches, activities and nights out. The right places for your mood."}</p>
    </div>
    <div className="explore-edition"><span className="explore-edition-count">{String(places.filter(isExploreAddress).length).padStart(2,"0")}</span><p className="lg-kicker">{l==="fr"?"ADRESSES / UNE SÉLECTION":"PLACES / ONE SELECTION"}</p><p>{l==="fr"?"Le Golfe, à votre rythme.":"The Golfe, at your pace."}</p></div>
   </div>
   <div className="mb-7 flex flex-wrap items-center gap-4"><Link className="lg-btn secondary" href={`/${l}/carte-touristique`}>{l==="fr"?"Découvrir les paysages et les villages sur la carte":"Discover landscapes and villages on the map"} →</Link></div>
   <ExploreIntentGrid places={places} locale={l} filter={initialFilter} query={query} town={town}/>
   <details className="explore-about"><summary>{l==="fr"?"Comment nous choisissons ces adresses":"How we select these places"}</summary><p>{l==="fr"?"Des adresses et des activités pour préparer vos sorties. Pour découvrir les communes et leurs paysages, rendez-vous dans Découvrir le Golfe.":"Places and activities to plan your outings. Find the towns and landscapes in Discover the Golfe."}</p></details>
  </section>
  <SiteFooter locale={l}/>
 </main>
}

export async function generateMetadata({params,searchParams}:Props) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 const metadata=pageMetadata({ title: locale === "fr" ? "Explorer le Golfe de Saint-Tropez : bonnes adresses et activités" : "Explore the Golfe de Saint-Tropez: places and activities", description: locale === "fr" ? "Restaurants, plages, activités, bars et services : découvrez les adresses du Golfe de Saint-Tropez selon vos envies." : "Discover restaurants, beaches, activities, bars and useful services around the Golfe de Saint-Tropez.", path: `/${locale}/explore`, locale });
 // Search and filter combinations are useful navigation, not separate landing pages.
 if(hasExploreParameters(await searchParams??{}))metadata.robots={index:false,follow:true};
 return metadata;
}
