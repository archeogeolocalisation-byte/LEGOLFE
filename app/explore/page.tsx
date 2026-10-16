import { permanentRedirect } from "next/navigation";
import {withSearchParams,type PublicSearchParams} from "../../lib/publicRouteUrls";
export default async function ExplorePage({searchParams}:{searchParams?:Promise<PublicSearchParams>}){
 permanentRedirect(withSearchParams('/en/explore',await searchParams));
}
