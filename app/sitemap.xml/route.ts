import { agendaPaths } from "../../lib/agendaCalendar";
import { parisIsoDay } from "../../lib/localCalendar";
import { destinationPaths } from "../../data/destinations";
import { stayPaths } from "../../data/staySelections";
import { places, placeCategories } from "../../data/places";
import {getPublishedVillas} from "../../lib/publicVillas";
import { villas } from "../../data/villas";
import { getPublicEvents } from "../../lib/publicEvents";
import { siteOrigin } from "../../lib/seo";
import { mediaForPlace } from "../../lib/placeMedia";
export const dynamic = "force-dynamic";
const xml = (s:string) => s.replace(/[<>&"']/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[c]!));
export async function GET() {
 const origin=siteOrigin();if(!origin)return new Response("Configure NEXT_PUBLIC_SITE_URL before enabling indexing.",{status:503,headers:{"Retry-After":"3600"}});
 const catalog=await getPublicEvents();
 const paths=["","/explore","/whats-on","/local",...destinationPaths(),...stayPaths(),...agendaPaths(catalog,parisIsoDay()),...placeCategories.map(x=>`/explore/${x.id}`),...places.map(x=>`/place/${x.id}`),...catalog.map(x=>`/event/${x.id}`)];
 const rows=paths.flatMap(path=>["fr","en"].map(locale=>{
 const media=path.startsWith("/place/") ? mediaForPlace(path.split("/").pop()!) : undefined;
 const image=media && !media.contextual ? `<image:image><image:loc>${xml(new URL(media.src,origin).href)}</image:loc></image:image>` : "";
 return `<url><loc>${xml(origin+"/"+locale+path)}</loc>${["fr","en","x-default"].map(lang=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${xml(origin+"/"+(lang==="x-default"?"en":lang)+path)}"/>`).join("")}${image}</url>`;
 }));
 rows.push(`<url><loc>${xml(origin+"/match")}</loc></url>`);
 for(const villa of await getPublishedVillas())rows.push(`<url><loc>${xml(origin+'/villa/'+villa.id)}</loc>${villa.photos[0]?`<image:image><image:loc>${xml(villa.photos[0].src)}</image:loc></image:image>`:''}</url>`);
 for(const villa of villas) rows.push(`<url><loc>${xml(origin+"/villa/"+villa.id)}</loc><image:image><image:loc>${xml(origin+villa.image)}</image:loc></image:image></url>`);
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${rows.join("")}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=300"}});
}
