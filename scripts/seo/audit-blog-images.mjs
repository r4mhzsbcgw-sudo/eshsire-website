#!/usr/bin/env node
/** Scan all blog image URLs and report broken links. Exit 1 if any broken. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import https from "node:https";
import http from "node:http";
import { isBlockedImageUrl, isRemoteImageUrl } from "./verified-image-ids.mjs";
import { isAllowedBlogImageUrl } from "./blog-image-catalog.mjs";

const BLOG_DIR = join(process.cwd(), "src/content/blog");
const PUBLIC = join(process.cwd(), "public");

function walk(dir, acc = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".ts")) acc.push(p);
  }
  return acc;
}

function extractUrls(text) {
  const urls = new Set();
  const patterns = [
    /heroImage:\s*"([^"]+)"/g,
    /ogImage:\s*"([^"]+)"/g,
    /imgBlock\("([^"]+)"/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      const u = m[1];
      if (u.startsWith("http") || u.startsWith("/")) urls.add(u);
    }
  }
  return [...urls];
}

function checkUrl(url) {
  return new Promise((resolve) => {
    if (isRemoteImageUrl(url)) {
      resolve({ url, ok: false, status: "remote-not-allowed" });
      return;
    }
    if (!isAllowedBlogImageUrl(url)) {
      resolve({ url, ok: false, status: "not-editorial-path" });
      return;
    }
    if (isBlockedImageUrl(url)) {
      resolve({ url, ok: false, status: "blocked-id" });
      return;
    }
    if (url.startsWith("/")) {
      const path = join(PUBLIC, url.replace(/^\//, ""));
      try {
        statSync(path);
        resolve({ url, ok: true, status: "local" });
      } catch {
        resolve({ url, ok: false, status: "missing-local" });
      }
      return;
    }
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(url, { method: "HEAD", timeout: 15000 }, (res) => {
      resolve({ url, ok: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode });
    });
    req.on("error", (e) => resolve({ url, ok: false, status: e.message }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ url, ok: false, status: "timeout" });
    });
    req.end();
  });
}

async function main() {
  const files = walk(BLOG_DIR);
  const urlToFiles = new Map();
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    for (const u of extractUrls(text)) {
      if (!urlToFiles.has(u)) urlToFiles.set(u, []);
      urlToFiles.get(u).push(f.replace(process.cwd(), ""));
    }
  }

  console.log(`Unique URLs: ${urlToFiles.size}`);
  const broken = [];

  for (const url of [...urlToFiles.keys()].sort()) {
    const r = await checkUrl(url);
    if (!r.ok) broken.push({ ...r, files: urlToFiles.get(url) });
  }

  if (broken.length) {
    console.log("\n=== BROKEN ===");
    for (const b of broken) {
      console.log(`${b.status}\t${b.url}`);
      console.log(`  used in: ${b.files?.slice(0, 2).join(", ")}${(b.files?.length ?? 0) > 2 ? "..." : ""}`);
    }
    console.log(`\nTotal broken: ${broken.length}`);
    process.exit(1);
  }

  console.log("All blog images OK");
}

main();
