import PublicVillaPage, { villaMetadata } from "../../../components/PublicVillaPage";
type Props = { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) { return villaMetadata((await params).id, "fr"); }
export default async function Page({ params }: Props) { return <PublicVillaPage id={(await params).id} locale="fr" />; }
