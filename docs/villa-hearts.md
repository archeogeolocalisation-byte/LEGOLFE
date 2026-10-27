# Les coups de cœur des maisons

Sur une fiche publiée, le bloc « Elle vous fait envie ? » permet à un membre connecté de donner ou retirer un coup de cœur. Ce signal exprime l’envie de séjourner dans la maison ; il n’est jamais présenté comme un avis après séjour, une note de qualité ou un séjour vérifié. Les favoris privés et le contact direct restent disponibles. Les exemples et aperçus ne proposent pas ce vote.

Un compte peut donner un seul vote par annonce. L’ajout et le retrait sont idempotents, même en cas de requête répétée. Le propriétaire du compte annonceur ne vote pas pour sa propre maison. Un changement de propriétaire exclut immédiatement son éventuel ancien vote du total. Les identités des votants ne sont pas publiées ; le client reçoit uniquement le total et son propre état de vote. Aucune valeur fictive, note agrégée SEO ou classement n’est généré.

## Activation

Après les tables des villas (`supabase/villas.sql`), appliquer `supabase/villa-hearts.sql` dans le SQL Editor du projet Supabase utilisé par le site. Le script est transactionnel et peut être rejoué. Il crée une table protégée par RLS et deux fonctions publiques aux permissions limitées ; aucun accès direct à la table n’est accordé aux visiteurs ni aux membres.

Les fonctions absentes masquent le module. Une indisponibilité réseau affiche un état temporaire, sans inventer un compteur. Le navigateur n’enregistre pas de vote optimiste et conserve l’état confirmé si une écriture échoue. Les réponses arrivant après une déconnexion sont ignorées. Après activation, vérifier les parcours visiteur, membre et propriétaire sur une annonce publiée, puis l’ajout et le retrait d’un vote.

## Vérification

- `node scripts/test-villa-hearts-db.mjs` : installation répétée, droits SQL, anonymat, refus des écritures directes et auto-votes, décompte, unicité, retrait, changement de propriétaire, annonces retirées et suppressions en cascade.
- `node scripts/test-villa-hearts.cjs` : interface FR/EN, connexion, double clic, échec réseau, déconnexion pendant une écriture, absence d’activation et validation des réponses RPC.
- Ces deux contrôles sont intégrés à la vérification des PR.
- TypeScript et ESLint ciblé, puis contrôles existants des fiches, favoris et coordonnées.

L’environnement local ne permet pas de compiler Next (`uv_resident_set_memory`) ni d’utiliser un navigateur Playwright. La compilation et la vérification visuelle restent à confirmer sur la prévisualisation Vercel. L’activation SQL n’est pas exécutée par cette PR.
