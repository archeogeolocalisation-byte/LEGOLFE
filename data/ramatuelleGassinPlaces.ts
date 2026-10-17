import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {VillagePhoto} from './villageMedia';

export const ramatuelleGassinPlaces:Place[] = [
  {
    "id": "phare-de-camarat",
    "name": "Phare de Camarat",
    "category": "do",
    "location": "Ramatuelle",
    "description": "Visit Camarat lighthouse in Ramatuelle: official booking, shuttle from the stadium, museum and coastal views. Plan your arrival and the tower climb.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned admission"
    ],
    "tags": [
      "heritage",
      "history",
      "view",
      "nature"
    ],
    "goodToKnow": [
      "Book the official lighthouse visit and follow the shuttle instructions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/ramatuelle/le-phare-du-cap-camarat-4877728",
    "lastVerifiedAt": "2026-10-17",
    "bookingUrl": "https://www.ramatuelle-tourisme.com/fr/phare/",
    "website": "https://www.ramatuelle-tourisme.com/fr/phare/"
  },
  {
    "id": "plage-de-bonne-terrasse",
    "name": "Plage de Bonne Terrasse",
    "category": "beach",
    "location": "Ramatuelle",
    "description": "Discover Bonne Terrasse in Ramatuelle: a sandy bay south of Pampelonne, fishing heritage and practical access advice for planning a day beside the water.",
    "bestFor": [
      "A coastal pause"
    ],
    "notIdealFor": [
      "Expecting an isolated beach"
    ],
    "tags": [
      "beach",
      "nature",
      "view"
    ],
    "goodToKnow": [
      "Plan access and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/ramatuelle/plage-de-bonne-terrasse-4600950",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "eglise-notre-dame-ramatuelle",
    "name": "Église Notre-Dame de Ramatuelle",
    "category": "do",
    "location": "Ramatuelle",
    "description": "Visit Notre-Dame church on Place de l’Ormeau in Ramatuelle: its serpentine doorway, painted decoration and old ramparts, with access and visiting advice.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned admission"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Plan access and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/ramatuelle/eglise-notre-dame-4601133",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "jardin-hardy-denonain-gassin",
    "name": "Jardin L’Hardy-Denonain à Gassin",
    "category": "do",
    "location": "Gassin",
    "description": "Explore Gassin’s remarkable L’Hardy-Denonain garden: Mediterranean plants, terraces and the Place deï Barri entrance. Free visits; check seasonal opening.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned admission"
    ],
    "tags": [
      "botanical",
      "nature",
      "walk",
      "heritage"
    ],
    "goodToKnow": [
      "Check seasonal garden opening and steps."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/parc-et-jardin/gassin/jardin-botanique-remarquable-l-hardy-denonain-4681136",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "porte-des-sarrazins-gassin",
    "name": "Porte des Sarrazins à Gassin",
    "category": "do",
    "location": "Gassin",
    "description": "Discover Porte des Sarrazins in Gassin’s Rue Saint-Laurent: the medieval gateway, serpentine stone and portcullis traces, with walking access advice.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned admission"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Plan access and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/gassin/la-porte-des-sarrazins-4082572",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "eglise-notre-dame-assomption-gassin",
    "name": "Église Notre-Dame-de-l’Assomption de Gassin",
    "category": "do",
    "location": "Gassin",
    "description": "Explore Gassin church on Rue Saint-Laurent: the 1558 building, square bell tower and Claude Baillon stained glass, with walking access and visiting advice.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned admission"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Plan access and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/gassin/eglise-notre-dame-de-l-assomption-4596797",
    "lastVerifiedAt": "2026-10-17"
  }
];

export const ramatuelleGassinFacts:Record<string,PlaceFacts> = {
  "phare-de-camarat": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Phare de Camarat : visite, réservation et accès en navette",
        "description": "Visiter le phare de Camarat à Ramatuelle : réservation officielle, navette depuis le stade, musée et panorama. Préparez l’accès et la montée dans la tour.",
        "intro": "Au-dessus du littoral de Ramatuelle, Camarat donne de l’ampleur à la Méditerranée. Le phare invite à regarder la côte autrement, puis à comprendre son histoire. Notre idée : en faire une visite à part entière, réservée à l’avance, plutôt qu’un arrêt improvisé entre deux plages.",
        "facts": [
          [
            "Lieu",
            "Phare de Camarat, Ramatuelle"
          ],
          [
            "Visite",
            "Billet électronique à réserver auprès de l’office"
          ],
          [
            "Rendez-vous",
            "Navette du phare au parking du stade de Ramatuelle"
          ],
          [
            "Dans la tour",
            "Escaliers ; terrasse interdite aux moins de 6 ans"
          ]
        ],
        "sections": [
          [
            "Le littoral prend de la hauteur",
            "Depuis la terrasse, la côte révèle ses caps et la baie de Pampelonne. L’espace muséal aborde le milieu naturel, la navigation et l’histoire des phares. Notre conseil : gardez du temps pour ce qui se découvre à l’intérieur, sans réduire la visite au seul panorama."
          ],
          [
            "Réserver avant de prendre la route",
            "Les visites sont organisées par l’office de tourisme. Consultez la billetterie officielle pour les créneaux, tarifs et conditions en cours ; l’annonce de visites hivernales ne signifie pas une ouverture quotidienne. Prévoyez une marge avant le rendez-vous et utilisez les consignes reçues avec votre billet."
          ],
          [
            "La navette, pas un parking au phare",
            "Le règlement publié prévoit un accès à la visite exclusivement par la navette dédiée, au départ du parking du stade de Ramatuelle. Il précise l’absence de stationnement visiteurs au phare. Le repère cartographique situe le monument ; le bouton itinéraire vise le rendez-vous au stade. Confirmez ces modalités sur votre réservation."
          ],
          [
            "Choisir une visite adaptée au groupe",
            "La montée se fait par un escalier. Le règlement interdit la terrasse sommitale aux enfants de moins de 6 ans, qui peuvent rester dans l’espace muséal avec un adulte. Pour une difficulté de mobilité ou le vertige, renseignez-vous auprès de l’office. Une randonnée côtière constitue une sortie distincte, à préparer séparément."
          ]
        ],
        "questions": [
          [
            "Peut-on visiter le phare sans réservation ?",
            "La visite nécessite un billet électronique auprès de l’office. Vérifiez les créneaux disponibles ; venir au pied du bâtiment ne garantit pas une entrée."
          ],
          [
            "Où faut-il se rendre pour la visite ?",
            "Le règlement indique la navette au parking du stade de Ramatuelle. Suivez le rendez-vous et l’horaire confirmés sur votre billet, pas un itinéraire automobile vers la tour."
          ]
        ]
      },
      "en": {
        "title": "Camarat lighthouse: booking, shuttle and visiting advice",
        "description": "Visit Camarat lighthouse in Ramatuelle: official booking, shuttle from the stadium, museum and coastal views. Plan your arrival and the tower climb.",
        "intro": "Above Ramatuelle’s coastline, Camarat opens up the Mediterranean. The lighthouse invites you to see the shore differently and understand its story. Our idea: give it a proper, pre-booked visit rather than fitting in an improvised stop between beaches.",
        "facts": [
          [
            "Location",
            "Camarat lighthouse, Ramatuelle"
          ],
          [
            "Visits",
            "Electronic ticket booked through the tourist office"
          ],
          [
            "Meeting point",
            "Lighthouse shuttle at Ramatuelle stadium car park"
          ],
          [
            "Tower",
            "Stairs; summit terrace closed to under-sixes"
          ]
        ],
        "sections": [
          [
            "See the coast from above",
            "From the terrace, the coastline reveals its headlands and Pampelonne bay. The museum explores the natural environment, navigation and lighthouse history. Our advice: leave time for the indoor displays rather than treating the panorama as the whole visit."
          ],
          [
            "Book before travelling",
            "The tourist office organises visits. Check its official ticketing page for current slots, prices and conditions; winter visits do not mean daily opening. Allow time before your appointment and follow the instructions supplied with your ticket."
          ],
          [
            "Take the shuttle to the lighthouse",
            "The published rules require visitors to use the dedicated shuttle from Ramatuelle stadium car park and state that there is no visitor parking at the lighthouse. The map marks the monument; the directions button targets the stadium meeting point. Confirm these arrangements on your booking."
          ],
          [
            "Choose a visit that suits your group",
            "Access to the tower involves stairs. The rules exclude children under six from the summit terrace; they may visit the museum accompanied by an adult. Ask the office about mobility difficulties or vertigo. A coastal hike is a separate outing requiring its own preparation."
          ]
        ],
        "questions": [
          [
            "Can I visit without booking?",
            "Visits require an electronic ticket from the tourist office. Check available slots; arriving at the building does not guarantee admission."
          ],
          [
            "Where should I go for my visit?",
            "The published rules specify the shuttle at Ramatuelle stadium car park. Follow the time and meeting point confirmed on your ticket rather than driving towards the tower."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Destination Golfe · Phare de Camarat",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/ramatuelle/le-phare-du-cap-camarat-4877728"
      },
      {
        "label": "Ramatuelle Tourisme · billetterie officielle",
        "url": "https://www.ramatuelle-tourisme.com/fr/phare/"
      },
      {
        "label": "Office de tourisme · règlement des visites (navette et accès)",
        "url": "https://www.ramatuelle-tourisme.com/wp-content/uploads/2025/06/REGLEMENT-INTERIEUR.pdf"
      },
      {
        "label": "Ramatuelle Tourisme · visites hivernales",
        "url": "https://www.ramatuelle-tourisme.com/fr/actualites/phare-de-camarat/"
      }
    ],
    "nearby": [
      "ramatuelle-village",
      "plage-de-bonne-terrasse",
      "eglise-notre-dame-ramatuelle",
      "moulin-de-paillas"
    ]
  },
  "plage-de-bonne-terrasse": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Plage de Bonne Terrasse à Ramatuelle : accès et conseils",
        "description": "Découvrez Bonne Terrasse à Ramatuelle : une anse de sable au sud de Pampelonne, son passé de pêche et les accès à préparer avant une journée au bord de l’eau.",
        "intro": "À Bonne Terrasse, le rivage se resserre autour d’une anse et les maisons restent proches de la plage. Le décor invite à changer de rythme après Pampelonne. Notre idée : venir pour la baie elle-même, prendre le temps de regarder la côte et laisser une vraie place à la pause.",
        "facts": [
          [
            "Adresse",
            "Route de Bonne Terrasse, 83350 Ramatuelle"
          ],
          [
            "Décor",
            "Anse de sable au sud de Pampelonne"
          ],
          [
            "Entrée",
            "Accès libre annoncé"
          ],
          [
            "Approche",
            "Stationnement autorisé à proximité, puis accès piéton"
          ]
        ],
        "sections": [
          [
            "Une anse à l’histoire de pêcheurs",
            "L’office rappelle que les pêcheurs abritaient ici leurs pointus. Le rivage est aujourd’hui bordé d’habitations et de restaurants : notre conseil est de choisir Bonne Terrasse pour sa petite baie habitée, sans imaginer une crique isolée de toute construction."
          ],
          [
            "Comment rejoindre Bonne Terrasse ?",
            "Préparez votre arrivée par la route de Bonne Terrasse, puis utilisez l’accès piéton indiqué. La fiche officielle mentionne un parking à proximité ; cela ne garantit ni une place disponible ni un tarif permanent. La carte situe la plage, pas une entrée de parking ou une possibilité de circuler sur le sable."
          ],
          [
            "Préparer sa journée au bord de l’eau",
            "L’accès à la plage est annoncé libre. Pour votre baignade, vérifiez les conditions de mer et les informations affichées ; cette fiche ne promet pas de surveillance. En été, anticipez l’affluence, apportez de l’eau et gardez un peu de souplesse dans l’heure d’arrivée. Les restaurants se réservent séparément."
          ],
          [
            "Vers Camarat : une autre sortie",
            "Le sentier officiel Bonne Terrasse–Cap Camarat comporte des passages escarpés au-dessus de la mer. Préparez cette marche avec chaussures, eau et vérification de l’ouverture du littoral et des massifs. Elle ne donne pas accès automatiquement à la visite du phare, soumise à une réservation et à sa propre organisation."
          ]
        ],
        "questions": [
          [
            "Bonne Terrasse est-elle la plage de Pampelonne ?",
            "C’est une autre anse de Ramatuelle, au sud de Pampelonne. Choisissez l’accès à Bonne Terrasse pour préparer votre arrivée."
          ],
          [
            "Peut-on combiner plage et visite du phare ?",
            "Oui comme programme à organiser, mais pas comme un accès libre depuis la plage : le phare nécessite une réservation et des modalités de visite distinctes."
          ]
        ]
      },
      "en": {
        "title": "Bonne Terrasse beach, Ramatuelle: access and visiting tips",
        "description": "Discover Bonne Terrasse in Ramatuelle: a sandy bay south of Pampelonne, fishing heritage and practical access advice for planning a day beside the water.",
        "intro": "At Bonne Terrasse, the shore gathers around a small bay with houses close to the beach. It offers a change of pace after Pampelonne. Our idea: come for the bay itself, take time to look along the coast and leave room for an unhurried break.",
        "facts": [
          [
            "Address",
            "Route de Bonne Terrasse, 83350 Ramatuelle"
          ],
          [
            "Setting",
            "Sandy bay south of Pampelonne"
          ],
          [
            "Admission",
            "Listed as free access"
          ],
          [
            "Approach",
            "Authorised nearby parking, then pedestrian access"
          ]
        ],
        "sections": [
          [
            "A bay with a fishing past",
            "The tourist office recalls how fishermen sheltered their traditional pointu boats here. Houses and restaurants now border the shore: choose Bonne Terrasse for its small inhabited bay rather than expecting a cove untouched by buildings."
          ],
          [
            "How to reach Bonne Terrasse",
            "Plan your approach via Route de Bonne Terrasse, then use the signed pedestrian access. The official listing mentions nearby parking; this guarantees neither an available space nor a permanent tariff. The map marks the beach, not a car-park entrance or permission to drive onto the sand."
          ],
          [
            "Prepare your time on the beach",
            "Beach access is listed as free. Check sea conditions and posted notices before swimming; this guide does not promise lifeguard cover. Allow for summer crowds, bring water and keep your arrival time flexible. Restaurant reservations are separate."
          ],
          [
            "Camarat is a separate outing",
            "The official Bonne Terrasse–Cap Camarat coastal walk includes steep sections above the sea. Plan footwear, water and checks on coastal and forest access. The walk does not automatically include a lighthouse visit, which has its own booking and arrival arrangements."
          ]
        ],
        "questions": [
          [
            "Is Bonne Terrasse the same beach as Pampelonne?",
            "It is a separate Ramatuelle bay south of Pampelonne. Plan your arrival using the Bonne Terrasse access."
          ],
          [
            "Can I combine the beach with a lighthouse visit?",
            "You can plan both, but the lighthouse is not freely accessible from the beach: it requires a separate booking and visiting arrangements."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Destination Golfe · Plage de Bonne Terrasse",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/ramatuelle/plage-de-bonne-terrasse-4600950"
      },
      {
        "label": "Ramatuelle Tourisme · circuits du littoral",
        "url": "https://www.ramatuelle-tourisme.com/fr/partager-des-emotions/air-de-detente/circuits/"
      },
      {
        "label": "Destination Golfe · sentier Bonne Terrasse–Cap Camarat",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/ramatuelle/bonne-terrasse-cap-camarat-sentier-du-littoral-de-ramatuelle-4757837"
      }
    ],
    "nearby": [
      "ramatuelle-village",
      "phare-de-camarat",
      "eglise-notre-dame-ramatuelle",
      "moulin-de-paillas"
    ]
  },
  "eglise-notre-dame-ramatuelle": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Église Notre-Dame de Ramatuelle : visite et patrimoine",
        "description": "Visitez l’église Notre-Dame de Ramatuelle, place de l’Ormeau : portail en serpentine, décors peints et lien avec les remparts. Accès et conseils de visite.",
        "intro": "Place de l’Ormeau, Notre-Dame donne un point d’ancrage à la promenade dans Ramatuelle. Son portail, son clocher et ses décors invitent à ralentir. Notre idée : commencer dehors, regarder comment l’église s’insère dans le village, puis entrer si l’ouverture et le moment s’y prêtent.",
        "facts": [
          [
            "Adresse",
            "Place de l’Ormeau, village de Ramatuelle"
          ],
          [
            "À regarder",
            "Portail en serpentine et décors intérieurs"
          ],
          [
            "Entrée",
            "Accès libre annoncé ; respect des offices"
          ],
          [
            "Approche",
            "À pied depuis un stationnement du village"
          ]
        ],
        "sections": [
          [
            "Une église liée aux remparts",
            "L’église s’appuie sur les anciennes fortifications. Sa transformation après les destructions de 1592 a notamment laissé le portail en serpentine verte daté de 1620. Notre suggestion : commencez par observer la façade et le clocher avant de reprendre le fil des ruelles."
          ],
          [
            "Retrouver la place de l’Ormeau",
            "Visez le village de Ramatuelle et rejoignez à pied la place de l’Ormeau après avoir stationné sur un emplacement autorisé. Le point cartographique est celui publié pour le monument, pas un parking. Pour un besoin d’accessibilité précis, demandez à l’office le chemin le plus adapté."
          ],
          [
            "Prendre le temps de regarder dedans",
            "La restauration a révélé des décors peints anciens. L’office présente notamment les panneaux en faux marbre et les peintures du chœur. Si l’église est ouverte à la visite, choisissez un moment calme et laissez les détails guider le regard ; les célébrations gardent la priorité."
          ],
          [
            "Poursuivre la découverte de Ramatuelle",
            "Notre conseil : gardez ensuite une boucle libre dans le village plutôt que d’enchaîner immédiatement avec la voiture. Paillas, Bonne Terrasse ou Camarat peuvent compléter la journée, mais ces lieux demandent un déplacement et, pour le phare, une réservation : ne les comptez pas comme de simples étapes dans les ruelles."
          ]
        ],
        "questions": [
          [
            "Où se trouve l’église Notre-Dame de Ramatuelle ?",
            "Place de l’Ormeau, dans le village perché. Le repère ne correspond pas à une église de Saint-Tropez ou de Gassin."
          ],
          [
            "La visite intérieure est-elle garantie ?",
            "L’office annonce un accès libre. Vérifiez l’ouverture et les offices pour votre passage ; une visite touristique doit respecter la pratique religieuse."
          ]
        ]
      },
      "en": {
        "title": "Notre-Dame church in Ramatuelle: heritage and visiting tips",
        "description": "Visit Notre-Dame church on Place de l’Ormeau in Ramatuelle: its serpentine doorway, painted decoration and old ramparts, with access and visiting advice.",
        "intro": "On Place de l’Ormeau, Notre-Dame anchors a walk through Ramatuelle. Its doorway, bell tower and painted decoration invite you to slow down. Our idea: start outside, see how the church fits into the village, then step in if opening and the occasion allow.",
        "facts": [
          [
            "Address",
            "Place de l’Ormeau, Ramatuelle village"
          ],
          [
            "Look for",
            "Serpentine doorway and interior decoration"
          ],
          [
            "Admission",
            "Listed as free; respect services"
          ],
          [
            "Approach",
            "Walk from authorised village parking"
          ]
        ],
        "sections": [
          [
            "A church beside the ramparts",
            "The church stands against the former fortifications. Alterations after the destruction of 1592 include a green serpentine doorway dated 1620. Our suggestion: look at the façade and bell tower before returning to the surrounding lanes."
          ],
          [
            "Find Place de l’Ormeau",
            "Head for Ramatuelle village, use authorised parking and continue on foot to Place de l’Ormeau. The map uses the monument’s published reference, not a car park. Ask the tourist office for a suitable approach if you have specific access needs."
          ],
          [
            "Take time to look inside",
            "Restoration revealed historic painted decoration. The tourist office highlights faux-marble panels and paintings in the chancel. If the church is open for visits, choose a quiet moment and let the details lead your eye; worship takes priority."
          ],
          [
            "Continue through Ramatuelle",
            "Our advice: leave room for a loose circuit through the village before returning to the car. Paillas, Bonne Terrasse or Camarat can extend the day, but require travel and, for the lighthouse, a booking. They are separate outings rather than more stops within the lanes."
          ]
        ],
        "questions": [
          [
            "Where is Notre-Dame church in Ramatuelle?",
            "On Place de l’Ormeau in the hilltop village, distinct from the churches in Saint-Tropez and Gassin."
          ],
          [
            "Is an interior visit guaranteed?",
            "The office lists free admission. Check opening and services for your visit; sightseeing must respect worship."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Destination Golfe · Église Notre-Dame de Ramatuelle",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/ramatuelle/eglise-notre-dame-4601133"
      },
      {
        "label": "Ramatuelle Tourisme · les décors de l’église",
        "url": "https://www.ramatuelle-tourisme.com/fr/eglise/"
      },
      {
        "label": "Ramatuelle Tourisme · Notre-Dame et le village",
        "url": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-village/les-monuments/leglise-notre-dame/"
      }
    ],
    "nearby": [
      "ramatuelle-village",
      "phare-de-camarat",
      "plage-de-bonne-terrasse",
      "moulin-de-paillas"
    ]
  },
  "jardin-hardy-denonain-gassin": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Jardin L’Hardy-Denonain à Gassin : visite et accès",
        "description": "Découvrez le jardin remarquable L’Hardy-Denonain à Gassin : restanques, plantes méditerranéennes et entrée place deï Barri. Visite gratuite, ouverture à vérifier.",
        "intro": "Sous le village de Gassin, un portillon ouvre sur une autre échelle de paysage. Le jardin L’Hardy-Denonain se découvre entre végétation et restanques. Notre idée : quitter un moment les grands panoramas pour regarder de près les feuilles, les pierres et les passages du jardin.",
        "facts": [
          [
            "Entrée",
            "Place deï Barri, Gassin"
          ],
          [
            "Statut",
            "Jardin privé ouvert au public selon la saison"
          ],
          [
            "Label",
            "Jardin remarquable depuis 2009"
          ],
          [
            "Visite",
            "Gratuite ; marches et restanques"
          ]
        ],
        "sections": [
          [
            "Un jardin au relief méditerranéen",
            "Plusieurs centaines d’espèces provençales et méditerranéennes composent ce jardin créé par Germaine L’Hardy-Denonain. Les quatre restanques donnent leur rythme à la découverte. Notre conseil : choisissez quelques plantes à observer plutôt que de vouloir transformer la pause en inventaire botanique."
          ],
          [
            "L’entrée se trouve place deï Barri",
            "Rejoignez le village à pied depuis un stationnement autorisé, puis cherchez le portillon du jardin place deï Barri. L’accès comporte des marches, et les cheminements relient des terrasses. Le repère touristique situe le secteur du jardin ; il ne constitue pas une entrée automobile ni un parcours d’accessibilité certifié."
          ],
          [
            "Vérifier l’ouverture avant de venir",
            "Ce jardin privé propose une visite gratuite mais saisonnière. Les sources culturelles indiquent une fermeture le jeudi ; confirmez les dates et horaires auprès du jardin ou de l’office, notamment hors saison. Ne poussez pas le portillon si le lieu est fermé : prévoyez alors la promenade dans le village."
          ],
          [
            "Une pause à relier au vieux Gassin",
            "Notre suggestion : associer le jardin à la porte des Sarrazins et à l’église Notre-Dame-de-l’Assomption. Alternez patrimoine et végétation sans chercher à imposer un circuit chronométré. Pour une personne gênée par les escaliers, demandez conseil avant de choisir le jardin comme étape principale."
          ]
        ],
        "questions": [
          [
            "Le jardin L’Hardy-Denonain est-il gratuit ?",
            "Les sources officielles annoncent la gratuité. C’est un jardin privé avec une ouverture saisonnière, à confirmer avant votre passage."
          ],
          [
            "Peut-on visiter le jardin toute l’année ?",
            "Ne comptez pas sur une ouverture permanente. Vérifiez la période, les horaires et la fermeture du jeudi auprès du jardin ou de l’office."
          ]
        ]
      },
      "en": {
        "title": "L’Hardy-Denonain garden, Gassin: visits and access",
        "description": "Explore Gassin’s remarkable L’Hardy-Denonain garden: Mediterranean plants, terraces and the Place deï Barri entrance. Free visits; check seasonal opening.",
        "intro": "Below Gassin village, a small gate leads to a different scale of landscape. L’Hardy-Denonain garden unfolds between plants and stone terraces. Our idea: leave the sweeping views for a while and look closely at the leaves, walls and paths of the garden.",
        "facts": [
          [
            "Entrance",
            "Place deï Barri, Gassin"
          ],
          [
            "Status",
            "Private garden with seasonal public opening"
          ],
          [
            "Label",
            "Jardin remarquable since 2009"
          ],
          [
            "Visits",
            "Free; steps and terraced paths"
          ]
        ],
        "sections": [
          [
            "A Mediterranean garden on terraces",
            "Several hundred Provençal and Mediterranean species fill the garden created by Germaine L’Hardy-Denonain. Four terraces set the pace of discovery. Our advice: choose a few plants to look at closely rather than turning your break into a botanical inventory."
          ],
          [
            "Enter from Place deï Barri",
            "Walk into the village from authorised parking and find the garden gate on Place deï Barri. The approach has steps and paths connect different terrace levels. The tourism reference marks the garden area; it is neither a vehicle entrance nor a certified accessible route."
          ],
          [
            "Check opening before setting off",
            "This private garden offers free seasonal visits. Cultural sources indicate Thursday closure; confirm dates and hours with the garden or tourist office, especially outside the main season. Respect a closed gate and make the village your alternative outing."
          ],
          [
            "Pair the garden with old Gassin",
            "Our suggestion: combine the garden with Porte des Sarrazins and Notre-Dame-de-l’Assomption church. Alternate plants and heritage without imposing a timed circuit. Ask for advice before making the garden your main stop if stairs are difficult for someone in your group."
          ]
        ],
        "questions": [
          [
            "Is L’Hardy-Denonain garden free?",
            "Official sources list free admission. It is a private garden with seasonal opening, so confirm arrangements before visiting."
          ],
          [
            "Can I visit all year?",
            "Do not rely on permanent opening. Check seasonal dates, hours and Thursday closure with the garden or tourist office."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Destination Golfe · Jardin L’Hardy-Denonain à Gassin",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/parc-et-jardin/gassin/jardin-botanique-remarquable-l-hardy-denonain-4681136"
      },
      {
        "label": "Office de tourisme de Gassin · jardin L’Hardy-Denonain",
        "url": "https://gassin.eu/fr/loisirs/parc-et-jardin/gassin/jardin-botanique-remarquable-l-hardy-denonain-4681136/"
      },
      {
        "label": "Ministère de la Culture · Jardin remarquable et ouverture",
        "url": "https://www.culture.gouv.fr/regions/drac-provence-alpes-cote-d-azur/politique-et-actions-culturelles/le-label-jardin-remarquable-en-provence-alpes-cote-d-azur/var/gassin-jardin-germaine-l-hardy-denonain"
      }
    ],
    "nearby": [
      "gassin-village",
      "porte-des-sarrazins-gassin",
      "eglise-notre-dame-assomption-gassin",
      "chateau-minuty"
    ]
  },
  "porte-des-sarrazins-gassin": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Porte des Sarrazins à Gassin : histoire et accès à pied",
        "description": "Découvrez la porte des Sarrazins à Gassin, rue Saint-Laurent : entrée du fort médiéval, serpentine et traces de la herse. Une étape de visite dans le village.",
        "intro": "À Gassin, une porte suffit à faire imaginer un village derrière ses remparts. La porte des Sarrazins concentre cette histoire dans quelques pierres et un passage. Notre idée : s’arrêter vraiment devant elle, observer les détails de fermeture, puis reprendre les ruelles avec un autre regard.",
        "facts": [
          [
            "Adresse",
            "Rue Saint-Laurent, Gassin"
          ],
          [
            "Époque",
            "Porte ouverte vers le XIVe siècle"
          ],
          [
            "Fonction",
            "Entrée de l’enceinte du fort médiéval"
          ],
          [
            "Visite",
            "Étape extérieure gratuite, à pied"
          ]
        ],
        "sections": [
          [
            "L’ancienne entrée du fort",
            "La porte ouvrait sur l’enceinte du Gassin médiéval. Les éléments conservés permettent de comprendre sa fermeture : gond, emplacement des madriers et passage de la herse. Notre suggestion : cherchez ces détails avant de vous éloigner ; le monument se découvre autant de près que sur une photo d’ensemble."
          ],
          [
            "Ce que raconte le nom Sarrazins",
            "L’office relie le nom à la herse dite sarrasine qui protégeait l’entrée. La porte est présentée comme une réalisation médiévale vers le XIVe siècle. Évitez d’en déduire un monument construit par des occupants sarrasins : le nom et la date racontent deux choses différentes."
          ],
          [
            "Rejoindre la rue Saint-Laurent",
            "Arrivez dans le village de Gassin, utilisez un stationnement autorisé puis poursuivez à pied vers la rue Saint-Laurent. La carte situe le monument, pas un point de dépose automobile. Prenez le temps de laisser passer les riverains et adaptez votre parcours au relief et aux marches rencontrées."
          ],
          [
            "Relier les pierres et les jardins",
            "Notre idée : prolonger vers l’église Notre-Dame-de-l’Assomption, puis le jardin L’Hardy-Denonain si ses horaires le permettent. Ce sont des étapes à composer librement ; ne promettez pas une ouverture intérieure ou celle du jardin sur la seule base d’une promenade extérieure."
          ]
        ],
        "questions": [
          [
            "La porte des Sarrazins se visite-t-elle comme un musée ?",
            "C’est un monument extérieur intégré à la promenade dans le village, pas un musée avec un parcours intérieur annoncé."
          ],
          [
            "Où trouver la porte des Sarrazins ?",
            "Rue Saint-Laurent, dans le vieux Gassin. Préparez une approche à pied depuis les parkings du village."
          ]
        ]
      },
      "en": {
        "title": "Porte des Sarrazins, Gassin: medieval history and access",
        "description": "Discover Porte des Sarrazins in Gassin’s Rue Saint-Laurent: the medieval gateway, serpentine stone and portcullis traces, with walking access advice.",
        "intro": "In Gassin, a gateway is enough to imagine a village behind its ramparts. Porte des Sarrazins holds that story in a passage and a few carefully shaped stones. Our idea: stop properly, look for the traces of its defences, then see the lanes with fresh eyes.",
        "facts": [
          [
            "Address",
            "Rue Saint-Laurent, Gassin"
          ],
          [
            "Period",
            "Gateway opened around the 14th century"
          ],
          [
            "Purpose",
            "Entrance to the medieval fortified enclosure"
          ],
          [
            "Visit",
            "Free exterior stop, reached on foot"
          ]
        ],
        "sections": [
          [
            "The former entrance to the fort",
            "The gateway opened into medieval Gassin’s fortified enclosure. Surviving features explain how it closed: a hinge, slots for timber bars and the portcullis passage. Our suggestion: find these details before moving on; the monument rewards a close look as much as a wide photograph."
          ],
          [
            "Understanding the name",
            "The tourist office links the name to the defensive portcullis known as a sarrasine. It dates the gateway to around the 14th century. Its name should not be treated as evidence that Saracen occupants built it; the name and construction period are different pieces of information."
          ],
          [
            "Walk to Rue Saint-Laurent",
            "Head for Gassin village, park in an authorised space and continue on foot to Rue Saint-Laurent. The map marks the monument, not a vehicle drop-off. Leave room for residents passing through and adjust your walk to the slopes and steps you encounter."
          ],
          [
            "Continue from stone to garden",
            "Our idea: continue to Notre-Dame-de-l’Assomption church, then L’Hardy-Denonain garden if opening permits. Put these stops together freely; an exterior village walk does not guarantee admission to the church or garden."
          ]
        ],
        "questions": [
          [
            "Is Porte des Sarrazins a museum?",
            "It is an exterior monument forming part of a village walk, not a museum with an advertised indoor route."
          ],
          [
            "Where can I find the gateway?",
            "In Rue Saint-Laurent in old Gassin. Plan to approach on foot from village parking."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Destination Golfe · Porte des Sarrazins à Gassin",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/gassin/la-porte-des-sarrazins-4082572"
      },
      {
        "label": "Office de tourisme de Gassin · porte des Sarrazins",
        "url": "https://gassin.eu/fr/loisirs/site-et-monument-historiques/gassin/la-porte-des-sarrazins-4082572/"
      },
      {
        "label": "Gassin Tourisme · portes remarquables",
        "url": "https://gassin.eu/fr/loisirs/site-et-monument-historique/gassin/portes-remarquables-5632300/"
      }
    ],
    "nearby": [
      "gassin-village",
      "jardin-hardy-denonain-gassin",
      "eglise-notre-dame-assomption-gassin",
      "chateau-minuty"
    ]
  },
  "eglise-notre-dame-assomption-gassin": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Église Notre-Dame-de-l’Assomption de Gassin : visite",
        "description": "Découvrez l’église de Gassin, rue Saint-Laurent : édifice de 1558, clocher carré et vitraux de Claude Baillon. Accès à pied et conseils pour préparer votre visite.",
        "intro": "À l’entrée nord du vieux Gassin, le clocher carré donne un repère à la promenade. Notre-Dame-de-l’Assomption mérite une halte pour sa silhouette autant que pour ses détails. Notre idée : commencer sur la place, puis pousser la porte si le lieu est ouvert et disponible pour la visite.",
        "facts": [
          [
            "Adresse",
            "Rue Saint-Laurent, village de Gassin"
          ],
          [
            "Construction",
            "Église édifiée en 1558, remaniée ensuite"
          ],
          [
            "À regarder",
            "Clocher carré, portail et vitraux"
          ],
          [
            "Visite",
            "Gratuite annoncée ; ouverture à confirmer"
          ]
        ],
        "sections": [
          [
            "Un repère dans la silhouette du village",
            "L’église de 1558 repose sur le rocher et s’appuie sur d’importants contreforts. Son clocher carré est antérieur à l’ensemble selon l’office. Notre conseil : regardez le volume du bâtiment depuis les rues voisines, puis rapprochez-vous du portail pour changer d’échelle."
          ],
          [
            "Arriver à pied dans le vieux Gassin",
            "La fiche officielle indique la rue Saint-Laurent ; le portail donne sur la place de l’Église. Rejoignez le centre depuis un stationnement autorisé et terminez à pied. Le repère cartographique est publié pour le monument, sans garantir un stationnement à cet endroit ou un accès intérieur sans marche."
          ],
          [
            "Une visite selon l’ouverture et les offices",
            "À l’intérieur, les vitraux de Claude Baillon apportent un autre regard sur l’édifice. L’office présente également son mobilier religieux. Vérifiez l’ouverture auprès de l’office ou de la paroisse et respectez les célébrations ; une vidéo montrant le clocher ne signifie pas que sa montée est libre."
          ],
          [
            "Composer une promenade dans Gassin",
            "Notre suggestion : relier l’église à la porte des Sarrazins et, pendant sa période d’ouverture, au jardin L’Hardy-Denonain. Gardez une pause pour les vues du village plutôt qu’une succession de visites pressées. Si vous préparez un déjeuner, choisissez et réservez votre table séparément."
          ]
        ],
        "questions": [
          [
            "L’église de Gassin est-elle celle de Ramatuelle ?",
            "Non. Cette fiche concerne Notre-Dame-de-l’Assomption à Gassin, rue Saint-Laurent. Ramatuelle possède sa propre église Notre-Dame."
          ],
          [
            "Peut-on monter au clocher ?",
            "Cette fiche ne garantit pas l’accès au clocher. Demandez à l’office ou à la paroisse si une visite encadrée est organisée pour votre date."
          ]
        ]
      },
      "en": {
        "title": "Notre-Dame-de-l’Assomption church in Gassin: visits",
        "description": "Explore Gassin church on Rue Saint-Laurent: the 1558 building, square bell tower and Claude Baillon stained glass, with walking access and visiting advice.",
        "intro": "At the northern entrance to old Gassin, the square bell tower anchors your walk. Notre-Dame-de-l’Assomption deserves a stop for its outline and its finer details. Our idea: start on the square, then step inside if the church is open and available for visitors.",
        "facts": [
          [
            "Address",
            "Rue Saint-Laurent, Gassin village"
          ],
          [
            "Construction",
            "Built in 1558 and subsequently altered"
          ],
          [
            "Look for",
            "Square tower, doorway and stained glass"
          ],
          [
            "Visits",
            "Listed as free; check opening"
          ]
        ],
        "sections": [
          [
            "A landmark in the village skyline",
            "The 1558 church stands on rock with substantial buttresses. The tourist office identifies its square bell tower as older than the main building. Our advice: view the building from neighbouring streets, then move closer to its doorway for a different scale."
          ],
          [
            "Walk into old Gassin",
            "The official address is Rue Saint-Laurent; the entrance faces Place de l’Église. Use authorised village parking and continue on foot. The published map reference marks the monument without promising a parking space there or step-free interior access."
          ],
          [
            "Plan around opening and services",
            "Inside, Claude Baillon’s stained glass offers another perspective on the building. The office also describes its religious furnishings. Confirm opening with the tourist office or parish and respect services; a video showing the bell tower does not establish free public access to it."
          ],
          [
            "Build a walk through Gassin",
            "Our suggestion: connect the church with Porte des Sarrazins and, in its opening season, L’Hardy-Denonain garden. Leave time for the village views rather than rushing between stops. Choose and reserve any lunch table separately."
          ]
        ],
        "questions": [
          [
            "Is Gassin church the same as Ramatuelle’s?",
            "No. This guide covers Notre-Dame-de-l’Assomption in Gassin’s Rue Saint-Laurent. Ramatuelle has its own Notre-Dame church."
          ],
          [
            "Can visitors climb the bell tower?",
            "This guide does not guarantee tower access. Ask the tourist office or parish whether an organised visit is available for your date."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Destination Golfe · Église Notre-Dame-de-l’Assomption de Gassin",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/gassin/eglise-notre-dame-de-l-assomption-4596797"
      },
      {
        "label": "Office de tourisme de Gassin · Notre-Dame-de-l’Assomption",
        "url": "https://gassin.eu/fr/loisirs/eglise-notre-dame-de-l-assomption-4596797/"
      },
      {
        "label": "Gassin Tourisme · patrimoine du village",
        "url": "https://gassin.eu/fr/patrimoine/"
      }
    ],
    "nearby": [
      "gassin-village",
      "jardin-hardy-denonain-gassin",
      "porte-des-sarrazins-gassin",
      "chateau-minuty"
    ]
  }
};

