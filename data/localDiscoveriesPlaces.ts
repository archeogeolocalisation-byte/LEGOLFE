import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {Locale} from '../lib/i18n';

export const localDiscoveriesPlaces:Place[] = [
  {
    "id": "musee-patrimoine-grimaud",
    "name": "Musée du Patrimoine de Grimaud",
    "location": "Grimaud",
    "category": "do",
    "tags": [
      "heritage",
      "culture",
      "museum",
      "family"
    ],
    "description": "Visit Grimaud’s Musée du Patrimoine: everyday objects, Provençal traditions, family discovery and practical information for exploring the old village.",
    "bestFor": [
      "Local discoveries"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-musee-du-patrimoine/",
    "website": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-musee-du-patrimoine/",
    "lastVerifiedAt": "2026-10-26"
  },
  {
    "id": "villa-romaine-pardigon",
    "name": "Villa gallo-romaine de Pardigon II",
    "location": "La Croix-Valmer",
    "category": "do",
    "tags": [
      "heritage",
      "history",
      "archaeology",
      "culture"
    ],
    "description": "Discover Pardigon II’s Roman villa remains in La Croix-Valmer: ancient history, the Débarquement area and practical advice for an archaeological visit.",
    "bestFor": [
      "Local discoveries"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.lacroixvalmer.fr/Site-de-Pardigon",
    "website": "https://www.lacroixvalmer.fr/Site-de-Pardigon",
    "lastVerifiedAt": "2026-10-26"
  },
  {
    "id": "chapelle-notre-dame-miremer",
    "name": "Chapelle Notre-Dame de Miremer",
    "location": "La Garde-Freinet",
    "category": "do",
    "tags": [
      "heritage",
      "history",
      "quiet",
      "nature"
    ],
    "description": "Explore Notre-Dame de Miremer in La Garde-Freinet: religious heritage, pilgrimage memory and practical pointers for this chapel in the Maures hills.",
    "bestFor": [
      "Local discoveries"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historiques/la-garde-freinet/chapelle-notre-dame-de-miremer-3350172",
    "website": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historiques/la-garde-freinet/chapelle-notre-dame-de-miremer-3350172",
    "lastVerifiedAt": "2026-10-26"
  },
  {
    "id": "chapelle-sainte-magdeleine-la-mole",
    "name": "Chapelle Sainte-Magdeleine de La Môle",
    "location": "La Môle",
    "category": "do",
    "tags": [
      "heritage",
      "history",
      "walk",
      "nature",
      "view"
    ],
    "description": "Plan a visit to Sainte-Magdeleine chapel above La Môle: a medieval hill site, official walking-route pointers and practical advice for the Maures.",
    "bestFor": [
      "Local discoveries"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-mole/randonnee-vers-la-chapelle-sainte-magdeleine-6643274",
    "website": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-mole/randonnee-vers-la-chapelle-sainte-magdeleine-6643274",
    "lastVerifiedAt": "2026-10-26"
  },
  {
    "id": "plage-de-la-nartelle",
    "name": "Plage de la Nartelle",
    "location": "Sainte-Maxime",
    "category": "beach",
    "tags": [
      "beach",
      "family",
      "sea"
    ],
    "description": "Discover La Nartelle in Sainte-Maxime: a sandy beach, family time, seaside restaurants and pointers for checking water conditions, weather and access.",
    "bestFor": [
      "Local discoveries"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "goodToKnow": [
      "Check current access and opening before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/plage-de-la-nartelle/",
    "website": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/plage-de-la-nartelle/",
    "lastVerifiedAt": "2026-10-26"
  }
];

export const localDiscoveriesFacts:Record<string,PlaceFacts> = {
  "musee-patrimoine-grimaud": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Musée du Patrimoine de Grimaud : le village au quotidien",
        "description": "Visitez le Musée du Patrimoine de Grimaud : objets du quotidien, traditions provençales, découverte en famille et repères pratiques au cœur du village.",
        "intro": "On photographie les villages ; ici, on découvre comment on y vivait. Le Musée du Patrimoine de Grimaud ramène la Provence à hauteur de maison : les objets, les vêtements et les gestes donnent un visage aux générations qui ont habité ces ruelles. Une halte pour regarder le village autrement, avant de retrouver ses places et ses pierres.",
        "sections": [
          [
            "Le passé à travers les choses ordinaires",
            "Les collections présentent les arts et traditions populaires et la vie quotidienne d’autrefois. Notre suggestion : choisir un objet qui vous intrigue, puis chercher ce qu’il raconte d’un métier ou d’un usage. Cette manière de visiter laisse de la place aux questions et fait le lien entre les salles du musée et le village extérieur."
          ],
          [
            "Un bâtiment qui participe à la découverte",
            "L’office de tourisme décrit un ensemble recomposé, comprenant notamment un ancien moulin à huile et plusieurs espaces reliés au fil du temps. Escaliers et changements de pièces font partie de la visite. Les personnes ayant besoin d’un parcours sans marches doivent se renseigner : la fiche régionale indique un accueil à mobilité réduite limité au rez-de-chaussée."
          ],
          [
            "Un jeu de regard à partager en famille",
            "Un livret-jeu destiné aux 6–12 ans est annoncé par l’office. Demandez-le à l’accueil et laissez les enfants chercher les détails à leur rythme. Pour une sortie courte, mieux vaut retenir quelques découvertes et les commenter ensemble que vouloir parcourir chaque salle rapidement."
          ],
          [
            "Quand venir et comment prolonger",
            "Le musée est indiqué au 591 route Nationale, à Grimaud. L’entrée est annoncée gratuite ; la visite se prépare du mardi au samedi, avec des horaires saisonniers et des fermetures en janvier et les jours fériés. Consultez les informations actuelles avant le trajet, puis prolongez dans le vieux village selon votre disponibilité."
          ]
        ],
        "facts": [
          [
            "Adresse",
            "591 route Nationale, 83310 Grimaud"
          ],
          [
            "Entrée",
            "Gratuite selon les informations touristiques"
          ],
          [
            "Calendrier",
            "Mardi–samedi, horaires saisonniers ; fermeture en janvier et jours fériés"
          ],
          [
            "Accessibilité",
            "Rez-de-chaussée pour les personnes à mobilité réduite, à confirmer"
          ]
        ],
        "questions": [
          [
            "Le musée convient-il aux enfants ?",
            "L’office annonce un livret-jeu pour les 6–12 ans. Demandez sa disponibilité et adaptez la visite à l’attention de votre enfant."
          ],
          [
            "Peut-on visiter tous les étages sans escalier ?",
            "La fiche régionale limite l’accueil à mobilité réduite au rez-de-chaussée. Contactez le musée pour préciser votre besoin."
          ]
        ]
      },
      "en": {
        "title": "Grimaud heritage museum: everyday village life",
        "description": "Visit Grimaud’s Musée du Patrimoine: everyday objects, Provençal traditions, family discovery and practical information for exploring the old village.",
        "intro": "Villages are often photographed; this museum asks how people lived in them. Grimaud’s Musée du Patrimoine brings Provence down to the scale of a home. Objects, clothing and familiar gestures give a human dimension to the streets outside, offering a different way to understand the village before returning to its squares.",
        "sections": [
          [
            "Everyday objects, different lives",
            "The collections explore popular traditions and daily life. Our suggestion: pick an unfamiliar object and consider the work or habit behind it. A few thoughtful discoveries can connect the museum’s rooms with the place you are visiting."
          ],
          [
            "A building with its own story",
            "The tourist office describes interconnected spaces that include a former oil mill. Stairs and changes of room are part of the experience. The regional listing limits reduced-mobility access to the ground floor; ask about your particular needs before visiting."
          ],
          [
            "A shared family investigation",
            "The tourist office advertises a discovery booklet for ages 6–12. Ask for it on arrival and let children find details at their own pace. A short visit centred on a few objects may be more rewarding than rushing through every room."
          ],
          [
            "Plan the museum and the village",
            "The address is 591 Route Nationale, Grimaud. Admission is advertised as free, with Tuesday–Saturday visits, seasonal hours and closures in January and on public holidays. Check the current schedule before travelling, then allow time for the old village."
          ]
        ],
        "facts": [
          [
            "Address",
            "591 Route Nationale, 83310 Grimaud"
          ],
          [
            "Admission",
            "Advertised as free"
          ],
          [
            "Schedule",
            "Tuesday–Saturday, seasonal hours; closed January and public holidays"
          ],
          [
            "Accessibility",
            "Ground-floor reduced-mobility access; enquire before visiting"
          ]
        ],
        "questions": [
          [
            "Is there something for children?",
            "A booklet for ages 6–12 is advertised. Ask about availability and adapt the visit to your child."
          ],
          [
            "Are all floors step-free?",
            "The regional listing specifies reduced-mobility access on the ground floor only. Contact the museum for details."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Grimaud Tourisme — musée",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-musee-du-patrimoine/"
      },
      {
        "label": "Tourisme régional — accès et horaires",
        "url": "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/musee-du-patrimoine-grimaud-fr-2853125/"
      }
    ],
    "nearby": [
      "grimaud-village",
      "eglise-saint-michel-grimaud",
      "chateau-de-grimaud"
    ]
  },
  "villa-romaine-pardigon": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Villa romaine de Pardigon II : une autre histoire de La Croix-Valmer",
        "description": "Découvrez les vestiges de la villa gallo-romaine de Pardigon II à La Croix-Valmer : histoire antique, repères près du Débarquement et conseils de visite.",
        "intro": "Avant les vacances au bord de la mer, il y avait déjà une vie sur ce littoral. À Pardigon II, les vestiges invitent à regarder La Croix-Valmer sur une tout autre échelle de temps. Entre le paysage actuel et les traces de l’Antiquité, cette halte donne une profondeur inattendue à une journée près de la plage.",
        "sections": [
          [
            "Un site antique dans le paysage littoral",
            "La commune situe l’origine de la villa au Ier siècle de notre ère et décrit un ensemble agrandi au fil du temps. Sur place, l’intérêt est de lire les traces plutôt que d’attendre une maison complète. Prenez le temps de distinguer ce qui subsiste et ce que les explications permettent de comprendre."
          ],
          [
            "Pardigon II, pas une maison de vacances",
            "Le mot villa désigne ici un établissement antique. Cette fiche concerne les vestiges archéologiques, sans lien avec les locations qui peuvent porter un nom voisin. Pour vous orienter, utilisez l’intitulé complet du site et le secteur du boulevard du Maréchal Juin, près du parking du Débarquement."
          ],
          [
            "Une découverte à mener avec délicatesse",
            "Restez sur les espaces autorisés et observez les structures sans les escalader ni déplacer de pierres. Notre conseil : commencer par les informations présentes sur le site, puis revenir sur les vestiges avec cette première grille de lecture. Avec des enfants, la découverte gagne à rester courte et attentive."
          ],
          [
            "Préparer l’accès et une éventuelle visite commentée",
            "Le tourisme local annonce un accès gratuit. Les visites commentées, lorsqu’elles sont proposées, ont leur propre calendrier : consultez la commune ou l’office au 04 94 55 13 13. Vérifiez également les conditions d’accès du jour ; une annonce ancienne de visite guidée ne vaut pas rendez-vous permanent."
          ]
        ],
        "facts": [
          [
            "Repère",
            "Secteur du parking du Débarquement, boulevard du Maréchal Juin"
          ],
          [
            "Commune",
            "La Croix-Valmer"
          ],
          [
            "Découverte",
            "Vestiges archéologiques en extérieur"
          ],
          [
            "Information",
            "04 94 55 13 13 · calendrier des visites à confirmer"
          ]
        ],
        "questions": [
          [
            "Est-ce une villa à louer ?",
            "Non. Pardigon II est un site archéologique gallo-romain ; cette fiche ne concerne pas un hébergement."
          ],
          [
            "Une visite guidée est-elle comprise dans l’accès ?",
            "Les visites commentées éventuelles suivent un programme distinct. Renseignez-vous auprès de l’office avant de venir."
          ]
        ]
      },
      "en": {
        "title": "Pardigon II Roman villa: another side of La Croix-Valmer",
        "description": "Discover Pardigon II’s Roman villa remains in La Croix-Valmer: ancient history, the Débarquement area and practical advice for an archaeological visit.",
        "intro": "Long before seaside holidays, this coast was already inhabited. The remains at Pardigon II invite a different sense of time in La Croix-Valmer. Between the landscape you see today and traces of antiquity, a short stop can add an unexpected historical dimension to a day near the beach.",
        "sections": [
          [
            "Antiquity in a coastal landscape",
            "The municipality dates the villa’s origins to the first century AD and describes later expansion. Expect archaeological remains rather than a complete house. Take time to distinguish surviving structures from what interpretation helps you imagine."
          ],
          [
            "A Roman site, not a rental home",
            "Villa here means an ancient establishment. This profile concerns archaeology and is unrelated to holiday properties with similar names. Use the full site name and the Boulevard du Maréchal Juin area near the Débarquement car park when making enquiries."
          ],
          [
            "Observe without disturbing",
            "Stay within permitted areas, avoid climbing structures and leave stones where they are. Start with the information provided on site, then look again at the remains. With children, a brief and attentive discovery is a useful approach."
          ],
          [
            "Access and guided visits",
            "Local tourism information advertises free access. Any guided visits have their own programme: ask the municipality or tourist office on 04 94 55 13 13. Check current access conditions and do not treat an old tour announcement as a permanent appointment."
          ]
        ],
        "facts": [
          [
            "Reference area",
            "Débarquement car park sector, Boulevard du Maréchal Juin"
          ],
          [
            "Town",
            "La Croix-Valmer"
          ],
          [
            "Visit",
            "Outdoor archaeological remains"
          ],
          [
            "Enquiries",
            "04 94 55 13 13 · confirm any guided-visit programme"
          ]
        ],
        "questions": [
          [
            "Is this a holiday villa?",
            "No. Pardigon II is a Roman archaeological site, not accommodation."
          ],
          [
            "Is a guided visit included?",
            "Any guided visits follow a separate programme. Ask the tourist office before travelling."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Ville de La Croix-Valmer — site de Pardigon",
        "url": "https://www.lacroixvalmer.fr/Site-de-Pardigon"
      },
      {
        "label": "Tourisme du Golfe — Pardigon II",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-croix-valmer/villa-romaine-5903098"
      }
    ],
    "nearby": [
      "plage-debarquement-la-croix-valmer",
      "la-croix-valmer-village"
    ]
  },
  "chapelle-notre-dame-miremer": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Notre-Dame de Miremer à La Garde-Freinet : chapelle des collines",
        "description": "Notre-Dame de Miremer à La Garde-Freinet : patrimoine religieux, mémoire du pèlerinage et repères pour découvrir cette chapelle sur les collines des Maures.",
        "intro": "Prendre de la hauteur change la manière de regarder le Golfe. À Notre-Dame de Miremer, le paysage rencontre une mémoire religieuse discrète, attachée à une colline de La Garde-Freinet. Une étape pour ralentir, s’intéresser à l’histoire du lieu et laisser les grands itinéraires touristiques quelques instants en arrière-plan.",
        "sections": [
          [
            "De Miravaux à Miremer",
            "L’office rattache les origines du lieu au Moyen Âge et à l’ancien castrum de Miravaux. La chapelle actuelle remonte au XIXe siècle. Ces deux temps se superposent : la construction visible ne résume pas à elle seule l’ancienneté du site. C’est cette continuité qui donne son intérêt à la découverte."
          ],
          [
            "Une dévotion qui a laissé des traces",
            "Les informations touristiques mentionnent des ex-voto conservés dans la chapelle et un pèlerinage lié au 8 septembre. Pour voir l’intérieur ou assister à une célébration, renseignez-vous sur les ouvertures et le programme effectif. Un lieu religieux conserve ses usages : adaptez votre visite et vos photographies aux personnes présentes."
          ],
          [
            "La colline plutôt qu’un arrêt improvisé",
            "Le repère publié situe Miremer sur la colline, dans le secteur de la D558 entre La Garde-Freinet et Grimaud. Demandez l’accès conseillé à l’office et préparez la dernière partie du déplacement. Cette fiche ne transforme pas le nom d’une route en garantie de stationnement au pied de la chapelle."
          ],
          [
            "Choisir le bon moment pour les Maures",
            "Une visite extérieure se prépare avec la météo et les conditions locales. Avant une marche dans le massif, vérifiez les éventuelles restrictions d’accès et privilégiez un équipement adapté. Vous pouvez ensuite poursuivre votre découverte de La Garde-Freinet au Conservatoire du Patrimoine, selon ses horaires."
          ]
        ],
        "facts": [
          [
            "Secteur",
            "Colline de Miremer · D558 · La Garde-Freinet"
          ],
          [
            "Patrimoine",
            "Chapelle actuelle du XIXe siècle, site d’origine médiévale"
          ],
          [
            "Intérieur",
            "Ouverture à confirmer auprès de l’office"
          ],
          [
            "Programme religieux",
            "Rendez-vous du 8 septembre à vérifier pour l’édition concernée"
          ]
        ],
        "questions": [
          [
            "La chapelle est-elle toujours ouverte à l’intérieur ?",
            "Ne déduisez pas une ouverture intérieure permanente de la mention d’accès au site. Confirmez les conditions auprès de l’office."
          ],
          [
            "Miremer est-elle dans le centre du village ?",
            "Le site est sur une colline dans le secteur de la D558. Préparez un déplacement distinct de la promenade dans le centre."
          ]
        ]
      },
      "en": {
        "title": "Notre-Dame de Miremer: a hilltop chapel in La Garde-Freinet",
        "description": "Explore Notre-Dame de Miremer in La Garde-Freinet: religious heritage, pilgrimage memory and practical pointers for this chapel in the Maures hills.",
        "intro": "A higher viewpoint changes how the Golfe is seen. At Notre-Dame de Miremer, the landscape meets a quiet religious memory attached to a hill in La Garde-Freinet. Pause, consider the place’s history and discover an inland perspective beyond the best-known coastal stops.",
        "sections": [
          [
            "From Miravaux to Miremer",
            "Tourism information connects the site with the medieval castrum of Miravaux. The present chapel dates from the nineteenth century. The visible building and the longer history belong to different periods, which helps explain the depth of the place."
          ],
          [
            "Traces of devotion",
            "The chapel is described as containing votive offerings, with a pilgrimage associated with 8 September. Ask about actual interior opening and any celebration programme. Respect worshippers and adapt photography to the religious use of the site."
          ],
          [
            "Plan for the hill",
            "The published reference places Miremer on a hill in the D558 area between La Garde-Freinet and Grimaud. Ask the tourist office for recommended access. A road reference should not be interpreted as guaranteed parking beside the chapel."
          ],
          [
            "A suitable day in the Maures",
            "Plan an outdoor visit around weather and local conditions. Check forest access restrictions before walking in the massif and bring suitable equipment. The Freinet heritage conservatory offers another way to explore the village’s history, subject to its opening hours."
          ]
        ],
        "facts": [
          [
            "Area",
            "Miremer hill · D558 · La Garde-Freinet"
          ],
          [
            "Heritage",
            "Nineteenth-century chapel on a medieval site"
          ],
          [
            "Interior",
            "Confirm access with the tourist office"
          ],
          [
            "Religious programme",
            "Check arrangements for 8 September in the relevant year"
          ]
        ],
        "questions": [
          [
            "Is the interior always open?",
            "Do not infer permanent interior opening from a general site-access listing. Confirm arrangements with the tourist office."
          ],
          [
            "Is it in the village centre?",
            "The chapel is on a hill in the D558 area, requiring a separate planned visit."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Tourisme du Golfe — Miremer",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historiques/la-garde-freinet/chapelle-notre-dame-de-miremer-3350172"
      },
      {
        "label": "Var Tourisme — chapelle",
        "url": "https://www.visitvar.fr/fiche/chapelle-notre-dame-de-miremer-3350172"
      }
    ],
    "nearby": [
      "conservatoire-patrimoine-freinet",
      "fort-freinet"
    ]
  },
  "chapelle-sainte-magdeleine-la-mole": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Chapelle Sainte-Magdeleine à La Môle : marche et patrimoine",
        "description": "Préparez la découverte de la chapelle Sainte-Magdeleine à La Môle : site médiéval sur les hauteurs, itinéraire officiel et précautions pour la marche.",
        "intro": "À La Môle, le patrimoine se découvre aussi en marchant. Sur les hauteurs, Sainte-Magdeleine compose une rencontre entre pierres sombres, végétation et relief des Maures. La montée donne sa mesure à la visite : on quitte le rythme du village pour rejoindre un lieu dont l’isolement fait partie de l’expérience.",
        "sections": [
          [
            "Un autre lieu que l’église du village",
            "La chapelle sur le site ancien et l’église située dans le centre ne doivent pas être confondues. Cette dernière peut servir de repère de départ à la marche décrite par l’office. Saisir la différence avant le trajet évite d’attendre une chapelle de montagne au bord de la place."
          ],
          [
            "Une présence médiévale dans le relief",
            "Le pupitre patrimonial de l’office situe la construction de la chapelle en 1280 et raconte l’occupation fortifiée du site. Observez la manière dont les vestiges s’inscrivent dans la colline. Restez sur les passages autorisés, sans grimper sur les murs : la découverte du bâti ancien n’exige pas de le parcourir en hauteur."
          ],
          [
            "Un circuit à préparer comme une randonnée",
            "La fiche officielle annonce une boucle de 5 km, environ 1 h 30 et 200 m de dénivelé, de difficulté modérée, avec balisage jaune. Ce sont des repères de parcours, pas une durée garantie pour votre groupe. Le sol de terre et de cailloux n’est pas adapté aux poussettes ; consultez le tracé officiel avant de partir."
          ],
          [
            "Adapter la sortie aux conditions du massif",
            "Prévoyez eau et chaussures de marche, puis vérifiez la météo et les restrictions d’accès aux Maures. L’office signale la présence possible de troupeaux et de chiens de protection : gardez vos distances et suivez les consignes locales. Pour le circuit et son départ, la mairie publie le 04 94 40 05 80."
          ]
        ],
        "facts": [
          [
            "Sortie officielle",
            "5 km · environ 1 h 30 · 200 m de dénivelé"
          ],
          [
            "Niveau annoncé",
            "Modéré · balisage jaune"
          ],
          [
            "Terrain",
            "Terre et cailloux · non adapté aux poussettes"
          ],
          [
            "Information parcours",
            "04 94 40 05 80 · météo et accès à vérifier"
          ]
        ],
        "questions": [
          [
            "Est-ce l’église du centre de La Môle ?",
            "Non. La chapelle est sur le site ancien en hauteur ; l’église du village est un autre édifice."
          ],
          [
            "Peut-on y aller avec une poussette ?",
            "La randonnée officielle est indiquée non adaptée aux poussettes. Choisissez une autre promenade si ce besoin est essentiel."
          ]
        ]
      },
      "en": {
        "title": "Sainte-Magdeleine chapel in La Môle: walking and heritage",
        "description": "Plan a visit to Sainte-Magdeleine chapel above La Môle: a medieval hill site, official walking-route pointers and practical advice for the Maures.",
        "intro": "In La Môle, heritage also rewards a walk. High above the village, Sainte-Magdeleine brings together dark stone, vegetation and the Maures hills. The approach is part of the visit, exchanging the village’s pace for a place whose setting gives it much of its character.",
        "sections": [
          [
            "Not the church in the centre",
            "The hilltop chapel and the village church are separate buildings. The latter is a starting reference in the tourist office’s walk description. Distinguishing them before travelling helps you plan for an outing on foot rather than a stop beside the square."
          ],
          [
            "A medieval hill site",
            "The office’s heritage panel dates the chapel to 1280 and describes fortified occupation. Look at the relationship between remains and terrain. Keep to permitted paths and avoid climbing walls; understanding the site does not require scrambling over its structures."
          ],
          [
            "Prepare the official walking route",
            "The official listing describes a moderate, yellow-marked 5 km loop, around 90 minutes and 200 metres of elevation gain. These are route estimates rather than a promised duration. Earth and stony ground make it unsuitable for pushchairs. Consult the official track before setting out."
          ],
          [
            "Conditions in the massif",
            "Bring water and walking footwear, and check weather and forest-access restrictions. The office also notes possible livestock and protection dogs: keep your distance and follow local instructions. The municipality’s route-enquiry contact is 04 94 40 05 80."
          ]
        ],
        "facts": [
          [
            "Official route",
            "5 km · around 90 minutes · 200 m elevation gain"
          ],
          [
            "Listed difficulty",
            "Moderate · yellow waymarks"
          ],
          [
            "Terrain",
            "Earth and stones · unsuitable for pushchairs"
          ],
          [
            "Route enquiries",
            "04 94 40 05 80 · check weather and access"
          ]
        ],
        "questions": [
          [
            "Is this the village-centre church?",
            "No. The chapel is at the old hill site; the church in the centre is a different building."
          ],
          [
            "Is the walk pushchair-friendly?",
            "The official route is listed as unsuitable for pushchairs. Choose a different outing if this is essential."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Tourisme du Golfe — randonnée",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-mole/randonnee-vers-la-chapelle-sainte-magdeleine-6643274"
      },
      {
        "label": "Office — histoire du site",
        "url": "https://www.golfe-sainttropez-tourisme.fr/a-faire/activites/randonnees/pupitres-dinformation/pupitre-de-la-chapelle-sainte-magdeleine/"
      }
    ],
    "nearby": [
      "eglise-sainte-magdeleine-la-mole",
      "barrage-de-la-verne"
    ]
  },
  "plage-de-la-nartelle": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Plage de la Nartelle à Sainte-Maxime : choisir sa journée mer",
        "description": "La Nartelle à Sainte-Maxime : plage de sable, pause en famille, restaurants du littoral et conseils pour vérifier baignade, météo et conditions d’accès.",
        "intro": "La Nartelle donne à Sainte-Maxime un grand rendez-vous avec la mer. À l’est du centre, cette plage de sable change de rythme avec les saisons : une journée de baignade, une promenade au bord de l’eau ou un déjeuner face au large ne racontent pas le même moment. À vous de choisir celui qui vous ressemble.",
        "sections": [
          [
            "Une plage à découvrir selon votre rythme",
            "L’office présente une longue plage de sable appréciée des familles. Pour construire votre journée, commencez par décider si vous recherchez un moment sur la partie publique ou les services d’un établissement. Cette distinction aide à préparer le budget, le matériel et les éventuelles réservations."
          ],
          [
            "Le vent change l’expérience",
            "La Nartelle accueille aussi des pratiques nautiques et l’office souligne l’effet du vent d’est sur les conditions. Une mer agréable à regarder peut ne pas convenir à votre baignade. Observez la signalisation sur place, adaptez la sortie à votre niveau et ne déduisez pas la sécurité du seul aspect du ciel."
          ],
          [
            "La bonne information le jour de la sortie",
            "La communauté de communes publie le suivi de la qualité des eaux de baignade. Consultez la date du prélèvement et les avis actuels, puis les indications sur place. Les périodes de surveillance, équipements en service et conditions d’accès sont à vérifier pour le jour choisi : ils ne sont pas garantis toute l’année."
          ],
          [
            "Prolonger sans compliquer la journée",
            "Les restaurants du secteur permettent d’envisager une pause autour de la plage, avec ouverture et réservation propres à chacun. Pour venir avec un chien, l’office indique une interdiction sur la Nartelle, avec exception pour les chiens guides ou d’assistance. Vérifiez la réglementation locale actuelle et préparez votre arrivée selon la circulation."
          ]
        ],
        "facts": [
          [
            "Situation",
            "À l’est du centre de Sainte-Maxime"
          ],
          [
            "Cadre",
            "Plage de sable · littoral de la Nartelle"
          ],
          [
            "Baignade",
            "Signalisation et suivi de l’eau à consulter le jour de la visite"
          ],
          [
            "Chiens",
            "Réglementation locale ; chiens guides et d’assistance admis selon l’office"
          ]
        ],
        "questions": [
          [
            "Peut-on venir avec des enfants ?",
            "La plage de sable est présentée comme adaptée aux familles. La météo, les vagues et la surveillance effective restent à vérifier sur place."
          ],
          [
            "La plage est-elle surveillée toute l’année ?",
            "Ne présumez pas une surveillance permanente. Vérifiez le poste de secours et les informations officielles pour la date choisie."
          ]
        ]
      },
      "en": {
        "title": "La Nartelle beach in Sainte-Maxime: plan your seaside day",
        "description": "Discover La Nartelle in Sainte-Maxime: a sandy beach, family time, seaside restaurants and pointers for checking water conditions, weather and access.",
        "intro": "La Nartelle gives Sainte-Maxime a generous meeting place with the sea. East of the centre, this sandy shoreline changes with the seasons. A swim, a walk beside the water and a leisurely lunch offer different ways to enjoy it: choose the one that fits your day.",
        "sections": [
          [
            "Choose your kind of beach day",
            "The tourist office describes a long sandy beach popular with families. Decide whether you want time on the public beach or an establishment’s services. That choice helps with equipment, budget and any bookings."
          ],
          [
            "Wind makes a difference",
            "The area also attracts watersports, and the tourist office highlights conditions in an easterly wind. Water that is beautiful to watch may not suit your swim. Follow signs on site and adapt to your abilities rather than judging conditions by a clear sky alone."
          ],
          [
            "Check information for the day",
            "The intercommunal authority publishes bathing-water monitoring. Read sampling dates and current notices, then check local signs. Lifeguard periods, operating facilities and access conditions must be confirmed for your chosen date rather than assumed year-round."
          ],
          [
            "Extend your time by the sea",
            "Restaurants offer options for a break, each with its own opening and booking arrangements. The tourist office lists dogs as prohibited on La Nartelle, with an exception for guide and assistance dogs. Check current local rules and allow for traffic when planning your arrival."
          ]
        ],
        "facts": [
          [
            "Location",
            "East of Sainte-Maxime town centre"
          ],
          [
            "Setting",
            "Sandy beach · La Nartelle coastline"
          ],
          [
            "Swimming",
            "Check signs and current water-quality information"
          ],
          [
            "Dogs",
            "Local rules apply; guide and assistance dogs admitted according to the office"
          ]
        ],
        "questions": [
          [
            "Is it suitable for children?",
            "Tourism information presents the sandy beach as family-friendly. Check waves, weather and actual lifeguard arrangements on site."
          ],
          [
            "Are lifeguards present all year?",
            "Do not assume permanent supervision. Check the operating lifeguard post and official information for your date."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime Tourisme — Nartelle",
        "url": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/plage-de-la-nartelle/"
      },
      {
        "label": "Communauté de communes — qualité de l’eau",
        "url": "https://www.golfe-sainttropez.fr/plage/la-nartelle/"
      }
    ],
    "nearby": [
      "sainte-maxime-village",
      "plage-des-elephants",
      "jardin-botanique-des-myrtes"
    ]
  }
};

export const localDiscoveriesSignatures:Record<string,Record<Locale,{subtitle:string;quote:string;rhythm:string;dark:string;close:string}>> = {
  "musee-patrimoine-grimaud": {
    "fr": {
      "subtitle": "LE PASSÉ À TRAVERS LES CHOSES ORDINAIRES",
      "quote": "DERRIÈRE LES FAÇADES, DES VIES À DÉCOUVRIR.",
      "rhythm": "PRENDRE LE TEMPS. REGARDER AUTREMENT.",
      "dark": "UN JEU DE REGARD À PARTAGER EN FAMILLE",
      "close": "QUAND VENIR ET COMMENT PROLONGER"
    },
    "en": {
      "subtitle": "EVERYDAY OBJECTS, DIFFERENT LIVES",
      "quote": "BEHIND THE FACADES, EVERYDAY LIVES.",
      "rhythm": "TAKE TIME. LOOK AGAIN.",
      "dark": "A SHARED FAMILY INVESTIGATION",
      "close": "PLAN THE MUSEUM AND THE VILLAGE"
    }
  },
  "villa-romaine-pardigon": {
    "fr": {
      "subtitle": "UN SITE ANTIQUE DANS LE PAYSAGE LITTORAL",
      "quote": "SOUS LE PAYSAGE D’AUJOURD’HUI, L’ANTIQUITÉ.",
      "rhythm": "PRENDRE LE TEMPS. REGARDER AUTREMENT.",
      "dark": "UNE DÉCOUVERTE À MENER AVEC DÉLICATESSE",
      "close": "PRÉPARER L’ACCÈS ET UNE ÉVENTUELLE VISITE COMMENTÉE"
    },
    "en": {
      "subtitle": "ANTIQUITY IN A COASTAL LANDSCAPE",
      "quote": "ANCIENT LIVES BENEATH TODAY’S LANDSCAPE.",
      "rhythm": "TAKE TIME. LOOK AGAIN.",
      "dark": "OBSERVE WITHOUT DISTURBING",
      "close": "ACCESS AND GUIDED VISITS"
    }
  },
  "chapelle-notre-dame-miremer": {
    "fr": {
      "subtitle": "DE MIRAVAUX À MIREMER",
      "quote": "UNE COLLINE, UNE CHAPELLE, UNE MÉMOIRE.",
      "rhythm": "PRENDRE LE TEMPS. REGARDER AUTREMENT.",
      "dark": "LA COLLINE PLUTÔT QU’UN ARRÊT IMPROVISÉ",
      "close": "CHOISIR LE BON MOMENT POUR LES MAURES"
    },
    "en": {
      "subtitle": "FROM MIRAVAUX TO MIREMER",
      "quote": "A HILL, A CHAPEL, A LASTING MEMORY.",
      "rhythm": "TAKE TIME. LOOK AGAIN.",
      "dark": "PLAN FOR THE HILL",
      "close": "A SUITABLE DAY IN THE MAURES"
    }
  },
  "chapelle-sainte-magdeleine-la-mole": {
    "fr": {
      "subtitle": "UN AUTRE LIEU QUE L’ÉGLISE DU VILLAGE",
      "quote": "L’HISTOIRE SE MÉRITE AUSSI À PIED.",
      "rhythm": "PRENDRE LE TEMPS. REGARDER AUTREMENT.",
      "dark": "UN CIRCUIT À PRÉPARER COMME UNE RANDONNÉE",
      "close": "ADAPTER LA SORTIE AUX CONDITIONS DU MASSIF"
    },
    "en": {
      "subtitle": "NOT THE CHURCH IN THE CENTRE",
      "quote": "WALK INTO ANOTHER LAYER OF HISTORY.",
      "rhythm": "TAKE TIME. LOOK AGAIN.",
      "dark": "PREPARE THE OFFICIAL WALKING ROUTE",
      "close": "CONDITIONS IN THE MASSIF"
    }
  },
  "plage-de-la-nartelle": {
    "fr": {
      "subtitle": "UNE PLAGE À DÉCOUVRIR SELON VOTRE RYTHME",
      "quote": "LE MÊME RIVAGE, PLUSIEURS FAÇONS DE PRENDRE LE LARGE.",
      "rhythm": "PRENDRE LE TEMPS. REGARDER AUTREMENT.",
      "dark": "LA BONNE INFORMATION LE JOUR DE LA SORTIE",
      "close": "PROLONGER SANS COMPLIQUER LA JOURNÉE"
    },
    "en": {
      "subtitle": "CHOOSE YOUR KIND OF BEACH DAY",
      "quote": "ONE SHORELINE, MANY WAYS TO ENJOY THE SEA.",
      "rhythm": "TAKE TIME. LOOK AGAIN.",
      "dark": "CHECK INFORMATION FOR THE DAY",
      "close": "EXTEND YOUR TIME BY THE SEA"
    }
  }
};
