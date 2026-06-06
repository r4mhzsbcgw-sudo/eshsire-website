/**
 * V2 daily-report.md generator
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const REPORT_PATH = join(process.cwd(), "daily-report.md");

/**
 * @param {object} stats
 */
export function writeDailyReport(stats) {
  const {
    date = new Date().toISOString().slice(0, 10),
    articlesPublished = 0,
    localeDistribution = {},
    keywordCoverage = [],
    imagesUsed = 0,
    internalLinksTotal = 0,
    ctaTypes = {},
    validationFailures = [],
    slugs = [],
  } = stats;

  const localeRows = Object.entries(localeDistribution)
    .map(([loc, n]) => `| ${loc} | ${n} |`)
    .join("\n");

  const kwRows = keywordCoverage
    .map((k) => `- **${k.slug}** [${k.locale}]: PK "${k.pk}" ×${k.pkCount}, SK avg ${k.skAvg}`)
    .join("\n");

  const ctaRows = Object.entries(ctaTypes)
    .map(([t, n]) => `- ${t}: ${n}`)
    .join("\n");

  const failRows =
    validationFailures.length === 0
      ? "None — all articles passed validation."
      : validationFailures.map((f) => `- \`${f.slug}\` [${f.locale}]: ${f.errors.join("; ")}`).join("\n");

  const report = `# BJFLOOR Daily Content Report

Generated: ${new Date().toISOString()}
Date: ${date}

## Summary

| Metric | Count |
|--------|------:|
| Articles published (unique slugs) | ${articlesPublished} |
| Total locale files generated | ${Object.values(localeDistribution).reduce((a, b) => a + b, 0)} |
| Images assigned | ${imagesUsed} |
| Internal links (body total) | ${internalLinksTotal} |
| Validation failures | ${validationFailures.length} |

## Slugs published

${slugs.map((s) => `- ${s}`).join("\n") || "None"}

## Language distribution

| Locale | Files |
|--------|------:|
${localeRows || "| — | 0 |"}

## SEO keyword coverage

${kwRows || "No new articles."}

## CTA type distribution

${ctaRows || "None"}

## Image usage

${imagesUsed} new images recorded in \`content/image-used.json\` and \`content/image-library.json\`.

## Validation results

${failRows}

## System

- Pipeline: BJFLOOR Global Content Automation V2
- \`generateArticle(locale, topic)\` — native locale generation, no EN fallback
- Pre-publish: \`validateArticle()\`
`;

  writeFileSync(REPORT_PATH, report, "utf8");
  return REPORT_PATH;
}