export const ramatuelleGassinSignatures = {
  "phare-de-camarat": {
    "fr": {
      "subtitle": "LA MÉDITERRANÉE PREND DE LA HAUTEUR.",
      "quote": "UN PHARE. UNE CÔTE. UN HORIZON IMMENSE.",
      "rhythm": "RÉSERVER. MONTER. LAISSER PORTER LE REGARD.",
      "dark": "LE RENDEZ-VOUS COMMENCE AU STADE.",
      "close": "CAMARAT MÉRITE SON MOMENT."
    },
    "en": {
      "subtitle": "THE MEDITERRANEAN FROM ABOVE.",
      "quote": "A LIGHTHOUSE. A COAST. AN OPEN HORIZON.",
      "rhythm": "BOOK. CLIMB. TAKE IN THE VIEW.",
      "dark": "YOUR VISIT STARTS AT THE STADIUM.",
      "close": "GIVE CAMARAT ITS OWN MOMENT."
    }
  },
  "plage-de-bonne-terrasse": {
    "fr": {
      "subtitle": "UNE ANSE POUR CHANGER DE RYTHME.",
      "quote": "BONNE TERRASSE, LE RIVAGE À TAILLE HUMAINE.",
      "rhythm": "ARRIVER. POSER LE SAC. REGARDER LA BAIE.",
      "dark": "LA PLAGE ET LE PHARE ONT CHACUN LEUR ACCÈS.",
      "close": "RAMATUELLE, AU CREUX DE LA CÔTE."
    },
    "en": {
      "subtitle": "A BAY FOR A CHANGE OF PACE.",
      "quote": "BONNE TERRASSE, THE SHORE ON A SMALLER SCALE.",
      "rhythm": "ARRIVE. SETTLE IN. LOOK ACROSS THE BAY.",
      "dark": "BEACH AND LIGHTHOUSE HAVE SEPARATE ACCESS.",
      "close": "RAMATUELLE, IN THE CURVE OF THE COAST."
    }
  },
  "eglise-notre-dame-ramatuelle": {
    "fr": {
      "subtitle": "LE VILLAGE SE LIT AUSSI DANS SES PIERRES.",
      "quote": "NOTRE-DAME, UNE PAUSE AU CŒUR DE RAMATUELLE.",
      "rhythm": "LEVER LES YEUX. ENTRER. RETROUVER LES RUELLES.",
      "dark": "UN LIEU DE CULTE, UN PATRIMOINE À RESPECTER.",
      "close": "PLACE DE L’ORMEAU, PRENDRE SON TEMPS."
    },
    "en": {
      "subtitle": "READ THE VILLAGE THROUGH ITS STONE.",
      "quote": "NOTRE-DAME, A PAUSE IN RAMATUELLE.",
      "rhythm": "LOOK UP. STEP INSIDE. RETURN TO THE LANES.",
      "dark": "A PLACE OF WORSHIP AND HERITAGE.",
      "close": "TAKE YOUR TIME ON PLACE DE L’ORMEAU."
    }
  },
  "jardin-hardy-denonain-gassin": {
    "fr": {
      "subtitle": "UN PORTILLON, ET GASSIN CHANGE D’ÉCHELLE.",
      "quote": "LES RESTANQUES ONT LEUR JARDIN SECRET.",
      "rhythm": "DESCENDRE. OBSERVER. LAISSER LA PLACE AU VÉGÉTAL.",
      "dark": "UN JARDIN PRIVÉ QUI SE VISITE À SON RYTHME.",
      "close": "GASSIN, DU PANORAMA AU DÉTAIL D’UNE FEUILLE."
    },
    "en": {
      "subtitle": "THROUGH A GATE, GASSIN CHANGES SCALE.",
      "quote": "A SECRET GARDEN AMONG THE TERRACES.",
      "rhythm": "STEP DOWN. LOOK CLOSELY. MAKE ROOM FOR PLANTS.",
      "dark": "A PRIVATE GARDEN WITH ITS OWN OPENING TIMES.",
      "close": "GASSIN, FROM THE VIEW TO A SINGLE LEAF."
    }
  },
  "porte-des-sarrazins-gassin": {
    "fr": {
      "subtitle": "UNE PORTE POUR RETROUVER LE GASSIN MÉDIÉVAL.",
      "quote": "LE PASSAGE EST PETIT. L’HISTOIRE EST LÀ.",
      "rhythm": "S’ARRÊTER. OBSERVER. TRAVERSER LES SIÈCLES.",
      "dark": "LES DÉTAILS RACONTENT LA DÉFENSE DU VILLAGE.",
      "close": "GASSIN, À HAUTEUR DE PIERRE."
    },
    "en": {
      "subtitle": "A GATEWAY TO MEDIEVAL GASSIN.",
      "quote": "A SMALL PASSAGE WITH A LONG STORY.",
      "rhythm": "STOP. LOOK CLOSELY. CROSS THE CENTURIES.",
      "dark": "THE DETAILS REVEAL THE VILLAGE’S DEFENCES.",
      "close": "GASSIN, SEEN THROUGH ITS STONE."
    }
  },
  "eglise-notre-dame-assomption-gassin": {
    "fr": {
      "subtitle": "LE CLOCHER DONNE UN REPÈRE AUX RUELLES.",
      "quote": "GASSIN SE DÉCOUVRE AUSSI EN LEVANT LES YEUX.",
      "rhythm": "REGARDER DEHORS. PRENDRE LE TEMPS DEDANS.",
      "dark": "LA VISITE SE COMPOSE AUTOUR DE LA VIE DU LIEU.",
      "close": "NOTRE-DAME, UNE HALTE DANS LE VIEUX GASSIN."
    },
    "en": {
      "subtitle": "THE TOWER ANCHORS THE VILLAGE LANES.",
      "quote": "LOOK UP TO DISCOVER ANOTHER SIDE OF GASSIN.",
      "rhythm": "LOOK OUTSIDE. TAKE YOUR TIME WITHIN.",
      "dark": "PLAN YOUR VISIT AROUND THE LIFE OF THE CHURCH.",
      "close": "NOTRE-DAME, A PAUSE IN OLD GASSIN."
    }
  }
};

