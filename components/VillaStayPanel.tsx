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
 return <section className="villa-stay-actions" aria-label={fr?'Votre séjour':'Your stay'}>
  <p className="lg-kicker">{fr?'VOTRE SÉJOUR':'YOUR STAY'} / {villa.name}</p>
  <h2 className="mt-4 text-2xl font-bold tracking-tight">{fr?'Gardez cette maison de côté.':'Keep this home in mind.'}</h2>
  <p className="mt-3 text-sm leading-7 text-[#385765]">{fr?'Enregistrez-la pour préparer votre séjour ou partagez-la avec vos proches. Pour les dates et les conditions, échangez directement avec votre interlocuteur.':'Save it to plan your stay or share it with friends and family. Discuss dates and terms directly with your contact.'}</p>
  <div className="mt-6 border-t border-[#c9c1b3] pt-5">
   <VillaActions locale={locale} id={villa.id} name={villa.name} contactHref={villaHref(villa.id,locale,true)} askHref={askHref} hideContact/>
  </div>
 </section>;
}
