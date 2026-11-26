# Consommation des plateformes

## Déploiements Vercel

Seule `main` est déployée automatiquement en production. Les branches `preview/**` sont réservées aux aperçus voulus pour une relecture visuelle ; les branches de travail ordinaires ne déclenchent pas de build Vercel. Pour obtenir un aperçu, préparer une branche `preview/nom-du-travail` au commit final. Les anciens aperçus restent consultables.

Un changement courant passe ainsi par une compilation de contrôle GitHub, puis une compilation Vercel à la fusion. Éviter les pushes intermédiaires et les redéploiements sans changement. Les règles suivent `git.deploymentEnabled` : https://vercel.com/docs/project-configuration/git-configuration.

## GitHub Actions

Préparer le travail localement, ouvrir un brouillon si nécessaire, puis passer la PR en « Ready for review » une fois prête. Les brouillons n'utilisent pas de runner. Les exécutions remplacées sont annulées ; aucun workflow supplémentaire n'est déclenché au push d'une ancienne branche.

Une PR documentaire conserve le job `verify` sans installation ni compilation. Les changements de contenu connus sélectionnent les tests agenda ou lieux ; un changement inconnu, partagé, de dépendances ou de configuration lance tous les groupes. Sécurité et compilation restent obligatoires pour tout changement applicatif. La compilation Next vérifie aussi TypeScript. La suite Safari reste manuelle et ses captures expirent après trois jours.

## Supabase et cache public

Les événements et actualités approuvés partagent un cache serveur de cinq minutes ; seules les colonnes affichées sont lues. Le catalogue des maisons publiques partage un cache d'une minute. La page détaillée d'une maison revérifie directement sa visibilité. Une modification éditoriale peut donc prendre quelques minutes à apparaître dans les listes.

Les erreurs de base ne sont pas enregistrées comme un catalogue vide. Les clients de ces lectures utilisent uniquement la clé publique, sans session persistante ni renouvellement d'authentification. Aucun compte, message, contact propriétaire, calendrier privé ou donnée d'administration n'entre dans ces caches.

La synchronisation éditoriale, toujours réservée aux modérateurs et soumise au quota existant, écrit par lots de 50 entrées maximum. Exemple : 121 candidats utilisent trois requêtes d'écriture au lieu de 121. Les traitements restent idempotents par empreinte.

Ces mesures réduisent les déclenchements et appels ; elles ne configurent pas de plafond de facturation des comptes. Aucun abonnement ni quota commercial n'est modifié. Vérifier les tableaux de consommation des fournisseurs pour mesurer le gain réel.
