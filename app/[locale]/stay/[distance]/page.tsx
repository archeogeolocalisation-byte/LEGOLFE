import { notFound } from "next/navigation";
import StayCollection from "../../../../components/StayCollection";
import { distanceSelections, villasWithin } from "../../../../data/staySelections";
import { isLocale } from "../../../../lib/i18n";
import { pageMetadata } from "../../../../lib/seo";
type Props={params:Promise<{locale:string;distance:string}>};
async function resolve(params:Props["params"]){const {locale,distance}=await params;if(!isLocale(locale))notFound();const s=distanceSelections.find(x=>x.slug===distance);if(!s || !villasWithin(s.maxKm).length)notFound();return {locale,s};}
export async function generateMetadata({params}:Props){const {locale,s}=await resolve(params);return pageMetadata({title:locale==="fr"?`Villas à ${s.maxKm} km maximum de Saint-Tropez`:`Villas within ${s.maxKm} km of Saint-Tropez`,description:locale==="fr"?s.introFr:s.introEn,path:`/${locale}/stay/${s.slug}`,locale});}
export default async function Page({params}:Props){const {locale,s}=await resolve(params);return <StayCollection locale={locale} selection={s}/>;}
