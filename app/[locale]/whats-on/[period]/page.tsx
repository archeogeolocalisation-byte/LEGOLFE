import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import SiteFooter from "../../../../components/SiteFooter";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import CollectionSchema from "../../../../components/CollectionSchema";
import AgendaLinks from "../../../../components/AgendaLinks";
import AgendaEventCard from "../../../../components/AgendaEventCard";
import { isLocale } from "../../../../lib/i18n";
import { pageMetadata } from "../../../../lib/seo";
import { parisIsoDay } from "../../../../lib/localCalendar";
import { getPublicEvents } from "../../../../lib/publicEvents";
import { dateWindow, monthWindow, eventsInWindow, catalogMonths, formatCalendarMonth, formatCalendarDay } from "../../../../lib/agendaCalendar";
type Props={params:Promise<{locale:string;period:string}>};
export const dynamic="force-dynamic";
async function resolve(params:Props["params"]){
 const {locale,period}=await params;if(!isLocale(locale))notFound();const fr=locale==="fr",today=parisIsoDay();
 const window=period==="today"?dateWindow("today",today):period==="this-weekend"?dateWindow("weekend",today):monthWindow(period);if(!window)notFound();
 const title=period==="today"?(fr?"Que faire aujourd’hui dans le Golfe de Saint-Tropez ?":"What to do today around the Golfe de Saint-Tropez?"):period==="this-weekend"?(fr?"Que faire ce week-end dans le Golfe de Saint-Tropez ?":"What to do this weekend around the Golfe de Saint-Tropez?"):(fr?`Agenda du Golfe de Saint-Tropez · ${formatCalendarMonth(period,locale)}`:`Golfe de Saint-Tropez events · ${formatCalendarMonth(period,locale)}`);
 const catalog=await getPublicEvents(),list=eventsInWindow(catalog,window);return {locale,period,fr,today,window,title,catalog,list,path:`/${locale}/whats-on/${period}`};
}
export async function generateMetadata({params}:Props){const {locale,fr,title,path,list}=await resolve(params);const metadata=pageMetadata({title,description:fr?"Concerts, culture, régates, activités et rendez-vous locaux : choisissez votre sortie dans le Golfe et retrouvez les informations officielles de chaque événement.":"Concerts, culture, sailing and local activities: choose an outing around the Golfe and find each event’s official information.",path,locale});if(!list.length)metadata.robots={index:false,follow:true};return metadata;}
export default async function Page({params}:Props){
 const {locale,period,fr,today,window,title,catalog,list,path}=await resolve(params);const archive=window.to<today;
 return <main><SiteHeader locale={locale} path={`/whats-on/${period}`}/><Breadcrumbs locale={locale} items={[{name:"LE GOLFE",path:`/${locale}`},{name:fr?"Agenda":"Events",path:`/${locale}/whats-on`},{name:period==="today"?fr?"Aujourd’hui":"Today":period==="this-weekend"?fr?"Ce week-end":"This weekend":formatCalendarMonth(period,locale),path}]}/>{list.length>0&&<CollectionSchema name={title} path={path} items={list.map(e=>({name:fr?e.titleFr||e.title:e.title,path:`/${locale}/event/${e.id}`}))}/>}
 <section className="lg-shell py-12"><p className="lg-kicker">LE GOLFE / {archive?(fr?"ARCHIVES":"ARCHIVE"):"AGENDA"}</p><h1 className="mt-6 max-w-5xl text-5xl font-black md:text-7xl">{title}</h1><p className="mt-7 font-bold"><time dateTime={window.from}>{formatCalendarDay(window.from,locale)}</time>{window.to!==window.from?` — ${formatCalendarDay(window.to,locale)}`:""}</p><p className="mt-5 max-w-3xl leading-7 text-black/60">{archive?(fr?"Retrouvez le programme de cette période passée. Pour préparer une sortie, consultez les dates actuelles de l’agenda.":"Browse this past period’s program. For a new outing, consult the current dates in the calendar."):(fr?"Choisissez un événement, consultez sa source et composez votre sortie avec les adresses de la commune. Les séances répétées apparaissent uniquement aux dates annoncées.":"Choose an event, check its source and plan your outing with places in the same commune. Repeated sessions appear only on their announced dates.")}</p><div className="mt-8"><AgendaLinks locale={locale} months={catalogMonths(catalog)} current={period}/></div><p className="mt-12 text-xs font-bold uppercase">{list.length} {fr?"rendez-vous dans cette période":"events in this period"}</p>
 {list.length>0?<div className="mt-5 grid gap-x-8 md:grid-cols-2">{list.map(e=><AgendaEventCard key={e.id} event={e} locale={locale} window={window} today={today}/>)}</div>:<div className="mt-8 border border-black p-8"><h2 className="text-2xl font-black">{fr?"Aucun événement publié pour cette période":"No published events for this period"}</h2><p className="mt-4 max-w-2xl leading-7 text-black/60">{fr?"Le catalogue ne contient pas encore de rendez-vous pour ces dates. Consultez les autres périodes ou les guides locaux pour préparer votre journée.":"The catalog does not yet contain events for these dates. Browse other periods or the local guides to plan your day."}</p></div>}
 <Link href={`/${locale}/destinations`} className="lg-btn mt-10">{fr?"Les guides de communes":"Destination guides"} →</Link></section><SiteFooter locale={locale}/></main>;
}
