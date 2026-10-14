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
   <p className="lg-kicker mt-10 text-[#0B4F6C]">{place.location} · {locale==='fr'?'NATURE & PATRIMOINE':'NATURE & HERITAGE'}</p>
   <h1 className="lg-menu-title mt-6 max-w-5xl text-[#0B4F6C]">{guide.title}</h1>
   <div className="mt-10 grid gap-8 border-t border-black pt-7 md:grid-cols-2"><h2 className="text-4xl font-black uppercase leading-[.94] tracking-[-.05em] md:text-6xl">{signature.subtitle}</h2><p className="max-w-xl text-lg font-bold leading-8 text-black/65">{guide.intro}</p></div>
  </section>
  <PlaceMediaGallery name={place.name} photos={photosForPlace(id)} locale={locale}/>
  <section className="lg-shell py-16 md:py-24"><div className="lg-quote-box grid gap-8 bg-[#edf4f6] md:grid-cols-[.35fr_1.65fr]"><div><p className="lg-kicker text-[#0B4F6C]">{locale==='fr'?'LE REGARD LE GOLFE':'THE LE GOLFE VIEW'}</p><div className="lg-blue-rule mt-5"/></div><div><p className="text-4xl font-black uppercase leading-[.94] tracking-[-.05em] text-[#0B4F6C] md:text-7xl">“{guide.sections[0]?.[0]??signature.quote}”</p><p className="mt-7 text-lg leading-8 text-black/65">{guide.sections[0]?.[1]??guide.intro}</p></div></div></section>
  <PlaceMapBlock name={placeName(place,locale)} location={place.location} points={placeMapPoints[id]??[]} locale={locale}/>
  <section className="lg-shell pb-16 md:pb-24"><div className="grid gap-10 md:grid-cols-3">{guide.sections.map(([title,body])=><article key={title} className="border-t border-black pt-6"><h2 className="text-2xl font-black leading-tight tracking-[-.025em]">{title}</h2><p className="mt-5 text-base leading-7 text-black/65">{body}</p></article>)}</div>
   {id==='cap-taillat'&&<a className="mt-8 inline-block border-b border-black text-sm font-bold" href="https://www.ramatuelle-tourisme.com/fr/loisirs/loisirs-sportifs/ramatuelle/plage-de-l-escalet-isthme-du-cap-taillat-sentier-du-littoral-ramatuelle-4757939/" target="_blank" rel="noreferrer">{locale==='fr'?'Consulter l’itinéraire officiel':'View the official route'} ↗</a>}
   <div className="mt-14 border-t border-black pt-7"><h2 className="text-2xl font-black">{locale==='fr'?'Composer votre journée':'Plan the rest of your day'}</h2><div className="mt-5 flex flex-wrap gap-3">{guide.nearby.map(([target,label])=><Link className="lg-btn" key={target} href={`/${locale}/place/${target}`}>{label} →</Link>)}</div></div>
  </section>
  <PlaceActions place={place} locale={locale}/>
 </main>;
}
