import type { Metadata } from "next";
import type { Locale } from "./i18n";

// The public origin never comes from request headers or a preview hostname.
// This project’s production domain is a public configuration value, not a secret.
export function siteOrigin(): string | undefined {
  if (process.env.VERCEL_ENV === "preview") return undefined;
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_ENV === "production" ? "https://www.legolfe.com" : undefined);
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || ["localhost", "127.0.0.1"].includes(url.hostname)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be the public HTTPS origin, without path or credentials.");
  }
  return url.origin;
}
export function absoluteUrl(path: string): string | undefined {
  const origin = siteOrigin();
  return origin ? new URL(path, origin).href : undefined;
}
export function localizedAlternates(path: string) {
  if (!siteOrigin()) return undefined;
  return { canonical: absoluteUrl(path), languages: {
    fr: absoluteUrl(path.replace(/^\/(fr|en)(?=\/|$)/, "/fr"))!,
    en: absoluteUrl(path.replace(/^\/(fr|en)(?=\/|$)/, "/en"))!,
    "x-default": absoluteUrl(path.replace(/^\/(fr|en)(?=\/|$)/, "/en"))!,
  }};
}
export function pageMetadata({ title, description, path, locale = "en", image, bilingual = true }: {
  title: string; description: string; path: string; locale?: Locale;
  image?: { src: string; alt: string }; bilingual?: boolean;
}): Metadata {
  const fullTitle = `${title} | LE GOLFE`;
  const url = absoluteUrl(path);
  const src = image && (/^https:\/\//.test(image.src) ? image.src : absoluteUrl(image.src));
  const images = src ? [{ url: src, alt: image!.alt }] : [];
  return {
    title: { absolute: fullTitle }, description,
    alternates: bilingual ? localizedAlternates(path) : url ? { canonical: url } : undefined,
    robots: { index: !!siteOrigin(), follow: true },
    openGraph: { type: "website", title: fullTitle, description, siteName: "LE GOLFE", url,
      locale: locale === "fr" ? "fr_FR" : "en_GB", alternateLocale: bilingual ? [locale === "fr" ? "en_GB" : "fr_FR"] : [], images },
    twitter: { card: src ? "summary_large_image" : "summary", title: fullTitle, description, images: src ? [src] : [] },
  };
}
export const privateMetadata: Metadata = { robots: { index: false, follow: false }, alternates: {}, openGraph: { images: [] }, twitter: { images: [] } };
