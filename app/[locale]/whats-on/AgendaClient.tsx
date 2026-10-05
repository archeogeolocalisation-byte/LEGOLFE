"use client";
import AgendaLinks from "../../../components/AgendaLinks";
import { parisIsoDay } from "../../../lib/localCalendar";
import { dateWindow, eventsInWindow, eventOverlaps, catalogMonths, formatCalendarMonth, sessionsInWindow, formatCalendarDay } from "../../../lib/agendaCalendar";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { agendaSources, type GolfeEvent, type EventCategory } from "../../../data/events";
import { mediaForEvent } from "../../../lib/eventMedia";

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
  const [category, setCategory] = useState<"all" | EventCategory>("all");
  const [location, setLocation] = useState("all");
  const locations = useMemo(() => Array.from(new Set(events.map((e) => e.location))).sort(), [events]);
  const filtered=useMemo(()=>eventsInWindow(events,dateWindow(range,todayIso)).filter(e=>(category==="all"||e.category===category)&&(location==="all"||e.location===location)),[events,range,todayIso,category,location]);
  const upcoming=filtered.filter(e=>eventOverlaps(e,todayIso,dateWindow(range,todayIso).to));
  const featured=upcoming.find(e=>e.featured)||upcoming[0];
  const displayEvent=(event:GolfeEvent)=>{const session=sessionsInWindow(event,dateWindow(range,todayIso))[0];return session?{...event,start:session.start,end:session.end,time:session.time}:event;};
  const monthText=formatCalendarMonth(todayIso.slice(0,7),locale);

  const rangeButtons: { key: Range; fr: string; en: string }[] = [
    { key: "today", fr: "Aujourd’hui", en: "Today" },
    { key: "tomorrow", fr: "Demain", en: "Tomorrow" },
    { key: "weekend", fr: "Ce week-end", en: "This weekend" },
    { key: "7days", fr: "7 jours", en: "Next 7 days" },
    { key: "month", fr: "Ce mois", en: "This month" },
  ];

  return (
    <>
      <section className="border-b border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.24em]" style={{ color: accent }}>LE GOLFE / AGENDA</p>
              <h1 className="mt-4 max-w-5xl text-6xl font-black leading-[.84] tracking-[-.055em] sm:text-7xl md:text-8xl lg:text-[7.4rem]">
                {fr ? <>CE QUI SE PASSE<br/><span style={{ color: accent }}>ICI. MAINTENANT.</span></> : <>WHAT'S HAPPENING<br/><span style={{ color: accent }}>HERE. NOW.</span></>}
              </h1>
            </div>
            <p className="max-w-md text-base leading-7 text-black/55 lg:pb-2">
              {fr ? "Une sélection vivante du Golfe : culture, mer, musique, sport et rendez-vous locaux. On filtre le bruit, vous choisissez le moment." : "A living edit of the Golfe: culture, sea, music, sport and local life. We filter the noise; you choose the moment."}
            </p>
          </div>
        </div>
      </section>

      {featured && (
        <section className="bg-black text-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-white/15 p-6 md:p-10 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-black uppercase tracking-[.24em]" style={{ color: "#5DA4C0" }}>{fr ? "À L'AFFICHE" : "FEATURED EVENT"}</p>
              <div className="mt-8 flex items-end gap-3">
                <span className="text-7xl font-black leading-none md:text-8xl">{dayNumber(displayEvent(featured))}</span>
                <span className="pb-2 text-sm font-black uppercase tracking-[.2em] text-white/45">{monthLabel(displayEvent(featured), locale)}</span>
              </div>
              <p className="mt-8 text-xs uppercase tracking-[.18em] text-white/45">{featured.location} · {fr ? categoryLabels[featured.category].fr : categoryLabels[featured.category].en}</p>
            </div>
            <div>
              <div className="lg-image aspect-[16/8] border-b border-white/15"><img src={mediaForEvent(featured).src} alt={mediaForEvent(featured).alt}/></div>
              <div className="p-6 md:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-white/25 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.18em]">LE GOLFE PICK</span>
                <span className="text-xs text-white/45">{eventDateLabel(displayEvent(featured), locale)}{featured.time ? ` · ${featured.time}` : ""}</span>
              </div>
              <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[.94] tracking-[-.035em] md:text-6xl">{fr ? (featured.titleFr || featured.title) : featured.title}</h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">{fr ? featured.summaryFr : featured.summary}</p>
              <div className="mt-8 border-l-4 pl-5" style={{ borderColor: accent }}>
                <p className="text-[9px] font-black uppercase tracking-[.2em] text-white/35">{fr ? "POURQUOI ON LE RETIENT" : "WHY IT MADE THE EDIT"}</p>
                <p className="mt-2 max-w-2xl text-lg font-semibold leading-7">{fr ? featured.whyFr : featured.why}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={featured.source} target="_blank" rel="noreferrer" className="bg-white px-5 py-3 text-xs font-black uppercase tracking-[.14em] text-black">{fr ? "Infos officielles" : "Official info"} ↗</a>
                <Link href={`/${locale}/ask?prompt=${encodeURIComponent(fr ? `Construis-moi un moment dans le Golfe autour de ${featured.titleFr || featured.title}.` : `Build me a moment in the Golfe around ${featured.title}.`)}`} className="border border-white/25 px-5 py-3 text-xs font-black uppercase tracking-[.14em] text-white">{fr ? "Construire autour" : "Build around it"} →</Link>
              </div>
              <p className="mt-6 text-[9px] font-bold uppercase tracking-[.12em] text-white/30">Photo: {mediaForEvent(featured).credit} · {mediaForEvent(featured).license}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sticky top-0 z-30 border-b border-black/15 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-10">
          <div className="mb-4"><AgendaLinks locale={locale} months={catalogMonths(events)} current="all"/></div><div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {rangeButtons.map((item) => (
              <button key={item.key} onClick={() => setRange(item.key)} className={`shrink-0 px-4 py-2 text-[11px] font-black uppercase tracking-[.13em] transition ${range === item.key ? "text-white" : "border border-black/15 text-black hover:border-black"}`} style={range === item.key ? { backgroundColor: accent } : undefined}>
                {fr ? item.fr : item.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <div className="grid gap-8 border-b border-black/15 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-black/35">{fr ? "AFFINER" : "REFINE"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => setCategory("all")} className={`px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] ${category === "all" ? "bg-black text-white" : "border border-black/15"}`}>{fr ? "Tout" : "All"}</button>
              {(Object.keys(categoryLabels) as EventCategory[]).map((key) => <button key={key} onClick={() => setCategory(key)} className={`px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] ${category === key ? "bg-black text-white" : "border border-black/15"}`}>{fr ? categoryLabels[key].fr : categoryLabels[key].en}</button>)}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[.18em] text-black/35">{fr ? "OÙ ?" : "WHERE?"}</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="mt-3 min-w-52 border-0 border-b-2 border-black bg-white px-0 py-2 text-sm font-bold outline-none">
              <option value="all">{fr ? "Tout le Golfe" : "Across the Golfe"}</option>
              {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em]" style={{ color: accent }}>{monthText}</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-.035em] md:text-5xl">{filtered.length} {fr ? "rendez-vous" : "events"}</h2>
          </div>
          {(category !== "all" || location !== "all" || range !== "month") && <button onClick={() => { setRange("month"); setCategory("all"); setLocation("all"); }} className="text-[10px] font-black uppercase tracking-[.15em] underline underline-offset-4">{fr ? "Tout afficher" : "Show all"}</button>}
        </div>

        {filtered.length === 0 ? (
          <div className="my-16 border border-black px-6 py-16 text-center">
            <p className="text-3xl font-black">{fr ? "Rien dans ce filtre." : "Nothing in this filter."}</p>
            <p className="mt-3 text-sm text-black/50">{fr ? "Élargissez la période ou changez de catégorie." : "Widen the dates or change category."}</p>
          </div>
        ) : (
          <div className="mt-8 border-t border-black">
            {filtered.map((e, index) => (
              <article key={e.id} className="group grid border-b border-black/15 py-7 transition hover:bg-black/[.025] md:grid-cols-[110px_220px_1fr_auto] md:gap-7 md:py-9">
                <div className="flex items-baseline gap-3 md:block">
                  <span className="text-5xl font-black leading-none tracking-[-.05em] md:text-6xl">{dayNumber(displayEvent(e))}</span>
                  <span className="text-[10px] font-black uppercase tracking-[.18em] text-black/40 md:mt-2 md:block">{monthLabel(displayEvent(e), locale)}</span>
                  {e.time && <span className="text-xs font-bold text-black/45 md:mt-3 md:block">{e.time}</span>}
                </div>
                <div className="mt-5 md:mt-0">
                  <div className="lg-image aspect-[4/3]"><img src={mediaForEvent(e).src} alt={mediaForEvent(e).alt}/></div>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-[.1em] text-black/25">{mediaForEvent(e).credit}</p>
                </div>
                <div className="mt-5 md:mt-0">
                  <div className="flex flex-wrap items-center gap-2 text-[9px] font-black uppercase tracking-[.17em]">
                    <span style={{ color: accent }}>{fr ? categoryLabels[e.category].fr : categoryLabels[e.category].en}</span>
                    <span className="text-black/20">/</span>
                    <span className="text-black/45">{e.location}</span>
                    {e.featured && <span className="bg-black px-2 py-1 text-[8px] text-white">LE GOLFE PICK</span>}
                  </div>
                  <h3 className="mt-3 max-w-3xl text-2xl font-black leading-[1.02] tracking-[-.025em] transition group-hover:text-[#0B4F6C] md:text-4xl"><Link href={`/${locale}/event/${e.id}`}>{fr ? (e.titleFr || e.title) : e.title}</Link></h3><p className="mt-3 text-xs font-bold">{sessionsInWindow(e,dateWindow(range,todayIso)).map(session=>`${formatCalendarDay(session.start,locale,true)}${session.end&&session.end!==session.start?` — ${formatCalendarDay(session.end,locale,true)}`:""}${session.time?` · ${session.time}`:""}`).join(" · ")}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">{fr ? e.summaryFr : e.summary}</p>
                  <p className="mt-4 max-w-2xl border-l-2 pl-4 text-sm font-semibold leading-6" style={{ borderColor: accent }}>{fr ? e.whyFr : e.why}</p>
                </div>
                <div className="mt-6 flex items-end gap-4 md:mt-0 md:flex-col md:justify-end md:text-right">
                  <Link href={`/${locale}/event/${e.id}`} className="text-[10px] font-black uppercase underline">{fr ? "Voir la fiche" : "Event details"} →</Link><a href={e.source} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-[.14em] underline decoration-black/25 underline-offset-4">{fr ? "Infos" : "Info"} ↗</a>
                  <Link href={`/${locale}/ask?prompt=${encodeURIComponent(fr ? `Construis-moi un moment autour de ${e.titleFr || e.title} à ${e.location}.` : `Build me a moment around ${e.title} in ${e.location}.`)}`} className="text-[10px] font-black uppercase tracking-[.14em]" style={{ color: accent }}>{fr ? "Autour de ça" : "Build around it"} →</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-black bg-[#f7f7f4]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#0B4F6C]">{fr ? "SOURCES SUIVIES" : "SOURCES WE FOLLOW"}</p>
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
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/55">ASK LE GOLFE</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.035em] md:text-6xl">{fr ? "VOUS AVEZ UNE SOIRÉE. ON VOUS FAIT LE PLAN." : "YOU HAVE ONE EVENING. WE'LL MAKE THE PLAN."}</h2>
          </div>
          <Link href={`/${locale}/ask?prompt=${encodeURIComponent(fr ? "Que faire ce soir dans le Golfe ? Propose-moi un programme cohérent avec un événement, un dîner et le bon endroit pour finir la soirée." : "What should we do tonight in the Golfe? Build a coherent plan with an event, dinner and the right place to end the evening.")}`} className="mt-8 inline-block bg-white px-6 py-4 text-xs font-black uppercase tracking-[.15em] text-black md:mt-0">{fr ? "FAIRE MON PLAN" : "BUILD MY PLAN"} →</Link>
        </div>
      </section>
    </>
  );
}
