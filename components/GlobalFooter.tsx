'use client';
import {usePathname} from 'next/navigation';
import type {Locale} from '../lib/i18n';
import {routeLocale} from '../lib/routeLocale';
import SiteFooter from './SiteFooter';
export default function GlobalFooter({initialLocale}:{initialLocale:Locale}){
 const path=usePathname();
 if(path==='/fr/design/home'||path==='/en/design/home')return null;
 return <SiteFooter locale={path?routeLocale(path):initialLocale} path={path??undefined}/>;
}
