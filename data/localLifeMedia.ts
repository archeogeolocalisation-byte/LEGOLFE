import type {VillagePhoto} from './villageMedia';
import {legacyPlaceMedia} from './legacyPlaceMedia';
import {freinetCroixMedia} from './freinetCroixPlaces';
import {discoveryPlaceMedia} from './discoveryMedia';
import {placeFactsMedia} from './placeFactsMedia';

// Reuse licensed local photographs, never present a village view as a club or event photograph.
function area(photo:VillagePhoto,fr:string,en:string):VillagePhoto{
 return {...photo,alt:fr,caption:{fr,en},contextual:true};
}
export const localLifeMedia:Record<string,VillagePhoto[]>={
 'boule-plantourianne':[area(legacyPlaceMedia['plan-de-la-tour-village'][0],
  'Le Plan-de-la-Tour et ses collines — vue du village, pas du boulodrome ni du club',
  'Le Plan-de-la-Tour and its hills — village view, not the pétanque ground or club')],
 'joie-de-lire-plan-de-la-tour':[area(legacyPlaceMedia['plan-de-la-tour-village'][1],
  'Maison du Plan-de-la-Tour — vue du village, pas des locaux de La Joie de Lire',
  'A house in Le Plan-de-la-Tour — village photograph, not La Joie de Lire premises')],
 'fete-chataigne-garde-freinet':[area(freinetCroixMedia['conservatoire-patrimoine-freinet'][0],
  'La Garde-Freinet vue depuis le fort — vue du village, pas de la Fête de la châtaigne',
  'La Garde-Freinet from the fort — village view, not a photograph of the chestnut festival')],
 'amis-moulins-ramatuelle':[area(discoveryPlaceMedia['moulin-de-paillas'][0],
  'Moulin de Paillas à Ramatuelle — le patrimoine présenté, pas un portrait des bénévoles',
  'Moulin de Paillas in Ramatuelle — the heritage site, not a portrait of the volunteers')],
 'escandihado-grimaud-cogolin':[area(placeFactsMedia['grimaud-village'],
  'Grimaud village — vue du territoire, pas une représentation de L’Escandihado',
  'Grimaud village — area view, not a performance by L’Escandihado')],
};
