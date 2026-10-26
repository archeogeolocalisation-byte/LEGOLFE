import {villaHref} from '../lib/villaPaths';
import type {Locale} from '../lib/i18n';
import VillaActions from './VillaActions';

export default function VillaStayPanel({villa,askHref,locale='fr'}:{
 villa:{id:string;name:string;guests:number;price:number;live?:boolean};
 today?:string;
 askHref:string;
 locale?:Locale;
}){
 const fr=locale==='fr';
 return <section className="border-t-4 border-[var(--lg-blue)] bg-white p-6 md:p-7" aria-label={fr?'Votre séjour':'Your stay'}>
  <p className="lg-kicker">{fr?'VOTRE SÉJOUR':'YOUR STAY'} / {villa.name}</p>
  <p className="mt-5 text-4xl font-black tracking-[-.055em]">{villa.price?`${villa.price.toLocaleString(fr?'fr-FR':'en-GB')} €`:(fr?'Prix sur demande':'Price on request')}</p>
  <p className="mt-2 text-xs font-semibold leading-6 text-black/60">{villa.price?(fr?'Prix indicatif / semaine · à confirmer avec le propriétaire':'Indicative weekly price · confirm with the owner'):(fr?'Prix à convenir directement avec le propriétaire':'Price to arrange directly with the owner')}</p>
  <div className="mt-6 border-t border-black/15 pt-5">
   <VillaActions locale={locale} id={villa.id} name={villa.name} contactHref={villaHref(villa.id,locale,true)} askHref={askHref} hideContact/>
  </div>
 </section>;
}
