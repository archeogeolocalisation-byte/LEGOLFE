import { notFound } from "next/navigation";
import StayCollection from "../../../components/StayCollection";
import { isLocale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/seo";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata({title:locale==="fr"?"Maisons et villas dans le Golfe de Saint-Tropez : budgets et séjours":"Houses and villas around the Golfe de Saint-Tropez: budgets and stays",description:locale==="fr"?"Recherchez une maison dans le Golfe avec un filtre jusqu’à 1 500 € par semaine, par commune et par équipements. Découvrez les collections Charme et Exception validées par LE GOLFE.":"Search homes in the Golfe by weekly budget, starting with the up-to-€1,500 filter, town and amenities. Explore selections reviewed by LE GOLFE.",path:`/${locale}/stay`,locale});}
export default async function Page({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return <StayCollection locale={locale}/>;}
