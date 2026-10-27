# Localisation des 108 fiches Explorer — 27 octobre 2026

Les 108 fiches ont été reprises : **104 disposent d’au moins un point public sourcé, 4 restent sur une carte de secteur**. Cela représente 107 repères, dont les choix secondaires des fiches à plusieurs lieux. La revue ajoute 18 repères à 17 fiches ; les 89 repères existants sont conservés après recoupement documentaire.

Le registre complet est dans [place-localisation-review-2026-10-27.csv](place-localisation-review-2026-10-27.csv). Une ligne par repère, ou une ligne de secteur pour une fiche sans point : nom, coordonnées, sources, fonction du repère et limites d’accès. La date de cette revue ne signifie pas une visite physique des lieux. Les dates de vérification antérieures des repères existants ne sont pas réécrites.

## Compléments apportés

| Fiche | Repère retenu | Précaution |
| --- | --- | --- |
| Pointe des Sardinaux | Plage de la pointe, 43.314625 / 6.671237, publiée par Sport Nature Var | Presqu’île, pas îlot protégé ; arrivée à pied, pas parking |
| Musée du Patrimoine de Grimaud | Musée, 591 route Nationale, coordonnées du tourisme régional | Horaires saisonniers et entrée accessible à confirmer |
| Pardigon II | Vestiges de la villa, coordonnées du tourisme du Golfe | Pas une place de parking réservée ; accès à pied à la plateforme |
| Notre-Dame de Miremer | Chapelle sur la colline, donnée La Garde-Freinet Tourisme sur Cirkwi, recoupée avec la fiche actuelle du Golfe | Pas de garantie d’accès motorisé ; intérieur et accès aux massifs à confirmer |
| Sainte-Magdeleine à La Môle | Chapelle médiévale, coordonnées de la fiche du monument | Distincte de l’église du village et du départ du circuit ; marche à pied |
| Plage de la Nartelle | Point publié dans l’itinéraire de l’office de Sainte-Maxime | Plage, pas établissement privé ni parking ; même référence que le choix Nartelle de la fiche du village |
| SNSM de Cavalaire | Station, 59 rue de la Digue, géolocalisation publiée par la SNSM | Station opérationnelle ; contact préalable pour rencontrer les bénévoles |
| Société Nautique de Saint-Tropez | Club au Nouveau Port, coordonnées de Saint-Tropez Tourisme | Les rendez-vous des régates peuvent différer |
| Amis de la Bravade | Oustau, 12 rue du Commandant Guichard | Adresse publiée par la Ville, point adresse BAN via IGN ; contact préalable |
| Association Festival de Ramatuelle | Théâtre de Verdure, coordonnées propres au lieu sur le site de l’office | Lieu des spectacles, pas siège de l’association ni billetterie de l’Espace Albert-Raphaël ; repère de type `area` |
| Boule Plantourianne | Boulodrome, boulevard du Maréchal Gallieni | Fiche du boulodrome 6543945, recoupée avec le tourisme régional ; ne pas substituer le point d’un concours voisin |
| Fête de la châtaigne | Place de la Mairie à La Garde-Freinet | Coordonnées publiées par Grimaud Tourisme pour l’offre 6100638 ; pas la place de la Vieille Mairie |
| Amis des Moulins de Ramatuelle | Moulin de Paillas, géométrie OpenStreetMap vérifiée et visites confirmées par l’office | Monument où se déroulent les visites, pas siège associatif ; repère de type `area` |
| La Joie de Lire | Bibliothèque Jean Aicard, point publié par le tourisme du Golfe | Bibliothèque gérée par l’association ; conserver la divergence 17/21 place Clémenceau et faire confirmer l’entrée |
| L’Escandihado | Adresse de contact publiée au 847 RD 558, identifiée au 847 route Nationale dans la BAN | Adresse de contact, pas certification du lieu de chaque atelier ; repère de type `area` |
| Bateaux Verts | Embarcadère Estacade du Nouveau Port à Saint-Tropez | Point du lien cartographique officiel de l’opérateur, pas centre de vue de la carte ; vérifier le port réservé |
| Caseneuve | Deux départs possibles : Marines de Cogolin et Estacade à Saint-Tropez | Points des liens de l’opérateur ; seuls le port et le quai confirmés à la réservation font foi |

Les deux rapprochements d’adresses par l’IGN ont donné une réponse BAN de type `housenumber`, avec commune, numéro et rue concordants. Leur source de coordonnées est distincte de la source publiée du lieu et accessible dans le module de localisation. Aucun géocodage n’est effectué à l’exécution du site.

## Secteurs conservés

- **AGDA** : pas de refuge ou d’accueil public confirmé. Les coordonnées de Cogolin présentes dans la fiche IntraMuros sont celles de la commune ; celles du répertoire des associations de Saint-Tropez ne localisent pas l’AGDA. Aucune de ces deux positions n’est utilisée comme point de l’association.
- **Cécile Golmard** : chef intervenant à domicile, sans restaurant ou accueil public vérifié.
- **Taxi Estelle** : service mobile, sans station de départ fixe confirmée.
- **Maison Laurent** : interventions dans les maisons, sans réception publique confirmée.

Ces quatre fiches gardent la carte de leur secteur et le texte explicite « sans repère exact vérifié ». Elles ne reçoivent ni coordonnées inventées, ni ancrage pour les recommandations par proximité.

## Contrôle du catalogue existant

- 72 des 89 repères initiaux recoupés avec les coordonnées publiées sur leur page source (métadonnées du lieu ou liens d’itinéraire).
- 8 repères OpenStreetMap recoupés avec l’API des objets : positions des nœuds ou emprise des bâtiments/plages. Les arrondis existants sont conservés.
- 9 autres recoupés dans les formats spécifiques des sources : liens OpenYourMap de Bonporteau et de la Corniche des Maures, marqueur de la plage centrale de Cavalaire, départ `trekDeparture` du circuit du Cap Lardier, fiche du phare de Camarat, lien GPS de La Verdoyante, donnée `Localisation` de Pampelonne, carte du Domaine du Rayol et carte du marché du Plan-de-la-Tour. La première lecture du phare a renvoyé HTTP 503 ; la seconde lecture a abouti et confirme ses coordonnées.
- Aucun des repères initiaux ne nécessite de correction de position à l’issue de ces recoupements. Les limites déjà indiquées pour les sommets, caps, départs de sentiers et offices de tourisme sont conservées.

Les coordonnées de pied de page des offices de Ramatuelle et de Gassin ont notamment été écartées pour le moulin de Paillas. Les points tirés de liens Google Maps utilisent la destination, pas le centre de cadrage `@latitude,longitude`.

## Validation ciblée

`test-place-maps.cjs` couvre les 216 versions FR/EN, les liens d’itinéraire, les cartes de secteur, les sources de coordonnées et les notes visibles. `test-verified-local-catalog.cjs` contrôle la couverture de toutes les fiches, y compris les associations, les quatre exceptions de secteur et les distinctions de lieux. Contrôle TypeScript et vérification de la proximité géographique existante. Aucun nouveau workflow ou audit lourd.
