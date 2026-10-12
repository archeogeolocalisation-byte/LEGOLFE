import { notFound } from "next/navigation";
import { renderContact } from "../../../../villa/[id]/contact/ContactPage";
import { isLocale } from "../../../../../lib/i18n";
export const dynamic = "force-dynamic";
export default async function Page(props: { params: Promise<{ id: string; locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return renderContact(props, locale);
}
