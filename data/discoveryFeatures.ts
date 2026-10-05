import type {Locale} from '../lib/i18n';
export type DiscoveryGuide={title:string;description:string;intro:string;sections:[string,string][];nearby:[string,string][]};
export const discoveryFeatures:Record<string,Record<Locale,DiscoveryGuide>> = {
  "moulin-de-paillas": {
    "fr": {
      "title": "Moulin de Paillas à Ramatuelle : visite et panorama",
      "description": "Découvrez le Moulin de Paillas sur les hauteurs de Ramatuelle : panorama, accès et conseils pour préparer la visite du moulin restauré.",
      "intro": "Sur les hauteurs de Ramatuelle, le Moulin de Paillas donne une autre perspective sur la presqu’île. Une étape à associer au village pour regarder le paysage, puis découvrir le patrimoine du moulin lorsque les visites le permettent.",
      "sections": [
        [
          "Un moulin restauré, un paysage ouvert",
          "Restauré en 2002, le moulin conserve un mécanisme en bois en état de fonctionner. Le panorama s’ouvre vers Cavalaire et Saint-Tropez : prenez le temps de distinguer les reliefs et la côte."
        ],
        [
          "Accès depuis Ramatuelle",
          "Le site de Castellas se trouve à environ deux kilomètres du village, sur la route de Gassin. Repérez votre trajet avant de partir et prévoyez des chaussures confortables pour découvrir les abords."
        ],
        [
          "Visiter l’intérieur du moulin",
          "La vue extérieure et la visite du mécanisme sont deux moments différents. Contactez l’office de tourisme de Ramatuelle pour connaître les jours et les horaires de visite ; ne comptez pas sur une ouverture permanente."
        ]
      ],
      "nearby": [
        [
          "ramatuelle-village",
          "Découvrir Ramatuelle"
        ],
        [
          "gassin-village",
          "Continuer vers Gassin"
        ]
      ]
    },
    "en": {
      "title": "Moulin de Paillas in Ramatuelle: visits and views",
      "description": "Plan a stop at Moulin de Paillas above Ramatuelle: coastal views, access from the village and information on visiting the restored windmill.",
      "intro": "Above Ramatuelle, Moulin de Paillas offers another perspective on the peninsula. Combine it with a visit to the village, take in the landscape and explore the windmill’s heritage when visits are available.",
      "sections": [
        [
          "A restored windmill with open views",
          "Restored in 2002, the windmill retains a wooden mechanism in working order. The panorama opens towards Cavalaire and Saint-Tropez: take time to pick out the hills and coastline."
        ],
        [
          "Getting there from Ramatuelle",
          "The Castellas site is around two kilometres from the village, on the road towards Gassin. Check your route before setting out and wear comfortable shoes for exploring the surroundings."
        ],
        [
          "Visiting inside the windmill",
          "The outside viewpoint and a visit to the mechanism are separate experiences. Contact Ramatuelle’s tourist office for visiting days and times; do not assume the interior is always open."
        ]
      ],
      "nearby": [
        [
          "ramatuelle-village",
          "Explore Ramatuelle"
        ],
        [
          "gassin-village",
          "Continue to Gassin"
        ]
      ]
    }
  },
  "cap-taillat": {
    "fr": {
      "title": "Cap Taillat : accès depuis l’Escalet et balade",
      "description": "Préparez votre balade au Cap Taillat entre Ramatuelle et La Croix-Valmer : départ de l’Escalet, sentier littoral et conseils avant de partir.",
      "intro": "Entre Ramatuelle et La Croix-Valmer, le Cap Taillat invite à découvrir le littoral à pied. Choisissez cette sortie pour le paysage et la marche, en adaptant le parcours au groupe et aux conditions du jour.",
      "sections": [
        [
          "Un cap entre deux baies",
          "Ce site naturel protégé sépare les baies de Briande et de Bonporteau. Il appartient au Conservatoire du littoral. Le paysage mérite une visite attentive : restez sur les chemins et emportez vos déchets."
        ],
        [
          "Partir de l’Escalet",
          "L’office de tourisme décrit un itinéraire depuis le parking de la plage de l’Escalet, avec un retour par le même chemin. Consultez son parcours avant de partir et prévoyez le temps du retour, sans vous fier à un seul temps de marche."
        ],
        [
          "Préparer la marche littorale",
          "Chaussures adaptées, eau et protection solaire sont à prévoir. Certains passages peuvent être submergés par mer agitée. Vérifiez la météo et les restrictions d’accès du jour ; ce sentier n’est pas adapté aux fauteuils roulants."
        ]
      ],
      "nearby": [
        [
          "escalet",
          "Préparer le départ à l’Escalet"
        ],
        [
          "ramatuelle-village",
          "Découvrir Ramatuelle"
        ],
        [
          "la-croix-valmer-village",
          "Découvrir La Croix-Valmer"
        ]
      ]
    },
    "en": {
      "title": "Cap Taillat: coastal walk and access from l’Escalet",
      "description": "Plan your walk to Cap Taillat between Ramatuelle and La Croix-Valmer: access from l’Escalet, the coastal path and advice before setting out.",
      "intro": "Between Ramatuelle and La Croix-Valmer, Cap Taillat is a place to explore the coast on foot. Choose it for the scenery and walking, adapting your route to your group and the day’s conditions.",
      "sections": [
        [
          "A cape between two bays",
          "This protected natural site separates the bays of Briande and Bonporteau and belongs to the Conservatoire du littoral. Explore it with care: stay on the paths and take your rubbish away."
        ],
        [
          "Starting at l’Escalet",
          "The tourist office describes a route from l’Escalet beach car park, returning along the same path. Consult its itinerary before setting out and allow time for the return rather than relying on a single walking-time estimate."
        ],
        [
          "Preparing for the coastal path",
          "Bring suitable shoes, water and sun protection. Some sections can be submerged in rough seas. Check the weather and access restrictions on the day; this trail is not suitable for wheelchairs."
        ]
      ],
      "nearby": [
        [
          "escalet",
          "Plan your start at l’Escalet"
        ],
        [
          "ramatuelle-village",
          "Explore Ramatuelle"
        ],
        [
          "la-croix-valmer-village",
          "Explore La Croix-Valmer"
        ]
      ]
    }
  },
  "pont-des-fees": {
    "fr": {
      "title": "Pont des Fées à Grimaud : balade et accès",
      "description": "Découvrez le Pont des Fées à Grimaud : ancien aqueduc, balade depuis le moulin Saint-Roch et conseils pour parcourir le vallon de la Garde.",
      "intro": "En contrebas du village de Grimaud, le Pont des Fées donne un fil conducteur à une promenade entre nature et patrimoine. Une autre façon de découvrir la commune après les ruelles et le château.",
      "sections": [
        [
          "Un ancien aqueduc dans le vallon",
          "Le Pont des Fées est un vestige de l’acheminement de l’eau vers le village. La balade permet de le replacer dans son paysage, au bord de la Garde, plutôt que d’en faire une simple photo de passage."
        ],
        [
          "Une boucle depuis le moulin Saint-Roch",
          "Le départ se situe sous le moulin. Suivez les flèches jaunes et les chemins indiqués ; des panneaux présentent la faune, la flore et le patrimoine. La remontée ramène vers le point de départ."
        ],
        [
          "Un chemin à préparer",
          "Le terrain est caillouteux et en pente, avec de la boue possible après la pluie. Prévoyez de bonnes chaussures : la poussette n’est pas adaptée. La rivière peut être à sec ; en été, consultez les restrictions d’accès aux massifs avant de venir."
        ]
      ],
      "nearby": [
        [
          "grimaud-village",
          "Prolonger dans le village de Grimaud"
        ]
      ]
    },
    "en": {
      "title": "Pont des Fées in Grimaud: walk and access",
      "description": "Explore Pont des Fées in Grimaud: a historic aqueduct, a walk from Saint-Roch windmill and advice for visiting the valley of the river Garde.",
      "intro": "Below Grimaud village, Pont des Fées gives a walk through nature and heritage a clear destination. It is another way to explore the commune after its lanes and castle.",
      "sections": [
        [
          "An old aqueduct in the valley",
          "Pont des Fées is a remnant of the system that carried water to the village. The walk places it within its landscape beside the river Garde, making it more than a quick photograph stop."
        ],
        [
          "A loop from Saint-Roch windmill",
          "The route starts below the windmill. Follow the yellow arrows and marked paths; information panels introduce wildlife, plants and local heritage. The uphill return leads back towards your starting point."
        ],
        [
          "Prepare for the terrain",
          "The path is rocky and sloping and can be muddy after rain. Wear suitable shoes; it is not suitable for pushchairs. The river can be dry, and in summer you should check forest-access restrictions before visiting."
        ]
      ],
      "nearby": [
        [
          "grimaud-village",
          "Continue through Grimaud village"
        ]
      ]
    }
  }
};
