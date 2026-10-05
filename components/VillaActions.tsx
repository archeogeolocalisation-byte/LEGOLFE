"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "le-golfe-saved-villas";

type Props = {
  id: string;
  name: string;
  contactHref: string;
  askHref: string;
  hideContact?:boolean;
};

export default function VillaActions({ id, name, contactHref, askHref, hideContact }: Props) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    try {
      const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setSaved(Array.isArray(current) && current.includes(id));
    } catch {
      setSaved(false);
    }
  }, [id]);

  function toggleSaved() {
    try {
      const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      const ids = Array.isArray(current) ? current : [];
      const next = ids.includes(id) ? ids.filter((item: string) => item !== id) : [...ids, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(next.includes(id));
      window.dispatchEvent(new Event("le-golfe:saved-villas"));
    } catch {
      // localStorage can be unavailable in private browsing; the rest of the page still works.
    }
  }

  async function shareVilla() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${name} — LE GOLFE`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        window.setTimeout(() => setShared(false), 1800);
      }
    } catch {
      // A cancelled share sheet is not an error for the user.
    }
  }

  return (
    <div className="space-y-3">
      {!hideContact&&<Link href={contactHref} className="lg-btn w-full border-[var(--lg-blue)] bg-[var(--lg-blue)] text-white">
        Demander les disponibilités →
      </Link>}
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={toggleSaved} className="lg-btn w-full">
          {saved ? "✓ Sauvegardée" : "+ Mon séjour"}
        </button>
        <button type="button" onClick={shareVilla} className="lg-btn w-full">
          {shared ? "Lien copié" : "Partager ↗"}
        </button>
      </div>
      <Link href={askHref} className="block border-t border-black pt-4 text-[10px] font-black uppercase tracking-[.14em] lg-link-accent">
        Demander à LE GOLFE si elle vous correspond →
      </Link>
    </div>
  );
}
