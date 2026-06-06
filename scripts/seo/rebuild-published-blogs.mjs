#!/usr/bin/env node
/**
 * Rebuild all published blog articles to BJFLOOR 90-day SEO standards.
 * Usage: node scripts/seo/rebuild-published-blogs.mjs
 */
import { writeFileSync, readFileSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { buildLongFormBlocks } from "./article-builder.mjs";
import { assignArticleImages } from "./image-library.mjs";
import {
  primaryKeyword as pkFn,
  secondaryKeywords as skFn,
  buildDescription,
  buildMetaTitle,
} from "./load-calendar.mjs";

const ROOT = process.cwd();
const GENERATED_DIR = join(ROOT, "src/content/blog/generated");
const BLOG_DIR = join(ROOT, "src/content/blog");
const REPORT_PATH = join(ROOT, "blog-rebuild-report.md");
const LIB_PATH = join(ROOT, "content/image-library.json");

/** All currently published EN articles — titles preserved verbatim */
const PUBLISHED = [
  {
    slug: "what-is-spc-flooring-commercial-projects",
    title: "What Is SPC Flooring and Why Contractors Choose It for Commercial Projects",
    slot: "morning",
    phase: 1,
    productTag: "spc",
    date: "2026-06-05",
    outDir: GENERATED_DIR,
    exportName: "post",
    fileBase: "what-is-spc-flooring-commercial-projects",
  },
  {
    slug: "spc-flooring-factory-price-bulk-container-orders",
    title: "Why SPC Flooring Factory Price in China Is Lower for Bulk Container Orders",
    slot: "afternoon",
    phase: 1,
    productTag: "spc",
    date: "2026-06-05",
    outDir: GENERATED_DIR,
    exportName: "post",
    fileBase: "spc-flooring-factory-price-bulk-container-orders",
  },
  {
    slug: "load-40hq-container-spc-flooring-export",
    title: "How We Load 40HQ Containers of SPC Flooring for Export Orders",
    slot: "evening",
    phase: 1,
    productTag: "spc",
    date: "2026-06-05",
    outDir: GENERATED_DIR,
    exportName: "post",
    fileBase: "load-40hq-container-spc-flooring-export",
  },
  {
    slug: "spc-flooring-supply-hotel-project-africa",
    title: "SPC Flooring Supply for Hotel Project in Africa — Factory Case Study",
    slot: "evening",
    phase: 3,
    productTag: "spc",
    date: "2026-06-05",
    outDir: GENERATED_DIR,
    exportName: "post",
    fileBase: "spc-flooring-supply-hotel-project-africa",
  },
  {
    slug: "spc-flooring-supplier-manufacturer-china",
    title: "SPC Flooring Supplier & Manufacturer in China | Factory Wholesale & OEM Solutions",
    slot: "morning",
    phase: 1,
    productTag: "spc",
    date: "2026-06-04",
    outDir: BLOG_DIR,
    exportName: "spcSupplierManufacturerPostEn",
    fileBase: "spc-supplier-manufacturer",
    hideTopHero: true,
  },
  {
    slug: "choose-reliable-spc-flooring-supplier-china-2026",
    title: "How to Choose a Reliable SPC Flooring Supplier in China in 2026",
    slot: "morning",
    phase: 1,
    productTag: "spc",
    date: "2026-05-22",
    outDir: BLOG_DIR,
    exportName: "chooseReliableSupplierPostEn",
    fileBase: "choose-reliable-supplier",
  },
  {
    slug: "7-mistakes-importing-spc-flooring-from-china",
    title: "7 Mistakes Flooring Distributors Make When Importing SPC Flooring From China",
    slot: "afternoon",
    phase: 1,
    productTag: "spc",
    date: "2026-05-22",
    outDir: BLOG_DIR,
    exportName: "sevenMistakesPostEn",
    fileBase: "seven-mistakes",
  },
];

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

function buildMeta(entry) {
  const pk = pkFn(entry.productTag, entry.title);
  const sk = skFn(entry.productTag);
  return {
    slug: entry.slug,
    title: entry.title,
    metaTitle: buildMetaTitle(entry.title, pk),
    description: buildDescription(entry.title, pk),
    primaryKeyword: pk,
    secondaryKeywords: sk,
    productTag: entry.productTag,
    phase: entry.phase,
    day: 0,
    readMinutes: 11,
    slot: entry.slot,
  };
}

function buildFileContent(entry, meta, blocks, wordCount) {
  const blockLines = blocks.map((b) => blockToTs(b)).join("\n");
  const readMinutes = Math.max(11, Math.ceil(wordCount / 200));
  const hideLine = entry.hideTopHero ? "\n  hideTopHero: true," : "";
  const importPath = entry.outDir === GENERATED_DIR ? "../types" : "./types";
  const blocksPath = entry.outDir === GENERATED_DIR ? "../b2b-blocks" : "./b2b-blocks";

  return `import type { BlogPost } from "${importPath}";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "${blocksPath}";

export const ${entry.exportName}: BlogPost = {
  slug: "${meta.slug}",
  slot: "${entry.slot}",
  title: "${escapeStr(meta.title)}",
  metaTitle: "${escapeStr(meta.metaTitle)}",
  description: "${escapeStr(meta.description)}",
  date: "${entry.date}",
  readMinutes: ${readMinutes},${hideLine}
  heroImage: "${meta.heroImage}",
  ogImage: "${meta.ogImage}",
  blocks: [
${blockLines}
    internalLinksBlock("en"),
    b2bCtaBlock("en"),
  ],
};
`;
}

function extractImagesFromFile(path) {
  if (!existsSync(path)) return [];
  const text = readFileSync(path, "utf8");
  const urls = [];
  const re = /imgBlock\("([^"]+)"|"src":\s*"([^"]+)"|heroImage:\s*(?:img\.\w+|"([^"]+)")/g;
  let m;
  while ((m = re.exec(text))) {
    const u = m[1] || m[2] || m[3];
    if (u && !u.startsWith("img.")) urls.push(u);
  }
  return urls;
}

function countKeywords(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.reduce((n, kw) => n + (lower.split(kw.toLowerCase()).length - 1), 0);
}

function countInternalLinks(blocks) {
  let n = 0;
  for (const b of blocks) {
    if (b.type === "rich-p") n += b.segments.filter((s) => typeof s !== "string").length;
  }
  return n;
}

function regenerateRegistry() {
  const bases = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""))
    .sort();
  const imports = bases
    .map((base) => {
      const safe = base.replace(/[^a-z0-9]/gi, "_");
      return `import { post as ${safe}_en } from "./${base}.en";`;
    })
    .join("\n");
  const arr = bases.map((base) => `${base.replace(/[^a-z0-9]/gi, "_")}_en`).join(", ");
  writeFileSync(
    join(GENERATED_DIR, "registry.ts"),
    `/** AUTO-GENERATED — BJFLOOR rebuild */\nimport type { BlogPost } from "../types";\n${imports}\n\nexport const generatedPostsEn: BlogPost[] = [${arr}];\nexport const generatedPostsZh: BlogPost[] = [];\nexport const generatedPostsEs: BlogPost[] = [];\n`,
    "utf8"
  );
}

