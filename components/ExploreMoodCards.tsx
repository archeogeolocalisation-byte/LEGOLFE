import Link from 'next/link';
import type {Locale} from '../lib/i18n';
import {mediaForPlace} from '../lib/placeMedia';
import {exploreFilterHref} from '../lib/exploreFilters';
const moods=[
 {id:'beach' as const,place:'gigaro-beach',fr:{title:'Une envie de mer',text:'Plages, criques et pauses au bord de l’eau.'},en:{title:'Time by the sea',text:'Beaches, coves and a pause by the water.'}},
 {id:'walk' as const,place:'pont-des-fees',fr:{title:'Prendre les chemins',text:'Balades, randonnées et découvertes à pied.'},en:{title:'Take to the paths',text:'Walks, hikes and discoveries on foot.'}},
 {id:'family' as const,place:'domaine-rayol-kids',fr:{title:'Partager en famille',text:'Des idées pour sortir à leur rythme.'},en:{title:'Make family memories',text:'Ideas for outings at their pace.'}},
];
export default function ExploreMoodCards({locale}:{locale:Locale}){
 const fr=locale==='fr';
 return <section className="explore-mood-cards" aria-label={fr?'Trois envies pour commencer':'Three ways to start'}>{moods.map(mood=>{const media=mediaForPlace(mood.place),copy=mood[locale];return <article key={mood.id}><Link href={exploreFilterHref(locale,mood.id)+'#adresses'} prefetch={false}><div className="explore-mood-image">{media&&<img src={media.src} alt={media.alt} width={720} height={480} loading="lazy"/>}<span aria-hidden="true">↗</span>{media&&(media.diagram||media.contextual||media.illustrative)&&<p>{media.diagram?(fr?'Schéma de parcours':'Route diagram'):media.illustrative?(fr?'Photo d’illustration':'Illustrative photograph'):(fr?'Photo du secteur':'Area photograph')}</p>}</div><div className="explore-mood-copy"><p className="lg-kicker">{fr?'SELON VOS ENVIES':'FOLLOW YOUR MOOD'}</p><h2>{copy.title}</h2><p>{copy.text}</p></div></Link>{media&&(media.credit||media.license)&&<p className="explore-mood-credit">{[media.credit,media.license].filter(Boolean).join(' · ')}</p>}</article>;})}</section>;
}
