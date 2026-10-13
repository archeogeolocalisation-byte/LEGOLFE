import Image from 'next/image';
import {photosForPlace} from '../lib/curatedPlaceGallery';
import type {Locale} from '../lib/i18n';

export default function PampelonnePhoto({index,locale}:{index:3|4;locale:Locale}){
 const photo=photosForPlace('pampelonne')[index];
 const fr=locale==='fr',portrait=index===3;
 return <figure className={portrait?'mx-auto w-full max-w-[360px]':'w-full'} data-pampelonne-photo={index+1}>
  <Image src={photo.src} alt={photo.caption[locale]} width={portrait?800:1280} height={portrait?1225:851} sizes={portrait?'(max-width: 767px) 90vw, 360px':'(max-width: 1500px) 100vw, 1440px'} className="h-auto w-full"/>
  <figcaption className="mt-3 text-xs leading-6"><span className="block font-bold">{photo.caption[locale]}</span><a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">{photo.license}</a> · {fr?'Redimensionnement et conversion WebP ; licence conservée.':'Resized and converted to WebP; licence retained.'}</figcaption>
 </figure>;
}
