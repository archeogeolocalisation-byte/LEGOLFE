import Link from 'next/link';
import type {Locale} from '../lib/i18n';
import type {GuideSource} from '../data/guides';
import {familyOutings,familyOutingsChecked} from '../data/familyOutings';
import {places} from '../data/places';
import {placeMapPoints} from '../data/placeMapPoints';
import {placeName} from '../lib/placeNames';
import DiscoveryMap from './DiscoveryMap';
import GuideStayButton from './GuideStayButton';
export default function FamilyGuidePlan({locale,sources}:{locale:Locale;sources:GuideSource[]}){
 const fr=locale==='fr';
 const ids=[...new Set(familyOutings.flatMap(outing=>outing.placeIds))];
 const mapPlaces=ids.flatMap(id=>{
  const place=places.find(p=>p.id===id),point=placeMapPoints[id]?.[0];
  return place&&point?[{id,name:placeName(place,locale),location:place.location,category:place.category,lat:point.latitude,lon:point.longitude,kind:point.kind}]:[];
 });
 return <section className="lg-shell budget-guide-plan" id="sorties-en-famille" aria-labelledby="family-plan-title">
  <div className="guide-library-heading"><div><p className="lg-kicker">{fr?'UNE SORTIE À LEUR RYTHME':'AN OUTING AT THEIR PACE'}</p><h2 id="family-plan-title">{fr?'Jouer, explorer ou rester au sec.':'Play, explore or stay dry.'}</h2></div></div>
  <p className="budget-plan-intro">{fr?'Choisissez un seul programme selon votre secteur et leurs envies. Les durées, pauses comprises, et les publics suggérés sont nos repères éditoriaux ; seuls les âges des livrets du Rayol sont ceux publiés par le lieu.':'Choose one programme for your area and their interests. Durations including breaks and suggested audiences are our editorial guidance; only the Rayol booklet ages are published by the venue.'}</p>
  <div className="budget-plan-grid">{familyOutings.map((outing,index)=>{const copy=outing.copy[locale];return <article key={outing.id} className="budget-outing family-outing">
   <p className="lg-kicker">0{index+1} / {copy.duration}</p><h3>{copy.title}</h3><p className="family-audience">{copy.audience}</p>
   <ol className="family-steps">{copy.steps.map(step=><li key={step}>{step}</li>)}</ol>
   <dl><div><dt>{fr?'Budget':'Budget'}</dt><dd>{copy.budget}</dd></div><div><dt>{fr?'Poussette & accès':'Pushchairs & access'}</dt><dd>{copy.access}</dd></div><div><dt>{fr?'Pauses & confort':'Breaks & comfort'}</dt><dd>{copy.comfort}</dd></div></dl>
   <div className="family-place-links">{outing.placeIds.map(id=>{const place=places.find(p=>p.id===id)!;return <Link key={id} href={`/${locale}/place/${id}`}>{placeName(place,locale)} ↗</Link>;})}</div>
   <p className="family-sources">{fr?'Repères officiels':'Official details'} : {outing.sourceIds.map(id=>{const source=sources.find(s=>s.id===id);return source?<a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>:null;})}</p>
   <GuideStayButton ids={outing.placeIds} locale={locale}/>
  </article>;})}</div>
  <p className="budget-plan-footnote">{fr?'Repères de ces trois programmes vérifiés le':'Details for these three programmes checked on'} <time dateTime={familyOutingsChecked}>{new Intl.DateTimeFormat(fr?'fr-FR':'en-GB',{dateStyle:'long',timeZone:'Europe/Paris'}).format(new Date(familyOutingsChecked+'T12:00:00Z'))}</time>. {fr?'Confirmez ouvertures, tarifs et activités pour votre date. Les lieux enregistrés restent sur cet appareil.':'Confirm openings, prices and activities for your date. Saved places stay on this device.'} <Link href={`/${locale}/saved`}>{fr?'Ouvrir Mon séjour':'Open My stay'} →</Link></p>
  <aside className="family-rain"><h3>{fr?'La pluie change le programme ?':'Rain changing your plans?'}</h3><p>{fr?'La visite intérieure de Saint-Tropez est une option, après confirmation de l’ouverture. Si elle ne correspond pas à leur âge ou à leurs envies, choisissez une autre idée du guide pluie.':'The indoor Saint-Tropez visit is an option once opening is confirmed. If it does not suit their age or interests, choose another idea from our rainy-day guide.'}</p><Link className="lg-btn" href={`/${locale}/guides/golfe-saint-tropez-quand-il-pleut`}>{fr?'Voir les idées par temps de pluie':'See rainy-day ideas'} →</Link></aside>
  <DiscoveryMap locale={locale} places={mapPlaces}/>
  <p className="budget-plan-footnote">{fr?'La carte situe les fiches du village de Grimaud, du Domaine du Rayol et du musée. Le repère de Grimaud ne désigne pas l’entrée de l’aire de jeux : suivez les indications de l’office. Aucun itinéraire entre les programmes n’est proposé.':'The map locates Grimaud village, the Domaine du Rayol and the museum. The Grimaud marker is not the playground entrance: follow the tourist office directions. No route between programmes is suggested.'}</p>
 </section>;
}
