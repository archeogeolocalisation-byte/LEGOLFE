import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  headers.set("x-le-golfe-locale", path === "/fr" || path.startsWith("/fr/") || path.startsWith("/villa/") || path === "/match" ? "fr" : "en");
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)"] };
