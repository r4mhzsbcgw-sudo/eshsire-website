#!/usr/bin/env node
/** Regenerate registry.ts from existing locale files only */
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_LOCALES } from "./locales.mjs";

const GENERATED_DIR = join(process.cwd(), "src/content/blog/generated");
const REGISTRY_PATH = join(GENERATED_DIR, "registry.ts");

const enBases = readdirSync(GENERATED_DIR)
  .filter((f) => f.endsWith(".en.ts"))
  .map((f) => f.replace(".en.ts", ""))
  .sort();

const lines = [
  "/** AUTO-GENERATED — Eshsire Group V2 multi-locale */",
  'import type { BlogPost } from "../types";',
  "",
];

for (const locale of ALL_LOCALES) {
  for (const base of enBases) {
    if (!existsSync(join(GENERATED_DIR, `${base}.${locale}.ts`))) continue;
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
console.log(`Registry updated for ${enBases.length} EN slugs`);
