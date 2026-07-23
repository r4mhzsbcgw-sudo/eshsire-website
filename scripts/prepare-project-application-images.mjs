#!/usr/bin/env node
/**
 * Audit local images and generate project-applications WebP assets.
 */
import { readdirSync, statSync, mkdirSync, copyFileSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const OUT_DIR = join(PUBLIC, "images/project-applications");
const DOCS_DIR = join(ROOT, "docs");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const CARD_SOURCES = {
  "private-label-spc": "images/cases/scenario-oem-packaging-labeling.jpg",
  "hospitality-commercial": "images/blog/floor/spc-plank-showcase.jpg",
  "education-high-traffic": "images/blog/floor/install-detail-floor.jpg",
  "residential-renovation": "images/home/spc-flooring.jpg",
  "office-retail": "images/blog/floor/spc-plank-showcase.jpg",
  "mixed-container": "images/cases/scenario-mixed-container-solution.jpg",
  "public-spaces": "images/home/factory/02-quality.jpg",
  "wall-panels": "images/home/wall-panels.jpg",
};

const CARD_PURPOSE = {
  "private-label-spc": { spc: true, wall: false, factory: true, card: 1 },
  "hospitality-commercial": { spc: true, wall: false, factory: false, card: 2 },
  "education-high-traffic": { spc: true, wall: false, factory: false, card: 3 },
  "residential-renovation": { spc: true, wall: false, factory: false, card: 4 },
  "office-retail": { spc: true, wall: false, factory: false, card: 5 },
  "mixed-container": { spc: true, wall: true, factory: true, card: 6 },
  "public-spaces": { spc: true, wall: false, factory: true, card: 7 },
  "wall-panels": { spc: false, wall: true, factory: false, card: 8 },
};

function walkImages(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walkImages(full, acc);
    } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
      acc.push(full);
    }
  }
  return acc;
}

function guessUsage(relPath) {
  const p = relPath.toLowerCase();
  if (p.includes("factory") || p.includes("production") || p.includes("loading") || p.includes("warehouse"))
    return "factory/packaging/loading";
  if (p.includes("wall") || p.includes("wpc")) return "wall panels";
  if (p.includes("spc") || p.includes("floor") || p.includes("plank")) return "SPC flooring";
  if (p.includes("carousel")) return "homepage carousel (review for baked text)";
  if (p.includes("editorial") || p.includes("hotel") || p.includes("office") || p.includes("apartment"))
    return "blog editorial — not for project cards";
  return "general";
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(DOCS_DIR, { recursive: true });

  const allImages = walkImages(PUBLIC);
  const auditLines = [
    "# Image Audit",
    "",
    "Generated for Eshsire homepage project-applications release.",
    "",
    "| Path | Filename | Resolution | Possible Use | SPC | Wall | Factory/Load |",
    "|------|----------|------------|--------------|-----|------|--------------|",
  ];

  for (const full of allImages.sort()) {
    const rel = relative(PUBLIC, full).replace(/\\/g, "/");
    const meta = await sharp(full).metadata();
    const w = meta.width ?? "?";
    const h = meta.height ?? "?";
    const usage = guessUsage(rel);
    const spc = /spc|floor|plank/i.test(rel) ? "Yes" : "Maybe";
    const wall = /wall|wpc/i.test(rel) ? "Yes" : "Maybe";
    const factory = /factory|loading|warehouse|packaging|container|oem|quality/i.test(rel) ? "Yes" : "Maybe";
    auditLines.push(`| \`${rel}\` | ${rel.split("/").pop()} | ${w}×${h} | ${usage} | ${spc} | ${wall} | ${factory} |`);
  }

  auditLines.push("", "## Project Application Card Mapping", "");
  for (const [slug, src] of Object.entries(CARD_SOURCES)) {
    const srcPath = join(PUBLIC, src);
    const outPath = join(OUT_DIR, `${slug}.webp`);
    if (!existsSync(srcPath)) {
      auditLines.push(`- **${slug}**: MISSING source \`${src}\``);
      continue;
    }
    await sharp(srcPath)
      .resize(960, 600, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(outPath);
    const meta = await sharp(outPath).metadata();
    auditLines.push(
      `- **Card ${CARD_PURPOSE[slug].card} (${slug})** → \`/images/project-applications/${slug}.webp\` (from \`${src}\`, ${meta.width}×${meta.height})`
    );
  }

  writeFileSync(join(DOCS_DIR, "IMAGE_AUDIT.md"), auditLines.join("\n"), "utf8");
  console.log(`Wrote ${auditLines.length} audit lines and ${Object.keys(CARD_SOURCES).length} WebP cards.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
