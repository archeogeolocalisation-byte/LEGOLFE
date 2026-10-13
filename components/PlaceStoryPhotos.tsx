import {photosForPlace} from '../lib/curatedPlaceGallery';
import type {Locale} from '../lib/i18n';

export default function PlaceStoryPhotos({id,locale}:{id:string;locale:Locale}){
 const photos=photosForPlace(id).slice(3,5);
 if(!photos.length)return null;
 const fr=locale==='fr';
 return <section className="lg-shell py-12" aria-label={fr?'Autres regards sur ce lieu':'More views of this place'}><div className={`grid gap-8 ${photos.length>1?'md:grid-cols-2':''}`}>
  {photos.map(photo=><figure key={photo.src}><img src={photo.src} alt={photo.caption[locale]} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover"/><figcaption className="mt-3 text-xs leading-6 text-black/65"><span className="block font-bold">{photo.caption[locale]}</span>{photo.credit&&<a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit}</a>}{photo.credit&&photo.license&&' · '}{photo.license&&<a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">{photo.license}</a>}{(photo.credit||photo.license)&&' · '}{fr?'Recadrage d’affichage':'Display crop'}</figcaption></figure>)}
 </div></section>;
}
