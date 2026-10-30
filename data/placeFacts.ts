import {newHikingFacts} from './newHikingPlaces';
import {coastalDiscoveryFacts} from './coastalDiscoveryPlaces';
import {localDiscoveriesFacts} from './localDiscoveriesPlaces';
import {localLifeFacts} from './localLifePlaces';
import {associationFacts} from './associationPlaces';
import {cogolinRayolFacts} from './cogolinRayolPlaces';
import {saintTropezFacts} from './saintTropezPlaces';
import {ramatuelleGassinFacts} from './ramatuelleGassinPlaces';
import {freinetCroixFacts} from './freinetCroixPlaces';
import {cavalaireMoleFacts} from './cavalaireMolePlaces';
import {grimaudFacts} from './grimaudPlaces';
import {sainteMaximeFacts} from './sainteMaximePlaces';
import {planDeLaTourFacts} from './planDeLaTourPlaces';
import {newExperienceFacts} from "./newExperienceFacts";
import type {Locale} from '../lib/i18n';
export type PlaceFactCopy={title:string;description:string;intro:string;facts:[string,string][];sections:[string,string][];questions:[string,string][]};
export type PlaceFacts={verified:string;copy:Record<Locale,PlaceFactCopy>;sources:{label:string;url:string}[];nearby:string[]};
export const placeFacts:Record<string,PlaceFacts> = {
 ...newHikingFacts,
 ...associationFacts,
 ...localLifeFacts,
 ...localDiscoveriesFacts,
 ...coastalDiscoveryFacts,
  ...newExperienceFacts,
  ...planDeLaTourFacts,
 ...sainteMaximeFacts,
 ...grimaudFacts,
 ...cavalaireMoleFacts,
 ...freinetCroixFacts,
 ...ramatuelleGassinFacts,
 ...cogolinRayolFacts,
 ...saintTropezFacts,
  "grimaud-village": {
    "verified": "2026-10-13",
    "copy": {
      "fr": {
        "title": "Visiter Grimaud : village, château et conseils pratiques",
        "description": "Que voir à Grimaud village ? Château, ruelles, marché du jeudi et conseils pour préparer une visite à pied, sans confondre avec Port Grimaud.",
        "intro": "Grimaud village se découvre en montant des ruelles jusqu’aux ruines du château. Pour une première visite, choisissez une promenade dans le vieux centre et gardez du temps pour le panorama. Port Grimaud, au bord de l’eau, est une autre étape de la même commune.",
        "facts": [
          [
            "À voir",
            "Vieux village, château, église Saint-Michel"
          ],
          [
            "Marché",
            "Jeudi matin au village"
          ],
          [
            "Rythme conseillé",
            "Une demi-journée, à adapter à votre marche"
          ],
          [
            "À distinguer",
            "Le village perché et Port Grimaud"
          ]
        ],
        "sections": [
          [
            "Que voir dans le village de Grimaud ?",
            "Le château donne un repère à la visite, mais les ruelles méritent aussi votre attention. Repérez l’église Saint-Michel, alternez petites places et passages, puis montez vers les vestiges si vous êtes à l’aise avec le relief. Le panorama permet de comprendre la relation entre le village, la plaine et le Golfe."
          ],
          [
            "Accès et stationnement à Grimaud",
            "Préparez votre arrivée au village plutôt qu’à Port Grimaud : les deux noms ne désignent pas le même point de départ. Consultez le plan et les conditions de stationnement de l’office avant le trajet. Nous ne donnons pas de tarif permanent : les parkings et les règles peuvent changer selon la période. Une fois garé, organisez la visite à pied."
          ],
          [
            "Le marché du jeudi matin",
            "Le marché du village a lieu le jeudi matin ; l’office indique la place de l’Église et la place Vieille en été. Pour mêler promenade et achats, commencez par les étals, puis continuez dans les ruelles. Si le marché est votre raison de venir, vérifiez sa tenue dans l’agenda officiel avant de partir."
          ],
          [
            "Notre proposition pour une visite courte",
            "Commencez au centre, prenez une première boucle dans les ruelles, puis choisissez de monter au château ou de rester autour des places. Gardez la pause pour la fin afin d’ajuster le programme à la chaleur et à votre fatigue. Avec de jeunes enfants, privilégiez une petite boucle ; cette suggestion n’est pas un parcours d’accessibilité certifié."
          ]
        ],
        "questions": [
          [
            "Grimaud et Port Grimaud, est-ce le même endroit ?",
            "Ils appartiennent à la même commune, mais le vieux village est perché dans les terres et Port Grimaud est une cité lacustre sur le littoral. Préparez deux étapes distinctes."
          ],
          [
            "Peut-on visiter Grimaud sans monter au château ?",
            "Oui. Vous pouvez concentrer votre promenade sur les ruelles et les places. La montée au château complète la visite ; elle ne doit pas imposer votre programme."
          ]
        ]
      },
      "en": {
        "title": "Visiting Grimaud: village, castle and practical tips",
        "description": "Explore Grimaud village: castle ruins, old streets, Thursday market and practical advice for a walk, with Port Grimaud treated as a separate stop.",
        "intro": "Grimaud village rises through narrow streets to its ruined castle. Start with the old centre and leave time for the view. Port Grimaud, beside the water, is a separate stop within the same commune.",
        "facts": [
          [
            "Highlights",
            "Old village, castle, Saint-Michel church"
          ],
          [
            "Market",
            "Thursday morning in the village"
          ],
          [
            "Suggested pace",
            "Half a day, adjusted to your walking pace"
          ],
          [
            "Separate stops",
            "Hilltop village and Port Grimaud"
          ]
        ],
        "sections": [
          [
            "What to see in Grimaud village",
            "Use the castle as your landmark, but allow time for the lanes too. Look for Saint-Michel church and the small squares, then climb towards the ruins if you are comfortable with the hillside. The view helps connect the village with the plain and the Golfe."
          ],
          [
            "Getting there and parking",
            "Plan your arrival in the village, rather than Port Grimaud. Check the tourist office’s map and parking conditions before travelling: arrangements and charges may change with the season. Once parked, explore on foot."
          ],
          [
            "The Thursday market",
            "The village market runs on Thursday mornings; the tourist office lists Place de l’Église and Place Vieille in summer. Visit the stalls before exploring the lanes. If the market is your main reason for coming, check the official calendar first."
          ],
          [
            "Our suggestion for a short visit",
            "Start in the centre, walk a first loop through the streets, then choose between climbing to the castle and staying around the squares. Leave a break until later so you can adapt to the heat and your energy. With small children, keep the loop short; this is not a certified accessible route."
          ]
        ],
        "questions": [
          [
            "Are Grimaud and Port Grimaud the same place?",
            "They belong to the same commune, but the old village is on a hill inland and Port Grimaud is a waterside town. Plan them as separate stops."
          ],
          [
            "Do I have to climb to the castle?",
            "No. The streets and squares can be your main visit. Add the climb only if it suits your walking pace."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Grimaud : château",
        "url": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-chateau/"
      },
      {
        "label": "Accès et stationnement",
        "url": "https://www.grimaud-provence.com/pratique/acces-et-transports/"
      },
      {
        "label": "Marchés de Grimaud",
        "url": "https://www.grimaud-provence.com/decouvrez/saveurs-et-savoir-faire-dici/marche-provencal/"
      }
    ],
    "nearby": [
      "chateau-de-grimaud",
      "eglise-saint-michel-grimaud",
      "moulin-saint-roch-grimaud",
      "chapelle-des-penitents-grimaud",
      "port-grimaud",
      "pont-des-fees"
    ]
  },
  "port-grimaud": {
    "verified": "2026-10-13",
    "copy": {
      "fr": {
        "title": "Visiter Port Grimaud : canaux, marché et accès",
        "description": "Préparez votre visite de Port Grimaud : canaux, places, marché saisonnier, parking et balade en bateau, avec les sources officielles à consulter.",
        "intro": "À Port Grimaud, la visite suit les canaux, les ponts et les façades colorées. Cette cité lacustre se trouve sur le littoral de la commune de Grimaud. Venez pour une promenade au bord de l’eau ; une sortie en bateau peut compléter la découverte si le service fonctionne pendant votre séjour.",
        "facts": [
          [
            "Cadre",
            "Cité lacustre dans la commune de Grimaud"
          ],
          [
            "À voir",
            "Canaux, places et ponts"
          ],
          [
            "Marché",
            "Jeudi et dimanche matin, d’avril à octobre"
          ],
          [
            "Rythme conseillé",
            "Quelques heures, ou plus avec une activité"
          ]
        ],
        "sections": [
          [
            "Que voir à Port Grimaud ?",
            "Dessiné par l’architecte François Spoerry, Port Grimaud a commencé à être construit en 1966. Pour une première promenade, reliez la place des Artisans à la place du Marché et regardez les façades depuis les ponts. L’église Saint-François d’Assise est un autre repère. Respectez la signalisation, les espaces réservés et la vie des habitants."
          ],
          [
            "Venir et choisir son parking",
            "Repérez Port Grimaud sur votre itinéraire : le village historique de Grimaud se visite séparément. L’office recense les solutions de stationnement et les transports. Vérifiez les conditions de votre parking à la date choisie, puis poursuivez à pied. Pour une arrivée en navette maritime, consultez les horaires aller et retour avant de réserver une autre activité."
          ],
          [
            "Marché et balade en bateau",
            "Le marché de Port Grimaud est annoncé le jeudi et le dimanche matin d’avril à octobre. Hors de cette période, construisez votre visite autour des canaux plutôt que d’un marché supposé ouvert. Une balade dans la cité et une navette vers Saint-Tropez sont des services différents : comparez le parcours, la durée, les tarifs et la saison auprès de l’opérateur."
          ],
          [
            "Notre proposition pour quelques heures",
            "Commencez par les places et les ponts, faites une pause, puis choisissez une activité sur l’eau ou une promenade supplémentaire. Avec des enfants, gardez le bord des canaux sous surveillance et prévoyez une pause à l’ombre. Sous la pluie ou par vent fort, raccourcissez le programme et vérifiez les départs des bateaux."
          ]
        ],
        "questions": [
          [
            "Port Grimaud est-il le village de Grimaud ?",
            "Non : c’est la cité lacustre de la même commune, située sur le littoral. Le village perché possède sa propre fiche."
          ],
          [
            "Le marché de Port Grimaud a-t-il lieu toute l’année ?",
            "L’office l’annonce d’avril à octobre, le jeudi et le dimanche matin. Consultez l’agenda pour votre date."
          ],
          [
            "Faut-il prendre un bateau pour découvrir Port Grimaud ?",
            "Vous pouvez commencer par une promenade à pied. Le bateau apporte un autre point de vue, avec des conditions et un tarif à vérifier auprès du prestataire."
          ]
        ]
      },
      "en": {
        "title": "Visiting Port Grimaud: canals, market and access",
        "description": "Plan a visit to Port Grimaud: canals, squares, seasonal market, parking and boat trips, with official sources to check before travelling.",
        "intro": "Explore Port Grimaud through its canals, bridges and colourful facades. This waterside town belongs to the commune of Grimaud. Begin with a walk; add a boat trip if the service operates during your stay.",
        "facts": [
          [
            "Setting",
            "Waterside town in the commune of Grimaud"
          ],
          [
            "Highlights",
            "Canals, squares and bridges"
          ],
          [
            "Market",
            "Thursday and Sunday mornings, April–October"
          ],
          [
            "Suggested pace",
            "A few hours, longer with an activity"
          ]
        ],
        "sections": [
          [
            "What to see in Port Grimaud",
            "Designed by François Spoerry, construction began in 1966. For a first walk, connect Place des Artisans with Place du Marché and look at the facades from the bridges. Saint-François d’Assise church is another landmark. Follow signs and respect private areas and residents."
          ],
          [
            "Getting there and choosing parking",
            "Locate Port Grimaud on your route: historic Grimaud village is a separate visit. Check the tourist office’s transport and parking information for your dates, then continue on foot. If arriving by boat shuttle, check both outward and return departures before booking another activity."
          ],
          [
            "Market and boat trips",
            "The market is listed on Thursday and Sunday mornings from April to October. Outside that season, plan around the canals rather than assuming a market will be running. A canal tour and a shuttle to Saint-Tropez are different services: compare routes, duration, prices and operating seasons with the provider."
          ],
          [
            "Our suggestion for a few hours",
            "Start with the squares and bridges, take a break, then choose an activity on the water or a further walk. Keep children close beside canals and plan a shaded break. In rain or strong wind, shorten your programme and check boat departures."
          ]
        ],
        "questions": [
          [
            "Is Port Grimaud the old village of Grimaud?",
            "No. It is the waterside town within the same commune. The hilltop village has its own page."
          ],
          [
            "Does the market run all year?",
            "The tourist office lists Thursday and Sunday mornings from April to October. Check the calendar for your date."
          ],
          [
            "Do I need a boat to explore Port Grimaud?",
            "You can start on foot. A boat offers another viewpoint; check the service and price with its operator."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Port Grimaud : office de tourisme",
        "url": "https://www.grimaud-provence.com/decouvrez/port-grimaud-une-cite-lacustre-unique/"
      },
      {
        "label": "Accès et stationnement",
        "url": "https://www.grimaud-provence.com/pratique/acces-et-transports/"
      },
      {
        "label": "Marchés de Grimaud",
        "url": "https://www.grimaud-provence.com/decouvrez/saveurs-et-savoir-faire-dici/marche-provencal/"
      }
    ],
    "nearby": [
      "grimaud-village",
      "sainte-maxime-village",
      "cogolin-village"
    ]
  },
  "sainte-maxime-village": {
    "verified": "2026-10-30",
    "copy": {
      "fr": {
        "title": "Visiter Sainte-Maxime : vieux centre, Tour Carrée et bateau",
        "description": "Découvrez Sainte-Maxime : port, vieux centre, visite de la Tour Carrée et bateau vers Saint-Tropez. Repères pour préparer les visites et les trajets.",
        "intro": "Sainte-Maxime permet d’organiser une visite autour du port, du vieux centre et du front de mer. Pour une première découverte, restez dans ce secteur avant de choisir une autre plage de la commune. Vous éviterez de transformer une promenade courte en journée de déplacements.",
        "facts": [
          [
            "À voir",
            "Port, vieux centre et Tour Carrée"
          ],
          [
            "Balade",
            "Front de mer puis ruelles du centre"
          ],
          [
            "Autre étape",
            "Croisette et jardin des Myrtes"
          ],
          [
            "Rythme conseillé",
            "Une demi-journée, sans toutes les plages"
          ]
        ],
        "sections": [
          [
            "La Tour Carrée, Maison des Traditions",
            "Sur la place Mireille de Germond, la Tour Carrée donne un repère au centre ancien. L’office propose des visites guidées de cette ancienne tour, aujourd’hui Maison des Traditions. La réservation est obligatoire et la visite annoncée n’est pas accessible en poussette : consultez les prochaines séances avant de venir."
          ],
          [
            "Quelle plage associer à la visite ?",
            "Distinguez une pause sur le littoral du centre et une sortie vers une autre plage. La Croisette permet de regarder aussi du côté du jardin des Myrtes, situé en face. Pour choisir un autre secteur, comparez l’accès depuis votre hébergement, les services souhaités et les conditions du jour. Une photo de plage ne garantit ni baignade ni surveillance."
          ],
          [
            "Rejoindre Saint-Tropez en bateau depuis Sainte-Maxime",
            "Les Bateaux Verts annoncent cette liaison toute l’année. Consultez les horaires pour la date choisie et organisez aussi votre retour. Au départ de Sainte-Maxime, l’opérateur indique que les billets peuvent s’acheter le jour même ou la veille ; les excursions se préparent séparément, avec réservation conseillée."
          ],
          [
            "Notre proposition avec des enfants",
            "Commencez par un circuit court entre le port et le centre, puis faites une pause avant de décider si vous ajoutez une plage. Prévoyez de l’eau et évitez d’accumuler les étapes pendant les heures chaudes. Si la météo change, privilégiez une visite intérieure dont vous avez confirmé l’ouverture plutôt qu’un long trajet sans solution de repli."
          ]
        ],
        "questions": [
          [
            "Faut-il réserver la visite de la Tour Carrée ?",
            "Oui, la visite guidée présentée par l’office est sur réservation obligatoire. Vérifiez les dates disponibles."
          ],
          [
            "Les bateaux vers Saint-Tropez circulent-ils toute l’année ?",
            "Les Bateaux Verts annoncent la liaison Sainte-Maxime–Saint-Tropez toute l’année. Consultez les horaires et conditions pour votre date de voyage."
          ],
          [
            "Peut-on visiter la Tour Carrée avec une poussette ?",
            "La fiche de la visite guidée indique qu’elle n’est pas accessible en poussette. Contactez l’office pour préparer une autre formule adaptée à votre groupe."
          ]
        ]
      },
      "en": {
        "title": "Visiting Sainte-Maxime: old town, Tour Carrée and boats",
        "description": "Discover Sainte-Maxime: harbour, old town, guided Tour Carrée visits and boats to Saint-Tropez, with practical tips for planning visits and journeys.",
        "intro": "Build your first Sainte-Maxime visit around the harbour, old centre and waterfront. Explore this area before choosing another beach in the commune. A short walk need not become a day spent travelling.",
        "facts": [
          [
            "Highlights",
            "Harbour, old centre and Tour Carrée"
          ],
          [
            "Walk",
            "Waterfront and centre streets"
          ],
          [
            "Another stop",
            "Croisette and Myrtes garden"
          ],
          [
            "Suggested pace",
            "Half a day, without every beach"
          ]
        ],
        "sections": [
          [
            "Tour Carrée, the Maison des Traditions",
            "On Place Mireille de Germond, Tour Carrée is a landmark in the old centre. The tourist office offers guided visits to this former tower, now the Maison des Traditions. Booking is compulsory and the advertised visit is unsuitable for pushchairs: check upcoming sessions before travelling."
          ],
          [
            "Choosing a beach for your visit",
            "Distinguish a break by the central waterfront from a trip to another beach. At La Croisette, Myrtes garden is opposite. For other areas, compare access from your accommodation, the facilities you need and conditions on the day. A beach photograph does not guarantee swimming conditions or lifeguards."
          ],
          [
            "Taking a boat from Sainte-Maxime to Saint-Tropez",
            "Les Bateaux Verts advertises this connection year-round. Check the timetable for your date and plan the return journey too. For departures from Sainte-Maxime, the operator says tickets can be bought on the day or the previous day; excursions are separate outings for which advance booking is advised."
          ],
          [
            "Our suggestion with children",
            "Begin with a short harbour-and-centre loop. Take a break before deciding whether to add a beach. Bring water and avoid too many stops in the hottest hours. If the weather changes, choose an indoor visit with confirmed opening rather than a long journey without a fallback."
          ]
        ],
        "questions": [
          [
            "Do I need to book a Tour Carrée visit?",
            "Yes. Booking is compulsory for the guided visit advertised by the tourist office. Check available dates."
          ],
          [
            "Do boats to Saint-Tropez operate all year?",
            "Les Bateaux Verts advertises the Sainte-Maxime–Saint-Tropez route year-round. Check the timetable and conditions for your travel date."
          ],
          [
            "Can I take a pushchair into Tour Carrée?",
            "The guided-tour listing states that pushchairs are not accommodated. Contact the tourist office to plan another option suited to your group."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Sainte-Maxime : destination officielle",
        "url": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/sainte-maxime"
      },
      {
        "label": "Plage de la Croisette",
        "url": "https://www.sainte-maxime.com/explorer/la-mer-a-linfini/toutes-les-plages-de-sainte-maxime/plage-de-la-croisette/"
      },
      {
        "label": "Navettes maritimes",
        "url": "https://www.bateauxverts.com/"
      },
      {
        "label": "Sainte-Maxime · Tour Carrée",
        "url": "https://www.sainte-maxime.com/agenda/visite-guidee-de-la-tour-carree-maison-des-traditions-sainte-maxime-fr-6729049/"
      },
      {
        "label": "Les Bateaux Verts · horaires / timetables",
        "url": "https://www.bateauxverts.com/horaires-tarifs/"
      },
      {
        "label": "Les Bateaux Verts · FAQ",
        "url": "https://www.bateauxverts.com/faq/"
      }
    ],
    "nearby": [
      "tour-carree-sainte-maxime",
      "bateaux-verts-excursion",
      "pointe-des-sardinaux"
    ]
  },
  "cogolin-village": {
    "verified": "2026-10-30",
    "copy": {
      "fr": {
        "title": "Visiter Cogolin : vieux village, patrimoine et artisanat",
        "description": "Que voir à Cogolin ? Tour de l’Horloge, fontaines et savoir-faire : parcours du vieux village et conseils pour préparer la découverte des artisans.",
        "intro": "Cogolin se découvre par ses ruelles en pente, son patrimoine et ses savoir-faire. Pour une première visite, choisissez le vieux village. Les Marines de Cogolin, sur le littoral, composent une autre étape : ne les confondez pas avec le centre historique.",
        "facts": [
          [
            "À voir",
            "Saint-Sauveur et Tour de l’Horloge"
          ],
          [
            "Marché",
            "Mercredi et samedi matin"
          ],
          [
            "Savoir-faire",
            "Tapis, pipes et anches"
          ],
          [
            "Rythme conseillé",
            "Quelques heures dans le vieux village"
          ]
        ],
        "sections": [
          [
            "Découvrir le vieux Cogolin à pied",
            "La Tour de l’Horloge marque une ancienne entrée du village médiéval. Pour prolonger la promenade, repérez les fontaines des places Tôti et Victor Hugo. Un guide du patrimoine est disponible à l’office ; demandez les prochaines balades contées et leurs modalités d’inscription au 04 94 55 01 10."
          ],
          [
            "Le marché provençal de Cogolin",
            "Le marché est annoncé le mercredi matin place Victor-Hugo et le samedi matin place de la République. Pour une visite qui mêle courses et promenade, commencez par les étals puis rejoignez le vieux village. Vérifiez les informations officielles avant le déplacement si le marché est votre objectif principal."
          ],
          [
            "Tapis, pipes et anches : choisir sa découverte",
            "Les savoir-faire de Cogolin se distinguent par leurs matières : bruyère pour les pipes Courrieu, canne pour les anches Rigotti, tissage pour la manufacture de tapis. Choisissez le métier qui vous intéresse, puis contactez l’établissement : une activité de production ne garantit pas une visite libre des ateliers."
          ],
          [
            "Notre proposition pour une visite courte",
            "Associez le centre ancien à une seule autre étape : le marché si le jour convient, ou une rencontre artisanale confirmée. Gardez les Marines pour un autre moment si vous souhaitez un programme tranquille. Au retour, choisissez une pause près de votre point de départ plutôt que d’ajouter une nouvelle commune par habitude."
          ]
        ],
        "questions": [
          [
            "Où trouver un parcours du vieux Cogolin ?",
            "La mairie signale un guide à l’office de tourisme. Appelez le 04 94 55 01 10 pour connaître les balades accompagnées et les inscriptions."
          ],
          [
            "Quels savoir-faire découvrir à Cogolin ?",
            "La commune met en avant les pipes Courrieu, les anches Rigotti et la manufacture de tapis. Confirmez les possibilités de visite directement avec chaque établissement."
          ],
          [
            "Le vieux village est-il aux Marines de Cogolin ?",
            "Ce sont deux secteurs distincts. Préparez un déplacement entre le centre ancien et les ports plutôt que de les considérer comme une seule promenade."
          ]
        ]
      },
      "en": {
        "title": "Visiting Cogolin: old village, heritage and local crafts",
        "description": "What to see in Cogolin: Tour de l’Horloge, fountains and local crafts, with old-village walking ideas and tips for planning visits to craft businesses.",
        "intro": "Explore Cogolin through its uphill lanes, heritage and craftsmanship. Start in the old village. The coastal Marines de Cogolin are a separate stop, away from the historic centre.",
        "facts": [
          [
            "Highlights",
            "Saint-Sauveur and Tour de l’Horloge"
          ],
          [
            "Market",
            "Wednesday and Saturday mornings"
          ],
          [
            "Crafts",
            "Carpets, pipes and reeds"
          ],
          [
            "Suggested pace",
            "A few hours in the old village"
          ]
        ],
        "sections": [
          [
            "Exploring old Cogolin on foot",
            "Tour de l’Horloge marks a former entrance to the medieval village. Extend your stroll towards the fountains on Place Tôti and Place Victor Hugo. A heritage guide is available from the tourist office; ask about upcoming storytelling walks and registration on +33 4 94 55 01 10."
          ],
          [
            "Cogolin’s Provençal market",
            "The market is listed on Wednesday mornings at Place Victor-Hugo and Saturday mornings at Place de la République. Start at the stalls, then explore the old village. Check official information before travelling if the market is your main reason for coming."
          ],
          [
            "Carpets, pipes and reeds: choose your craft",
            "Cogolin’s crafts use distinctive materials: briar for Courrieu pipes, cane for Rigotti reeds, and weaving at the carpet manufacture. Choose the craft that interests you, then contact the business: an active production workshop does not necessarily offer walk-in visits."
          ],
          [
            "Our suggestion for a short visit",
            "Combine the old centre with just one more stop: the market on the right day or a confirmed craft visit. Leave the Marines for another time if you prefer an unhurried programme. End with a break near your starting point rather than automatically adding another town."
          ]
        ],
        "questions": [
          [
            "Where can I find an old Cogolin walking route?",
            "The council points visitors to a guide at the tourist office. Call +33 4 94 55 01 10 for guided walks and registration."
          ],
          [
            "Which crafts can I discover in Cogolin?",
            "The council highlights Courrieu pipes, Rigotti reeds and the carpet manufacture. Confirm visiting arrangements directly with each business."
          ],
          [
            "Is the old village at Les Marines de Cogolin?",
            "They are separate areas. Plan a journey between the old centre and the ports rather than treating them as one continuous stroll."
          ]
        ]
      }
    },
    "sources": [
      {
        "label": "Cogolin : destination officielle",
        "url": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/cogolin"
      },
      {
        "label": "Marché provençal de Cogolin",
        "url": "https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/marche-provencal-hebdomadaire-3/"
      },
      {
        "label": "Cogolin · village",
        "url": "https://www.cogolin.fr/pages/le-village-de-cogolin/"
      },
      {
        "label": "Cogolin · artisanat / crafts",
        "url": "https://www.cogolin.fr/pages/lartisanat/"
      }
    ],
    "nearby": [
      "tour-horloge-cogolin",
      "eglise-saint-sauveur-cogolin",
      "chapelles-saint-roch-cogolin"
    ]
  }
};
