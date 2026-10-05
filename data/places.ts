export const placeCategories = [
  { id: "eat", label: "EAT", name: "Restaurants", description: "Tables chosen for the moment, the people and the mood." },
  { id: "beach", label: "BEACH", name: "Beaches & beach clubs", description: "Where to swim, settle in, bring the kids or stay for sunset." },
  { id: "sea", label: "SEA", name: "Boats & the sea", description: "Boat days, coastal escapes and ways to experience the Golfe from the water." },
  { id: "do", label: "DO", name: "Things to do", description: "Markets, vineyards, walks and experiences worth making time for." },
  { id: "services", label: "SERVICES", name: "Useful people", description: "Chefs, drivers, childcare and the people who make a stay easier." },
  { id: "wellness", label: "WELLNESS", name: "Wellness & sport", description: "Movement, recovery and private sessions around the Golfe." },
  { id: "party", label: "PARTYING", name: "Bars & nightlife", description: "From the first drink to the last track: pubs, dinner-clubs and late nights around the Golfe." },
  { id: "places", label: "PLACES", name: "Villages & areas", description: "Understand where to stay before choosing a house." },
] as const;

export type PlaceCategory = (typeof placeCategories)[number]["id"];

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  location: string;
  description: string;
  image?: string;
  priceLevel?: 1 | 2 | 3 | 4;
  bestFor: string[];
  notIdealFor: string[];
  tags: string[];
  goodToKnow: string[];
  verified: boolean;
  featured: boolean;
  latitude?: number;
  longitude?: number;
  website?: string;
  phone?: string;
  bookingUrl?: string;
  openingHours?: string;
  season?: string;
  source?: string;
  lastVerifiedAt?: string;
  demo?: boolean;
};

