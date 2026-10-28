import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {FactPhoto} from './placeFactsMedia';

export const newHikingPlaces:Place[] = [
  {
    "id": "randonnee-saint-clement",
    "name": "Randonnée de Saint-Clément",
    "category": "do",
    "location": "La Garde-Freinet",
    "description": "Plan the Saint-Clément hike in La Garde-Freinet: listed 4 km and 1 h 20, with a route map, elevation profile, GPX and access advice.",
    "bestFor": [
      "Walking in the Maures"
    ],
    "notIdealFor": [
      "An unplanned walk"
    ],
    "tags": [
      "hiking",
      "walk",
      "nature",
      "heritage"
    ],
    "goodToKnow": [
      "Check forest access and download the official route before leaving."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-saint-clement-4599435",
    "lastVerifiedAt": "2026-10-28"
  },
  {
    "id": "randonnee-moulin-adrech",
    "name": "Randonnée du moulin de l’Adrech",
    "category": "do",
    "location": "La Garde-Freinet",
    "description": "Plan the Moulin de l’Adrech hike in La Garde-Freinet: listed 3 km and 1 h, with a route map, elevation profile, GPX and access advice.",
    "bestFor": [
      "Walking in the Maures"
    ],
    "notIdealFor": [
      "An unplanned walk"
    ],
    "tags": [
      "hiking",
      "walk",
      "nature",
      "heritage"
    ],
    "goodToKnow": [
      "Check forest access and download the official route before leaving."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-le-moulin-de-l-adrech-4948052",
    "lastVerifiedAt": "2026-10-28"
  },
  {
    "id": "randonnee-miremer",
    "name": "Randonnée vers Notre-Dame de Miremer",
    "category": "do",
    "location": "La Garde-Freinet",
    "description": "Plan the Notre-Dame de Miremer hike in La Garde-Freinet: listed 9.7 km and 3 h, with a route map, elevation profile, GPX and access advice.",
    "bestFor": [
      "Walking in the Maures"
    ],
    "notIdealFor": [
      "An unplanned walk"
    ],
    "tags": [
      "hiking",
      "walk",
      "nature",
      "heritage"
    ],
    "goodToKnow": [
      "Check forest access and download the official route before leaving."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-notre-dame-de-miremer-4598561",
    "lastVerifiedAt": "2026-10-28"
  }
];

export const newHikingFacts:Record<string,PlaceFacts> = {
  "randonnee-saint-clement": {
    "verified": "2026-10-28",
    "sources": [
      {
        "label": "Office du Golfe · Saint-Clément",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-saint-clement-4599435"
      },
      {
        "label": "Office du Golfe · Topoguide officiel (PDF)",
        "url": "https://static.apidae-tourisme.com/filestore/objets-touristiques/documents/44/138/18582060/2023CCGST_FicheRando2FR.pdf"
      },
      {
        "label": "Préfecture du Var · Carte d’accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      },
      {
        "label": "IGN · Altitudes de terrain RGE ALTI",
        "url": "https://cartes.gouv.fr/aide/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/calcul-altimetrique/"
      }
    ],
    "nearby": [
      "fort-freinet",
      "croix-des-maures",
      "conservatoire-patrimoine-freinet"
    ],
    "copy": {
      "fr": {
        "title": "Randonnée de Saint-Clément : parcours et accès à La Garde-Freinet",
        "description": "Préparez la randonnée Saint-Clément à La Garde-Freinet : 4 km, 1 h 20 annoncées, carte du parcours, profil de relief, GPX et conseils d’accès.",
        "intro": "Une boucle de campagne pour découvrir la plaine Saint-Clément, entre châtaigniers, vignes et prés. Une sortie courte à garder indépendante du parcours de Peygros.",
        "facts": [
          [
            "Distance publiée",
            "4 km"
          ],
          [
            "Durée publiée",
            "1 h 20"
          ],
          [
            "Niveau",
            "Facile · portions routières"
          ],
          [
            "Dénivelé source",
            "+245 m annoncés"
          ],
          [
            "Balisage",
            "Jaune"
          ]
        ],
        "sections": [
          [
            "Départ au village",
            "L’office indique un départ près de la chapelle Saint-Jean et du parking des Teilles. Repérez le balisage jaune avant de quitter les rues du village."
          ],
          [
            "La plaine Saint-Clément",
            "Le parcours descend vers la chapelle Saint-Clément, puis rejoint les Seignerolles. Le retour passe par le secteur du Défend. Consultez le topoguide pour les embranchements."
          ],
          [
            "Une sortie courte, avec du relief",
            "La fiche de l’office annonce 4 km et 1 h 20. Ajoutez les pauses et choisissez des chaussures adaptées. Le tracé GPX fourni mesure environ 4,20 km."
          ],
          [
            "Avant de choisir le jour",
            "Notre conseil : téléchargez le parcours avant de partir et vérifiez les restrictions d’accès aux massifs. Aux croisements routiers, regroupez les enfants et prenez le temps de traverser."
          ]
        ],
        "questions": [
          [
            "Où commence le tracé ?",
            "À proximité de l’office de tourisme, chapelle Saint-Jean. Le repère du GPX ne garantit pas une place de stationnement."
          ],
          [
            "Le relief vient-il d’un relevé GPS ?",
            "Non. Les coordonnées du parcours viennent de l’office ; les altitudes du profil ont été calculées avec le modèle de terrain IGN RGE ALTI."
          ]
        ]
      },
      "en": {
        "title": "Saint-Clément hike: route and access in La Garde-Freinet",
        "description": "Plan the Saint-Clément hike in La Garde-Freinet: listed 4 km and 1 h 20, with a route map, elevation profile, GPX and access advice.",
        "intro": "A countryside loop through the Saint-Clément plain, between chestnut trees, vineyards and meadows. Keep this shorter outing separate from the Peygros circuit.",
        "facts": [
          [
            "Published distance",
            "4 km"
          ],
          [
            "Published time",
            "1 h 20"
          ],
          [
            "Difficulty",
            "Easy · road sections"
          ],
          [
            "Listed ascent",
            "+245 m listed"
          ],
          [
            "Waymarks",
            "Yellow"
          ]
        ],
        "sections": [
          [
            "Start in the village",
            "The office lists the start near Chapelle Saint-Jean and Les Teilles car park. Locate yellow waymarks before leaving the village streets."
          ],
          [
            "The Saint-Clément plain",
            "The route descends towards Saint-Clément chapel and continues to Les Seignerolles. The return uses the Défend area. Use the guidebook at junctions."
          ],
          [
            "A short walk with changing gradients",
            "The office lists 4 km and 1 h 20. Add breaks and wear suitable shoes. Its supplied GPX measures around 4.20 km."
          ],
          [
            "Before choosing a day",
            "Our advice: download the route and check forest restrictions before leaving. At road crossings, keep children close and take your time."
          ]
        ],
        "questions": [
          [
            "Where does the track start?",
            "Near the tourist office at Chapelle Saint-Jean. The GPX marker does not guarantee parking."
          ],
          [
            "Are the elevations field GPS measurements?",
            "No. The route coordinates come from the tourist office; profile elevations use IGN RGE ALTI terrain data."
          ]
        ]
      }
    }
  },
  "randonnee-moulin-adrech": {
    "verified": "2026-10-28",
    "sources": [
      {
        "label": "Office du Golfe · Moulin de l’Adrech",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-le-moulin-de-l-adrech-4948052"
      },
      {
        "label": "Office du Golfe · Topoguide officiel (PDF)",
        "url": "https://static.apidae-tourisme.com/filestore/objets-touristiques/documents/111/120/39155823/393-FICHE%20RANDO%20LGF%2010-Fr-v3.pdf"
      },
      {
        "label": "Préfecture du Var · Carte d’accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      },
      {
        "label": "IGN · Altitudes de terrain RGE ALTI",
        "url": "https://cartes.gouv.fr/aide/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/calcul-altimetrique/"
      }
    ],
    "nearby": [
      "fort-freinet",
      "croix-des-maures",
      "conservatoire-patrimoine-freinet"
    ],
    "copy": {
      "fr": {
        "title": "Randonnée du moulin de l’Adrech : parcours et accès à La Garde-Freinet",
        "description": "Préparez la randonnée Moulin de l’Adrech à La Garde-Freinet : 3 km, 1 h annoncées, carte du parcours, profil de relief, GPX et conseils d’accès.",
        "intro": "Une petite randonnée vers le moulin restauré et la crête au-dessus du village. Le patrimoine donne un but à la montée ; les vues invitent à prolonger la pause.",
        "facts": [
          [
            "Distance publiée",
            "3 km"
          ],
          [
            "Durée publiée",
            "1 h"
          ],
          [
            "Niveau",
            "Modérée · montée vers la crête"
          ],
          [
            "Dénivelé source",
            "+100 m annoncés"
          ],
          [
            "Balisage",
            "Jaune"
          ]
        ],
        "sections": [
          [
            "Rejoindre le départ",
            "Le départ indiqué se trouve à l’office de tourisme, chapelle Saint-Jean. Le GPX commence à proximité. Organisez votre stationnement au village avant de suivre le chemin de l’Adrech."
          ],
          [
            "Monter au moulin",
            "Le topoguide rejoint la forêt puis un sentier en lacets jusqu’à la crête. Le moulin, restauré en 2024, constitue le repère principal de cette sortie."
          ],
          [
            "Préparer le retour",
            "La boucle revient par le secteur du chemin des Deux Moulins et du Défend. Le descriptif signale environ 30 m sur la RD 75 : attention aux véhicules."
          ],
          [
            "Distance publiée et trace",
            "L’office annonce 3 km et 1 h ; son GPX mesure environ 2,58 km. L’écart est indiqué ici sans prolonger artificiellement le tracé. Ajoutez votre pause au moulin au temps prévu."
          ]
        ],
        "questions": [
          [
            "Où commence le tracé ?",
            "À proximité de l’office de tourisme, chapelle Saint-Jean. Le repère du GPX ne garantit pas une place de stationnement."
          ],
          [
            "Le relief vient-il d’un relevé GPS ?",
            "Non. Les coordonnées du parcours viennent de l’office ; les altitudes du profil ont été calculées avec le modèle de terrain IGN RGE ALTI."
          ]
        ]
      },
      "en": {
        "title": "Moulin de l’Adrech hike: route and access in La Garde-Freinet",
        "description": "Plan the Moulin de l’Adrech hike in La Garde-Freinet: listed 3 km and 1 h, with a route map, elevation profile, GPX and access advice.",
        "intro": "A shorter hike to the restored windmill and the ridge above the village. Heritage gives the climb a destination, and the views invite a longer pause.",
        "facts": [
          [
            "Published distance",
            "3 km"
          ],
          [
            "Published time",
            "1 h"
          ],
          [
            "Difficulty",
            "Moderate · climb to the ridge"
          ],
          [
            "Listed ascent",
            "+100 m listed"
          ],
          [
            "Waymarks",
            "Yellow"
          ]
        ],
        "sections": [
          [
            "Find the start",
            "The listed start is the tourist office at Chapelle Saint-Jean. The GPX begins nearby. Arrange parking in the village before following Chemin de l’Adrech."
          ],
          [
            "Climb to the windmill",
            "The guidebook enters woodland, then follows a winding path to the ridge. The windmill, restored in 2024, is the outing’s main landmark."
          ],
          [
            "Prepare the return",
            "The loop returns via the Deux Moulins and Défend area. The directions include around 30 metres on the D75: watch for traffic."
          ],
          [
            "Published distance and track",
            "The office lists 3 km and 1 h; its GPX measures around 2.58 km. The difference is disclosed without artificially extending the track. Add time for your windmill stop."
          ]
        ],
        "questions": [
          [
            "Where does the track start?",
            "Near the tourist office at Chapelle Saint-Jean. The GPX marker does not guarantee parking."
          ],
          [
            "Are the elevations field GPS measurements?",
            "No. The route coordinates come from the tourist office; profile elevations use IGN RGE ALTI terrain data."
          ]
        ]
      }
    }
  },
  "randonnee-miremer": {
    "verified": "2026-10-28",
    "sources": [
      {
        "label": "Office du Golfe · Notre-Dame de Miremer",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-notre-dame-de-miremer-4598561"
      },
      {
        "label": "Office du Golfe · Topoguide officiel (PDF)",
        "url": "https://static.apidae-tourisme.com/filestore/objets-touristiques/documents/127/120/39155839/393-FICHE%20RANDO%20LGF%203-FR-v2.pdf"
      },
      {
        "label": "Préfecture du Var · Carte d’accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      },
      {
        "label": "IGN · Altitudes de terrain RGE ALTI",
        "url": "https://cartes.gouv.fr/aide/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/calcul-altimetrique/"
      }
    ],
    "nearby": [
      "chapelle-notre-dame-miremer",
      "fort-freinet",
      "croix-des-maures",
      "conservatoire-patrimoine-freinet"
    ],
    "copy": {
      "fr": {
        "title": "Randonnée vers Notre-Dame de Miremer : parcours et accès à La Garde-Freinet",
        "description": "Préparez la randonnée Notre-Dame de Miremer à La Garde-Freinet : 9,7 km, 3 h annoncées, carte du parcours, profil de relief, GPX et conseils d’accès.",
        "intro": "Une vraie demi-journée de marche vers la colline de Miremer, sa chapelle et les figuiers en terrasse. Cette fiche décrit le parcours depuis le village, distinct de la visite patrimoniale du site.",
        "facts": [
          [
            "Distance publiée",
            "9,7 km"
          ],
          [
            "Durée publiée",
            "3 h"
          ],
          [
            "Niveau",
            "Modérée · randonnée de demi-journée"
          ],
          [
            "Dénivelé source",
            "+280 m annoncés"
          ],
          [
            "Balisage",
            "Jaune"
          ]
        ],
        "sections": [
          [
            "Une randonnée depuis le village",
            "Le topoguide part de l’office de tourisme ; le parking des Teilles est mentionné pour le stationnement. Prévoyez le temps du retour avant d’entamer le chemin du Refren."
          ],
          [
            "La montée vers Miremer",
            "Après la traversée prudente de la RD 558, le parcours rejoint le secteur du Val d’Aubert puis le sentier de la chapelle. Le panorama et les figuiers sont les repères de la pause."
          ],
          [
            "Revenir selon le circuit officiel",
            "Le retour redescend par une large piste puis retrouve l’itinéraire de départ. Suivez le topoguide aux bifurcations : le passage près de la départementale demande de l’attention."
          ],
          [
            "Garder une marge pour la journée",
            "L’office annonce 9,7 km et 3 h ; le GPX mesure environ 9,16 km. Notre conseil : ajoutez les pauses, emportez de l’eau et consultez la carte d’accès aux massifs le jour même."
          ]
        ],
        "questions": [
          [
            "Où commence le tracé ?",
            "À proximité de l’office de tourisme, chapelle Saint-Jean. Le repère du GPX ne garantit pas une place de stationnement."
          ],
          [
            "Le relief vient-il d’un relevé GPS ?",
            "Non. Les coordonnées du parcours viennent de l’office ; les altitudes du profil ont été calculées avec le modèle de terrain IGN RGE ALTI."
          ]
        ]
      },
      "en": {
        "title": "Notre-Dame de Miremer hike: route and access in La Garde-Freinet",
        "description": "Plan the Notre-Dame de Miremer hike in La Garde-Freinet: listed 9.7 km and 3 h, with a route map, elevation profile, GPX and access advice.",
        "intro": "A half-day walk to Miremer hill, its chapel and terraced fig trees. This page covers the route from the village, separately from the heritage visit to the site.",
        "facts": [
          [
            "Published distance",
            "9.7 km"
          ],
          [
            "Published time",
            "3 h"
          ],
          [
            "Difficulty",
            "Moderate · half-day hike"
          ],
          [
            "Listed ascent",
            "+280 m listed"
          ],
          [
            "Waymarks",
            "Yellow"
          ]
        ],
        "sections": [
          [
            "A hike from the village",
            "The guidebook starts at the tourist office and mentions Les Teilles for parking. Allow time to return before taking Chemin du Refren."
          ],
          [
            "The ascent to Miremer",
            "After carefully crossing the D558, the route reaches the Val d’Aubert area and the chapel path. The views and fig trees give the break its setting."
          ],
          [
            "Return on the official route",
            "The return descends on a wider track before rejoining the outward approach. Follow the guidebook at junctions and take care near the main road."
          ],
          [
            "Leave a margin for the day",
            "The office lists 9.7 km and 3 h; the GPX measures around 9.16 km. Our advice: allow breaks, bring water and check the forest access map on the day."
          ]
        ],
        "questions": [
          [
            "Where does the track start?",
            "Near the tourist office at Chapelle Saint-Jean. The GPX marker does not guarantee parking."
          ],
          [
            "Are the elevations field GPS measurements?",
            "No. The route coordinates come from the tourist office; profile elevations use IGN RGE ALTI terrain data."
          ]
        ]
      }
    }
  }
};

export const newHikingMapPoints:Record<string,MapPoint[]> = {
  "randonnee-saint-clement": [
    {
      "id": "saint-clement-start",
      "label": {
        "fr": "Départ du GPX · Saint-Clément",
        "en": "GPX start · Saint-Clément"
      },
      "latitude": 43.31783603,
      "longitude": 6.469797044,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-saint-clement-4599435",
      "checked": "2026-10-28",
      "kind": "area",
      "note": {
        "fr": "Premier point du tracé officiel, pas un parking garanti.",
        "en": "First official track point, not guaranteed parking."
      }
    }
  ],
  "randonnee-moulin-adrech": [
    {
      "id": "moulin-adrech-start",
      "label": {
        "fr": "Départ du GPX · Moulin de l’Adrech",
        "en": "GPX start · Moulin de l’Adrech"
      },
      "latitude": 43.317828738,
      "longitude": 6.469830642,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-le-moulin-de-l-adrech-4948052",
      "checked": "2026-10-28",
      "kind": "area",
      "note": {
        "fr": "Premier point du tracé officiel, pas un parking garanti.",
        "en": "First official track point, not guaranteed parking."
      }
    }
  ],
  "randonnee-miremer": [
    {
      "id": "miremer-start",
      "label": {
        "fr": "Départ du GPX · Notre-Dame de Miremer",
        "en": "GPX start · Notre-Dame de Miremer"
      },
      "latitude": 43.31783491,
      "longitude": 6.469826328,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-notre-dame-de-miremer-4598561",
      "checked": "2026-10-28",
      "kind": "area",
      "note": {
        "fr": "Premier point du tracé officiel, pas un parking garanti.",
        "en": "First official track point, not guaranteed parking."
      }
    }
  ]
};

export const newHikingMedia:Record<string,FactPhoto> = {
  "randonnee-saint-clement": {
    "src": "/media/trails/saint-clement-overview.svg",
    "alt": "Schéma du tracé Saint-Clément",
    "caption": {
      "fr": "Schéma du parcours · géométrie du GPX officiel, sans fond cartographique",
      "en": "Route diagram · official GPX geometry, without a basemap"
    },
    "credit": "LE GOLFE · Office du Golfe",
    "license": "",
    "licenseUrl": "",
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-saint-clement-4599435",
    "width": 1200,
    "height": 800,
    "diagram": true
  },
  "randonnee-moulin-adrech": {
    "src": "/media/trails/moulin-adrech-overview.svg",
    "alt": "Schéma du tracé Moulin de l’Adrech",
    "caption": {
      "fr": "Schéma du parcours · géométrie du GPX officiel, sans fond cartographique",
      "en": "Route diagram · official GPX geometry, without a basemap"
    },
    "credit": "LE GOLFE · Office du Golfe",
    "license": "",
    "licenseUrl": "",
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-le-moulin-de-l-adrech-4948052",
    "width": 1200,
    "height": 800,
    "diagram": true
  },
  "randonnee-miremer": {
    "src": "/media/trails/miremer-overview.svg",
    "alt": "Schéma du tracé Notre-Dame de Miremer",
    "caption": {
      "fr": "Schéma du parcours · géométrie du GPX officiel, sans fond cartographique",
      "en": "Route diagram · official GPX geometry, without a basemap"
    },
    "credit": "LE GOLFE · Office du Golfe",
    "license": "",
    "licenseUrl": "",
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-notre-dame-de-miremer-4598561",
    "width": 1200,
    "height": 800,
    "diagram": true
  }
};

export const newHikingSignatures = {
  "randonnee-saint-clement": {
    "fr": {
      "subtitle": "SAINT-CLÉMENT.",
      "quote": "LA MARCHE DONNE LE TEMPS DE REGARDER.",
      "rhythm": "UN DÉPART. UN PARCOURS. LE TEMPS DES PAUSES.",
      "dark": "PRÉPARER LA MARCHE AVANT DE PARTIR.",
      "close": "LES REPÈRES DU PARCOURS."
    },
    "en": {
      "subtitle": "SAINT-CLÉMENT.",
      "quote": "WALKING LEAVES TIME TO LOOK AROUND.",
      "rhythm": "A START. A ROUTE. TIME FOR BREAKS.",
      "dark": "PLAN YOUR WALK BEFORE SETTING OFF.",
      "close": "YOUR ROUTE DETAILS."
    }
  },
  "randonnee-moulin-adrech": {
    "fr": {
      "subtitle": "MOULIN DE L’ADRECH.",
      "quote": "LA MARCHE DONNE LE TEMPS DE REGARDER.",
      "rhythm": "UN DÉPART. UN PARCOURS. LE TEMPS DES PAUSES.",
      "dark": "PRÉPARER LA MARCHE AVANT DE PARTIR.",
      "close": "LES REPÈRES DU PARCOURS."
    },
    "en": {
      "subtitle": "MOULIN DE L’ADRECH.",
      "quote": "WALKING LEAVES TIME TO LOOK AROUND.",
      "rhythm": "A START. A ROUTE. TIME FOR BREAKS.",
      "dark": "PLAN YOUR WALK BEFORE SETTING OFF.",
      "close": "YOUR ROUTE DETAILS."
    }
  },
  "randonnee-miremer": {
    "fr": {
      "subtitle": "NOTRE-DAME DE MIREMER.",
      "quote": "LA MARCHE DONNE LE TEMPS DE REGARDER.",
      "rhythm": "UN DÉPART. UN PARCOURS. LE TEMPS DES PAUSES.",
      "dark": "PRÉPARER LA MARCHE AVANT DE PARTIR.",
      "close": "LES REPÈRES DU PARCOURS."
    },
    "en": {
      "subtitle": "NOTRE-DAME DE MIREMER.",
      "quote": "WALKING LEAVES TIME TO LOOK AROUND.",
      "rhythm": "A START. A ROUTE. TIME FOR BREAKS.",
      "dark": "PLAN YOUR WALK BEFORE SETTING OFF.",
      "close": "YOUR ROUTE DETAILS."
    }
  }
};
