import Link from "next/link";
import JsonLd from "./JsonLd";
import { absoluteUrl, siteOrigin } from "../lib/seo";
export default function Breadcrumbs({ items, locale }: { items: { name: string; path: string }[]; locale: "fr" | "en" }) {
  return <div className="lg-shell py-5"><nav aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"} className="flex flex-wrap gap-2 text-xs text-black/60">{items.map((item, i) => <span key={item.path}>{i > 0 && <span aria-hidden="true" className="mr-2">/</span>}{i === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path} className="underline">{item.name}</Link>}</span>)}</nav>{siteOrigin() && <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absoluteUrl(item.path) })) }} />}</div>;
}