export const ramatuelleGassinMapPoints:Record<string,MapPoint[]> = {
  "phare-de-camarat": [
    {
      "id": "phare-de-camarat",
      "label": {
        "fr": "Phare de Camarat",
        "en": "Phare de Camarat"
      },
      "latitude": 43.2009,
      "longitude": 6.67403,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/ramatuelle/le-phare-du-cap-camarat-4877728",
      "checked": "2026-10-17",
      "kind": "venue",
      "directionsQuery": "Parking du stade de football, Ramatuelle, France",
      "note": {
        "fr": "Repère du phare, pas du rendez-vous : pour la visite réservée, prenez la navette au parking du stade selon les consignes du billet. Pas de parking visiteurs au phare.",
        "en": "Lighthouse reference, not the meeting point: for a booked visit take the shuttle at the stadium car park as instructed on your ticket. No visitor parking at the lighthouse."
      }
    }
  ],
  "plage-de-bonne-terrasse": [
    {
      "id": "plage-de-bonne-terrasse",
      "label": {
        "fr": "Plage de Bonne Terrasse",
        "en": "Plage de Bonne Terrasse"
      },
      "latitude": 43.2083,
      "longitude": 6.66775,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/ramatuelle/plage-de-bonne-terrasse-4600950",
      "checked": "2026-10-17",
      "kind": "area",
      "directionsQuery": "Plage de Bonne Terrasse, Route de Bonne Terrasse, 83350 Ramatuelle, France",
      "note": {
        "fr": "Repère publié par la destination touristique. Il situe le lieu, pas un parking ; terminez à pied et vérifiez les conditions d’accès.",
        "en": "Published tourism reference for the place, not a car park. Finish on foot and check current access."
      }
    }
  ],
  "eglise-notre-dame-ramatuelle": [
    {
      "id": "eglise-notre-dame-ramatuelle",
      "label": {
        "fr": "Église Notre-Dame de Ramatuelle",
        "en": "Église Notre-Dame de Ramatuelle"
      },
      "latitude": 43.2151,
      "longitude": 6.61195,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/ramatuelle/eglise-notre-dame-4601133",
      "checked": "2026-10-17",
      "kind": "venue",
      "directionsQuery": "Église Notre-Dame de Ramatuelle, Place de l’Ormeau, 83350 Ramatuelle, France",
      "note": {
        "fr": "Repère publié par la destination touristique. Il situe le lieu, pas un parking ; terminez à pied et vérifiez les conditions d’accès.",
        "en": "Published tourism reference for the place, not a car park. Finish on foot and check current access."
      }
    }
  ],
  "jardin-hardy-denonain-gassin": [
    {
      "id": "jardin-hardy-denonain-gassin",
      "label": {
        "fr": "Jardin L’Hardy-Denonain à Gassin",
        "en": "Jardin L’Hardy-Denonain à Gassin"
      },
      "latitude": 43.2282,
      "longitude": 6.5861,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/parc-et-jardin/gassin/jardin-botanique-remarquable-l-hardy-denonain-4681136",
      "checked": "2026-10-17",
      "kind": "area",
      "directionsQuery": "Jardin L’Hardy-Denonain à Gassin, Place deï Barri, 83580 Gassin, France",
      "note": {
        "fr": "Repère touristique du secteur du jardin ; entrée piétonne place deï Barri. Marches et ouverture saisonnière à prévoir.",
        "en": "Tourism reference for the garden area; pedestrian entrance on Place deï Barri. Allow for steps and seasonal opening."
      }
    }
  ],
  "porte-des-sarrazins-gassin": [
    {
      "id": "porte-des-sarrazins-gassin",
      "label": {
        "fr": "Porte des Sarrazins à Gassin",
        "en": "Porte des Sarrazins à Gassin"
      },
      "latitude": 43.229,
      "longitude": 6.58551,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/gassin/la-porte-des-sarrazins-4082572",
      "checked": "2026-10-17",
      "kind": "venue",
      "directionsQuery": "Porte des Sarrazins à Gassin, Rue Saint-Laurent, 83580 Gassin, France",
      "note": {
        "fr": "Repère publié par la destination touristique. Il situe le lieu, pas un parking ; terminez à pied et vérifiez les conditions d’accès.",
        "en": "Published tourism reference for the place, not a car park. Finish on foot and check current access."
      }
    }
  ],
  "eglise-notre-dame-assomption-gassin": [
    {
      "id": "eglise-notre-dame-assomption-gassin",
      "label": {
        "fr": "Église Notre-Dame-de-l’Assomption de Gassin",
        "en": "Église Notre-Dame-de-l’Assomption de Gassin"
      },
      "latitude": 43.2295,
      "longitude": 6.58565,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/gassin/eglise-notre-dame-de-l-assomption-4596797",
      "checked": "2026-10-17",
      "kind": "venue",
      "directionsQuery": "Église Notre-Dame-de-l’Assomption de Gassin, Rue Saint-Laurent, 83580 Gassin, France",
      "note": {
        "fr": "Repère publié par la destination touristique. Il situe le lieu, pas un parking ; terminez à pied et vérifiez les conditions d’accès.",
        "en": "Published tourism reference for the place, not a car park. Finish on foot and check current access."
      }
    }
  ]
};

