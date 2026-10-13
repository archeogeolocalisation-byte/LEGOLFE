"use client";
import {useEffect,useState} from 'react';
import {loadVillaBooking} from '../lib/villaBookingStore';
import type {VillaBooking} from '../lib/villaBooking';
import type {HostInquiry} from '../lib/hostInquiries';
export default function InquiryBooking({row,fr}:{row:HostInquiry;fr:boolean}){
 const [booking,setBooking]=useState<VillaBooking|null>(null);
 useEffect(()=>{let active=true;void loadVillaBooking(row.id).then(value=>{if(active)setBooking(value);}).catch(()=>{});return()=>{active=false;};},[row.id]);
 return <section className="mt-7 border-t border-black/20 pt-6"><p className="text-sm leading-6">{fr?'LE GOLFE transmet les demandes. Convenez directement avec le voyageur du contrat, du prix, des paiements et des annulations. Aucun devis ni séjour ne peut être confirmé sur le site pendant le pilote.':'LE GOLFE forwards enquiries. Arrange the contract, price, payments and cancellations directly with the guest. Quotes and stays cannot be confirmed on the site during the pilot.'}</p>{booking&&<details className="mt-4 text-xs"><summary className="cursor-pointer font-bold">{fr?'Ancien enregistrement — lecture seule':'Previous record — read only'}</summary><p className="mt-3">{booking.arrival} → {booking.departure} · {booking.status} · {booking.total_price} €</p><p className="mt-3 whitespace-pre-line">{booking.conditions}</p><p className="mt-3">{fr?'Cet historique ne constitue pas une nouvelle confirmation. Les anciens blocages de calendrier sont conservés.':'This history is not a new confirmation. Existing calendar blocks are retained.'}</p></details>}</section>;
}
