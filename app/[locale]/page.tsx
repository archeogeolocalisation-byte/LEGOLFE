import HomeUpdates from "../../components/HomeUpdates";
import { getPublicEvents } from "../../lib/publicEvents";
import { parisIsoDay } from "../../lib/localCalendar";
import { eventsInWindow, dateWindow } from "../../lib/agendaCalendar";
import { pageMetadata } from "../../lib/seo";
import Link from "next/link";
import {notFound} from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import {localNews} from "../../data/localNews";
import {isLocale} from "../../lib/i18n";
import Image from "next/image";
import {guides} from "../../data/guides";
import GuideCards from "../../components/GuideCards";

export default async function Home({params}:{params:Promise<{locale:string}>}){
 const {locale:l}=await params;if(!isLocale(l))notFound();const fr=l==="fr";
 const picks=[
  {id:"grimaud",name:"Grimaud",path:"/destinations/grimaud",src:"/media/tourist-map/grimaud-illustration.webp"},
  {id:"saint-tropez",name:"Saint-Tropez",path:"/destinations/saint-tropez",src:"/media/tourist-map/saint-tropez-illustration.webp"},
  {id:"sainte-maxime",name:"Sainte-Maxime",path:"/destinations/sainte-maxime",src:"/media/tourist-map/sainte-maxime-illustration.webp"},
 ];
 const window=dateWindow("7days",parisIsoDay());
 const upcoming=eventsInWindow(await getPublicEvents(),window);
 const now=[...upcoming.filter(e=>e.featured),...upcoming.filter(e=>!e.featured)].slice(0,3),news=localNews.filter(n=>n.featured).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
 const intents=[
  {label:fr?"AU CALME":"QUIET",sub:fr?"Villages, collines, rythme lent":"Villages, hills, slower rhythm",mood:"quiet"},
  {label:fr?"PLAGE":"BEACH DAY",sub:fr?"Choisir la bonne plage, pas juste la plus connue":"The right beach, not just the famous one",mood:"beach"},
  {label:fr?"BELLE VUE":"A VIEW",sub:fr?"Déjeuner, dormir ou marcher avec le Golfe en face":"Lunch, stay or walk with the Golfe in sight",mood:"view"},
  {label:fr?"EN FAMILLE":"FAMILY",sub:fr?"Des lieux qui fonctionnent vraiment avec des enfants":"Places that genuinely work with children",mood:"family"},
  {label:fr?"BIEN MANGER":"EAT WELL",sub:fr?"La bonne table pour le bon moment":"The right table for the right moment",mood:"eat"},
  {label:fr?"SORTIR":"PARTYING",sub:fr?"Bars, clubs et soirées qui se prolongent":"Bars, clubs and nights that go on",mood:"party"},
 ];
 return <main className="min-h-screen bg-white text-black"><SiteHeader locale={l}/>
  <section className="lg-shell pb-14 pt-10 md:pb-20 md:pt-16">
   <p className="lg-kicker">Golfe de Saint-Tropez / {fr?"Le guide local":"Local intelligence"}</p>
   <h1 className="lg-display mt-7 max-w-full text-[clamp(2.45rem,10.5vw,7.5rem)]">{fr?<>LE GOLFE.<br/><span className="lg-accent">AUTREMENT.</span></>:<>THE GOLFE.<br/><span className="lg-accent">DIFFERENTLY.</span></>}</h1>
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

  <section className="lg-shell py-16 md:py-28">
    <div className="grid gap-8 md:grid-cols-[.38fr_1.62fr]">
      <div><p className="lg-kicker">{fr?"COMMENCER PAR UNE ENVIE":"START WITH A FEELING"}</p><p className="mt-5 max-w-[250px] text-sm font-semibold leading-6 text-black/45">{fr?"Vous n'avez pas besoin de connaître le Golfe. Commencez par ce que vous voulez ressentir.":"You do not need to know the Golfe. Start with how you want it to feel."}</p></div>
      <div className="border-t border-black">{intents.map((item)=><Link key={item.mood} href={`/${l}/explore?mood=${item.mood}`} className="group lg-link-accent grid gap-2 border-b border-black py-6 md:grid-cols-[1fr_auto] md:items-end md:py-8"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-black/40">{item.sub}</p><p className="mt-2 text-[12vw] font-black uppercase leading-[.78] tracking-[-.07em] md:text-[64px]">{item.label}</p></div><span className="text-3xl font-black transition-transform duration-200 group-hover:translate-x-2 md:text-5xl">↗</span></Link>)}</div>
    </div>
  </section>

  <section className="bg-black text-white"><div className="lg-shell py-20 md:py-28">
    <div className="grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-end"><div><p className="lg-kicker text-white/55">{fr?"DEMANDER À LE GOLFE":"ASK LE GOLFE"}</p><h2 className="lg-title mt-4 text-[14vw] uppercase md:text-[86px]">{fr?<>DITES-NOUS <span className="text-[var(--lg-blue)]">LE SÉJOUR</span> QUE VOUS VOULEZ.</>:<>TELL US <span className="text-[var(--lg-blue)]">THE STAY</span> YOU WANT.</>}</h2></div><div className="border-t border-white pt-6"><p className="max-w-xl text-lg font-bold leading-7 text-white/70">{fr?"Deux enfants, une plage facile, un bon déjeuner et pas envie de passer la journée dans la voiture ? C'est exactement le type de demande que LE GOLFE doit comprendre.":"Two children, an easy beach, a great lunch and no desire to spend the day in the car? That is exactly the kind of brief LE GOLFE should understand."}</p><Link href={`/${l}/ask`} className="mt-7 inline-flex min-h-12 items-center bg-[var(--lg-blue)] px-5 text-[10px] font-black uppercase tracking-[.14em] text-white">{fr?"Demander à LE GOLFE":"Ask Le Golfe"} →</Link></div></div>
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
  <SiteFooter locale={l}/>
 </main>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params; if (!isLocale(locale)) notFound();
 return pageMetadata({ title: locale === "fr" ? "Guide du Golfe de Saint-Tropez : plages, restaurants et villas" : "Golfe de Saint-Tropez guide: beaches, restaurants and villas", description: locale === "fr" ? "Explorez les villages, plages, restaurants et événements du Golfe de Saint-Tropez et trouvez une villa adaptée à votre séjour." : "Explore villages, beaches, restaurants and events around the Golfe de Saint-Tropez and find the right villa for your stay.", path: `/${locale}`, locale, image: { src: "/images/saint-tropez-home-v43.png", alt: locale === "fr" ? "Saint-Tropez, son clocher et le port face au Golfe" : "Saint-Tropez, its bell tower and harbour overlooking the Golfe" } });
}
