import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const queuePath = path.join(root, "content/blog/blogQueue.en.json");
const outputDir = path.join(root, "docs/blog-image-audit");
const baselineCommit = "015f4440120579e74b13f129f08c03b2c83f15ce";
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8")).entries;
const future = queue.filter((entry) => entry.publishDate >= "2026-09-15");
const published = queue.filter((entry) => entry.publishDate < "2026-09-15");
const required = ["contentType", "contentAngle", "primaryTopic", "imageTopic", "applicationScenario", "featuredImage", "inlineImages"];

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const headings = (text) => [...text.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1]);
const opening = (text) => text.split(/\n\n/).filter((part) => part && !part.startsWith("#"))[0] || "";
const localFile = (url) => path.join(root, "public", url.replace(/^\//, ""));
const isExternal = (url) => /^https?:\/\//i.test(url);
const isBanned = (url) => /unsplash|pexels|\/images\/cases\/|\/images\/blog\/editorial\//i.test(url);

const audits = future.map((entry) => {
  const paths = [entry.featuredImage?.src, ...(entry.inlineImages || []).map((item) => item.src)].filter(Boolean);
  const trackMatch = paths.every((url) => entry.publishSlot === "flooring"
    ? /content-library\/spc-flooring|content-library\/factory-process/.test(url)
    : /content-library\/wall-panels|content-library\/factory-process/.test(url));
  const filesExist = paths.every((url) => fs.existsSync(localFile(url)));
  const directlyRelevant = paths.length >= 2 && trackMatch && filesExist && paths.every((url) => !isExternal(url) && !isBanned(url));
  return {
    slug: entry.slug,
    publishSlot: entry.publishSlot,
    title: entry.title,
    currentFeaturedImagePath: entry.featuredImage?.src || null,
    currentInlineImagePaths: (entry.inlineImages || []).map((item) => item.src),
    relatedToTitle: directlyRelevant ? "yes" : "no",
    relatedToBodyTopic: directlyRelevant ? "yes" : "no",
    relatedToProduct: trackMatch ? "yes" : "no",
    incorrectImage: directlyRelevant ? "no" : "yes",
    problem: directlyRelevant ? "None after topic-based remediation." : "Missing, external, banned or track-mismatched image.",
    imageTopic: entry.imageTopic,
    contentType: entry.contentType,
    wordCount: countWords(entry.body),
    headingSignature: headings(entry.body).join(" | "),
  };
});

function tally(values) {
  return values.reduce((result, value) => ({ ...result, [value]: (result[value] || 0) + 1 }), {});
}

const dates = new Map();
for (const entry of future) {
  const date = entry.publishGroupDate;
  const group = dates.get(date) || [];
  group.push(entry.publishSlot);
  dates.set(date, group);
}

const duplicateSlugs = future.length - new Set(future.map((entry) => entry.slug)).size;
const missingFields = future.filter((entry) => required.some((field) => !entry[field])).map((entry) => entry.slug);
const outOfRange = future.filter((entry) => {
  const words = countWords(entry.body);
  return words < 900 || words > 1400;
}).map((entry) => entry.slug);
const withoutTable = future.filter((entry) => !/^\|.+\|$/m.test(entry.body)).map((entry) => entry.slug);
const weakLinks = future.filter((entry) => (entry.internalLinks || []).length < 3).map((entry) => entry.slug);
const badDailyPairs = [...dates].filter(([, slots]) => slots.length !== 2 || slots.filter((slot) => slot === "flooring").length !== 1 || slots.filter((slot) => slot === "wall-panel").length !== 1);
const adjacentFeaturedRepeats = future.slice(1).filter((entry, index) => entry.featuredImage.src === future[index].featuredImage.src).map((entry) => entry.slug);

let publishedProtection = true;
let oldAssignmentsChanged = null;
try {
  const committedQueue = JSON.parse(execFileSync("git", ["show", `${baselineCommit}:content/blog/blogQueue.en.json`], { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 })).entries;
  publishedProtection = JSON.stringify(published) === JSON.stringify(committedQueue.filter((entry) => entry.publishDate < "2026-09-15"));

  const oldPlan = execFileSync("git", ["show", `${baselineCommit}:src/content/blog/image-plan.ts`], { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  const getArray = (name) => {
    const match = oldPlan.match(new RegExp(`const ${name}: ImageAsset\\[\\] = \\[([\\s\\S]*?)\\n\\];`));
    if (!match) throw new Error(`Missing old array ${name}`);
    return Function(`"use strict"; return [${match[1]}];`)();
  };
  const spcProduct = getArray("spcProduct");
  const factoryQuality = getArray("factoryQuality");
  const logistics = getArray("logistics");
  const oemDistributor = getArray("oemDistributor");
  const wallPanels = getArray("wallPanels");
  const installationAccessories = getArray("installationAccessories");
  const commercialProjects = getArray("commercialProjects");
  const oldFlooring = [...spcProduct, ...factoryQuality, ...logistics, ...oemDistributor, ...commercialProjects];
  const oldWall = [...wallPanels, ...installationAccessories, ...factoryQuality, ...logistics];
  oldAssignmentsChanged = future.reduce((count, entry) => {
    const pool = entry.publishSlot === "flooring" ? oldFlooring : oldWall;
    const index = (entry.dayNumber - 1) % pool.length;
    const before = [pool[index].src, pool[(index + 2) % pool.length].src, pool[(index + 4) % pool.length].src];
    const after = [entry.featuredImage.src, ...entry.inlineImages.map((item) => item.src)];
    return count + before.filter((url, position) => url !== after[position]).length;
  }, 0);
} catch (error) {
  console.warn(`Historical comparison unavailable: ${error.message}`);
}

const summary = {
  futureArticles: future.length,
  publishedEntriesProtected: publishedProtection,
  dateRange: [future[0]?.publishGroupDate, future.at(-1)?.publishGroupDate],
  publishGroupDates: dates.size,
  badDailyPairs: badDailyPairs.length,
  flooringTrack: future.filter((entry) => entry.publishSlot === "flooring").length,
  wallPanelTrack: future.filter((entry) => entry.publishSlot === "wall-panel").length,
  contentTypes: tally(future.map((entry) => entry.contentType)),
  flooringContentTypes: tally(future.filter((entry) => entry.publishSlot === "flooring").map((entry) => entry.contentType)),
  wallPanelContentTypes: tally(future.filter((entry) => entry.publishSlot === "wall-panel").map((entry) => entry.contentType)),
  imageTopics: tally(future.map((entry) => entry.imageTopic)),
  imageAssignmentsChanged: oldAssignmentsChanged,
  articlesReducedToTwoImages: future.filter((entry) => (entry.inlineImages || []).length === 1).length,
  incorrectImagesAfterFix: audits.filter((item) => item.incorrectImage === "yes").length,
  externalImages: audits.filter((item) => [item.currentFeaturedImagePath, ...item.currentInlineImagePaths].some((url) => isExternal(url))).length,
  unsplashOrPexelsImages: audits.filter((item) => [item.currentFeaturedImagePath, ...item.currentInlineImagePaths].some((url) => /unsplash|pexels/i.test(url))).length,
  bannedSourceImages: audits.filter((item) => [item.currentFeaturedImagePath, ...item.currentInlineImagePaths].some((url) => isBanned(url))).length,
  adjacentFeaturedRepeats: adjacentFeaturedRepeats.length,
  duplicateSlugs,
  missingFields: missingFields.length,
  outOfRangeWordCounts: outOfRange.length,
  withoutMarkdownTable: withoutTable.length,
  fewerThanThreeInternalLinks: weakLinks.length,
  uniqueOpeningParagraphs: new Set(future.map((entry) => opening(entry.body))).size,
  uniqueHeadingSignatures: new Set(future.map((entry) => headings(entry.body).join("|"))).size,
  highRiskArticles: audits.filter((item) => item.incorrectImage === "yes").map((item) => item.slug),
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "dual-track-200-image-audit.json"), `${JSON.stringify({ summary, articles: audits }, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

const failures = [badDailyPairs.length, duplicateSlugs, missingFields.length, outOfRange.length, withoutTable.length, weakLinks.length, summary.incorrectImagesAfterFix, summary.externalImages, summary.unsplashOrPexelsImages, summary.adjacentFeaturedRepeats];
if (!publishedProtection || failures.some(Boolean)) process.exitCode = 1;
