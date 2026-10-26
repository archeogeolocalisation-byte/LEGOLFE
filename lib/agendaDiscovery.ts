import type {GolfeEvent} from '../data/events';
import {addDays,eventsInWindow,firstSessionInWindow,type AgendaRange,type DateWindow} from './agendaCalendar';
export function agendaRange(value:unknown):AgendaRange {
 return ['today','tomorrow','weekend','7days','month'].includes(value as string)?value as AgendaRange:'7days';
}
// Keep category and town when proposing the next published date after an empty period.
export function nextAgendaDay(events:GolfeEvent[],window:DateWindow):string|undefined {
 if(window.to>='2099-12-31')return;
 const future={from:addDays(window.to,1),to:'2099-12-31'};
 const next=eventsInWindow(events,future)[0];
 const start=next?firstSessionInWindow(next,future)?.start:undefined;
 return start&&start<future.from?future.from:start;
}
export const agendaAlternatives=[
 {slug:'golfe-saint-tropez-quand-il-pleut',fr:'Musées et idées par temps de pluie',en:'Museums and rainy-day ideas',detailFr:'Des visites et des sorties à préparer selon les ouvertures.',detailEn:'Visits and outings to plan around opening times.'},
 {slug:'marches-golfe-saint-tropez-jours',fr:'Trouver un marché dans le Golfe',en:'Find a market around the Golfe',detailFr:'Les jours et les communes pour choisir votre prochaine balade.',detailEn:'Days and towns to help you choose your next outing.'},
] as const;
