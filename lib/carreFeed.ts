import {carreProgrammeSnapshot} from '../data/carreProgrammeSnapshot';
import {carreProgrammeUrl,parseCarreProgramme} from './carreProgramme';
import {parisIsoDay} from './localCalendar';

/** Public official programme, refreshed on demand with a six-hour Next cache. */
export async function getCarreProgramme(){
 try{
  const response=await fetch(carreProgrammeUrl,{next:{revalidate:21600},signal:AbortSignal.timeout(4000),redirect:'error'});
  if(!response.ok)return carreProgrammeSnapshot;
  if(Number(response.headers.get("content-length"))>2_000_000)return carreProgrammeSnapshot;
  const text=await response.text();
  const date=new Date(response.headers.get("date")??"");
  const programme=parseCarreProgramme(text,Number.isNaN(date.getTime())?parisIsoDay():parisIsoDay(date));
  return programme.length?programme:carreProgrammeSnapshot;
 }catch{return carreProgrammeSnapshot;}
}
