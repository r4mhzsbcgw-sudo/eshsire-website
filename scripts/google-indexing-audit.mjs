#!/usr/bin/env node
/**
 * Live indexing audit for https://www.eshsire.com
 * Output: docs/google-indexing-audit-data.json
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SITE = "https://www.eshsire.com";
const CONCURRENCY = 8;
const TIMEOUT_MS = 25000;

const EXTRA_PROBE_URLS = [
  `${SITE}/`,
  `https://eshsire.com/`,
  `https://eshsire.com/en`,
  `${SITE}/en/`,
  `${SITE}/en/spc-flooring/`,
  `${SITE}/en/cases-image-check`,
  `${SITE}/zh/cases-image-check`,
  `${SITE}/cases-image-review.html`,
  `${SITE}/de`,
  `${SITE}/de/spc-flooring`,
  `${SITE}/ar/spc-flooring`,
  `${SITE}/en/projects/africa-distributor`,
  `${SITE}/en/projects/sample-video-confirmation`,
  `${SITE}/en/cases/sample-video-confirmation`,
];

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function parseMeta(html, name) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']|` +
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`,
    "i"
  );
  const m = html.match(re);
  return m ? (m[1] ?? m[2] ?? "").trim() : null;
}

function parseCanonical(html) {
  const m = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i
  );
  return m ? (m[1] ?? m[2] ?? "").trim() : null;
}

function parseHreflang(html) {
  const links = [...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]*>/gi)].map((m) => m[0]);
  const out = [];
  for (const tag of links) {
    const hreflang = tag.match(/hreflang=["']([^"']+)["']/i)?.[1];
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (hreflang && href) out.push({ hreflang, href });
  }
  return out;
}

function parseTitle(html) {
  return html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
}

function parseDescription(html) {
  return parseMeta(html, "description");
}

function parseH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseRobotsMeta(html) {
  const content = parseMeta(html, "robots");
  if (!content) return { index: null, follow: null, raw: null };
  const lower = content.toLowerCase();
  return {
    index: lower.includes("noindex") ? false : lower.includes("index") ? true : null,
    follow: lower.includes("nofollow") ? false : lower.includes("follow") ? true : null,
    raw: content,
  };
}

function normalizeUrl(u) {
  try {
    const url = new URL(u);
    url.hash = "";
    return url.href.replace(/\/$/, "") || url.href;
  } catch {
    return u;
  }
}

function pageType(url) {
  const p = new URL(url).pathname;
  if (p === "/" || p === "") return "language-hub";
  if (p.includes("cases-image-check")) return "dev-audit";
  if (p.includes("cases-image-review")) return "dev-static";
  if (/\/blog\/[^/]+/.test(p)) return "blog-post";
  if (p.endsWith("/blog") || p.endsWith("/blog/")) return "blog-index";
  if (/\/cases\//.test(p)) return "case-flow";
  if (/\/projects\//.test(p)) return "legacy-redirect";
  if (/\/(en|zh|es|ar|de|fr|ja|ko|pt|ru|th|tr|vi|id|it|he)(\/|$)/.test(p)) {
    const rest = p.replace(/^\/[^/]+/, "") || "/";
    if (rest === "/" || rest === "") return "homepage";
    if (rest === "/spc-flooring") return "product-spc";
    if (rest === "/wall-panels") return "product-wall";
    if (rest === "/contact") return "contact";
    if (rest === "/factory") return "factory";
    return "core-page";
  }
  return "other";
}

async function fetchProbe(url, follow = true) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: follow ? "follow" : "manual",
      signal: controller.signal,
      headers: {
        "User-Agent": "EshsireIndexingAudit/1.0 (+https://www.eshsire.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    const xRobots = res.headers.get("x-robots-tag");
    let html = "";
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("text/html")) {
      html = await res.text();
    }
    return {
      url,
      finalUrl: res.url,
      status: res.status,
      xRobotsTag: xRobots,
      html,
      redirected: res.redirected,
    };
  } catch (e) {
    return { url, error: e.message, status: 0, html: "", finalUrl: url };
  } finally {
    clearTimeout(timer);
  }
}

async function auditUrl(url, inSitemap) {
  const chain = await fetchProbe(url, false);
  let current = chain;
  const redirects = [];
  while (current.status >= 300 && current.status < 400) {
    const loc = current.html ? null : current.finalUrl;
    const location = current.status === 0 ? null : current.finalUrl;
    redirects.push({ from: current.url, status: current.status, to: location });
    if (!location || redirects.length > 5) break;
    current = await fetchProbe(location, false);
  }
  const final = current.status >= 300 ? await fetchProbe(url, true) : await fetchProbe(url, true);

  const html = final.html ?? "";
  const robotsMeta = parseRobotsMeta(html);
  const canonical = parseCanonical(html);
  const hreflang = parseHreflang(html);
  const title = parseTitle(html);
  const description = parseDescription(html);
  const h1 = parseH1(html);
  const xRobots = final.xRobotsTag ?? chain.xRobotsTag;

  const normSelf = normalizeUrl(final.finalUrl || url);
  const normCanon = canonical ? normalizeUrl(canonical) : null;
  const selfCanonical = normCanon === normSelf;

  let robotsStatus = "index,follow";
  if (xRobots?.toLowerCase().includes("noindex")) robotsStatus = `X-Robots: ${xRobots}`;
  else if (robotsMeta.index === false) robotsStatus = `meta: ${robotsMeta.raw ?? "noindex"}`;
  else if (robotsMeta.raw) robotsStatus = `meta: ${robotsMeta.raw}`;

  const locale = final.finalUrl.match(/\/(en|zh|es|ar|de|fr|ja|ko|pt|ru|th|tr|vi|id|it|he)(\/|$)/)?.[1] ?? null;
  const indexableLocales = ["en", "zh", "es"];
  const expectedHreflang = ["en", "zh", "es", "x-default"];
  const hreflangLocales = hreflang.map((h) => h.hreflang);
  const hreflangOk =
    hreflang.length === 0
      ? null
      : expectedHreflang.every((l) => hreflangLocales.includes(l)) &&
        hreflang.every((h) => h.href.startsWith(SITE));

  return {
    url,
    pageType: pageType(final.finalUrl || url),
    httpStatus: final.status,
    redirectChain: final.redirected ? final.finalUrl : redirects.length ? redirects : null,
    robotsStatus,
    metaRobots: robotsMeta.raw,
    xRobotsTag: xRobots,
    canonical,
    selfCanonical,
    hreflang: hreflang.map((h) => `${h.hreflang}→${h.href}`).join("; ") || "—",
    hreflangOk,
    inSitemap,
    title,
    description: description?.slice(0, 120) ?? null,
    h1,
    finalUrl: final.finalUrl,
    wordCount: html ? html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : 0,
  };
}

async function pool(items, fn, n) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
      if (idx % 10 === 0) process.stderr.write(`\rAudited ${idx + 1}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: n }, worker));
  process.stderr.write("\n");
  return results;
}

async function main() {
  const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  const sitemapUrls = extractLocs(sitemapXml);
  const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));

  const allUrls = [...new Set([...sitemapUrls, ...EXTRA_PROBE_URLS])];

  const rows = await pool(
    allUrls,
    (url) => auditUrl(url, sitemapSet.has(normalizeUrl(url))),
    CONCURRENCY
  );

  // Duplicate title/description/h1 analysis
  const byTitle = new Map();
  const byDesc = new Map();
  const byH1 = new Map();
  for (const r of rows) {
    if (r.httpStatus !== 200) continue;
    if (r.robotsStatus.includes("noindex")) continue;
    for (const [map, key] of [
      [byTitle, r.title],
      [byDesc, r.description],
      [byH1, r.h1],
    ]) {
      if (!key) continue;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r.url);
    }
  }

  const duplicates = {
    titles: [...byTitle.entries()].filter(([, urls]) => urls.length > 1),
    descriptions: [...byDesc.entries()].filter(([, urls]) => urls.length > 1),
    h1s: [...byH1.entries()].filter(([, urls]) => urls.length > 1),
  };

  // Internal links from homepage
  const home = rows.find((r) => r.url === `${SITE}/en` || normalizeUrl(r.url) === `${SITE}/en`);
  let internalLinks = [];
  if (home?.finalUrl) {
    const homeHtml = (await fetchProbe(`${SITE}/en`, true)).html;
    internalLinks = [...homeHtml.matchAll(/href=["'](\/en\/[^"'#?]+)["']/g)].map((m) => m[1]);
  }

  const importantPaths = ["/en/spc-flooring", "/en/wall-panels", "/en/blog", "/en/contact"];
  const homeLinksCheck = Object.fromEntries(
    importantPaths.map((p) => [p, internalLinks.some((l) => l.startsWith(p) || l === p)])
  );

  await mkdir(path.join(process.cwd(), "docs"), { recursive: true });
  const out = {
    auditedAt: new Date().toISOString(),
    site: SITE,
    sitemapUrlCount: sitemapUrls.length,
    totalAudited: rows.length,
    rows,
    duplicates,
    homeLinksCheck,
    sitemapUrls,
  };
  await writeFile(
    path.join(process.cwd(), "docs", "google-indexing-audit-data.json"),
    JSON.stringify(out, null, 2)
  );
  console.log(JSON.stringify({ sitemapUrlCount: sitemapUrls.length, totalAudited: rows.length }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
