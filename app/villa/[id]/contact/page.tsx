import { renderContact } from './ContactPage';
export const dynamic = 'force-dynamic';
export default async function Page(props: { params: Promise<{ id: string }>; searchParams: Promise<Record<string,string|string[]|undefined>> }) { return renderContact(props, 'fr'); }
