import type {Locale} from './i18n';
export const stayBudgetOptions=['1500','1500-3000','3000-6000','6000-10000','10000+','quote'] as const;
export function matchesStayBudget(price:number,budget:string){
 if(!budget)return true;
 if(budget==='quote')return price===0;
 if(!Number.isFinite(price)||price<=0)return false;
 if(budget==='10000+')return price>10000;
 const range=/^(\d+)-(\d+)$/.exec(budget);
 if(range)return price>Number(range[1])&&price<=Number(range[2]);
 return /^\d+$/.test(budget)&&price<=Number(budget);
}
export function stayBudgetLabel(value:string,locale:Locale){
 const fr=locale==='fr';const money=(n:string)=>new Intl.NumberFormat(fr?'fr-FR':'en-GB',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(Number(n));
 if(value==='quote')return fr?'Prix sur demande':'Price on request';
 if(value==='10000+')return `${fr?'Plus de':'Over'} ${money('10000')} / ${fr?'semaine':'week'}`;
 const range=/^(\d+)-(\d+)$/.exec(value);
 if(range)return `${fr?'De':'From'} ${money(range[1])} ${fr?'à':'to'} ${money(range[2])} / ${fr?'semaine':'week'}`;
 return `${fr?'Jusqu’à':'Up to'} ${money(value)} / ${fr?'semaine':'week'}`;
}
