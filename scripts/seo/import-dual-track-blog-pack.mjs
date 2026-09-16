import fs from "node:fs";

const packPath = "content/blog/eshsire_100_day_dual_track_200_posts.en.json";
const queuePath = "content/blog/blogQueue.en.json";
const cutoff = "2026-09-14";
const expectedStart = "2026-09-15";
const expectedEnd = "2026-12-23";

const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
const queueRaw = fs.readFileSync(queuePath, "utf8");
const queue = JSON.parse(queueRaw);
const articles = pack.articles;
const existingBySlug = new Map(queue.entries.map((entry) => [entry.slug, entry]));
const protectedEntries = queue.entries.filter((entry) => entry.publishDate <= cutoff);

function wordCount(body) {
  return body.trim().match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
}

function hasMarkdownTable(body) {
  const lines = body.split(/\r?\n/).map((line) => line.trim());
  return lines.some((line, index) =>
    /^\|.*\|$/.test(line) && /^\|(?:\s*:?-{3,}:?\s*\|)+$/.test(lines[index + 1] ?? "")
  );
}

function tagsFor(article, existing) {
  if (Array.isArray(article.tags) && article.tags.length) return article.tags;
  if (Array.isArray(existing?.tags) && existing.tags.length) return existing.tags;
  return [
    article.category,
    article.publishSlot === "flooring" ? "SPC Flooring" : "Wall Panels",
    "B2B Sourcing",
    "China Manufacturer",
  ].filter((tag, index, all) => tag && all.indexOf(tag) === index);
}

function validateSource() {
  const errors = [];
  if (!Array.isArray(articles) || articles.length !== 200) errors.push(`Expected 200 articles, found ${articles?.length ?? 0}`);

  const slugs = new Set();
  const groups = new Map();
  for (const article of articles ?? []) {
    const count = wordCount(article.body ?? "");
    if (!article.slug || slugs.has(article.slug)) errors.push(`Duplicate or missing slug: ${article.slug ?? "(missing)"}`);
    slugs.add(article.slug);
    if (article.publishDate < expectedStart || article.publishDate > expectedEnd) errors.push(`${article.slug}: date outside required range`);
    if (article.publishDate !== article.publishGroupDate) errors.push(`${article.slug}: publishDate/group mismatch`);
    if (!['flooring', 'wall-panel'].includes(article.publishSlot)) errors.push(`${article.slug}: invalid publishSlot`);
    if (count < 900 || count > 1400) errors.push(`${article.slug}: ${count} words`);
    if (!hasMarkdownTable(article.body ?? "")) errors.push(`${article.slug}: missing Markdown table`);
    if (!Array.isArray(article.internalLinks) || article.internalLinks.length < 3) errors.push(`${article.slug}: fewer than 3 internal links`);
    if (/https?:\/\//i.test(JSON.stringify([article.featuredImage, article.inlineImages]))) errors.push(`${article.slug}: external image URL`);
    if (!article.title || !article.metaTitle || !article.metaDescription || !article.targetKeyword || !article.excerpt || !article.category || !Array.isArray(article.faq) || !article.cta) errors.push(`${article.slug}: missing required content metadata`);
    const existing = existingBySlug.get(article.slug);
    if (existing && existing.publishDate <= cutoff) errors.push(`${article.slug}: collides with protected published article`);
    const slots = groups.get(article.publishGroupDate) ?? [];
    slots.push(article.publishSlot);
    groups.set(article.publishGroupDate, slots);
  }
  if (groups.size !== 100) errors.push(`Expected 100 publish groups, found ${groups.size}`);
  for (const [date, slots] of groups) {
    if (slots.length !== 2 || slots.filter((slot) => slot === "flooring").length !== 1 || slots.filter((slot) => slot === "wall-panel").length !== 1) {
      errors.push(`${date}: expected exactly one flooring and one wall-panel article`);
    }
  }
  return errors;
}

const errors = validateSource();
if (errors.length) {
  console.error(JSON.stringify({ imported: false, errors }, null, 2));
  process.exit(1);
}

const normalized = articles.map((article) => {
  const existing = existingBySlug.get(article.slug);
  const entry = {
    dayNumber: article.dayNumber,
    locale: "en",
    title: article.title,
    slug: article.slug,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    targetKeyword: article.targetKeyword,
    secondaryKeywords: article.secondaryKeywords,
    publishDate: article.publishDate,
    status: "scheduled",
    approvedForPublish: true,
    isPlaceholder: false,
    excerpt: article.excerpt,
    category: article.category,
    tags: tagsFor(article, existing),
    relatedProducts: article.relatedProducts,
    internalLinks: article.internalLinks,
    body: article.body,
    faq: article.faq,
    cta: article.cta,
    publishGroupDate: article.publishGroupDate,
    publishSlot: article.publishSlot,
  };
  if (article.featuredImage?.src) entry.featuredImage = article.featuredImage;
  if (Array.isArray(article.inlineImages) && article.inlineImages.length) entry.inlineImages = article.inlineImages;
  return entry;
});

const firstFutureSlug = queue.entries.find((entry) => entry.publishDate > cutoff)?.slug;
const slugPosition = queueRaw.indexOf(`"slug": "${firstFutureSlug}"`);
const eol = queueRaw.includes("\r\n") ? "\r\n" : "\n";
const firstFutureStart = queueRaw.lastIndexOf(`${eol}{`, slugPosition) + eol.length;
const entriesEnd = queueRaw.indexOf(`${eol}  ],${eol}  \"queueStrategy\"`, slugPosition);
if (firstFutureStart < 0 || entriesEnd < 0) throw new Error("Could not locate the future queue segment");
const serialized = normalized
  .map((entry) => JSON.stringify(entry, null, 2).replaceAll("\n", eol))
  .join(`,${eol}`);
const resultRaw = `${queueRaw.slice(0, firstFutureStart)}${serialized}${queueRaw.slice(entriesEnd)}`
  .replace(
    "Future entries remain draft until rewritten copy passes the content-quality gate and is approved.",
    "Approved dual-track articles publish only after their Beijing publish date during a scheduled rebuild."
  );
fs.writeFileSync(queuePath, resultRaw);
const result = JSON.parse(resultRaw);

console.log(JSON.stringify({
  imported: true,
  protected: protectedEntries.length,
  totalQueueEntries: result.entries.length,
  importedArticles: normalized.length,
  rewritten: normalized.filter((entry) => existingBySlug.has(entry.slug)).length,
  added: normalized.filter((entry) => !existingBySlug.has(entry.slug)).length,
  normalizedTags: normalized.filter((entry) => !(articles.find((article) => article.slug === entry.slug)?.tags?.length)).length,
}, null, 2));
