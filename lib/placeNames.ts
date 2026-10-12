import type { Place } from "../data/places";
import type { Locale } from "./i18n";
export function placeName(place: Pick<Place,"id"|"name">, locale: Locale) {
  return locale === "fr" && place.id === "place-des-lices" ? "Place des Lices & marché" : place.name;
}
