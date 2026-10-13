import type { Metadata } from "next";
import { headers } from "next/headers";
import { siteOrigin } from "../lib/seo";
import SiteIdentity from "../components/SiteIdentity";
import DocumentLanguage from "../components/DocumentLanguage";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteOrigin() ? new URL(siteOrigin()!) : undefined,
  title: "LE GOLFE — Saint-Tropez local guide & stays",
  description: "Find the right stays, places and people around the Golfe de Saint-Tropez.",
  robots: { index: !!siteOrigin(), follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-le-golfe-locale") === "fr" ? "fr" : "en";
  return <html lang={locale}><body><SiteIdentity/><DocumentLanguage/>{children}</body></html>;
}
