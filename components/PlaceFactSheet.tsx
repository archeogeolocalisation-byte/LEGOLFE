import {editorialSignatures,fallbackSignature} from "../lib/placeEditorialSignatures";
import {newExperienceMedia} from "../data/newExperienceMedia";
import {newExperienceFacts} from "../data/newExperienceFacts";
import PlaceMapBlock from './PlaceMapBlock';
import {placeMapPoints} from '../data/placeMapPoints';
import {placeName} from '../lib/placeNames';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from './SiteHeader';
import PlaceActions from './PlaceActions';
import { places } from '../data/places';
import { placeFacts } from '../data/placeFacts';
import { placeFactsMedia } from '../data/placeFactsMedia';
import type { Locale } from '../lib/i18n';

export default function PlaceFactSheet({id,locale}:{id:string;locale:Locale}) {
 const sheet=placeFacts[id],copy=sheet.copy[locale],photo=placeFactsMedia[id],experiencePhotos=newExperienceMedia[id]||[],experiencePhoto=experiencePhotos[0],place=places.find(p=>p.id===id)!;
 const fr=locale==='fr',signature=editorialSignatures[id]?.[locale]??fallbackSignature(place.name,locale);
 const chapters=copy.sections;
 return <main className="min-h-screen bg-white text-black">
  <SiteHeader light locale={locale} path={`/place/${id}`}/>
  <article className="lg-shell py-10 md:py-16">
   <Link className="text-sm font-bold underline underline-offset-4" href={`/${locale}/explore/${place.category}`}>← {fr?'Explorer les adresses':'Explore places'}</Link>
   <p className="lg-kicker mt-9 text-[#0B4F6C]">{place.location} · {fr?'LE GOLFE / DÉCOUVRIR':'LE GOLFE / DISCOVER'}</p>
   <h1 className="mt-6 max-w-full break-words text-[clamp(3.3rem,10.5vw,9.5rem)] font-black uppercase leading-[.83] tracking-[-.07em] text-[#0B4F6C] [overflow-wrap:anywhere]">{place.name}</h1>
   <div className="mt-10 grid gap-8 border-t border-black pt-7 md:grid-cols-2">
    <h2 className="max-w-3xl text-4xl font-black uppercase leading-[.94] tracking-[-.055em] md:text-6xl">{signature.subtitle}</h2>
    <p className="max-w-xl text-lg font-bold leading-8 text-black/65">{copy.intro}</p>
   </div>
   <figure className="mt-9 max-w-5xl">
    {photo ? <Image src={photo.src} alt={(photo||experiencePhoto)?.caption[locale]} width={photo.width} height={photo.height} sizes="(max-width: 768px) 100vw, 1000px" preload className="aspect-[3/2] w-full object-cover"/> : experiencePhoto ? <img src={experiencePhoto.src} alt={experiencePhoto.alt} className="aspect-[3/2] w-full object-cover" loading="eager"/> : null}
    <figcaption className="mt-3 text-xs leading-6 text-black/70">
     <span className="block font-bold">{(photo||experiencePhoto)?.caption[locale]}</span>
     <a className="underline" href={(photo||experiencePhoto)?.source} target="_blank" rel="noreferrer">{(photo||experiencePhoto)?.credit}</a> · <a className="underline" href={(photo||experiencePhoto)?.licenseUrl} target="_blank" rel="noreferrer">{(photo||experiencePhoto)?.license}</a> · {photo ? (fr?'Redimensionnement, conversion WebP et recadrage d’affichage ; image adaptée sous la même licence.':'Resized, converted to WebP and display-cropped; adapted image under the same licence.') : (fr?'Image Wikimedia Commons affichée avec recadrage CSS, licence et source créditées.':'Wikimedia Commons image shown with CSS cropping, source and licence credited.')}
    </figcaption>
   </figure>
   {experiencePhotos.length>1&&<div className="mt-5 grid gap-5 md:grid-cols-2">{experiencePhotos.slice(1).map(image=><figure key={image.source}><img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" loading="lazy"/><figcaption className="mt-2 text-xs leading-5 text-black/60">{image.caption[locale]} · <a href={image.source} target="_blank" rel="noreferrer" className="underline">{image.credit}</a> · <a href={image.licenseUrl} target="_blank" rel="noreferrer" className="underline">{image.license}</a></figcaption></figure>)}</div>}

  </article>
  <section className="lg-shell py-16 md:py-24">
   <div className="lg-quote-box grid gap-10 bg-[#edf4f6] md:grid-cols-[.35fr_1.65fr]">
    <div><p className="lg-kicker text-[#0B4F6C]">{fr?'LE REGARD LE GOLFE':'THE LE GOLFE VIEW'}</p><div className="lg-blue-rule mt-5"/></div>
    <div><p className="max-w-4xl text-4xl font-black uppercase leading-[.95] tracking-[-.055em] text-[#0B4F6C] md:text-7xl">“{signature.quote}”</p><p className="mt-8 max-w-2xl text-lg leading-8 text-black/65">{copy.intro}</p></div>
   </div>
  </section>
  <section className="border-t border-black">
   <div className="lg-shell py-20"><p className="lg-kicker text-[#0B4F6C]">{fr?'LE BON RYTHME':'FIND YOUR RHYTHM'}</p>
    <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[.9] tracking-[-.055em] md:text-8xl">{signature.rhythm}</h2>
    <div className="mt-14 grid border-t border-black md:grid-cols-3">{chapters.slice(0,3).map(([title,body],i)=><article key={title} className="border-b border-black/25 py-8 md:border-b-0 md:border-r md:px-8 first:md:pl-0 last:md:border-r-0"><p className="lg-kicker text-[#0B4F6C]">0{i+1}</p><h3 className="mt-5 text-2xl font-black leading-tight tracking-[-.04em] md:text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-black/65">{body}</p></article>)}</div>
   </div>
  </section>
  <section className="lg-shell pb-20 md:pb-24"><div className="grid gap-10 border-t border-black pt-10 md:grid-cols-[.7fr_1.3fr]"><p className="lg-kicker text-[#0B4F6C]">{fr?'POUR ALLER PLUS LOIN':'BEYOND THE FIRST LOOK'}</p><div><h2 className="text-4xl font-black uppercase leading-[.92] tracking-[-.055em] md:text-7xl">{chapters[3]?.[0]??signature.close}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-black/65">{chapters[3]?.[1]??copy.intro}</p></div></div></section>
  <section className="bg-[#0B4F6C] text-white"><div className="lg-shell py-20 md:py-28"><p className="lg-kicker text-white/75">{fr?'LE BON CONSEIL':'THE USEFUL DISTINCTION'}</p><div className="mt-5 h-1 w-16 bg-[#a5def0]"/><div className="mt-9 grid gap-12 md:grid-cols-[1.15fr_.85fr]"><h2 className="text-5xl font-black uppercase leading-[.9] tracking-[-.055em] md:text-8xl">{signature.dark}</h2><p className="max-w-xl text-lg leading-8 text-white/85">{chapters[1]?.[1]??copy.intro}</p></div></div></section>
  <section className="lg-shell py-20 md:py-24"><p className="lg-kicker text-[#0B4F6C]">{fr?'PRÉPARER LA VISITE':'PLAN YOUR VISIT'}</p>
   <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[.92] tracking-[-.055em] md:text-8xl">{signature.close}</h2>
   <p className="mt-7 max-w-2xl text-lg leading-8 text-black/65">{copy.description}</p>
   <dl className="mt-14 grid gap-7 border-y border-black py-8 sm:grid-cols-2 lg:grid-cols-4">{copy.facts.map(([label,value])=><div key={label}><dt className="lg-kicker text-[#0B4F6C]">{label}</dt><dd className="mt-3 text-sm font-semibold leading-7 text-black/70">{value}</dd></div>)}</dl>
   {newExperienceFacts[id]&&<aside className="mt-8 border-y border-black/20 py-6"><p className="lg-kicker text-[#0B4F6C]">{fr?"ADRESSE DE VISITE":"VISITOR ADDRESS"}</p><p className="mt-3 text-lg font-bold">{newExperienceFacts[id].address}</p><a className="lg-btn mt-4" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newExperienceFacts[id].address)}`}>{fr?"Itinéraire vers cette adresse":"Directions to this address"} ↗</a><p className="mt-3 text-xs text-black/55">{fr?"Adresse issue des informations du lieu ; vérifiez le dernier accès avant de partir.":"Venue-supplied address; check final access before travelling."}</p></aside>}
   <PlaceMapBlock name={placeName(place,locale)} location={place.location} points={placeMapPoints[id]??[]} locale={locale}/>

   <section id="questions" className="mt-12 scroll-mt-24"><h2 className="text-2xl font-black">{fr?'Questions fréquentes':'Common questions'}</h2><div className="mt-5">{copy.questions.map(([question,answer])=><details key={question} className="border-t border-black/20 py-5"><summary className="cursor-pointer font-bold leading-7">{question}</summary><p className="mt-3 max-w-3xl leading-7 text-black/75">{answer}</p></details>)}</div></section>
   <aside className="mt-10 border-t border-black/20 pt-7"><h2 className="text-xl font-black">{fr?'Sources et informations à jour':'Sources and current information'}</h2><p className="mt-3 text-sm leading-6 text-black/75">{fr?'Repères documentaires vérifiés le':'Reference information checked on'} <time dateTime={sheet.verified}>{new Intl.DateTimeFormat(fr?'fr-FR':'en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(sheet.verified+'T12:00:00Z'))}</time>. {fr?'Programme proposé par LE GOLFE ; vérifiez les horaires, accès et tarifs pour votre date auprès des sources officielles.':'Programme suggested by LE GOLFE; check opening times, access and prices for your date with the official sources.'}</p><ul className="mt-4 space-y-2">{sheet.sources.map(source=><li key={source.url}><a className="text-sm font-bold underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></aside>
   <section className="mt-10 border-t border-black/20 pt-7"><h2 className="text-2xl font-black">{fr?'Poursuivre la découverte':'Explore further'}</h2><div className="mt-5 flex flex-wrap gap-3">{sheet.nearby.map(target=><Link className="lg-btn" key={target} href={`/${locale}/place/${target}`}>{places.find(p=>p.id===target)!.name} →</Link>)}</div></section>
  </section>
  <PlaceActions place={place} locale={locale}/>
 </main>;
}
