# Comptes LE GOLFE

L'inscription utilise un email, un mot de passe confirmé et un nom public. La connexion utilise email et mot de passe. Les comptes existants peuvent définir leur premier mot de passe depuis leur profil ou demander un email de récupération.

## Profils

| Profil | Espace proposé |
| --- | --- |
| Voyageur / touriste | Séjour, favoris et communauté |
| Propriétaire | Fonctions voyageur et accès Host pour ses annonces |
| Conciergerie / agence | Fonctions voyageur et accès Host pour les annonces de son compte |

Le profil est un choix modifiable, pas une vérification professionnelle. Il ne donne aucun droit d'administration, de modération ou d'accès aux annonces d'un autre compte. Les règles RLS et `owner_id` restent responsables des autorisations. La gestion déléguée entre comptes distincts n'est pas ajoutée.

Les choix sont enregistrés dans les métadonnées Auth `legolfe_account_type` et `legolfe_display_name`. Les noms publics de la communauté restent dans `community_profiles`. Aucun champ générique `role` ni champ Présence Plus n'est modifié.

## Projet Supabase partagé avec Présence Plus

Les tables métier restent distinctes, mais Supabase Auth est commun : un même compte conserve le même identifiant et le même mot de passe dans les deux applications. Un changement de mot de passe concerne donc aussi Présence Plus si elle utilise ce compte. Des comptes Auth entièrement indépendants nécessitent des projets Supabase distincts.

Avant mise en production, conserver toutes les URL de Présence Plus dans la liste des redirections autorisées et ajouter ces URL exactes pour LE GOLFE :

- `https://www.legolfe.com/fr/account`
- `https://www.legolfe.com/en/account`
- `https://www.legolfe.com/fr/account/password`
- `https://www.legolfe.com/en/account/password`

Les formulaires passent explicitement leur URL de retour à Supabase. Ne pas changer les réglages Auth globaux ni désactiver la confirmation email pour ce changement. Si la confirmation email est activée, l'utilisateur confirme son adresse avant sa première connexion. La nouvelle route `/account/password` ouvre le formulaire après récupération, même lorsque Supabase retire le fragment de l'URL.

## Vérification

`npm run test:security` inclut les tests de validation, des règles SQL sur une base isolée et 25 assertions des formulaires avec un SDK Auth simulé : inscription, connexion, récupération, premier mot de passe et vérification du compte actif. Aucun email ou compte réel n'est créé par ces tests. La livraison doit aussi passer TypeScript et la compilation Next.js.

La confirmation email et la récupération réelles doivent être vérifiées après configuration des redirections avec un compte de test autorisé. Les déploiements automatiques de prévisualisation sont désactivés pour la branche `feature/password-accounts`.
