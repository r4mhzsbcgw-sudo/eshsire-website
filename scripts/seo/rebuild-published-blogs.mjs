#!/usr/bin/env node
/**
 * Rebuild all published blog articles to Eshsire Group V3 content standards.
 */
import { writeFileSync, readFileSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { buildLongFormBlocks } from "./article-builder.mjs";
import { imageSelector } from "./image-selector.mjs";
import {
  resolvePrimaryKeyword,
  buildMetaDescription,
  pickHook,
  STANDARD_CTA,
  isLogisticsTopic,
  isQualityTopic,
} from "./blog-content-rules.mjs";
import { classifyTopic } from "./topic-classifier.mjs";
import { secondaryKeywords } from "./load-calendar.mjs";

const ROOT = process.cwd();
const GENERATED_DIR = join(ROOT, "src/content/blog/generated");
const BLOG_DIR = join(ROOT, "src/content/blog");
const REPORT_PATH = join(ROOT, "blog-rebuild-report.md");

const SHARP_TITLES = {
  "factory-pricing-vs-trading-company-pricing-what-importers-need-to-know":
    "SPC Flooring Factory vs Trading Company: What Importers Usually Find Too Late",
  "how-flooring-distributors-can-increase-profit-margins-without-raising-prices":
    "How Flooring Distributors Increase SPC Margins Without Raising Retail Prices",
  "how-successful-flooring-importers-reduce-sourcing-risks":
    "How Successful SPC Importers Reduce Sourcing Risk Before the Container Ships",
  "how-to-evaluate-an-spc-flooring-supplier-before-your-first-order":
    "How to Evaluate an SPC Flooring Supplier Before Your First Container Order",
  "load-40hq-container-spc-flooring-export":
    "SPC Flooring Container Loading: Why 20GP Is Often Enough for Heavy Flooring",
  "spc-flooring-container-loading-strategies-that-reduce-import-costs":
    "How to Mix SPC Flooring With Wall Panels and PVC Ceiling Panels in One Shipment",
  "spc-flooring-factory-audit-checklist-for-importers":
    "SPC Flooring Factory Audit: What Importers Must Verify Before Bulk Orders",
  "spc-flooring-factory-price-bulk-container-orders":
    "Why Cheap SPC Flooring Can Become Expensive After Shipment",
  "spc-flooring-quality-control-before-shipment":
    "SPC Flooring Quality Inspection: What Must Be Checked Before Container Loading",
  "spc-flooring-supply-hotel-project-africa":
    "What African Building Materials Distributors Should Know Before Importing SPC Flooring",
  "the-real-cost-of-delayed-flooring-shipments":
    "Why Daily Production Updates Matter More Than a Low Price",
  "what-is-spc-flooring-commercial-projects":
    "SPC Flooring Supplier Guide: What Commercial Project Importers Must Verify Before Ordering",
  "what-makes-a-reliable-spc-flooring-manufacturer":
    "What Makes a Reliable SPC Flooring Manufacturer — Beyond the Sample Room",
  "spc-flooring-supplier-manufacturer-china":
    "SPC Flooring Supplier in China: How Importers Avoid Costly Supplier Mistakes",
  "choose-reliable-spc-flooring-supplier-china-2026":
    "How to Choose an SPC Flooring Supplier in China Without Hidden Shipment Risk",
  "7-mistakes-importing-spc-flooring-from-china":
    "7 SPC Flooring Import Mistakes That Destroy Distributor Margins",
};

const MANUAL = [
  { slug: "spc-flooring-supplier-manufacturer-china", fileBase: "spc-supplier-manufacturer", exportName: "spcSupplierManufacturerPostEn", date: "2026-06-04", slot: "morning", hideTopHero: true },
  { slug: "choose-reliable-spc-flooring-supplier-china-2026", fileBase: "choose-reliable-supplier", exportName: "chooseReliableSupplierPostEn", date: "2026-05-22", slot: "morning" },
  { slug: "7-mistakes-importing-spc-flooring-from-china", fileBase: "seven-mistakes", exportName: "sevenMistakesPostEn", date: "2026-05-22", slot: "afternoon" },
];

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function blockToTs(block, indent = "    ") {
  if (block.type === "p") return `${indent}{ type: "p", text: "${escapeStr(block.text)}" },`;
  if (block.type === "h2") return `${indent}{ type: "h2", text: "${escapeStr(block.text)}" },`;
  if (block.type === "h3") return `${indent}{ type: "h3", text: "${escapeStr(block.text)}" },`;
  if (block.type === "ul") return `${indent}{ type: "ul", items: ${JSON.stringify(block.items)} },`;
  if (block.type === "img")
    return `${indent}imgBlock("${block.src}", "${escapeStr(block.alt)}"${block.caption ? `, "${escapeStr(block.caption)}"` : ""}),`;
  if (block.type === "rich-p") {
    const segs = block.segments
      .map((s) => (typeof s === "string" ? `"${escapeStr(s)}"` : `{ link: "${escapeStr(s.link)}", href: "${escapeStr(s.href)}" }`))
      .join(", ");
    return `${indent}{ type: "rich-p", segments: [${segs}] },`;
  }
  return "";
}

function buildFileContent(entry, meta, blocks, wordCount) {
  const blockLines = blocks.map((b) => blockToTs(b)).join("\n");
  const readMinutes = Math.max(11, Math.ceil(wordCount / 200));
  const hideLine = entry.hideTopHero ? "\n  hideTopHero: true," : "";
  const isGenerated = entry.outDir === GENERATED_DIR;
  return `import type { BlogPost } from "${isGenerated ? "../types" : "./types"}";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "${isGenerated ? "../b2b-blocks" : "./b2b-blocks"}";

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
    b2bCtaBlock("en", "${escapeStr(STANDARD_CTA)}"),
  ],
};
`;
}

function hadContainerErrors(text) {
  return /40hq can load|3,500 sqm|sqm per 40hq|this article is written/i.test(text);
}

function discoverArticles() {
  const entries = [];
  for (const f of readdirSync(GENERATED_DIR).filter((x) => x.endsWith(".en.ts"))) {
    const slug = f.replace(".en.ts", "");
    entries.push({
      slug,
      title: SHARP_TITLES[slug] ?? slug.replace(/-/g, " "),
      fileBase: slug,
      exportName: "post",
      outDir: GENERATED_DIR,
      date: "2026-06-05",
      slot: slug.includes("container") || slug.includes("loading") ? "evening" : "morning",
      phase: 1,
      productTag: "spc",
    });
  }
  for (const m of MANUAL) {
    entries.push({ ...m, title: SHARP_TITLES[m.slug], outDir: BLOG_DIR, phase: 1, productTag: "spc" });
  }
  return entries;
}

function regenerateRegistry() {
  const bases = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""))
    .sort();
  const imports = bases.map((base) => `import { post as ${base.replace(/[^a-z0-9]/gi, "_")}_en } from "./${base}.en";`).join("\n");
  const arr = bases.map((base) => `${base.replace(/[^a-z0-9]/gi, "_")}_en`).join(", ");
  writeFileSync(
    join(GENERATED_DIR, "registry.ts"),
    `/** AUTO-GENERATED — Eshsire Group V3 rebuild */\nimport type { BlogPost } from "../types";\n${imports}\n\nexport const generatedPostsEn: BlogPost[] = [${arr}];\nexport const generatedPostsZh: BlogPost[] = [];\nexport const generatedPostsEs: BlogPost[] = [];\n`,
    "utf8"
  );
}

