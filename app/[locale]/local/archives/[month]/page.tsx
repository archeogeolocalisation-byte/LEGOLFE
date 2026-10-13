import {connection} from 'next/server';
import {notFound} from 'next/navigation';
import LocalJournal from '../../../../../components/LocalJournal';
import {isLocale} from '../../../../../lib/i18n';
import {getPublicNews} from '../../../../../lib/publicNews';
import {validNewsMonth,newsForMonth,newsMonthLabel} from '../../../../../lib/localNewsCatalog';
import {parisIsoDay} from '../../../../../lib/localCalendar';
import {pageMetadata} from '../../../../../lib/seo';
type Props={params:Promise<{locale:string;month:string}>};
async function edition(params:Props['params']){await connection();const {locale,month}=await params;if(!isLocale(locale)||!validNewsMonth(month))notFound();const news=await getPublicNews();if(!newsForMonth(news,month).length)notFound();return {locale,month,news};}
export default async function Page({params}:Props){const {locale,month,news}=await edition(params);return <LocalJournal locale={locale} news={news} month={month} today={parisIsoDay()}/>;}
export async function generateMetadata({params}:Props){const {locale,month}=await edition(params),label=newsMonthLabel(month,locale);return pageMetadata({title:locale==='fr'?`Archives vie locale : ${label} · Golfe de Saint-Tropez`:`Local news archives: ${label} · Golfe de Saint-Tropez`,description:locale==='fr'?`Retrouvez les nouvelles du Golfe publiées en ${label}, avec leurs dates et sources officielles.`:`Revisit Golfe stories published in ${label}, with their dates and official sources.`,path:`/${locale}/local/archives/${month}`,locale});}
