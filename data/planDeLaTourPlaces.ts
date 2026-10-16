import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {VillagePhoto} from './villageMedia';
import {legacyPlaceMedia} from './legacyPlaceMedia';

export const planDeLaTourPlaces:Place[] = [
  {
    "id": "le-porche-plan-de-la-tour",
    "name": "Le Porche",
    "category": "eat",
    "location": "Le Plan-de-la-Tour",
    "description": "Discover Le Porche in Le Plan-de-la-Tour: traditional cooking, a terrace on Place Georges-Clemenceau, location and advice for booking a village meal.",
    "bestFor": [
      "Village lunch"
    ],
    "notIdealFor": [
      "Unplanned visits"
    ],
    "tags": [
      "restaurant",
      "lunch",
      "village"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/plan-de-la-tour/le-porche-6516996",
    "lastVerifiedAt": "2026-10-16",
    "phone": "04 98 23 36 03"
  },
  {
    "id": "la-tour-du-plan",
    "name": "La Tour du Plan",
    "category": "eat",
    "location": "Le Plan-de-la-Tour",
    "description": "La Tour du Plan in Le Plan-de-la-Tour: Provençal cooking, a shaded terrace and an old village building. Location, booking and ideas for a village stroll.",
    "bestFor": [
      "Village lunch"
    ],
    "notIdealFor": [
      "Unplanned visits"
    ],
    "tags": [
      "restaurant",
      "lunch",
      "romantic",
      "village"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/plan-de-la-tour/la-tour-du-plan-4078652",
    "lastVerifiedAt": "2026-10-16",
    "phone": "04 94 43 70 05",
    "website": "https://www.latourduplan.fr/"
  },
  {
    "id": "marche-plan-de-la-tour",
    "name": "Marché provençal du Plan-de-la-Tour",
    "category": "do",
    "location": "Le Plan-de-la-Tour",
    "description": "Visit Le Plan-de-la-Tour’s Provençal market on Place Foch, Thursdays from 8.30am to 12.30pm. Local produce, access and ideas for a village morning.",
    "bestFor": [
      "A village walk"
    ],
    "notIdealFor": [
      "Unplanned visits"
    ],
    "tags": [
      "market",
      "family",
      "walk",
      "village"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/animation/manifestations-commerciales/plan-de-la-tour/marche-provencal-hebdomadaire-5835396",
    "lastVerifiedAt": "2026-10-16",
    "phone": "04 94 55 07 55"
  },
  {
    "id": "eglise-saint-martin-plan-de-la-tour",
    "name": "Église Saint-Martin du Plan-de-la-Tour",
    "category": "do",
    "location": "Le Plan-de-la-Tour",
    "description": "Discover Saint-Martin church in Le Plan-de-la-Tour: the 1785 building, bell tower and clock. Location, local heritage and advice for planning your visit.",
    "bestFor": [
      "A village walk"
    ],
    "notIdealFor": [
      "Unplanned visits"
    ],
    "tags": [
      "heritage",
      "history",
      "walk",
      "village"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/leglise-saint-martin-le-clocher-et-son-horloge-le-plan-de-la-tour-fr-2882905/",
    "lastVerifiedAt": "2026-10-16"
  }
];

export const planDeLaTourFacts:Record<string,PlaceFacts> = {
  "le-porche-plan-de-la-tour": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Le Porche au Plan-de-la-Tour : restaurant et terrasse",
        "description": "Le Porche au Plan-de-la-Tour : restaurant traditionnel, terrasse place Georges-Clemenceau, adresse et conseils pour réserver votre table au village.",
        "intro": "Au Plan-de-la-Tour, Le Porche donne une bonne raison de prolonger la promenade par un repas. La table se trouve place Georges-Clemenceau, au cœur du village. Une cuisine traditionnelle et une terrasse pour retrouver le plaisir simple de s’asseoir, de discuter et de laisser un peu de temps au déjeuner ou au dîner.",
        "facts": [
          [
            "Adresse",
            "9 place Georges-Clemenceau, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Cuisine",
            "Traditionnelle, accents provençaux et italiens"
          ],
          [
            "Cadre",
            "Terrasse et terrasse couverte annoncées"
          ],
          [
            "Réservation",
            "04 98 23 36 03 · services saisonniers à confirmer"
          ]
        ],
        "sections": [
          [
            "Une table au centre du village",
            "L’office de tourisme présente une cuisine traditionnelle aux accents français, provençaux et italiens. Choisissez cette adresse pour un repas au village ; les plats et la carte du moment sont à demander directement au restaurant."
          ],
          [
            "Une terrasse pour prendre son temps",
            "La terrasse, également annoncée couverte, permet de profiter de l’ambiance de la place. Notre idée : arriver avant le repas pour parcourir les ruelles, puis garder la table comme point de rendez-vous. Réservez si la terrasse est importante pour vous."
          ],
          [
            "Adresse, arrivée et réservation",
            "Le Porche se trouve au 9 place Georges-Clemenceau. Rejoignez un stationnement autorisé à proximité puis terminez à pied. Appelez le 04 98 23 36 03 pour confirmer le service, la carte et les possibilités d’accueil de votre groupe."
          ],
          [
            "Le bon programme autour du Porche",
            "Le jeudi, associez le marché provençal du matin à un repas, après confirmation du service du midi. Les autres jours, composez une promenade autour de l’église Saint-Martin et des places. Ce programme est notre suggestion, pas une offre groupée du restaurant."
          ]
        ],
        "questions": [
          [
            "Le Porche se trouve-t-il à Sainte-Maxime ?",
            "Cette fiche concerne Le Porche au Plan-de-la-Tour, place Georges-Clemenceau. Vérifiez bien la commune avant de lancer votre itinéraire."
          ],
          [
            "Peut-on demander une table en terrasse ?",
            "Une terrasse est annoncée. Contactez le restaurant pour vérifier sa disponibilité et préciser votre préférence lors de la réservation."
          ]
        ]
      },
      "en": {
        "title": "Le Porche in Le Plan-de-la-Tour: restaurant and terrace",
        "description": "Discover Le Porche in Le Plan-de-la-Tour: traditional cooking, a terrace on Place Georges-Clemenceau, location and advice for booking a village meal.",
        "intro": "At Le Porche, a village stroll can turn into a proper meal. This restaurant on Place Georges-Clemenceau in Le Plan-de-la-Tour pairs traditional cooking with a terrace. Our suggestion: leave room in the day for an unhurried conversation around the table.",
        "facts": [
          [
            "Address",
            "9 Place Georges-Clemenceau, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Cooking",
            "Traditional, Provençal and Italian influences"
          ],
          [
            "Setting",
            "Terrace and covered terrace listed"
          ],
          [
            "Booking",
            "+33 4 98 23 36 03 · confirm seasonal services"
          ]
        ],
        "sections": [
          [
            "Traditional cooking in the village",
            "The tourist office describes traditional cooking with French, Provençal and Italian influences. Choose it for a village meal; ask the restaurant about the current menu and dishes."
          ],
          [
            "A terrace for an unhurried meal",
            "The listed terrace also has a covered area. Our idea: explore the lanes before sitting down, then make the table your meeting point. Book ahead if an outdoor table matters to you."
          ],
          [
            "Location and booking",
            "Find Le Porche at 9 Place Georges-Clemenceau. Use an authorised nearby parking space and finish on foot. Call +33 4 98 23 36 03 to confirm the service, menu and arrangements for your group."
          ],
          [
            "A village outing around your meal",
            "On Thursdays, combine the morning market with a meal after confirming lunch service. On other days, stroll around Saint-Martin church and the squares. This is our suggested outing, not a package offered by the restaurant."
          ]
        ],
        "questions": [
          [
            "Is this Le Porche in Sainte-Maxime?",
            "This page covers Le Porche in Le Plan-de-la-Tour, on Place Georges-Clemenceau. Check the town before starting your journey."
          ],
          [
            "Can I request an outdoor table?",
            "A terrace is listed. Contact the restaurant to check availability and specify your preference when booking."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Le Porche",
        "url": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/plan-de-la-tour/le-porche-6516996"
      },
      {
        "label": "Côte d’Azur France · Le Porche",
        "url": "https://cotedazurfrance.fr/offres/le-porche-le-plan-de-la-tour-fr-4201857/"
      }
    ],
    "nearby": [
      "plan-de-la-tour-village",
      "la-tour-du-plan",
      "marche-plan-de-la-tour",
      "eglise-saint-martin-plan-de-la-tour"
    ]
  },
  "la-tour-du-plan": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "La Tour du Plan : restaurant au Plan-de-la-Tour",
        "description": "La Tour du Plan au Plan-de-la-Tour : cuisine provençale, terrasse ombragée et bâtisse ancienne. Adresse, réservation et idées de promenade au village.",
        "intro": "À La Tour du Plan, le village se raconte aussi autour d’une table. Pierres anciennes, salle décorée et terrasse ombragée composent le cadre de ce restaurant de la rue Jean-Jaurès. Une adresse à envisager pour donner au repas une vraie place dans la journée, après les ruelles ou avant une promenade.",
        "facts": [
          [
            "Adresse",
            "5 rue Jean-Jaurès, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Cuisine",
            "Traditionnelle française et provençale"
          ],
          [
            "Cadre",
            "Salle et terrasse ombragée"
          ],
          [
            "Réservation",
            "04 94 43 70 05 · ouverture à confirmer"
          ]
        ],
        "sections": [
          [
            "La Provence comme fil conducteur",
            "Le restaurant présente une cuisine aux accents provençaux et des plats préparés sur place à partir de produits frais. Consultez la carte actuelle sur son site officiel plutôt que de choisir votre repas à partir d’une ancienne photo de menu."
          ],
          [
            "Les pierres et la terrasse",
            "La bâtisse ancienne et la terrasse ombragée font partie de l’identité du lieu. Notre suggestion : préciser au moment de réserver si vous préférez manger dehors ou dans la salle. Le cadre se choisit aussi selon la saison et la météo."
          ],
          [
            "Rejoindre le restaurant",
            "La Tour du Plan est située au 5 rue Jean-Jaurès, dans le centre du Plan-de-la-Tour. Prévoyez le dernier trajet à pied depuis un parking autorisé. Le 04 94 43 70 05 permet de confirmer l’ouverture et de réserver."
          ],
          [
            "Prolonger le repas au village",
            "Gardez une promenade autour des places et de l’église pour compléter cette étape. Le jeudi matin, le marché peut précéder le déjeuner si le service est confirmé. Notre conseil : évitez de superposer réservation et départ de randonnée à une heure trop serrée."
          ]
        ],
        "questions": [
          [
            "Où trouver le menu de La Tour du Plan ?",
            "Le site officiel du restaurant présente sa carte. Confirmez les plats, menus et tarifs pour votre date lors de la réservation."
          ],
          [
            "La terrasse est-elle ombragée ?",
            "Le restaurant et l’office annoncent une terrasse ombragée. Demandez une table adaptée à votre groupe et vérifiez les conditions du jour."
          ]
        ]
      },
      "en": {
        "title": "La Tour du Plan: restaurant in Le Plan-de-la-Tour",
        "description": "La Tour du Plan in Le Plan-de-la-Tour: Provençal cooking, a shaded terrace and an old village building. Location, booking and ideas for a village stroll.",
        "intro": "Old stone, a decorated dining room and a shaded terrace set the scene at La Tour du Plan, on Rue Jean-Jaurès. Consider making the meal a proper part of your day, with time to explore the village before or afterwards.",
        "facts": [
          [
            "Address",
            "5 Rue Jean-Jaurès, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Cooking",
            "Traditional French and Provençal"
          ],
          [
            "Setting",
            "Dining room and shaded terrace"
          ],
          [
            "Booking",
            "+33 4 94 43 70 05 · confirm opening"
          ]
        ],
        "sections": [
          [
            "A Provençal direction",
            "The restaurant describes Provençal influences and food prepared on site using fresh produce. Consult the current menu on its official website rather than choosing from an old menu photograph."
          ],
          [
            "Stone walls and a shaded terrace",
            "The old building and shaded terrace are part of the setting. Our suggestion: specify whether you prefer the terrace or dining room when booking, taking the season and weather into account."
          ],
          [
            "Getting to the restaurant",
            "La Tour du Plan is at 5 Rue Jean-Jaurès in the village centre. Allow for a final walk from an authorised parking area. Call +33 4 94 43 70 05 to check opening and book a table."
          ],
          [
            "Build in time for the village",
            "Leave room for the squares and church before or after your meal. Thursday’s market can come before lunch if service is confirmed. Our advice: avoid placing a restaurant booking and a hiking departure too close together."
          ]
        ],
        "questions": [
          [
            "Where can I find La Tour du Plan’s menu?",
            "The restaurant’s official website presents its menu. Confirm dishes, set menus and prices for your date when booking."
          ],
          [
            "Is the terrace shaded?",
            "Both the restaurant and tourist office list a shaded terrace. Request a suitable table for your group and check conditions for your visit."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · La Tour du Plan",
        "url": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/plan-de-la-tour/la-tour-du-plan-4078652"
      },
      {
        "label": "La Tour du Plan · site officiel et carte",
        "url": "https://www.latourduplan.fr/"
      }
    ],
    "nearby": [
      "plan-de-la-tour-village",
      "le-porche-plan-de-la-tour",
      "marche-plan-de-la-tour",
      "eglise-saint-martin-plan-de-la-tour"
    ]
  },
  "marche-plan-de-la-tour": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Marché du Plan-de-la-Tour : jeudi matin place Foch",
        "description": "Le marché provençal du Plan-de-la-Tour se tient le jeudi de 8h30 à 12h30 place Foch. Produits locaux, accès et idées pour prolonger la matinée au village.",
        "intro": "Le jeudi matin, la place Foch devient un rendez-vous de village. Le marché provençal du Plan-de-la-Tour rassemble producteurs, artisans et commerçants pour une matinée à parcourir à son rythme. Notre idée : venir avec un panier, prendre le temps des étals et poursuivre par un café ou un repas au centre.",
        "facts": [
          [
            "Adresse",
            "Place Foch, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Jour",
            "Jeudi matin, toute l’année"
          ],
          [
            "Horaires annoncés",
            "8h30–12h30 · tenue à vérifier pour votre date"
          ],
          [
            "Accès",
            "Libre · arrivée à pied depuis le stationnement"
          ]
        ],
        "sections": [
          [
            "Quand a lieu le marché du Plan-de-la-Tour ?",
            "L’office de tourisme annonce le jeudi de 8h30 à 12h30, toute l’année. Vérifiez sa tenue pour une date particulière auprès de la mairie, notamment en cas de météo défavorable ou d’organisation exceptionnelle."
          ],
          [
            "Un panier à composer sur place",
            "Les sources locales décrivent des produits du terroir et des spécialités artisanales. L’offre dépend des commerçants présents : mieux vaut parcourir les étals avant de choisir, sans attendre une liste de produits identique chaque semaine."
          ],
          [
            "Accès à la place Foch",
            "Le repère situe la place Foch, au centre du village, et non un emplacement de stand. Utilisez les parkings autorisés à proximité et terminez à pied. Le jeudi, gardez une marge pour circuler et trouver une place sans vous presser."
          ],
          [
            "Une matinée, pas seulement des courses",
            "Après le marché, remontez les ruelles vers l’église Saint-Martin ou prévoyez une table au Porche ou à La Tour du Plan. Confirmez le service du midi au restaurant. Notre conseil : profitez de la promenade pour découvrir les commerces permanents du village."
          ]
        ],
        "questions": [
          [
            "Quel jour se tient le marché du Plan-de-la-Tour ?",
            "Le marché provençal est annoncé chaque jeudi matin, de 8h30 à 12h30, place Foch."
          ],
          [
            "Le marché se tient-il seulement en été ?",
            "L’office l’annonce toute l’année. La tenue effective reste à vérifier pour votre date, notamment selon la météo."
          ]
        ]
      },
      "en": {
        "title": "Le Plan-de-la-Tour market: Thursday morning on Place Foch",
        "description": "Visit Le Plan-de-la-Tour’s Provençal market on Place Foch, Thursdays from 8.30am to 12.30pm. Local produce, access and ideas for a village morning.",
        "intro": "On Thursday mornings, Place Foch becomes a village meeting point. Le Plan-de-la-Tour’s Provençal market brings together producers, craftspeople and traders. Our idea: bring a shopping bag, take time over the stalls and continue with a café stop or a meal in the centre.",
        "facts": [
          [
            "Address",
            "Place Foch, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Day",
            "Thursday mornings, throughout the year"
          ],
          [
            "Listed times",
            "8.30am–12.30pm · confirm your date"
          ],
          [
            "Access",
            "Free entry · walk from nearby parking"
          ]
        ],
        "sections": [
          [
            "When is Le Plan-de-la-Tour market?",
            "The tourist office lists Thursdays from 8.30am to 12.30pm throughout the year. Confirm a specific date with the town hall, especially in poor weather or when exceptional arrangements may apply."
          ],
          [
            "Build your basket as you go",
            "Local sources describe regional produce and artisan specialities. The selection depends on which traders attend: walk around before choosing rather than expecting an identical range every week."
          ],
          [
            "Reaching Place Foch",
            "The marker locates Place Foch in the village centre, not a particular stall. Use authorised nearby parking and finish on foot. On Thursdays, allow extra time to arrive and park without rushing."
          ],
          [
            "A morning beyond the shopping",
            "After the market, stroll towards Saint-Martin church or plan a meal at Le Porche or La Tour du Plan, after confirming lunch service. Our advice: include the permanent village shops in your walk too."
          ]
        ],
        "questions": [
          [
            "Which day is the market in Le Plan-de-la-Tour?",
            "The Provençal market is listed on Thursday mornings, from 8.30am to 12.30pm, on Place Foch."
          ],
          [
            "Is the market only held in summer?",
            "The tourist office lists it throughout the year. Check that it is going ahead on your date, particularly in poor weather."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Marché provençal du Plan-de-la-Tour",
        "url": "https://www.golfe-saint-tropez-information.com/fr/animation/manifestations-commerciales/plan-de-la-tour/marche-provencal-hebdomadaire-5835396"
      },
      {
        "label": "Saint-Tropez Tourisme · le village et le marché du jeudi",
        "url": "https://www.sainttropeztourisme.com/fr/explorer/les-villages-du-golfe-a-visiter/le-plan-de-la-tour/"
      }
    ],
    "nearby": [
      "plan-de-la-tour-village",
      "le-porche-plan-de-la-tour",
      "la-tour-du-plan",
      "eglise-saint-martin-plan-de-la-tour"
    ]
  },
  "eglise-saint-martin-plan-de-la-tour": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Église Saint-Martin au Plan-de-la-Tour : clocher et visite",
        "description": "Découvrez l’église Saint-Martin au Plan-de-la-Tour : édifice de 1785, clocher et horloge. Localisation, patrimoine et conseils pour préparer votre visite.",
        "intro": "Au-dessus des ruelles, le clocher de Saint-Martin donne son repère au Plan-de-la-Tour. L’église actuelle, construite en 1785, relie le paysage du village à son histoire. Une halte de patrimoine à intégrer à une promenade, en distinguant toujours ce que l’on peut admirer de l’extérieur et les espaces réellement ouverts le jour de la visite.",
        "facts": [
          [
            "Adresse",
            "Place Clemenceau, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Patrimoine",
            "Église actuelle construite en 1785"
          ],
          [
            "À observer",
            "Granite local, clocher et campanile"
          ],
          [
            "Visite intérieure",
            "Ouverture et accès au clocher à confirmer"
          ]
        ],
        "sections": [
          [
            "Une église au cœur de l’histoire du Plan",
            "La présentation touristique situe la construction de l’édifice actuel en 1785, en remplacement d’une chapelle devenue trop petite. Sa maçonnerie utilise le granite local. Notre conseil : observez d’abord les proportions et les matériaux depuis la place."
          ],
          [
            "Le clocher, le campanile et l’horloge",
            "Le clocher accompagne la silhouette du village. L’office signale une horloge installée vers 1880 et un mécanisme présenté à l’entrée de l’église. Ces éléments se découvrent selon les conditions d’ouverture ; la fiche ne garantit pas une montée dans le clocher."
          ],
          [
            "Adresse et conditions de visite",
            "L’église est située dans le secteur de la place Clemenceau. Le point cartographique correspond au bâtiment relevé dans OpenStreetMap. Pour entrer, demandez les possibilités du jour à la paroisse ou à l’office ; respectez les offices et les éventuelles restrictions."
          ],
          [
            "Une étape dans la promenade du village",
            "Associez l’église aux ruelles, aux places et, le jeudi matin, au marché provençal. L’extérieur suffit à donner un fil conducteur à une courte visite. N’organisez pas votre journée autour d’un accès au clocher sans confirmation préalable."
          ]
        ],
        "questions": [
          [
            "Peut-on monter dans le clocher de Saint-Martin ?",
            "Nous ne garantissons pas cet accès. Renseignez-vous auprès de la paroisse ou de l’office avant de prévoir une montée."
          ],
          [
            "La visite est-elle possible pendant un office ?",
            "Respectez la pratique religieuse et les consignes sur place. Privilégiez un autre créneau pour une visite touristique."
          ]
        ]
      },
      "en": {
        "title": "Saint-Martin church in Le Plan-de-la-Tour: bell tower and visit",
        "description": "Discover Saint-Martin church in Le Plan-de-la-Tour: the 1785 building, bell tower and clock. Location, local heritage and advice for planning your visit.",
        "intro": "Above the lanes, Saint-Martin’s bell tower gives Le Plan-de-la-Tour a familiar landmark. The present church dates from 1785 and connects the village landscape with its history. Make it a stop on a village stroll, distinguishing exterior views from spaces actually open on the day.",
        "facts": [
          [
            "Address",
            "Place Clemenceau, 83120 Le Plan-de-la-Tour"
          ],
          [
            "Heritage",
            "Present church built in 1785"
          ],
          [
            "Look for",
            "Local granite, bell tower and campanile"
          ],
          [
            "Interior visits",
            "Confirm opening and tower access"
          ]
        ],
        "sections": [
          [
            "A church within the village story",
            "The tourist description dates the present building to 1785, replacing a chapel that had become too small. It uses local granite. Our advice: begin by looking at its proportions and materials from the square."
          ],
          [
            "The tower, campanile and clock",
            "The bell tower shapes the village skyline. The tourist office mentions a clock installed around 1880 and a mechanism displayed near the church entrance. Access depends on opening arrangements; this page does not promise a climb up the tower."
          ],
          [
            "Location and visiting arrangements",
            "The church is in the Place Clemenceau area. The map marker corresponds to the building recorded in OpenStreetMap. Ask the parish or tourist office about access on your date and respect services and any restrictions."
          ],
          [
            "A stop on a village stroll",
            "Combine the church with the lanes, squares and, on Thursday mornings, the Provençal market. The exterior gives a short visit a useful focus. Do not build your day around access to the tower without prior confirmation."
          ]
        ],
        "questions": [
          [
            "Can I climb Saint-Martin’s bell tower?",
            "We cannot guarantee access. Ask the parish or tourist office before planning a climb."
          ],
          [
            "Can I visit during a service?",
            "Respect worship and local instructions. Choose another time for a sightseeing visit."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Église Saint-Martin du Plan-de-la-Tour",
        "url": "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/leglise-saint-martin-le-clocher-et-son-horloge-le-plan-de-la-tour-fr-2882905/"
      },
      {
        "label": "Fondation du patrimoine · histoire et restauration du clocher",
        "url": "https://www.fondation-patrimoine.org/les-projets/eglise-saint-martin-plan-de-la-tour/59856"
      },
      {
        "label": "Paroisse du Plan-de-la-Tour · informations officielles",
        "url": "https://paroisses.frejustoulon.fr/paroisse/plan-de-la-tour/"
      }
    ],
    "nearby": [
      "plan-de-la-tour-village",
      "le-porche-plan-de-la-tour",
      "la-tour-du-plan",
      "marche-plan-de-la-tour"
    ]
  }
};

