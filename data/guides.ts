import { seasonalEscapeGuides } from "./seasonalEscapeGuides";
import { practicalGuides } from "./practicalGuides";
import { hikingGuides } from "./hikingGuides";
import type { Locale } from "../lib/i18n";

export type GuideSource = { id: string; label: string; url: string };
export type GuideSection = { id: string; title: string; paragraphs: string[]; sourceIds?: string[]; table?: { caption: string; headers: string[]; rows: string[][] } };
export type GuideCopy = {
  title: string; accent: string; seoTitle: string; description: string; intro: string; verdict: string;
  facts: { label: string; value: string }[];
  sections: GuideSection[];
  questions: { question: string; answer: string }[];
  links: { label: string; path: string }[];
};
export type Guide = {
  slug: string; category: Record<Locale, string>; image: string;
  imageAlt: Record<Locale, string>; imageCaption: Record<Locale, string>;
  destinations: string[]; placeIds: string[]; related: string[];
  published: string; verified: string; sources: GuideSource[];
  copy: Record<Locale, GuideCopy>;
};

const ramatuellePractical = { id: "transport", label: "Office de tourisme de Ramatuelle · Transports", url: "https://www.ramatuelle-tourisme.com/fr/informations-pratiques/" };
const ramatuelleFaq = { id: "practical", label: "Office de tourisme de Ramatuelle · Questions pratiques", url: "https://www.ramatuelle-tourisme.com/fr/faq/" };
const ramatuelleVillage = { id: "village", label: "Office de tourisme de Ramatuelle · Patrimoine du village", url: "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-village/" };
const boats = { id: "boats", label: "Les Bateaux Verts · Liaisons et horaires", url: "https://www.bateauxverts.com/" };
const maritimeMuseum = { id: "citadelle", label: "Saint-Tropez Tourisme · Citadelle et musée maritime", url: "https://www.sainttropeztourisme.com/fr/fiche/la-citadelle-musee-d-histoire-maritime-4171083/" };
const cinemaMuseum = { id: "cinema", label: "Saint-Tropez Tourisme · Musée de la Gendarmerie et du Cinéma", url: "https://www.sainttropeztourisme.com/fr/fiche/musee-de-la-gendarmerie-et-du-cinema-4082975/" };
const butterflyMuseum = { id: "butterflies", label: "Saint-Tropez Tourisme · Maison des Papillons", url: "https://www.sainttropeztourisme.com/fr/fiche/maison-des-papillons-musee-dany-lartigue-4165778/" };

