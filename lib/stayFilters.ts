import {matchesStayBudget} from './stayBudgets';
import type {VillaCollection} from './villaCollections';
import {calendarAllows,type VillaCalendar} from './villaAvailability';
export type StayVilla={collection?:VillaCollection;collectionReasons?:{fr:string;en:string};id:string;name:string;location:string;image:string;saintTropezDistance?:number;description:string;descriptionEn?:string;guests:number;bedrooms:number;pool:boolean;price:number;amenities:string[]};
export type StayFilters={collection?:string;location:string;guests:string;bedrooms:string;budget:string;amenities:string[];arrival:string;departure:string};
export const emptyStayFilters:StayFilters={collection:'',location:'',guests:'',bedrooms:'',budget:'',amenities:[],arrival:'',departure:''};
export {amenityOptions as stayAmenityOptions} from './villaAmenities';
export function filterStayVillas(villas:StayVilla[],filters:StayFilters,calendars:Record<string,VillaCalendar>={}):StayVilla[]{return villas.filter(v=>(!filters.location||v.location===filters.location)&&(!filters.guests||v.guests>=Number(filters.guests))&&(!filters.bedrooms||v.bedrooms>=Number(filters.bedrooms))&&matchesStayBudget(v.price,filters.budget)&&(!filters.collection||(v.collection||'homes')===filters.collection)&&filters.amenities.every(a=>v.amenities.includes(a))&&(!(filters.arrival&&filters.departure)||calendarAllows(calendars[v.id],filters.arrival,filters.departure)));}

// Missing prices stay at the end in both price directions. Never mutate the catalog.
export function sortStayVillas(villas:StayVilla[],order:string):StayVilla[]{
 if(order==='capacity')return [...villas].sort((a,b)=>b.guests-a.guests);
 if(order!=='price-asc'&&order!=='price-desc')return villas;
 return [...villas].sort((a,b)=>{
  if(!a.price||!b.price)return (a.price?0:1)-(b.price?0:1);
  return order==='price-asc'?a.price-b.price:b.price-a.price;
 });
}
