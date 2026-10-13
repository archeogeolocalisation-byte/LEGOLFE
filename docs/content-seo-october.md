# Contenu et SEO — 13 octobre 2026

Quatre guides FR/EN sont intégrés :

- `/fr/guides/marches-golfe-saint-tropez-jours`
- `/fr/guides/activites-gratuites-golfe-saint-tropez`
- `/fr/guides/golfe-saint-tropez-avec-enfants`
- `/fr/guides/week-end-automne-golfe-saint-tropez`

Les variantes anglaises utilisent `/en/` avec le même slug. Les guides et leurs sources sont dans `data/practicalGuides.ts`. Le calendrier des marchés est une sélection non exhaustive, avec saisons distinguées. La gratuité porte sur l’entrée et n’exclut pas transport, stationnement ou achats. Les programmes famille et automne sont des propositions éditoriales, pas des parcours accessibles certifiés ni des disponibilités garanties.

Les sources primaires des offices et des lieux sont affichées dans chaque guide, avec une vérification datée. Le Domaine du Rayol est identifié comme payant, avec les limites d’accès aux poussettes et à sa plage. Les horaires et tarifs changeants doivent être revérifiés au fil des saisons ; ne pas modifier la date de vérification sans refaire ce contrôle.

## Mise en page et images

Le modèle de guide accepte un tableau avec légende et en-têtes accessibles. Le tableau des marchés défile horizontalement sur petit écran. Quatre couvertures vectorielles originales, symboliques, sont conservées en SVG source et diffusées en WebP d’environ 15–17 Ko chacune. Ce sont des illustrations, pas des photographies des lieux. Elles ne réutilisent pas de photos d’offices de tourisme.

## Changements SEO

- Titres, descriptions, H1, canonicals et alternates FR/EN propres à chaque guide.
- Dates et références dans les données Article ; identifiant commun de l’organisation et identité WebSite/Organization.
- Découverte depuis l’accueil et l’index des guides, les communes et fiches Explorer correspondantes ; liens liés dans les deux sens selon les références éditoriales.
- Nouveaux guides ajoutés automatiquement au sitemap, avec dates et images.
- Simulation `/match` mise en noindex et retirée du sitemap ; ses liens restent utilisables. Les fiches statiques d’exemple conservent leur noindex.
- `metadataBase` défini à partir de l’origine publique configurée. Les prévisualisations restent non indexables et sans schémas de production.

Aucune promesse d’indexation, de résultat enrichi ou de position Google. Aucun marquage FAQ n’est ajouté dans l’espoir d’un résultat enrichi.

## Validation et suivi

`node scripts/test-guides-seo.cjs` rend les 24 variantes de guides et contrôle les sources, médias, liens, ancres, tableaux, métadonnées, schémas et sitemap. TypeScript et ESLint complètent les contrôles ; la compilation de production et les autres suites sont exécutées dans GitHub Actions.

Après fusion et déploiement : ouvrir les huit nouvelles URLs, vérifier le tableau sur mobile, les images et le changement de langue ; contrôler le sitemap publié. Dans Search Console, suivre l’indexation des nouvelles URLs, les requêtes, impressions, clics et pages d’entrée. Une amélioration technique ne remplace pas ces observations en production. Aucun déploiement public de prévisualisation n’est créé par cette branche.

## Prochains contenus possibles

Améliorer les guides à partir des retours de lecteurs, ajouter des photographies personnelles autorisées, puis préparer des portraits locaux et des journées par commune. Garder une procédure de vérification des informations saisonnières plutôt que multiplier des listes génériques.
