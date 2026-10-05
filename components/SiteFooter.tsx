import Link from "next/link";
import type {Locale} from "../lib/i18n";
import {BrandLogo,BrandMonogram} from "./BrandLogo";

export default function SiteFooter({locale="en"}:{locale?:Locale}){
  const fr=locale==="fr"; const base=`/${locale}`;
  return <footer className="border-t border-black bg-white text-black">
    <div className="lg-shell py-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-end">
        <div>
          <BrandLogo locale={locale}/>
          <p className="mt-6 max-w-xl text-sm font-bold leading-6 text-black/50">{fr?"Le guide local du Golfe de Saint-Tropez — villages, plages, tables, séjours et ce qui se passe maintenant.":"The local guide to the Golfe de Saint-Tropez — villages, beaches, tables, stays and what is happening now."}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-[10px] font-black uppercase tracking-[.14em] md:justify-self-end">
          <div className="space-y-3"><Link className="block" href={`${base}/destinations`}>{fr?"Communes":"Destinations"}</Link><Link className="block" href={`${base}/explore`}>{fr?"Explorer":"Explore"}</Link><Link className="block" href={`${base}/whats-on`}>What&apos;s on</Link><Link className="block" href={`${base}/local`}>Local</Link></div>
          <div className="space-y-3"><Link className="block" href={`${base}/stay`}>Stay</Link><Link className="block" href={`${base}/ask`}>Ask Le Golfe</Link><Link className="block" href={`${base}/account`}>{fr?"Compte":"Account"}</Link></div>
        </div>
      </div>
      <div className="mt-14 flex items-end justify-between border-t border-black pt-5">
        <p className="text-[8px] font-black uppercase tracking-[.18em] text-black/40">{fr?"© LE GOLFE · SAINT-TROPEZ & LE GOLFE":"© LE GOLFE · SAINT-TROPEZ & THE GOLFE"}</p>
        <BrandMonogram/>
      </div>
    </div>
  </footer>
}
