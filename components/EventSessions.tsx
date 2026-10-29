import type {EventSession,GolfeEvent} from '../data/events';
import type {Locale} from '../lib/i18n';
import {formatCalendarDay,sessionAnchor} from '../lib/agendaCalendar';
import {savedEvent} from '../lib/savedEvents';
import EventStayActions from './EventStayActions';
import styles from './EventDetail.module.css';

export default function EventSessions({event,sessions,today,locale}:{event:GolfeEvent;sessions:EventSession[];today:string;locale:Locale}){
 const fr=locale==='fr',upcoming=sessions.filter(s=>(s.end||s.start)>=today),past=sessions.filter(s=>(s.end||s.start)<today);
 function row(session:EventSession,ended=false){return <li key={sessionAnchor(session)} id={sessionAnchor(session)} className={styles.session}>
  <div><p className={styles.sessionDate}><time dateTime={session.start}>{formatCalendarDay(session.start,locale)}</time>{session.end&&session.end!==session.start?` — ${formatCalendarDay(session.end,locale)}`:''}</p><p className={styles.sessionTime}>{session.time?`${session.time}${session.endTime?`–${session.endTime}`:''}`:fr?'Horaire à confirmer auprès de l’organisateur':'Confirm time with the organiser'}{session.version?` · ${session.version}`:''}</p></div>
  {ended?<span className={styles.past}>{fr?'Terminé':'Past event'}</span>:<EventStayActions locale={locale} event={savedEvent(event,session)}/>}
 </li>;}
 return <section id="seances" className={styles.sessions} aria-labelledby="sessions-title"><p className="lg-kicker">{fr?'CHOISIR SON RENDEZ-VOUS':'CHOOSE YOUR SESSION'}</p><h2 id="sessions-title">{fr?'Les dates. Les horaires.':'Dates and times.'}</h2>
  <p className={styles.note}>{fr?'Choisissez une date pour l’ajouter à Mon séjour. Votre sélection reste sur ce navigateur ; elle ne réserve pas de place.':'Choose a date to add it to My stay. Your selection stays in this browser; saving does not book a seat.'}</p>
  {upcoming.length?<ul className={styles.sessionList}>{upcoming.map(s=>row(s))}</ul>:<p className={styles.notice}>{fr?'Cet événement est terminé. Retrouvez les prochaines sorties dans l’agenda.':'This event has ended. Find upcoming outings in the calendar.'}</p>}
  {past.length>0&&(upcoming.length?<details className={styles.archive}><summary>{fr?'Dates passées':'Past dates'} ({past.length})</summary><ul className={styles.sessionList}>{past.map(s=>row(s,true))}</ul></details>:<ul className={styles.sessionList}>{past.map(s=>row(s,true))}</ul>)}
 </section>;
}
