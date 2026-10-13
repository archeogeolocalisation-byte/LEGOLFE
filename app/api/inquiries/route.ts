import { createClient } from '@supabase/supabase-js';
import { validateInquiry } from '../../../lib/inquiryValidation';
import { checkOrigin, readJson, RequestError } from '../../../lib/security';

export const runtime = 'nodejs';
const response = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const input = await readJson(request, 16000);
    let inquiry;
    try { inquiry = validateInquiry(input); } catch { return response({ error: 'INVALID_INQUIRY' }, 400); }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return response({ error: 'NOT_CONFIGURED' }, 503);
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { villaId, ...fields } = inquiry;
    const live = villaId.startsWith('property-');
    if (!live || !/^property-[a-zA-Z0-9-]{1,100}$/.test(villaId)) return response({ error: 'INVALID_INQUIRY' }, 400);
    const { error } = await db.from('villa_inquiries').insert({ ...fields, listing_id: villaId }).abortSignal(AbortSignal.timeout(10000));
    if (error) {
      if (error.message.includes('RATE_LIMITED')) return response({ error: 'PLEASE_WAIT' }, 429);
      if (error.message.includes('VILLA_DATES_BLOCKED')) return response({ error: 'VILLA_DATES_BLOCKED' }, 409);
      return response({ error: 'INQUIRY_UNAVAILABLE' }, 503);
    }
    return response({ ok: true });
  } catch (error) {
    return response({ error: error instanceof RequestError ? error.message : 'INQUIRY_UNAVAILABLE' }, error instanceof RequestError ? error.status : 503);
  }
}
