#!/usr/bin/env node
/**
 * Download project images from Eshsire Group fixed Pexels / Unsplash sources
 * 鈫?public/images/projects/{slug}/
 */
import https from "node:https";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_BASE = join(ROOT, "public/images/projects");
const USED_PATH = join(ROOT, "content/image-used.json");
const LOG_PATH = join(ROOT, "image-replacement-log.md");
const SOURCES_TS = join(ROOT, "src/lib/project-image-sources.ts");

const PROJECT_SLUGS = [
  "africa-distributor",
  "middle-east-hotel",
  "school-flooring",
  "europe-apartment",
  "commercial-office",
  "southeast-asia-distributor",
  "hospital-flooring",
  "villa-wpc-wall-panel",
];

const WALL_PANEL_LOCALE_NAMES = {
  en: "Villa WPC Wall Panel Project",
  zh: "鍒 WPC 澧欐澘椤圭洰",
  es: "Proyecto paneles WPC villa",
};

const ALL_LOCALES = [
  "en", "zh", "ar", "de", "es", "fr", "he", "id", "it", "ja", "ko", "pt", "ru", "th", "tr", "vi",
];

const ROLE_FILES = {
  thumb: "thumb",
  banner: "banner",
  content1: "content-1",
  content2: "content-2",
  content3: "content-3",
  ending: "ending",
};

function roleFilename(role, imageId) {
  return `${ROLE_FILES[role]}-${imageId}.jpg`;
}

const POSITION_MAP = {
  banner: "POSITION1-Banner",
  content1: "POSITION2-Scene1",
  content2: "POSITION3-Scene2",
  content3: "POSITION4-Scene3",
  ending: "POSITION5-Scene4",
};

