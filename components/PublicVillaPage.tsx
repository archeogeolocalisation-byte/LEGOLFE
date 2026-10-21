import { notFound } from "next/navigation";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";
import SiteHeader from "./SiteHeader";
import {getVillaAnnouncer} from "../lib/villaAnnouncer";
import VillaDetail from "./VillaDetail";
import { getPublicVilla } from "../lib/publicVillas";
import { pageMetadata, absoluteUrl, siteOrigin } from "../lib/seo";
import { parisIsoDay } from "../lib/localCalendar";
import { villaHref } from "../lib/villaPaths";
import { villaDescriptionEn } from "../data/staySelections";
import type { Locale } from "../lib/i18n";

export async function villaMetadata(id: string, locale: Locale) {
  const villa = await getPublicVilla(id);
  if (!villa) notFound();
  const fr = locale === "fr";
  const metadata = pageMetadata({
    title: fr ? `${villa.name} à ${villa.location} · Villa ${villa.bedrooms} chambres` : `${villa.name} in ${villa.location} · ${villa.bedrooms}-bedroom villa`,
    description: fr ? villa.description : villa.descriptionEn || villaDescriptionEn[id] || villa.description,
    path: villaHref(id, locale), locale, bilingual: false, image: villa.photos[0],
  });
  return { ...metadata, ...(!villa.live?{robots:{index:false,follow:true}}:{}), alternates: siteOrigin() ? {
    canonical: absoluteUrl(villaHref(id, locale)),
    languages: { fr: absoluteUrl(villaHref(id, "fr"))!, en: absoluteUrl(villaHref(id, "en"))!, "x-default": absoluteUrl(villaHref(id, "en"))! },
  } : undefined };
}

export default async function PublicVillaPage({ id, locale }: { id: string; locale: Locale }) {
  const villa = await getPublicVilla(id);
  if (!villa) notFound();
  const announcerProfile=villa.live?await getVillaAnnouncer(id):null;
  return <main className="min-h-screen bg-white text-black">
    <SiteHeader locale={locale} path={`/villa/${id}`} />
    <Breadcrumbs locale={locale} items={[{ name: "LE GOLFE", path: `/${locale}` }, { name: locale === "fr" ? "Maisons et villas" : "Houses & villas", path: `/${locale}/stay` }, { name: villa.name, path: villaHref(id, locale) }]} />
    {villa.live && siteOrigin() && <JsonLd data={{ "@context": "https://schema.org", "@type": "Accommodation", name: villa.name, url: absoluteUrl(villaHref(id, locale)), description: locale === "fr" ? villa.description : villa.descriptionEn || villaDescriptionEn[id] || villa.description, ...(villa.photos.length ? { image: villa.photos.map(p => absoluteUrl(p.src)) } : {}), address: { "@type": "PostalAddress", addressLocality: villa.location, addressCountry: "FR" }, numberOfBedrooms: villa.bedrooms, occupancy: { "@type": "QuantitativeValue", value: villa.guests } }} />}
    <VillaDetail villa={villa} today={parisIsoDay()} locale={locale} announcerProfile={announcerProfile}/>

  </main>;
}
