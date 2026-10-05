import SiteFooter from "../../../../components/SiteFooter";
import EventLocalLinks from "../../../../components/EventLocalLinks";
import { eventSessions, formatCalendarDay } from "../../../../lib/agendaCalendar";
import { parisIsoDay } from "../../../../lib/localCalendar";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import JsonLd from "../../../../components/JsonLd";
import { isLocale } from "../../../../lib/i18n";
import { getPublicEvents } from "../../../../lib/publicEvents";
import { pageMetadata, absoluteUrl, siteOrigin } from "../../../../lib/seo";
import { mediaForEvent } from "../../../../lib/eventMedia";
type Props = {params:Promise<{locale:string;id:string}>};
export const dynamic="force-dynamic";
async function record(params:Props["params"]) {
 const {locale,id}=await params;if(!isLocale(locale))notFound();
 const e=(await getPublicEvents()).find(x=>x.id===id);if(!e)notFound();return {locale,e};
}
export async function generateMetadata({params}:Props){
 const {locale,e}=await record(params);
 return pageMetadata({title:`${locale === "fr" ? e.titleFr || e.title : e.title} · ${e.location}`,description:locale === "fr" ? e.summaryFr : e.summary,path:`/${locale}/event/${e.id}`,locale});
}
export default async function Page({params}:Props){
 const {locale,e}=await record(params);const fr=locale === "fr";const title=fr ? e.titleFr || e.title : e.title;
 const sessions=eventSessions(e),today=parisIsoDay();
 const image=mediaForEvent(e);
 return <main><SiteHeader locale={locale} path={`/event/${e.id}`}/><Breadcrumbs locale={locale} items={[{name:"LE GOLFE",path:`/${locale}`},{name:fr?"Agenda":"Events",path:`/${locale}/whats-on`},{name:title,path:`/${locale}/event/${e.id}`}]} />
 {siteOrigin() && <JsonLd data={{"@context":"https://schema.org","@graph":sessions.map(session=>({"@type":"Event","@id":absoluteUrl(`/${locale}/event/${e.id}#session-${session.start}`),name:title,description:fr?e.summaryFr:e.summary,url:absoluteUrl(`/${locale}/event/${e.id}#session-${session.start}`),startDate:session.start,endDate:session.end,location:{"@type":"Place",name:e.venue || e.location,address:{"@type":"PostalAddress",addressLocality:e.location,addressCountry:"FR",streetAddress:e.streetAddress,postalCode:e.postalCode}}}))}}/>}

 <article className="lg-shell py-12"><p className="lg-kicker">{e.location}</p><h1 className="mt-5 max-w-5xl text-5xl font-black md:text-7xl">{title}</h1><ul className="mt-6 space-y-3 font-bold">{sessions.map(session=><li id={`session-${session.start}`} key={session.start}><time dateTime={session.start}>{formatCalendarDay(session.start,locale)}</time>{session.end&&session.end!==session.start?` — ${formatCalendarDay(session.end,locale)}`:""}{session.time?` · ${session.time}`:""}{(session.end||session.start)<today?<span className="ml-3 text-xs font-normal text-black/50">{fr?"Terminé":"Past event"}</span>:null}</li>)}</ul>{e.venue && <p className="mt-3">{e.venue}</p>}{e.streetAddress&&<p className="mt-2 text-sm text-black/60">{e.streetAddress} · {e.postalCode} {e.location}</p>}

 <div className="mt-10 lg-image aspect-[16/9]"><img src={image.src} alt={image.alt}/></div><p className="lg-credit">{fr?"Photo de contexte":"Context photo"}: {image.credit} · {image.license}</p>
 <p className="mt-8 max-w-3xl text-xl leading-8">{fr?e.summaryFr:e.summary}</p><p className="mt-6 max-w-3xl leading-7">{fr?e.whyFr:e.why}</p>
 {(fr?e.practicalFr:e.practical)&&<p className="mt-6 max-w-3xl leading-7">{fr?e.practicalFr:e.practical}</p>}{e.sourceCheckedAt&&<p className="mt-6 text-xs text-black/50">{fr?"Source consultée le":"Source checked on"} {formatCalendarDay(e.sourceCheckedAt,locale)}</p>}<p className="mt-8 text-sm text-black/60">{fr?"Dates et informations issues de la source ci-dessous. Vérifiez les horaires et modalités avant de vous déplacer.":"Dates and information from the source below. Check times and arrangements before travelling."}</p><a className="lg-btn mt-6" href={e.source} target="_blank" rel="noreferrer">{e.sourceLabel} ↗</a>
 <div className="mt-12 flex flex-wrap gap-4"><Link className="lg-btn" href={`/${locale}/whats-on`}>{fr?"Tout l’agenda":"All events"}</Link><Link className="lg-btn" href={`/${locale}/explore`}>{fr?"Explorer les bonnes adresses":"Explore places"}</Link></div></article><EventLocalLinks location={e.location} locale={locale}/><SiteFooter locale={locale}/></main>;
}