function loadSources() {
  const ts = readFileSync(SOURCES_TS, "utf8");
  const match = ts.match(
    /export const PROJECT_IMAGE_SOURCES[^=]*=\s(\{[\s\S]*?\n\});\s*\nexport function pexelsDownloadUrl/
  );
  if (!match) throw new Error("Could not parse PROJECT_IMAGE_SOURCES from TS");
  const pex = (url, altEn) => {
    const m = String(url).match(/\/photos\/(\d+)\//);
    return {
      provider: "pexels",
      imageId: String(m ? m[1] : 0),
      sourcePage: url,
      altEn,
      downloadUrl: url,
    };
  };
  return eval(`(${match[1]})`);
}

function stockDownloadUrl(slot, width = 1200, height = 800) {
  if (slot.downloadUrl) {
    const base = slot.downloadUrl.split("?")[0];
    if (base.endsWith(".jpg") && !base.includes("pexels-photo-")) {
      return `${base}?auto=compress&cs=tinysrgb&w=${width}`;
    }
    return `${base}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  }
  if (slot.provider === "pexels") {
    const id = slot.imageId;
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  }
  return `https://images.unsplash.com/${slot.imageId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

async function fetchBuffer(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await new Promise((resolve, reject) => {
        https
          .get(url, { timeout: 60000, headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              fetchBuffer(res.headers.location, 1).then(resolve).catch(reject);
              return;
            }
            if (res.statusCode !== 200) {
              reject(new Error(`${url} 鈫?HTTP ${res.statusCode}`));
              return;
            }
            const chunks = [];
            res.on("data", (c) => chunks.push(c));
            res.on("end", () => resolve(Buffer.concat(chunks)));
          })
          .on("error", reject);
      });
    } catch (e) {
      if (attempt === retries) throw e;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

function loadUsed() {
  if (!existsSync(USED_PATH)) return { records: [], projectSwaps: [] };
  const data = JSON.parse(readFileSync(USED_PATH, "utf8"));
  if (!data.projectSwaps) data.projectSwaps = [];
  return data;
}

function saveUsed(data) {
  writeFileSync(USED_PATH, JSON.stringify(data, null, 2), "utf8");
}

function fmtTime(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

async function main() {
  const slugArg = process.argv.find((a) => a.startsWith("--slug="))?.split("=")[1];
  const force = process.argv.includes("--force");
  const slugs = slugArg ? [slugArg] : PROJECT_SLUGS;
  const singleSlug = Boolean(slugArg);

  const PROJECT_IMAGE_SOURCES = loadSources();
  const now = new Date();
  const timestamp = now.toISOString();
  const logTitle = "# Eshsire Group Project Image Replacement Log (STRICT MODE 鈥?8 Projects)";
  const logLines = [
    logTitle,
    "",
    `Generated: ${timestamp}`,
    "",
    "Rules: STRICT MODE 路 8 projects 路 fixed Pexels URLs only 路 no AI 路 no substitutions",
    "",
  ];

  const used = loadUsed();
  if (singleSlug) {
    used.records = (used.records ?? []).filter((r) => r.projectSlug !== slugArg);
    used.projectSwaps = (used.projectSwaps ?? []).filter((s) => s.slug !== slugArg);
  } else {
    used.records = (used.records ?? []).filter((r) => !r.projectSlug);
    used.projectSwaps = [];
  }

  let downloaded = 0;
  let failed = 0;
  const detailRows = [];

  for (const slug of slugs) {
    const cfg = PROJECT_IMAGE_SOURCES[slug];
    if (!cfg) continue;

    const dir = join(OUT_BASE, slug);
    mkdirSync(dir, { recursive: true });

    const slots = [
      ["thumb", cfg.thumb],
      ["banner", cfg.banner],
      ["content1", cfg.content1],
      ["content2", cfg.content2],
      ["content3", cfg.content3],
      ["ending", cfg.ending],
    ];

    const positionUrls = [
      cfg.banner.downloadUrl ?? cfg.banner.sourcePage,
      cfg.content1.downloadUrl ?? cfg.content1.sourcePage,
      cfg.content2.downloadUrl ?? cfg.content2.sourcePage,
      cfg.content3.downloadUrl ?? cfg.content3.sourcePage,
      cfg.ending.downloadUrl ?? cfg.ending.sourcePage,
    ];

    const oldPaths = slots.map(([role, slot]) => `/images/projects/${slug}/${roleFilename(role, slot.imageId)}`);

    logLines.push(`## ${cfg.name}`, "", `- Slug: \`${slug}\``, `- Locale: all (shared assets)`, "");

    for (const [role, slot] of slots) {
      const file = roleFilename(role, slot.imageId);
      const dest = join(dir, file);
      const localPath = `/images/projects/${slug}/${file}`;
      const url = stockDownloadUrl(slot);
      const pos = POSITION_MAP[role] ?? role;

      process.stdout.write(`${slug}/${file} [${slot.provider}:${slot.imageId}] ... `);
      try {
        if (!force && existsSync(dest) && !process.argv.includes("--force")) {
          const existing = readFileSync(dest);
          if (existing.length >= 5000) {
            downloaded++;
            console.log(`SKIP (exists ${Math.round(existing.length / 1024)} KB)`);
            used.records.push({
              projectName: cfg.name,
              projectSlug: slug,
              role,
              position: pos,
              imageUrl: localPath,
              provider: slot.provider,
              imageId: slot.imageId,
              sourceUrl: slot.downloadUrl ?? slot.sourcePage,
              downloadUrl: url,
              timestamp,
            });
            if (role !== "thumb") {
              detailRows.push(
                `| ${cfg.name} | ${pos} | ${localPath} | ${slot.downloadUrl ?? url} | ${fmtTime(now)} |`
              );
            }
            continue;
          }
        }
        const buf = await fetchBuffer(url);
        if (buf.length < 5000) {
          throw new Error(`suspiciously small file (${buf.length} bytes)`);
        }
        writeFileSync(dest, buf);
        downloaded++;
        console.log(`OK (${Math.round(buf.length / 1024)} KB)`);

        used.records.push({
          projectName: cfg.name,
          projectSlug: slug,
          role,
          position: pos,
          imageUrl: localPath,
          provider: slot.provider,
          imageId: slot.imageId,
          sourceUrl: slot.downloadUrl ?? slot.sourcePage,
          downloadUrl: url,
          timestamp,
        });

        if (role !== "thumb") {
          detailRows.push(
            `| ${cfg.name} | ${pos} | ${localPath} | ${slot.downloadUrl ?? url} | ${fmtTime(now)} |`
          );
        }
      } catch (e) {
        failed++;
        console.log(`FAIL: ${e.message}`);
        detailRows.push(`| ${cfg.name} | ${pos} | FAIL | ${slot.downloadUrl ?? url} | ${fmtTime(now)} |`);
      }
    }

    if (slug === "villa-wpc-wall-panel") {
      for (const locale of ALL_LOCALES) {
        used.projectSwaps.push({
          project: WALL_PANEL_LOCALE_NAMES[locale] ?? WALL_PANEL_LOCALE_NAMES.en,
          slug,
          locale,
          images: positionUrls,
          timestamp: fmtTime(now),
        });
      }
    } else {
      used.projectSwaps.push({
        project: cfg.name,
        slug,
        locale: "all",
        images: positionUrls,
        previousLocal: oldPaths.filter((_, i) => slots[i][0] !== "thumb").map((p, i) => ({
          position: POSITION_MAP[slots.filter((s) => s[0] !== "thumb")[i]?.[0]] ?? "",
          path: p,
        })),
        timestamp: fmtTime(now),
      });
    }

    logLines.push(
      "### Detail page (5 positions)",
      "",
      "| Position | New URL |",
      "|----------|---------|",
      ...positionUrls.map((u, i) => `| POSITION${i + 1} | ${u.split("?")[0]} |`),
      ""
    );
  }

  logLines.push(
    "## Summary",
    "",
    `- Images downloaded: **${downloaded}**`,
    `- Failures: **${failed}**`,
    `- Spec: Eshsire Group FINAL SAFE VERSION (7 SPC/WPC projects + southeast-asia unchanged source)`,
    "",
    "## Replacement Table",
    "",
    "| Project | Position | Local path | Source URL | Time |",
    "|---------|----------|------------|------------|------|",
    ...detailRows,
    ""
  );

  saveUsed(used);
  writeFileSync(LOG_PATH, logLines.join("\n"), "utf8");
  console.log(`\nLog: ${LOG_PATH}`);
  console.log(`Updated: ${USED_PATH}`);
  if (failed) process.exit(1);
}

main();
