# Carte touristique LE GOLFE — 13 octobre 2026

La maquette validée devient une page `/fr/carte-touristique` et `/en/carte-touristique`, reliée au menu desktop/mobile, au footer et à Explorer. Elle présente le territoire et son relief ; la future carte générale du catalogue Explorer n'est pas incluse.

## Territoire et données

Quatorze repères : les douze communes du Golfe, Port Grimaud et la Nartelle. Les coordonnées viennent d'OpenStreetMap (géocodage ponctuel Nominatim avec pauses, aucune requête à la visite) ou des liens publics des offices consultés le 13 octobre. `data/touristMap.ts` conserve sources et dates. Les coordonnées OSM des communes sont des repères territoriaux, pas des entrées de bâtiments. Le libellé peut être décalé par rapport au point pour éviter les chevauchements ; les coordonnées géographiques restent intactes.

Le relief est issu des Terrain Tiles / Mapzen au zoom 11, neuf tuiles Terrarium dans le cadre Web Mercator `[6.38,43.135,6.83,43.385]`. Décodage d'altitude : `R*256 + G + B/256 - 32768`. Couleurs discrètes d'altitude, ombrage et généralisation du littoral : il s'agit d'une représentation touristique du terrain, pas d'un plan routier ni d'une carte nautique. Les coordonnées sont projetées dans le même cadre que le raster via `lib/touristMap.ts`.

Attributions OpenStreetMap et Terrain Tiles visibles ; détail des sources EU-DEM/Copernicus, USGS et NOAA consultable sur la page. Aucun dessin ou fond de la carte de l'office n'est repris. Les illustrations de Grimaud et Port Grimaud sont les créations imagegen approuvées dans cette conversation, explicitement légendées comme illustrations. Les anciennes photos des fiches restent en place.

`public/media/tourist-map/sources.json` conserve cadre, provenance, empreintes des tuiles d'altitude et des quatre médias livrés, dimensions et transformations. Les fichiers WebP pèsent 68–74 Ko chacun. Le fond et les illustrations sont servis par le site avec Next Image et des tailles adaptées ; aucun appel à un service cartographique, aucune clé API ni géolocalisation sur cette page.

## Interactions et parcours

Sélection par boutons ou liste. Zoom de 1 à 2,5, déplacement au toucher/souris et aux flèches lorsque la carte est zoomée, retour à la vue d'ensemble. Les déplacements sont bornés pour ne pas découvrir d'espace vide. La navigation au clavier vers un repère hors du cadre recentre la vue. Sur mobile, les noms non sélectionnés sont masqués au profit de la liste complète ; le résumé passe sous la carte. Le toucher fait défiler la page tant que la carte n'est pas zoomée.

Liens vers les pages de communes et fiches existantes. Grimaud et Port Grimaud sont distincts. Le lien Nartelle annonce explicitement la fiche Sainte-Maxime, où son plan est déjà disponible ; aucune nouvelle fiche sans média autorisé n'est créée. La Garde-Freinet n'a pas encore de fiche LE GOLFE : son bouton ouvre les informations officielles de l'office.

## Référencement et validation

Titres/descriptions FR/EN, canonicals/alternates, couverture sociale aplatie sur fond bleu, CollectionPage et liste de liens sans doublons. URL, date et image ajoutées au sitemap. Isolation des previews préservée, branche sans déploiement public de prévisualisation. Aucun changement de base ou variable d'environnement.

`node scripts/test-tourist-map.cjs` vérifie les 14 repères, sources/liens, projection, limites de déplacement, médias et empreintes ; rendus SSR FR/EN, navigation, métadonnées/sitemap et noindex de preview. Les vrais handlers du composant sont aussi exercés avec un état de hooks isolé : sélection, zoom, déplacement par pointeur/clavier et remise à zéro. Il ne s'agit pas d'un test navigateur. Les suites existantes sont exécutées en CI avec TypeScript et compilation. Le fond de carte et la couverture ont été contrôlés visuellement.

Pas de contrôle navigateur de la branche depuis cet environnement. Après publication : vérifier les deux langues, les 14 sélections, Grimaud/Port Grimaud/Nartelle, le lien officiel de La Garde-Freinet, le zoom/déplacement au clavier et sur téléphone, puis la couverture sociale et le sitemap.

## Visuels des villages et routes — 13 octobre 2026

Ajout des illustrations approuvées pour Le Plan-de-la-Tour, Gassin, Sainte-Maxime, La Môle (avion au loin), Cavalaire, La Garde-Freinet et Saint-Tropez. WebP 600 × 400 de 51–71 Ko avec empreintes dans le manifeste. Les signatures fournies sont conservées ; les visuels entiers sont visibles sur mobile, sans recadrage vertical. Les images de Grimaud et Port Grimaud restent en place. Les photos et galeries des fiches ne changent pas.

La page propose deux liens externes Routes / Trafic en direct et un itinéraire Google Maps pour chaque lieu. URL Maps officielles `api=1`, carte `basemap=roadmap`, trafic `layer=traffic`. Le trajet recherche le lieu par son nom dans le Var ; aucune coordonnée de centroïde communal utilisée comme arrivée et aucun départ imposé. Google Maps demande ou choisit le départ. Les conditions de trafic sont fournies par Google selon la couverture ; ce ne sont pas des mesures affichées sur notre relief.

Pas de script ou iframe Google, pas de requête tierce avant clic, aucune nouvelle clé ni facturation API. Documentation vérifiée : https://developers.google.com/maps/documentation/urls/get-started . Une future carte de trafic intégrée nécessiterait Maps JavaScript API / TrafficLayer, clé restreinte et projet Google avec facturation activée ; elle n'est pas activée ici.

Validation : suite tourist-map étendue aux nouveaux visuels, liens routes/trafic et itinéraires de chaque sélection en FR/EN ; TypeScript, ESLint et compilation CI. Contrôle navigateur à effectuer après publication : ouverture Google Maps sur téléphone et bureau, activation du calque trafic selon la couverture et images sans recadrage. Branche feature/village-visuals sans preview publique.
