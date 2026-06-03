import type { Locale } from "./locales";
import { locales } from "./locales";

export const routePaths = [
  "/",
  "/spc-flooring",
  "/wall-panels",
  "/accessories",
  "/factory",
  "/oem-service",
  "/about",
  "/contact",
  "/faq",
  "/certifications",
] as const;

export type RoutePath = (typeof routePaths)[number];

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function stripLocale(pathname: string): string {
  const pattern = new RegExp(`^/(${locales.join("|")})(/.*)?$`);
  const match = pathname.match(pattern);
  if (!match) return pathname;
  return match[2] || "/";
}

export function switchLocalePath(pathname: string, newLocale: Locale): string {
  const path = stripLocale(pathname);
  return localizedPath(newLocale, path);
}
