import {redirect} from "next/navigation";
export default async function LegacyModeration({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  redirect("/"+(locale==="fr"?"fr":"en")+"/admin");
}
