import type {Locale} from '../lib/i18n';
export type DiscoveryGuide={title:string;description:string;intro:string;sections:[string,string][];nearby:[string,string][];verified?:string;sources?:{label:string;url:string}[]};
export const discoveryFeatures:Record<string,Record<Locale,DiscoveryGuide>> = {
  "san-peire-randonnee": {
    fr: {
      title: "San Peïre au Plan-de-la-Tour : randonnée et panorama",
      description: "Préparez la randonnée vers San Peïre au Plan-de-la-Tour : parcours de 6 km aller-retour, dénivelé, accès au sommet et restrictions forestières.",
      intro: "San Peïre se découvre en marchant depuis le secteur du Plan-de-la-Tour. Cette sortie relie les collines boisées à un ancien site fortifié et à un panorama sur le Golfe. Choisissez-la pour une vraie randonnée, puis gardez une pause au village pour le retour.",
      sections: [
        ["Un sommet et un ancien site fortifié", "À 416 mètres d’altitude, San Peïre domine la plaine du Plan-de-la-Tour. L’office présente les vestiges d’un habitat fortifié médiéval et une vue vers le Golfe, les Maures et l’Estérel. Notre conseil : gardez du temps au sommet pour observer le paysage, puis revenez par le sentier."],
        ["Distance, dénivelé et difficulté", "La fiche de randonnée de l’office annonce 6 km aller-retour, 370 m de dénivelé positif et une durée indicative de 2 h. Le balisage est jaune ; le terrain comporte des passages rocheux et n’est pas adapté aux poussettes. Adaptez le temps prévu à votre rythme et aux pauses."],
        ["Préparer le départ au Plan-de-la-Tour", "Consultez le descriptif officiel, qui prolonge le sentier des Gorgues, avant de choisir votre départ. Le repère de carte situe le secteur : il ne désigne pas un parking au sommet. Prévoyez chaussures de randonnée et eau, puis vérifiez la carte d’accès aux massifs avant de partir ; une restriction peut modifier votre programme."],
      ],
      nearby: [["plan-de-la-tour-village", "Préparer votre étape au Plan-de-la-Tour"]],
      verified: "2026-10-16",
      sources: [
        {label:"Office du Golfe · Itinéraire de San Peïre",url:"https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/randonnee-chemin-vers-le-san-peire/"},
        {label:"Office du Golfe · Patrimoine et panorama",url:"https://www.golfe-sainttropez-tourisme.fr/decouvrir/cote-nature/sites-emblematiques/san-peire/"},
        {label:"Office du Golfe · Accès aux massifs",url:"https://www.golfe-sainttropez-tourisme.fr/sejourner/pratique/risque-incendie/"},
      ],
    },
    en: {
      title: "San Peïre, Le Plan-de-la-Tour: hike and summit views",
      description: "Plan the San Peïre hike from Le Plan-de-la-Tour: 6 km return route, ascent, summit access and forest restrictions to check before setting out.",
      intro: "Reach San Peïre on foot from the Le Plan-de-la-Tour area. The outing connects wooded hills with a former fortified site and views over the Golfe. Choose it for a proper hike, then leave time for a village break on your return.",
      sections: [
        ["A summit and former fortified settlement", "At 416 metres, San Peïre overlooks the Le Plan-de-la-Tour plain. The tourist office describes medieval fortified remains and views towards the Golfe, the Maures and the Estérel. Our suggestion: leave time at the top to take in the landscape before returning along the trail."],
        ["Distance, ascent and difficulty", "The tourist office lists a 6 km return walk, 370 m of ascent and an indicative duration of two hours. Yellow markings guide the way; there are rocky sections and the route is unsuitable for pushchairs. Allow extra time for your own pace and breaks."],
        ["Preparing your departure", "Read the official route, which continues from the Les Gorgues trail, before choosing your starting point. The map reference locates the area; it is not a summit car park. Bring hiking shoes and water, and check forest access restrictions before leaving: the day’s conditions may change your plans."],
      ],
      nearby: [["plan-de-la-tour-village", "Plan a stop in Le Plan-de-la-Tour"]],
      verified: "2026-10-16",
      sources: [
        {label:"Golfe tourist office · San Peïre route",url:"https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/randonnee-chemin-vers-le-san-peire/"},
        {label:"Golfe tourist office · Heritage and views",url:"https://www.golfe-sainttropez-tourisme.fr/decouvrir/cote-nature/sites-emblematiques/san-peire/"},
        {label:"Golfe tourist office · Forest access",url:"https://www.golfe-sainttropez-tourisme.fr/sejourner/pratique/risque-incendie/"},
      ],
    },
  },
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
    "title": "Cap Taillat : accès depuis l’Escalet et Gigaro",
    "description": "Découvrez le majestueux Cap Taillat : accès à pied depuis l’Escalet, Canadel ou Gigaro, randonnées, plages et conseils pour éviter la foule en été.",
    "intro": "Une langue de sable blanc, la mer de chaque côté, un cap qui s’avance dans le bleu : le Cap Taillat est l’un des paysages les plus majestueux de la presqu’île de Saint-Tropez. Entre Ramatuelle et La Croix-Valmer, on vient pour l’isthme, les criques et cette impression de Méditerranée immense. Mais sauvage ne veut pas dire désert : en juillet et août, le site est très fréquenté. Choisissez votre accès et votre horaire avant de partir.",
    "sections": [
      [
        "Un site majestueux entre deux baies",
        "Relié au rivage par un isthme de sable, le Cap Taillat dessine une silhouette reconnaissable entre les baies de Briande et de Bonporteau. Les eaux claires et la côte découpée donnent au paysage une ampleur rare. Notre conseil : gardez du temps pour contempler les perspectives depuis le sentier, au lieu de traiter le cap comme une simple plage à cocher."
      ],
      [
        "Depuis la plage de l’Escalet, à Ramatuelle",
        "Rejoignez le parking de la plage de l’Escalet, puis le sentier littoral vers le Cap Taillat. Ramatuelle Tourisme annonce environ 40 minutes pour rejoindre le site : c’est un repère d’approche, pas la durée d’une sortie complète avec retour, baignade et montée sur le cap. Prévoyez une marge selon votre rythme. Le stationnement reste au départ, jamais au pied de l’isthme."
      ],
      [
        "Depuis Canadel : le deuxième départ côté Escalet",
        "Le CEN PACA signale aussi un départ au bout de l’avenue Cartaya, près de la pointe de Canadel. Il évite la première portion rocheuse et exposée depuis la plage de l’Escalet, déconseillée aux jeunes enfants. Cela ne rend pas la suite accessible aux poussettes ou aux fauteuils. Vérifiez la signalisation et les possibilités de stationnement sur place."
      ],
      [
        "Depuis Gigaro : le sentier côtier par le Cap Lardier",
        "À La Croix-Valmer, partez de la plage de Gigaro, à l’entrée du domaine du Cap Lardier. Suivez le balisage jaune et la direction Cap Lardier, puis la plage de la Briande et l’isthme du Cap Taillat. C’est une vraie randonnée, nettement plus longue que l’approche depuis l’Escalet. L’office propose un retour en boucle par les pistes forestières : consultez le tracé « Les 2 Caps » pour choisir le parcours complet."
      ],
      [
        "Depuis Gigaro : la boucle forestière des deux caps",
        "Autre itinéraire officiel, le « Circuit des 2 caps » du Parc national de Port-Cros part du point d’information de Gigaro, monte par la forêt vers Colle Basse, rejoint Taillat par le chemin de la Douane et revient par le Cap Lardier, Brouis et Jovat. Le Parc annonce 14,8 km, 5 h et 494 m de dénivelé positif pour la boucle entière, hors longues pauses. Ces chiffres ne décrivent ni un aller simple vers Taillat ni l’autre boucle « Les 2 Caps ». Téléchargez le GPX correspondant."
      ],
      [
        "Depuis Camarat : un prolongement pour marcheurs",
        "Le littoral permet également d’arriver par le secteur du phare de Camarat, en passant par l’Escalet. Ramatuelle Tourisme décrit cette liaison dans sa page « Côté mer ». C’est une longue approche à préparer avec son retour, pas un raccourci vers la plage. Pour une première visite centrée sur Taillat, nous conseillons plutôt un départ côté Escalet ou un circuit balisé depuis Gigaro."
      ],
      [
        "En été : un site sauvage, mais très fréquenté",
        "En juillet et août, attendez-vous à beaucoup de monde sur les plages, les sentiers et dans les baies. Le paysage reste grandiose ; l’expérience n’est pas celle d’une crique secrète. Notre conseil : partez tôt pour limiter la chaleur et la pression sur le stationnement, sans garantie de tranquillité. Pour mieux apprécier le lieu, privilégiez si possible le printemps ou l’arrière-saison, lorsque les conditions et l’ouverture des chemins le permettent."
      ],
      [
        "Baignade et préparation : garder le retour en tête",
        "La plage de la Douane offre une belle perspective sur le cap et sa Maison des Douanes ; la baignade y est non surveillée. Prévoyez eau, chaussures adaptées et protection solaire pour toute la sortie. Par mer forte, certains passages littoraux peuvent être exposés ou submergés. Consultez la carte quotidienne d’accès aux massifs avant le départ et respectez toute fermeture. Restez sur les sentiers balisés ; ni feu, ni camping, ni prélèvement dans ce site protégé."
      ]
    ],
    "nearby": [
      [
        "escalet",
        "Préparer le départ depuis l’Escalet"
      ],
      [
        "gigaro-beach",
        "Préparer le départ depuis Gigaro"
      ],
      [
        "ramatuelle-village",
        "Découvrir Ramatuelle"
      ],
      [
        "la-croix-valmer-village",
        "Découvrir La Croix-Valmer"
      ]
    ],
    "verified": "2026-10-16",
    "sources": [
      {
        "label": "Ramatuelle Tourisme · Cap Taillat et accès depuis l’Escalet",
        "url": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/les-tresors-caches/le-cap-taillat/"
      },
      {
        "label": "CEN PACA · départs Escalet / Canadel et protection du site",
        "url": "https://cen-paca.org/decouvrir/les-milieux-naturels/ecosystemes-littoraux-et-marins/le-cap-taillat/"
      },
      {
        "label": "La Croix-Valmer Tourisme · Les 2 Caps, par le littoral",
        "url": "https://www.lacroixvalmertourisme.com/fr/loisirs/loisirs-sportifs/la-croix-valmer/les-2-caps-6086817"
      },
      {
        "label": "Parc national de Port-Cros · Circuit des 2 caps, tracé et GPX",
        "url": "https://destination.portcros-parcnational.fr/trek/689-Circuit-des-2-caps"
      },
      {
        "label": "Ramatuelle Tourisme · Camarat, plages et Maison des Douanes",
        "url": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/"
      },
      {
        "label": "Carte quotidienne d’accès aux massifs du Var",
        "url": "https://www.risque-prevention-incendie.fr/var/"
      }
    ]
  },
  "en": {
    "title": "Cap Taillat: access from l’Escalet and Gigaro",
    "description": "Explore majestic Cap Taillat: walking access from l’Escalet, Canadel and Gigaro, coastal hikes, beaches and advice for the busy summer season.",
    "intro": "White sand joins the headland to the shore, with blue water on both sides: Cap Taillat is one of the Saint-Tropez peninsula’s most majestic landscapes. Between Ramatuelle and La Croix-Valmer, the isthmus, coves and open Mediterranean views make the walk worthwhile. Wild scenery does not mean solitude: July and August are very busy. Choose your starting point and timing before setting out.",
    "sections": [
      [
        "A majestic headland between two bays",
        "Joined to the coast by a sandy isthmus, Cap Taillat has a distinctive outline between Briande and Bonporteau bays. Clear water and the indented shoreline create a remarkable sense of space. Our advice: leave time to enjoy the changing views from the path rather than treating the cape as another beach to tick off."
      ],
      [
        "From l’Escalet beach in Ramatuelle",
        "Start at l’Escalet beach car park and follow the coastal path towards Cap Taillat. Ramatuelle Tourism gives around 40 minutes to reach the site: an approach estimate, not a complete outing including the return, swimming and exploring the headland. Allow extra time for your pace. Parking is at the start, never beside the isthmus."
      ],
      [
        "From Canadel: a second start near l’Escalet",
        "CEN PACA also lists a start at the end of Avenue Cartaya, near Pointe de Canadel. It avoids the first rocky, exposed stretch from l’Escalet beach, which is discouraged for young children. The remaining path is still unsuitable for pushchairs and wheelchairs. Check local signs and parking arrangements."
      ],
      [
        "From Gigaro: the coast via Cap Lardier",
        "In La Croix-Valmer, start at Gigaro beach by the entrance to the Cap Lardier estate. Follow yellow waymarks towards Cap Lardier, then La Briande beach and the Cap Taillat isthmus. This is a substantial hike, much longer than the approach from l’Escalet. The tourist office’s “Les 2 Caps” route returns along forest tracks: consult its full route before choosing your outing."
      ],
      [
        "From Gigaro: the forest circuit of the two capes",
        "A separate official route, Port-Cros National Park’s “Circuit des 2 caps”, starts at Gigaro’s information point, climbs through forest towards Colle Basse, reaches Taillat via Chemin de la Douane and returns via Cap Lardier, Brouis and Jovat. The Park lists 14.8 km, 5 hours and 494 m of ascent for the entire loop, excluding long breaks. These figures apply neither to a one-way walk to Taillat nor to the other “Les 2 Caps” loop. Download the matching GPX."
      ],
      [
        "From Camarat: a longer coastal approach",
        "You can also approach along the coast from the Camarat lighthouse area via l’Escalet. Ramatuelle Tourism describes this connection on its “Côté mer” page. Plan it as a long hike with a return journey, rather than a shortcut to the beach. For a first visit focused on Taillat, we suggest starting near l’Escalet or choosing a waymarked Gigaro circuit."
      ],
      [
        "Summer: wild scenery with plenty of visitors",
        "In July and August, expect busy beaches, paths and bays. The landscape remains spectacular, but this is not a secret cove. Our advice: set off early to reduce exposure to heat and parking pressure, without expecting guaranteed peace. Spring or the shoulder season can be more rewarding when conditions and trail access allow."
      ],
      [
        "Swimming and preparation: allow for the return",
        "Plage de la Douane offers a fine view of the cape and its former customs house; swimming is unsupervised. Bring water, proper footwear and sun protection for the whole outing. Rough seas can expose or submerge sections of the coastal path. Check the daily forest-access map before leaving and respect closures. Keep to marked paths; fires, camping and removing natural material are prohibited in this protected site."
      ]
    ],
    "nearby": [
      [
        "escalet",
        "Plan your start at l’Escalet"
      ],
      [
        "gigaro-beach",
        "Plan your start at Gigaro"
      ],
      [
        "ramatuelle-village",
        "Explore Ramatuelle"
      ],
      [
        "la-croix-valmer-village",
        "Explore La Croix-Valmer"
      ]
    ],
    "verified": "2026-10-16",
    "sources": [
      {
        "label": "Ramatuelle Tourisme · Cap Taillat et accès depuis l’Escalet",
        "url": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/les-tresors-caches/le-cap-taillat/"
      },
      {
        "label": "CEN PACA · départs Escalet / Canadel et protection du site",
        "url": "https://cen-paca.org/decouvrir/les-milieux-naturels/ecosystemes-littoraux-et-marins/le-cap-taillat/"
      },
      {
        "label": "La Croix-Valmer Tourisme · Les 2 Caps, par le littoral",
        "url": "https://www.lacroixvalmertourisme.com/fr/loisirs/loisirs-sportifs/la-croix-valmer/les-2-caps-6086817"
      },
      {
        "label": "Parc national de Port-Cros · Circuit des 2 caps, tracé et GPX",
        "url": "https://destination.portcros-parcnational.fr/trek/689-Circuit-des-2-caps"
      },
      {
        "label": "Ramatuelle Tourisme · Camarat, plages et Maison des Douanes",
        "url": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/"
      },
      {
        "label": "Carte quotidienne d’accès aux massifs du Var",
        "url": "https://www.risque-prevention-incendie.fr/var/"
      }
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
