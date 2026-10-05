import {notFound} from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import VillaDetail from '../../../components/VillaDetail';
import {getPublicVilla} from '../../../lib/publicVillas';
import {pageMetadata,absoluteUrl,siteOrigin} from '../../../lib/seo';
import {parisIsoDay} from '../../../lib/localCalendar';
type Props={params:Promise<{id:string}>};
export const dynamic='force-dynamic';
export async function generateMetadata({params}:Props){const {id}=await params,villa=await getPublicVilla(id);if(!villa)notFound();return pageMetadata({title:`${villa.name} à ${villa.location} · Villa ${villa.bedrooms} chambres`,description:villa.description,path:`/villa/${id}`,locale:'fr',bilingual:false,image:villa.photos[0]});}
export default async function VillaPage({params}:Props){const {id}=await params,villa=await getPublicVilla(id);if(!villa)notFound();return <main className="min-h-screen bg-white text-black"><SiteHeader locale="fr" path={`/villa/${id}`}/><Breadcrumbs locale="fr" items={[{name:'LE GOLFE',path:'/fr'},{name:'Maisons et villas',path:'/fr/stay'},{name:villa.name,path:`/villa/${id}`}]} />{siteOrigin()&&<JsonLd data={{'@context':'https://schema.org','@type':'Accommodation',name:villa.name,url:absoluteUrl(`/villa/${id}`),description:villa.description,...(villa.photos.length?{image:villa.photos.map(p=>absoluteUrl(p.src))}:{}),address:{'@type':'PostalAddress',addressLocality:villa.location,addressCountry:'FR'},numberOfBedrooms:villa.bedrooms,occupancy:{'@type':'QuantitativeValue',value:villa.guests}}}/>}<VillaDetail villa={villa} today={parisIsoDay()}/><SiteFooter locale="fr"/></main>;}
