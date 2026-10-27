import {matchesStayBudget} from './stayBudgets';
import type {VillaCollection} from './villaCollections';
import {calendarAllows,type VillaCalendar} from './villaAvailability';
export type StayVilla={collection?:VillaCollection;collectionReasons?:{fr:string;en:string};id:string;name:string;location:string;image:string;saintTropezDistance?:number;description:string;descriptionEn?:string;guests:number;bedrooms:number;pool:boolean;price:number;amenities:string[]};
export type StayFilters={collection?:string;location:string;guests:string;bedrooms:string;budget:string;amenities:string[];arrival:string;departure:string};
export const emptyStayFilters:StayFilters={collection:'',location:'',guests:'',bedrooms:'',budget:'',amenities:[],arrival:'',departure:''};
export {amenityOptions as stayAmenityOptions} from './villaAmenities';
export function filterStayVillas(villas:StayVilla[],filters:StayFilters,calendars:Record<string,VillaCalendar>={}):StayVilla[]{return villas.filter(v=>(!filters.location||v.location===filters.location)&&(!filters.guests||v.guests>=Number(filters.guests))&&(!filters.bedrooms||v.bedrooms>=Number(filters.bedrooms))&&matchesStayBudget(v.price,filters.budget)&&(!filters.collection||(v.collection||'homes')===filters.collection)&&filters.amenities.every(a=>v.amenities.includes(a))&&(!(filters.arrival&&filters.departure)||calendarAllows(calendars[v.id],filters.arrival,filters.departure)));}
