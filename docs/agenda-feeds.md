# Agenda : programmes officiels et qualité — 17 octobre 2026

La page conserve son fond noir, ses filtres, son affichage à l’affiche et sa grille. Un lien « Dans la commune » complète les actions existantes. Aucun fichier CSS de l’Agenda n’est modifié.

## Actualisation des programmes

Le Carré conserve son connecteur et ses visuels autorisés. Deux programmes supplémentaires sont lus à la demande, avec cache Next de six heures :

- Gassin Tourisme : `https://gassin.eu/fr/animations/`. Ce programme territorial contient des événements des douze communes. Le connecteur répartit jusqu’à 24 fiches entre les communes présentes et ne sélectionne que les cartes à date unique. La date ISO de la fiche doit correspondre à la date française affichée. Une plage début/fin n’est jamais interprétée comme une présence quotidienne.
- Domaine du Rayol : `https://www.domainedurayol.org/agenda-domaine-rayol/`. Jusqu’à huit fiches sont lues à partir de l’ItemList officiel. Les périodes, jours et horaires proviennent des données structurées IRIS publiées dans la fiche. Les périodes annuelles ambiguës sont ignorées, de même que les horaires invalides. Un horaire vide reste inconnu ; il n’est pas inventé.

Les deux programmes sont chargés en parallèle avec le Carré et les événements approuvés. Chaque connecteur impose six requêtes simultanées maximum, six secondes de budget total, deux millions d’octets par réponse et des liens de détail du même domaine, sans redirection. Il n’utilise ni clé privée ni exploration de liens externes.

Le relevé initial comprend 25 fiches de programme couvrant les douze communes. Il sert de secours si une source est indisponible. Les jeux de test conservent seulement les titres, liens et métadonnées d’ouverture nécessaires, sans descriptions longues ni visuels du fournisseur. Les photos des nouveaux programmes ne sont pas copiées : les illustrations LE GOLFE et cartes typographiques existantes restent utilisées.

Ce n’est pas une synchronisation exhaustive ni une tâche en arrière-plan : la lecture est déclenchée par les pages utilisant le catalogue public. En cas de panne, une copie vérifiée peut rester visible. La source de l’organisateur reste le point de confirmation des modalités et disponibilités.

## Veille éditoriale

Les sources d’agenda de La Môle, du Rayol-Canadel, de La Garde-Freinet et du Domaine du Rayol sont ajoutées. Les liens Cavalaire et Sainte-Maxime qui renvoyaient 404 sont remplacés par des adresses officielles vérifiées.

Le RSS `https://www.cogolin.fr/agenda/feed/` alimente la boîte éditoriale. Son `pubDate` correspond à une publication et non à une séance : les candidats restent sans date d’événement jusqu’à vérification. Les candidats issus d’ancres HTML non structurées restent également à vérifier ; aucune année n’est déduite automatiquement d’une date sans année.

## Dates, doublons et parcours

- Le dimanche, la période rapide « ce week-end » commence au dimanche. Le mois courant dans l’Agenda principal commence au jour présent. Les pages mensuelles explicites restent des archives consultables et identifiées.
- Les dates impossibles, horaires invalides, catégories inconnues, identifiants impropres à une URL et sources invalides sont écartés. Les séances identiques sont dédoublonnées.
- Les identifiants Apidae permettent de rapprocher les programmes officiels et les fiches existantes sans casser leurs URLs éditoriales. Les séances à des dates ou horaires différents sont conservées.
- Une annulation ou un report explicitement lu dans une fiche structurée retire le rendez-vous du catalogue public, y compris sa copie de secours correspondante. Une panne réseau n’est pas traitée comme une annulation.
- Les liens de commune utilisent les routes existantes du site, notamment `/destinations/rayol-canadel`. Les variantes typographiques « Rayol-Canadel sur Mer » sont rapprochées de la commune sans attribuer un événement régional à une ville arbitraire.
- Les visuels conservent leur alternance ; la carte titre récupère aussi une image déjà échouée avant l’hydratation. Les liens vers les fiches sont des liens HTML.

## Vérifications

Les contrôles couvrent les 25 relevés des deux formats, les douze routes de commune, les occurrences exactes, les annulations, la limite de concurrence, les réponses trop volumineuses, les pannes, les changements de source et la séparation publication/date réelle. Des fiches événements FR/EN sont rendues depuis le catalogue fusionné avec leurs métadonnées et liens locaux. Les périodes rapides et l’affichage sombre existant disposent de tests de non-régression.

Les pages ont été vérifiées par rendu serveur et tests des gestionnaires ; aucune vérification visuelle dans un navigateur n’est disponible dans cet environnement. La compilation de production est vérifiée par GitHub Actions.
