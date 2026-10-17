import {localFeedSources} from "./localFeedSources";

export type EditorialSource = {
  format?: "rss" | "rss-events";
  key: string;
  label: string;
  type: "event" | "news" | "both";
  location: string;
  url: string;
};

export const editorialSources: EditorialSource[] = [
  {key:'la-mole-agenda',label:'Ville de La Môle · agenda',type:'event',location:'La Môle',url:'https://www.lamole.fr/systeme/agenda/'},
  {key:'rayol-agenda',label:'Rayol-Canadel · manifestations',type:'event',location:'Rayol-Canadel-sur-Mer',url:'https://www.rayol-canadel.fr/fr/les-manifestations.htm'},
  {key:'garde-freinet-agenda',label:'La Garde-Freinet · agenda territorial',type:'event',location:'La Garde-Freinet',url:'https://www.golfe-saint-tropez-information.com/fr/animation/2?filter1856=31'},
  {key:'domaine-rayol-agenda',label:'Domaine du Rayol',type:'event',location:'Rayol-Canadel-sur-Mer',url:'https://www.domainedurayol.org/agenda-domaine-rayol/'},
  {key:'cogolin-agenda-rss',label:'Ville de Cogolin · flux Agenda',type:'event',format:'rss-events',location:'Cogolin',url:'https://www.cogolin.fr/agenda/feed/'},
  ...localFeedSources.map(source=>({...source,type:"news" as const,format:"rss" as const})),
  { key:"saint-tropez-tourisme", label:"Saint-Tropez Tourisme", type:"event", location:"Saint-Tropez", url:"https://www.sainttropeztourisme.com/fr/evenements-saint-tropez/agenda-evenements-saint-tropez/" },
  { key:"saint-tropez-ville", label:"Ville de Saint-Tropez", type:"both", location:"Saint-Tropez", url:"https://www.saint-tropez.fr/decouvrir/agenda/" },
  { key:"ramatuelle-tourisme", label:"Ramatuelle Tourisme", type:"event", location:"Ramatuelle", url:"https://www.ramatuelle-tourisme.com/fr/animation/" },
  { key:"sainte-maxime", label:"Sainte-Maxime Tourisme", type:"event", location:"Sainte-Maxime", url:"https://www.sainte-maxime.com/agenda/" },
  { key:"le-carre", label:"Le Carré Sainte-Maxime", type:"event", location:"Sainte-Maxime", url:"https://www.carre-sainte-maxime.fr/" },
  { key:"plan-de-la-tour", label:"Golfe de Saint-Tropez Tourisme · Le Plan-de-la-Tour", type:"event", location:"Le Plan-de-la-Tour", url:"https://www.golfe-sainttropez-tourisme.fr/agenda/" },
  { key:"grimaud", label:"Grimaud Tourisme", type:"event", location:"Grimaud", url:"https://www.grimaud-provence.com/preparez/agenda/tout-lagenda/" },
  { key:"gassin", label:"Gassin Tourisme", type:"event", location:"Gassin", url:"https://gassin.eu/fr/animations/" },
  { key:"cogolin", label:"Ville de Cogolin", type:"both", location:"Cogolin", url:"https://www.cogolin.fr/agenda/" },
  { key:"la-croix-valmer", label:"La Croix-Valmer Tourisme", type:"event", location:"La Croix-Valmer", url:"https://www.lacroixvalmertourisme.com/fr/sortir-se-divertir/evenements" },
  { key:"cavalaire", label:"Cavalaire Tourisme", type:"event", location:"Cavalaire-sur-Mer", url:"https://www.cavalairesurmer.fr/les-ingredients-du-bonheur/le-sens-de-la-fete/tout-lagenda/" },
];
