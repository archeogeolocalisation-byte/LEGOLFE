import { places, type Place } from "./places";
import { villas } from "./villas";
import type { Locale } from "../lib/i18n";
export type Destination = { slug:string;name:string;villageId:string|null;intro:Record<Locale,string>;plan:Record<Locale,string> };
export const destinations:Destination[] = [
{
  "slug": "la-garde-freinet",
  "name": "La Garde-Freinet",
  "villageId": null,
  "intro": {
    "fr": "Le Fort-Freinet, la Croix des Maures et le Conservatoire du Patrimoine donnent trois façons de découvrir La Garde-Freinet : vestiges dans le rocher, panorama et histoire des métiers des Maures.",
    "en": "Fort-Freinet, Croix des Maures and the heritage museum offer three ways to explore La Garde-Freinet: rocky medieval remains, views and traditional Maures skills."
  },
  "plan": {
    "fr": "Commencez au Conservatoire pour comprendre le territoire, puis choisissez la Croix ou le Fort-Freinet selon votre groupe, la météo et les conditions d’accès. Les montées se préparent comme des sorties à pied.",
    "en": "Start at the Conservatoire to understand the area, then choose the cross or Fort-Freinet around your group, the weather and access conditions. Plan the climbs as walking outings."
  }
},
  {
    "slug": "saint-tropez",
    "name": "Saint-Tropez",
    "villageId": "saint-tropez-village",
    "intro": {
      "fr": "Le port, la place des Lices, la Citadelle et les tables du village composent des journées très différentes. Commencez par choisir votre rythme : une promenade et un musée, un déjeuner, ou une soirée qui se prolonge. Les fiches ci-dessous donnent les repères pour construire ce programme.",
      "en": "The port, Place des Lices, the Citadelle and local restaurants offer very different ways to spend a day. Start with your pace: a walk and a museum, lunch, or an evening that continues into the night. The selections below help bring that plan together."
    },
    "plan": {
      "fr": "Associez la Citadelle ou la Maison des Papillons à une pause au village. Pour sortir, comparez le dîner-show de L’Opera et les clubs avant de choisir le type de soirée.",
      "en": "Pair the Citadelle or Maison des Papillons with a break in the village. For a night out, compare the dinner-show at L’Opera with the clubs before choosing your evening."
    }
  },
  {
    "slug": "ramatuelle",
    "name": "Ramatuelle",
    "villageId": "ramatuelle-village",
    "intro": {
      "fr": "Ramatuelle se découvre en reliant le village, Pampelonne et l’Escalet. Une journée plage, une table gastronomique et un séjour au calme n’appellent pas les mêmes adresses. Cette sélection rassemble les lieux et les services du catalogue pour composer un séjour cohérent.",
      "en": "Connect Ramatuelle village with Pampelonne and L’Escalet. A beach day, a gastronomic meal and a quiet stay call for different places. This selection brings together the catalog’s places and services to help build a coherent visit."
    },
    "plan": {
      "fr": "Commencez par Notre-Dame et les ruelles du village, puis choisissez Bonne Terrasse pour une pause au bord de l’eau ou une visite réservée du phare de Camarat. Pour le phare, suivez les consignes de navette depuis le stade ; ne rejoignez pas la tour en voiture.",
      "en": "Start with Notre-Dame church and the village lanes, then choose Bonne Terrasse for the shore or a booked Camarat lighthouse visit. For the lighthouse, follow the stadium shuttle instructions rather than driving to the tower."
    }
  },
  {
    "slug": "gassin",
    "name": "Gassin",
    "villageId": "gassin-village",
    "intro": {
      "fr": "Les tables de Gassin, son village et le Château Minuty offrent plusieurs points de départ pour découvrir cette partie du Golfe. Ici, le choix du lieu où dormir et celui du restaurant peuvent se préparer ensemble, avec les villas déjà présentes dans le catalogue.",
      "en": "Gassin’s restaurants, village and Château Minuty offer different starting points for exploring this part of the Golfe. Plan where to stay and where to eat together, using the villas already in the catalog."
    },
    "plan": {
      "fr": "Reliez la porte des Sarrazins à Notre-Dame-de-l’Assomption et au jardin L’Hardy-Denonain selon son ouverture saisonnière. Complétez la journée par une table du village ou une étape au Château Minuty, en préparant les réservations séparément.",
      "en": "Connect Porte des Sarrazins with Notre-Dame-de-l’Assomption and L’Hardy-Denonain garden when seasonally open. Extend the day with a village restaurant or Château Minuty, arranging reservations separately."
    }
  },
  {
    "slug": "grimaud",
    "name": "Grimaud",
    "villageId": "grimaud-village",
    "intro": {
      "fr": "À Grimaud, reliez le château, l’église Saint-Michel, le moulin Saint-Roch et la chapelle des Pénitents pour découvrir le village à pied. Le vallon du Pont des Fées prolonge la promenade côté nature. Port Grimaud, sur le littoral, reste une autre étape de la commune.",
      "en": "Connect the castle, Saint-Michel church, Saint-Roch mill and the Penitents’ Chapel for a walk through Grimaud village. The Pont des Fées valley extends the discovery into nature. Coastal Port Grimaud is a separate stop within the same commune."
    },
    "plan": {
      "fr": "Composez une balade depuis la chapelle des Pénitents vers Saint-Michel, puis le château si vous souhaitez monter jusqu’au panorama. Ajoutez le moulin Saint-Roch selon le temps disponible et vérifiez les ouvertures intérieures.",
      "en": "Walk from the Penitents’ Chapel towards Saint-Michel, then up to the castle if you want the view. Add Saint-Roch mill if time allows, checking interior opening separately."
    }
  },
  {
    "slug": "sainte-maxime",
    "name": "Sainte-Maxime",
    "villageId": "sainte-maxime-village",
    "intro": {
      "fr": "Un port, une vieille ville et la mer tout près. Sainte-Maxime se choisit pour des vacances qui passent facilement d’une promenade au centre à une pause sur le sable.",
      "en": "A harbour, an old town and the sea close at hand. Choose Sainte-Maxime for holidays that move easily from a stroll in the centre to time on the sand."
    },
    "plan": {
      "fr": "Autour de la Tour Carrée, le centre garde une échelle agréable pour flâner. Le front de mer donne le fil de la visite ; les autres plages de la commune invitent à changer de décor.",
      "en": "Around Tour Carrée, the centre has a comfortable scale for wandering. Follow the waterfront, then explore another of the town’s beaches for a change of scenery."
    }
  },
  {
    "slug": "cavalaire-sur-mer",
    "name": "Cavalaire-sur-Mer",
    "villageId": "cavalaire-village",
    "intro": {
      "fr": "Le port, une grande plage et Bonporteau pour changer de paysage. Cavalaire regarde vers la mer et convient à ceux qui veulent lui donner la première place dans leurs vacances.",
      "en": "A harbour, a long beach and Bonporteau for a different landscape. Cavalaire faces the sea and suits travellers who want it to play the leading role in their holidays."
    },
    "plan": {
      "fr": "Associez la plage du Centre-Ville au port Héracléa pour une journée près des quais. Bonporteau et les sentiers de la Corniche des Maures constituent une autre sortie : choisissez votre accès et, pour la randonnée, le parcours de 3 ou 8 km.",
      "en": "Pair the town-centre beach with Port Héracléa for a day near the quays. Bonporteau and the Corniche des Maures trails make another outing: plan your approach and choose the 3 km or 8 km walking route."
    }
  },
  {
    "slug": "la-mole",
    "name": "La Môle",
    "villageId": "la-mole-village",
    "intro": {
      "fr": "Un village dans la vallée, une église et les paysages boisés des Maures. La Môle propose une autre entrée dans le Golfe : davantage de relief et de nature, avec le littoral à rejoindre en voiture.",
      "en": "A village in the valley, a church and the wooded Maures landscape. La Môle offers another way into the Golfe: more hills and nature, with the coast reached by car."
    },
    "plan": {
      "fr": "Commencez au village autour de l’église Sainte-Magdeleine. Pour rejoindre le barrage de la Verne, consultez les accès et prévoyez environ 5 km aller-retour à pied. La retenue se découvre depuis les chemins ; la baignade y est interdite.",
      "en": "Begin around Sainte-Magdeleine church in the village. To reach La Verne dam, check the approach and allow for around 5 km walking there and back. Enjoy the reservoir from the paths; swimming is prohibited."
    }
  },
  {
    "slug": "la-croix-valmer",
    "name": "La Croix-Valmer",
    "villageId": "la-croix-valmer-village",
    "intro": {
      "fr": "Un village en retrait de la mer, des vignobles et des plages pour prendre le large. La Croix-Valmer donne plusieurs directions au séjour : Gigaro, le Débarquement ou une promenade préparée sur le littoral.",
      "en": "A village set back from the sea, vineyards and beaches that open up the day. La Croix-Valmer gives your stay several directions: Gigaro, Le Débarquement or a prepared coastal walk."
    },
    "plan": {
      "fr": "Choisissez le Débarquement pour associer plage et mémoire, Sylvabelle si les marches conviennent à votre groupe, ou le circuit du Cap Lardier pour une randonnée préparée depuis Gigaro. Le Domaine de La Croix complète la découverte côté vignoble.",
      "en": "Choose Débarquement for beach and remembrance, Sylvabelle if the steps suit your group, or the Cap Lardier circuit for a planned hike from Gigaro. Domaine de La Croix adds the vineyard side of the area."
    }
  },
  {
    "slug": "cogolin",
    "name": "Cogolin",
    "villageId": "cogolin-village",
    "intro": {
      "fr": "Des ruelles qui montent, des savoir-faire à découvrir et un autre visage du Golfe. Cogolin se choisit pour une promenade au vieux village, une rencontre avec l’artisanat ou une étape entre les communes voisines.",
      "en": "Uphill lanes, local crafts and another side of the Golfe. Choose Cogolin for an old-town stroll, an encounter with craftsmanship or a stop between neighbouring towns."
    },
    "plan": {
      "fr": "Le vieux Cogolin se découvre à pied autour de Saint-Sauveur et de la Tour de l’Horloge. L’artisanat donne une autre direction à la visite : tapis, pipes et anches racontent une histoire de gestes et de matières.",
      "en": "Explore old Cogolin on foot around Saint-Sauveur and Tour de l’Horloge. Crafts offer another route through town: carpets, pipes and reeds tell a story of skilled hands and materials."
    }
  },
  {
    "slug": "le-plan-de-la-tour",
    "name": "Le Plan-de-la-Tour",
    "villageId": "plan-de-la-tour-village",
    "intro": {
      "fr": "Le Plan-de-la-Tour se découvre autour de ses places, de son marché provençal et de l’église Saint-Martin. Retrouvez ici le guide du village, des tables au centre et les rendez-vous locaux pour préparer une journée entre ruelles et collines.",
      "en": "Discover Le Plan-de-la-Tour through its squares, Provençal market and Saint-Martin church. Find the village guide, central restaurants and local events here to plan a day between the lanes and hills."
    },
    "plan": {
      "fr": "Le jeudi matin, commencez par le marché place Foch, puis rejoignez l’église Saint-Martin. Gardez une table au Porche ou à La Tour du Plan pour prolonger la promenade ; confirmez l’ouverture et réservez votre repas.",
      "en": "On Thursday mornings, start with the market on Place Foch, then head towards Saint-Martin church. Book Le Porche or La Tour du Plan to continue the outing over a meal; confirm opening before visiting."
    }
  },
  {
    "slug": "rayol-canadel",
    "name": "Rayol-Canadel-sur-Mer",
    "villageId": "rayol-canadel-village",
    "intro": {
      "fr": "Des jardins, des plages et un village accroché au relief. Rayol-Canadel se découvre en alternant le Domaine du Rayol, une pause au bord de l’eau et les perspectives de la corniche.",
      "en": "Gardens, beaches and a village shaped by the hillside. Explore Rayol-Canadel by combining Domaine du Rayol, time by the water and views along the corniche."
    },
    "plan": {
      "fr": "Le Jardin des Méditerranées donne un vrai point de départ à la visite. Les plages du Rayol et du Canadel, la pergola du Patec et les escaliers complètent cette découverte entre végétation et mer.",
      "en": "The Jardin des Méditerranées gives your visit a starting point. Rayol and Canadel beaches, the Patec pergola and the stairways extend the discovery between greenery and sea."
    }
  }
];
export function getDestination(slug:string){return destinations.find(x=>x.slug===slug);}
// Match exact location tokens: regional services are not assigned to Saint-Tropez town.
export function destinationsForLocation(location:string){
 const normalize=(value:string)=>value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
 const tokens=location.split("·").map(normalize);
 return destinations.filter(x=>tokens.includes(normalize(x.name)));
}
export function destinationForLocation(location:string){return destinationsForLocation(location)[0];}
export function placesInDestination(town:Destination):Place[]{return places.filter(x=>destinationsForLocation(x.location).some(match=>match.slug===town.slug));}
export function villasInDestination(town:Destination){return villas.filter(x=>destinationForLocation(x.location)?.slug===town.slug);}
export const localCategories = [
 {slug:"restaurants",id:"eat",fr:"Restaurants",en:"Restaurants"},
 {slug:"beaches",id:"beach",fr:"Plages et beach clubs",en:"Beaches and beach clubs"},
 {slug:"things-to-do",id:"do",fr:"Activités et visites",en:"Things to do"},
 {slug:"nightlife",id:"party",fr:"Bars et sorties",en:"Bars and nightlife"},
 {slug:"services",id:"services",fr:"Services pour votre séjour",en:"Services for your stay"},
 {slug:"sea",id:"sea",fr:"Bateaux et mer",en:"Boats and the sea"},
 {slug:"wellness",id:"wellness",fr:"Bien-être et sport",en:"Wellness and sport"},
] as const;
export function categoriesInDestination(town:Destination){return localCategories.filter(c=>placesInDestination(town).filter(x=>x.category===c.id).length>=2);}
export function destinationPaths(){return ["/destinations",...destinations.flatMap(t=>[`/destinations/${t.slug}`,...categoriesInDestination(t).map(c=>`/destinations/${t.slug}/${c.slug}`)])];}
export function localCategoryIntro(town:Destination,category:typeof localCategories[number],locale:Locale){
 const local=placesInDestination(town).filter(x=>x.category===category.id);const names=local.map(x=>x.name).join(", ");
 return locale === "fr" ? `${category.fr} à ${town.name} : ${names}. Comparez les fiches selon l’ambiance, les personnes qui vous accompagnent et les informations pratiques de chaque adresse. ${town.plan.fr}` : `${category.en} in ${town.name}: ${names}. Compare the guides by atmosphere, your companions and each place’s practical details. ${town.plan.en}`;
}
