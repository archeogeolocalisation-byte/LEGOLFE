import PlaceTaxonomy from './PlaceTaxonomy';
import {fallbackSignature} from "../lib/placeEditorialSignatures";
import PlaceMapBlock from './PlaceMapBlock';
import {placeMapPoints} from '../data/placeMapPoints';
import {placeName} from '../lib/placeNames';
import Link from 'next/link';
import SiteHeader from './SiteHeader';
import PlaceMediaGallery from './PlaceMediaGallery';
import PlaceActions from './PlaceActions';
import {discoveryFeatures} from '../data/discoveryFeatures';
import {places} from '../data/places';
import {photosForPlace} from '../lib/curatedPlaceGallery';
import type {Locale} from '../lib/i18n';

export default function DiscoveryFeaturePlace({id,locale}:{id:string;locale:Locale}){
 const guide=discoveryFeatures[id][locale],place=places.find(p=>p.id===id)!;
 const signature=fallbackSignature(place.name,locale);
 return <main className="min-h-screen bg-white text-black">
  <SiteHeader light locale={locale} path={`/place/${id}`}/>
  <section className="lg-shell py-12 md:py-20">
   <Link className="text-xs font-bold text-black/55" href={`/${locale}/explore/do`}>← {locale==='fr'?'À faire':'Things to do'}</Link>
   <p className="lg-kicker mt-10 text-[var(--lg-blue)]">{place.location} · {locale==='fr'?'NATURE & PATRIMOINE':'NATURE & HERITAGE'}</p>
   <h1 className="lg-menu-title mt-6 max-w-5xl text-[var(--lg-blue)]">{guide.title}</h1>
   <PlaceTaxonomy place={place} locale={locale}/>
   <div className="mt-10 grid gap-8 border-t border-black pt-7 md:grid-cols-2"><h2 className="text-4xl font-black uppercase leading-[.94] tracking-[-.05em] md:text-6xl">{signature.subtitle}</h2><p className="max-w-xl text-lg font-bold leading-8 text-black/65">{guide.intro}</p></div>
  </section>
  <PlaceMediaGallery name={place.name} photos={photosForPlace(id)} locale={locale}/>
  <PlaceMapBlock name={placeName(place,locale)} location={place.location} points={placeMapPoints[id]??[]} locale={locale}/>
  <section className="lg-shell pb-16 md:pb-24"><div className="grid gap-10 md:grid-cols-3">{guide.sections.map(([title,body])=><article key={title} className="border-t border-black pt-6"><h2 className="text-2xl font-black leading-tight tracking-[-.025em]">{title}</h2><p className="mt-5 text-base leading-7 text-black/65">{body}</p></article>)}</div>
   {guide.sources && <aside className="mt-10 border-t border-black/20 pt-7">
    <h2 className="text-xl font-black">{locale==='fr'?'Sources et informations à jour':'Sources and current information'}</h2>
    {guide.verified && <p className="mt-3 text-sm text-black/65">{locale==='fr'?'Repères documentaires vérifiés le':'Reference information checked on'} <time dateTime={guide.verified}>{new Intl.DateTimeFormat(locale==='fr'?'fr-FR':'en-GB',{dateStyle:'long',timeZone:'UTC'}).format(new Date(guide.verified+'T12:00:00Z'))}</time>.</p>}
    <ul className="mt-4 space-y-3">{guide.sources.map(source=><li key={source.url}><a className="text-sm font-bold underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>
   </aside>}
   <div className="mt-14 border-t border-black pt-7"><h2 className="text-2xl font-black">{locale==='fr'?'Composer votre journée':'Plan the rest of your day'}</h2><div className="mt-5 flex flex-wrap gap-3">{guide.nearby.map(([target,label])=><Link className="lg-btn" key={target} href={`/${locale}/place/${target}`}>{label} →</Link>)}</div></div>
  </section>
  <PlaceActions place={place} locale={locale}/>
 </main>;
}
