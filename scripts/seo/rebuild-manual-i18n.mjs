#!/usr/bin/env node
/**
 * Rebuild zh/es versions of the 3 manual blog posts to Eshsire Group standards.
 * Reuses images from EN posts (no image-library reset).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { buildLocalizedLongFormBlocks } from "./article-builder-locale.mjs";
import { MANUAL_I18N_META } from "./manual-i18n-meta.mjs";

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, "src/content/blog");

const MANUAL = [
  {
    slug: "spc-flooring-supplier-manufacturer-china",
    fileBase: "spc-supplier-manufacturer",
    exportZh: "spcSupplierManufacturerPostZh",
    exportEs: "spcSupplierManufacturerPostEs",
    slot: "morning",
    phase: 1,
    productTag: "spc",
    date: "2026-06-04",
    hideTopHero: true,
  },
  {
    slug: "choose-reliable-spc-flooring-supplier-china-2026",
    fileBase: "choose-reliable-supplier",
    exportZh: "chooseReliableSupplierPostZh",
    exportEs: "chooseReliableSupplierPostEs",
    slot: "morning",
    phase: 1,
    productTag: "spc",
    date: "2026-05-22",
  },
  {
    slug: "7-mistakes-importing-spc-flooring-from-china",
    fileBase: "seven-mistakes",
    exportZh: "sevenMistakesPostZh",
    exportEs: "sevenMistakesPostEs",
    slot: "afternoon",
    phase: 1,
    productTag: "spc",
    date: "2026-05-22",
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

function extractImagesFromEn(path) {
  const text = readFileSync(path, "utf8");
  const hero = text.match(/heroImage:\s*"([^"]+)"/)?.[1];
  const imgs = [...text.matchAll(/imgBlock\("([^"]+)"/g)].map((m) => m[1]);
  if (!hero || imgs.length < 4) {
    throw new Error(`Cannot extract images from ${path}`);
  }
  return {
    banner: hero,
    sections: imgs.slice(0, 3),
    ending: imgs[imgs.length - 1],
  };
}

function buildFileContent(entry, locale, exportName, meta, blocks, wordCount) {
  const blockLines = blocks.map((b) => blockToTs(b)).join("\n");
  const readMinutes = Math.max(11, Math.ceil(wordCount / 200));
  const hideLine = entry.hideTopHero ? "\n  hideTopHero: true," : "";

  return `import type { BlogPost } from "./types";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "./b2b-blocks";

export const ${exportName}: BlogPost = {
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
    internalLinksBlock("${locale}"),
    b2bCtaBlock("${locale}"),
  ],
};
`;
}

function main() {
  const stats = { rewritten: 0, locales: [] };

  for (const entry of MANUAL) {
    const enPath = join(BLOG_DIR, `${entry.fileBase}.en.ts`);
    if (!existsSync(enPath)) {
      console.error(`Missing EN file: ${enPath}`);
      continue;
    }

    const images = extractImagesFromEn(enPath);
    const i18nMeta = MANUAL_I18N_META[entry.slug];
    if (!i18nMeta) {
      console.error(`Missing i18n meta for ${entry.slug}`);
      continue;
    }

    for (const locale of ["zh", "es"]) {
      const loc = i18nMeta[locale];
      const meta = {
        slug: entry.slug,
        title: loc.title,
        metaTitle: loc.metaTitle,
        description: loc.description,
        primaryKeyword: loc.primaryKeyword,
        secondaryKeywords: loc.secondaryKeywords,
        productTag: entry.productTag,
        phase: entry.phase,
        heroImage: images.banner,
        ogImage: images.banner,
      };

      const { blocks, wordCount } = buildLocalizedLongFormBlocks(meta, images, locale);
      const exportName = locale === "zh" ? entry.exportZh : entry.exportEs;
      const outPath = join(BLOG_DIR, `${entry.fileBase}.${locale}.ts`);

      writeFileSync(
        outPath,
        buildFileContent(entry, locale, exportName, meta, blocks, wordCount),
        "utf8"
      );

      stats.rewritten++;
      stats.locales.push({ slug: entry.slug, locale, words: wordCount, file: outPath });
      console.log(`鉁?${entry.slug} [${locale}] ~${wordCount} words`);
    }
  }

  console.log(JSON.stringify(stats, null, 2));
}

main();
