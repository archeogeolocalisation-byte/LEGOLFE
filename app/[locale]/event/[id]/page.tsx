/* eslint-disable @next/next/no-img-element -- Event artwork retains its original aspect ratio. */
import {eventStructuredData} from '../../../../lib/eventStructuredData';
import EventSessions from '../../../../components/EventSessions';
import EventLocalLinks from '../../../../components/EventLocalLinks';
import {eventBookingUrl,eventDirectionsUrl} from '../../../../lib/eventPractical';
import {eventSessions,formatCalendarDay} from '../../../../lib/agendaCalendar';
import {parisIsoDay} from '../../../../lib/localCalendar';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import SiteHeader from '../../../../components/SiteHeader';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import JsonLd from '../../../../components/JsonLd';
import {isLocale} from '../../../../lib/i18n';
import {getPublicEvents} from '../../../../lib/publicEvents';
import {pageMetadata} from '../../../../lib/seo';
import {mediaForEvent,eventMediaLabel} from '../../../../lib/eventMedia';
import styles from '../../../../components/EventDetail.module.css';
type Props={params:Promise<{locale:string;id:string}>};
export const dynamic='force-dynamic';
async function record(params:Props['params']){
 const {locale,id}=await params;if(!isLocale(locale))notFound();
 const e=(await getPublicEvents()).find(x=>x.id===id);if(!e)notFound();return {locale,e};
}
export async function generateMetadata({params}:Props){
 const {locale,e}=await record(params);
 return pageMetadata({title:`${locale==='fr'?e.titleFr||e.title:e.title} · ${e.location}`,description:locale==='fr'?e.summaryFr:e.summary,path:`/${locale}/event/${e.id}`,locale,image:mediaForEvent(e)});
}
export default async function Page({params}:Props){
 const {locale,e}=await record(params),fr=locale==='fr',title=fr?e.titleFr||e.title:e.title;
 const sessions=eventSessions(e),today=parisIsoDay(),upcoming=sessions.filter(s=>(s.end||s.start)>=today),next=upcoming[0],image=mediaForEvent(e),schema=eventStructuredData(e,locale),booking=eventBookingUrl(e),directions=eventDirectionsUrl(e);
 return <main className={styles.page}><SiteHeader locale={locale} path={`/event/${e.id}`}/><Breadcrumbs locale={locale} items={[{name:'LE GOLFE',path:`/${locale}`},{name:fr?'Agenda':'Events',path:`/${locale}/whats-on`},{name:title,path:`/${locale}/event/${e.id}`}]} />{schema&&<JsonLd data={schema}/>}
  <article className="lg-shell">
   <header className={styles.header}><Link className={styles.back} href={`/${locale}/whats-on`}>← {fr?'Toutes les sorties':'All outings'}</Link><p className="lg-kicker mt-5">LE GOLFE / {e.location}</p><h1>{title}</h1><p className={styles.intro}>{fr?e.summaryFr:e.summary}</p></header>
   <div className={styles.hero}><figure className={styles.visual}><div className={styles.poster}><img className={image.kind==='official'?undefined:styles.context} src={image.src} alt={image.alt}/></div><figcaption className={styles.credit}>{eventMediaLabel(image,locale)} : {image.credit} · {image.license}</figcaption></figure>
    <aside className={styles.practical} aria-labelledby="practical-title"><h2 id="practical-title">{fr?'Préparer la sortie':'Plan your outing'}</h2><dl className={styles.facts}>
     <div><dt>{next?(fr?'Prochain rendez-vous':'Next session'):(fr?'Dates':'Dates')}</dt><dd>{next?<><time dateTime={next.start}>{formatCalendarDay(next.start,locale)}</time>{next.time?` · ${next.time}${next.endTime?`–${next.endTime}`:''}`:` · ${fr?'horaire à confirmer':'time to confirm'}`}</>:fr?'Événement terminé':'Event has ended'}</dd></div>
     <div><dt>{fr?'Lieu':'Venue'}</dt><dd>{e.venue||e.location}{e.streetAddress&&<><br/>{e.streetAddress}{e.postalCode?` · ${e.postalCode}`:''} {e.location}</>}{!e.venue&&!e.streetAddress&&<><br/>{fr?'Adresse précise à vérifier sur la source officielle.':'Check the official source for the exact address.'}</>}</dd></div>
     {e.organizer&&<div><dt>{fr?'Organisation':'Organiser'}</dt><dd>{e.organizer.name}</dd></div>}{e.performers?.length?<div><dt>{fr?'Artistes':'Performers'}</dt><dd>{e.performers.map(p=>p.name).join(', ')}</dd></div>:null}{e.filmDurationMinutes&&<div><dt>{fr?'Durée du film':'Film running time'}</dt><dd>{e.filmDurationMinutes} min</dd></div>}
    </dl><div className={styles.actions}>{next?<a className={styles.primary} href="#seances">{upcoming.length>1?(fr?'Choisir une date':'Choose a date'):(fr?'Ajouter à mon séjour':'Add to my stay')} ↓</a>:<Link className={styles.primary} href={`/${locale}/whats-on`}>{fr?'Voir les prochaines sorties':'See upcoming outings'} →</Link>}{next&&booking&&<a className={styles.secondary} href={booking} target="_blank" rel="noopener noreferrer">{fr?'Billetterie officielle':'Official ticketing'} ↗</a>}{directions&&<a className={styles.secondary} href={directions} target="_blank" rel="noopener noreferrer">{fr?'Itinéraire vers le lieu':'Directions to the venue'} ↗</a>}</div><p className={styles.note}>{fr?'Tarifs, places disponibles et conditions à confirmer auprès de l’organisateur.':'Confirm prices, availability and conditions with the organiser.'}</p></aside>
   </div>
   <EventSessions event={e} sessions={sessions} today={today} locale={locale}/>
   <section className={styles.body} aria-labelledby="about-event-title"><h2 id="about-event-title">{fr?'Le bon programme.':'Make a plan.'}</h2><p>{fr?e.whyFr:e.why}</p>{(fr?e.practicalFr:e.practical)&&<p>{fr?e.practicalFr:e.practical}</p>}<div className={styles.source}><h2>{fr?'Les informations à jour':'Current information'}</h2>{e.sourceCheckedAt&&<p>{fr?'Source consultée le':'Source checked on'} <time dateTime={e.sourceCheckedAt}>{formatCalendarDay(e.sourceCheckedAt,locale)}</time>.</p>}<p>{fr?'Un programme peut changer. Vérifiez les horaires et les modalités sur le site officiel avant de partir.':'Programmes can change. Check times and arrangements on the official website before leaving.'}</p><a href={e.source} target="_blank" rel="noopener noreferrer">{fr?'Consulter le programme officiel':'Check the official programme'} · {e.sourceLabel} ↗</a></div><div className={styles.bottom}><Link className="lg-btn" href={`/${locale}/whats-on`}>{fr?'Tout l’agenda':'All events'}</Link><Link className="lg-btn" href={`/${locale}/saved#mes-rendez-vous`}>{fr?'Mes rendez-vous enregistrés':'My saved events'}</Link></div></section>
  </article><EventLocalLinks location={e.location} locale={locale}/>
 </main>;
}
