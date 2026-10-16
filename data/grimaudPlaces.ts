import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {VillagePhoto} from './villageMedia';
import {legacyPlaceMedia} from './legacyPlaceMedia';

export const grimaudPlaces:Place[] = [
  {
    "id": "chateau-de-grimaud",
    "name": "Château de Grimaud",
    "category": "do",
    "location": "Grimaud",
    "description": "Visit Grimaud castle: medieval ruins, views over the Golfe de Saint-Tropez, walking access from the village and practical advice for planning your visit.",
    "bestFor": [
      "Heritage walks",
      "Village discovery",
      "Golfe views"
    ],
    "notIdealFor": [
      "Step-free visits without checking access"
    ],
    "tags": [
      "heritage",
      "history",
      "walk",
      "panorama",
      "view"
    ],
    "goodToKnow": [
      "Check current access and interior opening before visiting."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/chateau-de-grimaud-grimaud-fr-3032979/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "eglise-saint-michel-grimaud",
    "name": "Église Saint-Michel de Grimaud",
    "category": "do",
    "location": "Grimaud",
    "description": "Discover Saint-Michel church in Grimaud: Provençal Romanesque architecture, Place de l’Église access, listed opening hours and a walk towards the castle.",
    "bestFor": [
      "Heritage walks",
      "Village discovery"
    ],
    "notIdealFor": [
      "Step-free visits without checking access"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Check current access and interior opening before visiting."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/eglise-saint-michel-grimaud-fr-3032949/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "moulin-saint-roch-grimaud",
    "name": "Moulin Saint-Roch de Grimaud",
    "category": "do",
    "location": "Grimaud",
    "description": "Discover Saint-Roch windmill in Grimaud: Provençal heritage, Golfe views, Saint-Roch district access and interior visits available through guided tours.",
    "bestFor": [
      "Heritage walks",
      "Village discovery",
      "Golfe views"
    ],
    "notIdealFor": [
      "Step-free visits without checking access"
    ],
    "tags": [
      "heritage",
      "history",
      "walk",
      "view"
    ],
    "goodToKnow": [
      "Check current access and interior opening before visiting."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/moulin-saint-roch-grimaud-fr-3032926/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "chapelle-des-penitents-grimaud",
    "name": "Chapelle des Pénitents de Grimaud",
    "category": "do",
    "location": "Grimaud",
    "description": "Visit the Penitents’ Chapel in Grimaud, dated 1482: location, listed opening hours, religious heritage and ideas for a walk through the village.",
    "bestFor": [
      "Heritage walks",
      "Village discovery"
    ],
    "notIdealFor": [
      "Step-free visits without checking access"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Check current access and interior opening before visiting."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/chapelle-des-penitents-grimaud-fr-3032944/",
    "lastVerifiedAt": "2026-10-16"
  }
];

export const grimaudFacts:Record<string,PlaceFacts> = {
  "chateau-de-grimaud": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Château de Grimaud : panorama, visite et accès à pied",
        "description": "Montez au château de Grimaud : ruines médiévales, panorama sur le Golfe de Saint-Tropez, accès à pied depuis le village et conseils pour préparer la visite.",
        "intro": "Au-dessus des toits de Grimaud, le château donne soudain toute son ampleur au paysage. Les ruines, les collines et le Golfe composent une étape qui mérite mieux qu’une photo prise au passage. Notre idée : monter par les ruelles, laisser le regard suivre les remparts et garder du temps pour redescendre dans le village.",
        "facts": [
          [
            "Adresse",
            "Place des Remparts, 83310 Grimaud"
          ],
          [
            "Découverte",
            "Vestiges médiévaux et panorama sur le Golfe"
          ],
          [
            "Entrée",
            "Accès libre annoncé toute l’année"
          ],
          [
            "Approche",
            "À pied par le village ; pentes et escaliers"
          ]
        ],
        "sections": [
          [
            "Un château pour lire le paysage",
            "Le site castral est attesté dès le XIe siècle. Ses fortifications ont évolué, puis le château a été démantelé après la Révolution. On vient aujourd’hui découvrir des vestiges, pas des appartements meublés. Notre conseil : alternez les vues sur les pierres et les vues vers le Golfe pour comprendre la position du village."
          ],
          [
            "Comment accéder au château de Grimaud ?",
            "Le repère officiel est place des Remparts. Stationnez sur un emplacement autorisé du village et poursuivez à pied en suivant les indications du château. Les ruelles, pentes et escaliers font partie de l’approche ; l’office indique que le monument n’est pas accessible en fauteuil roulant. Demandez un parcours adapté à votre groupe avant de partir."
          ],
          [
            "Choisir le bon moment pour monter",
            "La visite est annoncée libre toute l’année, sous réserve des conditions du site. Notre préférence : une heure où la chaleur laisse encore le plaisir de marcher et où vous disposez de temps pour les points de vue. En été, prenez de l’eau et gardez une marge pour le stationnement ; suivez les consignes affichées au monument."
          ],
          [
            "Prolonger la visite dans Grimaud",
            "Associez le château à l’église Saint-Michel, puis au moulin Saint-Roch si vous souhaitez poursuivre la promenade. La chapelle des Pénitents donne une autre étape dans les ruelles. Ce parcours est notre suggestion de visite : les ouvertures intérieures et les éventuelles manifestations se vérifient séparément."
          ]
        ],
        "questions": [
          [
            "Le château de Grimaud est-il payant ?",
            "L’office de tourisme annonce une visite gratuite, toute l’année. Vérifiez les conditions et consignes du jour, notamment lors d’une manifestation."
          ],
          [
            "Peut-on arriver en voiture au pied du château ?",
            "Prévoyez une arrivée à pied depuis le village. Le point cartographique situe le monument, pas un parking ni une voie d’accès automobile."
          ]
        ]
      },
      "en": {
        "title": "Grimaud castle: Golfe views, visits and walking access",
        "description": "Visit Grimaud castle: medieval ruins, views over the Golfe de Saint-Tropez, walking access from the village and practical advice for planning your visit.",
        "intro": "Above Grimaud’s rooftops, the castle opens up the landscape. Ruins, hills and the Golfe make this a stop worth more than a quick photograph. Our idea: climb through the lanes, follow the line of the ramparts and keep time for the walk back through the village.",
        "facts": [
          [
            "Address",
            "Place des Remparts, 83310 Grimaud"
          ],
          [
            "Visit",
            "Medieval remains and views over the Golfe"
          ],
          [
            "Entry",
            "Free access listed year-round"
          ],
          [
            "Approach",
            "On foot through the village; slopes and steps"
          ]
        ],
        "sections": [
          [
            "Read the landscape from the castle",
            "The fortified site is documented from the 11th century. Its defences changed over time, and the castle was dismantled after the Revolution. Today you visit ruins rather than furnished rooms. Our advice: alternate between the stonework and the views towards the Golfe to understand the village’s position."
          ],
          [
            "How to get to Grimaud castle",
            "The official reference is Place des Remparts. Use authorised village parking, then follow signs to the castle on foot. Lanes, slopes and steps are part of the approach; the tourist office lists the monument as inaccessible to wheelchairs. Ask about arrangements for your group before setting out."
          ],
          [
            "Choose a good time to climb",
            "Free year-round access is listed, subject to site conditions. Our preference: a time when the heat still makes walking enjoyable and you can linger over the views. Bring water in summer, allow time for parking and follow notices at the monument."
          ],
          [
            "Continue through Grimaud",
            "Pair the castle with Saint-Michel church, then Saint-Roch mill if you want to keep walking. The Penitents’ Chapel makes another stop in the village lanes. This is our suggested outing; check interior opening and any events separately."
          ]
        ],
        "questions": [
          [
            "Is Grimaud castle free to visit?",
            "The tourist office lists free year-round visits. Check daily access arrangements, particularly during events."
          ],
          [
            "Can I drive right up to the castle?",
            "Plan to walk from the village. The map marks the monument, not a car park or vehicle entrance."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Grimaud Tourisme · visite et accès",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/chateau-de-grimaud-grimaud-fr-3032979/"
      },
      {
        "label": "Grimaud Tourisme · histoire du monument",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-chateau/"
      }
    ],
    "nearby": [
      "grimaud-village",
      "eglise-saint-michel-grimaud",
      "moulin-saint-roch-grimaud",
      "chapelle-des-penitents-grimaud"
    ]
  },
  "eglise-saint-michel-grimaud": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Église Saint-Michel de Grimaud : visite du patrimoine roman",
        "description": "Découvrez l’église Saint-Michel de Grimaud : architecture romane provençale, place de l’Église, horaires annoncés et idées de balade vers le château.",
        "intro": "Entre la montée au château et les ruelles de Grimaud, l’église Saint-Michel invite à changer de rythme. Ses volumes de pierre racontent une Provence sobre, tandis que sa place offre un repère pour parcourir le village. Notre suggestion : prendre le temps de regarder la façade, puis entrer si l’ouverture et les offices le permettent.",
        "facts": [
          [
            "Adresse",
            "Place de l’Église, 83310 Grimaud"
          ],
          [
            "Architecture",
            "Roman provençal, fin XIIe–début XIIIe siècle"
          ],
          [
            "Horaires annoncés",
            "Tous les jours, 9h–19h ; à confirmer"
          ],
          [
            "Visite",
            "Accès libre ; respecter les offices"
          ]
        ],
        "sections": [
          [
            "La pierre et les volumes du roman provençal",
            "L’église actuelle a été construite entre la fin du XIIe et le début du XIIIe siècle. Elle ne doit pas être confondue avec une première église du XIe siècle dont l’emplacement reste inconnu. Notre idée : commencer par observer les volumes et les ouvertures, puis replacer le monument dans le paysage des ruelles."
          ],
          [
            "Une halte sur la place de l’Église",
            "L’adresse de visite est place de l’Église. Depuis un parking autorisé du centre, rejoignez le monument à pied. Le village comporte pentes et escaliers ; la fiche touristique indique un accès non adapté aux fauteuils roulants. Demandez les conditions précises si cela concerne votre groupe."
          ],
          [
            "Entrer dans une église vivante",
            "La fiche officielle annonce une ouverture quotidienne de 9h à 19h, à confirmer pour votre date. Saint-Michel reste un lieu de culte : attendez la fin d’une cérémonie pour visiter et gardez une attitude discrète. Les concerts des Soirées Musicales relèvent d’un programme distinct, avec leurs propres conditions de réservation."
          ],
          [
            "Du calme de la place au panorama",
            "Notre proposition : garder Saint-Michel comme point de rencontre avant de poursuivre vers le château. Pour une découverte plus douce, continuez plutôt par les places et la chapelle des Pénitents. L’intérêt de cette étape tient aussi au temps que l’on s’accorde entre deux monuments."
          ]
        ],
        "questions": [
          [
            "De quand date l’église Saint-Michel de Grimaud ?",
            "L’édifice actuel date de la fin du XIIe et du début du XIIIe siècle. La première église du XIe siècle mentionnée dans l’histoire du village était un autre bâtiment."
          ],
          [
            "Quels sont les horaires de visite ?",
            "La fiche de l’office annonce 9h–19h tous les jours. Confirmez l’ouverture et respectez les offices et cérémonies."
          ]
        ]
      },
      "en": {
        "title": "Saint-Michel church, Grimaud: Romanesque heritage visit",
        "description": "Discover Saint-Michel church in Grimaud: Provençal Romanesque architecture, Place de l’Église access, listed opening hours and a walk towards the castle.",
        "intro": "Between the climb to the castle and Grimaud’s lanes, Saint-Michel church invites a slower pace. Its stone forms tell a restrained Provençal story, while the square provides a useful village meeting point. Our suggestion: study the exterior, then step inside when opening and services allow.",
        "facts": [
          [
            "Address",
            "Place de l’Église, 83310 Grimaud"
          ],
          [
            "Architecture",
            "Provençal Romanesque, late 12th–early 13th century"
          ],
          [
            "Listed hours",
            "Daily 9am–7pm; confirm before visiting"
          ],
          [
            "Visit",
            "Free access; respect religious services"
          ]
        ],
        "sections": [
          [
            "Provençal Romanesque in stone",
            "The present church dates from the late 12th and early 13th centuries. It should not be confused with an earlier 11th-century church whose location is unknown. Our idea: begin with the building’s forms and openings, then look at its relationship with the surrounding lanes."
          ],
          [
            "A stop on Place de l’Église",
            "The visitor address is Place de l’Église. Walk from authorised central parking. The village has slopes and steps; the tourist listing describes the church as inaccessible to wheelchairs. Ask about specific arrangements if this affects your group."
          ],
          [
            "A church still in use",
            "The official listing gives daily opening from 9am to 7pm, to be confirmed for your date. Saint-Michel remains a place of worship: wait until ceremonies finish and visit quietly. Soirées Musicales concerts follow a separate programme with their own booking arrangements."
          ],
          [
            "From the square to the view",
            "Our suggestion: use Saint-Michel as a meeting point before continuing towards the castle. For a gentler discovery, explore the squares and the Penitents’ Chapel instead. Part of the pleasure is leaving space between the monuments."
          ]
        ],
        "questions": [
          [
            "How old is Saint-Michel church in Grimaud?",
            "The current building dates from the late 12th and early 13th centuries. The village’s earlier 11th-century church was a different building."
          ],
          [
            "What are the visiting hours?",
            "The tourist office lists daily opening from 9am to 7pm. Confirm access and respect services and ceremonies."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Grimaud Tourisme · visite et accès",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/eglise-saint-michel-grimaud-fr-3032949/"
      },
      {
        "label": "Grimaud Tourisme · histoire du monument",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/eglise-saint-michel/"
      }
    ],
    "nearby": [
      "grimaud-village",
      "chateau-de-grimaud",
      "moulin-saint-roch-grimaud",
      "chapelle-des-penitents-grimaud"
    ]
  },
  "moulin-saint-roch-grimaud": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Moulin Saint-Roch à Grimaud : accès, panorama et visite",
        "description": "Le moulin Saint-Roch de Grimaud : patrimoine provençal, vue sur le Golfe, accès au quartier Saint-Roch et intérieur à découvrir lors des visites guidées.",
        "intro": "À Grimaud, les ailes du moulin Saint-Roch donnent au paysage une silhouette que l’on reconnaît de loin. Cette étape du quartier Saint-Roch relie le village à son histoire agricole, avec le Golfe en horizon. Notre idée : venir pour le monument et la promenade, puis poursuivre dans les ruelles plutôt que de repartir aussitôt.",
        "facts": [
          [
            "Adresse",
            "Quartier Saint-Roch, 83310 Grimaud"
          ],
          [
            "Patrimoine",
            "Moulin à vent connu depuis le XVIe siècle"
          ],
          [
            "Extérieur",
            "Site en accès libre annoncé toute l’année"
          ],
          [
            "Intérieur",
            "Uniquement lors de visites guidées annoncées"
          ]
        ],
        "sections": [
          [
            "Un repère de la Provence agricole",
            "Un moulin à vent est connu ici depuis le XVIe siècle. D’abord appelé moulin de la Gardiole, il prend ensuite le nom de Saint-Roch. Sa toiture, ses ailes et son mécanisme ont été restaurés dans les années 1990. Notre conseil : regarder l’ensemble et l’aire située devant le moulin pour imaginer la place du blé dans la vie du village."
          ],
          [
            "Extérieur libre, intérieur accompagné",
            "Le site extérieur est annoncé accessible toute l’année. L’intérieur se découvre uniquement pendant les visites guidées du service Culture et Patrimoine : demandez le calendrier à l’office. Le récit patrimonial officiel précise que le moulin ne peut plus actuellement tourner ni produire de farine ; ne prévoyez pas une démonstration sans confirmation."
          ],
          [
            "Comment rejoindre le moulin Saint-Roch ?",
            "Le repère officiel situe le moulin dans le quartier Saint-Roch. Vérifiez votre itinéraire vers le village, utilisez les stationnements autorisés puis terminez à pied. La fiche touristique indique que le moulin n’est pas accessible en fauteuil roulant ; renseignez-vous pour choisir les étapes adaptées à votre groupe."
          ],
          [
            "Une étape entre le village et le vallon",
            "Notre proposition : associer le moulin au château et à Saint-Michel pour une découverte du patrimoine. Le sentier du vallon du Pont des Fées offre un prolongement distinct pour ceux qui souhaitent marcher davantage ; vérifiez sa fiche, les conditions d’accès et le temps disponible avant de l’ajouter à votre journée."
          ]
        ],
        "questions": [
          [
            "Peut-on visiter l’intérieur du moulin Saint-Roch ?",
            "Oui, lors des visites guidées annoncées par le service Culture et Patrimoine. L’accès extérieur ne signifie pas que l’intérieur est ouvert en permanence."
          ],
          [
            "Le moulin produit-il encore de la farine ?",
            "Le récit patrimonial de l’office indique qu’il ne peut plus actuellement tourner ni produire de farine. Vérifiez le contenu des animations programmées."
          ]
        ]
      },
      "en": {
        "title": "Saint-Roch mill, Grimaud: views, access and guided visits",
        "description": "Discover Saint-Roch windmill in Grimaud: Provençal heritage, Golfe views, Saint-Roch district access and interior visits available through guided tours.",
        "intro": "Saint-Roch mill gives Grimaud’s landscape a silhouette you can recognise from afar. This stop in the Saint-Roch district connects the village with its agricultural past, with the Golfe on the horizon. Our idea: make time for the monument and the walk, then continue into the village lanes.",
        "facts": [
          [
            "Address",
            "Quartier Saint-Roch, 83310 Grimaud"
          ],
          [
            "Heritage",
            "Windmill documented here since the 16th century"
          ],
          [
            "Outside",
            "Free access listed year-round"
          ],
          [
            "Inside",
            "Only during scheduled guided visits"
          ]
        ],
        "sections": [
          [
            "A reminder of agricultural Provence",
            "A windmill has stood here since the 16th century. Originally called the Moulin de la Gardiole, it later took the Saint-Roch name. Its roof, sails and machinery were restored in the 1990s. Our advice: look at both the mill and the area in front to imagine the role of wheat in village life."
          ],
          [
            "Free exterior access, guided interior visits",
            "The outside site is listed as accessible year-round. The interior opens only for tours by the Culture and Heritage service; ask the tourist office for dates. The official heritage account says the mill can no longer currently turn or make flour, so do not expect a demonstration without checking."
          ],
          [
            "Getting to Saint-Roch mill",
            "The official point marks the mill in the Saint-Roch district. Check your village approach, use authorised parking and finish on foot. The tourist listing describes the mill as inaccessible to wheelchairs; ask which stops suit your group."
          ],
          [
            "Between the village and the valley",
            "Our suggestion: combine the mill with the castle and Saint-Michel church for a heritage outing. The Pont des Fées valley trail is a separate extension for a longer walk; check its page, access conditions and the time available before adding it to your day."
          ]
        ],
        "questions": [
          [
            "Can I visit inside Saint-Roch mill?",
            "Yes, during guided visits scheduled by the Culture and Heritage service. Exterior access does not mean the interior is always open."
          ],
          [
            "Does the mill still make flour?",
            "The tourist office’s heritage account says it can no longer currently turn or make flour. Check the content of any scheduled activities."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Grimaud Tourisme · visite et accès",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/moulin-saint-roch-grimaud-fr-3032926/"
      },
      {
        "label": "Grimaud Tourisme · histoire du monument",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-moulin-saint-roch/"
      }
    ],
    "nearby": [
      "grimaud-village",
      "chateau-de-grimaud",
      "eglise-saint-michel-grimaud",
      "chapelle-des-penitents-grimaud",
      "pont-des-fees"
    ]
  },
  "chapelle-des-penitents-grimaud": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Chapelle des Pénitents à Grimaud : visite et accès",
        "description": "Découvrez la chapelle des Pénitents de Grimaud, datée de 1482 : adresse, horaires annoncés, patrimoine religieux et idées de balade dans le village.",
        "intro": "À l’une des entrées du village, la chapelle des Pénitents donne une raison de ralentir avant les ruelles et les points de vue. Sa façade et son histoire racontent un Grimaud plus intime. Notre suggestion : en faire une première halte, puis relier à pied les places, l’église Saint-Michel et le château.",
        "facts": [
          [
            "Adresse",
            "Place des Pénitents, 83310 Grimaud"
          ],
          [
            "Date repère",
            "1482, inscrite sur le linteau"
          ],
          [
            "Horaires annoncés",
            "Tous les jours, 9h–18h ; à confirmer"
          ],
          [
            "Visite",
            "Accès libre ; respecter le caractère religieux"
          ]
        ],
        "sections": [
          [
            "1482, une date à chercher sur la porte",
            "La date de 1482 figure en chiffres romains sur le linteau. La chapelle devient ensuite le siège des Pénitents Blancs, une confrérie qui venait en aide aux personnes démunies. Notre idée : commencer par regarder la façade avant d’entrer, pour donner un sens aux détails que l’on pourrait manquer en passant."
          ],
          [
            "Une petite étape, une vraie place dans la balade",
            "L’adresse officielle est place des Pénitents. Rejoignez-la à pied depuis un stationnement autorisé du village ; le repère situe la chapelle, pas une place libre. Grimaud comporte des ruelles anciennes, des pentes et des escaliers : demandez le parcours le plus adapté si votre groupe rencontre des difficultés de déplacement."
          ],
          [
            "Visiter la chapelle ou assister à un concert",
            "L’office annonce une ouverture de 9h à 18h chaque jour, à confirmer pour votre date. La chapelle accueille aussi certaines Soirées Musicales : une entrée libre en journée ne vaut pas billet de concert. Consultez le programme officiel pour le lieu exact, les horaires et les réservations."
          ],
          [
            "Relier les monuments sans courir",
            "Notre proposition : partir de la chapelle, traverser les places puis rejoindre Saint-Michel. Poursuivez vers le château si vous souhaitez ajouter la montée et le panorama. Le moulin Saint-Roch complète une découverte plus longue ; choisissez vos étapes selon la chaleur, les ouvertures et l’envie de marcher."
          ]
        ],
        "questions": [
          [
            "Où se trouve la chapelle des Pénitents de Grimaud ?",
            "Place des Pénitents, dans le village de Grimaud. Elle constitue une étape distincte des églises et chapelles de Port Grimaud."
          ],
          [
            "L’accès est-il gratuit ?",
            "La visite est annoncée en accès libre, avec des horaires de 9h à 18h à confirmer. Les concerts suivent un programme et des conditions de billetterie distincts."
          ]
        ]
      },
      "en": {
        "title": "Penitents’ Chapel, Grimaud: heritage, visits and access",
        "description": "Visit the Penitents’ Chapel in Grimaud, dated 1482: location, listed opening hours, religious heritage and ideas for a walk through the village.",
        "intro": "At one of the village entrances, the Penitents’ Chapel offers a reason to slow down before the lanes and viewpoints. Its façade and history reveal a more intimate Grimaud. Our suggestion: make it a first stop, then walk between the squares, Saint-Michel church and the castle.",
        "facts": [
          [
            "Address",
            "Place des Pénitents, 83310 Grimaud"
          ],
          [
            "Historic date",
            "1482, inscribed on the lintel"
          ],
          [
            "Listed hours",
            "Daily 9am–6pm; confirm before visiting"
          ],
          [
            "Visit",
            "Free access; respect the religious setting"
          ]
        ],
        "sections": [
          [
            "Look for 1482 above the door",
            "The date 1482 appears in Roman numerals on the lintel. The chapel later became the home of the White Penitents, a brotherhood that helped people in need. Our idea: study the façade before entering so that details do not disappear into a hurried walk past."
          ],
          [
            "A small stop with a place in the day",
            "The official address is Place des Pénitents. Walk from authorised village parking; the map marks the chapel rather than an available space. Grimaud has old lanes, slopes and steps: ask about a suitable route if anyone in your group has difficulty getting around."
          ],
          [
            "A chapel visit or a concert",
            "The office lists daily opening from 9am to 6pm, to be confirmed for your date. Some Soirées Musicales concerts take place here; free daytime access is not a concert ticket. Consult the official programme for the exact venue, times and booking arrangements."
          ],
          [
            "Connect the monuments at your pace",
            "Our suggestion: start at the chapel, cross the squares and head to Saint-Michel. Continue uphill to the castle if you want the view. Saint-Roch mill adds another stop to a longer outing; choose your route around the heat, opening hours and how far you want to walk."
          ]
        ],
        "questions": [
          [
            "Where is the Penitents’ Chapel in Grimaud?",
            "On Place des Pénitents in Grimaud village, a separate stop from the churches and chapels of Port Grimaud."
          ],
          [
            "Is entry free?",
            "Visits are listed as free, with 9am–6pm hours to be confirmed. Concerts follow separate programmes and ticket arrangements."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Grimaud Tourisme · visite et accès",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/chapelle-des-penitents-grimaud-fr-3032944/"
      },
      {
        "label": "Grimaud Tourisme · histoire du monument",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/la-chapelle-des-penitents/"
      }
    ],
    "nearby": [
      "grimaud-village",
      "chateau-de-grimaud",
      "eglise-saint-michel-grimaud",
      "moulin-saint-roch-grimaud"
    ]
  }
};

