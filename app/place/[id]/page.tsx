import {notFound,permanentRedirect} from "next/navigation";
import {places} from "../../../data/places";
import {withSearchParams,type PublicSearchParams} from "../../../lib/publicRouteUrls";
export default async function PlacePage({params,searchParams}:{params:Promise<{id:string}>;searchParams?:Promise<PublicSearchParams>}){
 const {id}=await params;if(!places.some(place=>place.id===id))notFound();
 permanentRedirect(withSearchParams(`/en/place/${id}`,await searchParams));
}
