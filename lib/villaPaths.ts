import type { Locale } from "./i18n";

// Keep existing French URLs stable; English pages have a localized route.
export function villaHref(id: string, locale: Locale, contact = false) {
  return `${locale === "en" ? "/en" : ""}/villa/${id}${contact ? "/contact" : ""}`;
}
