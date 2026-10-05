# LE GOLFE V39 — Aide à la rédaction propriétaire

## Parcours

Dans `/fr/host` ou `/en/host`, créer ou modifier une annonce :

1. Confirmer les droits de réutilisation des photos et ajouter jusqu’à 12 JPEG, PNG ou WebP (12 Mo par fichier avant compression).
2. Choisir une couverture ; les photos sont compressées et conservées dans IndexedDB sur cet appareil. Les anciens liens de photos restent compatibles. Les photos par URL ne sont pas envoyées à l’IA.
3. Renseigner la commune et la capacité ; cocher les équipements réellement présents. Aucun équipement n’est précoché pour une nouvelle annonce.
4. Coller facultativement le texte d’une ancienne annonce.
5. Autoriser l’envoi des informations, de l’ancien texte et des six premières photos déposées au maximum à OpenAI ; se connecter via le compte Supabase existant.
6. Générer puis modifier une proposition contenant titres, descriptions et points forts FR/EN. Utiliser ou écarter la proposition sans écraser immédiatement le texte en cours.
7. Valider la relecture avant enregistrement. Le texte bilingue apparaît dans l’aperçu. La publication depuis la liste demande aussi confirmation de relecture.

## Activation IA

Ajouter sur l’hébergement, côté serveur seulement :

```env
OPENAI_API_KEY=...
OPENAI_LISTING_MODEL=gpt-4o-mini
```

Le modèle doit accepter les images et les sorties structurées Responses sur le compte utilisé. Il est configurable. Ne jamais utiliser le préfixe `NEXT_PUBLIC_` pour la clé OpenAI.

Conserver les paramètres Supabase existants et vérifier le fonctionnement de la connexion par e-mail dans `/fr/account`, notamment l’envoi des liens et les URL de redirection autorisées. Aucune clé réelle ni configuration distante n’a été fournie ou modifiée ici. Les identifiants de validation utilisés pour la compilation ne sont pas des paramètres de production.

Sans session, le formulaire invite à se connecter. Sans configuration IA, le serveur renvoie une indisponibilité explicite ; la saisie manuelle reste possible. Aucun texte présenté comme issu d’une IA n’est fabriqué en secours.

## Fonctionnement et limites

- `POST /api/host/description` vérifie le jeton propriétaire auprès de Supabase avant un appel payant ; refuse les origines différentes, l’absence de consentement, les capacités invalides et les requêtes volumineuses.
- Clé uniquement côté serveur. Réponses non mises en cache, `store:false` envoyé à OpenAI. Ce paramètre ne constitue pas une promesse d’absence de toute rétention par le fournisseur ; ne pas inclure d’informations personnelles inutiles.
- Limite de 6 photos pour l’IA, 5 Mo pour la requête, délai fournisseur 45 secondes. Les images sont envoyées en base64 ; aucune URL tierce n’est téléchargée par le serveur.
- Temporisation de 30 secondes et un appel simultané par utilisateur et processus. Avant un déploiement sur plusieurs instances ou à grande échelle, ajouter une limite persistante partagée et un budget côté fournisseur.
- Prompt : faits structurés confirmés, descriptions/photos traitées comme références, aucune distance/équipement inventé. Le prompt réduit les erreurs sans garantir chaque assertion : la relecture propriétaire reste requise.
- L’éditeur conserve le fonctionnement local du Host Desk existant. Les annonces restent dans le stockage du navigateur et les photos dans IndexedDB : elles ne sont pas synchronisées entre appareils et ne créent pas une annonce publique dans Supabase. Conserver les fichiers originaux. Les photos retirées restent stockées afin de ne pas casser les annonces dupliquées ; un nettoyage des fichiers inutilisés pourra être ajouté avec le stockage distant.
- Aucun import automatisé Airbnb/Booking/Vrbo ajouté. Le propriétaire peut déposer ses propres fichiers et coller son texte ; l’intégration à une plateforme devra utiliser un accès autorisé.
- Cette archive ne déploie pas le site et n’active pas la facturation OpenAI.

## Contrôles

Compilation de production et TypeScript réussis. Tests disponibles :

```bash
node scripts/verify-listing-assistant.cjs
node scripts/verify-host-editor.cjs
node scripts/verify-agenda.cjs
```

32 contrôles du service IA avec authentification et fournisseur simulés ; rendu du formulaire en FR/EN ; 23 contrôles calendrier. Régression HTTP/SEO des versions précédentes : 110 réponses, 18 pages agenda, 42 pages locales, 229 URL de sitemap au 3 octobre 2026.

Pas d’appel OpenAI réel, de test de base distante ni de déploiement. Le test interactif navigateur n’a pas pu être exécuté : le runtime ne possède pas de binaire Chromium. Le dépôt de photos et sa conservation IndexedDB doivent aussi être vérifiés sur les navigateurs de production, notamment Safari mobile.

Documentation d’implémentation : https://developers.openai.com/api/docs/guides/images-vision et https://developers.openai.com/api/docs/guides/structured-outputs.
