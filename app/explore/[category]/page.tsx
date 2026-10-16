import {notFound,permanentRedirect} from "next/navigation";
import {getCategory} from "../../../data/places";
import {withSearchParams,type PublicSearchParams} from "../../../lib/publicRouteUrls";
export default async function ExploreCategoryPage({params,searchParams}:{params:Promise<{category:string}>;searchParams?:Promise<PublicSearchParams>}){
 const {category}=await params;if(!getCategory(category))notFound();
 permanentRedirect(withSearchParams(`/en/explore/${category}`,await searchParams));
}
