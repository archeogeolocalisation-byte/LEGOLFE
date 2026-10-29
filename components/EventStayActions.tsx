"use client";
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {formatCalendarDay,sessionAnchor} from '../lib/agendaCalendar';
import {parisIsoDay} from '../lib/localCalendar';
import {SAVED_EVENTS_KEY,SAVED_EVENTS_EVENT,parseSavedEvents,savedEventKey,type SavedEvent} from '../lib/savedEvents';
import type {Locale} from '../lib/i18n';

export default function EventStayActions({locale,event}:{locale:Locale;event?:SavedEvent}){
 const fr=locale==='fr';
 const [items,setItems]=useState<SavedEvent[]>([]);
 const [ready,setReady]=useState(false);
 const [error,setError]=useState('');
 const [today,setToday]=useState('');
 useEffect(()=>{
  const refresh=()=>{try{setItems(parseSavedEvents(localStorage.getItem(SAVED_EVENTS_KEY)));setToday(parisIsoDay());setError('');}catch{setError(fr?'Impossible de lire vos rendez-vous sur cet appareil.':'Unable to read saved events on this device.');}setReady(true);};
  refresh();const timer=setInterval(()=>setToday(parisIsoDay()),60_000);
  window.addEventListener('storage',refresh);window.addEventListener(SAVED_EVENTS_EVENT,refresh);
  return()=>{clearInterval(timer);window.removeEventListener('storage',refresh);window.removeEventListener(SAVED_EVENTS_EVENT,refresh);};
 },[fr]);
 function update(event:SavedEvent){
  try{
   const current=parseSavedEvents(localStorage.getItem(SAVED_EVENTS_KEY));
   const exists=current.some(e=>savedEventKey(e)===savedEventKey(event));
   if(!exists&&current.length>=50){setError(fr?'Votre sélection contient déjà 50 séances. Retirez une séance pour en ajouter une autre.':'Your selection already contains 50 sessions. Remove one to add another.');return;}
   const next=exists?current.filter(e=>savedEventKey(e)!==savedEventKey(event)):[...current,event];
   localStorage.setItem(SAVED_EVENTS_KEY,JSON.stringify(next));setItems(next);setError('');window.dispatchEvent(new Event(SAVED_EVENTS_EVENT));
  }catch{setError(fr?'Modification non enregistrée sur cet appareil.':'Change could not be saved on this device.');}
 }
 if(event){
  const selected=items.some(e=>savedEventKey(e)===savedEventKey(event));
  return <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
   <button type="button" disabled={!ready||!!today&&(event.session.end||event.session.start)<today} aria-pressed={selected} onClick={()=>update(event)} className="lg-btn disabled:opacity-50">{selected?(fr?'Séance enregistrée ✓':'Session saved ✓'):(fr?'Ajouter à mon séjour':'Add to my stay')}</button>
   {selected&&<Link className="inline-flex min-h-11 items-center underline underline-offset-4" href={`/${locale}/saved#mes-rendez-vous`}>{fr?'Retrouver dans Mon séjour':'View in My stay'} →</Link>}
   {error&&<p role="alert">{error}</p>}
  </div>;
 }
 const sorted=[...items].sort((a,b)=>a.session.start.localeCompare(b.session.start)||(a.session.time||'').localeCompare(b.session.time||''));
 const upcoming=sorted.filter(e=>(e.session.end||e.session.start)>=today),past=sorted.filter(e=>(e.session.end||e.session.start)<today);
 const card=(e:SavedEvent)=><li key={savedEventKey(e)} className="min-w-0 border border-white/30 p-5">
  <p className="text-sm font-bold text-[#b9e9f4]">{formatCalendarDay(e.session.start,locale,true)}{e.session.end&&e.session.end!==e.session.start?` — ${formatCalendarDay(e.session.end,locale,true)}`:''}{e.session.time?` · ${e.session.time}${e.session.endTime?`–${e.session.endTime}`:''}`:''}{e.session.version?` · ${e.session.version}`:''}</p>
  <Link href={`/${locale}/event/${e.id}#${sessionAnchor(e.session)}`} className="mt-3 block break-words text-xl font-black underline underline-offset-4">{fr?e.titleFr:e.title} →</Link>
  <p className="mt-2 text-sm text-white/80">{e.venue?`${e.venue} · `:''}{e.location}</p>
  {e.streetAddress&&<p className="mt-1 text-sm text-white/80">{e.streetAddress}</p>}
  <div className="mt-4 flex flex-wrap gap-3">
   <a className="inline-flex min-h-11 items-center text-sm font-bold underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([e.venue,e.streetAddress,e.location,'France'].filter(Boolean).join(', '))}`} target="_blank" rel="noopener noreferrer">{fr?'Localiser le lieu':'Find the venue'} ↗</a>
   <button type="button" onClick={()=>update(e)} className="min-h-11 text-sm underline">{fr?'Retirer':'Remove'}</button>
  </div>
 </li>;
 return <section id="mes-rendez-vous" aria-labelledby="saved-events-title" className="mt-12 scroll-mt-24 border-t border-white/25 pt-8">
  <h2 id="saved-events-title" className="text-3xl font-black uppercase">{fr?'Mes rendez-vous':'My events'}</h2>
  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{fr?'Vos séances et leurs horaires, conservés sur ce navigateur. Consultez la fiche et la source officielle avant de partir : un programme peut changer.':'Your sessions and times, saved in this browser. Check the event page and official source before travelling: schedules can change.'}</p>
  {!ready?<p role="status" className="mt-5">{fr?'Chargement…':'Loading…'}</p>:upcoming.length?<ul className="mt-6 grid gap-3 md:grid-cols-2">{upcoming.map(card)}</ul>:<p className="mt-5 text-sm text-white/75">{fr?'Aucun rendez-vous à venir enregistré. Choisissez une séance depuis sa fiche dans l’agenda.':'No upcoming events saved. Choose a session on its event page in the calendar.'}</p>}
  {past.length>0&&<details className="mt-6"><summary className="cursor-pointer py-3 font-bold">{fr?'Rendez-vous passés':'Past events'} ({past.length})</summary><ul className="mt-4 grid gap-3 md:grid-cols-2">{past.map(card)}</ul></details>}
  <Link href={`/${locale}/whats-on`} className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-[#b9e9f4] underline">{fr?'Choisir une sortie dans l’agenda':'Find an outing in the calendar'} →</Link>
  {error&&<p role="alert" className="mt-4">{error}</p>}
 </section>;
}
