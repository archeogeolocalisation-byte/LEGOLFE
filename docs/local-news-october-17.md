# Vie locale — sélection du 17 octobre 2026

## Sources ajoutées

Trois RSS supplémentaires, vérifiés le 17 octobre :

- Le Plan-de-la-Tour : `https://www.leplandelatour.fr/feed` (URL canonique sans slash final ; articles sous `/fr/`).
- Mairie de Gassin : `https://www.mairie-gassin.fr/fr/actualites/feed/`. Le RSS générique du site renvoie un catalogue botanique ancien ; le flux d’actualités dédié est celui annoncé dans la page municipale.
- Office de tourisme du Golfe : `https://www.golfe-sainttropez-tourisme.fr/feed/`, limité aux rubriques `/blog/` et `/decouvrir/` pour écarter les événements et l’espace professionnel.

Les trois sources rejoignent automatiquement l’outil privé « Actualiser les sources » grâce à `agendaSources`. Leurs candidats restent pending, sans résumé copié. Leurs conditions réservent les contenus : elles conservent `publicHeadlines:false` comme les trois sources déjà restreintes. Côté public, les cartes donnent accès au site officiel ; aucun téléchargement de leurs titres pendant une consultation publique. Sources vérifiées : https://www.leplandelatour.fr/fr/mentions-legales, https://www.mairie-gassin.fr/fr/mentions-legales/, https://www.golfe-sainttropez-tourisme.fr/mentions-legales/.

Bilan : neuf sources, dont trois RSS publics et six sources consultables par lien. Le nouveau domaine de Grimaud renvoie HTTP 406 dans cet environnement ; les autres endpoints testés sont absents, vides, anciens ou hors sujet. Ils ne sont pas ajoutés comme des flux actifs.

## Six brèves originales FR/EN

- Sainte-Maxime, bornes de biodéchets : mise à jour municipale du **16 octobre**, ouverture par UV Tri ou badge et déplacements annoncés pour le **20 octobre**. La date de la brève est celle de la publication, pas celle du changement à venir.
- Cogolin, mairie rénovée : publication du **12 octobre**, réouverture le 5 et inauguration le 11. L’accès PMR au seul rez-de-chaussée est conservé dans les deux langues.
- Saint-Tropez, bilan de Paradis Porsche : publication du **15 octobre** ; l’événement est explicitement terminé.
- La Mole, avis du conseil municipal : publication du **8 octobre**, séance annoncée pour le **26 octobre**. Aucun horaire ni ordre du jour détaillé n’est inventé.
- Sainte-Maxime, programmes de l’automne : source mise à jour le **11 septembre**, programme jusqu’en décembre et saison du Carré 2026–2027. Le lien dirige vers les programmes et conditions d’inscription.
- Cogolin Plage, crèche : publication du **31 août**, capacité annoncée de 40 enfants. La disponibilité ancienne n’est pas présentée comme actuelle ; les familles sont invitées à contacter la structure.

Les six liens sont des pages d’articles directes de sources déjà suivies. Les textes sont rédigés pour LE GOLFE, avec les illustrations existantes des communes. Aucun article complet ni photographie municipale n’est repris. Les deux sujets pratiques les plus récents sont mis en avant. Le catalogue conserve 17 brèves et ouvre naturellement l’archive d’août ; septembre et octobre restent accessibles. Pas de modification CSS ou de mise en page.

## Secours et vérification

La sélection publique de secours conserve 15 titres, recontrôlés le 17 octobre, avec le nouveau titre de Saint-Tropez. Sa date est exportée avec les données et affichée par le journal, au lieu d’un 14 octobre codé en dur. Les fixtures ne contiennent que les champs RSS nécessaires ; les nouvelles sources utilisent des titres synthétiques.

Tests : neuf sources/71 entrées de fixtures ; seulement trois requêtes publiques ; import privé RSS et restrictions ; filtres de chemins ; contenus dangereux, dates futures et erreurs de flux ; six brèves, illustrations existantes, distinction entre publication et événement ; 17 brèves dans trois mois d’archives ; filtres catégorie/commune et rendu FR/EN. TypeScript et vérifications SEO. Pas de modification SQL, de tâche planifiée ou de variable d’environnement.
