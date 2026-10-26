import HomeUpdates from "../../components/HomeUpdates";
import { getPublicEvents } from "../../lib/publicEvents";
import { parisIsoDay } from "../../lib/localCalendar";
import { eventsInWindow, featuredEventsInWindow, dateWindow } from "../../lib/agendaCalendar";
import { pageMetadata } from "../../lib/seo";
import Link from "next/link";
import {notFound} from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import {localNews} from "../../data/localNews";
import {isLocale} from "../../lib/i18n";
import Image from "next/image";
import {guides} from "../../data/guides";
import GuideCards from "../../components/GuideCards";
import {places,placeDescriptionFr} from "../../data/places";
import {mediaForPlace} from "../../lib/placeMedia";

export default async function Home({params}:{params:Promise<{locale:string}>}){
 const {locale:l}=await params;if(!isLocale(l))notFound();const fr=l==="fr";
 const picks=[
  {id:"grimaud",name:"Grimaud",path:"/destinations/grimaud",src:"/media/tourist-map/grimaud-illustration.webp"},
  {id:"saint-tropez",name:"Saint-Tropez",path:"/destinations/saint-tropez",src:"/media/tourist-map/saint-tropez-illustration.webp"},
  {id:"sainte-maxime",name:"Sainte-Maxime",path:"/destinations/sainte-maxime",src:"/media/tourist-map/sainte-maxime-illustration.webp"},
 ];
 const window=dateWindow("7days",parisIsoDay());
 const upcoming=eventsInWindow(await getPublicEvents(),window);
 const now=featuredEventsInWindow(upcoming,window),news=localNews.filter(n=>n.featured).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
 const intents=[
  {label:fr?"AU CALME":"QUIET",sub:fr?"Villages, collines, rythme lent":"Villages, hills, slower rhythm",mood:"quiet"},
  {label:fr?"PLAGE":"BEACH DAY",sub:fr?"Choisir la bonne plage, pas juste la plus connue":"The right beach, not just the famous one",mood:"beach"},
  {label:fr?"BELLE VUE":"A VIEW",sub:fr?"Déjeuner, dormir ou marcher avec le Golfe en face":"Lunch, stay or walk with the Golfe in sight",mood:"view"},
  {label:fr?"EN FAMILLE":"FAMILY",sub:fr?"Des lieux qui fonctionnent vraiment avec des enfants":"Places that genuinely work with children",mood:"family"},
  {label:fr?"BIEN MANGER":"EAT WELL",sub:fr?"La bonne table pour le bon moment":"The right table for the right moment",mood:"eat"},
  {label:fr?"SORTIR":"PARTYING",sub:fr?"Bars, clubs et soirées qui se prolongent":"Bars, clubs and nights that go on",mood:"party"},
 ];
 return <main className="home-page min-h-screen bg-white text-black"><SiteHeader locale={l}/>
  <section className="lg-shell pb-14 pt-10 md:pb-20 md:pt-16">
   <p className="lg-kicker">Golfe de Saint-Tropez / {fr?"Le guide local":"Local intelligence"}</p>
   <h1 className="lg-menu-title mt-7 max-w-full text-[var(--lg-blue)]">{fr?<>LE GOLFE.<br/><span className="lg-accent">AUTREMENT.</span></>:<>THE GOLFE.<br/><span className="lg-accent">DIFFERENTLY.</span></>}</h1>
   <div className="mt-9 grid gap-7 border-t border-black pt-6 md:grid-cols-[1fr_auto] md:items-start">
    <p className="max-w-2xl text-[18px] font-bold leading-7 md:text-[21px] md:leading-8">{fr?"Le bon village. La bonne table. La bonne plage. La bonne maison. Pas plus de choix — de meilleurs choix.":"The right village. The right table. The right beach. The right stay. Not more choice — better choices."}</p>
    <div className="flex gap-2"><Link href={`/${l}/ask`} className="lg-btn bg-[var(--lg-blue)] text-white !border-[var(--lg-blue)]">{fr?"Demander à LE GOLFE":"Ask Le Golfe"}</Link><Link href={`/${l}/explore`} className="lg-btn">{fr?"Explorer":"Explore"}</Link></div>
   </div>
  </section>

  <section className="lg-shell">
   <Link href={`/${l}/explore`} className="group block">
    <div className="lg-image mobile-edge aspect-[4/5] sm:aspect-[16/10] md:mx-0 md:aspect-[16/7]"><img src="/images/saint-tropez-home-v43.png" alt={fr ? "Saint-Tropez, son clocher et le port face au Golfe" : "Saint-Tropez, its bell tower and harbour overlooking the Golfe"} width={1539} height={1022} fetchPriority="high" style={{objectPosition:"55% 65%"}}/></div>
    <div className="grid gap-4 border-b border-black py-5 md:grid-cols-[1fr_auto] md:items-end"><div><p className="lg-kicker">LE GOLFE / {fr?"TERRITOIRE":"TERRITORY"}</p><h2 className="lg-title mt-3 max-w-5xl text-[12vw] uppercase md:text-[72px]">{fr?<>UN TERRITOIRE. PLUSIEURS FAÇONS DE LE VIVRE.</>:<>ONE GOLFE. MANY WAYS TO LIVE IT.</>}</h2></div><span className="text-4xl font-black">↗</span></div>
    <p className="lg-credit">{fr ? "Saint-Tropez · Le port et le Golfe" : "Saint-Tropez · The harbour and the Golfe"}</p>
   </Link>
  </section>

  <section className="lg-shell py-16 md:py-20">
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
      <div className="min-w-0 lg:order-2">
        <div className="mb-8 lg:mb-6">
          <p className="lg-kicker">{fr?"COMMENCER PAR UNE ENVIE":"START WITH A FEELING"}</p>
          <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-black/45">{fr?"Vous n'avez pas besoin de connaître le Golfe. Commencez par ce que vous voulez ressentir.":"You do not need to know the Golfe. Start with how you want it to feel."}</p>
        </div>
        <nav aria-label={fr?"Explorer selon vos envies":"Explore by mood"} className="border-t border-black">
          {intents.map(item=><Link key={item.mood} href={`/${l}/explore?mood=${item.mood}`} className="group lg-link-accent grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-black py-6 lg:py-[15px]">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[.13em] text-black/45">{item.sub}</p>
              <p className="mt-2 text-[12vw] font-black uppercase leading-[.82] tracking-[-.065em] sm:text-[65px] lg:mt-1.5 lg:text-[clamp(1.65rem,2.7vw,2.75rem)]">{item.label}</p>
            </div>
            <span aria-hidden="true" className="text-3xl font-black transition-transform duration-200 group-hover:translate-x-1 lg:text-2xl">↗</span>
          </Link>)}
        </nav>
      </div>
      <div className="hidden min-w-0 lg:order-1 lg:block">
        <div className="mb-6 flex items-end justify-between gap-5 border-b border-black pb-4">
          <div><p className="lg-kicker text-[var(--lg-blue)]">{fr?"LA SÉLECTION LE GOLFE":"THE LE GOLFE EDIT"}</p><h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-.055em]">{fr?"TROIS ADRESSES À EXPLORER.":"THREE PLACES TO EXPLORE."}</h2></div>
          <Link href={`/${l}/explore`} className="shrink-0 text-[10px] font-black uppercase tracking-[.12em] underline underline-offset-4">{fr?"Toutes les fiches":"All places"} ↗</Link>
        </div>
        <div className="grid gap-5">
          {["pampelonne","san-peire-randonnee","caves-du-roy"].map((id,i)=>{
            const place=places.find(p=>p.id===id)!;const media=mediaForPlace(id);
            const photo=id==="san-peire-randonnee"?"/media/guides/san-peire-cover.webp":media?.src;
            const name=id==="san-peire-randonnee"?(fr?"Randonnée San Peïre":"San Peïre hike"):place.name;
            const description=fr?(placeDescriptionFr[id]||place.description):place.description;
            return <article key={id} className="grid grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] gap-5 border-b border-black/20 pb-5">
              <Link href={`/${l}/place/${id}`} className="block aspect-[3/2] overflow-hidden bg-[#edf4f6]">{photo?<img src={photo} alt={name} loading="lazy" className="h-full w-full object-cover"/>:<span className="flex h-full items-center justify-center text-3xl font-black">LE GOLFE</span>}</Link>
              <div className="min-w-0">
                <p className="lg-kicker text-[var(--lg-blue)]">0{i+1} / {fr?"FICHE EXPLORER":"EXPLORE PLACE"}</p>
                <h3 className="mt-3 text-[clamp(1.1rem,1.75vw,1.8rem)] font-black uppercase leading-[1.03] tracking-[-.045em]"><Link href={`/${l}/place/${id}`} className="lg-link-accent">{name} <span aria-hidden="true">↗</span></Link></h3>
                <p className="mt-3 line-clamp-3 text-xs leading-5 text-black/65">{description}</p>
              </div>
            </article>;
          })}
        </div>
      </div>
    </div>
  </section>

  <section className="home-ask lg-dark"><div className="lg-shell py-20 md:py-28">
    <div className="grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-end"><div><p className="lg-kicker text-white/55">{fr?"DEMANDER À LE GOLFE":"ASK LE GOLFE"}</p><h2 className="lg-title mt-4 text-[14vw] uppercase md:text-[86px]">{fr?<>DITES-NOUS <span className="text-[var(--lg-sky)]">LE SÉJOUR</span> QUE VOUS VOULEZ.</>:<>TELL US <span className="text-[var(--lg-sky)]">THE STAY</span> YOU WANT.</>}</h2></div><div className="border-t border-white pt-6"><p className="max-w-xl text-lg font-bold leading-7 text-white/70">{fr?"Deux enfants, une plage facile, un bon déjeuner et pas envie de passer la journée dans la voiture ? C'est exactement le type de demande que LE GOLFE doit comprendre.":"Two children, an easy beach, a great lunch and no desire to spend the day in the car? That is exactly the kind of brief LE GOLFE should understand."}</p><Link href={`/${l}/ask`} className="home-ask-button mt-7 inline-flex min-h-12 items-center px-5 text-[10px] font-black uppercase tracking-[.14em] text-white">{fr?"Demander à LE GOLFE":"Ask Le Golfe"} →</Link></div></div>
  </div></section>

  <section className="lg-shell py-20 md:py-28">
   <div className="flex items-end justify-between border-b border-black pb-5"><div><p className="lg-kicker">{fr?"DÉCOUVRIR / 3 VILLAGES":"DISCOVER / 03 TOWNS"}</p><h2 className="lg-title mt-3 text-[12vw] uppercase md:text-[82px]">{fr?<>ICI, <span className="lg-accent">PAS AILLEURS.</span></>:<>HERE, <span className="lg-accent">NOT ELSEWHERE.</span></>}</h2></div><Link href={`/${l}/carte-touristique`} className="hidden lg-kicker md:block">{fr?"Tout découvrir":"View all"} ↗</Link></div>
   <div className="grid md:grid-cols-3">{picks.map((p,i)=><Link key={p.id} href={`/${l}${p.path}`} className={`group py-5 md:px-5 ${i<2?"border-b border-black md:border-b-0 md:border-r":""} ${i===0?"md:pl-0":""} ${i===2?"md:pr-0":""}`}><div className="lg-image aspect-[3/2]"><Image src={p.src} alt={fr?`Illustration de ${p.name} · LE GOLFE`:`Illustration of ${p.name} · LE GOLFE`} width={600} height={400} sizes="(max-width: 767px) 100vw, 33vw" style={{objectFit:"contain",transform:"none"}}/></div><p className="lg-kicker mt-4 text-black/40">{fr?"VILLAGES & LIEUX":"VILLAGES & PLACES"}</p><h3 className="mt-2 text-[34px] font-black uppercase leading-[.88] tracking-[-.055em] md:text-[42px]">{p.name}</h3></Link>)}</div>
   <p className="lg-credit">{fr?"Illustrations · LE GOLFE":"Illustrations · LE GOLFE"}</p>
  </section>

  <HomeUpdates locale={l} events={now} news={news} window={window}/>
  <section className="lg-shell py-16 md:py-24">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-black pb-6"><div><p className="lg-kicker text-[var(--lg-blue)]">LE GOLFE / GUIDES</p><h2 className="lg-title mt-4 text-[12vw] uppercase md:text-[72px]">{fr?"PRÉPAREZ LE TERRAIN.":"MAKE YOUR PLAN."}</h2></div><Link href={`/${l}/guides`} className="lg-btn">{fr?"Tous les guides":"All guides"} ↗</Link></div>
    <GuideCards items={guides.slice(0,2)} locale={l}/>
  </section>

 </main>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 return pageMetadata({ title: locale === "fr" ? "Guide du Golfe de Saint-Tropez : plages, restaurants et villas" : "Golfe de Saint-Tropez guide: beaches, restaurants and villas", description: locale === "fr" ? "Explorez les villages, plages, restaurants et événements du Golfe de Saint-Tropez et trouvez une villa adaptée à votre séjour." : "Explore villages, beaches, restaurants and events around the Golfe de Saint-Tropez and find the right villa for your stay.", path: `/${locale}`, locale, image: { src: "/images/saint-tropez-home-v43.png", alt: locale === "fr" ? "Saint-Tropez, son clocher et le port face au Golfe" : "Saint-Tropez, its bell tower and harbour overlooking the Golfe" } });
}