export const guides: Guide[] = [
  ...seasonalEscapeGuides,
  ...practicalGuides,
  {
    slug: "pampelonne-acces-parking-plage", category: { fr: "Plage / Ramatuelle", en: "Beach / Ramatuelle" },
    image: "pampelonne-cover",
    imageAlt: {"fr": "Illustration de Pampelonne : plage, dunes et accès à pied", "en": "Illustration of Pampelonne: beach, dunes and pedestrian access"},
    imageCaption: {"fr": "Illustration éditoriale · LE GOLFE · Générée par IA", "en": "Editorial illustration · LE GOLFE · AI-generated"},
    destinations: ["ramatuelle"], placeIds: ["pampelonne", "club-55", "byblos-beach", "indie-beach"],
    related: ["ramatuelle-a-pied", "ou-dormir-golfe-saint-tropez"], published: "2026-10-11", verified: "2026-10-11",
    sources: [
      { id: "beach", label: "Visit Var / Office de tourisme de Ramatuelle · Plage et accès", url: "https://www.visitvar.fr/fiche/plage-de-pampelonne-4600954" },
      ramatuellePractical, ramatuelleFaq,
    ],
    copy: {
      fr: {
        title: "PAMPELONNE.", accent: "MODE D’EMPLOI.", seoTitle: "Plage de Pampelonne : accès, parking et conseils pratiques",
        description: "Préparez votre journée à Pampelonne, à Ramatuelle : accès, stationnement, plage libre, établissements et points à vérifier avant de partir.",
        intro: "Une serviette, un déjeuner ou une journée sur un transat ? À Pampelonne, le bon programme commence par le bon accès. Voici comment préparer la plage sans confondre baignade, réservation et stationnement.",
        verdict: "Choisissez votre secteur et votre programme avant de prendre la route. Le nom « Pampelonne » ne suffit pas à vous donner un point d’arrivée.",
        facts: [{ label: "Commune", value: "Ramatuelle" }, { label: "Format", value: "Plage de sable · environ 4,5 km" }, { label: "À préparer", value: "Accès, stationnement et éventuelle réservation" }],
        sections: [
          { id: "situer", title: "Pampelonne est à Ramatuelle", paragraphs: ["La baie appartient à Ramatuelle, même si son nom accompagne souvent celui de Saint-Tropez. Cette longue plage de sable permet plusieurs programmes : poser sa serviette, marcher au bord de l’eau ou réserver dans un établissement. Décidez d’abord de ce que vous venez faire.", "Pour une première journée, gardez une ambition simple : une plage et un déjeuner suffisent. Ajouter le village, une autre crique et une soirée transforme vite la sortie en succession de transferts."], sourceIds: ["beach"] },
          { id: "acces", title: "Le bon accès, dès le départ", paragraphs: ["Les accès recensés comprennent Bonne Terrasse, Garonne, le boulevard Patch, les Tamaris, les Moulins et Tahiti. Si vous avez une réservation, demandez à l’établissement l’entrée et le parking à utiliser. Pour la plage libre, repérez votre accès sur une carte avant le départ.", "Le stationnement et l’accès au sable sont deux sujets distincts. L’accès à la plage est libre ; les conditions des parkings dépendent du site et de la période. Consultez la signalisation sur place plutôt qu’un ancien tarif trouvé en ligne."], sourceIds: ["beach", "practical"] },
          { id: "programme", title: "Serviette ou établissement ?", paragraphs: ["Une journée sur la plage libre se prépare avec vos propres affaires : eau, protection solaire et de quoi faire une pause à l’ombre. Pensez aussi au retour depuis le sable avec les sacs, surtout avec des enfants.", "Pour un déjeuner ou des transats, vérifiez séparément les prestations réservées, leurs prix, les horaires et les conditions d’annulation. Une réservation de table ne garantit pas un transat. Les fiches LE GOLFE vous aident à comparer les adresses ; l’établissement confirme ce qui est réellement disponible à vos dates."] },
          { id: "sans-voiture", title: "La navette se prépare aussi", paragraphs: ["Ramatuelle annonce une navette estivale reliant le village aux plages. Vérifiez le circuit de la saison, l’arrêt correspondant à votre secteur et le dernier retour. Une liaison d’été ne doit pas devenir une promesse de transport toute l’année.", "Évitez de bâtir la journée sur une marche improvisée entre le village et la plage. Si votre hébergement est éloigné d’un arrêt, prévoyez le trajet jusqu’à celui-ci avant de réserver le déjeuner."], sourceIds: ["transport"] },
          { id: "conditions", title: "Le jour même : regardez la mer", paragraphs: ["La surveillance est saisonnière. Sur place, repérez les indications du poste de secours et les drapeaux avant de vous baigner. Une grande plage n’offre pas les mêmes conditions partout ni tous les jours.", "Pour une journée plus légère, arrivez avec un seul point de rendez-vous, un retour prévu et une réservation confirmée si vous en avez besoin. C’est souvent ce détail d’organisation qui fait la différence."], sourceIds: ["practical"] },
        ],
        questions: [
          { question: "Faut-il réserver pour accéder à Pampelonne ?", answer: "L’accès à la plage est libre. Les prestations d’un établissement, comme une table ou un transat, se réservent auprès de celui-ci." },
          { question: "Quel parking choisir ?", answer: "Celui qui correspond à votre secteur ou à votre réservation. Demandez l’accès exact à l’établissement ; pour la plage libre, repérez les accès et consultez les conditions affichées." },
        ],
        links: [{ label: "La fiche de Pampelonne", path: "/place/pampelonne" }, { label: "Plages et beach clubs à Ramatuelle", path: "/destinations/ramatuelle/beaches" }, { label: "Préparer un séjour à Ramatuelle", path: "/destinations/ramatuelle" }],
      },
      en: {
        title: "PAMPELONNE.", accent: "MAKE A PLAN.", seoTitle: "Pampelonne beach: access, parking and practical advice",
        description: "Plan a beach day at Pampelonne in Ramatuelle: access points, parking, public beach, beach establishments and practical checks before setting off.",
        intro: "A towel on the sand, lunch or a reserved sunbed? At Pampelonne, a good day starts with the right access point. Separate your beach plans, bookings and parking before setting off.",
        verdict: "Choose your part of the beach and your plan first. « Pampelonne » alone is not a precise arrival point.",
        facts: [{ label: "Commune", value: "Ramatuelle" }, { label: "Setting", value: "Sandy beach · approximately 4.5 km" }, { label: "Plan ahead", value: "Access, parking and any booking" }],
        sections: [
          { id: "situer", title: "Pampelonne is in Ramatuelle", paragraphs: ["The bay is in Ramatuelle, although it is often associated with Saint-Tropez. Its long stretch of sand accommodates a simple swim, a shoreline walk or time at a beach establishment. Decide what you want from the day first.", "For a first visit, keep the plan manageable: a beach and lunch are enough. Adding the village, another cove and an evening out can turn the day into a series of transfers."], sourceIds: ["beach"] },
          { id: "acces", title: "Find your access point", paragraphs: ["Listed access points include Bonne Terrasse, Garonne, Boulevard Patch, Tamaris, Moulins and Tahiti. For a booking, ask the establishment which entrance and car park to use. For a public beach visit, locate your access on a map beforehand.", "Parking and beach access are separate matters. Beach access is free; car park conditions depend on the location and period. Check the signs on arrival rather than relying on an old price online."], sourceIds: ["beach", "practical"] },
          { id: "programme", title: "A towel or a reserved sunbed?", paragraphs: ["For the public beach, bring your own water, sun protection and shade. Think about carrying bags back from the sand, especially with children.", "For a restaurant or sunbeds, confirm each service, its price, opening times and cancellation terms. A table booking does not guarantee a sunbed. Use LE GOLFE to compare places, then ask the establishment what is available on your dates."] },
          { id: "sans-voiture", title: "Check the seasonal shuttle", paragraphs: ["Ramatuelle advertises a summer shuttle between the village and the beaches. Check the current route, the stop for your part of the beach and the last return. A summer service is not a year-round transport guarantee.", "Avoid relying on an improvised walk between the village and the beach. If your accommodation is far from a stop, arrange that part of the journey before booking lunch."], sourceIds: ["transport"] },
          { id: "conditions", title: "On the day, look at the sea", paragraphs: ["Lifeguard coverage is seasonal. Find the rescue post information and check the flags before swimming. Conditions vary along the shore and from one day to another.", "Keep the day simple: one meeting point, a planned return and any necessary booking confirmed. These practical decisions make the visit easier."], sourceIds: ["practical"] },
        ],
        questions: [{ question: "Do I need a booking to visit Pampelonne?", answer: "Beach access is free. Book services such as a restaurant table or sunbed directly with the establishment." }, { question: "Which car park should I use?", answer: "Choose one serving your part of the beach or your booking. Ask the establishment for its exact access; for the public beach, check the access points and posted conditions." }],
        links: [{ label: "The Pampelonne place guide", path: "/place/pampelonne" }, { label: "Beaches and beach clubs in Ramatuelle", path: "/destinations/ramatuelle/beaches" }, { label: "Plan a stay in Ramatuelle", path: "/destinations/ramatuelle" }],
      },
    },
  },
  {
    slug: "ramatuelle-a-pied", category: { fr: "Village / À pied", en: "Village / On foot" }, image: "ramatuelle-cover",
    imageAlt: {"fr": "Illustration de Ramatuelle : ruelle provençale et promeneurs", "en": "Illustration of Ramatuelle: Provençal lane and walkers"},
    imageCaption: {"fr": "Illustration éditoriale · LE GOLFE · Générée par IA", "en": "Editorial illustration · LE GOLFE · AI-generated"},
    destinations: ["ramatuelle"], placeIds: ["ramatuelle-village"], related: ["pampelonne-acces-parking-plage", "ou-dormir-golfe-saint-tropez"],
    published: "2026-10-11", verified: "2026-10-11", sources: [ramatuelleVillage, ramatuelleFaq, ramatuellePractical],
    copy: {
      fr: {
        title: "RAMATUELLE.", accent: "À PIED.", seoTitle: "Visiter Ramatuelle à pied : village, patrimoine et pauses",
        description: "Un parcours souple pour visiter le village de Ramatuelle à pied : place de l’Ormeau, ruelles, porte Sarrasine, patrimoine et conseils pratiques.",
        intro: "Ramatuelle mérite une visite à part entière. Posez la voiture, commencez sur la place de l’Ormeau et gardez du temps pour les ruelles. Le village se découvre à hauteur de porte, de passage et de façade.",
        verdict: "Prévoyez une demi-journée avec une pause. C’est notre proposition de rythme, à adapter à votre envie de marcher et aux lieux ouverts.",
        facts: [{ label: "Point de départ", value: "Place de l’Ormeau" }, { label: "Rythme proposé", value: "Demi-journée, pauses comprises" }, { label: "Terrain", value: "Ruelles, pentes et escaliers" }],
        sections: [
          { id: "depart", title: "Commencez place de l’Ormeau", paragraphs: ["La place donne un point de départ facile à retrouver. L’office de tourisme s’y trouve : demandez le circuit du village si vous souhaitez suivre un parcours documenté. Profitez de ce premier arrêt pour décider si votre visite sera courte ou prolongée par un déjeuner.", "Les jeudis et dimanches matin sont les jours de marché annoncés par l’office. Pour flâner entre les étals, choisissez ce créneau ; pour une visite centrée sur le patrimoine, vous pouvez organiser votre promenade autrement."], sourceIds: ["transport", "practical"] },
          { id: "ruelles", title: "Laissez de la place aux détours", paragraphs: ["Le vieux noyau s’organise en ruelles, passages et escaliers. Notre proposition : quitter la place, parcourir quelques rues, puis revenir à votre point de départ plutôt que chercher à tout voir d’un seul trait. Le plaisir est dans les détails autant que dans les monuments.", "Les boutiques et galeries peuvent compléter cette boucle lorsqu’elles sont ouvertes. Gardez toutefois votre visite indépendante de leurs horaires : observer une façade, une porte ou une perspective ne demande pas une réservation."], sourceIds: ["village"] },
          { id: "patrimoine", title: "Trois repères pour lire le village", paragraphs: ["La porte Sarrasine rappelle l’enceinte du village. L’église Notre-Dame est adossée à l’ancien rempart. Place Gabriel-Péri, l’escalier dit Eiffel apporte un détail métallique dans ce paysage de pierre. Repérez-les sur le circuit de l’office plutôt que de naviguer uniquement d’une terrasse à l’autre.", "Ces repères donnent un fil à la promenade. L’entrée dans un lieu de culte reste liée à son ouverture et à son usage : regardez les indications sur place et respectez les offices."], sourceIds: ["village"] },
          { id: "pratique", title: "Une promenade avec du relief", paragraphs: ["Le village comporte des pentes et des escaliers. Avec une poussette ou une mobilité réduite, demandez un parcours adapté à l’office avant de vous engager dans les passages étroits. La boucle que nous proposons n’est pas un itinéraire certifié accessible.", "Pour stationner, l’office indique des parkings gratuits au village, avec certaines zones bleues exigeant un disque. Regardez les panneaux à votre emplacement : gratuit ne signifie pas sans limite de durée."], sourceIds: ["village", "practical"] },
          { id: "suite", title: "La plage est une autre étape", paragraphs: ["Terminez par une pause au village ou gardez l’après-midi pour Pampelonne. Dans ce second cas, préparez un nouveau trajet et un accès précis à la plage. Le village et le sable se visitent ensemble, mais ne forment pas une seule promenade.", "En été, consultez les conditions de la navette annoncée par Ramatuelle. Pour une visite plus posée, vous pouvez aussi réserver la plage à un autre jour et rester ici sans regarder la montre."], sourceIds: ["transport"] },
        ],
        questions: [{ question: "Combien de temps prévoir pour Ramatuelle ?", answer: "Nous proposons une demi-journée avec une pause, sans durée de visite garantie. Réduisez la boucle pour une découverte courte ou prolongez-la selon les ouvertures et votre rythme." }, { question: "Peut-on rejoindre Pampelonne à pied depuis cette visite ?", answer: "Ce guide couvre le vieux village. Pour Pampelonne, préparez un trajet séparé et vérifiez les transports disponibles à vos dates." }],
        links: [{ label: "La fiche du village", path: "/place/ramatuelle-village" }, { label: "Les adresses de Ramatuelle", path: "/destinations/ramatuelle" }, { label: "Pampelonne : préparer l’accès", path: "/guides/pampelonne-acces-parking-plage" }],
      },
      en: {
        title: "RAMATUELLE.", accent: "ON FOOT.", seoTitle: "Visit Ramatuelle on foot: village, heritage and practical tips",
        description: "A flexible walk through Ramatuelle village: Place de l’Ormeau, lanes, the Saracen gate, local heritage and practical advice for your visit.",
        intro: "Give Ramatuelle a visit of its own. Leave the car, start at Place de l’Ormeau and make time for the lanes. Explore the village through its doors, passages and façades.",
        verdict: "Allow half a day with a break. This is our suggested pace, to adapt to your walking preferences and what is open.",
        facts: [{ label: "Starting point", value: "Place de l’Ormeau" }, { label: "Suggested pace", value: "Half a day, including breaks" }, { label: "Terrain", value: "Lanes, slopes and steps" }],
        sections: [
          { id: "depart", title: "Start at Place de l’Ormeau", paragraphs: ["The square is an easy meeting point. The tourist office is here: ask for its village route if you want a documented circuit. Decide whether you are making a short visit or staying for lunch.", "The office lists Thursday and Sunday mornings as market days. Choose those mornings for the stalls, or plan another time if your focus is the village’s architecture."], sourceIds: ["transport", "practical"] },
          { id: "ruelles", title: "Leave room for a detour", paragraphs: ["The old centre is made up of lanes, passages and steps. Our suggestion is to leave the square, explore a few streets and return to your starting point instead of trying to cover everything at once. Details matter as much as monuments.", "Shops and galleries can add to the walk when open. Keep the visit independent of their opening hours: a doorway, façade or view does not need a booking."], sourceIds: ["village"] },
          { id: "patrimoine", title: "Three landmarks to look for", paragraphs: ["The Saracen gate recalls the village walls. Notre-Dame church stands against the former rampart. At Place Gabriel-Péri, the staircase known as Eiffel adds a metal detail to the stone setting. Locate them on the tourist office route rather than moving only between cafés.", "These landmarks give the walk a thread. Entering the church depends on its opening and religious use: check the signs and respect services."], sourceIds: ["village"] },
          { id: "pratique", title: "Expect slopes and steps", paragraphs: ["For a pushchair or reduced mobility, ask the tourist office about a suitable route before taking narrow passages. Our suggested loop is not a certified accessible itinerary.", "The office describes village parking as free, with some blue zones requiring a parking disc. Read the signs where you leave the car: free parking can still have a time limit."], sourceIds: ["village", "practical"] },
          { id: "suite", title: "The beach is a separate stop", paragraphs: ["Finish with a village break or leave the afternoon for Pampelonne. For the latter, arrange a separate journey and a precise beach access point. The village and sand can share a day, but they are not one continuous stroll.", "In summer, check Ramatuelle’s advertised shuttle conditions. For a slower visit, save the beach for another day and stay in the village without watching the clock."], sourceIds: ["transport"] },
        ],
        questions: [{ question: "How long should I allow for Ramatuelle?", answer: "We suggest half a day with a break, rather than a guaranteed visit time. Shorten the walk for a brief introduction or extend it according to openings and your pace." }, { question: "Does this walk lead to Pampelonne?", answer: "This guide covers the old village. For Pampelonne, plan a separate journey and check transport on your dates." }],
        links: [{ label: "The village place guide", path: "/place/ramatuelle-village" }, { label: "Places in Ramatuelle", path: "/destinations/ramatuelle" }, { label: "Plan your Pampelonne access", path: "/guides/pampelonne-acces-parking-plage" }],
      },
    },
  },
  {
    slug: "saint-tropez-sans-voiture", category: { fr: "Mobilité / Une journée", en: "Transport / A day out" }, image: "saint-tropez-car-free-cover",
    imageAlt: {"fr": "Illustration de Saint-Tropez sans voiture : bateau de passagers et marche sur le port", "en": "Illustration of car-free Saint-Tropez: passenger boat and harbour walk"},
    imageCaption: {"fr": "Illustration éditoriale · LE GOLFE · Générée par IA", "en": "Editorial illustration · LE GOLFE · AI-generated"},
    destinations: ["saint-tropez", "sainte-maxime", "grimaud"], placeIds: ["saint-tropez-village", "place-des-lices", "citadelle-saint-tropez", "bateaux-verts-excursion"],
    related: ["golfe-saint-tropez-quand-il-pleut", "ou-dormir-golfe-saint-tropez"], published: "2026-10-11", verified: "2026-10-11",
    sources: [boats, { id: "mobility", label: "Saint-Tropez Tourisme · Mobilité sans voiture", url: "https://www.sainttropeztourisme.com/fr/une-destination-eco-responsable/mobilite-durable-saint-tropez/se-deplacer-saint-tropez-sans-voiture/" }, maritimeMuseum, cinemaMuseum],
    copy: {
      fr: {
        title: "SAINT-TROPEZ.", accent: "SANS VOITURE.", seoTitle: "Saint-Tropez sans voiture : arrivée en bateau et journée à pied",
        description: "Préparez une journée à Saint-Tropez sans voiture : bateau depuis Sainte-Maxime, promenade au village, choix d’un musée et organisation du retour.",
        intro: "Arriver par le port, visiter à pied, repartir avec un horaire prévu. Une journée à Saint-Tropez sans voiture peut rester simple si vous choisissez un programme concentré sur le village.",
        verdict: "Fixez votre retour avant votre déjeuner. Ensuite, gardez deux ou trois étapes proches plutôt qu’un programme qui traverse toute la presqu’île.",
        facts: [{ label: "Arrivée possible", value: "Bateau depuis Sainte-Maxime" }, { label: "Programme", value: "Port, village et une visite" }, { label: "À vérifier", value: "Départ, dernier retour et conditions de navigation" }],
        sections: [
          { id: "arrivee", title: "La traversée fait partie de la journée", paragraphs: ["Les Bateaux Verts proposent la liaison Sainte-Maxime–Saint-Tropez toute l’année. D’autres ports sont desservis selon les lignes et périodes. Consultez le trajet correspondant à votre date, son embarcadère, les tarifs et les conditions de navigation.", "Le bateau vous évite de conduire jusqu’au village, mais ne règle pas automatiquement votre arrivée au port de départ. Depuis une maison éloignée, préparez aussi ce premier trajet : marche, bus, taxi ou stationnement à Sainte-Maxime."], sourceIds: ["boats"] },
          { id: "matin", title: "Le matin : port et vieux village", paragraphs: ["À l’arrivée, gardez le port comme point de repère et partez découvrir le centre à pied. Notre proposition : une promenade dans les rues du village, un passage par la place des Lices, puis une pause. Vous pourrez ajuster la boucle à l’affluence et à votre envie de marcher.", "Évitez de réserver chaque minute. L’intérêt d’une journée sans voiture tient aussi à cette liberté : s’arrêter, regarder une vitrine, prendre un café et repartir sans chercher une nouvelle place."], sourceIds: ["mobility"] },
          { id: "visite", title: "Choisissez une visite, selon votre énergie", paragraphs: ["La Citadelle abrite le musée d’histoire maritime et demande une montée depuis le centre. Pour le cinéma et l’histoire de la gendarmerie, le musée de la Gendarmerie et du Cinéma offre une autre piste. Consultez leurs informations d’ouverture avant de choisir.", "Avec des enfants ou une personne qui fatigue vite, prévoyez la visite avant un long déjeuner et gardez une marge pour le retour au port. Un musée bien choisi vaut mieux que plusieurs entrées précipitées."], sourceIds: ["citadelle", "cinema"] },
          { id: "retour", title: "Le retour est votre seul rendez-vous fixe", paragraphs: ["Vérifiez l’horaire de retour auprès de la compagnie et arrivez à l’embarquement avec la marge qu’elle demande. Les fréquences changent selon la période ; ne reprenez pas un horaire vu lors d’un précédent séjour.", "Si le service est modifié, votre solution de retour par la route doit être réaliste. Notez les coordonnées d’un transporteur et l’adresse de votre hébergement avant de partir, surtout si vous prévoyez une soirée."], sourceIds: ["boats"] },
          { id: "limites", title: "Pampelonne demande un autre trajet", paragraphs: ["Ce programme couvre Saint-Tropez village. Une réservation à Pampelonne ajoute un déplacement distinct vers Ramatuelle. Préparez la liaison aller et retour avant de combiner les deux ; les navettes maritimes du Golfe ne vous déposent pas automatiquement devant votre restaurant de plage.", "Pour une première visite, nous conseillons de réserver la plage à une autre journée. Vous gardez ainsi du temps pour le village et une organisation de transport plus lisible."] },
        ],
        questions: [{ question: "Peut-on visiter Saint-Tropez sans voiture ?", answer: "Oui, vous pouvez organiser une journée à pied dans le village avec une arrivée en bateau ou en transport routier. Préparez les trajets depuis votre hébergement et le retour." }, { question: "La liaison depuis Sainte-Maxime fonctionne-t-elle hors saison ?", answer: "La compagnie annonce une liaison toute l’année. Consultez néanmoins ses horaires et informations de service pour le jour précis de votre déplacement." }],
        links: [{ label: "Découvrir Saint-Tropez", path: "/destinations/saint-tropez" }, { label: "La Citadelle", path: "/place/citadelle-saint-tropez" }, { label: "La place des Lices", path: "/place/place-des-lices" }, { label: "Sainte-Maxime comme point de départ", path: "/destinations/sainte-maxime" }],
      },
      en: {
        title: "SAINT-TROPEZ.", accent: "WITHOUT A CAR.", seoTitle: "Saint-Tropez without a car: boat arrival and a day on foot",
        description: "Plan a car-free day in Saint-Tropez: arrive by boat from Sainte-Maxime, walk around the village, choose a museum and arrange your return.",
        intro: "Arrive through the harbour, explore on foot and leave with a return plan. A car-free day in Saint-Tropez works best when you focus on the village.",
        verdict: "Choose your return before lunch. Then keep two or three nearby stops instead of a plan spanning the whole peninsula.",
        facts: [{ label: "Arrival option", value: "Boat from Sainte-Maxime" }, { label: "Programme", value: "Harbour, village and one visit" }, { label: "Check first", value: "Departure, last return and sailing conditions" }],
        sections: [
          { id: "arrivee", title: "Make the crossing part of the day", paragraphs: ["Les Bateaux Verts advertises the Sainte-Maxime–Saint-Tropez connection year-round. Other ports are served according to route and season. Check your date, departure quay, fares and sailing conditions.", "The boat avoids driving into the village, but you still need to reach the departure port. From a house farther away, plan that first leg too: walking, bus, taxi or parking in Sainte-Maxime."], sourceIds: ["boats"] },
          { id: "matin", title: "Start with the harbour and old village", paragraphs: ["Use the harbour as your reference point and explore the centre on foot. Our suggestion: village streets, Place des Lices, then a break. Adapt the walk to the crowds and how much walking you want.", "Leave some time unbooked. A car-free day gives you room to stop at a shop, sit for coffee and continue without looking for another parking space."], sourceIds: ["mobility"] },
          { id: "visite", title: "Choose one visit", paragraphs: ["The Citadelle houses the maritime history museum and involves an uphill approach from the centre. The Musée de la Gendarmerie et du Cinéma offers a different focus on film and gendarmerie history. Check opening information before choosing.", "With children or someone who tires easily, visit before a long lunch and leave time to return to the harbour. One considered museum visit is more enjoyable than several rushed stops."], sourceIds: ["citadelle", "cinema"] },
          { id: "retour", title: "Keep your return as the fixed appointment", paragraphs: ["Confirm your return with the operator and allow the boarding margin it requests. Frequencies vary by period; do not reuse a timetable from an earlier holiday.", "If service changes, your road alternative needs to be realistic. Keep a transport provider’s details and your accommodation address handy, especially if staying into the evening."], sourceIds: ["boats"] },
          { id: "limites", title: "Pampelonne needs another journey", paragraphs: ["This plan covers Saint-Tropez village. A Pampelonne booking adds a separate journey to Ramatuelle. Arrange both directions before combining them: Golfe shuttle boats do not automatically drop you at your beach restaurant.", "For a first visit, we suggest saving the beach for another day. That leaves more time for the village and a simpler transport plan."] },
        ],
        questions: [{ question: "Can I visit Saint-Tropez without a car?", answer: "Yes. Plan a walk around the village with a boat or road transport arrival. Arrange the journey from your accommodation and the return." }, { question: "Does the Sainte-Maxime boat run outside summer?", answer: "The operator advertises a year-round connection. Still check its timetable and service information for your exact travel date." }],
        links: [{ label: "Explore Saint-Tropez", path: "/destinations/saint-tropez" }, { label: "The Citadelle", path: "/place/citadelle-saint-tropez" }, { label: "Place des Lices", path: "/place/place-des-lices" }, { label: "Start from Sainte-Maxime", path: "/destinations/sainte-maxime" }],
      },
    },
  },
  {
    slug: "golfe-saint-tropez-quand-il-pleut", category: { fr: "Culture / Plan de repli", en: "Culture / A change of plan" }, image: "rainy-day-cover",
    imageAlt: {"fr": "Illustration du port de Saint-Tropez sous la pluie", "en": "Illustration of Saint-Tropez harbour in the rain"},
    imageCaption: {"fr": "Illustration éditoriale · LE GOLFE · Générée par IA", "en": "Editorial illustration · LE GOLFE · AI-generated"},
    destinations: ["saint-tropez", "ramatuelle", "sainte-maxime", "cogolin"], placeIds: ["maison-des-papillons", "citadelle-saint-tropez", "musee-annonciade-saint-tropez", "chapelles-saint-roch-cogolin"],
    related: ["saint-tropez-sans-voiture", "ramatuelle-a-pied"], published: "2026-10-11", verified: "2026-10-11",
    sources: [cinemaMuseum, butterflyMuseum, maritimeMuseum, { id: "rain", label: "Office de tourisme de Ramatuelle · Sorties par temps de pluie", url: "https://www.ramatuelle-tourisme.com/fr/faq/" }],
    copy: {
      fr: {
        title: "IL PLEUT.", accent: "ON FAIT QUOI ?", seoTitle: "Que faire dans le golfe de Saint-Tropez quand il pleut ?",
        description: "Des idées concrètes pour une journée pluvieuse dans le golfe de Saint-Tropez : musées, cinéma, expositions et programme adapté aux ouvertures.",
        intro: "La plage attendra. Un musée, une séance de cinéma, une exposition et un vrai déjeuner peuvent donner une autre forme à la journée. Le bon réflexe : vérifier ce qui ouvre avant de prendre la route.",
        verdict: "Choisissez une activité principale près de votre point de départ. Ajoutez une pause et gardez le reste souple.",
        facts: [{ label: "À privilégier", value: "Une visite intérieure et une pause" }, { label: "Avant de partir", value: "Ouvertures, séances et réservation éventuelle" }, { label: "Avec des enfants", value: "Un programme court, adapté à leurs intérêts" }],
        sections: [
          { id: "cinema", title: "Le cinéma, côté musée", paragraphs: ["À Saint-Tropez, le musée de la Gendarmerie et du Cinéma relie l’histoire du bâtiment, la gendarmerie et les films tournés sur la presqu’île. Choisissez cette visite si vous aimez les décors, les archives et les coulisses du cinéma.", "Pour une sortie en famille, présentez le sujet aux enfants avant le départ et gardez la visite à leur rythme. Consultez la fiche officielle pour les horaires et les conditions d’accueil ; une journée de pluie peut aussi attirer d’autres visiteurs."], sourceIds: ["cinema"] },
          { id: "papillons", title: "Une collection qui change de sujet", paragraphs: ["La Maison des Papillons présente les collections et l’univers de Dany Lartigue. C’est une piste pour ceux qui préfèrent une visite centrée sur un sujet singulier plutôt qu’une grande sortie.", "Son calendrier comporte des jours de fermeture et une fermeture saisonnière. Regardez l’ouverture de votre date précise avant de traverser le Golfe. Le fait qu’un musée figure dans une sélection ne garantit pas qu’il soit ouvert aujourd’hui."], sourceIds: ["butterflies"] },
          { id: "maritime", title: "La Citadelle, si les conditions s’y prêtent", paragraphs: ["Le musée d’histoire maritime est installé dans la Citadelle. Le sujet donne une autre lecture de Saint-Tropez, tournée vers les marins et les voyages. La visite du musée se prépare avec son approche extérieure et la montée jusqu’au site.", "Nous la garderions pour une météo qui permet ces déplacements confortablement. Pour un programme entièrement à l’abri, choisissez plutôt une activité accessible directement depuis votre point d’arrivée."], sourceIds: ["citadelle"] },
          { id: "proximite", title: "Le bon plan peut être tout près", paragraphs: ["L’office de Ramatuelle cite aussi les expositions au village et les cinémas de Saint-Tropez, Sainte-Maxime ou Cogolin parmi les pistes par temps de pluie. Consultez les programmes en cours, puis choisissez selon votre lieu de séjour.", "Une séance près de la maison peut être plus agréable qu’un long trajet pour une visite courte. Notre proposition : réserver l’activité principale, déjeuner dans le même secteur et décider du reste après la pause."], sourceIds: ["rain"] },
          { id: "programme", title: "Deux programmes, à adapter", paragraphs: ["Si vous êtes déjà à Saint-Tropez : un musée dont l’ouverture est confirmée, un déjeuner au centre et une promenade courte si la météo le permet. Pas besoin d’enchaîner toutes les collections.", "Si vous logez ailleurs dans le Golfe : une séance de cinéma ou une exposition proche, puis du temps au calme. Vérifiez la programmation de la semaine dans l’agenda et auprès du lieu concerné. Une bonne journée se mesure aussi au temps que vous n’avez pas passé à vous déplacer."] },
        ],
        questions: [{ question: "Quel musée choisir avec des enfants ?", answer: "Le musée de la Gendarmerie et du Cinéma est une piste si le cinéma et les décors les intéressent. La Maison des Papillons propose un autre sujet. Vérifiez l’ouverture et adaptez la durée à leur âge." }, { question: "Les musées sont-ils ouverts toute l’année ?", answer: "Les calendriers diffèrent selon les établissements. La Maison des Papillons annonce notamment une fermeture saisonnière : consultez chaque fiche officielle pour votre date." }],
        links: [{ label: "La Maison des Papillons", path: "/place/maison-des-papillons" }, { label: "La Citadelle et son musée", path: "/place/citadelle-saint-tropez" }, { label: "Les événements à vos dates", path: "/whats-on" }, { label: "Les visites du catalogue", path: "/explore/do" }],
      },
      en: {
        title: "RAIN TODAY.", accent: "WHAT’S THE PLAN?", seoTitle: "What to do in the Golfe de Saint-Tropez when it rains",
        description: "Practical ideas for a rainy day in the Golfe de Saint-Tropez: museums, cinema, exhibitions and plans shaped around current openings.",
        intro: "The beach can wait. A museum, a film, an exhibition and a proper lunch can give the day a different shape. Start by checking what is open before travelling.",
        verdict: "Choose one main activity near your starting point. Add a break and keep the rest flexible.",
        facts: [{ label: "Good starting point", value: "An indoor visit and a break" }, { label: "Check first", value: "Openings, screenings and any booking" }, { label: "With children", value: "A short plan matching their interests" }],
        sections: [
          { id: "cinema", title: "Explore film through a museum", paragraphs: ["In Saint-Tropez, the Musée de la Gendarmerie et du Cinéma connects the building’s history, the gendarmerie and films made on the peninsula. Choose it for film sets, archives and a look behind the scenes.", "For a family visit, introduce the subject before leaving and let children set the pace. Check the official listing for opening and visitor information; other visitors may have the same rainy-day idea."], sourceIds: ["cinema"] },
          { id: "papillons", title: "A collection with a different focus", paragraphs: ["Maison des Papillons presents Dany Lartigue’s collections and creative world. It offers a focused subject for visitors who prefer a smaller-scale outing.", "Its calendar includes closed days and a seasonal closure. Check your exact date before crossing the Golfe. Being listed in a guide does not mean a museum is open today."], sourceIds: ["butterflies"] },
          { id: "maritime", title: "The Citadelle, when conditions suit", paragraphs: ["The maritime history museum is inside the Citadelle. It shows a side of Saint-Tropez shaped by sailors and voyages. Plan for the outdoor approach and the uphill journey as well as the museum itself.", "We would keep this option for weather that makes those parts comfortable. For a fully sheltered plan, choose an activity reached more directly from your arrival point."], sourceIds: ["citadelle"] },
          { id: "proximite", title: "Your best option may be nearby", paragraphs: ["Ramatuelle’s tourist office also suggests village exhibitions and cinemas in Saint-Tropez, Sainte-Maxime or Cogolin for rainy weather. Check current programmes, then choose according to where you are staying.", "A film near your accommodation can be more enjoyable than a long journey for a short visit. Our suggestion: book the main activity, have lunch in the same area and decide the rest afterwards."], sourceIds: ["rain"] },
          { id: "programme", title: "Two flexible day plans", paragraphs: ["Already in Saint-Tropez? Pick a museum with confirmed opening, lunch in the centre and a short walk if weather allows. There is no need to see every collection.", "Staying elsewhere? Choose a nearby screening or exhibition, then leave time to relax. Check this week’s events and confirm details with the venue. Less time travelling can make a better day."] },
        ],
        questions: [{ question: "Which museum works for children?", answer: "The Gendarmerie and Cinema museum is an option for children interested in films and sets. Maison des Papillons offers a different subject. Check opening and adapt the visit to their age." }, { question: "Are the museums open year-round?", answer: "Calendars differ. Maison des Papillons lists a seasonal closure: consult each official listing for your date." }],
        links: [{ label: "Maison des Papillons", path: "/place/maison-des-papillons" }, { label: "The Citadelle and its museum", path: "/place/citadelle-saint-tropez" }, { label: "Events on your dates", path: "/whats-on" }, { label: "Visits in the catalogue", path: "/explore/do" }],
      },
    },
  },
  {
    slug: "ou-dormir-golfe-saint-tropez", category: { fr: "Séjour / Choisir sa base", en: "Stay / Choose your base" }, image: "where-to-stay-cover",
    imageAlt: {"fr": "Illustration d’une terrasse provençale face au Golfe pour choisir où séjourner", "en": "Illustration of a Provençal terrace overlooking the Golfe, for choosing a holiday base"},
    imageCaption: {"fr": "Illustration éditoriale · LE GOLFE · Générée par IA", "en": "Editorial illustration · LE GOLFE · AI-generated"},
    destinations: ["saint-tropez", "ramatuelle", "gassin", "grimaud", "sainte-maxime", "la-croix-valmer"], placeIds: [],
    related: ["pampelonne-acces-parking-plage", "saint-tropez-sans-voiture"], published: "2026-10-11", verified: "2026-10-11",
    sources: [
      { id: "destinations", label: "Golfe de Saint-Tropez Destination · Villages et stations", url: "https://www.golfe-saint-tropez-information.com/fr/villages-stations" },
      { id: "grimaud", label: "Golfe de Saint-Tropez Destination · Grimaud", url: "https://www.golfe-saint-tropez-information.com/fr/villages-stations/grimaud" },
      { id: "gassin", label: "Golfe de Saint-Tropez Destination · Gassin", url: "https://www.golfe-saint-tropez-information.com/fr/villages-stations/gassin" },
      { id: "croix", label: "Golfe de Saint-Tropez Destination · La Croix-Valmer", url: "https://www.golfe-saint-tropez-information.com/fr/villages-stations/la-croix-valmer" }, boats,
    ],
    copy: {
      fr: {
        title: "OÙ DORMIR ?", accent: "CHOISISSEZ VOTRE BASE.", seoTitle: "Où dormir dans le golfe de Saint-Tropez selon votre séjour ?",
        description: "Saint-Tropez, Ramatuelle, Sainte-Maxime, Grimaud, Gassin ou La Croix-Valmer : choisissez votre lieu de séjour selon vos journées et vos déplacements.",
        intro: "Le bon hébergement commence par une adresse qui convient à vos journées. Avant de comparer les piscines et les chambres, regardez où vous voulez déjeuner, vous baigner et rentrer le soir.",
        verdict: "Notez vos trois sorties les plus importantes. Choisissez ensuite une base qui simplifie ces trajets, puis comparez les maisons.",
        facts: [{ label: "Premier critère", value: "L’emplacement exact" }, { label: "À anticiper", value: "Les trajets du quotidien" }, { label: "À confirmer", value: "Accès, équipements et conditions du séjour" }],
        sections: [
          { id: "saint-tropez", title: "Saint-Tropez : si le village est votre programme", paragraphs: ["Pour des journées autour du port, des rues du centre et des sorties au village, commencez par regarder les hébergements proches de ces étapes. L’adresse compte davantage que la seule mention « Saint-Tropez » dans une annonce.", "Notre conseil : vérifiez à pied les distances entre le logement, vos lieux de dîner et votre point d’arrivée. Si la marche du soir est importante pour vous, demandez aussi les conditions réelles du trajet, pas uniquement la distance à vol d’oiseau."], sourceIds: ["destinations"] },
          { id: "ramatuelle", title: "Ramatuelle : si Pampelonne revient chaque jour", paragraphs: ["Ramatuelle est une piste si votre séjour s’organise autour du village et de Pampelonne. Mais une maison dans la commune peut se trouver près du vieux village, dans les terres ou vers le littoral. Ces emplacements ne donnent pas le même quotidien.", "Comparez le trajet depuis la maison jusqu’au secteur de plage que vous fréquenterez. Une belle vue et la possibilité de rejoindre le sable à pied sont deux critères différents ; faites préciser chacun avant de réserver."], sourceIds: ["destinations"] },
          { id: "sainte-maxime", title: "Sainte-Maxime : une base avec l’option bateau", paragraphs: ["Pour alterner votre séjour avec des visites à Saint-Tropez, Sainte-Maxime offre la possibilité d’une liaison maritime. Les Bateaux Verts annoncent ce trajet toute l’année, avec des horaires à consulter selon votre date.", "Cette option est surtout utile si vous pouvez rejoindre l’embarcadère facilement. Un logement loin du port demande un trajet supplémentaire. Comparez donc l’adresse de la maison, votre plage habituelle et le départ du bateau ensemble."], sourceIds: ["boats"] },
          { id: "villages", title: "Grimaud et Gassin : regardez le quartier", paragraphs: ["À Grimaud, distinguez le village perché et Port Grimaud : ils font partie de la même commune, mais proposent des décors et des points de départ différents. Choisissez selon votre envie de village, de port ou de plage.", "Gassin associe également village et secteurs plus proches du littoral. Une annonce portant le nom de la commune ne suffit pas à connaître votre environnement. Demandez la localisation exacte, les accès et les services que vous pourrez rejoindre sans voiture."], sourceIds: ["grimaud", "gassin"] },
          { id: "croix", title: "La Croix-Valmer : si le littoral donne le rythme", paragraphs: ["Gigaro et la plage du Débarquement font partie des repères de La Croix-Valmer. Si ce littoral est au cœur de vos envies, regardez les hébergements en fonction de ces accès plutôt que de prévoir une traversée du Golfe à chaque sortie.", "Le centre et les plages sont des secteurs distincts. Pour une famille, comparez le parcours quotidien avec les sacs de plage, les courses et le retour du déjeuner. C’est un meilleur point de départ que le seul nombre de kilomètres affiché."], sourceIds: ["croix"] },
          { id: "reservation", title: "Avant de choisir la maison", paragraphs: ["Faites préciser les équipements qui comptent pour vous : climatisation dans quelles pièces, piscine et sa sécurisation, stationnement, couchages, linge et ménage. Une photo ne répond pas à toutes ces questions.", "Demandez les conditions de réservation, le prix total et les prestations incluses. LE GOLFE vous permet de comparer les annonces du catalogue ; la disponibilité et les engagements du séjour se confirment avec le propriétaire ou la conciergerie. Nos pistes par commune sont des conseils éditoriaux, pas un classement de prix ou une garantie de tranquillité."] },
        ],
        questions: [{ question: "Quelle commune choisir sans voiture ?", answer: "Commencez par un hébergement proche des lieux que vous utiliserez chaque jour. Sainte-Maxime peut permettre des visites en bateau à Saint-Tropez, à condition de rejoindre le port et de vérifier les horaires." }, { question: "Où séjourner pour aller souvent à Pampelonne ?", answer: "Regardez Ramatuelle et comparez l’emplacement exact du logement avec votre accès à la plage. Le nom de la commune ne garantit pas une plage accessible à pied." }],
        links: [{ label: "Comparer les villas du catalogue", path: "/stay" }, { label: "Toutes les communes du Golfe", path: "/destinations" }, { label: "Ramatuelle", path: "/destinations/ramatuelle" }, { label: "Sainte-Maxime", path: "/destinations/sainte-maxime" }, { label: "La Croix-Valmer", path: "/destinations/la-croix-valmer" }],
      },
      en: {
        title: "WHERE TO STAY?", accent: "CHOOSE YOUR BASE.", seoTitle: "Where to stay in the Golfe de Saint-Tropez for your holiday",
        description: "Saint-Tropez, Ramatuelle, Sainte-Maxime, Grimaud, Gassin or La Croix-Valmer: choose your holiday base around your plans and everyday journeys.",
        intro: "A good stay starts with an address that fits your days. Before comparing pools and bedrooms, consider where you want to eat, swim and return in the evening.",
        verdict: "Write down your three most important outings. Choose a base that makes those journeys easier, then compare houses.",
        facts: [{ label: "First criterion", value: "The exact location" }, { label: "Plan ahead", value: "Everyday journeys" }, { label: "Confirm", value: "Access, facilities and booking terms" }],
        sections: [
          { id: "saint-tropez", title: "Saint-Tropez: for days centred on the village", paragraphs: ["For days around the harbour, central streets and evenings in the village, start with accommodation near those stops. The address matters more than a listing simply mentioning Saint-Tropez.", "Our advice: check walking distances to your dinner plans and arrival point. If walking home matters, ask about the actual route as well as its straight-line distance."], sourceIds: ["destinations"] },
          { id: "ramatuelle", title: "Ramatuelle: for repeated Pampelonne days", paragraphs: ["Ramatuelle is an option for days focused on the village and Pampelonne. A house in the commune may be near the old village, inland or closer to the coast. These are different bases for everyday plans.", "Compare the journey to the part of the beach you will use. A sea view and being able to walk to the sand are separate criteria: confirm both before booking."], sourceIds: ["destinations"] },
          { id: "sainte-maxime", title: "Sainte-Maxime: a base with a boat option", paragraphs: ["For visits to Saint-Tropez during your stay, Sainte-Maxime offers a sea connection. Les Bateaux Verts advertises the route year-round, with timetables to check for your date.", "The option is most useful when you can reach the departure quay easily. Accommodation farther from the port adds another journey. Compare the house location, your usual beach and the boat departure together."], sourceIds: ["boats"] },
          { id: "villages", title: "Grimaud and Gassin: check the neighbourhood", paragraphs: ["In Grimaud, distinguish the hilltop village from Port Grimaud. They share a commune but offer different settings and starting points. Choose according to whether you want a village, harbour or beach base.", "Gassin also combines its village with areas nearer the coast. The commune’s name alone does not describe your surroundings. Ask for the exact location, access and services within walking distance."], sourceIds: ["grimaud", "gassin"] },
          { id: "croix", title: "La Croix-Valmer: let the coast shape your days", paragraphs: ["Gigaro and Le Débarquement beach are among La Croix-Valmer’s coastal landmarks. If this shore is central to your plans, compare accommodation around those access points rather than planning to cross the Golfe each day.", "The centre and beaches are separate areas. With a family, consider daily trips with beach bags, shopping and the journey home after lunch, rather than only a displayed distance."], sourceIds: ["croix"] },
          { id: "reservation", title: "Before choosing the house", paragraphs: ["Confirm the facilities that matter: which rooms have air conditioning, the pool and its safety arrangements, parking, beds, linen and cleaning. A photograph cannot answer every question.", "Ask for booking terms, the total price and included services. LE GOLFE helps compare catalogue listings; availability and booking commitments are confirmed with the owner or concierge. Our area suggestions are editorial advice, not a price ranking or a guarantee of peace and quiet."] },
        ],
        questions: [{ question: "Where should I stay without a car?", answer: "Start with accommodation close to your daily activities. Sainte-Maxime can allow boat visits to Saint-Tropez if you can reach the harbour and the timetable fits." }, { question: "Where should I stay for frequent Pampelonne visits?", answer: "Look at Ramatuelle and compare the exact accommodation location with your beach access point. A commune name does not guarantee a walkable beach." }],
        links: [{ label: "Compare catalogue villas", path: "/stay" }, { label: "All Golfe destinations", path: "/destinations" }, { label: "Ramatuelle", path: "/destinations/ramatuelle" }, { label: "Sainte-Maxime", path: "/destinations/sainte-maxime" }, { label: "La Croix-Valmer", path: "/destinations/la-croix-valmer" }],
      },
    },
  },
  ...hikingGuides,
];

export function getGuide(slug: string) { return guides.find(guide => guide.slug === slug); }
export function guidePaths() { return ["/guides", ...guides.map(guide => `/guides/${guide.slug}`)]; }
export function guidesForDestination(slug: string) { return guides.filter(guide => guide.destinations.includes(slug)); }
export function guidesForPlace(id: string) { return guides.filter(guide => guide.placeIds.includes(id)); }

export function relatedGuidesFor(guide: Guide, limit = 4) {
  const ids = [...guide.related, ...guides.filter(other => other.slug !== guide.slug && other.related.includes(guide.slug)).map(other => other.slug)];
  return [...new Set(ids)].flatMap(slug => { const item = getGuide(slug); return item ? [item] : []; }).slice(0, limit);
}
