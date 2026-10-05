import {villageSignatures} from '../data/villageSignatures';
import type {Locale} from '../lib/i18n';
export default function VillageSignature({id,locale}:{id:string;locale:Locale}){
 const signature=villageSignatures[id]?.[locale];
 return signature?<p className="mt-5 text-lg font-medium italic tracking-wide text-[#0B4F6C] md:text-2xl">{signature}</p>:null;
}
