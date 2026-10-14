# Sources locales complémentaires — 14 octobre 2026

Trois RSS supplémentaires vérifiés techniquement : Cogolin (10 nouvelles), La Mole (9 entrées dans /actualites/ retenues sur 10 items), La Croix-Valmer Tourisme (10 billets). Leurs sources et URL canoniques sont déclarées dans localFeedSources et accessibles à l’outil éditorial existant. Les fixtures des trois nouvelles sources utilisent des titres de test synthétiques avec leurs dates et chemins factuels ; aucun titre réservé, article complet ou photographie externe n’est repris dans ces fixtures.

## Droits et affichage public

Après la recommandation initiale, vérification détaillée des conditions : Cogolin réserve expressément les textes, photos et flux RSS (https://www.cogolin.fr/pages/mentions-legales/). La Mole impose son accord écrit pour la réutilisation de ses contenus (https://www.lamole.fr/systeme/mentions-legales/). La Croix-Valmer Tourisme interdit la republication des éléments du site sans autorisation écrite (https://www.lacroixvalmertourisme.com/fr/mentions-legales). Une réponse RSS 200 ne vaut donc pas autorisation de republication.

Ces trois sources ont publicHeadlines:false : getLocalFeeds ne les télécharge pas sur les consultations publiques et retourne des cartes en mode link, sans aucun titre importé. Elles pointent vers le site de la source avec les illustrations originales LE GOLFE de Cogolin, La Mole et La Croix-Valmer. Les trois flux publics déjà en place restent actifs. Le compteur devient sources locales (6), sans présenter les liens comme des flux de nouvelles republiées.

L’outil privé Actualiser les sources prépare des candidats pending, avec raw.requiresReusePermission:true et un rappel dans l’interface éditoriale. Une publication copiée nécessite l’accord de la source ; les administrateurs peuvent préparer leurs propres nouvelles factuelles, avec les visuels LE GOLFE. L’activation publique de ces trois RSS reste désactivée tant que l’accord n’est pas établi. Aucun accord n’est présumé ni attribué à la confirmation de l’utilisateur, qui portait sur l’ajout et le choix des visuels.

## Visuels

Six cartes de sources illustrées, avec la mention Illustration de contexte · LE GOLFE, en grille responsive. Les nouvelles approuvées dont l’identifiant ne fournit pas d’image précise utilisent une illustration de leur commune lorsqu’elle est disponible ; les anciennes photos de contexte spécifiques restent prioritaires. Réemploi des WebP existants, aucun fichier généré ou photographie municipale téléchargée.

## Vérification

Suite local-news adaptée : six sources détectées ; 45 entrées RSS de test parsées pour l’outil privé ; 15 titres seulement dans le secours public ; aucune requête publique pour les trois sources réservées ; cartes link sans titres ; six illustrations locales existantes ; candidats privés signalés ; rendu FR/EN, filtres et archives inchangés. TypeScript, ESLint ciblé et compilation CI. Pas de SQL ou variable supplémentaire. Preview Vercel désactivée pour feature/local-extra-feeds.
