# LE GOLFE — sécurité, phase 1

Audit du 11 octobre 2026. Base GitHub : `6c9ba7fa1b4cef5a8b5db2d92239f0dd65eac2fc`.

**Statut : corrections préparées et testées ; application Supabase et déploiement de production restant à effectuer.** La présence de fichiers SQL dans GitHub ne prouve pas que ces règles sont installées dans Supabase. Aucun changement de base en production n'a été effectué pendant cet audit.

## Constats et corrections

| Sujet | Constat dans le dépôt | Correction préparée |
|---|---|---|
| Next.js | Version 16.3.3 concernée par plusieurs avis de sécurité | Passage à 16.3.8, avec eslint-config-next aligné et lockfile actualisé |
| Annonces | RLS propriétaire déjà présente ; champs JSON absents pouvaient laisser certaines contraintes SQL produire NULL | Validation stricte de la structure JSON, des types, tailles, photos et coordonnées ; contrôle de l'identité et du propriétaire |
| Anciennes politiques | Une politique permissive supplémentaire peut élargir l'accès malgré une politique correcte | Politiques restrictives supplémentaires sur les accès sensibles ; inventaire des politiques à vérifier en production |
| Coordonnées voyageurs | Le schéma réel de `requests` est confirmé ; ses demandes sont lisibles par les modérateurs | Conservation de la lecture modérateur, refus des autres lecteurs et des modifications publiques, validation des insertions et quota |
| Spam | Insertions directes possibles sans quota depuis l'API Supabase | Validation et quotas en base couvrant aussi les appels directs ; nouvelle route serveur de demandes avec limite de corps et champ piège |
| IA | Limite en mémoire propre à chaque instance Vercel | Quotas atomiques persistants en base, par utilisateur et globaux ; erreur 503 si le système de quotas est indisponible |
| Photos communautaires | Bucket public même pour des contributions en attente | Lecture par liens temporaires, règles limitées aux publications approuvées/propriétaire/modérateur, activation d'un bucket privé après déploiement |
| Uploads | Limites MIME/taille présentes mais configuration villa non corrigée lors d'une réapplication | Mise à jour des limites existantes, restriction des chemins, quota par compte ; décodage et réencodage JPEG dans les formulaires, suppression des métadonnées lors du réencodage |
| Comptes sur un même navigateur | Annonces en ligne et briefs réutilisés depuis des clés locales communes | Données d'interface séparées par compte et états remis à zéro au changement de session ; anciens briefs non attribués automatiquement |
| Authentification | Un callback pouvait retourner une promesse qui relançait Supabase ; retour de fiche libre | Hydratation différée hors callback et chemin de retour limité aux fiches locales |
| Secrets | Aucun motif de secret sensible trouvé dans les fichiers suivis ou les deux commits de l'historique accessible | Contrôle de configuration bloquant le build si une clé administrative est placée dans la variable Supabase publique, ou certains secrets dans des variables NEXT_PUBLIC |
| API éditoriale | Accès modérateur déjà vérifié, mais appels et réponses distantes non bornés | Vérification d'origine, quota partagé, timeout et taille maximale des sources, maximum 80 candidats par source |
| En-têtes HTTP | Pas d'en-têtes applicatifs explicites | Anti-framing, nosniff, referrer-policy, permissions-policy, CSP sur base/object/frame/form et suppression X-Powered-By |

Les annonces de conciergeries utilisent la même propriété de compte que les annonces propriétaires. Le choix « conciergerie » dans l'interface est une préférence, pas une permission supplémentaire. Le dépôt ne contient pas de délégation sécurisée de plusieurs comptes sur une même villa : aucun droit de ce type n'a été inventé.

## Inventaire Supabase transmis le 11 octobre 2026

Les exports de métadonnées confirment 17 tables publiques avec RLS activée. Les colonnes des tables villas, communauté, éditorial et `requests` correspondent aux migrations préparées. Les droits d'insertion des demandes et des calendriers sont principalement accordés par colonne : ils ne doivent pas être déduits des seuls grants de table.

