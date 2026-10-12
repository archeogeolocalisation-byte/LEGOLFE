import { notFound } from "next/navigation";
import PublicVillaPage, { villaMetadata } from "../../../../components/PublicVillaPage";
import { isLocale } from "../../../../lib/i18n";
type Props = { params: Promise<{ id: string; locale: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params;
  if (!isLocale(locale)) notFound();
  return villaMetadata(id, locale);
}
export default async function Page({ params }: Props) {
  const { id, locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PublicVillaPage id={id} locale={locale} />;
}
