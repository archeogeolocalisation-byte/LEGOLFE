# Fiche modèle Villa Eden

La nouvelle présentation s’applique uniquement à `villa-eden`, en français et en anglais, lorsque la fiche est une démonstration publique. Une annonce publiée ou un aperçu propriétaire conserve son parcours existant.

Le haut de page associe le nom, l’accroche et la mention explicite de démonstration à la photographie existante. La galerie existante garde son plein écran, ses commandes clavier et son fonctionnement mobile ; aucune nouvelle photo ni image de pièce n’est créée. Ses légendes de présentation sont localisées.

La capacité apparaît une seule fois, puis le sommaire dessert la maison, les équipements, les informations à préciser et le secteur. L’introduction et les trois développements éditoriaux ont des contenus distincts. Les équipements sont regroupés à partir des seuls éléments du modèle ; « piscine chauffée » évite de répéter « piscine ».

Le bloc « Avant de se décider » signale ce que cet exemple ne renseigne pas : couchages détaillés, escaliers et équipement bébé ; période de chauffe et sécurité de la piscine ; frais, linge, horaires, animaux et annulation. Aucun équipement de sécurité ou prestation n’est présumé.

La partie Ramatuelle garde les trois fiches existantes de Pampelonne, du village et du Moulin de Paillas. Elles sont présentées comme des idées dans la commune, sans trajet ni distance à pied depuis la maison. Aucune position de maison n’est inventée.

Le bloc latéral distingue le tarif d’illustration d’une offre de location. Il renvoie aux annonces et aux communes. Il ne propose ni contact, ni demande de disponibilité, ni enregistrement d’un exemple comme maison disponible. La description courte de Villa Eden est également clarifiée en FR/EN pour les métadonnées et les cartes. Les démonstrations conservent le `noindex` existant et ne reçoivent pas de schéma commercial.

Styles isolés dans `VillaEditorialDetail.module.css` ; aucun changement des styles de recherche ou des cartes de la PR #117. Validation ciblée : TypeScript, contrôles FR/EN existants des villas, vérification du parcours séjour existant, et assertions du modèle (sections, équipements, absence de doublons, pas de formulaire ni de photos supplémentaires, aperçu propriétaire conservé). Pas de nouveau workflow ou de dépendance. Pas de validation visuelle dans un navigateur effectuée dans cet environnement.
