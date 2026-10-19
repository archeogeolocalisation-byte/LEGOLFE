export const cinemas = [
 {id:'pagnol',name:'Cinéma Le Pagnol',town:'Sainte-Maxime',url:'https://cinemapagnol-stemaxime.com/FR/43/horaires-cinema-le-pagnol-sainte-maxime.html',address:'107 route du Plan-de-la-Tour',postalCode:'83120',imported:true},
 {id:'raimu',name:'Cinéma Raimu',town:'Cogolin',url:'https://www.cineode.fr/le-raimu/seances/',address:'18 avenue Georges-Clemenceau',postalCode:'83310',imported:true},
 {id:'miramar',name:'Cinéma Studio Miramar',town:'Cavalaire-sur-Mer',url:'https://cinema-cavalaire.fr/a-laffiche/seances.html',address:'Maison de la Mer',postalCode:'83240',imported:true},
 {id:'star',name:'Cinéma Star',town:'Saint-Tropez',url:'https://www.saint-tropez.fr/culture/cinemas/',address:'3 traverse de la Gendarmerie',postalCode:'83990',imported:false},
] as const;
export type Cinema = typeof cinemas[number];
