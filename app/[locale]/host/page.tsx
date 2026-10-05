import HostDesk from "../../../components/HostDesk";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import type { Locale } from "../../../lib/i18n";

export default async function HostPage({params}:{params:Promise<{locale:string}>}){
  const {locale:raw}=await params; const locale:Locale=raw==="fr"?"fr":"en";
  return <main className="min-h-screen bg-white text-black"><SiteHeader locale={locale}/><HostDesk locale={locale}/><SiteFooter locale={locale}/></main>
}
