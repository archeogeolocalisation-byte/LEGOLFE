import Link from "next/link";
import { destinations } from "../data/destinations";
import type { Locale } from "../lib/i18n";
export default function DestinationLinks({locale}:{locale:Locale}){
 return <section className="border-t border-black py-10"><div className="flex flex-wrap items-baseline justify-between gap-4"><h2 className="text-3xl font-black">{locale==="fr"?"Choisir une commune":"Choose a destination"}</h2><Link href={`/${locale}/destinations`} className="text-xs font-bold underline">{locale==="fr"?"Tous les guides locaux":"All destination guides"} →</Link></div><div className="mt-6 flex flex-wrap gap-3">{destinations.map(t=><Link key={t.slug} href={`/${locale}/destinations/${t.slug}`} className="lg-btn">{t.name}</Link>)}</div></section>;
}
