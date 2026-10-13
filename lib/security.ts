export class RequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export function checkOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (request.headers.get('sec-fetch-site') === 'cross-site' || (origin && origin !== new URL(request.url).origin)) {
    throw new RequestError('INVALID_ORIGIN', 403);
  }
}

export async function readJson(request: Request, limit: number): Promise<unknown> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new RequestError('JSON_REQUIRED', 415);
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError('INVALID_BODY', 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > limit) { await reader.cancel(); throw new RequestError('PAYLOAD_TOO_LARGE', 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError('INVALID_BODY', 400);
  } finally { reader.releaseLock(); }
}

export function safeReturnPath(value: string | null): string {
  return value && /^\/(?:place|villa)\/[a-zA-Z0-9-]+$/.test(value) ? value : '';
}
