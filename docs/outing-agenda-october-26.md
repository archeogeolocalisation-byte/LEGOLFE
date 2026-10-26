# Sorties et Mon séjour — 26 octobre 2026

L’accueil ouvre directement l’agenda sur Aujourd’hui ou Ce week-end via un paramètre de période validé côté serveur. La sélection initiale conserve la même période après hydratation. Les jours terminés sont exclus par la fenêtre existante.

Un filtre vide précise qu’aucun rendez-vous n’est publié pour cette sélection. Il propose la prochaine date publiée dans la même catégorie et commune si elle existe, un retour aux sept prochains jours dans tout le Golfe, et les guides existants (pluie/musées, marchés, villages). Les guides ne sont pas présentés comme des événements datés ni des garanties d’ouverture.

Chaque séance à venir peut être enregistrée depuis sa fiche dans Mon séjour. La sélection locale conserve la date, l’heure, la version, le lieu et l’adresse disponibles ; deux séances d’un même film restent distinctes. Elle est bornée à 50 séances, dédupliquée et validée à la lecture. Un échec d’écriture n’affiche pas de succès. Les fenêtres et onglets se resynchronisent à la modification. Les événements passés sont rangés à part. La fiche et la source officielle restent la référence pour une modification de programme ; le texte de Mon séjour indique explicitement qu’il s’agit d’une copie conservée dans le navigateur. Pas de synchronisation de ces séances sur le compte ni de réservation implicite.

L’ajout d’un lieu gère désormais aussi les erreurs de stockage et signale ses modifications aux composants de Mon séjour. Aucune modification des villas, des comptes ou de la base de données.

Vérifications locales : tests agenda-discovery (dates, guides, sessions, stockage, handlers), profile-agenda, agenda-dark, stay-journey, TypeScript et lint ciblé. Les avertissements img existants restent inchangés.

CI : nouveau parcours WebKit en FR/EN à 375 et 390 px : accueil → période agenda, filtre vide → guide pluie → musée → enregistrement → Mon séjour ; séance à venir depuis sa fiche si la période en comporte ; conservation des heures et versions, rechargement et retrait. Contrôle des limites horizontales. La compilation locale est bloquée par `uv_resident_set_memory` et le navigateur local est indisponible ; compilation et Safari sont à confirmer dans GitHub Actions.
