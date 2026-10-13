# Mise en service du pilote de publication et de contact direct

Le projet passe à une publication gratuite pour les 100 premières maisons mises en ligne, sans abonnement automatique ni commission. Les contacts directs sont facultatifs et choisis par le propriétaire. Les demandes restent de simples messages ; contrat, paiement et annulation se traitent directement entre les parties.

## Avant de fusionner la PR

Dans Supabase → SQL Editor, appliquer `supabase/direct-contact-pilot.sql` au projet LE GOLFE. Le schéma villas.sql de base (V49 au minimum) doit déjà exister. Le script fonctionne aussi si l’ancien module V56 de réservation n’a jamais été installé. Ce script peut être réappliqué. Il ne supprime aucune annonce, demande ou ancien séjour.

- Il crée un stockage séparé des coordonnées, inaccessible aux visiteurs anonymes et aux autres utilisateurs par lecture directe de la table.
- Le propriétaire choisit son email/téléphone dans Mes annonces → Mes coordonnées pour les voyageurs. Rien n’est partagé par défaut. Le retrait de l’accord supprime ces coordonnées du stockage de contact direct. Les demandes anciennes et les copies déjà obtenues par un destinataire restent distinctes.
- Le voyageur connecté peut consulter les coordonnées uniquement pour une annonce publique publiée avec consentement du propriétaire actuel. La consultation est limitée à 20 réponses avec coordonnées par heure et par compte ; cela réduit le moissonnage sans l’empêcher totalement.
- Le script révoque l’ancienne fonction de mutation des séjours pour les rôles visiteurs et utilisateurs connectés, y compris les anciens onglets. Les fonctions de devis/confirmation sont également retirées de l’interface. Les données historiques et blocages déjà existants restent conservés.
- La limite de 100 est vérifiée dans la base, avec verrou transactionnel ; les vraies annonces déjà publiées sont comptées. Les exemples statiques ne comptent pas. Supprimer une annonce ne libère pas une place. Les mises à jour des maisons déjà admises restent possibles ; les brouillons supplémentaires restent possibles sans mise en ligne.

Ne pas réappliquer ensuite villas-v56.sql ou villas.sql sans réappliquer le script pilote : ils réaccorderaient le droit d’exécuter l’ancienne fonction de réservation.

## Publication et contrôle

Fusionner la PR après réussite des tests. Dans Vercel Production, renseigner `LEGOLFE_CONTACT_EMAIL` avec l’adresse publique de contact/signalement du site puis redéployer. Cette adresse sera rendue publique ; ne pas utiliser de clé secrète ni d’adresse personnelle sans le vouloir.

Tester avec un propriétaire et un autre compte : partage volontaire, consultation connecté, refus anonyme, retrait du consentement, mise en pause de l’annonce, transmission d’une demande, absence de nouvelle confirmation de séjour. Les photos et les anciennes demandes doivent être conservées.

## Portée et points restant ouverts

La page `/fr/how-it-works` (et EN) décrit le service et les règles du pilote ; ce n’est pas une validation juridique ni un contrat rédigé par un avocat. La date de fin du pilote n’est pas définie ; ne pas promettre de gratuité à vie. Prévoir une information préalable et un accord exprès pour un futur abonnement.

L’identité légale de l’exploitant, les mentions légales, les documents contractuels complets, les durées de conservation, les règles locales des locations, l’assurance et les modalités de démarchage restent à compléter/valider. La présence d’un formulaire ne garantit pas la conformité d’une maison.

Les anciennes six fiches statiques sont clairement identifiées comme exemples de présentation ; aucune demande de location ne peut être enregistrée pour elles. Elles restent accessibles via leurs liens historiques.

Une suppression ou un transfert de compte doit faire l’objet d’un contrôle distinct des annonces et fichiers rattachés. Ce pilote ne change pas l’identifiant propriétaire des annonces existantes.
