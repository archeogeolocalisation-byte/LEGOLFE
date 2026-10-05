import type { MetadataRoute } from "next";
import { siteOrigin } from "../lib/seo";
export default function robots(): MetadataRoute.Robots {
 const origin=siteOrigin();return { rules: { userAgent:"*",allow:origin?"/":undefined,disallow:origin ? ["/api/","/requests","/owner","/*/account","/*/saved","/*/host","/*/editorial","/*/community/moderation","/*/ask","/villa/*/contact"] : "/" }, sitemap: origin ? `${origin}/sitemap.xml` : undefined };
}
