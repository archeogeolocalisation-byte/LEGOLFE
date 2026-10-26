export type LocalFeedSource={format?:"rss"|"link";key:string;label:string;location:string;url:string;paths?:string[];publicHeadlines?:boolean;sourceUrl?:string};
export const localFeedSources:LocalFeedSource[]=[
 {key:'golfe-interco',label:'Communauté de communes',location:'Golfe de Saint-Tropez',url:'https://www.golfe-sainttropez.fr/feed/',paths:['/actualite/']},
 {key:'saint-tropez-news',label:'Ville de Saint-Tropez',location:'Saint-Tropez',url:'https://www.saint-tropez.fr/feed/'},
 {key:'sainte-maxime-news',label:'Ville de Sainte-Maxime',location:'Sainte-Maxime',url:'https://www.sainte-maxime.fr/feed/',paths:['/actualite/','/ma-ville/']},
 {key:'cogolin-news',label:'Ville de Cogolin',location:'Cogolin',url:'https://www.cogolin.fr/feed/',paths:['/la-mairie/actualites/'],publicHeadlines:false,sourceUrl:'https://www.cogolin.fr/'},
 {key:'la-mole-news',label:'Ville de La Mole',location:'La Mole',url:'https://www.lamole.fr/feed/',paths:['/actualites/'],publicHeadlines:false,sourceUrl:'https://www.lamole.fr/'},
 {key:'croix-valmer-tourisme-news',label:'La Croix-Valmer Tourisme',location:'La Croix-Valmer',url:'https://www.lacroixvalmertourisme.com/feed',paths:['/fr/'],publicHeadlines:false,sourceUrl:'https://www.lacroixvalmertourisme.com/'},
 {"key": "plan-de-la-tour-news", "label": "Ville du Plan-de-la-Tour", "location": "Le Plan-de-la-Tour", "url": "https://www.leplandelatour.fr/feed", "paths": ["/fr/"], "publicHeadlines": false, "sourceUrl": "https://www.leplandelatour.fr/fr/actualites"},
 {"key": "gassin-news", "label": "Mairie de Gassin", "location": "Gassin", "url": "https://www.mairie-gassin.fr/fr/actualites/feed/", "paths": ["/fr/actualites/"], "publicHeadlines": false, "sourceUrl": "https://www.mairie-gassin.fr/fr/actualites/"},
 {"key": "golfe-tourisme-news", "label": "Office de tourisme du Golfe", "location": "Golfe de Saint-Tropez", "url": "https://www.golfe-sainttropez-tourisme.fr/feed/", "paths": ["/blog/", "/decouvrir/"], "publicHeadlines": false, "sourceUrl": "https://www.golfe-sainttropez-tourisme.fr/decouvrir/"},
 {"key": "croix-valmer-ville-news", "label": "Ville de La Croix-Valmer", "location": "La Croix-Valmer", "url": "https://www.lacroixvalmer.fr/spip.php?page=backend_actu", "publicHeadlines": false, "sourceUrl": "https://www.lacroixvalmer.fr/Actualites"},
 {"key": "grimaud-ville-news", "label": "Mairie de Grimaud", "location": "Grimaud", "url": "https://www.mairie-grimaud.com/", "sourceUrl": "https://www.mairie-grimaud.com/", "format": "link", "publicHeadlines": false},
 {"key": "cavalaire-ville-news", "label": "Ville de Cavalaire", "location": "Cavalaire-sur-Mer", "url": "https://www.cavalaire.fr/actualites", "sourceUrl": "https://www.cavalaire.fr/actualites", "format": "link", "publicHeadlines": false},
 {"key": "ramatuelle-ville-news", "label": "Commune de Ramatuelle", "location": "Ramatuelle", "url": "https://www.ramatuelle.fr/", "sourceUrl": "https://www.ramatuelle.fr/", "format": "link", "publicHeadlines": false},
 {"key": "garde-freinet-ville-news", "label": "Mairie de La Garde-Freinet", "location": "La Garde-Freinet", "url": "https://www.lgf83.fr/", "sourceUrl": "https://www.lgf83.fr/", "format": "link", "publicHeadlines": false},
 {"key": "rayol-ville-news", "label": "Commune du Rayol-Canadel", "location": "Rayol-Canadel-sur-Mer", "url": "https://www.rayol-canadel.fr/fr/actualites.htm", "sourceUrl": "https://www.rayol-canadel.fr/fr/actualites.htm", "format": "link", "publicHeadlines": false},
];
