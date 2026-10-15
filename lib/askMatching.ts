import type {Place,PlaceCategory} from "../data/places";
import {placeDescriptionFr} from "../data/places";
import {destinations,destinationsForLocation} from "../data/destinations";
import {categoriesForPlace,facetsForPlace,type PlaceFacet,placeFacetLabels} from "./placeFacets";
import type {Locale} from "./i18n";

type IntentCategory=PlaceCategory;
export type AskIntent={
 categories:IntentCategory[];facets:PlaceFacet[];excludedCategories:IntentCategory[];
 town:string|null;explicitTown:boolean;maxPriceLevel:number|null;exactEuroBudget:boolean;
 mentionsDistance:boolean;mentionsTime:boolean;partySize:number|null;hasConstraints:boolean;
};
export type AskMatch={p:Place;s:number;reasons:string[];cautions:string[]};
const norm=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g,"'").trim();
const has=(s:string,terms:readonly string[])=>terms.some(t=>new RegExp(`(^|[^a-z0-9])${t}([^a-z0-9]|$)`,"i").test(s));
const contains=(s:string,terms:readonly string[])=>terms.some(t=>s.includes(t));
const lexCats:Partial<Record<IntentCategory,readonly string[]>>={
 eat:["restaurant","resto","dejeuner","diner","dinner","lunch","manger","table","brunch"],
 beach:["plage","plages","beach","baignade","nager","swim"],
 sea:["bateau","boat","catamaran","croisiere","cruise","voile","sailing"],
 party:["boite","club de nuit","discotheque","nightclub","fete","faire la fete","nightlife"],
 wellness:["spa","massage","bien etre","wellness"],
 services:["chauffeur","conciergerie","babysitter","driver"],
 places:["village","patrimoine","heritage","old town"]
};
const lexFacets:Partial<Record<PlaceFacet,readonly string[]>>={
 quiet:["calme","tranquille","quiet","peaceful","repos","sans bruit"],
 view:["belle vue","vue mer","panorama","sea view","with a view","view"],
 family:["enfant","enfants","famille","family","kids","children","bebe"],
 walk:["randonnee","randonnée","balade","marche","hiking","hike","walk","sentier"],
 nature:["nature","foret","forest","natural"],
 music:["musique","concert","live music","dj","danser","music"],
 romantic:["romantique","romantic","couple","en amoureux"],
 lunch:["dejeuner","lunch","midi"],
 beachclub:["beach club","club de plage","transat","sunbed"],
 heritage:["patrimoine","histoire","heritage","museum","musee"]
};
const budgetWords=["pas cher","petit budget","economique","abordable","sans se ruiner","budget serre","budget limite","low budget","affordable","cheap","budget friendly","inexpensive"];
const highPrice=["luxe","luxury","haut de gamme","gastronomique","fine dining"];
export function parseAskIntent(question:string):AskIntent{
 const q=norm(question).replace(/[-–]/g," ");
 const excludedCategories:IntentCategory[]=[];
 const wantsNoClubs=contains(q,["pas de boite","sans boite","pas de club","sans club","no club","no nightlife","sans fete","sans faire la fete"]);
 if(wantsNoClubs)excludedCategories.push("party");
 const categories=(Object.keys(lexCats) as IntentCategory[]).filter(k=>has(q,lexCats[k]??[]));
 // 'No nightclub' must not turn into a nightlife recommendation.
 if(wantsNoClubs){const i=categories.indexOf("party");if(i>=0)categories.splice(i,1);}
 const facets=(Object.keys(lexFacets) as PlaceFacet[]).filter(k=>has(q,lexFacets[k]??[]));
 if(has(q,["pas de marche","sans marche","no walking"])){const i=facets.indexOf("walk");if(i>=0)facets.splice(i,1);}
 let town:string|null=null,explicitTown=false;
 // Longest match first to avoid Saint-Tropez inside Golfe de Saint-Tropez.
 const ordered=[...destinations].sort((a,b)=>b.name.length-a.name.length);
 for(const d of ordered){
  const names=[norm(d.name),norm(d.slug.replace(/-/g," "))];
  if(names.some(name=>name.length>3&&has(q,[name]))){town=d.slug;explicitTown=true;break;}
 }
 const budget=contains(q,budgetWords);
 const exactEuroBudget=/\b\d+[\s\u00a0]*(?:€|euros?|eur)\b|(?:€|eur)\s*\d+/.test(q);
 const maxPriceLevel=budget?2:null;
 const mentionsDistance=/\b\d+\s*(?:km|kilometres?|miles?)\b/.test(q);
 const mentionsTime=/\b\d+\s*(?:minutes?|mins?|heures?|hours?)\b/.test(q);
 const partySizeMatch=q.match(/\b(?:pour|for|on est|we are|nous sommes)\s+(\d{1,2})\s*(?:personnes?|adults?|people|voyageurs?)?\b/);
 const partySize=partySizeMatch?Number(partySizeMatch[1]):null;
 return {categories,facets,excludedCategories,town,explicitTown,maxPriceLevel,exactEuroBudget,mentionsDistance,mentionsTime,partySize,hasConstraints:!!(categories.length||facets.length||excludedCategories.length||town||budget||exactEuroBudget||mentionsDistance||mentionsTime)};
}
function matchingTowns(place:Place){return destinationsForLocation(place.location).map(d=>d.slug);}
export function rankAskPlaces(question:string,items:readonly Place[],locale:Locale,max=4,strictPreferences=false,requestedCategories?:PlaceCategory[]){
 const intent=parseAskIntent(question);
 const requiredCats=requestedCategories??intent.categories;
 const q=norm(question);
 const stop=new Set(["dans","avec","pour","une","des","les","nous","vous","qui","near","with","from","over","want","avoir","sans","vers","quel","quelle","the","and","pas","est"]);
 const tokens=q.split(/[^a-z0-9]+/).filter(x=>x.length>=4&&!stop.has(x));
 const wantedTown=intent.town;
 const scored:AskMatch[]=items.flatMap(p=>{
  const cats=categoriesForPlace(p),facets=facetsForPlace(p);
  if(intent.excludedCategories.some(c=>cats.includes(c)))return [];
  // Children and peaceful outings are incompatible with nightlife listings.
  if((intent.facets.includes("family")||intent.facets.includes("quiet"))&&p.category==="party")return [];
  const inTown=!!wantedTown&&matchingTowns(p).includes(wantedTown);
  const categoryHits=requiredCats.filter(c=>cats.includes(c));
  const facetHits=intent.facets.filter(f=>facets.includes(f));
  const explicitNamed=norm(p.name).length>5&&q.includes(norm(p.name));
  const evidence=norm([p.name,p.location,p.description,placeDescriptionFr[p.id]||"",...p.tags,...p.bestFor].join(" "));
  const lexicalHits=tokens.filter(t=>evidence.includes(t)).length;
  if(intent.maxPriceLevel!==null&&p.priceLevel!==undefined&&p.priceLevel>intent.maxPriceLevel)return [];
  if(requiredCats.length&&categoryHits.length===0&&!explicitNamed)return [];
  if(strictPreferences&&facetHits.length<intent.facets.length)return [];
  if(!requiredCats.length&&intent.facets.length&&facetHits.length===0&&!explicitNamed)return [];
  if(wantedTown&&!inTown&&!explicitNamed)return [];
  let score=categoryHits.length*14+facetHits.length*11+lexicalHits*1.3+(inTown?12:0)+(explicitNamed?30:0)+(p.featured?0.5:0);
  if(intent.maxPriceLevel!==null&&p.priceLevel!==undefined)score+=3;
  if(intent.maxPriceLevel!==null&&p.priceLevel===undefined)score-=3;
  if(score<=0)return [];
  const reasons:string[]=[];
  if(inTown)reasons.push(locale==="fr"?"Dans la commune demandée":"In the requested town");
  for(const c of categoryHits.slice(0,1))reasons.push(locale==="fr"?({eat:"Table ou restaurant",beach:"Plage",sea:"Sortie en mer",do:"Activité",party:"Sortie nocturne",wellness:"Bien-être",places:"Découverte locale",services:"Service"} as Record<PlaceCategory,string>)[c]:({eat:"Restaurant",beach:"Beach",sea:"Boat outing",do:"Activity",party:"Nightlife",wellness:"Wellness",places:"Local discovery",services:"Service"} as Record<PlaceCategory,string>)[c]);
  for(const f of facetHits.slice(0,2))reasons.push(placeFacetLabels[locale][f]);
  if(intent.maxPriceLevel!==null&&p.priceLevel!==undefined)reasons.push(locale==="fr"?"Gamme tarifaire plutôt accessible":"Lower listed price range");
  if(explicitNamed)reasons.unshift(locale==="fr"?"Lieu cité dans votre demande":"Place named in your request");
  const cautions:string[]=[];
  if(requiredCats.length&&categoryHits.length&&intent.facets.some(f=>!facetHits.includes(f)))cautions.push(locale==="fr"?"Certaines envies ne sont pas documentées pour ce lieu":"Some requested preferences are not documented for this place");
  if(intent.maxPriceLevel!==null&&p.priceLevel===undefined)cautions.push(locale==="fr"?"Budget non renseigné pour cette adresse":"Price range unavailable for this place");
  if(intent.exactEuroBudget)cautions.push(locale==="fr"?"Tarifs réels non vérifiés":"Actual prices not verified");
  if(intent.mentionsDistance||intent.mentionsTime)cautions.push(locale==="fr"?"Distance et temps de trajet à confirmer":"Distance and travel time need checking");
  if(intent.partySize)cautions.push(locale==="fr"?"Capacité et réservation à confirmer":"Capacity and booking need checking");
  return [{p,s:score,reasons,cautions}];
 });
 scored.sort((a,b)=>b.s-a.s||a.p.name.localeCompare(b.p.name));
 return {intent,hits:scored.slice(0,max)};
}

