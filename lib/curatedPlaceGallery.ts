import {discoveryPlaceMedia} from '../data/discoveryMedia';
import {suppliedPlaceMedia} from '../data/suppliedPlaceMedia';
import {legacyPlaceMedia} from '../data/legacyPlaceMedia';
import {villageMedia,type VillagePhoto} from '../data/villageMedia';
import {pressMedia} from './pressMedia';

// Only photographs of the named place are eligible, never pictures of its surroundings.
export function photosForPlace(id:string):VillagePhoto[]{
 if(discoveryPlaceMedia[id])return discoveryPlaceMedia[id];
 if(suppliedPlaceMedia[id])return suppliedPlaceMedia[id];
 if(villageMedia[id])return villageMedia[id].filter(photo=>!photo.contextual);
 if(legacyPlaceMedia[id])return legacyPlaceMedia[id].filter(photo=>!photo.contextual);
 if(pressMedia[id]){
  const press=pressMedia[id];return [press.hero,press.secondary,...press.gallery??[]].filter(p=>!!p&&!p.contextual).map(p=>({...p!,caption:{fr:p!.alt,en:'La Voile terrace at La Réserve Ramatuelle'},licenseUrl:p!.source}));
 }
 if(id==='domaine-rayol-kids')return [villageMedia['rayol-canadel-village'][3]];
 if(id==='gigaro-beach')return [villageMedia['la-croix-valmer-village'][0]];
 return [];
}
