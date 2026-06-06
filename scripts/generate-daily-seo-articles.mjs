#!/usr/bin/env node
/**
 * BJFLOOR V2 — Global Content Automation Publisher
 * Generates all 16 locales per calendar slot; validates; writes daily-report.md
 */
import { writeFileSync, readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  contentCalendar,
  getCalendarStartDate,
  getDayIndexFromDate,
} from "./seo/content-calendar.mjs";
import { generateArticle } from "./seo/generate-article.mjs";
import { imageSelector } from "./seo/image-selector.mjs";
import { ALL_LOCALES } from "./seo/locales.mjs";
import { writeDailyReport } from "./seo/daily-report.mjs";
import { countInternalLinks } from "./seo/internal-links-seo.mjs";

const ROOT = process.cwd();
const GENERATED_DIR = join(ROOT, "src/content/blog/generated");
const REGISTRY_PATH = join(GENERATED_DIR, "registry.ts");
const SLUGS_PATH = join(ROOT, "src/content/blog/slugs.ts");
const SITEMAP_SCRIPT = join(ROOT, "scripts/generate-sitemap.mjs");

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
  if (idx < 0) {
    console.log(`Before calendar start (${getCalendarStartDate()}). No publish.`);
    return -1;
  }
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
  if (block.type === "cta")
    return `${indent}{ type: "cta", variant: "${block.variant ?? "b2b-procurement"}", title: "${escapeStr(block.title ?? "")}", text: "${escapeStr(block.text ?? "")}" },`;
  return "";
}

function buildArticleFile(article, slot, locale) {
  const bodyBlocks = article.blocks.filter((b) => b.type !== "cta");
  const cta = article.blocks.find((b) => b.type === "cta");
  const blockLines = bodyBlocks.map((b) => blockToTs(b)).join("\n");
  const ctaLine = cta
    ? blockToTs(cta)
    : `    b2bCtaBlock("${locale}"),`;

  return `import type { BlogPost } from "../types";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "../b2b-blocks";

export const post: BlogPost = {
  slug: "${article.slug}",
  slot: "${slot}",
  title: "${escapeStr(article.title)}",
  metaTitle: "${escapeStr(article.metaTitle ?? article.title)}",
  description: "${escapeStr(article.description)}",
  date: "${article.date}",
  readMinutes: ${article.readMinutes},
  heroImage: "${article.heroImage}",
  ogImage: "${article.ogImage}",
  blocks: [
${blockLines}
    internalLinksBlock("${locale}"),
${ctaLine}
  ],
};
`;
}

function getPublishedSlugs() {
  const manual = [
    "spc-flooring-supplier-manufacturer-china",
    "choose-reliable-spc-flooring-supplier-china-2026",
    "7-mistakes-importing-spc-flooring-from-china",
  ];
  const generated = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""));
  return [...new Set([...generated, ...manual])];
}

