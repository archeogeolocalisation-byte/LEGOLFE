import { notFound } from "next/navigation";
import StayCollection from "../../../components/StayCollection";
import { isLocale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/seo";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata({title:locale==="fr"?"Villas dans le Golfe de Saint-Tropez : communes et distances":"Villas around the Golfe de Saint-Tropez: locations and distances",description:locale==="fr"?"Comparez les villas à Ramatuelle, Gassin, Grimaud, La Croix-Valmer et Sainte-Maxime, ou cherchez à 10, 20 et 30 km maximum de Saint-Tropez.":"Compare villas in Ramatuelle, Gassin, Grimaud, La Croix-Valmer and Sainte-Maxime, or browse within 10, 20 and 30 km of Saint-Tropez.",path:`/${locale}/stay`,locale});}
export default async function Page({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return <StayCollection locale={locale}/>;}
