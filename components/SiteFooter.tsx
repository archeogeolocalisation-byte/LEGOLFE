import Link from "next/link";
import { navigation, type Locale } from "../lib/i18n";
import {BrandLogo,BrandMonogram} from "./BrandLogo";

export default function SiteFooter({locale="en",dark=false}:{locale?:Locale;dark?:boolean}){
  const fr=locale==="fr"; const labels=navigation[locale]; const base=`/${locale}`;
  return <footer className={dark?"border-t border-white/20 bg-[#050505] text-white":"border-t border-black bg-white text-black"}>
    <div className="lg-shell py-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-end">
        <div>
          <BrandLogo locale={locale} light={!dark}/>
          <p className={`mt-6 max-w-xl text-sm font-bold leading-6 ${dark?"text-white/65":"text-black/50"}`}>{fr?"Le guide local du Golfe de Saint-Tropez — villages, plages, tables, séjours et ce qui se passe maintenant.":"The local guide to the Golfe de Saint-Tropez — villages, beaches, tables, stays and what is happening now."}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-[10px] font-black uppercase tracking-[.14em] md:justify-self-end">
          <div className="space-y-3"><Link className="block" href={`${base}/carte-touristique`}>{labels.touristMap}</Link><Link className="block" href={`${base}/destinations`}>{fr?"Communes":"Destinations"}</Link><Link className="block" href={`${base}/guides`}>{labels.guides}</Link><Link className="block" href={`${base}/explore`}>{labels.explore}</Link><Link className="block" href={`${base}/whats-on`}>{labels.agenda}</Link><Link className="block" href={`${base}/local`}>{labels.local}</Link></div>
          <div className="space-y-3"><Link className="block" href={`${base}/stay`}>{labels.stay}</Link><Link className="block" href={`${base}/ask`}>{labels.askFull}</Link><Link className="block" href={`${base}/account`}>{labels.account}</Link><Link className="block" href={`${base}/how-it-works`}>{fr?"Fonctionnement & pilote":"How it works & pilot"}</Link></div>
        </div>
      </div>
      <div className={`mt-14 flex items-end justify-between border-t pt-5 ${dark?"border-white/20":"border-black"}`}>
        <p className={`text-[8px] font-black uppercase tracking-[.18em] ${dark?"text-white/55":"text-black/40"}`}>{fr?"© LE GOLFE · SAINT-TROPEZ & LE GOLFE":"© LE GOLFE · SAINT-TROPEZ & THE GOLFE"}</p>
        <BrandMonogram light={!dark}/>
      </div>
    </div>
  </footer>
}
