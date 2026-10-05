# Suivi des demandes V50

Le complément SQL ajoute `status`, `owner_notes` et `updated_at` à `villa_inquiries`. Les insertions publiques existantes restent limitées aux champs de la demande voyageur. Les mises à jour de suivi sont réservées au compte propriétaire de l’annonce, et les droits UPDATE sont limités à `status` et `owner_notes`. Le message et les dates du voyageur ne sont pas modifiés par le suivi.

Un déclencheur renouvelle `updated_at` à chaque modification. Le client enregistre avec la version chargée : une modification concurrente n’écrase pas le suivi d’un autre appareil. En cas d’échec, la carte conserve les notes saisies. Après un conflit, recharger remplacera les données affichées ; conserver les notes saisies avant de recharger si nécessaire.

Les exemples ne consultent ni ne modifient Supabase. Les briefs dérivés sont enregistrés localement, avec un identifiant stable lié à la demande. Ils ne sont ni des réservations ni une synchronisation des séjours entre appareils. La préparation du mail n’envoie rien et ne change pas automatiquement le statut.

Les validations fonctionnelles utilisent des services simulés. Les politiques SQL n’ont pas été exécutées sur le projet cible pendant cette livraison.

Références techniques :
- https://supabase.com/docs/guides/database/postgres/column-level-security
- https://supabase.com/docs/guides/database/postgres/row-level-security
