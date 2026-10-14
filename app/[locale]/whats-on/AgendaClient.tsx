"use client";
import styles from "./AgendaClient.module.css";
import { parisIsoDay } from "../../../lib/localCalendar";
import { dateWindow, monthWindow, eventsInWindow, eventOverlaps, catalogMonths, formatCalendarMonth, sessionsInWindow, formatCalendarDay } from "../../../lib/agendaCalendar";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { agendaSources, type GolfeEvent, type EventCategory } from "../../../data/events";
import { mediaForEvent, eventMediaLabel } from "../../../lib/eventMedia";

type Props = { locale: "fr" | "en"; events: GolfeEvent[]; initialDay:string };
type Range = "today" | "tomorrow" | "weekend" | "7days" | "month";

const categoryLabels: Record<EventCategory, { fr: string; en: string }> = {
  music: { fr: "Musique", en: "Music" },
  culture: { fr: "Culture", en: "Culture" },
  sport: { fr: "Sport", en: "Sport" },
  local: { fr: "Vie locale", en: "Local life" },
  family: { fr: "Famille", en: "Family" },
  sailing: { fr: "Nautisme", en: "Sailing" },
};

const accent = "#0B4F6C";

function parseDay(value: string) {
  return new Date(`${value}T12:00:00Z`);
}
function eventDateLabel(e: GolfeEvent, locale: "fr" | "en") {
  const fmt = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", timeZone:"UTC" });
  const first = fmt.format(parseDay(e.start));
  const last = e.end && e.end !== e.start ? fmt.format(parseDay(e.end)) : null;
  return last ? `${first} — ${last}` : first;
}
function dayNumber(e: GolfeEvent) {
  return parseDay(e.start).getUTCDate().toString().padStart(2, "0");
}
function monthLabel(e: GolfeEvent, locale: "fr" | "en") {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { month: "short", timeZone:"UTC" }).format(parseDay(e.start)).replace(".", "").toUpperCase();
}

