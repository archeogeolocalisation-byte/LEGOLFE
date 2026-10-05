import { eventOverlaps, firstSessionInWindow, addDays } from "../../../../lib/agendaCalendar";
import { parisIsoDay } from "../../../../lib/localCalendar";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import SiteFooter from "../../../../components/SiteFooter";
import PlaceCard from "../../../../components/PlaceCard";
import VillaCard from "../../../../components/VillaCard";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import CollectionSchema from "../../../../components/CollectionSchema";
import { getDestination, destinations, placesInDestination, villasInDestination, categoriesInDestination, destinationForLocation } from "../../../../data/destinations";
import { isLocale, categoryFR } from "../../../../lib/i18n";
import { placeCategories } from "../../../../data/places";
import { pageMetadata } from "../../../../lib/seo";
import { mediaForPlace } from "../../../../lib/placeMedia";
import { getPublicEvents } from "../../../../lib/publicEvents";
type Props={params:Promise<{locale:string;town:string}>};
async function resolve(params:Props["params"]){const {locale,town}=await params;if(!isLocale(locale))notFound();const destination=getDestination(town);if(!destination)notFound();return {locale,destination};}
export async function generateMetadata({params}:Props){const {locale,destination:t}=await resolve(params);return pageMetadata({title:locale==="fr"?`${t.name} : guide local, bonnes adresses et séjour`:`${t.name}: local guide, places and stays`,description:t.intro[locale],path:`/${locale}/destinations/${t.slug}`,locale});}
export default async function Page({params}:Props){
 const {locale,destination:t}=await resolve(params);const fr=locale==="fr";const list=placesInDestination(t),houses=villasInDestination(t),categories=categoriesInDestination(t);const path=`/${locale}/destinations/${t.slug}`;
 const today=parisIsoDay();
 const upcoming=(await getPublicEvents()).filter(e=>destinationForLocation(e.location)?.slug===t.slug && eventOverlaps(e,today,addDays(today,365))).sort((a,b)=>a.start.localeCompare(b.start)).slice(0,4);
 const nextSession=(e:typeof upcoming[number])=>firstSessionInWindow(e,{from:today,to:addDays(today,365)})!;
 const image=t.villageId?mediaForPlace(t.villageId):undefined;
 return <main><SiteHeader locale={locale} path={`/destinations/${t.slug}`}/><Breadcrumbs locale={locale} items={[{name:"LE GOLFE",path:`/${locale}`},{name:fr?"Communes":"Destinations",path:`/${locale}/destinations`},{name:t.name,path}]}/><CollectionSchema name={t.name} path={path} items={[...list.map(x=>({name:x.name,path:`/${locale}/place/${x.id}`})),...houses.map(x=>({name:x.name,path:`/villa/${x.id}`})),...upcoming.map(x=>({name:fr?x.titleFr||x.title:x.title,path:`/${locale}/event/${x.id}`}))]}/>
 <section className="lg-shell py-12"><p className="lg-kicker">LE GOLFE / {fr?"ADRESSES & SÉJOUR":"PLACES & STAYS"}</p><h1 className="mt-6 text-6xl font-black md:text-8xl">{t.villageId?(fr?`Autour de ${t.name}`:`Around ${t.name}`):t.name}</h1><p className="mt-8 max-w-3xl text-xl leading-8">{t.intro[locale]}</p>{t.villageId && <Link className="lg-btn mt-8" href={`/${locale}/place/${t.villageId}`}>{fr?`Lire la fiche de ${t.name}`:`Read the ${t.name} guide`} →</Link>}{image && <figure className="mt-10"><div className="lg-image aspect-[16/9]"><img src={image.src} alt={image.alt}/></div><figcaption className="lg-credit">{image.credit} · {image.license}</figcaption></figure>}
 <div className="mt-10 border-l-4 border-[var(--lg-blue)] pl-6"><h2 className="text-2xl font-black">{fr?"Composer votre journée":"Plan your day"}</h2><p className="mt-4 max-w-3xl leading-7 text-black/65">{t.plan[locale]}</p></div>
 {categories.length>0 && <nav aria-label={fr?"Sélections locales":"Local selections"} className="mt-10 flex flex-wrap gap-3">{categories.map(c=><Link key={c.slug} href={`${path}/${c.slug}`} className="lg-btn">{c[locale]} {fr?"à":"in"} {t.name} →</Link>)}</nav>}
 {placeCategories.filter(c=>list.some(x=>x.category===c.id && x.id!==t.villageId)).map(c=><section key={c.id} className="mt-16"><h2 className="text-3xl font-black">{fr?categoryFR[c.id].name:c.name} {fr?"à":"in"} {t.name}</h2><div className="mt-6 grid gap-x-8 md:grid-cols-2">{list.filter(x=>x.category===c.id && x.id!==t.villageId).map(x=><PlaceCard key={x.id} place={x} locale={locale}/>)}</div></section>)}
 {houses.length>0 && <section className="mt-16"><h2 className="text-3xl font-black">{fr?"Villas":"Villas"} {fr?"à":"in"} {t.name}</h2><div className="mt-6 grid gap-8 md:grid-cols-2">{houses.map(v=><VillaCard key={v.id} villa={v} locale={locale}/>)}</div><Link href={`/${locale}/stay`} className="lg-btn mt-6">{fr?"Comparer les villas du Golfe":"Compare villas around the Golfe"} →</Link></section>}
 {upcoming.length>0 && <section className="mt-16 border-t border-black pt-8"><h2 className="text-3xl font-black">{fr?"En cours et à venir":"Current and upcoming"} · {t.name}</h2><div className="mt-6 grid gap-6 md:grid-cols-2">{upcoming.map(e=><Link className="border-t py-5" key={e.id} href={`/${locale}/event/${e.id}`}><time className="text-xs font-bold" dateTime={nextSession(e).start}>{new Intl.DateTimeFormat(fr?"fr-FR":"en-GB",{dateStyle:"medium",timeZone:"Europe/Paris"}).format(new Date(nextSession(e).start+"T12:00:00Z"))}</time><h3 className="mt-3 text-xl font-black">{fr?e.titleFr||e.title:e.title} →</h3><p className="mt-3 text-sm leading-6 text-black/60">{fr?e.summaryFr:e.summary}</p></Link>)}</div></section>}
 <section className="mt-16 border-t border-black pt-8"><h2 className="text-2xl font-black">{fr?"Découvrir les autres communes":"Explore other destinations"}</h2><div className="mt-6 flex flex-wrap gap-3">{destinations.filter(x=>x.slug!==t.slug).map(x=><Link className="lg-btn" key={x.slug} href={`/${locale}/destinations/${x.slug}`}>{x.name}</Link>)}</div></section></section><SiteFooter locale={locale}/></main>;
}
