import type {Locale} from '../lib/i18n';

// First editorial model only. These are town selections, never proximity claims.
export type VillaEditorialModel={
 copy:Record<Locale,{title:string;intro:string;area:string;points:string[];reasons:{title:string;text:string}[];practical:{title:string;text:string}[]}>;
 places:{id:string;label:Record<Locale,string>}[];
};
export const villaEditorialModels:Record<string,VillaEditorialModel>={
 'villa-eden':{
  copy:{
   fr:{
    title:'Ramatuelle, entre piscine et horizons marins.',
    intro:'Prendre le temps à la maison, puis retrouver le village ou le littoral : Villa Eden imagine une semaine à Ramatuelle au rythme de chacun. Une présentation pour se projeter dans le Golfe, entre moments partagés et échappées provençales.',
    area:'Trois pistes pour découvrir Ramatuelle : le littoral de Pampelonne, les ruelles du village et le Moulin de Paillas sur les hauteurs. Choisissez selon vos envies et consultez chaque fiche pour préparer l’accès. Cette sélection se situe dans la commune ; elle ne décrit pas des lieux accessibles à pied depuis la maison.',
    points:['Vue mer','Piscine chauffée','Cadre calme'],
    reasons:[
     {title:'Un horizon pour ralentir',text:'La vue mer donne le ton de cette présentation. Elle invite à garder des moments sans programme, avant de décider de la prochaine sortie.'},
     {title:'Le plaisir de se retrouver',text:'Avec quatre chambres et une capacité de huit personnes, le modèle convient à une réflexion en famille ou entre amis. La répartition des lits reste à préciser avant d’envisager un séjour.'},
     {title:'Ramatuelle à son rythme',text:'Village, patrimoine et littoral composent des journées différentes. On choisit une idée de sortie à la fois, selon ses envies et les conditions du moment.'},
    ],
    practical:[
     {title:'Les chambres et les couchages',text:'Le modèle indique quatre chambres et quatre salles de bain. Types de lits, répartition par chambre, escaliers et éventuel équipement bébé ne sont pas renseignés.'},
     {title:'La piscine et les extérieurs',text:'Une piscine chauffée est mentionnée. Période de chauffe, température, dimensions et dispositif de sécurité ne sont pas précisés ; aucune protection particulière n’est garantie par cette fiche.'},
     {title:'Le tarif et la vie sur place',text:'Ménage, linge, taxe de séjour, dépôt de garantie, horaires d’arrivée et d’accès, animaux et conditions d’annulation ne sont pas renseignés dans cet exemple.'},
    ],
   },
   en:{
    title:'Ramatuelle, poolside pauses and sea horizons.',
    intro:'Take your time at home, then head to the village or the coast: Villa Eden imagines a week in Ramatuelle at your own pace. Picture a Golfe stay that brings together time with friends or family and outings in Provence.',
    area:'Three ways to discover Ramatuelle: Pampelonne’s shoreline, the village lanes and Moulin de Paillas on the hills. Choose around your interests and read each guide for access details. These are places in the same town, not destinations claimed to be within walking distance of the home.',
    points:['Sea view','Heated pool','Quiet setting'],
    reasons:[
     {title:'A horizon for slowing down',text:'The sea view sets the tone for this presentation. Leave room for a pause without plans before deciding on your next outing.'},
     {title:'Time together',text:'Four bedrooms and space for eight guests make this a model to consider with family or friends. The bed layout would still need to be confirmed before planning a stay.'},
     {title:'Ramatuelle at your pace',text:'Village lanes, heritage and the coast offer different ways to spend the day. Choose one outing at a time, around your interests and current conditions.'},
    ],
    practical:[
     {title:'Bedrooms and sleeping arrangements',text:'The model lists four bedrooms and four bathrooms. Bed types, room-by-room layout, stairs and any baby equipment are not specified.'},
     {title:'Pool and outdoor spaces',text:'A heated pool is mentioned. Heating dates, temperature, dimensions and the safety system are not specified; this listing guarantees no particular protection.'},
     {title:'Price and practical arrangements',text:'Cleaning, linen, tourist tax, security deposit, arrival and access times, pets and cancellation terms are not specified in this example.'},
    ],
   },
  },
  places:[
   {id:'pampelonne',label:{fr:'Côté plage',en:'By the sea'}},
   {id:'ramatuelle-village',label:{fr:'Côté village',en:'Village life'}},
   {id:'moulin-de-paillas',label:{fr:'Côté patrimoine',en:'Local heritage'}},
  ],
 },
};
