import {isIsoDay} from './agendaCalendar';
export type StayDates={arrival:string;departure:string;guests:string};
export function validateStayDates(value:StayDates,capacity:number,today:string){
 if(!isIsoDay(value.arrival)||!isIsoDay(value.departure))return 'Choisissez vos dates d’arrivée et de départ.';
 if(value.arrival<today)return 'La date d’arrivée doit être aujourd’hui ou une date à venir.';
 if(value.departure<=value.arrival)return 'Le départ doit être après l’arrivée.';
 const guests=Number(value.guests);if(!Number.isInteger(guests)||guests<1||guests>capacity)return `Cette maison accueille de 1 à ${capacity} voyageurs.`;
 return '';
}
export function stayNights(arrival:string,departure:string){if(!isIsoDay(arrival)||!isIsoDay(departure)||departure<=arrival)return 0;return Math.round((Date.parse(departure+'T12:00:00Z')-Date.parse(arrival+'T12:00:00Z'))/86400000);}
export function requestSummary(villa:{name:string;location:string},form:StayDates&{name:string;email:string;phone:string;message:string}){return `${villa.name} — ${villa.location}\nArrivée : ${form.arrival}\nDépart : ${form.departure}\n${stayNights(form.arrival,form.departure)} nuit(s) · ${form.guests} voyageur(s)\n\n${form.name}\n${form.email}${form.phone?'\n'+form.phone:''}\n\n${form.message}`;}
