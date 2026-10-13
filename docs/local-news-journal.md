# Vie locale — journal et archives, 14 octobre 2026

## Composition

Journal responsive : grand sujet illustré, cartes bleu nuit avec texte blanc, brèves bleu clair et ivoire, puis fil RSS officiel, navigation des archives et repères pratiques. Titre à la taille partagée de l’agenda. Filtres catégorie/commune sans navigation, résultats et état vide accessibles. Images de contexte créditées ; réemploi des illustrations originales, aucune photographie municipale reprise sans permission.

Cinq sujets ajoutés avec des textes propres FR/EN et sources directes : travaux de l’avenue du Débarquement (mise à jour municipale du 7 octobre), Tamaris et logement des saisonniers (8 octobre), cour-jardin des Lauriers (12 octobre), partenariat de sensibilisation marine (2 octobre), bilan environnemental des Voiles (6 octobre). L’article Gigaro utilise désormais son lien direct. 11 nouvelles conservées : six en octobre et cinq en septembre 2026. Les dates correspondent aux publications/mises à jour des sources, pas aux dates d’événement.

## Flux

Trois flux RSS vérifiés : https://www.golfe-sainttropez.fr/feed/, https://www.saint-tropez.fr/feed/, https://www.sainte-maxime.fr/feed/. Les deux premiers paramètres post_type testés ne filtrent pas réellement ces sites : le parseur filtre les chemins actualite/ma-ville lorsque nécessaire afin de ne pas traiter les dates de publication d’événements comme des nouvelles. Titres/liens/dates seulement, sans copie des articles ni images du fournisseur. Les titres restent dans la langue publiée par la source ; le reste de l’interface et les textes LE GOLFE sont bilingues.

Lecture serveur parallèle avec cache Next de six heures, délai de quatre secondes et plafond de 2 Mo, URL fixes, redirections rejetées. Parser sans expansion XML, rejet DOCTYPE/ENTITY, liens HTTPS de même origine, dates présentes et non futures (jour de Paris). Une sélection factuelle du 14 octobre (15 titres) sert de secours et son ancienneté est explicitement signalée lorsque le flux n’est pas disponible. connection() rend les pages à la requête sans supprimer le cache explicite des flux. Aucun cron nécessaire.

Les trois RSS alimentent aussi la boîte éditoriale existante : /fr/editorial → Actualiser les sources → valider les nouvelles choisies. Les candidats restent pending ; aucune validation automatique ni écriture par un visiteur. Titres, dates et liens uniquement ; résumés laissés vides plutôt que recopier les articles.

## Archives durables

Le catalogue permanent associe les éditions conservées dans le dépôt et les nouvelles approuvées dans editorial_inbox. /fr/local/archives/YYYY-MM et équivalent /en/ regroupent par mois de publication, avec lien canonique, alternates et sitemap. Le mois apparaît automatiquement dès qu’une nouvelle datée est publiée ; mois invalide ou sans nouvelle : 404. Les pages historiques sont signalées comme telles et conservent leurs sources. Les titres temporaires des flux externes ne sont pas automatiquement archivés : une nouvelle du flux doit être validée dans la boîte éditoriale pour rejoindre le catalogue permanent. La disparition d’un item chez le fournisseur n’efface aucune nouvelle déjà publiée. Pas de localStorage ni d’archive propre à un seul navigateur. Pas de nouvelle table ou variable d’environnement ; editorial_inbox et ses politiques existantes sont réutilisées.

## Vérification

Suite test-local-news : 3 RSS/15 titres réels, liens et ports tiers, dates invalides/futures, changement de jour de Paris, XML dangereux/plafond, panne, import pending, dédoublonnage, 11 nouvelles retenues, six/cinq par mois, filtres/état vide, rendu FR/EN, métadonnées et 404 des archives. TypeScript et ESLint ciblé (seul avertissement image HTML), tests SEO/agenda/sécurité existants et compilation CI. Contrôle visuel responsive après fusion et publication ; pas de preview publique pour feature/local-news-journal.

Le serveur local démarre avec hostname 127.0.0.1, mais Turbopack refuse le node_modules lié hors de la racine de ce worktree. Le navigateur Chromium n’est pas installé dans cet environnement ; aucun contrôle visuel navigateur local n’est déclaré réussi. La CI compile un checkout avec ses propres dépendances. Le rendu SSR FR/EN et les interactions sont vérifiés par la suite dédiée.
