import type { MetadataRoute } from "next";
import { indexableLocales } from "@/i18n/locales";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

const routes = [
  "",
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

const LAST_MODIFIED = new Date("2026-05-22");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of indexableLocales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/faq" || route === "/certifications" ? 0.6 : 0.8,
      });
    }
  }

  return entries;
}
