#!/usr/bin/env node
/**
 * Verify public/sitemap.xml URLs return 200 and are indexable.
 * Usage: node scripts/verify-sitemap.mjs [baseUrl]
 * Default baseUrl: http://localhost:3000 (run after npm run build && npm start)
 * For production check: node scripts/verify-sitemap.mjs https://www.eshsire.com
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
const FORBIDDEN_PATHS = ["cases-image-check", "cases-image-review", "/cases/"];

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function parseRobots(html) {
  const m = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  return m?.[1]?.toLowerCase() ?? "";
}

async function checkUrl(url) {
  const res = await fetch(url, { redirect: "follow" });
  const ct = res.headers.get("content-type") ?? "";
  const html = ct.includes("text/html") ? await res.text() : "";
  const robots = parseRobots(html);
  return { url, status: res.status, robots, finalUrl: res.url };
}

async function main() {
  const xml = readFileSync(join(process.cwd(), "public", "sitemap.xml"), "utf8");
  const locs = extractLocs(xml);
  console.log(`Verifying ${locs.length} sitemap URLs against ${BASE}\n`);

  let failed = 0;
  for (const loc of locs) {
    const forbidden = FORBIDDEN_PATHS.find((bad) => loc.includes(bad));
    if (forbidden) {
      console.error(`FAIL forbidden path in sitemap: ${loc}`);
      failed++;
      continue;
    }
    const testUrl = loc.replace("https://www.eshsire.com", BASE.replace(/\/$/, ""));
    const r = await checkUrl(testUrl);
    if (r.status !== 200) {
      console.error(`FAIL ${r.status} ${loc}`);
      failed++;
    } else if (r.robots.includes("noindex")) {
      console.error(`FAIL noindex ${loc} (robots=${r.robots})`);
      failed++;
    } else if (r.finalUrl !== testUrl && r.finalUrl.replace(/\/$/, "") !== testUrl.replace(/\/$/, "")) {
      console.error(`FAIL redirect ${loc} → ${r.finalUrl}`);
      failed++;
    } else {
      console.log(`OK 200 ${loc}`);
    }
  }

  if (failed) {
    console.error(`\n${failed} issue(s) found`);
    process.exit(1);
  }
  console.log(`\nAll ${locs.length} sitemap URLs passed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
