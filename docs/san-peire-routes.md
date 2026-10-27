# San Peïre : deux départs et carte de randonnée

Les pages FR/EN `/place/san-peire-randonnee` et `/guides/randonnee-san-peire-plan-de-la-tour` partagent le module de comparaison des départs. Le parcours du village et la boucle des Vernades ne sont jamais fusionnés.

## Départ village

La géométrie provient du GPX proposé par l’Office du Golfe sur sa fiche touristique (voir `data/sanPeireTrail.json` pour les URL, la date documentaire et le SHA-256 de la source). Les 247 coordonnées sont conservées dans l’ordre, sans inventer de liaison. Le fichier original est archivé dans `data/sources/san-peire-village-official.gpx`.

Le fichier mesure environ 5,792 km pour l’aller ; le topoguide annonce 6 km et 2 h en aller simple. La préparation aller-retour affiche environ 12 km et 4 h hors pauses, explicitement estimés. Le dénivelé de +370 m est celui annoncé pour l’aller ; il n’est pas doublé.

Toutes les altitudes du GPX original sont à zéro. Pour ne pas publier de faux profil plat, les 247 points ont été enrichis par le service IGN Géoplateforme, ressource `ign_rge_alti_wld`, en sept requêtes GET de 40 points maximum. Les altitudes stockées vont de 39,1 à 412,5 m. Il s’agit d’altitudes de terrain modélisées, sans relevé GPS ni contrôle terrain LE GOLFE. Aucun appel altimétrique n’est exécuté par les visiteurs.

Le GPX téléchargeable `public/media/trails/san-peire-village.gpx` conserve les coordonnées et ajoute les altitudes IGN ainsi que les attributions et la mention aller seul. Carte OpenStreetMap avec attribution, zoom, déplacement, recentrage et plein écran. Le curseur du profil déplace un point sur la carte. La position GPS de l’utilisateur n’est pas demandée et aucune disponibilité hors réseau du fond de carte n’est annoncée.

## Départ Visorando / Vernades

La fiche n°65442977 annonce 6,66 km, 2 h 35, +246 m et un niveau moyen. Le repère de départ publié est 43.311004, 6.550222 ; il ne garantit pas un stationnement autorisé. Les retours de février à avril 2026 concernant le chemin des Chèvres et le parking sont signalés comme des retours datés, pas comme un état d’accès actuel vérifié.

La carte de cette variante est fournie par le widget Visorando officiel, chargé uniquement après un clic explicite et retiré quand on revient au parcours village. Le lien vers la fiche source reste disponible si le widget échoue. Aucun GPX Visorando n’est recopié ni réattribué à LE GOLFE. Ses téléchargements et son profil sont consultables chez le fournisseur.

## Cohérence et contrôle

La fiche Explorer indiquait 6 km aller-retour tandis que le guide préparait 12 km depuis le village. Les deux contenus, descriptions SEO et dates de vérification documentaire sont alignés. Le lien « nouvelles du sentier » conduit au formulaire de contribution existant, avec modération ; aucune nouvelle table ni migration n’est nécessaire.

Tests : `test-san-peire-routes.cjs` contrôle les 247 coordonnées et le SHA source, les altitudes et le GPX exporté, le cadrage de toute la trace, les deux variantes, les rendus FR/EN, le chargement externe explicite, le curseur et le focus plein écran. Les contrôles guides/SEO et lieux/SEO couvrent les deux pages, les sources et le sitemap. Ces tests sont intégrés à la CI.
