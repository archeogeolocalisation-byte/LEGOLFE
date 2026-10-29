'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import type {Place} from '../data/places';
import {destinations} from '../data/destinations';
import {placeName} from '../lib/placeNames';
import type {Locale} from '../lib/i18n';
import {placeMapPoints} from '../data/placeMapPoints';
import {pointDirectionsUrl,placeSearchUrl} from '../lib/placeMapLinks';
import {formatCalendarDay,sessionAnchor} from '../lib/agendaCalendar';
import {parisIsoDay} from '../lib/localCalendar';
import {parseSavedEvents,savedEventKey,SAVED_EVENTS_EVENT,SAVED_EVENTS_KEY,type SavedEvent} from '../lib/savedEvents';
import {STAY_PLAN_KEY,STAY_SETTINGS_KEY,STAY_PLAN_EVENT,periods,parseStayItems,parseStaySettings,stayDate,dayForDate,stayEventsOnDay,stayEventClashes,placePeriod,addStayItem,reorderStayItem,type StayItem,type StayPeriod,type StaySettings} from '../lib/stayItinerary';
import DiscoveryMap from './DiscoveryMap';
import {villaHref} from '../lib/villaPaths';
type StayBase={id:string;name:string;location:string};
const empty:StaySettings={version:1,startDate:'',days:3,town:'',baseId:''};
export default function StayPlanner({places,villas,locale}:{places:Place[];villas:StayBase[];locale:Locale}){
 const fr=locale==='fr';
 const [plan,setPlan]=useState<StayItem[]>([]),[settings,setSettings]=useState<StaySettings>(empty),[draft,setDraft]=useState<StaySettings>(empty);
 const [events,setEvents]=useState<SavedEvent[]>([]),[day,setDay]=useState(1),[today,setToday]=useState('');
 const [ready,setReady]=useState(false),[readError,setReadError]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState(''),[showMap,setShowMap]=useState(false);
 useEffect(()=>{
  function refresh(event?:Event){
   try{
    const items=parseStayItems(localStorage.getItem(STAY_PLAN_KEY));
    const config=parseStaySettings(localStorage.getItem(STAY_SETTINGS_KEY),Math.max(1,...items.map(item=>item.day)),localStorage.getItem('le-golfe-stay-base-v1')||'');
    setPlan(items);setSettings(config);if(!event||event.type==='storage')setDraft(config);setReadError(false);
   }catch{setReadError(true);}
   try{setEvents(parseSavedEvents(localStorage.getItem(SAVED_EVENTS_KEY)));}catch{setError(fr?'Impossible de lire les rendez-vous sur cet appareil.':'Unable to read events on this device.');}
   setToday(parisIsoDay());setReady(true);
  }
  refresh();const tick=setInterval(()=>setToday(parisIsoDay()),60_000);
  window.addEventListener('storage',refresh);window.addEventListener(STAY_PLAN_EVENT,refresh);window.addEventListener(SAVED_EVENTS_EVENT,refresh);
  return()=>{clearInterval(tick);window.removeEventListener('storage',refresh);window.removeEventListener(STAY_PLAN_EVENT,refresh);window.removeEventListener(SAVED_EVENTS_EVENT,refresh);};
 },[fr]);
 const activeDay=Math.min(day,settings.days),date=stayDate(settings,activeDay),todayDay=dayForDate(settings,today);
 const labels:Record<StayPeriod,string>=fr?{morning:'Matin',lunch:'Déjeuner',afternoon:'Après-midi',evening:'Soir'}:{morning:'Morning',lunch:'Lunch',afternoon:'Afternoon',evening:'Evening'};
 const lookup=new Map(places.map(place=>[place.id,place]));
 const dayItems=plan.filter(item=>item.day===activeDay&&lookup.has(item.id));
 const unplanned=places.filter(place=>!plan.some(item=>item.id===place.id));
 const dayEvents=stayEventsOnDay(events,date),clashes=stayEventClashes(events,date);
 const lastDate=stayDate(settings,settings.days),outsideEvents=settings.startDate&&lastDate?events.filter(event=>(event.session.end||event.session.start)<settings.startDate||event.session.start>lastDate).length:0;
 const hiddenStops=plan.filter(item=>!lookup.has(item.id)).length;
 const towns=[...new Set([...dayItems.map(item=>lookup.get(item.id)!.location.split('·')[0].trim()),...dayEvents.map(event=>event.location.split('·')[0].trim())])];
 const mapPlaces=dayItems.flatMap(item=>{const place=lookup.get(item.id)!,point=placeMapPoints[item.id]?.[0];return point?[{id:place.id,name:placeName(place,locale),location:place.location,category:place.category,lat:point.latitude,lon:point.longitude,kind:point.kind}]:[];});
 function savePlan(next:StayItem[]){
  if(readError)return;
  try{localStorage.setItem(STAY_PLAN_KEY,JSON.stringify(next));setPlan(next);setError('');setNotice(fr?'Programme enregistré sur cet appareil.':'Plan saved on this device.');window.dispatchEvent(new Event(STAY_PLAN_EVENT));}
  catch{setError(fr?'Modification non enregistrée. Votre programme précédent est conservé.':'Change not saved. Your previous plan is preserved.');}
 }
 function applySettings(){
  if(readError)return;
  if(!Number.isInteger(draft.days)||draft.days<1||draft.days>14){setError(fr?'Choisissez entre 1 et 14 jours.':'Choose between 1 and 14 days.');return;}
  if(plan.some(item=>item.day>draft.days)){setError(fr?'Déplacez les étapes des derniers jours avant de raccourcir le séjour.':'Move stops from later days before shortening the stay.');return;}
  try{parseStaySettings(JSON.stringify(draft));localStorage.setItem(STAY_SETTINGS_KEY,JSON.stringify(draft));setSettings(draft);setDay(Math.min(activeDay,draft.days));setError('');setNotice(fr?'Repères du séjour enregistrés.':'Stay details saved.');window.dispatchEvent(new Event(STAY_PLAN_EVENT));}
  catch{setError(fr?'Repères non enregistrés. Vérifiez la date et le stockage de cet appareil.':'Details not saved. Check the date and device storage.');}
 }
 function move(id:string,patch:Partial<StayItem>){savePlan(plan.map(item=>item.id===id?{...item,...patch}:item));}
 const eventTitle=(event:SavedEvent)=>fr?event.titleFr:event.title;
 const base=villas.find(villa=>villa.id===settings.baseId);
 return <section id="mon-programme" className="trip-planner scroll-mt-8" aria-labelledby="trip-title">
  <div className="trip-heading"><div><p className="lg-kicker">{fr?"MES JOURNÉES DANS LE GOLFE":"MY DAYS IN THE GOLFE"}</p><h2 id="trip-title">{fr?'Un séjour à votre rythme.':'Your stay, your pace.'}</h2><p>{fr?'Placez vos envies, gardez des pauses et retrouvez vos rendez-vous à leur date.':'Arrange your favourites, leave room for breaks and find your events on their dates.'}</p></div><Link className="lg-btn" href={`/${locale}/guides`}>{fr?'Trouver des idées':'Find ideas'} ↗</Link></div>
  {!ready?<p role="status">{fr?'Chargement du programme…':'Loading your plan…'}</p>:<>
   {readError&&<p role="alert" className="trip-warning">{fr?'Le programme enregistré est illisible ou le stockage est indisponible. Aucune donnée n’a été remplacée. Réessayez après avoir vérifié ce navigateur.':'The saved plan could not be read or storage is unavailable. No data has been replaced. Try again after checking this browser.'}</p>}
   <details className="trip-settings" open={!settings.startDate}><summary>{fr?'Dates & point de départ':'Dates & starting point'} {settings.startDate&&`· ${formatCalendarDay(settings.startDate,locale,true)}`}</summary><form onSubmit={e=>{e.preventDefault();applySettings();}}>
    <label>{fr?'Premier jour (facultatif)':'First day (optional)'}<input type="date" value={draft.startDate} onChange={e=>setDraft({...draft,startDate:e.target.value})}/></label>
    <label>{fr?'Jours de programme':'Days to plan'}<select value={draft.days} onChange={e=>setDraft({...draft,days:Number(e.target.value)})}>{Array.from({length:14},(_,index)=><option key={index+1} value={index+1}>{index+1}</option>)}</select></label>
    <label>{fr?'Commune de départ (facultative)':'Starting town (optional)'}<select value={draft.town} onChange={e=>setDraft({...draft,town:e.target.value})}><option value="">{fr?'À préciser':'Not specified'}</option>{destinations.map(town=><option key={town.slug} value={town.name}>{town.name}</option>)}</select></label>
    {villas.length>0&&<label>{fr?'Maison repère (facultative)':'Home base (optional)'}<select value={draft.baseId} onChange={e=>setDraft({...draft,baseId:e.target.value})}><option value="">{fr?'Sans maison repère':'No home base'}</option>{villas.map(villa=><option key={villa.id} value={villa.id}>{villa.name}</option>)}</select></label>}
    <button disabled={readError} className="lg-btn lg-btn--accent" type="submit">{fr?'Enregistrer ces repères':'Save these details'}</button>
    <p>{fr?'Sans date, organisez simplement Jour 1, Jour 2… Les rendez-vous se rattachent aux journées lorsque les dates sont renseignées.':'Without dates, arrange Day 1, Day 2… Events appear on the matching day once dates are set.'}</p>
   </form></details>
   {(settings.town||base)&&<p className="trip-base">{fr?'Votre point de départ':'Your starting point'} : {settings.town}{base&&<> · <Link href={villaHref(base.id,locale)}>{base.name} ↗</Link></>} · {fr?'Trajets à vérifier selon votre adresse.':'Check journeys from your address.'}</p>}
   <div className="trip-days" role="group" aria-label={fr?'Choisir une journée':'Choose a day'}>{Array.from({length:settings.days},(_,index)=>{const day=index+1,date=stayDate(settings,day);return <button type="button" aria-pressed={activeDay===day} key={day} onClick={()=>setDay(day)}><strong>{fr?'Jour':'Day'} {day}</strong><span>{date?formatCalendarDay(date,locale,true):(fr?'À votre rythme':'At your pace')}</span></button>;})}</div>
   <div className="trip-day-heading"><div><p className="lg-kicker">{date===today?(fr?'AUJOURD’HUI':'TODAY'):(fr?'VOTRE JOURNÉE':'YOUR DAY')}</p><h3>{date?formatCalendarDay(date,locale):(fr?`Jour ${activeDay}`:`Day ${activeDay}`)}</h3></div><div><button type="button" className="lg-btn" disabled={!todayDay} onClick={()=>todayDay&&setDay(todayDay)}>{fr?'Aujourd’hui':'Today'}</button><button type="button" className="lg-btn" aria-expanded={showMap} onClick={()=>setShowMap(!showMap)}>{showMap?(fr?'Masquer la carte':'Hide map'):(fr?'Carte de la journée':'Day map')} ↗</button></div></div>
   {!settings.startDate&&events.length>0&&<p className="trip-info">{fr?'Ajoutez un premier jour pour afficher ici les rendez-vous aux bonnes dates.':'Set a first day to show events on their correct dates.'} <a href="#mes-rendez-vous">{fr?'Voir tous mes rendez-vous':'View all my events'} →</a></p>}
   {outsideEvents>0&&<p className="trip-info">{fr?`${outsideEvents} rendez-vous enregistré(s) en dehors des dates du séjour.`:`${outsideEvents} saved event(s) outside your stay dates.`} <a href="#mes-rendez-vous">{fr?'Les retrouver':'View them'} →</a></p>}
   {hiddenStops>0&&<div className="trip-info"><p>{fr?`${hiddenStops} étape(s) de votre ancien planning ne figurent plus dans vos adresses actuelles. Elles restent conservées dans le programme enregistré.`:`${hiddenStops} stop(s) from your previous plan are no longer in your current shortlist. They remain in the stored plan.`}</p><button type="button" className="lg-btn" disabled={readError} onClick={()=>savePlan(plan.filter(item=>lookup.has(item.id)))}>{fr?'Retirer ces étapes du planning':'Remove these stops from the plan'}</button></div>}
   {towns.length>2&&<p className="trip-warning">{fr?'Plusieurs communes dans la journée : vérifiez les déplacements et gardez une marge.':'Several towns in one day: check travel and leave extra time.'} {towns.join(' · ')}</p>}
   {dayItems.length+dayEvents.length>4&&<p className="trip-warning">{fr?'Plus de quatre étapes ou rendez-vous : pensez à garder du temps libre.':'More than four stops or events: leave room for free time.'}</p>}
   {clashes.map(([a,b])=><p key={savedEventKey(a)+'/'+savedEventKey(b)} className="trip-warning" role="status">{fr?'Horaires qui se chevauchent':'Overlapping times'} : {eventTitle(a)} / {eventTitle(b)}.</p>)}
   {showMap&&<div className="trip-map">{mapPlaces.length?<DiscoveryMap key={activeDay} locale={locale} places={mapPlaces}/>:<p>{fr?'Aucun lieu de cette journée ne possède de repère vérifié à afficher.':'No place on this day has a verified marker to display.'}</p>}<p className="trip-map-note">{fr?'Carte des lieux programmés avec repère documenté, sans tracé ni temps de trajet. Les rendez-vous se localisent depuis leur lien ci-dessous.':'Map of planned places with documented markers, without routes or travel times. Locate events using their links below.'} {dayItems.length>mapPlaces.length&&`${dayItems.length-mapPlaces.length} ${fr?'lieu(x) sans repère affiché.':'place(s) without a displayed marker.'}`}</p></div>}
   {dayEvents.length>0&&<section className="trip-events" aria-labelledby="trip-events-title"><h4 id="trip-events-title">{fr?'Rendez-vous à cette date':'Events on this date'}</h4><ul>{dayEvents.map(event=><li key={savedEventKey(event)}><p>{event.session.start===date&&event.session.time?`${event.session.time}${event.session.endTime&&(!event.session.end||event.session.end===date)?`–${event.session.endTime}`:''}`:(fr?'Sur plusieurs jours ou horaire à confirmer':'Multi-day or time to confirm')}</p><Link href={`/${locale}/event/${event.id}#${sessionAnchor(event.session)}`}>{eventTitle(event)} →</Link><span>{event.venue?`${event.venue} · `:''}{event.location}</span><a href={placeSearchUrl(event.venue||eventTitle(event),[event.streetAddress,event.location].filter(Boolean).join(', '))} target="_blank" rel="noopener noreferrer">{fr?'Localiser le rendez-vous':'Locate event'} ↗</a></li>)}</ul><p>{fr?'Les chevauchements ne sont calculés que si début et fin sont connus. Vérifiez horaires, durées et trajets sur la fiche officielle.':'Overlaps are calculated only when start and end times are known. Check times, durations and travel with the official source.'}</p></section>}
   <div className="trip-slots">{periods.map(period=>{const items=dayItems.filter(item=>item.period===period);return <section className="trip-slot" key={period} aria-label={labels[period]}><div className="trip-slot-heading"><h4>{labels[period]}</h4><span>{items.length}</span></div>{!items.length&&<p className="trip-free">{fr?'Du temps libre.':'Room to breathe.'}</p>}<ol>{items.map((item,index)=>{const place=lookup.get(item.id)!,point=placeMapPoints[item.id]?.[0];return <li key={item.id} className="trip-stop"><p>{place.location}</p><Link className="trip-stop-name" href={`/${locale}/place/${item.id}`}>{placeName(place,locale)} ↗</Link><div className="trip-stop-fields"><label><span className="sr-only">{fr?`Jour pour ${placeName(place,locale)}`:`Day for ${placeName(place,locale)}`}</span><select disabled={readError} value={item.day} onChange={e=>move(item.id,{day:Number(e.target.value)})}>{Array.from({length:settings.days},(_,i)=><option key={i+1} value={i+1}>{fr?'Jour':'Day'} {i+1}</option>)}</select></label><label><span className="sr-only">{fr?`Moment pour ${placeName(place,locale)}`:`Time of day for ${placeName(place,locale)}`}</span><select disabled={readError} value={period} onChange={e=>move(item.id,{period:e.target.value as StayPeriod})}>{periods.map(period=><option key={period} value={period}>{labels[period]}</option>)}</select></label></div><div className="trip-stop-actions"><button type="button" disabled={readError||index===0} aria-label={fr?`Monter ${placeName(place,locale)}`:`Move ${placeName(place,locale)} up`} onClick={()=>savePlan(reorderStayItem(plan,item.id,-1))}>↑</button><button type="button" disabled={readError||index===items.length-1} aria-label={fr?`Descendre ${placeName(place,locale)}`:`Move ${placeName(place,locale)} down`} onClick={()=>savePlan(reorderStayItem(plan,item.id,1))}>↓</button><a href={point?pointDirectionsUrl(point):placeSearchUrl(place.name,place.location)} target="_blank" rel="noopener noreferrer">{point?(fr?'Accès':'Directions'):(fr?'Chercher le lieu':'Find place')} ↗</a><button type="button" disabled={readError} onClick={()=>savePlan(plan.filter(current=>current.id!==item.id))}>{fr?'Déprogrammer':'Unplan'}</button></div></li>;})}</ol></section>;})}</div>
   <section className="trip-pool" aria-labelledby="trip-pool-title"><div className="trip-heading"><div><p className="lg-kicker">{fr?'DANS MA SÉLECTION':'IN MY SHORTLIST'}</p><h3 id="trip-pool-title">{fr?'Encore à placer.':'Still to plan.'}</h3><p>{fr?'Ajouter place le lieu dans la journée affichée. Déprogrammer le conserve dans vos adresses.':'Add places a stop on the selected day. Unplanning keeps it in your saved places.'}</p></div><Link href={`/${locale}/explore`} className="lg-btn">{fr?'Ajouter des envies':'Find more places'} ↗</Link></div>{unplanned.length?<ul>{unplanned.map(place=><li key={place.id}><div><Link href={`/${locale}/place/${place.id}`}>{placeName(place,locale)} ↗</Link><p>{place.location}</p></div><button disabled={readError} className="lg-btn lg-btn--accent" type="button" onClick={()=>savePlan(addStayItem(plan,place.id,activeDay,placePeriod(place.category)))}>{fr?`+ Jour ${activeDay}`:`+ Day ${activeDay}`}</button></li>)}</ul>:<p className="trip-free">{places.length?(fr?'Toutes vos adresses sont placées.':'All saved places are planned.'):(fr?'Enregistrez un lieu depuis Explorer ou un guide pour commencer.':'Save a place from Explore or a guide to get started.')}</p>}</section>
  </>}
  {error&&<p role="alert" className="trip-warning">{error}</p>}<p className="trip-notice" role="status" aria-live="polite">{notice}</p>
 </section>;
}
