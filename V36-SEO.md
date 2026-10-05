# LE GOLFE V36 — Fondations SEO

À partir de la version complète V35, sans changement de plateforme ni publication automatique.

## Installation

1. Conserver les valeurs Supabase du déploiement existant.
2. Renseigner `NEXT_PUBLIC_SITE_URL` avec le domaine HTTPS public réel, sans chemin ni paramètre. Refaire le build après tout changement de domaine.
3. Facultatif : renseigner `GOOGLE_SITE_VERIFICATION` avec le jeton HTML fourni par Search Console.
4. Installer les dépendances (`npm ci`), construire (`npm run build`) et publier via l’hébergement existant.
5. Vérifier `/robots.txt`, `/sitemap.xml`, une fiche FR et EN ; soumettre `/sitemap.xml` dans Search Console et demander l’indexation des pages principales.

Sans domaine configuré, le sitemap répond 503 et l’indexation est désactivée volontairement pour éviter des URLs incorrectes. Aucune adresse de production n’est inventée.

## Inclus

- Titles/descriptions propres aux accueils, guides, catégories, lieux, agenda, informations locales et villas.
- Canoniques sans filtres, hreflang FR/EN réciproques et x-default EN pour les pages réellement traduites. Les villas restent uniquement FR, comme leur contenu existant.
- Open Graph et Twitter avec les photos existantes des fiches lieux/villas lorsque disponibles ; aucune nouvelle image générée.
- Langue HTML selon l’URL, avec le proxy Next.js. Le layout lit les en-têtes et les pages sont rendues à la requête.
- Sitemap dynamique regroupant pages FR/EN, catégories, lieux, événements locaux/approuvés et villas, avec images quand pertinentes. Pas de dates lastmod artificielles.
- Fils d’Ariane visibles et JSON-LD, données Accommodation pour les villas et Place/Restaurant/BarOrPub/NightClub uniquement selon la catégorie connue. Coordonnées/téléphone/site inclus seulement lorsqu’ils existent. Les horaires libres ne sont pas convertis en horaires structurés.
- Fiches événements `/fr/event/[id]` et `/en/event/[id]`, métadonnées, JSON-LD Event, dates, textes, source officielle et liens depuis l’agenda.
- Liens vers d’autres fiches sur les pages de lieux.
- noindex sur comptes, favoris, espace hôte, rédaction, modération, demandes, contact et assistant.

## Limites et suite

Le code ne garantit pas de résultats enrichis : beaucoup d’établissements n’ont pas d’adresse de rue et les événements n’ont pas tous un lieu précis. Les images d’événements sont contextuelles, donc exclues du JSON-LD Event. Les horaires restent visibles mais startDate utilise seulement la date connue, sans inventer de fuseau ou d’heure de fin.

Les URLs existantes sont conservées pour éviter de casser les liens. Cette passe n’ajoute pas encore de pages commune × catégorie, de guides longue traîne, de pages week-end/mois ni de nouvelles traductions éditoriales. Ces contenus devront être construits avec une sélection locale réelle. Aucune annonce utilisateur sauvegardée seulement dans le navigateur n’est ajoutée au sitemap.

Search Console doit être reliée au domaine par son propriétaire. Le site doit être accessible publiquement pour être indexé.

Références : https://developers.google.com/search/docs/specialty/international/localized-versions et https://developers.google.com/search/docs/appearance/structured-data/local-business

## Validation effectuée

Compilation production Next.js 16.3.3 avec Webpack et contrôle TypeScript réussis. Le sandbox de validation ne donne pas accès à la mesure RSS de Node : un adaptateur temporaire de mesure mémoire a été utilisé uniquement pour les contrôles, sans modification du code livré.

Contrôle HTTP de 13 pages publiques, 8 pages exclues de l’indexation et 5 routes invalides ; vérification du HTML, des canoniques, hreflang, Open Graph, langue HTML, JSON-LD et canoniques sans filtres. Sitemap XML valide : 159 URLs uniques avec 42 entrées image sur le catalogue V35, langues réciproques et aucune page de gestion. Contrôles de domaine absent ou invalide réussis.

Les contrôles ont utilisé un domaine de test et des paramètres Supabase factices. L’authentification et la lecture de la base réelle ne sont donc pas validées ; les données locales et le repli en cas de lecture indisponible ont été testés. Aucun domaine, secret ou paramètre Supabase existant n’est remplacé dans l’archive.
