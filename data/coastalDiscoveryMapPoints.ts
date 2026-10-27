import type {MapPoint} from '../lib/placeMapLinks';
// Coordinates are published by the official tourism pages, not inferred from photo camera locations.
export const coastalDiscoveryMapPoints:Record<string,MapPoint[]>={
 'port-cogolin':[{
  id:'port-cogolin-basin',label:{fr:'Port Cogolin · secteur du bassin',en:'Port Cogolin · marina area'},
  latitude:43.2672,longitude:6.57789,kind:'area',checked:'2026-10-27',
  source:'https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cogolin/port-de-plaisance-de-port-cogolin-2803280',
  note:{fr:'Repère du port publié par le tourisme du Golfe. Ce point ne désigne ni une place de stationnement ni un embarquement réservé ; vérifiez votre rendez-vous avec la capitainerie.',en:'Harbour reference published by Golfe tourism. This is neither a parking space nor a booked boarding point; confirm your meeting with the harbour office.'},
 }],
 'plage-du-rayol':[{
  id:'plage-rayol-area',label:{fr:'Plage du Rayol · secteur de plage',en:'Rayol beach · beach area'},
  latitude:43.1563,longitude:6.47685,kind:'area',checked:'2026-10-27',
  source:'https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/rayol-canadel-sur-mer/plage-du-rayol-928717',
  note:{fr:'Repère de plage publié par le tourisme du Golfe. Il ne désigne pas un parking ni un accès sans marche. Préparez votre descente et votre retour.',en:'Beach reference published by Golfe tourism, not a car park or a step-free access point. Plan the descent and return.'},
 }],
 'plage-luc-provensal-sainte-maxime':[{
  id:'plage-luc-provensal-area',label:{fr:'Plage Luc Provensal · centre-ville',en:'Luc Provensal beach · town centre'},
  latitude:43.30777,longitude:6.637459,kind:'area',checked:'2026-10-27',
  source:'https://www.sainte-maxime.com/profiter/plage-luc-provensal-du-centre-ville-sainte-maxime-fr-6295762/',
  note:{fr:'Repère de la plage publié dans le lien d’itinéraire de l’office de Sainte-Maxime, pas une place de parking. Surveillance et équipements à vérifier pour le jour choisi.',en:'Beach reference from the Sainte-Maxime tourist office’s directions link, not a parking space. Check lifeguards and facilities for your date.'},
 }],
 'maison-des-arcades-grimaud':[{
  id:'maison-des-arcades-entry',label:{fr:'Maison des Arcades · accès Balladou',en:'Maison des Arcades · Balladou access'},
  latitude:43.274527,longitude:6.52275,kind:'venue',checked:'2026-10-27',
  source:'https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/maison-des-arcades-grimaud-fr-3032964/',
  directionsQuery:'Maison des Arcades, Impasse du Balladou, 83310 Grimaud, France',
  note:{fr:'Repère publié par l’office pour la Maison des Arcades. L’accès se prépare du côté du Balladou, près de Saint-Michel ; vérifiez horaires et conditions de visite.',en:'Tourist-office reference for Maison des Arcades. Approach from Balladou near Saint-Michel and check visiting times and access.'},
 }],
};
