# Fiches mobiles — 18 octobre 2026

Le parcours contrôlé est Explorer → fiche → galerie et informations pratiques. Les composants historiques, villages, découvertes, fiches documentaires et sections ajoutées sous la fiche partagent désormais une racine `.place-page`.

## Mise en page

- Les enfants des grilles et groupes flexibles peuvent se réduire ; les longs titres, citations, crédits, adresses et liens se coupent dans leur colonne.
- Les grands intertitres et citations ont une échelle adaptée sous 768 px. Les encadrés gardent davantage de largeur pour le texte.
- Le module cartographique imbriqué ne cumule plus deux marges latérales. Les visuels documentaires limités à 1024 px sont centrés.
- Les marges des visuels de bord correspondent aux 18 px du conteneur mobile.
- La galerie utilise un format 3:2 sur téléphone, avec une image positionnée dans un cadre explicite. Le plein écran garde la photo entière avec `object-fit:contain` et des commandes accessibles.

Ces corrections sont limitées aux fiches ; aucune règle globale masquant artificiellement les débordements de la page n’est ajoutée.

## Photos

71 copies WebP sont servies depuis le site pour remplacer les liens de miniatures et redirections externes utilisés par les fiches. Les images sont limitées à 1280 px et optimisées ; les fichiers, empreintes SHA-256, dimensions, crédits, licences et URL d’origine sont conservés dans `public/media/place-cache/licenses.json`. Les légendes et la distinction entre photographie du lieu et photographie du secteur restent inchangées. Les crédits de la galerie et de la fiche signalent la conversion locale et le recadrage d’affichage.

La résolution partagée conserve les sources éditoriales originales et ne change que l’adresse d’affichage. Elle s’applique aux galeries, aux fiches documentaires, aux cartes de lieux et aux métadonnées utilisées pour le partage. Les photos déjà locales restent locales. Aucune photo municipale supplémentaire ou illustration générée n’est introduite.

## Vérification

`test-place-images.cjs` vérifie les fichiers WebP, leurs empreintes et les photos sélectionnées pour les 88 lieux. Les tests existants de fiches, SEO, cartes, galerie et Explorer vérifient les interactions et le rendu serveur FR/EN.

Après le build, `test-place-mobile.cjs` démarre le serveur de production et utilise WebKit : toutes les fiches en français et anglais à 375 px, plus six modèles représentatifs à 320, 390, 430, 768 et 1280 px. Le test refuse les débordements horizontaux, images cassées, titres/cartes hors du cadre et vérifie le dialogue de galerie à 390 px. Les cartes et services tiers sont bloqués pendant ce test pour isoler le rendu des fiches. Les captures et résultats sont joints à l’exécution GitHub Actions dans `place-mobile-webkit`.

WebKit est un contrôle automatisé du moteur de Safari et des largeurs mobiles ; il ne remplace pas un essai sur un iPhone physique. Le serveur Next et les dépendances graphiques WebKit ne fonctionnent pas dans le conteneur local restreint : le contrôle du navigateur est exécuté dans la CI Ubuntu, sur le build réel. Aucun déploiement de preview ou de production n’est effectué par cette modification.
