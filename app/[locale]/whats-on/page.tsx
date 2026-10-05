import SiteFooter from "../../../components/SiteFooter";
import { parisIsoDay } from "../../../lib/localCalendar";
import { pageMetadata } from "../../../lib/seo";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import { isLocale } from "../../../lib/i18n";
import AgendaClient from "./AgendaClient";
import { getPublicEvents } from "../../../lib/publicEvents";

export const dynamic = "force-dynamic";

export default async function WhatsOn({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const merged = await getPublicEvents();

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader locale={locale} path="/whats-on" />
      <AgendaClient locale={locale} events={merged} initialDay={parisIsoDay()} /><SiteFooter locale={locale}/>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 return pageMetadata({ title: locale === "fr" ? "Agenda du Golfe de Saint-Tropez : sorties et événements" : "Golfe de Saint-Tropez events and things to do", description: locale === "fr" ? "Concerts, culture, régates et sorties en famille : consultez l’agenda de Saint-Tropez, Ramatuelle et des communes du Golfe." : "Concerts, culture, sailing and family outings: explore events in Saint-Tropez, Ramatuelle and around the Golfe.", path: `/${locale}/whats-on`, locale });
}
