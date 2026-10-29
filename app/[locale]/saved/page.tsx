'use client';
import Link from 'next/link';
import {use,useEffect,useMemo,useState} from 'react';
import SiteHeader from '../../../components/SiteHeader';
import {places} from '../../../data/places';
import {placeName} from '../../../lib/placeNames';
import {villas} from '../../../data/villas';
import {isLocale} from '../../../lib/i18n';
import {mediaForPlace} from '../../../lib/placeMedia';
import {villaHref} from '../../../lib/villaPaths';
import VillaComparison from '../../../components/VillaComparison';
import StayPlanner from '../../../components/StayPlanner';
import EventStayActions from '../../../components/EventStayActions';
import SavedDayPlanSection from '../../../components/SavedDayPlan';
const STORAGE_KEY='le-golfe-saved-places',VILLA_STORAGE_KEY='le-golfe-saved-villas';
export default function SavedPage({params}:{params:Promise<{locale:string}>}){
 const {locale:raw}=use(params),locale=isLocale(raw)?raw:'en',fr=locale==='fr';
 const [ids,setIds]=useState<string[]>([]),[villaIds,setVillaIds]=useState<string[]>([]),[ready,setReady]=useState(false),[storageError,setStorageError]=useState('');
 useEffect(()=>{
  const refresh=()=>{
   try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'),homes=JSON.parse(localStorage.getItem(VILLA_STORAGE_KEY)||'[]');setIds(Array.isArray(saved)?[...new Set(saved.filter((id):id is string=>typeof id==='string'))]:[]);setVillaIds(Array.isArray(homes)?[...new Set(homes.filter((id):id is string=>typeof id==='string'))]:[]);setStorageError('');}
   catch{setStorageError(fr?'Impossible de lire votre sélection sur cet appareil. Aucune donnée n’a été modifiée.':'Unable to read your shortlist on this device. Nothing has been changed.');}setReady(true);
  };
  refresh();window.addEventListener('storage',refresh);window.addEventListener('le-golfe:saved-places',refresh);window.addEventListener('le-golfe:saved-villas',refresh);
  return()=>{window.removeEventListener('storage',refresh);window.removeEventListener('le-golfe:saved-places',refresh);window.removeEventListener('le-golfe:saved-villas',refresh);};
 },[fr]);
 const savedPlaces=useMemo(()=>ids.flatMap(id=>places.filter(place=>place.id===id)),[ids]);
 const savedVillas=useMemo(()=>villaIds.flatMap(id=>villas.filter(villa=>villa.id===id)),[villaIds]);
 function remove(key:string,id:string,event:string){
  try{const current=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(current))throw Error('Invalid selection');localStorage.setItem(key,JSON.stringify(current.filter(value=>value!==id)));setStorageError('');window.dispatchEvent(new Event(event));}
  catch{setStorageError(fr?'Modification non enregistrée sur cet appareil.':'Change not saved on this device.');}
 }
 return <main className="lg-saved-dark trip-page min-h-screen">
  <SiteHeader light={false} locale={locale} path="/saved"/>
  <div className="lg-shell trip-content">
   <header className="trip-hero"><div><p className="lg-kicker">{fr?'MON CARNET DU GOLFE':'MY GOLFE JOURNAL'}</p><h1>{fr?<>Vos envies.<br/><em>Vos journées.</em></>:<>Your favourites.<br/><em>Your days.</em></>}</h1><p>{fr?'Un musée le matin, une plage l’après-midi, une soirée déjà choisie. Composez votre séjour et laissez de la place à l’imprévu.':'A museum in the morning, a beach in the afternoon, an evening already chosen. Shape your stay and leave room for the unexpected.'}</p></div><aside><p className="lg-kicker">{fr?'VOTRE SÉLECTION':'YOUR SHORTLIST'}</p><strong>{ready?savedPlaces.length:'—'}</strong><span>{fr?'lieux à découvrir':'places to discover'}</span><p>{fr?'Votre carnet reste dans ce navigateur. Aucun compte nécessaire pour organiser vos journées.':'Your journal stays in this browser. No account is needed to arrange your days.'}</p><Link href={`/${locale}/guides`} className="lg-btn lg-btn--accent">{fr?'Piocher dans les guides':'Browse the guides'} ↗</Link></aside></header>
   <nav className="trip-navigation" aria-label={fr?'Organiser mon séjour':'Organise my stay'}><a href="#mon-programme">01 / {fr?'Mes journées':'My days'}</a><a href="#mes-adresses">02 / {fr?'Mes adresses':'My places'} {ready&&`(${savedPlaces.length})`}</a><a href="#mes-rendez-vous">03 / {fr?'Mes rendez-vous':'My events'}</a><a href="#mes-maisons">04 / {fr?'Mes maisons':'My homes'} {ready&&`(${savedVillas.length})`}</a></nav>
   {storageError&&<p className="trip-warning" role="alert">{storageError}</p>}
   {ready?<StayPlanner places={savedPlaces} villas={savedVillas} locale={locale}/>:<p role="status" className="trip-loading">{fr?'Chargement de votre carnet…':'Loading your journal…'}</p>}
   <details className="trip-legacy"><summary>{fr?'Programme créé avec LE GOLFE & copie du compte':'Plan created with LE GOLFE & account copy'}</summary><p>{fr?'Retrouvez ici votre programme précédent et ses options de synchronisation. Il reste distinct de vos journées ci-dessus.':'Find your earlier plan and its sync options here. It remains separate from the daily planner above.'}</p><SavedDayPlanSection locale={locale}/><Link href={`/${locale}/ask`} className="lg-btn">{fr?'Créer ou modifier mon programme':'Create or edit my plan'} ↗</Link></details>
   <section id="mes-adresses" className="trip-collection scroll-mt-8" aria-labelledby="my-places-title"><div className="trip-heading"><div><p className="lg-kicker">{fr?'À GARDER SOUS LA MAIN':'KEEP CLOSE'}</p><h2 id="my-places-title">{fr?'Mes adresses.':'My places.'}</h2></div><Link className="lg-btn" href={`/${locale}/explore`}>{fr?'Explorer les lieux':'Explore places'} ↗</Link></div>
    {!ready?<p role="status">{fr?'Chargement…':'Loading…'}</p>:savedPlaces.length?<div className="trip-place-grid">{savedPlaces.map(place=>{const media=mediaForPlace(place.id);return <article key={place.id}><Link href={`/${locale}/place/${place.id}`} className="trip-place-photo">{media?<img src={media.src} alt={media.alt} width={640} height={420} loading="lazy"/>:<span>{placeName(place,locale)}</span>}</Link><div><p>{place.location}</p><h3><Link href={`/${locale}/place/${place.id}`}>{placeName(place,locale)} ↗</Link></h3><button type="button" onClick={()=>remove(STORAGE_KEY,place.id,'le-golfe:saved-places')}>{fr?'Retirer de mes adresses':'Remove from saved places'}</button></div></article>;})}</div>:<div className="trip-empty"><h3>{fr?'Votre prochaine découverte commence ici.':'Your next discovery starts here.'}</h3><p>{fr?'Enregistrez des lieux depuis Explorer ou les guides. Vous pourrez ensuite les placer dans vos journées.':'Save places from Explore or the guides, then add them to your days.'}</p><Link className="lg-btn lg-btn--accent" href={`/${locale}/guides`}>{fr?'Découvrir les guides':'Discover guides'} ↗</Link></div>}
   </section>
   <div className="trip-event-collection"><EventStayActions locale={locale}/></div>
   <section id="mes-maisons" className="trip-collection scroll-mt-8" aria-labelledby="my-homes-title"><div className="trip-heading"><div><p className="lg-kicker">{fr?'LE POINT DE DÉPART':'YOUR BASE'}</p><h2 id="my-homes-title">{fr?'Mes maisons.':'My homes.'}</h2></div><Link href={`/${locale}/stay`} className="lg-btn">{fr?'Choisir une maison':'Find a home'} ↗</Link></div>
    {savedVillas.length?<><div className="trip-home-grid">{savedVillas.map(villa=><article key={villa.id}><Link href={villaHref(villa.id,locale)}><img src={villa.image} alt={villa.name} width={720} height={480} loading="lazy"/></Link><div><p>{villa.location} · {villa.guests} {fr?'voyageurs':'guests'}</p><h3><Link href={villaHref(villa.id,locale)}>{villa.name} ↗</Link></h3><button type="button" onClick={()=>remove(VILLA_STORAGE_KEY,villa.id,'le-golfe:saved-villas')}>{fr?'Retirer':'Remove'}</button></div></article>)}</div><VillaComparison items={savedVillas} locale={locale}/></>:<p className="trip-empty-small">{fr?'Pas encore de maison enregistrée. Vous pouvez organiser vos journées sans en choisir une.':'No homes saved yet. You can arrange your days without choosing one.'}</p>}
   </section>
   <footer className="trip-footer"><p>{fr?'Votre programme est personnel, conservé sur cet appareil. Horaires, accès et réservations se confirment auprès des lieux.':'Your plan is personal and stored on this device. Confirm times, access and bookings with the venues.'}</p><Link href="/requests">{fr?'Mes demandes de séjour':'My stay requests'} ↗</Link></footer>
  </div>
 </main>;
}
