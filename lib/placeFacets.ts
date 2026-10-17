import type {Place,PlaceCategory} from "../data/places";
import type {Locale} from "./i18n";

// A place keeps one editorial primary category and can have reviewed secondary uses.
// These links drive Explorer, page chips and LE GOLFE recommendations consistently.
const secondaryCategories:Record<string,readonly PlaceCategory[]>={
 "tour-horloge-cogolin":["places"],
 "eglise-saint-sauveur-cogolin":["places"],
 "chapelles-saint-roch-cogolin":["places"],
 "pergola-patec-rayol":["places"],

 "musee-annonciade-saint-tropez":["places"],
 "eglise-notre-dame-assomption-saint-tropez":["places"],
 "chapelle-sainte-anne-saint-tropez":["places"],
 "port-de-saint-tropez":["do"],

 "phare-de-camarat":["places"],
 "eglise-notre-dame-ramatuelle":["places"],
 "jardin-hardy-denonain-gassin":["places"],
 "porte-des-sarrazins-gassin":["places"],
 "eglise-notre-dame-assomption-gassin":["places"],

 "fort-freinet":["places"],
 "croix-des-maures":["places"],
 "conservatoire-patrimoine-freinet":["places"],
 "port-heraclea-cavalaire":["do"],
 "eglise-sainte-magdeleine-la-mole":["places"],
 "chateau-de-grimaud":["places"],
 "eglise-saint-michel-grimaud":["places"],
 "moulin-saint-roch-grimaud":["places"],
 "chapelle-des-penitents-grimaud":["places"],
 "tour-carree-sainte-maxime":["places"],
 "eglise-saint-martin-plan-de-la-tour":["places"],
 "byblos-beach":["beach"],"club-55":["eat"],"indie-beach":["eat"],"casita-pampelonne":["eat"],
 "gigaro-beach":["do"],"cap-taillat":["beach"],"pampelonne":["do"],
 "pont-des-fees":["places"],"moulin-de-paillas":["places"],
 "musee-gendarmerie-cinema":["places"],"maison-des-papillons":["places"],
 "caves-du-roy":[], "gaio-club":["eat"],"opera-saint-tropez":["party"],
 "base-nautique-cogolin":["do"]
};
export const placeFacetIds=["quiet","view","family","walk","heritage","nature","music","romantic","lunch","beachclub"] as const;
export type PlaceFacet=typeof placeFacetIds[number];
export const placeFacetLabels:Record<Locale,Record<PlaceFacet,string>>={
 fr:{quiet:"Au calme",view:"Belle vue",family:"En famille",walk:"Balade & randonnée",heritage:"Patrimoine",nature:"Nature",music:"Musique & soirées",romantic:"À deux",lunch:"Déjeuner",beachclub:"Clubs de plage"},
 en:{quiet:"Quiet",view:"Great view",family:"Family",walk:"Walks & hiking",heritage:"Heritage",nature:"Nature",music:"Music & nights out",romantic:"For two",lunch:"Lunch",beachclub:"Beach clubs"}
};
const editorialFacets:Record<string,readonly PlaceFacet[]>={
 "pampelonne":["beachclub"],"club-55":["beachclub","lunch"],"byblos-beach":["beachclub","lunch"],
 "indie-beach":["beachclub","lunch"],"casita-pampelonne":["beachclub","lunch"],
 "caves-du-roy":["music"],"gaio-club":["music"],"opera-saint-tropez":["music","lunch"],
 "pont-des-fees":["walk","heritage","nature"],
 "cap-taillat":["walk","nature","view"],"moulin-de-paillas":["heritage","view"],
 "gigaro-beach":["family","walk","nature"],
 "plan-de-la-tour-village":["quiet","walk","nature","view"]
};
const signals:Record<PlaceFacet,readonly string[]>={
 quiet:["quiet","calm","peaceful","tranquil","slow"],view:["view","views","sea-view","panorama","viewpoint","hilltop","belvedere"],
 family:["family","families","kids","children","child-friendly"],
 walk:["walk","walking","hike","hiking","trail","randonnee","sentier"],
 heritage:["heritage","history","historic","museum","monument","patrimoine","archaeology"],
 nature:["nature","forest","natural","woodland","countryside","botanical"],
 music:["music","live","concert","dj","dancing","nightclub"],
 romantic:["romantic","couple","intimate"],
 lunch:["lunch","dejeuner"],
 beachclub:["beach-club","beach club"]
};
function norm(v:string){return v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
export function categoriesForPlace(p:Place):PlaceCategory[]{return Array.from(new Set([p.category,...(secondaryCategories[p.id]??[])]));}
export function facetsForPlace(p:Place):PlaceFacet[]{
 // Only match explicit affirmative tags and best-for statements; never descriptions
 // or notIdealFor, which may contain negated characteristics.
 const tags=p.tags.map(norm),best=norm(p.bestFor.join(" "));
 return placeFacetIds.filter(f=>(editorialFacets[p.id]??[]).includes(f)||signals[f].some(signal=>tags.includes(signal)||new RegExp(`(^|[^a-z])${signal}([^a-z]|$)`).test(best)));
}
export function placeFilterTokens(p:Place):string[]{return [...categoriesForPlace(p),...facetsForPlace(p)];}
export function placeFacetMatch(p:Place,id:string):boolean{return placeFilterTokens(p).includes(id);}
