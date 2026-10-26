"use client";
import type { Locale } from "../lib/i18n";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "le-golfe-saved-villas";

type Props = {
  id: string;
  name: string;
  contactHref: string;
  askHref: string;
  hideContact?:boolean;
  locale?:Locale;
};

export default function VillaActions({ id, name, contactHref, askHref, hideContact, locale="fr" }: Props) {
 const fr=locale==="fr",t=(a:string,b:string)=>fr?a:b;
  const [saved, setSaved] = useState(false);
  const [saveError,setSaveError]=useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    function refresh(){
      try {
        const current=JSON.parse(window.localStorage.getItem(STORAGE_KEY)||"[]");
        setSaved(Array.isArray(current)&&current.includes(id));
      } catch {setSaved(false);}
    }
    refresh();
    window.addEventListener('le-golfe:saved-villas',refresh);
    window.addEventListener('storage',refresh);
    return ()=>{
      window.removeEventListener('le-golfe:saved-villas',refresh);
      window.removeEventListener('storage',refresh);
    };
  }, [id]);

  function toggleSaved() {
    try {
      const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      const ids = Array.isArray(current) ? current.filter((item:unknown):item is string=>typeof item==='string') : [];
      const next = ids.includes(id) ? ids.filter((item: string) => item !== id) : [...ids, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(next.includes(id));
      setSaveError(false);
      window.dispatchEvent(new Event("le-golfe:saved-villas"));
    } catch {
      setSaveError(true);
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
        {t("Demander les disponibilités →","Request availability →")}
      </Link>}
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={toggleSaved} aria-pressed={saved} className="lg-btn w-full">
          {saved ? t("✓ Sauvegardée","✓ Saved") : t("+ Mon séjour","+ My stay")}
        </button>
        <button type="button" onClick={shareVilla} className="lg-btn w-full">
          {shared ? t("Lien copié","Link copied") : t("Partager ↗","Share ↗")}
        </button>
      </div>
      {saveError&&<p role="alert" className="text-sm leading-6 text-red-700">{t("L’enregistrement est indisponible dans ce navigateur. Réessayez après avoir autorisé le stockage local.","Saving is unavailable in this browser. Allow local storage and try again.")}</p>}
      {saved&&<Link href={`/${locale}/saved`} className="block py-3 text-sm font-bold underline underline-offset-4">{t("Retrouver la maison dans Mon séjour →","View this home in My stay →")}</Link>}
      <Link href={askHref} className="block border-t border-black pt-4 text-[10px] font-black uppercase tracking-[.14em] lg-link-accent">
        {t("Demander à LE GOLFE si elle vous correspond →","Ask LE GOLFE if this home suits you →")}
      </Link>
    </div>
  );
}
