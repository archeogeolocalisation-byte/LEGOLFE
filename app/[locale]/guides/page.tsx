import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import CollectionSchema from "../../../components/CollectionSchema";
import Link from "next/link";
import GuideImage from "../../../components/GuideImage";
import GuideCatalogue from "../../../components/GuideCatalogue";
import {topicsForGuide} from "../../../lib/guideTopics";
import {GuideCard} from "../../../components/GuideCards";
import { guides } from "../../../data/guides";
import { isLocale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/seo";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return [{ locale: "fr" }, { locale: "en" }]; }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata({ title: locale === "fr" ? "Guides pratiques du golfe de Saint-Tropez" : "Practical guides to the Golfe de Saint-Tropez", description: locale === "fr" ? "Marchés, plages, randonnées, champignons et journée dans le Verdon : les guides pratiques pour vos sorties dans le Golfe de Saint-Tropez et ses environs." : "Markets, beaches, walks, mushrooms and a Verdon day trip: practical guides for outings in and around the Golfe de Saint-Tropez.", path: `/${locale}/guides`, locale });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fr = locale === "fr";
  const featured=guides.find(guide=>guide.slug==="activites-gratuites-golfe-saint-tropez")!;
  return <main className="guides-hub min-h-screen">
    <SiteHeader locale={locale} path="/guides" />
    <Breadcrumbs locale={locale} items={[{ name: "LE GOLFE", path: `/${locale}` }, { name: "Guides", path: `/${locale}/guides` }]} />
    <CollectionSchema name={fr ? "Guides pratiques du Golfe" : "Practical Golfe guides"} path={`/${locale}/guides`} items={guides.map(guide => ({ name: guide.copy[locale].seoTitle, path: `/${locale}/guides/${guide.slug}` }))} />
    <section className="lg-shell guide-hub-content">
      <header className="guide-hub-intro"><p className="lg-kicker">LE GOLFE / GUIDES</p><h1>{fr?<>Vos envies.<br/><em>Nos repères.</em></>:<>Your plans.<br/><em>Local know-how.</em></>}</h1><p>{fr?"Une plage, un village, une journée en famille. Des idées choisies et des conseils concrets pour profiter du Golfe à votre rythme, quel que soit votre budget.":"A beach, a village, a family day out. Selected ideas and practical advice to explore the Golfe at your own pace, whatever your budget."}</p><a className="lg-btn" href="#tous-les-guides">{fr?"Trouver mon guide":"Find my guide"} ↓</a></header>
      <section className="guide-featured" aria-labelledby="featured-guide-title"><div><p className="lg-kicker">{fr?"LE GUIDE À DÉCOUVRIR":"IN THE SPOTLIGHT"}</p><h2 id="featured-guide-title">{fr?"Le Golfe à petit budget.":"The Golfe on a budget."}</h2><p>{fr?"Trois idées de sorties par secteur, des lieux à garder dans Mon séjour et les frais à anticiper. Le plaisir de découvrir, sans multiplier les kilomètres.":"Three local outing ideas, places to save in My stay and costs to plan for. Enjoy exploring without piling on the miles."}</p><Link className="lg-btn" href={`/${locale}/guides/${featured.slug}`}>{fr?"Préparer ma sortie":"Plan my outing"} ↗</Link><span>{fr?"Villages · bord de mer · pauses à votre rythme":"Villages · seaside · time to pause"}</span></div><GuideImage guide={featured} locale={locale}/></section>
      <GuideCatalogue fr={fr} items={guides.map(guide=>({slug:guide.slug,topics:topicsForGuide(guide),card:<GuideCard guide={guide} locale={locale}/>}))}/>
      <aside className="guide-stay-callout"><div><p className="lg-kicker">{fr?"DE L’IDÉE À LA SORTIE":"FROM IDEA TO OUTING"}</p><h2>{fr?"Gardez vos bonnes idées sous la main.":"Keep your favourite ideas close."}</h2><p>{fr?"Enregistrez les lieux qui vous plaisent depuis leurs fiches ou notre guide petit budget, puis retrouvez votre sélection dans Mon séjour.":"Save places from their pages or our budget guide, then find your shortlist in My stay."}</p></div><Link href={`/${locale}/saved`} className="lg-btn">{fr?"Ouvrir Mon séjour":"Open My stay"} →</Link></aside>
    </section>

  </main>;
}
