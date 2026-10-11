import type { NextConfig } from "next";
// Fail the build before a misconfigured administrative key reaches a client bundle.
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (publicKey && !publicKey.startsWith('sb_publishable_')) {
  let role = '';
  try { role = JSON.parse(Buffer.from(publicKey.split('.')[1], 'base64url').toString('utf8')).role; } catch { /* Invalid key */ }
  if (role !== 'anon') throw new Error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be a publishable or legacy anon key.');
}
for (const name of Object.keys(process.env)) {
  if (/^NEXT_PUBLIC_.*(SERVICE_ROLE|SECRET|PRIVATE_KEY|OPENAI_API_KEY|DATABASE_URL)/i.test(name) && process.env[name]) throw new Error(`Server secret cannot use a NEXT_PUBLIC_ name: ${name}`);
}
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Content-Security-Policy', value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'" },
    ] }];
  },
};
export default nextConfig;
