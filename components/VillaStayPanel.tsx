import {nightlyPriceLabel} from '../lib/villaCollections';
import {villaHref} from '../lib/villaPaths';
import type {Locale} from '../lib/i18n';
import VillaActions from './VillaActions';

export default function VillaStayPanel({villa,askHref,locale='fr',withDates=false}:{
 villa:{id:string;name:string;guests:number;price:number;live?:boolean};
 today?:string;
 withDates?:boolean;
 askHref:string;
 locale?:Locale;
}){
 const fr=locale==='fr';
 return <section className="border-t-4 border-[var(--lg-blue)] bg-white p-6 md:p-7" aria-label={fr?'Votre séjour':'Your stay'}>
  <p className="lg-kicker">{fr?'VOTRE SÉJOUR':'YOUR STAY'} / {villa.name}</p>
  {withDates?<div className="mt-5">
   <h2 className="text-2xl font-bold tracking-tight">{fr?'Au rythme de vos envies.':'A stay at your own pace.'}</h2>
   <div className="mt-5 rounded-xl bg-[#f5f5f3] p-4">
    <p className="text-xs text-black/60">{villa.price>0?(fr?'À partir de':'From'):(fr?'Tarif du séjour':'Stay rate')}</p>
    <p className="mt-1 text-2xl font-semibold tracking-tight">{villa.price>0?`${villa.price.toLocaleString(fr?'fr-FR':'en-GB')} €`:(fr?'Sur devis':'By quote')}{villa.price>0&&<span className="text-sm font-normal text-black/60"> / {fr?'semaine':'week'}</span>}</p>
    <p className="mt-2 text-xs leading-6 text-black/60">{fr?'Selon la période et la durée du séjour. Prestations et frais à confirmer sur devis.':'According to season and stay length. Services and fees to be confirmed by quote.'}</p>
   </div>
   <a href="#disponibilites" className="lg-btn mt-5 w-full border-[var(--lg-blue)] bg-[var(--lg-blue)] text-white">{fr?'Choisir mes dates':'Choose my dates'} →</a>
  </div>:<>
  <p className="mt-5 text-4xl font-black tracking-[-.055em]">{villa.price?`${villa.price.toLocaleString(fr?'fr-FR':'en-GB')} €`:(fr?'Prix sur demande':'Price on request')}</p>
  <p className="mt-2 text-xs font-semibold leading-6 text-black/60">{villa.price?(fr?'Prix indicatif / semaine · à confirmer avec le propriétaire':'Indicative weekly price · confirm with the owner'):(fr?'Prix à convenir directement avec le propriétaire':'Price to arrange directly with the owner')}</p>
  {villa.price>0&&<p className="mt-3 text-xs leading-6 text-black/65">{nightlyPriceLabel(villa.price,locale)}<br/>{fr?'Estimation issue du tarif hebdomadaire de départ, période et frais à confirmer.':'Estimate from the starting weekly rate; confirm season and fees.'}</p>}
  </>}
  <div className="mt-6 border-t border-black/15 pt-5">
   <VillaActions locale={locale} id={villa.id} name={villa.name} contactHref={villaHref(villa.id,locale,true)} askHref={askHref} hideContact/>
  </div>
 </section>;
}
