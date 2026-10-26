# Vie locale : sources et qualité, 23 octobre 2026

Le journal conserve sa mise en page. Le catalogue contient 20 brèves originales FR/EN et ses archives mensuelles ; quatre liens de rubrique ont été remplacés par les articles exacts (SPAR, VTC, Citadelle, réunions sur l’eau). Les dates de publication existantes restent inchangées.

## Trois brèves ajoutées

- Clocher de Saint-Tropez, publication du 20 octobre : préparation en octobre et interventions annoncées de novembre à fin mars 2027. Source : https://www.saint-tropez.fr/symbole-de-saint-tropez-le-clocher-entre-dans-une-nouvelle-phase-de-restauration/
- Saison culturelle La Renaissance hors les murs, publication du 20 octobre : programmation d’octobre à mai, lieux et billetterie accessibles depuis la source. https://www.saint-tropez.fr/la-renaissance-hors-les-murs-la-saison-culturelle-2026-2027-est-lancee/
- Médiathèque de La Croix-Valmer, publication RSS du 18 octobre : reprise du chantier le 7 septembre, rénovation et extension, achèvement envisagé en juin 2027. La date du chantier n’est pas utilisée comme date de publication. https://www.lacroixvalmer.fr/Les-travaux-de-la-mediatheque-demarrent

Textes propres, illustrations LE GOLFE déjà disponibles, aucun résumé municipal ou photographie externe copié.

## Sources complétées

15 sources : trois RSS publics, sept RSS de veille privée avec lien public vers la source, cinq liens municipaux sans import RSS. Les douze communes du Golfe sont représentées.

Le RSS municipal de La Croix-Valmer est annoncé par le bouton « S’abonner » des actualités : https://www.lacroixvalmer.fr/spip.php?page=backend_actu (HTTP 200, onze entrées au contrôle). Il emploie `dc:date`, désormais accepté par le lecteur. La source reste en accès par lien côté public ; la veille privée reçoit uniquement titres, dates et liens, avec le contrôle de réutilisation existant. Fixture à titres synthétiques. Le flux générique `page=backend`, qui mélange les rubriques, n’est pas utilisé.

Liens municipaux ajoutés, sans les annoncer comme des RSS actifs :

- Grimaud : https://www.mairie-grimaud.com/ ; endpoint `/feed/` testé absent (404).
- Cavalaire : https://www.cavalaire.fr/actualites ; aucun RSS annoncé dans cette page, endpoint testé `/actualites/rss.xml` absent (404).
- Ramatuelle : https://www.ramatuelle.fr/ ; page officielle identifiée mais accès automatisé et `/feed/` refusés (403). Aucun contournement.
- La Garde-Freinet : https://www.lgf83.fr/ ; destination actuelle de la redirection du domaine municipal, aucun RSS annoncé dans l’accueil contrôlé.
- Rayol-Canadel : https://www.rayol-canadel.fr/fr/actualites.htm ; actualités municipales accessibles, aucun RSS vérifié.

Les liens seuls sont exclus des sources de l’import éditorial pour ne pas tenter de les interpréter comme du XML. Les restrictions existantes des six RSS privés restent appliquées.

## Fraîcheur et doublons

Les trois RSS publics ont été relus le 23 octobre : quatorze titres d’actualité valides dans la copie de secours ; les événements sont toujours exclus par leurs chemins. Cache serveur de six heures, plafond de 2 Mo et délai de quatre secondes conservés.

Une copie de secours ne sert plus au-delà de sept jours après vérification, ni avant sa date de vérification. Les cartes de flux n’affichent que les publications des 90 derniers jours. Une panne avec secours expiré laisse un message et le lien officiel ; elle n’efface aucune brève du journal ou des archives.

Les identités d’articles retirent les fragments et les seuls paramètres de suivi connus (utm, fbclid, gclid…). Les paramètres utiles sont conservés. Un même article ne se dédouble plus avec un lien de newsletter ou une autre date de republication. Les textes approuvés gardent leur priorité sur le catalogue du dépôt. Le parseur RSS conserve la date la plus récente entre deux variantes du même lien.

## Vérifications

Tests locaux : formats RSS classiques et SPIP, limites de fraîcheur, panne avec secours expiré, XML/liens invalides, paramètres de suivi, distinction des requêtes utiles, restrictions de sources, vingt brèves, filtres et archives FR/EN. TypeScript et lint ciblé. La CI ajoute un parcours WebKit FR/EN à 375 et 390 px : filtres, quinze sources, liens directs, archive et absence de débordement. Les captures sont conservées dans les artefacts GitHub.
