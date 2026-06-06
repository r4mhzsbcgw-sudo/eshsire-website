#!/usr/bin/env node
/**
 * Backfill 16-locale files for existing generated EN articles (reuse EN images).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { generateArticle } from "./generate-article.mjs";
import { ALL_LOCALES } from "./locales.mjs";

const GENERATED_DIR = join(process.cwd(), "src/content/blog/generated");
const REGISTRY_PATH = join(GENERATED_DIR, "registry.ts");

const PHASE_BY_SLUG = {
  "spc-flooring-supply-hotel-project-africa": 3,
};

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
  const ctaLine = cta ? blockToTs(cta) : `    b2bCtaBlock("${locale}"),`;

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

function parseEnMeta(filePath) {
  const text = readFileSync(filePath, "utf8");
  const slug = text.match(/slug:\s*"([^"]+)"/)?.[1];
  const title = text.match(/title:\s*"([^"]+)"/)?.[1];
  const slot = text.match(/slot:\s*"([^"]+)"/)?.[1];
  const date = text.match(/date:\s*"([^"]+)"/)?.[1];
  const description = text.match(/description:\s*"([^"]+)"/)?.[1];
  const hero = text.match(/heroImage:\s*"([^"]+)"/)?.[1];
  const imgs = [...text.matchAll(/imgBlock\("([^"]+)"/g)].map((m) => m[1]);
  if (!slug || !title || !hero || imgs.length < 4) {
    throw new Error(`Cannot parse ${filePath}`);
  }
  return {
    slug,
    title,
    slot,
    date,
    description,
    productTag: "spc",
    phase: PHASE_BY_SLUG[slug] ?? 1,
    day: 0,
    readMinutes: 11,
    images: { banner: hero, sections: imgs.slice(0, 3), ending: imgs[imgs.length - 1] },
  };
}

function getPublishedSlugs() {
  return readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""));
}

function regenerateRegistry() {
  const enBases = readdirSync(GENERATED_DIR)
    .filter((f) => f.endsWith(".en.ts"))
    .map((f) => f.replace(".en.ts", ""))
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
  lines.push("export const generatedPostsEn = generatedPostsByLocale.en;");
  lines.push("export const generatedPostsZh = generatedPostsByLocale.zh ?? [];");
  lines.push("export const generatedPostsEs = generatedPostsByLocale.es ?? [];", "");

  writeFileSync(REGISTRY_PATH, lines.join("\n"), "utf8");
}

const force = process.argv.includes("--force");

function main() {
  const enFiles = readdirSync(GENERATED_DIR).filter((f) => f.endsWith(".en.ts"));
  const publishedSlugs = getPublishedSlugs();
  let created = 0;
  let failed = 0;

  for (const file of enFiles) {
    const path = join(GENERATED_DIR, file);
    const { images, ...topic } = parseEnMeta(path);

    for (const locale of ALL_LOCALES) {
      if (locale === "en") continue;
      const out = join(GENERATED_DIR, `${topic.slug}.${locale}.ts`);
      if (existsSync(out) && !force) {
        console.log(`Skip ${topic.slug}.${locale}`);
        continue;
      }
      if (existsSync(out) && force) unlinkSync(out);

      const article = generateArticle(locale, topic, {
        publishedSlugs,
        date: topic.date,
        images,
      });

      if (!article.validation.pass) {
        console.warn(`⚠ ${topic.slug} [${locale}]:`, article.validation.errors);
        failed++;
      }

      writeFileSync(out, buildArticleFile(article, topic.slot, locale), "utf8");
      created++;
      console.log(`✓ ${topic.slug} [${locale}] ~${article.wordCount} words`);
    }
  }

  regenerateRegistry();
  console.log(`Backfill done: ${created} files, ${failed} validation warnings`);
}

main();
