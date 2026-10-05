"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Place } from "../data/places";
import { getCategory } from "../data/places";
import type { Locale } from "../lib/i18n";

const PLAN_KEY = "le-golfe-stay-plan-v1";
const PERIODS = ["morning", "lunch", "afternoon", "evening"] as const;
type Period = (typeof PERIODS)[number];
type PlanItem = { id: string; day: number; period: Period };

function defaultPeriod(place: Place): Period {
  if (place.category === "eat") return "lunch";
  if (place.category === "beach" || place.category === "sea") return "afternoon";
  if (place.category === "wellness" || place.category === "services") return "morning";
  return "morning";
}

function makePlan(places: Place[]): PlanItem[] {
  const counters: Record<Period, number> = { morning: 0, lunch: 0, afternoon: 0, evening: 0 };
  return places.slice(0, 12).map((place, index) => {
    let period = defaultPeriod(place);
    if (place.category === "eat" && counters.lunch >= 3) period = "evening";
    const day = (counters[period] % 3) + 1;
    counters[period] += 1;
    return { id: place.id, day, period };
  }).map((item, index) => ({ ...item, day: Math.min(3, item.day || ((index % 3) + 1)) }));
}

function nextPeriod(period: Period): Period {
  return PERIODS[(PERIODS.indexOf(period) + 1) % PERIODS.length];
}

type StayBase = { id: string; name: string; location: string };

