#!/usr/bin/env node
/**
 * Download Eshsire Group V2 floor + wall panel blog images to local paths.
 * Fixed Pexels URLs only 鈥?no search.
 */
import https from "node:https";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SPC_FLOOR_LIBRARY, WALL_PANEL_LIBRARY } from "./seo/blog-image-libraries.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const DOWNLOADS = [...Object.values(SPC_FLOOR_LIBRARY), ...Object.values(WALL_PANEL_LIBRARY)].filter(
  (a) => a.sourceUrl.startsWith("https://images.pexels.com/")
);

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(`${url.split("?")[0]}?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 60000,
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

async function main() {
  let ok = 0;
  let fail = 0;
  for (const asset of DOWNLOADS) {
    const rel = asset.src.replace(/^\//, "");
    const dest = join(ROOT, "public", rel);
    mkdirSync(dirname(dest), { recursive: true });
    process.stdout.write(`${asset.key} 鈫?${rel} ... `);
    try {
      const buf = await fetchBuffer(asset.sourceUrl);
      if (buf.length < 5000) throw new Error(`too small (${buf.length}b)`);
      writeFileSync(dest, buf);
      ok++;
      console.log(`OK (${Math.round(buf.length / 1024)} KB)`);
    } catch (e) {
      fail++;
      console.log(`FAIL: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok} OK, ${fail} failed`);
  if (fail) process.exit(1);
}

main();
