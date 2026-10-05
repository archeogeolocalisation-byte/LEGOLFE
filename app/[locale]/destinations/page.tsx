import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import Breadcrumbs from "../../../components/Breadcrumbs";
import CollectionSchema from "../../../components/CollectionSchema";
import { destinations, placesInDestination, villasInDestination } from "../../../data/destinations";
import { isLocale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/seo";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata({title:locale==="fr"?"Villages et communes du Golfe de Saint-Tropez":"Villages and destinations around the Golfe de Saint-Tropez",description:locale==="fr"?"Choisissez votre commune : guides locaux, restaurants, plages, sorties et villas à Saint-Tropez, Ramatuelle, Gassin, Grimaud et autour du Golfe.":"Choose your destination: local guides, restaurants, beaches, outings and villas in Saint-Tropez, Ramatuelle, Gassin, Grimaud and around the Golfe.",path:`/${locale}/destinations`,locale});}
export default async function Page({params}:Props){
 const {locale}=await params;if(!isLocale(locale))notFound();const fr=locale==="fr";const path=`/${locale}/destinations`;
 return <main><SiteHeader locale={locale} path="/destinations"/><Breadcrumbs locale={locale} items={[{name:"LE GOLFE",path:`/${locale}`},{name:fr?"Communes":"Destinations",path}]}/><CollectionSchema name={fr?"Communes du Golfe":"Golfe destinations"} path={path} items={destinations.map(t=>({name:t.name,path:`${path}/${t.slug}`}))}/><section className="lg-shell py-12"><p className="lg-kicker">LE GOLFE / LOCAL</p><h1 className="mt-6 max-w-5xl text-6xl font-black md:text-8xl">{fr?"Le Golfe, commune par commune.":"The Golfe, one place at a time."}</h1><p className="mt-8 max-w-3xl text-lg leading-8">{fr?"Choisissez un point de départ pour votre séjour. Chaque guide rassemble les adresses de la commune, ses maisons et les événements disponibles dans le catalogue.":"Choose a starting point for your stay. Each guide brings together the commune’s places, houses and events available in the catalog."}</p><div className="mt-12 grid gap-x-8 md:grid-cols-2">{destinations.map(t=><Link key={t.slug} href={`${path}/${t.slug}`} className="border-t border-black py-8"><p className="lg-kicker">{placesInDestination(t).length} {fr?"adresses":"places"}{villasInDestination(t).length>0 && ` · ${villasInDestination(t).length} ${fr?"villas":"villas"}`}</p><h2 className="mt-3 text-4xl font-black">{t.name} ↗</h2><p className="mt-4 max-w-xl text-sm leading-6 text-black/60">{t.intro[locale]}</p></Link>)}</div></section><SiteFooter locale={locale}/></main>;
}
