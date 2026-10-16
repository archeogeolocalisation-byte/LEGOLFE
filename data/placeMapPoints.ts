import {grimaudMapPoints} from './grimaudPlaces';
import {sainteMaximeMapPoints} from './sainteMaximePlaces';
import {planDeLaTourMapPoints} from './planDeLaTourPlaces';
import type {MapPoint} from '../lib/placeMapLinks';
// Public venue references from official sources; never inferred from a business owner’s home.
export const placeMapPoints:Record<string,MapPoint[]> = {
 ...planDeLaTourMapPoints,
 ...sainteMaximeMapPoints,
 ...grimaudMapPoints,

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
  "cap-taillat":[{id:"cap-taillat",label:{fr:"Cap Taillat · Pointe naturelle",en:"Cap Taillat · Coastal headland"},latitude:43.1679,longitude:6.6464,source:"https://www.openstreetmap.org/node/12784305722",checked:"2026-10-15",kind:"area",note:{fr:"Ce point indique le cap naturel, PAS un accès voiture. Départs à pied depuis l’Escalet / Canadel ou en longue randonnée depuis Gigaro. Choisissez votre départ dans la fiche et vérifiez l’ouverture des massifs.",en:"This marker shows the natural headland, NOT vehicle access. Start on foot from l’Escalet / Canadel or take a longer hike from Gigaro. Choose your trailhead in the guide and check forest-access restrictions."},directionsQuery:"Plage de l’Escalet, Ramatuelle, France"}],
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
  ],
  "chateau-des-marres": [
    {
      "id": "chateau-des-marres-reference",
      "label": {
        "fr": "Château des Marres · accueil du domaine",
        "en": "Château des Marres · winery visitor point"
      },
      "latitude": 43.2434,
      "longitude": 6.64854,
      "source": "https://www.golfe-saint-tropez-information.com/fr/animation/chateau-des-marres-4600982",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "2998 route des Plages, 83350 Ramatuelle, France",
      "note": {
        "fr": "Repère du domaine au 2998 route des Plages. Les horaires de vente, de visite et du bar à vin saisonnier sont différents : confirmez votre créneau avant de venir.",
        "en": "Winery reference at 2998 Route des Plages. Shop, tour and seasonal wine-bar hours differ; confirm your visit before travelling."
      }
    }
  ],
  "base-nautique-cogolin": [
    {
      "id": "base-nautique-cogolin-reference",
      "label": {
        "fr": "Base nautique · plage des Marines de Cogolin",
        "en": "Water sports centre · Marines de Cogolin beach"
      },
      "latitude": 43.2629,
      "longitude": 6.59187,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cogolin/base-nautique-municipale-2803282",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "Base nautique municipale, Plage des Marines de Cogolin, 83310 Cogolin, France",
      "note": {
        "fr": "La base se trouve sur la plage des Marines de Cogolin, à distinguer du centre-ville. Confirmez l’activité, l’inscription, l’âge requis et le rendez-vous auprès de la base ; les sorties dépendent des conditions sur l’eau.",
        "en": "The centre is on Marines de Cogolin beach, separate from the town centre. Confirm the activity, registration, age requirements and meeting point with the centre; outings depend on conditions on the water."
      }
    }
  ],
  "cogolin-village": [
    {
      "id": "cogolin-village-reference",
      "label": {
        "fr": "Centre · bureau de tourisme",
        "en": "Town centre · tourist information"
      },
      "latitude": 43.2508,
      "longitude": 6.53726,
      "source": "https://www.golfe-saint-tropez-information.com/fr/services/point-d-information/cogolin/bureau-d-information-touristique-de-cogolin-4695297",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "45 avenue Georges Clemenceau, 83310 Cogolin, France",
      "note": {
        "fr": "Le bureau de tourisme au 45 avenue Georges Clemenceau sert de repère pour le centre de Cogolin. Les Marines de Cogolin et la base nautique sont sur le littoral, à sélectionner séparément. Ce point ne réserve pas de stationnement.",
        "en": "The tourist office at 45 Avenue Georges Clemenceau is a reference for central Cogolin. Select Marines de Cogolin and the water sports centre separately for the coast. This marker does not reserve parking."
      }
    }
  ],
  "la-croix-valmer-village": [
    {
      "id": "la-croix-valmer-village-reference",
      "label": {
        "fr": "Village · office de tourisme",
        "en": "Village · tourist office"
      },
      "latitude": 43.207,
      "longitude": 6.56826,
      "source": "https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/la-croix-valmer/office-de-tourisme-de-la-croix-valmer-839639",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "287 rue Louis Martin, 83420 La Croix-Valmer, France",
      "note": {
        "fr": "L’office de tourisme, 287 rue Louis Martin, situe le village. Gigaro et la plage du Débarquement sont d’autres secteurs de la commune : choisissez votre plage avant de préparer le trajet.",
        "en": "The tourist office at 287 Rue Louis Martin locates the village. Gigaro and Plage du Débarquement are different parts of the commune; choose your beach before planning the journey."
      }
    }
  ],
  "cavalaire-village": [
    {
      "id": "cavalaire-village-reference",
      "label": {
        "fr": "Maison de la Mer · office de tourisme",
        "en": "Maison de la Mer · tourist office"
      },
      "latitude": 43.173,
      "longitude": 6.53319,
      "source": "https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/cavalaire-sur-mer/office-de-tourisme-de-cavalaire-sur-mer-902874",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "50 rond-point Saint-Exupéry, 83240 Cavalaire-sur-Mer, France",
      "note": {
        "fr": "La Maison de la Mer, au 50 rond-point Saint-Exupéry, sert de repère pour le centre et le front de mer. Pour une sortie en bateau, demandez au prestataire le quai exact : le point de l’office n’est pas un lieu d’embarquement garanti.",
        "en": "Maison de la Mer at 50 Rond-point Saint-Exupéry is a reference for the centre and waterfront. For a boat trip, ask the operator for the exact quay; the office marker does not guarantee a boarding point."
      }
    }
  ],
  "la-mole-village": [
    {
      "id": "la-mole-village-reference",
      "label": {
        "fr": "Village · rue du Clocher",
        "en": "Village · Rue du Clocher"
      },
      "latitude": 43.2074,
      "longitude": 6.46574,
      "source": "https://www.golfe-saint-tropez-information.com/fr/services/bureau-d-accueil-et-point-d-information/la-mole/bureau-d-information-touristique-de-la-mole-5340058",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "2 rue du Clocher, 83310 La Môle, France",
      "note": {
        "fr": "Repère du village au 2 rue du Clocher, adresse du point d’information près de la médiathèque. L’accueil touristique est saisonnier : vérifiez son ouverture avant de vous déplacer pour obtenir des renseignements.",
        "en": "Village reference at 2 Rue du Clocher, the information point by the library. Tourist reception is seasonal; check opening before travelling there for advice."
      }
    }
  ],
  "plan-de-la-tour-village": [
    {
      "id": "plan-de-la-tour-village-reference",
      "label": {
        "fr": "Village · place Georges Clemenceau",
        "en": "Village · Place Georges Clemenceau"
      },
      "latitude": 43.3391,
      "longitude": 6.54748,
      "source": "https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/plan-de-la-tour/bureau-d-information-touristique-du-plan-de-la-tour-5340082",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "1 place Georges Clemenceau, 83120 Le Plan-de-la-Tour, France",
      "note": {
        "fr": "Le bureau de tourisme, 1 place Georges Clemenceau, sert de point de repère au village. Les domaines et départs de randonnée hors du centre demandent leur propre accès ; consultez la fiche de l’activité choisie.",
        "en": "The tourist office at 1 Place Georges Clemenceau is a village reference. Wineries and walks outside the centre require their own access details; check the selected activity’s information."
      }
    }
  ],
  "rayol-canadel-village": [
    {
      "id": "rayol-canadel-village-reference",
      "label": {
        "fr": "Rayol · place Michel Goy",
        "en": "Le Rayol · Place Michel Goy"
      },
      "latitude": 43.1599,
      "longitude": 6.4794,
      "source": "https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/rayol-canadel-sur-mer/bureau-d-information-touristique-du-rayol-canadel-sur-mer-814289",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Place Michel Goy, 83820 Rayol-Canadel-sur-Mer, France",
      "note": {
        "fr": "Le bureau de tourisme, place Michel Goy, situe le secteur du Rayol. Le Canadel, les plages et le Domaine du Rayol ont des accès distincts : ce repère ne remplace pas leur entrée ni un parking de plage.",
        "en": "The tourist office on Place Michel Goy locates the Le Rayol area. Le Canadel, the beaches and Domaine du Rayol have separate access points; this marker is neither their entrance nor beach parking."
      }
    }
  ],
  "gassin-village": [
    {
      "id": "gassin-village-reference",
      "label": {
        "fr": "Village perché · office de tourisme",
        "en": "Hilltop village · tourist office"
      },
      "latitude": 43.230067,
      "longitude": 6.585567,
      "source": "https://gassin.eu/fr/informations-pratiques/acces-a-gassin/",
      "checked": "2026-10-16",
      "kind": "area",
      "directionsQuery": "Office de tourisme, Montée Saint-Joseph, 83580 Gassin, France",
      "note": {
        "fr": "Repère de l’office à l’entrée du village perché. Suivez Gassin village / office de tourisme ; les Marines de Gassin sont sur le littoral. Consultez le plan officiel pour choisir votre stationnement puis continuez à pied.",
        "en": "Tourist-office reference at the hilltop village entrance. Follow signs for Gassin village / tourist office; Marines de Gassin is on the coast. Consult the official parking map, then continue on foot."
      }
    }
  ],
  "la-verdoyante": [
    {
      "id": "la-verdoyante-reference",
      "label": {
        "fr": "La Verdoyante · restaurant",
        "en": "La Verdoyante · restaurant"
      },
      "latitude": 43.2374,
      "longitude": 6.590186,
      "source": "https://www.la-verdoyante.fr/contact-reservation",
      "checked": "2026-10-16",
      "kind": "venue",
      "directionsQuery": "866 chemin vicinal de Coste Brigade, 83580 Gassin, France",
      "note": {
        "fr": "Le restaurant indique le 866 chemin vicinal de Coste Brigade. Depuis la D61 ou le village de Gassin, suivez les indications La Verdoyante sur ce chemin. La réservation se fait par téléphone : confirmez l’ouverture pour votre date.",
        "en": "The restaurant gives 866 Chemin Vicinal de Coste Brigade. From the D61 or Gassin village, follow La Verdoyante signs on this road. Book by telephone and confirm opening for your date."
      }
    }
  ],
  "monroes-pub": [
    {
      "id": "monroes-pub-reference",
      "label": {
        "fr": "Monroe’s Pub · avenue de la Mer",
        "en": "Monroe’s Pub · Avenue de la Mer"
      },
      "latitude": 43.2748,
      "longitude": 6.57612,
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/grimaud/monroe-s-pub-5067383",
      "checked": "2026-10-16",
      "kind": "venue",
      "note": {
        "fr": "Repère du pub au 125 avenue de la Mer, résidence Les Jardins de la Mer, près de Port Grimaud. Vérifiez la soirée choisie et les horaires avant de venir ; le repère ne désigne pas un parking du port.",
        "en": "Pub reference at 125 Avenue de la Mer, Les Jardins de la Mer residence, near Port Grimaud. Check the chosen evening and opening hours; the marker is not a harbour car park."
      },
      "directionsQuery": "125 avenue de la Mer, 83310 Grimaud, France"
    }
  ],
  "la-vague-dor": [
    {
      "id": "la-vague-dor-reference",
      "label": {
        "fr": "La Vague d’Or · Cheval Blanc",
        "en": "La Vague d’Or · Cheval Blanc"
      },
      "latitude": 43.2667,
      "longitude": 6.62647,
      "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/saint-tropez/la-vague-d-or-4078045",
      "checked": "2026-10-16",
      "kind": "venue",
      "note": {
        "fr": "Repère du restaurant au Cheval Blanc, plage de la Bouillabaisse. L’accès se prépare avec la Maison, distinctement d’une visite à la plage publique. Les sources diffèrent sur les jours de service : confirmez la saison et votre réservation auprès de Cheval Blanc.",
        "en": "Restaurant reference at Cheval Blanc on Plage de la Bouillabaisse. Arrange access with the hotel, separately from visiting the public beach. Published service days differ between sources; confirm the season and your booking with Cheval Blanc."
      },
      "directionsQuery": "La Vague d’Or, Cheval Blanc, Plage de la Bouillabaisse, 83990 Saint-Tropez, France"
    }
  ],
  "byblos-beach": [
    {
      "id": "byblos-beach-reference",
      "label": {
        "fr": "Byblos Beach · boulevard Patch",
        "en": "Byblos Beach · Boulevard Patch"
      },
      "latitude": 43.226,
      "longitude": 6.6618,
      "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/byblos-beach-5260740",
      "checked": "2026-10-16",
      "kind": "venue",
      "note": {
        "fr": "Le restaurant de plage se trouve au 42 boulevard Patch à Pampelonne, à Ramatuelle ; ce n’est pas l’hôtel Byblos du centre de Saint-Tropez. L’ouverture est saisonnière : confirmez la date et réservez séparément table ou transats.",
        "en": "The beach restaurant is at 42 Boulevard Patch on Pampelonne, Ramatuelle, separate from Hôtel Byblos in central Saint-Tropez. Opening is seasonal; confirm the date and book dining or sunbeds separately."
      },
      "directionsQuery": "42 boulevard Patch, 83350 Ramatuelle, France"
    }
  ],
  "club-55": [
    {
      "id": "club-55-reference",
      "label": {
        "fr": "Le Club 55 · boulevard Patch",
        "en": "Le Club 55 · Boulevard Patch"
      },
      "latitude": 43.2274,
      "longitude": 6.66131,
      "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/le-club-55-4601210",
      "checked": "2026-10-16",
      "kind": "venue",
      "note": {
        "fr": "L’accès routier indiqué par le Club 55 est le 43 boulevard Patch. Le club annonce un parking privé avec voiturier ; confirmez les conditions et votre réservation. Le ponton et les arrivées par bateau se préparent directement avec le club.",
        "en": "Club 55 gives its road access as 43 Boulevard Patch. It advertises a private car park with valet service; confirm conditions and your booking. Arrange pontoon access and boat arrivals directly with the club."
      },
      "directionsQuery": "43 boulevard Patch, 83350 Ramatuelle, France"
    }
  ],
  "indie-beach": [
    {
      "id": "indie-beach-reference",
      "label": {
        "fr": "Indie Beach · accès Bonne Terrasse",
        "en": "Indie Beach · Bonne Terrasse access"
      },
      "latitude": 43.214,
      "longitude": 6.6633,
      "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/indie-beach-5445018",
      "checked": "2026-10-16",
      "kind": "venue",
      "note": {
        "fr": "La fiche touristique donne le 471 chemin Garonne avec accès par la route de Bonne Terrasse. Ce repère situe le club, pas une arrivée par bateau ni un parking garanti. Le site du lieu annonce une fermeture hivernale : confirmez la réouverture avant de partir.",
        "en": "The tourism listing gives 471 Chemin Garonne, reached via Route de Bonne Terrasse. This marker locates the club, not a boat arrival or guaranteed parking. The venue website announces a winter closure; confirm reopening before travelling."
      },
      "directionsQuery": "Indie Beach, 471 chemin Garonne, route de Bonne Terrasse, 83350 Ramatuelle, France"
    }
  ],
  "casita-pampelonne": [
    {
      "id": "casita-pampelonne-reference",
      "label": {
        "fr": "Casita · plage de Pampelonne",
        "en": "Casita · Pampelonne beach"
      },
      "latitude": 43.2253,
      "longitude": 6.6623,
      "source": "https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/casita-4739267",
      "checked": "2026-10-16",
      "kind": "venue",
      "note": {
        "fr": "Repère du restaurant de plage Casita publié par l’office de tourisme. La fiche ne précise pas de numéro de rue : demandez l’accès routier et le stationnement au lieu avant le trajet. L’établissement est saisonnier ; les dates 2026 publiées ne garantissent pas une ouverture actuelle.",
        "en": "Casita beach-restaurant reference published by the tourist office. The listing gives no street number; ask the venue for road access and parking before travelling. This is a seasonal venue; its published 2026 dates do not guarantee current opening."
      }
    }
  ],
  "spa-du-bailli": [
    {
      "id": "spa-du-bailli-reference",
      "label": {
        "fr": "Spa du Bailli · hôtel Le Bailli de Suffren",
        "en": "Spa du Bailli · Le Bailli de Suffren hotel"
      },
      "latitude": 43.1563,
      "longitude": 6.47807,
      "source": "https://www.golfe-saint-tropez-information.com/fr/services/estheticienne/rayol-canadel-sur-mer/le-spa-du-bailli-1358186",
      "checked": "2026-10-16",
      "kind": "venue",
      "note": {
        "fr": "Le spa se situe dans l’hôtel Le Bailli de Suffren, 15 avenue des Américains. Réservez votre soin et confirmez les dates de saison ainsi que l’accès si vous ne séjournez pas à l’hôtel. Un soin ne garantit pas l’accès à la piscine ou aux autres équipements.",
        "en": "The spa is inside Le Bailli de Suffren hotel at 15 Avenue des Américains. Book your treatment and confirm seasonal dates and access for non-residents. A treatment does not guarantee access to the pool or other facilities."
      },
      "directionsQuery": "15 avenue des Américains, 83820 Rayol-Canadel-sur-Mer, France"
    }
  ],
  "san-peire-randonnee": [
    {
      "id": "san-peire-randonnee-reference",
      "label": {
        "fr": "Préparer la randonnée · centre du village",
        "en": "Hike preparation · village centre"
      },
      "latitude": 43.339115,
      "longitude": 6.547526,
      "source": "https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/randonnee-chemin-vers-le-san-peire/",
      "checked": "2026-10-16",
      "kind": "area",
      "note": {
        "fr": "Repère au village, 1 place Clemenceau, publié avec la randonnée. Ce point n’est ni le sommet ni une trace GPS du sentier. Consultez le topoguide et le balisage jaune, préparez le retour et vérifiez les restrictions d’accès aux massifs avant de partir.",
        "en": "Village reference at 1 Place Clemenceau, published with the hike. This point is neither the summit nor a GPS trail track. Consult the official route and yellow waymarks, allow for the return and check forest-access restrictions before setting off."
      },
      "directionsQuery": "1 place Clemenceau, 83120 Le Plan-de-la-Tour, France"
    }
  ]
};
