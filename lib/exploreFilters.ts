import type { Place, PlaceCategory } from "../data/places";
import type { Locale } from "./i18n";

export const exploreFilterIds = ["all", "places", "eat", "beach", "sea", "do", "party", "wellness", "services", "quiet", "view", "family"] as const;
export type ExploreFilter = typeof exploreFilterIds[number];
export const exploreFilterLabels: Record<Locale, Record<ExploreFilter, string>> = {
  fr: { all: "Tout", places: "Villages", eat: "Restaurants", beach: "Plages", sea: "Mer & bateaux", do: "À faire", party: "Sortir", wellness: "Bien-être & sport", services: "Services", quiet: "Au calme", view: "Belle vue", family: "En famille" },
  en: { all: "All", places: "Villages", eat: "Restaurants", beach: "Beaches", sea: "Boats & sea", do: "Things to do", party: "Nightlife", wellness: "Wellness & sport", services: "Services", quiet: "Quiet", view: "Great view", family: "Family" },
};
export function isExploreFilter(value: unknown): value is ExploreFilter {
  return typeof value === "string" && exploreFilterIds.some(id => id === value);
}
export function resolveExploreFilter(filter: unknown, legacyMood?: unknown): ExploreFilter {
  if (isExploreFilter(filter)) return filter;
  return isExploreFilter(legacyMood) ? legacyMood : "all";
}
export function exploreFilterHref(locale: Locale, filter: ExploreFilter) {
  return `/${locale}/explore${filter === "all" ? "" : `?filter=${filter}`}`;
}
export function exploreFilterCategory(filter: ExploreFilter): PlaceCategory | undefined {
  return ["places", "eat", "beach", "sea", "do", "party", "wellness", "services"].includes(filter) ? filter as PlaceCategory : undefined;
}
// These establishments offer both a beach experience and a restaurant.
// Keep the primary editorial category; only add the reviewed secondary use.
const secondaryCategories: Record<string, readonly PlaceCategory[]> = {
  "byblos-beach": ["beach"],
  "club-55": ["eat"],
  "indie-beach": ["eat"],
  "casita-pampelonne": ["eat"],
};
export function matchesExploreFilter(place: Place, filter: ExploreFilter): boolean {
  if (filter === "all") return true;
  const category = exploreFilterCategory(filter);
  if (category) return place.category === category || !!secondaryCategories[place.id]?.includes(category);
  // A village, proximity to the sea or a group booking does not imply calm,
  // a beach or suitability for children. Use the positive editorial signals.
  const tags = new Set(place.tags.map(tag => tag.toLowerCase()));
  const best = place.bestFor.join(" ").toLowerCase();
  if (filter === "quiet") return place.category !== "party" &&
    (tags.has("quiet") || tags.has("calm") || /\bquiet\b|\bcalm\b|slow afternoons|countryside setting/.test(best));
  if (filter === "view") return ["view", "views", "sea-view", "viewpoint", "panorama", "hilltop"].some(tag => tags.has(tag)) || /\bviews?\b|\bpanoram/.test(best);
  if (filter === "family") return place.category !== "party" &&
    (["family", "kids", "children"].some(tag => tags.has(tag)) || /\bfamil(?:y|ies)\b|\bchildren\b|\bkids\b/.test(best));
  return false;
}
