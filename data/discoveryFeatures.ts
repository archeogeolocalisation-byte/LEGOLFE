import type {Locale} from '../lib/i18n';
export type DiscoveryGuide={title:string;description:string;intro:string;sections:[string,string][];nearby:[string,string][];verified?:string;sources?:{label:string;url:string}[]};
export const discoveryFeatures:Record<string,Record<Locale,DiscoveryGuide>> = {
  "san-peire-randonnee": {
    "fr": {
        "title": "San Peïre : deux départs pour découvrir le sommet",
        "description": "San Peïre au Plan-de-la-Tour : comparez le départ du village et la boucle des Vernades, consultez le tracé, le profil, le GPX et les conseils de marche.",
        "intro": "Du village ou des Vernades, San Peïre se découvre à pied. Choisissez votre départ, gardez les bons repères pour le retour, puis prenez le temps des chênes-lièges, du granite et du panorama sur le Golfe.",
        "sections": [
            [
                "Un sommet, deux approches",
                "Le départ du village propose une demi-journée en aller-retour. La boucle des Vernades, publiée sur Visorando, est plus courte. Comparez-les dans le module de parcours et conservez le descriptif correspondant à votre choix."
            ],
            [
                "Les chiffres du départ village",
                "Le topoguide officiel précise 6 km et 2 h en aller simple, avec +370 m annoncés à l’aller. Comptez environ 12 km et 4 h hors pauses pour revenir par le même chemin. La fiche web de l’office utilise une présentation différente ; nous distinguons explicitement aller et retour."
            ],
            [
                "Préparer la marche",
                "Le terrain comporte des passages rocheux. Repérez un stationnement autorisé, prenez de l’eau et vérifiez l’accès aux massifs le jour du départ. La trace documentaire ne remplace pas les indications et restrictions sur place."
            ]
        ],
        "nearby": [
            [
                "plan-de-la-tour-village",
                "Faire une pause au village"
            ]
        ],
        "verified": "2026-10-27",
        "sources": [
            {
                "label": "Office de tourisme · Chemin vers le San Peire",
                "url": "https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/randonnee-chemin-vers-le-san-peire/"
            },
            {
                "label": "Topoguide officiel · Du Plan de la Tour au San Peïre (PDF, 18 Mo)",
                "url": "https://www.golfe-saint-tropez-information.com/files/visitgolfe/docs/randos-web-2023-gardefreinet-plandelatour-fr.pdf"
            },
            {
                "label": "Préfecture du Var · Carte d’accès aux massifs",
                "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
            },
            {
                "label": "Office du Golfe · GPX du départ village",
                "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/plan-de-la-tour/randonnee-chemin-vers-le-san-peire-5865643"
            },
            {
                "label": "Visorando · Pic de San Peïre, boucle des Vernades",
                "url": "https://www.visorando.com/randonnee-pic-de-san-peire/"
            },
            {
                "label": "IGN · Altimétrie RGE ALTI",
                "url": "https://cartes.gouv.fr/aide/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/calcul-altimetrique/"
            }
        ]
    },
    "en": {
        "title": "San Peïre: two starting points for the summit",
        "description": "San Peïre at Le Plan-de-la-Tour: compare the village start with the Les Vernades loop, explore the route map, elevation profile, GPX and practical advice.",
        "intro": "Walk to San Peïre from the village or Les Vernades. Choose your starting point and plan the return before enjoying the cork oaks, granite and views over the Golfe.",
        "sections": [
            [
                "One summit, two approaches",
                "The village start offers a half-day out-and-back hike. The Les Vernades loop published on Visorando is shorter. Compare them in the route section and use the directions for your chosen itinerary."
            ],
            [
                "Village route figures",
                "The official guidebook specifies 6 km and 2 hours one way, with a listed +370 m of outward ascent. Allow around 12 km and 4 hours excluding stops for an out-and-back hike. The tourist office webpage presents the figures differently; we explicitly distinguish the outward and return journeys."
            ],
            [
                "Prepare your walk",
                "There are rocky sections. Find authorised parking, bring water and check forest access on the day. The documented route does not replace signs or restrictions on the ground."
            ]
        ],
        "nearby": [
            [
                "plan-de-la-tour-village",
                "Plan a village break"
            ]
        ],
        "verified": "2026-10-27",
        "sources": [
            {
                "label": "Office de tourisme · Chemin vers le San Peire",
                "url": "https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/randonnee-chemin-vers-le-san-peire/"
            },
            {
                "label": "Topoguide officiel · Du Plan de la Tour au San Peïre (PDF, 18 Mo)",
                "url": "https://www.golfe-saint-tropez-information.com/files/visitgolfe/docs/randos-web-2023-gardefreinet-plandelatour-fr.pdf"
            },
            {
                "label": "Préfecture du Var · Carte d’accès aux massifs",
                "url": "https://www.var.gouv.fr/Actions-de-l-Etat/Foret/Fermeture-des-massifs-en-ete/Carte-d-acces-aux-massifs"
            },
            {
                "label": "Office du Golfe · GPX du départ village",
                "url": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/plan-de-la-tour/randonnee-chemin-vers-le-san-peire-5865643"
            },
            {
                "label": "Visorando · Pic de San Peïre, boucle des Vernades",
                "url": "https://www.visorando.com/randonnee-pic-de-san-peire/"
            },
            {
                "label": "IGN · Altimétrie RGE ALTI",
                "url": "https://cartes.gouv.fr/aide/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/calcul-altimetrique/"
            }
        ]
    }
},
  "moulin-de-paillas": {
    "fr": {
      "title": "Moulin de Paillas à Ramatuelle : visites, accès et panorama",
      "description": "Préparez la visite du Moulin de Paillas à Ramatuelle : route des Moulins, visites commentées, accès intérieur, météo et conseils pour organiser votre étape.",
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
          "Visite intérieure : vérifier le calendrier et la météo",
          "L’association Les Amis des Moulins de Ramatuelle assure les ouvertures commentées annoncées par l’office de tourisme. La fiche de visite indique une participation libre et une annulation en cas de mauvais temps. Consultez le prochain créneau avant de partir : découvrir les abords ne signifie pas que le mécanisme est accessible tous les jours."
        ],
        [
          "Accès au moulin et visite avec une mobilité réduite",
          "L’adresse publiée est route des Moulins de Paillas, à Ramatuelle. La fiche officielle signale un parking à proximité et une visite non accessible en fauteuil roulant. Si vous avez besoin de limiter la marche ou les marches, contactez l’office au 04 98 12 64 00 avant le déplacement."
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
      ],
      "verified": "2026-10-30",
      "sources": [
        {
          "label": "Office de Ramatuelle · visites, accès et calendrier",
          "url": "https://www.ramatuelle-tourisme.com/fr/animation/culture/ramatuelle/visite-du-moulin-de-paillas-5995772/"
        },
        {
          "label": "Office de Ramatuelle · patrimoine du moulin",
          "url": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-nature/les-tresors-caches/moulin-de-paillas/"
        }
      ]
    },
    "en": {
      "title": "Moulin de Paillas in Ramatuelle: visits, access and views",
      "description": "Plan a visit to Moulin de Paillas in Ramatuelle: Route des Moulins access, guided openings, interior visits, weather and practical planning advice.",
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
          "Interior visits: check the calendar and weather",
          "Les Amis des Moulins de Ramatuelle runs the guided openings listed by the tourist office. The visit listing states voluntary contributions and cancellation in bad weather. Check the next session before travelling: seeing the surroundings does not mean the mechanism is accessible every day."
        ],
        [
          "Getting to the windmill with reduced mobility",
          "The published address is Route des Moulins de Paillas, Ramatuelle. The official visit listing mentions nearby parking and states that the visit is not wheelchair accessible. To check walking distances or steps for your needs, contact the tourist office on +33 4 98 12 64 00 before travelling."
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
      ],
      "verified": "2026-10-30",
      "sources": [
        {
          "label": "Ramatuelle Tourism · visits, access and dates",
          "url": "https://www.ramatuelle-tourisme.com/fr/animation/culture/ramatuelle/visite-du-moulin-de-paillas-5995772/"
        },
        {
          "label": "Ramatuelle Tourism · windmill heritage",
          "url": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-nature/les-tresors-caches/moulin-de-paillas/"
        }
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
