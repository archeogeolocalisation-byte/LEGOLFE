# Visuels des spectacles du Carré — 14 octobre 2026

L’utilisateur confirme dans la conversation avoir obtenu l’autorisation de reprendre les visuels du Carré. Ce sont des images utilisées avec autorisation, pas une licence Creative Commons ni une déclaration de domaine public.

31 visuels de la billetterie officielle sont conservés en WebP local (maximum 1200 px, proportions inchangées, sans recadrage ni retouche). Le manifeste data/carreEventImages.ts associe chaque identifiant canonique à son original, son lien spectacle et la source de diffusion. La billetterie ne fournit pas de champ crédit photographe dans cette liste : attribution au fournisseur officiel, sans inventer de noms d’auteurs. Les crédits nominatifs pourront être complétés avec ceux fournis par le Carré.

Le parseur du programme récupère désormais le visuel associé à chaque lien spectacle et accepte uniquement les URL HTTPS du domaine img.mapado.net. L’original est extrait de la vignette, sans utiliser le recadrage carré de la billetterie. Quand le visuel correspond au manifeste, la copie locale est utilisée. Si un visuel officiel change ou si un nouveau spectacle est publié, l’URL officielle est affichée directement ; l’hébergement local de ces futurs fichiers reste à actualiser. Si le HTML ne fournit pas d’image, une copie connue reste disponible par identifiant.

Agenda à l’affiche, liste, cartes agenda et fiche événement utilisent ces visuels avec la mention Visuel officiel du spectacle. Les images sont contenues intégralement dans les cadres existants. Les métadonnées sociales et les données structurées des fiches utilisent également le visuel officiel. Aucun changement aux dates, textes, filtres, mise en avant ou événements hors Carré.

Validation : les 31 associations, présence et signature WebP des fichiers, secours sans image, remplacement officiel et rejet d’un domaine tiers sont ajoutés à la suite agenda-feeds. TypeScript, suite profile-agenda et CI complète. Vérification visuelle des originaux Boréale et Greg Zlap. Aucune variable d’environnement ni SQL. Preview Vercel désactivée sur feature/agenda-show-images.

## Illustrations de catégories — 16 octobre 2026

Huit créations sélectionnées dans la conversation : musique (référence fournie), sport, famille, nautisme, culture, marché/vie locale, pétanque et vignobles. Copies WebP locales à 1440 px maximum, sans recadrage, dans `public/media/events/illustrations`. Le manifeste local indique leur origine illustrative ; elles ne représentent pas les événements réels.

Les visuels officiels connus restent prioritaires. Les autres événements reçoivent une illustration de leur catégorie, avec priorité aux sujets pétanque et vignobles dans les titres ou le lieu. Dans l’agenda, seuls les événements sans visuel officiel sont comptés pour alterner illustration et carte bleu nuit avec titre, catégorie et commune. Le comptage suit l’ordre à l’affiche puis liste et se recalcule avec les filtres. Texte FR/EN natif, sans troncature ; si une image échoue au chargement, le titre prend sa place. Les fiches événement et métadonnées réutilisent les illustrations catégorielles. Aucune modification des dates ou du catalogue. Preview Vercel désactivée sur la branche de travail.

Validation : associations des six catégories, sujets spécifiques et absence de faux positif « Vincent », intégrité WebP, alternance au travers des événements officiels, suites agenda, TypeScript et rendu serveur des cartes avec titres longs. Compilation complète à confirmer en CI : le runtime local bloque Next.js avec `uv_resident_set_memory` ; aucun résultat de build local validé.
