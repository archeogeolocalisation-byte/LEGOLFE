import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {Locale} from '../lib/i18n';

export const coastalDiscoveryPlaces:Place[] = [
  {
    "id": "pointe-des-sardinaux",
    "name": "Pointe des Sardinaux",
    "location": "Sainte-Maxime",
    "category": "do",
    "tags": [
      "nature",
      "walk",
      "family",
      "heritage",
      "view"
    ],
    "description": "Explore Sainte-Maxime’s Pointe des Sardinaux: pines, coastal heritage, family picnic stops and practical advice around the seasonally protected islet.",
    "bestFor": [
      "Coastal nature walks",
      "Family picnics"
    ],
    "notIdealFor": [
      "Access to protected nesting areas"
    ],
    "goodToKnow": [
      "Read the access details and check current opening or bathing conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/la-pointe-des-sardinaux/",
    "website": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/la-pointe-des-sardinaux/",
    "lastVerifiedAt": "2026-10-27"
  },
  {
    "id": "port-cogolin",
    "name": "Port Cogolin",
    "location": "Cogolin",
    "category": "sea",
    "tags": [
      "walk",
      "quiet",
      "marina"
    ],
    "description": "Discover Port Cogolin’s marina basin and quayside atmosphere, with practical pointers that distinguish it from Les Marines de Cogolin and Port Grimaud.",
    "bestFor": [
      "Harbour walks"
    ],
    "notIdealFor": [
      "Unannounced boarding"
    ],
    "goodToKnow": [
      "Read the access details and check current opening or bathing conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cogolin/port-de-plaisance-de-port-cogolin-2803280",
    "website": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cogolin/port-de-plaisance-de-port-cogolin-2803280",
    "lastVerifiedAt": "2026-10-27"
  },
  {
    "id": "plage-luc-provensal-sainte-maxime",
    "name": "Plage Luc Provensal · centre-ville",
    "location": "Sainte-Maxime",
    "category": "beach",
    "tags": [
      "family",
      "walk",
      "view",
      "urban"
    ],
    "description": "Explore Luc Provensal beach in central Sainte-Maxime: sand by the Simon-Lorière promenade, family breaks and practical pointers for a seaside day.",
    "bestFor": [
      "Family beach outings",
      "A town-centre beach"
    ],
    "notIdealFor": [
      "Secluded wilderness"
    ],
    "goodToKnow": [
      "Read the access details and check current opening or bathing conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.sainte-maxime.com/profiter/plage-luc-provensal-du-centre-ville-sainte-maxime-fr-6295762/",
    "website": "https://www.sainte-maxime.com/profiter/plage-luc-provensal-du-centre-ville-sainte-maxime-fr-6295762/",
    "lastVerifiedAt": "2026-10-27"
  },
  {
    "id": "plage-du-rayol",
    "name": "Plage du Rayol",
    "location": "Rayol-Canadel-sur-Mer",
    "category": "beach",
    "tags": [
      "family",
      "view",
      "walk"
    ],
    "description": "Discover Rayol beach in Rayol-Canadel-sur-Mer: eastern and western sections, the descent from the village, coastal views and swimming information.",
    "bestFor": [
      "A beach reached on foot",
      "Coastal views"
    ],
    "notIdealFor": [
      "An unplanned step-free route"
    ],
    "goodToKnow": [
      "Read the access details and check current opening or bathing conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/rayol-canadel-sur-mer/plage-du-rayol-928717",
    "website": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/rayol-canadel-sur-mer/plage-du-rayol-928717",
    "lastVerifiedAt": "2026-10-27"
  },
  {
    "id": "maison-des-arcades-grimaud",
    "name": "Maison des Arcades",
    "location": "Grimaud",
    "category": "do",
    "tags": [
      "heritage",
      "culture",
      "art",
      "walk"
    ],
    "description": "Explore Grimaud’s Maison des Arcades: old-village architecture, changing art exhibitions, Balladou access and practical advice for a cultural visit.",
    "bestFor": [
      "Architecture and exhibitions"
    ],
    "notIdealFor": [
      "Visits outside confirmed opening times"
    ],
    "goodToKnow": [
      "Read the access details and check current opening or bathing conditions."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/la-maison-des-arcades/",
    "website": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/la-maison-des-arcades/",
    "lastVerifiedAt": "2026-10-27"
  }
];

export const coastalDiscoveryFacts:Record<string,PlaceFacts> = {
  "pointe-des-sardinaux": {
    "verified": "2026-10-27",
    "copy": {
      "fr": {
        "title": "Pointe des Sardinaux à Sainte-Maxime : nature, promenade et accès",
        "description": "Découvrez la Pointe des Sardinaux à Sainte-Maxime : promenade sous les pins, patrimoine côtier, pique-nique et précautions autour de l’îlot protégé.",
        "intro": "À Sainte-Maxime, quelques pas suffisent parfois à changer de décor. La Pointe des Sardinaux réunit pins, rochers et petites ouvertures sur la mer. On vient y chercher un rythme de promenade, une pause à partager et le plaisir de regarder le littoral de près. Un lieu à parcourir avec curiosité, en laissant toute sa place à la nature.",
        "sections": [
          [
            "Une parenthèse littorale à parcourir à pied",
            "L’office situe la pointe sur la corniche, avant la Nartelle en venant du centre de Sainte-Maxime. L’accès final se fait à pied et le stationnement est limité. Préparez votre arrivée plutôt que de compter sur une place au dernier moment ; une fois sur le site, gardez un programme simple, adapté au terrain et à votre groupe."
          ],
          [
            "Des traces d’histoire parmi les rochers",
            "Un vivier romain et un ouvrage de la Seconde Guerre mondiale font partie des curiosités signalées par l’office. Notre suggestion : alterner observation du paysage et recherche de ces témoins du passé. La promenade ne nécessite pas de grimper sur les structures ou de déplacer les petites espèces rencontrées sur le rivage."
          ],
          [
            "La pointe et l’îlot ne sont pas le même espace",
            "La ville distingue la pointe accessible du petit îlot où nichent des sternes. Elle publie une interdiction d’accès à l’îlot du 15 mars au 15 septembre et des restrictions nautiques et de baignade dans un périmètre de 100 m du 1er mai au 31 août. Consultez les informations municipales et la signalisation actualisées avant une sortie près de cette zone."
          ],
          [
            "Prévoir une pause qui respecte le site",
            "L’ombre des pins et les espaces de pique-nique permettent d’imaginer une halte en famille. Emportez vos déchets et adaptez la baignade aux conditions du jour. Les règles concernant les chiens diffèrent selon la partie terrestre, les plages et la saison : vérifiez le détail auprès de l’office plutôt que de supposer une autorisation sur tout le site."
          ]
        ],
        "facts": [
          [
            "Commune",
            "Sainte-Maxime · corniche avant la Nartelle"
          ],
          [
            "Accès",
            "Dernière partie à pied · stationnement limité"
          ],
          [
            "À voir",
            "Pinède, rivage, vivier romain et ouvrage de la Seconde Guerre mondiale"
          ],
          [
            "À distinguer",
            "Pointe accessible et îlot soumis à protection saisonnière"
          ]
        ],
        "questions": [
          [
            "Peut-on rejoindre librement l’îlot ?",
            "L’accès est interdit pendant la fermeture saisonnière liée à la nidification. Vérifiez les dates et le balisage municipaux avant de vous en approcher."
          ],
          [
            "Est-ce une randonnée sportive ?",
            "La découverte peut rester une courte promenade, mais le bord de mer comporte des rochers. Adaptez le parcours et les chaussures à votre groupe."
          ]
        ]
      },
      "en": {
        "title": "Pointe des Sardinaux in Sainte-Maxime: nature, walking and access",
        "description": "Explore Sainte-Maxime’s Pointe des Sardinaux: pines, coastal heritage, family picnic stops and practical advice around the seasonally protected islet.",
        "intro": "A few steps can change the scene in Sainte-Maxime. Pointe des Sardinaux brings together pines, rocks and openings onto the sea. Come for an unhurried walk, a shared break and a closer look at the coast, leaving room for the nature that makes this place worth visiting.",
        "sections": [
          [
            "Arrive for a walk",
            "The tourist office places the point on the coastal road before La Nartelle when coming from the centre. Final access is on foot and parking is limited. Plan the arrival, then choose a simple outing suited to the terrain and your group."
          ],
          [
            "History beside the shore",
            "The office identifies a Roman fishpond and a Second World War structure. Alternate looking at the scenery with finding these traces of the past. Avoid climbing structures or disturbing small shoreline creatures."
          ],
          [
            "The point and the islet are different",
            "The municipality distinguishes the accessible point from an islet used by nesting terns. It publishes islet closure from 15 March to 15 September and swimming and watersports restrictions within 100 metres from 1 May to 31 August. Check updated municipal information and local signs before approaching that area."
          ],
          [
            "A considerate picnic stop",
            "Pine shade and picnic spaces offer a reason to pause with the family. Take litter away and judge swimming conditions on the day. Dog rules vary between land, beaches and seasons: consult the office rather than assuming permission everywhere."
          ]
        ],
        "facts": [
          [
            "Town",
            "Sainte-Maxime · coastal road before La Nartelle"
          ],
          [
            "Access",
            "Final approach on foot · limited parking"
          ],
          [
            "Interest",
            "Pines, shoreline, Roman fishpond and wartime structure"
          ],
          [
            "Important distinction",
            "Accessible point and seasonally protected islet"
          ]
        ],
        "questions": [
          [
            "Can I visit the islet freely?",
            "The municipality publishes a seasonal nesting closure. Check its current restrictions before approaching."
          ],
          [
            "Is this a strenuous hike?",
            "It can be a short walk, but rocky shoreline sections require suitable footwear and an appropriate route."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime Tourisme — la pointe",
        "url": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/la-pointe-des-sardinaux/"
      },
      {
        "label": "Ville — protection de la faune",
        "url": "https://www.sainte-maxime.fr/ma-ville/cadre-de-vie/developpement-durable/bien-etre-animal/cohabitons-avec-la-faune-sauvage/"
      },
      {
        "label": "Var Tourisme — accès",
        "url": "https://www.visitvar.fr/fiche/la-pointe-des-sardinaux-5160226"
      }
    ],
    "nearby": [
      "plage-de-la-nartelle",
      "plage-luc-provensal-sainte-maxime",
      "sainte-maxime-village"
    ]
  },
  "port-cogolin": {
    "verified": "2026-10-27",
    "copy": {
      "fr": {
        "title": "Port Cogolin : promenade au port et repères pour votre escale",
        "description": "Port Cogolin : découvrez ce bassin de plaisance, son ambiance de quai et les repères pour une promenade, sans le confondre avec les Marines ou Port Grimaud.",
        "intro": "Cogolin a aussi une vie au bord de l’eau. Autour du bassin de Port Cogolin, les façades et les bateaux composent un décor à taille de promenade. L’étape se prête à un moment sans grand programme : regarder les amarres, suivre les quais accessibles et choisir une pause selon les adresses ouvertes.",
        "sections": [
          [
            "Trois noms à ne pas mélanger",
            "Port Cogolin est distinct des Marines de Cogolin et de Port Grimaud. L’office présente les deux ports de la commune comme complémentaires, avec un bassin plus discret pour Port Cogolin. Vérifiez le nom exact lorsque vous préparez un rendez-vous : les services d’un autre port ne sont pas automatiquement ceux de ce bassin."
          ],
          [
            "Une escale à hauteur de quai",
            "Le tourisme local décrit un bassin de plaisance d’environ 180 places, entouré de quelques commerces et restaurants. Notre suggestion : venir pour observer la vie du port plutôt que pour en faire une longue visite monumentale. Respectez les pontons privés et les zones de travail ; la présence de bateaux ne donne pas accès aux embarcations."
          ],
          [
            "Une pause selon les adresses ouvertes",
            "Un café ou un repas peut prolonger la promenade. Les établissements du secteur ont leur propre calendrier : vérifiez ouverture, carte et réservation auprès de l’adresse choisie. Le calme recherché dépend du moment, des activités nautiques et de l’affluence ; ce n’est pas une promesse d’absence de bruit."
          ],
          [
            "Pour les plaisanciers, confirmer avec la capitainerie",
            "Une demande de place, un service portuaire ou un départ en bateau se prépare auprès de la capitainerie ou du prestataire concerné. Les horaires d’accueil varient selon la saison. Pour une simple découverte à pied, utilisez Port Cogolin comme destination et préparez les possibilités de stationnement sans les confondre avec une place de port."
          ]
        ],
        "facts": [
          [
            "Commune",
            "Cogolin · secteur littoral"
          ],
          [
            "Repère",
            "Bassin de plaisance de Port Cogolin"
          ],
          [
            "À distinguer",
            "Marines de Cogolin et Port Grimaud"
          ],
          [
            "Services nautiques",
            "Conditions et accueil à confirmer avec la capitainerie"
          ]
        ],
        "questions": [
          [
            "Port Cogolin et les Marines, est-ce le même port ?",
            "Non. L’office de tourisme distingue deux ports de plaisance à Cogolin. Vérifiez celui de votre rendez-vous."
          ],
          [
            "Peut-on réserver un bateau avec cette fiche ?",
            "Cette fiche présente le lieu. Contactez directement un prestataire identifié pour une sortie ou la capitainerie pour une escale."
          ]
        ]
      },
      "en": {
        "title": "Port Cogolin: a harbour walk and practical marina pointers",
        "description": "Discover Port Cogolin’s marina basin and quayside atmosphere, with practical pointers that distinguish it from Les Marines de Cogolin and Port Grimaud.",
        "intro": "Cogolin has a waterside life too. Around Port Cogolin’s basin, facades and boats create a setting best discovered at walking pace. Keep the plan light: look at the moorings, follow accessible quays and choose a break around the places open that day.",
        "sections": [
          [
            "Keep the port names separate",
            "Port Cogolin, Les Marines de Cogolin and Port Grimaud are different places. The tourist office describes the two Cogolin marinas as complementary, with a more discreet basin at Port Cogolin. Check the exact name when arranging a meeting."
          ],
          [
            "Discover the quayside",
            "Local tourism describes roughly 180 berths with a few shops and restaurants. Visit to observe port life rather than expect a long monumental tour. Respect private pontoons, working areas and the boats themselves."
          ],
          [
            "Choose a local break",
            "A coffee or meal can extend the walk. Individual businesses have their own opening and booking arrangements, so check the place you choose. Atmosphere changes with the hour, boating activity and visitor numbers."
          ],
          [
            "Ask the harbour office about boating",
            "Arrange berths and port services with the harbour office, and any boat trip with its operator. Reception hours vary seasonally. For a walk, plan parking for a visit to Port Cogolin rather than confusing it with berth availability."
          ]
        ],
        "facts": [
          [
            "Town",
            "Cogolin · coastal area"
          ],
          [
            "Reference",
            "Port Cogolin marina basin"
          ],
          [
            "Different places",
            "Les Marines de Cogolin and Port Grimaud"
          ],
          [
            "Boating services",
            "Confirm arrangements with the harbour office"
          ]
        ],
        "questions": [
          [
            "Is this the same as Les Marines?",
            "No. The tourist office distinguishes two Cogolin marinas. Check which one your meeting concerns."
          ],
          [
            "Can I book a boat here?",
            "This profile introduces the place. Contact a named operator for trips or the harbour office for a berth."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Tourisme du Golfe — Port Cogolin",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cogolin/port-de-plaisance-de-port-cogolin-2803280"
      },
      {
        "label": "Office — deux ports de Cogolin",
        "url": "https://www.golfe-sainttropez-tourisme.fr/decouvrir/cote-mer/les-ports/"
      }
    ],
    "nearby": [
      "base-nautique-cogolin",
      "cogolin-village",
      "port-grimaud"
    ]
  },
  "plage-luc-provensal-sainte-maxime": {
    "verified": "2026-10-27",
    "copy": {
      "fr": {
        "title": "Plage Luc Provensal à Sainte-Maxime : la mer en centre-ville",
        "description": "La plage Luc Provensal au centre de Sainte-Maxime : sable près de la promenade Simon-Lorière, pause en famille et conseils pour organiser votre baignade.",
        "intro": "Passer des rues à la plage sans changer toute sa journée : c’est l’intérêt de Luc Provensal. Au centre de Sainte-Maxime, le sable prolonge la promenade et garde le village à portée de sortie. Une option pour ceux qui aiment alterner baignade, marché et pause en terrasse plutôt que consacrer toute l’escapade à un seul endroit.",
        "sections": [
          [
            "Une plage de centre-ville, côté promenade",
            "Le repère publié est la promenade A. Simon-Lorière. L’office met en avant un accès à pied depuis le centre et une ouverture sur le Golfe vers Saint-Tropez. Si vous logez ou arrivez en ville, préparez votre parcours jusqu’au sable ; les modalités de stationnement restent celles du centre et de la saison."
          ],
          [
            "Composer une sortie simple en famille",
            "Notre suggestion : choisir une courte séquence de plage puis garder une promenade ou une pause pour la suite. La proximité des services aide à organiser la journée, mais ne remplace pas l’attention portée aux enfants et aux conditions de mer. Pour un besoin d’accès adapté, demandez quels aménagements sont effectivement disponibles le jour choisi."
          ],
          [
            "Surveillance et baignade : regarder la date",
            "La fiche de l’office publie des périodes de surveillance saisonnières. Ne les interprétez pas comme une présence permanente : vérifiez le poste ouvert, les drapeaux et les éventuels avis de baignade. Une plage en ville reste soumise à la météo et aux conditions locales, même lorsque les commerces sont ouverts."
          ],
          [
            "Plage publique et prestations restent distinctes",
            "L’accès à la plage est annoncé libre. Repas, location de matériel ou services d’un établissement relèvent d’une offre séparée. Pour venir avec un chien, l’office identifie une zone spécifique près du pont du Préconil : cette disposition ne s’étend pas à toute la plage. Consultez les règles actuelles avant votre sortie."
          ]
        ],
        "facts": [
          [
            "Situation",
            "Promenade A. Simon-Lorière, Sainte-Maxime"
          ],
          [
            "Accès plage",
            "Libre · prestations commerciales séparées"
          ],
          [
            "Surveillance",
            "Saisonnière, à vérifier pour la date de visite"
          ],
          [
            "Usage conseillé",
            "Associer plage et découverte du centre"
          ]
        ],
        "questions": [
          [
            "Est-ce la plage parfois appelée plage du Casino ?",
            "La photographie historique de cette fiche porte ce nom. Nous utilisons l’intitulé actuel de l’office : plage Luc Provensal du centre-ville."
          ],
          [
            "L’accès libre inclut-il un transat ?",
            "Non. L’accès à la plage et les prestations payantes des établissements sont distincts."
          ]
        ]
      },
      "en": {
        "title": "Luc Provensal beach: Sainte-Maxime’s town-centre seaside stop",
        "description": "Explore Luc Provensal beach in central Sainte-Maxime: sand by the Simon-Lorière promenade, family breaks and practical pointers for a seaside day.",
        "intro": "Switching from town streets to sand need not take over the whole day. Luc Provensal beach extends Sainte-Maxime’s promenade while keeping the centre close to hand. It suits an outing that combines time by the water, a market visit and a terrace break rather than committing to one activity.",
        "sections": [
          [
            "A beach beside the promenade",
            "The published address is Promenade A. Simon-Lorière. The office highlights walking access from the centre and views towards Saint-Tropez. Plan the final walk to the sand; parking remains subject to town-centre and seasonal arrangements."
          ],
          [
            "Make a manageable family outing",
            "Our suggestion is a short beach stop followed by a walk or a break. Nearby services help with planning but do not replace attention to children and sea conditions. Ask what adapted-access equipment is actually available if you need it."
          ],
          [
            "Check supervision for your date",
            "The office publishes seasonal lifeguard periods. Do not assume permanent supervision: check the operating post, flags and bathing notices. A town-centre beach is still affected by weather and local sea conditions."
          ],
          [
            "Separate public access from services",
            "Beach access is advertised as free. Food, equipment hire and an establishment’s services are separate. The office identifies a specific dog area near the Préconil bridge rather than permission across the entire beach; consult current rules."
          ]
        ],
        "facts": [
          [
            "Location",
            "Promenade A. Simon-Lorière, Sainte-Maxime"
          ],
          [
            "Beach access",
            "Free · commercial services separate"
          ],
          [
            "Lifeguards",
            "Seasonal; confirm for your visit"
          ],
          [
            "Suggested use",
            "Combine the beach with the town centre"
          ]
        ],
        "questions": [
          [
            "Is this sometimes called Casino beach?",
            "The historical photograph uses that name. This profile follows the office’s current name: Luc Provensal town-centre beach."
          ],
          [
            "Does free entry include a sunbed?",
            "No. Beach access and paid services are separate."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime Tourisme — plage Luc Provensal",
        "url": "https://www.sainte-maxime.com/profiter/plage-luc-provensal-du-centre-ville-sainte-maxime-fr-6295762/"
      },
      {
        "label": "Office — découverte du centre-ville côté plage",
        "url": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/plage-luc-provensal/"
      }
    ],
    "nearby": [
      "tour-carree-sainte-maxime",
      "marche-couvert-sainte-maxime",
      "pointe-des-sardinaux"
    ]
  },
  "plage-du-rayol": {
    "verified": "2026-10-27",
    "copy": {
      "fr": {
        "title": "Plage du Rayol : baie, escaliers et accès au bord de l’eau",
        "description": "Découvrez la plage du Rayol au Rayol-Canadel-sur-Mer : secteurs est et ouest, descente depuis le village, panorama et informations pratiques pour la baignade.",
        "intro": "Au Rayol, la mer se découvre en descendant. Depuis les hauteurs du village, le regard précède la promenade avant de retrouver le sable et les rochers. La plage donne envie de prendre son temps : choisir son coin, observer les contours de la baie et garder de l’énergie pour le chemin du retour.",
        "sections": [
          [
            "Deux secteurs autour d’une pointe rocheuse",
            "La fiche touristique décrit une baie composée de deux plages, séparées par une pointe rocheuse. Repérez le secteur où vous souhaitez vous installer plutôt que de retenir seulement le nom de la commune. Le Rayol et le Canadel sont deux étapes différentes : notre fiche du Canadel permet de comparer avant de partir."
          ],
          [
            "La descente fait partie de la visite",
            "Depuis la Voie Verte, l’office propose une arrivée par le square Jean Aicard et les Degrés de la Mer. Cet accès emprunte des escaliers : pensez aussi à la remontée, au matériel transporté et aux personnes qui vous accompagnent. Pour une poussette ou une difficulté de marche, renseignez-vous sur un accès correspondant à votre besoin."
          ],
          [
            "Choisir une baignade adaptée au jour",
            "Les panneaux de baignade donnent des informations utiles à l’arrivée. Consultez-les et vérifiez la surveillance effective et les éventuels avis avant d’entrer dans l’eau. Avec des enfants, gardez une organisation simple et ne présumez pas qu’un secteur rocheux possède les mêmes conditions que le sable voisin."
          ],
          [
            "Préparer le trajet sans promettre une place",
            "Les possibilités de stationnement évoquées par l’office ne garantissent pas une disponibilité à votre arrivée. Organisez l’accès, puis choisissez une pause ou un repas selon les établissements ouverts. Une halte autour du Patec peut compléter la découverte, en tenant compte de la différence de niveau entre le village et la plage."
          ]
        ],
        "facts": [
          [
            "Commune",
            "Rayol-Canadel-sur-Mer · secteur du Rayol"
          ],
          [
            "Configuration",
            "Deux plages séparées par une pointe rocheuse"
          ],
          [
            "Accès décrit",
            "Square Jean Aicard et Degrés de la Mer, avec escaliers"
          ],
          [
            "À anticiper",
            "Remontée, matériel et conditions de baignade"
          ]
        ],
        "questions": [
          [
            "La plage du Rayol et celle du Canadel sont-elles identiques ?",
            "Non. Elles se situent dans la même commune mais correspondent à deux secteurs différents."
          ],
          [
            "Peut-on descendre depuis la Voie Verte ?",
            "L’office décrit un accès par le square Jean Aicard et les Degrés de la Mer. Il comporte des escaliers et une remontée à anticiper."
          ]
        ]
      },
      "en": {
        "title": "Rayol beach: the bay, steps and practical seaside access",
        "description": "Discover Rayol beach in Rayol-Canadel-sur-Mer: eastern and western sections, the descent from the village, coastal views and swimming information.",
        "intro": "At Le Rayol, the sea is discovered on the way down. From the village heights, the view comes before the sand and rocks. Choose a spot, look at the shape of the bay and keep some energy for the return: the approach is part of this seaside outing.",
        "sections": [
          [
            "Two sections around a rocky point",
            "Tourism information describes two beaches divided by a rocky point. Identify the section you intend to visit. Le Rayol and Le Canadel are separate stops within the same municipality; compare the Canadel profile before choosing."
          ],
          [
            "Plan the descent and the climb back",
            "The office describes walking from the Voie Verte through Square Jean Aicard and down the Degrés de la Mer. This involves steps. Consider carried equipment and everyone in your group, and ask about suitable access if you have a pushchair or mobility needs."
          ],
          [
            "Read the conditions on arrival",
            "Bathing-information panels provide useful guidance. Check them, actual supervision and current notices before entering the water. With children, keep the plan simple and do not assume rocky and sandy sections offer identical conditions."
          ],
          [
            "Allow for the approach",
            "Parking possibilities mentioned by the office do not guarantee an available space. Arrange the approach and choose breaks around businesses that are open. A stop around Le Patec can extend the outing, allowing for the height difference between the village and the shore."
          ]
        ],
        "facts": [
          [
            "Town",
            "Rayol-Canadel-sur-Mer · Le Rayol area"
          ],
          [
            "Layout",
            "Two beaches divided by a rocky point"
          ],
          [
            "Described access",
            "Square Jean Aicard and Degrés de la Mer, with steps"
          ],
          [
            "Plan ahead",
            "Return climb, equipment and bathing conditions"
          ]
        ],
        "questions": [
          [
            "Is this the same as Canadel beach?",
            "No. They are different areas within the same municipality."
          ],
          [
            "Can I walk down from the Voie Verte?",
            "The office describes access through Square Jean Aicard and the Degrés de la Mer, involving steps and a return climb."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Tourisme du Golfe — plage du Rayol",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/rayol-canadel-sur-mer/plage-du-rayol-928717"
      },
      {
        "label": "Var Tourisme — accès et équipements",
        "url": "https://www.visitvar.fr/fiche/plage-du-rayol-928717"
      }
    ],
    "nearby": [
      "pergola-patec-rayol",
      "rayol-canadel-village",
      "plage-du-canadel"
    ]
  },
  "maison-des-arcades-grimaud": {
    "verified": "2026-10-27",
    "copy": {
      "fr": {
        "title": "Maison des Arcades à Grimaud : patrimoine et expositions",
        "description": "La Maison des Arcades à Grimaud : architecture du vieux village, expositions d’art, accès par le Balladou et conseils pour organiser votre visite culturelle.",
        "intro": "À Grimaud, une façade peut ouvrir sur bien plus qu’une photographie. La Maison des Arcades relie les pierres du village à la création artistique : on s’intéresse à une fenêtre, à une arche, puis à ce que le lieu accueille aujourd’hui. Une halte culturelle qui prolonge naturellement une promenade dans le centre ancien.",
        "sections": [
          [
            "Lire l’architecture depuis la rue",
            "Les arcades de basalte et les fenêtres à meneaux racontent une demeure ancienne liée aux XVe et XVIe siècles. La commune indique que la façade et la cave sont inscrites depuis 1926. Notre suggestion : observer quelques détails à l’extérieur avant de chercher l’entrée de l’espace d’exposition ; la rue et la visite intérieure ne se confondent pas."
          ],
          [
            "Un lieu consacré aux expositions",
            "La maison accueille des expositions depuis 2018 et abrite le service Culture et Patrimoine. Le programme change : consultez l’agenda municipal pour connaître les artistes et les dates de présentation. Une exposition temporaire s’apprécie avec son calendrier : vérifiez les dates pour ne pas venir après sa clôture."
          ],
          [
            "Trouver l’entrée du côté du Balladou",
            "Les informations pratiques situent l’accès impasse du Balladou, près de l’église Saint-Michel ; l’office décrit un passage sous un porche. Préparez ce repère avant de parcourir les ruelles. Pour un besoin d’accès sans marche, contactez l’accueil : les sources ne permettent pas de garantir ici un parcours intégralement accessible."
          ],
          [
            "Choisir son créneau puis continuer dans Grimaud",
            "L’accès est annoncé libre, avec des horaires du mardi au samedi variant selon la saison et des fermetures en janvier et les jours fériés. Vérifiez le créneau courant avant le déplacement. Selon le temps disponible, poursuivez vers Saint-Michel ou le Musée du Patrimoine : trois sujets complémentaires plutôt qu’une répétition de la même visite."
          ]
        ],
        "facts": [
          [
            "Lieu",
            "Impasse du Balladou, près de Saint-Michel, Grimaud"
          ],
          [
            "Univers",
            "Architecture et expositions d’art"
          ],
          [
            "Entrée",
            "Libre selon les informations de l’office"
          ],
          [
            "Organisation",
            "Horaires saisonniers et programme à consulter"
          ]
        ],
        "questions": [
          [
            "Est-ce le Musée du Patrimoine ?",
            "Non. La Maison des Arcades présente des expositions dans un bâtiment historique ; le Musée du Patrimoine fait l’objet d’une autre fiche."
          ],
          [
            "Peut-on compter sur une exposition précise toute l’année ?",
            "Non. Consultez le programme actuel et ses dates avant de venir pour un artiste ou un thème particulier."
          ]
        ]
      },
      "en": {
        "title": "Maison des Arcades in Grimaud: architecture and art exhibitions",
        "description": "Explore Grimaud’s Maison des Arcades: old-village architecture, changing art exhibitions, Balladou access and practical advice for a cultural visit.",
        "intro": "A Grimaud facade can lead to more than a photograph. Maison des Arcades connects the village’s stonework with artistic creation. Look at an arch or a window, then discover what the building hosts today: a cultural stop that fits naturally into an old-town walk.",
        "sections": [
          [
            "Read the building from the street",
            "Basalt arcades and mullioned windows evoke the historic house. The municipality records protection of the facade and cellar since 1926. Observe exterior details before finding the exhibition entrance; seeing the street facade is different from an interior visit."
          ],
          [
            "A changing exhibition space",
            "The house has hosted exhibitions since 2018 and accommodates the Culture and Heritage service. Check the municipal agenda for current artists and dates. Check exhibition dates so that a temporary show has not finished before you arrive."
          ],
          [
            "Find the Balladou entrance",
            "Practical information places access on Impasse du Balladou near Saint-Michel church, with the office describing a passage under a porch. For step-free requirements, ask reception about the actual route; this profile does not guarantee full accessibility."
          ],
          [
            "Choose your time in Grimaud",
            "Admission is advertised as free, with seasonal Tuesday–Saturday hours and closures in January and on public holidays. Confirm the current opening time, then consider Saint-Michel or the heritage museum as complementary visits."
          ]
        ],
        "facts": [
          [
            "Location",
            "Impasse du Balladou, near Saint-Michel, Grimaud"
          ],
          [
            "Focus",
            "Architecture and art exhibitions"
          ],
          [
            "Admission",
            "Advertised as free by the tourist office"
          ],
          [
            "Planning",
            "Check seasonal hours and current programme"
          ]
        ],
        "questions": [
          [
            "Is this the heritage museum?",
            "No. Maison des Arcades is an exhibition venue in a historic building; the heritage museum has a separate profile."
          ],
          [
            "Is one exhibition available throughout the year?",
            "Check the current programme and dates before visiting for a specific artist or theme."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Grimaud Tourisme — Maison des Arcades",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/la-maison-des-arcades/"
      },
      {
        "label": "Office — fiche pratique",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/maison-des-arcades-grimaud-fr-3032964/"
      },
      {
        "label": "Commune — culture",
        "url": "https://www.mairie-grimaud.com/Culture/"
      }
    ],
    "nearby": [
      "eglise-saint-michel-grimaud",
      "musee-patrimoine-grimaud",
      "grimaud-village"
    ]
  }
};

export const coastalDiscoverySignatures:Record<string,Record<Locale,{subtitle:string;quote:string;rhythm:string;dark:string;close:string}>> = {
  "pointe-des-sardinaux": {
    "fr": {
      "subtitle": "UNE PARENTHÈSE LITTORALE À PARCOURIR À PIED",
      "quote": "PRENDRE LE TEMPS, LAISSER LA NATURE À SA PLACE.",
      "rhythm": "DES TRACES D’HISTOIRE PARMI LES ROCHERS",
      "dark": "LA POINTE ET L’ÎLOT NE SONT PAS LE MÊME ESPACE",
      "close": "PRÉVOIR UNE PAUSE QUI RESPECTE LE SITE"
    },
    "en": {
      "subtitle": "ARRIVE FOR A WALK",
      "quote": "TAKE YOUR TIME. LEAVE ROOM FOR NATURE.",
      "rhythm": "HISTORY BESIDE THE SHORE",
      "dark": "THE POINT AND THE ISLET ARE DIFFERENT",
      "close": "A CONSIDERATE PICNIC STOP"
    }
  },
  "port-cogolin": {
    "fr": {
      "subtitle": "TROIS NOMS À NE PAS MÉLANGER",
      "quote": "COGOLIN SE DÉCOUVRE AUSSI AU BORD DES QUAIS.",
      "rhythm": "UNE ESCALE À HAUTEUR DE QUAI",
      "dark": "UNE PAUSE SELON LES ADRESSES OUVERTES",
      "close": "POUR LES PLAISANCIERS, CONFIRMER AVEC LA CAPITAINERIE"
    },
    "en": {
      "subtitle": "KEEP THE PORT NAMES SEPARATE",
      "quote": "DISCOVER COGOLIN AT QUAYSIDE PACE.",
      "rhythm": "DISCOVER THE QUAYSIDE",
      "dark": "CHOOSE A LOCAL BREAK",
      "close": "ASK THE HARBOUR OFFICE ABOUT BOATING"
    }
  },
  "plage-luc-provensal-sainte-maxime": {
    "fr": {
      "subtitle": "UNE PLAGE DE CENTRE-VILLE, CÔTÉ PROMENADE",
      "quote": "LA MER AU PROGRAMME, LE VILLAGE À PORTÉE DE PAS.",
      "rhythm": "COMPOSER UNE SORTIE SIMPLE EN FAMILLE",
      "dark": "SURVEILLANCE ET BAIGNADE : REGARDER LA DATE",
      "close": "PLAGE PUBLIQUE ET PRESTATIONS RESTENT DISTINCTES"
    },
    "en": {
      "subtitle": "A BEACH BESIDE THE PROMENADE",
      "quote": "TIME BY THE SEA, WITH TOWN CLOSE TO HAND.",
      "rhythm": "MAKE A MANAGEABLE FAMILY OUTING",
      "dark": "CHECK SUPERVISION FOR YOUR DATE",
      "close": "SEPARATE PUBLIC ACCESS FROM SERVICES"
    }
  },
  "plage-du-rayol": {
    "fr": {
      "subtitle": "DEUX SECTEURS AUTOUR D’UNE POINTE ROCHEUSE",
      "quote": "PRENDRE LA MER DU REGARD, PUIS LE CHEMIN VERS LE SABLE.",
      "rhythm": "LA DESCENTE FAIT PARTIE DE LA VISITE",
      "dark": "CHOISIR UNE BAIGNADE ADAPTÉE AU JOUR",
      "close": "PRÉPARER LE TRAJET SANS PROMETTRE UNE PLACE"
    },
    "en": {
      "subtitle": "TWO SECTIONS AROUND A ROCKY POINT",
      "quote": "FIRST THE SEA VIEW, THEN THE PATH TO THE SAND.",
      "rhythm": "PLAN THE DESCENT AND THE CLIMB BACK",
      "dark": "READ THE CONDITIONS ON ARRIVAL",
      "close": "ALLOW FOR THE APPROACH"
    }
  },
  "maison-des-arcades-grimaud": {
    "fr": {
      "subtitle": "LIRE L’ARCHITECTURE DEPUIS LA RUE",
      "quote": "LES PIERRES RACONTENT LE VILLAGE. L’ART Y PREND PLACE.",
      "rhythm": "UN LIEU CONSACRÉ AUX EXPOSITIONS",
      "dark": "TROUVER L’ENTRÉE DU CÔTÉ DU BALLADOU",
      "close": "CHOISIR SON CRÉNEAU PUIS CONTINUER DANS GRIMAUD"
    },
    "en": {
      "subtitle": "READ THE BUILDING FROM THE STREET",
      "quote": "VILLAGE STONEWORK MAKES ROOM FOR ART.",
      "rhythm": "A CHANGING EXHIBITION SPACE",
      "dark": "FIND THE BALLADOU ENTRANCE",
      "close": "CHOOSE YOUR TIME IN GRIMAUD"
    }
  }
};