Le bucket `community-photos` est public, avec une limite de 8 Mio et JPEG/PNG/WebP autorisés. Sa politique de lecture ne distingue pas les contributions approuvées de celles en attente. Le bucket `villa-photos` est public, limité à 550 000 octets et au JPEG. La migration conserve la lecture des anciennes demandes par les modérateurs, confirmée dans l'inventaire, et la couvre par une politique restrictive.

Huit tables `presence_*` existent dans cette même base mais ne sont référencées par aucun fichier du dépôt LE GOLFE. Elles possèdent des grants très larges, dont TRUNCATE, qui ne bénéficie pas de la protection RLS. Deux politiques permissives de création de `presence_audits` se cumulent : la plus large ne vérifie pas la propriété de l'entreprise. `presence_profiles.role` est modifiable par son propriétaire avec les droits actuels ; la portée de ce rôle dans l'application associée n'est pas connue. La fonction SECURITY DEFINER `presence_create_profile` est exécutable par `anon` et `authenticated`, avec `search_path=public`. **Ces objets restent à auditer séparément avant de modifier un éventuel autre module ou projet. La migration LE GOLFE ne les corrige pas.**

Le second inventaire transmis contient 17 tables, 85 contraintes, 3 triggers publics et 3 définitions de fonctions. Les deux copies du fichier sont identiques et ne constituent pas deux audits distincts. Les corps réels de `is_community_moderator` et `villa_booking_action` correspondent à ceux du dépôt, après normalisation des espaces et commentaires. Le passage de la fonction de modération à un search_path vide est compatible avec ses références qualifiées à `public.community_moderators` et `auth.uid()`. Les triggers publics et les contraintes LE GOLFE transmis ne révèlent pas d'écart supplémentaire bloquant pour la migration.

`presence_create_profile` est une fonction de trigger qui crée un profil `business`, pas une RPC générale de changement de rôle. Sa permission EXECUTE publique ne prouve donc pas qu'un client peut l'appeler comme une RPC. Son éventuel rattachement à `auth.users` n'a pas été exporté, car l'inventaire de triggers était limité au schéma public. Le risque distinct de modification directe de `presence_profiles.role` demeure : la contrainte réelle accepte `business`, `agency` et `admin`, et les droits actuels n'excluent pas cette colonne. L'utilisation de ces rôles dans un autre module reste à identifier.

Les exports ne vérifient pas la configuration Auth ni la validité des données existantes. Aucun SQL de modification n'a été exécuté en production. La migration LE GOLFE est prête pour application après vérification de la sauvegarde. `supabase/security-verify-phase1.sql` fournit un contrôle de lecture après application : les drapeaux de préparation doivent être vrais, les deux triggers de demandes présents, et le nombre d'annonces à corriger doit être examiné. Le bucket communautaire reste public à cette étape ; sa confidentialité s'active après déploiement du nouveau lecteur de photos.

## Limites et vérifications restantes

