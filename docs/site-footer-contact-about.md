# Footer, Contact et À propos — 21 octobre 2026

Le footer est monté une seule fois dans `app/layout.tsx`, après le contenu. Les anciennes occurrences dans les pages, villas et formulaires sont supprimées. `GlobalFooter` suit le chemin courant pour mettre à jour les liens FR/EN pendant les navigations sans rechargement ; `routeLocale` est partagé avec le proxy et la langue du document, y compris les routes historiques françaises `/match`, `/requests` et `/villa/…`.

Design bleu #0b3046, textes clairs, accents beiges, trois groupes de navigation et bloc de contact. Liens de langue vers la même page locale lorsqu’elle existe. Le footer est rendu dans le HTML initial et reste navigable sans JavaScript.

Pages publiques `/fr/contact`, `/en/contact`, `/fr/a-propos` et `/en/a-propos`, avec métadonnées, langues alternatives, breadcrumbs, données ContactPage/AboutPage et ajout au sitemap. La page Contact propose quatre liens mailto : message général et trois sujets préremplis. Elle ouvre la messagerie de la personne ; aucune soumission ni confirmation d’envoi n’est simulée. L’adresse par défaut `contact@legolfe.com` est celle déjà publiée par le site sur sa page Fonctionnement ; `LEGOLFE_CONTACT_EMAIL` permet de la remplacer. Pas de nouveau service d’e-mail ni de migration.

Les contrôles couvrent les textes FR/EN, les URL mailto, les métadonnées, un seul footer global et le sitemap. WebKit vérifie un échantillon des pages publiques et de compte, les anciennes routes, les changements de langue, le rendu sans JavaScript et les limites mobiles ; captures dans l’artefact footer-webkit.

Le contrôle mobile a également repéré un titre trop large dans les catégories Explorer : taille et grille adaptées aux petits écrans, avec vérification de la largeur de la page de catégorie.
