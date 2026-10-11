import Link from "next/link";
import type { GolfeEvent, EventCategory } from "../data/events";
import type { LocalNewsItem, LocalNewsKind } from "../data/localNews";
import type { Locale } from "../lib/i18n";
import { firstSessionInWindow, formatCalendarDay, type DateWindow } from "../lib/agendaCalendar";

const eventLabels: Record<EventCategory, Record<Locale, string>> = {
  music: { fr: "Musique", en: "Music" }, culture: { fr: "Culture", en: "Culture" },
  sport: { fr: "Sport", en: "Sport" }, local: { fr: "Vie locale", en: "Local life" },
  family: { fr: "En famille", en: "Family" }, sailing: { fr: "Voile", en: "Sailing" },
};
const newsLabels: Record<LocalNewsKind, Record<Locale, string>> = {
  need: { fr: "Pratique", en: "Practical" }, new: { fr: "Nouveau", en: "New" },
  around: { fr: "Vie du Golfe", en: "Around the Golfe" },
};
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lg-blue)]";

export default function HomeUpdates({ locale, events, news, window }: {
  locale: Locale; events: GolfeEvent[]; news: LocalNewsItem[]; window: DateWindow;
}) {
  const fr = locale === "fr";
  return <section className="border-y border-black/15 bg-[#f7f6f2]">
    <div className="lg-shell grid gap-12 py-14 md:gap-8 md:py-20 lg:grid-cols-2 lg:gap-12">
      <section aria-labelledby="home-agenda-title" className="flex min-w-0 flex-col">
        <header className="border-t-4 border-[var(--lg-blue)] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="lg-kicker text-[var(--lg-blue)]">WHAT’S ON / {fr ? "LES 7 PROCHAINS JOURS" : "NEXT 7 DAYS"}</p>
            <span aria-hidden="true" className="text-xs font-black text-black/45">01 / AGENDA</span>
          </div>
          <h2 id="home-agenda-title" className="lg-title mt-6 text-[clamp(2.75rem,9vw,4.25rem)] uppercase">{fr ? <>CE QUI<br />SE PASSE.</> : <>WHAT’S<br />HAPPENING.</>}</h2>
          <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-black/65">{fr ? "Une sortie, un concert, un rendez-vous sur l’eau. Choisissez votre prochain moment dans le Golfe." : "An outing, a concert, a date on the water. Choose your next moment in the Golfe."}</p>
        </header>
        <ul className="mt-7 flex-1 border-t border-black/25">
          {events.map(event => {
            const session = firstSessionInWindow(event, window);
            if (!session) return null;
            const ongoing = session.start < window.from;
            const day = ongoing ? window.from : session.start;
            const month = new Intl.DateTimeFormat(fr ? "fr-FR" : "en-GB", { month: "short", timeZone: "UTC" }).format(new Date(day + "T12:00:00Z"));
            return <li key={event.id} className="border-b border-black/25">
              <Link href={`/${locale}/event/${event.id}`} className={`group grid grid-cols-[3.5rem_1fr_auto] items-start gap-4 py-6 sm:grid-cols-[4.25rem_1fr_auto] ${focus}`}>
                <div aria-hidden="true" className="bg-[var(--lg-blue)] px-1 py-3 text-center text-white">
                  <span className="block text-3xl font-black leading-none tracking-[-.06em] sm:text-4xl">{Number(day.slice(8))}</span>
                  <span className="mt-1.5 block text-[10px] font-black uppercase tracking-[.1em]">{month}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase leading-4 tracking-[.12em] text-black/65">{eventLabels[event.category][locale]} · {event.location}</p>
                  <h3 className="mt-2 text-xl font-black uppercase leading-[1.08] tracking-[-.035em] transition-colors group-hover:text-[var(--lg-blue)] group-focus-visible:text-[var(--lg-blue)] sm:text-2xl">{fr ? event.titleFr || event.title : event.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-black/65">
                    {ongoing ? <span className="mr-2 font-black text-[var(--lg-blue)]">{fr ? "EN COURS" : "ON NOW"}</span> : null}
                    <time dateTime={session.start}>{formatCalendarDay(session.start, locale, true)}</time>
                    {session.end && session.end !== session.start ? <> → <time dateTime={session.end}>{formatCalendarDay(session.end, locale, true)}</time></> : null}
                    {session.time ? ` · ${session.time}` : ""}
                  </p>
                </div>
                <span aria-hidden="true" className="text-2xl font-black text-[var(--lg-blue)]">↗</span>
              </Link>
            </li>;
          })}
          {!events.length ? <li className="py-8 text-sm font-semibold leading-6 text-black/65">{fr ? "Aucun rendez-vous publié pour les sept prochains jours. Retrouvez les prochaines dates dans l’agenda." : "No listings for the next seven days. Find upcoming dates in the full agenda."}</li> : null}
        </ul>
        <Link href={`/${locale}/whats-on`} className={`mt-6 flex min-h-12 items-center justify-between border border-black bg-white px-4 text-xs font-black uppercase tracking-[.12em] transition-colors hover:bg-black hover:text-white ${focus}`}>
          {fr ? "Tout l’agenda" : "Full agenda"}<span aria-hidden="true">→</span>
        </Link>
      </section>
      <section aria-labelledby="home-local-title" className="flex min-w-0 flex-col">
        <header className="border-t-4 border-black pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="lg-kicker">LOCAL / {fr ? "LES INFOS UTILES" : "NEED TO KNOW"}</p>
            <span aria-hidden="true" className="text-xs font-black text-black/45">02 / LOCAL</span>
          </div>
          <h2 id="home-local-title" className="lg-title mt-6 text-[clamp(2.75rem,9vw,4.25rem)] uppercase">{fr ? <>À SAVOIR<br />MAINTENANT.</> : <>KNOW IT<br />NOW.</>}</h2>
          <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-black/65">{fr ? "Accès, nouveaux lieux, vie locale. Les nouvelles qui vous aident à préparer votre séjour." : "Access, new places, local life. Updates to help you plan your stay."}</p>
        </header>
        <ul className="mt-7 flex-1 border-t border-black/25">
          {news.map(item => <li key={item.id} className="border-b border-black/25">
            <Link href={`/${locale}/local#${item.id}`} className={`group block py-6 ${focus}`}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="border border-black/25 px-2 py-1 text-[9px] font-black uppercase tracking-[.12em]">{newsLabels[item.kind][locale]}</span>
                <time dateTime={item.date} className="text-xs font-semibold text-black/65">{formatCalendarDay(item.date, locale, true)}</time>
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h3 className="text-xl font-black uppercase leading-[1.08] tracking-[-.035em] transition-colors group-hover:text-[var(--lg-blue)] group-focus-visible:text-[var(--lg-blue)] sm:text-2xl">{fr ? item.titleFr : item.title}</h3>
                <span aria-hidden="true" className="shrink-0 text-2xl font-black">↗</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-black/70">{fr ? item.summaryFr : item.summary}</p>
              <p className="mt-3 text-[10px] font-black uppercase leading-4 tracking-[.12em] text-black/65">{item.location}</p>
            </Link>
          </li>)}
        </ul>
        <Link href={`/${locale}/local`} className={`mt-6 flex min-h-12 items-center justify-between border border-black bg-white px-4 text-xs font-black uppercase tracking-[.12em] transition-colors hover:bg-black hover:text-white ${focus}`}>
          {fr ? "Toutes les infos locales" : "All local updates"}<span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  </section>;
}