// V1 editorial database.
// `verified: false` means the place has not yet been physically verified by LE GOLFE.
// Facts below were desk-checked against official/tourism sources in September 2026;
// "bestFor", "notIdealFor" and tags are LE GOLFE editorial classifications.
export const places: Place[] = [
{
  "id": "moulin-de-paillas",
  "name": "Moulin de Paillas",
  "category": "do",
  "location": "Ramatuelle",
  "description": "Plan a stop at Moulin de Paillas above Ramatuelle: coastal views, access from the village and information on visiting the restored windmill.",
  "bestFor": [
    "Heritage and landscape"
  ],
  "notIdealFor": [
    "Unprepared visits"
  ],
  "tags": [
    "heritage",
    "view",
    "village"
  ],
  "goodToKnow": [
    "Check the tourist office information before setting out."
  ],
  "verified": false,
  "featured": false,
  "source": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-nature/les-tresors-caches/moulin-de-paillas/",
  "lastVerifiedAt": "2026-10-05"
},
{
  "id": "cap-taillat",
  "name": "Cap Taillat",
  "category": "do",
  "location": "Ramatuelle · La Croix-Valmer",
  "description": "Plan your walk to Cap Taillat between Ramatuelle and La Croix-Valmer: access from l’Escalet, the coastal path and advice before setting out.",
  "bestFor": [
    "A prepared coastal walk"
  ],
  "notIdealFor": [
    "Unprepared visits"
  ],
  "tags": [
    "nature",
    "walk",
    "sea"
  ],
  "goodToKnow": [
    "Check the tourist office information before setting out."
  ],
  "verified": false,
  "featured": false,
  "source": "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/les-tresors-caches/le-cap-taillat/",
  "lastVerifiedAt": "2026-10-05"
},
{
  "id": "pont-des-fees",
  "name": "Pont des Fées",
  "category": "do",
  "location": "Grimaud",
  "description": "Explore Pont des Fées in Grimaud: a historic aqueduct, a walk from Saint-Roch windmill and advice for visiting the valley of the river Garde.",
  "bestFor": [
    "Heritage and landscape"
  ],
  "notIdealFor": [
    "Unprepared visits"
  ],
  "tags": [
    "heritage",
    "nature",
    "walk"
  ],
  "goodToKnow": [
    "Check the tourist office information before setting out."
  ],
  "verified": false,
  "featured": false,
  "source": "https://www.grimaud-provence.com/decouvrez/une-nature-si-presente/des-sentiers-pour-sevader/le-sentier-du-vallon-du-pont-des-fees/",
  "lastVerifiedAt": "2026-10-05"
},
{
  "id": "cogolin-village",
  "name": "Cogolin",
  "category": "places",
  "location": "Cogolin",
  "description": "Uphill lanes, local crafts and another side of the Golfe. Choose Cogolin for an old-town stroll, an encounter with craftsmanship or a stop between neighbouring towns.",
  "bestFor": [
    "A detour through a living village",
    "A day centred on heritage and craftsmanship",
    "Alternating old-town lanes and quays"
  ],
  "notIdealFor": [
    "The beach is not beside the old village",
    "The centre and ports require separate journeys",
    "Not every workshop welcomes walk-in visits"
  ],
  "tags": [
    "village",
    "family",
    "heritage",
    "crafts"
  ],
  "goodToKnow": [
    "The beach is not beside the old village",
    "The centre and ports require separate journeys",
    "Not every workshop welcomes walk-in visits"
  ],
  "verified": false,
  "featured": true,
  "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/cogolin",
  "lastVerifiedAt": "2026-10-04"
},{
  "id": "la-croix-valmer-village",
  "name": "La Croix-Valmer",
  "category": "places",
  "location": "La Croix-Valmer",
  "description": "A village set back from the sea, vineyards and beaches that open up the day. La Croix-Valmer gives your stay several directions: Gigaro, Le Débarquement or a prepared coastal walk.",
  "bestFor": [
    "A stay combining beach and nature",
    "Holidays with varied scenery",
    "A day that leaves room for walking"
  ],
  "notIdealFor": [
    "Staying in the commune does not guarantee a walkable beach",
    "Coastal outings require preparation",
    "Plan access and parking during the season"
  ],
  "tags": [
    "village",
    "family",
    "beach",
    "nature",
    "sea"
  ],
  "goodToKnow": [
    "Staying in the commune does not guarantee a walkable beach",
    "Coastal outings require preparation",
    "Plan access and parking during the season"
  ],
  "verified": false,
  "featured": true,
  "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/la-croix-valmer",
  "lastVerifiedAt": "2026-10-04"
},{
  "id": "rayol-canadel-village",
  "name": "Rayol-Canadel-sur-Mer",
  "category": "places",
  "location": "Rayol-Canadel-sur-Mer",
  "description": "Gardens, beaches and a village shaped by the hillside. Explore Rayol-Canadel by combining Domaine du Rayol, time by the water and views along the corniche.",
  "bestFor": [
    "An escape between gardens and sea",
    "Holidays focused on the landscape",
    "A day combining a visit and the beach"
  ],
  "notIdealFor": [
    "The terrain matters for pushchairs and mobility",
    "Not every sea-view house is a short walk from the beach",
    "Plan journeys to Saint-Tropez"
  ],
  "tags": [
    "village",
    "family",
    "beach",
    "nature",
    "sea"
  ],
  "goodToKnow": [
    "The terrain matters for pushchairs and mobility",
    "Not every sea-view house is a short walk from the beach",
    "Plan journeys to Saint-Tropez"
  ],
  "verified": false,
  "featured": true,
  "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/rayol-canadel-sur-mer",
  "lastVerifiedAt": "2026-10-04"
},
{
  "id": "sainte-maxime-village",
  "name": "Sainte-Maxime",
  "category": "places",
  "location": "Sainte-Maxime",
  "description": "A harbour, an old town and the sea close at hand. Choose Sainte-Maxime for holidays that move easily from a stroll in the centre to time on the sand.",
  "bestFor": [
    "Family holidays by the sea",
    "A stay combining town and beach",
    "Waterfront strolls"
  ],
  "notIdealFor": [
    "Not every beach is walkable from the centre",
    "The waterfront can be lively in summer",
    "Boat crossings depend on schedules and conditions"
  ],
  "tags": [
    "village",
    "family",
    "beach",
    "sea"
  ],
  "goodToKnow": [
    "Not every beach is walkable from the centre",
    "The waterfront can be lively in summer",
    "Boat crossings depend on schedules and conditions"
  ],
  "verified": false,
  "featured": true,
  "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/sainte-maxime",
  "lastVerifiedAt": "2026-10-03"
},{
  "id": "cavalaire-village",
  "name": "Cavalaire-sur-Mer",
  "category": "places",
  "location": "Cavalaire-sur-Mer",
  "description": "A harbour, a long beach and Bonporteau for a different landscape. Cavalaire faces the sea and suits travellers who want it to play the leading role in their holidays.",
  "bestFor": [
    "Holidays centred on the beach",
    "Family stays by the water",
    "Alternating harbour and coastal scenery"
  ],
  "notIdealFor": [
    "Bonporteau and the harbour are not one flat promenade",
    "Plan journeys to Saint-Tropez",
    "Visitor numbers change considerably with the season"
  ],
  "tags": [
    "village",
    "family",
    "beach",
    "sea"
  ],
  "goodToKnow": [
    "Bonporteau and the harbour are not one flat promenade",
    "Plan journeys to Saint-Tropez",
    "Visitor numbers change considerably with the season"
  ],
  "verified": false,
  "featured": true,
  "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/cavalaire-sur-mer",
  "lastVerifiedAt": "2026-10-03"
},{
  "id": "la-mole-village",
  "name": "La Môle",
  "category": "places",
  "location": "La Môle",
  "description": "A village in the valley, a church and the wooded Maures landscape. La Môle offers another way into the Golfe: more hills and nature, with the coast reached by car.",
  "bestFor": [
    "Discovering the Golfe’s inland countryside",
    "Wooded landscapes and prepared walks",
    "An escape away from seaside resorts"
  ],
  "notIdealFor": [
    "The beach is not at the foot of the village",
    "The chapel requires a prepared walk",
    "Heat and restrictions can affect forest outings"
  ],
  "tags": [
    "village",
    "family",
    "nature",
    "walk"
  ],
  "goodToKnow": [
    "The beach is not at the foot of the village",
    "The chapel requires a prepared walk",
    "Heat and restrictions can affect forest outings"
  ],
  "verified": false,
  "featured": true,
  "source": "https://www.golfe-saint-tropez-information.com/fr/villages-stations/la-mole",
  "lastVerifiedAt": "2026-10-03"
},
  {
    id: "monroes-pub", name: "Monroe's Pub", category: "party", location: "Port Grimaud · Grimaud",
    description: "An easy-going Irish-style pub near Port Grimaud for sport, karaoke and a night that does not need Saint-Tropez-level planning.",
    priceLevel: 2, bestFor: ["Casual drinks", "Karaoke", "Sports nights", "Groups"], notIdealFor: ["Dress-up club nights", "Destination cocktails"],
    tags: ["pub", "karaoke", "sport", "casual", "port-grimaud", "late"],
    goodToKnow: ["Karaoke is advertised on Thursday and Saturday nights.", "The tourism listing gives daily opening to 00:45, with annual closure in January."],
    verified: false, featured: true, website: "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/grimaud/monroe-s-pub-5067383", phone: "+33 4 94 56 44 11", openingHours: "Daily 10:00–00:45; annual closure in January", source: "https://www.golfe-saint-tropez-information.com/fr/loisirs/autres-loisirs/grimaud/monroe-s-pub-5067383", lastVerifiedAt: "2026-10-03"
  },
  {
    id: "gaio-club", name: "Gaïo", category: "party", location: "Saint-Tropez",
    description: "Dinner, live performers and a transition into club mode above the port — one address when the plan is meant to run from 20:00 until very late.",
    priceLevel: 4, bestFor: ["Dinner into dancing", "Groups", "Late nights"], notIdealFor: ["Quiet drinks", "Early dinners", "Low-key evenings"],
    tags: ["dinner-club", "live", "dj", "late-night", "saint-tropez", "nikkei"],
    goodToKnow: ["Saint-Tropez Tourism lists opening from 20:00 to 05:00.", "The 2026 season is listed from 1 April to 31 October, daily."],
    verified: false, featured: true, website: "https://www.sainttropeztourisme.com/fr/fiche/gaio-5912797/", openingHours: "20:00–05:00", season: "1 Apr–31 Oct 2026", source: "https://www.sainttropeztourisme.com/fr/fiche/gaio-5912797/", lastVerifiedAt: "2026-10-03"
  },
  {
    id: "caves-du-roy", name: "Les Caves du Roy", category: "party", location: "Saint-Tropez",
    description: "The classic Saint-Tropez nightclub reference: less about discovering a new concept than deliberately choosing the myth for a proper late night.",
    priceLevel: 4, bestFor: ["Iconic club night", "Dancing", "Late summer nights"], notIdealFor: ["Casual pub atmosphere", "Spontaneous low-key plans"],
    tags: ["club", "iconic", "dancing", "late-night", "saint-tropez"],
    goodToKnow: ["The tourism office describes more than five decades of Saint-Tropez nightlife history.", "In 2026 it is listed Fridays and Saturdays from 18 April to 30 June, then daily in July and August."],
    verified: false, featured: true, website: "https://www.sainttropeztourisme.com/fr/fiche/les-caves-du-roy-4082965/", season: "Weekends Apr–Jun; daily Jul–Aug 2026", source: "https://www.sainttropeztourisme.com/fr/fiche/les-caves-du-roy-4082965/", lastVerifiedAt: "2026-10-03"
  },
  {
    id: "opera-saint-tropez", name: "L'Opera", category: "party", location: "Port · Saint-Tropez",
    description: "A port-front dinner-show where the table is part restaurant, part stage, then part club — useful when the group wants the spectacle built into the evening.",
    priceLevel: 4, bestFor: ["Dinner show", "Groups celebrating", "Port atmosphere"], notIdealFor: ["Quiet conversation", "Simple cocktails", "Understated evenings"],
    tags: ["dinner-show", "club", "port", "performers", "saint-tropez"],
    goodToKnow: ["The 2026 season is listed from 30 April to 4 October.", "The venue describes terrace, indoor and VIP/patio areas with different levels of club atmosphere."],
    verified: false, featured: true, website: "https://www.opera-saint-tropez.com/fr/", bookingUrl: "https://www.opera-saint-tropez.com/fr/reservation/form/", season: "30 Apr–4 Oct 2026", source: "https://www.sainttropeztourisme.com/fr/fiche/l-opera-4762506/", lastVerifiedAt: "2026-10-03"
  },


  {
    id: "plan-de-la-tour-village",
    name: "Le Plan-de-la-Tour",
    category: "places",
    location: "Le Plan-de-la-Tour",
    description: "A village set back from the coast, surrounded by wooded hills and hamlets — close enough to the Golfe, far enough from its noise.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Plan-de-la-tour-01.jpg",
    bestFor: ["Quiet stays", "Walking & forest", "Local village life", "Views over the Golfe"],
    notIdealFor: ["Beachfront stays", "Nightlife on the doorstep", "Doing everything without a car"],
    tags: ["village", "forest", "san-peire", "archaeology", "quiet", "local-life", "views"],
    goodToKnow: ["The San Peire trail crosses the remains of an oppidum and ends with a wide panorama over the Mediterranean, the Golfe de Saint-Tropez, the Maures and Esterel massifs.", "Forest access in summer is subject to Var wildfire-risk restrictions; always check access before setting out."],
    verified: false,
    featured: true,
    source: "https://cotedazurfrance.fr/offres/randonnee-chemin-vers-le-san-peire-le-plan-de-la-tour-fr-3271492/",
    lastVerifiedAt: "2026-09-30",
  },
  {
    id: "la-vague-dor",
    name: "La Vague d'Or",
    category: "eat",
    location: "Saint-Tropez",
    description: "A destination dinner at Cheval Blanc Saint-Tropez, built around creative cuisine and a full special-occasion experience rather than a casual night out.",
    priceLevel: 4,
    bestFor: ["Special occasions", "Gastronomy", "Couples"],
    notIdealFor: ["Quick dinners", "Budget-led evenings", "Very casual plans"],
    tags: ["gastronomic", "creative-cuisine", "special-occasion", "saint-tropez"],
    goodToKnow: ["Listed by the MICHELIN Guide in Saint-Tropez.", "Treat this as a destination meal: plan and reserve ahead rather than adding it casually to the evening."],
    verified: false,
    featured: true,
    website: "https://www.chevalblanc.com/fr/maison/st-tropez/restaurants-et-bars/la-vague-d-or-st-tropez/",
    phone: "+33 4 94 55 91 00",
    openingHours: "19:30–21:30; closed Wednesday according to Cheval Blanc",
    source: "https://www.chevalblanc.com/fr/maison/st-tropez/restaurants-et-bars/la-vague-d-or-st-tropez/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "la-voile",
    name: "La Voile — La Réserve Ramatuelle",
    category: "eat",
    location: "Ramatuelle",
    description: "A refined Mediterranean table above the coast at La Réserve Ramatuelle, suited to travellers looking for a polished, quieter alternative to the energy of Pampelonne.",
    priceLevel: 4,
    bestFor: ["Couples", "Refined dinners", "Sea-view setting"],
    notIdealFor: ["Spontaneous cheap eats", "Fast family meals"],
    tags: ["mediterranean", "fine-dining", "sea-view", "quiet", "ramatuelle"],
    goodToKnow: ["La Réserve describes the property as overlooking the Mediterranean in a private natural setting.", "The MICHELIN Guide lists La Voile in Ramatuelle; current menus and opening should still be checked before travel."],
    verified: false,
    featured: true,
    website: "https://www.lareserve-ramatuelle.com/restaurants/",
    source: "https://www.lareserve-ramatuelle.com/restaurant/restaurant-gastronomique-saint-tropez/",
    openingHours: "Dinner daily 19:30–21:30",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "bello-visto",
    name: "Bello Visto",
    category: "eat",
    location: "Gassin",
    description: "A village terrace with a broad view over the Golfe, combining Mediterranean cooking with the slower rhythm of old Gassin.",
    priceLevel: 3,
    bestFor: ["Lunch with a view", "Couples", "Village evenings"],
    notIdealFor: ["Beach-day convenience", "Late-night Saint-Tropez energy"],
    tags: ["terrace", "view", "mediterranean", "village", "gassin"],
    goodToKnow: ["The restaurant is on Place deï Barri in the village and highlights a shaded terrace overlooking the Golfe.", "The official site lists seasonal operation; check current dates before planning around it."],
    verified: false,
    featured: true,
    website: "https://bellovisto.eu/",
    bookingUrl: "https://bellovisto.eu/reservation-restaurant/",
    source: "https://gassin.eu/fr/sorties/restaurant/gassin/restaurant-bello-visto-4936003/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "la-verdoyante",
    name: "La Verdoyante",
    category: "eat",
    location: "Gassin",
    description: "A Provençal table on the hillside outside the village, with vineyards and the Golfe in the landscape — a good fit when the setting matters as much as being near Saint-Tropez.",
    priceLevel: 3,
    bestFor: ["Provençal lunch", "Families", "Countryside setting"],
    notIdealFor: ["Car-free evenings", "Last-minute peak-season plans"],
    tags: ["provence", "terrace", "vineyards", "family", "gassin"],
    goodToKnow: ["Gassin Tourisme lists Provençal and Mediterranean cuisine, garden, parking and a panoramic terrace setting.", "The tourism listing warns that the restaurant can book several days ahead in peak season."],
    verified: false,
    featured: false,
    website: "https://la-verdoyante.fr",
    source: "https://gassin.eu/fr/sorties/restaurant/gassin/restaurant-la-verdoyante-4081316/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "byblos-beach",
    name: "Byblos Beach",
    category: "eat",
    location: "Pampelonne · Ramatuelle",
    description: "A polished Pampelonne lunch option for travellers who want the beach to be part of the restaurant experience, not simply somewhere to eat between swims.",
    priceLevel: 4,
    bestFor: ["Beach lunch", "Groups of friends", "Pampelonne days"],
    notIdealFor: ["Quiet village dinner", "Budget-led lunch"],
    tags: ["beach-club", "pampelonne", "mediterranean", "lunch", "social"],
    goodToKnow: ["The MICHELIN Guide lists Byblos Beach in Ramatuelle as Mediterranean cuisine.", "Beach establishments are seasonal by nature; confirm opening and reservations for your dates."],
    verified: false,
    featured: true,
    source: "https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/byblos-beach-5260740/",
    website: "https://www.byblos-beach.com/",
    phone: "+33 4 94 43 15 00",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "ramatuelle-village",
    name: "Ramatuelle",
    category: "places",
    location: "Ramatuelle",
    description: "A hill village with narrow Mediterranean streets and a distinctly calmer identity than nearby Pampelonne — useful as a base when you want countryside and beach access without living inside Saint-Tropez.",
    bestFor: ["Villa stays", "Pampelonne access", "Village atmosphere"],
    notIdealFor: ["Doing the whole Golfe on foot", "Port nightlife at the doorstep"],
    tags: ["village", "pampelonne", "villas", "quiet", "market"],
    goodToKnow: ["The historic centre is organised around narrow lanes, passages and Place de l'Ormeau.", "The Provençal market is held on Thursday and Sunday mornings; summer traffic can radically change driving times."],
    verified: false,
    featured: true,
    source: "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-village/",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "gassin-village",
    name: "Gassin",
    category: "places",
    location: "Gassin",
    description: "A medieval hilltop village above the Golfe, strong on panoramas, old-stone atmosphere and a quieter dinner rhythm while remaining in the heart of the Saint-Tropez peninsula.",
    bestFor: ["Views", "Couples", "Quiet village evenings"],
    notIdealFor: ["Beach at the doorstep", "No-car stays"],
    tags: ["medieval-village", "views", "quiet", "restaurants", "gassin"],
    goodToKnow: ["The village sits around 200 metres above sea level and has viewpoints over the Golfe and toward the Bay of Cavalaire.", "Its old centre includes the Porte des Sarrazins, the passage du Guet and L'Androuno."],
    verified: false,
    featured: true,
    source: "https://gassin.eu/fr/informations-pratiques/quoi-faire-a-gassin/",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "grimaud-village",
    name: "Grimaud",
    category: "places",
    location: "Grimaud",
    description: "A medieval hilltop village built beneath the ruins of its castle, with stone lanes, Provençal character and a central position between Sainte-Maxime, Cogolin and Saint-Tropez.",
    bestFor: ["Heritage", "Village stays", "Central Golfe base"],
    notIdealFor: ["Beach at the doorstep", "Car-free coastal stays"],
    tags: ["medieval-village", "castle", "heritage", "grimaud", "provence"],
    goodToKnow: ["The old village and Port Grimaud are two distinct experiences and should be treated separately.", "The castle ruins above the village offer one of the clearest ways to understand Grimaud's medieval structure and surrounding landscape."],
    verified: false,
    featured: true,
    source: "https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-chateau/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "pampelonne",
    name: "Pampelonne",
    category: "beach",
    location: "Ramatuelle",
    description: "The long, iconic beach of the peninsula: part public beach, part beach-club culture, with very different moods depending on the sector and time of day.",
    priceLevel: 2,
    bestFor: ["Full beach days", "Choice of atmospheres", "Groups"],
    notIdealFor: ["Avoiding peak-season crowds", "One-size-fits-all recommendations"],
    tags: ["sand", "beach-clubs", "swimming", "pampelonne", "iconic"],
    goodToKnow: ["Pampelonne is on the commune of Ramatuelle, not Saint-Tropez.", "Ramatuelle Tourisme describes 4.5 km of sand and multiple public access points; the right sector matters, so LE GOLFE should eventually match the access to the traveller profile."],
    verified: false,
    featured: true,
    source: "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/plages-et-criques-secretes/pampelonne-lorigine-du-mythe-tropezien/",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "escalet",
    name: "Plage de l'Escalet",
    category: "beach",
    location: "Ramatuelle",
    description: "A smaller family-oriented beach between Cap Camarat and Cap Taillat, better suited to swimming, snorkelling and starting a coastal walk than to the Pampelonne beach-club scene.",
    bestFor: ["Families", "Snorkelling", "Coastal walks"],
    notIdealFor: ["Beach-club atmosphere", "Late-night plans"],
    tags: ["family", "snorkelling", "kayak", "coastal-path", "ramatuelle"],
    goodToKnow: ["Ramatuelle Tourisme describes the beach as roughly 350 metres long and highlights snorkelling, kayak and paddle.", "In season there is a lifeguard post; access and parking conditions should be checked before setting out."],
    verified: false,
    featured: true,
    website: "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/plages-et-criques-secretes/",
    source: "https://www.ramatuelle-tourisme.com/fr/decouvrir-la-presquile/cote-mer/plages-et-criques-secretes/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "place-des-lices",
    name: "Place des Lices & market",
    category: "do",
    location: "Saint-Tropez",
    description: "The village square at the heart of Saint-Tropez life, especially useful as a morning stop when the market brings together produce, flowers, local crafts and the ritual of the place itself.",
    priceLevel: 1,
    bestFor: ["Morning in town", "Market browsing", "First-time visitors"],
    notIdealFor: ["A quiet market experience in peak season"],
    tags: ["market", "saint-tropez", "morning", "shopping", "village-life"],
    goodToKnow: ["The main market takes place on Tuesday and Saturday.", "The square remains a central village meeting place outside market hours as well."],
    verified: false,
    featured: true,
    website: "https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/",
    openingHours: "Market Tuesday & Saturday 08:00–13:00; square open daily",
    source: "https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "chateau-minuty",
    name: "Château Minuty",
    category: "do",
    location: "Gassin",
    description: "A wine-estate visit in the Saint-Tropez peninsula, useful for breaking up a beach-heavy week with a local terroir experience close to Gassin and Ramatuelle.",
    priceLevel: 2,
    bestFor: ["Wine lovers", "Couples", "Slow afternoons"],
    notIdealFor: ["Travellers who do not drink alcohol", "Rushed schedules"],
    tags: ["vineyard", "wine", "gassin", "terroir", "tasting"],
    goodToKnow: ["Minuty offers estate experiences including visits and tastings; some formats require booking while a self-guided option is also advertised.", "Opening and experience formats can change seasonally, so use the estate's current booking information."],
    verified: false,
    featured: true,
    website: "https://minuty.com/",
    bookingUrl: "https://minuty.com/pages/un-espace-moderne-et-chaleureux",
    source: "https://minuty.com/pages/un-espace-moderne-et-chaleureux",
    openingHours: "Weekdays 09:00–18:30; weekends & public holidays 10:00–18:30",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "citadelle-saint-tropez",
    name: "Citadelle de Saint-Tropez",
    category: "do",
    location: "Saint-Tropez",
    description: "A useful counterpoint to the port and shopping streets: climb above town for the panorama, then use the maritime museum to put Saint-Tropez back into its seafaring history.",
    priceLevel: 1,
    bestFor: ["First visit", "History", "Panoramic views"],
    notIdealFor: ["Beach-only days", "Travellers avoiding uphill walking"],
    tags: ["history", "museum", "viewpoint", "saint-tropez", "culture"],
    goodToKnow: ["Saint-Tropez Tourisme highlights the early-17th-century citadel and its Musée d'Histoire maritime.", "Pair it with the old town rather than treating it as a separate half-day excursion."],
    verified: false,
    featured: false,
    website: "https://www.sainttropeztourisme.com/fr/fiche/la-citadelle-musee-d-histoire-maritime-4171083/",
    openingHours: "01 Apr–30 Sep 10:00–18:30; 01 Oct–01 Nov & 19–31 Dec 10:00–17:30",
    source: "https://www.sainttropeztourisme.com/fr/fiche/la-citadelle-musee-d-histoire-maritime-4171083/",
    lastVerifiedAt: "2026-10-02",
  },

  {
    id: "saint-tropez-village",
    name: "Saint-Tropez",
    category: "places",
    location: "Saint-Tropez",
    description: "The historic port village at the centre of the Golfe's social life — best understood as several experiences at once: old streets, market mornings, harbour energy, culture and late evenings.",
    bestFor: ["First-time visitors", "Car-free evenings", "Restaurants & nightlife"],
    notIdealFor: ["Guaranteed quiet", "Easy peak-season driving"],
    tags: ["village", "port", "market", "nightlife", "culture", "saint-tropez"],
    goodToKnow: ["Place des Lices hosts the main market on Tuesday and Saturday mornings.", "The Citadelle above town adds a quieter cultural counterpoint and panoramic view over the bay."],
    verified: false,
    featured: true,
    source: "https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "club-55",
    name: "Le Club 55",
    category: "beach",
    location: "Pampelonne · Ramatuelle",
    description: "The historic Pampelonne institution: a beach-and-lunch day built around a long-established Ramatuelle address rather than a high-energy party concept.",
    priceLevel: 4,
    bestFor: ["Iconic Pampelonne day", "Long lunch", "Classic Saint-Tropez atmosphere"],
    notIdealFor: ["Budget beach day", "Spontaneous peak-season plans"],
    tags: ["beach-club", "pampelonne", "iconic", "lunch", "boat-shuttle"],
    goodToKnow: ["The official tourism listing dates the Club to 1955 and lists restaurant, beach facilities, boutique and boat shuttle.", "For 2026 the tourism listing shows seasonal opening from late March to early November; confirm before travelling."],
    verified: false,
    featured: true,
    website: "https://www.club55.fr",
    source: "https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/le-club-55-4601210/",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "indie-beach",
    name: "Indie Beach",
    category: "beach",
    location: "Pampelonne · Ramatuelle",
    description: "A bohemian-chic Pampelonne beach club with a more contemporary visual identity, Mediterranean food and an atmosphere that can become livelier later in the day.",
    priceLevel: 4,
    bestFor: ["Stylish beach day", "Groups of friends", "Sunset energy"],
    notIdealFor: ["Low-cost beach day", "Travellers seeking total seclusion"],
    tags: ["beach-club", "bohemian", "pampelonne", "sunset", "social", "boat-shuttle"],
    goodToKnow: ["Ramatuelle Tourisme lists deckchairs, supervised beach facilities and a boat shuttle at anchor.", "The 2026 tourism listing shows operation from late April to early October; seasonal details can change."],
    verified: false,
    featured: true,
    website: "https://www.indiegroup.fr",
    source: "https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/indie-beach-5445018/",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "casita-pampelonne",
    name: "Casita",
    category: "beach",
    location: "Pampelonne · Ramatuelle",
    description: "A newer bohemian beach address on Pampelonne designed for an unhurried day from lunch through sunset, with Mediterranean and South American influences.",
    priceLevel: 4,
    bestFor: ["All-day beach", "Lunch into sunset", "Couples & friends"],
    notIdealFor: ["Quick inexpensive stop", "Village atmosphere"],
    tags: ["beach-club", "pampelonne", "bohemian", "sunset", "restaurant"],
    goodToKnow: ["Ramatuelle Tourisme describes Casita as both a restaurant and private beach, intended for lunch, dinner and sunbeds.", "Beach-club operation is seasonal: check current opening and reservation conditions."],
    verified: false,
    featured: false,
    source: "https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/casita-4739267/",
    openingHours: "21/05–04/10/2026; seasonal hours vary",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "bateaux-verts-excursion",
    name: "Excursions Bateaux Verts",
    category: "sea",
    location: "Saint-Tropez",
    description: "A straightforward way to see the peninsula from the water without chartering a private yacht, using scheduled sightseeing excursions from the Saint-Tropez area.",
    priceLevel: 2,
    bestFor: ["First boat outing", "Families", "Seeing the coast from the water"],
    notIdealFor: ["Private bespoke itinerary", "Travellers wanting a yacht day"],
    tags: ["boat-trip", "sightseeing", "family", "coast", "saint-tropez"],
    goodToKnow: ["Saint-Tropez Tourisme lists Excursions Bateaux Verts among local sightseeing boat operators.", "Tour routes and timetables vary, so choose the actual trip based on date, duration and sea conditions."],
    verified: false,
    featured: true,
    website: "https://www.bateauxverts.com/excursions/",
    source: "https://www.sainttropeztourisme.com/fr/explorer/activites/sports-et-loisirs/balades-en-bateau/",
    lastVerifiedAt: "2026-09-29",
  },
  {
    id: "caseneuve-catamaran",
    name: "Caseneuve Maxi Catamaran",
    category: "sea",
    location: "Golfe de Saint-Tropez",
    description: "A catamaran option for travellers who want a more social sailing experience, useful for coastal outings and sunset-style moments rather than a small private motorboat format.",
    priceLevel: 3,
    bestFor: ["Groups", "Catamaran experience", "Sea day"],
    notIdealFor: ["Highly private itineraries", "Travellers prone to seasickness"],
    tags: ["catamaran", "boat-trip", "groups", "sea", "golfe"],
    goodToKnow: ["Both Saint-Tropez Tourisme and the Golfe tourism office list Caseneuve Maxi Catamaran among local boat-trip providers.", "The Golfe tourism office lists seasonal operation in 2026; check the chosen cruise and departure point before booking."],
    verified: false,
    featured: true,
    source: "https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/caseneuve-maxi-catamaran/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "domaine-rayol-kids",
    name: "Domaine du Rayol — Les mains dans la terre",
    category: "do",
    location: "Rayol-Canadel-sur-Mer",
    description: "A hands-on garden activity for families that turns Mediterranean plants and ecology into something children can explore rather than simply look at.",
    priceLevel: 1,
    bestFor: ["Children 6–12", "Families", "Nature learning"],
    notIdealFor: ["Children under 6", "Bad-weather days"],
    tags: ["kids", "family", "garden", "nature", "educational"],
    goodToKnow: ["The tourism office lists the activity for children aged 6 to 12 with an accompanying adult and says reservation is required.", "It takes place outdoors and can be cancelled in unfavourable weather."],
    verified: false,
    featured: false,
    website: "https://www.domainedurayol.org/",
    source: "https://www.domainedurayol.org/agenda-domaine-rayol/activites/activites-enfants/",
    openingHours: "October 09:30–18:30; seasonal hours vary",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "master-ninja-cogolin",
    name: "Master Ninja · La Palmeraie",
    category: "do",
    location: "Cogolin",
    description: "An active family option in Cogolin with age-adapted aquatic obstacle formats — useful when children need something more energetic than another beach afternoon.",
    priceLevel: 1,
    bestFor: ["Active kids", "Families", "Teenagers"],
    notIdealFor: ["Quiet cultural day", "Very young children without checking the age-specific format"],
    tags: ["kids", "family", "active", "aquatic", "cogolin"],
    goodToKnow: ["Master Ninja is an over-water obstacle course; the same site also offers Ninja Kid's, Baby Ninja, a net course and mini-golf.", "The 2026 tourism listing gives Master Ninja from 1 July to 5 September, daily 10:00–19:00, from €15; check directly outside peak summer."],
    verified: false,
    featured: false,
    website: "https://lapalmeraiefamily.com/",
    phone: "+33 9 54 08 99 79",
    openingHours: "Master Ninja 1 Jul–5 Sep 2026: daily 10:00–19:00 (tourism listing)",
    source: "https://cotedazurfrance.fr/offres/master-ninja-cogolin-fr-4339372/",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "cecile-golmard-chef",
    name: "Cécile Golmard · Chef à domicile",
    category: "services",
    location: "Saint-Tropez",
    description: "A private-chef option for lunches, dinners and culinary events at the villa — exactly the kind of local service LE GOLFE can eventually match to a stay profile.",
    priceLevel: 4,
    bestFor: ["Villa dinners", "Special occasions", "Groups staying at home"],
    notIdealFor: ["Travellers who want to eat out every night"],
    tags: ["private-chef", "villa-service", "food", "events", "saint-tropez"],
    goodToKnow: ["Saint-Tropez Tourisme lists Cécile Golmard as a chef à domicile creating made-to-measure lunches, dinners and culinary events.", "Menu, availability, party size and pricing should be confirmed directly for each stay."],
    verified: false,
    featured: true,
    website: "https://www.cecilegolmard.com",
    source: "https://www.sainttropeztourisme.com/fr/fiche/cecile-golmard-6705616/",
    openingHours: "Year-round",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "taxi-estelle",
    name: "Taxi Estelle",
    category: "services",
    location: "Ramatuelle",
    description: "A locally based transport option for airport and station transfers, point-to-point trips and chauffeured vehicle requests around a Ramatuelle stay.",
    priceLevel: 2,
    bestFor: ["Airport transfers", "Ramatuelle stays", "Groups up to 7"],
    notIdealFor: ["Large coach groups", "Travellers expecting fixed app-based pricing"],
    tags: ["taxi", "driver", "transfer", "airport", "ramatuelle"],
    goodToKnow: ["Ramatuelle Tourisme lists airport and station transfers, all-destination journeys and chauffeured vehicle availability.", "The listing states group capacity up to seven people; confirm luggage capacity and fare before travel."],
    verified: false,
    featured: false,
    source: "https://www.ramatuelle-tourisme.com/fr/services/services-transports/ramatuelle/taxi-estelle-4647114/",
    openingHours: "Daily, 2026–2027",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "maison-laurent-conciergerie",
    name: "Maison Laurent",
    category: "services",
    location: "Ramatuelle",
    description: "A Ramatuelle-based property and housekeeping service covering cleaning, linen, opening and closing a home and general concierge support.",
    priceLevel: 3,
    bestFor: ["Villa owners", "Housekeeping", "Property preparation"],
    notIdealFor: ["Travellers looking only for restaurant bookings"],
    tags: ["concierge", "housekeeping", "linen", "villa-service", "ramatuelle"],
    goodToKnow: ["Ramatuelle Tourisme lists year-round cleaning, maintenance, opening/closing, linen and concierge services.", "This is particularly relevant to the future LE GOLFE / PARTNERS side as well as guest support."],
    verified: false,
    featured: false,
    source: "https://www.ramatuelle-tourisme.com/fr/services/conciergerie/ramatuelle/maison-laurent-7509498/",
    openingHours: "Daily, year-round 2026",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "gigaro-beach",
    name: "Plage de Gigaro",
    category: "beach",
    location: "La Croix-Valmer",
    description: "A long, natural-feeling beach at the gateway to Cap Lardier — equally useful for a family swim or as the start of a serious coastal walk.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Aerial_view_of_Gigaro_Beach_in_La_Croix-Valmer%2C_France_%2852723801211%29.jpg",
    priceLevel: 1,
    bestFor: ["Families", "Coastal walks", "Natural beach days", "Sunset"],
    notIdealFor: ["Beach-club scene", "Travellers avoiding walking"],
    tags: ["beach", "family", "gigaro", "cap-lardier", "coastal-path", "nature"],
    goodToKnow: ["Gigaro is one of the main gateways into the protected Cap Lardier coastline.", "The official walking map lists several marked routes from Gigaro, including the 6.2 km Sémaphore loop and longer two-cap itineraries."],
    verified: false,
    featured: true,
    source: "https://www.golfe-sainttropez-tourisme.fr/wp-content/uploads/2023/07/Balade-2025.pdf",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "maison-des-papillons",
    name: "Maison des Papillons · Musée Dany Lartigue",
    category: "do",
    location: "Saint-Tropez",
    description: "A small, unusual museum in the centre of Saint-Tropez combining butterfly collections, Dany Lartigue's studio and family photographs.",
    priceLevel: 1,
    bestFor: ["A short cultural stop", "Families", "Hot afternoons", "Curious first-time visitors"],
    notIdealFor: ["Travellers looking for a major museum", "Very tight port-only itineraries"],
    tags: ["museum", "culture", "family", "art", "saint-tropez", "butterflies"],
    goodToKnow: ["The museum is organised across six spaces including exotic and French butterfly collections, a garden and Dany Lartigue's studio.", "In 2026 the listed adult entry is €2 and admission is free for children under 12."],
    verified: false,
    featured: false,
    source: "https://www.sainttropeztourisme.com/fr/fiche/maison-des-papillons-musee-dany-lartigue-4165778/",
    openingHours: "Seasonal; 10:00–12:00 and 14:00–18:00 through 7 Oct 2026, then to 17:00",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "les-halles-saint-tropez",
    name: "Les Halles de Saint-Tropez",
    category: "eat",
    location: "Saint-Tropez",
    description: "A flexible food-hall format beside the port, mixing stands, food trucks, a brasserie and a more festive evening atmosphere.",
    priceLevel: 2,
    bestFor: ["Groups with different tastes", "Casual evenings", "Easy port-area plans", "Late aperitif"],
    notIdealFor: ["Quiet destination dining", "Travellers seeking one chef-led menu"],
    tags: ["food-hall", "casual", "groups", "nightlife", "saint-tropez", "port"],
    goodToKnow: ["Saint-Tropez Tourisme lists world-cuisine stands and food trucks plus a brasserie-style indoor space.", "The venue advertises a resident DJ every evening from 19:00 to 01:00 and live music on weekends."],
    verified: false,
    featured: true,
    source: "https://www.sainttropeztourisme.com/fr/fiche/les-halles-de-saint-tropez-5936300/",
    openingHours: "Daily 1 Apr–31 Oct 2026; reduced winter opening",
    lastVerifiedAt: "2026-10-02",
  },
  {
    id: "spa-du-bailli",
    name: "Le Spa du Bailli",
    category: "wellness",
    location: "Rayol-Canadel-sur-Mer",
    description: "A sea-facing wellness stop at Le Bailli de Suffren, built around Institut Esthederm treatments and massages rather than a large resort-spa day.",
    priceLevel: 3,
    bestFor: ["Couples", "Recovery day", "Sea-view massage", "Rayol stays"],
    notIdealFor: ["Large group spa days", "Travellers wanting full pool access without staying at the hotel"],
    tags: ["spa", "massage", "wellness", "rayol", "sea-view", "esthederm"],
    goodToKnow: ["The tourism office describes treatment cabins facing the Mediterranean and lists nearby parking.", "The hotel's FAQ says the spa operates May to October, daily 10:00–12:00 and 14:00–20:00."],
    verified: false,
    featured: false,
    website: "https://www.lebaillidesuffren.com/espace-bien-etre-esthederm-bailli-de-suffren/",
    source: "https://www.golfe-sainttropez-tourisme.fr/fiche-apidae/le-spa-du-bailli-2/",
    openingHours: "May–October, daily 10:00–12:00 and 14:00–20:00",
    lastVerifiedAt: "2026-10-02",
  },

];

