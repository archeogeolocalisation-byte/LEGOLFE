import Link from 'next/link';
import SiteHeader from './SiteHeader';
import PlaceMediaGallery from './PlaceMediaGallery';
import PlaceActions from './PlaceActions';
import CommunitySection from './CommunitySection';
import {discoveryFeatures} from '../data/discoveryFeatures';
import {places} from '../data/places';
import {photosForPlace} from '../lib/curatedPlaceGallery';
import type {Locale} from '../lib/i18n';

export default function DiscoveryFeaturePlace({id,locale}:{id:string;locale:Locale}){
 const guide=discoveryFeatures[id][locale],place=places.find(p=>p.id===id)!;
 return <main className="min-h-screen bg-white text-black">
  <SiteHeader light locale={locale} path={`/place/${id}`}/>
  <section className="lg-shell py-12 md:py-20">
   <Link className="text-xs font-bold text-black/55" href={`/${locale}/explore/do`}>← {locale==='fr'?'À faire':'Things to do'}</Link>
   <p className="lg-kicker mt-10 text-[#0B4F6C]">{place.location} · {locale==='fr'?'NATURE & PATRIMOINE':'NATURE & HERITAGE'}</p>
   <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-6xl md:text-7xl">{guide.title}</h1>
   <p className="mt-8 max-w-3xl text-lg leading-8 text-black/65">{guide.intro}</p>
  </section>
  <PlaceMediaGallery name={place.name} photos={photosForPlace(id)} locale={locale}/>
  <section className="lg-shell pb-16 md:pb-24"><div className="grid gap-10 md:grid-cols-3">{guide.sections.map(([title,body])=><article key={title} className="border-t border-black pt-6"><h2 className="text-2xl font-black leading-tight tracking-[-.025em]">{title}</h2><p className="mt-5 text-base leading-7 text-black/65">{body}</p></article>)}</div>
   {id==='cap-taillat'&&<a className="mt-8 inline-block border-b border-black text-sm font-bold" href="https://www.ramatuelle-tourisme.com/fr/loisirs/loisirs-sportifs/ramatuelle/plage-de-l-escalet-isthme-du-cap-taillat-sentier-du-littoral-ramatuelle-4757939/" target="_blank" rel="noreferrer">{locale==='fr'?'Consulter l’itinéraire officiel':'View the official route'} ↗</a>}
   <div className="mt-14 border-t border-black pt-7"><h2 className="text-2xl font-black">{locale==='fr'?'Composer votre journée':'Plan the rest of your day'}</h2><div className="mt-5 flex flex-wrap gap-3">{guide.nearby.map(([target,label])=><Link className="lg-btn" key={target} href={`/${locale}/place/${target}`}>{label} →</Link>)}</div></div>
  </section>
  <PlaceActions place={place} locale={locale}/><CommunitySection placeId={id} locale={locale}/>
 </main>;
}
