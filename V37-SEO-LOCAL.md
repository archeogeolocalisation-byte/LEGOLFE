# LE GOLFE V37 — Guides locaux et villas par distance

La version complète reprend la V36 et ajoute les portes d’entrée locales au guide.

- `/fr/destinations` et `/en/destinations` : choix parmi neuf communes du catalogue.
- `/fr/destinations/saint-tropez` et équivalents : texte local FR/EN, plan de journée, fiches organisées par catégorie, villas de la commune et événements en cours ou futurs. Les dates utilisent Europe/Paris ; aucun événement passé n’est présenté comme à venir.
- Sept combinaisons commune × catégorie dans chaque langue : restaurants/activités/nightlife à Saint-Tropez, restaurants/plages/services à Ramatuelle et restaurants à Gassin. Elles sont accessibles seulement à partir de deux fiches pertinentes ; les catégories vides ou insuffisantes répondent 404.
- `/fr/stay` et `/en/stay` : catalogue de six villas rendu côté serveur.
- `/fr/stay/within-10-km`, `within-20-km`, `within-30-km` et équivalents EN : distance maximum inclusive. Le catalogue actuel donne 1, 5 et 6 villas respectivement. Aucun temps de trajet ou disponibilité n’est déduit de cette distance.
- Navigation Stay, footer, Explore et fiches de lieux reliés aux nouvelles pages.
- CollectionPage/ItemList, fils d’Ariane, titles/descriptions, canoniques, hreflang et sitemap mis à jour.

L’affectation à une commune utilise les noms exacts présents dans les localisations ; « Golfe de Saint-Tropez » n’est pas assimilé à la commune Saint-Tropez. Les photos existantes sont réutilisées avec leurs crédits. Les listes de villas sont traduites en anglais ; les fiches détaillées et le formulaire de matching restent en français, avec un libellé explicite sur les liens EN.

## Installation

Reprendre les paramètres Supabase existants, renseigner `NEXT_PUBLIC_SITE_URL` avec le domaine HTTPS public réel et refaire le build. Les étapes Search Console sont dans `V36-SEO.md`. Cette archive ne publie pas le site.

Les nouveaux guides utilisent le catalogue fourni ; ils n’ajoutent pas de fiches, d’annonces propriétaires en base ni d’informations horaires non vérifiées. Les distances restent les valeurs déclarées dans les fiches. Les textes locaux constituent une première sélection éditoriale, à enrichir à mesure que le catalogue grandit.

Documentation Google consultée : https://developers.google.com/search/docs/crawling-indexing/links-crawlable et https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites

## Validation

Compilation production Next.js et contrôle TypeScript réussis, avec le même adaptateur mémoire temporaire que pour la V36 (hors archive). Les 42 nouvelles pages ont été contrôlées par HTTP : langue, titre, description, canonique, hreflang, Open Graph, fil d’Ariane et CollectionPage/ItemList. Les 208 entrées de collections vérifiées correspondent à des liens visibles dans le HTML.

Régression V36 : 13 pages publiques et 8 pages exclues de l’indexation vérifiées ; dix routes invalides, anciennes et nouvelles, répondent 404. Le sitemap contient 201 URLs uniques et 42 entrées image sur ce catalogue. Toutes les nouvelles URLs et leurs versions FR/EN sont présentes.

Contrôles métier : distances inclusives 10/20/30 km (1/5/6 villas), sept combinaisons locales avec au moins deux fiches, correspondance exacte des communes et changement de date Europe/Paris été/hiver. Les contrôles HTTP finaux ont simulé une boîte éditoriale vide pour valider le catalogue local sans accès au Supabase réel. Ils ne valident pas la base de production ni l’authentification.
