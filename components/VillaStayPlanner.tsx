'use client';

import {useEffect,useState} from 'react';
import {addDays,formatCalendarMonth,isIsoDay,monthWindow} from '../lib/agendaCalendar';
import {datesBlocked,type VillaCalendar} from '../lib/villaAvailability';
import {loadVillaCalendar} from '../lib/villaCalendarStore';
import {villaHref} from '../lib/villaPaths';
import {parisIsoDay} from '../lib/localCalendar';
import {stayNights,validateStayDates} from '../lib/stayRequest';
import type {Locale} from '../lib/i18n';

export default function VillaStayPlanner({id,guests,today,locale}:{id:string;guests:number;today:string;locale:Locale}){
 const fr=locale==='fr',t=(a:string,b:string)=>fr?a:b;
 const [calendar,setCalendar]=useState<VillaCalendar|null>(null);
 const [state,setState]=useState<'loading'|'ready'|'unavailable'>('loading');
 const [month,setMonth]=useState(today.slice(0,7));
 const [dates,setDates]=useState({arrival:'',departure:'',guests:String(Math.min(2,guests))});
 const [error,setError]=useState('');
 useEffect(()=>{
  let active=true;
  loadVillaCalendar(id).then(value=>{if(active){setCalendar(value);setState('ready');}}).catch(()=>{if(active)setState('unavailable');});
  return()=>{active=false;};
 },[id]);
 const published=state==='ready'&&calendar?.enabled;
 const blocked=datesBlocked(calendar,dates.arrival,dates.departure);
 const nights=stayNights(dates.arrival,dates.departure);
 const range=monthWindow(month)!;
 const offset=(new Date(range.from+'T12:00:00Z').getUTCDay()+6)%7;
 const count=Number(range.to.slice(-2));
 function moveMonth(by:number){const d=new Date(range.from+'T12:00:00Z');d.setUTCMonth(d.getUTCMonth()+by);setMonth(d.toISOString().slice(0,7));}
 function update(field:keyof typeof dates,value:string){if(field==='arrival'&&isIsoDay(value))setMonth(value.slice(0,7));setDates(current=>({...current,[field]:value,...(field==='arrival'&&current.departure<=value?{departure:''}:{})}));setError('');}
 return <section id="disponibilites" className="scroll-mt-8 border-t border-black py-10" aria-labelledby="stay-planner-title">
  <p className="lg-kicker text-[var(--lg-blue)]">{t('DISPONIBILITÉS & TARIFS','AVAILABILITY & RATES')}</p>
  <h2 id="stay-planner-title" className="mt-4 text-3xl font-black tracking-[-.04em]">{t('À quelles dates venez-vous ?','When would you like to stay?')}</h2>
  <p className="mt-4 text-sm leading-7 text-black/65" role="status">{state==='loading'?t('Chargement du calendrier…','Loading calendar…'):published?t('Calendrier renseigné par l’annonceur. Les dates sans blocage restent à confirmer avec lui.','Calendar supplied by the advertiser. Dates without a block still need their confirmation.'):t('Disponibilités à confirmer. Indiquez vos dates pour recevoir une réponse de l’annonceur.','Availability to be confirmed. Enter your dates to hear back from the advertiser.')}</p>
  {published&&<div className="mt-6 rounded-2xl border border-black/15 p-4 sm:p-6">
   <div className="flex items-center justify-between gap-3"><h3 className="font-bold capitalize" aria-live="polite">{formatCalendarMonth(month,locale)}</h3><div className="flex gap-2"><button type="button" disabled={month<=today.slice(0,7)} onClick={()=>moveMonth(-1)} aria-label={t('Mois précédent','Previous month')} className="h-11 w-11 rounded-full border border-black/20 disabled:opacity-30">←</button><button type="button" disabled={month>='2099-12'} onClick={()=>moveMonth(1)} aria-label={t('Mois suivant','Next month')} className="h-11 w-11 rounded-full border border-black/20 disabled:opacity-30">→</button></div></div>
   <div className="mt-5 grid grid-cols-7 gap-1 text-center text-sm" role="table" aria-label={formatCalendarMonth(month,locale)}>
    <div role="row" className="contents">{(fr?['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).map(day=><span key={day} role="columnheader" className="pb-2 text-xs font-semibold text-black/60">{day}</span>)}</div>
    {Array.from({length:Math.ceil((offset+count)/7)},(_,week)=><div role="row" className="contents" key={week}>{Array.from({length:7},(_,weekday)=>{
     const day=week*7+weekday-offset+1;
     if(day<1||day>count)return <span role="cell" key={weekday}/>;
     const date=`${month}-${String(day).padStart(2,'0')}`,past=date<today;
     const unavailable=datesBlocked(calendar,date,addDays(date,1));
     const selected=!past&&nights>0&&date>=dates.arrival&&date<dates.departure;
     const label=past?t('Date passée','Past date'):unavailable?t('Nuit indisponible','Unavailable night'):t('À confirmer','To be confirmed');
     return <span key={weekday} role="cell" aria-label={`${date} · ${label}`} className={`flex min-h-10 items-center justify-center rounded-md ${past?'text-black/25':unavailable?'bg-black/10 text-black/50 line-through':selected?'bg-[var(--lg-blue)] text-white':'border border-black/10'}`}>{day}</span>;
    })}</div>)}
   </div>
   <p className="mt-4 text-xs leading-6 text-black/60">{t('Dates barrées : nuits indisponibles · Autres dates : à confirmer. Le jour de départ peut être une nuit indisponible.','Crossed-out dates: unavailable nights · Other dates: to be confirmed. Checkout can fall on an unavailable night.')}</p>
  </div>}
  <form action={villaHref(id,locale,true)} method="get" className="mt-7 rounded-2xl bg-[#f5f5f3] p-5 sm:p-6" onSubmit={event=>{
   const invalid=validateStayDates(dates,guests,parisIsoDay(),locale);
   if(invalid||blocked){event.preventDefault();setError(invalid||t('Cette période comprend des nuits indisponibles. Choisissez d’autres dates.','This period includes unavailable nights. Choose other dates.'));}
  }}>
   <div className="grid gap-4 sm:grid-cols-2">
    <label className="min-w-0 text-xs font-bold">{t('Arrivée','Arrival')}<input required className="field mt-2 min-w-0" name="arrival" type="date" min={today} value={dates.arrival} onChange={e=>update('arrival',e.target.value)}/></label>
    <label className="min-w-0 text-xs font-bold">{t('Départ','Departure')}<input required className="field mt-2 min-w-0" name="departure" type="date" min={dates.arrival?addDays(dates.arrival,1):addDays(today,1)} value={dates.departure} onChange={e=>update('departure',e.target.value)}/></label>
   </div>
   <label className="mt-4 block text-xs font-bold">{t('Voyageurs','Guests')}<select className="field mt-2" name="guests" value={dates.guests} onChange={e=>update('guests',e.target.value)}>{Array.from({length:guests},(_,i)=><option key={i} value={i+1}>{i+1} {i===0?t('voyageur','guest'):t('voyageurs','guests')}</option>)}</select></label>
   {nights>0&&<p className="mt-4 text-sm font-bold" aria-live="polite">{nights} {nights===1?t('nuit','night'):t('nuits','nights')} · {dates.guests} {t('voyageur(s)','guest(s)')}</p>}
   <p className="mt-4 text-sm leading-6 text-black/65">{t('Le prix de votre séjour sera confirmé sur devis, selon la période et la durée. Demandez le détail des prestations, frais et conditions.','Your stay will be priced by quote, according to season and duration. Ask for details of services, fees and terms.')}</p>
   {(blocked||error)&&<p role="alert" className="mt-4 text-sm font-semibold text-red-800">{error||t('Cette période comprend des nuits indisponibles. Choisissez d’autres dates.','This period includes unavailable nights. Choose other dates.')}</p>}
   <button disabled={state==='loading'||blocked} className="lg-btn mt-5 w-full border-[var(--lg-blue)] bg-[var(--lg-blue)] text-white disabled:opacity-50">{t('Demander un devis','Request a quote')} →</button>
   <p className="mt-3 text-xs leading-6 text-black/60">{t('Vous pourrez compléter et relire votre demande avant l’envoi. Aucune réservation à cette étape.','You can complete and review your enquiry before sending. No booking is made at this stage.')}</p>
  </form>
 </section>;
}
