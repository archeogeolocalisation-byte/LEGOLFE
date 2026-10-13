import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import Breadcrumbs from "../../../components/Breadcrumbs";
import CollectionSchema from "../../../components/CollectionSchema";
import GuideCards from "../../../components/GuideCards";
import { guides } from "../../../data/guides";
import { isLocale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/seo";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return [{ locale: "fr" }, { locale: "en" }]; }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata({ title: locale === "fr" ? "Guides pratiques du golfe de Saint-Tropez" : "Practical guides to the Golfe de Saint-Tropez", description: locale === "fr" ? "Marchés par jour, activités gratuites, sorties avec enfants, week-end d’automne, plages et randonnées : les guides pratiques du Golfe de Saint-Tropez." : "Markets by day, free activities, family outings, autumn weekends, beaches and walks: practical guides to the Golfe de Saint-Tropez.", path: `/${locale}/guides`, locale });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fr = locale === "fr";
  return <main className="min-h-screen bg-white text-black">
    <SiteHeader locale={locale} path="/guides" />
    <Breadcrumbs locale={locale} items={[{ name: "LE GOLFE", path: `/${locale}` }, { name: "Guides", path: `/${locale}/guides` }]} />
    <CollectionSchema name={fr ? "Guides pratiques du Golfe" : "Practical Golfe guides"} path={`/${locale}/guides`} items={guides.map(guide => ({ name: guide.copy[locale].seoTitle, path: `/${locale}/guides/${guide.slug}` }))} />
    <section className="lg-shell pb-20 pt-10 md:pb-28 md:pt-14">
      <p className="lg-kicker text-[var(--lg-blue)]">LE GOLFE / GUIDES</p>
      <h1 className="lg-menu-title mt-7">{fr ? <>LE BON PLAN.<br /><span className="lg-accent">LES BONS REPÈRES.</span></> : <>MAKE A PLAN.<br /><span className="lg-accent">KNOW YOUR WAY.</span></>}</h1>
      <p className="mt-9 max-w-3xl text-lg font-bold leading-8 md:text-xl">{fr ? "Choisir un marché, sortir avec les enfants, profiter du Golfe sans billet ou préparer une randonnée. Des guides pour prendre les bonnes décisions avant de partir, avec des repères pratiques et les sources pour vérifier ce qui change." : "Choose a market, plan a family outing, explore without an entry ticket or prepare a walk. Guides to help you decide before setting off, with practical details and sources for information that changes."}</p>
      <div className="mt-12 md:mt-16"><GuideCards items={guides} locale={locale} /></div>
    </section>
    <SiteFooter locale={locale} />
  </main>;
}
