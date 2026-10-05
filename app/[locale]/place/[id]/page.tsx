import DiscoveryFeaturePlace from '../../../../components/DiscoveryFeaturePlace';
import {discoveryFeatures} from '../../../../data/discoveryFeatures';
import VillageSignature from "../../../../components/VillageSignature";
import {legacyPlaceFeatures} from "../../../../data/legacyPlaceFeatures";
import {photosForPlace} from "../../../../lib/curatedPlaceGallery";
import PlaceMediaGallery from "../../../../components/PlaceMediaGallery";
import PlacePreparation from "../../../../components/PlacePreparation";
import VillageFeaturePlace from "../../../../components/VillageFeaturePlace";
import { villageFeatures } from "../../../../data/villageFeatures";
import { destinationForLocation } from "../../../../data/destinations";
import { pageMetadata, absoluteUrl, siteOrigin } from "../../../../lib/seo";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import JsonLd from "../../../../components/JsonLd";
import PlaceCard from "../../../../components/PlaceCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../components/SiteHeader";
import CommunitySection from "../../../../components/CommunitySection";
import PlaceActions from "../../../../components/PlaceActions";
import EditorialFeaturePlace from "../../../../components/EditorialFeaturePlace";
import { getCategory, placeDescriptionFr, places } from "../../../../data/places";
import { categoryFR, isLocale, ui } from "../../../../lib/i18n";
import { mediaForPlace } from "../../../../lib/placeMedia";
import { editorialFeatures, editorialFeatureIds } from "../../../../data/editorialFeatures";

async function PlaceContent({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: l, id } = await params;
  if (!isLocale(l)) notFound();
  const p = places.find((x) => x.id === id);
  if (!p) notFound();

  if (discoveryFeatures[id]) return <DiscoveryFeaturePlace id={id} locale={l} />;
  if (legacyPlaceFeatures[id]) return <LegacyPlacePage id={id} locale={l} />;
  if (villageFeatures[id]) return <VillageFeaturePlace id={id} locale={l} />;
  if (editorialFeatureIds.has(id)) return <EditorialFeaturePlace feature={editorialFeatures[id]} locale={l} />;

  const c = getCategory(p.category)!;
  const t = ui[l];
  const desc = l === "fr" ? placeDescriptionFr[id] || p.description : p.description;
  const curatedMedia = mediaForPlace(id);

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <SiteHeader light locale={l} path={`/place/${id}`} />
      <section className="px-6 pb-24 pt-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Link href={`/${l}/explore/${p.category}`} className="text-xs opacity-45">← {l === "fr" ? categoryFR[p.category].name : c.name}</Link>
          {curatedMedia && <div className="mt-10"><div className="aspect-[16/8] min-h-[360px] overflow-hidden bg-black"><img src={curatedMedia.src} alt={curatedMedia.alt} className="h-full w-full object-cover"/></div>{(curatedMedia.credit||curatedMedia.license)&&<p className="mt-2 text-[9px] uppercase tracking-[.12em] opacity-35">Photo: {curatedMedia.credit} · {curatedMedia.license}</p>}</div>}
          <div className="mt-12 grid gap-14 md:grid-cols-[1.15fr_.85fr]">
            <div><p className="text-[10px] font-bold tracking-[.22em] text-[#000000]">{c.label} · {p.location}</p><h1 className="mt-5 font-black text-6xl md:text-8xl">{p.name}</h1><p className="mt-8 max-w-2xl text-lg leading-8 opacity-65">{desc}</p></div>
            <aside className="bg-[#000000] p-7 text-white"><p className="text-[10px] font-bold tracking-[.22em] text-[#FFFFFF]">LE GOLFE NOTE</p><p className="mt-4 font-black text-3xl">{t.right}</p><p className="mt-4 text-sm leading-6 text-white/55">{t.rightDesc}</p><Link href={`/${l}/ask`} className="mt-7 inline-block bg-[#000000] px-5 py-3 text-sm">{t.ask} →</Link></aside>
          </div>
          <div className="mt-20 grid gap-10 border-t pt-10 md:grid-cols-3"><Info title={t.best} items={p.bestFor}/><Info title={t.know} items={p.goodToKnow}/><Info title={t.notIdeal} items={p.notIdealFor}/></div>
        </div>
      </section>
      <PlaceActions place={p} locale={l} />
      <CommunitySection placeId={id} locale={l} />
    </main>
  );
}