export const planDeLaTourSignatures = {
  "le-porche-plan-de-la-tour": {
    "fr": {
      "subtitle": "LE VILLAGE PASSE À TABLE.",
      "quote": "UNE PLACE. UNE TERRASSE. LE TEMPS DE SE RETROUVER.",
      "rhythm": "FLÂNER. S’ASSEOIR. PARTAGER.",
      "dark": "LE BON REPAS COMMENCE PAR LE BON SERVICE.",
      "close": "UNE TABLE AU CŒUR DU PLAN."
    },
    "en": {
      "subtitle": "THE VILLAGE COMES TO THE TABLE.",
      "quote": "A SQUARE. A TERRACE. TIME TOGETHER.",
      "rhythm": "STROLL. SIT. SHARE.",
      "dark": "CHECK THE SERVICE BEFORE SETTING OUT.",
      "close": "A TABLE IN THE HEART OF THE VILLAGE."
    }
  },
  "la-tour-du-plan": {
    "fr": {
      "subtitle": "LES PIERRES ANCIENNES ONT DE L’APPÉTIT.",
      "quote": "AU PLAN, LA PROVENCE PREND PLACE À TABLE.",
      "rhythm": "LE VILLAGE. LA TERRASSE. L’ASSIETTE.",
      "dark": "LA TERRASSE SE DEMANDE, LE MOMENT SE PRÉPARE.",
      "close": "LE REPAS MÉRITE SA PLACE DANS LA JOURNÉE."
    },
    "en": {
      "subtitle": "OLD STONE. A FRESH APPETITE.",
      "quote": "PROVENCE TAKES ITS PLACE AT THE TABLE.",
      "rhythm": "THE VILLAGE. THE TERRACE. THE PLATE.",
      "dark": "ASK FOR THE TABLE THAT SUITS YOUR DAY.",
      "close": "GIVE THE MEAL ITS OWN PLACE IN YOUR DAY."
    }
  },
  "marche-plan-de-la-tour": {
    "fr": {
      "subtitle": "LE JEUDI, LE VILLAGE SE DONNE RENDEZ-VOUS.",
      "quote": "UN PANIER. DES ÉTALS. TOUT UN VILLAGE.",
      "rhythm": "FLÂNER. CHOISIR. RAPPORTER.",
      "dark": "LE BON JOUR, C’EST JEUDI MATIN.",
      "close": "LA MATINÉE CONTINUE APRÈS LE MARCHÉ."
    },
    "en": {
      "subtitle": "THURSDAY IS THE VILLAGE’S MEETING DAY.",
      "quote": "A BASKET. THE STALLS. A WHOLE VILLAGE.",
      "rhythm": "BROWSE. CHOOSE. TAKE HOME.",
      "dark": "THURSDAY MORNING IS THE TIME TO COME.",
      "close": "THE MORNING DOESN’T END WITH THE MARKET."
    }
  },
  "eglise-saint-martin-plan-de-la-tour": {
    "fr": {
      "subtitle": "LE CLOCHER DONNE LE TON AU VILLAGE.",
      "quote": "LE PLAN A AUSSI SON HISTOIRE À LEVER LES YEUX.",
      "rhythm": "LES PIERRES. LE TEMPS. LE VILLAGE.",
      "dark": "UN CLOCHER À ADMIRER, UN ACCÈS À CONFIRMER.",
      "close": "LE PATRIMOINE SE DÉCOUVRE AUSSI DEHORS."
    },
    "en": {
      "subtitle": "THE BELL TOWER SETS THE VILLAGE’S TONE.",
      "quote": "LOOK UP. THE VILLAGE HAS A STORY.",
      "rhythm": "THE STONE. THE TIME. THE VILLAGE.",
      "dark": "ADMIRE THE TOWER. CHECK ACCESS FIRST.",
      "close": "HERITAGE STARTS WITH A LOOK OUTSIDE."
    }
  }
};

