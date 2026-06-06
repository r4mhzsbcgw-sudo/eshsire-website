#!/usr/bin/env node
/**
 * Replace broken Unsplash IDs in blog posts + image registries.
 * Manual posts switch to local /images/blog/ assets.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  PHOTO_ID_REPLACEMENTS,
  fixImageUrl,
  isBlockedImageUrl,
} from "./verified-image-ids.mjs";

const BLOG_DIR = join(process.cwd(), "src/content/blog");
const REGISTRY_FILES = [
  join(process.cwd(), "content/image-library.json"),
  join(process.cwd(), "content/image-used.json"),
];

/** Manual posts: slug prefix → local image set */
const MANUAL_LOCAL_IMAGES = {
  "choose-reliable-supplier": {
    hero: "/images/blog/choose-supplier/01.jpg",
    sections: [
      "/images/blog/choose-supplier/02.jpg",
      "/images/blog/choose-supplier/03.jpg",
      "/images/blog/choose-supplier/04.jpg",
    ],
    ending: "/images/blog/choose-supplier/05.jpg",
  },
  "seven-mistakes": {
    hero: "/images/blog/7-mistakes/01.jpg",
    sections: [
      "/images/blog/7-mistakes/02.jpg",
      "/images/blog/7-mistakes/03.jpg",
      "/images/blog/7-mistakes/04.jpg",
    ],
    ending: "/images/blog/7-mistakes/05.jpg",
  },
  "spc-supplier-manufacturer": {
    hero: "/images/home/factory/01-production.jpg",
    sections: [
      "/images/home/factory/02-quality.jpg",
      "/images/home/factory/03-warehouse.jpg",
      "/images/home/factory/04-loading.jpg",
    ],
    ending: "/images/home/factory/06-export.jpg",
  },
};

function walk(dir, acc = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".ts")) acc.push(p);
  }
  return acc;
}

function getManualKey(filename) {
  for (const key of Object.keys(MANUAL_LOCAL_IMAGES)) {
    if (filename.startsWith(key)) return key;
  }
  return null;
}

function fixManualPost(content, manualKey) {
  const imgs = MANUAL_LOCAL_IMAGES[manualKey];
  let out = content;
  out = out.replace(/heroImage:\s*"[^"]+"/, `heroImage: "${imgs.hero}"`);
  out = out.replace(/ogImage:\s*"[^"]+"/, `ogImage: "${imgs.hero}"`);

  const imgBlockRe = /imgBlock\("([^"]+)"/g;
  let sectionIdx = 0;
  out = out.replace(imgBlockRe, (match, url) => {
    const isEnding = sectionIdx >= imgs.sections.length;
    const replacement = isEnding ? imgs.ending : imgs.sections[sectionIdx];
    if (!isEnding) sectionIdx++;
    return `imgBlock("${replacement}"`;
  });
  return out;
}

function fixGeneric(content) {
  let out = content;
  for (const [bad, good] of Object.entries(PHOTO_ID_REPLACEMENTS)) {
    out = out.split(bad).join(good);
  }
  return out;
}

function fixRegistryFile(path) {
  const data = JSON.parse(readFileSync(path, "utf8"));
  let changed = 0;

  const clean = (records) =>
    records.filter((r) => {
      if (!r.imageUrl) return true;
      if (r.imageUrl.includes("source.unsplash.com")) {
        changed++;
        return false;
      }
      if (r.articleSlug?.includes("test-v2") || r.topic?.includes("test-v2")) {
        changed++;
        return false;
      }
      return true;
    });

  if (data.records) {
    data.records = clean(data.records);
    for (const r of data.records) {
      if (r.imageUrl && isBlockedImageUrl(r.imageUrl)) {
        r.imageUrl = fixImageUrl(r.imageUrl);
        changed++;
      }
    }
  }
  if (data.usedImages) {
    data.usedImages = clean(data.usedImages);
    for (const r of data.usedImages) {
      if (r.imageUrl && isBlockedImageUrl(r.imageUrl)) {
        r.imageUrl = fixImageUrl(r.imageUrl);
        changed++;
      }
    }
  }

  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
  return changed;
}

function main() {
  const files = walk(BLOG_DIR);
  let blogChanges = 0;

  for (const f of files) {
    const base = f.split(/[/\\]/).pop();
    const manualKey = getManualKey(base.replace(/\.(en|zh|es|de|fr|ar|ru|pt|it|nl|pl|tr|ja|ko|vi|th|id)\.ts$/, ""));
    const original = readFileSync(f, "utf8");
    const fixed = manualKey ? fixManualPost(original, manualKey) : fixGeneric(original);
    if (fixed !== original) {
      writeFileSync(f, fixed, "utf8");
      blogChanges++;
      console.log("fixed:", f.replace(process.cwd(), ""));
    }
  }

  let registryChanges = 0;
  for (const p of REGISTRY_FILES) {
    registryChanges += fixRegistryFile(p);
    console.log("registry cleaned:", p.replace(process.cwd(), ""));
  }

  console.log(`\nDone: ${blogChanges} blog files, ${registryChanges} registry entries updated/removed`);
}

main();