const villagePractical = {
  "plan-de-la-tour-village": {
    fr: {
      label: "PRATIQUE", title: "À SAVOIR AVANT D'Y ALLER",
      items: [
        ["MARCHÉ", "Jeudi matin, place Foch, toute l'année."],
        ["STATIONNEMENT", "Plusieurs parkings au centre, dont Parking Foch derrière la mairie (144 places, gratuit)."],
        ["RANDONNÉE", "San Peïre culmine à 416 m. En été, vérifier l'accès aux massifs avant de partir."],
        ["MOBILITÉ", "Arrêt ZOU à proximité de l'office de tourisme ; voiture utile pour les hameaux et les collines."],
      ],
      threeLabel: "SI VOUS AVEZ 3 HEURES", threeTitle: "Village. Café. Hauteurs.",
      steps: ["Commencer place Foch et traverser le village à pied.", "Prendre un café ou déjeuner léger autour des places.", "Finir par une balade courte vers les collines — ou San Peïre si vous avez plus de temps."],
      linksLabel: "LIENS UTILES", links: [
        ["Office de tourisme", "https://www.golfe-sainttropez-tourisme.fr/decouvrir/notre-territoire/plan-de-la-tour/"],
        ["Parkings", "https://www.golfe-sainttropez-tourisme.fr/sejourner/pratique/stationner/?commune=le-plan-de-la-tour&f=1&utf8=%E2%9C%93"],
        ["Office & accessibilité", "https://www.golfe-sainttropez-tourisme.fr/sejourner/office-de-tourisme/nos-bureaux-dinformation-touristique/"],
      ],
    },
    en: {
      label: "PRACTICAL", title: "KNOW BEFORE YOU GO",
      items: [
        ["MARKET", "Thursday morning on Place Foch, year-round."],
        ["PARKING", "Several central car parks, including free Parking Foch behind the town hall (144 spaces)."],
        ["WALK", "San Peïre reaches 416 m. In summer, check forest-access restrictions before setting out."],
        ["GETTING AROUND", "A ZOU stop sits near the tourist office; a car is useful for hamlets and hills."],
      ],
      threeLabel: "IF YOU HAVE 3 HOURS", threeTitle: "Village. Coffee. Hills.",
      steps: ["Start on Place Foch and cross the village on foot.", "Stop for coffee or a light lunch around the squares.", "Finish with a short countryside walk — or San Peïre if you have more time."],
      linksLabel: "USEFUL LINKS", links: [
        ["Tourism office", "https://www.golfe-sainttropez-tourisme.fr/decouvrir/notre-territoire/plan-de-la-tour/"],
        ["Parking", "https://www.golfe-sainttropez-tourisme.fr/sejourner/pratique/stationner/?commune=le-plan-de-la-tour&f=1&utf8=%E2%9C%93"],
        ["Tourism office access", "https://www.golfe-sainttropez-tourisme.fr/sejourner/office-de-tourisme/nos-bureaux-dinformation-touristique/"],
      ],
    },
  },
  "ramatuelle-village": {
    fr: { label:"PRATIQUE", title:"RAMATUELLE, SANS PERDRE DE TEMPS", items:[["MARCHÉ","Jeudi et dimanche matin, place de l'Ormeau."],["PLAGES","Navette gratuite village → plages toutes les 20 min du 15 juin au 22 septembre 2026."],["BUS","Ligne ZOU 875 vers les plages du 1er mai au 27 septembre 2026."],["VOITURE","Utile hors saison et pour combiner village, Pampelonne et l'Escalet."]], threeLabel:"SI VOUS AVEZ 3 HEURES", threeTitle:"Village d'abord. Vue ensuite.", steps:["Arriver tôt et commencer place de l'Ormeau.","Faire la boucle des ruelles sans chercher à tout cocher.","Monter vers Paillas ou redescendre vers la mer selon l'heure."], linksLabel:"LIENS UTILES", links:[["Office de tourisme","https://www.ramatuelle-tourisme.com/fr/"],["Marché","https://www.ramatuelle-tourisme.com/fr/animation/manifestations-commerciales/ramatuelle/marche-provencal-4601577/"],["Questions pratiques","https://www.ramatuelle-tourisme.com/fr/vos-questions-nos-reponses/"]]},
    en: { label:"PRACTICAL", title:"RAMATUELLE, WITHOUT WASTING TIME", items:[["MARKET","Thursday and Sunday mornings on Place de l'Ormeau."],["BEACHES","Free village-to-beach shuttle every 20 min from 15 June to 22 September 2026."],["BUS","ZOU line 875 serves the beaches from 1 May to 27 September 2026."],["CAR","Useful outside the shuttle season and for combining village, Pampelonne and l'Escalet."]], threeLabel:"IF YOU HAVE 3 HOURS", threeTitle:"Village first. View next.", steps:["Arrive early and start on Place de l'Ormeau.","Walk the lanes without trying to tick every sight.","Head toward Paillas or down toward the sea depending on the hour."], linksLabel:"USEFUL LINKS", links:[["Tourism office","https://www.ramatuelle-tourisme.com/fr/"],["Market","https://www.ramatuelle-tourisme.com/fr/animation/manifestations-commerciales/ramatuelle/marche-provencal-4601577/"],["Practical FAQ","https://www.ramatuelle-tourisme.com/fr/vos-questions-nos-reponses/"]]},
  },
  "saint-tropez-village": {
    fr: { label:"PRATIQUE", title:"SAINT-TROPEZ SE JOUE SUR LE TIMING", items:[["MARCHÉ","Mardi et samedi, place des Lices."],["PARKING","Nouveau Port : 1 400 places ; Parc des Lices : 300 ; Foch : 100."],["À PIED","Une fois garé, port, vieille ville, Lices et Citadelle se combinent très bien à pied."],["AGENDA","Vérifier l'agenda avant de venir : régates, braderie et grands événements changent fortement l'accès."]], threeLabel:"SI VOUS AVEZ 3 HEURES", threeTitle:"Lices. Ponche. Citadelle.", steps:["Commencer tôt aux Lices ou sur le port.","Traverser la vieille ville jusqu'à la Ponche.","Finir à la Citadelle avant de redescendre pour déjeuner."], linksLabel:"LIENS UTILES", links:[["Office de tourisme","https://www.sainttropeztourisme.com/"],["Parkings","https://www.sainttropeztourisme.com/fr/fiche/parkings-de-saint-tropez-7530485/"],["Place des Lices","https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/"],["Agenda","https://www.sainttropeztourisme.com/fr/evenements-saint-tropez/agenda-evenements-saint-tropez/"]]},
    en: { label:"PRACTICAL", title:"SAINT-TROPEZ IS ALL ABOUT TIMING", items:[["MARKET","Tuesday and Saturday on Place des Lices."],["PARKING","Nouveau Port: 1,400 spaces; Parc des Lices: 300; Foch: 100."],["ON FOOT","Once parked, the port, old town, Lices and Citadel combine easily on foot."],["CALENDAR","Check the event calendar first: regattas, sales and major events can transform access." ]], threeLabel:"IF YOU HAVE 3 HOURS", threeTitle:"Lices. Ponche. Citadel.", steps:["Start early at Les Lices or the harbour.","Cross the old town toward La Ponche.","Finish at the Citadel before heading down for lunch."], linksLabel:"USEFUL LINKS", links:[["Tourism office","https://www.sainttropeztourisme.com/"],["Parking","https://www.sainttropeztourisme.com/fr/fiche/parkings-de-saint-tropez-7530485/"],["Place des Lices","https://www.sainttropeztourisme.com/fr/fiche/place-des-lices-5578256/"],["What's on","https://www.sainttropeztourisme.com/fr/evenements-saint-tropez/agenda-evenements-saint-tropez/"]]},
  },
  "gassin-village": {
    fr: { label:"PRATIQUE", title:"GASSIN EST PLUS SIMPLE QU'IL N'EN A L'AIR", items:[["PARKINGS","Environ 400 places autour du vieux village, annoncées gratuites par l'office de tourisme."],["BUS","Ligne 875 jusqu'à l'arrêt Espélidou du 1er mai au 30 septembre."],["MARCHÉ","Marché nocturne le vendredi soir en juillet et août, place deï Barri."],["WIFI","Wifi gratuit à l'office de tourisme."]], threeLabel:"SI VOUS AVEZ 3 HEURES", threeTitle:"Panorama. Ruelle. Terrasse.", steps:["Commencer au belvédère près de l'office de tourisme.","Traverser le vieux village jusqu'à l'Androuno.","Finir par un verre ou un déjeuner avec vue avant de redescendre."], linksLabel:"LIENS UTILES", links:[["Office de tourisme","https://gassin.eu/fr/"],["Accès & parkings","https://gassin.eu/fr/informations-pratiques/acces-a-gassin/"],["FAQ pratique","https://gassin.eu/fr/faq/"]]},
    en: { label:"PRACTICAL", title:"GASSIN IS EASIER THAN IT LOOKS", items:[["PARKING","Around 400 spaces around the old village, listed as free by the tourism office."],["BUS","Line 875 serves Espélidou from 1 May to 30 September."],["MARKET","Friday-evening night market in July and August on Place deï Barri."],["WIFI","Free Wi-Fi at the tourism office."]], threeLabel:"IF YOU HAVE 3 HOURS", threeTitle:"View. Lanes. Terrace.", steps:["Start at the viewpoint by the tourism office.","Cross the old village to L'Androuno.","Finish with a drink or lunch with a view before heading down."], linksLabel:"USEFUL LINKS", links:[["Tourism office","https://gassin.eu/en/"],["Access & parking","https://gassin.eu/en/useful-information/access-to-gassin/"],["Practical FAQ","https://gassin.eu/en/faq/"]]},
  },
  "grimaud-village": {
    fr: { label:"PRATIQUE", title:"GRIMAUD SE FAIT À PIED — APRÈS S'ÊTRE GARÉ", items:[["MARCHÉ","Jeudi matin au village ; en été, place de l'Église et place Vieille."],["PARKING","Parking souterrain des Terrasses face à l'office : 30 min gratuites ; payant en saison."],["ZONE BLEUE","Certaines zones sont limitées à 1 h 30 avec disque."],["DISTINCTION","Grimaud village et Port Grimaud sont deux destinations différentes."]], threeLabel:"SI VOUS AVEZ 3 HEURES", threeTitle:"Ruelles. Château. Place.", steps:["Se garer près de l'office et entrer directement dans le vieux village.","Monter progressivement au château par les ruelles.","Redescendre par une autre voie et finir en terrasse."], linksLabel:"LIENS UTILES", links:[["Office de tourisme","https://www.grimaud-provence.com/"],["Accès & stationnement","https://www.grimaud-provence.com/pratique/acces-et-transports/"],["Marchés","https://www.grimaud-provence.com/decouvrez/saveurs-et-savoir-faire-dici/marche-provencal/"],["Château","https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-chateau/"]]},
    en: { label:"PRACTICAL", title:"GRIMAUD WORKS ON FOOT — ONCE YOU'VE PARKED", items:[["MARKET","Thursday morning in the village; in summer, around Place de l'Église and Place Vieille."],["PARKING","Terrasses underground car park opposite the tourism office: first 30 min free; paid in season."],["BLUE ZONES","Some street parking is limited to 1 h 30 with a parking disc."],["DON'T MIX THEM","Grimaud village and Port Grimaud are two separate destinations."]], threeLabel:"IF YOU HAVE 3 HOURS", threeTitle:"Lanes. Castle. Square.", steps:["Park near the tourism office and enter the old village directly.","Climb gradually toward the castle through the lanes.","Take a different route down and finish on a terrace."], linksLabel:"USEFUL LINKS", links:[["Tourism office","https://www.grimaud-provence.com/"],["Access & parking","https://www.grimaud-provence.com/pratique/acces-et-transports/"],["Markets","https://www.grimaud-provence.com/decouvrez/saveurs-et-savoir-faire-dici/marche-provencal/"],["Castle","https://www.grimaud-provence.com/decouvrez/le-charme-dun-village/le-patrimoine-et-les-monuments/le-chateau/"]]},
  },
} as const;

