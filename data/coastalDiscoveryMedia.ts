import type {VillagePhoto} from './villageMedia';
import {villageMedia} from './villageMedia';
export const coastalDiscoveryMedia:Record<string,VillagePhoto[]>={
 'port-cogolin':[{
  ...villageMedia['cogolin-village'][2],src:'/media/coastal-discoveries/port-cogolin.webp',
  alt:'Port Cogolin — photographie d’archive du bassin en 2002',
  caption:{fr:'Port Cogolin — photographie d’archive de 2002',en:'Port Cogolin — archival photograph from 2002'},
 }],
 'plage-luc-provensal-sainte-maxime':[{
  ...villageMedia['sainte-maxime-village'][3],src:'/media/coastal-discoveries/plage-luc-provensal.webp',
  alt:'Plage du centre-ville de Sainte-Maxime, côté Casino, photographiée en 2015',
  caption:{fr:'La plage du centre-ville de Sainte-Maxime, côté Casino — photographie de 2015',en:'Sainte-Maxime town-centre beach by the Casino — photograph from 2015'},
 }],
 'maison-des-arcades-grimaud':[{
  src:'/media/coastal-discoveries/maison-arcades.webp',
  alt:'Les arcades de la rue des Templiers à Grimaud, façade historique photographiée en 2006',
  caption:{fr:'Les arcades de la rue des Templiers à Grimaud — façade historique, photographie de 2006',en:'Arcades on Rue des Templiers in Grimaud — historic facade, photograph from 2006'},
  credit:'Patricia.fidi / Wikimedia Commons',license:'Domaine public / Public domain',
  licenseUrl:'https://commons.wikimedia.org/wiki/File:Grimaud-village-05.jpg#Licensing',
  source:'https://commons.wikimedia.org/wiki/File:Grimaud-village-05.jpg',
 }],
 'plage-du-rayol':[{
  ...villageMedia['rayol-canadel-village'][0],contextual:true,
  alt:'Le Rayol et son littoral depuis la Voie Verte — panorama du secteur en 2017',
  caption:{fr:'Le Rayol et son littoral depuis la Voie Verte — panorama du secteur, 2017',en:'Le Rayol and its coastline from the Voie Verte — area panorama, 2017'},
 }],
 'pointe-des-sardinaux':[{
  ...villageMedia['sainte-maxime-village'][2],contextual:true,
  alt:'Sainte-Maxime et le Golfe vus du ciel — vue de la commune, pas de la Pointe des Sardinaux',
  caption:{fr:'Sainte-Maxime et le Golfe — vue de la commune, pas de la Pointe des Sardinaux',en:'Sainte-Maxime and the Golfe — town view, not Pointe des Sardinaux'},
 }],
};