export const grimaudSignatures = {
  "chateau-de-grimaud": {
    "fr": {
      "subtitle": "LES REMPARTS PRENNENT LE LARGE.",
      "quote": "AU-DESSUS DES TOITS, TOUT LE GOLFE.",
      "rhythm": "MONTER. REGARDER. REDESCENDRE PAR LES RUELLES.",
      "dark": "LE PANORAMA COMMENCE PAR QUELQUES MARCHES.",
      "close": "GRIMAUD, À LA HAUTEUR DE SON HISTOIRE."
    },
    "en": {
      "subtitle": "THE RAMPARTS OPEN ONTO THE GOLFE.",
      "quote": "ABOVE THE ROOFS, THE WHOLE LANDSCAPE.",
      "rhythm": "CLIMB. LOOK. RETURN THROUGH THE LANES.",
      "dark": "THE VIEW BEGINS WITH A FEW STEPS.",
      "close": "GRIMAUD, SEEN FROM ITS HISTORY."
    }
  },
  "eglise-saint-michel-grimaud": {
    "fr": {
      "subtitle": "LA PROVENCE A LE SENS DU SILENCE.",
      "quote": "UNE PLACE, DES PIERRES, UN AUTRE RYTHME.",
      "rhythm": "S’ARRÊTER. OBSERVER. ENTRER DISCRÈTEMENT.",
      "dark": "UN LIEU À VISITER, UN CULTE À RESPECTER.",
      "close": "LE VILLAGE SE RACONTE AUSSI ICI."
    },
    "en": {
      "subtitle": "PROVENCE HAS A QUIETER SIDE.",
      "quote": "A SQUARE. STONE WALLS. A DIFFERENT PACE.",
      "rhythm": "PAUSE. OBSERVE. STEP INSIDE QUIETLY.",
      "dark": "A PLACE TO VISIT, WORSHIP TO RESPECT.",
      "close": "ANOTHER CHAPTER OF THE VILLAGE."
    }
  },
  "moulin-saint-roch-grimaud": {
    "fr": {
      "subtitle": "LE VILLAGE A GARDÉ SES AILES.",
      "quote": "UN MOULIN, LA PROVENCE, LE GOLFE AU LOIN.",
      "rhythm": "MARCHER. LEVER LES YEUX. PRENDRE LE TEMPS.",
      "dark": "L’INTÉRIEUR SE DÉCOUVRE AVEC UN GUIDE.",
      "close": "GRIMAUD, DU BLÉ AUX GRANDS HORIZONS."
    },
    "en": {
      "subtitle": "THE VILLAGE HAS KEPT ITS SAILS.",
      "quote": "A WINDMILL. PROVENCE. THE GOLFE BEYOND.",
      "rhythm": "WALK. LOOK UP. TAKE YOUR TIME.",
      "dark": "STEP INSIDE WITH A GUIDE.",
      "close": "GRIMAUD, FROM WHEAT TO WIDE HORIZONS."
    }
  },
  "chapelle-des-penitents-grimaud": {
    "fr": {
      "subtitle": "UNE PETITE CHAPELLE, CINQ SIÈCLES D’HISTOIRE.",
      "quote": "À L’ENTRÉE DU VILLAGE, LE TEMPS RALENTIT.",
      "rhythm": "LA PORTE. LA PIERRE. LA PROMENADE.",
      "dark": "VISITE ET CONCERT ONT CHACUN LEUR RENDEZ-VOUS.",
      "close": "GRIMAUD SE DÉCOUVRE AUSSI DANS LES DÉTAILS."
    },
    "en": {
      "subtitle": "A SMALL CHAPEL. FIVE CENTURIES OF HISTORY.",
      "quote": "AT THE VILLAGE ENTRANCE, TIME SLOWS DOWN.",
      "rhythm": "THE DOOR. THE STONE. THE WALK.",
      "dark": "VISITS AND CONCERTS HAVE THEIR OWN TIMES.",
      "close": "DISCOVER GRIMAUD THROUGH THE DETAILS."
    }
  }
};

