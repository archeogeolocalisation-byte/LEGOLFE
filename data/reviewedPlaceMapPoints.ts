import type {MapPoint} from '../lib/placeMapLinks';
// Public references reviewed on 2026-10-27. Never use tourism-office footer
// coordinates as venue coordinates. Related visit/boarding sites are labelled.
export const reviewedPlaceMapPoints:Record<string,MapPoint[]> = {
  "pointe-des-sardinaux": [
    {
      "id": "pointe-des-sardinaux-public-reference",
      "label": {
        "fr": "Pointe des Sardinaux · plage de la pointe",
        "en": "Pointe des Sardinaux · headland beach"
      },
      "latitude": 43.314625,
      "longitude": 6.671237,
      "kind": "area",
      "source": "https://sportnature.var.fr/outdoor-site/110-La-pointe-des-Sardinaux",
      "checked": "2026-10-27",
      "note": {
        "fr": "Coordonnées de la plage de la pointe publiées par Sport Nature Var. Ce point se trouve sur la presqu’île, pas sur l’îlot protégé ni sur un parking. Dernier accès à pied depuis la D559 ; respectez les restrictions affichées.",
        "en": "Headland beach coordinates published by Sport Nature Var. This marks the peninsula, not the protected islet or a car park. Final approach on foot from the D559; follow posted restrictions."
      },
      "travelMode": "walking"
    }
  ],
  "musee-patrimoine-grimaud": [
    {
      "id": "musee-patrimoine-grimaud-public-reference",
      "label": {
        "fr": "Musée du Patrimoine · 591 route Nationale",
        "en": "Heritage Museum · 591 Route Nationale"
      },
      "latitude": 43.273189,
      "longitude": 6.520678,
      "kind": "venue",
      "source": "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/musee-du-patrimoine-grimaud-fr-2853125/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère du musée publié par le tourisme régional, au 591 route Nationale. Il désigne le musée, pas un parking ; vérifiez les horaires saisonniers et l’entrée accessible avant votre visite.",
        "en": "Museum reference published by regional tourism at 591 Route Nationale. This marks the museum, not parking; check seasonal hours and the accessible entrance before visiting."
      },
      "directionsQuery": "Musée du Patrimoine, 591 route Nationale, 83310 Grimaud, France"
    }
  ],
  "villa-romaine-pardigon": [
    {
      "id": "villa-romaine-pardigon-public-reference",
      "label": {
        "fr": "Pardigon II · vestiges de la villa",
        "en": "Pardigon II · Roman villa remains"
      },
      "latitude": 43.1902,
      "longitude": 6.55634,
      "kind": "venue",
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-croix-valmer/villa-romaine-5903098",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère des vestiges publié par le tourisme du Golfe, à proximité du parking du Débarquement. Ce point ne réserve aucune place de stationnement. Rejoignez la plateforme de découverte par les cheminements autorisés et confirmez les visites guidées.",
        "en": "Ruins reference published by Golfe tourism near Débarquement beach car park. This does not reserve parking. Follow authorised paths to the viewing platform and confirm guided visits."
      },
      "travelMode": "walking"
    }
  ],
  "chapelle-notre-dame-miremer": [
    {
      "id": "chapelle-notre-dame-miremer-public-reference",
      "label": {
        "fr": "Notre-Dame de Miremer · chapelle sur la colline",
        "en": "Notre-Dame de Miremer · hilltop chapel"
      },
      "latitude": 43.2961677,
      "longitude": 6.4851952,
      "kind": "venue",
      "source": "https://www.cirkwi.com/fr/point-interet/408148-chapelle-notre-dame-de-miremer",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère de la chapelle publié par La Garde-Freinet Tourisme sur Cirkwi, recoupé avec la fiche du tourisme du Golfe. Il ne garantit pas un accès motorisé. Préparez la montée à pied, vérifiez l’ouverture des massifs et les conditions d’accès à l’intérieur.",
        "en": "Chapel reference published by La Garde-Freinet Tourism on Cirkwi and cross-checked against the Golfe tourism listing. This does not guarantee vehicle access. Plan the walk uphill and check forest access and interior opening."
      },
      "travelMode": "walking"
    }
  ],
  "chapelle-sainte-magdeleine-la-mole": [
    {
      "id": "chapelle-sainte-magdeleine-la-mole-public-reference",
      "label": {
        "fr": "Sainte-Magdeleine · chapelle et castrum",
        "en": "Sainte-Magdeleine · chapel and castrum"
      },
      "latitude": 43.2259,
      "longitude": 6.47276,
      "kind": "venue",
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/site-et-monument-historique/la-mole/la-chapelle-sainte-magdeleine-6501397",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère de la chapelle médiévale publié par le tourisme du Golfe, distinct de l’église du village de La Môle. Ce point est une destination à pied, pas un parking ni le départ du circuit. Suivez le parcours officiel et vérifiez les restrictions des massifs.",
        "en": "Medieval chapel reference published by Golfe tourism, distinct from La Môle village church. This is a walking destination, not parking or the trailhead. Follow the official route and check forest restrictions."
      },
      "travelMode": "walking"
    }
  ],
  "plage-de-la-nartelle": [
    {
      "id": "plage-de-la-nartelle-public-reference",
      "label": {
        "fr": "La Nartelle · secteur de plage",
        "en": "La Nartelle · beach area"
      },
      "latitude": 43.322622,
      "longitude": 6.664884,
      "kind": "area",
      "source": "https://www.sainte-maxime.com/profiter/plage-de-la-nartelle-sainte-maxime-fr-6295716/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère de la plage publié par l’office de Sainte-Maxime, avenue du Général Touzet du Vigier. Il ne désigne ni un établissement privé ni un parking précis. Vérifiez les accès, la surveillance et les conditions de baignade pour votre journée.",
        "en": "Beach reference published by the Sainte-Maxime tourist office on Avenue du Général Touzet du Vigier. It marks neither a private beach business nor a specific car park. Check access, lifeguards and swimming conditions for your day."
      }
    }
  ],
  "snsm-cavalaire": [
    {
      "id": "snsm-cavalaire-public-reference",
      "label": {
        "fr": "SNSM de Cavalaire · station de sauvetage",
        "en": "Cavalaire SNSM · lifeboat station"
      },
      "latitude": 43.170188,
      "longitude": 6.538852,
      "kind": "venue",
      "source": "https://etablissement.snsm.org/provence-alpes-cote-d-azur/var/cavalaire-sur-mer/station-snsm-de-cavalaire-sur-mer-51",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère publié par la SNSM pour sa station, 59 rue de la Digue. Il s’agit d’un lieu opérationnel de sauvetage : prenez contact avant de venir pour soutenir l’association ou rencontrer ses bénévoles. Ce n’est pas une permanence touristique.",
        "en": "Reference published by SNSM for its station at 59 Rue de la Digue. This is an operational rescue station: contact the team before visiting to offer support or meet volunteers. It is not a tourist reception desk."
      },
      "directionsQuery": "SNSM, 59 rue de la Digue, 83240 Cavalaire-sur-Mer, France"
    }
  ],
  "societe-nautique-saint-tropez": [
    {
      "id": "societe-nautique-saint-tropez-public-reference",
      "label": {
        "fr": "Société Nautique · Nouveau Port",
        "en": "Société Nautique · Nouveau Port"
      },
      "latitude": 43.270045,
      "longitude": 6.633728,
      "kind": "venue",
      "source": "https://www.sainttropeztourisme.com/fr/fiche/societe-nautique-de-saint-tropez-4840142/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère du club publié par Saint-Tropez Tourisme, dans le Nouveau Port, secteur quai Trullet et jetée Amiral Guépratte. Confirmez l’accueil avec la Société Nautique : les lieux de rendez-vous des régates peuvent être différents.",
        "en": "Club reference published by Saint-Tropez Tourism in the Nouveau Port, around Quai Trullet and Jetée Amiral Guépratte. Confirm reception with the club; regatta meeting points may differ."
      }
    }
  ],
  "amis-bravade-saint-tropez": [
    {
      "id": "amis-bravade-saint-tropez-public-reference",
      "label": {
        "fr": "Oustau de la Bravade · adresse de contact",
        "en": "Oustau de la Bravade · contact address"
      },
      "latitude": 43.272887,
      "longitude": 6.639806,
      "kind": "venue",
      "source": "https://www.saint-tropez.fr/project/les-amis-de-la-bravade-et-des-traditions-tropeziennes/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Adresse de l’association publiée par la Ville : Oustau de la Bravade, 12 rue du Commandant Guichard. Coordonnées issues de la Base Adresse Nationale via l’IGN. Prenez contact avant de venir ; les célébrations ont leurs propres lieux et horaires.",
        "en": "Association address published by the town: Oustau de la Bravade, 12 Rue du Commandant Guichard. Coordinates are from the national address database via IGN. Contact the association before visiting; celebrations have their own venues and times."
      },
      "directionsQuery": "12 rue du Commandant Guichard, 83990 Saint-Tropez, France",
      "coordinateSource": "https://data.geopf.fr/geocodage/search?q=12+rue+du+Commandant+Guichard+83990+Saint-Tropez&limit=3"
    }
  ],
  "association-festival-ramatuelle": [
    {
      "id": "association-festival-ramatuelle-public-reference",
      "label": {
        "fr": "Théâtre de Verdure · lieu des spectacles",
        "en": "Théâtre de Verdure · performance venue"
      },
      "latitude": 43.2163,
      "longitude": 6.61364,
      "kind": "area",
      "source": "https://www.ramatuelle-tourisme.com/fr/loisirs/autres-loisirs/ramatuelle/theatre-de-verdure-de-ramatuelle-4600976/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère du Théâtre de Verdure, La Rocade, publié par l’office de Ramatuelle. Il situe le lieu des spectacles, pas les bureaux de l’association ni la billetterie saisonnière de l’Espace Albert-Raphaël. Vérifiez le lieu d’accueil indiqué sur votre billet.",
        "en": "Théâtre de Verdure reference on La Rocade published by Ramatuelle tourism. It marks the performance venue, not the association offices or the seasonal ticket desk at Espace Albert-Raphaël. Check the reception point printed on your ticket."
      }
    }
  ],
  "boule-plantourianne": [
    {
      "id": "boule-plantourianne-public-reference",
      "label": {
        "fr": "La Boule Plantourianne · boulodrome",
        "en": "La Boule Plantourianne · pétanque grounds"
      },
      "latitude": 43.3382,
      "longitude": 6.54972,
      "kind": "venue",
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/plan-de-la-tour/la-boule-plantourianne-6543945",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère du boulodrome publié par le tourisme du Golfe, boulevard du Maréchal Gallieni. Confirmez auprès du club le terrain et l’heure du concours choisi ; ce point ne garantit ni un accès permanent ni une place de stationnement.",
        "en": "Pétanque grounds reference published by Golfe tourism on Boulevard du Maréchal Gallieni. Confirm the ground and starting time for your competition with the club; this does not guarantee permanent access or parking."
      }
    }
  ],
  "fete-chataigne-garde-freinet": [
    {
      "id": "fete-chataigne-garde-freinet-public-reference",
      "label": {
        "fr": "Fête de la châtaigne · place de la Mairie",
        "en": "Chestnut festival · Place de la Mairie"
      },
      "latitude": 43.317833,
      "longitude": 6.469195,
      "kind": "area",
      "source": "https://www.grimaud-provence.com/preparez/agenda/tout-lagenda/fete-de-la-chataigne-la-garde-freinet-fr-3878770/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère de la fête publié par Grimaud Tourisme, place de la Mairie à La Garde-Freinet. Il situe la place, pas une entrée de parking. Les stands occupent le secteur selon l’édition ; confirmez les dates et les restrictions de circulation.",
        "en": "Festival reference published by Grimaud Tourism on Place de la Mairie in La Garde-Freinet. It marks the square, not a car park entrance. Stall locations vary by edition; confirm dates and traffic restrictions."
      },
      "directionsQuery": "Place de la Mairie, 83680 La Garde-Freinet, France"
    }
  ],
  "amis-moulins-ramatuelle": [
    {
      "id": "amis-moulins-ramatuelle-public-reference",
      "label": {
        "fr": "Moulin de Paillas · lieu des visites",
        "en": "Paillas windmill · tour venue"
      },
      "latitude": 43.21379,
      "longitude": 6.60534,
      "kind": "area",
      "source": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-nature/les-tresors-caches/moulin-de-paillas/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère OpenStreetMap du moulin où l’office annonce les visites assurées par les Amis des Moulins. Il situe le monument, pas un siège associatif ni l’office de tourisme. Confirmez la prochaine visite et son rendez-vous avant de partir.",
        "en": "OpenStreetMap reference for the mill where the tourist office advertises visits led by Les Amis des Moulins. It marks the monument, not association headquarters or the tourist office. Confirm the next tour and meeting point before setting out."
      },
      "coordinateSource": "https://www.openstreetmap.org/way/179933452",
      "directionsQuery": "Moulin de Paillas, Ramatuelle, France"
    }
  ],
  "joie-de-lire-plan-de-la-tour": [
    {
      "id": "joie-de-lire-plan-de-la-tour-public-reference",
      "label": {
        "fr": "La Joie de Lire · bibliothèque Jean Aicard",
        "en": "La Joie de Lire · Jean Aicard library"
      },
      "latitude": 43.3394,
      "longitude": 6.54819,
      "kind": "venue",
      "source": "https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-culturels/plan-de-la-tour/bibliotheque-municipale-jean-aicard-5876867",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère publié pour la bibliothèque Jean Aicard, gérée par La Joie de Lire, place Clémenceau. Les sources divergent sur le numéro de rue ; privilégiez le nom de la bibliothèque et confirmez l’entrée et les horaires au 04 94 43 07 66.",
        "en": "Published reference for Jean Aicard library, run by La Joie de Lire on Place Clémenceau. Sources disagree on the street number; use the library name and confirm the entrance and opening hours on +33 4 94 43 07 66."
      },
      "directionsQuery": "Bibliothèque Jean Aicard, place Clémenceau, 83120 Le Plan-de-la-Tour, France"
    }
  ],
  "escandihado-grimaud-cogolin": [
    {
      "id": "escandihado-grimaud-cogolin-public-reference",
      "label": {
        "fr": "L’Escandihado · adresse de contact à Grimaud",
        "en": "L’Escandihado · Grimaud contact address"
      },
      "latitude": 43.272343,
      "longitude": 6.523508,
      "kind": "area",
      "source": "https://l-escandihado.my.canva.site/folklore",
      "checked": "2026-10-27",
      "note": {
        "fr": "Adresse de contact publiée par l’association au 847 RD 558, à Grimaud, géocodée dans la Base Adresse Nationale sous « 847 route Nationale ». Ce point ne confirme pas le lieu de chaque atelier : contactez le groupe avant tout déplacement.",
        "en": "Contact address published by the association at 847 RD 558 in Grimaud, geocoded in the national address database as “847 Route Nationale”. This does not confirm the venue of each workshop; contact the group before travelling."
      },
      "directionsQuery": "847 route Nationale, 83310 Grimaud, France",
      "coordinateSource": "https://data.geopf.fr/geocodage/search?q=847+route+nationale+83310+Grimaud&limit=3"
    }
  ],
  "bateaux-verts-excursion": [
    {
      "id": "bateaux-verts-excursion-public-reference",
      "label": {
        "fr": "Bateaux Verts · départ Saint-Tropez Estacade",
        "en": "Bateaux Verts · Saint-Tropez Estacade departure"
      },
      "latitude": 43.2703742,
      "longitude": 6.6327435,
      "kind": "area",
      "source": "https://www.bateauxverts.com/plan-dacces/",
      "checked": "2026-10-27",
      "note": {
        "fr": "Embarcadère Estacade du Nouveau Port indiqué par Les Bateaux Verts sur leur plan d’accès. Ce départ concerne Saint-Tropez ; d’autres ports sont proposés. Vérifiez le port, le quai et l’horaire sur votre réservation avant de vous diriger vers ce point.",
        "en": "Estacade pier in the Nouveau Port, identified on Les Bateaux Verts’ access map. This is the Saint-Tropez departure; other ports are available. Check the port, pier and time on your booking before heading here."
      }
    }
  ],
  "caseneuve-catamaran": [
    {
      "id": "caseneuve-catamaran-public-reference",
      "label": {
        "fr": "Caseneuve · départ possible aux Marines de Cogolin",
        "en": "Caseneuve · possible Marines de Cogolin departure"
      },
      "latitude": 43.2664346,
      "longitude": 6.5909251,
      "kind": "area",
      "source": "https://www.caseneuvemaxicatamaran.com/croisiere-coucher-de-soleil-mediterranee",
      "checked": "2026-10-27",
      "note": {
        "fr": "Repère du bureau devant les catamarans publié dans le lien cartographique de Caseneuve pour le départ des Marines de Cogolin. Plusieurs ports sont proposés selon la sortie : seul le lieu confirmé à la réservation fait foi. Ce point ne désigne pas tous les départs du Golfe.",
        "en": "Office reference in front of the catamarans, published in Caseneuve’s map link for the Marines de Cogolin departure. Several ports are offered depending on the trip; use the meeting point confirmed on your booking. This does not represent every Golfe departure."
      }
    },
    {
      "id": "caseneuve-saint-tropez-departure",
      "label": {
        "fr": "Caseneuve · départ possible Saint-Tropez",
        "en": "Caseneuve · possible Saint-Tropez departure"
      },
      "latitude": 43.2703742,
      "longitude": 6.6327435,
      "kind": "area",
      "source": "https://www.caseneuvemaxicatamaran.com/croisiere-coucher-de-soleil-mediterranee",
      "checked": "2026-10-27",
      "note": {
        "fr": "Autre départ publié par Caseneuve : ponton des navettes, quai Guépratte / Estacade à Saint-Tropez. Ne rejoignez ce quai que si votre réservation confirme ce port et ce rendez-vous.",
        "en": "Another departure published by Caseneuve: shuttle pier on Quai Guépratte / Estacade in Saint-Tropez. Only head to this pier if your booking confirms this port and meeting point."
      }
    }
  ]
};
