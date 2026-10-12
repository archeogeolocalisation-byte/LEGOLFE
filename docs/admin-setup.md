# Activation de l’administration LE GOLFE

L’espace se trouve sur `/fr/admin` ou `/en/admin`. Un lien Administration apparaît dans le profil lorsque le serveur confirme l’accès. Ces pages ne sont pas indexables.

Dans Vercel → legolfe → Settings → Environment Variables → Production :

1. Ajouter `SUPABASE_SECRET_KEY`, avec la clé secrète du projet Supabase actuel. Le nom historique `SUPABASE_SERVICE_ROLE_KEY` est également accepté. Ne jamais créer une variable `NEXT_PUBLIC_` pour cette clé.
2. Ajouter `LEGOLFE_ADMIN_USER_IDS`, contenant l’UUID exact du compte administrateur (Supabase → Authentication → Users). Plusieurs UUID peuvent être séparés par des virgules. Ne pas utiliser les emails, et ne pas prendre un UUID de dossier photo comme preuve du compte actuel.
3. Redéployer la production après ces changements.

Aucune migration SQL supplémentaire n’est nécessaire. Le serveur vérifie le jeton avec Supabase Auth puis l’UUID autorisé à chaque requête. Un type de profil « propriétaire » ou une métadonnée modifiable par l’utilisateur ne donne aucun droit d’administration.

## Retrouver Mas de la Haumière

La fiche publique existe : `/fr/villa/property-1791045878043`. Dans Annonces, rechercher `HAUM` (recherche par fragment, insensible à la casse). La ligne donne l’email et l’UUID du propriétaire actuel. Comparer aux deux comptes de l’utilisateur. Si nécessaire, copier l’UUID du bon compte depuis Inscrits et le remplacer dans Gérer → Identifiant du compte propriétaire. La confirmation rappelle que les demandes et le calendrier suivent la maison.

Les photos et les autres informations sont conservées lors de cette modification. Les fichiers photo existants restent dans leur dossier d’origine ; ils ne sont pas déplacés. Le nouvel administrateur/propriétaire ne doit pas supprimer le compte d’origine sans avoir traité ses médias. La réattribution n’est jamais automatique.

## Périmètre de cette version

- Liste paginée des inscrits, email confirmé ou non, modification du type de profil.
- Liste et recherche des annonces enregistrées dans Supabase, propriétaire, modification des descriptions FR/EN, statut, visibilité et rattachement au compte.
- Mise en pause ou visibilité privée pour retirer une fiche publique ; aucune suppression de compte ou d’annonce depuis l’admin.
- Chargement automatique des annonces en ligne dans l’espace propriétaire ; recherche et copie explicite des anciens brouillons créés avant connexion, sur le navigateur d’origine.

Les brouillons uniquement locaux ne peuvent pas être retrouvés depuis un autre appareil ou depuis l’administration. Le test `node scripts/test-admin.cjs` utilise des mocks isolés. Un contrôle en production avec le vrai compte administrateur et un compte ordinaire reste nécessaire après activation.
