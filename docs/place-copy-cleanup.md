# Fiches Explorer : lecture et contrôles allégés

Le module « LE GOLFE / GUIDES — Préparer votre journée » est retiré de la route partagée des fiches Explorer. Il reste disponible sur les pages de guides et de destinations où il est utilisé séparément.

Les modèles étaient la cause des répétitions :

- 53 fiches factuelles réaffichaient leur introduction sous la citation, puis le deuxième chapitre dans le panneau bleu. Ces reprises sont supprimées. Le panneau bleu garde sa punchline et devient plus court ; le résumé SEO n’est plus recopié avant les informations pratiques.
- Le modèle Découverte réaffichait le premier chapitre en encadré puis dans les chapitres. Cet encadré en double est supprimé.

Audit local du HTML de toutes les 93 fiches, dans les deux langues : 186 rendus. Avant correction, 114 rendus contenaient au moins un paragraphe descriptif répété. Après correction, aucun paragraphe identique de 100 caractères ou plus ni phrase identique de plus de 110 caractères répétée entre deux paragraphes dans ce périmètre. Les citations et les informations des chapitres restent à leur emplacement utile, sans réécriture de faits.

Vérification ciblée : le script SEO des fiches existant vérifie aussi l’absence du module Guides et des paragraphes descriptifs identiques. TypeScript et ce contrôle local passent. Pas de nouveau script de test ni de lancement local des parcours Safari complets.

## GitHub Actions

Le statut `verify` conserve : installation avec cache npm, sécurité, audit des dépendances de production, TypeScript, contenu/SEO des fiches et compilation. Il utilise un runner Ubuntu standard, sans télécharger l’image du navigateur.

La suite complète existante, dont Safari, est conservée dans `full_review`, uniquement sur lancement manuel du workflow avec `full_suite=true`. Un lancement manuel simple utilise les contrôles légers. Le contrôle PR n’est plus rejoué automatiquement après fusion sur main ; le déploiement Vercel conserve sa compilation. Les nouvelles exécutions annulent les anciennes de la même PR pour éviter les calculs sur des commits dépassés.
