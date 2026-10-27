# Maisons & villas : recherche et cartes

La page `/fr/stay` et sa version anglaise privilégient les annonces publiées : budget à la semaine, commune, voyageurs et chambres sont accessibles sans ouvrir les filtres avancés, y compris sur mobile. Les collections sont des raccourcis vers le filtre existant ; Charme et Exception restent attribuées par la revue éditoriale existante.

Les dates et équipements se déplient à la demande. Le tri propose l’ordre initial, les prix croissants/décroissants et la capacité décroissante. Les prix inconnus restent en fin de liste dans les deux tris par prix. Les calendriers sont chargés uniquement pour une recherche avec arrivée et départ et un catalogue non vide.

Les cartes présentent une photo bord à bord, la commune, la capacité, trois équipements déclarés au maximum et le prix de départ par semaine. « Piscine chauffée » remplace « Piscine » pour éviter un doublon. Aucun attribut de proximité ou de confort n’est déduit du texte de description. Seules les collections validées ont un badge de sélection.

Un bouton indépendant des liens enregistre les annonces publiées dans Mon séjour. Il partage sa gestion du stockage et des événements avec les actions de la fiche : synchronisation dans la page et entre onglets, retrait d’un favori, message en cas de stockage bloqué. Le format existant `le-golfe-saved-villas` est conservé.

Les présentations de démonstration sont regroupées dans un volet distinct, signalées comme indisponibles, exclues des résultats, du compteur, des choix de distance et du schéma de collection des annonces publiées. Elles ne proposent pas l’enregistrement et n’affichent pas leurs distances fictives. Le catalogue vide présente une explication et un accès aux communes.

Le titre visible est « Votre maison dans le Golfe. ». Les métadonnées existantes conservent « Maisons et villas » et « Golfe de Saint-Tropez ». Les liens vers les communes, Mon séjour, le formulaire de recherche et l’espace propriétaire restent accessibles.

Validation : TypeScript ; contrôles existants des filtres (50 assertions, dont tri et visibilité des contrôles essentiels) ; vérification FR/EN des cartes et fiches, ainsi que du stockage des favoris ; quatre rendus ciblés de la collection avec catalogue vide ou annonce publiée à 1 400 €/semaine, pour vérifier la séparation des exemples et les liens localisés. Aucun tarif d’exemple abordable ajouté au catalogue réel.

Pas de modification des workflows GitHub, de migration SQL ou de dépendance supplémentaire. Pas de validation visuelle dans un navigateur effectuée dans cet environnement.
