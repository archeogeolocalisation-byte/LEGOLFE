"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Place } from "../data/places";
import type { Locale } from "../lib/i18n";

const STORAGE_KEY = "le-golfe-saved-places";

function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export default function PlaceActions({ place, locale }: { place: Place; locale: Locale }) {
  const fr = locale === "fr";
  const [saved, setSaved] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ids = readSaved();
    setSaved(ids.includes(place.id));
    setCount(ids.length);
  }, [place.id]);

  function toggleSaved() {
    const ids = readSaved();
    const next = ids.includes(place.id) ? ids.filter((id) => id !== place.id) : [...ids, place.id];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next.includes(place.id));
    setCount(next.length);
  }

  const askHref = useMemo(
    () => `/${locale}/ask?place=${encodeURIComponent(place.name)}&location=${encodeURIComponent(place.location)}`,
    [locale, place.location, place.name]
  );

  const primaryUrl = place.bookingUrl || place.website;
  const primaryLabel = place.bookingUrl
    ? fr ? "Réserver" : "Book"
    : fr ? "Site officiel" : "Official site";

  return (
    <section className="border-y border-black bg-white text-black">
      <div className="lg-shell py-8 md:py-10">
        <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="lg-kicker">{fr ? "AGIR" : "NEXT MOVE"}</p>
            <h2 className="lg-title mt-4 max-w-3xl text-4xl md:text-6xl">
              {fr ? "GARDEZ-LE. RÉSERVEZ-LE. CONSTRUISEZ AUTOUR." : "SAVE IT. BOOK IT. BUILD AROUND IT."}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {primaryUrl && (
              <a href={primaryUrl} target="_blank" rel="noreferrer" className="lg-btn lg-btn--dark">
                {primaryLabel} ↗
              </a>
            )}
            <button type="button" onClick={toggleSaved} className={`lg-btn ${saved ? "lg-btn--dark" : ""}`}>
              {saved ? (fr ? "Ajouté ✓" : "Saved ✓") : (fr ? "Ajouter à mon séjour" : "Add to my stay")}
            </button>
            <Link href={askHref} className="lg-btn">
              {fr ? "Demander à LE GOLFE" : "Ask LE GOLFE"} →
            </Link>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-black/20 pt-4 text-[10px] font-black uppercase tracking-[.13em]">
          <span>{fr ? "Votre sélection reste sur cet appareil." : "Your shortlist stays on this device."}</span>
          <Link href={`/${locale}/saved`} className="underline underline-offset-4">
            {fr ? "Mon séjour" : "My stay"} · {count}
          </Link>
        </div>
      </div>
    </section>
  );
}
