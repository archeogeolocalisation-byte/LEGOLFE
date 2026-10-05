import {photosForPlace} from "./curatedPlaceGallery";

export type PlaceMedia = {
  src: string;
  alt: string;
  credit: string;
  license: string;
  source: string;
  contextual?: boolean;
};

const commons = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(name)}`;

export const placeMedia: Record<string, PlaceMedia> = {
  "escalet": {
    src: commons("Plage de l'Escalet - panoramio.jpg"),
    alt: "Plage de l'Escalet",
    credit: "Lucas Mevius / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Plage_de_l%27Escalet_-_panoramio.jpg",
  },
  "chateau-minuty": {
    src: commons("Chapelle du château Minuty à Gassin.jpg"),
    alt: "Chapelle du Château Minuty à Gassin",
    credit: "Office de tourisme de Gassin / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Chapelle_du_ch%C3%A2teau_Minuty_%C3%A0_Gassin.jpg",
  },
  "plan-de-la-tour-village": {
    src: commons("Plan-de-la-tour-01.jpg"),
    alt: "Le Plan-de-la-Tour",
    credit: "Patricia.fidi / Wikimedia Commons",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Plan-de-la-tour-01.jpg",
  },
  "ramatuelle-village": {
    src: commons("Ramatuelle Panorama.jpg"),
    alt: "Ramatuelle",
    credit: "En-bateau / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Ramatuelle_Panorama.jpg",
  },
  "gassin-village": {
    src: commons("Rue à Gassin village.jpg"),
    alt: "A street in Gassin village",
    credit: "Office de tourisme de Gassin / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Rue_%C3%A0_Gassin_village.jpg",
  },
  "grimaud-village": {
    src: commons("Grimaud (Var).jpg"),
    alt: "Grimaud village",
    credit: "Grimaud Tourisme / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Grimaud_(Var).jpg",
  },
  "pampelonne": {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Aerial_view_of_Pampelonne_Beach%2C_Saint-Tropez%2C_France_%2852723263302%29.jpg",
    alt: "Aerial view of Pampelonne Beach",
    credit: "Dronepicr / Wikimedia Commons",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Pampelonne_Beach,_Saint-Tropez,_France_(52723263302).jpg",
  },
  "saint-tropez-village": {
    src: commons("Saint-Tropez - Vue aérienne (3).jpg"),
    alt: "Aerial view of Saint-Tropez",
    credit: "Starus / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_-_Vue_a%C3%A9rienne_(3).jpg",
  },
  "citadelle-saint-tropez": {
    src: commons("Citadelle (Saint-Tropez) (3).jpg"),
    alt: "Citadelle de Saint-Tropez",
    credit: "Gzen92 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Citadelle_(Saint-Tropez)_(3).jpg",
  },
  "place-des-lices": {
    src: commons("Place des Lices - Saint-Tropez 1.jpg"),
    alt: "Place des Lices à Saint-Tropez",
    credit: "Arnaud 25 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Place_des_Lices_-_Saint-Tropez_1.jpg",
  },
  "club-55": {
    src: commons("Club 55.jpg"),
    alt: "Le Club 55 à Pampelonne",
    credit: "Cotedazur / Wikimedia Commons",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Club_55.jpg",
  },
  "byblos-beach": {
    src: commons("Plage de Pampelonne (Ramatuelle, 83) - 02.jpg"),
    alt: "Plage de Pampelonne",
    credit: "Thérèse Gaigé / Wikimedia Commons",
    license: "CC0 1.0",
    source: "https://commons.wikimedia.org/wiki/File:Plage_de_Pampelonne_(Ramatuelle,_83)_-_02.jpg",
  },
  "indie-beach": {
    src: commons("Plage de Pampelonne (Ramatuelle, 83) - 03.jpg"),
    alt: "Plage de Pampelonne",
    credit: "Thérèse Gaigé / Wikimedia Commons",
    license: "CC0 1.0",
    source: "https://commons.wikimedia.org/wiki/File:Plage_de_Pampelonne_(Ramatuelle,_83)_-_03.jpg",
  },
  "casita-pampelonne": {
    src: commons("Plage de Pampelonne (Ramatuelle, 83) - 04.jpg"),
    alt: "Plage de Pampelonne",
    credit: "Thérèse Gaigé / Wikimedia Commons",
    license: "CC0 1.0",
    source: "https://commons.wikimedia.org/wiki/File:Plage_de_Pampelonne_(Ramatuelle,_83)_-_04.jpg",
  },
  "bateaux-verts-excursion": {
    src: commons("Yachts in dock at the old port of Saint-Tropez, France (52724054464).jpg"),
    alt: "Old port of Saint-Tropez",
    credit: "dronepicr / Wikimedia Commons",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Yachts_in_dock_at_the_old_port_of_Saint-Tropez,_France_(52724054464).jpg",
  },
};


const contextualMedia: Record<string, PlaceMedia> = {
  "monroes-pub": {
    src: commons("La cité lacustre de Port Grimaud, vue du ciel.jpg"),
    alt: "Port Grimaud vu du ciel",
    credit: "Grimaud Tourisme / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:La_cit%C3%A9_lacustre_de_Port_Grimaud,_vue_du_ciel.jpg",
    contextual: true,
  },
  "gaio-club": {
    src: commons("Saint-Tropez (4).jpg"),
    alt: "Le port de Saint-Tropez de nuit",
    credit: "Rémi Jouan / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    source: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_(4).jpg",
    contextual: true,
  },
  "caves-du-roy": {
    src: commons("Entrée des Caves du Roy de Saint Tropez.jpg"),
    alt: "Entrée des Caves du Roy à Saint-Tropez",
    credit: "Arnaud 25 / Wikimedia Commons",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Entr%C3%A9e_des_Caves_du_Roy_de_Saint_Tropez.jpg",
  },
  "opera-saint-tropez": {
    src: commons("Saint-Tropez (2).jpg"),
    alt: "Le port de Saint-Tropez de nuit",
    credit: "Rémi Jouan / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    source: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_(2).jpg",
    contextual: true,
  },
  "cecile-golmard-chef": {
    src: commons("Place des Lices - Saint-Tropez 1.jpg"),
    alt: "Place des Lices à Saint-Tropez",
    credit: "Arnaud 25 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Place_des_Lices_-_Saint-Tropez_1.jpg",
    contextual: true,
  },
  "taxi-estelle": {
    src: commons("Golfe de Saint-Tropez (vue aérienne) (2).jpg"),
    alt: "Vue aérienne du Golfe de Saint-Tropez",
    credit: "Starus / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Golfe_de_Saint-Tropez_(vue_a%C3%A9rienne)_(2).jpg",
    contextual: true,
  },
  "maison-laurent-conciergerie": {
    src: commons("Ramatuelle Panorama.jpg"),
    alt: "Panorama de Ramatuelle",
    credit: "En-bateau / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Ramatuelle_Panorama.jpg",
    contextual: true,
  },
};

export const siteMedia = {
  gulfAerial: {
    src: commons("Golfe de Saint-Tropez (vue aérienne) (2).jpg"),
    alt: "Aerial panorama of the Golfe de Saint-Tropez",
    credit: "Starus / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Golfe_de_Saint-Tropez_(vue_a%C3%A9rienne)_(2).jpg",
  },
  gulfAerialPortrait: {
    src: commons("Golfe de Saint-Tropez (vue aérienne).jpg"),
    alt: "Aerial view of the Golfe de Saint-Tropez",
    credit: "Starus / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Golfe_de_Saint-Tropez_(vue_a%C3%A9rienne).jpg",
  },
};

export function mediaForPlace(id: string): PlaceMedia | undefined {
  return photosForPlace(id)[0];
}
