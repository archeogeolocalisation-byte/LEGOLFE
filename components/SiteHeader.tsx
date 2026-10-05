import Link from "next/link";
import type { Locale } from "../lib/i18n";
import {BrandLogo} from "./BrandLogo";

export default function SiteHeader({light=true,locale="en",path=""}:{light?:boolean;locale?:Locale;path?:string}){
  const other=locale==="en"?"fr":"en"; const base=`/${locale}`; const fr=locale==="fr";
  const tone=light?"text-black border-black":"text-white border-white";
  return <header className={`relative z-40 ${tone}`}>
    <nav className="mx-auto max-w-[1500px] px-5 pt-5 md:px-8 md:pt-7">
      <div className="flex items-center justify-between border-b border-current pb-5">
        <BrandLogo locale={locale} light={light}/>
        <div className="hidden items-center gap-8 text-[10px] font-black uppercase tracking-[.14em] md:flex">
          <Link href={`${base}/explore`} className="lg-link-accent">{fr?"Explorer":"Explore"}</Link>
          <Link href={`${base}/whats-on`} className="lg-link-accent">What&apos;s on</Link>
          <Link href={`${base}/local`} className="lg-link-accent">Local</Link>
          <Link href={`${base}/stay`} className="lg-link-accent">Stay</Link>
          <Link href={`${base}/host`} className="lg-link-accent">Host</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${other}${path}`} className="text-[10px] font-black uppercase tracking-[.15em]">{other}</Link>
          <Link href={`${base}/saved`} className="hidden text-[10px] font-black uppercase tracking-[.15em] sm:inline">{fr?"Mon séjour":"My stay"}</Link>
          <Link href={`${base}/account`} aria-label={fr?"Compte":"Account"} className="hidden text-[10px] font-black uppercase tracking-[.15em] sm:inline">{fr?"Compte":"Account"}</Link>
          <Link href={`${base}/ask`} className={`border px-3 py-2 text-[10px] font-black uppercase tracking-[.12em] transition-colors ${light?"border-[var(--lg-blue)] bg-[var(--lg-blue)] text-white":"border-white bg-white text-black"}`}>Ask ↗</Link>
        </div>
      </div>
      <div className="flex gap-6 overflow-x-auto border-b border-current py-3 text-[9px] font-black uppercase tracking-[.13em] md:hidden">
        <Link href={`${base}/explore`} className="lg-link-accent shrink-0">{fr?"Explorer":"Explore"}</Link>
        <Link href={`${base}/whats-on`} className="lg-link-accent shrink-0">What&apos;s on</Link>
        <Link href={`${base}/local`} className="lg-link-accent shrink-0">Local</Link>
        <Link href={`${base}/stay`} className="lg-link-accent shrink-0">Stay</Link>
        <Link href={`${base}/host`} className="lg-link-accent shrink-0">Host</Link>
        <Link href={`${base}/saved`} className="lg-link-accent shrink-0">{fr?"Mon séjour":"My stay"}</Link>
      </div>
    </nav>
  </header>
}
