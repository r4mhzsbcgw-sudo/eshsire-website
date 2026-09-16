import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Editorial formats may overlap: a sample guide also serves procurement.
// Coverage is evidence from the title/type, never a reason to relabel an article.
export const EDITORIAL_FORMATS = {
  "Product Introduction": /product-introduction|product overview|what is/i,
  "Product Spotlight": /product-spotlight|bamboo|fluted|oak-look|backing options/i,
  "Buyer / Procurement Guide": /buyer-guide|buyer|procurement|importer/i,
  "Product Comparison": /product-comparison|\bvs\b|compar/i,
  "Application Scenario": /application-scenario|hotel|office|retail|renovation/i,
  "Factory / Manufacturing": /factory-story|factory|production|manufactur/i,
  "Quality Control": /factory-qc|quality|inspection|test report|tolerance/i,
  "Company Capability": /company-capability|eshsire|supply chain/i,
  "OEM / Private Label": /\boem\b|private.label/i,
  "Distributor Cooperation": /distributor|dealer|reseller/i,
  "Sample / Catalog Support": /sample|catalog/i,
  "Packaging / Container Loading": /packaging-logistics|packing|carton|pallet|loading/i,
  "Installation": /installation|install|site requirements/i,
  "Accessories": /accessor|trim|corner|skirting|underlayment|keel/i,
  "Mixed Container Supply": /mixed.container|one.stop|combine.*order/i,
  "FAQ / Problem Solving": /decision-support|problem|mistake|complaint|questions/i,
  "Specification Explanation": /thickness|wear.layer|width|specification|specs|profile/i,
  "Market / Project Selection": /market|project|selection|for (hotels|offices|apartments)/i,
};

export function editorialCoverage(entries) {
  return Object.fromEntries(["flooring", "wall-panel"].map((track) => [track,
    Object.fromEntries(Object.entries(EDITORIAL_FORMATS).map(([label, pattern]) => [label,
      entries.filter((entry) => entry.publishSlot === track
        && pattern.test(`${entry.title} ${entry.contentType}`)).length,
    ])),
  ]));
}

export function publishingInventory(entries, today) {
  const eligible = entries.filter((entry) => entry.locale === "en"
    && entry.status === "scheduled" && entry.approvedForPublish === true
    && entry.isPlaceholder === false && typeof entry.body === "string"
    && entry.body.replace(/\s+/g, " ").trim().length >= 1000
    && /^\d{4}-\d{2}-\d{2}$/.test(entry.publishDate) && entry.publishDate > today
    && entry.publishGroupDate === entry.publishDate
    && ["flooring", "wall-panel"].includes(entry.publishSlot));
  const groups = new Map();
  const slugs = new Set();
  const duplicateSlugs = new Set();
  for (const entry of eligible) {
    if (slugs.has(entry.slug)) duplicateSlugs.add(entry.slug);
    slugs.add(entry.slug);
    groups.set(entry.publishDate, [...(groups.get(entry.publishDate) || []), entry]);
  }
  const completeDates = [...groups].filter(([, pair]) => pair.length === 2
    && pair.filter((p) => p.publishSlot === "flooring").length === 1
    && pair.filter((p) => p.publishSlot === "wall-panel").length === 1
    && pair.every((p) => !duplicateSlugs.has(p.slug))).map(([date]) => date).sort();
  const complete = new Set(completeDates);
  let remainingDays = 0;
  const cursor = new Date(`${today}T00:00:00Z`);
  cursor.setUTCDate(cursor.getUTCDate() + 1);
  while (complete.has(cursor.toISOString().slice(0, 10))) {
    remainingDays++;
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return {
    today, approvedScheduledFuturePosts: eligible.length,
    completeFutureDays: completeDates.length, remainingDays,
    nextMissingPairDate: cursor.toISOString().slice(0, 10),
    lastCompleteDate: completeDates.at(-1) || null,
    duplicateSlugs: [...duplicateSlugs],
    level: remainingDays <= 14 ? "CRITICAL" : remainingDays <= 30 ? "WARNING" : "NORMAL",
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const entries = JSON.parse(readFileSync(resolve("content/blog/blogQueue.en.json"), "utf8")).entries;
  const today = new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);
  const inventory = publishingInventory(entries, today);
  console.log("BLOG CONTENT INVENTORY", JSON.stringify(inventory));
  console.log("FUTURE EDITORIAL COVERAGE", JSON.stringify(editorialCoverage(entries.filter((entry) =>
    entry.publishDate > today && entry.status === "scheduled" && entry.approvedForPublish === true))));
  if (inventory.level !== "NORMAL") {
    const threshold = inventory.level === "CRITICAL" ? 14 : 30;
    console.warn(`CONTENT INVENTORY ${inventory.level}\nLess than ${threshold} publishing days remaining.`);
    console.warn(`Remaining complete publishing days: ${inventory.remainingDays}. Prepare the next reviewed content pack before ${inventory.nextMissingPairDate}.`);
  }
}
