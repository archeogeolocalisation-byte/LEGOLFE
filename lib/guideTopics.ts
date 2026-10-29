import type {Guide} from '../data/guides';
export const guideTopics=[
 {id:'walks',fr:'Balades & randonnées',en:'Walks & hikes'},
 {id:'beaches',fr:'Plages & criques',en:'Beaches & coves'},
 {id:'family',fr:'En famille',en:'With children'},
 {id:'villages',fr:'Villages & patrimoine',en:'Villages & heritage'},
 {id:'food',fr:'Saveurs & marchés',en:'Food & markets'},
 {id:'budget',fr:'Petit budget',en:'On a budget'},
 {id:'season',fr:'Hors saison & météo',en:'Off season & weather'},
 {id:'stay',fr:'Préparer son séjour',en:'Plan your stay'},
] as const;
export type GuideTopic=typeof guideTopics[number]['id'];
const topics:Record<string,GuideTopic[]>={
 'journee-verdon-lac-sainte-croix-depuis-golfe':['walks'],
 'champignons-golfe-saint-tropez-saison-forets':['walks','season'],
 'marches-golfe-saint-tropez-jours':['food','budget'],
 'activites-gratuites-golfe-saint-tropez':['budget','villages','beaches','family'],
 'golfe-saint-tropez-avec-enfants':['family'],
 'week-end-automne-golfe-saint-tropez':['season','villages'],
 'golfe-saint-tropez-quand-il-pleut':['season','family'],
 'pampelonne-acces-parking-plage':['beaches'],
 'ramatuelle-a-pied':['villages','walks'],
 'saint-tropez-sans-voiture':['stay'],
 'ou-dormir-golfe-saint-tropez':['stay'],
};
export function topicsForGuide(guide:Pick<Guide,'slug'>):GuideTopic[]{return topics[guide.slug]??(guide.slug.startsWith('randonnee-')?['walks']:['stay']);}
