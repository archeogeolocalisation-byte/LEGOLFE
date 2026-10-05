import Link from "next/link";
import PlaceCard from "./PlaceCard";
import { destinationForLocation, placesInDestination } from "../data/destinations";
import type { Locale } from "../lib/i18n";
export default function EventLocalLinks({location,locale}:{location:string;locale:Locale}){
 const town=destinationForLocation(location);if(!town)return null;const list=placesInDestination(town);const fr=locale==="fr";
 const selected=["eat","party","do","beach"].flatMap(category=>list.filter(p=>p.category===category).slice(0,1)).slice(0,3);
 return <section className="lg-shell border-t border-black py-12"><p className="lg-kicker">{town.name}</p><h2 className="mt-4 text-3xl font-black">{fr?"Composer votre sortie dans la commune":"Plan your outing in the commune"}</h2><p className="mt-5 max-w-3xl leading-7 text-black/60">{fr?"Pour compléter la journée ou la soirée, voici des adresses du catalogue dans la même commune. Confirmez les horaires et les réservations selon la date de l’événement.":"To complete your day or evening, explore these catalog places in the same commune. Check opening times and bookings for your event date."}</p><div className="mt-6 grid gap-6 md:grid-cols-3">{selected.map(p=><PlaceCard key={p.id} place={p} locale={locale}/>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link className="lg-btn" href={`/${locale}/destinations/${town.slug}`}>{fr?"Tout le guide de":"All guides for"} {town.name} →</Link><Link className="lg-btn" href={`/${locale}/stay`}>{fr?"Préparer le séjour":"Plan your stay"}</Link></div></section>;
}
