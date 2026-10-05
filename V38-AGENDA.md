# LE GOLFE V38 — Agenda à dates réelles

## Nouvelles pages

- `/fr/whats-on/today` et `/en/whats-on/today`.
- `/fr/whats-on/this-weekend` et `/en/whats-on/this-weekend` : samedi et dimanche du week-end courant ou à venir. Le dimanche inclut le samedi du même week-end, identifié comme passé si nécessaire.
- `/fr/whats-on/2026-10`, `/fr/whats-on/2026-11`, etc. et équivalents EN : pages par mois, avec les séances qui correspondent réellement aux dates. Les mois publiés sont liés dans l’agenda et dans le sitemap.

## Dates et navigation

Suppression de l’ancrage artificiel à octobre 2026. Le serveur transmet le jour courant Europe/Paris au client ; la date est réévaluée chaque minute lorsque l’agenda reste ouvert. Les calculs de jours utilisent UTC à partir des dates civiles de Paris pour éviter les décalages été/hiver.

Aujourd’hui est une seule date ; 7 jours est aujourd’hui plus six jours ; ce mois applique réellement les limites du mois. Le filtre week-end ne remonte plus les jours de semaine. Les événements terminés ne sont plus utilisés en repli de la mise en avant et la page d’accueil utilise les rendez-vous des sept jours actuels.

Les séances répétées ont des dates explicites : les jeux de société n’apparaissent pas tous les jours jusqu’en mars ; la visite de Gassin apparaît le lundi annoncé et le jumping sur ses deux blocs. Les fiches affichent toutes les séances, des repères passé/à venir et une entité Event par séance dans le JSON-LD, sans inventer de décalage horaire.

Une période sans événement affiche un état vide utile et noindex ; elle n’entre pas dans le sitemap. Un mois invalide répond 404. Les mois passés restent accessibles avec un libellé d’archives.

## Actualisation éditoriale du 3 octobre 2026

Neuf fiches existantes enrichies/corrigées à partir de leurs pages officielles : Maud Fontenoy, VTT vintage, marche solidaire (départ à Gassin), Hasard et contretemps, Rencontres oratoires, Halloween, Voiles, visite de Gassin et jumping.

Cinq nouvelles fiches : Sophie Ladame au Lavoir Vasserot, Pop Up Words, soirées jeux, mobilisation contre les plantes envahissantes et nettoyage de Pampelonne. Les séances annoncées des soirées jeux alimentent les mois jusqu’en mars 2027.

Les sources consultées figurent directement dans `data/agendaVerified.ts` et sur les fiches. Seuls ces événements portent la date de consultation. Le catalogue antérieur n’a pas été entièrement revérifié. Les coordonnées/horaires/prix non contrôlés ne sont pas enrichis.

Le grand agenda touristique affichait une fin de Voiles en 2027 ; la page dédiée annonce explicitement le 4 octobre 2026, date conservée. Pour Gassin, la fiche détaillée de visite annonce les lundis jusqu’au 26 octobre, tandis que la liste affiche un intervalle approximatif jusqu’au 25 : la fiche détaillée a été retenue. Le programme quotidien du jumping reste à confirmer par l’organisateur.

## Liens et mises à jour

Chaque événement renvoie vers des restaurants, bars, activités ou plages du catalogue dans la même commune, ainsi que vers le guide local et les séjours. Aucune proximité à pied ni ouverture à la date du spectacle n’est déduite de cette appartenance communale.

Le catalogue utilise toujours les événements approuvés de Supabase lorsqu’ils sont disponibles. L’import éditorial existant reste soumis à validation ; l’adresse de Ramatuelle a été corrigée. Cette version n’installe aucun suivi automatique quotidien et ne publie pas directement dans une base distante.

## Installation

Reprendre les paramètres Supabase existants, renseigner le domaine public `NEXT_PUBLIC_SITE_URL`, construire et publier via l’hébergement existant. Cette archive ne déploie pas le site. Les étapes Search Console restent celles de `V36-SEO.md`.

## Vérification

Compilation de production réussie (Webpack), 23 contrôles du calendrier avec `node scripts/verify-agenda.cjs`, 110 réponses HTTP contrôlées, dont 18 pages agenda et les 42 pages locales V37. Régression SEO FR/EN, pages privées, routes invalides et JSON-LD des 10 séances vérifiée. Sitemap : 229 URL au 3 octobre 2026, variable selon les événements publiés et les périodes courantes. Tests avec catalogue local et réponse Supabase simulée vide ; aucune base distante ni publication testée.
