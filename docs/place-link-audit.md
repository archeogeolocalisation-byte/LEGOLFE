# Liens publics vers les fiches — 22 octobre 2026

## Résultats

- Les 88 fiches sont accessibles depuis l’accueil par des liens HTML, en français et en anglais, sans carte ni filtre.
- La liste publique est `/fr/explore` (et `/en/explore`). Le projet n’a pas de route `/sites`.
- Explorer rend toutes les adresses côté serveur, dans un ordre aléatoire. Il n’y a actuellement aucune pagination ni bouton de chargement supplémentaire : aucune fiche n’est masquée derrière ces mécanismes.
- Les villages exclus d’Explorer restent accessibles depuis les pages des communes. Le contrôle parcourt les liens rendus depuis l’accueil et le footer pour vérifier la couverture de tout le catalogue.
- Les 14 guides rendent des liens vers les fiches de leurs `placeIds`. Les cibles des liens vers les fiches sont contrôlées.
- Les filtres restent des variantes `noindex,follow` avec une URL canonique propre ; les fiches restent accessibles par les pages publiques sans paramètres.

## Amélioration

Quatre nouvelles de Vie locale ont désormais un lien descriptif vers la fiche directement concernée :

| Nouvelle | Fiche |
| --- | --- |
| Paradis Porsche : retour sur le rassemblement au port | Port de Saint-Tropez |
| Travaux de protection du boulevard de Gigaro | Plage de Gigaro |
| Relocalisation du SPAR de la place des Lices | Place des Lices |
| Trente ans de préservation de la Citadelle | Citadelle de Saint-Tropez |

Ces liens figurent aussi dans les éditions mensuelles concernées. Les associations sont éditoriales et explicites (`placeIds`), pour éviter d’ajouter des liens sans rapport avec le sujet. Les noms localisés sont préparés côté serveur ; le navigateur ne reçoit pas le catalogue entier pour les afficher.

## Vérification

- `node scripts/test-place-crawlability.cjs` : graphe des liens HTML depuis l’accueil, catalogue complet, guides et trois éditions mensuelles en FR/EN.
- `node scripts/test-public-routes.cjs` : redirections existantes, filtres, métadonnées et liens des catégories.
- `node scripts/test-footer-browser.cjs` : Safari sans JavaScript, présence des cartes d’Explorer et ouverture d’une fiche depuis Vie locale et son archive, dans les deux langues.

Le contrôle du graphe est ajouté à la CI afin de détecter une fiche isolée ou un lien vers une fiche inexistante lors des prochaines modifications.
