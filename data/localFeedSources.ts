export type LocalFeedSource={key:string;label:string;location:string;url:string;paths?:string[]};
export const localFeedSources:LocalFeedSource[]=[
 {key:'golfe-interco',label:'Communauté de communes',location:'Golfe de Saint-Tropez',url:'https://www.golfe-sainttropez.fr/feed/',paths:['/actualite/']},
 {key:'saint-tropez-news',label:'Ville de Saint-Tropez',location:'Saint-Tropez',url:'https://www.saint-tropez.fr/feed/'},
 {key:'sainte-maxime-news',label:'Ville de Sainte-Maxime',location:'Sainte-Maxime',url:'https://www.sainte-maxime.fr/feed/',paths:['/actualite/','/ma-ville/']},
];
