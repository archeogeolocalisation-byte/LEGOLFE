import { villas } from "./villas";
export const distanceSelections = [
 {slug:"within-10-km",maxKm:10,fr:"Rester à proximité",en:"Stay close",introFr:"Une sélection resserrée pour garder Saint-Tropez comme repère du séjour. Regardez aussi la capacité de la maison et ses équipements : la distance seule ne suffit pas à choisir.",introEn:"A focused selection with Saint-Tropez as a reference point for your stay. Consider capacity and amenities too: distance alone does not determine the right house."},
 {slug:"within-20-km",maxKm:20,fr:"Comparer les villages",en:"Compare village bases",introFr:"Ce périmètre permet de comparer les maisons du catalogue à Gassin, Ramatuelle, Grimaud et La Croix-Valmer. Choisissez le village selon vos journées plage, vos repas et les personnes qui partagent le séjour.",introEn:"This range lets you compare the catalog’s houses in Gassin, Ramatuelle, Grimaud and La Croix-Valmer. Choose your base around beach days, meals and the people sharing your stay."},
 {slug:"within-30-km",maxKm:30,fr:"Élargir le séjour au Golfe",en:"Explore a wider area",introFr:"La sélection inclut aussi Sainte-Maxime. Ce périmètre élargit les possibilités du catalogue : comparez les équipements et le lieu de vie autant que la distance déclarée de Saint-Tropez.",introEn:"The selection also includes Sainte-Maxime. This range opens up more of the catalog: compare amenities and the setting as well as the listed distance from Saint-Tropez."},
] as const;
export function villasWithin(maxKm:number){return villas.filter(v=>Number.isFinite(v.saintTropezDistance) && v.saintTropezDistance>=0 && v.saintTropezDistance<=maxKm).sort((a,b)=>a.saintTropezDistance-b.saintTropezDistance);}
export function stayPaths(){return ["/stay",...distanceSelections.filter(s=>villasWithin(s.maxKm).length).map(s=>`/stay/${s.slug}`)];}
export const villaDescriptionEn:Record<string,string>={
 "villa-eden":"A contemporary villa with a heated pool, sea view and a base for exploring the beaches of Ramatuelle.",
 "villa-alba":"An elegant villa overlooking the bay of Saint-Tropez, suited to a quiet stay with family or friends.",
 "villa-azure":"A large family villa with a private garden and pool, close to the beaches.",
 "villa-celeste":"A property near Pampelonne with a large heated pool and panoramic views of the Mediterranean.",
 "villa-luna":"A bright villa with a pool and sea view, a base for exploring the beaches of Sainte-Maxime.",
 "villa-mistral":"A peaceful villa surrounded by greenery, with a heated pool and a base for exploring the coves of La Croix-Valmer.",
};
