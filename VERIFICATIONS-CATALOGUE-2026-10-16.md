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