export default function AgendaClient({ locale, events, initialDay }: Props) {
  const fr = locale === "fr";
  const [todayIso,setTodayIso]=useState(initialDay);
  useEffect(()=>{const timer=setInterval(()=>setTodayIso(parisIsoDay()),60_000);return ()=>clearInterval(timer);},[]);
  const [range, setRange] = useState<Range>("7days");
  const [month, setMonth] = useState("");
  const selectedWindow = monthWindow(month) ?? dateWindow(range, todayIso);
  const months = useMemo(() => catalogMonths(events), [events]);
  const [category, setCategory] = useState<"all" | EventCategory>("all");
  const [location, setLocation] = useState("all");
  const locations = useMemo(() => Array.from(new Set(events.map((e) => e.location))).sort(), [events]);
  const filtered=useMemo(()=>eventsInWindow(events,{from:selectedWindow.from,to:selectedWindow.to}).filter(e=>(category==="all"||e.category===category)&&(location==="all"||e.location===location)),[events,selectedWindow.from,selectedWindow.to,category,location]);
  const upcoming=filtered.filter(e=>eventOverlaps(e,todayIso,selectedWindow.to));
  const featured=[...upcoming.filter(e=>e.featured),...upcoming.filter(e=>!e.featured)].slice(0,3);
  const featuredIds=new Set(featured.map(e=>e.id));
  const remaining=filtered.filter(e=>!featuredIds.has(e.id));
  const displayEvent=(event:GolfeEvent)=>{const session=sessionsInWindow(event,selectedWindow)[0];return session?{...event,start:session.start,end:session.end,time:session.time}:event;};
  const periodText = month ? formatCalendarMonth(month, locale) : `${formatCalendarDay(selectedWindow.from,locale,true)}${selectedWindow.to !== selectedWindow.from ? ` — ${formatCalendarDay(selectedWindow.to,locale,true)}` : ""}`;

  const rangeButtons: { key: Range; fr: string; en: string }[] = [
    { key: "today", fr: "Aujourd’hui", en: "Today" },
    { key: "tomorrow", fr: "Demain", en: "Tomorrow" },
    { key: "weekend", fr: "Ce week-end", en: "This weekend" },
    { key: "7days", fr: "7 jours", en: "Next 7 days" },
    { key: "month", fr: "Ce mois", en: "This month" },
  ];

  return (
    <>
      <section className="border-b border-[#c5d4d7] bg-[#f4f0e7]">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.24em]" style={{ color: accent }}>LE GOLFE / AGENDA</p>
              <h1 className="lg-menu-title mt-4 max-w-5xl">
                {fr ? <>CE QUI SE PASSE<br/><span style={{ color: accent }}>ICI. MAINTENANT.</span></> : <>WHAT&apos;S HAPPENING<br/><span style={{ color: accent }}>HERE. NOW.</span></>}
              </h1>
            </div>
            <p className="max-w-md text-base leading-7 text-black/55 lg:pb-2">
              {fr ? "Une sélection vivante du Golfe : culture, mer, musique, sport et rendez-vous locaux. On filtre le bruit, vous choisissez le moment." : "A living edit of the Golfe: culture, sea, music, sport and local life. We filter the noise; you choose the moment."}
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-30 border-b border-black/15 bg-white" aria-label={fr ? "Filtrer l’agenda" : "Filter the agenda"}>
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-10">
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {rangeButtons.map((item) => {
              const selected = !month && range === item.key;
              return <button key={item.key} type="button" aria-pressed={selected} onClick={() => { setMonth(""); setRange(item.key); }} className={`shrink-0 border px-4 py-2 text-[11px] font-black uppercase tracking-[.13em] transition ${selected ? "border-transparent text-white" : "border-black/15 text-black hover:border-black"}`} style={selected ? { backgroundColor: accent } : undefined}>
                {fr ? item.fr : item.en}
              </button>;
            })}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <label htmlFor="agenda-month" className="text-[10px] font-black uppercase tracking-[.13em]">{fr ? "Choisir un mois" : "Choose a month"}</label>
            <select id="agenda-month" value={month} onChange={event => setMonth(event.target.value)} className="max-w-full border border-black/20 bg-white px-3 py-2 text-xs font-bold">
              <option value="">{fr ? "Période rapide" : "Quick dates"}</option>
              {months.map(value => <option key={value} value={value}>{formatCalendarMonth(value, locale)}</option>)}
            </select>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-5 border-t border-black/10 px-6 pt-4 md:px-10 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[.22em] text-black/35">{fr ? "AFFINER" : "REFINE"}</p>
                    <div className="mt-3 flex max-w-full flex-wrap gap-2">
                      <button aria-pressed={category === "all"} onClick={() => setCategory("all")} className={`px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] ${category === "all" ? "bg-[#0B4F6C] text-white" : "border border-[#c5d4d7] text-[#0B4F6C]"}`}>{fr ? "Tout" : "All"}</button>
                      {(Object.keys(categoryLabels) as EventCategory[]).map((key) => <button key={key} aria-pressed={category === key} onClick={() => setCategory(key)} className={`px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] ${category === key ? "bg-[#0B4F6C] text-white" : "border border-[#c5d4d7] text-[#0B4F6C]"}`}>{fr ? categoryLabels[key].fr : categoryLabels[key].en}</button>)}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="agenda-location" className="block text-[10px] font-black uppercase tracking-[.18em] text-black/35">{fr ? "OÙ ?" : "WHERE?"}</label>
                    <select id="agenda-location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-2 min-w-52 border-0 border-b-2 border-[#0B4F6C] bg-white px-0 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-[#0B4F6C]">
                      <option value="all">{fr ? "Tout le Golfe" : "Across the Golfe"}</option>
                      {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                </div>
        
        
      </section>

      {featured.length>0&&<section className={styles.featured} aria-label={fr?"À l’affiche":"Featured events"}>
       <div className="mx-auto max-w-7xl px-6 md:px-10"><p className={styles.featuredHeading}>{fr?"À L’AFFICHE":"FEATURED EVENTS"}</p><div className={styles.featuredGrid}>
        {featured.map((e,i)=>{const image=mediaForEvent(e);return <article key={e.id} data-agenda-featured={e.id} className={i===0?styles.featureLarge:styles.featureSmall}>
         <Link href={`/${locale}/event/${e.id}`} className={styles.featureImage} aria-label={fr?e.titleFr||e.title:e.title}><img style={image.kind==="official"?{objectFit:"contain",background:"#f2f0e9"}:undefined} src={image.src} alt={image.alt} loading="lazy"/></Link>
         <div className={styles.featureCopy}><p className={styles.featureMeta}>{e.location} · {categoryLabels[e.category][locale]}</p><h2><Link href={`/${locale}/event/${e.id}`}>{fr?e.titleFr||e.title:e.title}</Link></h2><p className={styles.featureDates}>{sessionsInWindow(e,selectedWindow).map(session=>`${eventDateLabel({...e,start:session.start,end:session.end},locale)}${session.time?` · ${session.time}`:''}`).join(' · ')}</p><p className={styles.featureSummary}>{fr?e.summaryFr:e.summary}</p>{i===0&&<p className={styles.featureWhy}>{fr?e.whyFr:e.why}</p>}<div className={styles.featureLinks}><Link href={`/${locale}/event/${e.id}`}>{fr?'Voir la fiche':'Event details'} →</Link><a href={e.source} target="_blank" rel="noopener noreferrer">{fr?'Infos officielles':'Official info'} ↗</a><Link href={`/${locale}/ask?prompt=${encodeURIComponent(fr?`Construis-moi un moment autour de ${e.titleFr||e.title} à ${e.location}.`:`Build me a moment around ${e.title} in ${e.location}.`)}`}>{fr?'Construire autour':'Build around it'} →</Link></div><p className={styles.credit}>{eventMediaLabel(image,locale)} : {image.credit} · {image.license}</p></div>
        </article>;})}
       </div></div>
      </section>}

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <div className="mt-12 flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em]" style={{ color: accent }}>{periodText}</p>
            <h2 aria-live="polite" aria-atomic="true" className="mt-2 text-4xl font-black tracking-[-.035em] md:text-5xl">{filtered.length} {fr ? "rendez-vous" : "events"}</h2>
          </div>
          {(category !== "all" || location !== "all" || month || range !== "month") && <button onClick={() => { setMonth(""); setRange("month"); setCategory("all"); setLocation("all"); }} className="text-[10px] font-black uppercase tracking-[.15em] underline underline-offset-4">{fr ? "Réinitialiser ce mois" : "Reset to this month"}</button>}
        </div>

        {filtered.length === 0 ? (
          <div className="my-16 border border-black px-6 py-16 text-center">
            <p className="text-3xl font-black">{fr ? "Rien dans ce filtre." : "Nothing in this filter."}</p>
            <p className="mt-3 text-sm text-black/50">{fr ? "Élargissez la période ou changez de catégorie." : "Widen the dates or change category."}</p>
          </div>
        ) : remaining.length>0 ? (
          <div className={styles.eventGrid} aria-label={fr?'Les autres rendez-vous':'More events'}>
           {remaining.map(e=>{const image=mediaForEvent(e);return <article key={e.id} data-agenda-event={e.id} className={styles.eventCard}>
            <Link href={`/${locale}/event/${e.id}`} className={styles.eventImage} aria-label={fr?e.titleFr||e.title:e.title}><img style={image.kind==="official"?{objectFit:"contain",background:"#f2f0e9"}:undefined} src={image.src} alt={image.alt} loading="lazy"/></Link>
            <div className={styles.eventBody}><div className={styles.eventTop}><span className={styles.day}>{dayNumber(displayEvent(e))}</span><div><p className={styles.month}>{monthLabel(displayEvent(e),locale)} · {categoryLabels[e.category][locale]}</p><p className={styles.location}>{e.location}</p></div></div><h3><Link href={`/${locale}/event/${e.id}`}>{fr?e.titleFr||e.title:e.title}</Link></h3><p className={styles.eventDates}>{sessionsInWindow(e,selectedWindow).map(session=>`${formatCalendarDay(session.start,locale,true)}${session.end&&session.end!==session.start?` — ${formatCalendarDay(session.end,locale,true)}`:''}${session.time?` · ${session.time}`:''}`).join(' · ')}</p><p className={styles.eventSummary}>{fr?e.summaryFr:e.summary}</p><p className={styles.eventWhy}>{fr?e.whyFr:e.why}</p><div className={styles.eventLinks}><Link href={`/${locale}/event/${e.id}`}>{fr?'Voir la fiche':'Event details'} →</Link><a href={e.source} target="_blank" rel="noopener noreferrer">{fr?'Infos officielles':'Official info'} ↗</a><Link href={`/${locale}/ask?prompt=${encodeURIComponent(fr?`Construis-moi un moment autour de ${e.titleFr||e.title} à ${e.location}.`:`Build me a moment around ${e.title} in ${e.location}.`)}`}>{fr?'Construire autour':'Build around it'} →</Link></div><p className={styles.credit}>{eventMediaLabel(image,locale)} : {image.credit} · {image.license}</p></div>
           </article>;})}
          </div>
        ) : <p className="mt-8 text-sm text-[#405659]">{fr?'Tous les rendez-vous de cette sélection sont présentés à l’affiche ci-dessus.':'All events in this selection appear in the featured section above.'}</p>}
      </section>

      <section className="border-t border-[#c5d4d7] bg-[#edf4f6]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#0B4F6C]">{fr ? "PROGRAMMES & SOURCES" : "PROGRAMMES & SOURCES"}</p>
              <h2 className="mt-4 text-4xl font-black leading-[.93] tracking-[-.04em] md:text-6xl">{fr ? "UN AGENDA DU GOLFE. PAS D'UNE SEULE VILLE." : "THE WHOLE GOLFE. NOT JUST ONE TOWN."}</h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-black/55">{fr ? "LE GOLFE croise les agendas municipaux, offices de tourisme et salles de spectacle. On ne republie pas tout : on sélectionne ce qui mérite vraiment votre temps." : "LE GOLFE cross-checks municipal calendars, tourism offices and cultural venues. We do not republish everything; we select what is genuinely worth your time."}</p>
            </div>
            <div className="grid border-t border-black sm:grid-cols-2">
              {agendaSources.map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="group border-b border-black/20 py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#0B4F6C]">{source.area}</p><p className="mt-2 text-lg font-black leading-tight group-hover:text-[#0B4F6C]">{source.name}</p></div><span className="text-sm">↗</span></div>
              </a>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-[#0B4F6C] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:flex md:items-end md:justify-between md:px-10 md:py-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/55">{fr?"DEMANDER À LE GOLFE":"ASK LE GOLFE"}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.035em] md:text-6xl">{fr ? "VOUS AVEZ UNE SOIRÉE. ON VOUS FAIT LE PLAN." : "YOU HAVE ONE EVENING. WE'LL MAKE THE PLAN."}</h2>
          </div>
          <Link href={`/${locale}/ask?prompt=${encodeURIComponent(fr ? "Que faire ce soir dans le Golfe ? Propose-moi un programme cohérent avec un événement, un dîner et le bon endroit pour finir la soirée." : "What should we do tonight in the Golfe? Build a coherent plan with an event, dinner and the right place to end the evening.")}`} className="mt-8 inline-block bg-white px-6 py-4 text-xs font-black uppercase tracking-[.15em] text-black md:mt-0">{fr ? "FAIRE MON PLAN" : "BUILD MY PLAN"} →</Link>
        </div>
      </section>
    </>
  );
}
