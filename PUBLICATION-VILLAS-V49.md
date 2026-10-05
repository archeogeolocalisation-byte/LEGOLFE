# Publication des villas V49

`supabase/villas.sql` active trois éléments indépendants des tables existantes : `villa_listings`, le bucket `villa-photos` et `villa_inquiries`. Le script est fourni pour exécution dans le projet Supabase du site ; il n’a pas été appliqué à distance pendant la livraison.

Les politiques donnent à l’annonceur connecté l’accès à ses annonces et à leurs demandes. Les visiteurs lisent les annonces publiées de visibilité publique et peuvent déposer une demande pour ces annonces, sans lire les demandes d’autres voyageurs. Les dates et la capacité sont contrôlées dans la base. Les photos téléchargées à la mise en ligne sont publiques ; mettre une fiche en pause ne supprime pas ces fichiers. Le retrait des objets inutilisés n’est pas automatisé.

Les brouillons locaux et leurs photos IndexedDB restent accessibles dans l’aperçu. Seule l’action « Mettre en ligne » transfère les photos et crée la fiche partageable. Une annonce déjà en ligne est mise à jour sur le serveur lors de l’enregistrement de ses modifications. La suppression retire sa ligne et ses demandes associées, sans effacer automatiquement les photos du bucket.

La fiche publique et l’aperçu utilisent `VillaDetail`. Le catalogue Stay et le sitemap ajoutent les annonces publiques retournées par Supabase. Si le stockage n’est pas activé ou momentanément indisponible, le catalogue conserve les villas de démonstration. La recherche de compatibilité historique `/match` utilise encore son catalogue de démonstration.

Les demandes sont consultables dans le Host Desk du compte annonceur. Le succès du formulaire signifie enregistrement confirmé, sans réservation ni notification e-mail automatique. Les annonces de démonstration continuent à utiliser la table de demandes historique `requests`.

Les essais de publication, erreurs d’envoi, annonces privées et pauses ont été réalisés avec des services simulés. Les politiques SQL doivent être vérifiées sur le projet cible après activation, avec deux comptes distincts et une fenêtre visiteur.

Sources techniques primaires :

- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/storage/security/access-control
- https://supabase.com/docs/guides/storage/buckets/fundamentals
