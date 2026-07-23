import { NextRequest, NextResponse } from "next/server";
import {
  detectLocaleFromAcceptLanguage,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/locales";

function localeFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return segment && isLocale(segment) ? segment : null;
}

function withSeoHeaders(request: NextRequest, response?: NextResponse) {
  const { pathname } = request.nextUrl;
  const locale = localeFromPathname(pathname) ?? "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-pathname", pathname);
  const nextResponse =
    response ??
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  nextResponse.headers.set("x-locale", locale);
  nextResponse.headers.set("x-pathname", pathname);
  return nextResponse;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return withSeoHeaders(request);
  }

  if (pathname === "/") {
    return withSeoHeaders(request);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return withSeoHeaders(request);
  }

  const acceptLang = request.headers.get("accept-language") ?? "";
  const locale = detectLocaleFromAcceptLanguage(acceptLang);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return withSeoHeaders(request, NextResponse.redirect(url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|sitemap.xml|robots.txt).*)"],
};
