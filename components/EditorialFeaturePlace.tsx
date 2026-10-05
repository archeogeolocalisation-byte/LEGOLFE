import Link from "next/link";
import CommunitySection from "./CommunitySection";
import PlaceActions from "./PlaceActions";
import SiteHeader from "./SiteHeader";
import { places } from "../data/places";
import type { EditorialFeature } from "../data/editorialFeatures";
import {photosForPlace} from "../lib/curatedPlaceGallery";
import PlaceMediaGallery from "./PlaceMediaGallery";

export default function EditorialFeaturePlace({ feature, locale }: { feature: EditorialFeature; locale: "fr" | "en" }) {
  const c = feature[locale];
  const place = places.find((p) => p.id === feature.id)!;
  const photos = photosForPlace(feature.id);
  return <main className="min-h-screen bg-white text-black">
    <SiteHeader locale={locale} path={`/place/${feature.id}`} />
    <section className="lg-shell pb-12 pt-10 md:pt-16">
      <p className="lg-kicker">{c.kicker}</p>
      <h1 className="mt-5 text-[14vw] font-black leading-[.78] tracking-[-.075em] md:text-[138px]">{c.title}</h1>
      <div className="mt-8 grid gap-8 border-t border-black pt-6 md:grid-cols-2">
        <h2 className="text-4xl font-black leading-[.9] tracking-[-.05em] md:text-6xl">{c.sub}</h2>
        <p className="max-w-xl text-lg font-bold leading-7 text-black/55">{c.intro}</p>
      </div>
    </section>

    {photos.length>0 ? <PlaceMediaGallery name={place.name} photos={photos} locale={locale}/> : <section className="lg-shell"><div className="mobile-edge flex min-h-[420px] items-end bg-[#071D2B] p-8 text-white md:mx-0 md:min-h-[560px] md:p-14"><p className="max-w-full break-words text-[clamp(2.5rem,9vw,8rem)] font-black uppercase leading-[.88] tracking-[-.06em] [overflow-wrap:anywhere]">{place.name}</p></div></section>}

    <section className="lg-shell py-20 md:py-24"><div className="lg-quote-box grid gap-10 md:grid-cols-[.35fr_1.65fr]"><div><p className="lg-kicker">{c.quoteLabel}</p><div className="lg-blue-rule mt-5"/></div><div><p className="max-w-4xl text-5xl font-black leading-[.95] tracking-[-.055em] md:text-8xl">“{c.quote}”</p><p className="mt-8 max-w-2xl text-lg leading-8 text-black/55">{c.quoteBody}</p></div></div></section>

    <section className="border-t border-black"><div className="lg-shell py-20"><p className="lg-kicker">{c.rhythmLabel}</p><h2 className="mt-5 max-w-5xl text-5xl font-black leading-[.9] tracking-[-.055em] md:text-8xl">{c.rhythmTitle}</h2><div className="mt-16 grid border-t border-black md:grid-cols-3">{c.moments.map(([k,t,b])=><article key={k} className="border-b border-black py-8 md:border-b-0 md:border-r md:px-8 first:md:pl-0 last:md:border-r-0"><p className="text-[10px] font-black tracking-[.18em] text-[#0B4F6C]">{k}</p><h3 className="mt-5 text-3xl font-black tracking-[-.04em]">{t}</h3><p className="mt-5 text-sm leading-7 text-black/55">{b}</p></article>)}</div></div></section>

    <section className="lg-shell pb-24"><div className="grid gap-12 border-t border-black pt-10 md:grid-cols-[.7fr_1.3fr]"><p className="lg-kicker">{c.layerLabel}</p><div><h2 className="text-5xl font-black leading-[.9] tracking-[-.055em] md:text-8xl">{c.layerTitle}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-black/55">{c.layerBody}</p></div></div></section>

    <section className="bg-black text-white"><div className="lg-shell py-24"><p className="lg-kicker lg-accent">{c.darkLabel}</p><div className="lg-blue-rule mt-5"/><div className="mt-8 grid gap-12 md:grid-cols-[1.15fr_.85fr]"><h2 className="text-5xl font-black leading-[.88] tracking-[-.055em] md:text-8xl">{c.darkTitle}</h2><p className="max-w-xl text-lg leading-8 text-white/60">{c.darkBody}</p></div></div></section>

    <section className="lg-shell py-24"><p className="lg-kicker">{c.closeLabel}</p><div className="mt-5 grid gap-12 md:grid-cols-[1.15fr_.85fr]"><h2 className="text-5xl font-black leading-[.9] tracking-[-.055em] md:text-8xl">{c.closeTitle}</h2><p className="max-w-xl text-lg leading-8 text-black/55">{c.closeBody}</p></div><div className="mt-20 grid border-y border-black md:grid-cols-4">{c.facts.map(([a,b])=><div key={a} className="border-b border-black py-6 md:border-b-0 md:border-r md:px-6 first:md:pl-0 last:md:border-r-0"><p className="text-[10px] font-black tracking-[.18em] text-[#0B4F6C]">{a}</p><p className="mt-3 text-sm font-bold leading-6 text-black/55">{b}</p></div>)}</div><div className="mt-16 grid gap-12 md:grid-cols-2"><Info title={c.bestLabel} items={c.bestItems}/><Info title={c.lessLabel} items={c.lessItems}/></div></section>

    <section className="border-y border-black bg-[#f7f7f4]"><div className="lg-shell py-20 md:py-24"><p className="lg-kicker lg-accent">{c.practicalLabel}</p><div className="mt-5 grid gap-10 md:grid-cols-[1.1fr_.9fr]"><h2 className="text-5xl font-black leading-[.9] tracking-[-.055em] md:text-7xl">{c.practicalTitle}</h2><div className="grid grid-cols-2 gap-x-7 gap-y-8">{c.practical.map(([k,v])=><div key={k} className="border-t border-black pt-4"><p className="text-[10px] font-black tracking-[.18em] text-[#0B4F6C]">{k}</p><p className="mt-3 text-sm font-bold leading-6 text-black/60">{v}</p></div>)}</div></div><div className="mt-16 border-t border-black pt-8"><p className="lg-kicker">{c.linksLabel}</p><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">{c.links.map(([label,href])=><a key={href} href={href} target="_blank" rel="noreferrer" className="border-b border-[#0B4F6C] pb-1 text-sm font-black hover:text-[#0B4F6C]">{label} ↗</a>)}</div></div></div></section>

    <section className="lg-shell py-14"><div className="flex flex-wrap items-center justify-between gap-5 border-t border-black pt-7"><p className="max-w-2xl text-sm font-bold text-black/50">{locale === "fr" ? "Ajoutez ce lieu à votre séjour ou demandez à LE GOLFE comment l'intégrer au bon moment." : "Save this place to your stay or ask LE GOLFE how to fit it into the right moment."}</p><Link href={`/${locale}/ask?place=${encodeURIComponent(place.name)}`} className="bg-[#0B4F6C] px-6 py-3 text-xs font-black uppercase tracking-[.1em] text-white">{c.ask} →</Link></div></section>
    <PlaceActions place={place} locale={locale}/>
    <CommunitySection placeId={feature.id} locale={locale}/>
  </main>;
}

function Info({title,items}:{title:string;items:string[]}){return <div><p className="text-[10px] font-bold tracking-[.22em]">{title}</p><ul className="mt-5 space-y-3 text-sm leading-6 text-black/65">{items.map(x=><li key={x}>— {x}</li>)}</ul></div>}

