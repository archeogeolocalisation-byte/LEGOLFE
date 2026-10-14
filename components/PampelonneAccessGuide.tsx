import Link from "next/link";
import type {Locale} from "../lib/i18n";

const paths=[
 {fr:"Route de Tahiti",en:"Route de Tahiti"},
 {fr:"Chemin des Moulins",en:"Chemin des Moulins"},
 {fr:"Chemin des Tamaris",en:"Chemin des Tamaris"},
 {fr:"Boulevard Patch",en:"Boulevard Patch"},
 {fr:"Route de l’Épi",en:"Route de l’Épi"},
 {fr:"Chemin des Barraques",en:"Chemin des Barraques"},
 {fr:"Route de Bonne Terrasse",en:"Route de Bonne Terrasse"}
] as const;

const beachClubs=[
 {name:"Le Club 55",access:"Boulevard Patch",url:"https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/le-club-55-4601210/"},
 {name:"Byblos Beach",access:"Boulevard Patch",url:"https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/byblos-beach-5260740/"},
 {name:"Verde Beach",access:"Chemin de l’Épi",url:"https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/plage-verde-5263750/"},
 {name:"Cabane Bambou",access:"Route de Bonne Terrasse",url:"https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/cabane-bambou-4601186/"},
 {name:"Indie Beach",access:"Chemin Garonne via route de Bonne Terrasse",url:"https://www.ramatuelle-tourisme.com/fr/sorties/restaurant/ramatuelle/indie-beach-5445018/"}
] as const;

