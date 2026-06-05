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

const ROOT = process.cwd();
const GENERATED_DIR = join(ROOT, "src/content/blog/generated");
const REGISTRY_PATH = join(GENERATED_DIR, "registry.ts");
const SLUGS_PATH = join(ROOT, "src/content/blog/slugs.ts");
const SITEMAP_SCRIPT = join(ROOT, "scripts/generate-sitemap.mjs");

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
  if (block.type === "cta")
    return `${indent}b2bCtaBlock("${escapeStr(block.text || "")}"),`;
  return "";
}

function buildArticleFile(meta, slot, blocks, date) {
  const hero =
    slot === "afternoon" ? IMG.warehouse : slot === "evening" ? IMG.loading : IMG.spcFeatured;
  const blockLines = blocks.map((b) => blockToTs(b)).join("\n");

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
  heroImage: img.${slot === "afternoon" ? "warehouse" : slot === "evening" ? "loading" : "spcFeatured"},
  ogImage: "${hero}",
  blocks: [
${blockLines}
    internalLinksBlock(),
    b2bCtaBlock(),
  ],
};
`;
}

/** Template bodies for calendar days without hand-written TS files */
function templateBlocks(slot, meta) {
  const intro = {
    type: "p",
    text: `${meta.title}. This guide is for flooring distributors, contractors and building material importers sourcing from a China SPC flooring factory. We focus on factory pricing, container efficiency and stable bulk supply — not decoration trends.`,
  };
  const sections = [
    { type: "h2", text: "Factory supply chain overview" },
    {
      type: "p",
      text: "Direct factory procurement removes trader margin and improves batch consistency. Bulk spc flooring orders packed for 40HQ containers reduce landed cost per sqm compared with LCL shipments.",
    },
    {
      type: "img",
      src: IMG.production,
      alt: "SPC flooring factory production line China",
      caption: "SPC flooring production line",
    },
    { type: "h2", text: "Pricing and procurement logic" },
    {
      type: "p",
      text: "Wholesale flooring price depends on thickness, wear layer, volume and packaging. Request factory price list with target sqm and port for accurate container flooring price quotation.",
    },
    {
      type: "img",
      src: IMG.loading,
      alt: "SPC flooring container loading 40HQ",
      caption: "Container loading for export orders",
    },
  ];
  if (slot === "afternoon") {
    sections.push({
      type: "h3",
      text: "Cost breakdown for importers",
    });
    sections.push({
      type: "ul",
      items: [
        "FOB factory price per sqm",
        "OEM carton and label costs",
        "Local trucking to port",
        "Ocean freight and destination charges",
      ],
    });
  }
  if (slot === "evening") {
    sections.push({
      type: "img",
      src: IMG.quality,
      alt: "SPC flooring QC inspection China factory",
      caption: "QC before shipment",
    });
  }
  return [intro, ...sections];
}

function writeArticle(meta, slot, date) {
  const filePath = join(GENERATED_DIR, `${meta.slug}.en.ts`);
  if (existsSync(filePath)) {
    console.log(`Skip (exists): ${meta.slug}`);
    return meta.slug;
  }
  const blocks = templateBlocks(slot, meta);
  writeFileSync(filePath, buildArticleFile(meta, slot, blocks, date), "utf8");
  console.log(`Created: ${meta.slug}.en.ts`);
  return meta.slug;
}

function regenerateRegistry() {
  const files = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .sort();
  const imports = files
    .map((f, i) => {
      const varName = `generatedPost${i}`;
      const mod = f.replace(".en.ts", "");
      return `import { post as ${varName} } from "./${mod}.en";`;
    })
    .join("\n");
  const arr = files.map((_, i) => `generatedPost${i}`).join(", ");
  const content = `/** AUTO-GENERATED — run: node scripts/generate-daily-seo-articles.mjs */\nimport type { BlogPost } from "../types";\n${imports}\n\nexport const generatedPostsEn: BlogPost[] = [${arr}];\n`;
  writeFileSync(REGISTRY_PATH, content, "utf8");
  console.log(`Registry: ${files.length} posts`);
}

function regenerateSlugs() {
  const generated = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""));
  const manual = [
    "spc-flooring-supplier-manufacturer-china",
    "choose-reliable-spc-flooring-supplier-china-2026",
    "7-mistakes-importing-spc-flooring-from-china",
  ];
  const content = `/** Lightweight slug list for sitemap/SSG — updated by generate-daily-seo-articles.mjs */

/** English-only auto-generated SEO articles */
export const blogSlugsEnOnly = ${JSON.stringify(generated, null, 2)} as const;

/** Manual articles with en/zh/es translations */
export const blogSlugsI18n = ${JSON.stringify(manual, null, 2)} as const;

export const blogSlugs = [...blogSlugsEnOnly, ...blogSlugsI18n] as const;

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}

export function getBlogSlugsForLocale(locale: string): string[] {
  if (locale === "en") return [...blogSlugs];
  return [...blogSlugsI18n];
}
`;
  writeFileSync(SLUGS_PATH, content, "utf8");
  console.log(`Slugs: ${generated.length} EN-only + ${manual.length} i18n`);
}

function updateSitemapBlogSlugs() {
  const generated = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""));
  const manual = [
    "spc-flooring-supplier-manufacturer-china",
    "choose-reliable-spc-flooring-supplier-china-2026",
    "7-mistakes-importing-spc-flooring-from-china",
  ];
  let sitemap = readFileSync(SITEMAP_SCRIPT, "utf8");
  const enRe = /const BLOG_SLUGS_EN_ONLY = \[[\s\S]*?\];/;
  const i18nRe = /const BLOG_SLUGS_I18N = \[[\s\S]*?\];/;
  if (enRe.test(sitemap) && i18nRe.test(sitemap)) {
    sitemap = sitemap.replace(
      enRe,
      `const BLOG_SLUGS_EN_ONLY = ${JSON.stringify(generated, null, 2)};`
    );
    sitemap = sitemap.replace(
      i18nRe,
      `const BLOG_SLUGS_I18N = ${JSON.stringify(manual, null, 2)};`
    );
    writeFileSync(SITEMAP_SCRIPT, sitemap, "utf8");
    console.log("Updated generate-sitemap.mjs blog slug lists");
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
