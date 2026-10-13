import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from './SiteHeader';
import PlaceActions from './PlaceActions';
import { places } from '../data/places';
import { placeFacts } from '../data/placeFacts';
import { placeFactsMedia } from '../data/placeFactsMedia';
import type { Locale } from '../lib/i18n';

export default function PlaceFactSheet({id,locale}:{id:string;locale:Locale}) {
 const sheet=placeFacts[id],copy=sheet.copy[locale],photo=placeFactsMedia[id],place=places.find(p=>p.id===id)!;
 const fr=locale==='fr';
 return <main className="min-h-screen bg-white text-black">
  <SiteHeader light locale={locale} path={`/place/${id}`}/>
  <article className="lg-shell py-10 md:py-16">
   <Link className="text-sm font-bold underline underline-offset-4" href={`/${locale}/explore/places`}>← {fr?'Villages et lieux':'Villages and places'}</Link>
   <p className="lg-kicker mt-9 text-[#0B4F6C]">{place.location} · {fr?'FICHE DE VISITE':'VISIT GUIDE'}</p>
   <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-[-.04em] sm:text-5xl md:text-6xl">{copy.title}</h1>
   <p className="mt-6 max-w-3xl text-lg leading-8 text-black/75">{copy.intro}</p>
   <figure className="mt-9 max-w-5xl">
    <Image src={photo.src} alt={photo.caption[locale]} width={photo.width} height={photo.height} sizes="(max-width: 768px) 100vw, 1000px" preload className="aspect-[3/2] w-full object-cover"/>
    <figcaption className="mt-3 text-xs leading-6 text-black/70">
     <span className="block font-bold">{photo.caption[locale]}</span>
     <a className="underline" href={photo.source} target="_blank" rel="noreferrer">{photo.credit}</a> · <a className="underline" href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a> · {fr?'Redimensionnement, conversion WebP et recadrage d’affichage ; image adaptée sous la même licence.':'Resized, converted to WebP and display-cropped; adapted image under the same licence.'}
    </figcaption>
   </figure>
   <dl className="mt-9 grid gap-6 border-y border-black/20 py-7 sm:grid-cols-2 lg:grid-cols-4">{copy.facts.map(([label,value])=><div key={label}><dt className="text-xs font-black uppercase tracking-wide text-[#0B4F6C]">{label}</dt><dd className="mt-2 text-sm font-semibold leading-6">{value}</dd></div>)}</dl>
   <nav aria-label={fr?'Dans cette fiche':'On this page'} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">{copy.sections.map(([title],i)=><a className="underline underline-offset-4" key={title} href={`#visit-${i+1}`}>{title}</a>)}<a className="underline underline-offset-4" href="#questions">{fr?'Questions fréquentes':'Common questions'}</a></nav>
   <div className="mt-10 grid gap-9 md:grid-cols-2">{copy.sections.map(([title,body],i)=><section id={`visit-${i+1}`} key={title} className="scroll-mt-24 border-t border-black/20 pt-6"><h2 className="text-2xl font-black leading-tight">{title}</h2><p className="mt-4 max-w-2xl text-base leading-8 text-black/75">{body}</p></section>)}</div>
   <section id="questions" className="mt-12 scroll-mt-24"><h2 className="text-2xl font-black">{fr?'Questions fréquentes':'Common questions'}</h2><div className="mt-5">{copy.questions.map(([question,answer])=><details key={question} className="border-t border-black/20 py-5"><summary className="cursor-pointer font-bold leading-7">{question}</summary><p className="mt-3 max-w-3xl leading-7 text-black/75">{answer}</p></details>)}</div></section>
   <aside className="mt-10 border-t border-black/20 pt-7"><h2 className="text-xl font-black">{fr?'Sources et informations à jour':'Sources and current information'}</h2><p className="mt-3 text-sm leading-6 text-black/75">{fr?'Repères documentaires vérifiés le':'Reference information checked on'} <time dateTime={sheet.verified}>{fr?'13 octobre 2026':'13 October 2026'}</time>. {fr?'Programme proposé par LE GOLFE ; vérifiez les horaires, accès et tarifs pour votre date auprès des sources officielles.':'Programme suggested by LE GOLFE; check opening times, access and prices for your date with the official sources.'}</p><ul className="mt-4 space-y-2">{sheet.sources.map(source=><li key={source.url}><a className="text-sm font-bold underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></aside>
   <section className="mt-10 border-t border-black/20 pt-7"><h2 className="text-2xl font-black">{fr?'Poursuivre la découverte':'Explore further'}</h2><div className="mt-5 flex flex-wrap gap-3">{sheet.nearby.map(target=><Link className="lg-btn" key={target} href={`/${locale}/place/${target}`}>{places.find(p=>p.id===target)!.name} →</Link>)}</div></section>
  </article>
  <PlaceActions place={place} locale={locale}/>
 </main>;
}