export const grimaudMapPoints:Record<string,MapPoint[]> = {
  "chateau-de-grimaud": [
    {
      "id": "chateau-de-grimaud",
      "label": {
        "fr": "Château de Grimaud",
        "en": "Château de Grimaud"
      },
      "latitude": 43.274838,
      "longitude": 6.520978,
      "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/chateau-de-grimaud-grimaud-fr-3032979/",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Château de Grimaud, Place des Remparts, 83310 Grimaud, France",
      "note": {
        "fr": "Repère du monument publié par Grimaud Tourisme. Terminez à pied depuis un stationnement autorisé ; le point ne désigne pas un parking. Vérifiez les conditions d’accès.",
        "en": "Monument reference published by Grimaud Tourism. Walk from authorised parking; this point does not mark a car park. Check current access arrangements."
      }
    }
  ],
  "eglise-saint-michel-grimaud": [
    {
      "id": "eglise-saint-michel-grimaud",
      "label": {
        "fr": "Église Saint-Michel de Grimaud",
        "en": "Église Saint-Michel de Grimaud"
      },
      "latitude": 43.274049,
      "longitude": 6.522912,
      "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/eglise-saint-michel-grimaud-fr-3032949/",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Église Saint-Michel de Grimaud, Place de l’Église, 83310 Grimaud, France",
      "note": {
        "fr": "Repère du monument publié par Grimaud Tourisme. Terminez à pied depuis un stationnement autorisé ; le point ne désigne pas un parking. Vérifiez les conditions d’accès.",
        "en": "Monument reference published by Grimaud Tourism. Walk from authorised parking; this point does not mark a car park. Check current access arrangements."
      }
    }
  ],
  "moulin-saint-roch-grimaud": [
    {
      "id": "moulin-saint-roch-grimaud",
      "label": {
        "fr": "Moulin Saint-Roch de Grimaud",
        "en": "Moulin Saint-Roch de Grimaud"
      },
      "latitude": 43.277312,
      "longitude": 6.522676,
      "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/moulin-saint-roch-grimaud-fr-3032926/",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Moulin Saint-Roch de Grimaud, Quartier Saint-Roch, 83310 Grimaud, France",
      "note": {
        "fr": "Repère du monument publié par Grimaud Tourisme. Terminez à pied depuis un stationnement autorisé ; le point ne désigne pas un parking. Vérifiez les conditions d’accès.",
        "en": "Monument reference published by Grimaud Tourism. Walk from authorised parking; this point does not mark a car park. Check current access arrangements."
      }
    }
  ],
  "chapelle-des-penitents-grimaud": [
    {
      "id": "chapelle-des-penitents-grimaud",
      "label": {
        "fr": "Chapelle des Pénitents de Grimaud",
        "en": "Chapelle des Pénitents de Grimaud"
      },
      "latitude": 43.273812,
      "longitude": 6.518625,
      "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/chapelle-des-penitents-grimaud-fr-3032944/",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Chapelle des Pénitents de Grimaud, Place des Pénitents, 83310 Grimaud, France",
      "note": {
        "fr": "Repère du monument publié par Grimaud Tourisme. Terminez à pied depuis un stationnement autorisé ; le point ne désigne pas un parking. Vérifiez les conditions d’accès.",
        "en": "Monument reference published by Grimaud Tourism. Walk from authorised parking; this point does not mark a car park. Check current access arrangements."
      }
    }
  ]
};

