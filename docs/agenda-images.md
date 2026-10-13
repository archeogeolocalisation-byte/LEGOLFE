# Visuels des spectacles du Carré — 14 octobre 2026

L’utilisateur confirme dans la conversation avoir obtenu l’autorisation de reprendre les visuels du Carré. Ce sont des images utilisées avec autorisation, pas une licence Creative Commons ni une déclaration de domaine public.

31 visuels de la billetterie officielle sont conservés en WebP local (maximum 1200 px, proportions inchangées, sans recadrage ni retouche). Le manifeste data/carreEventImages.ts associe chaque identifiant canonique à son original, son lien spectacle et la source de diffusion. La billetterie ne fournit pas de champ crédit photographe dans cette liste : attribution au fournisseur officiel, sans inventer de noms d’auteurs. Les crédits nominatifs pourront être complétés avec ceux fournis par le Carré.

Le parseur du programme récupère désormais le visuel associé à chaque lien spectacle et accepte uniquement les URL HTTPS du domaine img.mapado.net. L’original est extrait de la vignette, sans utiliser le recadrage carré de la billetterie. Quand le visuel correspond au manifeste, la copie locale est utilisée. Si un visuel officiel change ou si un nouveau spectacle est publié, l’URL officielle est affichée directement ; l’hébergement local de ces futurs fichiers reste à actualiser. Si le HTML ne fournit pas d’image, une copie connue reste disponible par identifiant.

Agenda à l’affiche, liste, cartes agenda et fiche événement utilisent ces visuels avec la mention Visuel officiel du spectacle. Les images sont contenues intégralement dans les cadres existants. Les métadonnées sociales et les données structurées des fiches utilisent également le visuel officiel. Aucun changement aux dates, textes, filtres, mise en avant ou événements hors Carré.

Validation : les 31 associations, présence et signature WebP des fichiers, secours sans image, remplacement officiel et rejet d’un domaine tiers sont ajoutés à la suite agenda-feeds. TypeScript, suite profile-agenda et CI complète. Vérification visuelle des originaux Boréale et Greg Zlap. Aucune variable d’environnement ni SQL. Preview Vercel désactivée sur feature/agenda-show-images.
