#!/usr/bin/env node
/**
 * Writes a static public/sitemap.xml for reliable Google Search Console fetching.
 * Run automatically before build via npm prebuild.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = "https://www.eshsire.com";
const LOCALES = ["en", "zh", "es"];
const ROUTES = [
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
];
const BLOG_SLUGS = [
  "choose-reliable-spc-flooring-supplier-china-2026",
  "7-mistakes-importing-spc-flooring-from-china",
];
const LAST_MOD = new Date().toISOString();

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc, changeFreq, priority) {
  return `<url>
<loc>${escapeXml(loc)}</loc>
<lastmod>${LAST_MOD}</lastmod>
<changefreq>${changeFreq}</changefreq>
<priority>${priority}</priority>
</url>`;
}

const entries = [];

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    const changeFreq = route === "" || route === "/blog" ? "weekly" : "monthly";
    const priority = route === "" ? "1" : route === "/blog" ? "0.7" : "0.8";
    entries.push(urlEntry(`${SITE_URL}/${locale}${route}`, changeFreq, priority));
  }
  for (const slug of BLOG_SLUGS) {
    entries.push(
      urlEntry(`${SITE_URL}/${locale}/blog/${slug}`, "monthly", "0.7")
    );
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

const outPath = join(process.cwd(), "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${entries.length} URLs to public/sitemap.xml`);
