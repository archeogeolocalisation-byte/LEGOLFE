import type {VillagePhoto} from './villageMedia';
import {villageMedia} from './villageMedia';
import {freinetCroixMedia} from './freinetCroixPlaces';
import {placeFactsMedia} from './placeFactsMedia';

// Area views are explicitly distinguished from photographs of the named venue.
function area(photo:VillagePhoto,fr:string,en:string):VillagePhoto{
 return {...photo,alt:fr,caption:{fr,en},contextual:true};
}
export const localDiscoveriesMedia:Record<string,VillagePhoto[]>={
 'musee-patrimoine-grimaud':[area(placeFactsMedia['grimaud-village'],
  'Grimaud village — vue du secteur, pas des collections du Musée du Patrimoine',
  'Grimaud village — area view, not the heritage museum collections')],
 'villa-romaine-pardigon':[area(freinetCroixMedia['plage-debarquement-la-croix-valmer'][0],
  'Baie de Cavalaire — paysage du littoral voisin, pas des vestiges de Pardigon II',
  'Cavalaire bay — nearby coastal landscape, not the Pardigon II remains')],
 'chapelle-notre-dame-miremer':[area(freinetCroixMedia['conservatoire-patrimoine-freinet'][0],
  'La Garde-Freinet vue depuis le fort — panorama du village, pas de la chapelle de Miremer',
  'La Garde-Freinet from the fort — village panorama, not Miremer chapel')],
 'chapelle-sainte-magdeleine-la-mole':[area(villageMedia['la-mole-village'][2],
  'Collines autour du lac de la Verne — paysage des Maures, pas de la chapelle Sainte-Magdeleine',
  'Hills around the Verne reservoir — Maures landscape, not Sainte-Magdeleine chapel')],
 'plage-de-la-nartelle':[area(villageMedia['sainte-maxime-village'][0],
  'Le port et le centre de Sainte-Maxime — vue de la commune, pas de la plage de la Nartelle',
  'Sainte-Maxime harbour and centre — town view, not La Nartelle beach')],
};
