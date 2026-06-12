#!/usr/bin/env node
/**
 * Writes a static public/sitemap.xml for reliable Google Search Console fetching.
 * Run automatically before build via npm prebuild.
 *
 * Only includes indexable URLs: 200-capable routes with published blog content.
 * Excludes /cases/* (noindex flow pages) and unpublished blog slugs.
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
  "factory-pricing-vs-trading-company-pricing-what-importers-need-to-know",
  "how-flooring-distributors-can-increase-profit-margins-without-raising-prices",
  "how-successful-flooring-importers-reduce-sourcing-risks",
  "how-to-evaluate-an-spc-flooring-supplier-before-your-first-order",
  "load-40hq-container-spc-flooring-export",
  "spc-flooring-container-loading-strategies-that-reduce-import-costs",
  "spc-flooring-factory-audit-checklist-for-importers",
  "spc-flooring-factory-price-bulk-container-orders",
  "spc-flooring-quality-control-before-shipment",
  "spc-flooring-supply-hotel-project-africa",
  "the-real-cost-of-delayed-flooring-shipments",
  "what-is-spc-flooring-commercial-projects",
  "what-makes-a-reliable-spc-flooring-manufacturer",
  "spc-flooring-supplier-manufacturer-china",
  "choose-reliable-spc-flooring-supplier-china-2026",
  "7-mistakes-importing-spc-flooring-from-china",
];

/** Manual posts: sitemap slug → source file (without locale suffix) */
const MANUAL_BLOG_SOURCES = {
  "spc-flooring-supplier-manufacturer-china": "spc-supplier-manufacturer.en.ts",
  "choose-reliable-spc-flooring-supplier-china-2026": "choose-reliable-supplier.en.ts",
  "7-mistakes-importing-spc-flooring-from-china": "seven-mistakes.en.ts",
};

function blogSlugIsPublished(slug) {
  const generated = join(process.cwd(), "src", "content", "blog", "generated", `${slug}.en.ts`);
  if (existsSync(generated)) return true;
  const manual = MANUAL_BLOG_SOURCES[slug];
  if (manual && existsSync(join(process.cwd(), "src", "content", "blog", manual))) return true;
  return false;
}

const PUBLISHED_BLOG_SLUGS = BLOG_SLUGS.filter(blogSlugIsPublished);
const SKIPPED_BLOG_SLUGS = BLOG_SLUGS.filter((slug) => !blogSlugIsPublished(slug));

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
    join(process.cwd(), "src", "content", "blog", MANUAL_BLOG_SOURCES[slug] ?? ""),
    join(process.cwd(), "src", "lib", "blog-seo.ts"),
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
  for (const slug of PUBLISHED_BLOG_SLUGS) {
    entries.push(
      urlEntry(`${SITE_URL}/${locale}/blog/${slug}`, "monthly", "0.7", blogLastMod(slug))
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
if (SKIPPED_BLOG_SLUGS.length) {
  console.warn(`Skipped unpublished blog slugs: ${SKIPPED_BLOG_SLUGS.join(", ")}`);
}
