import {villaHref} from '../lib/villaPaths';
import Link from 'next/link';
import SiteHeader from './SiteHeader';
import Breadcrumbs from './Breadcrumbs';
import CollectionSchema from './CollectionSchema';
import PilotNotice from './PilotNotice';
import StayFilters from './StayFilters';
import VillaCard from './VillaCard';
import {getPublishedVillas} from '../lib/publicVillas';
import {villas} from '../data/villas';
import {distanceSelections} from '../data/staySelections';
import type {Locale} from '../lib/i18n';

export default async function StayCollection({locale,selection}:{locale:Locale;selection?:typeof distanceSelections[number]}){
 const fr=locale==='fr',path=`/${locale}/stay${selection?'/'+selection.slug:''}`;
 const published=(await getPublishedVillas()).map(v=>({...v,image:v.photos[0]?.src||'',pool:v.amenities.includes('Pool'),descriptionEn:v.descriptionEn}));
 const list=published.filter(v=>!selection||(v.saintTropezDistance!==undefined&&v.saintTropezDistance<=selection.maxKm)).sort((a,b)=>(a.saintTropezDistance??Infinity)-(b.saintTropezDistance??Infinity));
 const title=selection?(fr?`Votre maison à ${selection.maxKm} km maximum de Saint-Tropez`:`Your home within ${selection.maxKm} km of Saint-Tropez`):(fr?'Votre maison dans le Golfe.':'Your home in the Golfe.');
 const intro=selection?(fr?selection.introFr:selection.introEn):(fr?'Quelques jours au village, une semaine en famille ou une parenthèse face à la mer. Trouvez une maison selon votre budget et votre façon de vivre le Golfe.':'A few days in a village, a family week or a break by the sea. Find a home that fits your budget and the way you want to enjoy the Golfe.');
 return <main className="stay-page">
  <SiteHeader locale={locale} path={`/stay${selection?'/'+selection.slug:''}`}/>
  <Breadcrumbs locale={locale} items={[{name:'LE GOLFE',path:`/${locale}`},{name:fr?'Maisons & villas':'Houses & villas',path:`/${locale}/stay`},...(selection?[{name:`${selection.maxKm} km maximum`,path}]:[])]}/>
  <CollectionSchema name={fr?'Maisons et villas dans le Golfe de Saint-Tropez':'Houses and villas in the Golfe de Saint-Tropez'} path={path} items={list.map(v=>({name:v.name,path:villaHref(v.id,locale)}))}/>
  <section className="lg-shell stay-collection">
   <div className="stay-hero"><div className="stay-hero-copy"><p className="lg-kicker">LE GOLFE / {fr?'MAISONS & VILLAS':'HOUSES & VILLAS'}</p><h1 className="stay-title">{title}</h1><p className="stay-intro">{intro}</p><p className="stay-hero-budget">{fr?'Tous les budgets · premier filtre jusqu’à 1 500 € / semaine':'All budgets · first filter up to €1,500 / week'}</p><div className="stay-hero-actions"><a className="lg-btn" href="#stay-search">{fr?'Explorer les maisons':'Explore homes'} ↓</a><Link href={`/${locale}/saved`} className="lg-link-accent">{fr?'Mes maisons enregistrées':'My saved homes'} ↗</Link></div></div><figure className="stay-hero-image"><img src="/villas/villa-eden.jpg" width="960" height="600" fetchPriority="high" alt={fr?'Jardin méditerranéen et piscine face à la mer':'Mediterranean garden and pool overlooking the sea'}/><figcaption>{fr?'L’esprit des vacances dans le Golfe · photo de présentation':'The spirit of a Golfe getaway · presentation image'}</figcaption></figure></div>
   <StayFilters villas={list} locale={locale}><nav aria-label={fr?'Distance de Saint-Tropez':'Distance from Saint-Tropez'} className="stay-distances"><Link className="lg-btn" aria-current={!selection?'page':undefined} href={`/${locale}/stay`}>{fr?'Tout le Golfe':'Around the Golfe'}</Link>{distanceSelections.filter(s=>published.some(v=>v.saintTropezDistance!==undefined&&v.saintTropezDistance<=s.maxKm)).map(s=><Link className="lg-btn" aria-current={selection?.slug===s.slug?'page':undefined} key={s.slug} href={`/${locale}/stay/${s.slug}`}>{s.maxKm} km {fr?'maximum':'maximum'}</Link>)}</nav></StayFilters>
   {published.some(v=>v.saintTropezDistance!==undefined)&&<p className="stay-distance-note">{fr?'Distances déclarées dans les fiches, limite incluse. Elles n’indiquent ni un temps de trajet ni une disponibilité : confirmez ces informations avant de réserver.':'Distances as listed in property guides, boundary included. They indicate neither journey times nor availability: confirm these details before booking.'}</p>}
   <details className="stay-examples"><summary>{fr?'Découvrir nos exemples de fiches':'Explore sample listings'} <span>{fr?'Démonstrations · aucune location proposée':'Demonstrations · not offered for rental'}</span></summary><p className="stay-example-note">{fr?'Ces présentations illustrent les fiches du site. Elles ne sont pas des annonces disponibles et ne font pas partie des résultats de recherche.':'These presentations illustrate the site’s listing pages. They are not available rentals and are not included in search results.'}</p><div className="stay-results stay-example-grid">{villas.map(v=><VillaCard key={v.id} villa={{...v,amenities:[...(v.heatedPool?['Heated pool']:v.pool?['Pool']:[]),...(v.seaView?['Sea view']:[])]}} locale={locale}/>)}</div></details>
   <div className="stay-assistance"><div><p className="lg-kicker">{fr?'VOTRE SÉJOUR, VOTRE RYTHME':'YOUR STAY, YOUR PACE'}</p><h2 className="mt-3 text-3xl font-black">{fr?'Le bon village fait aussi les bonnes vacances.':'The right village makes the holiday.'}</h2><p className="mt-4 max-w-2xl leading-7 text-black/60">{fr?'Plages, ruelles, marchés : découvrez les communes pour choisir votre point de départ dans le Golfe.':'Beaches, village lanes and markets: explore the towns to choose your base in the Golfe.'}</p></div><div className="flex flex-wrap gap-3"><Link className="lg-btn" href={`/${locale}/destinations`}>{fr?'Comparer les communes':'Compare destinations'} →</Link><Link className="lg-btn" href="/match">{fr?'Trouver ma maison':'House matching · French form'} →</Link></div></div>
   <div className="stay-host-invite"><h2>{fr?'Vous avez une maison dans le Golfe ?':'Have a home in the Golfe?'}</h2><Link className="lg-btn secondary" href={`/${locale}/host`}>{fr?'Présenter ma maison':'List my home'} →</Link></div><div className="stay-pilot"><PilotNotice locale={locale}/></div>
  </section>
 </main>;
}