export default function StayPlanner({ places, villas, locale }: { places: Place[]; villas: StayBase[]; locale: Locale }) {
  const fr = locale === "fr";
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PLAN_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setPlan(parsed.filter((x) => x && typeof x.id === "string"));
    } catch {
      setPlan([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, loaded]);

  const placeMap = useMemo(() => new Map(places.map((p) => [p.id, p])), [places]);
  const activePlan = useMemo(() => plan.filter((item) => placeMap.has(item.id)), [plan, placeMap]);

  const dayWarnings = useMemo(() => [1, 2, 3].map((day) => {
    const dayPlaces = activePlan.map((item) => item.day === day ? placeMap.get(item.id) : undefined).filter(Boolean) as Place[];
    const locations = Array.from(new Set(dayPlaces.map((p) => p.location.split("·")[0].trim())));
    return { day, count: dayPlaces.length, locations, scattered: locations.length > 2 };
  }), [activePlan, placeMap]);

  function generate() {
    setPlan(makePlan(places));
  }

  function clear() {
    setPlan([]);
  }

  function move(id: string, patch: Partial<Pick<PlanItem, "day" | "period">>) {
    setPlan((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  function remove(id: string) {
    setPlan((current) => current.filter((item) => item.id !== id));
  }

  const planPrompt = useMemo(() => {
    const lines = [1, 2, 3].flatMap((day) => PERIODS.map((period) => {
      const names = activePlan.filter((x) => x.day === day && x.period === period).map((x) => placeMap.get(x.id)?.name).filter(Boolean);
      const periodLabel = fr ? ({ morning: "matin", lunch: "déjeuner", afternoon: "après-midi", evening: "soir" } as const)[period] : period;
      return names.length ? `${fr ? "Jour" : "Day"} ${day} — ${periodLabel}: ${names.join(", ")}` : null;
    }).filter(Boolean));
    const base = villas[0] ? `${fr ? "Maison" : "Home base"}: ${villas[0].name} (${villas[0].location}). ` : "";
    return fr
      ? `${base}Voici mon planning actuel : ${lines.join(" | ")}. Optimise-le selon les temps de trajet, le bon rythme, les meilleurs moments de la journée et les compromis. Ne surcharge pas les journées.`
      : `${base}Here is my current plan: ${lines.join(" | ")}. Optimise it for travel time, pace, best times of day and trade-offs. Do not overload the days.`;
  }, [activePlan, placeMap, villas, fr]);

  const labels: Record<Period, string> = fr
    ? { morning: "MATIN", lunch: "DÉJEUNER", afternoon: "APRÈS-MIDI", evening: "SOIR" }
    : { morning: "MORNING", lunch: "LUNCH", afternoon: "AFTERNOON", evening: "EVENING" };

  if (!places.length) return null;

  return (
    <section className="mt-24 border-t border-black pt-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="lg-kicker text-[var(--lg-blue)]">MY STAY / PLANNER</p>
          <h2 className="mt-4 text-6xl font-black uppercase leading-[.84] tracking-[-.065em] md:text-8xl">
            {fr ? <>3 JOURS.<br/><span className="lg-accent">UN RYTHME.</span></> : <>3 DAYS.<br/><span className="lg-accent">ONE RHYTHM.</span></>}
          </h2>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-black/55">
            {fr ? "Transformez votre shortlist en séjour. Le planner propose un premier rythme, puis vous pouvez déplacer chaque étape avant de demander à LE GOLFE d’optimiser l’ensemble." : "Turn your shortlist into a stay. Start with a suggested rhythm, move each stop as needed, then let LE GOLFE tighten the flow."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <button onClick={generate} className="lg-btn bg-black text-white">{fr ? "Générer depuis ma sélection" : "Build from shortlist"}</button>
          {activePlan.length > 0 && <button onClick={clear} className="lg-btn">{fr ? "Effacer" : "Clear"}</button>}
        </div>
      </div>

      {villas[0] && <div className="mt-10 grid gap-3 border-y border-black py-4 md:grid-cols-[150px_1fr_auto] md:items-center">
        <p className="lg-kicker text-black/40">{fr ? "BASE DU SÉJOUR" : "HOME BASE"}</p>
        <div><p className="text-2xl font-black uppercase tracking-[-.035em]">{villas[0].name}</p><p className="mt-1 text-sm font-bold text-black/45">{villas[0].location}</p></div>
        <Link href={`/villa/${villas[0].id}`} className="text-[10px] font-black uppercase tracking-[.12em] lg-link-accent">{fr ? "Voir la maison" : "View villa"} →</Link>
      </div>}

      {activePlan.length === 0 ? (
        <div className="mt-10 border-y border-black py-12">
          <p className="max-w-xl text-3xl font-black uppercase tracking-[-.04em]">{fr ? "Votre sélection est prête. Générez un premier planning pour voir comment les lieux s’enchaînent." : "Your shortlist is ready. Build a first plan to see how the places fit together."}</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 xl:grid-cols-3">
          {[1, 2, 3].map((day) => {
            const warning = dayWarnings.find((x) => x.day === day)!;
            return <article key={day} className="border-t-4 border-black pt-4">
              <div className="flex items-start justify-between gap-4 border-b border-black pb-5">
                <div><p className="lg-kicker text-black/40">{fr ? "JOUR" : "DAY"}</p><p className="mt-1 text-7xl font-black leading-none tracking-[-.07em]">0{day}</p></div>
                <div className="max-w-[190px] text-right"><p className={`text-[9px] font-black uppercase tracking-[.12em] ${warning.scattered ? "text-[var(--lg-blue)]" : "text-black/35"}`}>{warning.scattered ? (fr ? "Journée dispersée" : "Scattered day") : (fr ? "Rythme cohérent" : "Coherent rhythm")}</p><p className="mt-2 text-xs font-bold leading-5 text-black/45">{warning.locations.join(" · ") || "—"}</p></div>
              </div>

              <div>
                {PERIODS.map((period) => {
                  const items = activePlan.filter((x) => x.day === day && x.period === period);
                  return <div key={period} className="border-b border-black/20 py-5">
                    <div className="flex items-center justify-between"><p className="lg-kicker text-[var(--lg-blue)]">{labels[period]}</p><span className="text-[9px] font-black text-black/25">{String(items.length).padStart(2, "0")}</span></div>
                    {items.length === 0 ? <p className="mt-4 text-sm font-semibold text-black/25">{fr ? "Libre." : "Open."}</p> : items.map((item) => {
                      const place = placeMap.get(item.id)!;
                      return <div key={item.id} className="mt-4 border-t border-black pt-4">
                        <p className="lg-kicker text-black/35">{getCategory(place.category)?.label} · {place.location}</p>
                        <Link href={`/${locale}/place/${place.id}`} className="mt-1 block text-2xl font-black uppercase tracking-[-.04em] lg-link-accent">{place.name}</Link>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-black uppercase tracking-[.11em]">
                          <button onClick={() => move(item.id, { day: day === 1 ? 3 : day - 1 })} className="lg-link-accent">← {fr ? "Jour" : "Day"}</button>
                          <button onClick={() => move(item.id, { period: nextPeriod(period) })} className="lg-link-accent">{fr ? "Moment suivant" : "Next slot"} ↓</button>
                          <button onClick={() => move(item.id, { day: day === 3 ? 1 : day + 1 })} className="lg-link-accent">{fr ? "Jour" : "Day"} →</button>
                          <button onClick={() => remove(item.id)} className="text-black/35 hover:text-black">{fr ? "Retirer" : "Remove"}</button>
                        </div>
                      </div>;
                    })}
                  </div>;
                })}
              </div>
            </article>;
          })}
        </div>
      )}

      {activePlan.length > 0 && <div className="mt-12 grid gap-6 border-y border-black bg-black p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div><p className="lg-kicker text-[var(--lg-blue)]">ASK LE GOLFE / OPTIMISE</p><p className="mt-3 max-w-3xl text-3xl font-black uppercase leading-[.95] tracking-[-.045em] md:text-5xl">{fr ? "LE PLANNING EST POSÉ. MAINTENANT, FAISONS-LE RESPIRER." : "THE PLAN IS SET. NOW LET'S MAKE IT BREATHE."}</p></div>
        <Link href={`/${locale}/ask?shortlist=${encodeURIComponent(planPrompt)}`} className="lg-btn border-[var(--lg-blue)] bg-[var(--lg-blue)] text-white">{fr ? "Optimiser avec Ask" : "Refine with Ask"} →</Link>
      </div>}
    </section>
  );
}