export const planDeLaTourMapPoints:Record<string,MapPoint[]> = {
  "le-porche-plan-de-la-tour": [
    {
      "id": "le-porche-plan-de-la-tour",
      "label": {
        "fr": "Le Porche",
        "en": "Le Porche"
      },
      "latitude": 43.3392,
      "longitude": 6.54777,
      "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/plan-de-la-tour/le-porche-6516996",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Le Porche, 9 place Georges-Clemenceau, 83120 Le Plan-de-la-Tour, France",
      "note": {
        "fr": "Repère publié par l’office de tourisme pour cette adresse au Plan-de-la-Tour. Stationnement à proximité ; confirmez l’ouverture et la réservation avant de venir.",
        "en": "Tourist-office location reference for this address in Le Plan-de-la-Tour. Park nearby and confirm opening and booking before travelling."
      }
    }
  ],
  "la-tour-du-plan": [
    {
      "id": "la-tour-du-plan",
      "label": {
        "fr": "La Tour du Plan",
        "en": "La Tour du Plan"
      },
      "latitude": 43.3386,
      "longitude": 6.54752,
      "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/plan-de-la-tour/la-tour-du-plan-4078652",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "La Tour du Plan, 5 rue Jean-Jaurès, 83120 Le Plan-de-la-Tour, France",
      "note": {
        "fr": "Repère publié par l’office de tourisme pour cette adresse au Plan-de-la-Tour. Stationnement à proximité ; confirmez l’ouverture et la réservation avant de venir.",
        "en": "Tourist-office location reference for this address in Le Plan-de-la-Tour. Park nearby and confirm opening and booking before travelling."
      }
    }
  ],
  "marche-plan-de-la-tour": [
    {
      "id": "marche-plan-de-la-tour",
      "label": {
        "fr": "Marché provençal du Plan-de-la-Tour",
        "en": "Marché provençal du Plan-de-la-Tour"
      },
      "latitude": 43.3387,
      "longitude": 6.54661,
      "source": "https://www.golfe-saint-tropez-information.com/fr/animation/manifestations-commerciales/plan-de-la-tour/marche-provencal-hebdomadaire-5835396",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Marché provençal du Plan-de-la-Tour, Place Foch, 83120 Le Plan-de-la-Tour, France",
      "note": {
        "fr": "Repère de la place Foch : il situe le secteur du marché, pas un stand ni un parking. Marché annoncé le jeudi matin ; vérifiez sa tenue pour votre date.",
        "en": "Place Foch reference: the market area, not a stall or car park. The market is listed on Thursday mornings; check your date."
      }
    }
  ],
  "eglise-saint-martin-plan-de-la-tour": [
    {
      "id": "eglise-saint-martin-plan-de-la-tour",
      "label": {
        "fr": "Église Saint-Martin du Plan-de-la-Tour",
        "en": "Église Saint-Martin du Plan-de-la-Tour"
      },
      "latitude": 43.339533,
      "longitude": 6.547988,
      "source": "https://www.openstreetmap.org/way/257786784",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Église Saint-Martin du Plan-de-la-Tour, Place Clemenceau, 83120 Le Plan-de-la-Tour, France",
      "note": {
        "fr": "Repère du bâtiment de l’église d’après OpenStreetMap. L’accès intérieur et au clocher reste à confirmer auprès de la paroisse ou de l’office.",
        "en": "Church building reference from OpenStreetMap. Confirm interior and tower access with the parish or tourist office."
      }
    }
  ]
};

