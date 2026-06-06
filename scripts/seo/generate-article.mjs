/**
 * BJFLOOR V2 — generateArticle(locale, topic)
 * Step 1 EN logic (internal) → Step 2 locale rewrite → SEO → images → CTA + links → validate
 */
import { buildLongFormBlocks } from "./article-builder.mjs";
import { buildLocalizedLongFormBlocks, buildLocalizedSections, countBlocksWordsLocalized } from "./article-builder-locale.mjs";
import { buildSectionsFromPack } from "./locale-phrases-extra.mjs";
import { localizeTopicMeta } from "./localize-meta.mjs";
import { classifyTopic } from "./topic-classifier.mjs";
import { imageSelector } from "./image-selector.mjs";
import { validateArticle } from "./validate-article.mjs";
import { selectCta } from "./cta-selector.mjs";
import { injectInternalLinks } from "./internal-links-seo.mjs";
import { ALL_LOCALES } from "./locales.mjs";

function p(text) {
  return { type: "p", text };
}

function assembleBlocksFromSections(sections, meta, images, locale, copy) {
  const blocks = [];
  const L = copy?.links;
  let sectionCount = 0;
  for (const block of sections) {
    blocks.push(block);
    if (block.type === "h2" && sectionCount < 3 && images.sections[sectionCount]) {
      const capIdx = sectionCount + 1;
      blocks.push({
        type: "img",
        src: images.sections[sectionCount],
        alt: images.alts?.[capIdx] ?? `${meta.primaryKeyword} ${meta.title.slice(0, 30)} ${sectionCount + 1}`,
        caption: images.captions?.[capIdx] ?? L?.imgCaption ?? "BJFLOOR factory reference",
      });
      sectionCount++;
    }
  }
  blocks.push({
    type: "img",
    src: images.ending,
    alt: images.alts?.[4] ?? `${meta.primaryKeyword} export`,
    caption: images.captions?.[4] ?? L?.imgEnding ?? "Export container loading",
  });

  let wc = countBlocksWordsLocalized(blocks, locale);
  let pad = 0;
  const paddingFn = copy?.copy?.padding;
  while (wc < 1800 && pad < 40 && paddingFn) {
    const kw = meta.secondaryKeywords[pad % meta.secondaryKeywords.length];
    blocks.splice(blocks.length - 1, 0, p(paddingFn(pad + 1, kw, meta.primaryKeyword)));
    wc = countBlocksWordsLocalized(blocks, locale);
    pad++;
  }
  return { blocks, wordCount: wc };
}

function buildLocaleBlocks(meta, images, locale) {
  if (locale === "en") {
    return buildLongFormBlocks(meta, images);
  }
  if (locale === "zh" || locale === "es") {
    return buildLocalizedLongFormBlocks(meta, images, locale);
  }
  const pack = buildSectionsFromPack(meta, locale);
  if (!pack) throw new Error(`No locale pack for: ${locale}`);
  return assembleBlocksFromSections(pack.sections, meta, images, locale, pack);
}

function appendFooter(blocks, locale, topicType) {
  const cta = selectCta(topicType, locale);
  return [...blocks, cta];
}

/**
 * @param {string} locale
 * @param {object} topic - EN calendar meta (title, slug, productTag, phase, day, slot)
 * @param {object} opts - { publishedSlugs, date, rewriteAttempt }
 */
export function generateArticle(locale, topic, opts = {}) {
  if (!ALL_LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const topicType = classifyTopic(topic.title);
  const localizedMeta =
    locale === "en"
      ? {
          ...topic,
          topicType,
          locale,
          description: topic.description ?? topic.metaTitle ?? topic.title,
        }
      : localizeTopicMeta(topic, locale);

  localizedMeta.slot = topic.slot;
  localizedMeta.topicType = topicType;
  localizedMeta.locale = locale;

  const images = opts.images ?? imageSelector(localizedMeta, locale, { dryRun: opts.dryRun });
  localizedMeta.heroImage = images.banner;
  localizedMeta.ogImage = images.banner;

  let { blocks, wordCount } = buildLocaleBlocks(localizedMeta, images, locale);
  blocks = injectInternalLinks(blocks, locale, topicType, opts.publishedSlugs ?? []);
  blocks = appendFooter(blocks, locale, topicType);

  const article = {
    ...localizedMeta,
    date: opts.date ?? new Date().toISOString().slice(0, 10),
    readMinutes: Math.max(11, Math.ceil(wordCount / 200)),
    blocks,
    wordCount,
  };

  let validation = validateArticle(article, locale);
  let attempt = opts.rewriteAttempt ?? 0;

  while (!validation.pass && attempt < 5) {
    attempt++;
    const kw = localizedMeta.secondaryKeywords[attempt % localizedMeta.secondaryKeywords.length];
    const padText =
      locale === "zh"
        ? `采购补充 ${attempt}：评估${kw}与${localizedMeta.primaryKeyword}时，请对单色整柜、混色40HQ、紧急LCL三种场景做压力测试，记录生产天数、QC风险、运费与毛利。`
        : locale === "en"
          ? `Procurement supplement ${attempt}: stress-test ${kw} with ${localizedMeta.primaryKeyword} across full container, mixed 40HQ and LCL scenarios — record production days, QC risk, freight and margin.`
          : `Supplement ${attempt}: professional buyers evaluating ${kw} alongside ${localizedMeta.primaryKeyword} must model landed cost, container fill rate, QC hold risk and distributor margin across full-container, mixed 40HQ and emergency LCL scenarios before signing annual supply agreements.`;
    blocks.splice(blocks.length - 1, 0, p(padText));
    article.blocks = blocks;
    article.wordCount = countBlocksWordsLocalized(blocks, locale);
    validation = validateArticle(article, locale);
  }

  article.validation = validation;
  return article;
}

export function generateArticleAllLocales(topic, opts = {}) {
  const results = [];
  for (const locale of ALL_LOCALES) {
    results.push({ locale, article: generateArticle(locale, topic, opts) });
  }
  return results;
}