- **Inventaire Supabase** : tables, colonnes, politiques, permissions, buckets, contraintes, triggers publics et trois fonctions inspectés via les exports transmis. Aucune vue publique n'apparaît dans l'inventaire. Triggers du schéma Auth, autres corps de fonctions, configuration Auth et validité des données existantes encore à vérifier. L'audit n'est pas une validation d'exécution contre les services de production.
- **Secrets Vercel non inspectés** : seuls les renseignements généraux du projet `legolfe` ont été lus. Les valeurs des variables de production n'ont pas été récupérées. Le scan de motifs n'est pas une garantie d'absence de tout secret.
- **Uploads directs** : les limites Storage portent sur taille, MIME déclaré, chemin et fréquence. Le réencodage vérifie les images dans les formulaires, mais peut être contourné par un appel direct. Une vérification du contenu binaire côté serveur à la réception et une éventuelle analyse antivirus restent à concevoir si nécessaire. Pas de stockage de SVG autorisé par ces buckets.
- **Anti-bot** : quotas et champ piège limitent les abus ; ils ne remplacent pas un CAPTCHA. Un attaquant peut changer d'adresse email et épuiser les quotas globaux. Activer la protection Auth/CAPTCHA et ajuster les budgets selon le trafic réel.
- **Photos villas** : le bucket villas reste public, conformément au fonctionnement existant. Mettre une annonce en pause ne révoque pas l'URL d'une photo déjà publique. Les photos communautaires signées restent accessibles jusqu'à expiration de leur lien, au maximum cinq minutes après une décision de modération.
- **CSP** : les directives ajoutées protègent contre l'intégration en iframe et certains vecteurs. Elles ne constituent pas une CSP stricte des scripts ; son ajout demanderait un travail sur les nonces et le rendu Next.js.
- **Données locales** : séparation des comptes à l'écran, sans chiffrement des fichiers du navigateur. Les anciens brouillons sont préservés ; les anciens briefs restent dans la clé historique sans être importés dans un compte arbitraire. Ne pas traiter localStorage comme une zone confidentielle sur un appareil partagé.
- **Stockage** : les photos d'annonces supprimées ou remplacées ne sont pas systématiquement nettoyées. Un nettoyage doit éviter les références encore utilisées et faire l'objet d'un travail distinct.
- **Sauvegardes et alertes** : existence de sauvegardes restaurables, politique de conservation, alertes de coût et suivi des erreurs non vérifiés.

## Validation réalisée

- `npm run test:security` : 28 assertions de validation/API, 51 assertions PostgreSQL ; règles SQL réellement exécutées dans PGlite avec Auth/Storage simulés. Le test reproduit les anciennes permissions de lecture modérateur, vérifie leur conservation sans accès pour les autres comptes et valide les 14 contrôles du script post-migration. Les services Supabase Auth, Storage HTTP et PostgREST réels ne sont pas simulés intégralement.
- Suite SQL V56 existante : réservation, conflits de dates, annulation et confidentialité des devis validés avant application des nouvelles contraintes de payload. Le vieux fixture V56 n'inclut pas tous les champs désormais obligatoires ; ne pas l'exécuter tel quel après le durcissement.
- Migration exécutée deux fois dans la base isolée ; activation de la confidentialité également testée.
- `npx tsc --noEmit` : réussi.
- Build Webpack local de production : réussi avec variables fictives et un contournement local de lecture RSS, absent du dépôt. Le build standard, TypeScript, les tests et l'audit des dépendances de production ont également réussi dans GitHub Actions pour le commit initial de la PR ; chaque nouveau commit relance ces contrôles.
- `npm audit --omit=dev` : zéro vulnérabilité connue au moment du contrôle. Audit complet : cinq alertes élevées dans la chaîne de lint de développement, avec `braces` sans version corrigée disponible au moment du contrôle ; aucun downgrade forcé de Next.js pour les contourner.
- Lint global : en échec sur des problèmes préexistants, principalement `any`, effets React et scripts CommonJS. Aucun nouvel échec dans les fichiers nouvellement ajoutés ; un avertissement `img` subsiste. Les fichiers modifiés totalisent 21 erreurs de lint avant et après les changements.
- `git diff --check` : réussi.

Le workflow GitHub Actions préparé exécutera les tests, l'audit production, TypeScript et le build avec des valeurs fictives, sans secret de production. La configuration de la branche `security/phase-1-hardening` prévoit de désactiver son déploiement automatique Vercel via `vercel.json`. La revue et les vérifications CI doivent précéder la fusion vers main.

## Application en production, dans cet ordre

