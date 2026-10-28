import type { Place } from "../data/places";
import type { Locale } from "./i18n";
export function placeName(place: Pick<Place,"id"|"name">, locale: Locale) {
  const hikingNames:Record<string,string>={
    'randonnee-saint-clement':'Saint-Clément hike',
    'randonnee-moulin-adrech':'Moulin de l’Adrech hike',
    'randonnee-miremer':'Notre-Dame de Miremer hike',
  };
  if(locale==='en'&&hikingNames[place.id])return hikingNames[place.id];
  return locale === "fr" && place.id === "place-des-lices" ? "Place des Lices & marché" : place.name;
}
