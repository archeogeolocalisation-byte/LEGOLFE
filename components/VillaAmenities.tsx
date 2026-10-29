import {villaAmenityGroups} from '../lib/villaAmenities';
import type {Locale} from '../lib/i18n';
export default function VillaAmenities({amenities,locale}:{amenities:string[];locale:Locale}){
 const fr=locale==='fr',normalized=[...new Set(amenities.map(a=>a.trim()).filter(Boolean))],values=normalized.filter(a=>a!=='Pool'||!normalized.includes('Heated pool'));
 const known=new Set<string>(villaAmenityGroups.flatMap(group=>group.options.map(([en])=>en)));
 const groups=villaAmenityGroups.map(group=>({title:group[locale] as string,items:group.options.filter(([en])=>values.includes(en)).map(([en,translated])=>fr?translated:en) as string[]})).filter(group=>group.items.length);
 const extra=values.filter(value=>!known.has(value));if(extra.length)groups.push({title:fr?'Autres équipements et repères':'Other amenities and details',items:extra.map(value=>fr?({'Quiet setting':'Cadre calme'} as Record<string,string>)[value]||value:value)});
 if(!groups.length)return <p className="mt-5 text-black/60">{fr?'Les équipements seront précisés par l’annonceur.':'Amenities will be specified by the advertiser.'}</p>;
 return <div className="mt-6 grid gap-5">{groups.map((group,i)=><div key={group.title} className={'rounded-xl border border-[#cedbd4] p-5 '+(i%2?'bg-[#f5f0e6]':'bg-[#edf4ef]')}><h3 className="text-base font-black text-[#0b3046]">{group.title}</h3><ul className="mt-4 grid gap-3 sm:grid-cols-2">{group.items.map(item=><li key={item} className="text-sm font-semibold leading-6 text-[#385765]"><span className="mr-2 text-[#246452]" aria-hidden="true">✓</span>{item}</li>)}</ul></div>)}</div>;
}
