import PlaceTaxonomy from './PlaceTaxonomy';
import PlaceMapBlock from './PlaceMapBlock';
import {placeMapPoints} from '../data/placeMapPoints';
import {placeName} from '../lib/placeNames';
import VillageSignature from './VillageSignature';
import Link from 'next/link';
import SiteHeader from './SiteHeader';
import PlaceActions from './PlaceActions';
import PlaceMediaGallery from './PlaceMediaGallery';
import {villageFeatures} from '../data/villageFeatures';
import {photosForPlace} from '../lib/curatedPlaceGallery';
import {places} from '../data/places';
import type {Locale} from '../lib/i18n';

export default function VillageFeaturePlace({id,locale}:{id:string;locale:Locale}){
 const f=villageFeatures[id],p=places.find(p=>p.id===id)!;const c=f[locale],fr=locale==='fr';
 const nearby=(f.nearby??[]).flatMap(target=>{const place=places.find(candidate=>candidate.id===target);return place?[place]:[];});
 return <main className="min-h-screen bg-white text-black"><SiteHeader locale={locale} path={`/place/${id}`}/>
  <section className="lg-shell pb-12 pt-12 md:pb-20 md:pt-24"><p className="lg-kicker">{fr?'VILLAGES & LIEUX':'VILLAGES & PLACES'} · LE GOLFE</p><h1 className="lg-menu-title mt-7 text-[var(--lg-blue)]">{f.name}</h1><PlaceTaxonomy place={p} locale={locale}/><VillageSignature id={id} locale={locale}/><p className="mt-7 text-xl font-black uppercase tracking-[-.03em] md:text-3xl">{c.sub}</p><p className="mt-8 max-w-3xl text-lg leading-8 text-black/60 md:text-xl">{c.intro}</p></section>
  <PlaceMediaGallery name={f.name} photos={photosForPlace(id)} locale={locale}/>
  <section className="lg-shell py-16 md:py-24"><p className="lg-kicker">{fr?"LE REGARD LE GOLFE":"LE GOLFE VIEW"}</p><blockquote className="lg-quote-box mt-7 max-w-5xl bg-[#edf4f6] text-4xl font-black uppercase leading-[1.04] tracking-[-.05em] text-[var(--lg-blue)] md:text-7xl">“{c.quote}”</blockquote><p className="mt-8 max-w-2xl text-lg leading-8 text-black/55">{c.body}</p></section>
  <section className="lg-shell pb-20 md:pb-28"><p className="lg-kicker">{fr?'UNE JOURNÉE ICI':'A DAY HERE'}</p><h2 className="mt-5 text-4xl font-black tracking-[-.05em] md:text-6xl">{fr?'Trouver son rythme.':'Find your pace.'}</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{c.moments.map(([label,title,body],i)=><article key={label} className="border-t border-black pt-6"><p className="lg-kicker">0{i+1} · {label}</p><h3 className="mt-5 text-3xl font-black leading-tight tracking-[-.04em]">{title}</h3><p className="mt-5 leading-7 text-black/55">{body}</p></article>)}</div></section>
  {c.visitSections&&<section className="lg-shell grid gap-10 pb-16 md:grid-cols-2 md:pb-24" aria-label={fr?'Préparer la découverte du village':'Plan your village visit'}>{c.visitSections.map(([title,body])=><article key={title} className="border-t border-black/15 pt-6"><h2 className="text-2xl font-black tracking-[-.04em] md:text-3xl">{title}</h2><p className="mt-5 leading-7 text-black/60">{body}</p></article>)}</section>}
  {nearby.length>0&&<section className="lg-shell pb-16 md:pb-24"><h2 className="lg-kicker text-[var(--lg-blue)]">{fr?'DÉCOUVRIR LES LIEUX ET LES BALADES':'EXPLORE PLACES AND WALKS'}</h2><div className="mt-6 flex flex-wrap gap-3">{nearby.map(place=><Link key={place.id} href={`/${locale}/place/${place.id}`} className="lg-btn">{placeName(place,locale)} ↗</Link>)}</div></section>}
  <section className="bg-black py-20 text-white md:py-28"><div className="lg-shell"><p className="lg-kicker text-white/55">{fr?'LE BON REPÈRE':'THE USEFUL DISTINCTION'}</p><h2 className="mt-7 max-w-5xl text-5xl font-black leading-[.95] tracking-[-.055em] md:text-[5rem]">{c.darkTitle}</h2><p className="mt-9 max-w-2xl text-lg leading-8 text-white/65">{c.darkBody}</p></div></section>
  <PlaceMapBlock name={placeName(p,locale)} location={p.location} points={placeMapPoints[id]??[]} locale={locale}/>
  <section className="lg-shell py-20 md:py-28"><p className="lg-kicker">{fr?'PRÉPARER LA VISITE':'PLAN YOUR VISIT'}</p><h2 className="mt-6 text-5xl font-black tracking-[-.055em] md:text-7xl">{fr?'Les repères avant de partir.':'Know before you go.'}</h2><div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">{c.facts.map(([label,text])=><div key={label} className="border-t border-black pt-5"><p className="lg-kicker">{label}</p><p className="mt-4 leading-7 text-black/60">{text}</p></div>)}</div><div className="mt-14 grid gap-10 md:grid-cols-2">{[{title:fr?'LE GOLFE LE CHOISIT POUR':'LE GOLFE WOULD PICK IT FOR',items:c.best},{title:fr?'À SAVOIR AVANT DE CHOISIR':'KNOW BEFORE YOU CHOOSE',items:c.less}].map(({title,items})=><div key={title}><h3 className="lg-kicker">{title}</h3><ul className="mt-5 space-y-3">{items.map(item=><li key={item} className="border-b border-black/10 pb-3 leading-7 text-black/60">{item}</li>)}</ul></div>)}</div>
   <div className="mt-12 flex flex-wrap gap-3"><Link href={`/${locale}/ask?place=${encodeURIComponent(f.name)}`} className="lg-btn">{fr?'Demander à LE GOLFE':'Ask LE GOLFE'} →</Link><a href={f.source} target="_blank" rel="noreferrer" className="lg-btn">{fr?'Office de tourisme':'Tourist office'} ↗</a></div><p className="mt-6 text-xs leading-5 text-black/45">{fr?'Informations documentaires : office de tourisme du Golfe. Conseils éditoriaux : LE GOLFE. Photos et licences : crédits sous chaque image.':'Reference information: Golfe tourist office. Editorial advice: LE GOLFE. Photography and licences: credits beneath each image.'}</p>
   {f.sources&&<div className="mt-6 border-t border-black/10 pt-5"><p className="text-xs text-black/50">{fr?'Repères pratiques vérifiés le ':'Practical information checked on '}<time dateTime={f.verified}>{f.verified?new Intl.DateTimeFormat(fr?'fr-FR':'en-GB',{dateStyle:'long',timeZone:'UTC'}).format(new Date(`${f.verified}T12:00:00Z`)):null}</time>.</p><ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">{f.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source.label} ↗</a></li>)}</ul></div>}
  </section><PlaceActions place={p} locale={locale}/>
 </main>;
}
