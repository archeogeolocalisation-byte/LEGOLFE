import type {Place} from './places';
import type {PlaceFacts} from './placeFacts';
import type {MapPoint} from '../lib/placeMapLinks';
import type {VillagePhoto} from './villageMedia';
import {villageMedia} from './villageMedia';

export const cavalaireMolePlaces:Place[] = [
  {
    "id": "plage-de-bonporteau",
    "name": "Plage de Bonporteau",
    "category": "beach",
    "location": "Cavalaire-sur-Mer",
    "description": "Discover Bonporteau in Cavalaire-sur-Mer: a sandy cove reached by a steep footpath, an unpatrolled beach and practical advice for planning your visit.",
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
      "Check daily access and conditions before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.cavalairesurmer.fr/plage-de-bonporteau-823841/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "port-heraclea-cavalaire",
    "name": "Port Héracléa de Cavalaire",
    "category": "sea",
    "location": "Cavalaire-sur-Mer",
    "description": "Explore Cavalaire’s Port Héracléa: public waterfront walks, Maison de la Mer access and advice for checking boat-trip departure points and arrangements.",
    "bestFor": [
      "Coastal discovery"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "harbour",
      "walk",
      "view",
      "family"
    ],
    "goodToKnow": [
      "Check daily access and conditions before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cavalaire-sur-mer/port-heraclea-823746",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "plage-centre-ville-cavalaire",
    "name": "Plage du Centre-Ville de Cavalaire",
    "category": "beach",
    "location": "Cavalaire-sur-Mer",
    "description": "Plan a visit to Cavalaire’s town-centre beach: sand near the harbour, waterfront walks, seasonal lifeguard cover and practical access information.",
    "bestFor": [
      "Coastal discovery"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "beach",
      "family",
      "walk",
      "view"
    ],
    "goodToKnow": [
      "Check daily access and conditions before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-sainttropez.fr/plage/centre-ville/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "sentiers-corniche-des-maures",
    "name": "Sentiers de la Corniche des Maures",
    "category": "do",
    "location": "Cavalaire-sur-Mer",
    "description": "Explore Cavalaire’s Corniche des Maures trails: Bonporteau starting area, 3 km or 8 km routes, Fenouillet scenery, coastal views and access checks.",
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
      "Check daily access and conditions before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.cavalairesurmer.fr/les-sentiers-de-la-corniche-des-maures-823781/",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "barrage-de-la-verne",
    "name": "Barrage de la Verne à La Môle",
    "category": "do",
    "location": "La Môle",
    "description": "Walk to La Verne dam in La Môle: Chemin de Saint-Julien approach, around 5 km return and wooded Maures scenery. Swimming, fishing and boating prohibited.",
    "bestFor": [
      "Inland discovery"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "walk",
      "nature",
      "view"
    ],
    "goodToKnow": [
      "Check daily access and conditions before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-mole/barrage-de-la-verne-a-la-mole-5595275",
    "lastVerifiedAt": "2026-10-16"
  },
  {
    "id": "eglise-sainte-magdeleine-la-mole",
    "name": "Église Sainte-Magdeleine de La Môle",
    "category": "do",
    "location": "La Môle",
    "description": "Visit Sainte-Magdeleine church in La Môle: a colourful façade, sundial and village heritage. Location and the distinction from the chapel in the hills.",
    "bestFor": [
      "Inland discovery"
    ],
    "notIdealFor": [
      "Unplanned access"
    ],
    "tags": [
      "heritage",
      "history",
      "walk"
    ],
    "goodToKnow": [
      "Check daily access and conditions before travelling."
    ],
    "verified": false,
    "featured": false,
    "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-mole/eglise-sainte-magdeleine-6562261",
    "lastVerifiedAt": "2026-10-16"
  }
];

export const cavalaireMoleFacts:Record<string,PlaceFacts> = {
  "plage-de-bonporteau": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Plage de Bonporteau à Cavalaire : accès et conseils",
        "description": "Bonporteau à Cavalaire-sur-Mer : crique de sable, accès à pied par un sentier pentu et plage non surveillée. Préparez votre arrivée et votre journée au bord de l’eau.",
        "intro": "À Bonporteau, Cavalaire change d’échelle : une crique, du sable entre les rochers et la végétation qui accompagne la descente. Notre idée : venir pour ce décor resserré, garder le temps de profiter de la mer et prévoir le retour à pied avant de remplir le programme de la journée.",
        "facts": [
          [
            "Adresse",
            "Plage de Bonporteau, 83240 Cavalaire-sur-Mer"
          ],
          [
            "Accès",
            "À pied, par un sentier pentu"
          ],
          [
            "Surveillance",
            "Plage annoncée non surveillée"
          ],
          [
            "Sur place",
            "Pas de restauration annoncée sur la plage"
          ]
        ],
        "sections": [
          [
            "Une crique pour changer de Cavalaire",
            "La plage de Bonporteau se distingue du grand front de mer du centre. Les rochers bordent le sable et l’arrivée traverse une végétation où l’office mentionne eucalyptus, tamaris et palmiers. Prenez le temps d’observer cette transition entre la ville et la crique plutôt que de ne penser qu’à la serviette."
          ],
          [
            "Comment accéder à Bonporteau ?",
            "Rejoignez l’accès indiqué à l’ouest de Cavalaire, puis descendez à pied. La page pratique des plages précise que le sentier est très pentu, interdit aux véhicules et aux deux-roues, sans accès PMR. Prévoyez des chaussures adaptées et de quoi remonter vos affaires ; le point sur la carte situe la plage, pas un parking."
          ],
          [
            "Préparer sa baignade et sa pause",
            "Bonporteau est annoncée non surveillée. Consultez les conditions de mer et les informations affichées avant de vous baigner. Notre conseil : apporter eau, protection solaire et de quoi manger si vous restez longtemps, car l’office n’annonce pas de restauration sur place. Repartez avec vos déchets."
          ],
          [
            "Une plage qui mérite du temps",
            "En été, anticipez l’affluence et le stationnement sans compter sur une place disponible au dernier moment. Les sentiers de la Corniche des Maures donnent une autre façon de découvrir le secteur ; préparez cette marche séparément, avec des chaussures, du temps et la vérification des conditions d’accès."
          ]
        ],
        "questions": [
          [
            "La plage de Bonporteau est-elle surveillée ?",
            "Non : la page pratique de Cavalaire Tourisme l’annonce non surveillée. Vérifiez les conditions du jour et choisissez un autre secteur si vous recherchez une surveillance."
          ],
          [
            "L’accès est-il adapté à une poussette ou un fauteuil ?",
            "L’office décrit un sentier très pentu sans accès PMR. Demandez conseil avant de choisir cette plage si la pente est une difficulté pour votre groupe."
          ]
        ]
      },
      "en": {
        "title": "Bonporteau beach, Cavalaire: walking access and advice",
        "description": "Discover Bonporteau in Cavalaire-sur-Mer: a sandy cove reached by a steep footpath, an unpatrolled beach and practical advice for planning your visit.",
        "intro": "At Bonporteau, Cavalaire feels smaller: sand between rocks, a sheltered-looking cove and greenery along the descent. Our idea: come for this compact landscape, leave time for the shore and plan the walk back before adding more stops to the day.",
        "facts": [
          [
            "Address",
            "Plage de Bonporteau, 83240 Cavalaire-sur-Mer"
          ],
          [
            "Access",
            "On foot down a steep path"
          ],
          [
            "Lifeguards",
            "Listed as unpatrolled"
          ],
          [
            "Food",
            "No on-beach catering listed"
          ]
        ],
        "sections": [
          [
            "A different side of Cavalaire",
            "Bonporteau feels distinct from the long town-centre waterfront. Rocks frame the sand, while the tourist office describes eucalyptus, tamarisk and palms on the approach. Take time over the transition from town to cove rather than treating it only as the route to your towel."
          ],
          [
            "How to reach Bonporteau",
            "Head to the signed access west of Cavalaire and continue on foot. The practical beach page describes a steep path closed to vehicles and two-wheelers, without wheelchair access. Wear suitable shoes and allow for carrying your things uphill again; the map marks the beach, not a car park."
          ],
          [
            "Plan your swim and break",
            "Bonporteau is listed as unpatrolled. Check sea conditions and posted notices before swimming. Our advice: bring water, sun protection and food if staying a while, as the office lists no catering on the beach. Take all rubbish away."
          ],
          [
            "Give the beach its own time",
            "Allow for summer crowds and parking without relying on an immediately available space. The Corniche des Maures trails offer another way to see the area; plan that walk separately, with suitable shoes, time and current access information."
          ]
        ],
        "questions": [
          [
            "Does Bonporteau have lifeguards?",
            "The practical Cavalaire Tourism page lists it as unpatrolled. Check daily conditions and choose another beach if you want lifeguard cover."
          ],
          [
            "Is the approach suitable for a pushchair or wheelchair?",
            "The office describes a steep path without wheelchair access. Ask for advice if the gradient is a concern for your group."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Plage de Bonporteau",
        "url": "https://www.cavalairesurmer.fr/plage-de-bonporteau-823841/"
      },
      {
        "label": "Cavalaire Tourisme · accès et surveillance",
        "url": "https://www.cavalairesurmer.fr/les-ingredients-du-bonheur/vagues-de-detente/les-plages/"
      }
    ],
    "nearby": [
      "cavalaire-village",
      "port-heraclea-cavalaire",
      "plage-centre-ville-cavalaire",
      "sentiers-corniche-des-maures"
    ]
  },
  "port-heraclea-cavalaire": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Port Héracléa à Cavalaire : promenade et accès au port",
        "description": "Découvrez le port Héracléa de Cavalaire : promenade sur les quais publics, Maison de la Mer et départs nautiques à confirmer. Adresse et idées de sortie.",
        "intro": "À Cavalaire, le port Héracléa est un point de rendez-vous autant qu’un paysage de bateaux. On y vient pour prendre ses repères, prolonger une journée plage ou préparer une sortie en mer. Notre suggestion : commencer par les quais publics, regarder vivre le port puis choisir la suite sans presser le programme.",
        "facts": [
          [
            "Adresse",
            "Maison de la Mer, 83240 Cavalaire-sur-Mer"
          ],
          [
            "Découverte",
            "Port de plaisance et quais publics"
          ],
          [
            "Capitainerie",
            "04 94 64 17 81"
          ],
          [
            "Sorties en mer",
            "Prestataire et point d’embarquement à confirmer"
          ]
        ],
        "sections": [
          [
            "Le port comme point de départ",
            "Le port Héracléa réunit les installations portuaires de Cavalaire. Pour une première découverte, suivez les espaces publics et observez les mouvements des bateaux. Les pontons et zones techniques n’ont pas tous vocation à recevoir les promeneurs : suivez la signalisation locale."
          ],
          [
            "Rejoindre la Maison de la Mer",
            "Le repère officiel renvoie à la Maison de la Mer, dans le secteur du port. Rejoignez un stationnement autorisé puis terminez à pied. Pour un rendez-vous nautique, utilisez surtout l’adresse et les consignes de votre prestataire : un grand port peut comporter plusieurs lieux de départ."
          ],
          [
            "Une sortie bateau se prépare séparément",
            "Une promenade sur les quais n’inclut pas une excursion. Confirmez la réservation, l’horaire, l’embarquement et les conditions météo avec l’organisateur. La capitainerie est le contact portuaire ; les horaires de ses services peuvent varier selon la saison."
          ],
          [
            "Du port à la plage du Centre-Ville",
            "Notre idée : associer le port à la plage du Centre-Ville pour une journée facile à composer à pied. Bonporteau est une autre sortie, avec une approche pentue à prévoir. En été, gardez une marge pour les trajets et les pauses plutôt que d’aligner des rendez-vous trop serrés."
          ]
        ],
        "questions": [
          [
            "Où se trouve le port Héracléa ?",
            "À Cavalaire-sur-Mer, autour de la Maison de la Mer. Le repère situe les services du port, pas nécessairement votre embarquement."
          ],
          [
            "Peut-on se promener sur les pontons ?",
            "Restez sur les quais et espaces publics accessibles. Respectez les accès réservés et les consignes de la capitainerie."
          ]
        ]
      },
      "en": {
        "title": "Port Héracléa, Cavalaire: harbour walks and access",
        "description": "Explore Cavalaire’s Port Héracléa: public waterfront walks, Maison de la Mer access and advice for checking boat-trip departure points and arrangements.",
        "intro": "Port Héracléa is both a meeting point and a landscape of boats in Cavalaire. Come to find your bearings, extend a beach day or prepare a boat trip. Our suggestion: start on the public quays, watch the harbour at work and leave some room in the programme.",
        "facts": [
          [
            "Address",
            "Maison de la Mer, 83240 Cavalaire-sur-Mer"
          ],
          [
            "Visit",
            "Marina and public waterfront"
          ],
          [
            "Harbour office",
            "+33 4 94 64 17 81"
          ],
          [
            "Boat trips",
            "Confirm operator and boarding point"
          ]
        ],
        "sections": [
          [
            "Start with the harbour",
            "Port Héracléa brings together Cavalaire’s port facilities. For a first visit, follow public spaces and watch the boats. Pontoons and working areas are not all open for general walks; follow local signs."
          ],
          [
            "Getting to the Maison de la Mer",
            "The official reference points to the Maison de la Mer in the harbour area. Use authorised parking and finish on foot. For a boating appointment, follow your operator’s address and instructions: a large harbour can have several departure points."
          ],
          [
            "Book a boat outing separately",
            "A walk along the quays does not include an excursion. Confirm booking, timing, boarding and weather arrangements with the operator. The harbour office deals with port matters; its service hours vary by season."
          ],
          [
            "From harbour to town-centre beach",
            "Our idea: pair the harbour with the town-centre beach for a day easily arranged on foot. Bonporteau is a separate outing with a steep approach. In summer, leave time for travel and breaks instead of packing appointments too closely."
          ]
        ],
        "questions": [
          [
            "Where is Port Héracléa?",
            "In Cavalaire-sur-Mer, around the Maison de la Mer. The marker identifies port services, not necessarily your boarding point."
          ],
          [
            "Can I walk on the pontoons?",
            "Use accessible public quays and spaces. Respect restricted areas and harbour-office instructions."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Port Héracléa de Cavalaire",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cavalaire-sur-mer/port-heraclea-823746"
      },
      {
        "label": "Ville de Cavalaire · port Héracléa",
        "url": "https://www.cavalaire.fr/node/3925"
      }
    ],
    "nearby": [
      "cavalaire-village",
      "plage-de-bonporteau",
      "plage-centre-ville-cavalaire",
      "sentiers-corniche-des-maures"
    ]
  },
  "plage-centre-ville-cavalaire": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Plage du Centre-Ville à Cavalaire : accès et surveillance",
        "description": "La plage du Centre-Ville de Cavalaire : sable près du port, promenade et surveillance saisonnière. Accès, repères pratiques et idées pour organiser la journée.",
        "intro": "À deux pas du centre et du port, cette plage permet de donner une place à la mer sans consacrer toute la journée au trajet. Sable, promenade et vie de station composent le décor. Notre idée : garder une matinée plage, puis rejoindre le port à pied pour une pause ou un rendez-vous.",
        "facts": [
          [
            "Adresse",
            "Plage du Centre-Ville, 83240 Cavalaire-sur-Mer"
          ],
          [
            "Situation",
            "Près du centre et du port"
          ],
          [
            "Surveillance",
            "Saisonnière, aux horaires du poste de secours"
          ],
          [
            "Repère cartographique",
            "Secteur de plage publié par l’intercommunalité"
          ]
        ],
        "sections": [
          [
            "Une plage au rythme de la station",
            "La plage du Centre-Ville fait partie du front de mer de Cavalaire. L’office la décrit avec une vue sur le port et trois jetées. Choisissez-la pour relier facilement sable et promenade ; l’ambiance d’une station balnéaire signifie aussi davantage de fréquentation en plein été."
          ],
          [
            "Rejoindre la plage du Centre-Ville",
            "Depuis le centre, gagnez le front de mer et les accès publics de la plage. En voiture, utilisez les emplacements autorisés puis terminez à pied. Le repère intercommunal situe un secteur de plage, sans indiquer une place de parking disponible ni un accès adapté précis : vérifiez le plan des plages si nécessaire."
          ],
          [
            "Surveillance et conditions de baignade",
            "La surveillance est saisonnière. Consultez la page officielle de l’intercommunalité et les informations du poste de secours pour les dates, les heures et les conditions du jour. Une fiche ouverte toute l’année ne signifie pas une présence permanente des sauveteurs."
          ],
          [
            "Associer la plage et le port",
            "Notre suggestion : prévoir une pause au centre ou sur le port avant de revenir au sable, avec eau et protection solaire. Les activités nautiques se réservent auprès des professionnels et utilisent leurs zones dédiées. Pour une autre ambiance, gardez Bonporteau pour une sortie distincte."
          ]
        ],
        "questions": [
          [
            "La plage du Centre-Ville est-elle surveillée toute l’année ?",
            "Non : la surveillance dépend de la saison et des horaires du poste de secours. Consultez les informations officielles pour votre date."
          ],
          [
            "Est-ce la plage de Bonporteau ?",
            "Non : Bonporteau est une crique distincte à l’ouest, accessible par un sentier pentu. La plage du Centre-Ville est proche du port et du centre."
          ]
        ]
      },
      "en": {
        "title": "Cavalaire town-centre beach: access and seasonal lifeguards",
        "description": "Plan a visit to Cavalaire’s town-centre beach: sand near the harbour, waterfront walks, seasonal lifeguard cover and practical access information.",
        "intro": "Close to the centre and harbour, this beach makes room for the sea without turning travel into the main event. Sand, a promenade and resort life set the scene. Our idea: leave the morning for the beach, then walk to the harbour for a break or meeting.",
        "facts": [
          [
            "Address",
            "Plage du Centre-Ville, 83240 Cavalaire-sur-Mer"
          ],
          [
            "Location",
            "Near the centre and harbour"
          ],
          [
            "Lifeguards",
            "Seasonal, during posted hours"
          ],
          [
            "Map reference",
            "Beach-area marker from the intercommunal authority"
          ]
        ],
        "sections": [
          [
            "A beach with a resort rhythm",
            "Cavalaire’s town-centre beach forms part of the main waterfront. The tourist office describes harbour views and three jetties. Choose it to combine sand and a promenade easily; a resort setting also brings greater visitor numbers in high summer."
          ],
          [
            "Getting to the beach",
            "From the centre, head to the waterfront and public beach entrances. Drivers should use authorised parking and finish on foot. The official marker identifies a beach area rather than an available parking space or specific adapted entrance; consult the beach map when needed."
          ],
          [
            "Lifeguards and swimming conditions",
            "Lifeguard cover is seasonal. Check the intercommunal authority’s page and lifeguard-station information for dates, hours and daily conditions. Year-round beach access does not mean lifeguards are always present."
          ],
          [
            "Pair the beach with the harbour",
            "Our suggestion: take a break in the centre or harbour before returning to the sand, with water and sun protection. Book water activities with operators and follow designated zones. Save Bonporteau for a separate outing if you want a different setting."
          ]
        ],
        "questions": [
          [
            "Are there lifeguards all year?",
            "No: cover depends on the season and posted hours. Check official information for your date."
          ],
          [
            "Is this Bonporteau beach?",
            "No: Bonporteau is a separate cove to the west, reached by a steep path. The town-centre beach lies near the centre and harbour."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Plage du Centre-Ville de Cavalaire",
        "url": "https://www.golfe-sainttropez.fr/plage/centre-ville/"
      },
      {
        "label": "Cavalaire Tourisme · les plages",
        "url": "https://www.cavalairesurmer.fr/les-ingredients-du-bonheur/vagues-de-detente/les-plages/"
      }
    ],
    "nearby": [
      "cavalaire-village",
      "plage-de-bonporteau",
      "port-heraclea-cavalaire",
      "sentiers-corniche-des-maures"
    ]
  },
  "sentiers-corniche-des-maures": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Corniche des Maures à Cavalaire : sentiers de 3 ou 8 km",
        "description": "À Cavalaire, découvrez les sentiers de la Corniche des Maures : départ Bonporteau, parcours de 3 ou 8 km, Fenouillet, vues sur la mer et accès à vérifier.",
        "intro": "Entre Bonporteau, le Fenouillet et le Dattier, les sentiers de la Corniche des Maures montrent une Cavalaire qui se découvre avec des chaussures de marche. La mer reste le fil conducteur, mais le relief donne le rythme. Notre idée : choisir le parcours avant de partir pour garder le plaisir de marcher et de regarder.",
        "facts": [
          [
            "Départ présenté",
            "Secteur de Bonporteau, Cavalaire-sur-Mer"
          ],
          [
            "Deux parcours",
            "3 km ou 8 km selon le tracé choisi"
          ],
          [
            "Parcours de 8 km",
            "Environ 3h ; 360 m de dénivelé annoncés"
          ],
          [
            "Avant le départ",
            "Météo, tracé et accès aux massifs à vérifier"
          ]
        ],
        "sections": [
          [
            "Choisir 3 km ou 8 km",
            "La fiche officielle propose un itinéraire court de 3 km et un parcours de 8 km annoncé en environ 3h, avec 360 m de dénivelé. Ces chiffres concernent le tracé long, pas le parcours court. Téléchargez le GPX correspondant et ne confondez pas cette sortie avec une promenade entièrement plate."
          ],
          [
            "Bonporteau comme point de départ",
            "Cette fiche utilise le départ de Bonporteau publié par l’office. Rejoignez les stationnements autorisés du secteur et suivez les indications sur place. Le repère situe le secteur de départ, pas une place pour votre véhicule. Une autre approche par l’ancienne voie ferrée est décrite sur la source officielle."
          ],
          [
            "Du Fenouillet aux vues sur le littoral",
            "Le vallon du Fenouillet apporte une ambiance de végétation et de cours d’eau différente des portions plus ouvertes. Notre conseil : garder du temps pour les points de vue au lieu de transformer la sortie en objectif de vitesse. Le parcours comporte des passages raides ; emportez eau, chaussures adaptées et protection solaire."
          ],
          [
            "Vérifier avant d’ajouter la randonnée au programme",
            "Consultez la météo et la carte officielle d’accès aux massifs, notamment en période estivale, puis respectez la signalisation et les éventuelles fermetures. Notre suggestion : réserver à cette marche une vraie place dans la journée et reporter la sortie si les conditions ne conviennent pas. La visite du domaine Foncin relève d’une organisation séparée."
          ]
        ],
        "questions": [
          [
            "Quelle est la distance du sentier ?",
            "La fiche présente deux tracés, 3 km et 8 km. Les 3h et 360 m de dénivelé annoncés concernent le parcours de 8 km."
          ],
          [
            "Peut-on partir sans vérifier les accès ?",
            "Vérifiez le tracé, la météo et les informations officielles d’accès aux massifs pour votre date. Un itinéraire publié ne garantit pas son ouverture le jour de votre sortie."
          ]
        ]
      },
      "en": {
        "title": "Corniche des Maures trails, Cavalaire: 3 km and 8 km walks",
        "description": "Explore Cavalaire’s Corniche des Maures trails: Bonporteau starting area, 3 km or 8 km routes, Fenouillet scenery, coastal views and access checks.",
        "intro": "Between Bonporteau, Fenouillet and Le Dattier, the Corniche des Maures trails reveal a Cavalaire made for walking shoes. The sea connects the scenery, while the terrain sets the pace. Our idea: choose your route before setting off so there is time to enjoy both the walk and the views.",
        "facts": [
          [
            "Starting area",
            "Bonporteau, Cavalaire-sur-Mer"
          ],
          [
            "Two routes",
            "3 km or 8 km, depending on the selected track"
          ],
          [
            "8 km route",
            "Around 3 hours; 360 m elevation gain listed"
          ],
          [
            "Before walking",
            "Check weather, route and forest access"
          ]
        ],
        "sections": [
          [
            "Choose the right route",
            "The official listing provides a short 3 km route and an 8 km route listed at around 3 hours with 360 m of elevation gain. Those figures apply to the long route, not the short one. Download the matching GPX and expect more than a flat promenade."
          ],
          [
            "Starting from Bonporteau",
            "This page uses the Bonporteau starting area published by the tourist office. Use authorised parking and follow local directions. The marker identifies the starting area rather than a parking space. The official source also describes an alternative approach via the former railway."
          ],
          [
            "From Fenouillet to coastal views",
            "Fenouillet valley brings vegetation and watercourse scenery distinct from the more open stretches. Our advice: leave time for viewpoints rather than chasing speed. There are steep sections; bring water, suitable footwear and sun protection."
          ],
          [
            "Check conditions before setting out",
            "Consult the weather and official forest-access map, particularly in summer, then follow signs and any closures. Our suggestion: give the walk its own place in the day and postpone if conditions are unsuitable. Visiting Domaine Foncin requires separate arrangements."
          ]
        ],
        "questions": [
          [
            "How long is the walk?",
            "Two tracks are presented: 3 km and 8 km. The listed 3 hours and 360 m elevation gain refer to the 8 km route."
          ],
          [
            "Do I need to check access first?",
            "Check the track, weather and official forest-access information for your date. A published itinerary does not guarantee it is open that day."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Sentiers de la Corniche des Maures",
        "url": "https://www.cavalairesurmer.fr/les-sentiers-de-la-corniche-des-maures-823781/"
      },
      {
        "label": "Cavalaire Tourisme · balades à pied",
        "url": "https://www.cavalairesurmer.fr/les-ingredients-du-bonheur/terre-devasion/a-pied-a-velo/"
      },
      {
        "label": "Préfecture du Var · accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      }
    ],
    "nearby": [
      "cavalaire-village",
      "plage-de-bonporteau",
      "port-heraclea-cavalaire",
      "plage-centre-ville-cavalaire"
    ]
  },
  "barrage-de-la-verne": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Barrage de la Verne à La Môle : balade et accès à pied",
        "description": "Une balade au barrage de la Verne à La Môle : accès par le chemin de Saint-Julien, environ 5 km aller-retour et paysage des Maures. Baignade interdite.",
        "intro": "Au barrage de la Verne, l’eau se retrouve entourée de collines boisées, loin du décor des plages. Cette réserve d’eau potable donne à La Môle une belle étape de promenade. Notre idée : venir pour marcher et observer le paysage, avec le temps du retour et une pause au village dans le programme.",
        "facts": [
          [
            "Approche",
            "Chemin de Saint-Julien, 83310 La Môle"
          ],
          [
            "Marche annoncée",
            "5 km aller-retour ; environ 1h30"
          ],
          [
            "Depuis le stationnement",
            "Environ 2,5 km de piste à pied pour rejoindre le barrage"
          ],
          [
            "Usages",
            "Baignade, pêche et navigation interdites"
          ]
        ],
        "sections": [
          [
            "Un paysage d’eau dans les Maures",
            "Construit en 1991, le barrage de la Verne participe à l’alimentation en eau potable du territoire. Le lac et les collines offrent un paysage à observer depuis les chemins accessibles. Notre conseil : garder des jumelles si vous aimez regarder les oiseaux, sans attendre une rencontre garantie avec la faune."
          ],
          [
            "Comment rejoindre le barrage de la Verne ?",
            "L’office indique une approche par le chemin de Saint-Julien, avec stationnement près de l’usine des eaux puis environ 2,5 km de piste en terre à pied. Respectez les emplacements autorisés et les accès d’exploitation. Le repère cartographique situe le barrage, pas le départ automobile : utilisez les indications de la fiche officielle."
          ],
          [
            "Prévoir l’aller et le retour",
            "La promenade est annoncée sur 5 km pour environ 1h30 ; ajoutez du temps pour les pauses. Le sol est en terre et cailloux. Prévoyez chaussures adaptées, eau et protection solaire, puis vérifiez météo et accès aux massifs avant le départ. Ce programme ne comprend pas la longue randonnée vers la Chartreuse de la Verne."
          ],
          [
            "Une retenue à contempler depuis les chemins",
            "La baignade, la pêche et la navigation sont interdites. Restez sur les passages accessibles et respectez les consignes qui protègent cette réserve. Notre suggestion : compléter la marche par une halte au village, autour de l’église, plutôt que de prévoir une activité sur l’eau."
          ]
        ],
        "questions": [
          [
            "Peut-on se baigner au barrage de la Verne ?",
            "Non. La baignade, la pêche et la navigation sont interdites dans cette réserve d’eau potable."
          ],
          [
            "Quelle marche faut-il prévoir depuis le parking ?",
            "L’office annonce environ 2,5 km de piste pour atteindre le barrage, soit 5 km aller-retour en environ 1h30, hors pauses."
          ]
        ]
      },
      "en": {
        "title": "La Verne dam, La Môle: walking access and reservoir views",
        "description": "Walk to La Verne dam in La Môle: Chemin de Saint-Julien approach, around 5 km return and wooded Maures scenery. Swimming, fishing and boating prohibited.",
        "intro": "At La Verne dam, water is surrounded by wooded hills rather than beach scenery. This drinking-water reservoir makes a rewarding walking stop in La Môle. Our idea: come to walk and observe, leaving room for the return journey and a village break afterwards.",
        "facts": [
          [
            "Approach",
            "Chemin de Saint-Julien, 83310 La Môle"
          ],
          [
            "Listed walk",
            "5 km return; around 1½ hours"
          ],
          [
            "From parking",
            "Around 2½ km on foot to the dam"
          ],
          [
            "Activities",
            "Swimming, fishing and boating prohibited"
          ]
        ],
        "sections": [
          [
            "Water in the Maures landscape",
            "Built in 1991, La Verne dam helps supply drinking water to the area. The reservoir and hills can be observed from accessible paths. Our advice: bring binoculars if you enjoy birdwatching, without expecting guaranteed wildlife sightings."
          ],
          [
            "Getting to La Verne dam",
            "The office describes the approach via Chemin de Saint-Julien, parking near the water works and around 2½ km on a dirt track on foot. Respect authorised spaces and operational access. The map identifies the dam, not the driving destination; follow the official access description."
          ],
          [
            "Allow for the return walk",
            "The outing is listed at 5 km and around 1½ hours; add time for breaks. The surface includes dirt and stones. Bring suitable shoes, water and sun protection, and check weather and forest access. This outing does not include the much longer walk to the Chartreuse de la Verne."
          ],
          [
            "Enjoy the reservoir from the paths",
            "Swimming, fishing and boating are prohibited. Stay on accessible routes and follow notices protecting the drinking-water reserve. Our suggestion: continue with a village stop around the church rather than planning an activity on the water."
          ]
        ],
        "questions": [
          [
            "Can I swim at La Verne dam?",
            "No. Swimming, fishing and boating are prohibited in this drinking-water reservoir."
          ],
          [
            "How far is the walk from parking?",
            "The office lists around 2½ km on a track to reach the dam: 5 km return in around 1½ hours, excluding breaks."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Barrage de la Verne à La Môle",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-mole/barrage-de-la-verne-a-la-mole-5595275"
      },
      {
        "label": "Golfe de Saint-Tropez · la retenue et ses usages",
        "url": "https://www.golfe-saint-tropez-information.com/fr/webzine/une-destination-aux-multiples-facettes"
      },
      {
        "label": "Préfecture du Var · accès aux massifs",
        "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
      }
    ],
    "nearby": [
      "la-mole-village",
      "eglise-sainte-magdeleine-la-mole"
    ]
  },
  "eglise-sainte-magdeleine-la-mole": {
    "verified": "2026-10-16",
    "copy": {
      "fr": {
        "title": "Église Sainte-Magdeleine à La Môle : visite au village",
        "description": "Découvrez l’église Sainte-Magdeleine de La Môle : façade colorée, cadran solaire et patrimoine du village. Adresse et distinction avec la chapelle des hauteurs.",
        "intro": "À La Môle, la façade colorée de l’église et son cadran solaire donnent une raison de s’arrêter au village. Cette étape raconte un autre rythme du Golfe, entre la vallée et les collines des Maures. Notre suggestion : commencer ici pour prendre ses repères, puis choisir une promenade selon le temps disponible.",
        "facts": [
          [
            "Adresse",
            "Place de l’Église, 83310 La Môle"
          ],
          [
            "Patrimoine",
            "Église paroissiale du XIXe siècle"
          ],
          [
            "À observer",
            "Façade colorée et cadran solaire"
          ],
          [
            "À distinguer",
            "La chapelle Sainte-Magdeleine sur les hauteurs"
          ]
        ],
        "sections": [
          [
            "Le village autour de son église",
            "L’église paroissiale appartient au développement du village dans la vallée au XIXe siècle. Sa façade colorée et son cadran solaire attirent le regard. Notre idée : observer les détails depuis la place et prendre le temps d’une courte découverte du village avant de reprendre la route."
          ],
          [
            "Église du village ou chapelle sur les hauteurs ?",
            "Cette fiche concerne l’église de la place de l’Église. La chapelle Sainte-Magdeleine, sur les hauteurs, est un autre monument qui demande une marche à préparer. Vérifiez ce nom et votre destination avant de lancer l’itinéraire, surtout si vous avez rendez-vous ou peu de temps."
          ],
          [
            "Préparer une visite respectueuse",
            "La fiche touristique annonce un accès libre mais ne donne pas d’horaire intérieur détaillé. Confirmez l’ouverture auprès de la mairie ou de la paroisse si vous souhaitez entrer. Respectez les offices et les cérémonies ; la façade et la place peuvent déjà constituer une belle halte."
          ],
          [
            "Relier le village et les paysages de la Verne",
            "Notre suggestion : associer cette étape au barrage de la Verne si vous avez le temps de prévoir la marche aller-retour. Le barrage ne se trouve pas sur la place : consultez sa fiche pour l’approche et le stationnement. Pour une pause courte, restez autour du village et gardez la balade pour une autre journée."
          ]
        ],
        "questions": [
          [
            "Cette église est-elle la chapelle Sainte-Magdeleine ?",
            "Non. L’église paroissiale se situe place de l’Église, dans le village. La chapelle sur les hauteurs est un autre site."
          ],
          [
            "Peut-on visiter l’intérieur tous les jours ?",
            "L’accès est annoncé libre, mais les heures intérieures ne sont pas précisées. Confirmez l’ouverture et les offices avant de venir pour une visite intérieure."
          ]
        ]
      },
      "en": {
        "title": "Sainte-Magdeleine church, La Môle: village heritage visit",
        "description": "Visit Sainte-Magdeleine church in La Môle: a colourful façade, sundial and village heritage. Location and the distinction from the chapel in the hills.",
        "intro": "In La Môle, the colourful church façade and sundial give you a reason to stop in the village. This is another rhythm of the Golfe, between the valley and the Maures hills. Our suggestion: start here to find your bearings, then choose a walk around the time available.",
        "facts": [
          [
            "Address",
            "Place de l’Église, 83310 La Môle"
          ],
          [
            "Heritage",
            "19th-century parish church"
          ],
          [
            "Look for",
            "Colourful façade and sundial"
          ],
          [
            "Separate site",
            "Sainte-Magdeleine chapel in the hills"
          ]
        ],
        "sections": [
          [
            "A village around its church",
            "The parish church belongs to the 19th-century development of the village in the valley. Its colourful façade and sundial draw the eye. Our idea: look at the details from the square and take time for a short village visit before returning to the road."
          ],
          [
            "Village church or hilltop chapel?",
            "This page covers the church on Place de l’Église. Sainte-Magdeleine chapel in the hills is a different monument requiring a planned walk. Check both the name and destination before starting directions, especially if you have an appointment or limited time."
          ],
          [
            "Plan a respectful visit",
            "The tourist listing describes free access but gives no detailed interior hours. Confirm opening with the town hall or parish if you want to enter. Respect services and ceremonies; the façade and square already make a worthwhile short stop."
          ],
          [
            "Combine the village with La Verne scenery",
            "Our suggestion: pair this stop with La Verne dam if you have time for the return walk. The dam is not on the square; consult its page for approach and parking. For a short break, stay in the village and save the walk for another day."
          ]
        ],
        "questions": [
          [
            "Is this Sainte-Magdeleine chapel?",
            "No. The parish church stands on Place de l’Église in the village. The chapel in the hills is a separate site."
          ],
          [
            "Can I visit inside every day?",
            "Free access is listed, but detailed interior hours are not provided. Confirm opening and service times before coming specifically to enter."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Source touristique officielle · Église Sainte-Magdeleine de La Môle",
        "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-mole/eglise-sainte-magdeleine-6562261"
      },
      {
        "label": "Mairie de La Mole · histoire du village",
        "url": "https://www.lamole.fr/fiche-didentite/"
      }
    ],
    "nearby": [
      "la-mole-village",
      "barrage-de-la-verne"
    ]
  }
};

export const cavalaireMoleSignatures = {
  "plage-de-bonporteau": {
    "fr": {
      "subtitle": "LA CRIQUE CHANGE LE RYTHME.",
      "quote": "DU SABLE, DES ROCHERS, UNE AUTRE CAVALAIRE.",
      "rhythm": "DESCENDRE. RESPIRER. PRENDRE LE TEMPS.",
      "dark": "LA REMONTÉE FAIT PARTIE DE LA JOURNÉE.",
      "close": "BONPORTEAU MÉRITE PLUS QU’UN DÉTOUR."
    },
    "en": {
      "subtitle": "THE COVE CHANGES THE PACE.",
      "quote": "SAND. ROCKS. ANOTHER CAVALAIRE.",
      "rhythm": "WALK DOWN. BREATHE. TAKE YOUR TIME.",
      "dark": "THE CLIMB BACK IS PART OF THE DAY.",
      "close": "GIVE BONPORTEAU MORE THAN A QUICK DETOUR."
    }
  },
  "port-heraclea-cavalaire": {
    "fr": {
      "subtitle": "LA JOURNÉE PREND LE LARGE.",
      "quote": "LES QUAIS DONNENT RENDEZ-VOUS À LA MER.",
      "rhythm": "FLÂNER. REGARDER. PRÉPARER L’EMBARQUEMENT.",
      "dark": "CHAQUE SORTIE A SON POINT DE DÉPART.",
      "close": "CAVALAIRE, CÔTÉ BATEAUX."
    },
    "en": {
      "subtitle": "THE DAY OPENS ONTO THE SEA.",
      "quote": "MEET THE MEDITERRANEAN ON THE QUAYS.",
      "rhythm": "STROLL. WATCH. PLAN YOUR DEPARTURE.",
      "dark": "EVERY TRIP HAS ITS OWN BOARDING POINT.",
      "close": "CAVALAIRE, HARBOUR SIDE."
    }
  },
  "plage-centre-ville-cavalaire": {
    "fr": {
      "subtitle": "LA MER À DEUX PAS DU CENTRE.",
      "quote": "UNE SERVIETTE, UNE PROMENADE, LE PORT AU BOUT.",
      "rhythm": "LE SABLE. LA PAUSE. LES QUAIS.",
      "dark": "LA SURVEILLANCE SUIT LA SAISON.",
      "close": "UNE JOURNÉE SIMPLE, LES PIEDS DANS LE SABLE."
    },
    "en": {
      "subtitle": "THE SEA, STEPS FROM THE CENTRE.",
      "quote": "A TOWEL. A PROMENADE. THE HARBOUR BEYOND.",
      "rhythm": "SAND. A BREAK. THE QUAYS.",
      "dark": "LIFEGUARD COVER FOLLOWS THE SEASON.",
      "close": "AN EASY DAY WITH YOUR FEET IN THE SAND."
    }
  },
  "sentiers-corniche-des-maures": {
    "fr": {
      "subtitle": "LA MER SE DÉCOUVRE AUSSI EN MARCHANT.",
      "quote": "BONPORTEAU, LE FENOUILLET, L’HORIZON.",
      "rhythm": "CHOISIR LE TRACÉ. MARCHER. CONTEMPLER.",
      "dark": "TROIS OU HUIT KILOMÈTRES, CE N’EST PAS LA MÊME SORTIE.",
      "close": "LA CORNICHE MÉRITE QU’ON PRENNE SON TEMPS."
    },
    "en": {
      "subtitle": "THE SEA HAS A WALKING SIDE TOO.",
      "quote": "BONPORTEAU. FENOUILLET. THE HORIZON.",
      "rhythm": "CHOOSE A ROUTE. WALK. LOOK OUT.",
      "dark": "THREE OR EIGHT KILOMETRES MAKES A DIFFERENCE.",
      "close": "GIVE THE CORNICHE YOUR TIME."
    }
  },
  "barrage-de-la-verne": {
    "fr": {
      "subtitle": "LE GOLFE A AUSSI SON LAC.",
      "quote": "DE L’EAU, DES COLLINES, LE TEMPS DE MARCHER.",
      "rhythm": "REJOINDRE LA RETENUE. REGARDER. REVENIR.",
      "dark": "UNE RÉSERVE D’EAU, PAS UNE PLAGE.",
      "close": "LA MÔLE, AU RYTHME DES MAURES."
    },
    "en": {
      "subtitle": "THE GOLFE HAS A RESERVOIR SIDE.",
      "quote": "WATER. HILLS. TIME TO WALK.",
      "rhythm": "REACH THE WATER. LOOK OUT. WALK BACK.",
      "dark": "A DRINKING-WATER RESERVE, NOT A BEACH.",
      "close": "LA MÔLE AT THE PACE OF THE MAURES."
    }
  },
  "eglise-sainte-magdeleine-la-mole": {
    "fr": {
      "subtitle": "LE VILLAGE INVITE À S’ARRÊTER.",
      "quote": "UNE FAÇADE COLORÉE, UN AUTRE RYTHME DU GOLFE.",
      "rhythm": "LA PLACE. LE CADRAN. LA PROMENADE.",
      "dark": "L’ÉGLISE EST AU VILLAGE, LA CHAPELLE SUR LES HAUTEURS.",
      "close": "UNE HALTE À LA MÔLE AVANT LES MAURES."
    },
    "en": {
      "subtitle": "THE VILLAGE INVITES A PAUSE.",
      "quote": "A COLOURFUL FAÇADE. ANOTHER GOLFE RHYTHM.",
      "rhythm": "THE SQUARE. THE SUNDIAL. THE WALK.",
      "dark": "THE CHURCH IS IN THE VILLAGE, THE CHAPEL IN THE HILLS.",
      "close": "A LA MÔLE STOP BEFORE THE MAURES."
    }
  }
};

export const cavalaireMoleMapPoints:Record<string,MapPoint[]> = {
  "plage-de-bonporteau": [
    {
      "id": "plage-de-bonporteau",
      "label": {
        "fr": "Plage de Bonporteau",
        "en": "Plage de Bonporteau"
      },
      "latitude": 43.16509,
      "longitude": 6.520798,
      "source": "https://www.cavalairesurmer.fr/plage-de-bonporteau-823841/",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Plage de Bonporteau, 83240 Cavalaire-sur-Mer, France",
      "note": {
        "fr": "Repère officiel du lieu ou secteur. Il ne désigne pas une place de parking ; vérifiez les accès et les conditions du jour.",
        "en": "Official location or area reference, not a parking space. Check access and daily conditions."
      }
    }
  ],
  "port-heraclea-cavalaire": [
    {
      "id": "port-heraclea-cavalaire",
      "label": {
        "fr": "Port Héracléa de Cavalaire",
        "en": "Port Héracléa de Cavalaire"
      },
      "latitude": 43.1727,
      "longitude": 6.537,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cavalaire-sur-mer/port-heraclea-823746",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Maison de la Mer, 83240 Cavalaire-sur-Mer, France",
      "note": {
        "fr": "Repère officiel du lieu ou secteur. Il ne désigne pas une place de parking ; vérifiez les accès et les conditions du jour.",
        "en": "Official location or area reference, not a parking space. Check access and daily conditions."
      }
    }
  ],
  "plage-centre-ville-cavalaire": [
    {
      "id": "plage-centre-ville-cavalaire",
      "label": {
        "fr": "Plage du Centre-Ville de Cavalaire",
        "en": "Plage du Centre-Ville de Cavalaire"
      },
      "latitude": 43.1761147,
      "longitude": 6.534877,
      "source": "https://www.golfe-sainttropez.fr/plage/centre-ville/",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Plage du Centre-Ville, 83240 Cavalaire-sur-Mer, France",
      "note": {
        "fr": "Repère officiel du lieu ou secteur. Il ne désigne pas une place de parking ; vérifiez les accès et les conditions du jour.",
        "en": "Official location or area reference, not a parking space. Check access and daily conditions."
      }
    }
  ],
  "sentiers-corniche-des-maures": [
    {
      "id": "sentiers-corniche-des-maures",
      "label": {
        "fr": "Sentiers de la Corniche des Maures",
        "en": "Sentiers de la Corniche des Maures"
      },
      "latitude": 43.165226,
      "longitude": 6.520521,
      "source": "https://www.cavalairesurmer.fr/les-sentiers-de-la-corniche-des-maures-823781/",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Départ Bonporteau, 83240 Cavalaire-sur-Mer, France",
      "note": {
        "fr": "Repère officiel du lieu ou secteur. Il ne désigne pas une place de parking ; vérifiez les accès et les conditions du jour.",
        "en": "Official location or area reference, not a parking space. Check access and daily conditions."
      }
    }
  ],
  "barrage-de-la-verne": [
    {
      "id": "barrage-de-la-verne",
      "label": {
        "fr": "Barrage de la Verne à La Môle",
        "en": "Barrage de la Verne à La Môle"
      },
      "latitude": 43.2283,
      "longitude": 6.44443,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/la-mole/barrage-de-la-verne-a-la-mole-5595275",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Chemin de Saint-Julien, 83310 La Môle, France",
      "note": {
        "fr": "Repère du barrage, pas du stationnement. L’office indique environ 2,5 km de piste à pied depuis les abords de l’usine des eaux ; consultez les indications officielles.",
        "en": "Dam reference, not parking. The office describes around 2½ km on foot from near the water works; consult official access instructions."
      }
    }
  ],
  "eglise-sainte-magdeleine-la-mole": [
    {
      "id": "eglise-sainte-magdeleine-la-mole",
      "label": {
        "fr": "Église Sainte-Magdeleine de La Môle",
        "en": "Église Sainte-Magdeleine de La Môle"
      },
      "latitude": 43.2087,
      "longitude": 6.46533,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-mole/eglise-sainte-magdeleine-6562261",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Place de l’Église, 83310 La Môle, France",
      "note": {
        "fr": "Repère officiel du lieu ou secteur. Il ne désigne pas une place de parking ; vérifiez les accès et les conditions du jour.",
        "en": "Official location or area reference, not a parking space. Check access and daily conditions."
      }
    }
  ]
};

const cavalaire=villageMedia['cavalaire-village'],mole=villageMedia['la-mole-village'];
const harbour:VillagePhoto={src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Aerial_view_of_the_bay_and_harbor_of_Cavalaire-sur-Mer%2C_France_%2851695661404%29.jpg/1280px-Aerial_view_of_the_bay_and_harbor_of_Cavalaire-sur-Mer%2C_France_%2851695661404%29.jpg',alt:'Vue aérienne de la baie et du port de Cavalaire en 2021',caption:{fr:'La baie et le port de Cavalaire vus du ciel (2021)',en:'Aerial view of Cavalaire bay and harbour (2021)'},credit:'dronepicr / Wikimedia Commons',license:'CC BY 2.0',licenseUrl:'https://creativecommons.org/licenses/by/2.0/',source:'https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_bay_and_harbor_of_Cavalaire-sur-Mer,_France_(51695661404).jpg'};
export const cavalaireMoleMedia:Record<string,VillagePhoto[]>={
 'plage-de-bonporteau':[{...cavalaire[0]}],
 'port-heraclea-cavalaire':[harbour],
 'plage-centre-ville-cavalaire':[{...harbour,contextual:true,alt:'La baie et le port de Cavalaire en 2021 — vue du secteur, pas d’un accès précis à la plage du Centre-Ville',caption:{fr:'La baie et le port de Cavalaire (2021) — vue du secteur, pas d’un accès précis à la plage du Centre-Ville',en:'Cavalaire bay and harbour (2021) — area view, not a specific town-centre beach entrance'}}],
 'sentiers-corniche-des-maures':[{...cavalaire[2],contextual:true,alt:'Baie de Bonporteau — vue du secteur de départ, pas de l’ensemble des sentiers de la Corniche des Maures',caption:{fr:'Bonporteau — vue du secteur de départ, pas de l’ensemble des sentiers de la Corniche des Maures',en:'Bonporteau — starting-area view, not the complete Corniche des Maures trails'}}],
 'barrage-de-la-verne':[{...mole[1],alt:'Lac de retenue de la Verne à La Môle, photographie de 2013',caption:{fr:'Le lac de retenue de la Verne à La Môle (2013)',en:'La Verne reservoir, La Môle (2013)'}}],
 'eglise-sainte-magdeleine-la-mole':[{...mole[0],alt:'Église Sainte-Magdeleine au village de La Môle, photographie de 2011',caption:{fr:'L’église Sainte-Magdeleine au village de La Môle (2011)',en:'Sainte-Magdeleine church in La Môle village (2011)'}}]
};
