import type { MetadataRoute } from "next";
import { blogSlugs } from "@/content/blog/slugs";
import { indexableLocales } from "@/i18n/locales";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

const routes = [
  "",
  "/spc-flooring",
  "/spc-flooring/specs",
  "/wall-panels",
  "/accessories",
  "/factory",
  "/oem-service",
  "/about",
  "/contact",
  "/faq",
  "/certifications",
  "/blog",
] as const;

const blogSlugsList = [...blogSlugs];
const LAST_MODIFIED = new Date("2026-05-22");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of indexableLocales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/blog" ? 0.7 : 0.8,
      });
    }
    for (const slug of blogSlugsList) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
