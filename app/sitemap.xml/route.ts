import { agendaPaths } from "../../lib/agendaCalendar";
import { parisIsoDay } from "../../lib/localCalendar";
import { destinationPaths } from "../../data/destinations";
import { stayPaths } from "../../data/staySelections";
import { places, placeCategories } from "../../data/places";
import {getPublishedVillas} from "../../lib/publicVillas";
import { getPublicEvents } from "../../lib/publicEvents";
import { villaHref } from "../../lib/villaPaths";
import { siteOrigin } from "../../lib/seo";
import { mediaForPlace } from "../../lib/placeMedia";
import { guides, guidePaths } from "../../data/guides";
import { mediaForGuide } from "../../lib/guideMedia";
export const dynamic = "force-dynamic";
const xml = (s:string) => s.replace(/[<>&"']/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[c]!));
export async function GET() {
 const origin=siteOrigin();if(!origin)return new Response("Configure NEXT_PUBLIC_SITE_URL before enabling indexing.",{status:503,headers:{"Retry-After":"3600"}});
 const catalog=await getPublicEvents();
 const paths=["","/explore","/whats-on","/local","/how-it-works",...guidePaths(),...destinationPaths(),...stayPaths(),...agendaPaths(catalog,parisIsoDay()),...placeCategories.map(x=>`/explore/${x.id}`),...places.map(x=>`/place/${x.id}`),...catalog.map(x=>`/event/${x.id}`)];
 const rows=[...new Set(paths)].flatMap(path=>["fr","en"].map(locale=>{
 const guide=path.startsWith("/guides/") ? guides.find(g=>g.slug===path.split("/").pop()) : undefined;
 const media=path.startsWith("/place/") ? mediaForPlace(path.split("/").pop()!) : undefined;
 const lastmod=guide ? `<lastmod>${xml(guide.verified)}</lastmod>` : "";
 const image=guide ? `<image:image><image:loc>${xml(new URL(mediaForGuide(guide).photo.src,origin).href)}</image:loc></image:image>` : media && !media.contextual ? `<image:image><image:loc>${xml(new URL(media.src,origin).href)}</image:loc></image:image>` : "";
 return `<url><loc>${xml(origin+"/"+locale+path)}</loc>${lastmod}${["fr","en","x-default"].map(lang=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${xml(origin+"/"+(lang==="x-default"?"en":lang)+path)}"/>`).join("")}${image}</url>`;
 }));
 rows.push(`<url><loc>${xml(origin+"/match")}</loc></url>`);
 const houses=(await getPublishedVillas()).map(v=>({id:v.id,image:v.photos[0]?.src}));
 for(const villa of houses)for(const locale of ["fr","en"] as const){
  const image=villa.image?`<image:image><image:loc>${xml(new URL(villa.image,origin).href)}</image:loc></image:image>`:"";
  const alternates=(["fr","en","x-default"] as const).map(lang=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${xml(origin+villaHref(villa.id,lang==="fr"?"fr":"en"))}"/>`).join("");
  rows.push(`<url><loc>${xml(origin+villaHref(villa.id,locale))}</loc>${alternates}${image}</url>`);
 }

 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${rows.join("")}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=300"}});
}
