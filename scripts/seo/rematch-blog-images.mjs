#!/usr/bin/env node
/**
 * Rematch all blog images to local BJFLOOR assets with theme-aligned captions.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  resolveArticleKey,
  resolveLocale,
  selectImagesForArticle,
  getCaption,
  getAsset,
  getAlt,
  ARTICLE_IMAGE_SETS,
} from "./blog-image-catalog.mjs";

const BLOG_DIR = join(process.cwd(), "src/content/blog");

function walk(dir, acc = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".ts") && !f.endsWith("types.ts") && !f.endsWith("b2b-blocks.ts") && !f.endsWith("slugs.ts")) acc.push(p);
  }
  return acc;
}

function extractPrimaryKeyword(content) {
  const m = content.match(/primaryKeyword:\s*"([^"]+)"/) ?? content.match(/spc flooring [a-z ]+/i);
  if (typeof m?.[1] === "string") return m[1];
  const desc = content.match(/description:\s*"[^"]*?(spc flooring [^",]+)/i);
  return desc?.[1] ?? "SPC flooring";
}

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function rematchFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const articleKey = resolveArticleKey(filePath);
  const locale = resolveLocale(filePath);
  const pk = extractPrimaryKeyword(content);
  const imgs = selectImagesForArticle(articleKey, locale, pk);
  const set = ARTICLE_IMAGE_SETS[articleKey];

  if (!set) {
    console.warn("skip (no set):", filePath);
    return false;
  }

  let out = content;
  out = out.replace(/heroImage:\s*"[^"]+"/, `heroImage: "${imgs.banner}"`);
  out = out.replace(/ogImage:\s*"[^"]+"/, `ogImage: "${imgs.banner}"`);

  const heroTheme = set.hero;
  const heroCaption = getCaption(heroTheme, locale);
  const heroAlt = getAlt(heroTheme, pk);

  let sectionIdx = 0;
  const imgBlockRe = /imgBlock\("([^"]+)",\s*"([^"]*)",\s*"([^"]*)"\)/g;
  out = out.replace(imgBlockRe, (match, _src, _alt, _cap) => {
    const isEnding = sectionIdx >= set.sections.length;
    const theme = isEnding ? set.ending : set.sections[sectionIdx];
    if (!isEnding) sectionIdx++;
    const asset = getAsset(theme);
    const caption = getCaption(theme, locale);
    const alt = getAlt(theme, pk);
    return `imgBlock("${asset.src}", "${escapeStr(alt)}", "${escapeStr(caption)}")`;
  });

  if (out === content) return false;
  writeFileSync(filePath, out, "utf8");
  return true;
}

function main() {
  const files = walk(BLOG_DIR);
  let n = 0;
  for (const f of files) {
    if (rematchFile(f)) {
      n++;
      console.log("rematched:", f.replace(process.cwd(), ""));
    }
  }
  console.log(`\nRematched ${n} blog files with local theme-matched images`);
}

main();
