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
  {categories.map((id,i)=><Link key={id} href={exploreFilterHref(locale,id)} className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[.07em] transition-colors hover:bg-[#0B4F6C] hover:text-white ${i===0?"border-[#0B4F6C] bg-[#0B4F6C] text-white":"border-[#0B4F6C]/35 text-[#0B4F6C]"}`}>{locale==="fr"?categoryFR[id].name:getCategory(id)?.name}</Link>)}
  {facets.map(id=><Link key={id} href={exploreFilterHref(locale,id)} className="rounded-full border border-[#0B4F6C]/25 px-3 py-2 text-[10px] font-black uppercase tracking-[.07em] text-[#0B4F6C] transition-colors hover:border-[#0B4F6C] hover:bg-[#0B4F6C] hover:text-white">{placeFacetLabels[locale][id]}</Link>)}
 </nav>;
}
