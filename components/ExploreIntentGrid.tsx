"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Place } from "../data/places";
import { getCategory, placeDescriptionFr } from "../data/places";
import type { Locale } from "../lib/i18n";
import { mediaForPlace } from "../lib/placeMedia";

type Mood = "all" | "quiet" | "beach" | "view" | "family" | "eat" | "party";

const labels: Record<Locale, Record<Mood, string>> = {
  fr: { all: "Tout", quiet: "Au calme", beach: "Journée plage", view: "Belle vue", family: "En famille", eat: "Bien manger", party: "Partying" },
  en: { all: "All", quiet: "Quiet", beach: "Beach day", view: "Great view", family: "Family", eat: "Eat well", party: "Partying" },
};

function matches(place: Place, mood: Mood) {
  if (mood === "all") return true;
  const hay = [...place.tags, ...place.bestFor].join(" ").toLowerCase();
  if (mood === "quiet") return /quiet|calm|village|countryside|slow/.test(hay);
  if (mood === "beach") return place.category === "beach" || /beach|pampelonne|swim|sea/.test(hay);
  if (mood === "view") return /view|panorama|hilltop|aerial/.test(hay);
  if (mood === "family") return /family|families|kids|children/.test(hay);
  if (mood === "eat") return place.category === "eat";
  if (mood === "party") return place.category === "party";
  return true;
}

export default function ExploreIntentGrid({ places, locale, initialMood = "all" }: { places: Place[]; locale: Locale; initialMood?: Mood }) {
  const [mood, setMood] = useState<Mood>(initialMood);
  const list = useMemo(() => places.filter((p) => matches(p, mood)), [places, mood]);

  return <>
    <div className="mt-12 border-y border-black py-4">
      <p className="lg-kicker mb-4 text-black/45">{locale === "fr" ? "COMMENCEZ PAR UNE ENVIE" : "START WITH A FEELING"}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(Object.keys(labels[locale]) as Mood[]).map((key) => <button key={key} onClick={() => setMood(key)} className={`shrink-0 px-4 py-3 text-[10px] font-black uppercase tracking-[.12em] transition ${mood === key ? "bg-[var(--lg-blue)] text-white" : "border border-black hover:border-[var(--lg-blue)] hover:text-[var(--lg-blue)]"}`}>{labels[locale][key]}</button>)}
      </div>
    </div>

    <div className="mt-10 grid gap-x-8 md:grid-cols-2">
      {list.map((place, index) => {
        const c = getCategory(place.category);
        const desc = locale === "fr" ? (placeDescriptionFr[place.id] || place.description) : place.description;
        const media = mediaForPlace(place.id);
        return <Link key={place.id} href={`/${locale}/place/${place.id}`} className={`group lg-link-accent block border-t border-black py-6 ${index % 5 === 0 ? "md:col-span-2" : ""}`}>
          <div className={`lg-image ${index % 5 === 0 ? "aspect-[16/8]" : "aspect-[5/4]"}`}>
            {media ? <img src={media.src} alt={media.alt}/> : <div className="flex h-full items-end bg-black p-6 text-white"><span className="max-w-[90%] text-5xl font-black uppercase leading-[.84] tracking-[-.06em] md:text-7xl">{place.name}</span></div>}
          </div>
          <div className="mt-4 flex items-start justify-between gap-6">
            <div><p className="lg-kicker text-black/45">{c?.label} · {place.location}</p><h3 className={`${index % 5 === 0 ? "text-[12vw] md:text-[76px]" : "text-[34px] md:text-[48px]"} mt-2 font-black uppercase leading-[.86] tracking-[-.06em]`}>{place.name}</h3></div>
            <span className="shrink-0 text-3xl font-black transition-transform group-hover:translate-x-1">↗</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/55">{desc}</p>
          {media && <p className="lg-credit">{media.contextual ? (locale === "fr" ? "Photo de contexte" : "Context photo") : "Photo"}: {media.credit} · {media.license}</p>}
        </Link>;
      })}
    </div>
    {list.length === 0 && <div className="border-b border-black py-16 text-3xl font-black">{locale === "fr" ? "Rien ici pour le moment." : "Nothing here yet."}</div>}
  </>;
}
