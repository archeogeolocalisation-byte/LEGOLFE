import Link from 'next/link';
import SiteHeader from '../../../../components/SiteHeader';
import {notFound} from 'next/navigation';
import {getPublicVilla} from '../../../../lib/publicVillas';
import {parisIsoDay} from '../../../../lib/localCalendar';
import {isIsoDay} from '../../../../lib/agendaCalendar';
import ContactForm from './ContactForm';
import type { Locale } from '../../../../lib/i18n';
type Props={params:Promise<{id:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function renderContact({params,searchParams}:Props,locale:Locale){const {id}=await params,villa=await getPublicVilla(id);if(!villa)notFound();if(!villa.live)return <main><SiteHeader locale={locale}/><section className="lg-shell py-16"><h1 className="text-4xl font-black">{locale==='fr'?'Exemple de présentation':'Presentation example'}</h1><p className="mt-5">{locale==='fr'?'Cette fiche ne propose pas de maison à louer. Aucune demande ne peut être envoyée.':'This example does not offer a home for rent. No enquiry can be sent.'}</p><Link className="lg-btn mt-6" href={`/${locale}/stay`}>{locale==='fr'?'Voir les annonces':'View listings'}</Link></section></main>;const q=await searchParams;const today=parisIsoDay();const arrival=typeof q.arrival==='string'&&isIsoDay(q.arrival)&&q.arrival>=today?q.arrival:'';const departure=typeof q.departure==='string'&&isIsoDay(q.departure)&&q.departure>arrival?q.departure:'';const count=typeof q.guests==='string'?Number(q.guests):2;const guests=Number.isInteger(count)&&count>=1&&count<=villa.guests?String(count):String(Math.min(2,villa.guests));return <ContactForm locale={locale} villa={{...villa,image:villa.photos[0]?.src||''}} today={today} initialDates={{arrival,departure,guests}} localRequestId={typeof q.request==='string'?q.request:undefined}/>;}
