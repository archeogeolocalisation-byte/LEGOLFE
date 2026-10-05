export type LocalMedia={src:string;alt:string;credit:string;license:string;source:string};
const commons=(name:string)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(name)}`;
const m={
  gigaro:{src:commons("Aerial view of Gigaro Beach in La Croix-Valmer, France (52723801211).jpg"),alt:"Plage de Gigaro à La Croix-Valmer",credit:"dronepicr / Wikimedia Commons",license:"CC BY 2.0",source:"https://commons.wikimedia.org/wiki/File:Aerial_view_of_Gigaro_Beach_in_La_Croix-Valmer,_France_(52723801211).jpg"},
  family:{src:commons("Ramatuelle Panorama.jpg"),alt:"Ramatuelle et les collines du Golfe",credit:"En-bateau / Wikimedia Commons",license:"CC BY-SA 3.0",source:"https://commons.wikimedia.org/wiki/File:Ramatuelle_Panorama.jpg"},
  lices:{src:commons("Place des Lices - Saint-Tropez 1.jpg"),alt:"Place des Lices à Saint-Tropez",credit:"Arnaud 25 / Wikimedia Commons",license:"CC BY-SA 4.0",source:"https://commons.wikimedia.org/wiki/File:Place_des_Lices_-_Saint-Tropez_1.jpg"},
  port:{src:commons("Yachts in dock at the old port of Saint-Tropez, France (52724054464).jpg"),alt:"Vieux port de Saint-Tropez",credit:"dronepicr / Wikimedia Commons",license:"CC BY 2.0",source:"https://commons.wikimedia.org/wiki/File:Yachts_in_dock_at_the_old_port_of_Saint-Tropez,_France_(52724054464).jpg"},
  citadel:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aerial_view_of_the_Citadel_of_Saint-Tropez%2C_France_%2852723266272%29.jpg/1280px-Aerial_view_of_the_Citadel_of_Saint-Tropez%2C_France_%2852723266272%29.jpg",alt:"Citadelle de Saint-Tropez",credit:"dronepicr / Wikimedia Commons",license:"CC BY 2.0",source:"https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Citadel_of_Saint-Tropez,_France_(52723266272).jpg"},
};
export function mediaForLocal(id:string):LocalMedia{
  if(id.includes("gigaro")) return m.gigaro;
  if(id.includes("family")) return m.family;
  if(id.includes("spar")) return m.lices;
  if(id.includes("citadelle")) return m.citadel;
  return m.port;
}
