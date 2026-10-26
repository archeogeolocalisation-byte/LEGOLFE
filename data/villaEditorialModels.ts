import type {Locale} from '../lib/i18n';

// First editorial model only. These are town selections, never proximity claims.
export const villaEditorialModels:Record<string,{
 copy:Record<Locale,{title:string;intro:string;area:string;points:string[]}>;
 places:{id:string;label:Record<Locale,string>}[];
}>={
 'villa-eden':{
  copy:{
   fr:{
    title:'Ramatuelle, entre piscine et horizons marins.',
    intro:'À Ramatuelle, cette maison associe une vue mer, une piscine chauffée et quatre chambres. L’idée du séjour : garder des moments au bord de l’eau à la maison, puis choisir une escapade vers le village ou le littoral. Un point de départ pour imaginer des journées qui alternent pauses et découvertes.',
    area:'Trois pistes pour découvrir Ramatuelle : le littoral de Pampelonne, les ruelles du village et le Moulin de Paillas sur les hauteurs. Choisissez selon vos envies et consultez chaque fiche pour préparer l’accès. Cette sélection se situe dans la commune ; elle ne décrit pas des lieux accessibles à pied depuis la maison.',
    points:['Vue mer','Piscine chauffée','Cadre calme'],
   },
   en:{
    title:'Ramatuelle, poolside pauses and sea horizons.',
    intro:'A sea view, heated pool and four bedrooms define this home in Ramatuelle. Picture time by the water at home, followed by an outing to the village or the coast. A starting point for days that alternate quiet pauses with local discoveries.',
    area:'Three ways to discover Ramatuelle: Pampelonne’s shoreline, the village lanes and Moulin de Paillas on the hills. Choose around your interests and read each guide for access details. These are places in the same town, not destinations claimed to be within walking distance of the home.',
    points:['Sea view','Heated pool','Quiet setting'],
   },
  },
  places:[
   {id:'pampelonne',label:{fr:'Côté plage',en:'By the sea'}},
   {id:'ramatuelle-village',label:{fr:'Côté village',en:'Village life'}},
   {id:'moulin-de-paillas',label:{fr:'Côté patrimoine',en:'Local heritage'}},
  ],
 },
};
