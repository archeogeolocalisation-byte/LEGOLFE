import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {VillagePhoto} from './villageMedia';
import {villageMedia} from './villageMedia';

export const sainteMaximePlaces:Place[] = [
  {
    "id": "tour-carree-sainte-maxime",
    "name": "Tour Carrée — Maison des Traditions",
    "category": "do",
    "location": "Sainte-Maxime",
    "description": "Discover Sainte-Maxime’s Tour Carrée: five centuries of history, the Maison des Traditions and pre-booked guided visits. Location and old-town access.",
    "bestFor": [
      "Old-town discovery"
    ],
    "notIdealFor": [
      "Unplanned opening hours"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.sainte-maxime.com/agenda/visite-guidee-de-la-tour-carree-maison-des-traditions-sainte-maxime-fr-6729049/",
    "lastVerifiedAt": "2026-10-16",
    "bookingUrl": "https://ticket.sainte-maxime.com/tour-carree-visite-monument-provence-alpes-cote-d-azur-css5-otsaintemaxime-lgen-pg1-rg28495.html"
  },
  {
    "id": "jardin-botanique-des-myrtes",
    "name": "Jardin botanique des Myrtes",
    "category": "do",
    "location": "Sainte-Maxime",
    "description": "Explore Sainte-Maxime’s Jardin des Myrtes: Mediterranean plants, a gentle walk and free entry. Boulevard Jean-Moulin access and seasonal opening hours.",
    "bestFor": [
      "Botanical walk"
    ],
    "notIdealFor": [
      "Unplanned opening hours"
    ],
    "tags": [
      "botanical",
      "nature",
      "family",
      "walk"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.sainte-maxime.com/offres/jardin-botanique-des-myrtes-sainte-maxime-fr-6295384/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "marche-couvert-sainte-maxime",
    "name": "Marché couvert de Sainte-Maxime",
    "category": "do",
    "location": "Sainte-Maxime",
    "description": "Plan a visit to Sainte-Maxime’s covered market: local food, Rue Fernand-Bessy and Montée de l’Épagneul entrances, seasonal hours and old-town ideas.",
    "bestFor": [
      "Old-town discovery"
    ],
    "notIdealFor": [
      "Unplanned opening hours"
    ],
    "tags": [
      "market",
      "family",
      "walk"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.sainte-maxime.com/agenda/le-marche-couvert-sainte-maxime-fr-6295540/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "plage-des-elephants",
    "name": "Plage des Éléphants",
    "category": "beach",
    "location": "Sainte-Maxime",
    "description": "Discover Sainte-Maxime’s Plage des Éléphants: its Babar connection, Avenue du Croiseur-Léger-Le-Malin access and advice for this listed unpatrolled beach.",
    "bestFor": [
      "Coastal scenery"
    ],
    "notIdealFor": [
      "Lifeguarded swimming"
    ],
    "tags": [
      "beach",
      "nature",
      "sea-view"
    ],
    "goodToKnow": [
      "Check current opening and access before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.sainte-maxime.com/profiter/plage-des-elephants-sainte-maxime-fr-6295392/",
    "lastVerifiedAt": "2026-10-16"
  }
];

export const sainteMaximeFacts:Record<string,PlaceFacts> = {
  "tour-carree-sainte-maxime": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Tour Carrée de Sainte-Maxime : visite et traditions",
        "description": "Découvrez la Tour Carrée de Sainte-Maxime : cinq siècles d’histoire, Maison des Traditions et visites guidées sur réservation. Adresse et accès au centre ancien.",
        "intro": "Au bord du vieux Sainte-Maxime, la Tour Carrée invite à regarder au-delà des bateaux. Derrière ses pierres se cache une histoire de défense du Golfe, de vie municipale et de traditions provençales. Notre idée : en faire le point de départ d’une promenade entre le port et les ruelles, avec une visite intérieure réservée à l’avance.",
        "facts": [
          [
            "Adresse",
            "Place Mireille-de-Germond, 83120 Sainte-Maxime"
          ],
          [
            "Repère historique",
            "Construction commencée en 1520"
          ],
          [
            "Aujourd’hui",
            "Maison des Traditions"
          ],
          [
            "Visite intérieure",
            "Sur des créneaux guidés, réservation obligatoire"
          ]
        ],
        "sections": [
          [
            "Une tour, plusieurs vies",
            "Commencée en 1520, la Tour Carrée a changé de rôle au fil des siècles : ouvrage défensif, prison, école ou mairie. Elle a abrité le musée des traditions locales de 1985 à 2018. Ces transformations donnent une autre lecture du centre ancien : un lieu habité et organisé autour de la mer."
          ],
          [
            "La Maison des Traditions aujourd’hui",
            "Depuis 2018, l’association de Maintenance des Traditions Maximoises occupe les lieux. La ville propose des visites guidées pour découvrir cette histoire. Consultez le programme officiel et réservez le créneau qui correspond à votre séjour ; un ancien calendrier de musée ne garantit pas une ouverture libre."
          ],
          [
            "Venir à la Tour Carrée",
            "Rejoignez la place Mireille-de-Germond, à proximité du port. Depuis un stationnement autorisé du centre, notre conseil est de terminer à pied et de garder une marge avant votre rendez-vous. Le point cartographique situe la tour, pas une entrée de parking."
          ],
          [
            "Composer une promenade dans le centre",
            "Associez la tour au marché couvert et à une promenade sur le port. Pour la visite guidée, l’office signale un accès non adapté aux poussettes : demandez les conditions d’accès avant de réserver si votre groupe a des besoins particuliers. Le programme et les tarifs sont ceux de la date choisie."
          ]
        ],
        "questions": [
          [
            "Peut-on visiter la Tour Carrée sans réserver ?",
            "La visite intérieure annoncée par l’office se fait sur réservation obligatoire et selon les dates proposées. L’extérieur se découvre lors d’une promenade dans le centre."
          ],
          [
            "Est-ce encore le musée des Traditions locales ?",
            "Le musée a occupé la tour de 1985 à 2018. La Tour Carrée accueille aujourd’hui la Maison des Traditions et des visites guidées programmées."
          ]
        ]
      },
      "en": {
        "title": "Sainte-Maxime Tour Carrée: visits and local traditions",
        "description": "Discover Sainte-Maxime’s Tour Carrée: five centuries of history, the Maison des Traditions and pre-booked guided visits. Location and old-town access.",
        "intro": "Beside Sainte-Maxime’s old town, the Tour Carrée invites you to look beyond the boats. Its stone walls hold stories of coastal defence, civic life and Provençal traditions. Our idea: start a walk between the harbour and the lanes here, with an interior tour booked ahead.",
        "facts": [
          [
            "Address",
            "Place Mireille-de-Germond, 83120 Sainte-Maxime"
          ],
          [
            "History",
            "Construction began in 1520"
          ],
          [
            "Today",
            "Maison des Traditions"
          ],
          [
            "Interior visits",
            "Scheduled guided tours; booking required"
          ]
        ],
        "sections": [
          [
            "One tower, many lives",
            "Begun in 1520, the Tour Carrée has served as a defensive building, prison, school and town hall. It housed the local traditions museum from 1985 to 2018. These changing roles offer another way to read the old town: a community shaped by the sea."
          ],
          [
            "The Maison des Traditions today",
            "The Maintenance des Traditions Maximoises association has occupied the tower since 2018. The town offers guided visits exploring its history. Consult the official programme and book a date during your stay; old museum schedules do not establish current walk-in opening."
          ],
          [
            "Getting to the tower",
            "Head to Place Mireille-de-Germond near the harbour. Our advice: walk the final stretch from an authorised central parking area and allow time before your booking. The map marks the tower, not a car park entrance."
          ],
          [
            "Make it an old-town outing",
            "Combine the tower with the covered market and a harbour stroll. The tourist office says the guided visit is unsuitable for pushchairs; ask about access before booking if anyone in your group needs specific arrangements. Programme and prices depend on the date selected."
          ]
        ],
        "questions": [
          [
            "Can I visit the Tour Carrée without booking?",
            "The advertised interior visits require booking and run on scheduled dates. You can see the exterior while walking through the centre."
          ],
          [
            "Is it still the local traditions museum?",
            "The museum occupied the tower from 1985 to 2018. It now houses the Maison des Traditions and scheduled guided visits."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime Tourisme · Tour Carrée — Maison des Traditions",
        "url": "https://www.sainte-maxime.com/agenda/visite-guidee-de-la-tour-carree-maison-des-traditions-sainte-maxime-fr-6729049/"
      },
      {
        "label": "Ville de Sainte-Maxime · histoire de la Tour Carrée",
        "url": "https://www.sainte-maxime.fr/ma-ville/decouvrir-sainte-maxime/histoire-et-patrimoine/la-tour-carree-le-musee-des-traditions-locales/"
      }
    ],
    "nearby": [
      "sainte-maxime-village",
      "jardin-botanique-des-myrtes",
      "marche-couvert-sainte-maxime",
      "plage-des-elephants"
    ]
  },
  "jardin-botanique-des-myrtes": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Jardin des Myrtes à Sainte-Maxime : balade et accès",
        "description": "Le jardin botanique des Myrtes à Sainte-Maxime : végétaux méditerranéens, promenade et entrée libre. Accès boulevard Jean-Moulin et horaires selon la saison.",
        "intro": "Quitter un instant le sable pour suivre les allées, regarder une écorce ou reconnaître un myrte : le jardin botanique des Myrtes offre une autre idée de Sainte-Maxime. Face au Golfe, ce jardin du boulevard Jean-Moulin donne envie de ralentir. Notre suggestion : une promenade courte à glisser entre deux étapes de la journée.",
        "facts": [
          [
            "Adresse",
            "Boulevard Jean-Moulin, 83120 Sainte-Maxime"
          ],
          [
            "Entrée",
            "Libre"
          ],
          [
            "Collection",
            "Plus de 60 végétaux acclimatés annoncés"
          ],
          [
            "Horaires 2026",
            "8h–17h d’octobre à mars ; 8h–20h d’avril à septembre"
          ]
        ],
        "sections": [
          [
            "Reconnaître les plantes du paysage",
            "Myrtes, arbousiers, cistes, pins et chênes font partie des végétaux présentés par l’office. Le jardin rassemble plus de 60 végétaux acclimatés, avec notamment des palmiers anciens. Notre conseil : choisissez quelques arbres à observer plutôt que de transformer la promenade en inventaire."
          ],
          [
            "Une balade à partager",
            "Les allées et les repères botaniques permettent une sortie à votre rythme. Un parcours en braille et une aire de jeux sont annoncés. L’office indique un accès en fauteuil roulant avec aide : vérifiez sur place ou auprès de l’office les conditions adaptées à votre groupe."
          ],
          [
            "Accès et horaires du jardin des Myrtes",
            "L’adresse de visite est boulevard Jean-Moulin. La fiche officielle 2026 annonce une ouverture quotidienne de 8h à 17h d’octobre à mars, et de 8h à 20h d’avril à septembre. Confirmez ces horaires avant votre sortie ; le repère situe le jardin, sans garantir un stationnement disponible."
          ],
          [
            "Une pause à composer avec le bord de mer",
            "Notre idée : associer le jardin au secteur de la Croisette, puis revenir vers le centre pour le marché ou le port. Prévoyez la pause repas en dehors du jardin : les pique-niques, les vélos et les chiens y sont interdits selon l’office. Gardez du temps pour le trajet entre ces étapes."
          ]
        ],
        "questions": [
          [
            "Le jardin des Myrtes est-il payant ?",
            "L’entrée est annoncée libre. Consultez la fiche officielle pour les horaires et les éventuelles conditions exceptionnelles."
          ],
          [
            "Peut-on pique-niquer dans le jardin ?",
            "Non : la fiche de l’office indique que les pique-niques sont interdits, de même que les vélos et les chiens."
          ]
        ]
      },
      "en": {
        "title": "Jardin des Myrtes, Sainte-Maxime: botanical garden walk",
        "description": "Explore Sainte-Maxime’s Jardin des Myrtes: Mediterranean plants, a gentle walk and free entry. Boulevard Jean-Moulin access and seasonal opening hours.",
        "intro": "Step away from the sand to follow a garden path, examine bark or recognise a myrtle. The Jardin des Myrtes on Boulevard Jean-Moulin offers another side of Sainte-Maxime, facing the Golfe. Our suggestion: make this a short, unhurried walk between the day’s other stops.",
        "facts": [
          [
            "Address",
            "Boulevard Jean-Moulin, 83120 Sainte-Maxime"
          ],
          [
            "Entry",
            "Free"
          ],
          [
            "Collection",
            "Over 60 acclimatised plants listed"
          ],
          [
            "2026 hours",
            "8am–5pm October–March; 8am–8pm April–September"
          ]
        ],
        "sections": [
          [
            "Get to know the local landscape",
            "The tourist office lists myrtles, strawberry trees, rockroses, pines and oaks among the plants. The collection includes over 60 acclimatised plants and old palms. Our advice: pick a few trees to observe rather than turning the walk into a checklist."
          ],
          [
            "A walk to share",
            "Paths and botanical markers let you explore at your own pace. A braille trail and play area are listed. The office describes wheelchair access with assistance: check which arrangements suit your group before visiting."
          ],
          [
            "Garden location and seasonal hours",
            "The visitor address is Boulevard Jean-Moulin. The official 2026 listing gives daily hours of 8am–5pm from October to March and 8am–8pm from April to September. Confirm before travelling; the map marks the garden without guaranteeing a parking space."
          ],
          [
            "Combine the garden with the waterfront",
            "Our idea: pair the garden with the Croisette area, then return towards the centre for the market or harbour. Plan to eat outside the garden: the office lists picnics, bicycles and dogs as prohibited. Leave time for the journey between stops."
          ]
        ],
        "questions": [
          [
            "Is the Jardin des Myrtes free?",
            "Entry is listed as free. Check the official listing for hours and exceptional arrangements."
          ],
          [
            "Can I picnic inside the garden?",
            "No: the tourist office lists picnics, bicycles and dogs as prohibited."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime Tourisme · Jardin botanique des Myrtes",
        "url": "https://www.sainte-maxime.com/offres/jardin-botanique-des-myrtes-sainte-maxime-fr-6295384/"
      },
      {
        "label": "Golfe de Saint-Tropez Tourisme · jardin des Myrtes",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/jardin-botanique-des-myrtes-4759519"
      }
    ],
    "nearby": [
      "sainte-maxime-village",
      "tour-carree-sainte-maxime",
      "marche-couvert-sainte-maxime",
      "plage-des-elephants"
    ]
  },
  "marche-couvert-sainte-maxime": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Marché couvert de Sainte-Maxime : accès et horaires",
        "description": "Préparez votre visite du marché couvert de Sainte-Maxime : spécialités locales, accès rue Fernand-Bessy et montée de l’Épagneul, horaires selon la saison.",
        "intro": "À Sainte-Maxime, le marché couvert donne un point de rendez-vous gourmand au centre ancien. On y vient pour faire ses courses, regarder ce que proposent les commerçants et composer son repas. Notre idée : commencer la matinée ici, panier à la main, avant de rejoindre les ruelles et le port.",
        "facts": [
          [
            "Adresse",
            "Rue Fernand-Bessy, 83120 Sainte-Maxime"
          ],
          [
            "Deux accès",
            "Rue Fernand-Bessy et montée de l’Épagneul"
          ],
          [
            "Type de marché",
            "Marché alimentaire couvert, toute l’année"
          ],
          [
            "Horaires",
            "Variables selon la saison ; lundi fermé en basse saison"
          ]
        ],
        "sections": [
          [
            "Le centre-ville côté gourmand",
            "La fiche touristique annonce notamment boulangerie, fruits et légumes, poissonnerie, boucherie-charcuterie, crèmerie et épicerie fine. Les produits dépendent des étals et des arrivages. Notre conseil : faites un premier tour avant de composer votre panier et échangez avec les commerçants."
          ],
          [
            "Deux entrées pour rejoindre le marché couvert",
            "La ville indique deux accès : rue Fernand-Bessy, près de la place du Marché, et montée de l’Épagneul. Utilisez un parking autorisé du centre puis terminez à pied. Le repère cartographique situe le marché ; il ne désigne pas un emplacement de livraison ou une place de stationnement."
          ],
          [
            "Des horaires à vérifier selon la saison",
            "La ville distingue basse, moyenne et haute saison, avec une fermeture le lundi en basse saison et des ouvertures supplémentaires en soirée au cœur de l’été. Les pages de la ville et de l’office diffèrent sur certaines heures de fermeture hivernales : consultez-les et confirmez l’horaire pour votre date plutôt que de prévoir une arrivée en toute fin de service."
          ],
          [
            "Marché couvert ou grand marché du vendredi ?",
            "Le marché couvert est une adresse permanente du centre ancien. Il se distingue du grand marché Mermoz du vendredi matin. Notre suggestion : poursuivez vers la Tour Carrée et le port, puis choisissez votre pause selon vos achats et la météo. Les jours de grande affluence, gardez une marge pour le stationnement."
          ]
        ],
        "questions": [
          [
            "Où se trouve l’entrée du marché couvert ?",
            "La ville annonce deux accès : rue Fernand-Bessy et montée de l’Épagneul, dans le centre de Sainte-Maxime."
          ],
          [
            "Le marché couvert est-il ouvert le lundi ?",
            "Le lundi est annoncé fermé en basse saison. Les horaires changent selon la période ; confirmez votre date auprès de la ville ou de l’office."
          ]
        ]
      },
      "en": {
        "title": "Sainte-Maxime covered market: entrances and opening hours",
        "description": "Plan a visit to Sainte-Maxime’s covered market: local food, Rue Fernand-Bessy and Montée de l’Épagneul entrances, seasonal hours and old-town ideas.",
        "intro": "Sainte-Maxime’s covered market is a food-shopping meeting point in the old centre. Come to browse the stalls and put together a meal. Our idea: start the morning here with a shopping bag before continuing through the lanes to the harbour.",
        "facts": [
          [
            "Address",
            "Rue Fernand-Bessy, 83120 Sainte-Maxime"
          ],
          [
            "Two entrances",
            "Rue Fernand-Bessy and Montée de l’Épagneul"
          ],
          [
            "Market type",
            "Year-round covered food market"
          ],
          [
            "Hours",
            "Seasonal; closed Mondays in low season"
          ]
        ],
        "sections": [
          [
            "A taste of the town centre",
            "The tourist listing includes bakery, fruit and vegetables, fish, meat, cheese and fine groceries. Products depend on the stalls and deliveries. Our advice: browse once before putting together your shopping and take time to talk to the traders."
          ],
          [
            "Two entrances to the covered market",
            "The town lists access from Rue Fernand-Bessy near Place du Marché and from Montée de l’Épagneul. Walk the final stretch from authorised central parking. The map marks the market, not a loading bay or parking space."
          ],
          [
            "Check the hours for your season",
            "The town distinguishes low, mid and high seasons, with Monday closure in low season and extra evening openings in peak summer. Town and tourist-office pages differ on some winter closing hours: consult them and confirm your date rather than planning to arrive at the very end of trading."
          ],
          [
            "Covered market or Friday market?",
            "The covered market is a permanent address in the old centre, distinct from Friday morning’s Mermoz market. Our suggestion: continue towards the Tour Carrée and harbour, then choose a break around your purchases and the weather. Allow time for parking on busy days."
          ]
        ],
        "questions": [
          [
            "Where is the covered market entrance?",
            "The town lists two entrances: Rue Fernand-Bessy and Montée de l’Épagneul, in central Sainte-Maxime."
          ],
          [
            "Is the covered market open on Mondays?",
            "Monday closure is listed in low season. Hours vary by period; confirm your date with the town or tourist office."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime Tourisme · Marché couvert de Sainte-Maxime",
        "url": "https://www.sainte-maxime.com/agenda/le-marche-couvert-sainte-maxime-fr-6295540/"
      },
      {
        "label": "Ville de Sainte-Maxime · marchés et horaires",
        "url": "https://www.sainte-maxime.fr/ma-ville/vie-economique/marches-et-foires/"
      }
    ],
    "nearby": [
      "sainte-maxime-village",
      "tour-carree-sainte-maxime",
      "jardin-botanique-des-myrtes",
      "plage-des-elephants"
    ]
  },
  "plage-des-elephants": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Plage des Éléphants à Sainte-Maxime : accès et Babar",
        "description": "La plage des Éléphants à Sainte-Maxime : paysage lié à Babar, accès avenue du Croiseur-Léger-Le-Malin et conseils pour cette plage annoncée non surveillée.",
        "intro": "Un nom qui fait sourire, une histoire de livre et la mer devant soi : la plage des Éléphants ajoute une touche d’imaginaire au littoral de Sainte-Maxime. L’office relie ce paysage au Voyage de Babar de Jean de Brunhoff. Notre idée : venir pour le bord de mer et prendre le temps de raconter cette histoire, sans attendre une plage déserte en été.",
        "facts": [
          [
            "Adresse",
            "30–55 avenue du Croiseur-Léger-Le-Malin, 83120 Sainte-Maxime"
          ],
          [
            "Accès",
            "Plage publique en accès libre"
          ],
          [
            "À savoir",
            "Plage annoncée non surveillée"
          ],
          [
            "Le clin d’œil",
            "Le Voyage de Babar, publié en 1932"
          ]
        ],
        "sections": [
          [
            "Pourquoi la plage des Éléphants porte ce nom ?",
            "L’office de tourisme associe la plage au Voyage de Babar de Jean de Brunhoff, paru en 1932. L’auteur séjournait dans ce secteur et ce paysage aurait inspiré les illustrations du voyage de Babar et Céleste. Une histoire à partager, sans transformer une tradition locale en visite de maison ouverte au public."
          ],
          [
            "Rejoindre la plage depuis Sainte-Maxime",
            "La fiche officielle situe la plage au niveau des 30–55 avenue du Croiseur-Léger-Le-Malin, sur le littoral à l’est du centre. Vérifiez votre itinéraire et utilisez les emplacements autorisés. Notre conseil en été : arriver tôt et prévoir du temps pour le trajet et le stationnement ; la carte situe le secteur, pas une place disponible."
          ],
          [
            "Baignade : connaître les conditions du jour",
            "La plage est annoncée non surveillée. Consultez les informations locales et les conditions de mer avant de vous baigner, et choisissez un autre secteur si votre groupe recherche une plage surveillée. Le calme ressenti depuis la serviette ne garantit pas des conditions adaptées à tous les nageurs."
          ],
          [
            "Une sortie mer à organiser simplement",
            "Prévoyez votre ombre, de l’eau et de quoi emporter vos déchets. Des établissements de plage sont annoncés dans le secteur : confirmez leurs ouvertures et réservez séparément si vous souhaitez y manger. Notre suggestion : garder le marché et le centre ancien pour une autre étape, avec le temps de déplacement nécessaire."
          ]
        ],
        "questions": [
          [
            "La plage des Éléphants est-elle surveillée ?",
            "La fiche officielle de l’office l’annonce non surveillée. Vérifiez les informations affichées et les conditions du jour avant toute baignade."
          ],
          [
            "Y a-t-il un lien avec Babar ?",
            "Oui : l’office relie ce paysage au Voyage de Babar de Jean de Brunhoff, publié en 1932, dont l’auteur séjournait dans le secteur."
          ]
        ]
      },
      "en": {
        "title": "Plage des Éléphants, Sainte-Maxime: access and Babar",
        "description": "Discover Sainte-Maxime’s Plage des Éléphants: its Babar connection, Avenue du Croiseur-Léger-Le-Malin access and advice for this listed unpatrolled beach.",
        "intro": "A memorable name, a bookish connection and the sea ahead: Plage des Éléphants adds a little imagination to Sainte-Maxime’s coastline. The tourist office links this landscape to Jean de Brunhoff’s Babar’s Travels. Our idea: enjoy the shore and share the story, without expecting an empty beach in summer.",
        "facts": [
          [
            "Address",
            "30–55 Avenue du Croiseur-Léger-Le-Malin, 83120 Sainte-Maxime"
          ],
          [
            "Access",
            "Free public beach access"
          ],
          [
            "Important detail",
            "Listed as an unpatrolled beach"
          ],
          [
            "Literary link",
            "Babar’s Travels, published in 1932"
          ]
        ],
        "sections": [
          [
            "Why is it called the Plage des Éléphants?",
            "The tourist office links the beach to Jean de Brunhoff’s Babar’s Travels, published in 1932. The author stayed in this area and the scenery is said to have inspired the journey of Babar and Céleste. Share the story without assuming the associated house is open for visits."
          ],
          [
            "Getting here from Sainte-Maxime",
            "The official listing places the beach at 30–55 Avenue du Croiseur-Léger-Le-Malin, along the coast east of the centre. Check your route and use authorised parking. Our summer advice: arrive early and leave time for the journey and parking; the map identifies the area, not an available space."
          ],
          [
            "Swimming and daily conditions",
            "The beach is listed as unpatrolled. Check local notices and sea conditions before entering the water, and choose a different beach if your group wants lifeguard cover. A peaceful view from your towel does not establish suitable conditions for every swimmer."
          ],
          [
            "Keep the beach outing simple",
            "Bring shade, water and a way to take your rubbish away. Beach establishments are listed nearby: confirm their opening and book separately if you want a meal. Our suggestion: make the market and old town another stop, allowing for travel between the two."
          ]
        ],
        "questions": [
          [
            "Is Plage des Éléphants lifeguarded?",
            "The official tourist listing describes it as unpatrolled. Check posted information and daily conditions before swimming."
          ],
          [
            "Does the beach have a Babar connection?",
            "Yes: the tourist office connects the landscape with Jean de Brunhoff’s Babar’s Travels, published in 1932. The author stayed in this area."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime Tourisme · Plage des Éléphants",
        "url": "https://www.sainte-maxime.com/profiter/plage-des-elephants-sainte-maxime-fr-6295392/"
      },
      {
        "label": "Sainte-Maxime Tourisme · les traces de Babar",
        "url": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/plage-des-elephants/"
      }
    ],
    "nearby": [
      "sainte-maxime-village",
      "tour-carree-sainte-maxime",
      "jardin-botanique-des-myrtes",
      "marche-couvert-sainte-maxime"
    ]
  }
};

