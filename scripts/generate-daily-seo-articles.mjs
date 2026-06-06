#!/usr/bin/env node
/**
 * BJFLOOR daily SEO publisher — 90-day strict calendar.
 *
 * Usage:
 *   node scripts/generate-daily-seo-articles.mjs              # today's 3 slots
 *   node scripts/generate-daily-seo-articles.mjs morning      # single slot
 *   node scripts/generate-daily-seo-articles.mjs --day 1      # force calendar day (1-90)
 *
 * Schedule (China time): 09:00 morning | 14:00 afternoon | 19:00 evening
 */
import { writeFileSync, readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  contentCalendar,
  getCalendarStartDate,
  getDayIndexFromDate,
} from "./seo/content-calendar.mjs";
import { buildLongFormBlocks } from "./seo/article-builder.mjs";
import { assignArticleImages } from "./seo/image-library.mjs";

const ROOT = process.cwd();
const GENERATED_DIR = join(ROOT, "src/content/blog/generated");
const REGISTRY_PATH = join(GENERATED_DIR, "registry.ts");
const SLUGS_PATH = join(ROOT, "src/content/blog/slugs.ts");
const SITEMAP_SCRIPT = join(ROOT, "scripts/generate-sitemap.mjs");
const FILE_LOCALES = ["en"];

const slotArg = process.argv.find((a) => ["morning", "afternoon", "evening"].includes(a));
const dayFlag = process.argv.indexOf("--day");
const forceDay = dayFlag >= 0 ? Number(process.argv[dayFlag + 1]) : null;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function dayIndex() {
  if (forceDay !== null && !Number.isNaN(forceDay)) {
    return Math.min(Math.max(1, forceDay), 90) - 1;
  }
  const idx = getDayIndexFromDate(new Date());
  if (idx < 0) return 0;
  if (idx >= contentCalendar.length) {
    console.warn(`Calendar ended (day ${idx + 1} > 90). No publish.`);
    return -1;
  }
  return idx;
}

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function blockToTs(block, indent = "    ") {
  if (block.type === "p") return `${indent}{ type: "p", text: "${escapeStr(block.text)}" },`;
  if (block.type === "h2") return `${indent}{ type: "h2", text: "${escapeStr(block.text)}" },`;
  if (block.type === "h3") return `${indent}{ type: "h3", text: "${escapeStr(block.text)}" },`;
  if (block.type === "ul")
    return `${indent}{ type: "ul", items: ${JSON.stringify(block.items)} },`;
  if (block.type === "img")
    return `${indent}imgBlock("${block.src}", "${escapeStr(block.alt)}"${block.caption ? `, "${escapeStr(block.caption)}"` : ""}),`;
  if (block.type === "rich-p") {
    const segs = block.segments
      .map((s) =>
        typeof s === "string"
          ? `"${escapeStr(s)}"`
          : `{ link: "${escapeStr(s.link)}", href: "${escapeStr(s.href)}" }`
      )
      .join(", ");
    return `${indent}{ type: "rich-p", segments: [${segs}] },`;
  }
  return "";
}

function buildArticleFile(meta, slot, blocks, date, locale, wordCount) {
  const blockLines = blocks.map((b) => blockToTs(b)).join("\n");
  const readMinutes = Math.max(meta.readMinutes, Math.ceil(wordCount / 200));

  return `import type { BlogPost } from "../types";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "../b2b-blocks";

export const post: BlogPost = {
  slug: "${meta.slug}",
  slot: "${slot}",
  title: "${escapeStr(meta.title)}",
  metaTitle: "${escapeStr(meta.metaTitle)}",
  description: "${escapeStr(meta.description)}",
  date: "${date}",
  readMinutes: ${readMinutes},
  heroImage: "${meta.heroImage}",
  ogImage: "${meta.ogImage}",
  blocks: [
${blockLines}
    internalLinksBlock("${locale}"),
    b2bCtaBlock("${locale}"),
  ],
};
`;
}

