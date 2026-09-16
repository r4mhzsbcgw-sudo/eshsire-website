import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const queuePath = path.resolve("content/blog/blogQueue.en.json");
const cutoff = "2026-09-14";
const start = new Date("2026-09-15T00:00:00Z");
const data = JSON.parse(fs.readFileSync(queuePath, "utf8"));

function isWallPanel(entry) {
  return /wall|panel|ceiling|accessor|wpc|uv marble/i.test(
    [entry.title, entry.targetKeyword, entry.category, ...(entry.tags ?? []), ...(entry.relatedProducts ?? [])].join(" "),
  );
}

function dateAt(offset) {
  const date = new Date(start);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

const published = data.entries.filter((entry) => entry.publishDate <= cutoff);
const future = data.entries.filter((entry) => entry.publishDate > cutoff);
const flooring = future.filter((entry) => !isWallPanel(entry));
const wallPanels = future.filter(isWallPanel);
const pairedDays = Math.min(flooring.length, wallPanels.length);

const scheduled = [];
for (let index = 0; index < pairedDays; index += 1) {
  const publishGroupDate = dateAt(index);
  scheduled.push(
    { ...flooring[index], publishDate: publishGroupDate, publishGroupDate, publishSlot: "flooring" },
    { ...wallPanels[index], publishDate: publishGroupDate, publishGroupDate, publishSlot: "wall-panel" },
  );
}
for (let index = pairedDays; index < wallPanels.length; index += 1) {
  const publishGroupDate = dateAt(index);
  scheduled.push({ ...wallPanels[index], publishDate: publishGroupDate, publishGroupDate, publishSlot: "wall-panel" });
}

// Existing future bodies fail the V2 content gate (900 words and a table).
// Keep them inaccessible until Jason supplies rewritten copy and approves it.
for (const entry of scheduled) {
  entry.status = "draft";
  entry.approvedForPublish = false;
}

data.queueStrategy = {
  version: "dual-track-v2",
  timezone: "Asia/Shanghai",
  cutoverDate: "2026-09-15",
  slots: ["flooring", "wall-panel"],
  note: "Future entries remain draft until rewritten copy passes the content-quality gate and is approved.",
};
data.entries = [...published, ...scheduled].sort(
  (a, b) => a.publishDate.localeCompare(b.publishDate) || (a.publishSlot ?? "").localeCompare(b.publishSlot ?? ""),
);
const baselineText = execFileSync("git", ["show", "origin/main:content/blog/blogQueue.en.json"], { encoding: "utf8" });
const baselineData = JSON.parse(baselineText);
const firstFutureSlug = baselineData.entries.find((entry) => entry.publishDate > cutoff).slug;
const slugPosition = baselineText.indexOf(`"slug": "${firstFutureSlug}"`);
const firstFutureStart = baselineText.lastIndexOf("\n  {", slugPosition) >= 0
  ? baselineText.lastIndexOf("\n  {", slugPosition) + 1
  : baselineText.lastIndexOf("\n{", slugPosition) + 1;
const publishedPrefix = baselineText.slice(0, firstFutureStart);
const futureText = scheduled.map((entry) => JSON.stringify(entry, null, 2)).join(",\n");
const strategyText = JSON.stringify(data.queueStrategy, null, 2).split("\n").map((line, index) => index ? `  ${line}` : line).join("\n");
const serialized = `${publishedPrefix}${futureText}\n  ],\n  "queueStrategy": ${strategyText}\n}`;
fs.writeFileSync(queuePath, serialized + "\n");
console.log(JSON.stringify({ published: published.length, future: scheduled.length, flooring: flooring.length, wallPanels: wallPanels.length, pairedDays }, null, 2));
