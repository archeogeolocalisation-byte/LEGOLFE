import Link from "next/link";
import type {Place} from "../data/places";
import {categoryFR} from "../lib/i18n";
import type {Locale} from "../lib/i18n";
import {categoriesForPlace,facetsForPlace,placeFacetLabels} from "../lib/placeFacets";
import {exploreFilterHref} from "../lib/exploreFilters";
import {getCategory} from "../data/places";

export default function PlaceTaxonomy({place,locale}:{place:Place;locale:Locale}){
 const categories=categoriesForPlace(place),facets=facetsForPlace(place);
 return <nav aria-label={locale==="fr"?"Explorer les thèmes associés":"Explore related themes"} className="mt-5 flex flex-wrap gap-2">
  {categories.map((id,i)=><Link key={id} href={exploreFilterHref(locale,id)} className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[.07em] transition-colors hover:bg-[var(--lg-blue)] hover:text-white ${i===0?"border-[var(--lg-blue)] bg-[var(--lg-blue)] text-white":"border-[var(--lg-blue)]/35 text-[var(--lg-blue)]"}`}>{locale==="fr"?categoryFR[id].name:getCategory(id)?.name}</Link>)}
  {facets.map(id=><Link key={id} href={exploreFilterHref(locale,id)} className="rounded-full border border-[var(--lg-blue)]/25 px-3 py-2 text-[10px] font-black uppercase tracking-[.07em] text-[var(--lg-blue)] transition-colors hover:border-[var(--lg-blue)] hover:bg-[var(--lg-blue)] hover:text-white">{placeFacetLabels[locale][id]}</Link>)}
 </nav>;
}
