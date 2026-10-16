import {places, type Place} from '../data/places';
import {destinationsForLocation} from '../data/destinations';
import {guidesForPlace, guidesForDestination} from '../data/guides';
import {nearbyExplorer} from './nearbyExplorer';

export function relatedPlacesFor(place:Place, limit=3) {
 const towns=new Set(destinationsForLocation(place.location).map(town=>town.slug));
 const sameTown=(candidate:Place)=>destinationsForLocation(candidate.location).some(town=>towns.has(town.slug));
 const candidates=[
  ...nearbyExplorer(place.id,limit).map(item=>item.place),
  ...places.filter(candidate=>candidate.id!==place.id&&sameTown(candidate)),
  ...places.filter(candidate=>candidate.id!==place.id&&candidate.category===place.category),
 ];
 return [...new Map(candidates.map(candidate=>[candidate.id,candidate])).values()].slice(0,limit);
}

export function guidesForPlaceVisit(place:Place, limit=3) {
 const direct=guidesForPlace(place.id);
 const local=destinationsForLocation(place.location).flatMap(town=>guidesForDestination(town.slug));
 return [...new Map([...direct,...local].map(guide=>[guide.slug,guide])).values()].slice(0,limit);
}
