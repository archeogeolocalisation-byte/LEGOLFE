import {carreEventImages as carreImages} from "../data/carreEventImages";
import type { GolfeEvent } from "../data/events";

export type EventMedia = { kind?:"illustration"|"official"; src:string; alt:string; credit:string; license:string; source:string };
const illustrationLabels = {
  music: "Concert dans le Golfe", culture: "Exposition et patrimoine provençal",
  sport: "Course sur les sentiers du Golfe", local: "Marché provençal et vie locale",
  family: "Sortie en famille au bord de la mer", sailing: "Voiliers dans le Golfe",
  petanque: "Partie de pétanque sur une place provençale", vineyards: "Vignobles et domaine provençal",
};

export function illustrationForEvent(event:GolfeEvent):EventMedia {
  const subject = `${event.titleFr ?? ""} ${event.title} ${event.venue ?? ""}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  // Specific subjects take precedence over the broad agenda category.
  const key = /\b(petanque|boules?|bouliste\w*)\b/.test(subject) ? "petanque"
    : /\b(vign\w*|vendange\w*|oenolog\w*|viticol\w*|vins?|wine\w*)\b/.test(subject) ? "vineyards" : event.category;
  return {src:`/media/events/illustrations/${key}.webp`,alt:illustrationLabels[key],credit:"LE GOLFE",license:"Illustration originale",source:"/media/events/illustrations/sources.json",kind:"illustration"};
}

// Count only missing event photos, in the actual display order (featured, then list).
export function agendaTitleCardIds(events:readonly GolfeEvent[]):Set<string> {
  let missing=0;
  return new Set(events.filter(event=>mediaForEvent(event).kind!=="official" && missing++ % 2===1).map(event=>event.id));
}

export function mediaForEvent(event:GolfeEvent):EventMedia{
  const recorded=carreImages.find(image=>image.eventId===event.id);
  const officialImage=event.officialImage??recorded?.original;
  if(officialImage&&/^https:\/\/img\.mapado\.net\/[a-zA-Z0-9_./%-]+\.(?:jpe?g|png|webp)$/i.test(officialImage)){
    const saved=recorded?.original===officialImage?recorded:undefined;
    return {src:saved?.src??officialImage,alt:`${event.titleFr||event.title} · Le Carré Léon Gaumont`,credit:saved?.credit??"Le Carré Léon Gaumont · billetterie officielle",license:"Utilisation autorisée",source:event.source,kind:"official"};
  }
  return illustrationForEvent(event);
}

export function eventMediaLabel(image:EventMedia,locale:string){
 const fr=locale==='fr';
 return image.kind==='official'?(fr?'Visuel officiel du spectacle':'Official show image'):image.kind==='illustration'?(fr?'Illustration de contexte':'Context illustration'):(fr?'Photo de contexte':'Context photo');
}
