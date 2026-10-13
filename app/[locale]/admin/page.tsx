import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import AdminDesk from '../../../components/AdminDesk';
export default async function Page({params}:{params:Promise<{locale:string}>}){
  const {locale:raw}=await params;const locale=raw==='fr'?'fr':'en';
  return <main className="min-h-screen bg-white text-black"><SiteHeader locale={locale} path="/admin"/><AdminDesk locale={locale}/><SiteFooter locale={locale}/></main>;
}
