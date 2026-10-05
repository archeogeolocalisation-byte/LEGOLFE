# LE GOLFE V41 — Mon séjour et copies des demandes

## Installation

Arrêter le serveur avec Ctrl+C. Extraire l’archive directement dans `C:\Users\Moi\projets\azurkey` et remplacer les fichiers existants. Conserver `.env.local`, qui n’est pas inclus dans l’archive. Relancer depuis ce dossier :

```powershell
cd C:\Users\Moi\projets\azurkey
npm install
npm run dev
```

Le terminal affiche `le-golfe@0.41.0`. Le fichier `VERSION.txt` indique V41. L’archive reste sans dossier parent.

## Tester

1. Ouvrir `/villa/villa-eden`, `/villa/villa-alba` et `/villa/villa-azure` ; cliquer sur « + Mon séjour ».
2. Ouvrir `/fr/saved` puis cocher deux ou trois maisons dans « Comparer vos maisons ». Le tableau compare capacité, pièces, équipements connus, tarifs de départ et distances. Une quatrième sélection est désactivée. Le partage copie les liens, avec un texte sélectionnable si le presse-papiers n’est pas disponible.
3. Préparer une demande depuis une villa puis ouvrir le récapitulatif.
4. Cliquer sur « Garder un brouillon », ou choisir « Conserver une copie… » avant l’envoi.
5. Ouvrir `/requests` via « Mes demandes de séjour ». Reprendre un brouillon, copier son texte ou supprimer la copie locale.

Préparation, comparaison, sauvegarde locale et reprise fonctionnent sans connexion. L’envoi distant garde le fonctionnement Supabase existant ; il n’a pas été configuré ou testé sur une base réelle.

## États et conservation

- **Brouillon** : sauvegardé sur ce navigateur, sans transmission confirmée.
- **Enregistrée** : Supabase a confirmé l’insertion. Cela ne signifie pas qu’un e-mail a été envoyé au propriétaire ou qu’une réservation a été effectuée.
- **Envoi non confirmé** : l’application n’a pas reçu de confirmation. Une erreur réseau peut survenir après un traitement distant ; le statut local ne prouve ni la réception ni l’absence de réception.
- **Statut inconnu** : anciennes données de `azurkey_requests`, relues sans prétendre qu’elles ont été envoyées.

Aucune copie contenant des coordonnées n’est ajoutée automatiquement sans le choix du visiteur. « Garder un brouillon » active ensuite la conservation du résultat d’envoi pour cette demande. Un même identifiant met à jour la copie plutôt que d’en ajouter une à chaque clic. Jusqu’à 100 copies sont conservées. Supprimer une copie locale ne supprime ni n’annule une demande distante.

Les villas et lieux sauvegardés utilisent les mêmes clés que les versions précédentes. Les changements provenant d’un autre onglet sont relus ; les erreurs de stockage sont affichées. Les données restent sur le navigateur, sans synchronisation entre appareils. Le compte et l’envoi des liens de connexion n’ont pas été modifiés.

## Vérification

21 contrôles de comparaison/historique/états de transmission ; régression des contrôles V39/V40 (dates, fiches, formulaire, IA simulée et agenda). Tests d’interactions via harness de composants ; aucune authentification réelle, clé IA ni demande distante créée.

```bash
node scripts/verify-stay-shortlist.cjs
node scripts/verify-villa-interactions.cjs
node scripts/verify-villa-stay.cjs
node scripts/verify-listing-assistant.cjs
node scripts/verify-host-editor.cjs
node scripts/verify-agenda.cjs
```

Compilation de production et routes HTTP vérifiées. Les pages de sélection et de demandes restent noindex. Pas de navigateur Chromium disponible dans cet environnement : les interactions sont contrôlées au niveau des composants, et le parcours reste à vérifier visuellement dans le navigateur utilisé. Pas de mise en ligne dans cette version.
