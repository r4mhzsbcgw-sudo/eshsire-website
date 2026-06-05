#!/usr/bin/env node
/**
 * Daily SEO article publisher for Eshsire B2B blog.
 *
 * Usage:
 *   node scripts/generate-daily-seo-articles.mjs           # publish all 3 slots for today
 *   node scripts/generate-daily-seo-articles.mjs morning   # single slot
 *   node scripts/generate-daily-seo-articles.mjs --day 1   # force calendar day index
 *
 * Schedule (China time, via GitHub Actions):
 *   09:00 morning | 14:00 afternoon | 20:00 evening
 */
import { writeFileSync, readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { contentCalendar } from "./seo/content-calendar.mjs";
import { resolveMeta, templateBlocks } from "./seo/article-i18n-templates.mjs";

const ROOT = process.cwd();
const GENERATED_DIR = join(ROOT, "src/content/blog/generated");
const REGISTRY_PATH = join(GENERATED_DIR, "registry.ts");
const SLUGS_PATH = join(ROOT, "src/content/blog/slugs.ts");
const SITEMAP_SCRIPT = join(ROOT, "scripts/generate-sitemap.mjs");
const LOCALES = ["en", "zh", "es"];

const IMG = {
  production: "/images/home/factory/01-production.jpg",
  quality: "/images/home/factory/02-quality.jpg",
  warehouse: "/images/home/factory/03-warehouse.jpg",
  loading: "/images/home/factory/04-loading.jpg",
  oem: "/images/home/factory/05-oem.jpg",
  export: "/images/home/factory/06-export.jpg",
  spcFeatured: "/images/home/spc-flooring.jpg",
  wallFeatured: "/images/home/wall-panels.jpg",
};

const slotArg = process.argv.find((a) => ["morning", "afternoon", "evening"].includes(a));
const dayFlag = process.argv.indexOf("--day");
const forceDay = dayFlag >= 0 ? Number(process.argv[dayFlag + 1]) : null;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function dayIndex() {
  if (forceDay !== null && !Number.isNaN(forceDay)) return forceDay;
  const start = new Date("2026-06-05T00:00:00+08:00");
  const now = new Date();
  const diff = Math.floor((now - start) / 86400000);
  return Math.max(0, diff % contentCalendar.length);
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

function buildArticleFile(meta, slot, blocks, date, locale, ctaText) {
  const hero =
    slot === "afternoon" ? IMG.warehouse : slot === "evening" ? IMG.loading : IMG.spcFeatured;
  const heroKey =
    slot === "afternoon" ? "warehouse" : slot === "evening" ? "loading" : "spcFeatured";
  const blockLines = blocks.map((b) => blockToTs(b)).join("\n");
  const ctaArg = ctaText ? `, "${escapeStr(ctaText)}"` : "";

  return `import type { BlogPost } from "../types";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "../b2b-blocks";
import { blogFactoryImages as img } from "@/lib/blog-images";

export const post: BlogPost = {
  slug: "${meta.slug}",
  slot: "${slot}",
  title: "${escapeStr(meta.title)}",
  metaTitle: "${escapeStr(meta.metaTitle)}",
  description: "${escapeStr(meta.description)}",
  date: "${date}",
  readMinutes: ${meta.readMinutes},
  heroImage: img.${heroKey},
  ogImage: "${hero}",
  blocks: [
${blockLines}
    internalLinksBlock("${locale}"),
    b2bCtaBlock("${locale}"${ctaArg}),
  ],
};
`;
}

function writeArticle(meta, slot, date) {
  let created = false;
  for (const locale of LOCALES) {
    const filePath = join(GENERATED_DIR, `${meta.slug}.${locale}.ts`);
    if (existsSync(filePath)) {
      console.log(`Skip (exists): ${meta.slug}.${locale}.ts`);
      continue;
    }
    const localized = resolveMeta(meta, locale);
    const { blocks, ctaText } = templateBlocks(slot, localized, locale, IMG);
    writeFileSync(
      filePath,
      buildArticleFile(localized, slot, blocks, date, locale, ctaText),
      "utf8"
    );
    console.log(`Created: ${meta.slug}.${locale}.ts`);
    created = true;
  }
  if (!created && existsSync(join(GENERATED_DIR, `${meta.slug}.en.ts`))) {
    console.log(`Skip (exists): ${meta.slug}`);
  }
  return meta.slug;
}

function slugBase(filename) {
  return filename.replace(/\.(en|zh|es)\.ts$/, "");
}

function regenerateRegistry() {
  const bases = [
    ...new Set(
      readdirSync(GENERATED_DIR)
        .filter((f) => /\.(en|zh|es)\.ts$/.test(f))
        .map(slugBase)
    ),
  ].sort();

  const sections = LOCALES.map((locale) => {
    const imports = bases
      .map((base) => {
        const safe = base.replace(/[^a-z0-9]/gi, "_");
        return `import { post as ${safe}_${locale} } from "./${base}.${locale}";`;
      })
      .join("\n");
    const arr = bases.map((base) => `${base.replace(/[^a-z0-9]/gi, "_")}_${locale}`).join(", ");
    return { locale, imports, arr };
  });

  const content = `/** AUTO-GENERATED — run: node scripts/generate-daily-seo-articles.mjs */
import type { BlogPost } from "../types";
${sections.map((s) => s.imports).join("\n")}

export const generatedPostsEn: BlogPost[] = [${sections.find((s) => s.locale === "en").arr}];
export const generatedPostsZh: BlogPost[] = [${sections.find((s) => s.locale === "zh").arr}];
export const generatedPostsEs: BlogPost[] = [${sections.find((s) => s.locale === "es").arr}];
`;
  writeFileSync(REGISTRY_PATH, content, "utf8");
  console.log(`Registry: ${bases.length} posts × ${LOCALES.length} locales`);
}

function regenerateSlugs() {
  const generated = [
    ...new Set(
      readdirSync(GENERATED_DIR)
        .filter((f) => f.endsWith(".en.ts"))
        .map((f) => f.replace(".en.ts", ""))
    ),
  ].sort();
  const manual = [
    "spc-flooring-supplier-manufacturer-china",
    "choose-reliable-spc-flooring-supplier-china-2026",
    "7-mistakes-importing-spc-flooring-from-china",
  ];
  const all = [...generated, ...manual];
  const content = `/** Lightweight slug list for sitemap/SSG — updated by generate-daily-seo-articles.mjs */
export const blogSlugs = ${JSON.stringify(all, null, 2)} as const;

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}
`;
  writeFileSync(SLUGS_PATH, content, "utf8");
  console.log(`Slugs: ${all.length} total`);
}

function updateSitemapBlogSlugs() {
  const generated = [
    ...new Set(
      readdirSync(GENERATED_DIR)
        .filter((f) => f.endsWith(".en.ts"))
        .map((f) => f.replace(".en.ts", ""))
    ),
  ].sort();
  const manual = [
    "spc-flooring-supplier-manufacturer-china",
    "choose-reliable-spc-flooring-supplier-china-2026",
    "7-mistakes-importing-spc-flooring-from-china",
  ];
  const all = [...generated, ...manual];
  let sitemap = readFileSync(SITEMAP_SCRIPT, "utf8");
  const re = /const BLOG_SLUGS = \[[\s\S]*?\];/;
  if (re.test(sitemap)) {
    sitemap = sitemap.replace(re, `const BLOG_SLUGS = ${JSON.stringify(all, null, 2)};`);
    writeFileSync(SITEMAP_SCRIPT, sitemap, "utf8");
    console.log("Updated generate-sitemap.mjs BLOG_SLUGS");
  }
}

function main() {
  const day = dayIndex();
  const calendar = contentCalendar[day];
  const date = todayISO();
  const slots = slotArg ? [slotArg] : ["morning", "afternoon", "evening"];

  console.log(`Calendar day ${day}, date ${date}, slots: ${slots.join(", ")}`);

  for (const slot of slots) {
    const meta = calendar[slot];
    if (!meta) {
      console.warn(`No calendar entry for slot: ${slot}`);
      continue;
    }
    writeArticle(meta, slot, date);
  }

  regenerateRegistry();
  regenerateSlugs();
  updateSitemapBlogSlugs();
}

main();
