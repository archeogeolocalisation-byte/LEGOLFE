import Link from "next/link";
import type { Guide } from "../data/guides";
import type { Locale } from "../lib/i18n";
import GuideImage from "./GuideImage";

export function GuideCard({guide,locale}:{guide:Guide;locale:Locale}) {
 return <article className="guide-library-card">
 <GuideImage guide={guide} locale={locale}/>
 <div className="guide-library-card-copy"><p className="lg-kicker">{guide.category[locale]}</p><h3><Link href={`/${locale}/guides/${guide.slug}`}>{guide.copy[locale].seoTitle} ↗</Link></h3><p>{guide.copy[locale].description}</p><span>{locale==="fr"?"Ouvrir le guide":"Read the guide"} →</span></div>
 </article>;
}

export default function GuideCards({ items, locale }: { items: Guide[]; locale: Locale }) {
  return <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
    {items.map(guide => <article key={guide.slug} className="border-t border-black pt-5">
      <GuideImage guide={guide} locale={locale} />
      <p className="lg-kicker mt-6 text-[var(--lg-blue)]">{guide.category[locale]}</p>
      <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-[-.045em] md:text-4xl">
        <Link className="lg-link-accent" href={`/${locale}/guides/${guide.slug}`}>{guide.copy[locale].title} {guide.copy[locale].accent} <span aria-hidden="true">↗</span></Link>
      </h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-black/70">{guide.copy[locale].description}</p>
    </article>)}
  </div>;
}
