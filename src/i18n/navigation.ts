import type { Locale } from "./locales";

export const routePaths = [
  "/",
  "/spc-flooring",
  "/wall-panels",
  "/factory",
  "/oem-service",
  "/about",
  "/contact",
] as const;

export type RoutePath = (typeof routePaths)[number];

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|zh)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}

export function switchLocalePath(pathname: string, newLocale: Locale): string {
  const path = stripLocale(pathname);
  return localizedPath(newLocale, path);
}
