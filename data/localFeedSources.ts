export type LocalFeedSource={key:string;label:string;location:string;url:string;paths?:string[];publicHeadlines?:boolean;sourceUrl?:string};
export const localFeedSources:LocalFeedSource[]=[
 {key:'golfe-interco',label:'Communauté de communes',location:'Golfe de Saint-Tropez',url:'https://www.golfe-sainttropez.fr/feed/',paths:['/actualite/']},
 {key:'saint-tropez-news',label:'Ville de Saint-Tropez',location:'Saint-Tropez',url:'https://www.saint-tropez.fr/feed/'},
 {key:'sainte-maxime-news',label:'Ville de Sainte-Maxime',location:'Sainte-Maxime',url:'https://www.sainte-maxime.fr/feed/',paths:['/actualite/','/ma-ville/']},
 {key:'cogolin-news',label:'Ville de Cogolin',location:'Cogolin',url:'https://www.cogolin.fr/feed/',paths:['/la-mairie/actualites/'],publicHeadlines:false,sourceUrl:'https://www.cogolin.fr/'},
 {key:'la-mole-news',label:'Ville de La Mole',location:'La Mole',url:'https://www.lamole.fr/feed/',paths:['/actualites/'],publicHeadlines:false,sourceUrl:'https://www.lamole.fr/'},
 {key:'croix-valmer-tourisme-news',label:'La Croix-Valmer Tourisme',location:'La Croix-Valmer',url:'https://www.lacroixvalmertourisme.com/feed',paths:['/fr/'],publicHeadlines:false,sourceUrl:'https://www.lacroixvalmertourisme.com/'},
];
