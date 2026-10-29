import {villaCollectionLabels,type VillaCollection} from '../lib/villaCollections';
import {amenityOptions} from '../lib/villaAmenities';
import {villaHref} from '../lib/villaPaths';
import Link from 'next/link';
import VillaSaveButton from './VillaSaveButton';
import {villaDescriptionEn} from '../data/staySelections';
import type {Locale} from '../lib/i18n';

type CardVilla={collection?:VillaCollection;id:string;name:string;location:string;image:string;saintTropezDistance?:number;description:string;descriptionEn?:string;guests:number;bedrooms:number;pool:boolean;price:number;amenities?:string[]};
export default function VillaCard({villa,locale}:{villa:CardVilla;locale:Locale}){
 const fr=locale==='fr',live=villa.id.startsWith('property-'),href=villaHref(villa.id,locale);
 const amenities=villa.amenities??(villa.pool?['Pool']:[]);
 const highlights=['Heated pool','Pool','Sea view','Garden','Terrace','Air conditioning','Parking','Pets allowed'].filter(value=>amenities.includes(value)&&!(value==='Pool'&&amenities.includes('Heated pool'))).slice(0,3);

 return <article className="villa-card">
  <div className="villa-card-photo"><Link href={href} tabIndex={-1} aria-hidden="true" className="group block h-full"><div className="lg-image h-full">{villa.image?<img src={villa.image} alt={`${villa.name} · ${villa.location}`} width="720" height="480" loading="lazy"/>:<div className="villa-card-placeholder">{villa.name}</div>}</div></Link>{!live&&<p className="villa-example-badge">{fr?'Exemple de présentation · indisponible':'Presentation example · not available'}</p>}{live&&<VillaSaveButton id={villa.id} name={villa.name} locale={locale}/>}</div>
  <Link href={href} className="villa-card-content" aria-label={`${fr?'Découvrir':'Explore'} ${villa.name} · ${villa.location}`}>
   <p className="lg-kicker">{villa.location}{live&&villa.saintTropezDistance!==undefined&&` · ${villa.saintTropezDistance} km ${fr?'de Saint-Tropez':'from Saint-Tropez'}`}</p>
   {villa.collection&&villa.collection!=='homes'&&<p className="villa-collection-badge">{villaCollectionLabels[locale][villa.collection]} · {fr?'Sélection LE GOLFE':'LE GOLFE selection'}</p>}
   <h3>{villa.name}</h3>
   <p className="villa-card-capacity">{villa.guests} {fr?'personnes':'guests'} <span aria-hidden="true">·</span> {villa.bedrooms} {fr?(villa.bedrooms===1?'chambre':'chambres'):(villa.bedrooms===1?'bedroom':'bedrooms')}</p>
   <p className="villa-card-description">{fr?villa.description:villa.descriptionEn||villaDescriptionEn[villa.id]||villa.description}</p>
   {highlights.length>0&&<ul className="villa-card-highlights" aria-label={fr?'Équipements déclarés':'Listed amenities'}>{highlights.map(value=><li key={value}>{fr?amenityOptions.find(([en])=>en===value)?.[1]||value:value}</li>)}</ul>}
   <div className="villa-card-bottom"><p className="villa-card-contact">{live?(fr?'Dates et conditions en contact direct':'Discuss dates and terms directly'):(fr?'Fiche de démonstration':'Sample listing')}</p><span className="villa-card-arrow" aria-hidden="true">↗</span></div>
   <span className="villa-card-cta">{live?(fr?'Découvrir la maison':'Explore this home'):(fr?'Voir la fiche exemple':'View sample listing')} →</span>
  </Link>
 </article>;
}