function VillagePracticalGuide({id,locale}:{id:keyof typeof villagePractical;locale:"fr"|"en"}){
  const c=villagePractical[id][locale];
  return <section className="border-y border-black bg-[#f7f7f4]">
    <div className="lg-shell py-20 md:py-24">
      <p className="lg-kicker lg-accent">{c.label}</p>
      <div className="mt-5 grid gap-10 md:grid-cols-[1.1fr_.9fr]"><h2 className="text-5xl font-black leading-[.9] tracking-[-.055em] md:text-7xl">{c.title}</h2><div className="grid grid-cols-2 gap-x-7 gap-y-8">{c.items.map(([k,v])=><div key={k} className="border-t border-black pt-4"><p className="text-[10px] font-black tracking-[.18em] text-[#0B4F6C]">{k}</p><p className="mt-3 text-sm font-bold leading-6 text-black/60">{v}</p></div>)}</div></div>
      <div className="mt-20 grid gap-10 border-t border-black pt-10 md:grid-cols-[.65fr_1.35fr]"><div><p className="lg-kicker">{c.threeLabel}</p><h3 className="mt-5 text-4xl font-black leading-[.9] tracking-[-.045em]">{c.threeTitle}</h3></div><ol className="grid gap-0 md:grid-cols-3">{c.steps.map((step,i)=><li key={step} className="border-t border-black py-5 md:border-l md:border-t-0 md:px-6"><span className="text-[10px] font-black text-[#0B4F6C]">0{i+1}</span><p className="mt-3 text-sm font-bold leading-6 text-black/60">{step}</p></li>)}</ol></div>
      <div className="mt-16 border-t border-black pt-8"><p className="lg-kicker">{c.linksLabel}</p><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">{c.links.map(([label,href])=><a key={href} href={href} target="_blank" rel="noreferrer" className="border-b border-[#0B4F6C] pb-1 text-sm font-black hover:text-[#0B4F6C]">{label} ↗</a>)}</div></div>
    </div>
  </section>;
}


function LegacyPlacePage({id,locale}:{id:string;locale:"fr"|"en"}){
 const c=legacyPlaceFeatures[id][locale],place=places.find(p=>p.id===id)!;
 return <main className="min-h-screen bg-white text-black"><SiteHeader locale={locale} path={`/place/${id}`}/>
  <EditorialIntro id={id} locale={locale} kicker={c.kicker} title={c.title} sub={c.sub} intro={c.intro}/>
  <PlaceMediaGallery name={place.name} photos={photosForPlace(id)} locale={locale}/>
  <EditorialQuote label={c.local} quote={c.quote} body={c.body}/>
  <EditorialMoments label={c.rhythm} title={c.rhythmTitle} moments={c.moments}/>
  <section className="lg-shell pb-24"><div className="grid gap-10 border-t border-black pt-10 md:grid-cols-[.7fr_1.3fr]"><p className="lg-kicker">{c.layer}</p><div><h2 className="text-5xl font-black leading-[.9] tracking-[-.055em] md:text-8xl">{c.layerTitle}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-black/55">{c.layerBody}</p></div></div></section>
  <EditorialDark label={c.dark} title={c.darkTitle} body={c.darkBody}/>
  <EditorialClose label={c.close} title={c.closeTitle} body={c.closeBody} facts={c.facts} best={c.best} bestItems={c.bestItems} less={c.less} lessItems={c.lessItems} credit={locale==="fr"?"Légendes, sources et licences sous chaque photo.":"Captions, sources and licences beneath each photograph."} ask={c.ask} locale={locale}/>
  {id in villagePractical && <VillagePracticalGuide id={id as keyof typeof villagePractical} locale={locale}/>}<PlaceActions place={place} locale={locale}/><CommunitySection placeId={id} locale={locale}/>
 </main>;
}

function EditorialIntro({id,locale,kicker,title,sub,intro}:{id:string;locale:"fr"|"en";kicker:string;title:string;sub:string;intro:string}){return <section className="lg-shell pb-12 pt-10 md:pt-16"><p className="lg-kicker">{kicker}</p><h1 className="mt-5 text-[15vw] font-black leading-[.78] tracking-[-.075em] md:text-[150px]">{title}</h1><VillageSignature id={id} locale={locale}/><div className="mt-8 grid gap-8 border-t border-black pt-6 md:grid-cols-2"><h2 className="text-4xl font-black leading-[.9] tracking-[-.05em] md:text-6xl">{sub}</h2><p className="max-w-xl text-lg font-bold leading-7 text-black/55">{intro}</p></div></section>}

function EditorialQuote({label,quote,body}:{label:string;quote:string;body:string}){return <section className="lg-shell py-20 md:py-24"><div className="lg-quote-box grid gap-10 md:grid-cols-[.35fr_1.65fr]"><div><p className="lg-kicker">{label}</p><div className="lg-blue-rule mt-5"/></div><div><p className="max-w-4xl text-5xl font-black leading-[.95] tracking-[-.055em] md:text-8xl">“{quote}”</p><p className="mt-8 max-w-2xl text-lg leading-8 text-black/55">{body}</p></div></div></section>}

function EditorialMoments({label,title,moments}:{label:string;title:string;moments:string[][]}){return <section className="border-t border-black"><div className="lg-shell py-20"><p className="lg-kicker">{label}</p><h2 className="mt-5 max-w-5xl text-5xl font-black leading-[.9] tracking-[-.055em] md:text-8xl">{title}</h2><div className="mt-16 grid border-t border-black md:grid-cols-3">{moments.map(([k,t,b])=><article key={k} className="border-b border-black py-8 md:border-b-0 md:border-r md:px-8 first:md:pl-0 last:md:border-r-0"><p className="text-[10px] font-black tracking-[.18em]">{k}</p><h3 className="mt-5 text-3xl font-black tracking-[-.04em]">{t}</h3><p className="mt-5 text-sm leading-7 text-black/55">{b}</p></article>)}</div></div></section>}

function EditorialDark({label,title,body}:{label:string;title:string;body:string}){return <section className="bg-black text-white"><div className="lg-shell py-24"><p className="lg-kicker lg-accent">{label}</p><div className="lg-blue-rule mt-5"/><div className="mt-8 grid gap-12 md:grid-cols-[1.15fr_.85fr]"><h2 className="text-5xl font-black leading-[.88] tracking-[-.055em] md:text-8xl">{title}</h2><p className="max-w-xl text-lg leading-8 text-white/60">{body}</p></div></div></section>}

function EditorialClose({label,title,body,facts,best,bestItems,less,lessItems,credit,ask,locale}:{label:string;title:string;body:string;facts:string[][];best:string;bestItems:string[];less:string;lessItems:string[];credit:string;ask:string;locale:"fr"|"en"}){return <section className="lg-shell py-24"><p className="lg-kicker">{label}</p><div className="mt-5 grid gap-12 md:grid-cols-[1.15fr_.85fr]"><h2 className="text-5xl font-black leading-[.9] tracking-[-.055em] md:text-8xl">{title}</h2><p className="max-w-xl text-lg leading-8 text-black/55">{body}</p></div><div className="mt-20 grid border-y border-black md:grid-cols-4">{facts.map(([a,b])=><div key={a} className="border-b border-black py-6 md:border-b-0 md:border-r md:px-6 first:md:pl-0 last:md:border-r-0"><p className="text-[10px] font-black tracking-[.18em]">{a}</p><p className="mt-3 text-sm font-bold leading-6 text-black/55">{b}</p></div>)}</div><div className="mt-16 grid gap-12 md:grid-cols-2"><Info title={best} items={bestItems}/><Info title={less} items={lessItems}/></div><div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-black pt-7"><p className="max-w-3xl text-[11px] leading-5 text-black/45">{credit}</p><Link href={`/${locale}/ask`} className="bg-black px-6 py-3 text-xs font-black uppercase tracking-[.1em] text-white">{ask} →</Link></div></section>}

function Fact({title,text}:{title:string;text:string}){return <div className="bg-[#000000] p-7"><p className="text-[10px] font-bold tracking-[.2em] text-[#FFFFFF]">{title}</p><p className="mt-4 text-sm leading-6 text-white/60">{text}</p></div>}
function Info({title,items}:{title:string;items:string[]}){return <div><p className="text-[10px] font-bold tracking-[.22em] text-[#000000]">{title}</p><ul className="mt-5 space-y-3 text-sm leading-6 opacity-65">{items.map(x=><li key={x}>— {x}</li>)}</ul></div>}

export async function generateMetadata({params}:{params:Promise<{locale:string;id:string}>}) {
 const {locale,id}=await params;if(!isLocale(locale))notFound();const p=places.find(x=>x.id===id);if(!p)notFound();
 const c=getCategory(p.category)!;
 return pageMetadata({title:discoveryFeatures[id]?.[locale].title ?? `${p.name} · ${p.location} · ${locale === "fr" ? categoryFR[p.category].name : c.name}`,description:locale === "fr" ? placeDescriptionFr[id] || p.description : p.description,path:`/${locale}/place/${id}`,locale,image:mediaForPlace(id)});
}
export default async function Page({params}:{params:Promise<{locale:string;id:string}>}) {
 const {locale,id}=await params;if(!isLocale(locale))notFound();const p=places.find(x=>x.id===id);if(!p)notFound();
 const c=getCategory(p.category)!;const name=locale === "fr" ? categoryFR[p.category].name : c.name;
 const related=places.filter(x=>x.id!==id && (x.location===p.location || x.category===p.category)).sort((a,b)=>Number(b.location===p.location)-Number(a.location===p.location)).slice(0,3);
 const media=mediaForPlace(id);
 const town=destinationForLocation(p.location);
 const schemaType=p.category === "eat" ? "Restaurant" : id === "monroes-pub" ? "BarOrPub" : ["caves-du-roy", "gaio-club"].includes(id) ? "NightClub" : "Place";
 return <><Breadcrumbs locale={locale} items={[{name:"LE GOLFE",path:`/${locale}`},{name,path:`/${locale}/explore/${p.category}`},{name:p.name,path:`/${locale}/place/${id}`}]} />
 {siteOrigin() && <JsonLd data={{"@context":"https://schema.org","@type":schemaType,name:p.name,url:absoluteUrl(`/${locale}/place/${id}`),description:locale === "fr" ? placeDescriptionFr[id] || p.description : p.description,image:media && !media.contextual ? media.src : undefined,address:{"@type":"PostalAddress",addressLocality:p.location,addressCountry:"FR"},geo:typeof p.latitude === "number" && typeof p.longitude === "number" ? {"@type":"GeoCoordinates",latitude:p.latitude,longitude:p.longitude}:undefined,telephone:p.phone,sameAs:p.website ? [p.website] : undefined}} />}
 <PlaceContent params={params}/><PlacePreparation place={p} locale={locale}/>{town && <div className="lg-shell py-6"><Link className="lg-btn" href={`/${locale}/destinations/${town.slug}`}>{locale==="fr"?"Adresses et séjour à":"Places and stays in"} {town.name} →</Link></div>}<section className="lg-shell py-12"><h2 className="text-2xl font-black">{locale === "fr" ? "À découvrir aussi" : "Explore nearby and similar places"}</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{related.map(x=><PlaceCard key={x.id} place={x} locale={locale}/>)}</div></section></>;
}
