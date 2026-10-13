# Fiches de visite — 13 octobre 2026

Trois fiches existantes sont enrichies sur leurs URL actuelles : Grimaud village, Sainte-Maxime et Cogolin. Port Grimaud est ajouté au catalogue `places`, à Explorer et à la commune de Grimaud. Les huit variantes FR/EN utilisent un format court : titre descriptif, introduction, photo, quatre repères, sections ancrées, questions, sources et liens de proximité.

Les programmes sont des suggestions éditoriales ; les repères documentaires viennent des offices et opérateurs cités. Aucun avis de visite sur place ni garantie d'ouverture, d'accessibilité ou de baignade. Horaires et tarifs variables renvoient aux sources plutôt qu'à une valeur permanente.

## Photos

Quatre photographies réelles ont été téléchargées depuis les pages originales de Wikimedia Commons après vérification de leur licence CC BY-SA 4.0. Cette licence autorise notamment un usage commercial sous ses conditions : attribution, lien de licence, indication des adaptations et même licence pour les images adaptées. Elle ne signifie pas absence de droits.

Le registre public `public/media/place-facts/licenses.json` contient la source originale, le crédit, la licence, la date de contrôle, les dimensions, les transformations et les empreintes SHA-256. Les fichiers WebP locaux sont sous CC BY-SA 4.0. Les signatures visibles sont conservées ; le crédit Cyril Carpentier présent sur l'original de Port Grimaud est ajouté à celui de l'uploader Grimaud Tourisme. Les crédits, liens et adaptations apparaissent sous chaque photo. Les légendes précisent les dates des photographies (2018–2024) : elles ne prétendent pas montrer l'état actuel de tous les lieux.

Les photos font 207–286 Ko à 1400 px de large, puis Next Image sert des tailles adaptées. Le format 3:2 réduit la hauteur de la couverture sur mobile. Les photos sont également utilisées sur les cartes Explorer et dans les métadonnées.

## SEO et validation

Titres et descriptions FR/EN propres à chaque fiche ; URL existantes conservées ; alternates et canonicals via le helper du site. Le schéma Place porte une ImageObject avec source, crédit et licence. Le sitemap contient Port Grimaud et les dates de mise à jour des quatre fiches. Les questions restent du contenu visible, sans promesse de résultat enrichi Google. Aucune garantie de classement ou d'indexation.

`node scripts/test-place-facts.cjs` vérifie huit rendus SSR du composant, les ancres et liens, l'intégration au catalogue, les métadonnées, le sitemap, les fichiers et empreintes des photos et l'isolation des previews. Les données Supabase de ce test sont fictives ; le sitemap utilise des réponses vides pour les annonces et événements. La CI exécute aussi TypeScript, la compilation et les suites existantes. Contrôle visuel des quatre fichiers optimisés effectué. Pas de contrôle navigateur de cette branche depuis cet environnement.

Aucune migration de base ou variable d'environnement à ajouter. Déploiement public de la branche désactivé. Après fusion, vérifier les huit pages, leurs couvertures et le sitemap public ; suivre ensuite impressions/clics par fiche dans Search Console.
