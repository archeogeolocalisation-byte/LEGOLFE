import { placeName } from "./placeNames";
import { placeFacetMatch } from "./placeFacets";
import { destinations, destinationsForLocation } from "../data/destinations";
import { placeDescriptionFr } from "../data/places";
import type { Place, PlaceCategory } from "../data/places";
import type { Locale } from "./i18n";

export const exploreFilterIds = ["all", "places", "eat", "beach", "sea", "do", "party", "wellness", "services", "quiet", "view", "family", "walk", "heritage", "nature", "music", "romantic", "lunch", "beachclub"] as const;
export type ExploreFilter = typeof exploreFilterIds[number];
export const exploreFilterLabels: Record<Locale, Record<ExploreFilter, string>> = {
  fr: { all: "Tout", places: "Patrimoine", eat: "Restaurants", beach: "Plages", sea: "Mer & bateaux", do: "À faire", party: "Sortir", wellness: "Bien-être & sport", services: "Services", quiet: "Au calme", view: "Belle vue", family: "En famille",walk:"Balade & randonnée",heritage:"Patrimoine & histoire",nature:"Nature",music:"Musique & soirées",romantic:"À deux",lunch:"Déjeuner",beachclub:"Clubs de plage" },
  en: { all: "All", places: "Heritage", eat: "Restaurants", beach: "Beaches", sea: "Boats & sea", do: "Things to do", party: "Nightlife", wellness: "Wellness & sport", services: "Services", quiet: "Quiet", view: "Great view", family: "Family",walk:"Walks & hiking",heritage:"Heritage & history",nature:"Nature",music:"Music & nightlife",romantic:"For two",lunch:"Lunch",beachclub:"Beach clubs" },
};
export function isExploreFilter(value: unknown): value is ExploreFilter {
  return typeof value === "string" && exploreFilterIds.some(id => id === value);
}
export function resolveExploreFilter(filter: unknown, legacyMood?: unknown): ExploreFilter {
  if (isExploreFilter(filter)) return filter;
  return isExploreFilter(legacyMood) ? legacyMood : "all";
}
export function exploreFilterHref(locale: Locale, filter: ExploreFilter, query = "", town = "") {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter",filter);
  if (query) params.set("q",query);
  if (town) params.set("town",town);
  return `/${locale}/explore${params.size ? `?${params}` : ""}`;
}
export function exploreFilterCategory(filter: ExploreFilter): PlaceCategory | undefined {
  return ["places", "eat", "beach", "sea", "do", "party", "wellness", "services"].includes(filter) ? filter as PlaceCategory : undefined;
}
// One shared classification powers Explorer, place labels and recommendations.
export function matchesExploreFilter(place: Place, filter: ExploreFilter): boolean {
  return filter==="all" || filter===place.category || placeFacetMatch(place,filter);
}

export function resolveExploreSearch(query: unknown, town: unknown) {
  return { query: typeof query === "string" ? query.trim().slice(0,100) : "", town: typeof town === "string" && destinations.some(d=>d.slug===town) ? town : "" };
}
const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export function matchesExploreSearch(place: Place, query: string, town: string) {
  if (town && !destinationsForLocation(place.location).some(d=>d.slug===town)) return false;
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const text = normalizeSearch([place.name,placeName(place,"fr"),place.location,place.description,placeDescriptionFr[place.id]||""].join(" "));
  return terms.every(term=>text.includes(term));
}

const villageIds=new Set(destinations.flatMap(d=>d.villageId?[d.villageId]:[]));
export function isExploreAddress(place:Place){return !villageIds.has(place.id)&&place.id!=="port-grimaud";}
