import Link from 'next/link';
export default function PilotNotice({locale}:{locale:'fr'|'en'}){
 const fr=locale==='fr';
 return <aside className="my-6 border-l-4 border-[var(--lg-blue)] bg-neutral-100 p-5"><p className="text-sm font-bold">{fr?'Phase pilote — publication gratuite pour les 100 premières maisons mises en ligne.':'Pilot — free publication for the first 100 homes published.'}</p><p className="mt-2 text-xs leading-6 text-black/65">{fr?'Aucun abonnement, aucune commission sur les séjours, aucune carte bancaire demandée. Tout futur abonnement nécessitera votre accord.':'No subscription, no stay commission and no payment card required. Any future subscription will require your agreement.'}</p><Link href={`/${locale}/how-it-works`} className="mt-3 inline-block text-xs font-bold underline">{fr?'Comprendre le fonctionnement':'How the service works'} →</Link></aside>;
}
