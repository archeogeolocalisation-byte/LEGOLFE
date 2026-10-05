import { places, type Place } from "./places";
import { villas } from "./villas";
import type { Locale } from "../lib/i18n";
export type Destination = { slug:string;name:string;villageId:string|null;intro:Record<Locale,string>;plan:Record<Locale,string> };
export const destinations:Destination[] = [
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
      "fr": "Choisissez d’abord entre une plage et un beach club, puis regardez les tables et les services utiles au séjour. Le village mérite aussi une visite à part entière.",
      "en": "Choose between a beach and a beach club first, then explore restaurants and services for your stay. Set aside time to visit the village itself."
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
      "fr": "Comparez Bello Visto et La Verdoyante selon l’ambiance recherchée, puis consultez la fiche du village ou celle du Château Minuty pour compléter votre journée.",
      "en": "Compare Bello Visto and La Verdoyante for the atmosphere you want, then explore the village or Château Minuty guide to complete your day."
    }
  },
  {
    "slug": "grimaud",
    "name": "Grimaud",
    "villageId": "grimaud-village",
    "intro": {
      "fr": "Le village de Grimaud et Port Grimaud sont deux façons différentes de découvrir la commune. La fiche du village donne les repères de visite ; Monroe’s apporte une piste pour sortir à Port Grimaud. Les villas et l’agenda complètent la sélection quand le catalogue en propose.",
      "en": "Grimaud village and Port Grimaud offer different experiences within the same commune. The village guide provides ideas for a visit, while Monroe’s is an option for a night out in Port Grimaud. Villas and events complete the selection when available in the catalog."
    },
    "plan": {
      "fr": "Commencez par la fiche du village pour préparer une visite. Pour un verre ou une soirée, regardez séparément l’ambiance de Monroe’s et l’emplacement de votre hébergement.",
      "en": "Start with the village guide to plan a visit. For drinks or an evening out, check Monroe’s atmosphere and the location of your accommodation separately."
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
      "fr": "Le front de mer et le port forment le cœur de la station. Bonporteau apporte un autre décor, plus resserré entre les rochers et la végétation. Deux ambiances à découvrir séparément.",
      "en": "The waterfront and harbour form the heart of the resort. Bonporteau offers a more enclosed setting between rocks and greenery. Explore them as two distinct experiences."
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
      "fr": "La visite commence au village, autour de l’église Sainte-Marie-Madeleine. Les paysages de la Verne et les chemins des Maures prolongent cette découverte de l’intérieur des terres.",
      "en": "Begin in the village around Sainte-Marie-Madeleine church. The Verne landscape and Maures trails extend this discovery of the inland countryside."
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
      "fr": "Le centre et la mer ne sont pas une seule étape. Gigaro attire vers la plage et les chemins côtiers ; les vignes et les villas anciennes apportent une autre lecture de la commune.",
      "en": "The centre and the sea are separate stops. Gigaro draws you towards the beach and coastal paths; vineyards and historic villas reveal another side of the commune."
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
      "fr": "Le Plan-de-la-Tour a sa propre fiche de village, avec des repères pour prendre le temps de le découvrir. Cette page réunit ce guide et les événements du catalogue qui concernent la commune, afin de préparer une visite avec un rythme plus posé.",
      "en": "Le Plan-de-la-Tour has its own village guide with ideas for an unhurried visit. This page brings that guide together with events in the catalog that concern the commune, helping you plan a slower day."
    },
    "plan": {
      "fr": "Commencez par le guide du village, puis regardez les rendez-vous locaux pendant vos dates. Les informations de chaque événement renvoient à leur source.",
      "en": "Start with the village guide, then check local events during your dates. Each event links to its source for practical information."
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
