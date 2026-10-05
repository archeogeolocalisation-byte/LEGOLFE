export type VillageCopy = {sub:string;intro:string;quote:string;body:string;moments:string[][];darkTitle:string;darkBody:string;facts:string[][];best:string[];less:string[]};
export type VillageFeature = {name:string;slug:string;source:string;fr:VillageCopy;en:VillageCopy};
export const villageFeatures:Record<string,VillageFeature> = {
  "sainte-maxime-village": {
    "name": "Sainte-Maxime",
    "slug": "sainte-maxime",
    "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/sainte-maxime",
    "fr": {
      "sub": "LE GOLFE, LES PIEDS DANS L’EAU.",
      "intro": "Un port, une vieille ville et la mer tout près. Sainte-Maxime se choisit pour des vacances qui passent facilement d’une promenade au centre à une pause sur le sable.",
      "quote": "Ici, la journée peut commencer au port et finir face au Golfe.",
      "body": "Autour de la Tour Carrée, le centre garde une échelle agréable pour flâner. Le front de mer donne le fil de la visite ; les autres plages de la commune invitent à changer de décor.",
      "moments": [
        [
          "LE MATIN",
          "Le port et la vieille ville",
          "Partir du port, retrouver la Tour Carrée et prendre le temps de parcourir les rues du centre."
        ],
        [
          "DANS LA JOURNÉE",
          "Une plage selon le programme",
          "Rester près du centre ou prévoir un déplacement vers une autre plage, comme la Nartelle."
        ],
        [
          "EN FIN DE JOURNÉE",
          "Le Golfe en perspective",
          "Revenir sur le front de mer pour une promenade et choisir une table selon l’ambiance recherchée."
        ]
      ],
      "darkTitle": "Face à Saint-Tropez. Avec son propre rythme.",
      "darkBody": "Sainte-Maxime est une destination à part entière. Les liaisons maritimes peuvent compléter le séjour : consultez les horaires et les conditions auprès de l’opérateur avant de prévoir une traversée.",
      "facts": [
        [
          "CENTRE",
          "Port, Tour Carrée et rues de la vieille ville."
        ],
        [
          "PLAGES",
          "Une plage centrale et d’autres secteurs sur le littoral."
        ],
        [
          "À PIED",
          "Choisir un hébergement proche du centre pour les promenades."
        ],
        [
          "DÉPLACEMENTS",
          "Prévoir les accès et le stationnement en saison."
        ]
      ],
      "best": [
        "Des vacances en famille près de la mer",
        "Un séjour entre centre-ville et plages",
        "Les promenades sur le front de mer"
      ],
      "less": [
        "Toutes les plages ne sont pas accessibles à pied depuis le centre",
        "Le front de mer peut être animé en été",
        "Les traversées dépendent des horaires et des conditions"
      ]
    },
    "en": {
      "sub": "THE GOLFE AT THE WATER’S EDGE.",
      "intro": "A harbour, an old town and the sea close at hand. Choose Sainte-Maxime for holidays that move easily from a stroll in the centre to time on the sand.",
      "quote": "A day can begin at the harbour and end looking across the Golfe.",
      "body": "Around Tour Carrée, the centre has a comfortable scale for wandering. Follow the waterfront, then explore another of the town’s beaches for a change of scenery.",
      "moments": [
        [
          "MORNING",
          "Harbour and old town",
          "Start at the harbour, find Tour Carrée and take time to explore the streets of the centre."
        ],
        [
          "DAYTIME",
          "Choose your beach",
          "Stay near the centre or plan a trip to another beach, such as La Nartelle."
        ],
        [
          "LATE AFTERNOON",
          "Looking across the Golfe",
          "Return to the waterfront for a stroll and choose a restaurant to suit your evening."
        ]
      ],
      "darkTitle": "Facing Saint-Tropez. With a rhythm of its own.",
      "darkBody": "Sainte-Maxime is a destination in its own right. Boat services can complement your stay: check schedules and conditions with the operator before planning a crossing.",
      "facts": [
        [
          "CENTRE",
          "Harbour, Tour Carrée and old-town streets."
        ],
        [
          "BEACHES",
          "A central beach and other stretches of coastline."
        ],
        [
          "ON FOOT",
          "Stay near the centre for easy town walks."
        ],
        [
          "GETTING AROUND",
          "Plan access and parking during the season."
        ]
      ],
      "best": [
        "Family holidays by the sea",
        "A stay combining town and beach",
        "Waterfront strolls"
      ],
      "less": [
        "Not every beach is walkable from the centre",
        "The waterfront can be lively in summer",
        "Boat crossings depend on schedules and conditions"
      ]
    }
  },
  "cavalaire-village": {
    "name": "Cavalaire-sur-Mer",
    "slug": "cavalaire-sur-mer",
    "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/cavalaire-sur-mer",
    "fr": {
      "sub": "LA MER DONNE LE TEMPO.",
      "intro": "Le port, une grande plage et Bonporteau pour changer de paysage. Cavalaire regarde vers la mer et convient à ceux qui veulent lui donner la première place dans leurs vacances.",
      "quote": "Une journée simple : du sable, de l’eau, puis le port.",
      "body": "Le front de mer et le port forment le cœur de la station. Bonporteau apporte un autre décor, plus resserré entre les rochers et la végétation. Deux ambiances à découvrir séparément.",
      "moments": [
        [
          "LE MATIN",
          "Marcher au bord de l’eau",
          "Prendre ses repères sur le front de mer avant de choisir où poser sa serviette."
        ],
        [
          "DANS LA JOURNÉE",
          "Le décor de Bonporteau",
          "Préparer son accès et profiter de cette plage pour une autre lecture du littoral."
        ],
        [
          "LE SOIR",
          "Retrouver le port",
          "Revenir vers les quais pour une promenade et un dîner selon les envies."
        ]
      ],
      "darkTitle": "Une base pour la plage. Un choix de géographie.",
      "darkBody": "Cavalaire se trouve sur le littoral au sud-ouest du Golfe. C’est un bon point de départ pour des journées tournées vers la mer ; si Saint-Tropez est au programme tous les jours, pensez aussi aux déplacements.",
      "facts": [
        [
          "LE CŒUR",
          "Port et front de mer."
        ],
        [
          "LE DÉCOR",
          "Grande plage et baie de Bonporteau."
        ],
        [
          "LE RYTHME",
          "Baignade, promenades et activités nautiques."
        ],
        [
          "EN SAISON",
          "Anticiper accès aux plages et stationnement."
        ]
      ],
      "best": [
        "Des vacances où la plage compte vraiment",
        "Un séjour en famille au bord de l’eau",
        "Alterner port et paysages du littoral"
      ],
      "less": [
        "Bonporteau et le port ne constituent pas une seule promenade plate",
        "Prévoir ses déplacements vers Saint-Tropez",
        "La fréquentation varie fortement avec la saison"
      ]
    },
    "en": {
      "sub": "LET THE SEA SET THE PACE.",
      "intro": "A harbour, a long beach and Bonporteau for a different landscape. Cavalaire faces the sea and suits travellers who want it to play the leading role in their holidays.",
      "quote": "A simple day: sand, water, then the harbour.",
      "body": "The waterfront and harbour form the heart of the resort. Bonporteau offers a more enclosed setting between rocks and greenery. Explore them as two distinct experiences.",
      "moments": [
        [
          "MORNING",
          "Walk by the water",
          "Get your bearings along the waterfront before choosing where to settle on the sand."
        ],
        [
          "DAYTIME",
          "The Bonporteau landscape",
          "Plan your access and enjoy a different stretch of coastline."
        ],
        [
          "EVENING",
          "Back to the harbour",
          "Return to the quays for a stroll and dinner to suit your mood."
        ]
      ],
      "darkTitle": "A beach base. A choice of geography.",
      "darkBody": "Cavalaire lies on the coast southwest of the Golfe. It is a starting point for days focused on the sea; if Saint-Tropez is on your daily itinerary, consider the journeys too.",
      "facts": [
        [
          "THE CENTRE",
          "Harbour and waterfront."
        ],
        [
          "THE SETTING",
          "Long beach and Bonporteau bay."
        ],
        [
          "THE PACE",
          "Swimming, walks and water activities."
        ],
        [
          "IN SEASON",
          "Plan beach access and parking."
        ]
      ],
      "best": [
        "Holidays centred on the beach",
        "Family stays by the water",
        "Alternating harbour and coastal scenery"
      ],
      "less": [
        "Bonporteau and the harbour are not one flat promenade",
        "Plan journeys to Saint-Tropez",
        "Visitor numbers change considerably with the season"
      ]
    }
  },
  "la-mole-village": {
    "name": "La Môle",
    "slug": "la-mole",
    "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/la-mole",
    "fr": {
      "sub": "LE GOLFE, CÔTÉ MAURES.",
      "intro": "Un village dans la vallée, une église et les paysages boisés des Maures. La Môle propose une autre entrée dans le Golfe : davantage de relief et de nature, avec le littoral à rejoindre en voiture.",
      "quote": "Changer de paysage sans chercher un autre port.",
      "body": "La visite commence au village, autour de l’église Sainte-Marie-Madeleine. Les paysages de la Verne et les chemins des Maures prolongent cette découverte de l’intérieur des terres.",
      "moments": [
        [
          "AU VILLAGE",
          "Commencer par l’église",
          "Prendre ses repères au centre et découvrir la façade de Sainte-Marie-Madeleine."
        ],
        [
          "EN NATURE",
          "Regarder vers la Verne",
          "Découvrir les paysages du lac de retenue et des collines boisées. Le lac n’est pas présenté ici comme une plage."
        ],
        [
          "POUR MARCHER",
          "La chapelle en hauteur",
          "Préparer une randonnée vers la chapelle Sainte-Magdeleine en vérifiant le parcours, la météo et l’accès au massif."
        ]
      ],
      "darkTitle": "Une église au village. Une chapelle dans les collines.",
      "darkBody": "L’église Sainte-Marie-Madeleine et la chapelle Sainte-Magdeleine sont deux lieux différents. La chapelle appartient à une sortie à pied : elle ne se visite pas comme une étape immédiate au centre du village.",
      "facts": [
        [
          "VILLAGE",
          "Dans la vallée, au pied des Maures."
        ],
        [
          "PATRIMOINE",
          "Église au centre, chapelle sur les hauteurs."
        ],
        [
          "PAYSAGES",
          "Forêt, collines et lac de la Verne."
        ],
        [
          "ACCÈS",
          "Voiture utile ; accès aux massifs à vérifier avant de marcher."
        ]
      ],
      "best": [
        "Découvrir l’arrière-pays du Golfe",
        "Des paysages boisés et des promenades préparées",
        "Une escapade différente des stations balnéaires"
      ],
      "less": [
        "La plage n’est pas au pied du village",
        "La chapelle demande une marche préparée",
        "Chaleur et restrictions peuvent modifier les sorties en forêt"
      ]
    },
    "en": {
      "sub": "THE GOLFE, ON THE MAURES SIDE.",
      "intro": "A village in the valley, a church and the wooded Maures landscape. La Môle offers another way into the Golfe: more hills and nature, with the coast reached by car.",
      "quote": "Change the scenery without looking for another harbour.",
      "body": "Begin in the village around Sainte-Marie-Madeleine church. The Verne landscape and Maures trails extend this discovery of the inland countryside.",
      "moments": [
        [
          "IN THE VILLAGE",
          "Begin at the church",
          "Get your bearings in the centre and discover the façade of Sainte-Marie-Madeleine."
        ],
        [
          "IN NATURE",
          "Look towards the Verne",
          "Discover the reservoir and wooded hills. This guide presents the lake as scenery rather than a beach."
        ],
        [
          "ON FOOT",
          "The hilltop chapel",
          "Prepare a walk to Sainte-Magdeleine chapel, checking the route, weather and forest access."
        ]
      ],
      "darkTitle": "A church in the village. A chapel in the hills.",
      "darkBody": "Sainte-Marie-Madeleine church and Sainte-Magdeleine chapel are two different places. The chapel belongs to a walking excursion, rather than a quick stop in the village centre.",
      "facts": [
        [
          "VILLAGE",
          "In the valley at the foot of the Maures."
        ],
        [
          "HERITAGE",
          "A central church and a chapel in the hills."
        ],
        [
          "SCENERY",
          "Forest, hills and the Verne reservoir."
        ],
        [
          "ACCESS",
          "A car is useful; check forest access before walking."
        ]
      ],
      "best": [
        "Discovering the Golfe’s inland countryside",
        "Wooded landscapes and prepared walks",
        "An escape away from seaside resorts"
      ],
      "less": [
        "The beach is not at the foot of the village",
        "The chapel requires a prepared walk",
        "Heat and restrictions can affect forest outings"
      ]
    }
  },
  "cogolin-village": {
    "name": "Cogolin",
    "slug": "cogolin",
    "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/cogolin",
    "fr": {
      "sub": "LE GOLFE A AUSSI UNE VIE DE VILLAGE.",
      "intro": "Des ruelles qui montent, des savoir-faire à découvrir et un autre visage du Golfe. Cogolin se choisit pour une promenade au vieux village, une rencontre avec l’artisanat ou une étape entre les communes voisines.",
      "quote": "Prendre le temps du village avant de rejoindre les quais.",
      "body": "Le vieux Cogolin se découvre à pied autour de Saint-Sauveur et de la Tour de l’Horloge. L’artisanat donne une autre direction à la visite : tapis, pipes et anches racontent une histoire de gestes et de matières.",
      "moments": [
        [
          "LE MATIN",
          "Les ruelles du vieux Cogolin",
          "Remonter la rue du Piquet et chercher les passages du centre ancien, sans se presser."
        ],
        [
          "DANS LA JOURNÉE",
          "Un savoir-faire à découvrir",
          "Choisir un atelier ou une exposition selon ses envies et vérifier les possibilités de visite auprès du lieu."
        ],
        [
          "POUR CHANGER DE DÉCOR",
          "Le côté maritime",
          "Prévoir un déplacement vers Port Cogolin ou les Marines pour une promenade sur les quais."
        ]
      ],
      "darkTitle": "Le vieux village et les ports : deux étapes.",
      "darkBody": "L’adresse compte. Un séjour au centre de Cogolin et un séjour près des Marines ne donnent pas le même quotidien. Repérez votre hébergement et vos accès avant de construire les journées.",
      "facts": [
        [
          "PATRIMOINE",
          "Ruelles, Saint-Sauveur et Tour de l’Horloge."
        ],
        [
          "SAVOIR-FAIRE",
          "Tapis, pipes et anches."
        ],
        [
          "CÔTÉ MER",
          "Port Cogolin et les Marines, séparés du vieux centre."
        ],
        [
          "VISITES",
          "Contacter les ateliers avant de prévoir une visite."
        ]
      ],
      "best": [
        "Un détour par un village vivant",
        "Une journée autour du patrimoine et des savoir-faire",
        "Alterner centre ancien et quais"
      ],
      "less": [
        "La plage n’est pas au pied du vieux village",
        "Le centre et les ports demandent des déplacements",
        "Les ateliers ne sont pas tous en visite libre"
      ]
    },
    "en": {
      "sub": "THE GOLFE HAS A VILLAGE LIFE TOO.",
      "intro": "Uphill lanes, local crafts and another side of the Golfe. Choose Cogolin for an old-town stroll, an encounter with craftsmanship or a stop between neighbouring towns.",
      "quote": "Make time for the village before heading for the quays.",
      "body": "Explore old Cogolin on foot around Saint-Sauveur and Tour de l’Horloge. Crafts offer another route through town: carpets, pipes and reeds tell a story of skilled hands and materials.",
      "moments": [
        [
          "MORNING",
          "The lanes of old Cogolin",
          "Walk up Rue du Piquet and explore the passages of the old centre at an unhurried pace."
        ],
        [
          "DAYTIME",
          "Discover a craft",
          "Choose a workshop or exhibition and check visiting arrangements directly with the venue."
        ],
        [
          "A CHANGE OF SCENE",
          "The maritime side",
          "Plan a trip to Port Cogolin or Les Marines for a walk along the quays."
        ]
      ],
      "darkTitle": "The old village and the ports: two stops.",
      "darkBody": "Location matters. Staying in central Cogolin and staying near Les Marines lead to different daily routines. Locate your accommodation and access routes before planning the days.",
      "facts": [
        [
          "HERITAGE",
          "Lanes, Saint-Sauveur and Tour de l’Horloge."
        ],
        [
          "CRAFTS",
          "Carpets, pipes and reeds."
        ],
        [
          "BY THE SEA",
          "Port Cogolin and Les Marines, away from the old centre."
        ],
        [
          "VISITS",
          "Contact workshops before planning a visit."
        ]
      ],
      "best": [
        "A detour through a living village",
        "A day centred on heritage and craftsmanship",
        "Alternating old-town lanes and quays"
      ],
      "less": [
        "The beach is not beside the old village",
        "The centre and ports require separate journeys",
        "Not every workshop welcomes walk-in visits"
      ]
    }
  },
  "la-croix-valmer-village": {
    "name": "La Croix-Valmer",
    "slug": "la-croix-valmer",
    "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/la-croix-valmer",
    "fr": {
      "sub": "ENTRE LES VIGNES ET LE SABLE.",
      "intro": "Un village en retrait de la mer, des vignobles et des plages pour prendre le large. La Croix-Valmer donne plusieurs directions au séjour : Gigaro, le Débarquement ou une promenade préparée sur le littoral.",
      "quote": "Choisir sa plage, puis garder du temps pour le paysage.",
      "body": "Le centre et la mer ne sont pas une seule étape. Gigaro attire vers la plage et les chemins côtiers ; les vignes et les villas anciennes apportent une autre lecture de la commune.",
      "moments": [
        [
          "LE MATIN",
          "Une pause au village",
          "Commencer au centre pour prendre ses repères avant de descendre vers la mer."
        ],
        [
          "DANS LA JOURNÉE",
          "Choisir son secteur de plage",
          "Comparer Gigaro et le Débarquement selon son hébergement, ses déplacements et le programme de la journée."
        ],
        [
          "POUR PROLONGER",
          "Vignes ou sentier côtier",
          "Choisir une découverte viticole ou une marche adaptée à son niveau, en vérifiant les conditions et l’accès."
        ]
      ],
      "darkTitle": "Le village et Gigaro ne sont pas la même adresse.",
      "darkBody": "Pour un séjour très plage, vérifiez la distance réelle de la maison au secteur souhaité. Pour varier les journées, gardez une place aux paysages et au village plutôt que de tout organiser autour d’une seule plage.",
      "facts": [
        [
          "LE VILLAGE",
          "Le centre est en retrait du littoral."
        ],
        [
          "LES PLAGES",
          "Gigaro, le Débarquement et d’autres secteurs."
        ],
        [
          "LE PAYSAGE",
          "Vignobles, villas anciennes et littoral."
        ],
        [
          "À PIED",
          "Préparer les sorties et vérifier l’accès aux sentiers."
        ]
      ],
      "best": [
        "Un séjour entre plage et nature",
        "Des vacances avec plusieurs paysages à découvrir",
        "Une journée qui laisse de la place à la marche"
      ],
      "less": [
        "Un hébergement dans la commune ne garantit pas la plage à pied",
        "Les sorties côtières demandent une préparation",
        "Prévoir les accès et le stationnement en saison"
      ]
    },
    "en": {
      "sub": "BETWEEN VINEYARDS AND SAND.",
      "intro": "A village set back from the sea, vineyards and beaches that open up the day. La Croix-Valmer gives your stay several directions: Gigaro, Le Débarquement or a prepared coastal walk.",
      "quote": "Choose your beach, then leave time for the landscape.",
      "body": "The centre and the sea are separate stops. Gigaro draws you towards the beach and coastal paths; vineyards and historic villas reveal another side of the commune.",
      "moments": [
        [
          "MORNING",
          "A pause in the village",
          "Begin in the centre to get your bearings before heading down to the sea."
        ],
        [
          "DAYTIME",
          "Choose a beach area",
          "Compare Gigaro and Le Débarquement by accommodation location, journeys and your plans for the day."
        ],
        [
          "GO FURTHER",
          "Vineyards or coastal paths",
          "Choose a wine discovery or a walk suited to your ability, checking conditions and access first."
        ]
      ],
      "darkTitle": "The village and Gigaro are different addresses.",
      "darkBody": "For a beach-focused stay, check the actual distance from the house to your chosen beach. To vary your days, leave room for the landscape and village rather than planning everything around one beach.",
      "facts": [
        [
          "THE VILLAGE",
          "The centre is set back from the coast."
        ],
        [
          "BEACHES",
          "Gigaro, Le Débarquement and other areas."
        ],
        [
          "SCENERY",
          "Vineyards, historic villas and coastline."
        ],
        [
          "ON FOOT",
          "Prepare your outings and check path access."
        ]
      ],
      "best": [
        "A stay combining beach and nature",
        "Holidays with varied scenery",
        "A day that leaves room for walking"
      ],
      "less": [
        "Staying in the commune does not guarantee a walkable beach",
        "Coastal outings require preparation",
        "Plan access and parking during the season"
      ]
    }
  },
  "rayol-canadel-village": {
    "name": "Rayol-Canadel-sur-Mer",
    "slug": "rayol-canadel",
    "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/rayol-canadel-sur-mer",
    "fr": {
      "sub": "LES MAURES RENCONTRENT LA MER.",
      "intro": "Des jardins, des plages et un village accroché au relief. Rayol-Canadel se découvre en alternant le Domaine du Rayol, une pause au bord de l’eau et les perspectives de la corniche.",
      "quote": "Un jardin le matin. La mer pour la suite.",
      "body": "Le Jardin des Méditerranées donne un vrai point de départ à la visite. Les plages du Rayol et du Canadel, la pergola du Patec et les escaliers complètent cette découverte entre végétation et mer.",
      "moments": [
        [
          "LE MATIN",
          "Le Domaine du Rayol",
          "Prévoir du temps pour les jardins et vérifier les informations de visite auprès du domaine."
        ],
        [
          "DANS LA JOURNÉE",
          "Une pause sur le sable",
          "Choisir entre le Rayol et le Canadel selon son point de départ et le rythme recherché."
        ],
        [
          "POUR PRENDRE DE LA HAUTEUR",
          "Le Patec et les escaliers",
          "Découvrir les perspectives du village en adaptant la promenade à la chaleur et à sa mobilité."
        ]
      ],
      "darkTitle": "Un beau relief. Des accès à anticiper.",
      "darkBody": "Les escaliers et les pentes font partie du décor. Repérez l’accès à la plage depuis votre hébergement : une vue sur la mer ne dit pas toujours comment on la rejoint. Pour une journée facile avec des enfants, préparez les trajets.",
      "facts": [
        [
          "LES JARDINS",
          "Le Domaine du Rayol et son Jardin des Méditerranées."
        ],
        [
          "LES PLAGES",
          "Le Rayol et le Canadel."
        ],
        [
          "LE RELIEF",
          "Pentes, escaliers et pergola du Patec."
        ],
        [
          "LE PROGRAMME",
          "Vérifier les visites du domaine et les accès choisis."
        ]
      ],
      "best": [
        "Une escapade entre jardins et mer",
        "Des vacances tournées vers le paysage",
        "Une journée qui alterne visite et plage"
      ],
      "less": [
        "Le relief compte pour les poussettes et la mobilité",
        "Toutes les maisons avec vue ne sont pas proches de la plage à pied",
        "Prévoir les déplacements vers Saint-Tropez"
      ]
    },
    "en": {
      "sub": "WHERE THE MAURES MEET THE SEA.",
      "intro": "Gardens, beaches and a village shaped by the hillside. Explore Rayol-Canadel by combining Domaine du Rayol, time by the water and views along the corniche.",
      "quote": "A garden in the morning. The sea for the rest.",
      "body": "The Jardin des Méditerranées gives your visit a starting point. Rayol and Canadel beaches, the Patec pergola and the stairways extend the discovery between greenery and sea.",
      "moments": [
        [
          "MORNING",
          "Domaine du Rayol",
          "Allow time for the gardens and check visitor information directly with the domain."
        ],
        [
          "DAYTIME",
          "A pause on the sand",
          "Choose Rayol or Canadel according to your starting point and the pace you want."
        ],
        [
          "UP THE HILLSIDE",
          "The Patec and the stairways",
          "Explore the village’s perspectives, adapting the walk to the heat and your mobility."
        ]
      ],
      "darkTitle": "Beautiful hillsides. Access worth planning.",
      "darkBody": "Steps and slopes are part of the landscape. Check how to reach the beach from your accommodation: a sea view does not always explain the journey down. For an easy family day, prepare those routes.",
      "facts": [
        [
          "GARDENS",
          "Domaine du Rayol and its Jardin des Méditerranées."
        ],
        [
          "BEACHES",
          "Le Rayol and Le Canadel."
        ],
        [
          "HILLSIDES",
          "Slopes, stairways and the Patec pergola."
        ],
        [
          "PLANNING",
          "Check garden visits and your chosen access routes."
        ]
      ],
      "best": [
        "An escape between gardens and sea",
        "Holidays focused on the landscape",
        "A day combining a visit and the beach"
      ],
      "less": [
        "The terrain matters for pushchairs and mobility",
        "Not every sea-view house is a short walk from the beach",
        "Plan journeys to Saint-Tropez"
      ]
    }
  }
};
