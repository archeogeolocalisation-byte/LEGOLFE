import {notFound} from 'next/navigation';
import {getPublicVilla} from '../../../../lib/publicVillas';
import {parisIsoDay} from '../../../../lib/localCalendar';
import {isIsoDay} from '../../../../lib/agendaCalendar';
import ContactForm from './ContactForm';
import type { Locale } from '../../../../lib/i18n';
type Props={params:Promise<{id:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function renderContact({params,searchParams}:Props,locale:Locale){const {id}=await params,villa=await getPublicVilla(id);if(!villa)notFound();const q=await searchParams;const today=parisIsoDay();const arrival=typeof q.arrival==='string'&&isIsoDay(q.arrival)&&q.arrival>=today?q.arrival:'';const departure=typeof q.departure==='string'&&isIsoDay(q.departure)&&q.departure>arrival?q.departure:'';const count=typeof q.guests==='string'?Number(q.guests):2;const guests=Number.isInteger(count)&&count>=1&&count<=villa.guests?String(count):String(Math.min(2,villa.guests));return <ContactForm locale={locale} villa={{...villa,image:villa.photos[0]?.src||''}} today={today} initialDates={{arrival,departure,guests}} localRequestId={typeof q.request==='string'?q.request:undefined}/>;}
