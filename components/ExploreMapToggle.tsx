'use client';
import {useState} from 'react';
import DiscoveryMap,{type DiscoveryMapPlace} from './DiscoveryMap';
import type {Locale} from '../lib/i18n';
export default function ExploreMapToggle({places,total,locale}:{places:DiscoveryMapPlace[];total:number;locale:Locale}){
 const [open,setOpen]=useState(false),fr=locale==='fr';
 return <section className="explore-map-panel" aria-label={fr?'Carte des résultats':'Results map'}><div><div><p className="lg-kicker">{fr?'VOTRE SÉLECTION SUR LA CARTE':'YOUR RESULTS ON THE MAP'}</p><p>{fr?`${places.length} adresse${places.length===1?'':'s'} avec repère documenté sur ${total} résultat${total===1?'':'s'}.`:`${places.length} place${places.length===1?'':'s'} with documented markers out of ${total} result${total===1?'':'s'}.`}</p></div><button type="button" className="lg-btn" aria-expanded={open} aria-controls="explore-results-map" disabled={!places.length} onClick={()=>setOpen(!open)}>{open?(fr?'Masquer la carte':'Hide map'):(fr?'Afficher la carte':'Show map')} {open?'−':'+'}</button></div><div id="explore-results-map" hidden={!open}>{open&&<><DiscoveryMap locale={locale} places={places}/><p className="explore-map-note">{fr?'Les repères de secteur ne sont pas des entrées précises. Consultez les fiches pour les accès ; aucun trajet entre les lieux n’est proposé.':'Area markers are not precise entrances. Check the place pages for access; no route between places is suggested.'}</p></>}</div></section>;
}