export function getCategory(id: string) {
  return placeCategories.find((category) => category.id === id);
}


export const placeDescriptionFr: Record<string, string> = {
  "moulin-de-paillas": "Découvrez le Moulin de Paillas sur les hauteurs de Ramatuelle : panorama, accès et conseils pour préparer la visite du moulin restauré.",
  "cap-taillat": "Préparez votre balade au Cap Taillat entre Ramatuelle et La Croix-Valmer : départ de l’Escalet, sentier littoral et conseils avant de partir.",
  "pont-des-fees": "Découvrez le Pont des Fées à Grimaud : ancien aqueduc, balade depuis le moulin Saint-Roch et conseils pour parcourir le vallon de la Garde.",

"cogolin-village":"Des ruelles qui montent, des savoir-faire à découvrir et un autre visage du Golfe. Cogolin se choisit pour une promenade au vieux village, une rencontre avec l’artisanat ou une étape entre les communes voisines.",
"la-croix-valmer-village":"Un village en retrait de la mer, des vignobles et des plages pour prendre le large. La Croix-Valmer donne plusieurs directions au séjour : Gigaro, le Débarquement ou une promenade préparée sur le littoral.",
"rayol-canadel-village":"Des jardins, des plages et un village accroché au relief. Rayol-Canadel se découvre en alternant le Domaine du Rayol, une pause au bord de l’eau et les perspectives de la corniche.",

"sainte-maxime-village":"Un port, une vieille ville et la mer tout près. Sainte-Maxime se choisit pour des vacances qui passent facilement d’une promenade au centre à une pause sur le sable.",
"cavalaire-village":"Le port, une grande plage et Bonporteau pour changer de paysage. Cavalaire regarde vers la mer et convient à ceux qui veulent lui donner la première place dans leurs vacances.",
"la-mole-village":"Un village dans la vallée, une église et les paysages boisés des Maures. La Môle propose une autre entrée dans le Golfe : davantage de relief et de nature, avec le littoral à rejoindre en voiture.",

  "monroes-pub": "Un pub irlandais décontracté près de Port Grimaud, utile pour le sport, le karaoké et une soirée simple sans logistique tropézienne.",
  "gaio-club": "Un dîner qui glisse vers le live puis le club, au-dessus du port de Saint-Tropez, pour une soirée pensée pour durer tard.",
  "caves-du-roy": "Le club mythique de Saint-Tropez : une adresse à choisir pour la nuit elle-même, plus que pour découvrir un nouveau concept.",
  "opera-saint-tropez": "Un dîner-show face au port où restaurant, scène et club se mélangent dans une même soirée.",
  "gigaro-beach": "Une grande plage naturelle à La Croix-Valmer, porte d'entrée du Cap Lardier et excellente base pour combiner baignade et sentier littoral.",
  "maison-des-papillons": "Un petit musée singulier au cœur de Saint-Tropez, entre collections de papillons, atelier de Dany Lartigue et photographies familiales.",
  "les-halles-saint-tropez": "Une adresse facile près du port où stands, food trucks, brasserie et musique permettent de gérer simplement un groupe ou une soirée improvisée.",
  "spa-du-bailli": "Un spa face à la Méditerranée au Rayol-Canadel, particulièrement intéressant pour intégrer un vrai temps de récupération à un séjour côtier.",
  "la-vague-dor": "Un dîner d'exception au Cheval Blanc Saint-Tropez, pensé comme une expérience gastronomique complète plutôt qu'une sortie improvisée.",
  "la-voile": "Une table méditerranéenne raffinée dominant la côte à La Réserve Ramatuelle, adaptée à ceux qui recherchent une ambiance élégante et plus calme que Pampelonne.",
  "bello-visto": "Une terrasse de village avec une large vue sur le Golfe, entre cuisine méditerranéenne et rythme paisible du vieux Gassin.",
  "la-verdoyante": "Une table provençale sur les hauteurs de Gassin, entourée de vignes et ouverte sur le paysage du Golfe.",
  "byblos-beach": "Une adresse de plage à Pampelonne pour associer déjeuner, mer et atmosphère Saint-Tropez dans une même journée.",
  "ramatuelle-village": "Un village perché entre vignobles et littoral, utile pour comprendre la partie sud du Golfe au-delà de Pampelonne.",
  "gassin-village": "Un village médiéval perché avec de grands panoramas sur le Golfe, à découvrir pour ses ruelles et son rythme plus calme.",
  "grimaud-village": "Un village médiéval dominé par les ruines de son château, avec des ruelles provençales et une position très centrale dans le Golfe.",
  "pampelonne": "La plage emblématique de Ramatuelle : longue, multiple, animée par endroits et suffisamment vaste pour offrir des expériences très différentes selon le secteur.",
  "escalet": "Une plage et un littoral plus naturels à Ramatuelle, appréciés pour la baignade, les rochers et une ambiance moins mondaine.",
  "place-des-lices": "La place centrale de Saint-Tropez, connue pour son marché et son rôle de point de rencontre au cœur du village.",
  "chateau-minuty": "Un domaine viticole de Gassin associé aux vins de Provence, intéressant pour relier le séjour au paysage viticole local.",
  "citadelle-saint-tropez": "La citadelle dominant Saint-Tropez, à la fois point de vue, patrimoine et porte d'entrée vers l'histoire maritime locale.",
  "saint-tropez-village": "Le cœur historique et social du Golfe : port, ruelles, marché, restaurants et vie nocturne concentrés dans un petit périmètre.",
  "club-55": "Une institution de Pampelonne où le déjeuner fait partie de l'expérience de plage et de l'imaginaire historique de Saint-Tropez.",
  "indie-beach": "Un beach club contemporain à Pampelonne pensé pour une journée qui peut glisser du déjeuner vers une ambiance plus festive.",
  "casita-pampelonne": "Une adresse de plage à Pampelonne pour combiner table, transats et journée au bord de l'eau.",
  "bateaux-verts-excursion": "Des liaisons et excursions maritimes permettant de découvrir le Golfe depuis l'eau et de relier plusieurs points du littoral.",
  "caseneuve-catamaran": "Des sorties en catamaran pour vivre le littoral en groupe, avec une expérience davantage tournée vers la journée en mer.",
  "domaine-rayol-kids": "Un jardin méditerranéen remarquable au Rayol, pertinent pour une sortie nature en famille hors de l'agitation de Saint-Tropez.",
  "master-ninja-cogolin": "Une activité ludique et physique à Cogolin, utile comme alternative pour les enfants et adolescents quand la plage n'est pas le programme.",
  "cecile-golmard-chef": "Une option de chef à domicile pour transformer un dîner à la villa en expérience sans déplacer le groupe.",
  "taxi-estelle": "Un service de transport local à considérer pour les transferts et déplacements privés dans le Golfe.",
  "maison-laurent-conciergerie": "Un service de conciergerie local pour accompagner certains besoins pratiques autour d'un séjour dans le Golfe.",
  "plan-de-la-tour-village": "Un village en retrait de la côte, entouré de collines boisées et de hameaux — assez près du Golfe pour en profiter, assez loin pour rester au calme."
};
