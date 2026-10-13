import Image from 'next/image';
import {photosForPlace} from '../lib/curatedPlaceGallery';
import type {Locale} from '../lib/i18n';

export default function CitadelleStoryPhoto({locale}:{locale:Locale}){
 const photo=photosForPlace('citadelle-saint-tropez')[3],fr=locale==='fr';
 return <section className="lg-shell pb-16 md:pb-24" aria-label={fr?'Saint-Tropez dans l’histoire':'Saint-Tropez through history'}><figure data-citadelle-photo="model">
  <Image src={photo.src} alt={photo.caption[locale]} width={1280} height={707} sizes="(max-width: 1500px) 100vw, 1440px" className="h-auto w-full"/>
  <figcaption className="mt-3 text-xs leading-6 text-black/65"><span className="block font-bold">{photo.caption[locale]}</span><a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">{photo.license}</a> · {fr?'Conversion WebP ; licence conservée.':'Converted to WebP; licence retained.'}</figcaption>
 </figure></section>;
}
