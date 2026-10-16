import { placeName } from "../lib/placeNames";
import Link from "next/link";
import type { Place } from "../data/places";
import { getCategory, placeDescriptionFr } from "../data/places";
import { categoryFR, type Locale } from "../lib/i18n";
import { mediaForPlace } from "../lib/placeMedia";
import {categoriesForPlace,facetsForPlace,placeFacetLabels} from "../lib/placeFacets";

import { destinations } from "../data/destinations";
import { isExploreAddress, exploreFilterIds, exploreFilterLabels, exploreFilterHref, exploreFilterCategory, matchesExploreFilter, matchesExploreSearch, type ExploreFilter } from "../lib/exploreFilters";

export default function ExploreIntentGrid({ places, locale, filter = "all", query="", town="" }: { places: Place[]; locale: Locale; filter?: ExploreFilter;query?:string;town?:string }) {
  const fr = locale === "fr";
  const labels = exploreFilterLabels[locale];
  const candidates=places.filter(isExploreAddress).filter(place=>matchesExploreSearch(place,query,town));
  const list = candidates.filter(place => matchesExploreFilter(place, filter));
  const counts = Object.fromEntries(exploreFilterIds.map(id => [id, candidates.filter(place => matchesExploreFilter(place, id)).length]));
  const category = exploreFilterCategory(filter);

  return <>
    <nav aria-label={fr ? "Filtrer les adresses" : "Filter places"} className="explore-controls">
      <p className="lg-kicker lg-accent">{fr ? "UN THÈME. UNE ENVIE." : "A THEME. A MOOD."}</p>

      <form action={`/${locale}/explore`} method="get" className="explore-search">
        {filter!=="all" && <input type="hidden" name="filter" value={filter}/>}
        <label className="block text-xs font-bold">{fr?"Rechercher une adresse":"Find a place"}<input key={query} type="search" name="q" maxLength={100} defaultValue={query} placeholder={fr?"Nom, lieu, envie…":"Name, place, mood…"} className="mt-2 w-full border border-black/25 bg-white p-3 text-sm font-normal focus-visible:outline-2 focus-visible:outline-[var(--lg-blue)]"/></label>
        <label className="block text-xs font-bold">{fr?"Commune":"Town"}<select key={town} name="town" defaultValue={town} className="mt-2 w-full border border-black/25 bg-white p-3 text-sm font-normal"><option value="">{fr?"Tout le Golfe":"Across the Golfe"}</option>{destinations.map(d=><option key={d.slug} value={d.slug}>{d.name}</option>)}</select></label>
        <button className="lg-btn lg-btn--dark">{fr?"Rechercher":"Search"} →</button>
      </form>
      <div className="explore-themes">
        {exploreFilterIds.map(id => <Link key={id} href={exploreFilterHref(locale, id,query,town)} scroll={false} prefetch={false} aria-current={filter === id ? "page" : undefined} className="explore-theme">
          {labels[id]} <span className="text-[9px] opacity-60">{counts[id]}</span>
        </Link>)}
      </div>
    </nav>
    <div className="explore-results-bar">
      <p role="status" className="text-xs font-bold text-black/55">{list.length} {fr ? (list.length === 1 ? "adresse" : "adresses") : (list.length === 1 ? "place" : "places")} · {labels[filter]}{town?` · ${destinations.find(d=>d.slug===town)?.name}`:""}{query?` · « ${query} »`:""}</p>
      {(query||town||filter!=="all")&&<Link href={`/${locale}/explore`} className="text-xs font-bold underline underline-offset-4">{fr?"Tout réinitialiser":"Reset all"}</Link>}
      {category && <Link href={`/${locale}/explore/${category}`} className="text-xs font-bold underline underline-offset-4">{fr ? "Le guide" : "The guide"} · {fr ? categoryFR[category].name : getCategory(category)?.name} →</Link>}
    </div>

    <section aria-label={fr?"Les adresses du Golfe":"Places around the Golfe"} className="explore-gallery">
      {list.map((place, index) => {
        const c = getCategory(place.category);
        const desc = locale === "fr" ? (placeDescriptionFr[place.id] || place.description) : place.description;
        const media = mediaForPlace(place.id);const name=placeName(place,locale);
        return <article key={place.id} className="explore-card">
          <Link href={`/${locale}/place/${place.id}`} className="group explore-card-link">
            <div className="lg-image explore-card-image">
              {media ? <><img src={media.src} alt={media.alt} loading={index<3?"eager":"lazy"} decoding="async"/>{media.contextual&&<span className="absolute bottom-3 left-3 bg-white/95 px-2 py-1 text-[9px] font-black uppercase tracking-[.08em]">{fr?"Photo du secteur":"Area photograph"}</span>}</> : <div className="explore-card-placeholder"><span aria-hidden="true" className="explore-placeholder-monogram">LG</span><span className="lg-kicker">LE GOLFE / {labels[place.category]}</span></div>}
              <span aria-hidden="true" className="explore-card-number">{String(index+1).padStart(2,"0")}</span>
              <span aria-hidden="true" className="explore-card-arrow">↗</span>
            </div>
            <div className="explore-card-copy">
              <p className="explore-card-category">{fr ? categoryFR[place.category].name : c?.name}</p>
              <h2 className="explore-card-title">{name}</h2>
              <p className="explore-card-location">{place.location}</p><div className="mt-3 flex flex-wrap gap-1.5">{categoriesForPlace(place).slice(1).map(id=><span key={id} className="rounded-full border border-[#0B4F6C]/25 px-2 py-1 text-[9px] font-bold text-[#0B4F6C]">{fr?categoryFR[id].name:getCategory(id)?.name}</span>)}{facetsForPlace(place).slice(0,2).map(id=><span key={id} className="rounded-full bg-[#edf4f6] px-2 py-1 text-[9px] font-bold text-[#0B4F6C]">{placeFacetLabels[locale][id]}</span>)}</div>
              <p className="explore-card-description">{desc}</p>
            </div>
          </Link>
          {media && (media.credit||media.license) && <p className="explore-card-credit">{[media.credit,media.license].filter(Boolean).join(" · ")}</p>}
        </article>;
      })}
    </section>
    {list.length === 0 && <div className="border-b border-black py-16"><h2 className="text-3xl font-black">{fr?"Aucune adresse pour cette recherche.":"No places match this search."}</h2><p className="mt-4 text-sm text-black/60">{fr?"Essayez une autre commune, un autre thème ou un mot plus simple.":"Try another town, theme or a simpler search term."}</p><Link href={`/${locale}/explore`} className="lg-btn mt-6">{fr?"Voir toutes les adresses":"View all places"} →</Link></div>}
  </>;
}
