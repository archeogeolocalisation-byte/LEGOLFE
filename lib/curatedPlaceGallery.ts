import {localPlacePhoto} from './placeImage';
import {newExperienceMedia} from "../data/newExperienceMedia";
import {citadelleMedia} from '../data/citadelleMedia';
import {pampelonneMedia} from '../data/pampelonneMedia';
import {placeFactsMedia} from '../data/placeFactsMedia';
import {discoveryPlaceMedia} from '../data/discoveryMedia';
import {suppliedPlaceMedia} from '../data/suppliedPlaceMedia';
import {legacyPlaceMedia} from '../data/legacyPlaceMedia';
import {villageMedia,type VillagePhoto} from '../data/villageMedia';
import {pressMedia} from './pressMedia';

// Named-place photographs; contextual peninsula view only where explicitly supplied and labelled.
function sourcePhotosForPlace(id:string):VillagePhoto[]{
 // Supplied replacements take priority over older catalogue photographs.
 if(suppliedPlaceMedia[id])return suppliedPlaceMedia[id];
 if(newExperienceMedia[id])return newExperienceMedia[id];
 if(id==='citadelle-saint-tropez')return citadelleMedia;
 if(id==='pampelonne')return pampelonneMedia;
 if(placeFactsMedia[id])return [placeFactsMedia[id]];
 if(discoveryPlaceMedia[id])return discoveryPlaceMedia[id];
 if(villageMedia[id])return villageMedia[id].filter(photo=>!photo.contextual);
 if(legacyPlaceMedia[id])return legacyPlaceMedia[id].filter(photo=>!photo.contextual);
 if(pressMedia[id]){
  const press=pressMedia[id];return [press.hero,press.secondary,...press.gallery??[]].filter(p=>!!p&&!p.contextual).map(p=>({...p!,caption:{fr:p!.alt,en:'La Voile terrace at La Réserve Ramatuelle'},licenseUrl:p!.source}));
 }
 if(id==='domaine-rayol-kids')return [villageMedia['rayol-canadel-village'][3]];
 if(id==='gigaro-beach')return [villageMedia['la-croix-valmer-village'][0]];
 return [];
}

export function photosForPlace(id:string):VillagePhoto[]{
 return sourcePhotosForPlace(id).map(localPlacePhoto);
}
