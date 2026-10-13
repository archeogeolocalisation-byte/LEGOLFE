# Plans des fiches — 13 octobre 2026

Le bloc « Où se trouve ce lieu ? » est intégré à chacune des 43 fiches publiques FR/EN. Quinze fiches ont un plan avec un ou plusieurs repères documentés (17 points). Les autres proposent une recherche externe du nom et de la commune, avec un texte explicite indiquant qu'aucun repère précis n'est publié. Aucun géocodage automatique au moment de la visite ni point inventé.

## Repères et itinéraires

`data/placeMapPoints.ts` conserve les coordonnées publiques, le libellé, la source officielle, la date du contrôle et les conseils de dernier accès. Les sources ont été consultées : données GeoCoordinates ou liens d'itinéraire des offices et établissements. Les coordonnées d'une activité à domicile ne sont pas publiées. Les références territoriales sont identifiées comme telles, sans les présenter comme des parkings.

Grimaud : office de tourisme et centre historique distincts. Port Grimaud : cité lacustre distincte du village perché. Sainte-Maxime : office place Louis-Blanc et plage de la Nartelle. La Nartelle n'avait pas de fiche propre dans le catalogue ; son plan est proposé dans Sainte-Maxime, sans créer une fiche sans photo autorisée. Son point plage est celui de l'office ; « Y aller » recherche l'avenue du Général Touzet du Vigier, sans inventer un parking ou garantir une place. Pampelonne est un repère de secteur ; ses multiples accès doivent être choisis dans les informations officielles.

Les boutons Google Maps omettent le départ pour laisser le visiteur le choisir dans l'application. Aucun appel à la géolocalisation du navigateur et aucune clé API ajoutée. Le bloc montre le repère sélectionné et sa source ; sélectionner La Nartelle ne transforme pas la position générale de Sainte-Maxime dans les données structurées.

## Chargement du plan

Le visiteur clique sur « Afficher le plan » pour charger l'iframe officielle d'OpenStreetMap. Aucun appel cartographique n'est émis au rendu initial. Le plan reste masquable ; « Ouvrir le plan » et « Y aller » restent disponibles en cas de panne. L'attribution OSM est visible et la politique de referrer existante préservée. Pas de téléchargement groupé, de préchargement de tuiles ni de carte hors ligne. Ce fournisseur ne garantit pas la disponibilité du fond de carte.

Le fond OSM conserve son style standard ; le cadre, les boutons et les textes utilisent les couleurs LE GOLFE. La carte générale avec filtres dans Explorer est l'étape suivante et n'est pas incluse dans cette modification.

## Vérification

`node scripts/test-place-maps.cjs` : 17 références, coordonnées dans les limites du Golfe, sources HTTPS, bbox/marqueurs, URLs d'itinéraire et recherche, distinction centre/Nartelle, absence de coordonnées de service à domicile, 86 intégrations de routes et rendus SSR sans chargement de carte initial. Les données Supabase sont fictives et aucun compte utilisateur créé. Tests guides/fiches/Explorer et TypeScript également exécutés ; compilation et suites complètes en CI.

Pas de test navigateur du chargement de l'iframe depuis cet environnement. Après publication : vérifier `/fr/place/sainte-maxime-village` (centre puis Nartelle), `/fr/place/grimaud-village` (office puis centre), `/fr/place/port-grimaud`, `/fr/place/pampelonne` et une fiche sans coordonnées. Contrôler le plan au clic, les points, les liens Google Maps et les variantes EN.

Aucune migration ou variable d'environnement à ajouter. Branche `feature/place-maps` sans déploiement public de prévisualisation.
