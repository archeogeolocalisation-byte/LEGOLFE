import Link from "next/link";
import {hasExploreParameters,type PublicSearchParams} from "../../../lib/publicRouteUrls";
import { pageMetadata } from "../../../lib/seo";
import {notFound} from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import ExploreIntentGrid from "../../../components/ExploreIntentGrid";
import {places} from "../../../data/places";
import ExploreMoodCards from "../../../components/ExploreMoodCards";
import {isLocale} from "../../../lib/i18n";

import { isExploreAddress, resolveExploreFilter, resolveExploreSearch, exploreFilterHref } from "../../../lib/exploreFilters";

// A fresh server render gives each visit a new order, including filtered searches.
export const dynamic = "force-dynamic";

type Props={params:Promise<{locale:string}>;searchParams?:Promise<PublicSearchParams>};

export default async function Page({params,searchParams}:Props){
 const {locale:l}=await params;if(!isLocale(l))notFound();const fr=l==="fr";
 const sp=await searchParams??{};const initialFilter=resolveExploreFilter(sp.filter,sp.mood);const {query,town}=resolveExploreSearch(sp.q,sp.town);
 return <main className="explore-background explore-hub min-h-screen"><SiteHeader locale={l} path={exploreFilterHref(l,initialFilter,query,town).slice(3)}/>
  <section className="lg-shell explore-page">
   <div className="explore-intro">
    <div>
     <p className="lg-kicker lg-accent">LE GOLFE / {l==="fr"?"LE CARNET D’ADRESSES":"THE ADDRESS BOOK"}</p>
     <h1>{fr?<>Vos envies.<br/><em>Votre Golfe.</em></>:<>Your mood.<br/><em>Your Golfe.</em></>}</h1>
     <p className="explore-deck">{l==="fr"?"Une table, une crique, une balade. Choisissez votre envie, trouvez une adresse et préparez votre prochaine sortie.":"A table, a cove, a walk. Follow your mood, find a place and plan your next outing."}</p>
     <a href="#adresses" className="lg-btn">{fr?"Trouver mon adresse":"Find my place"} ↓</a>
    </div>
    <div className="explore-edition"><span className="explore-edition-count">{String(places.filter(isExploreAddress).length).padStart(2,"0")}</span><p className="lg-kicker">{l==="fr"?"ADRESSES / UNE SÉLECTION":"PLACES / ONE SELECTION"}</p><p>{l==="fr"?"Le Golfe, à votre rythme.":"The Golfe, at your pace."}</p></div>
   </div>
   {initialFilter==="all"&&!query&&!town&&<ExploreMoodCards locale={l}/>}
   <ExploreIntentGrid places={places} locale={l} filter={initialFilter} query={query} town={town}/>
   <aside className="explore-guide-bridge"><div><p className="lg-kicker">{fr?"DE L’ADRESSE À LA SORTIE":"FROM PLACE TO PLAN"}</p><h2>{fr?"Une journée à imaginer ?":"Planning a day out?"}</h2><p>{fr?"Nos guides réunissent des idées par secteur et des conseils pratiques. Gardez les lieux qui vous plaisent depuis leurs fiches, puis organisez vos journées dans Mon séjour.":"Our guides bring together ideas by area with practical advice. Save places from their pages, then organise your days in My stay."}</p></div><div><Link className="lg-btn" href={`/${l}/guides`}>{fr?"Parcourir les guides":"Browse guides"} ↗</Link><Link className="lg-btn" href={`/${l}/saved`}>{fr?"Ouvrir Mon séjour":"Open My stay"} →</Link><Link href={`/${l}/carte-touristique`} className="explore-landscapes-link">{fr?"Découvrir les paysages et villages":"Discover landscapes and villages"} ↗</Link></div></aside>
   <details className="explore-about"><summary>{l==="fr"?"Comment nous choisissons ces adresses":"How we select these places"}</summary><p>{l==="fr"?"Des adresses et des activités pour préparer vos sorties. Pour découvrir les communes et leurs paysages, rendez-vous dans Découvrir le Golfe.":"Places and activities to plan your outings. Find the towns and landscapes in Discover the Golfe."}</p></details>
  </section>

 </main>
}

export async function generateMetadata({params,searchParams}:Props) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 const metadata=pageMetadata({ title: locale === "fr" ? "Explorer le Golfe de Saint-Tropez : bonnes adresses et activités" : "Explore the Golfe de Saint-Tropez: places and activities", description: locale === "fr" ? "Restaurants, plages, activités, bars et services : découvrez les adresses du Golfe de Saint-Tropez selon vos envies." : "Discover restaurants, beaches, activities, bars and useful services around the Golfe de Saint-Tropez.", path: `/${locale}/explore`, locale });
 // Search and filter combinations are useful navigation, not separate landing pages.
 if(hasExploreParameters(await searchParams??{}))metadata.robots={index:false,follow:true};
 return metadata;
}