function writeArticle(meta, slot, date) {
  const filePath = join(GENERATED_DIR, `${meta.slug}.en.ts`);
  if (existsSync(filePath)) {
    console.log(`Skip (exists): ${meta.slug}.en.ts`);
    return meta.slug;
  }

  const images = assignArticleImages(meta, slot, date);
  const { blocks, wordCount } = buildLongFormBlocks(meta, images);
  const fullMeta = { ...meta, heroImage: images.banner, ogImage: images.banner };

  if (wordCount < 1800) {
    console.warn(`Warning: ${meta.slug} word count ${wordCount} < 1800`);
  } else {
    console.log(`${meta.slug}: ~${wordCount} words, 5 images assigned`);
  }

  writeFileSync(
    filePath,
    buildArticleFile(fullMeta, slot, blocks, date, "en", wordCount),
    "utf8"
  );
  console.log(`Created: ${meta.slug}.en.ts (Day ${meta.day}, ${slot})`);
  return meta.slug;
}

function slugBase(filename) {
  return filename.replace(/\.en\.ts$/, "");
}

function regenerateRegistry() {
  const bases = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map(slugBase)
    .sort();

  const imports = bases
    .map((base) => {
      const safe = base.replace(/[^a-z0-9]/gi, "_");
      return `import { post as ${safe}_en } from "./${base}.en";`;
    })
    .join("\n");
  const arr = bases.map((base) => `${base.replace(/[^a-z0-9]/gi, "_")}_en`).join(", ");

  const content = `/** AUTO-GENERATED — BJFLOOR 90-day calendar */\nimport type { BlogPost } from "../types";\n${imports}\n\nexport const generatedPostsEn: BlogPost[] = [${arr}];\n\n/** zh/es resolved at runtime via article-translations.mjs */\nexport const generatedPostsZh: BlogPost[] = [];\nexport const generatedPostsEs: BlogPost[] = [];\n`;
  writeFileSync(REGISTRY_PATH, content, "utf8");
  console.log(`Registry: ${bases.length} EN posts`);
}

function regenerateSlugs() {
  const generated = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""))
    .sort();
  const manual = [
    "spc-flooring-supplier-manufacturer-china",
    "choose-reliable-spc-flooring-supplier-china-2026",
    "7-mistakes-importing-spc-flooring-from-china",
  ];
  const legacy = [
    "what-is-spc-flooring-commercial-projects",
    "spc-flooring-factory-price-bulk-container-orders",
    "load-40hq-container-spc-flooring-export",
  ];
  const all = [...new Set([...generated, ...legacy, ...manual])];
  writeFileSync(
    SLUGS_PATH,
    `/** AUTO-GENERATED — BJFLOOR calendar + manual posts */
export const blogSlugs = ${JSON.stringify(all, null, 2)} as const;

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}
`,
    "utf8"
  );
  console.log(`Slugs: ${all.length} total`);
}

function updateSitemapBlogSlugs() {
  const generated = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""))
    .sort();
  const manual = [
    "spc-flooring-supplier-manufacturer-china",
    "choose-reliable-spc-flooring-supplier-china-2026",
    "7-mistakes-importing-spc-flooring-from-china",
  ];
  const legacy = [
    "what-is-spc-flooring-commercial-projects",
    "spc-flooring-factory-price-bulk-container-orders",
    "load-40hq-container-spc-flooring-export",
  ];
  const all = [...new Set([...generated, ...legacy, ...manual])];
  let sitemap = readFileSync(SITEMAP_SCRIPT, "utf8");
  const re = /const BLOG_SLUGS = \[[\s\S]*?\];/;
  if (re.test(sitemap)) {
    sitemap = sitemap.replace(re, `const BLOG_SLUGS = ${JSON.stringify(all, null, 2)};`);
    writeFileSync(SITEMAP_SCRIPT, sitemap, "utf8");
  }
}

function main() {
  const day = dayIndex();
  if (day < 0) return;

  const calendar = contentCalendar[day];
  const date = todayISO();
  const slots = slotArg ? [slotArg] : ["morning", "afternoon", "evening"];

  console.log(`BJFLOOR Day ${calendar.day} (index ${day}), start ${getCalendarStartDate()}, date ${date}`);
  console.log(`Slots: ${slots.join(", ")}`);

  for (const slot of slots) {
    const meta = calendar[slot];
    if (!meta) {
      console.warn(`No entry for slot: ${slot}`);
      continue;
    }
    writeArticle(meta, slot, date);
  }

  regenerateRegistry();
  regenerateSlugs();
  updateSitemapBlogSlugs();
}

main();