export const sainteMaximeSignatures = {
  "tour-carree-sainte-maxime": {
    "fr": {
      "subtitle": "CINQ SIÈCLES FACE À LA MER.",
      "quote": "LES PIERRES RACONTENT AUSSI LE GOLFE.",
      "rhythm": "LE PORT. LA TOUR. LES RUELLES.",
      "dark": "L’HISTOIRE SE DÉCOUVRE SUR RENDEZ-VOUS.",
      "close": "SAINTE-MAXIME A DE LA MÉMOIRE."
    },
    "en": {
      "subtitle": "FIVE CENTURIES FACING THE SEA.",
      "quote": "THE STONES HAVE A GOLFE STORY TOO.",
      "rhythm": "HARBOUR. TOWER. OLD-TOWN LANES.",
      "dark": "BOOK YOUR TIME WITH HISTORY.",
      "close": "SAINTE-MAXIME REMEMBERS."
    }
  },
  "jardin-botanique-des-myrtes": {
    "fr": {
      "subtitle": "LA MÉDITERRANÉE PREND RACINE.",
      "quote": "UN JARDIN POUR REGARDER LE GOLFE AUTREMENT.",
      "rhythm": "LES ALLÉES. LES ÉCORCES. LES FEUILLES.",
      "dark": "PRENDRE SON TEMPS A AUSSI SES HORAIRES.",
      "close": "UNE PARENTHÈSE VERTE À SAINTE-MAXIME."
    },
    "en": {
      "subtitle": "THE MEDITERRANEAN TAKES ROOT.",
      "quote": "A GARDEN FOR A DIFFERENT VIEW OF THE GOLFE.",
      "rhythm": "PATHS. BARK. LEAVES.",
      "dark": "SLOW MOMENTS HAVE OPENING HOURS TOO.",
      "close": "A GREEN PAUSE IN SAINTE-MAXIME."
    }
  },
  "marche-couvert-sainte-maxime": {
    "fr": {
      "subtitle": "LE CENTRE A DU GOÛT.",
      "quote": "UN PANIER, DES ÉTALS, UNE MATINÉE À SOI.",
      "rhythm": "REGARDER. CHOISIR. PARTAGER.",
      "dark": "LA BONNE HEURE DÉPEND DE LA SAISON.",
      "close": "SAINTE-MAXIME SE SAVOURE AUSSI À PIED."
    },
    "en": {
      "subtitle": "THE CENTRE HAS FLAVOUR.",
      "quote": "A SHOPPING BAG. THE STALLS. A MORNING YOUR OWN.",
      "rhythm": "BROWSE. CHOOSE. SHARE.",
      "dark": "THE RIGHT TIME DEPENDS ON THE SEASON.",
      "close": "TASTE SAINTE-MAXIME ON FOOT."
    }
  },
  "plage-des-elephants": {
    "fr": {
      "subtitle": "UN PEU DE BABAR, BEAUCOUP DE MER.",
      "quote": "L’IMAGINAIRE A RENDEZ-VOUS SUR LA PLAGE.",
      "rhythm": "LE RIVAGE. L’HISTOIRE. L’HORIZON.",
      "dark": "BELLE PLAGE NE VEUT PAS DIRE PLAGE SURVEILLÉE.",
      "close": "LA MÉDITERRANÉE AVEC UNE HISTOIRE EN PLUS."
    },
    "en": {
      "subtitle": "A LITTLE BABAR. A LOT OF SEA.",
      "quote": "IMAGINATION MEETS THE SHORE.",
      "rhythm": "COAST. STORY. HORIZON.",
      "dark": "BEAUTIFUL DOES NOT MEAN LIFEGUARDED.",
      "close": "THE MEDITERRANEAN WITH A STORY TO SHARE."
    }
  }
};

