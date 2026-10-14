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
  <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">{fr?"Pampelonne se découvre par secteurs : le bon itinéraire dépend d’abord de l’endroit où vous souhaitez poser votre serviette ou réserver une table. Ce schéma reprend les sept axes d’accès historiques depuis la route des Plages, sans prétendre reproduire exactement le réseau routier.":"Pampelonne is best approached area by area. The right route depends on your stretch of sand or restaurant booking. This schematic shows seven established access roads from the Route des Plages; it is not an exact road map."}</p>
  <figure className="mt-10 overflow-hidden border border-[#0B4F6C]/20 bg-[#edf4f6]">
    <svg viewBox="0 0 860 1180" role="img" aria-labelledby="pamp-map-title pamp-map-desc" className="block h-auto w-full">
      <title id="pamp-map-title">{fr?"Les principaux accès à Pampelonne":"Main access roads to Pampelonne"}</title>
      <desc id="pamp-map-desc">{fr?"Schéma illustratif de la plage avec sept chemins classés du nord au sud, sur fond terre, sable et mer":"Illustrative map with seven access roads arranged north to south with land, sand and sea"}</desc>
      <defs>
       <linearGradient id="sea-grad" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#63cdd1"/><stop offset="1" stopColor="#0B4F6C"/></linearGradient>
       <pattern id="land-dots" width="42" height="48" patternUnits="userSpaceOnUse"><circle cx="15" cy="19" r="7" fill="#889b75" opacity=".48"/><circle cx="37" cy="36" r="4" fill="#496f51" opacity=".42"/></pattern>
      </defs>
      <rect width="860" height="1180" fill="#f8f3e6"/>
      <rect x="0" y="178" width="570" height="1002" fill="#dae0c7"/>
      <rect x="0" y="178" width="570" height="1002" fill="url(#land-dots)" opacity=".6"/>
      <path d="M550 178 C510 320 548 430 564 530 C580 680 555 790 599 910 C620 1020 621 1111 598 1180 L860 1180 L860 178 Z" fill="url(#sea-grad)"/>
      <path d="M550 178 C510 320 548 430 564 530 C580 680 555 790 599 910 C620 1020 621 1111 598 1180" stroke="#e8d4a4" strokeWidth="58" fill="none"/>
      <path d="M550 178 C510 320 548 430 564 530 C580 680 555 790 599 910 C620 1020 621 1111 598 1180" stroke="#fff4ce" strokeWidth="34" fill="none"/>
      <path d="M115 210 C195 300 145 375 212 480 C260 560 185 663 260 745 C327 857 310 945 360 1050 L470 1160" stroke="#fff" strokeWidth="14" opacity=".95" fill="none"/>
      <path d="M115 210 C195 300 145 375 212 480 C260 560 185 663 260 745 C327 857 310 945 360 1050 L470 1160" stroke="#9aab9e" strokeWidth="2" fill="none"/>
      <rect width="860" height="178" fill="#fffaf0"/>
      <text x="45" y="36" fontFamily="Georgia,serif" fontSize="18" letterSpacing="5" fill="#0B4F6C">LE GOLFE / {fr?"GUIDE DE PLAGE":"BEACH GUIDE"}</text>
      <text x="40" y="100" fontFamily="Georgia,serif" fontSize="69" fontWeight="bold" letterSpacing="-2" fill="#0B4F6C">PAMPELONNE</text>
      <text x="44" y="143" fontFamily="Georgia,serif" fontSize="29" letterSpacing="1" fill="#0B4F6C">{fr?"LES PRINCIPAUX ACCÈS":"MAIN ACCESS ROADS"}</text>
      <text x="44" y="167" fontSize="15" fontWeight="600" fill="#436274">{fr?"RAMATUELLE · PLAGE D’ENVIRON 4,5 KM":"RAMATUELLE · ABOUT 4.5 KM OF BEACH"}</text>
      <text x="32" y="225" fontFamily="Georgia,serif" fontSize="15" fontWeight="bold" letterSpacing="3" fill="#0B4F6C">RAMATUELLE</text>
      {paths.map((p,i)=>{const y=284+i*124,shore=544+i*8;return <g key={i}>
        <path d={`M ${260+i*14} ${y+19} Q 390 ${y-12} ${shore} ${y+19}`} fill="none" stroke="#fffaf0" strokeWidth="11"/>
        <path d={`M ${260+i*14} ${y+19} Q 390 ${y-12} ${shore} ${y+19}`} fill="none" stroke="#0B4F6C" strokeDasharray="3 6" strokeWidth="2"/>
        <rect x="31" y={y-9} width="381" height="56" rx="8" fill="#fffaf0" stroke="#0B4F6C" strokeWidth="1.5"/>
        <circle cx="63" cy={y+19} r="24" fill="#0B4F6C"/>
        <text x="63" y={y+27} fontFamily="Georgia,serif" fontSize="23" fill="#fff" textAnchor="middle">{i+1}</text>
        <text x="96" y={y+26} fontFamily="Georgia,serif" fontWeight="bold" fontSize="21" fill="#102f44">{p[locale]}</text>
        <rect x="428" y={y-5} width="34" height="34" rx="3" fill="#0B4F6C"/>
        <text x="445" y={y+20} fontSize="23" fill="#fff" fontWeight="bold" textAnchor="middle">P</text>
        <circle cx={shore} cy={y+19} r="7" fill="#0B4F6C" stroke="#fff" strokeWidth="3"/>
      </g>})}
      <text x="722" y="612" fontFamily="Georgia,serif" fill="#fff" fontSize="25" textAnchor="middle" letterSpacing="5">{fr?"MER":"THE"}</text>
      <text x="722" y="644" fontFamily="Georgia,serif" fill="#fff" fontSize="20" textAnchor="middle" letterSpacing="3">{fr?"MÉDITERRANÉE":"MEDITERRANEAN"}</text>
      <rect x="0" y="1139" width="860" height="41" fill="#fffaf0"/>
      <text x="28" y="1166" fontSize="15" fill="#0B4F6C">{fr?"Repères indicatifs · plan schématique non contractuel":"Indicative markers · not a navigation map"}</text>
    </svg>
    <figcaption className="px-5 py-4 text-xs leading-6 text-black/65">{fr?"Illustration originale LE GOLFE inspirée du guide d’accès ; les positions sont schématiques et ne remplacent pas une carte routière.":"Original LE GOLFE schematic inspired by the access guide; positions are illustrative and do not replace a road map."}</figcaption>
  </figure>
  <div className="mt-9 grid gap-5 border-t border-black pt-7 md:grid-cols-2">
   <div><h3 className="text-2xl font-black uppercase text-[#0B4F6C]">{fr?"Bien choisir sa route":"Choose the right approach"}</h3><p className="mt-4 text-sm leading-7 text-black/70">{fr?"Au nord, commencez par Tahiti. Pour le secteur central, repérez notamment les chemins des Moulins et des Tamaris, le boulevard Patch puis la route de l’Épi. Plus au sud, les chemins des Barraques et de Bonne Terrasse desservent d’autres parties du rivage. Les itinéraires ne sont pas interchangeables côté route.":"Tahiti serves the northern side. Moulins, Tamaris, boulevard Patch and route de l’Épi reach different middle sections; Barraques and Bonne Terrasse serve areas further south. These approach roads are not always interchangeable by car."}</p></div>
   <div><h3 className="text-2xl font-black uppercase text-[#0B4F6C]">{fr?"Horaires, parkings, villas":"Timing, parking and villas"}</h3><p className="mt-4 text-sm leading-7 text-black/70">{fr?"En juillet et août, les arrivées entre 11 h et 13 h peuvent être lentes et les retours entre 18 h et 19 h 30 chargés. Vérifiez le stationnement autorisé. Pour une villa sur une piste étroite ou pentue, signalez l’état du chemin au transporteur. Pour un groupe, une navette réservée peut simplifier les rotations sans garantir l’absence de circulation.":"In July and August, arrivals around 11am–1pm and evening returns around 6–7:30pm may be slow. Use authorised parking. If your villa has an unpaved or steep approach, tell your driver. For groups, a pre-booked shuttle can simplify transfers but cannot avoid congestion."}</p></div>
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