function writeArticleAllLocales(meta, slot, date, reportStats) {
  const enPath = join(GENERATED_DIR, `${meta.slug}.en.ts`);
  if (existsSync(enPath)) {
    console.log(`Skip (exists): ${meta.slug}`);
    return null;
  }

  const publishedSlugs = getPublishedSlugs();
  const images = imageSelector({ ...meta, slot }, "all");
  let imagesAssigned = 5;

  for (const locale of ALL_LOCALES) {
    const filePath = join(GENERATED_DIR, `${meta.slug}.${locale}.ts`);
    const article = generateArticle(locale, { ...meta, slot }, {
      publishedSlugs,
      date,
      images,
    });

    if (!article.validation.pass) {
      reportStats.validationFailures.push({
        slug: meta.slug,
        locale,
        errors: article.validation.errors,
      });
      console.warn(`Validation warnings ${meta.slug} [${locale}]:`, article.validation.errors);
    }

    writeFileSync(filePath, buildArticleFile(article, slot, locale), "utf8");
    reportStats.localeDistribution[locale] = (reportStats.localeDistribution[locale] ?? 0) + 1;
    reportStats.internalLinksTotal += countInternalLinks(article.blocks);

    const ctaType = article.blocks.find((b) => b.type === "cta")?.ctaType ?? "supplier";
    reportStats.ctaTypes[ctaType] = (reportStats.ctaTypes[ctaType] ?? 0) + 1;

    const text = article.blocks.map((b) => (b.type === "p" ? b.text : "")).join(" ");
    const pkCount = (text.match(new RegExp(article.primaryKeyword, "gi")) || []).length;
    reportStats.keywordCoverage.push({
      slug: meta.slug,
      locale,
      pk: article.primaryKeyword,
      pkCount,
      skAvg: (article.secondaryKeywords ?? []).length,
    });

    console.log(`  ✓ ${meta.slug} [${locale}] ~${article.wordCount} words`);
  }

  reportStats.articlesPublished++;
  reportStats.slugs.push(meta.slug);
  reportStats.imagesUsed += imagesAssigned;
  console.log(`Created: ${meta.slug} × ${ALL_LOCALES.length} locales (Day ${meta.day}, ${slot})`);
  return meta.slug;
}

function slugBase(filename, locale) {
  return filename.replace(`.${locale}.ts`, "");
}

function regenerateRegistry() {
  const enBases = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => slugBase(f, "en"))
    .sort();

  const lines = [`/** AUTO-GENERATED — BJFLOOR V2 multi-locale */`, `import type { BlogPost } from "../types";`, ""];

  for (const locale of ALL_LOCALES) {
    const bases = enBases.filter((base) => existsSync(join(GENERATED_DIR, `${base}.${locale}.ts`)));
    for (const base of bases) {
      const safe = `${base.replace(/[^a-z0-9]/gi, "_")}_${locale}`;
      lines.push(`import { post as ${safe} } from "./${base}.${locale}";`);
    }
  }

  lines.push("", "export const generatedPostsByLocale: Record<string, BlogPost[]> = {");
  for (const locale of ALL_LOCALES) {
    const bases = enBases.filter((base) => existsSync(join(GENERATED_DIR, `${base}.${locale}.ts`)));
    const arr = bases.map((base) => `${base.replace(/[^a-z0-9]/gi, "_")}_${locale}`).join(", ");
    lines.push(`  ${locale}: [${arr}],`);
  }
  lines.push("};", "");

  lines.push("/** @deprecated use generatedPostsByLocale */");
  lines.push("export const generatedPostsEn = generatedPostsByLocale.en;");
  lines.push("export const generatedPostsZh = generatedPostsByLocale.zh ?? [];");
  lines.push("export const generatedPostsEs = generatedPostsByLocale.es ?? [];", "");

  writeFileSync(REGISTRY_PATH, lines.join("\n"), "utf8");
  console.log(`Registry: ${enBases.length} slugs × ${ALL_LOCALES.length} locales`);
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
    `/** AUTO-GENERATED — BJFLOOR V2 calendar + manual posts */
export const blogSlugs = ${JSON.stringify(all, null, 2)} as const;

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}
`,
    "utf8"
  );
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

  const reportStats = {
    date,
    articlesPublished: 0,
    localeDistribution: {},
    keywordCoverage: [],
    imagesUsed: 0,
    internalLinksTotal: 0,
    ctaTypes: {},
    validationFailures: [],
    slugs: [],
  };

  console.log(`BJFLOOR V2 Day ${calendar.day}, date ${date}, slots: ${slots.join(", ")}`);

  for (const slot of slots) {
    const meta = calendar[slot];
    if (!meta) continue;
    writeArticleAllLocales(meta, slot, date, reportStats);
  }

  regenerateRegistry();
  regenerateSlugs();
  updateSitemapBlogSlugs();
  writeDailyReport(reportStats);
  console.log(`Daily report: daily-report.md`);
}

main();