export const ramatuelleGassinMedia:Record<string,VillagePhoto[]> = {
  "phare-de-camarat": [
    {
      "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Phare_de_Camarat.jpg/1280px-Phare_de_Camarat.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:Phare_de_Camarat.jpg",
      "alt": "Le phare de Camarat (2011)",
      "caption": {
        "fr": "Le phare de Camarat (2011)",
        "en": "Camarat lighthouse (2011)"
      },
      "credit": "Wusel007 / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  ],
  "plage-de-bonne-terrasse": [
    {
      "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Plage_de_Bonne_Terrasse_%282%29.jpg/1280px-Plage_de_Bonne_Terrasse_%282%29.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:Plage_de_Bonne_Terrasse_%282%29.jpg",
      "alt": "Plage de Bonne Terrasse — photographie d’archive, août 1995",
      "caption": {
        "fr": "Plage de Bonne Terrasse — photographie d’archive, août 1995",
        "en": "Bonne Terrasse beach — archive photograph, August 1995"
      },
      "credit": "Jean-Pierre Bazard (Jpbazard) / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  ],
  "eglise-notre-dame-ramatuelle": [
    {
      "src": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Ramatuelle1.JPG",
      "source": "https://commons.wikimedia.org/wiki/File:Ramatuelle1.JPG",
      "alt": "L’église Notre-Dame de Ramatuelle (2006)",
      "caption": {
        "fr": "L’église Notre-Dame de Ramatuelle (2006)",
        "en": "Notre-Dame church in Ramatuelle (2006)"
      },
      "credit": "Ντμίτρι / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  ],
  "jardin-hardy-denonain-gassin": [
    {
      "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Une_vue_du_jardin_L%27Hardy-Denonain_%C3%A0_Gassin.jpg/1280px-Une_vue_du_jardin_L%27Hardy-Denonain_%C3%A0_Gassin.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:Une_vue_du_jardin_L%27Hardy-Denonain_%C3%A0_Gassin.jpg",
      "alt": "Le jardin L’Hardy-Denonain à Gassin (2016)",
      "caption": {
        "fr": "Le jardin L’Hardy-Denonain à Gassin (2016)",
        "en": "L’Hardy-Denonain garden, Gassin (2016)"
      },
      "credit": "Office de tourisme de Gassin / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    }
  ],
  "porte-des-sarrazins-gassin": [
    {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/La_porte_des_Sarrazins_%C3%A0_Gassin.jpg/1280px-La_porte_des_Sarrazins_%C3%A0_Gassin.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:La_porte_des_Sarrazins_%C3%A0_Gassin.jpg",
      "alt": "La porte des Sarrazins à Gassin (2016)",
      "caption": {
        "fr": "La porte des Sarrazins à Gassin (2016)",
        "en": "Porte des Sarrazins, Gassin (2016)"
      },
      "credit": "Office de tourisme de Gassin / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    }
  ],
  "eglise-notre-dame-assomption-gassin": [
    {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Une_vue_de_l%27%C3%A9glise_de_Gassin_depuis_la_rue_Saint-Laurent.jpg/1280px-Une_vue_de_l%27%C3%A9glise_de_Gassin_depuis_la_rue_Saint-Laurent.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:Une_vue_de_l%27%C3%A9glise_de_Gassin_depuis_la_rue_Saint-Laurent.jpg",
      "alt": "L’église de Gassin vue depuis la rue Saint-Laurent (2016)",
      "caption": {
        "fr": "L’église de Gassin vue depuis la rue Saint-Laurent (2016)",
        "en": "Gassin church from Rue Saint-Laurent (2016)"
      },
      "credit": "Office de tourisme de Gassin / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  ]
};