// Each photo depicts the actual monument; reuse is licensed explicitly on Commons.
const credit='Grimaud Tourisme / Wikimedia Commons',license='CC BY-SA 4.0',licenseUrl='https://creativecommons.org/licenses/by-sa/4.0/';
export const grimaudMedia:Record<string,VillagePhoto[]> = {
 'chateau-de-grimaud':[{...legacyPlaceMedia['grimaud-village'][2]}],
 'eglise-saint-michel-grimaud':[{src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Eglise_Saint-Michel_de_Grimaud.jpg/1280px-Eglise_Saint-Michel_de_Grimaud.jpg',alt:'Église Saint-Michel de Grimaud, photographie de 2022',caption:{fr:'L’église Saint-Michel de Grimaud (2022)',en:'Saint-Michel church, Grimaud (2022)'},credit,license,licenseUrl,source:'https://commons.wikimedia.org/wiki/File:Eglise_Saint-Michel_de_Grimaud.jpg'}],
 'moulin-saint-roch-grimaud':[{src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Moulin_Saint-Roch_de_Grimaud.jpg/1280px-Moulin_Saint-Roch_de_Grimaud.jpg',alt:'Moulin Saint-Roch de Grimaud, photographie de 2022',caption:{fr:'Le moulin Saint-Roch de Grimaud (2022)',en:'Saint-Roch windmill, Grimaud (2022)'},credit,license,licenseUrl,source:'https://commons.wikimedia.org/wiki/File:Moulin_Saint-Roch_de_Grimaud.jpg'}],
 'chapelle-des-penitents-grimaud':[{src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Chapelle_des_P%C3%A9nitents_de_Grimaud.jpg/1280px-Chapelle_des_P%C3%A9nitents_de_Grimaud.jpg',alt:'Chapelle des Pénitents de Grimaud, photographie de 2022',caption:{fr:'La chapelle des Pénitents de Grimaud (2022)',en:'Penitents’ Chapel, Grimaud (2022)'},credit,license,licenseUrl,source:'https://commons.wikimedia.org/wiki/File:Chapelle_des_P%C3%A9nitents_de_Grimaud.jpg'}]
};
