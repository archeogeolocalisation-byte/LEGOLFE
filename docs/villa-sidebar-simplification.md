# Sidebar maisons et villas — 26 octobre 2026

Référence demandée : `/en/villa/property-1791045878043`. Le composant partagé de la deuxième partie de sidebar conserve le prix, l’enregistrement dans Mon séjour, le partage et le lien d’assistance. Le calendrier, les dates d’arrivée/départ, le nombre de voyageurs et le bouton de demande sont supprimés. Ce composant devient rendu côté serveur et ne charge plus le calendrier pour cette zone.

Le premier bloc annonceur et son contact direct restent disponibles. Les messages de contact ne renvoient plus à un formulaire situé plus bas. La FAQ et l’aperçu propriétaire sont alignés sur ce parcours. Les pages de contact séparées et les mécanismes de gestion propriétaire ne sont pas supprimés.

Validation ciblée : TypeScript, rendu FR/EN, contrôle séjour existant et simulation des demandes de la page de contact existante. Les assertions de formulaire dans la sidebar ont été remplacées par l’absence de formulaire et de champs date. Le simulateur de contact utilisait encore l’ancien accès direct à la base : il simule désormais l’endpoint `/api/inquiries`, sans requête réseau. Les cas d’échec et de succès confirmé restent vérifiés.

Pas de changement de workflow, de déploiement manuel ou d’audit navigateur complet. La page en production n’a pas pu être lue par l’outil de consultation ; la modification porte sur le composant partagé et a été vérifiée par ses rendus locaux.
