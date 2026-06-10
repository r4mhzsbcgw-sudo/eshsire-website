#!/usr/bin/env node
/**
 * Eshsire Group V3 — Daily English blog publisher (1 article/day, strict validation).
 */
import { writeFileSync, readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import {
  contentCalendar,
  getCalendarStartDate,
  getDayIndexFromDate,
} from "./seo/content-calendar.mjs";
import { generateArticle } from "./seo/generate-article.mjs";
import { imageSelector } from "./seo/image-selector.mjs";
import { writeDailyReport } from "./seo/daily-report.mjs";
import { countInternalLinks } from "./seo/internal-links-seo.mjs";
import { classifyTopic } from "./seo/topic-classifier.mjs";
import { resolvePrimaryKeyword, buildMetaDescription } from "./seo/blog-content-rules.mjs";

const ROOT = process.cwd();
const GENERATED_DIR = join(ROOT, "src/content/blog/generated");
const REGISTRY_PATH = join(GENERATED_DIR, "registry.ts");
const SLUGS_PATH = join(ROOT, "src/content/blog/slugs.ts");
const SITEMAP_SCRIPT = join(ROOT, "scripts/generate-sitemap.mjs");

/** Only morning slot — 1 EN article per day (no afternoon/evening batch). */
const slotArg = process.argv.find((a) => a === "morning");
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

function writeArticleEnOnly(meta, slot, date, reportStats) {
  const enPath = join(GENERATED_DIR, `${meta.slug}.en.ts`);
  if (existsSync(enPath)) {
    console.log(`Skip (exists): ${meta.slug}`);
    return null;
  }

  const publishedSlugs = getPublishedSlugs();
  const topicType = classifyTopic(meta.title);
  const pk = resolvePrimaryKeyword(meta);
  const enriched = {
    ...meta,
    slot,
    topicType,
    primaryKeyword: pk,
    description: buildMetaDescription(meta.title, pk),
  };

  const images = imageSelector(enriched, "en");
  const imagesAssigned = images.imageCount ?? 5;

  const article = generateArticle("en", enriched, {
    publishedSlugs,
    date,
    images,
    strict: true,
  });

  if (!article.validation.pass) {
    reportStats.validationFailures.push({
      slug: meta.slug,
      locale: "en",
      errors: [...article.validation.errors, ...article.validation.warnings],
    });
    console.error(`PUBLISH BLOCKED — ${meta.slug} failed validateArticleStrict:`);
    console.error(article.validation.errors.join("\n"));
    if (article.validation.warnings.length) {
      console.error("Warnings:", article.validation.warnings.join("\n"));
    }
    return "blocked";
  }

  writeFileSync(enPath, buildArticleFile(article, slot, "en"), "utf8");
  reportStats.localeDistribution.en = (reportStats.localeDistribution.en ?? 0) + 1;
  reportStats.internalLinksTotal += countInternalLinks(article.blocks);

  const ctaType = article.blocks.find((b) => b.type === "cta")?.ctaType ?? "supplier";
  reportStats.ctaTypes[ctaType] = (reportStats.ctaTypes[ctaType] ?? 0) + 1;

  const text = article.blocks.map((b) => (b.type === "p" ? b.text : "")).join(" ");
  const pkCount = (text.match(new RegExp(article.primaryKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || [])
    .length;
  reportStats.keywordCoverage.push({
    slug: meta.slug,
    locale: "en",
    pk: article.primaryKeyword,
    pkCount,
    skAvg: (article.secondaryKeywords ?? []).length,
  });

  reportStats.articlesPublished++;
  reportStats.slugs.push(meta.slug);
  reportStats.imagesUsed += imagesAssigned;
  console.log(`Published EN: ${meta.slug} ~${article.wordCount} words (Day ${meta.day}, ${slot})`);
  return meta.slug;
}

function regenerateRegistry() {
  execSync("node scripts/seo/regenerate-registry.mjs", { stdio: "inherit", cwd: ROOT });
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
    `/** AUTO-GENERATED 鈥?Eshsire Group V2 calendar + manual posts */
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
  const slot = slotArg ?? "morning";

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

  console.log(`Eshsire Group V3 Day ${calendar.day}, date ${date}, slot: ${slot} (EN only, strict)`);

  const meta = calendar[slot];
  let blocked = false;
  if (meta) {
    const result = writeArticleEnOnly(meta, slot, date, reportStats);
    if (result === "blocked") blocked = true;
  } else {
    console.warn(`No calendar entry for slot: ${slot}`);
  }

  if (reportStats.articlesPublished > 0) {
    regenerateRegistry();
    regenerateSlugs();
    updateSitemapBlogSlugs();
  }

  writeDailyReport(reportStats);
  console.log(`Daily report: daily-report.md`);

  if (blocked) {
    process.exitCode = 1;
    console.error("Publish aborted — article did not pass validateArticleStrict.");
  }
}

main();
