import {connection} from 'next/server';
import {notFound} from 'next/navigation';
import {isLocale} from '../../../lib/i18n';
import {pageMetadata} from '../../../lib/seo';
import {parisIsoDay} from '../../../lib/localCalendar';
import {getPublicNews} from '../../../lib/publicNews';
import {getLocalFeeds} from '../../../lib/localFeeds';
import LocalJournal from '../../../components/LocalJournal';
type Props={params:Promise<{locale:string}>};
export default async function LocalPage({params}:Props){await connection();const {locale}=await params;if(!isLocale(locale))notFound();const [news,feeds]=await Promise.all([getPublicNews(),getLocalFeeds()]);return <LocalJournal locale={locale} news={news} feeds={feeds} today={parisIsoDay()}/>;}
export async function generateMetadata({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();return pageMetadata({title:locale==='fr'?'Vie locale : actualités et informations du Golfe de Saint-Tropez':'Local life: Golfe de Saint-Tropez news and practical updates',description:locale==='fr'?'Les nouvelles à savoir dans le Golfe : vie des communes, accès, littoral et nouveautés. Retrouvez les sources officielles et les archives mensuelles.':'News worth knowing around the Golfe: town life, access, the coast and new places, with official sources and monthly archives.',path:`/${locale}/local`,locale,image:{src:'/media/tourist-map/saint-tropez-illustration.webp',alt:'Saint-Tropez · LE GOLFE'}});}
