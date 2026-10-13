# Agenda — 13 octobre 2026

Titre réduit : 38–80 px au lieu des 60–118 px précédents. Introduction ivoire, affichage bleu LE GOLFE, cartes ivoire et bleu clair, filtres actifs bleus avec texte blanc. La liste utilise deux colonnes dès 768 px et une sur téléphone. À l’affiche utilise un grand événement à gauche et deux compacts à droite dès 960 px ; empilement sur petits écrans.

La mise en avant reste liée à la période, catégorie et commune sélectionnées. Jusqu’à trois événements à venir dans cette sélection, priorité aux événements éditorialement marqués featured, puis ordre chronologique existant. Aucun événement inventé pour remplir trois cartes si la sélection est plus courte. Les événements à l’affiche ne sont pas répétés dans la liste ; le compteur indique le total de la sélection. S’il ne reste aucun autre événement, un texte précise que tous sont affichés au-dessus. Les événements passés d’un mois sélectionné restent dans la liste. Sessions récurrentes, liens fiche/source/demande et crédits des photos de contexte sont conservés.

Validation : suite profile-agenda conserve les interactions date/mois et récurrences ; sept événements de test FR/EN, priorité featured, trois mises en avant/quatre restants sans doublon, catégorie et commune, sélection d’un seul événement et vide. TypeScript, ESLint ciblé, compilation et suites complètes CI. Contrôle navigateur du 1+2 et de la grille responsive après publication. Aucun SQL ou environnement requis. Branche design/agenda-layout sans preview publique.

## Ajustement final

Fond de la rubrique À l’affiche remis en noir, composition un grand/deux petits conservée. La liste suivante affiche un seul événement par ligne sur toutes les tailles : sur ordinateur, vignette à gauche et contenu à droite ; sur téléphone, image au-dessus. Les couleurs LE GOLFE des cartes, dates et liens sont conservées. Aucun changement aux données, filtres, compteurs ou sessions. Vérification par la suite profile-agenda et compilation CI. Branche design/agenda-final sans preview publique.

## Titres du menu et programmation officielle

Les pages Explorer, Découvrir le Golfe, Guides, Local, Villas, Demander, Favoris et Compte partagent désormais la classe lg-menu-title avec l’Agenda : clamp(2.4rem, 5.3vw, 5rem), soit environ 38 à 80 px, même graisse, interligne et espacement. La page d’accueil et les titres des fiches conservent leur composition.

Le catalogue public importe la programmation publique du Carré Léon Gaumont depuis sa billetterie officielle Mapado. Une seule requête serveur, sans clé, avec cache Next de six heures et délai maximal de quatre secondes ; ce rafraîchissement se fait à la consultation, sans cron. Le parseur lit les titres et dates publiés, y compris les représentations multiples, et conserve les textes éditoriaux et la priorité des spectacles déjà connus. Les identifiants canoniques évitent les doublons. Une copie de 31 spectacles vérifiée le 13 octobre 2026 couvre la saison jusqu’au 21 mai 2027 et sert de secours en cas de panne ou de changement du HTML. Le site fournisseur ne propose pas de RSS/iCal identifié : cet import dépend de son HTML et devra être surveillé.

Quatre rendez-vous supplémentaires vérifiés sur les sources officielles : visites du jardinier au Domaine du Rayol, exposition des débarquements à Cavalaire, Le temps des pivoines et Fête de la Châtaigne à La Garde-Freinet. Les sessions, conditions météo et liens sources figurent dans les fiches. Ces ajouts restent éditoriaux, sans synchronisation automatique.

Les sources proposent aussi le programme du cinéma Le Pagnol, du Rayol, de La Garde-Freinet et de la ville de Sainte-Maxime. Le cinéma reste un lien vers son programme officiel, sans import de séances. Les illustrations de contexte Rayol/Freinet sont signalées comme telles.

Validation : tests du parseur sur les 31 spectacles, sessions multiples, conservation éditoriale, dédoublonnage du catalogue, paramètres de cache et secours en cas de panne. Suite profile-agenda, TypeScript, ESLint ciblé et compilation CI. Pas de SQL ni de variable d’environnement à ajouter. Branche feature/menu-agenda-sources sans preview publique ; vérification visuelle FR/EN des titres après fusion et publication.

ESLint ciblé : aucun défaut dans les nouveaux modules. Les fichiers existants gardent leurs avertissements (images, dépendances de hooks) et une erreur déjà présente dans Demander, liée au préremplissage dans useEffect ; seul son titre a changé.
