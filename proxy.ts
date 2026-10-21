import {routeLocale} from "./lib/routeLocale";
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  headers.set("x-le-golfe-locale", routeLocale(path));
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)"] };
