import {isIsoDay} from './agendaCalendar';
export type StayDates={arrival:string;departure:string;guests:string};
export function validateStayDates(value:StayDates,capacity:number,today:string,locale:'fr'|'en'='fr'){
 const fr=locale==='fr';
 if(!isIsoDay(value.arrival)||!isIsoDay(value.departure))return fr?"Choisissez vos dates d’arrivée et de départ.":"Choose your arrival and departure dates.";
 if(value.arrival<today)return fr?"La date d’arrivée doit être aujourd’hui ou une date à venir.":"Arrival must be today or a future date.";
 if(value.departure<=value.arrival)return fr?"Le départ doit être après l’arrivée.":"Departure must be after arrival.";
 const guests=Number(value.guests);if(!Number.isInteger(guests)||guests<1||guests>capacity)return fr?`Cette maison accueille de 1 à ${capacity} voyageurs.`:`This house accommodates 1 to ${capacity} guests.`;
 return '';
}
export function stayNights(arrival:string,departure:string){if(!isIsoDay(arrival)||!isIsoDay(departure)||departure<=arrival)return 0;return Math.round((Date.parse(departure+'T12:00:00Z')-Date.parse(arrival+'T12:00:00Z'))/86400000);}
export function requestSummary(villa:{name:string;location:string},form:StayDates&{name:string;email:string;phone:string;message:string},locale:'fr'|'en'='fr'){if(locale==='en')return `${villa.name} — ${villa.location}\nArrival: ${form.arrival}\nDeparture: ${form.departure}\n${stayNights(form.arrival,form.departure)} night(s) · ${form.guests} guest(s)\n\n${form.name}\n${form.email}${form.phone?'\n'+form.phone:''}\n\n${form.message}`;return `${villa.name} — ${villa.location}\nArrivée : ${form.arrival}\nDépart : ${form.departure}\n${stayNights(form.arrival,form.departure)} nuit(s) · ${form.guests} voyageur(s)\n\n${form.name}\n${form.email}${form.phone?'\n'+form.phone:''}\n\n${form.message}`;}
