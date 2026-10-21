import HostDesk from "../../../components/HostDesk";
import SiteHeader from "../../../components/SiteHeader";
import type { Locale } from "../../../lib/i18n";

export default async function HostPage({params}:{params:Promise<{locale:string}>}){
  const {locale:raw}=await params; const locale:Locale=raw==="fr"?"fr":"en";
  return <main className="host-page min-h-screen"><SiteHeader locale={locale} path="/host"/><HostDesk locale={locale}/></main>
}
