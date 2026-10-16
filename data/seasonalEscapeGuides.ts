import type {Guide} from './guides';
const today='2026-10-16';
export const seasonalEscapeGuides:Guide[]=[
 {
  slug:'journee-verdon-lac-sainte-croix-depuis-golfe',
  category:{fr:'Escapade / Verdon',en:'Day trip / Verdon'},
  image:'verdon-sainte-croix-cover',
  imageAlt:{fr:'Illustration du lac de Sainte-Croix à l’entrée des gorges du Verdon : eau turquoise, falaises et pont du Galetas',en:'Illustration of Lake Sainte-Croix at the entrance to the Verdon gorge: turquoise water, cliffs and Galetas bridge'},
  imageCaption:{fr:'Illustration éditoriale · LE GOLFE · Générée par IA',en:'Editorial illustration · LE GOLFE · AI-generated'},
  // This excursion is outside the Golfe: do not invent a local venue or destination.
  destinations:[],placeIds:[],
  related:['golfe-saint-tropez-avec-enfants','week-end-automne-golfe-saint-tropez'],
  published:today,verified:today,
  sources:[
   {id:'lake',label:'Office de tourisme de Moustiers · Lac de Sainte-Croix',url:'https://www.moustiers.fr/destination-verdon/lac-sainte-croix/'},
   {id:'water',label:'Parc du Verdon · Navigation et baignade à Sainte-Croix',url:'https://www.parcduverdon.fr/explorer/navigation-securite-sur-les-lacs/lac-sainte-croix/'},
   {id:'activities',label:'Office de tourisme de Moustiers · Activités nautiques',url:'https://www.moustiers.fr/sport-evasion/activites-nautiques/'},
   {id:'galetas',label:'Verdon Tourisme · Points de vue et pont du Galetas',url:'https://www.verdontourisme.com/preparer-mon-sejour/decouvrir-le-verdon/decouvrir-la-destination/les-gorges-du-verdon/top-5-des-plus-belles-vues-du-canyon/'},
   {id:'roads',label:'Verdon Tourisme · Les gorges en voiture',url:'https://www.verdontourisme.com/preparer-mon-sejour/decouvrir-le-verdon/decouvrir-la-destination/les-gorges-du-verdon/les-gorges-du-verdon-en-voiture/'},
   {id:'ridges',label:'Verdon Tourisme · Route des Crêtes',url:'https://www.verdontourisme.com/route-des-cretes/'},
   {id:'aiguines',label:'Lacs et Gorges du Verdon · Panorama d’Aiguines',url:'https://www.lacs-gorges-verdon.fr/voir-visiter/patrimoine-naturel/6035-point-de-vue-de-la-chapelle-saint-pierre.html'},
  ],
  copy:{
   fr:{
    title:'UNE JOURNÉE DANS LE VERDON.',accent:'LE LAC, SANS COURIR.',
    seoTitle:'Préparer sa journée dans le Verdon depuis le Golfe de Saint-Tropez',
    description:'Une journée dans le Verdon depuis le Golfe de Saint-Tropez : lac de Sainte-Croix, Galetas, pause au village, trajet, activités et conseils pratiques.',
    intro:'Quitter la mer pour une autre nuance de bleu. Le lac de Sainte-Croix et l’entrée des gorges font une belle escapade depuis le Golfe, à condition de leur laisser la journée. Le programme que l’on aime : un départ tôt, un vrai moment au lac, puis un village avant de rentrer.',
    verdict:'Pour une première fois, choisissez Sainte-Croix et le Galetas comme point d’ancrage. Une activité sur l’eau et une seule étape de village suffisent à faire une journée dont on profite.',
    facts:[{label:'Le format',value:'Une journée entière, trajets compris'},{label:'Le point d’ancrage',value:'Lac de Sainte-Croix · secteur du Galetas'},{label:'Le bon rythme',value:'Le lac + une seule étape de village'},{label:'À vérifier',value:'Trajet, météo, vent et ouverture des bases'}],
    sections:[
     {id:'depart',title:'Depuis le Golfe : préparer l’aller et le retour',paragraphs:[
      'Calculez le trajet depuis votre hébergement jusqu’au secteur précis où vous voulez vous poser. Saint-Tropez, Grimaud ou Sainte-Maxime ne donnent pas le même départ ; ajoutez les pauses et le stationnement au temps affiché. Gardez une marge pour le retour, surtout si vous n’aimez pas conduire de nuit.',
      'Notre conseil : préparez deux options la veille. Avec une météo adaptée et des activités ouvertes, gardez la journée au lac. Si le vent, la fatigue ou la route compliquent le programme, choisissez une sortie plus proche dans le Golfe. L’office rappelle que les routes du canyon sont sinueuses : multiplier les belvédères rallonge vite la journée.',
     ],sourceIds:['roads']},
     {id:'programme',title:'Notre proposition pour une première journée',paragraphs:[
      'Commencez par le lac, plutôt que d’enchaîner les villages en arrivant. Repérez l’accès à votre plage ou à la base nautique avant le départ. Le pont du Galetas se trouve à la rencontre du lac et du canyon ; c’est un beau repère pour comprendre le paysage.',
      'Le déroulé ci-dessous est une proposition LE GOLFE, à ajuster à votre trajet et à la saison. Prévoyez le déjeuner avant de vous installer : pique-nique froid ou table choisie à l’avance, selon l’envie du groupe.',
     ],sourceIds:['galetas'],table:{caption:'Une journée centrée sur le lac · proposition éditoriale, sans horaires garantis',headers:['Moment','Le programme','À garder en tête'],rows:[['Matin','Arrivée dans le secteur du Galetas, découverte du lac','Choisir un stationnement autorisé et rejoindre le bon accès'],['Fin de matinée / midi','Une activité nautique si les conditions le permettent, puis déjeuner','Confirmer sur place la durée, le matériel et les zones ouvertes'],['Après-midi','Temps au bord de l’eau, puis Aiguines ou Moustiers selon votre trajet','Choisir un seul village et conserver de la marge pour rentrer']]}},
     {id:'sur-leau',title:'Canoë, pédalo ou plage : choisir votre moment au lac',paragraphs:[
      'Les bases proposent différentes embarcations autour de Sainte-Croix. Choisissez selon les personnes qui vous accompagnent, leur aisance et l’effort souhaité ; confirmez l’ouverture, les tarifs, le matériel et les conditions du jour auprès de la base. Une promenade sur les berges peut très bien remplacer la sortie sur l’eau.',
      'Au-delà du Galetas, respectez les bouées qui limitent la navigation et les fermetures liées au vent. Portez le gilet adapté à votre embarcation. Pour vous baigner, choisissez une zone autorisée et vérifiez la surveillance à votre date : un lac calme en apparence ne dispense pas de lire les panneaux. Les sauts depuis les ponts et les falaises sont interdits.',
     ],sourceIds:['activities','water']},
     {id:'village',title:'Aiguines ou Moustiers : une étape qui prolonge la journée',paragraphs:[
      'Aiguines donne un autre regard sur le lac, notamment depuis le secteur de la chapelle Saint-Pierre. Moustiers permet de finir par une promenade au village. Choisissez l’étape qui s’accorde le mieux avec votre rive d’arrivée, votre énergie et votre retour.',
      'Évitez de transformer cette pause en nouvelle liste de visites. Un point de vue, quelques rues et une terrasse peuvent suffire. Avec des enfants, gardez la version courte et vérifiez ce qui reste ouvert hors saison.',
     ],sourceIds:['aiguines','lake']},
     {id:'autre-journee',title:'Le grand tour des gorges mérite son propre programme',paragraphs:[
      'La journée « lac et village » laisse du temps sur place. Le tour panoramique du canyon est une autre excursion : Verdon Tourisme conseille une journée pour son circuit d’environ 100 km, indépendamment du trajet depuis le Golfe.',
      'Si vous préférez les belvédères, construisez votre journée autour d’eux. La Route des Crêtes compte 24 km et une portion à sens unique ; consultez son ouverture et son sens de circulation avant de partir. Une grande randonnée dans le canyon demande elle aussi une préparation distincte.',
     ],sourceIds:['roads','ridges']},
     {id:'sac',title:'Dans le sac, et à vérifier la veille',paragraphs:[
      'Eau pour chacun, déjeuner ou solution de restauration, protection solaire, chapeau, chaussures pour marcher et une couche supplémentaire selon la saison. Ajoutez le nécessaire de baignade seulement si vous avez prévu un accès autorisé et des conditions adaptées.',
      'Recontrôlez la météo, le vent, les accès et l’ouverture des bases. Prévoyez un budget qui distingue route, stationnement, repas et activité : les tarifs dépendent de votre formule. Emportez vos déchets et choisissez un pique-nique sans feu ni réchaud, interdits sur les berges par les consignes du Parc.',
     ],sourceIds:['water']},
    ],
    questions:[
     {question:'Peut-on faire le Verdon à la journée depuis Saint-Tropez ?',answer:'Oui, en réservant une journée entière et en vérifiant votre trajet réel. Notre proposition se concentre sur Sainte-Croix, le Galetas et un village ; les temps de route dépendent de votre départ et de la circulation.'},
     {question:'Faut-il réserver une embarcation ?',answer:'Cela dépend de la base et de la formule. Contactez l’opérateur pour connaître son fonctionnement, ses dates d’ouverture et les conditions du jour. La navigation peut être limitée par le vent ou d’autres restrictions.'},
     {question:'Peut-on faire cette journée avec des enfants ?',answer:'Choisissez une plage autorisée, une activité adaptée à leur âge et une courte pause au village. Vérifiez les équipements et les conditions avec l’opérateur ; le programme se simplifie facilement en restant au bord du lac.'},
    ],
    links:[{label:'D’autres idées avec les enfants',path:'/guides/golfe-saint-tropez-avec-enfants'},{label:'Un week-end d’automne dans le Golfe',path:'/guides/week-end-automne-golfe-saint-tropez'},{label:'Retrouver les guides',path:'/guides'}],
   },
   en:{
    title:'A DAY IN THE VERDON.',accent:'TIME FOR THE LAKE.',
    seoTitle:'Plan a Verdon day trip from the Golfe de Saint-Tropez',
    description:'Plan a Verdon day trip from the Golfe de Saint-Tropez: Lake Sainte-Croix, Galetas, one village stop, travel planning, water activities and practical tips.',
    intro:'Leave the sea for a different shade of blue. Lake Sainte-Croix and the entrance to the gorge make a rewarding excursion from the Golfe when you give them a full day. Our preferred plan: leave early, spend proper time at the lake, then stop in one village before returning.',
    verdict:'For a first visit, make Sainte-Croix and Galetas your anchor. One water activity and one village stop leave time to enjoy the day.',
    facts:[{label:'The format',value:'A full day, including both journeys'},{label:'Your anchor',value:'Lake Sainte-Croix · Galetas area'},{label:'The pace',value:'The lake + one village stop'},{label:'Check first',value:'Journey, forecast, wind and base opening'}],
    sections:[
     {id:'depart',title:'From the Golfe: plan both journeys',paragraphs:[
      'Calculate the route from your accommodation to the particular shore you want to visit. Saint-Tropez, Grimaud and Sainte-Maxime are different starting points; add breaks and parking time to the estimate. Leave room for the return, especially if you prefer driving in daylight.',
      'Our advice: prepare two options the night before. With suitable weather and open activities, keep the lake plan. If wind, tiredness or road conditions complicate it, choose an outing closer to the Golfe. The tourist office notes that canyon roads are winding: extra viewpoints soon extend the day.',
     ],sourceIds:['roads']},
     {id:'programme',title:'Our suggestion for a first visit',paragraphs:[
      'Start at the lake rather than collecting village stops on arrival. Find your beach or watersports access before leaving. Pont du Galetas marks the meeting of lake and canyon, a useful place to understand the landscape.',
      'The sequence below is a LE GOLFE suggestion, to adapt to your journey and the season. Decide on lunch before settling in: a cold picnic or a table chosen ahead, according to your group.',
     ],sourceIds:['galetas'],table:{caption:'A lake-focused day · editorial suggestion, without guaranteed timings',headers:['When','The plan','Remember'],rows:[['Morning','Arrive near Galetas and discover the lake','Choose authorised parking and the correct shore access'],['Late morning / lunch','One water activity if conditions allow, followed by lunch','Confirm duration, equipment and open areas with the operator'],['Afternoon','Time by the water, then Aiguines or Moustiers to suit your route','Choose one village and leave room for the journey back']]}},
     {id:'sur-leau',title:'Canoe, pedal boat or beach: choose your lake time',paragraphs:[
      'Bases around Sainte-Croix offer different craft. Choose for your companions, confidence and preferred effort; confirm opening, prices, equipment and conditions with the operator. A shore walk can easily replace the water activity.',
      'Beyond Galetas, respect navigation-limit buoys and wind closures. Wear the appropriate buoyancy aid. For swimming, use an authorised area and check supervision for your date: apparently calm water is no reason to overlook signs. Jumping from bridges or cliffs is prohibited.',
     ],sourceIds:['activities','water']},
     {id:'village',title:'Aiguines or Moustiers: one stop to round off the day',paragraphs:[
      'Aiguines offers another view of the lake, including the area around Saint-Pierre chapel. Moustiers lets you finish with a village stroll. Choose according to your arrival shore, energy and return route.',
      'Keep the stop simple. A viewpoint, a few streets and a terrace may be enough. With children, opt for a short visit and check what remains open outside the main season.',
     ],sourceIds:['aiguines','lake']},
     {id:'autre-journee',title:'The full canyon circuit needs its own plan',paragraphs:[
      'A lake-and-village day leaves time on the shore. A panoramic circuit of the canyon is a separate outing: Verdon Tourisme recommends a full day for its roughly 100 km circuit, before adding your journeys from the Golfe.',
      'If viewpoints are your priority, build the day around them. The Route des Crêtes is 24 km long and partly one-way; check opening and direction before travelling. A substantial canyon hike also requires separate preparation.',
     ],sourceIds:['roads','ridges']},
     {id:'sac',title:'What to pack and check the night before',paragraphs:[
      'Water for everyone, lunch or a meal plan, sun protection, a hat, walking shoes and an extra layer for the season. Pack swimwear when you have planned an authorised location and suitable conditions.',
      'Recheck the forecast, wind, access and base opening. Allow separately for travel, parking, meals and activities: prices depend on your choices. Take your waste home and choose a picnic without a fire or stove, which the Park prohibits on the shores.',
     ],sourceIds:['water']},
    ],
    questions:[
     {question:'Can I visit the Verdon in a day from Saint-Tropez?',answer:'Yes, by allowing a full day and checking your actual route. Our suggestion focuses on Sainte-Croix, Galetas and one village; driving times depend on your starting point and traffic.'},
     {question:'Should I book a boat?',answer:'It depends on the base and activity. Ask the operator about bookings, opening dates and current conditions. Wind or other restrictions can limit navigation.'},
     {question:'Is the day suitable for children?',answer:'Choose an authorised beach, an age-appropriate activity and a short village stop. Check equipment and requirements with the operator; you can simplify the programme by staying beside the lake.'},
    ],
    links:[{label:'More family ideas',path:'/guides/golfe-saint-tropez-avec-enfants'},{label:'An autumn weekend in the Golfe',path:'/guides/week-end-automne-golfe-saint-tropez'},{label:'All guides',path:'/guides'}],
   },
  },
 },
 {
  slug:'champignons-golfe-saint-tropez-saison-forets',
  category:{fr:'Nature / Champignons',en:'Nature / Mushrooms'},
  image:'champignons-golfe-saint-tropez-cover',
  imageAlt:{fr:'Illustration d’une promenade d’automne parmi les chênes-lièges des Maures, avec panier et champignons stylisés',en:'Illustration of an autumn walk among Maures cork oaks, with a basket and stylised mushrooms'},
  imageCaption:{fr:'Illustration d’ambiance générée par IA · LE GOLFE · Ne pas utiliser pour identifier les champignons',en:'AI-generated atmosphere illustration · LE GOLFE · Not for mushroom identification'},
  destinations:['grimaud','le-plan-de-la-tour','cogolin'],
  placeIds:['plan-de-la-tour-village','san-peire-randonnee','grimaud-village','cogolin-village'],
  related:['week-end-automne-golfe-saint-tropez','randonnee-san-peire-plan-de-la-tour','randonnee-pont-des-fees-grimaud'],
  published:today,verified:today,
  sources:[
   {id:'anses',label:'Anses · Recommandations de cueillette, annexe du rapport de toxicovigilance',url:'https://www.anses.fr/fr/system/files/Toxicovigilance2022VIG0107Ra.pdf'},
   {id:'owner',label:'CNPF · Cueillette et propriété forestière',url:'https://www.cnpf.fr/se-former-s-informer/droit-et-fiscalite/cueillette-des-champignons-que-dit-la-loi'},
   {id:'onf',label:'ONF · Autorisations et bonnes pratiques de cueillette',url:'https://www.onf.fr/vivre-la-foret/que-faire-en-foret/regles-et-bonnes-pratiques-en-foret/+/2891::conseils-precautions-comment-bien-cueillir-champignons-et-chataignes-en-foret.html'},
   {id:'ecology',label:'Forêt méditerranéenne · Mycologie et écologie des espèces (1986, PDF)',url:'https://www.foret-mediterraneenne.org/upload/biblio/FORET_MED_1986_2_139.pdf'},
   {id:'cepes',label:'Mycocharentes · Observations du cèpe bronzé',url:'https://www.mycocharentes.fr/pdf1/265.pdf'},
   {id:'oronges',label:'Mycocharentes · Observations de l’amanite des Césars',url:'https://www.mycocharentes.fr/pdf1/211.pdf'},
   {id:'coulemelles',label:'MycoDB · Écologie de la coulemelle',url:'https://www.mycodb.fr/fiche.php?espece=procera&genre=Macrolepiota'},
   {id:'sanguins',label:'MycoDB · Écologie du lactaire sanguin',url:'https://www.mycodb.fr/fiche.php?espece=sanguifluus&genre=Lactarius'},
   {id:'suberaie',label:'Office du Golfe · Chênaies entre La Garde-Freinet et Grimaud, par les Vernades',url:'https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/sentier-de-la-garde-freinet-a-grimaud-par-les-vernades/'},
   {id:'plantour',label:'Office du Golfe · Forêt de chênes-lièges au San Peïre',url:'https://www.golfe-sainttropez-tourisme.fr/decouvrir/notre-territoire/plan-de-la-tour/'},
   {id:'cogolin',label:'Office du Golfe · Paysages forestiers vers Giégi',url:'https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/sentier-de-cogolin-a-la-croix-valmer-en-passant-par-giegi/'},
   {id:'fire',label:'Office du Golfe · Carte quotidienne d’accès aux massifs',url:'https://www.golfe-sainttropez-tourisme.fr/sejourner/pratique/risque-incendie/'},
  ],
  copy:{
   fr:{
    title:'LES CHAMPIGNONS DU GOLFE.',accent:'L’AUTOMNE SOUS LES CHÊNES.',
    seoTitle:'Champignons dans le Golfe de Saint-Tropez : saisons et forêts',
    description:'Oronges, coulemelles, cèpes, sanguins, girolles et trompettes : repères de saison et forêts du Golfe de Saint-Tropez pour préparer une sortie d’automne.',
    intro:'Après les pluies, le Golfe se regarde aussi au ras des feuilles. On guette les oronges, les coulemelles et les cèpes, puis les sanguins ; les girolles et les trompettes prolongent parfois le plaisir des sous-bois. Le vrai rendez-vous se prend avec la météo, les arbres et le terrain.',
    verdict:'Pour les cèpes, commencez par regarder les chênaies, notamment les forêts de chênes-lièges du massif des Maures. Choisissez un secteur ouvert et autorisé, puis partez pour la promenade : un panier rempli reste une possibilité, jamais une promesse.',
    facts:[{label:'Le déclencheur',value:'Humidité, températures et conditions du terrain'},{label:'Le paysage',value:'Chênaies des Maures · pinèdes pour les sanguins'},{label:'Le calendrier',value:'Des poussées qui se chevauchent selon les années'},{label:'Avant de consommer',value:'Identification certaine ; au moindre doute, contrôle par un spécialiste'}],
    sections:[
     {id:'avant-panier',title:'Le bon réflexe avant de remplir le panier',paragraphs:[
      'Cette page aide à préparer une sortie, pas à déterminer la comestibilité d’un champignon. Le dessin de couverture et les noms cités ne servent pas à identifier une récolte. Au moindre doute, ne consommez pas avant un contrôle par un mycologue ou un pharmacien compétent ; une application ou une photo seule ne suffit pas.',
      'Ramassez seulement les espèces que vous connaissez parfaitement, gardez les spécimens entiers pour permettre leur contrôle et séparez les espèces dans le panier. Écartez les secteurs pollués et les bords de route. Les recommandations de l’Anses restent la référence avant toute consommation.',
     ],sourceIds:['anses']},
     {id:'saison',title:'Oronges, coulemelles, cèpes… puis les autres poussées',paragraphs:[
      'Notre fil conducteur local commence par les oronges, les coulemelles et les cèpes lorsque l’automne garde de la douceur. Les périodes se recouvrent : une pluie ne donne pas partout la même poussée et une semaine sèche peut interrompre l’élan. Les observations mycologiques décrivent notamment des cèpes bronzés et des oronges présents bien avant le plein automne.',
      'Les sanguins invitent ensuite à regarder du côté des pins. Girolles et trompettes peuvent accompagner les sorties plus humides, mais il ne faut pas les enfermer dans un ordre fixe : les girolles peuvent aussi apparaître plus tôt. Voici des milieux à comprendre, sans calendrier garanti ni critères d’identification.',
     ],sourceIds:['cepes','oronges','coulemelles','sanguins','ecology'],table:{caption:'Repères de milieu · les poussées peuvent se chevaucher ; ce tableau n’identifie aucune récolte',headers:['À guetter','Le milieu à explorer','Le repère de saison'],rows:[['Oronges','Bois de feuillus des secteurs chauds','Parmi les espèces à guetter quand chaleur et humidité se rencontrent'],['Coulemelles','Clairières, lisières et prés-bois','Observer les espaces plus ouverts, sans en déduire la comestibilité'],['Cèpes','Chênaies et autres bois de feuillus','Certaines espèces apprécient les périodes encore douces'],['Sanguins','Pinèdes','Un autre milieu à explorer au fil des poussées automnales'],['Girolles','Sous-bois de feuillus ou de conifères','Peuvent apparaître avant les sanguins ; pas de rang fixe dans la saison'],['Trompettes de la mort','Bois de feuillus humides','À guetter si l’humidité tient ; présence variable selon le secteur']]}},
     {id:'chenes-lieges',title:'Chercher une forêt de chênes-lièges pour les cèpes',paragraphs:[
      'Les chênaies donnent un bon fil de promenade dans les Maures. Pour les cèpes, les feuillus sont une piste à privilégier ; le cèpe bronzé est notamment documenté sous les chênes. Dans le Golfe, les bois de chênes-lièges permettent d’explorer ce paysage sans aller chercher très loin.',
      'Regardez d’abord les arbres et l’ambiance du sous-bois plutôt que de suivre un point présenté comme miraculeux. Une forêt peut sembler idéale et ne rien donner ce jour-là. Le type de sol, l’humidité et l’histoire du secteur comptent aussi : la présence d’un chêne-liège ne garantit ni un cèpe ni une espèce consommable.',
     ],sourceIds:['cepes','suberaie','plantour']},
     {id:'forets',title:'Trois portes d’entrée pour découvrir ces paysages',paragraphs:[
      'Entre La Garde-Freinet et Grimaud, les itinéraires par les Vernades traversent des chênaies-lièges et des châtaigneraies. Autour du Plan-de-la-Tour, le secteur du San Peïre permet de retrouver les chênes-lièges dans un paysage de granite. Depuis Cogolin vers Giégi, les descriptifs officiels évoquent également chênes-lièges, maquis et pins.',
      'Ce sont des idées de secteurs pour observer la forêt, pas des coins de récolte certifiés. Choisissez un sentier adapté à votre groupe, consultez son descriptif et restez dans les espaces ouverts au public. Le passage d’un sentier ne vaut pas autorisation de cueillir dans les parcelles voisines.',
     ],sourceIds:['suberaie','plantour','cogolin','owner']},
     {id:'autorisation',title:'Une forêt ouverte n’est pas forcément une forêt où cueillir',paragraphs:[
      'Vérifiez le propriétaire, les panneaux et les règles locales avant de prélever. L’ONF distingue les forêts domaniales, où une cueillette familiale limitée est admise sauf règle locale contraire, des autres forêts où l’autorisation du propriétaire est nécessaire. Ne transposez pas cette possibilité à toute la forêt des Maures.',
      'Respectez les éventuelles fermetures, les consignes de chantier et la signalisation de chasse. Consultez aussi les informations d’accès aux massifs. Une sortie se reporte facilement ; prévoyez un autre sentier ou une promenade au village si le secteur n’est pas accessible.',
     ],sourceIds:['onf','owner','fire']},
     {id:'sortie',title:'Une sortie courte, un panier propre, une forêt intacte',paragraphs:[
      'Notre préférence : une seule zone de promenade et assez de temps pour rentrer tranquillement. Prenez eau, chaussures adaptées et un panier rigide si vous êtes autorisé à récolter. Prévenez un proche de votre secteur et gardez votre point de départ en mémoire.',
      'Préservez la litière, ne ratissez pas les feuilles et laissez les champignons que vous ne récoltez pas intacts. Au retour, gardez le temps nécessaire pour faire contrôler ce qui doit l’être. Une matinée sans récolte peut rester une très belle sortie dans les Maures.',
     ],sourceIds:['onf']},
    ],
    questions:[
     {question:'Où chercher des cèpes dans le Golfe de Saint-Tropez ?',answer:'Les chênaies des Maures, notamment les paysages de chênes-lièges autour de La Garde-Freinet, Grimaud et du Plan-de-la-Tour, donnent des pistes de promenade. Vérifiez les autorisations ; aucun secteur ne garantit une récolte.'},
     {question:'Les champignons arrivent-ils toujours dans le même ordre ?',answer:'Non. Oronges, coulemelles et cèpes peuvent ouvrir les sorties de saison, mais les poussées dépendent des conditions. Les sanguins sont liés aux pins ; girolles et trompettes ne constituent pas une dernière étape obligatoire.'},
     {question:'Peut-on reconnaître une espèce avec le visuel du guide ?',answer:'Non. C’est une illustration d’ambiance générée par IA. Ne l’utilisez jamais pour décider de consommer un champignon ; au moindre doute, demandez un contrôle par un spécialiste.'},
    ],
    links:[{label:'Le Plan-de-la-Tour',path:'/place/plan-de-la-tour-village'},{label:'Préparer la randonnée de San Peïre',path:'/guides/randonnee-san-peire-plan-de-la-tour'},{label:'Une balade à Grimaud',path:'/guides/randonnee-pont-des-fees-grimaud'},{label:'Un week-end d’automne',path:'/guides/week-end-automne-golfe-saint-tropez'}],
   },
   en:{
    title:'MUSHROOMS IN THE GOLFE.',accent:'AUTUMN BENEATH THE OAKS.',
    seoTitle:'Mushrooms in the Golfe de Saint-Tropez: seasons and woodland',
    description:'Caesar’s mushrooms, parasols, porcini, milkcaps, chanterelles and black trumpets: seasonal and woodland pointers for an autumn outing around Saint-Tropez.',
    intro:'After rain, discover the Golfe at leaf level. Look out for Caesar’s mushrooms, parasols and porcini, then milkcaps; chanterelles and black trumpets may extend the woodland season. The real appointment is with the weather, trees and ground conditions.',
    verdict:'For porcini, start by exploring oak woodland, including the cork-oak landscapes of the Maures. Choose an open, authorised area and enjoy the walk: a full basket is a possibility, never a promise.',
    facts:[{label:'What matters',value:'Moisture, temperature and ground conditions'},{label:'The landscape',value:'Maures oak woods · pine woods for milkcaps'},{label:'The calendar',value:'Flushes overlap and vary between years'},{label:'Before eating',value:'Certain identification; expert checking whenever in doubt'}],
    sections:[
     {id:'avant-panier',title:'Before filling your basket',paragraphs:[
      'This page helps plan an outing, not determine whether a mushroom is edible. The cover illustration and species names are not identification tools. If in doubt, do not eat a specimen before a mycologist or suitably knowledgeable pharmacist has checked it; an app or photograph alone is not enough.',
      'Collect only species you know thoroughly, keep specimens whole for checking and separate species in your basket. Avoid polluted areas and roadsides. Follow Anses guidance before consuming any wild mushrooms.',
     ],sourceIds:['anses']},
     {id:'saison',title:'Caesar’s mushrooms, parasols, porcini… and later flushes',paragraphs:[
      'Our local thread begins with Caesar’s mushrooms, parasols and porcini while autumn retains some warmth. Their seasons overlap: rain does not bring the same flush everywhere, and a dry spell can interrupt it. Mycological observations record bronze boletes and Caesar’s mushrooms well before mid-autumn.',
      'Milkcaps then draw attention towards pine woods. Chanterelles and black trumpets may accompany wetter outings, but they do not follow a fixed sequence: chanterelles can appear earlier too. These are habitat pointers, without a guaranteed calendar or identification criteria.',
     ],sourceIds:['cepes','oronges','coulemelles','sanguins','ecology'],table:{caption:'Habitat pointers · flushes may overlap; this table cannot identify a harvest',headers:['Look out for','Explore this habitat','Seasonal pointer'],rows:[['Caesar’s mushrooms / oronges','Warm broadleaf woods','Watch when warmth and moisture coincide'],['Parasols / coulemelles','Clearings, woodland edges and wooded meadows','Look at more open spaces without inferring edibility'],['Porcini / cèpes','Oak and other broadleaf woodland','Some species favour periods that are still warm'],['Bloody milkcaps / sanguins','Pine woods','A different habitat to explore during autumn flushes'],['Chanterelles / girolles','Broadleaf or conifer woodland','May appear before milkcaps; no fixed place in the sequence'],['Black trumpets / trompettes de la mort','Moist broadleaf woodland','Watch while moisture lasts; occurrence varies by area']]}},
     {id:'chenes-lieges',title:'Explore cork-oak woodland for porcini',paragraphs:[
      'Oak woods provide a rewarding thread through the Maures. Broadleaf habitats are worth exploring for porcini; bronze boletes are documented beneath oaks. Around the Golfe, cork-oak woods let you discover this landscape without travelling far.',
      'Look at the trees and woodland conditions rather than following a supposedly miraculous pin on a map. A promising wood may produce nothing that day. Soil, moisture and site history matter too: a cork oak guarantees neither porcini nor an edible species.',
     ],sourceIds:['cepes','suberaie','plantour']},
     {id:'forets',title:'Three starting areas for discovering the woodland',paragraphs:[
      'Between La Garde-Freinet and Grimaud, routes via Les Vernades pass cork-oak and chestnut woodland. Around Le Plan-de-la-Tour, San Peïre brings cork oaks into a granite landscape. Official descriptions of the Cogolin-to-Giégi route also mention cork oaks, scrub and pines.',
      'These are areas for observing woodland, not certified collecting spots. Choose a suitable route, read its description and stay in areas open to visitors. A public path does not grant permission to collect in neighbouring plots.',
     ],sourceIds:['suberaie','plantour','cogolin','owner']},
     {id:'autorisation',title:'Open woodland does not automatically mean collecting is allowed',paragraphs:[
      'Check ownership, signs and local rules before taking anything. ONF distinguishes state-owned forests, where limited family collecting is allowed unless local rules say otherwise, from other woods where the owner’s permission is needed. Do not apply that permission to the whole Maures forest.',
      'Respect closures, forestry-work notices and hunting signs. Check forest-access information as well. An outing can wait; choose another open route or a village stroll when an area is inaccessible.',
     ],sourceIds:['onf','owner','fire']},
     {id:'sortie',title:'A manageable walk and woodland left intact',paragraphs:[
      'We prefer one walking area with time to return comfortably. Bring water, suitable shoes and a rigid basket if collecting is permitted. Tell someone where you are going and keep track of your starting point.',
      'Protect the leaf litter, do not rake the ground and leave uncollected mushrooms undamaged. Allow time afterwards for any expert checks needed. A morning without a harvest can still be a wonderful Maures walk.',
     ],sourceIds:['onf']},
    ],
    questions:[
     {question:'Where can I look for porcini around Saint-Tropez?',answer:'Maures oak woodland, including cork-oak landscapes around La Garde-Freinet, Grimaud and Le Plan-de-la-Tour, offers ideas for walks. Check collecting permission; no area guarantees a harvest.'},
     {question:'Do mushrooms always arrive in the same order?',answer:'No. Caesar’s mushrooms, parasols and porcini may feature in early seasonal outings, but flushes depend on conditions. Milkcaps are associated with pines; chanterelles and black trumpets are not an obligatory final stage.'},
     {question:'Can I identify a species from this guide’s illustration?',answer:'No. It is an AI-generated atmosphere illustration. Never use it to decide whether to eat a mushroom; ask an expert to check whenever in doubt.'},
    ],
    links:[{label:'Le Plan-de-la-Tour',path:'/place/plan-de-la-tour-village'},{label:'Prepare the San Peïre hike',path:'/guides/randonnee-san-peire-plan-de-la-tour'},{label:'A walk in Grimaud',path:'/guides/randonnee-pont-des-fees-grimaud'},{label:'An autumn weekend',path:'/guides/week-end-automne-golfe-saint-tropez'}],
   },
  },
 },
];
