import type {Locale} from './i18n';
export type VillaEnquiryDraftValues={period:string;guests:string;details:string};
export function villaEnquiryDraft(villa:{name:string;location:string;guests:number},values:VillaEnquiryDraftValues,locale:Locale){
 const count=Number(values.guests);if(!Number.isInteger(count)||count<1||count>villa.guests)return '';
 const period=values.period.trim().slice(0,100),details=values.details.trim().slice(0,600);
 return locale==='fr'?`Bonjour,\n\nJe vous contacte au sujet de ${villa.name} à ${villa.location}, découverte sur LE GOLFE.\nNous serions ${count} ${count===1?'voyageur':'voyageurs'}.${period?'\nPériode envisagée : '+period: ''}\n\nPourriez-vous me préciser les disponibilités, le tarif total pour ce séjour et les conditions de location ?${details?'\n\nQuelques précisions :\n'+details:''}\n\nMerci pour votre retour.`:`Hello,\n\nI’m enquiring about ${villa.name} in ${villa.location}, found on LE GOLFE.\nThere would be ${count} ${count===1?'guest':'guests'}.${period?'\nPreferred period: '+period:''}\n\nCould you confirm availability, the total price for this stay and the rental terms?${details?'\n\nA few details:\n'+details:''}\n\nThank you.`;
}
