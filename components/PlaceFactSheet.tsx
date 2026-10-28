import HikingRoute from './HikingRoute';
import {hikingRouteForGuide} from '../data/hikingRoutes';
import {suppliedPlaceMedia} from '../data/suppliedPlaceMedia';
import {localPlacePhoto} from '../lib/placeImage';
import {newExperienceMedia} from '../data/newExperienceMedia';
import PlaceTaxonomy from './PlaceTaxonomy';
import {editorialSignatures,fallbackSignature} from "../lib/placeEditorialSignatures";
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
 const sheet=placeFacts[id],copy=sheet.copy[locale],suppliedPhotos=suppliedPlaceMedia[id],photo=suppliedPhotos?undefined:placeFactsMedia[id],experiencePhotos=(suppliedPhotos??newExperienceMedia[id]??[]).map(localPlacePhoto),experiencePhoto=experiencePhotos[0],place=places.find(p=>p.id===id)!;
 const association=place.tags.includes('association');
 const fr=locale==='fr',signature=editorialSignatures[id]?.[locale]??fallbackSignature(place.name,locale);
 const chapters=copy.sections;
 const visitAddress=newExperienceFacts[id]?.address??copy.facts.find(([label])=>/^(adresse|address)$/i.test(label.trim()))?.[1];
 return <main className="min-h-screen bg-white text-black">
  <SiteHeader light locale={locale} path={`/place/${id}`}/>
  <article className="lg-shell py-10 md:py-16">
   <Link className="text-sm font-bold underline underline-offset-4" href={association?`/${locale}/explore?filter=associations`:`/${locale}/explore/${place.category}`}>← {fr?'Explorer les adresses':'Explore places'}</Link>
   <p className="lg-kicker mt-9 text-[var(--lg-blue)]">{place.location} · {fr?'LE GOLFE / DÉCOUVRIR':'LE GOLFE / DISCOVER'}</p>
   <h1 className="lg-menu-title mt-6 max-w-full text-[var(--lg-blue)]">{place.name}</h1>
   <PlaceTaxonomy place={place} locale={locale}/>
   <div className="mt-10 grid gap-8 border-t border-black pt-7 md:grid-cols-2">
    <h2 className="max-w-3xl text-4xl font-black uppercase leading-[.94] tracking-[-.055em] md:text-6xl">{signature.subtitle}</h2>
    <p className="max-w-xl text-lg font-bold leading-8 text-black/65">{copy.intro}</p>
   </div>
   <nav aria-label={fr?'Dans cette fiche':'On this page'} className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold text-[var(--lg-blue)]">{chapters.map(([title],i)=><a className="underline underline-offset-4" key={title} href={`#visit-${i+1}`}>{title}</a>)}<a href="#questions" className="underline underline-offset-4">{fr?'Questions fréquentes':'Common questions'}</a></nav>
   <figure className="mx-auto mt-9 max-w-5xl">
    {photo ? <Image src={photo.src} alt={(photo||experiencePhoto)?.caption[locale]} width={photo.width} height={photo.height} sizes="(max-width: 768px) 100vw, 1000px" preload className="aspect-[3/2] w-full object-cover"/> : experiencePhoto ? <img src={experiencePhoto.src} alt={experiencePhoto.alt} className="aspect-[3/2] w-full object-cover" loading="eager"/> : null}
    <figcaption className="mt-3 text-xs leading-6 text-black/70">
     {experiencePhoto?.contextual&&<span className="mb-2 inline-block bg-[#edf4f6] px-2 py-1 text-[10px] font-black uppercase text-[var(--lg-blue)]">{experiencePhoto.illustrative?(fr?'Photo d’illustration':'Illustrative photograph'):(fr?'Photo du secteur':'Area photograph')}</span>}
     <span className="block font-bold">{(photo||experiencePhoto)?.caption[locale]}</span>
     {((photo||experiencePhoto)?.credit||(photo||experiencePhoto)?.license)&&<><a className="underline" href={(photo||experiencePhoto)?.source} target="_blank" rel="noreferrer">{(photo||experiencePhoto)?.credit}</a> · <a className="underline" href={(photo||experiencePhoto)?.licenseUrl} target="_blank" rel="noreferrer">{(photo||experiencePhoto)?.license}</a> · </>}{suppliedPhotos?(fr?'Photo fournie · recadrage d’affichage':'Supplied photograph · display crop'):photo||experiencePhoto?.src.startsWith('/media/') ? (fr?'Redimensionnement, conversion WebP et recadrage d’affichage ; image adaptée sous la même licence.':'Resized, converted to WebP and display-cropped; adapted image under the same licence.') : (fr?'Image Wikimedia Commons affichée avec recadrage CSS, licence et source créditées.':'Wikimedia Commons image shown with CSS cropping, source and licence credited.')}
    </figcaption>
   </figure>
   {experiencePhotos.length>1&&<div className="mt-5 grid gap-5 md:grid-cols-2">{experiencePhotos.slice(1).map(image=><figure key={image.src}><img src={image.src} alt={image.alt} className={suppliedPhotos?"h-auto w-full":"aspect-[4/3] w-full object-cover"} loading="lazy"/><figcaption className="mt-2 text-xs leading-5 text-black/60">{image.caption[locale]}{(image.credit||image.license)&&<> · <a href={image.source} target="_blank" rel="noreferrer" className="underline">{image.credit}</a> · <a href={image.licenseUrl} target="_blank" rel="noreferrer" className="underline">{image.license}</a></>}</figcaption></figure>)}</div>}

  </article>
  {id==='fort-freinet'&&<HikingRoute route={hikingRouteForGuide('randonnee-roches-blanches-fort-freinet')!} locale={locale}/>}
  <section className="lg-shell py-16 md:py-24">
   <div className="lg-quote-box grid gap-10 bg-[#edf4f6] md:grid-cols-[.35fr_1.65fr]">
    <div><p className="lg-kicker text-[var(--lg-blue)]">{fr?'LE REGARD LE GOLFE':'THE LE GOLFE VIEW'}</p><div className="lg-blue-rule mt-5"/></div>
    <div><p className="max-w-4xl text-4xl font-black uppercase leading-[.95] tracking-[-.055em] text-[var(--lg-blue)] md:text-7xl">“{signature.quote}”</p></div>
   </div>
  </section>
  <section className="border-t border-black">
   <div className="lg-shell py-20"><p className="lg-kicker text-[var(--lg-blue)]">{fr?'LE BON RYTHME':'FIND YOUR RHYTHM'}</p>
    <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[.9] tracking-[-.055em] md:text-[5rem]">{signature.rhythm}</h2>
    <div className="mt-14 grid border-t border-black md:grid-cols-3">{chapters.slice(0,3).map(([title,body],i)=><article id={`visit-${i+1}`} key={title} className="scroll-mt-24 border-b border-black/25 py-8 md:border-b-0 md:border-r md:px-8 first:md:pl-0 last:md:border-r-0"><p className="lg-kicker text-[var(--lg-blue)]">0{i+1}</p><h3 className="mt-5 text-2xl font-black leading-tight tracking-[-.04em] md:text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-black/65">{body}</p></article>)}</div>
   </div>
  </section>
  <section id="visit-4" className="lg-shell scroll-mt-24 pb-20 md:pb-24"><div className="grid gap-10 border-t border-black pt-10 md:grid-cols-[.7fr_1.3fr]"><p className="lg-kicker text-[var(--lg-blue)]">{fr?'POUR ALLER PLUS LOIN':'BEYOND THE FIRST LOOK'}</p><div><h2 className="text-4xl font-black uppercase leading-[.92] tracking-[-.055em] md:text-7xl">{chapters[3]?.[0]??signature.close}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-black/65">{chapters[3]?.[1]}</p></div></div></section>
  <section className="bg-[var(--lg-blue)] text-white"><div className="lg-shell py-12 md:py-16"><p className="lg-kicker text-white/75">{fr?'LE BON CONSEIL':'THE USEFUL DISTINCTION'}</p><div className="mt-5 h-1 w-16 bg-[#a5def0]"/><h2 className="mt-8 max-w-5xl text-5xl font-black uppercase leading-[.9] tracking-[-.055em] md:text-[5rem]">{signature.dark}</h2></div></section>
  <section className="lg-shell py-20 md:py-24"><p className="lg-kicker text-[var(--lg-blue)]">{association?(fr?'ENTRER EN CONTACT':'GET IN TOUCH'):(fr?'PRÉPARER LA VISITE':'PLAN YOUR VISIT')}</p>
   <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[.92] tracking-[-.055em] md:text-[5rem]">{signature.close}</h2>
   <dl className="mt-14 grid gap-7 border-y border-black py-8 sm:grid-cols-2 lg:grid-cols-4">{copy.facts.filter(([label])=>!(visitAddress&&/^(adresse|address)$/i.test(label.trim()))).map(([label,value])=><div key={label}><dt className="lg-kicker text-[var(--lg-blue)]">{label}</dt><dd className="mt-3 text-sm font-semibold leading-7 text-black/70">{value}</dd></div>)}</dl>

   {id!=='fort-freinet'&&<PlaceMapBlock name={placeName(place,locale)} location={place.location} points={placeMapPoints[id]??[]} address={visitAddress} locale={locale}/>}

   <section id="questions" className="mt-12 scroll-mt-24"><h2 className="text-2xl font-black">{fr?'Questions fréquentes':'Common questions'}</h2><div className="mt-5">{copy.questions.map(([question,answer])=><details key={question} className="border-t border-black/20 py-5"><summary className="cursor-pointer font-bold leading-7">{question}</summary><p className="mt-3 max-w-3xl leading-7 text-black/75">{answer}</p></details>)}</div></section>
   <aside className="mt-10 border-t border-black/20 pt-7"><h2 className="text-xl font-black">{fr?'Sources et informations à jour':'Sources and current information'}</h2><p className="mt-3 text-sm leading-6 text-black/75">{fr?'Repères documentaires vérifiés le':'Reference information checked on'} <time dateTime={sheet.verified}>{new Intl.DateTimeFormat(fr?'fr-FR':'en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(sheet.verified+'T12:00:00Z'))}</time>. {association?(fr?'Présentation éditoriale LE GOLFE ; contactez l’association pour les conditions de participation et ses actualités.':'LE GOLFE editorial profile; contact the association for current news and participation arrangements.'):(fr?'Programme proposé par LE GOLFE ; vérifiez les horaires, accès et tarifs pour votre date auprès des sources officielles.':'Programme suggested by LE GOLFE; check opening times, access and prices for your date with the official sources.')}</p><ul className="mt-4 space-y-2">{sheet.sources.map(source=><li key={source.url}><a className="text-sm font-bold underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></aside>
   <section className="mt-10 border-t border-black/20 pt-7"><h2 className="text-2xl font-black">{fr?'Poursuivre la découverte':'Explore further'}</h2><div className="mt-5 flex flex-wrap gap-3">{sheet.nearby.map(target=><Link className="lg-btn" key={target} href={`/${locale}/place/${target}`}>{places.find(p=>p.id===target)!.name} →</Link>)}</div></section>
  </section>
  <PlaceActions place={place} locale={locale}/>
 </main>;
}
