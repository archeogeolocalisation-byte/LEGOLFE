import Link from "next/link";
import BudgetGuidePlan from "../../../../components/BudgetGuidePlan";
import HikingRoute from '../../../../components/HikingRoute';
import {hikingRouteForGuide} from '../../../../data/hikingRoutes';
import SanPeireRoutes from "../../../../components/SanPeireRoutes";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import JsonLd from "../../../../components/JsonLd";
import GuideImage, { mediaForGuide } from "../../../../components/GuideImage";
import GuideLinks from "../../../../components/GuideLinks";
import { places } from "../../../../data/places";
import { placeName } from "../../../../lib/placeNames";
import { getGuide, guides, relatedGuidesFor } from "../../../../data/guides";
import { isLocale, type Locale } from "../../../../lib/i18n";
import { guideArticleSchema } from "../../../../lib/guideSeo";
import { pageMetadata } from "../../../../lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };
async function resolve(params: Props["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const guide = getGuide(slug);
  if (!guide) notFound();
  return { locale, guide };
}
function dateLabel(value: string, locale: Locale) { return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { dateStyle: "long", timeZone: "Europe/Paris" }).format(new Date(`${value}T12:00:00Z`)); }
export function generateStaticParams() { return ["fr", "en"].flatMap(locale => guides.map(guide => ({ locale, slug: guide.slug }))); }
export async function generateMetadata({ params }: Props) {
  const { locale, guide } = await resolve(params);
  const copy = guide.copy[locale];
  const metadata = pageMetadata({ title: copy.seoTitle, description: copy.description, path: `/${locale}/guides/${guide.slug}`, locale, image: { src: mediaForGuide(guide).photo.src, alt: guide.imageAlt[locale] } });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: `${guide.published}T12:00:00+02:00`, modifiedTime: `${guide.verified}T12:00:00+02:00` } };
}
export default async function Page({ params }: Props) {
  const { locale, guide } = await resolve(params);
  const fr = locale === "fr", copy = guide.copy[locale], path = `/guides/${guide.slug}`;
  const related = relatedGuidesFor(guide);
  const hikingRoute = hikingRouteForGuide(guide.slug);
  const mentionedPlaces = guide.placeIds.flatMap(id => places.filter(place => place.id === id));
  const schema = guideArticleSchema(guide, locale);
  return <main className="min-h-screen bg-white text-black">
    <SiteHeader locale={locale} path={path} />
    <Breadcrumbs locale={locale} items={[{ name: "LE GOLFE", path: `/${locale}` }, { name: "Guides", path: `/${locale}/guides` }, { name: copy.seoTitle, path: `/${locale}${path}` }]} />
    {schema && <JsonLd data={schema} />}
    <article>
      <header className="lg-shell pb-10 pt-10 md:pt-14">
        <p className="lg-kicker">LE GOLFE / {guide.category[locale]}</p>
        <h1 className="lg-display mt-7 text-[12vw] leading-[.9] md:text-[92px]">{copy.title}<br /><span className="lg-accent">{copy.accent}</span></h1>
        <p className="mt-9 max-w-3xl text-xl font-bold leading-8">{copy.intro}</p>
        <p className="mt-6 text-xs leading-6 text-black/65">LE GOLFE · {fr ? "Repères vérifiés le" : "Details checked on"} <time dateTime={guide.verified}>{dateLabel(guide.verified, locale)}</time></p>
      </header>
      <div className="lg-shell"><GuideImage guide={guide} locale={locale} hero /></div>
      <div className="lg-shell mt-10">
        <dl className="grid gap-6 border-y border-black py-7 md:grid-cols-3">{copy.facts.map(fact => <div key={fact.label}><dt className="lg-kicker text-black/60">{fact.label}</dt><dd className="mt-3 text-lg font-black leading-7">{fact.value}</dd></div>)}</dl>
      </div>
      {guide.slug==='activites-gratuites-golfe-saint-tropez'&&<BudgetGuidePlan locale={locale}/>}
      {guide.slug==='randonnee-san-peire-plan-de-la-tour'&&<SanPeireRoutes locale={locale}/>}
      {hikingRoute&&<HikingRoute key={hikingRoute.id} route={hikingRoute} locale={locale}/>}
      <div className="lg-shell grid gap-10 py-12 md:grid-cols-[.35fr_1fr] md:gap-14 md:py-16">
        <aside>
          <nav aria-label={fr ? "Sommaire du guide" : "Guide contents"} className="border-t border-black pt-5 md:sticky md:top-8">
            <p className="lg-kicker text-[var(--lg-blue)]">{fr ? "DANS CE GUIDE" : "IN THIS GUIDE"}</p>
            <ol className="mt-4 space-y-3 text-sm font-bold leading-6">{copy.sections.map((section, index) => <li key={section.id}><a className="lg-link-accent" href={`#${section.id}`}><span className="mr-2 text-black/45">{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}</ol>
            <a href="#sources" className="mt-5 inline-block text-xs font-bold underline underline-offset-4">{fr ? "Sources et informations à jour" : "Sources and current information"}</a>
          </nav>
        </aside>
        <div className="min-w-0 max-w-3xl">
          <div className="border-l-4 border-[var(--lg-blue)] pl-6"><p className="lg-kicker text-[var(--lg-blue)]">{fr ? "LE CONSEIL LE GOLFE" : "THE LE GOLFE TAKE"}</p><p className="mt-4 text-xl font-black leading-8">{copy.verdict}</p></div>
          {copy.sections.map(section => <section id={section.id} key={section.id} className="scroll-mt-8 border-t border-black/25 pt-7 mt-12">
            <h2 className="text-3xl font-black leading-tight tracking-[-.04em] md:text-4xl">{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => <p key={index} className="mt-5 text-base leading-8 text-black/80 md:text-lg">{paragraph}</p>)}
            {(section.links?.length||section.externalLinks?.length)?<div className="mt-6 flex flex-wrap gap-3">{section.links?.map(link=><Link key={link.path} className="lg-btn" href={`/${locale}${link.path}`}>{link.label} ↗</Link>)}{section.externalLinks?.map(link=><a key={link.url} className="lg-link-accent inline-flex min-h-11 items-center border-b border-black/25 py-2 text-sm font-bold underline underline-offset-4" href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>:null}
            {section.table && <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-left text-sm leading-6"><caption className="mb-3 text-left text-xs font-bold text-black/65">{section.table.caption}</caption><thead className="bg-[#0b2534] text-white"><tr>{section.table.headers.map(label => <th key={label} scope="col" className="px-4 py-3">{label}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index} className="border-b border-black/20 odd:bg-neutral-100">{row.map((cell, column) => column === 0 ? <th key={column} scope="row" className="px-4 py-3">{cell}</th> : <td key={column} className="px-4 py-3">{cell || "—"}</td>)}</tr>)}</tbody></table></div>}
            {section.sourceIds && <p className="mt-4 text-xs leading-6 text-black/60">{fr ? "Repères : " : "References: "}{section.sourceIds.map((id, index) => { const source = guide.sources.find(item => item.id === id)!; return <span key={id}>{index > 0 && " · "}<a className="underline underline-offset-2" href={`#source-${id}`}>{source.label}</a></span>; })}</p>}
          </section>)}
          <section className="mt-12 border-t border-black pt-7" aria-labelledby="questions-title">
            <h2 id="questions-title" className="text-3xl font-black">{fr ? "Les questions pratiques." : "Practical questions."}</h2>
            {copy.questions.map(item => <details key={item.question} className="mt-5 border-b border-black/20 pb-5"><summary className="cursor-pointer text-lg font-bold leading-7">{item.question}</summary><p className="mt-4 text-base leading-7 text-black/75">{item.answer}</p></details>)}
          </section>
          <section className="mt-12 border-t border-black pt-7">
            <h2 className="text-3xl font-black">{fr ? "Passez au concret." : "Make your plan."}</h2>
            <div className="mt-6 flex flex-wrap gap-3">{copy.links.map(link => <Link key={link.path} className="lg-btn" href={`/${locale}${link.path}`}>{link.label} <span className="ml-2" aria-hidden="true">↗</span></Link>)}</div>
          </section>
          {mentionedPlaces.length > 0 && <section className="mt-12 border-t border-black pt-7" aria-labelledby="guide-places-title">
            <h2 id="guide-places-title" className="text-3xl font-black">{fr ? "Les lieux de ce guide." : "Places in this guide."}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">{mentionedPlaces.map(place => <li key={place.id}>
              <Link className="lg-link-accent block border-b border-black/20 py-3" href={`/${locale}/place/${place.id}`}>
                <span className="font-bold">{placeName(place, locale)} →</span><span className="mt-1 block text-sm text-black/65">{place.location}</span>
              </Link>
            </li>)}</ul>
          </section>}
          <section id="sources" className="mt-12 scroll-mt-8 border-t border-black pt-7">
            <h2 className="text-2xl font-black">{fr ? "Les sources. Les infos à jour." : "Sources. Current details."}</h2>
            <p className="mt-4 text-sm leading-7 text-black/70">{fr ? "Guide préparé par LE GOLFE à partir des sources ci-dessous. Les conseils de rythme et de programme sont nos propositions éditoriales. Consultez les lieux et les transporteurs pour les horaires, tarifs et disponibilités à vos dates." : "Prepared by LE GOLFE using the sources below. Suggested pace and day plans are our editorial recommendations. Check venues and transport operators for openings, prices and availability on your dates."}</p>
            <ul className="mt-5 space-y-3 text-sm leading-6">{guide.sources.map(source => <li id={`source-${source.id}`} key={source.id} className="scroll-mt-8"><a className="underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}</ul>
          </section>
        </div>
      </div>
    </article>
    <GuideLinks items={related} locale={locale} />

  </main>;
}
