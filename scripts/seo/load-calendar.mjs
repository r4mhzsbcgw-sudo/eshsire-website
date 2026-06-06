/**
 * Load BJFLOOR 90-day calendar → generator-ready entries.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const CAL_PATH = join(process.cwd(), "content/bjfloor-90-day-calendar.json");

export function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function primaryKeyword(productTag, title) {
  if (productTag === "vinyl") {
    return title.toLowerCase().includes("lvt") ? "LVT flooring supplier" : "vinyl flooring wholesale";
  }
  if (productTag === "wall") return "wall panel supplier china";
  if (title.toLowerCase().includes("container")) return "container flooring price";
  if (title.toLowerCase().includes("factory")) return "spc flooring factory";
  return "spc flooring supplier china";
}

function secondaryKeywords(productTag) {
  if (productTag === "vinyl") {
    return [
      "vinyl flooring wholesale",
      "flooring manufacturer china",
      "wholesale flooring price",
      "bulk flooring order",
    ];
  }
  if (productTag === "wall") {
    return [
      "interior wall panel factory",
      "building materials supplier china",
      "wholesale wall panel supplier",
    ];
  }
  return [
    "spc flooring manufacturer china",
    "wholesale flooring supplier china",
    "bulk spc flooring order",
    "flooring for contractor supply",
    "spc flooring price per sqm",
  ];
}

function buildDescription(title, pk) {
  return `${title}. B2B guide for flooring distributors and importers: ${pk}, factory direct pricing, container efficiency and supply chain control from China manufacturers.`;
}

function buildMetaTitle(title, pk) {
  const short = title.length > 52 ? `${title.slice(0, 49)}…` : title;
  return `${short} | ${pk} | BJFLOOR`;
}

export function slotEntry(dayData, slot) {
  const entry = dayData[slot];
  const title = entry.title;
  const slug = titleToSlug(title);
  const pk = primaryKeyword(entry.productTag, title);
  return {
    slug,
    title,
    metaTitle: buildMetaTitle(title, pk),
    description: buildDescription(title, pk),
    primaryKeyword: pk,
    secondaryKeywords: secondaryKeywords(entry.productTag),
    productTag: entry.productTag,
    phase: dayData.phase,
    day: dayData.day,
    readMinutes: 11,
  };
}

export function loadCalendar() {
  const raw = JSON.parse(readFileSync(CAL_PATH, "utf8"));
  return raw.days.map((day) => ({
    day: day.day,
    phase: day.phase,
    morning: slotEntry(day, "morning"),
    afternoon: slotEntry(day, "afternoon"),
    evening: slotEntry(day, "evening"),
  }));
}

export function getCalendarStartDate() {
  return JSON.parse(readFileSync(CAL_PATH, "utf8")).startDate;
}

export function getDayIndexFromDate(date = new Date()) {
  const start = new Date(`${getCalendarStartDate()}T00:00:00+08:00`);
  const diff = Math.floor((date - start) / 86400000);
  return diff;
}

/** Legacy export for content-calendar.mjs */
export const contentCalendar = loadCalendar();

export { primaryKeyword, secondaryKeywords, buildDescription, buildMetaTitle };
