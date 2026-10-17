import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {VillagePhoto} from './villageMedia';
import {legacyPlaceMedia} from './legacyPlaceMedia';

export const saintTropezPlaces:Place[] = [
  {
    "id": "musee-annonciade-saint-tropez",
    "name": "Musée de l’Annonciade",
    "category": "do",
    "location": "Saint-Tropez",
    "description": "Explore the Annonciade Museum in Saint-Tropez: Signac, colour and modern art beside the harbour. Collections, walking access and practical visiting advice.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Assuming indoor access without checking"
    ],
    "tags": [
      "museum",
      "art",
      "heritage"
    ],
    "goodToKnow": [
      "Plan the final approach on foot and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/musee/saint-tropez/l-annonciade-musee-d-art-moderne-de-saint-tropez-4169909",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "eglise-notre-dame-assomption-saint-tropez",
    "name": "Église Notre-Dame-de-l’Assomption de Saint-Tropez",
    "category": "do",
    "location": "Saint-Tropez",
    "description": "Visit Notre-Dame-de-l’Assomption in Saint-Tropez: the ochre bell tower, façade and interior. Find the church in the old village and plan your walking visit.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Assuming indoor access without checking"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Plan the final approach on foot and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/eglise-notre-dame-de-lassomption-saint-tropez-fr-2868805/",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "chapelle-sainte-anne-saint-tropez",
    "name": "Chapelle Sainte-Anne de Saint-Tropez",
    "category": "do",
    "location": "Saint-Tropez",
    "description": "Discover Sainte-Anne above Saint-Tropez: coastal views, maritime heritage and ex-votos. Plan the Bastidettes approach and check indoor visiting sessions.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Assuming indoor access without checking"
    ],
    "tags": [
      "heritage",
      "history",
      "view",
      "walk"
    ],
    "goodToKnow": [
      "Plan the final approach on foot and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/saint-tropez/chapelle-sainte-anne-4165681",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "port-de-saint-tropez",
    "name": "Port de Saint-Tropez",
    "category": "sea",
    "location": "Saint-Tropez",
    "description": "Plan a walk around Saint-Tropez harbour: quays, boats and nearby lanes. Walking access, busy summer periods and practical advice for exploring the waterfront.",
    "bestFor": [
      "Coastal exploring"
    ],
    "notIdealFor": [
      "Expecting an empty place in summer"
    ],
    "tags": [
      "sea",
      "walk",
      "heritage",
      "view"
    ],
    "goodToKnow": [
      "Plan the final approach on foot and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/saint-tropez/port-de-saint-tropez-5326199",
    "lastVerifiedAt": "2026-10-17"
  },
  {
    "id": "plage-des-graniers",
    "name": "Plage des Graniers",
    "category": "beach",
    "location": "Saint-Tropez",
    "description": "Discover Graniers beach below Saint-Tropez’s Citadelle: a small sandy cove, walking access and practical advice for a coastal pause during summer.",
    "bestFor": [
      "Coastal exploring"
    ],
    "notIdealFor": [
      "Expecting an empty place in summer"
    ],
    "tags": [
      "beach",
      "nature",
      "view",
      "walk"
    ],
    "goodToKnow": [
      "Plan the final approach on foot and check current visiting conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/saint-tropez/plage-des-graniers-4166373",
    "lastVerifiedAt": "2026-10-17"
  }
];

export const saintTropezFacts:Record<string,PlaceFacts> = {
  "musee-annonciade-saint-tropez": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Musée de l’Annonciade à Saint-Tropez : visite et accès",
        "description": "Découvrez le musée de l’Annonciade à Saint-Tropez : Signac, couleur et avant-garde près du port. Accès, collections et conseils pour préparer votre visite.",
        "intro": "À quelques pas des quais, l’Annonciade fait passer du spectacle du port à celui de la couleur. Le musée donne une autre profondeur à Saint-Tropez. Notre idée : lui garder un vrai moment, puis ressortir regarder la lumière sur les façades avec un œil neuf.",
        "facts": [
          [
            "Lieu",
            "Place Georges Grammont, près du port"
          ],
          [
            "Collection",
            "Pointillisme, nabis et fauvisme"
          ],
          [
            "Repère",
            "Paul Signac et l’avant-garde tropézienne"
          ],
          [
            "Visite",
            "Billet ; calendrier et tarifs à vérifier"
          ]
        ],
        "sections": [
          [
            "Saint-Tropez se regarde en couleurs",
            "L’arrivée de Paul Signac en 1892 a contribué à faire de Saint-Tropez un foyer artistique. Créé en 1922, le musée présente notamment des œuvres pointillistes, nabis et fauves. Notre conseil : choisissez quelques tableaux et laissez la couleur guider la visite plutôt que de chercher à tout voir trop vite."
          ],
          [
            "Rejoindre le musée depuis les quais",
            "L’entrée se trouve place Georges Grammont, dans l’ancienne chapelle de l’Annonciade. Après avoir stationné sur un emplacement autorisé en ville, terminez à pied. Le point cartographique situe le musée, pas une place de parking. L’été, prévoyez du temps pour rejoindre le centre."
          ],
          [
            "Préparer sa visite intérieure",
            "Consultez le site municipal pour les horaires, fermetures, expositions et tarifs à votre date. Un billet de musée reste distinct de la promenade gratuite sur les quais. Pour une visite avec poussette ou un besoin d’accessibilité, demandez les modalités au musée avant le déplacement."
          ],
          [
            "Prolonger la couleur dans le village",
            "Notre suggestion : relier le musée au port puis aux ruelles autour de Notre-Dame-de-l’Assomption. La Citadelle et la Maison des Papillons offrent deux autres visites, à choisir selon votre envie. Gardez une pause entre les étapes pour profiter du village sans transformer la journée en course."
          ]
        ],
        "questions": [
          [
            "Où se trouve le musée de l’Annonciade ?",
            "Place Georges Grammont, près du port de Saint-Tropez, dans l’ancienne chapelle de l’Annonciade. L’approche finale se fait à pied depuis le centre."
          ],
          [
            "La visite est-elle gratuite ?",
            "Il s’agit d’un musée avec billetterie et des conditions de réduction ou de gratuité. Consultez les tarifs municipaux actualisés pour votre situation et votre date."
          ]
        ]
      },
      "en": {
        "title": "Annonciade Museum in Saint-Tropez: art and visiting tips",
        "description": "Explore the Annonciade Museum in Saint-Tropez: Signac, colour and modern art beside the harbour. Collections, walking access and practical visiting advice.",
        "intro": "A short walk from the quays, the Annonciade shifts attention from harbour life to colour. The museum gives Saint-Tropez another dimension. Our idea: make room for a proper visit, then return outside to look at the light on the façades with fresh eyes.",
        "facts": [
          [
            "Location",
            "Place Georges Grammont, beside the harbour"
          ],
          [
            "Collection",
            "Pointillism, Nabis and Fauvism"
          ],
          [
            "Focus",
            "Paul Signac and the local avant-garde"
          ],
          [
            "Visits",
            "Ticketed; check current dates and prices"
          ]
        ],
        "sections": [
          [
            "See Saint-Tropez through colour",
            "Paul Signac’s arrival in 1892 helped make Saint-Tropez an artistic centre. Founded in 1922, the museum includes Pointillist, Nabi and Fauvist works. Our advice: choose a few paintings and let colour guide your attention rather than trying to rush through everything."
          ],
          [
            "Walk here from the quays",
            "The entrance is on Place Georges Grammont, in the former Annonciade chapel. Use authorised town parking and finish on foot. The map marks the museum, not a parking space. In summer, allow time to reach the town centre."
          ],
          [
            "Plan the indoor visit",
            "Check the municipal website for opening, closures, exhibitions and current prices. A museum ticket is separate from a free walk beside the harbour. For a pushchair or a specific accessibility requirement, ask the museum about arrangements before travelling."
          ],
          [
            "Continue through the village",
            "Our suggestion: connect the museum with the harbour and the lanes around Notre-Dame-de-l’Assomption. The Citadelle and Maison des Papillons offer other visits to choose around your interests. Leave a break between stops so the day still feels like exploring a village."
          ]
        ],
        "questions": [
          [
            "Where is the Annonciade Museum?",
            "On Place Georges Grammont beside Saint-Tropez harbour, in the former Annonciade chapel. Finish the approach on foot from the town centre."
          ],
          [
            "Is admission free?",
            "The museum has ticketed admission with concession and free-entry conditions. Check current municipal prices for your situation and visit date."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Office de tourisme · Musée de l’Annonciade",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/musee/saint-tropez/l-annonciade-musee-d-art-moderne-de-saint-tropez-4169909"
      },
      {
        "label": "Ville de Saint-Tropez · musée de l’Annonciade",
        "url": "https://www.saint-tropez.fr/culture/musee-de-lannonciade/"
      },
      {
        "label": "Ministère de la Culture · Musée de France",
        "url": "https://pop.culture.gouv.fr/notice/museo/M0941"
      }
    ],
    "nearby": [
      "saint-tropez-village",
      "eglise-notre-dame-assomption-saint-tropez",
      "chapelle-sainte-anne-saint-tropez",
      "port-de-saint-tropez",
      "plage-des-graniers"
    ]
  },
  "eglise-notre-dame-assomption-saint-tropez": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Église de Saint-Tropez : Notre-Dame-de-l’Assomption, visite",
        "description": "Visitez Notre-Dame-de-l’Assomption à Saint-Tropez : clocher ocre, façade et décor intérieur. Localisation dans le vieux village et conseils pour venir à pied.",
        "intro": "On reconnaît Saint-Tropez à son clocher avant même de parcourir ses ruelles. Au pied de Notre-Dame-de-l’Assomption, ce repère familier retrouve l’échelle du village. Notre idée : quitter un moment les quais, lever les yeux, puis prendre le temps d’une halte silencieuse si l’église est ouverte.",
        "facts": [
          [
            "Adresse",
            "Rue Commandant Guichard, vieux village"
          ],
          [
            "Repère",
            "Clocher ocre et terre de Sienne"
          ],
          [
            "Édifice",
            "Église du XVIIIe siècle, clocher antérieur"
          ],
          [
            "Visite",
            "Accès libre annoncé ; respect des offices"
          ]
        ],
        "sections": [
          [
            "Un clocher qui dessine Saint-Tropez",
            "Le clocher, bâti en 1634, précède l’église actuelle du XVIIIe siècle. Sa couleur et son campanile en font un repère au-dessus des toits. Notre conseil : regardez d’abord sa silhouette depuis les ruelles, puis approchez de la façade pour découvrir les détails à hauteur de regard."
          ],
          [
            "Trouver l’église dans les ruelles",
            "Rejoignez la rue Commandant Guichard à pied depuis le port ou le centre. Les rues du vieux village demandent de garder du temps pour les piétons et les détours. Le repère indique l’édifice ; ne cherchez pas à stationner devant son entrée."
          ],
          [
            "Entrer au bon moment",
            "L’accès libre annoncé ne dispense pas de vérifier l’ouverture. L’intérieur présente un décor d’inspiration italienne ; prenez le temps de le découvrir si aucune célébration ne gêne la visite. Restez discret et respectez les consignes de la paroisse. L’accès au clocher n’est pas garanti par cette fiche."
          ],
          [
            "Composer une boucle dans Saint-Tropez",
            "Notre suggestion : relier l’église au port et au musée de l’Annonciade, puis choisir une autre étape selon le temps disponible. Une montée vers la Citadelle se prépare séparément. Pour éviter les rues les plus chargées l’été, privilégiez si possible un départ tôt dans la journée."
          ]
        ],
        "questions": [
          [
            "Quelle église possède le célèbre clocher de Saint-Tropez ?",
            "Notre-Dame-de-l’Assomption, rue Commandant Guichard. Elle est distincte des églises Notre-Dame de Gassin et de Ramatuelle."
          ],
          [
            "Peut-on visiter pendant une messe ?",
            "Les offices ont la priorité. Reportez la visite touristique si une célébration est en cours et vérifiez les conditions auprès de la paroisse."
          ]
        ]
      },
      "en": {
        "title": "Notre-Dame-de-l’Assomption church, Saint-Tropez: visits",
        "description": "Visit Notre-Dame-de-l’Assomption in Saint-Tropez: the ochre bell tower, façade and interior. Find the church in the old village and plan your walking visit.",
        "intro": "The bell tower announces Saint-Tropez before you explore its lanes. At the foot of Notre-Dame-de-l’Assomption, that familiar landmark returns to village scale. Our idea: leave the quays for a while, look up and take a quiet pause inside if the church is open.",
        "facts": [
          [
            "Address",
            "Rue Commandant Guichard, old village"
          ],
          [
            "Landmark",
            "Ochre and sienna bell tower"
          ],
          [
            "Building",
            "18th-century church, earlier tower"
          ],
          [
            "Visits",
            "Listed as free; respect services"
          ]
        ],
        "sections": [
          [
            "A tower in the skyline",
            "Built in 1634, the bell tower predates the present 18th-century church. Its colour and open bell structure stand out above the roofs. Our advice: look at its outline from the lanes before approaching the façade for details at eye level."
          ],
          [
            "Find the church in the lanes",
            "Walk to Rue Commandant Guichard from the harbour or town centre. Allow time for pedestrians and turns in the old village. The map reference marks the church; it is not an invitation to park at the entrance."
          ],
          [
            "Choose the right moment to enter",
            "Listed free access still requires checking opening. Inside, look for the Italian-inspired decoration when no service prevents a visit. Remain quiet and follow parish instructions. This guide does not establish public access to the bell tower."
          ],
          [
            "Build a Saint-Tropez walk",
            "Our suggestion: connect the church with the harbour and Annonciade Museum, then choose another stop around your time. A climb towards the Citadelle is a separate part of the outing. In summer, an early start can make the busiest lanes easier to enjoy."
          ]
        ],
        "questions": [
          [
            "Which church has Saint-Tropez’s famous bell tower?",
            "Notre-Dame-de-l’Assomption on Rue Commandant Guichard. It is separate from the Notre-Dame churches in Gassin and Ramatuelle."
          ],
          [
            "Can I visit during Mass?",
            "Services take priority. Return for sightseeing after a celebration and check parish visiting arrangements."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Office de tourisme · Église Notre-Dame-de-l’Assomption de Saint-Tropez",
        "url": "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/eglise-notre-dame-de-lassomption-saint-tropez-fr-2868805/"
      },
      {
        "label": "Côte d’Azur France · église de Saint-Tropez",
        "url": "https://cotedazurfrance.fr/offres/eglise-notre-dame-de-lassomption-saint-tropez-fr-3001450/"
      }
    ],
    "nearby": [
      "saint-tropez-village",
      "musee-annonciade-saint-tropez",
      "chapelle-sainte-anne-saint-tropez",
      "port-de-saint-tropez",
      "plage-des-graniers"
    ]
  },
  "chapelle-sainte-anne-saint-tropez": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Chapelle Sainte-Anne à Saint-Tropez : panorama et visite",
        "description": "Découvrez Sainte-Anne sur les hauteurs de Saint-Tropez : panorama, patrimoine maritime et ex-voto. Accès par les Bastidettes et ouverture intérieure à préparer.",
        "intro": "Sur les hauteurs de Saint-Tropez, Sainte-Anne invite à prendre du recul sur le village et la mer. La petite chapelle donne une autre mesure au paysage. Notre idée : venir pour le point de vue, puis profiter d’une ouverture annoncée pour découvrir l’histoire maritime conservée à l’intérieur.",
        "facts": [
          [
            "Adresse",
            "21 chemin des Bastidettes, Saint-Tropez"
          ],
          [
            "Patrimoine",
            "Chapelle du XVIIe siècle et ex-voto marins"
          ],
          [
            "Paysage",
            "Vues sur la baie et vers Pampelonne"
          ],
          [
            "Intérieur",
            "Ouvertures programmées ; calendrier à consulter"
          ]
        ],
        "sections": [
          [
            "Un regard plus ample sur la presqu’île",
            "Le site domine le paysage tropézien et ouvre des vues vers la baie et Pampelonne. Notre conseil : gardez un moment pour regarder sans vous presser. Une photographie ne remplace pas ce temps sur place ; la lumière, le vent et la saison changent l’expérience."
          ],
          [
            "Rejoindre le chemin des Bastidettes",
            "Visez l’adresse officielle du 21 chemin des Bastidettes. Depuis le centre, une approche à pied implique une montée : prévoyez de l’eau et choisissez une heure adaptée à la chaleur. Le repère touristique situe le secteur de la chapelle, sans garantir un stationnement ni un chemin sans marche."
          ],
          [
            "La mer se raconte dans les ex-voto",
            "Édifiée au début du XVIIe siècle, Sainte-Anne conserve des ex-voto liés aux marins tropéziens. Les séances avec médiation permettent de mieux comprendre ces témoignages. Consultez l’annonce actualisée de l’office : le calendrier d’ouverture intérieur varie et ne se déduit pas de l’accès au panorama."
          ],
          [
            "Choisir Sainte-Anne comme une vraie étape",
            "Notre suggestion : prévoir cette montée avant de retrouver le port, plutôt que de l’ajouter dans les dernières minutes d’une visite. En été, évitez si possible le plein soleil de l’après-midi. Pour un besoin de mobilité précis, interrogez l’office avant de choisir votre itinéraire."
          ]
        ],
        "questions": [
          [
            "Sainte-Anne est-elle ouverte tous les jours ?",
            "L’intérieur suit un calendrier de visites publié par l’office. Consultez les dates actuelles ; l’accès au site et au panorama ne garantit pas l’ouverture de la chapelle."
          ],
          [
            "Est-ce la chapelle Sainte-Anne de Ramatuelle ?",
            "Non. Cette fiche concerne la chapelle située sur les hauteurs de Saint-Tropez, chemin des Bastidettes. Ramatuelle possède un autre édifice de ce nom."
          ]
        ]
      },
      "en": {
        "title": "Sainte-Anne chapel in Saint-Tropez: views and visiting advice",
        "description": "Discover Sainte-Anne above Saint-Tropez: coastal views, maritime heritage and ex-votos. Plan the Bastidettes approach and check indoor visiting sessions.",
        "intro": "Above Saint-Tropez, Sainte-Anne invites you to step back and see village and sea together. The small chapel gives the landscape a different scale. Our idea: come for the outlook and use an advertised opening session to discover the maritime stories kept inside.",
        "facts": [
          [
            "Address",
            "21 Chemin des Bastidettes, Saint-Tropez"
          ],
          [
            "Heritage",
            "17th-century chapel and maritime ex-votos"
          ],
          [
            "Landscape",
            "Views over the bay and towards Pampelonne"
          ],
          [
            "Interior",
            "Scheduled openings; check the calendar"
          ]
        ],
        "sections": [
          [
            "A wider view of the peninsula",
            "The site looks over the Saint-Tropez landscape towards the bay and Pampelonne. Our advice: leave time simply to look. A photograph cannot replace that pause; changing light, wind and seasons make each visit different."
          ],
          [
            "Approach along Chemin des Bastidettes",
            "Use the official address, 21 Chemin des Bastidettes. Walking from the centre involves an uphill approach: bring water and choose your time around the heat. The tourism map marks the chapel area without guaranteeing parking or a step-free route."
          ],
          [
            "Maritime stories inside",
            "Built in the early 17th century, Sainte-Anne keeps ex-votos connected with local sailors. Mediated visiting sessions help explain these objects. Check the tourist office’s current announcement: interior openings follow a schedule and cannot be inferred from access to the viewpoint."
          ],
          [
            "Give Sainte-Anne its own place in the day",
            "Our suggestion: plan the uphill outing before returning to the harbour rather than squeezing it into the final minutes of a visit. In summer, avoid the hottest afternoon hours where possible. Ask the office about the approach if you have specific mobility requirements."
          ]
        ],
        "questions": [
          [
            "Is Sainte-Anne open every day?",
            "Indoor visits follow the tourist office’s published schedule. Check current dates; access to the surrounding site does not guarantee that the chapel is open."
          ],
          [
            "Is this the Sainte-Anne chapel in Ramatuelle?",
            "No. This guide covers the chapel above Saint-Tropez on Chemin des Bastidettes. Ramatuelle has a different chapel of the same name."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Office de tourisme · Chapelle Sainte-Anne de Saint-Tropez",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/saint-tropez/chapelle-sainte-anne-4165681"
      },
      {
        "label": "Saint-Tropez Tourisme · ouvertures actualisées de Sainte-Anne",
        "url": "https://www.sainttropeztourisme.com/fr/fiche/chapelle-sainte-anne-ouverture-au-public-7386965/"
      }
    ],
    "nearby": [
      "saint-tropez-village",
      "musee-annonciade-saint-tropez",
      "eglise-notre-dame-assomption-saint-tropez",
      "port-de-saint-tropez",
      "plage-des-graniers"
    ]
  },
  "port-de-saint-tropez": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Port de Saint-Tropez : promenade, accès et conseils",
        "description": "Préparez votre promenade sur le port de Saint-Tropez : quais, bateaux et ruelles voisines. Accès à pied, forte affluence estivale et conseils pour votre visite.",
        "intro": "Le port donne immédiatement le rythme de Saint-Tropez : des coques, des façades et des passants qui se croisent au bord de l’eau. Notre idée : commencer par une promenade attentive, regarder aussi les petits bateaux, puis quitter les quais pour découvrir les ruelles du village.",
        "facts": [
          [
            "Lieu",
            "Quais du centre de Saint-Tropez"
          ],
          [
            "Repère officiel",
            "Capitainerie, quai de l’Épi"
          ],
          [
            "À faire",
            "Promenade à pied et découverte du village"
          ],
          [
            "En été",
            "Quais très fréquentés ; arrivée à anticiper"
          ]
        ],
        "sections": [
          [
            "Regarder le port au-delà des yachts",
            "Le port associe plaisance et histoire maritime. Notre conseil : varier les regards entre bateaux, façades et passages vers le village. Les quais accueillent des usages professionnels et des plaisanciers ; gardez les accès libres et respectez les zones réservées aux opérations portuaires."
          ],
          [
            "Arriver dans le centre sans se presser",
            "Préparez votre stationnement ou votre liaison maritime avant de partir. Terminez la découverte à pied sur les quais publics. Le point officiel correspond à la capitainerie du quai de l’Épi : c’est un repère portuaire, pas une garantie de parking ni l’emplacement de chaque débarcadère."
          ],
          [
            "L’été et les événements changent le rythme",
            "En haute saison, la fréquentation peut rendre la promenade très dense. Notre suggestion : venir tôt si votre programme le permet. Lors des rendez-vous nautiques, vérifiez les informations locales et les restrictions du jour ; un accès habituel peut être réorganisé pendant l’événement."
          ],
          [
            "Du bord de l’eau aux ruelles",
            "Reliez le port au musée de l’Annonciade et à Notre-Dame-de-l’Assomption pour changer de perspective sans multiplier les trajets. Si vous venez en bateau ou cherchez une place d’amarrage, consultez directement la capitainerie : les conditions plaisance sont distinctes d’une visite à pied."
          ]
        ],
        "questions": [
          [
            "Faut-il réserver pour se promener sur le port ?",
            "Une promenade sur les quais publics ne nécessite pas une réservation d’amarrage. Les terrasses, excursions et prestations portuaires ont leurs propres conditions."
          ],
          [
            "Le point de carte correspond-il à mon bateau-navette ?",
            "Il situe la capitainerie quai de l’Épi. Pour une traversée, suivez le débarcadère et les horaires indiqués par votre compagnie."
          ]
        ]
      },
      "en": {
        "title": "Saint-Tropez harbour: walking, access and planning tips",
        "description": "Plan a walk around Saint-Tropez harbour: quays, boats and nearby lanes. Walking access, busy summer periods and practical advice for exploring the waterfront.",
        "intro": "The harbour immediately sets the pace of Saint-Tropez: hulls, façades and people passing beside the water. Our idea: begin with an unhurried walk, look at the smaller boats too, then leave the quays to explore the village lanes.",
        "facts": [
          [
            "Location",
            "Quays in central Saint-Tropez"
          ],
          [
            "Official reference",
            "Harbour office, Quai de l’Épi"
          ],
          [
            "Activities",
            "Waterfront walk and village exploring"
          ],
          [
            "Summer",
            "Busy quays; plan your arrival"
          ]
        ],
        "sections": [
          [
            "Look beyond the yachts",
            "The harbour combines leisure boating with maritime history. Our advice: shift your attention between boats, façades and passages into the village. Professionals and boat owners use the waterfront too; keep access clear and respect areas reserved for port operations."
          ],
          [
            "Plan your arrival in town",
            "Arrange parking or a sea crossing before setting off, then explore public quays on foot. The official map reference is the harbour office on Quai de l’Épi: it is not a guaranteed parking space or the location of every passenger landing."
          ],
          [
            "Summer and events change the pace",
            "In high season the promenade can be very busy. Our suggestion: arrive early if your programme allows. Around sailing events, check local announcements and restrictions for the day; familiar routes can be reorganised during an event."
          ],
          [
            "Connect the waterfront with the village",
            "Link the harbour with the Annonciade Museum and Notre-Dame-de-l’Assomption for a different perspective without repeated car journeys. If arriving on your own boat or seeking a berth, contact the harbour office directly: boating arrangements are separate from a walking visit."
          ]
        ],
        "questions": [
          [
            "Do I need a booking to walk around the harbour?",
            "Walking on the public quays does not require a berth reservation. Terraces, excursions and port services have their own arrangements."
          ],
          [
            "Does the map show my passenger boat landing?",
            "It marks the harbour office on Quai de l’Épi. For a crossing, use the landing and timetable specified by your operator."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Office de tourisme · Port de Saint-Tropez",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/saint-tropez/port-de-saint-tropez-5326199"
      },
      {
        "label": "Port de Saint-Tropez · capitainerie officielle",
        "url": "https://www.portsainttropez.com/"
      }
    ],
    "nearby": [
      "saint-tropez-village",
      "musee-annonciade-saint-tropez",
      "eglise-notre-dame-assomption-saint-tropez",
      "chapelle-sainte-anne-saint-tropez",
      "plage-des-graniers"
    ]
  },
  "plage-des-graniers": {
    "verified": "2026-10-17",
    "copy": {
      "fr": {
        "title": "Plage des Graniers à Saint-Tropez : accès et conseils",
        "description": "Découvrez la plage des Graniers à Saint-Tropez, sous la Citadelle : petite crique de sable, accès à pied et conseils pour profiter du littoral en été.",
        "intro": "Sous le versant sud de la Citadelle, les Graniers offrent une pause de sable après les ruelles. Le cadre reste proche du village et la plage garde des dimensions modestes. Notre idée : venir léger, regarder la baie et profiter du rivage sans compter sur une crique vide au cœur de l’été.",
        "facts": [
          [
            "Localisation",
            "Sous la Citadelle, après le cimetière marin"
          ],
          [
            "Rivage",
            "Petite crique de sable"
          ],
          [
            "Accès",
            "Plage gratuite ; arrivée finale à pied"
          ],
          [
            "Animaux",
            "Chiens interdits selon l’office"
          ]
        ],
        "sections": [
          [
            "Une crique à l’échelle du village",
            "L’office situe les Graniers au pied du versant sud de la Citadelle, après le cimetière marin. Notre conseil : en faire une vraie pause au bord de l’eau, avec un programme léger. Sa proximité avec Saint-Tropez ne signifie pas qu’elle puisse absorber sans difficulté l’affluence estivale."
          ],
          [
            "Préparer la dernière partie à pied",
            "Depuis le centre, rejoignez le secteur du cimetière marin puis les indications vers les Graniers. Utilisez un stationnement autorisé en ville et prévoyez la marche finale. Le point cartographique situe la plage, pas un parking ; pour un accès adapté, renseignez-vous avant de descendre."
          ],
          [
            "Choisir son moment en été",
            "La crique est petite : notre suggestion est d’arriver tôt et d’accepter de changer de programme si elle est déjà très occupée. Consultez la signalisation de baignade du jour. Emportez de l’eau, protégez-vous du soleil et ne déduisez pas une surveillance permanente de la présence de baigneurs."
          ],
          [
            "Garder le littoral agréable",
            "L’office indique l’interdiction des chiens. Respectez également les consignes affichées, les fonds marins et les autres usagers. Une pause au restaurant voisin constitue une prestation distincte de l’accès gratuit à la plage. En repartant, retrouvez le village sans laisser de déchets sur le rivage."
          ]
        ],
        "questions": [
          [
            "Les Graniers sont-ils à Pampelonne ?",
            "Non. Cette petite plage se trouve à Saint-Tropez, sous la Citadelle et après le cimetière marin. Pampelonne se situe sur la commune de Ramatuelle."
          ],
          [
            "La plage est-elle gratuite et accepte-t-elle les chiens ?",
            "L’office annonce un accès gratuit et l’interdiction des chiens. Consultez aussi la réglementation affichée sur place."
          ]
        ]
      },
      "en": {
        "title": "Graniers beach in Saint-Tropez: access and beach tips",
        "description": "Discover Graniers beach below Saint-Tropez’s Citadelle: a small sandy cove, walking access and practical advice for a coastal pause during summer.",
        "intro": "Below the southern slope of the Citadelle, Graniers offers a sandy pause after the lanes. The village remains close and the beach is small. Our idea: travel light, enjoy the bay and choose the shore without expecting an empty cove in the middle of summer.",
        "facts": [
          [
            "Location",
            "Below the Citadelle, beyond the marine cemetery"
          ],
          [
            "Shore",
            "Small sandy cove"
          ],
          [
            "Access",
            "Free beach; finish on foot"
          ],
          [
            "Animals",
            "Dogs prohibited according to the tourist office"
          ]
        ],
        "sections": [
          [
            "A cove close to the village",
            "The tourist office places Graniers below the southern slope of the Citadelle, beyond the marine cemetery. Our advice: make it a proper pause beside the water with a light programme. Being close to Saint-Tropez does not mean the small beach has unlimited room for summer crowds."
          ],
          [
            "Plan the final walk",
            "From the centre, head towards the marine cemetery area and follow signs for Graniers. Use authorised town parking and allow for the final walk. The map marks the beach rather than a car park; ask about suitable access before descending if needed."
          ],
          [
            "Choose your time in summer",
            "The cove is small: our suggestion is to arrive early and be ready to change plans if it is already crowded. Check bathing notices on the day. Bring water and sun protection; other swimmers do not establish permanent lifeguard supervision."
          ],
          [
            "Care for the shore",
            "The tourist office states that dogs are prohibited. Follow posted rules, respect marine habitats and share space with other beach users. A meal at the neighbouring restaurant is separate from free beach access. Take all litter back to the village with you."
          ]
        ],
        "questions": [
          [
            "Is Graniers part of Pampelonne?",
            "No. This small beach is in Saint-Tropez, below the Citadelle and beyond the marine cemetery. Pampelonne is in Ramatuelle."
          ],
          [
            "Is access free and are dogs allowed?",
            "The tourist office lists free access and prohibits dogs. Also check the regulations displayed on site."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Office de tourisme · Plage des Graniers",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/saint-tropez/plage-des-graniers-4166373"
      },
      {
        "label": "Saint-Tropez Tourisme · Graniers et réglementation",
        "url": "https://www.sainttropeztourisme.com/fr/fiche/plage-des-graniers-4166373/"
      }
    ],
    "nearby": [
      "saint-tropez-village",
      "musee-annonciade-saint-tropez",
      "eglise-notre-dame-assomption-saint-tropez",
      "chapelle-sainte-anne-saint-tropez",
      "port-de-saint-tropez"
    ]
  }
};

export const saintTropezSignatures = {
  "musee-annonciade-saint-tropez": {
    "fr": {
      "subtitle": "LE PORT DEHORS. LA COULEUR DEDANS.",
      "quote": "SAINT-TROPEZ SE REGARDE AUSSI SUR UNE TOILE.",
      "rhythm": "ENTRER. RALENTIR. REGARDER AUTREMENT.",
      "dark": "UNE VRAIE VISITE, À PRÉPARER AVANT DE VENIR.",
      "close": "RESSORTIR AVEC UN AUTRE REGARD."
    },
    "en": {
      "subtitle": "HARBOUR OUTSIDE. COLOUR WITHIN.",
      "quote": "SEE SAINT-TROPEZ ON CANVAS, TOO.",
      "rhythm": "STEP IN. SLOW DOWN. LOOK AGAIN.",
      "dark": "GIVE YOUR MUSEUM VISIT ROOM IN THE DAY.",
      "close": "RETURN TO THE QUAYS WITH FRESH EYES."
    }
  },
  "eglise-notre-dame-assomption-saint-tropez": {
    "fr": {
      "subtitle": "LE CLOCHER DONNE LE TON.",
      "quote": "UN REPÈRE AU-DESSUS DES TOITS.",
      "rhythm": "QUITTER LES QUAIS. LEVER LES YEUX.",
      "dark": "UNE ÉGLISE VIVANTE, UNE VISITE RESPECTUEUSE.",
      "close": "SAINT-TROPEZ, À HAUTEUR DE RUELLE."
    },
    "en": {
      "subtitle": "THE BELL TOWER SETS THE SCENE.",
      "quote": "A LANDMARK ABOVE THE ROOFS.",
      "rhythm": "LEAVE THE QUAYS. LOOK UP.",
      "dark": "A WORKING CHURCH DESERVES A QUIET VISIT.",
      "close": "SAINT-TROPEZ AT VILLAGE SCALE."
    }
  },
  "chapelle-sainte-anne-saint-tropez": {
    "fr": {
      "subtitle": "PRENDRE DE LA HAUTEUR SUR SAINT-TROPEZ.",
      "quote": "UNE CHAPELLE. LA MER. DU RECUL.",
      "rhythm": "MONTER. SOUFFLER. REGARDER AU LOIN.",
      "dark": "LE PANORAMA ET L’INTÉRIEUR ONT LEUR PROPRE RYTHME.",
      "close": "SAINTE-ANNE MÉRITE LA MONTÉE."
    },
    "en": {
      "subtitle": "SEE SAINT-TROPEZ FROM ABOVE.",
      "quote": "A CHAPEL. THE SEA. ROOM TO LOOK.",
      "rhythm": "WALK UP. PAUSE. LOOK OUT.",
      "dark": "THE VIEW AND THE INTERIOR KEEP DIFFERENT HOURS.",
      "close": "MAKE ROOM FOR SAINTE-ANNE."
    }
  },
  "port-de-saint-tropez": {
    "fr": {
      "subtitle": "SAINT-TROPEZ COMMENCE AU BORD DE L’EAU.",
      "quote": "LES BATEAUX PASSENT. LE REGARD RESTE.",
      "rhythm": "LONGER LES QUAIS. PUIS SUIVRE UNE RUELLE.",
      "dark": "L’ÉTÉ, LE PORT DEMANDE UN PEU D’AVANCE.",
      "close": "LE VILLAGE COMMENCE JUSTE DERRIÈRE."
    },
    "en": {
      "subtitle": "SAINT-TROPEZ BEGINS BESIDE THE WATER.",
      "quote": "BOATS PASS. THE VIEW STAYS.",
      "rhythm": "FOLLOW THE QUAYS. THEN FOLLOW A LANE.",
      "dark": "IN SUMMER, GIVE YOUR ARRIVAL TIME.",
      "close": "THE VILLAGE IS JUST BEHIND THE WATERFRONT."
    }
  },
  "plage-des-graniers": {
    "fr": {
      "subtitle": "UNE PAUSE DE SABLE APRÈS LES RUELLES.",
      "quote": "LA CITADELLE AU-DESSUS. LA MER DEVANT.",
      "rhythm": "VENIR LÉGER. RESTER UN MOMENT.",
      "dark": "PETITE CRIQUE, GRANDE AFFLUENCE POSSIBLE.",
      "close": "LES GRANIERS, LE VILLAGE CÔTÉ MER."
    },
    "en": {
      "subtitle": "A SANDY PAUSE AFTER THE LANES.",
      "quote": "CITADELLE ABOVE. SEA AHEAD.",
      "rhythm": "TRAVEL LIGHT. STAY A WHILE.",
      "dark": "A SMALL COVE CAN FILL QUICKLY.",
      "close": "GRANIERS, THE VILLAGE BY THE SEA."
    }
  }
};

export const saintTropezMapPoints:Record<string,MapPoint[]> = {
  "musee-annonciade-saint-tropez": [
    {
      "id": "musee-annonciade-saint-tropez",
      "label": {
        "fr": "Musée de l’Annonciade",
        "en": "Musée de l’Annonciade"
      },
      "latitude": 43.2711,
      "longitude": 6.63721,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/musee/saint-tropez/l-annonciade-musee-d-art-moderne-de-saint-tropez-4169909",
      "checked": "2026-10-17",
      "kind": "venue",
      "directionsQuery": "Place Georges Grammont, 83990 Saint-Tropez, France",
      "note": {
        "fr": "Repère touristique publié pour le secteur. Le bouton itinéraire recherche l’adresse de visite ; ce point ne garantit ni un parking ni un accès sans marche.",
        "en": "Published tourism reference for the area. Directions search the visit address; this marker does not guarantee parking or step-free access."
      }
    }
  ],
  "eglise-notre-dame-assomption-saint-tropez": [
    {
      "id": "eglise-notre-dame-assomption-saint-tropez",
      "label": {
        "fr": "Église Notre-Dame-de-l’Assomption de Saint-Tropez",
        "en": "Église Notre-Dame-de-l’Assomption de Saint-Tropez"
      },
      "latitude": 43.272793,
      "longitude": 6.639933,
      "source": "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/eglise-notre-dame-de-lassomption-saint-tropez-fr-2868805/",
      "checked": "2026-10-17",
      "kind": "venue",
      "directionsQuery": "Rue Commandant Guichard, 83990 Saint-Tropez, France",
      "note": {
        "fr": "Repère touristique publié pour le secteur. Le bouton itinéraire recherche l’adresse de visite ; ce point ne garantit ni un parking ni un accès sans marche.",
        "en": "Published tourism reference for the area. Directions search the visit address; this marker does not guarantee parking or step-free access."
      }
    }
  ],
  "chapelle-sainte-anne-saint-tropez": [
    {
      "id": "chapelle-sainte-anne-saint-tropez",
      "label": {
        "fr": "Chapelle Sainte-Anne de Saint-Tropez",
        "en": "Chapelle Sainte-Anne de Saint-Tropez"
      },
      "latitude": 43.2595,
      "longitude": 6.64201,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/saint-tropez/chapelle-sainte-anne-4165681",
      "checked": "2026-10-17",
      "kind": "area",
      "directionsQuery": "21 chemin des Bastidettes, 83990 Saint-Tropez, France",
      "note": {
        "fr": "Repère touristique publié pour le secteur. Le bouton itinéraire recherche l’adresse de visite ; ce point ne garantit ni un parking ni un accès sans marche.",
        "en": "Published tourism reference for the area. Directions search the visit address; this marker does not guarantee parking or step-free access."
      }
    }
  ],
  "port-de-saint-tropez": [
    {
      "id": "port-de-saint-tropez",
      "label": {
        "fr": "Port de Saint-Tropez",
        "en": "Port de Saint-Tropez"
      },
      "latitude": 43.272,
      "longitude": 6.6357,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/saint-tropez/port-de-saint-tropez-5326199",
      "checked": "2026-10-17",
      "kind": "area",
      "directionsQuery": "Quai de l’Épi, 83990 Saint-Tropez, France",
      "note": {
        "fr": "Repère officiel de la capitainerie quai de l’Épi, pas de chaque débarcadère. Pour votre traversée, suivez les indications de la compagnie.",
        "en": "Official harbour-office reference on Quai de l’Épi, not every passenger landing. Follow your operator’s directions for a crossing."
      }
    }
  ],
  "plage-des-graniers": [
    {
      "id": "plage-des-graniers",
      "label": {
        "fr": "Plage des Graniers",
        "en": "Plage des Graniers"
      },
      "latitude": 43.2707,
      "longitude": 6.64793,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/saint-tropez/plage-des-graniers-4166373",
      "checked": "2026-10-17",
      "kind": "area",
      "directionsQuery": "Plage des Graniers, 83990 Saint-Tropez, France",
      "note": {
        "fr": "Repère touristique publié pour le secteur. Le bouton itinéraire recherche l’adresse de visite ; ce point ne garantit ni un parking ni un accès sans marche.",
        "en": "Published tourism reference for the area. Directions search the visit address; this marker does not guarantee parking or step-free access."
      }
    }
  ]
};

export const saintTropezMedia:Record<string,VillagePhoto[]> = {
  "musee-annonciade-saint-tropez": [
    {
      "src": "/media/local-places/musee-annonciade-saint-tropez.webp",
      "source": "https://commons.wikimedia.org/wiki/File%3AMus%C3%A9e_de_l%27Annonciade%2C_facade_-_Saint-Tropez%2C_Var%2C_France.jpg",
      "alt": "Façade du musée de l’Annonciade (2024)",
      "caption": {
        "fr": "Façade du musée de l’Annonciade (2024)",
        "en": "Annonciade Museum façade (2024)"
      },
      "credit": "Gnrc / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    }
  ],
  "eglise-notre-dame-assomption-saint-tropez": [
    {
      "src": "/media/local-places/eglise-notre-dame-assomption-saint-tropez.webp",
      "source": "https://commons.wikimedia.org/wiki/File%3AEglise_Notre-Dame-de-lAssomption_de_Saint-Tropez_%28DSC01988%29.jpg",
      "alt": "Le clocher de Notre-Dame-de-l’Assomption, vu du port (2023)",
      "caption": {
        "fr": "Le clocher de Notre-Dame-de-l’Assomption, vu du port (2023)",
        "en": "Notre-Dame-de-l’Assomption bell tower from the harbour (2023)"
      },
      "credit": "Polibil / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    }
  ],
  "chapelle-sainte-anne-saint-tropez": [
    {
      "src": "/media/local-places/chapelle-sainte-anne-saint-tropez.webp",
      "source": "https://commons.wikimedia.org/wiki/File%3ASaint-Tropez_-_Chapelle_Sainte-Anne.jpg",
      "alt": "La chapelle Sainte-Anne (2011)",
      "caption": {
        "fr": "La chapelle Sainte-Anne (2011)",
        "en": "Sainte-Anne chapel (2011)"
      },
      "credit": "Starus / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  ],
  "plage-des-graniers": [
    {
      "src": "/media/local-places/plage-des-graniers.webp",
      "source": "https://commons.wikimedia.org/wiki/File%3AView_of_Plage_des_Graniers_from_the_Citadelle%2C_Saint-Tropez%2C_2004.jpg",
      "alt": "Les Graniers vus de la Citadelle — photographie d’archive, 2004",
      "caption": {
        "fr": "Les Graniers vus de la Citadelle — photographie d’archive, 2004",
        "en": "Graniers from the Citadelle — archive photograph, 2004"
      },
      "credit": "DimiTalen / Wikimedia Commons",
      "license": "CC0 1.0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
    }
  ],
 "port-de-saint-tropez": [legacyPlaceMedia["saint-tropez-village"][1]]
};