// Open-licensed images only. Restaurant and market images are explicitly contextual.
const village=legacyPlaceMedia['plan-de-la-tour-village'];
function areaPhoto(index:number,fr:string,en:string):VillagePhoto{return {...village[index],contextual:true,alt:fr,caption:{fr,en}};}
export const planDeLaTourMedia:Record<string,VillagePhoto[]> = {
 'le-porche-plan-de-la-tour':[areaPhoto(1,'Le Plan-de-la-Tour en 2007 — photo du village, pas du restaurant Le Porche','Le Plan-de-la-Tour in 2007 — village photograph, not Le Porche restaurant')],
 'la-tour-du-plan':[areaPhoto(0,'Les collines du Plan-de-la-Tour en 2009 — photo du secteur, pas du restaurant La Tour du Plan','Le Plan-de-la-Tour hills in 2009 — area photograph, not La Tour du Plan restaurant')],
 'marche-plan-de-la-tour':[areaPhoto(0,'Le Plan-de-la-Tour et ses collines en 2009 — photo du secteur, pas des étals du marché','Le Plan-de-la-Tour and its hills in 2009 — area photograph, not the market stalls')],
 'eglise-saint-martin-plan-de-la-tour':[{...village[2],alt:'Église Saint-Martin au Plan-de-la-Tour, photographie de 2007',caption:{fr:'Église Saint-Martin au Plan-de-la-Tour (2007)',en:'Saint-Martin church in Le Plan-de-la-Tour (2007)'}}]
};
