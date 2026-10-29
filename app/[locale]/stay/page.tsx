import { notFound } from "next/navigation";
import StayCollection from "../../../components/StayCollection";
import { isLocale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/seo";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata({title:locale==="fr"?"Maisons et villas dans le Golfe de Saint-Tropez : contact direct":"Houses and villas in the Golfe de Saint-Tropez: direct contact",description:locale==="fr"?"Découvrez les maisons publiées dans le Golfe de Saint-Tropez. Filtrez par commune, voyageurs, budget et équipements, puis échangez directement avec le propriétaire.":"Explore published homes in the Golfe de Saint-Tropez. Filter by town, guests, budget and amenities, then discuss your stay directly with the owner.",path:`/${locale}/stay`,locale});}
export default async function Page({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return <StayCollection locale={locale}/>;}
