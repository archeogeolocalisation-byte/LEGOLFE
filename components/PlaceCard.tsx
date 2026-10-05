import Link from "next/link";
import type { Place } from "../data/places";
import { getCategory, placeDescriptionFr } from "../data/places";
import type { Locale } from "../lib/i18n";
import { mediaForPlace } from "../lib/placeMedia";

export default function PlaceCard({place,locale="en"}:{place:Place;locale?:Locale}){
  const c=getCategory(place.category);
  const desc=locale==="fr"?(placeDescriptionFr[place.id]||place.description):place.description;
  const media=mediaForPlace(place.id);
  return <Link href={`/${locale}/place/${place.id}`} className="group lg-link-accent block border-t border-black py-5 md:py-7">
    <div className="lg-image aspect-[4/3] md:aspect-[5/4]">
      {media ? <img src={media.src} alt={media.alt}/> : <div className="flex h-full items-end bg-black p-5 text-white md:p-7"><span className="max-w-[90%] text-4xl font-black uppercase leading-[.84] tracking-[-.06em] md:text-6xl">{place.name}</span></div>}
    </div>
    <div className="mt-4 flex items-start justify-between gap-6">
      <div className="min-w-0">
        <p className="lg-kicker text-black/45">{c?.label} · {place.location}</p>
        <h3 className="mt-2 text-[32px] font-black uppercase leading-[.88] tracking-[-.055em] md:text-[46px]">{place.name}</h3>
      </div>
      <span className="shrink-0 text-2xl font-black transition-transform duration-200 group-hover:translate-x-1">↗</span>
    </div>
    <p className="mt-4 max-w-xl text-[13px] font-semibold leading-5 text-black/55 md:text-sm md:leading-6">{desc}</p>
    {media && (media.credit||media.license) && <p className="lg-credit">{media.contextual ? (locale === "fr" ? "Photo de contexte" : "Context photo") : "Photo"}: {media.credit} · {media.license}</p>}
  </Link>
}