function main() {
  const stats = { scanned: 0, rewritten: 0, containerErrorsFixed: 0, imagesReplaced: 0, details: [] };
  const articles = discoverArticles();
  stats.scanned = articles.length;

  for (const entry of articles) {
    const filePath = join(entry.outDir, `${entry.fileBase}.en.ts`);
    const beforeText = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
    const beforeImages = [...beforeText.matchAll(/imgBlock\("([^"]+)"/g)].map((m) => m[1]);
    const hadErrors = hadContainerErrors(beforeText);
    const oldTitle = beforeText.match(/title: "([^"]+)"/)?.[1] ?? entry.slug;

    const pk = resolvePrimaryKeyword({ title: entry.title, slug: entry.slug, productTag: entry.productTag });
    const meta = {
      slug: entry.slug,
      title: entry.title,
      metaTitle: (entry.title.length > 52 ? entry.title.slice(0, 49) + "..." : entry.title) + " | Eshsire Group",
      description: buildMetaDescription(entry.title, pk),
      primaryKeyword: pk,
      secondaryKeywords: secondaryKeywords(entry.productTag),
      productTag: entry.productTag,
      phase: entry.phase,
      slot: entry.slot,
    };

    const topicType = isLogisticsTopic({ title: entry.title, slug: entry.slug })
      ? "logistics"
      : isQualityTopic({ title: entry.title })
        ? "quality"
        : classifyTopic(entry.title);
    const images = imageSelector({ ...meta, slot: entry.slot, topicType }, "en");
    const { blocks, wordCount } = buildLongFormBlocks(meta, images);
    const fullMeta = { ...meta, heroImage: images.banner, ogImage: images.banner };

    writeFileSync(filePath, buildFileContent(entry, fullMeta, blocks, wordCount), "utf8");
    stats.rewritten++;
    if (hadErrors) stats.containerErrorsFixed++;

    const afterImages = [fullMeta.heroImage, ...blocks.filter((b) => b.type === "img").map((b) => b.src)];
    const imagesChanged = beforeImages.join("|") !== afterImages.slice(1).join("|") || beforeImages[0] !== afterImages[0];
    if (imagesChanged) stats.imagesReplaced++;

    stats.details.push({
      slug: entry.slug,
      oldTitle,
      primaryKeyword: pk,
      hook: pickHook(meta),
      newTitle: entry.title,
      containerFixed: hadErrors,
      imagesReplaced: imagesChanged,
      newImages: afterImages.map((u) => u.split("/").pop()),
      metaDescription: meta.description,
      cta: true,
      words: wordCount,
    });
  }

  for (const f of readdirSync(GENERATED_DIR)) {
    if (f.endsWith(".zh.ts") || f.endsWith(".es.ts")) unlinkSync(join(GENERATED_DIR, f));
  }
  regenerateRegistry();

  writeFileSync(
    REPORT_PATH,
    `# Blog V3 Rebuild\n\nRewritten: ${stats.rewritten}\nContainer fixes: ${stats.containerErrorsFixed}\nImages replaced: ${stats.imagesReplaced}\n\n${stats.details.map((d) => `- **${d.slug}**: ${d.newTitle}`).join("\n")}\n`,
    "utf8"
  );
  console.log(JSON.stringify(stats, null, 2));
}

main();