/**
 * An editorial shortlist, NOT a timed itinerary. Each requested activity family
 * receives one different listing. No proximity, opening-time or availability claim.
 */
export function composeAskShortlist(question:string,items:readonly Place[],locale:Locale,strictPreferences=false){
 const intent=parseAskIntent(question);
 const priorities:PlaceCategory[]=["beach","sea","do","places","eat","wellness","party","services"];
 const requested=priorities.filter(c=>intent.categories.includes(c));
 if(requested.length<2)return [];
 const used=new Set<string>();
 const choices:{category:PlaceCategory;match:AskMatch}[]=[];
 for(const category of requested){
  const winner=rankAskPlaces(question,items.filter(p=>categoriesForPlace(p).includes(category)),locale,12,strictPreferences,[category]).hits.find(x=>!used.has(x.p.id));
  if(winner){used.add(winner.p.id);choices.push({category,match:winner});}
 }
 return choices;
}

export type AskDayPlan={
 format:"half"|"full";
 steps:{category:PlaceCategory;match:AskMatch;source:"requested"|"complementary"}[];
 notes:string[];
};
export function buildAskDayPlan(question:string,items:readonly Place[],locale:Locale,format:"half"|"full",strictPreferences=false):AskDayPlan|null{
 const intent=parseAskIntent(question);
 const requested=composeAskShortlist(question,items,locale,strictPreferences);
 // No "automatic day" for empty or purely geographic queries.
 if(!intent.categories.length||!requested.length)return null;
 const limit=format==="half"?2:3;
 const selected=[...requested.slice(0,limit)].map(x=>({...x,source:"requested" as const}));
 const used=new Set(selected.map(x=>x.match.p.id));
 // Only suggest food as a complementary stop when the visitor explicitly
 // asks for a day outing (not for a service, spa, nightlife or housing).
 const outdoor=intent.categories.some(x=>["beach","sea","do","places"].includes(x));
 const canAddFood=outdoor&&!intent.categories.includes("eat")&&!intent.excludedCategories.includes("eat")&&selected.length<limit;
 if(canAddFood){
  const next=rankAskPlaces(question,items.filter(p=>categoriesForPlace(p).includes("eat")),locale,12,strictPreferences,["eat"]).hits.find(x=>!used.has(x.p.id));
  if(next)selected.push({category:"eat",match:next,source:"complementary"});
 }
 if(selected.length<2)return null;
 const notes=locale==="fr"
  ? ["Proposition éditoriale sans horaires imposés : confirmez l’ouverture et les réservations.","L’ordre des étapes ne garantit pas un trajet optimisé ni une distance à pied."]
  : ["Editorial plan without fixed times: confirm opening hours and bookings.","The order of the stops is not an optimised route or a walking-distance promise."];
 if(intent.mentionsTime||intent.mentionsDistance)notes.push(locale==="fr"?"La limite de trajet demandée n’est pas vérifiée : contrôlez chaque déplacement.":"Your requested travel limit has not been verified: check each journey.");
 if(intent.exactEuroBudget||intent.maxPriceLevel!==null)notes.push(locale==="fr"?"Vérifiez les tarifs réels avant de réserver.":"Confirm actual prices before booking.");
 return {format,steps:selected,notes};
}
