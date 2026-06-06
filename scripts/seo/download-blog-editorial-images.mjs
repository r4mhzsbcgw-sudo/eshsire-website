#!/usr/bin/env node
/** Download blog editorial images into public/images/blog/editorial/ (blog-only assets). */
import https from "node:https";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { EDITORIAL_DOWNLOADS } from "./blog-editorial-sources.mjs";

const SIZE = "w=1200&h=800&fit=crop&auto=format&q=85";
const OUT_DIR = join(process.cwd(), "public/images/blog/editorial");

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { timeout: 30000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} → HTTP ${res.statusCode}`));
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
  mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0;
  for (const row of EDITORIAL_DOWNLOADS) {
    const dest = join(OUT_DIR, row.file);
    const url = `https://images.unsplash.com/${row.id}?${SIZE}`;
    process.stdout.write(`download ${row.file} ... `);
    try {
      const buf = await fetchBuffer(url);
      writeFileSync(dest, buf);
      console.log(`OK (${Math.round(buf.length / 1024)} KB)`);
      ok++;
    } catch (e) {
      console.log(`FAIL: ${e.message}`);
    }
  }
  console.log(`\n${ok}/${EDITORIAL_DOWNLOADS.length} editorial images saved to public/images/blog/editorial/`);
  if (ok < EDITORIAL_DOWNLOADS.length) process.exit(1);
}

main();
