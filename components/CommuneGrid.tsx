import Image from 'next/image';
import Link from 'next/link';
import {touristMapCommunes} from '../data/touristMap';
import type {Locale} from '../lib/i18n';
import styles from './CommuneGrid.module.css';

export default function CommuneGrid({locale}:{locale:Locale}){
 const fr=locale==='fr';
 return <section className={styles.section} aria-labelledby="communes-heading">
  <div className={styles.heading}><p className="lg-kicker">{fr?'LE GOLFE / LES COMMUNES':'LE GOLFE / THE TOWNS'}</p><h2 id="communes-heading">{fr?'Douze communes, autant de découvertes.':'Twelve towns to discover.'}</h2><p>{fr?'Du littoral aux villages des Maures, choisissez votre prochaine étape. Illustrations créées pour LE GOLFE.':'From the coast to the Maures villages, choose your next stop. Illustrations created for LE GOLFE.'}</p></div>
  <div className={styles.grid}>{touristMapCommunes.map(place=>{
   const copy=place.copy[locale];
   const content=<><Image src={place.illustration!} alt={fr?`Illustration de ${place.name}`:`Illustration of ${place.name}`} width={600} height={400} sizes="(max-width: 639px) 100vw, (max-width: 959px) 50vw, 33vw"/><div className={styles.copy}><p className={styles.kicker}>{copy.kicker}</p><h3>{place.name}</h3><p>{copy.description}</p><span className={styles.action}>{place.path?(fr?'Découvrir':'Discover'):(fr?'Informations touristiques':'Tourist information')} {place.path?'→':'↗'}</span></div></>;
   return <article key={place.id} data-commune={place.id} className={styles.card}>{place.path?<Link href={`/${locale}${place.path}`}>{content}</Link>:<a href={place.externalUrl} target="_blank" rel="noopener noreferrer">{content}</a>}</article>;
  })}</div>
 </section>;
}
