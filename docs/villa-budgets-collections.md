# Budgets et collections des maisons

## Activation

1. La base doit déjà disposer de `villas.sql` et `security-phase1.sql` (installation existante).
2. Avant de déployer cette PR, exécuter **supabase/villa-collections.sql** dans le SQL Editor du projet Supabase de LE GOLFE. Le script est transactionnel et réexécutable ; il conserve la validation stricte des annonces tout en autorisant les deux champs de proposition.
3. Depuis l’administration, ouvrir une annonce, relire sa fiche, puis valider sa collection et ses motifs FR/EN. Les nouvelles propositions apparaissent dans le formulaire propriétaire et dans la gestion administrateur.

Aucune migration n’a été exécutée sur la base de production pendant ce travail. L’activation nécessite son accès administrateur Supabase. Sans la table, les fiches restent lisibles et aucune distinction n’est accordée ; les propositions propriétaires nécessitent toutefois l’activation du validateur SQL avant leur mise en ligne. Les annonces ordinaires sans proposition restent compatibles.

## Budgets et prix

Le premier choix après Tous les budgets est Jusqu’à 1 500 € / semaine. Les autres bandes sont 1 500–3 000 €, 3 000–6 000 €, 6 000–10 000 €, plus de 10 000 €, puis Prix sur demande. Les bandes utilisent une borne basse exclusive et une borne haute incluse pour éviter un chevauchement au seuil. Un prix nul signifie sur demande et n’est pas classé dans un budget chiffré. Les anciens plafonds numériques restent compris par le filtre.

Les cartes et le panneau de séjour affichent une estimation par nuit calculée sur sept nuits, à partir du prix hebdomadaire indiqué. Ce n’est ni un devis pour les dates choisies ni une promesse d’inclusion des frais. Aucun prix d’annonce existante n’a été baissé et aucune annonce bon marché fictive n’a été créée.

## Trois collections distinctes du tarif

- Maisons de vacances : catégorie générale, sans distinction éditoriale.
- Maisons de charme : caractère architectural, cadre, jardin, décoration ou éléments singuliers à décrire concrètement.
- Villas d’exception : qualité remarquable des espaces et finitions, intimité, emplacement et prestations réellement constatées. Une piscine ou un prix élevé ne suffit pas.

Les propriétaires peuvent proposer Charme ou Exception et expliquer ce qui distingue leur maison. Seul un administrateur LE GOLFE peut confirmer une distinction, avec un motif public en français et en anglais. Aucune maison n’a été classée automatiquement dans une collection supérieure.

Les validations sont séparées des données contrôlées par les propriétaires. RLS et droits SQL empêchent les écritures publiques et propriétaires ; l’API vérifie le rôle administrateur et l’origine. La validation compare sous verrou le contenu examiné au contenu courant. Une modification de l’annonce suspend l’affichage de la distinction tant que le contenu ne correspond plus à celui validé. La suppression ou la mise en privé masque également la distinction.

## Vérifications limitées

- TypeScript et rendu FR/EN existant des villas.
- Filtre combiné : seuil 1 500 €, bornes des bandes, prix inconnus, indépendance prix/collection, remise à zéro et affichage mobile des commandes.
- Administration : accès propriétaire refusé et validation des motifs.
- PostgreSQL isolé : migration réexécutable, proposition permise par le validateur strict, auto-attribution refusée, RPC réservée au service, distinction publique à jour uniquement, conflit de version et retrait.

La CI légère ajoute uniquement les deux contrôles ciblés budget/collections, sans navigateur ni audit Safari. Aucun contrôle visuel mobile en navigateur n’a été exécuté localement.
