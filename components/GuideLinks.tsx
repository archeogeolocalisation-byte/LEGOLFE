import Link from "next/link";
import type { Guide } from "../data/guides";
import type { Locale } from "../lib/i18n";

export default function GuideLinks({ items, locale }: { items: Guide[]; locale: Locale }) {
  if (!items.length) return null;
  return <section className="lg-shell py-12 md:py-16">
    <div className="border-t border-black pt-7">
      <p className="lg-kicker text-[var(--lg-blue)]">LE GOLFE / GUIDES</p>
      <h2 className="mt-4 text-3xl font-black tracking-[-.04em]">{locale === "fr" ? "Préparer votre journée." : "Plan your day."}</h2>
      <div className="mt-6 grid gap-x-10 md:grid-cols-2">{items.map(guide => <Link key={guide.slug} href={`/${locale}/guides/${guide.slug}`} className="lg-link-accent border-t border-black/20 py-5">
        <p className="text-xl font-black">{guide.copy[locale].seoTitle} <span aria-hidden="true">↗</span></p>
        <p className="mt-2 text-sm leading-6 text-black/65">{guide.copy[locale].description}</p>
      </Link>)}</div>
    </div>
  </section>;
}
