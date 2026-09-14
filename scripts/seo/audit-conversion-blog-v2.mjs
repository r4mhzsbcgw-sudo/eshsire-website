import { execFileSync } from "node:child_process";
import fs from "node:fs";

const current = JSON.parse(fs.readFileSync("content/blog/blogQueue.en.json", "utf8"));
const baseline = JSON.parse(execFileSync("git", ["show", "origin/main:content/blog/blogQueue.en.json"], { encoding: "utf8" }));
const cutoff = "2026-09-14";
const entries = current.entries;
const future = entries.filter((entry) => entry.publishDate > cutoff);
const published = entries.filter((entry) => entry.publishDate <= cutoff);
const baselineBySlug = new Map(baseline.entries.map((entry) => [entry.slug, entry]));
const publishedChanged = published.filter((entry) => {
  const old = baselineBySlug.get(entry.slug);
  return !old || old.slug !== entry.slug || old.publishDate !== entry.publishDate || old.body !== entry.body;
});

const dates = new Map();
for (const entry of future) {
  const group = dates.get(entry.publishGroupDate) ?? [];
  group.push(entry.publishSlot);
  dates.set(entry.publishGroupDate, group);
}

const rewrite = future.filter((entry) => {
  const words = entry.body.trim().split(/\s+/).length;
  const tables = (entry.body.match(/^\|.+\|$/gm) ?? []).length;
  return words < 900 || words > 1400 || tables < 2 || entry.internalLinks.length < 3 || !entry.cta;
});

const imageSources = fs.readFileSync("src/content/blog/image-plan.ts", "utf8").match(/src: "([^"]+)"/g) ?? [];
const imagePaths = [...new Set(imageSources.map((line) => line.match(/"([^"]+)"/)[1]))];
const missingImages = imagePaths.filter((source) => !fs.existsSync(`public${source}`));
const externalImages = imagePaths.filter((source) => /^https?:/i.test(source));

const result = {
  cutoff,
  total: entries.length,
  published: published.length,
  future: future.length,
  flooringTrack: future.filter((entry) => entry.publishSlot === "flooring").length,
  wallPanelTrack: future.filter((entry) => entry.publishSlot === "wall-panel").length,
  pairedDates: [...dates].filter(([, slots]) => slots.includes("flooring") && slots.includes("wall-panel")).length,
  incompleteDates: [...dates].filter(([, slots]) => !(slots.includes("flooring") && slots.includes("wall-panel"))).length,
  futureApproved: future.filter((entry) => entry.approvedForPublish).length,
  futureDraft: future.filter((entry) => entry.status === "draft").length,
  rewriteCount: rewrite.length,
  publishedChanged: publishedChanged.length,
  imagePaths: imagePaths.length,
  missingImages,
  externalImages,
  unsplashPexels: imagePaths.filter((source) => /unsplash|pexels/i.test(source)),
  schedule: future.map((entry) => ({ dayNumber: entry.dayNumber, date: entry.publishDate, slot: entry.publishSlot, slug: entry.slug })),
  rewrite: rewrite.map((entry) => ({ dayNumber: entry.dayNumber, slug: entry.slug, words: entry.body.trim().split(/\s+/).length })),
};
console.log(JSON.stringify(result, null, 2));