export const sainteMaximeMapPoints:Record<string,MapPoint[]> = {
  "tour-carree-sainte-maxime": [
    {
      "id": "tour-carree-sainte-maxime",
      "label": {
        "fr": "Tour Carrée — Maison des Traditions",
        "en": "Tour Carrée — Maison des Traditions"
      },
      "latitude": 43.306918,
      "longitude": 6.640964,
      "source": "https://www.sainte-maxime.com/agenda/visite-guidee-de-la-tour-carree-maison-des-traditions-sainte-maxime-fr-6729049/",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Place Mireille-de-Germond, 83120 Sainte-Maxime, France",
      "note": {
        "fr": "Repère publié par l’office de tourisme. Il situe le lieu, pas un parking ; vérifiez les conditions de visite et d’accès.",
        "en": "Tourist-office location reference, not a car park. Check current access and visiting arrangements."
      }
    }
  ],
  "jardin-botanique-des-myrtes": [
    {
      "id": "jardin-botanique-des-myrtes",
      "label": {
        "fr": "Jardin botanique des Myrtes",
        "en": "Jardin botanique des Myrtes"
      },
      "latitude": 43.301884,
      "longitude": 6.625723,
      "source": "https://www.sainte-maxime.com/offres/jardin-botanique-des-myrtes-sainte-maxime-fr-6295384/",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Boulevard Jean-Moulin, 83120 Sainte-Maxime, France",
      "note": {
        "fr": "Repère publié par l’office de tourisme. Il situe le lieu, pas un parking ; vérifiez les conditions de visite et d’accès.",
        "en": "Tourist-office location reference, not a car park. Check current access and visiting arrangements."
      }
    }
  ],
  "marche-couvert-sainte-maxime": [
    {
      "id": "marche-couvert-sainte-maxime",
      "label": {
        "fr": "Marché couvert de Sainte-Maxime",
        "en": "Marché couvert de Sainte-Maxime"
      },
      "latitude": 43.308,
      "longitude": 6.6411,
      "source": "https://www.sainte-maxime.com/agenda/le-marche-couvert-sainte-maxime-fr-6295540/",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Rue Fernand-Bessy, 83120 Sainte-Maxime, France",
      "note": {
        "fr": "Repère publié par l’office de tourisme. Il situe le lieu, pas un parking ; vérifiez les conditions de visite et d’accès.",
        "en": "Tourist-office location reference, not a car park. Check current access and visiting arrangements."
      }
    }
  ],
  "plage-des-elephants": [
    {
      "id": "plage-des-elephants",
      "label": {
        "fr": "Plage des Éléphants",
        "en": "Plage des Éléphants"
      },
      "latitude": 43.33,
      "longitude": 6.6682,
      "source": "https://www.sainte-maxime.com/profiter/plage-des-elephants-sainte-maxime-fr-6295392/",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "30–55 avenue du Croiseur-Léger-Le-Malin, 83120 Sainte-Maxime, France",
      "note": {
        "fr": "Repère officiel du secteur de plage, pas un parking. Plage annoncée non surveillée ; vérifiez les conditions du jour.",
        "en": "Official beach-area reference, not a car park. Listed as unpatrolled; check daily conditions."
      }
    }
  ]
};

