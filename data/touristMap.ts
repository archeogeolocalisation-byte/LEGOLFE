import type {Locale} from '../lib/i18n';
export type TouristMapPlace={id:string;name:string;shortName:string;latitude:number;longitude:number;labelOffset:[number,number];source:string;checked:string;path?:string;externalUrl?:string;illustration?:string;linkLabel?:Record<Locale,string>;copy:Record<Locale,{kicker:string;description:string}>};
export const touristMapPlaces:TouristMapPlace[] = [
  {
    "id": "cogolin",
    "name": "Cogolin",
    "shortName": "Cogolin",
    "latitude": 43.25,
    "longitude": 6.53659,
    "labelOffset": [
      -80.0,
      15.0
    ],
    "source": "https://www.openstreetmap.org/relation/1208367",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VILLAGE & SAVOIR-FAIRE",
        "description": "Un centre ancien, un marché et des traditions artisanales à découvrir."
      },
      "en": {
        "kicker": "VILLAGE & CRAFTS",
        "description": "An old centre, a market and local craft traditions to discover."
      }
    },
    "path": "/destinations/cogolin",
    "illustration": "/media/tourist-map/cogolin-illustration.webp"
  },
  {
    "id": "gassin",
    "name": "Gassin",
    "shortName": "Gassin",
    "latitude": 43.2291533,
    "longitude": 6.585476,
    "labelOffset": [
      12.0,
      -19.0
    ],
    "source": "https://www.openstreetmap.org/relation/970827",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VILLAGE PERCHÉ",
        "description": "Un village en hauteur pour regarder le Golfe et rejoindre les tables du centre."
      },
      "en": {
        "kicker": "HILLTOP VILLAGE",
        "description": "A village above the Golfe, with views and restaurants around its centre."
      }
    },
    "path": "/destinations/gassin",
    "illustration": "/media/tourist-map/gassin-illustration.webp"
  },
  {
    "id": "ramatuelle",
    "name": "Ramatuelle",
    "shortName": "Ramatuelle",
    "latitude": 43.215142,
    "longitude": 6.6128041,
    "labelOffset": [
      15.0,
      23.0
    ],
    "source": "https://www.openstreetmap.org/relation/970871",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VILLAGE & PLAGES",
        "description": "Les ruelles du village, puis le littoral de Pampelonne et de l’Escalet."
      },
      "en": {
        "kicker": "VILLAGE & BEACHES",
        "description": "Explore the village lanes, then the coast at Pampelonne and L’Escalet."
      }
    },
    "path": "/destinations/ramatuelle",
    "illustration": "/media/tourist-map/ramatuelle-illustration.webp"
  },
  {
    "id": "la-croix-valmer",
    "name": "La Croix-Valmer",
    "shortName": "La Croix-Valmer",
    "latitude": 43.208027,
    "longitude": 6.5676698,
    "labelOffset": [
      -100.0,
      22.0
    ],
    "source": "https://www.openstreetmap.org/relation/970875",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VIGNES & LITTORAL",
        "description": "Le village, les vignobles et les plages de Gigaro et du Débarquement."
      },
      "en": {
        "kicker": "VINEYARDS & COAST",
        "description": "The village, vineyards and beaches at Gigaro and Le Débarquement."
      }
    },
    "path": "/destinations/la-croix-valmer",
    "illustration": "/media/tourist-map/la-croix-valmer-illustration.webp"
  },
  {
    "id": "cavalaire-sur-mer",
    "name": "Cavalaire-sur-Mer",
    "shortName": "Cavalaire",
    "latitude": 43.1722952,
    "longitude": 6.531917,
    "labelOffset": [
      12.0,
      12.0
    ],
    "source": "https://www.openstreetmap.org/relation/971022",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "PORT & PLAGES",
        "description": "Le port et la grande plage, avec Bonporteau pour une autre ambiance."
      },
      "en": {
        "kicker": "HARBOUR & BEACHES",
        "description": "The harbour and main beach, with Bonporteau for a different setting."
      }
    },
    "path": "/destinations/cavalaire-sur-mer",
    "illustration": "/media/tourist-map/cavalaire-sur-mer-illustration.webp"
  },
  {
    "id": "rayol-canadel",
    "name": "Rayol-Canadel-sur-Mer",
    "shortName": "Rayol-Canadel",
    "latitude": 43.1591343,
    "longitude": 6.4705918,
    "labelOffset": [
      -45.0,
      17.0
    ],
    "source": "https://www.openstreetmap.org/relation/970873",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "JARDINS & MER",
        "description": "Le Domaine du Rayol et les plages au pied de la corniche."
      },
      "en": {
        "kicker": "GARDENS & SEA",
        "description": "Domaine du Rayol and beaches below the coastal road."
      }
    },
    "path": "/destinations/rayol-canadel",
    "illustration": "/media/tourist-map/rayol-canadel-illustration.webp"
  },
  {
    "id": "la-mole",
    "name": "La Môle",
    "shortName": "La Môle",
    "latitude": 43.207314,
    "longitude": 6.465301,
    "labelOffset": [
      -25.0,
      -20.0
    ],
    "source": "https://www.openstreetmap.org/relation/970876",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VALLÉE DES MAURES",
        "description": "Le village et les paysages boisés de l’intérieur du territoire."
      },
      "en": {
        "kicker": "MAURES VALLEY",
        "description": "A village and wooded landscapes in the inland part of the territory."
      }
    },
    "path": "/destinations/la-mole",
    "illustration": "/media/tourist-map/la-mole-illustration.webp"
  },
  {
    "id": "le-plan-de-la-tour",
    "name": "Le Plan-de-la-Tour",
    "shortName": "Le Plan-de-la-Tour",
    "latitude": 43.3384,
    "longitude": 6.54537,
    "labelOffset": [
      12.0,
      -12.0
    ],
    "source": "https://www.openstreetmap.org/relation/283726",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VILLAGE & COLLINES",
        "description": "Un village entre les collines et les hameaux, à l’écart du bord de mer."
      },
      "en": {
        "kicker": "VILLAGE & HILLS",
        "description": "A village among hills and hamlets, set back from the coast."
      }
    },
    "path": "/destinations/le-plan-de-la-tour",
    "illustration": "/media/tourist-map/le-plan-de-la-tour-illustration.webp"
  },
  {
    "id": "la-garde-freinet",
    "name": "La Garde-Freinet",
    "shortName": "La Garde-Freinet",
    "latitude": 43.3196859,
    "longitude": 6.4687979,
    "labelOffset": [
      -40.0,
      -25.0
    ],
    "source": "https://www.openstreetmap.org/relation/276305",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "AU CŒUR DES MAURES",
        "description": "Une étape dans les paysages de l’arrière-pays."
      },
      "en": {
        "kicker": "IN THE MAURES",
        "description": "An inland village within the wooded Maures landscape."
      }
    },
    "externalUrl": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/la-garde-freinet",
    "illustration": "/media/tourist-map/la-garde-freinet-illustration.webp"
  },
  {
    "id": "grimaud",
    "name": "Grimaud",
    "shortName": "Grimaud",
    "latitude": 43.274144,
    "longitude": 6.522187,
    "labelOffset": [
      -78.0,
      -28.0
    ],
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/centre-historique-de-grimaud-grimaud-fr-3032976/",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VILLAGE PERCHÉ",
        "description": "Les ruelles, l’église Saint-Michel et les ruines du château, au-dessus de la plaine."
      },
      "en": {
        "kicker": "HILLTOP VILLAGE",
        "description": "Explore the lanes, Saint-Michel church and castle ruins above the plain."
      }
    },
    "path": "/destinations/grimaud",
    "illustration": "/media/tourist-map/grimaud-illustration.webp"
  },
  {
    "id": "sainte-maxime",
    "name": "Sainte-Maxime",
    "shortName": "Sainte-Maxime",
    "latitude": 43.308997,
    "longitude": 6.638711,
    "labelOffset": [
      -72.0,
      -25.0
    ],
    "source": "https://www.sainte-maxime.com/profiter/commerces-et-services/office-de-tourisme-de-sainte-maxime-sainte-maxime-fr-6295644/",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "VILLE & LITTORAL",
        "description": "Le port, le vieux centre et les plages, sur la rive nord du Golfe."
      },
      "en": {
        "kicker": "TOWN & COAST",
        "description": "The harbour, old centre and beaches on the northern shore of the Golfe."
      }
    },
    "path": "/destinations/sainte-maxime",
    "illustration": "/media/tourist-map/sainte-maxime-illustration.webp"
  },
  {
    "id": "saint-tropez",
    "name": "Saint-Tropez",
    "shortName": "Saint-Tropez",
    "latitude": 43.269977,
    "longitude": 6.641176,
    "labelOffset": [
      17.0,
      -8.0
    ],
    "source": "https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "PORT & VILLAGE",
        "description": "Le vieux port, les ruelles et la Citadelle à découvrir à pied."
      },
      "en": {
        "kicker": "HARBOUR & VILLAGE",
        "description": "Explore the old harbour, village lanes and Citadelle on foot."
      }
    },
    "path": "/destinations/saint-tropez",
    "illustration": "/media/tourist-map/saint-tropez-illustration.webp"
  },
  {
    "id": "port-grimaud",
    "name": "Port Grimaud",
    "shortName": "Port Grimaud",
    "latitude": 43.27483,
    "longitude": 6.579514,
    "labelOffset": [
      13.0,
      -33.0
    ],
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/cite-lacustre-de-port-grimaud-grimaud-fr-3032930/",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "CITÉ LACUSTRE",
        "description": "Des canaux, des ponts et des maisons colorées au bord de l’eau."
      },
      "en": {
        "kicker": "CANAL TOWN",
        "description": "Canals, bridges and colourful houses beside the water."
      }
    },
    "path": "/place/port-grimaud",
    "illustration": "/media/tourist-map/port-grimaud-illustration.webp"
  },
  {
    "id": "la-nartelle",
    "name": "La Nartelle",
    "shortName": "La Nartelle",
    "latitude": 43.322622,
    "longitude": 6.664884,
    "labelOffset": [
      16.0,
      -10.0
    ],
    "source": "https://www.sainte-maxime.com/profiter/plage-de-la-nartelle-sainte-maxime-fr-6295716/",
    "checked": "2026-10-13",
    "copy": {
      "fr": {
        "kicker": "PLAGE · SAINTE-MAXIME",
        "description": "Une plage de sable à l’est du centre, le long de l’avenue du Général Touzet du Vigier."
      },
      "en": {
        "kicker": "BEACH · SAINTE-MAXIME",
        "description": "A sandy beach east of the centre, along Avenue du Général Touzet du Vigier."
      }
    },
    "path": "/place/sainte-maxime-village",
    "linkLabel": {
      "fr": "Voir la fiche de Sainte-Maxime",
      "en": "View the Sainte-Maxime guide"
    }
  }
];

// The grid lists communes only; Port Grimaud and La Nartelle remain map locations.
export const touristMapCommunes=touristMapPlaces.filter(place=>place.id!=="port-grimaud"&&place.id!=="la-nartelle");
