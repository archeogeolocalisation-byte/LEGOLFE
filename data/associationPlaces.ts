import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {Locale} from '../lib/i18n';

export const associationPlaces:Place[] = [
  {
    "id": "snsm-cavalaire",
    "name": "SNSM de Cavalaire-sur-Mer",
    "location": "Cavalaire-sur-Mer",
    "category": "services",
    "website": "https://etablissement.snsm.org/provence-alpes-cote-d-azur/var/cavalaire-sur-mer/station-snsm-de-cavalaire-sur-mer-51",
    "tags": [
      "association",
      "local",
      "solidarity",
      "rescue",
      "sea"
    ],
    "description": "Meet Cavalaire-sur-Mer’s SNSM rescue station at Port Héracléa: volunteer commitment, sea-rescue work and official ways to support the local team.",
    "bestFor": [
      "Local association life"
    ],
    "notIdealFor": [
      "Unannounced visits"
    ],
    "goodToKnow": [
      "Contact the association before visiting or volunteering."
    ],
    "verified": false,
    "featured": false,
    "source": "https://etablissement.snsm.org/provence-alpes-cote-d-azur/var/cavalaire-sur-mer/station-snsm-de-cavalaire-sur-mer-51",
    "lastVerifiedAt": "2026-10-26",
    "phone": "+33 6 10 55 14 71"
  },
  {
    "id": "societe-nautique-saint-tropez",
    "name": "Société Nautique de Saint-Tropez",
    "location": "Saint-Tropez",
    "category": "sea",
    "website": "https://www.societe-nautique-saint-tropez.fr/fr",
    "tags": [
      "association",
      "local",
      "sailing",
      "sport",
      "heritage"
    ],
    "description": "Discover Saint-Tropez’s nautical society: the association behind Les Voiles, its regattas, club life and the official conditions for getting involved.",
    "bestFor": [
      "Local association life"
    ],
    "notIdealFor": [
      "Unannounced visits"
    ],
    "goodToKnow": [
      "Contact the association before visiting or volunteering."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.societe-nautique-saint-tropez.fr/fr",
    "lastVerifiedAt": "2026-10-26",
    "phone": "+33 4 94 97 30 54"
  },
  {
    "id": "amis-bravade-saint-tropez",
    "name": "Les Amis de la Bravade",
    "location": "Saint-Tropez",
    "category": "do",
    "website": "https://www.saint-tropez.fr/project/les-amis-de-la-bravade-et-des-traditions-tropeziennes/",
    "tags": [
      "association",
      "local",
      "heritage",
      "tradition",
      "history"
    ],
    "description": "Discover the association preserving Saint-Tropez’s Bravade traditions: local history, ceremonial life, transmission and official contact information.",
    "bestFor": [
      "Local association life"
    ],
    "notIdealFor": [
      "Unannounced visits"
    ],
    "goodToKnow": [
      "Contact the association before visiting or volunteering."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.saint-tropez.fr/project/les-amis-de-la-bravade-et-des-traditions-tropeziennes/",
    "lastVerifiedAt": "2026-10-26"
  },
  {
    "id": "association-festival-ramatuelle",
    "name": "Association pour le Festival de Ramatuelle",
    "location": "Ramatuelle",
    "category": "do",
    "website": "https://www.festivalderamatuelle.com/",
    "tags": [
      "association",
      "local",
      "culture",
      "theatre",
      "music"
    ],
    "description": "Discover the association behind the Ramatuelle Festival: its history since 1985, Théâtre de Verdure, cultural project and official contact information.",
    "bestFor": [
      "Local association life"
    ],
    "notIdealFor": [
      "Unannounced visits"
    ],
    "goodToKnow": [
      "Contact the association before visiting or volunteering."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.festivalderamatuelle.com/histoire",
    "lastVerifiedAt": "2026-10-26",
    "phone": "+33 4 94 49 32 43"
  },
  {
    "id": "agda-chats-du-golfe",
    "name": "AGDA · Les chats du Golfe",
    "location": "Cogolin",
    "category": "services",
    "website": "https://agda-chatsdugolfe.fr/",
    "tags": [
      "association",
      "local",
      "solidarity",
      "animals",
      "cats"
    ],
    "description": "Discover AGDA, a local cat-protection association around Cogolin: care, adoption, foster homes and ways to support volunteers in the Golfe de Saint-Tropez.",
    "bestFor": [
      "Local association life"
    ],
    "notIdealFor": [
      "Unannounced visits"
    ],
    "goodToKnow": [
      "Contact the association before visiting or volunteering."
    ],
    "verified": false,
    "featured": false,
    "source": "https://agda-chatsdugolfe.fr/",
    "lastVerifiedAt": "2026-10-26",
    "phone": "+33 6 22 26 73 79"
  }
];

export const associationFacts:Record<string,PlaceFacts> = {
  "snsm-cavalaire": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "SNSM de Cavalaire : les bénévoles du sauvetage en mer",
        "description": "Découvrez la SNSM de Cavalaire-sur-Mer : une station de bénévoles au port Héracléa, ses missions de sauvetage et les façons de soutenir son action.",
        "intro": "À Cavalaire, la vie du port ne se résume pas aux départs en bateau. Elle repose aussi sur des femmes et des hommes prêts à porter secours. La station locale de la SNSM donne un visage très concret à cette solidarité maritime : de la préparation à terre aux interventions en mer, un engagement collectif fait tenir toute la chaîne. La découvrir, c’est regarder autrement les quais et les équipages qui y travaillent.",
        "facts": [
          [
            "Mission",
            "Sauvetage en mer et solidarité maritime"
          ],
          [
            "Équipe",
            "Des bénévoles, en mer et à terre"
          ],
          [
            "Contact de la station",
            "59 rue de la Digue, Cavalaire-sur-Mer ; prendre contact avant de venir"
          ],
          [
            "Soutenir",
            "Don et bénévolat par les canaux officiels SNSM"
          ]
        ],
        "sections": [
          [
            "Une association au cœur du port Héracléa",
            "La station de Cavalaire appartient au réseau des Sauveteurs en Mer. Le port Héracléa présente une équipe de bénévoles formés et entraînés, ainsi que ses moyens d’intervention. Derrière le bateau visible au port, il y a une organisation, de la préparation et un travail régulier. Ce sont ces personnes, autant que les équipements, qui donnent sa force à la station."
          ],
          [
            "Comprendre avant de vouloir participer",
            "S’engager ne consiste pas à embarquer spontanément sur une vedette. Les rôles à bord et à terre répondent à des besoins et à des conditions précises. Si vous habitez le Golfe et souhaitez donner du temps, présentez votre disponibilité et vos compétences à la station. Elle pourra expliquer les possibilités actuelles, sans que cette fiche promette une place ou un recrutement."
          ],
          [
            "Soutenir une solidarité qui reste locale",
            "Un soutien peut passer par le site officiel de la SNSM ou un échange avec l’équipe locale. Pour une entreprise, une famille ou un résident, c’est une manière de participer à la vie maritime de Cavalaire. Utilisez les coordonnées publiées par l’association et demandez-lui comment orienter votre aide selon ses besoins du moment."
          ],
          [
            "Le bon contact, selon la situation",
            "Le téléphone de la station sert aux renseignements associatifs. Pour une détresse en mer, la SNSM indique le 196 par téléphone ou le canal 16 en VHF pour joindre le CROSS. Une promenade au port ne vaut pas visite organisée de la station : confirmez toute rencontre avant de vous déplacer."
          ]
        ],
        "questions": [
          [
            "Peut-on visiter la station SNSM de Cavalaire ?",
            "Aucune visite libre permanente n’est annoncée dans la fiche officielle consultée. Contactez la station pour connaître les rencontres ou animations qu’elle propose éventuellement."
          ],
          [
            "Comment devenir bénévole à Cavalaire ?",
            "Adressez-vous à la station ou consultez le parcours officiel SNSM. Les besoins, la sélection et la formation dépendent de la mission envisagée."
          ],
          [
            "La SNSM est-elle une activité de promenade en mer ?",
            "Sa mission principale est le sauvetage. Pour une sortie touristique, choisissez un prestataire adapté ; ne considérez pas la station comme une billetterie d’excursions."
          ]
        ]
      },
      "en": {
        "title": "Cavalaire SNSM: volunteer sea rescue in the Golfe",
        "description": "Meet Cavalaire-sur-Mer’s SNSM rescue station at Port Héracléa: volunteer commitment, sea-rescue work and official ways to support the local team.",
        "intro": "Cavalaire harbour is more than a place to start a boat trip. It is also home to people who prepare to help others at sea. The local SNSM station makes maritime solidarity tangible, connecting work ashore with rescue operations on the water. Discovering the team adds another layer to a walk around the quays: the boats have crews, and those crews belong to a wider chain of volunteers.",
        "facts": [
          [
            "Mission",
            "Sea rescue and maritime solidarity"
          ],
          [
            "Team",
            "Volunteers afloat and ashore"
          ],
          [
            "Station contact",
            "59 Rue de la Digue, Cavalaire-sur-Mer; contact the team before visiting"
          ],
          [
            "Support",
            "Official SNSM donation and volunteering channels"
          ]
        ],
        "sections": [
          [
            "A rescue association at Port Héracléa",
            "The Cavalaire station belongs to the French sea-rescue network. Port Héracléa describes a trained volunteer team and its rescue craft. A vessel on the quay is only the visible part: preparation, organisation and regular work keep the station ready. The people behind the equipment are central to understanding its role."
          ],
          [
            "Ask about volunteering first",
            "Joining does not mean turning up and stepping aboard a rescue boat. Operational and shore-based roles have specific requirements. Residents interested in helping can explain their skills and availability to the station. The team can describe current possibilities; this guide does not promise recruitment or a place on a crew."
          ],
          [
            "Support the people behind the boats",
            "Use the official SNSM website or speak with the local station about support. Residents, families and businesses can all take an interest in Cavalaire’s maritime community. Ask how your help could meet present needs rather than assuming a particular equipment collection or fundraising campaign is running."
          ],
          [
            "Use the right contact",
            "The station’s phone number is for association enquiries. For distress at sea, SNSM specifies 196 by phone or VHF channel 16 to reach CROSS. A harbour walk is not an organised station visit: arrange a meeting before travelling."
          ]
        ],
        "questions": [
          [
            "Can I visit the Cavalaire rescue station?",
            "The official listing does not advertise permanent walk-in visits. Ask the station about any public meetings or activities."
          ],
          [
            "How can I volunteer?",
            "Contact the station or read SNSM’s official volunteering information. Needs, selection and training depend on the role."
          ],
          [
            "Does SNSM run tourist boat trips?",
            "Rescue is its principal mission. Choose a suitable excursion operator for a leisure trip rather than treating the station as a booking office."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "SNSM — station de Cavalaire-sur-Mer",
        "url": "https://etablissement.snsm.org/provence-alpes-cote-d-azur/var/cavalaire-sur-mer/station-snsm-de-cavalaire-sur-mer-51"
      },
      {
        "label": "Port Héracléa — sauvetage en mer",
        "url": "https://port-heraclea.fr/index.php/sauvetage-en-mer/"
      }
    ],
    "nearby": [
      "port-heraclea-cavalaire",
      "plage-centre-ville-cavalaire"
    ]
  },
  "societe-nautique-saint-tropez": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Société Nautique de Saint-Tropez : voile, régates et vie du club",
        "description": "Découvrez la Société Nautique de Saint-Tropez : l’association derrière les Voiles, ses régates, la vie du club et les conditions pour se rapprocher de la SNST.",
        "intro": "Le port fait l’image de Saint-Tropez ; les équipages lui donnent son mouvement. Fondée en 1862, la Société Nautique de Saint-Tropez relie cette histoire maritime à une pratique bien vivante de la voile. On la connaît pour les Voiles de Saint-Tropez, mais son calendrier et ses rendez-vous de club racontent une présence plus régulière sur l’eau. Une association à connaître pour passer du décor des grands voiliers à la vie nautique du village.",
        "facts": [
          [
            "Création",
            "1862, selon Saint-Tropez Tourisme"
          ],
          [
            "Univers",
            "Voile, régates et rendez-vous nautiques"
          ],
          [
            "Contact",
            "Quai Trullet, Nouveau Port, Saint-Tropez"
          ],
          [
            "Participation",
            "Règlement de chaque épreuve ; adhésion au club selon ses conditions"
          ]
        ],
        "sections": [
          [
            "Bien plus qu’une semaine de grandes voiles",
            "Les Voiles de Saint-Tropez sont le rendez-vous le plus visible, mais le site de la SNST présente aussi des régates, des challenges et des sorties de club. Pour qui vit ici, cette continuité compte autant que les grands rassemblements. Elle permet de suivre une vie sportive qui traverse plusieurs moments de l’année, selon le calendrier publié."
          ],
          [
            "Regarder une régate ou y prendre part",
            "Assister à la vie du port et s’inscrire à une épreuve sont deux démarches différentes. Pour naviguer, partez de l’avis de course, du bateau et des conditions de participation. Pour observer, préparez plutôt votre promenade et les informations publiques du rendez-vous. La présence de voiliers ne signifie pas qu’un embarquement est proposé aux passants."
          ],
          [
            "Se rapprocher du club",
            "Le site de la SNST distingue cotisation de membre et licence sportive. La demande d’adhésion y est soumise à l’approbation du conseil d’administration et au parrainage de deux membres à jour de leur cotisation. Ces modalités se consultent directement auprès du club ; une envie de naviguer mérite d’abord une conversation sur votre pratique et vos attentes."
          ],
          [
            "Une autre lecture de Saint-Tropez",
            "Complétez la découverte du club par le port et l’histoire maritime de la Citadelle. Ce rapprochement donne du relief aux bateaux que l’on photographie : ils s’inscrivent dans une culture, des usages et un territoire. Consultez le calendrier officiel pour choisir votre moment ; cette fiche ne remplace ni un programme de régate ni une inscription."
          ]
        ],
        "questions": [
          [
            "La Société Nautique organise-t-elle les Voiles de Saint-Tropez ?",
            "Oui, la SNST est l’association organisatrice des Voiles. Son site renvoie vers le site dédié à la manifestation et présente d’autres rendez-vous nautiques."
          ],
          [
            "Peut-on adhérer directement en ligne ?",
            "Le site propose une demande, mais précise une validation et un parrainage. Consultez les modalités en vigueur avant de préparer une adhésion."
          ],
          [
            "Peut-on embarquer pour découvrir la voile ?",
            "Cette fiche ne promet pas de baptême ni de place à bord. Interrogez le club sur les possibilités correspondant à votre expérience et au rendez-vous choisi."
          ]
        ]
      },
      "en": {
        "title": "Société Nautique de Saint-Tropez: sailing, regattas and club life",
        "description": "Discover Saint-Tropez’s nautical society: the association behind Les Voiles, its regattas, club life and the official conditions for getting involved.",
        "intro": "The harbour gives Saint-Tropez its familiar image; crews give it movement. Founded in 1862, the Société Nautique de Saint-Tropez connects maritime history with an active sailing community. Les Voiles is its best-known gathering, while the club calendar reveals a more regular presence on the water. It is a useful association to know when you want to understand the sailing life behind the photogenic yachts.",
        "facts": [
          [
            "Founded",
            "1862, according to Saint-Tropez Tourisme"
          ],
          [
            "Focus",
            "Sailing, regattas and nautical gatherings"
          ],
          [
            "Contact",
            "Quai Trullet, Nouveau Port, Saint-Tropez"
          ],
          [
            "Participation",
            "Event rules apply; club membership has its own conditions"
          ]
        ],
        "sections": [
          [
            "More than the headline regatta",
            "Alongside Les Voiles de Saint-Tropez, the club website lists challenges, regattas and club outings. For residents, that continuity matters as much as the major gathering. Follow the official calendar to understand the sporting community across different parts of the year rather than assuming activity is limited to one famous week."
          ],
          [
            "Watching and competing are different",
            "For race participation, begin with the notice of race, the boat and the entry conditions. For spectating, plan your harbour visit around the event’s public information. Seeing yachts at the quay does not mean that boarding opportunities are offered to passers-by."
          ],
          [
            "Approaching the club",
            "The SNST distinguishes club membership from sporting licences. Its published membership procedure requires board approval and sponsorship by two members whose subscriptions are current. Check the club’s conditions directly and explain your sailing experience and expectations before treating an application as accepted."
          ],
          [
            "Read Saint-Tropez through its maritime life",
            "Combine an interest in the club with a harbour walk and the Citadelle’s maritime history. The boats become part of a local culture rather than isolated photographs. Choose your timing from the official calendar: this profile is neither a race programme nor an entry form."
          ]
        ],
        "questions": [
          [
            "Does the SNST organise Les Voiles de Saint-Tropez?",
            "Yes. The club links to the dedicated event website and publishes other nautical gatherings."
          ],
          [
            "Can I join immediately online?",
            "An application is available, but the published procedure includes approval and sponsorship. Check current conditions directly."
          ],
          [
            "Can visitors join a sailing trip?",
            "No introductory sail or space aboard is promised here. Ask the club about options suitable for your experience and the event concerned."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "SNST — site et calendrier du club",
        "url": "https://www.societe-nautique-saint-tropez.fr/fr"
      },
      {
        "label": "SNST — licences et cotisations",
        "url": "https://www.societe-nautique-saint-tropez.fr/fr/le-club/licences-et-cotisations"
      },
      {
        "label": "Saint-Tropez Tourisme — présentation de la SNST",
        "url": "https://www.sainttropeztourisme.com/en/fiche/saint-tropez-nautical-society-4840142/"
      }
    ],
    "nearby": [
      "port-de-saint-tropez",
      "citadelle-saint-tropez"
    ]
  },
  "amis-bravade-saint-tropez": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Les Amis de la Bravade : traditions vivantes à Saint-Tropez",
        "description": "Rencontrez les Amis de la Bravade et des traditions tropéziennes : histoire locale, transmission, fêtes traditionnelles et contact de l’association à Saint-Tropez.",
        "intro": "Il existe un Saint-Tropez qui se transmet avant de se photographier. Les Amis de la Bravade et des traditions tropéziennes en sont l’un des relais : l’association défend et fait connaître une mémoire religieuse, militaire et villageoise encore partagée. Derrière les uniformes, les processions et les salves, il y a des gestes appris, des responsabilités et des familles. Les comprendre change profondément le regard que l’on porte sur la fête.",
        "facts": [
          [
            "Mission",
            "Faire connaître et préserver les traditions tropéziennes"
          ],
          [
            "Repère",
            "Oustau de la Bravade, 12 rue du Commandant Guichard"
          ],
          [
            "Rendez-vous",
            "Bravades, fêtes traditionnelles et transmissions locales"
          ],
          [
            "Premier contact",
            "Fiche associative officielle de la Ville de Saint-Tropez"
          ]
        ],
        "sections": [
          [
            "La Bravade, une mémoire encore portée",
            "L’association ne présente pas la Bravade comme un simple spectacle. Sa mission est liée à l’histoire de la cité et à la continuité de traditions religieuses et militaires. Pour les habitants comme pour les visiteurs, c’est une porte d’entrée vers les codes de Saint-Tropez : les comprendre aide à regarder les cérémonies avec attention, sans les réduire à un décor sonore."
          ],
          [
            "Une présence au-delà des grandes journées",
            "La présentation municipale cite les Bravades, la Bravade des Espagnols, Sainte-Anne et la nomination du Capitaine de Ville parmi les rendez-vous de cette vie traditionnelle. Ces temps ne sont pas interchangeables. Consultez les annonces officielles pour connaître le programme d’une année plutôt que de reprendre les horaires d’une édition passée."
          ],
          [
            "Rencontrer une transmission locale",
            "Pour poser une question sur l’association, l’histoire ou les modalités de participation, partez de ses coordonnées dans l’annuaire municipal. L’Oustau de la Bravade constitue un repère de contact ; cette fiche n’annonce ni permanence libre ni visite guidée quotidienne. Prendre rendez-vous permet de mieux préparer l’échange et de respecter le fonctionnement des bénévoles."
          ],
          [
            "Le bon regard pendant les cérémonies",
            "Une tradition vivante se découvre en laissant leur place à celles et ceux qui la portent. Respectez les parcours, les consignes et les moments de recueillement. Les salves font partie de certaines cérémonies : renseignez-vous sur le déroulé si vous venez avec de jeunes enfants. Les ruelles, Notre-Dame et Sainte-Anne offrent ensuite d’autres façons de relier la fête à l’histoire du village."
          ]
        ],
        "questions": [
          [
            "Quel est le rôle des Amis de la Bravade ?",
            "L’annuaire municipal décrit une association de maintien et de transmission des traditions tropéziennes, notamment la Bravade et ses dimensions historiques et religieuses."
          ],
          [
            "Peut-on rejoindre l’association ou participer aux cérémonies ?",
            "Adressez votre demande à l’association. Les rôles, les usages et les conditions de participation ne se déduisent pas d’une visite touristique."
          ],
          [
            "L’Oustau de la Bravade est-il ouvert tous les jours ?",
            "Les sources consultées donnent une adresse de contact, pas une ouverture quotidienne garantie. Prenez contact avant de vous y rendre."
          ]
        ]
      },
      "en": {
        "title": "Les Amis de la Bravade: living traditions in Saint-Tropez",
        "description": "Discover the association preserving Saint-Tropez’s Bravade traditions: local history, ceremonial life, transmission and official contact information.",
        "intro": "Some parts of Saint-Tropez are passed down before they are photographed. Les Amis de la Bravade et des traditions tropéziennes help preserve that shared memory, connecting religious, military and village traditions. Uniforms, processions and ceremonial gunfire are carried by people who learn gestures and accept responsibilities. Understanding this human continuity changes the way a visitor sees the celebrations.",
        "facts": [
          [
            "Mission",
            "Preserving and explaining Tropézien traditions"
          ],
          [
            "Contact reference",
            "Oustau de la Bravade, 12 Rue du Commandant Guichard"
          ],
          [
            "Gatherings",
            "Bravades and other traditional celebrations"
          ],
          [
            "First contact",
            "Official association listing on the town website"
          ]
        ],
        "sections": [
          [
            "A tradition carried by people",
            "The association’s mission links the Bravade to the history of the town and the continuity of religious and military traditions. It offers residents and visitors a way into Saint-Tropez’s local codes. Understanding those codes helps you watch a ceremony attentively instead of treating it solely as an atmospheric spectacle."
          ],
          [
            "Beyond the main celebrations",
            "The municipal profile mentions the Bravades, Bravade des Espagnols, Sainte-Anne and the nomination of the Capitaine de Ville. These gatherings have different meanings. Use official announcements for the relevant year rather than reusing a previous edition’s timetable."
          ],
          [
            "Approach the association thoughtfully",
            "Start with the municipal listing for questions about history, membership or participation. The Oustau de la Bravade is a contact reference; this page does not advertise daily walk-in hours or routine guided visits. Arranging a conversation respects the volunteers’ time and helps make the exchange more useful."
          ],
          [
            "Watch with respect",
            "Give space to the people carrying the tradition, follow routes and instructions, and respect moments of reflection. Some ceremonies include gunfire salutes; check the programme when coming with young children. The village lanes, Notre-Dame and Sainte-Anne provide other connections between the celebrations and local history."
          ]
        ],
        "questions": [
          [
            "What does the association do?",
            "The town describes an association preserving and transmitting Tropézien traditions, including the historical and religious dimensions of the Bravade."
          ],
          [
            "Can I join or take part in ceremonies?",
            "Ask the association directly. Local roles, customs and participation conditions cannot be inferred from a sightseeing visit."
          ],
          [
            "Is the Oustau open every day?",
            "The sources give a contact address, not guaranteed daily opening hours. Make contact before visiting."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Ville de Saint-Tropez — Les Amis de la Bravade et des traditions tropéziennes",
        "url": "https://www.saint-tropez.fr/project/les-amis-de-la-bravade-et-des-traditions-tropeziennes/"
      },
      {
        "label": "Ville de Saint-Tropez — retour sur les Bravades",
        "url": "https://www.saint-tropez.fr/revivez-en-images-les-temps-forts-de-nos-trois-jours-de-bravades-tropeziennes/"
      }
    ],
    "nearby": [
      "eglise-notre-dame-assomption-saint-tropez",
      "chapelle-sainte-anne-saint-tropez",
      "place-des-lices"
    ]
  },
  "agda-chats-du-golfe": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "AGDA : aider les chats à Cogolin et dans le Golfe de Saint-Tropez",
        "description": "Découvrez l’AGDA, Association du Golfe contre la Détresse Animale : protection des chats, adoption, familles d’accueil et engagement bénévole autour de Cogolin.",
        "intro": "La vie locale se joue aussi dans les gestes que l’on remarque peu : une tournée de nourriture, un trajet pour des soins, une famille qui ouvre une pièce de sa maison. Depuis 2005, l’Association du Golfe contre la Détresse Animale accompagne les chats en difficulté à Cogolin, Saint-Tropez, La Môle et dans le Golfe. L’AGDA donne une forme concrète à cette entraide, du soin à la recherche d’un foyer adapté.",
        "facts": [
          [
            "Action",
            "Protection des chats en détresse"
          ],
          [
            "Territoire",
            "Cogolin, Saint-Tropez, La Môle et le Golfe"
          ],
          [
            "Aider",
            "Bénévolat, accueil temporaire, adhésion ou don selon les besoins"
          ],
          [
            "Rencontrer",
            "Prendre contact avec l’AGDA ; pas d’adresse de refuge à déduire de cette fiche"
          ]
        ],
        "sections": [
          [
            "Prendre soin et agir dans la durée",
            "L’AGDA présente un travail auprès de chats abandonnés, errants, blessés ou fragilisés. Les soins, la mise en sécurité et l’alimentation s’accompagnent d’un effort de stérilisation des chats libres. L’association cherche aussi des foyers pour ceux qui peuvent être adoptés. Cette continuité demande du temps et de l’organisation, bien au-delà du premier signalement."
          ],
          [
            "Une aide à la mesure de vos possibilités",
            "Accueillir temporairement, donner du temps, soutenir l’alimentation ou les soins : le site présente plusieurs façons de contribuer. Expliquez ce que vous pouvez réellement proposer et laissez l’équipe vous orienter. Une disponibilité régulière, même modeste, peut être plus simple à organiser qu’une promesse difficile à tenir. Les besoins précis sont à confirmer avec les bénévoles."
          ],
          [
            "Adopter ou devenir famille d’accueil",
            "Une adoption engage votre quotidien ; un accueil temporaire demande aussi un cadre adapté. Commencez par les informations officielles et un échange avec l’association. L’objectif est de rapprocher un animal et un foyer compatibles, pas de choisir à partir d’une seule photographie. Les profils disponibles et les modalités évoluent : seule l’équipe peut confirmer une rencontre et la suite du parcours."
          ],
          [
            "Une association à rencontrer dans la vie du Golfe",
            "L’AGDA participe aussi à des rendez-vous solidaires, annoncés dans son agenda et par les offices locaux. C’est une façon de découvrir le travail des bénévoles et de poser vos questions. Pour rencontrer un chat ou proposer votre aide, contactez d’abord l’association. Nous ne publions pas de point de visite supposé à partir d’une adresse administrative."
          ]
        ],
        "questions": [
          [
            "Qu’est-ce que l’AGDA ?",
            "L’Association du Golfe contre la Détresse Animale est une association locale de protection des chats, présentée par Cogolin et Saint-Tropez dans leurs annuaires."
          ],
          [
            "Comment aider sans adopter ?",
            "Le site propose bénévolat, familles d’accueil, adhésion et dons. Demandez à l’association quelles formes d’aide répondent à ses besoins actuels."
          ],
          [
            "Peut-on venir voir les chats sans rendez-vous ?",
            "Cette fiche n’annonce pas de visite libre. Prenez contact pour connaître les conditions de rencontre et l’organisation de l’association."
          ]
        ]
      },
      "en": {
        "title": "AGDA: helping cats in Cogolin and the Golfe de Saint-Tropez",
        "description": "Discover AGDA, a local cat-protection association around Cogolin: care, adoption, foster homes and ways to support volunteers in the Golfe de Saint-Tropez.",
        "intro": "Local life also happens through small, less visible acts: a feeding round, a journey for veterinary care, a household making room for a temporary guest. Since 2005, the Association du Golfe contre la Détresse Animale has helped cats in difficulty around Cogolin, Saint-Tropez, La Môle and the Golfe. AGDA turns that concern into practical support, from care to finding suitable homes.",
        "facts": [
          [
            "Mission",
            "Protecting cats in difficulty"
          ],
          [
            "Area",
            "Cogolin, Saint-Tropez, La Môle and the Golfe"
          ],
          [
            "Help",
            "Volunteering, fostering, membership or donations according to needs"
          ],
          [
            "Meetings",
            "Contact AGDA first; no presumed walk-in shelter address is given here"
          ]
        ],
        "sections": [
          [
            "Care beyond the first call",
            "AGDA describes work with abandoned, stray, injured and vulnerable cats. Feeding, care and safety are accompanied by efforts to neuter free-roaming cats. The association also looks for suitable homes for cats that can be adopted. This continuing work takes time and organisation beyond the first report of an animal in difficulty."
          ],
          [
            "Offer help you can sustain",
            "The website describes several ways to contribute, including temporary care, volunteering and support for food or veterinary treatment. Explain what you can realistically offer and let the team guide you. A modest, reliable commitment may be easier to organise than a promise that cannot be maintained. Confirm current needs with the volunteers."
          ],
          [
            "Adoption and fostering need preparation",
            "Adoption changes daily life, and temporary fostering also requires a suitable setting. Read the official information and speak with the association. The aim is to match an animal with an appropriate household rather than make a decision from a photograph alone. Availability and arrangements change; only the team can confirm a meeting and the next steps."
          ],
          [
            "Meet the association through local life",
            "AGDA also takes part in fundraising gatherings announced through its own calendar and local tourism offices. These can offer a chance to learn about the volunteers’ work. For an animal meeting or an offer of help, contact the association first. We do not turn an administrative address into an assumed public shelter location."
          ]
        ],
        "questions": [
          [
            "What is AGDA?",
            "The Association du Golfe contre la Détresse Animale is a local cat-protection association listed by Cogolin and Saint-Tropez."
          ],
          [
            "Can I help without adopting?",
            "The website describes volunteering, fostering, membership and donations. Ask the team what would help most at present."
          ],
          [
            "Can I meet the cats without an appointment?",
            "No walk-in visiting arrangement is advertised here. Contact the association to learn how meetings are organised."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "AGDA — présentation et actions",
        "url": "https://agda-chatsdugolfe.fr/"
      },
      {
        "label": "Ville de Cogolin — fiche associative IntraMuros",
        "url": "https://www.intramuros.org/cogolin/associations/268509"
      },
      {
        "label": "Saint-Tropez Tourisme — associations de vie locale",
        "url": "https://www.sainttropeztourisme.com/fr/fiche/associations-vie-locale-7685754/"
      }
    ],
    "nearby": [
      "cogolin-village",
      "musee-annonciade-saint-tropez"
    ]
  },
  "association-festival-ramatuelle": {
    "verified": "2026-10-26",
    "copy": {
      "fr": {
        "title": "Association pour le Festival de Ramatuelle : théâtre et vie culturelle",
        "description": "Découvrez l’Association pour le Festival de Ramatuelle : son histoire depuis 1985, le théâtre de Verdure, son projet culturel et les contacts officiels.",
        "intro": "Un spectacle commence bien avant l’entrée des artistes. À Ramatuelle, une association porte depuis 1985 le travail qui fait du théâtre de Verdure un rendez-vous culturel du village. L’Association pour le Festival de Ramatuelle relie une histoire artistique, une organisation et un public fidèle. La découvrir permet de regarder les soirées autrement : derrière une affiche, il y a des choix, des rencontres et tout un travail pour faire vivre la scène.",
        "facts": [
          [
            "Projet",
            "Théâtre, humour et spectacles selon les éditions"
          ],
          [
            "Association",
            "Créée en 1985, selon son histoire officielle"
          ],
          [
            "Scène",
            "Théâtre de Verdure de Ramatuelle"
          ],
          [
            "Contact",
            "Coordonnées de l’association et modalités sur le site officiel"
          ]
        ],
        "sections": [
          [
            "Une association derrière les projecteurs",
            "Le site du festival présente une association créée en 1985 et son histoire autour de Jacqueline Franjou et Jean-Claude Brialy. Cette dimension compte : le rendez-vous ne se limite pas aux artistes invités. Il repose aussi sur une continuité d’organisation et sur un lien avec le village. Comprendre ce travail donne une autre profondeur à une sortie au théâtre de Verdure."
          ],
          [
            "Du théâtre au spectacle vivant",
            "La programmation est celle d’un festival, avec des propositions de théâtre, d’humour et de spectacles selon les éditions. Choisissez à partir du programme publié, de la distribution et de la durée annoncée pour votre soirée. Une affiche ancienne peut raconter l’histoire du lieu ; elle ne permet pas de réserver une date à venir."
          ],
          [
            "S’informer ou soutenir le projet",
            "Pour une question sur l’association, une proposition de partenariat ou un soutien, utilisez les contacts et les informations de mécénat du site officiel. Précisez votre demande afin qu’elle soit orientée vers la bonne personne. Cette fiche ne promet ni recrutement bénévole permanent ni accès privilégié aux représentations : les possibilités sont à vérifier directement avec l’équipe."
          ],
          [
            "Préparer sa venue au théâtre de Verdure",
            "L’adresse administrative, les coordonnées de billetterie et le lieu de représentation ne jouent pas le même rôle. Avant une soirée, vérifiez la date, l’horaire, le billet et les informations d’accès publiées pour l’édition concernée. Vous pouvez compléter la sortie par une promenade dans Ramatuelle, en gardant une marge pour rejoindre le théâtre et vous installer."
          ]
        ],
        "questions": [
          [
            "Qui organise le Festival de Ramatuelle ?",
            "Le site officiel présente l’Association pour le Festival de Ramatuelle, créée en 1985, comme la structure associative qui porte le rendez-vous."
          ],
          [
            "Les dates et les artistes sont-ils les mêmes chaque année ?",
            "Non. Consultez le programme et la billetterie de l’édition qui vous intéresse. Les archives ne doivent pas être prises pour des annonces actuelles."
          ],
          [
            "Comment contacter ou soutenir l’association ?",
            "Utilisez la page Contact ou les informations de mécénat sur le site officiel. L’équipe pourra préciser les modalités adaptées à votre demande."
          ]
        ]
      },
      "en": {
        "title": "Ramatuelle Festival Association: theatre and local cultural life",
        "description": "Discover the association behind the Ramatuelle Festival: its history since 1985, Théâtre de Verdure, cultural project and official contact information.",
        "intro": "A performance begins long before the artists step on stage. In Ramatuelle, an association has carried the work behind a major village cultural gathering since 1985. The Ramatuelle Festival Association connects artistic history, organisation and an audience. Discovering that structure changes how you see an evening out: behind the poster are choices, encounters and the continuing work that keeps a stage alive.",
        "facts": [
          [
            "Project",
            "Theatre, comedy and live performance according to the edition"
          ],
          [
            "Association",
            "Founded in 1985, according to its official history"
          ],
          [
            "Venue",
            "Théâtre de Verdure, Ramatuelle"
          ],
          [
            "Contact",
            "Official website for association details and arrangements"
          ]
        ],
        "sections": [
          [
            "The association behind the spotlight",
            "The festival website describes an association founded in 1985 and a history involving Jacqueline Franjou and Jean-Claude Brialy. The gathering is more than its guest performers: it also depends on continuity of organisation and a relationship with the village. Learning about that work adds depth to an evening at the Théâtre de Verdure."
          ],
          [
            "Discover the published artistic programme",
            "The festival presents theatre, comedy and live performances according to the edition. Choose from the published programme, cast and running time for your evening. An old poster may tell an interesting story, but it cannot confirm an upcoming performance."
          ],
          [
            "Enquire or support the project",
            "For questions about the association, partnerships or support, use the official contact and patronage information. Explain your proposal so it can reach the right person. This profile does not promise permanent volunteer recruitment or privileged access to performances; confirm any opportunities directly with the team."
          ],
          [
            "Plan your visit around the actual performance",
            "The administrative address, box-office contacts and performance venue serve different purposes. Check the date, time, ticket and access information for the relevant edition before travelling. A village walk can complement the evening when you leave enough time to reach the theatre and take your seat."
          ]
        ],
        "questions": [
          [
            "Who organises the Ramatuelle Festival?",
            "The official website identifies the Ramatuelle Festival Association, founded in 1985, as the association behind it."
          ],
          [
            "Are the dates and performers the same every year?",
            "No. Check the programme and ticketing for your chosen edition rather than treating archives as current announcements."
          ],
          [
            "How can I contact or support the association?",
            "Use the official Contact page or patronage information. The team can explain arrangements relevant to your enquiry."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Festival de Ramatuelle — histoire et association",
        "url": "https://www.festivalderamatuelle.com/histoire"
      },
      {
        "label": "Festival de Ramatuelle — contact et billetterie",
        "url": "https://www.festivalderamatuelle.com/contact"
      },
      {
        "label": "Festival de Ramatuelle — conditions de réservation",
        "url": "https://www.festivalderamatuelle.com/cgv"
      }
    ],
    "nearby": [
      "ramatuelle-village",
      "eglise-notre-dame-ramatuelle",
      "moulin-de-paillas"
    ]
  }
};

export const associationSignatures:Record<string,Record<Locale,{subtitle:string;quote:string;rhythm:string;dark:string;close:string}>> = {
  "snsm-cavalaire": {
    "fr": {
      "subtitle": "LEUR ENGAGEMENT TIENT LE CAP.",
      "quote": "DERRIÈRE CHAQUE SORTIE, UNE CHAÎNE DE SOLIDARITÉ.",
      "rhythm": "COMPRENDRE. RENCONTRER. SOUTENIR.",
      "dark": "LA MER SE PARTAGE. LA VIGILANCE AUSSI.",
      "close": "DONNER DU TEMPS À CEUX QUI EN DONNENT."
    },
    "en": {
      "subtitle": "COMMITMENT THAT HOLDS ITS COURSE.",
      "quote": "BEHIND EVERY LAUNCH, A CHAIN OF SOLIDARITY.",
      "rhythm": "UNDERSTAND. MEET. SUPPORT.",
      "dark": "A SHARED SEA TAKES SHARED CARE.",
      "close": "GIVE SOMETHING BACK TO THOSE WHO HELP."
    }
  },
  "societe-nautique-saint-tropez": {
    "fr": {
      "subtitle": "LE PORT N’EST QUE LE DÉPART.",
      "quote": "À SAINT-TROPEZ, LA MER A AUSSI UNE VIE DE CLUB.",
      "rhythm": "SUIVRE LE VENT. RETROUVER LES ÉQUIPAGES.",
      "dark": "UNE RÉGATE SE PRÉPARE AVANT LE DÉPART.",
      "close": "ENTRER DANS L’HISTOIRE MARITIME VIVANTE."
    },
    "en": {
      "subtitle": "THE HARBOUR IS ONLY THE START.",
      "quote": "IN SAINT-TROPEZ, THE SEA HAS A CLUB LIFE TOO.",
      "rhythm": "FOLLOW THE WIND. MEET THE CREWS.",
      "dark": "A REGATTA BEGINS BEFORE THE START.",
      "close": "DISCOVER A LIVING MARITIME CULTURE."
    }
  },
  "amis-bravade-saint-tropez": {
    "fr": {
      "subtitle": "LE VILLAGE GARDE LA MÉMOIRE VIVANTE.",
      "quote": "UN VILLAGE SE RECONNAÎT À CE QU’IL TRANSMET.",
      "rhythm": "ÉCOUTER L’HISTOIRE. COMPRENDRE LES GESTES.",
      "dark": "UNE TRADITION SE RENCONTRE AVEC RESPECT.",
      "close": "VOIR SAINT-TROPEZ À TRAVERS SES HABITANTS."
    },
    "en": {
      "subtitle": "THE VILLAGE KEEPS ITS MEMORY ALIVE.",
      "quote": "A VILLAGE IS KNOWN BY WHAT IT PASSES ON.",
      "rhythm": "LISTEN TO THE HISTORY. UNDERSTAND THE GESTURES.",
      "dark": "MEET A TRADITION WITH RESPECT.",
      "close": "SEE SAINT-TROPEZ THROUGH ITS PEOPLE."
    }
  },
  "agda-chats-du-golfe": {
    "fr": {
      "subtitle": "DE PETITES PATTES. UNE GRANDE ENTRAIDE.",
      "quote": "LA SOLIDARITÉ LOCALE A AUSSI DES MOUSTACHES.",
      "rhythm": "RENCONTRER. ACCUEILLIR. ACCOMPAGNER.",
      "dark": "UNE ADOPTION COMMENCE PAR UN VRAI ÉCHANGE.",
      "close": "UN PEU DE TEMPS PEUT CHANGER UNE VIE."
    },
    "en": {
      "subtitle": "SMALL PAWS. A STRONG COMMUNITY.",
      "quote": "LOCAL SOLIDARITY HAS WHISKERS TOO.",
      "rhythm": "MEET. FOSTER. CARE.",
      "dark": "ADOPTION STARTS WITH A REAL CONVERSATION.",
      "close": "A LITTLE TIME CAN CHANGE A LIFE."
    }
  },
  "association-festival-ramatuelle": {
    "fr": {
      "subtitle": "LE VILLAGE FAIT PLACE À LA SCÈNE.",
      "quote": "DERRIÈRE L’AFFICHE, UNE AVENTURE COLLECTIVE.",
      "rhythm": "THÉÂTRE. RENCONTRES. VILLAGE.",
      "dark": "UNE SOIRÉE SE CHOISIT DANS LE PROGRAMME ACTUEL.",
      "close": "DÉCOUVRIR CEUX QUI FONT VIVRE LA CULTURE."
    },
    "en": {
      "subtitle": "THE VILLAGE MAKES ROOM FOR THE STAGE.",
      "quote": "BEHIND THE POSTER, A SHARED ENDEAVOUR.",
      "rhythm": "THEATRE. ENCOUNTERS. VILLAGE.",
      "dark": "CHOOSE YOUR EVENING FROM THE CURRENT PROGRAMME.",
      "close": "MEET THE PEOPLE BEHIND LOCAL CULTURE."
    }
  }
};
