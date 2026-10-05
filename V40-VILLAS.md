# LE GOLFE V40 — Fiche villa et demande de séjour

## Installer dans votre dossier habituel

Cette archive contient directement `package.json`, `app`, `components`, `data`, etc. Elle ne contient plus de dossier parent `le-golfe`.

1. Arrêter le serveur avec Ctrl+C.
2. Extraire les fichiers directement dans `C:\Users\Moi\projets\azurkey`, en acceptant le remplacement des fichiers existants.
3. Garder votre `.env.local` existant : l’archive ne le contient pas et ne modifie pas vos paramètres.
4. Dans PowerShell :

```powershell
cd C:\Users\Moi\projets\azurkey
npm install
npm run dev
```

Le terminal doit afficher `le-golfe@0.40.0`. Pour vérifier les fichiers, `Get-Content VERSION.txt` doit indiquer V40. Ne relancez pas l’ancien dossier imbriqué `azurkey\le-golfe` ; il est conservé et exclu de la compilation TypeScript du nouveau projet.

Ouvrir http://localhost:3000/villa/villa-eden. Les nouveautés se trouvent sur les fiches villas, pas dans l’écran de connexion.

## Ce qui change

- Les six fiches ont une présentation commune : photo, capacité, description, équipements, secteur, liens vers des lieux de la même commune et conditions à confirmer.
- Photo agrandissable dans une fenêtre plein écran avec fermeture, navigation clavier et retour du focus. Les listes de plusieurs photos sont prises en charge par le composant ; le catalogue fourni comporte une seule photo par maison. Aucune photo d’une autre villa ni équipement non renseigné n’a été ajouté.
- Suppression du libellé Villa Eden utilisé sur les autres fiches et des affirmations de rapidité fondées uniquement sur des distances.
- Bloc de choix des dates et voyageurs. Les dates ne représentent pas un calendrier de disponibilités et ne réservent rien. Aucune estimation de prix au prorata n’est inventée.
- Accès au bloc de dates depuis une barre fixe sur mobile.
- Formulaire en deux étapes : coordonnées puis récapitulatif. Les dates et le nombre de voyageurs sont repris depuis la fiche et validés. Arrivée passée, départ avant l’arrivée et dépassement de capacité sont refusés.
- Copie du récapitulatif disponible avant et après un essai d’envoi ; en cas d’erreur, les informations restent affichées. Aucun succès affiché avant l’enregistrement effectif.

## Test sans connexion

1. Ouvrir une fiche et cliquer sur « Voir la photo ».
2. Fermer la galerie et choisir une arrivée, un départ et un nombre de voyageurs.
3. Cliquer sur « Préparer ma demande » : le formulaire reprend les valeurs.
4. Renseigner ses coordonnées, son message et son accord de contact.
5. Cliquer sur « Vérifier ma demande » ; vérifier le récapitulatif, revenir modifier si nécessaire ou le copier.

La préparation et la copie fonctionnent sans compte. L’envoi final utilise toujours la table `requests` du Supabase existant. Son schéma et ses politiques doivent permettre l’insertion prévue ; aucune base distante, politique ou notification par e-mail n’a été configurée dans cette version. Enregistrer une demande ne garantit pas l’envoi d’un e-mail au propriétaire. Aucun compte de test réel ni demande réelle n’a été créé.

Les annonces locales de l’éditeur propriétaire V39 ne sont pas automatiquement publiées dans ce catalogue visiteur. L’IA propriétaire et la connexion n’ont pas été modifiées dans cette version.

## Validation

Compilation de production et TypeScript réussis. 70 contrôles dates/rendu des fiches et 15 contrôles d’interactions de composants (envoi simulé, double clic, échec et conservation des informations, galerie). Régression des tests V38/V39 et contrôle de 121 réponses HTTP, dont les six villas et cinq formulaires préremplis. Sitemap et métadonnées conservés : 229 URL au 3 octobre 2026.

```bash
node scripts/verify-villa-stay.cjs
node scripts/verify-villa-interactions.cjs
node scripts/verify-listing-assistant.cjs
node scripts/verify-host-editor.cjs
node scripts/verify-agenda.cjs
```

Les interactions sont contrôlées avec un harness de composants et un fournisseur simulé ; pas de binaire Chromium disponible ici pour un test interactif dans un navigateur complet. Vérifier aussi le plein écran et les champs de dates sur le navigateur et le mobile utilisés. La version n’est pas déployée.
