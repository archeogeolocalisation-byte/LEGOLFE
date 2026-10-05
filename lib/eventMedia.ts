import type { GolfeEvent } from "../data/events";

export type EventMedia = { src:string; alt:string; credit:string; license:string; source:string };
const commons=(name:string)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(name)}`;

const media = {
  voiles:{src:commons("Voiles de Saint-Tropez 2007.jpg"),alt:"Voiliers lors des Voiles de Saint-Tropez",credit:"ReqEngineer / Wikimedia Commons",license:"CC BY-SA 4.0",source:"https://commons.wikimedia.org/wiki/File:Voiles_de_Saint-Tropez_2007.jpg"},
  saintTropez:{src:commons("Yachts in dock at the old port of Saint-Tropez, France (52724054464).jpg"),alt:"Vieux port de Saint-Tropez",credit:"dronepicr / Wikimedia Commons",license:"CC BY 2.0",source:"https://commons.wikimedia.org/wiki/File:Yachts_in_dock_at_the_old_port_of_Saint-Tropez,_France_(52724054464).jpg"},
  lices:{src:commons("Place des Lices - Saint-Tropez 1.jpg"),alt:"Place des Lices à Saint-Tropez",credit:"Arnaud 25 / Wikimedia Commons",license:"CC BY-SA 4.0",source:"https://commons.wikimedia.org/wiki/File:Place_des_Lices_-_Saint-Tropez_1.jpg"},
  citadel:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aerial_view_of_the_Citadel_of_Saint-Tropez%2C_France_%2852723266272%29.jpg/1280px-Aerial_view_of_the_Citadel_of_Saint-Tropez%2C_France_%2852723266272%29.jpg",alt:"Citadelle de Saint-Tropez vue du ciel",credit:"dronepicr / Wikimedia Commons",license:"CC BY 2.0",source:"https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Citadel_of_Saint-Tropez,_France_(52723266272).jpg"},
  ramatuelle:{src:commons("Ramatuelle Panorama.jpg"),alt:"Ramatuelle",credit:"En-bateau / Wikimedia Commons",license:"CC BY-SA 3.0",source:"https://commons.wikimedia.org/wiki/File:Ramatuelle_Panorama.jpg"},
  sainteMaxime:{src:commons("11 Avenue Raoul Nordling, 83120 Sainte-Maxime, France - panoramio.jpg"),alt:"Sainte-Maxime",credit:"Wikimedia Commons / Panoramio archive",license:"CC BY",source:"https://commons.wikimedia.org/wiki/Category:Sainte-Maxime"},
  grimaud:{src:commons("Grimaud (Var).jpg"),alt:"Grimaud",credit:"Grimaud Tourisme / Wikimedia Commons",license:"CC BY-SA 4.0",source:"https://commons.wikimedia.org/wiki/File:Grimaud_(Var).jpg"},
  gassin:{src:commons("Rue à Gassin village.jpg"),alt:"Gassin",credit:"Office de tourisme de Gassin / Wikimedia Commons",license:"CC BY-SA 3.0",source:"https://commons.wikimedia.org/wiki/File:Rue_%C3%A0_Gassin_village.jpg"},
  plan:{src:commons("83120 Le Plan-de-la-Tour, France - panoramio.jpg"),alt:"Le Plan-de-la-Tour",credit:"Wikimedia Commons / Panoramio archive",license:"CC BY 3.0",source:"https://commons.wikimedia.org/wiki/Category:Le_Plan-de-la-Tour"},
  gigaro:{src:commons("Aerial view of Gigaro Beach in La Croix-Valmer, France (52723801211).jpg"),alt:"La Croix-Valmer et Gigaro",credit:"dronepicr / Wikimedia Commons",license:"CC BY 2.0",source:"https://commons.wikimedia.org/wiki/File:Aerial_view_of_Gigaro_Beach_in_La_Croix-Valmer,_France_(52723801211).jpg"},
  cavalaire:{src:commons("Aerial view of Cavalaire-sur-Mer, France (51694184027).jpg"),alt:"Cavalaire-sur-Mer",credit:"dronepicr / Wikimedia Commons",license:"CC BY 2.0",source:"https://commons.wikimedia.org/wiki/Category:Cavalaire-sur-Mer"},
  cogolin:{src:commons("Cogolin.jpg"),alt:"Cogolin vu depuis Grimaud",credit:"Net-breuer / Wikimedia Commons",license:"CC BY-SA 3.0",source:"https://commons.wikimedia.org/wiki/File:Cogolin.jpg"},
};

export function mediaForEvent(event:GolfeEvent):EventMedia{
  if(event.id==="voiles-2026" || event.category==="sailing") return media.voiles;
  if(event.location==="Ramatuelle") return media.ramatuelle;
  if(event.location==="Sainte-Maxime") return media.sainteMaxime;
  if(event.location==="Grimaud") return media.grimaud;
  if(event.location==="Gassin") return media.gassin;
  if(event.location==="Le Plan-de-la-Tour") return media.plan;
  if(event.location==="La Croix-Valmer") return media.gigaro;
  if(event.location==="Cavalaire-sur-Mer") return media.cavalaire;
  if(event.location==="Cogolin") return media.cogolin;
  if(event.id.includes("classic") || event.id.includes("braderie") || event.category==="local") return media.lices;
  if(event.category==="culture" || event.category==="music") return media.citadel;
  return media.saintTropez;
}