// Contextual views stay labelled as such; no tourist-office photographs are reused.
const town=villageMedia['sainte-maxime-village'];
function areaPhoto(index:number,fr:string,en:string):VillagePhoto{return {...town[index],contextual:true,alt:fr,caption:{fr,en}};}
export const sainteMaximeMedia:Record<string,VillagePhoto[]> = {
 'tour-carree-sainte-maxime':[{...town[0],alt:'La Tour Carrée et l’église vues du port de Sainte-Maxime en 2019',caption:{fr:'La Tour Carrée et l’église vues du port de Sainte-Maxime (2019)',en:'Tour Carrée and church seen from Sainte-Maxime harbour (2019)'}}],
 'jardin-botanique-des-myrtes':[{src:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Plage_croisette_%285%29.jpg/1280px-Plage_croisette_%285%29.jpg',contextual:true,alt:'Plage de la Croisette à Sainte-Maxime en 2015 — vue du secteur voisin, pas de l’intérieur du jardin des Myrtes',caption:{fr:'La Croisette à Sainte-Maxime (2015) — photo du secteur voisin, pas de l’intérieur du jardin des Myrtes',en:'La Croisette, Sainte-Maxime (2015) — neighbouring area photograph, not the inside of the Jardin des Myrtes'},credit:'Gossipguy / Wikimedia Commons',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',source:'https://commons.wikimedia.org/wiki/File:Plage_croisette_(5).jpg'}],
 'marche-couvert-sainte-maxime':[areaPhoto(0,'Le port et le centre ancien de Sainte-Maxime — photo du secteur, pas des halles du marché couvert','Sainte-Maxime harbour and old town — area photograph, not the market hall')],
 'plage-des-elephants':[areaPhoto(2,'Sainte-Maxime vue du ciel — photo de la commune, pas une vue précise de la plage des Éléphants','Aerial view of Sainte-Maxime — town photograph, not a specific view of Plage des Éléphants')]
};
