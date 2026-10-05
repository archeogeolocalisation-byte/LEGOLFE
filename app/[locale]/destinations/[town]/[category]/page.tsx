import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../../components/SiteHeader";
import SiteFooter from "../../../../../components/SiteFooter";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import CollectionSchema from "../../../../../components/CollectionSchema";
import PlaceCard from "../../../../../components/PlaceCard";
import { getDestination, categoriesInDestination, placesInDestination, localCategoryIntro } from "../../../../../data/destinations";
import { isLocale } from "../../../../../lib/i18n";
import { pageMetadata } from "../../../../../lib/seo";
type Props={params:Promise<{locale:string;town:string;category:string}>};
async function resolve(params:Props["params"]){const {locale,town,category}=await params;if(!isLocale(locale))notFound();const t=getDestination(town);if(!t)notFound();const c=categoriesInDestination(t).find(x=>x.slug===category);if(!c)notFound();const path=`/${locale}/destinations/${town}/${category}`;const title=`${c[locale]} ${locale==="fr"?"à":"in"} ${t.name}`;return {locale,t,c,path,title,list:placesInDestination(t).filter(x=>x.category===c.id)};}
export async function generateMetadata({params}:Props){const {locale,t,c,path,title}=await resolve(params);return pageMetadata({title,description:localCategoryIntro(t,c,locale),path,locale});}
export default async function Page({params}:Props){const {locale,t,c,path,title,list}=await resolve(params);const fr=locale==="fr";return <main><SiteHeader locale={locale} path={`/destinations/${t.slug}/${c.slug}`}/><Breadcrumbs locale={locale} items={[{name:"LE GOLFE",path:`/${locale}`},{name:fr?"Communes":"Destinations",path:`/${locale}/destinations`},{name:t.name,path:`/${locale}/destinations/${t.slug}`},{name:c[locale],path}]}/><CollectionSchema name={title} path={path} items={list.map(x=>({name:x.name,path:`/${locale}/place/${x.id}`}))}/><section className="lg-shell py-12"><p className="lg-kicker">LE GOLFE / {t.name}</p><h1 className="mt-6 max-w-5xl text-5xl font-black md:text-7xl">{title}</h1><p className="mt-8 max-w-3xl text-lg leading-8">{localCategoryIntro(t,c,locale)}</p><div className="mt-12 grid gap-x-8 md:grid-cols-2">{list.map(x=><PlaceCard key={x.id} place={x} locale={locale}/>)}</div><Link className="lg-btn mt-10" href={`/${locale}/destinations/${t.slug}`}>{fr?"Tout le guide de":"All guides for"} {t.name} →</Link><div className="mt-8 flex flex-wrap gap-3">{categoriesInDestination(t).filter(x=>x.slug!==c.slug).map(x=><Link className="lg-btn" key={x.slug} href={`/${locale}/destinations/${t.slug}/${x.slug}`}>{x[locale]}</Link>)}</div></section><SiteFooter locale={locale}/></main>;}
