import { pressMedia } from "./pressMedia";

export type FeaturePhoto = {
  src: string;
  alt: string;
  credit: string;
  license: string;
  source: string;
  contextual?: boolean;
};

export type FeatureMediaSet = {
  hero?: FeaturePhoto;
  secondary?: FeaturePhoto;
  gallery?: FeaturePhoto[];
};

const commons = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(name)}`;

const pamp = (n: "01" | "02" | "03" | "04"): FeaturePhoto => ({
  src: commons(`Plage de Pampelonne (Ramatuelle, 83) - ${n}.jpg`),
  alt: "Plage de Pampelonne à Ramatuelle",
  credit: "Thérèse Gaigé / Wikimedia Commons",
  license: "CC0 1.0",
  source: `https://commons.wikimedia.org/wiki/File:Plage_de_Pampelonne_(Ramatuelle,_83)_-_${n}.jpg`,
  contextual: true,
});

const gassinStreet: FeaturePhoto = {
  src: commons("Rue à Gassin village.jpg"),
  alt: "Ruelle du village de Gassin",
  credit: "Office de tourisme de Gassin / Wikimedia Commons",
  license: "CC BY-SA 3.0",
  source: "https://commons.wikimedia.org/wiki/File:Rue_%C3%A0_Gassin_village.jpg",
  contextual: true,
};
const gassinLane: FeaturePhoto = {
  src: commons("Une rue dans le village de Gassin.jpg"),
  alt: "Rue du village de Gassin",
  credit: "Wikimedia Commons",
  license: "CC BY-SA",
  source: "https://commons.wikimedia.org/wiki/File:Une_rue_dans_le_village_de_Gassin.jpg",
  contextual: true,
};
const ramatuelle: FeaturePhoto = {
  src: commons("Ramatuelle Panorama.jpg"),
  alt: "Panorama de Ramatuelle",
  credit: "En-bateau / Wikimedia Commons",
  license: "CC BY-SA 3.0",
  source: "https://commons.wikimedia.org/wiki/File:Ramatuelle_Panorama.jpg",
  contextual: true,
};
const ramatuelleLane: FeaturePhoto = {
  src: commons("Ramatuelle (1).JPG"),
  alt: "Ruelle de Ramatuelle",
  credit: "Wikimedia Commons",
  license: "Public domain",
  source: "https://commons.wikimedia.org/wiki/File:Ramatuelle_(1).JPG",
  contextual: true,
};
const stTropez: FeaturePhoto = {
  src: commons("Aerial view of Saint-Tropez, France (52724272463).jpg"),
  alt: "Saint-Tropez vu du ciel",
  credit: "dronepicr / Wikimedia Commons",
  license: "CC BY 2.0",
  source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Saint-Tropez,_France_(52724272463).jpg",
  contextual: true,
};
const port: FeaturePhoto = {
  src: commons("Yachts in dock at the old port of Saint-Tropez, France (52724054464).jpg"),
  alt: "Vieux port de Saint-Tropez",
  credit: "dronepicr / Wikimedia Commons",
  license: "CC BY 2.0",
  source: "https://commons.wikimedia.org/wiki/File:Yachts_in_dock_at_the_old_port_of_Saint-Tropez,_France_(52724054464).jpg",
  contextual: true,
};
const gulf: FeaturePhoto = {
  src: commons("Golfe de Saint-Tropez (vue aérienne) (2).jpg"),
  alt: "Vue aérienne du Golfe de Saint-Tropez",
  credit: "Starus / Wikimedia Commons",
  license: "CC BY-SA 3.0",
  source: "https://commons.wikimedia.org/wiki/File:Golfe_de_Saint-Tropez_(vue_a%C3%A9rienne)_(2).jpg",
  contextual: true,
};
const gigaro: FeaturePhoto = {
  src: commons("Aerial view of Gigaro Beach in La Croix-Valmer, France (52723801211).jpg"),
  alt: "Vue aérienne de la plage de Gigaro",
  credit: "dronepicr / Wikimedia Commons",
  license: "CC BY 2.0",
  source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Gigaro_Beach_in_La_Croix-Valmer,_France_(52723801211).jpg",
};
const rayolGarden: FeaturePhoto = {
  src: commons("Jardin méditerranéen - Domaine du Rayol.jpg"),
  alt: "Jardin méditerranéen du Domaine du Rayol",
  credit: "Domaine du Rayol / Wikimedia Commons",
  license: "CC BY-SA 4.0",
  source: "https://commons.wikimedia.org/wiki/File:Jardin_m%C3%A9diterran%C3%A9en_-_Domaine_du_Rayol.jpg",
};
const rayolStairs: FeaturePhoto = {
  src: commons("Le Rayol-Canadel-sur-Mer, grand escalier.jpg"),
  alt: "Grand escalier du Rayol-Canadel-sur-Mer",
  credit: "Emartin / Wikimedia Commons",
  license: "CC BY-SA 4.0",
  source: "https://commons.wikimedia.org/wiki/File:Le_Rayol-Canadel-sur-Mer,_grand_escalier.jpg",
  contextual: true,
};
const cogolin: FeaturePhoto = {
  src: commons("Cogolin.jpg"),
  alt: "Cogolin vu depuis les hauteurs",
  credit: "Net-breuer / Wikimedia Commons",
  license: "CC BY-SA 3.0",
  source: "https://commons.wikimedia.org/wiki/File:Cogolin.jpg",
  contextual: true,
};

export const featureMedia: Record<string, FeatureMediaSet> = {
  "la-vague-dor": { hero: stTropez, secondary: port },
  "indie-beach": { secondary: pamp("03"), gallery: [pamp("02"), pamp("04")] },
  "byblos-beach": { hero: pamp("02"), secondary: pamp("04"), gallery: [pamp("01"), pamp("03")] },
  "casita-pampelonne": { hero: pamp("04"), secondary: pamp("01"), gallery: [pamp("02"), pamp("03")] },
  "bateaux-verts-excursion": { hero: port, secondary: gulf },
  "la-voile": { hero: ramatuelle, secondary: ramatuelleLane },
  "bello-visto": { hero: gassinStreet, secondary: gassinLane },
  "la-verdoyante": { hero: gassinLane, secondary: gassinStreet },
  "caseneuve-catamaran": { hero: gulf, secondary: port },
  "domaine-rayol-kids": { hero: rayolGarden, secondary: rayolStairs },
  "gigaro-beach": { hero: gigaro, secondary: rayolStairs },
  "maison-des-papillons": { hero: stTropez, secondary: port },
  "les-halles-saint-tropez": { hero: port, secondary: stTropez },
  "spa-du-bailli": { hero: rayolStairs, secondary: rayolGarden },
  "master-ninja-cogolin": { hero: cogolin },
};

export function mediaForFeature(id: string) {
  return pressMedia[id] ?? featureMedia[id];
}
