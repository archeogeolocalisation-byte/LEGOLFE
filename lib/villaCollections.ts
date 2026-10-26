import type {Locale} from './i18n';
export const villaCollectionIds=['homes','charm','exceptional'] as const;
export type VillaCollection=typeof villaCollectionIds[number];
export type VillaDistinction=Exclude<VillaCollection,'homes'>;
export const villaCollectionLabels:Record<Locale,Record<VillaCollection,string>>={
 fr:{homes:'Maisons de vacances',charm:'Maisons de charme',exceptional:'Villas d’exception'},
 en:{homes:'Holiday homes',charm:'Homes with character',exceptional:'Exceptional villas'},
};
export function isVillaDistinction(value:unknown):value is VillaDistinction{return value==='charm'||value==='exceptional';}
export type VillaCollectionReview={listing_id:string;collection:VillaDistinction;reason_fr:string;reason_en:string};
// Only use rows returned by the protected review table, never owner-supplied payload labels.
export function collectionFromReview(value:unknown){
 if(!value||typeof value!=='object')return undefined;
 const row=value as VillaCollectionReview;
 if(!isVillaDistinction(row.collection)||typeof row.reason_fr!=='string'||typeof row.reason_en!=='string'||!row.reason_fr.trim()||!row.reason_en.trim())return undefined;
 return {collection:row.collection,collectionReasons:{fr:row.reason_fr,en:row.reason_en}};
}
export function nightlyPriceLabel(price:number,locale:Locale){
 if(!Number.isFinite(price)||price<=0)return '';
 const amount=new Intl.NumberFormat(locale==='fr'?'fr-FR':'en-GB',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(price/7);
 return locale==='fr'?`Env. ${amount} / nuit · base 7 nuits`:`Approx. ${amount} / night · based on 7 nights`;
}
