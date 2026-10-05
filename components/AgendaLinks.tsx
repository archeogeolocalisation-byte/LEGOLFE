import Link from "next/link";
import { formatCalendarMonth } from "../lib/agendaCalendar";
import type { Locale } from "../lib/i18n";
export default function AgendaLinks({locale,months,current}:{locale:Locale;months:string[];current?:string}){
 const fr=locale==="fr";const base=`/${locale}/whats-on`;
 return <nav aria-label={fr?"Périodes de l’agenda":"Event calendar periods"} className="flex flex-wrap gap-3"><Link className="lg-btn" href={base} aria-current={current==="all"?"page":undefined}>{fr?"L’agenda":"Event calendar"}</Link><Link className="lg-btn" href={`${base}/today`} aria-current={current==="today"?"page":undefined}>{fr?"Aujourd’hui":"Today"}</Link><Link className="lg-btn" href={`${base}/this-weekend`} aria-current={current==="this-weekend"?"page":undefined}>{fr?"Ce week-end":"This weekend"}</Link>{months.map(month=><Link key={month} className="lg-btn" href={`${base}/${month}`} aria-current={current===month?"page":undefined}>{formatCalendarMonth(month,locale)}</Link>)}</nav>;
}
