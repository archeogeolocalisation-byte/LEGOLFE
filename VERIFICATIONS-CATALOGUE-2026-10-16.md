# Vérifications du catalogue — 16 octobre 2026

## Explorer

Dix fiches existantes reçoivent un premier repère documenté. Le catalogue passe de 25 à 35 fiches avec repère (37 points au total pour 48 fiches). Les villages utilisent un repère de secteur : leur office ou bureau de tourisme, avec une note qui distingue centre, littoral et accès particuliers. Ce repère ne garantit ni stationnement ni ouverture du bureau.

| Fiche | Source consultée | Origine des coordonnées |
| --- | --- | --- |
| chateau-des-marres | [Source](https://www.golfe-saint-tropez-information.com/fr/animation/chateau-des-marres-4600982) | Métadonnées latitude/longitude et carte de la fiche officielle |
| base-nautique-cogolin | [Source](https://www.golfe-saint-tropez-information.com/fr/loisirs/loisirs-sportifs/cogolin/base-nautique-municipale-2803282) | Métadonnées latitude/longitude et carte de la fiche officielle |
| cogolin-village | [Source](https://www.golfe-saint-tropez-information.com/fr/services/point-d-information/cogolin/bureau-d-information-touristique-de-cogolin-4695297) | Métadonnées latitude/longitude et carte de la fiche officielle |
| la-croix-valmer-village | [Source](https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/la-croix-valmer/office-de-tourisme-de-la-croix-valmer-839639) | Métadonnées latitude/longitude et carte de la fiche officielle |
| cavalaire-village | [Source](https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/cavalaire-sur-mer/office-de-tourisme-de-cavalaire-sur-mer-902874) | Métadonnées latitude/longitude et carte de la fiche officielle |
| la-mole-village | [Source](https://www.golfe-saint-tropez-information.com/fr/services/bureau-d-accueil-et-point-d-information/la-mole/bureau-d-information-touristique-de-la-mole-5340058) | Métadonnées latitude/longitude et carte de la fiche officielle |
| plan-de-la-tour-village | [Source](https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/plan-de-la-tour/bureau-d-information-touristique-du-plan-de-la-tour-5340082) | Métadonnées latitude/longitude et carte de la fiche officielle |
| rayol-canadel-village | [Source](https://www.golfe-saint-tropez-information.com/fr/services/office-de-tourisme-ou-syndicat-d-initiative/rayol-canadel-sur-mer/bureau-d-information-touristique-du-rayol-canadel-sur-mer-814289) | Métadonnées latitude/longitude et carte de la fiche officielle |
| gassin-village | [Source](https://gassin.eu/fr/informations-pratiques/acces-a-gassin/) | Coordonnées GPS du texte, degrés/minutes convertis en décimal |
| la-verdoyante | [Source](https://www.la-verdoyante.fr/contact-reservation) | Coordonnées GPS du texte, degrés/minutes/secondes convertis en décimal |

Le bureau de Cogolin est celui du **45 avenue Georges Clemenceau**, distinct du siège administratif de l’office communautaire au 2 rue Blaise Pascal. Les indications de chaque repère restent consultables dans la fiche publique.

## Agenda

Quatre rendez-vous ajoutés à partir de leurs fiches individuelles officielles, avec date de consultation, adresse et informations d’inscription. Les données conservent les séances discontinues : l’atelier de Cogolin ne devient pas un événement quotidien entre octobre et décembre. Le concours public de pétanque ne s’étend pas aux dates du tournoi privé de golf. La Cape 31 a été recontrôlée sur le site de la mairie, qui confirme le 12–17 octobre 2026.

Les liens individuels sont conservés dans `data/additionalAgendaEvents.ts` et la mise à jour dans `data/agendaVerified.ts`. Les illustrations éventuelles conservent le traitement et les crédits existants ; aucune affiche officielle n’est revendiquée sans autorisation.

## Contrôles et limites

TypeScript, tests de cartes FR/EN, proximité, qualité agenda, calendrier et SEO. Le test `scripts/test-verified-local-catalog.cjs` couvre les conversions GPS, la séparation des secteurs et l’absence d’événements sur les jours non annoncés.

Treize fiches restent sans repère : huit lieux ou itinéraires demandent encore une vérification individuelle (Monroe’s Pub, La Vague d’Or, Byblos Beach, Le Club 55, Indie Beach, Casita, Spa du Bailli, San Peïre). Trois services mobiles conservent volontairement l’absence de point fixe ; deux opérateurs nautiques nécessitent un départ confirmé pour la prestation choisie. Aucun point n’est inventé pour compléter la couverture.

Les dates d’ouverture et disponibilités restent à confirmer auprès des lieux. Aucun test réel de réservation ou de publication Supabase dans ce lot. La compilation complète est bloquée dans cet environnement par l’erreur `uv_resident_set_memory`, déjà constatée au lot précédent ; ce lot modifie les données et leurs tests.


## Seconde passe — huit dernières fiches

Les sept établissements et l’itinéraire restant ont été contrôlés le 16 octobre 2026. Le catalogue comporte désormais **43 fiches sur 48 avec repère, soit 45 points**. Les cinq fiches sans point fixe sont les trois services mobiles et les deux opérateurs nautiques ; leurs lieux d’intervention ou d’embarquement doivent être confirmés pour la prestation choisie.

Les coordonnées des établissements proviennent des métadonnées et cartes des fiches officielles. Le repère de San Peïre vient du marqueur de localisation publié avec l’itinéraire (43.339115, 6.547526), au village, 1 place Clemenceau : il ne désigne pas le sommet ni une trace GPS. Le guide existant est désormais associé à la fiche randonnée. Le topoguide officiel consulté confirme dans son tableau la distance et la durée à l’aller ; aucune réduction de l’effort aller-retour n’est introduite.

| Fiche | Source du repère | Point pratique vérifié |
| --- | --- | --- |
| monroes-pub | [Fiche officielle](https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/grimaud/monroe-s-pub-5067383) | 125 avenue de la Mer, Les Jardins de la Mer |
| la-vague-dor | [Fiche officielle](https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/saint-tropez/la-vague-d-or-4078045) | Cheval Blanc, Bouillabaisse ; jours à confirmer avec la Maison |
| byblos-beach | [Fiche officielle](https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/byblos-beach-5260740) | 42 boulevard Patch, distinct de l’hôtel en ville |
| club-55 | [Fiche officielle](https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/le-club-55-4601210) | 43 boulevard Patch ; accès routier distinct du ponton |
| indie-beach | [Fiche officielle](https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/indie-beach-5445018) | 471 chemin Garonne, accès Bonne Terrasse ; fermeture hivernale annoncée |
| casita-pampelonne | [Fiche officielle](https://www.golfe-saint-tropez-information.com/fr/sorties/restaurant/ramatuelle/casita-4739267) | Repère officiel de plage ; aucun numéro de rue inventé |
| spa-du-bailli | [Fiche officielle](https://www.golfe-saint-tropez-information.com/fr/services/estheticienne/rayol-canadel-sur-mer/le-spa-du-bailli-1358186) | 15 avenue des Américains ; saison et accès non-résidents à confirmer |
| san-peire-randonnee | [Fiche officielle](https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/randonnee-chemin-vers-le-san-peire/) | Repère de préparation au village, pas le sommet |

Compléments : [accès du Club 55](https://www.club55.fr/acces.html), [site d’Indie Beach](https://www.indie-beach.fr/), [La Vague d’Or — Cheval Blanc](https://www.chevalblanc.com/fr/maison/st-tropez/restaurants-et-bars/la-vague-d-or-st-tropez/), [topoguide officiel de San Peïre](https://www.golfe-saint-tropez-information.com/files/visitgolfe/docs/randos-web-2023-gardefreinet-plandelatour-fr.pdf).

Divergences conservées explicitement : les jours de service du restaurant diffèrent entre Cheval Blanc et la fiche touristique ; les calendriers du spa varient entre millésimes. Les fiches ne promettent donc pas une ouverture annuelle. Les dates documentaires des huit fiches sont actualisées ; le badge commercial `verified` reste inchangé.
