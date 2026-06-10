#!/usr/bin/env node
/**
 * Writes a static public/sitemap.xml for reliable Google Search Console fetching.
 * Run automatically before build via npm prebuild.
 */
import { existsSync, statSync, writeFileSync } from "node:fs";
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
  "load-40hq-container-spc-flooring-export",
  "spc-flooring-factory-price-bulk-container-orders",
  "spc-flooring-supply-hotel-project-africa",
  "what-is-spc-flooring-commercial-projects",
  "spc-flooring-supplier-manufacturer-china",
  "choose-reliable-spc-flooring-supplier-china-2026",
  "7-mistakes-importing-spc-flooring-from-china",
];
const PROJECT_SLUGS = [
  "africa-distributor",
  "middle-east-hotel",
  "school-flooring",
  "europe-apartment",
  "commercial-office",
  "southeast-asia-distributor",
  "hospital-flooring",
  "villa-wpc-wall-panel",
];

function latestIso(paths) {
  const times = paths
    .filter((path) => existsSync(path))
    .map((path) => statSync(path).mtimeMs);
  const latest = times.length ? Math.max(...times) : Date.now();
  return new Date(latest).toISOString();
}

function routeLastMod(route) {
  const pagePath = route === ""
    ? join(process.cwd(), "src", "app", "[locale]", "page.tsx")
    : join(process.cwd(), "src", "app", "[locale]", ...route.slice(1).split("/"), "page.tsx");
  return latestIso([
    pagePath,
    join(process.cwd(), "src", "lib", "seo.ts"),
    join(process.cwd(), "src", "i18n", "dictionaries", "en.ts"),
    join(process.cwd(), "src", "i18n", "dictionaries", "zh.ts"),
    join(process.cwd(), "src", "i18n", "dictionaries", "es.ts"),
  ]);
}

function blogLastMod(slug) {
  return latestIso([
    join(process.cwd(), "src", "content", "blog", `${slug}.en.ts`),
    join(process.cwd(), "src", "content", "blog", `${slug}.zh.ts`),
    join(process.cwd(), "src", "content", "blog", `${slug}.es.ts`),
    join(process.cwd(), "src", "content", "blog", "generated", `${slug}.en.ts`),
    join(process.cwd(), "src", "content", "blog", "generated", `${slug}.zh.ts`),
    join(process.cwd(), "src", "content", "blog", "generated", `${slug}.es.ts`),
    join(process.cwd(), "src", "lib", "blog-seo.ts"),
  ]);
}

function projectLastMod() {
  return latestIso([
    join(process.cwd(), "src", "content", "projects", "index.ts"),
    join(process.cwd(), "src", "lib", "project-images.ts"),
  ]);
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc, changeFreq, priority, lastMod) {
  return `<url>
<loc>${escapeXml(loc)}</loc>
<lastmod>${lastMod}</lastmod>
<changefreq>${changeFreq}</changefreq>
<priority>${priority}</priority>
</url>`;
}

const entries = [];

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    const changeFreq = route === "" || route === "/blog" ? "weekly" : "monthly";
    const priority = route === "" ? "1" : route === "/blog" ? "0.7" : "0.8";
    entries.push(urlEntry(`${SITE_URL}/${locale}${route}`, changeFreq, priority, routeLastMod(route)));
  }
  for (const slug of BLOG_SLUGS) {
    entries.push(
      urlEntry(`${SITE_URL}/${locale}/blog/${slug}`, "monthly", "0.7", blogLastMod(slug))
    );
  }
  for (const slug of PROJECT_SLUGS) {
    entries.push(
      urlEntry(`${SITE_URL}/${locale}/projects/${slug}`, "monthly", "0.7", projectLastMod())
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
