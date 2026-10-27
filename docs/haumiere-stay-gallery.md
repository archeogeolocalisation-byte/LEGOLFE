# Mas de la Haumière — séjour et photos

La présentation pilote concerne uniquement l’annonce publiée `property-1791045878043`, en français et en anglais.

Le bloc séjour affiche un prix de départ hebdomadaire plus discret, sans conversion à la nuit. Son bouton et le raccourci mobile conduisent à la section « Disponibilités & tarifs ». Celle-ci propose les dates et le nombre de voyageurs, puis transmet ces choix par GET au formulaire de contact existant. Aucun prix saisonnier ni total n’est calculé à partir du simple prix hebdomadaire. L’envoi reste une étape distincte, avec récapitulatif et contrôle des dates avant enregistrement de la demande.

Le calendrier est affiché seulement après lecture réussie d’un calendrier activé par l’annonceur. Les nuits bloquées sont barrées ; les autres dates restent à confirmer. Sans calendrier, en cas de désactivation ou d’erreur, le formulaire reste accessible avec la mention « Disponibilités à confirmer ». Les séjours qui chevauchent un blocage connu sont refusés ; les jours de départ peuvent être partagés par deux séjours.

La galerie d’ouverture est conservée. La nouvelle section finale affiche toutes les photos renseignées, chargées à la demande, avec le même dialogue plein écran, navigation clavier et gestes tactiles. Aucune catégorie ou légende descriptive n’est inventée.

Validation locale : TypeScript ; ESLint sur les fichiers modifiés ; scripts `verify-haumiere-stay`, `verify-villa-stay`, `verify-villa-gallery`, `verify-villa-availability`, `verify-villa-enquiry`, sécurité et comptes ; filtres et collections ; SEO des lieux ; audit des dépendances de production sans vulnérabilité.

Limites de l’environnement : `next build` et sa variante webpack s’arrêtent sur `ENOENT / uv_resident_set_memory`. Aucun navigateur Playwright n’est installé et son téléchargement échoue : le rendu visuel mobile n’a pas pu être contrôlé localement. La compilation et le déploiement de prévisualisation restent à vérifier dans les contrôles de la PR.
