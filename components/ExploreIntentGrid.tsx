import { placeName } from "../lib/placeNames";
import Link from "next/link";
import type { Place } from "../data/places";
import { getCategory, placeDescriptionFr } from "../data/places";
import { categoryFR, type Locale } from "../lib/i18n";
import { mediaForPlace } from "../lib/placeMedia";

import { destinations } from "../data/destinations";
import { exploreFilterIds, exploreFilterLabels, exploreFilterHref, exploreFilterCategory, matchesExploreFilter, matchesExploreSearch, type ExploreFilter } from "../lib/exploreFilters";

export default function ExploreIntentGrid({ places, locale, filter = "all", query="", town="" }: { places: Place[]; locale: Locale; filter?: ExploreFilter;query?:string;town?:string }) {
  const fr = locale === "fr";
  const labels = exploreFilterLabels[locale];
  const candidates=places.filter(place=>matchesExploreSearch(place,query,town));
  const list = candidates.filter(place => matchesExploreFilter(place, filter));
  const counts = Object.fromEntries(exploreFilterIds.map(id => [id, candidates.filter(place => matchesExploreFilter(place, id)).length]));
  const category = exploreFilterCategory(filter);

  return <>
    <nav aria-label={fr ? "Filtrer les adresses" : "Filter places"} className="mt-10 border-y border-black py-5">
      <p className="lg-kicker text-black/45">{fr ? "UN THÈME. UNE ENVIE." : "A THEME. A MOOD."}</p>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">{fr ? "Choisissez ce que vous cherchez. Une adresse peut correspondre à plusieurs envies." : "Choose what you’re looking for. A place can suit more than one mood."}</p>
      <form action={`/${locale}/explore`} method="get" className="mt-5 grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
        {filter!=="all" && <input type="hidden" name="filter" value={filter}/>}
        <label className="block text-xs font-bold">{fr?"Rechercher une adresse":"Find a place"}<input key={query} type="search" name="q" maxLength={100} defaultValue={query} placeholder={fr?"Nom, lieu, envie…":"Name, place, mood…"} className="mt-2 w-full border border-black/25 bg-white p-3 text-sm font-normal focus-visible:outline-2 focus-visible:outline-[var(--lg-blue)]"/></label>
        <label className="block text-xs font-bold">{fr?"Commune":"Town"}<select key={town} name="town" defaultValue={town} className="mt-2 w-full border border-black/25 bg-white p-3 text-sm font-normal"><option value="">{fr?"Tout le Golfe":"Across the Golfe"}</option>{destinations.map(d=><option key={d.slug} value={d.slug}>{d.name}</option>)}</select></label>
        <button className="lg-btn lg-btn--dark">{fr?"Rechercher":"Search"} →</button>
      </form>
      <div className="mt-5 flex flex-wrap gap-2">
        {exploreFilterIds.map(id => <Link key={id} href={exploreFilterHref(locale, id,query,town)} scroll={false} prefetch={false} aria-current={filter === id ? "page" : undefined} className={`inline-flex items-center gap-3 border px-4 py-3 text-[10px] font-black uppercase tracking-[.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lg-blue)] ${filter === id ? "border-[var(--lg-blue)] bg-[var(--lg-blue)] text-white" : "border-black/25 hover:border-[var(--lg-blue)] hover:text-[var(--lg-blue)]"}`}>
          {labels[id]} <span className="text-[9px] opacity-60">{counts[id]}</span>
        </Link>)}
      </div>
    </nav>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      <p role="status" className="text-xs font-bold text-black/55">{list.length} {fr ? (list.length === 1 ? "adresse" : "adresses") : (list.length === 1 ? "place" : "places")} · {labels[filter]}{town?` · ${destinations.find(d=>d.slug===town)?.name}`:""}{query?` · « ${query} »`:""}</p>
      {(query||town||filter!=="all")&&<Link href={`/${locale}/explore`} className="text-xs font-bold underline underline-offset-4">{fr?"Tout réinitialiser":"Reset all"}</Link>}
      {category && <Link href={`/${locale}/explore/${category}`} className="text-xs font-bold underline underline-offset-4">{fr ? "Le guide" : "The guide"} · {fr ? categoryFR[category].name : getCategory(category)?.name} →</Link>}
    </div>

    <div className="mt-10 grid gap-x-8 md:grid-cols-2">
      {list.map((place, index) => {
        const c = getCategory(place.category);
        const desc = locale === "fr" ? (placeDescriptionFr[place.id] || place.description) : place.description;
        const media = mediaForPlace(place.id);const name=placeName(place,locale);
        return <Link key={place.id} href={`/${locale}/place/${place.id}`} className={`group lg-link-accent block border-t border-black py-6 ${index % 5 === 0 ? "md:col-span-2" : ""}`}>
          <div className={`lg-image ${index % 5 === 0 ? "aspect-[16/8]" : "aspect-[5/4]"}`}>
            {media ? <img src={media.src} alt={media.alt} loading={index===0?"eager":"lazy"} decoding="async"/> : <div className="flex h-full items-end bg-black p-6 text-white"><span className="max-w-[90%] text-5xl font-black uppercase leading-[.84] tracking-[-.06em] md:text-7xl">{name}</span></div>}
          </div>
          <div className="mt-4 flex items-start justify-between gap-6">
            <div><p className="lg-kicker text-black/45">{locale === "fr" ? categoryFR[place.category].name : c?.label} · {place.location}</p><h3 className={`${index % 5 === 0 ? "text-[12vw] md:text-[76px]" : "text-[34px] md:text-[48px]"} mt-2 font-black uppercase leading-[.86] tracking-[-.06em]`}>{name}</h3></div>
            <span className="shrink-0 text-3xl font-black transition-transform group-hover:translate-x-1">↗</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/55">{desc}</p>
          {media && (media.credit||media.license) && <p className="lg-credit">{media.contextual ? (locale === "fr" ? "Photo de contexte" : "Context photo") : "Photo"}: {[media.credit,media.license].filter(Boolean).join(" · ")}</p>}
        </Link>;
      })}
    </div>
    {list.length === 0 && <div className="border-b border-black py-16"><h2 className="text-3xl font-black">{fr?"Aucune adresse pour cette recherche.":"No places match this search."}</h2><p className="mt-4 text-sm text-black/60">{fr?"Essayez une autre commune, un autre thème ou un mot plus simple.":"Try another town, theme or a simpler search term."}</p><Link href={`/${locale}/explore`} className="lg-btn mt-6">{fr?"Voir toutes les adresses":"View all places"} →</Link></div>}
  </>;
}
