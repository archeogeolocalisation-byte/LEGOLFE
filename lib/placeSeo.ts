import type {Place} from '../data/places';
import {getCategory, placeDescriptionFr} from '../data/places';
import {placeFacts} from '../data/placeFacts';
import {discoveryFeatures} from '../data/discoveryFeatures';
import {placeSeoCopy} from '../data/placeSeoCopy';
import {categoryFR, type Locale} from './i18n';
import {placeName} from './placeNames';

export function placeSeo(place:Place, locale:Locale) {
 const copy=placeFacts[place.id]?.copy[locale] ?? discoveryFeatures[place.id]?.[locale] ?? placeSeoCopy[place.id]?.[locale];
 if(copy)return {title:copy.title,description:copy.description};
 const name=placeName(place,locale);
 const category=locale==='fr'?categoryFR[place.category].name:getCategory(place.category)!.name;
 const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const locationAlreadyNamed=normalize(name).endsWith(normalize(place.location));
 const parts=[name,...(locationAlreadyNamed?[]:[place.location]),category];
 return {title:parts.join(' · '),description:locale==='fr'?placeDescriptionFr[place.id]||place.description:place.description};
}
