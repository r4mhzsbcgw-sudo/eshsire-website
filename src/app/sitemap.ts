import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { locales } from "@/i18n/locales";

const routes = [
  "",
  "/spc-flooring",
  "/wall-panels",
  "/factory",
  "/oem-service",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