1. Vérifier une sauvegarde récente et la possibilité de restauration. Exécuter **`supabase/security-audit.sql`** dans Supabase SQL Editor. Comparer l'inventaire avec le dépôt ; en particulier les colonnes/defaults de `requests`, les politiques supplémentaires, les tables sans RLS et les fonctions SECURITY DEFINER exposées. Ne partager ni clés ni lignes contenant des coordonnées voyageurs.
2. Corriger les éventuels écarts. La migration attend `community.sql`, `editorial.sql` et le schéma villas jusqu'à V56. **Ne pas relancer aveuglément les anciens scripts** : ils pourraient rétablir des accès publics ou des privilèges.
3. Appliquer **`supabase/security-phase1.sql`**, puis exécuter **`supabase/security-verify-phase1.sql`** et examiner le résultat. Les définitions transmises ont été comparées au dépôt. La transaction ne supprime pas de données. `requests` reste lisible uniquement par les modérateurs, avec une écriture publique limitée aux champs du formulaire. Les annonces existantes malformées sont conservées, mais doivent être corrigées avant leur prochaine modification. Les tables `presence_*` nécessitent un traitement séparé, après identification de leur application.
4. Après tests CI réussis et comparaison de l'inventaire, fusionner la PR vers `main` pour le projet Vercel **`legolfe`**. Vérifier le commit exact et le succès du build de production sur `legolfe.com`.
5. Vérifier que les photos publiques/modération s'affichent avec les nouveaux liens signés, puis appliquer **`supabase/security-community-private.sql`**. Cela retire l'accès aux anciennes URL publiques des photos communautaires sans les effacer.
6. Avec deux comptes de test, vérifier les refus de lecture/modification entre propriétaires via l'API directe, les demandes sans compte, l'authentification par email, un upload valide/invalide, l'approbation/rejet d'une contribution et les limites de l'IA. Supprimer uniquement les données de test identifiées après validation.
7. Dans **Supabase → Authentication**, vérifier Site URL `https://legolfe.com`, URLs de retour FR/EN exactes, absence de wildcard de domaine en production, configuration SMTP, limitations d'envoi d'emails, CAPTCHA, durée/révocation de session et MFA des administrateurs/modérateurs. Tester un vrai lien email ; aucun email de test n'a été envoyé lors de cet audit.
8. Vérifier les variables Vercel sans les publier : publishable/anon côté navigateur ; OpenAI uniquement côté serveur ; aucune clé service_role dans NEXT_PUBLIC. Les quotas ne justifient aucune nouvelle clé administrative.

Budgets initiaux : IA 3 appels/heure et 10/jour/compte, 100/jour globalement, intervalle 30 s ; demandes 5/heure/email, 50/heure/villa, 500/heure globalement ; contributions 10/heure/compte ; créations d'annonces 20/jour/compte ; upload 60 contrôles/heure/compte ; refresh éditorial 1/minute. Un upsert d'annonce peut compter comme tentative de création ; les contrôles Storage peuvent compter plusieurs vérifications d'une même tentative.

## Retour arrière

Avant migration, exporter les définitions des politiques, grants, fonctions et paramètres de buckets, en plus de la sauvegarde. Le SQL de durcissement modifie ces définitions et ne peut pas reconstituer les politiques antérieures inconnues. Si la migration échoue, sa transaction s'annule ; s'il faut revenir en arrière après validation, restaurer les définitions sauvegardées de façon ciblée, pas toute la base avec perte des nouvelles demandes.

L'application peut revenir au commit précédent via Vercel. Si l'ancienne application est restaurée après le passage du bucket communautaire en privé, ses anciennes URL ne fonctionneront plus. Préférer une correction du lecteur de photos ; repasser le bucket en public réexposerait les contributions non approuvées.

## Sources officielles

- [PostgreSQL RLS : politiques et opérations hors RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Fonctions et SECURITY DEFINER](https://supabase.com/docs/guides/database/functions)
- [Buckets publics et privés](https://supabase.com/docs/guides/storage/buckets/fundamentals)
- [Contrôle d'accès Storage](https://supabase.com/docs/guides/storage/security/access-control)
- [Avis Next.js ImageResponse](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j) : applicable à certains usages de génération d'image ; aucune exploitation affirmée pour LE GOLFE.
- [Configuration des déploiements Git Vercel](https://vercel.com/docs/project-configuration/git-configuration)
