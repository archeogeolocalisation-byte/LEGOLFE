import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {VillagePhoto} from './villageMedia';

export const freinetCroixPlaces:Place[] = [
  {
    "id": "fort-freinet",
    "name": "Fort-Freinet",
    "category": "do",
    "location": "La Garde-Freinet",
    "description": "Visit Fort-Freinet above La Garde-Freinet: medieval village remains, Maures views and walking access. Plan for steep terrain and check conditions before visiting.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "heritage",
      "history",
      "walk",
      "view",
      "nature"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-garde-freinet/fort-freinet-3350325",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "croix-des-maures",
    "name": "Croix des Maures",
    "category": "do",
    "location": "La Garde-Freinet",
    "description": "Discover Croix des Maures above La Garde-Freinet: the 1900 monument, village views and access advice. Distinguish this stop from the climb to Fort-Freinet.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "heritage",
      "walk",
      "view"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-garde-freinet/la-croix-des-maures-3350306",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "conservatoire-patrimoine-freinet",
    "name": "Conservatoire du Patrimoine du Freinet",
    "category": "do",
    "location": "La Garde-Freinet",
    "description": "Visit the Conservatoire du Patrimoine du Freinet: chestnuts, cork, silkworms and Fort-Freinet history. Free museum at Chapelle Saint-Jean, with access and hours.",
    "bestFor": [
      "Local heritage"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "heritage",
      "museum",
      "family",
      "history"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/musee/la-garde-freinet/conservatoire-du-patrimoine-du-freinet-3350250",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "plage-debarquement-la-croix-valmer",
    "name": "Plage du Débarquement à La Croix-Valmer",
    "category": "beach",
    "location": "La Croix-Valmer",
    "description": "Discover Débarquement beach in La Croix-Valmer: sand, 15 August 1944 history, services and seasonal lifeguards. Plan access, parking and your visit.",
    "bestFor": [
      "Coastal discovery"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "beach",
      "family",
      "history",
      "view"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/la-croix-valmer/plage-du-debarquement-839804",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "plage-de-sylvabelle",
    "name": "Plage de Sylvabelle",
    "category": "beach",
    "location": "La Croix-Valmer",
    "description": "Plan Sylvabelle beach in La Croix-Valmer: around a hundred steps down, an unpatrolled natural setting and practical advice for the climb back and your visit.",
    "bestFor": [
      "Coastal discovery"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "beach",
      "nature",
      "view"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/la-croix-valmer/plage-de-sylvabelle-839801",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "circuit-cap-lardier",
    "name": "Circuit du Cap Lardier",
    "category": "do",
    "location": "La Croix-Valmer",
    "description": "Plan the Cap Lardier circuit from Gigaro: an 8.2 km loop, around 3½ hours, scrubland and coastal paths. Official track, starting point and access checks.",
    "bestFor": [
      "Coastal discovery"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "walk",
      "hiking",
      "nature",
      "view"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://destination.portcros-parcnational.fr/fr/trek/681-Circuit-du-Cap-Lardier",
    "lastVerifiedAt": "2026-10-16"
  }
];

export const freinetCroixFacts:Record<string,PlaceFacts> = {
  "fort-freinet": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Fort-Freinet : visite du site et accès à pied",
        "description": "Découvrez le Fort-Freinet à La Garde-Freinet : vestiges du village médiéval, panorama sur les Maures et accès à pied. Un chemin escarpé à préparer avant la visite.",
        "intro": "Au-dessus de La Garde-Freinet, le rocher devient une page d’histoire. Le Fort-Freinet conserve les traces d’un village fortifié et ouvre le regard sur les Maures. Notre idée : venir pour les vestiges autant que pour le paysage, avec le temps et l’équipement nécessaires à une véritable montée.",
        "facts": [
          [
            "Site",
            "Ancien village fortifié médiéval"
          ],
          [
            "Commune",
            "La Garde-Freinet"
          ],
          [
            "Accès",
            "Uniquement à pied depuis le village ou le parking de la Croix"
          ],
          [
            "Terrain",
            "Chemin escarpé ; conditions météo à vérifier"
          ]
        ],
        "sections": [
          [
            "Un village médiéval dans le rocher",
            "Le Fort-Freinet est un ancien habitat fortifié dont l’occupation médiévale est présentée du XIIe au XVIe siècle. La roche, les vestiges et le fossé racontent l’organisation du lieu. Notre conseil : observer la façon dont le relief a été utilisé avant de chercher à reconnaître chaque bâtiment disparu."
          ],
          [
            "Comment accéder au Fort-Freinet ?",
            "Le Conservatoire indique un accès uniquement à pied depuis le village ou le parking de la Croix. Le repère de cette fiche situe le site archéologique, pas un accès automobile au sommet. Suivez le parcours officiel et les indications sur place ; chaussures adaptées, eau et temps pour le retour sont à prévoir."
          ],
          [
            "Une montée qui demande de l’attention",
            "La fiche de randonnée Croix et Fort-Freinet décrit des portions raides, des escarpements et des à-pics. Elle recommande d’éviter pluie et vent. Vérifiez météo et ouverture des massifs, restez sur les passages indiqués et renoncez si les conditions ne conviennent pas au groupe. La distance de 3 km annoncée concerne le circuit combiné, pas un simple accès au fort."
          ],
          [
            "Relier le paysage au musée",
            "Notre suggestion : compléter le site par le Conservatoire du Patrimoine du Freinet, qui présente son histoire et des objets de fouilles. La Croix des Maures est un autre point de vue proche, sur une colline distincte. Choisissez ces étapes selon votre envie de marche et les horaires du musée."
          ]
        ],
        "questions": [
          [
            "Peut-on monter au Fort-Freinet en voiture ?",
            "Non. Le site se rejoint à pied depuis le village ou le parking de la Croix. La carte ne désigne pas une route automobile jusqu’aux vestiges."
          ],
          [
            "La visite convient-elle à une promenade facile ?",
            "L’approche est escarpée et le circuit officiel comporte des passages difficiles. Consultez la fiche de randonnée et choisissez un programme adapté à votre groupe."
          ]
        ]
      },
      "en": {
        "title": "Fort-Freinet: medieval remains and walking access",
        "description": "Visit Fort-Freinet above La Garde-Freinet: medieval village remains, Maures views and walking access. Plan for steep terrain and check conditions before visiting.",
        "intro": "Above La Garde-Freinet, the rock becomes a page of history. Fort-Freinet preserves traces of a fortified village and opens the view across the Maures. Our idea: come for the remains as much as the landscape, allowing the time and equipment needed for a proper climb.",
        "facts": [
          [
            "Site",
            "Former medieval fortified village"
          ],
          [
            "Commune",
            "La Garde-Freinet"
          ],
          [
            "Access",
            "On foot only from the village or Croix car park"
          ],
          [
            "Terrain",
            "Steep path; check weather conditions"
          ]
        ],
        "sections": [
          [
            "A village shaped by rock",
            "Fort-Freinet is a former fortified settlement whose medieval occupation is presented from the 12th to 16th centuries. Rock, remains and the ditch reveal its organisation. Our advice: look at how people used the terrain before trying to identify every vanished building."
          ],
          [
            "How to reach Fort-Freinet",
            "The Conservatoire describes access on foot only from the village or Croix car park. This page’s marker locates the archaeological site, not vehicle access to the summit. Follow official routes and local signs, bringing suitable shoes, water and time for the return."
          ],
          [
            "A climb requiring attention",
            "The Croix and Fort-Freinet walking listing describes steep sections, rocky passages and drops. It advises avoiding rain and wind. Check weather and forest access, keep to indicated routes and turn back if conditions do not suit your group. The listed 3 km refers to the combined circuit, not simply reaching the fort."
          ],
          [
            "Connect landscape and museum",
            "Our suggestion: complement the site with the Conservatoire du Patrimoine du Freinet, which presents its history and excavated objects. Croix des Maures is another nearby viewpoint on a separate hill. Choose stops around your walking plans and museum opening."
          ]
        ],
        "questions": [
          [
            "Can I drive to Fort-Freinet?",
            "No. Walk from the village or Croix car park. The map does not indicate a road to the remains."
          ],
          [
            "Is it an easy stroll?",
            "The approach is steep and the official circuit has difficult sections. Consult the route and choose an outing suitable for your group."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source officielle · Fort-Freinet",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-garde-freinet/fort-freinet-3350325"
      },
      {
        "label": "Conservatoire du Freinet · accès et histoire",
        "url": "https://www.conservatoiredufreinet.org/sites-et-patrimoine/le-fort-freinet/"
      },
      {
        "label": "Office de tourisme · randonnée Croix et Fort-Freinet",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-la-croix-et-le-fort-freinet-4599409"
      },
      {
        "label": "Préfecture du Var · accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      }
    ],
    "nearby": [
      "croix-des-maures",
      "conservatoire-patrimoine-freinet"
    ]
  },
  "croix-des-maures": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Croix des Maures à La Garde-Freinet : panorama et accès",
        "description": "La Croix des Maures surplombe La Garde-Freinet : monument de 1900, point de vue sur le village et accès à préparer. À distinguer de la montée au Fort-Freinet.",
        "intro": "Depuis le village, on lève les yeux vers elle ; depuis la Croix des Maures, on regarde le village autrement. Ce monument installé sur sa colline donne une étape de panorama au cœur des Maures. Notre suggestion : lui garder un moment à part, avec une approche préparée et du temps pour observer le relief.",
        "facts": [
          [
            "Adresse",
            "Colline de la Croix, 83680 La Garde-Freinet"
          ],
          [
            "Monument",
            "Croix consacrée le 3 mai 1900"
          ],
          [
            "Hauteur annoncée",
            "6 mètres"
          ],
          [
            "Point de vue",
            "Sur le village et les paysages des Maures"
          ]
        ],
        "sections": [
          [
            "Un emblème au-dessus des toits",
            "La Croix des Maures a été consacrée le 3 mai 1900. L’office décrit un monument de six mètres, restauré en 1978. Notre idée : regarder ensemble la croix et le village qu’elle domine, pour retrouver depuis la hauteur les rues et les places parcourues plus tôt."
          ],
          [
            "Choisir son approche vers la Croix",
            "Préparez l’arrivée vers le parking de la Croix puis le chemin vers le monument selon les indications locales. Le point officiel situe la croix, pas une place de stationnement. L’accès au point de vue et la randonnée qui poursuit vers le Fort-Freinet ne sont pas une seule et même étape."
          ],
          [
            "La Croix et le Fort-Freinet : deux objectifs",
            "La fiche combinée propose un circuit de 3 km, environ 1h30, avec 100 m de dénivelé et des passages difficiles. Ces chiffres concernent l’ensemble de la randonnée. Avant de prolonger vers le fort, consultez le tracé et vérifiez météo, terrain et accès aux massifs."
          ],
          [
            "Un panorama à composer avec le village",
            "Notre suggestion : associer le point de vue à une promenade dans La Garde-Freinet ou à la visite du Conservatoire. Laissez de la place au retour et évitez de caler un rendez-vous trop serré après la marche. Suivez les consignes affichées et renoncez à la montée si les conditions sont défavorables."
          ]
        ],
        "questions": [
          [
            "La Croix des Maures est-elle au Fort-Freinet ?",
            "Ce sont deux sites distincts sur des collines voisines. Le circuit officiel permet de les associer, avec des passages escarpés."
          ],
          [
            "Les 3 km correspondent-ils à la Croix seule ?",
            "Non : l’itinéraire annoncé sur 3 km concerne le circuit combiné Croix et Fort-Freinet. Choisissez le tracé adapté à votre sortie."
          ]
        ]
      },
      "en": {
        "title": "Croix des Maures, La Garde-Freinet: views and access",
        "description": "Discover Croix des Maures above La Garde-Freinet: the 1900 monument, village views and access advice. Distinguish this stop from the climb to Fort-Freinet.",
        "intro": "From the village you look up towards it; from Croix des Maures you see the village differently. This hilltop monument offers a viewpoint in the heart of the Maures. Our suggestion: give it its own time, with a planned approach and room to observe the landscape.",
        "facts": [
          [
            "Location",
            "Colline de la Croix, 83680 La Garde-Freinet"
          ],
          [
            "Monument",
            "Cross consecrated on 3 May 1900"
          ],
          [
            "Listed height",
            "6 metres"
          ],
          [
            "View",
            "Village and Maures landscape"
          ]
        ],
        "sections": [
          [
            "An emblem above the rooftops",
            "Croix des Maures was consecrated on 3 May 1900. The tourist office describes a six-metre monument restored in 1978. Our idea: look at both the cross and the village below, finding streets and squares visited earlier."
          ],
          [
            "Plan the approach",
            "Plan your arrival towards Croix car park, then follow local directions to the monument. The official point marks the cross, not a parking space. Reaching this viewpoint and continuing on the Fort-Freinet hike are separate stages."
          ],
          [
            "Two destinations on neighbouring hills",
            "The combined listing describes 3 km, around 1½ hours, 100 m elevation gain and difficult sections. Those figures concern the full circuit. Before continuing towards the fort, check the track, weather, terrain and forest access."
          ],
          [
            "Pair the view with the village",
            "Our suggestion: combine the viewpoint with a village walk or the Conservatoire. Leave time for the return and avoid tight appointments after the walk. Follow local notices and postpone the climb in unsuitable conditions."
          ]
        ],
        "questions": [
          [
            "Is Croix des Maures part of Fort-Freinet?",
            "They are separate sites on neighbouring hills. The official circuit connects them with steep sections."
          ],
          [
            "Does the 3 km figure refer to the cross alone?",
            "No: it refers to the combined Croix and Fort-Freinet route. Choose the track that suits your outing."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source officielle · Croix des Maures",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-garde-freinet/la-croix-des-maures-3350306"
      },
      {
        "label": "Office de tourisme · circuit Croix et Fort-Freinet",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-garde-freinet/la-garde-freinet-la-croix-et-le-fort-freinet-4599409"
      },
      {
        "label": "Préfecture du Var · accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      }
    ],
    "nearby": [
      "fort-freinet",
      "conservatoire-patrimoine-freinet"
    ]
  },
  "conservatoire-patrimoine-freinet": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Conservatoire du Freinet : musée à La Garde-Freinet",
        "description": "Visitez le Conservatoire du Patrimoine du Freinet : châtaigne, liège, vers à soie et histoire du Fort-Freinet. Musée gratuit à la chapelle Saint-Jean, horaires et accès.",
        "intro": "Avant de regarder les Maures comme un simple paysage de forêt, le Conservatoire donne envie d’en comprendre les gestes et les métiers. Châtaigne, liège, vers à soie et histoire du Fort-Freinet composent cette visite au village. Notre idée : la placer avant une promenade, pour reconnaître ensuite ce que racontent les arbres et les pierres.",
        "facts": [
          [
            "Adresse",
            "Chapelle Saint-Jean, RD 558, 83680 La Garde-Freinet"
          ],
          [
            "Entrée du musée",
            "Gratuite"
          ],
          [
            "Horaires annoncés",
            "Lundi–vendredi : 9h–13h et 14h–17h"
          ],
          [
            "Fermetures",
            "Week-ends et jours fériés ; confirmer avant la visite"
          ]
        ],
        "sections": [
          [
            "Les Maures à travers leurs savoir-faire",
            "Les expositions présentent la culture de la châtaigne, l’exploitation du liège et l’élevage des vers à soie. Une salle est consacrée au Fort-Freinet. Notre conseil : choisir un thème qui vous intrigue et laisser les objets, les photographies et les explications donner une autre lecture du territoire."
          ],
          [
            "Rejoindre la chapelle Saint-Jean",
            "Le musée se trouve à la chapelle Saint-Jean, sur la RD 558, à La Garde-Freinet. Utilisez un stationnement autorisé à proximité et terminez à pied. Le repère correspond au lieu d’accueil ; demandez les conditions d’accès au Conservatoire si votre groupe a des besoins particuliers."
          ],
          [
            "Horaires du musée et activités accompagnées",
            "Le site du Conservatoire annonce une entrée gratuite du lundi au vendredi, 9h–13h et 14h–17h, hors jours fériés. Vérifiez l’ouverture avant une visite ciblée. Ateliers, balades et animations relèvent de programmes et de réservations séparés ; l’entrée au musée n’inclut pas toutes les activités."
          ],
          [
            "Un bon début pour découvrir le Freinet",
            "Notre suggestion : associer le musée à une promenade au village. Une montée vers la Croix ou le Fort-Freinet peut suivre si les conditions et votre groupe s’y prêtent ; elle nécessite une préparation distincte. Le musée reste aussi une étape à part entière pour découvrir l’histoire locale."
          ]
        ],
        "questions": [
          [
            "Le Conservatoire du Freinet est-il gratuit ?",
            "L’entrée du musée est annoncée gratuite. Les animations et sorties accompagnées peuvent avoir leurs propres tarifs et conditions de réservation."
          ],
          [
            "Peut-on visiter le musée le week-end ?",
            "Les horaires habituels annoncés sont du lundi au vendredi, hors jours fériés. Consultez le Conservatoire pour les ouvertures ou animations exceptionnelles."
          ]
        ]
      },
      "en": {
        "title": "Conservatoire du Freinet: heritage museum in La Garde-Freinet",
        "description": "Visit the Conservatoire du Patrimoine du Freinet: chestnuts, cork, silkworms and Fort-Freinet history. Free museum at Chapelle Saint-Jean, with access and hours.",
        "intro": "Before seeing the Maures simply as forest scenery, the Conservatoire helps you understand its trades and skills. Chestnuts, cork, silkworms and Fort-Freinet history shape this village visit. Our idea: go before a walk, then recognise more of the stories held by the trees and stone.",
        "facts": [
          [
            "Address",
            "Chapelle Saint-Jean, RD 558, 83680 La Garde-Freinet"
          ],
          [
            "Museum entry",
            "Free"
          ],
          [
            "Listed hours",
            "Monday–Friday: 9am–1pm and 2pm–5pm"
          ],
          [
            "Closures",
            "Weekends and public holidays; confirm before visiting"
          ]
        ],
        "sections": [
          [
            "Skills behind the landscape",
            "Exhibitions cover chestnut growing, cork harvesting and silkworm rearing. Another room focuses on Fort-Freinet. Our advice: choose a theme that interests you and let objects, photographs and explanations offer another view of the area."
          ],
          [
            "Finding Chapelle Saint-Jean",
            "The museum occupies Chapelle Saint-Jean on the RD 558 in La Garde-Freinet. Use authorised nearby parking and finish on foot. The marker identifies the reception site; ask about arrangements if your group has specific access needs."
          ],
          [
            "Museum opening and guided activities",
            "The Conservatoire lists free entry Monday–Friday, 9am–1pm and 2pm–5pm, excluding public holidays. Confirm opening before a special trip. Workshops, walks and other activities have separate programmes and booking arrangements; museum entry does not include every activity."
          ],
          [
            "A starting point for discovering the Freinet",
            "Our suggestion: pair the museum with a village stroll. A climb to the cross or Fort-Freinet can follow if conditions and your group allow, but requires separate planning. The museum is also a worthwhile outing in its own right."
          ]
        ],
        "questions": [
          [
            "Is the Conservatoire free?",
            "Museum entry is listed as free. Guided outings and activities may have separate prices and booking conditions."
          ],
          [
            "Can I visit at the weekend?",
            "Normal listed hours are Monday–Friday, excluding public holidays. Ask about exceptional openings and events."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source officielle · Conservatoire du Patrimoine du Freinet",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/musee/la-garde-freinet/conservatoire-du-patrimoine-du-freinet-3350250"
      },
      {
        "label": "Conservatoire du Freinet · musée et horaires",
        "url": "https://www.conservatoiredufreinet.org/musee/"
      }
    ],
    "nearby": [
      "fort-freinet",
      "croix-des-maures"
    ]
  },
  "plage-debarquement-la-croix-valmer": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Plage du Débarquement à La Croix-Valmer : accès et mémoire",
        "description": "La plage du Débarquement à La Croix-Valmer : sable, mémoire du 15 août 1944, services et surveillance saisonnière. Accès, stationnement et conseils de visite.",
        "intro": "Au Débarquement, la journée de plage rencontre une page de l’histoire de Provence. Le sable, les services à proximité et les repères de mémoire composent une étape à plusieurs rythmes. Notre idée : prendre un moment pour les panneaux et les stèles avant de laisser la mer occuper le reste de la journée.",
        "facts": [
          [
            "Adresse",
            "Plage du Débarquement, 83420 La Croix-Valmer"
          ],
          [
            "Mémoire",
            "Débarquement de Provence, 15 août 1944"
          ],
          [
            "Surveillance",
            "Saisonnière ; horaires du poste à vérifier"
          ],
          [
            "Services",
            "Restauration, commerces et dispositif Handiplage annoncés"
          ]
        ],
        "sections": [
          [
            "La plage et la mémoire de Provence",
            "Le nom rappelle le Débarquement de Provence du 15 août 1944. L’office signale des stèles et panneaux qui permettent de replacer le rivage dans cette histoire. Notre conseil : garder ce temps de découverte, même si l’objectif principal de la journée reste la plage."
          ],
          [
            "Préparer l’accès et le stationnement",
            "Rejoignez le secteur du Débarquement à La Croix-Valmer, distinct du centre du village et de Gigaro. Utilisez les emplacements autorisés et vérifiez le stationnement saisonnier. Une navette estivale est annoncée : consultez les dates et arrêts du moment. Le point cartographique situe le secteur de plage, pas une place disponible."
          ],
          [
            "Services et baignade en saison",
            "La surveillance est annoncée de juin à septembre, avec des horaires variables. Consultez les informations locales et les drapeaux avant de vous baigner. Si vous comptez sur Handiplage, confirmez ses dates et modalités ; la présence du dispositif dans une fiche ne garantit pas un accueil à toute heure."
          ],
          [
            "Construire une journée au bord de l’eau",
            "Notre idée : associer la promenade et la plage à une pause dans un établissement ouvert pour vos dates. Les activités nautiques et les liaisons maritimes se préparent avec leurs opérateurs. Pour Sylvabelle ou une randonnée au Cap Lardier, prévoyez une autre approche et du temps de déplacement."
          ]
        ],
        "questions": [
          [
            "Cette plage est-elle à Cavalaire ?",
            "Cette fiche concerne la plage du Débarquement de La Croix-Valmer. Vérifiez la commune avant de choisir votre itinéraire."
          ],
          [
            "La surveillance est-elle permanente ?",
            "Non. Elle est saisonnière, avec des horaires à confirmer auprès du poste et sur les informations officielles."
          ]
        ]
      },
      "en": {
        "title": "Débarquement beach, La Croix-Valmer: access and history",
        "description": "Discover Débarquement beach in La Croix-Valmer: sand, 15 August 1944 history, services and seasonal lifeguards. Plan access, parking and your visit.",
        "intro": "At Débarquement beach, a seaside day meets a chapter of Provençal history. Sand, nearby services and memorial markers offer different ways to spend time here. Our idea: pause by the panels and monuments before leaving the rest of the day to the sea.",
        "facts": [
          [
            "Address",
            "Plage du Débarquement, 83420 La Croix-Valmer"
          ],
          [
            "History",
            "Provence landings, 15 August 1944"
          ],
          [
            "Lifeguards",
            "Seasonal; check posted hours"
          ],
          [
            "Services",
            "Food, shops and Handiplage facilities listed"
          ]
        ],
        "sections": [
          [
            "Beach and remembrance",
            "The name recalls the Provence landings of 15 August 1944. The office lists memorials and information panels placing the shore in its historical context. Our advice: leave time for them even if the main aim is a beach day."
          ],
          [
            "Plan your arrival",
            "Head to the Débarquement area in La Croix-Valmer, distinct from the village centre and Gigaro. Use authorised parking and check seasonal arrangements. A summer shuttle is listed; confirm current dates and stops. The marker identifies the beach area, not an available space."
          ],
          [
            "Services and seasonal swimming",
            "Lifeguard cover is listed from June to September, with varying hours. Check local information and flags before swimming. If using Handiplage, confirm dates and arrangements rather than assuming the service is available at all times."
          ],
          [
            "Build a day by the water",
            "Our idea: combine a walk and the beach with a break at an establishment open for your date. Arrange water activities and boat connections with their operators. Sylvabelle and a Cap Lardier hike need different approaches and time to travel."
          ]
        ],
        "questions": [
          [
            "Is this beach in Cavalaire?",
            "This page concerns Débarquement beach in La Croix-Valmer. Check the commune before planning directions."
          ],
          [
            "Are lifeguards always present?",
            "No. Cover is seasonal, with hours to confirm using local notices and official information."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source officielle · Plage du Débarquement à La Croix-Valmer",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/la-croix-valmer/plage-du-debarquement-839804"
      },
      {
        "label": "La Croix-Valmer Tourisme · plage et services",
        "url": "https://www.lacroixvalmertourisme.com/fr/decouvrir-et-s-evader/les-pieds-dans-l-eau/le-debarquement"
      }
    ],
    "nearby": [
      "plage-de-sylvabelle",
      "circuit-cap-lardier",
      "la-croix-valmer-village",
      "gigaro-beach"
    ]
  },
  "plage-de-sylvabelle": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Plage de Sylvabelle : accès par les marches à La Croix-Valmer",
        "description": "Sylvabelle à La Croix-Valmer : plage naturelle accessible par un escalier d’environ cent marches, non surveillée. Accès, remontée et conseils pour la journée.",
        "intro": "À Sylvabelle, la descente fait déjà partie du souvenir : la végétation, l’escalier puis la mer qui apparaît. Cette plage de La Croix-Valmer invite à ralentir, sans oublier l’effort du retour. Notre idée : choisir une journée où l’on peut voyager léger et laisser au paysage une vraie place.",
        "facts": [
          [
            "Adresse",
            "Plage de Sylvabelle, 83420 La Croix-Valmer"
          ],
          [
            "Accès",
            "Escalier de près d’une centaine de marches"
          ],
          [
            "Surveillance",
            "Plage annoncée non surveillée"
          ],
          [
            "Retour",
            "Remontée à prévoir avec toutes ses affaires"
          ]
        ],
        "sections": [
          [
            "Une plage en contrebas du littoral",
            "Sylvabelle se découvre après un escalier à flanc de pente. La végétation et les rochers composent le décor autour du sable. Notre conseil : prendre le temps de regarder l’arrivée depuis le haut, puis choisir son installation sans attendre une plage vide en plein été."
          ],
          [
            "Les marches font partie du choix",
            "L’office annonce près d’une centaine de marches. Prévoyez la descente et la remontée avec vos affaires ; cette approche ne convient pas à tous les groupes. Le repère situe la plage, pas le haut de l’escalier ni un accès de stationnement garanti. Demandez conseil si la mobilité est un critère important."
          ],
          [
            "Préparer sa baignade et sa pause",
            "Sylvabelle est annoncée non surveillée. Vérifiez mer, météo et informations affichées avant de vous baigner. Prévoyez eau, protection solaire et le nécessaire pour la durée choisie. Un restaurant annoncé à proximité peut nécessiter de remonter vers la route : confirmez son ouverture avant de compter dessus."
          ],
          [
            "Revenir avec le temps de la remontée",
            "Notre suggestion : garder une marge pour remonter et rejoindre votre véhicule ou la navette saisonnière. Consultez les dates des transports et les conditions de stationnement plutôt que de vous fier à un ancien horaire. Emportez vos déchets et protégez la végétation qui accompagne l’accès."
          ]
        ],
        "questions": [
          [
            "Sylvabelle est-elle surveillée ?",
            "Non, l’office de tourisme l’annonce non surveillée. Consultez les conditions et les informations du jour avant la baignade."
          ],
          [
            "Combien de marches faut-il descendre ?",
            "Les sources officielles parlent d’un escalier de près d’une centaine de marches. Prévoyez aussi la remontée et le transport de vos affaires."
          ]
        ]
      },
      "en": {
        "title": "Sylvabelle beach, La Croix-Valmer: steps, access and advice",
        "description": "Plan Sylvabelle beach in La Croix-Valmer: around a hundred steps down, an unpatrolled natural setting and practical advice for the climb back and your visit.",
        "intro": "At Sylvabelle, the descent is already part of the memory: vegetation, steps and the sea appearing below. This La Croix-Valmer beach invites you to slow down while allowing for the climb back. Our idea: choose a day for travelling light and giving the landscape time.",
        "facts": [
          [
            "Address",
            "Plage de Sylvabelle, 83420 La Croix-Valmer"
          ],
          [
            "Access",
            "Around a hundred steps"
          ],
          [
            "Lifeguards",
            "Listed as unpatrolled"
          ],
          [
            "Return",
            "Allow for climbing back with your belongings"
          ]
        ],
        "sections": [
          [
            "A beach below the coastal road",
            "Sylvabelle is reached by steps down the slope. Vegetation and rocks frame the sand. Our advice: take in the approach from above, then choose your spot without expecting an empty beach in high summer."
          ],
          [
            "The steps are part of the choice",
            "The office describes around a hundred steps. Plan both descent and return with your belongings; this approach does not suit every group. The marker identifies the beach, not the top of the steps or guaranteed parking. Ask for advice if mobility matters to your plans."
          ],
          [
            "Prepare your swim and break",
            "Sylvabelle is listed as unpatrolled. Check sea conditions, weather and notices before swimming. Bring water, sun protection and supplies for your planned stay. A nearby restaurant may require returning towards the road; confirm opening before relying on it."
          ],
          [
            "Leave time for the climb back",
            "Our suggestion: allow time to climb back and reach your car or seasonal shuttle. Check transport dates and parking arrangements rather than relying on an old timetable. Take rubbish away and protect vegetation along the approach."
          ]
        ],
        "questions": [
          [
            "Does Sylvabelle have lifeguards?",
            "The tourist office lists it as unpatrolled. Check daily conditions and information before swimming."
          ],
          [
            "How many steps are there?",
            "Official sources describe around a hundred steps. Allow for the return climb and carrying your belongings."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source officielle · Plage de Sylvabelle",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/la-croix-valmer/plage-de-sylvabelle-839801"
      },
      {
        "label": "La Croix-Valmer Tourisme · accès et surveillance",
        "url": "https://www.lacroixvalmertourisme.com/fr/decouvrir-et-s-evader/les-pieds-dans-l-eau/sylvabelle"
      }
    ],
    "nearby": [
      "plage-debarquement-la-croix-valmer",
      "circuit-cap-lardier",
      "la-croix-valmer-village",
      "gigaro-beach"
    ]
  },
  "circuit-cap-lardier": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Circuit du Cap Lardier depuis Gigaro : randonnée de 8,2 km",
        "description": "Préparez le circuit du Cap Lardier depuis Gigaro : boucle de 8,2 km, environ 3h30, maquis et sentier du littoral. Tracé officiel, départ et accès aux massifs.",
        "intro": "Au Cap Lardier, la marche donne sa dimension au paysage. Le circuit du Parc national relie maquis, sous-bois et littoral au départ de Gigaro. Notre idée : lui consacrer une vraie demi-journée, avec le temps des points de vue, plutôt que de le glisser entre deux rendez-vous de plage.",
        "facts": [
          [
            "Départ et retour",
            "Point d’accueil de Gigaro, La Croix-Valmer"
          ],
          [
            "Circuit officiel",
            "Boucle de 8,2 km"
          ],
          [
            "Durée et relief",
            "Environ 3h30 ; +282 m annoncés"
          ],
          [
            "Difficulté",
            "Intermédiaire ; accès et météo à vérifier"
          ]
        ],
        "sections": [
          [
            "Le Cap Lardier par le maquis et la mer",
            "Le circuit officiel rejoint le cap par les pistes et sentiers de l’intérieur, puis revient par le littoral vers les Brouis, Jovat et Gigaro. Cette fiche concerne cette boucle précise, pas l’itinéraire des Deux Caps ni le prolongement vers Taillat. Téléchargez le tracé correspondant avant de partir."
          ],
          [
            "Départ au point d’accueil de Gigaro",
            "Rejoignez Gigaro, utilisez les stationnements autorisés et gagnez l’entrée du site à pied. Le marqueur correspond au départ du GPX du Parc national : ce n’est pas la pointe du cap ni une route automobile jusqu’à celle-ci. Vérifiez les conditions de stationnement et de navette pour vos dates."
          ],
          [
            "8,2 km à préparer comme une randonnée",
            "Le Parc annonce environ 3h30, 8,2 km et 282 m de dénivelé positif, pour un niveau intermédiaire. Ajoutez vos pauses. Emportez eau, chaussures adaptées, protection solaire et le tracé hors connexion ; gardez une marge pour le retour plutôt que de compter sur un temps de marche identique pour tous."
          ],
          [
            "Vérifier l’ouverture et respecter le site",
            "Consultez les informations du Parc, la météo et la carte officielle d’accès aux massifs avant le départ. Respectez les éventuelles fermetures et restez sur les chemins indiqués. Notre suggestion : reporter la boucle lorsque les conditions ne s’y prêtent pas et garder Gigaro comme une sortie distincte."
          ]
        ],
        "questions": [
          [
            "Quel parcours décrit cette fiche ?",
            "Le circuit du Cap Lardier publié par le Parc national : une boucle de 8,2 km, environ 3h30, au départ et au retour du point d’accueil de Gigaro."
          ],
          [
            "La carte permet-elle de rejoindre le cap en voiture ?",
            "Non. Le marqueur situe le départ à Gigaro. Le cap se rejoint ensuite à pied selon l’itinéraire et les conditions d’ouverture."
          ]
        ]
      },
      "en": {
        "title": "Cap Lardier circuit from Gigaro: official 8.2 km hike",
        "description": "Plan the Cap Lardier circuit from Gigaro: an 8.2 km loop, around 3½ hours, scrubland and coastal paths. Official track, starting point and access checks.",
        "intro": "At Cap Lardier, walking gives the landscape its scale. The National Park circuit connects scrubland, woodland and coast from Gigaro. Our idea: give it a proper half-day with time for viewpoints rather than squeezing it between beach appointments.",
        "facts": [
          [
            "Start and finish",
            "Gigaro visitor point, La Croix-Valmer"
          ],
          [
            "Official circuit",
            "8.2 km loop"
          ],
          [
            "Time and ascent",
            "Around 3½ hours; +282 m listed"
          ],
          [
            "Difficulty",
            "Intermediate; check access and weather"
          ]
        ],
        "sections": [
          [
            "A circuit through scrubland and coast",
            "The official loop approaches the headland through inland paths, then returns along the coast via Les Brouis, Jovat and Gigaro. This page describes that specific route rather than the Two Caps circuit or an extension to Taillat. Download the matching track before setting out."
          ],
          [
            "Start at Gigaro’s visitor point",
            "Head to Gigaro, use authorised parking and walk to the site entrance. The marker matches the start of the Park’s GPX, not the headland or a road to it. Check parking and shuttle arrangements for your dates."
          ],
          [
            "Prepare for an 8.2 km hike",
            "The Park lists around 3½ hours, 8.2 km and 282 m ascent at intermediate level. Add breaks. Bring water, suitable shoes, sun protection and an offline track, allowing time for the return instead of assuming everyone walks at the same speed."
          ],
          [
            "Check opening and respect the site",
            "Consult Park information, weather and the official forest-access map before leaving. Follow closures and stay on indicated paths. Our suggestion: postpone the loop in unsuitable conditions and treat Gigaro beach as a separate outing."
          ]
        ],
        "questions": [
          [
            "Which route does this page cover?",
            "The National Park’s Cap Lardier circuit: an 8.2 km loop taking around 3½ hours, starting and finishing at Gigaro’s visitor point."
          ],
          [
            "Does the map show vehicle access to the headland?",
            "No. It marks the Gigaro starting point. Continue on foot using the official route and current access information."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source officielle · Circuit du Cap Lardier",
        "url": "https://destination.portcros-parcnational.fr/fr/trek/681-Circuit-du-Cap-Lardier"
      },
      {
        "label": "Parc national · tracé GPX du circuit",
        "url": "https://geotrek-admin.portcros-parcnational.fr/api/fr/treks/681/circuit-du-cap-lardier.gpx"
      },
      {
        "label": "La Croix-Valmer Tourisme · balades et découvertes",
        "url": "https://www.lacroixvalmertourisme.com/fr/decouvrir-et-s-evader/ecrin-de-verdure/balades-et-decouvertes"
      },
      {
        "label": "Préfecture du Var · accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      }
    ],
    "nearby": [
      "plage-debarquement-la-croix-valmer",
      "plage-de-sylvabelle",
      "la-croix-valmer-village",
      "gigaro-beach"
    ]
  }
};

export const freinetCroixSignatures = {
  "fort-freinet": {
    "fr": {
      "subtitle": "LE ROCHER A GARDÉ LA MÉMOIRE DU VILLAGE.",
      "quote": "AU-DESSUS DES MAURES, L’HISTOIRE À CIEL OUVERT.",
      "rhythm": "MONTER. LIRE LE PAYSAGE. PRENDRE LE TEMPS.",
      "dark": "LE FORT SE MÉRITE À PIED.",
      "close": "LA GARDE-FREINET, SUR LES TRACES DU PREMIER VILLAGE."
    },
    "en": {
      "subtitle": "THE ROCK REMEMBERS THE VILLAGE.",
      "quote": "ABOVE THE MAURES, HISTORY IN THE OPEN AIR.",
      "rhythm": "CLIMB. READ THE LANDSCAPE. TAKE YOUR TIME.",
      "dark": "REACH THE FORT ON FOOT.",
      "close": "LA GARDE-FREINET, THROUGH ITS EARLIER VILLAGE."
    }
  },
  "croix-des-maures": {
    "fr": {
      "subtitle": "LE VILLAGE PREND UNE AUTRE DIMENSION.",
      "quote": "UNE CROIX, LES TOITS, LES MAURES.",
      "rhythm": "MONTER. RETROUVER LES RUELLES DU REGARD.",
      "dark": "LA CROIX ET LE FORT SONT DEUX ÉTAPES.",
      "close": "UN AUTRE REGARD SUR LA GARDE-FREINET."
    },
    "en": {
      "subtitle": "SEE THE VILLAGE IN A DIFFERENT DIMENSION.",
      "quote": "A CROSS. THE ROOFTOPS. THE MAURES.",
      "rhythm": "CLIMB. FIND THE LANES BELOW.",
      "dark": "THE CROSS AND FORT ARE TWO STOPS.",
      "close": "ANOTHER VIEW OF LA GARDE-FREINET."
    }
  },
  "conservatoire-patrimoine-freinet": {
    "fr": {
      "subtitle": "LES MAURES ONT DES HISTOIRES À TRANSMETTRE.",
      "quote": "CHÂTAIGNE, LIÈGE ET MÉMOIRE DU FREINET.",
      "rhythm": "OBSERVER. COMPRENDRE. REGARDER AUTREMENT.",
      "dark": "LE MUSÉE ET LES SORTIES ONT CHACUN LEUR PROGRAMME.",
      "close": "LE PAYSAGE PREND TOUT SON SENS."
    },
    "en": {
      "subtitle": "THE MAURES HAVE STORIES TO SHARE.",
      "quote": "CHESTNUTS. CORK. FREINET MEMORIES.",
      "rhythm": "OBSERVE. UNDERSTAND. LOOK AGAIN.",
      "dark": "MUSEUM AND GUIDED OUTINGS HAVE SEPARATE PROGRAMMES.",
      "close": "GIVE THE LANDSCAPE ITS CONTEXT."
    }
  },
  "plage-debarquement-la-croix-valmer": {
    "fr": {
      "subtitle": "LE SABLE A AUSSI UNE MÉMOIRE.",
      "quote": "LA MER, LA PROVENCE, LE 15 AOÛT 1944.",
      "rhythm": "SE SOUVENIR. SE PROMENER. PROFITER DU RIVAGE.",
      "dark": "LES SERVICES SUIVENT LA SAISON.",
      "close": "UNE PLAGE À VIVRE ET À COMPRENDRE."
    },
    "en": {
      "subtitle": "THE SAND HAS A MEMORY TOO.",
      "quote": "THE SEA. PROVENCE. 15 AUGUST 1944.",
      "rhythm": "REMEMBER. STROLL. ENJOY THE SHORE.",
      "dark": "SERVICES FOLLOW THE SEASON.",
      "close": "A BEACH TO ENJOY AND UNDERSTAND."
    }
  },
  "plage-de-sylvabelle": {
    "fr": {
      "subtitle": "LA MER APPARAÎT AU BOUT DES MARCHES.",
      "quote": "SYLVABELLE, ENTRE VÉGÉTATION ET HORIZON.",
      "rhythm": "DESCENDRE. CONTEMPLER. GARDER LE TEMPS DE REMONTER.",
      "dark": "UNE CENTAINE DE MARCHES COMPTE DANS LA JOURNÉE.",
      "close": "UNE PLAGE À CHOISIR POUR SON PAYSAGE."
    },
    "en": {
      "subtitle": "THE SEA APPEARS BEYOND THE STEPS.",
      "quote": "SYLVABELLE, BETWEEN GREENERY AND HORIZON.",
      "rhythm": "DESCEND. LOOK OUT. LEAVE TIME TO CLIMB BACK.",
      "dark": "A HUNDRED STEPS MATTER TO THE DAY.",
      "close": "CHOOSE IT FOR THE LANDSCAPE."
    }
  },
  "circuit-cap-lardier": {
    "fr": {
      "subtitle": "LE LITTORAL PREND LE TEMPS DE LA MARCHE.",
      "quote": "MAQUIS, SOUS-BOIS, MER OUVERTE.",
      "rhythm": "PARTIR DE GIGARO. REJOINDRE LE CAP. REVENIR PAR LA MER.",
      "dark": "LE BON CIRCUIT COMMENCE PAR LE BON TRACÉ.",
      "close": "LE CAP LARDIER MÉRITE SA DEMI-JOURNÉE."
    },
    "en": {
      "subtitle": "THE COAST TAKES A WALKER’S PACE.",
      "quote": "SCRUBLAND. WOODLAND. OPEN SEA.",
      "rhythm": "START AT GIGARO. REACH THE CAP. RETURN BY THE COAST.",
      "dark": "THE RIGHT CIRCUIT BEGINS WITH THE RIGHT TRACK.",
      "close": "GIVE CAP LARDIER ITS HALF-DAY."
    }
  }
};

export const freinetCroixMapPoints:Record<string,MapPoint[]> = {
  "fort-freinet": [
    {
      "id": "fort-freinet",
      "label": {
        "fr": "Fort-Freinet",
        "en": "Fort-Freinet"
      },
      "latitude": 43.3215,
      "longitude": 6.46387,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-garde-freinet/fort-freinet-3350325",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Parking de la Croix, 83680 La Garde-Freinet, France",
      "note": {
        "fr": "Repère officiel du lieu. Il ne désigne pas un parking ; préparez votre approche et vérifiez les conditions d’accès.",
        "en": "Official location reference, not a car park. Plan your approach and check current access."
      }
    }
  ],
  "croix-des-maures": [
    {
      "id": "croix-des-maures",
      "label": {
        "fr": "Croix des Maures",
        "en": "Croix des Maures"
      },
      "latitude": 43.3186,
      "longitude": 6.46539,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-garde-freinet/la-croix-des-maures-3350306",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Parking de la Croix, 83680 La Garde-Freinet, France",
      "note": {
        "fr": "Repère officiel du lieu. Il ne désigne pas un parking ; préparez votre approche et vérifiez les conditions d’accès.",
        "en": "Official location reference, not a car park. Plan your approach and check current access."
      }
    }
  ],
  "conservatoire-patrimoine-freinet": [
    {
      "id": "conservatoire-patrimoine-freinet",
      "label": {
        "fr": "Conservatoire du Patrimoine du Freinet",
        "en": "Conservatoire du Patrimoine du Freinet"
      },
      "latitude": 43.3178,
      "longitude": 6.46972,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/musee/la-garde-freinet/conservatoire-du-patrimoine-du-freinet-3350250",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Chapelle Saint-Jean, RD 558, 83680 La Garde-Freinet, France",
      "note": {
        "fr": "Repère officiel du lieu. Il ne désigne pas un parking ; préparez votre approche et vérifiez les conditions d’accès.",
        "en": "Official location reference, not a car park. Plan your approach and check current access."
      }
    }
  ],
  "plage-debarquement-la-croix-valmer": [
    {
      "id": "plage-debarquement-la-croix-valmer",
      "label": {
        "fr": "Plage du Débarquement à La Croix-Valmer",
        "en": "Plage du Débarquement à La Croix-Valmer"
      },
      "latitude": 43.1885,
      "longitude": 6.557,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/la-croix-valmer/plage-du-debarquement-839804",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Plage du Débarquement, 83420 La Croix-Valmer, France",
      "note": {
        "fr": "Repère officiel du lieu. Il ne désigne pas un parking ; préparez votre approche et vérifiez les conditions d’accès.",
        "en": "Official location reference, not a car park. Plan your approach and check current access."
      }
    }
  ],
  "plage-de-sylvabelle": [
    {
      "id": "plage-de-sylvabelle",
      "label": {
        "fr": "Plage de Sylvabelle",
        "en": "Plage de Sylvabelle"
      },
      "latitude": 43.1878,
      "longitude": 6.57468,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/la-croix-valmer/plage-de-sylvabelle-839801",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Plage de Sylvabelle, 83420 La Croix-Valmer, France",
      "note": {
        "fr": "Repère officiel du lieu. Il ne désigne pas un parking ; préparez votre approche et vérifiez les conditions d’accès.",
        "en": "Official location reference, not a car park. Plan your approach and check current access."
      }
    }
  ],
  "circuit-cap-lardier": [
    {
      "id": "circuit-cap-lardier",
      "label": {
        "fr": "Départ du circuit · Gigaro",
        "en": "Circuit start · Gigaro"
      },
      "latitude": 43.1834348,
      "longitude": 6.6014799,
      "source": "https://destination.portcros-parcnational.fr/fr/trek/681-Circuit-du-Cap-Lardier",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Point d’accueil de Gigaro, 83420 La Croix-Valmer, France",
      "note": {
        "fr": "Départ du GPX officiel du Parc national à Gigaro, pas la pointe du cap. Stationnement à proximité puis randonnée à pied ; vérifiez l’ouverture du site.",
        "en": "Start of the National Park’s official GPX at Gigaro, not the headland. Park nearby and continue on foot; check site opening."
      }
    }
  ]
};

export const freinetCroixMedia:Record<string,VillagePhoto[]> = {
  "fort-freinet": [
    {
      "src": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Fort_du_Freinet%2C_La_Garde-Freinet%2C_France.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:Fort_du_Freinet,_La_Garde-Freinet,_France.jpg",
      "alt": "Vestiges du Fort-Freinet à La Garde-Freinet (2015)",
      "caption": {
        "fr": "Vestiges du Fort-Freinet à La Garde-Freinet (2015)",
        "en": "Fort-Freinet remains, La Garde-Freinet (2015)"
      },
      "credit": "Blaue Max / Wikimedia Commons",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    }
  ],
  "croix-des-maures": [
    {
      "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Croix_et_fort_du_Freinet_83.JPG/1280px-Croix_et_fort_du_Freinet_83.JPG",
      "source": "https://commons.wikimedia.org/wiki/File:Croix_et_fort_du_Freinet_83.JPG",
      "alt": "La Croix des Maures et le Fort-Freinet (2014)",
      "caption": {
        "fr": "La Croix des Maures et le Fort-Freinet (2014)",
        "en": "Croix des Maures and Fort-Freinet (2014)"
      },
      "credit": "Anthospace / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  ],
  "conservatoire-patrimoine-freinet": [
    {
      "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/La_Garde-Freinet_%28vue_depuis_le_fort%29.jpg/1280px-La_Garde-Freinet_%28vue_depuis_le_fort%29.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:La_Garde-Freinet_(vue_depuis_le_fort).jpg",
      "alt": "La Garde-Freinet vue depuis le fort (2010) — photo du village, pas du musée",
      "caption": {
        "fr": "La Garde-Freinet vue depuis le fort (2010) — photo du village, pas du musée",
        "en": "La Garde-Freinet from the fort (2010) — village photograph, not the museum"
      },
      "credit": "Patrick Rouzet / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "contextual": true
    }
  ],
  "plage-debarquement-la-croix-valmer": [
    {
      "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Beach_of_Cavalaire-sur-Mer%2C_Cote_d%27Azur%2C_France_%2852724194580%29.jpg/1280px-Beach_of_Cavalaire-sur-Mer%2C_Cote_d%27Azur%2C_France_%2852724194580%29.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:Beach_of_Cavalaire-sur-Mer,_Cote_d%27Azur,_France_(52724194580).jpg",
      "alt": "Baie de Cavalaire, vue du rivage en 2022 — photo du secteur voisin, pas d’un accès précis au Débarquement",
      "caption": {
        "fr": "Baie de Cavalaire, vue du rivage en 2022 — photo du secteur voisin, pas d’un accès précis au Débarquement",
        "en": "Cavalaire bay shoreline (2022) — neighbouring area photograph, not a specific Débarquement beach entrance"
      },
      "credit": "dronepicr / Wikimedia Commons",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
      "contextual": true
    }
  ],
  "plage-de-sylvabelle": [
    {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Aerial_view_of_the_Sylvabelle_Beach%2C_La_Croix-Valmer%2C_France_%2851694172877%29.jpg/1280px-Aerial_view_of_the_Sylvabelle_Beach%2C_La_Croix-Valmer%2C_France_%2851694172877%29.jpg",
      "source": "https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Sylvabelle_Beach,_La_Croix-Valmer,_France_(51694172877).jpg",
      "alt": "La plage de Sylvabelle vue du ciel (2021)",
      "caption": {
        "fr": "La plage de Sylvabelle vue du ciel (2021)",
        "en": "Aerial view of Sylvabelle beach (2021)"
      },
      "credit": "dronepicr / Wikimedia Commons",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    }
  ],
  "circuit-cap-lardier": [
    {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cap_Lardier_001.JPG/1280px-Cap_Lardier_001.JPG",
      "source": "https://commons.wikimedia.org/wiki/File:Cap_Lardier_001.JPG",
      "alt": "Le Cap Lardier, photographie de 2010",
      "caption": {
        "fr": "Le Cap Lardier, photographie de 2010",
        "en": "Cap Lardier, photograph from 2010"
      },
      "credit": "Johan N / Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    }
  ]
};
