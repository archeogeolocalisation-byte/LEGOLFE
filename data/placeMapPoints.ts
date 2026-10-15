import type {MapPoint} from '../lib/placeMapLinks';
// Public venue references from official sources; never inferred from a business owner’s home.
export const placeMapPoints:Record<string,MapPoint[]> = {

  "chateau-minuty":[{
    id:"chateau-minuty-shop",label:{fr:"Château Minuty · accueil du domaine",en:"Château Minuty · winery visitor point"},
    latitude:43.241553,longitude:6.59228,source:"https://www.cirkwi.com/fr/point-interet/1211419-chateau-minuty",checked:"2026-10-15",kind:"venue",
    note:{fr:"Accueil du domaine au 2491 route de la Berle à Gassin. Repère publié par l'office de tourisme de Gassin ; vérifiez les visites et dégustations avant de venir.",en:"Winery visitor address at 2491 Route de la Berle, Gassin. Location published by the Gassin tourist office; check tours and tastings before visiting."},
    directionsQuery:"2491 route de la Berle, 83580 Gassin, France"
  }],
  "escalet":[{
    id:"escalet-beach",label:{fr:"Plage de l’Escalet · secteur de plage",en:"L’Escalet beach · coastal area"},
    latitude:43.18644,longitude:6.64229,source:"https://www.openstreetmap.org/way/30585237",checked:"2026-10-15",kind:"area",
    note:{fr:"Repère du secteur naturel de la plage, pas un accès voiture ni une place de stationnement. Vérifiez les conditions d'accès avant la balade.",en:"Natural beach-area reference, not a vehicle access point or parking space. Check current beach access before setting out."},
    directionsQuery:"Plage de l'Escalet, 83350 Ramatuelle, France"
  }],
  "ramatuelle-village":[{
    id:"ramatuelle-village-center",label:{fr:"Ramatuelle · cœur du village",en:"Ramatuelle · village centre"},
    latitude:43.21514,longitude:6.6128,source:"https://www.openstreetmap.org/node/332057910",checked:"2026-10-15",kind:"area",
    note:{fr:"Repère du village ancien, pas l'entrée d'un parking. Stationnement et accès piétons à vérifier en fonction de la saison.",en:"Reference for the historic village, not a car park entrance. Check seasonal parking and pedestrian access."},
    directionsQuery:"Village de Ramatuelle, 83350 Ramatuelle, France"
  }],
  "bello-visto":[{
    id:"bello-visto-hotel",label:{fr:"Bello Visto · hôtel et restaurant",en:"Bello Visto · hotel and restaurant"},
    latitude:43.2284,longitude:6.58585,source:"https://www.openstreetmap.org/node/4307192487",checked:"2026-10-15",kind:"venue",
    note:{fr:"Repère OpenStreetMap de l'hôtel-restaurant, place Deï Barri. Le site officiel indique une fermeture saisonnière après le 11 octobre 2026 : confirmez sa réouverture avant tout déplacement.",en:"OpenStreetMap hotel and restaurant marker at Place Deï Barri. Its official website states seasonal closure after 11 October 2026: confirm reopening before travelling."},
    directionsQuery:"Place Deï Barri, 83580 Gassin, France"
  }],

  "musee-gendarmerie-cinema":[{
    id:"musee-gendarmerie-cinema",label:{fr:"Musée de la Gendarmerie et du Cinéma",en:"Gendarmerie and Cinema Museum"},
    latitude:43.26964,longitude:6.63554,
    source:"https://www.openstreetmap.org/way/179782164",checked:"2026-10-15",kind:"venue",
    note:{fr:"Musée situé dans l’ancienne gendarmerie, au 2 place Blanqui à Saint-Tropez. Repère du bâtiment, pas d’un parking ; vérifiez les horaires du musée.",en:"Museum in the former gendarmerie at 2 Place Blanqui, Saint-Tropez. This marks the building, not a car park; check museum opening times."},
    directionsQuery:"2 place Blanqui, 83990 Saint-Tropez, France"
  }],
  "gigaro-beach":[{
    id:"plage-gigaro",label:{fr:"Plage de Gigaro · secteur central",en:"Gigaro Beach · central section"},
    latitude:43.1840143,longitude:6.5980572,
    source:"https://www.cirkwi.com/fr/point-interet/3341772-plage-de-gigaro",checked:"2026-10-15",kind:"area",
    note:{fr:"Repère de la plage publié par La Croix-Valmer Tourisme. Ce n’est pas une place de stationnement garantie ; vérifiez l’accès par le boulevard de Gigaro.",en:"Beach reference published by La Croix-Valmer Tourism. This is not guaranteed parking; check access from Boulevard de Gigaro."},
    directionsQuery:"1198 boulevard de Gigaro, 83420 La Croix-Valmer, France"
  }],
  "domaine-de-la-croix":[{id:"boutique-domaine",label:{fr:"Domaine de La Croix · Boutique & chais",en:"Domaine de La Croix · Shop & cellar"},latitude:43.1982,longitude:6.56966,source:"https://www.cirkwi.com/fr/point-interet/2271236-domaine-de-la-croix",checked:"2026-10-15",kind:"venue",note:{fr:"Repère de la boutique au 816 boulevard de Tabarin, La Croix-Valmer. Visite des chais sur réservation : vérifiez les créneaux avant le départ.",en:"Shop and winery marker at 816 Boulevard de Tabarin, La Croix-Valmer. Cellar tours require booking; check the current schedule."},directionsQuery:"816 boulevard de Tabarin, 83420 La Croix-Valmer, France"}],
  "moulin-de-paillas":[{id:"moulin-de-paillas",label:{fr:"Moulin de Paillas",en:"Paillas windmill"},latitude:43.21379,longitude:6.60534,source:"https://www.openstreetmap.org/way/179933452",checked:"2026-10-15",kind:"venue",note:{fr:"Repère du moulin restauré au col de Paillas, au-dessus de Ramatuelle. Accès et visites à vérifier auprès de l’office de tourisme.",en:"Restored windmill above Ramatuelle near Col de Paillas. Check public access and visit conditions with the tourist office."},directionsQuery:"Moulin de Paillas, Ramatuelle, France"}],
  "cap-taillat":[{id:"cap-taillat",label:{fr:"Cap Taillat · Pointe naturelle",en:"Cap Taillat · Coastal headland"},latitude:43.1679,longitude:6.6464,source:"https://www.openstreetmap.org/node/12784305722",checked:"2026-10-15",kind:"area",note:{fr:"Ce point indique le cap naturel, PAS un accès voiture. Préparez une marche sur le sentier littoral depuis l’Escalet et vérifiez l’ouverture des massifs.",en:"This marker shows the natural headland, NOT vehicle access. Plan a coastal-path hike from L’Escalet and check seasonal access restrictions."},directionsQuery:"Plage de l’Escalet, Ramatuelle, France"}],
  "pont-des-fees":[{id:"sentier-pont-des-fees",label:{fr:"Sentier du Pont des Fées · Accès",en:"Pont des Fées trail · Access"},latitude:43.27731,longitude:6.52174,source:"https://www.openstreetmap.org/node/1746575663",checked:"2026-10-15",kind:"area",note:{fr:"Repère d’accès au sentier, et NON la position exacte de l’aqueduc. Le site se découvre à pied : vérifiez le départ et le cheminement sur le terrain.",en:"Trail access marker, NOT the exact aqueduct position. The site is reached on foot; check the walking route before setting off."},directionsQuery:"Sentier du Pont des Fées, Grimaud, France"}],
  "gaio-club": [
    {
      "id": "gaio-club",
      "label": {
        "fr": "Gaïo",
        "en": "Gaïo"
      },
      "latitude": 43.271578,
      "longitude": 6.637102,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/gaio-5912797/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "caves-du-roy": [
    {
      "id": "caves-du-roy",
      "label": {
        "fr": "Les Caves du Roy",
        "en": "Les Caves du Roy"
      },
      "latitude": 43.270285,
      "longitude": 6.644511,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/les-caves-du-roy-4082965/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "opera-saint-tropez": [
    {
      "id": "opera-saint-tropez",
      "label": {
        "fr": "L'Opera",
        "en": "L'Opera"
      },
      "latitude": 43.27095,
      "longitude": 6.636318,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/l-opera-4762506/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "la-voile": [
    {
      "id": "la-voile",
      "label": {
        "fr": "La Voile — La Réserve Ramatuelle",
        "en": "La Voile — La Réserve Ramatuelle"
      },
      "latitude": 43.1924514,
      "longitude": 6.648261999999999,
      "source": "https://www.lareserve-ramatuelle.com/restaurant/restaurant-gastronomique-saint-tropez/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "place-des-lices": [
    {
      "id": "place-des-lices",
      "label": {
        "fr": "Place des Lices & market",
        "en": "Place des Lices & market"
      },
      "latitude": 43.269977,
      "longitude": 6.641176,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "citadelle-saint-tropez": [
    {
      "id": "citadelle-saint-tropez",
      "label": {
        "fr": "Citadelle de Saint-Tropez",
        "en": "Citadelle de Saint-Tropez"
      },
      "latitude": 43.272423,
      "longitude": 6.644297,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/la-citadelle-musee-d-histoire-maritime-4171083/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "domaine-rayol-kids": [
    {
      "id": "domaine-rayol-kids",
      "label": {
        "fr": "Domaine du Rayol — Les mains dans la terre",
        "en": "Domaine du Rayol — Les mains dans la terre"
      },
      "latitude": 43.15593938891055,
      "longitude": 6.481009509464553,
      "source": "https://www.domainedurayol.org/agenda-domaine-rayol/activites/activites-enfants/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "master-ninja-cogolin": [
    {
      "id": "master-ninja-cogolin",
      "label": {
        "fr": "Master Ninja · La Palmeraie",
        "en": "Master Ninja · La Palmeraie"
      },
      "latitude": 43.264032,
      "longitude": 6.575393,
      "source": "https://cotedazurfrance.fr/offres/master-ninja-cogolin-fr-4339372/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "maison-des-papillons": [
    {
      "id": "maison-des-papillons",
      "label": {
        "fr": "Maison des Papillons · Musée Dany Lartigue",
        "en": "Maison des Papillons · Musée Dany Lartigue"
      },
      "latitude": 43.270743,
      "longitude": 6.638513,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/maison-des-papillons-musee-dany-lartigue-4165778/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "les-halles-saint-tropez": [
    {
      "id": "les-halles-saint-tropez",
      "label": {
        "fr": "Les Halles de Saint-Tropez",
        "en": "Les Halles de Saint-Tropez"
      },
      "latitude": 43.272081,
      "longitude": 6.636594,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/les-halles-de-saint-tropez-5936300/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "Repère publié par le lieu ou son office de tourisme. Confirmez les horaires et les conditions du dernier accès avant de partir.",
        "en": "Location reference published by the venue or its tourist office. Confirm opening times and the final approach before travelling."
      }
    }
  ],
  "saint-tropez-village": [
    {
      "id": "lices",
      "label": {
        "fr": "Place des Lices",
        "en": "Place des Lices"
      },
      "latitude": 43.269977,
      "longitude": 6.641176,
      "source": "https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/",
      "checked": "2026-10-13",
      "kind": "area",
      "note": {
        "fr": "La place des Lices sert de repère dans le centre de Saint-Tropez. Ce point ne désigne pas un parking ; préparez séparément votre stationnement.",
        "en": "Place des Lices is a reference point in central Saint-Tropez. It is not a parking location; plan parking separately."
      }
    }
  ],
  "grimaud-village": [
    {
      "id": "office",
      "label": {
        "fr": "Office de tourisme · village",
        "en": "Tourist office · village"
      },
      "latitude": 43.272784,
      "longitude": 6.521573,
      "source": "https://www.grimaud-provence.com/pratique/office-de-tourisme-de-grimaud-grimaud-fr-3018001/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "L’office de tourisme est un point d’arrivée au village de Grimaud. Consultez les conditions de stationnement ; la visite du centre se poursuit à pied.",
        "en": "The tourist office is an arrival reference in Grimaud village. Check parking conditions; continue through the historic centre on foot."
      }
    },
    {
      "id": "centre",
      "label": {
        "fr": "Centre historique",
        "en": "Historic centre"
      },
      "latitude": 43.274144,
      "longitude": 6.522187,
      "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/centre-historique-de-grimaud-grimaud-fr-3032976/",
      "checked": "2026-10-13",
      "kind": "area",
      "note": {
        "fr": "Repère du centre historique : ruelles en pente et escaliers. Il ne correspond pas à un parking ni à un accès voiture jusqu’au château.",
        "en": "Historic-centre reference: sloping streets and steps. This is not parking or vehicle access to the castle."
      }
    }
  ],
  "port-grimaud": [
    {
      "id": "cite",
      "label": {
        "fr": "Cité lacustre de Port Grimaud",
        "en": "Port Grimaud canal town"
      },
      "latitude": 43.27483,
      "longitude": 6.579514,
      "source": "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/cite-lacustre-de-port-grimaud-grimaud-fr-3032930/",
      "checked": "2026-10-13",
      "kind": "area",
      "note": {
        "fr": "Repère de la cité lacustre, distincte du village perché. Vérifiez les parkings visiteurs et poursuivez à pied en respectant les zones réservées.",
        "en": "Canal-town reference, separate from the hilltop village. Check visitor parking and continue on foot, respecting restricted areas."
      }
    }
  ],
  "pampelonne": [
    {
      "id": "plage",
      "label": {
        "fr": "Plage de Pampelonne · repère de secteur",
        "en": "Pampelonne beach · area reference"
      },
      "latitude": 43.217889,
      "longitude": 6.661963,
      "source": "https://www.visitvar.fr/fiche/plage-de-pampelonne-4600954",
      "checked": "2026-10-13",
      "kind": "area",
      "note": {
        "fr": "Pampelonne possède plusieurs accès. Le point situe la plage, pas un parking ni une entrée de beach club. Choisissez votre accès dans la fiche officielle avant de lancer un itinéraire.",
        "en": "Pampelonne has several access points. This marker locates the beach, not parking or a beach-club entrance. Choose your access in the official information before requesting directions."
      },
      "directionsQuery": "Plage de Pampelonne, Ramatuelle, France"
    }
  ],
  "sainte-maxime-village": [
    {
      "id": "centre-office",
      "label": {
        "fr": "Centre · office de tourisme",
        "en": "Centre · tourist office"
      },
      "latitude": 43.308997,
      "longitude": 6.638711,
      "source": "https://www.sainte-maxime.com/profiter/commerces-et-services/office-de-tourisme-de-sainte-maxime-sainte-maxime-fr-6295644/",
      "checked": "2026-10-13",
      "kind": "venue",
      "note": {
        "fr": "L’office de tourisme, place Louis-Blanc, sert de repère au centre de Sainte-Maxime. La Nartelle est une autre étape, à sélectionner séparément. Ce point ne désigne pas un parking.",
        "en": "The tourist office on Place Louis-Blanc is a reference in central Sainte-Maxime. Select La Nartelle separately for that beach. This is not a parking marker."
      }
    },
    {
      "id": "nartelle",
      "label": {
        "fr": "Plage de la Nartelle",
        "en": "La Nartelle beach"
      },
      "latitude": 43.322622,
      "longitude": 6.664884,
      "source": "https://www.sainte-maxime.com/profiter/plage-de-la-nartelle-sainte-maxime-fr-6295716/",
      "checked": "2026-10-13",
      "kind": "area",
      "note": {
        "fr": "La Nartelle se trouve à l’est du centre de Sainte-Maxime, le long de l’avenue du Général Touzet du Vigier. Le repère situe la plage ; l’itinéraire recherche l’avenue d’accès, sans garantir une place de parking.",
        "en": "La Nartelle is east of central Sainte-Maxime, along Avenue du Général Touzet du Vigier. The marker locates the beach; directions search for the access road, without guaranteeing parking."
      },
      "directionsQuery": "Avenue du Général Touzet du Vigier, 83120 Sainte-Maxime, France"
    }
  ]
};
