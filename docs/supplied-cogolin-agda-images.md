# Remplacement de trois photos fournies — 26 octobre 2026

Correspondances demandées :

- `cogolin-25.jpg` → église Saint-Sauveur–Saint-Étienne de Cogolin.
- `880x380-chapelle.jpg` → fiche des chapelles Saint-Roch de Cogolin.
- `1000016291.jpg` → AGDA, rotation de 90° dans le sens horaire pour obtenir une image horizontale.

Les fichiers publiés sont des WebP optimisés dans `public/media/places/supplied-20261026/`. L’image du chat est issue du fichier original tourné, sans recomposition du sujet. Les fichiers originaux fournis ne sont pas modifiés.

Les remplacements utilisent la priorité existante des photos fournies : fiches FR/EN, cartes et métadonnées sociales. L’auteur et la licence n’ayant pas été renseignés, aucun crédit ni licence Wikimedia de l’ancienne photo ne sont reportés sur les nouvelles images. La photo du chat reste présentée comme illustration de la fiche, sans prétendre identifier un animal pris en charge par l’association. Elle n’est donc pas utilisée comme image documentaire de l’Organization dans le JSON-LD.

Vérifications limitées : fichiers et orientation inspectés, TypeScript, six rendus FR/EN des trois fiches (photo, légende et aperçu social), contrôle existant des associations et diff propre. Aucun nouvel audit navigateur ni changement de workflow.

Cette PR est indépendante de l’activation Supabase des collections de maisons ; aucune migration n’est exécutée.