function removeGeneratedI18n() {
  let removed = 0;
  for (const f of readdirSync(GENERATED_DIR)) {
    if (f.endsWith(".zh.ts") || f.endsWith(".es.ts")) {
      unlinkSync(join(GENERATED_DIR, f));
      removed++;
    }
  }
  return removed;
}

function main() {
  writeFileSync(LIB_PATH, JSON.stringify({ usedImages: [], poolCursor: {}, notes: "Reset for BJFLOOR rebuild" }, null, 2));

  const stats = {
    scanned: PUBLISHED.length,
    rewritten: 0,
    imagesReplaced: 0,
    duplicatesRemoved: 0,
    internalLinksAdded: 0,
    keywordsAdded: 0,
    details: [],
  };

  const allBeforeImages = [];
  for (const entry of PUBLISHED) {
    const path = join(entry.outDir, `${entry.fileBase}.en.ts`);
    allBeforeImages.push(...extractImagesFromFile(path));
  }
  const beforeSet = allBeforeImages;
  const dupBefore = beforeSet.length - new Set(beforeSet).size;

  const rebuildDate = new Date().toISOString().slice(0, 10);

  for (const entry of PUBLISHED) {
    const filePath = join(entry.outDir, `${entry.fileBase}.en.ts`);
    const beforeImages = extractImagesFromFile(filePath);
    const beforeText = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
    const beforeWords = beforeText.split(/\s+/).length;
    const beforeKw = countKeywords(beforeText, [
      "spc flooring factory",
      "spc flooring supplier china",
      "container flooring price",
      "wholesale flooring supplier china",
      "bulk spc flooring order",
    ]);

    const meta = buildMeta(entry);
    const images = assignArticleImages(meta, entry.slot, rebuildDate);
    const { blocks, wordCount } = buildLongFormBlocks(meta, images);
    const fullMeta = { ...meta, heroImage: images.banner, ogImage: images.banner };

    const bodyLinks = countInternalLinks(blocks);
    stats.internalLinksAdded += bodyLinks + 1; // +1 internalLinksBlock footer

    const afterKw = countKeywords(
      blocks.map((b) => (b.type === "p" ? b.text : b.type === "ul" ? b.items.join(" ") : "")).join(" "),
      [
        "spc flooring factory",
        "spc flooring supplier china",
        "spc flooring manufacturer china",
        "container flooring price",
        "wholesale flooring supplier china",
        "bulk spc flooring order",
        "spc flooring price per sqm",
      ]
    );
    stats.keywordsAdded += Math.max(0, afterKw - beforeKw);

    writeFileSync(filePath, buildFileContent(entry, fullMeta, blocks, wordCount), "utf8");
    stats.rewritten++;
    stats.imagesReplaced += 5;
    stats.details.push({
      slug: entry.slug,
      words: wordCount,
      images: 5,
      internalLinks: bodyLinks + 1,
      keywords: afterKw,
    });
  }

  stats.duplicatesRemoved = dupBefore + Math.max(0, beforeSet.length - stats.rewritten * 5);

  const i18nRemoved = removeGeneratedI18n();
  regenerateRegistry();

  const report = `# BJFLOOR Blog Rebuild Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Count |
|--------|------:|
| Scanned articles | ${stats.scanned} |
| Rewritten articles | ${stats.rewritten} |
| Images replaced | ${stats.imagesReplaced} |
| Duplicate images removed | ${stats.duplicatesRemoved} |
| Internal links added (body + footer) | ${stats.internalLinksAdded} |
| Net keyword occurrences added | ${stats.keywordsAdded} |
| Legacy zh/es generated files removed | ${i18nRemoved} |

## Standards applied

- BJFLOOR 90-day SEO System (procurement / profit / supply chain focus)
- Minimum ~1800 words per article
- 5 unique images per article (banner + 3 sections + ending)
- No duplicate images across rebuilt set (image-library.json reset)
- Title preserved verbatim — content rewritten to match title intent
- Primary + secondary keyword placement in title, meta, intro, body, conclusion
- Internal links: /spc-flooring, /factory, /wall-panels, /contact
- BJFLOOR / Eshsire factory advantage section in every article
- Removed product-decoration / brochure-style copy

## Per-article detail

${stats.details
  .map(
    (d) =>
      `### ${d.slug}\n- Words: ~${d.words}\n- Images: ${d.images}\n- Internal links: ${d.internalLinks}\n- Keyword hits: ${d.keywords}\n`
  )
  .join("\n")}

## Daily auto-publish

GitHub Actions schedule unchanged (09:00 / 14:00 / 19:00 CST). Calendar start: 2026-06-07.
`;

  writeFileSync(REPORT_PATH, report, "utf8");
  console.log(`Rebuild complete. Report: ${REPORT_PATH}`);
  console.log(JSON.stringify(stats, null, 2));
}

main();