export default function PampelonneAccessGuide({locale}:{locale:Locale}){
 const fr=locale==="fr";
 return <>
 <section className="lg-shell py-16 md:py-24" aria-label={fr?"Principaux accès à Pampelonne":"Main access roads to Pampelonne"}>
  <p className="lg-kicker text-[#0B4F6C]">{fr?"PAMPELONNE, MODE D’ACCÈS":"PAMPELONNE ACCESS GUIDE"}</p>
  <h2 className="lg-menu-title mt-5 max-w-5xl text-[#0B4F6C]">{fr?"Une plage. Sept chemins à connaître.":"One beach. Seven approaches to know."}</h2>
  <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">{fr?"Pampelonne se découvre par secteurs : le bon itinéraire dépend d’abord de l’endroit où vous souhaitez poser votre serviette ou réserver une table. Le visuel LE GOLFE présente les principaux accès depuis la route des Plages ; il reste indicatif et ne remplace pas un itinéraire routier.":"Pampelonne is best approached area by area. The right route depends on your stretch of sand or restaurant booking. The LE GOLFE illustration introduces seven main approaches from the Route des Plages; it is indicative, not a navigation map."}</p>
  <figure className="mt-10 overflow-hidden border border-[#0B4F6C]/20 bg-[#edf4f6]">
    <object data="/media/places/pampelonne/guide-acces-pampelonne.png" type="image/png" aria-label={fr?"Illustration LE GOLFE des sept accès à Pampelonne":"LE GOLFE illustrated access guide to Pampelonne"} className="mx-auto block h-auto w-full max-w-[850px]">
      <div className="grid gap-3 p-6 sm:grid-cols-2">
        {paths.map((path,i)=><p key={i} className="border-b border-[#0B4F6C]/20 pb-2 text-sm font-black text-[#0B4F6C]">{String(i+1).padStart(2,'0')} · {path[locale]}</p>)}
      </div>
    </object>
    <figcaption className="px-5 py-4 text-xs leading-6 text-black/65">{fr?"Visuel LE GOLFE des principaux accès à Pampelonne. Repères indicatifs : vérifiez le chemin exact avant de partir.":"LE GOLFE illustration of Pampelonne access roads. Indicative only: verify the exact access before setting off."}</figcaption>
  </figure>
  <div className="mt-9 grid gap-5 border-t border-black pt-7 md:grid-cols-2">
   <div><h3 className="text-2xl font-black uppercase text-[#0B4F6C]">{fr?"Bien choisir sa route":"Choose the right approach"}</h3><p className="mt-4 text-sm leading-7 text-black/70">{fr?"Au nord, commencez par Tahiti. Pour le secteur central, repérez notamment les chemins des Moulins et des Tamaris, le boulevard Patch puis la route de l’Épi. Plus au sud, les chemins des Barraques et de Bonne Terrasse desservent d’autres parties du rivage. Les itinéraires ne sont pas interchangeables côté route.":"Tahiti serves the northern side. Moulins, Tamaris, boulevard Patch and route de l’Épi reach different middle sections; Barraques and Bonne Terrasse serve areas further south. These approach roads are not always interchangeable by car."}</p></div>
   <div><h3 className="text-2xl font-black uppercase text-[#0B4F6C]">{fr?"Horaires, parkings, villas":"Timing, parking and villas"}</h3><p className="mt-4 text-sm leading-7 text-black/70">{fr?"En juillet et août, les arrivées entre 11 h et 13 h peuvent être lentes et les retours entre 18 h et 19 h 30 chargés. Vérifiez le stationnement autorisé. En haute saison, pensez à anticiper vos déplacements et votre retour : réserver un taxi ou un chauffeur peut rendre la journée plus simple, surtout si vous prévoyez de rester jusqu’au soir.":"In July and August, arrivals around 11am–1pm and evening returns around 6–7:30pm may be slow. Use authorised parking. In peak season, plan how you will get there and back: booking a taxi or private driver in advance can make the day easier, especially if you plan to stay into the evening."}</p></div>
  </div>
  <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
   <a href="https://www.ramatuelle-tourisme.com/fr/vos-questions-nos-reponses/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{fr?"Parkings et navettes : infos officielles":"Official parking and shuttle details"} ↗</a>
   <a href="https://www.ramatuelle-tourisme.com/fr/partager-des-emotions/air-de-detente/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{fr?"Accès et sentier littoral":"Access points and coastal path"} ↗</a>
  </div>
 </section>
 <section className="border-t border-black bg-[#edf4f6]"><div className="lg-shell py-16 md:py-24">
  <p className="lg-kicker text-[#0B4F6C]">{fr?"PLAGES AMÉNAGÉES":"BEACH CLUBS"}</p>
  <h2 className="lg-menu-title mt-5 max-w-5xl text-[#0B4F6C]">{fr?"Quelques adresses, plusieurs ambiances.":"Different beaches. Different moods."}</h2>
  <p className="mt-5 max-w-3xl text-base leading-8 text-black/65">{fr?"Les « plages privées » sont des établissements saisonniers installés sur un rivage public. Voici une première sélection confirmée par l’office de tourisme : demandez le chemin exact, les horaires et les conditions de réservation avant de partir.":"So-called private beaches are seasonal businesses on a public shoreline. Here are a few venues documented by the tourism office; confirm access road, opening dates and booking conditions."}</p>
  <div className="mt-10 grid gap-4 md:grid-cols-2">
   {beachClubs.map((club,i)=><article key={club.name} className="border border-[#0B4F6C]/20 bg-white p-6"><p className="text-xs font-bold text-[#0B4F6C]">0{i+1} · {club.access}</p><h3 className="mt-3 text-2xl font-black uppercase text-[#0B4F6C]">{club.name}</h3><a href={club.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center text-sm font-black underline underline-offset-4">{fr?"Fiche et informations officielles":"Official information"} ↗</a></article>)}
  </div>
  <p className="mt-6 text-xs leading-6 text-black/65">{fr?"Sélection non exhaustive · adresses et accès relevés auprès de Ramatuelle Tourisme (octobre 2026). Les concessions, noms et saisons peuvent évoluer.":"Not an exhaustive list · addresses checked against Ramatuelle Tourism (October 2026). Venues, access roads and seasons may change."}</p>
 </div></section>
 </>;
}
