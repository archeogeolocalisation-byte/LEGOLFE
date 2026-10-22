import Link from "next/link";
import { navigation, type Locale } from "../lib/i18n";
import {BrandLogo} from "./BrandLogo";

export default function SiteHeader({locale="en",path=""}:{light?:boolean;locale?:Locale;path?:string}){
  const other=locale==="en"?"fr":"en"; const base=`/${locale}`; const labels=navigation[locale];
  const tone="site-header--navy border-[#315367] bg-[var(--lg-blue)] text-[var(--lg-ivory)]";
  return <header className={`relative z-40 ${tone}`}>
    <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"} className="mx-auto max-w-[1500px] px-5 pt-5 md:px-8 md:pt-7">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-current pb-5">
        <BrandLogo locale={locale} light={false} compact/>
        <div className="hidden items-center gap-6 text-[10px] font-black uppercase tracking-[.14em] xl:flex">
          <Link href={`${base}/explore`} className="lg-link-accent">{labels.explore}</Link>
          <Link href={`${base}/guides`} className="lg-link-accent">{labels.guides}</Link>
          <Link href={`${base}/whats-on`} className="lg-link-accent">{labels.agenda}</Link>
          <Link href={`${base}/local`} className="lg-link-accent">{labels.local}</Link>
          <Link href={`${base}/stay`} className="lg-link-accent">{labels.stay}</Link>
        </div>
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <Link href={`/${other}${path}`} hrefLang={other} lang={other} aria-label={locale === "fr" ? "Passer en anglais" : "Switch to French"} className="inline-flex min-h-11 min-w-8 items-center justify-center text-[10px] font-black uppercase tracking-[.15em]">{other}</Link>
          <Link href={`${base}/saved`} className="inline-flex min-h-11 items-center text-[9px] font-black uppercase tracking-[.06em] sm:text-[10px] sm:tracking-[.15em]">{labels.saved}</Link>
          <Link href={`${base}/account`} aria-label={labels.account} className="hidden text-[10px] font-black uppercase tracking-[.15em] sm:inline">{labels.account}</Link>
          <Link href={`${base}/ask`} className={`inline-flex min-h-11 items-center border px-2 py-2 text-[10px] font-black uppercase tracking-[.06em] transition-colors sm:px-3 sm:tracking-[.12em] border-[var(--lg-sand)] bg-[var(--lg-sand)] text-[var(--lg-blue)]`}>{labels.ask} ↗</Link>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto border-b border-current py-1 text-[10px] font-black uppercase tracking-[.08em] [scrollbar-width:thin] xl:hidden">
        <Link href={`${base}/explore`} className="lg-link-accent inline-flex min-h-11 shrink-0 items-center">{labels.explore}</Link>
        <Link href={`${base}/guides`} className="lg-link-accent shrink-0">{labels.guides}</Link>
        <Link href={`${base}/whats-on`} className="lg-link-accent shrink-0">{labels.agenda}</Link>
        <Link href={`${base}/local`} className="lg-link-accent shrink-0">{labels.local}</Link>
        <Link href={`${base}/stay`} className="lg-link-accent shrink-0">{labels.stay}</Link>
        <Link href={`${base}/account`} className="lg-link-accent shrink-0 sm:hidden">{labels.account}</Link>
      </div>
    </nav>
  </header>
}
