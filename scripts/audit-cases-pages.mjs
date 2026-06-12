#!/usr/bin/env node
/**
 * Audit /cases/* flow pages from case-content source.
 * Output: docs/cases-pages-audit.md
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SITE = "https://www.eshsire.com";
const SLUGS = [
  "sample-video-confirmation",
  "specification-order-checklist",
  "production-schedule-updates",
  "production-process-video-updates",
  "packaging-label-checking",
  "pre-shipment-quality-confirmation",
  "loading-photos-video-records",
  "after-sales-reorder-follow-up",
];

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function bodyText(item) {
  return [
    item.desc,
    item.problemSolved,
    item.customerConcerns,
    item.ourCooperation,
    item.valueToCustomer,
    item.suitableCustomers,
  ].join(" ");
}

function similarityNote(enItem, allEn) {
  const templateFields = 5;
  const sameStructure = "五段式模板（问题/顾虑/协作/价值/适合客户）";
  const others = allEn.filter((x) => x.slug !== enItem.slug);
  let maxOverlap = 0;
  for (const other of others) {
    const a = new Set(bodyText(enItem).toLowerCase().split(/\W+/).filter((w) => w.length > 3));
    const b = new Set(bodyText(other).toLowerCase().split(/\W+/).filter((w) => w.length > 3));
    let shared = 0;
    for (const w of a) if (b.has(w)) shared++;
    const overlap = shared / Math.max(a.size, 1);
    if (overlap > maxOverlap) maxOverlap = overlap;
  }
  const level = maxOverlap > 0.35 ? "高" : maxOverlap > 0.2 ? "中" : "低";
  return `${level}（${sameStructure}，与最相近页词汇重叠约 ${Math.round(maxOverlap * 100)}%）`;
}

async function loadCaseContent() {
  const file = path.join(process.cwd(), "src/content/projects/case-content.ts");
  const src = await readFile(file, "utf8");
  const enBlock = src.match(/export const projectCasesEn[\s\S]*?items:\s*\[([\s\S]*?)\],\s*\};/);
  const zhBlock = src.match(/export const projectCasesZh[\s\S]*?items:\s*\[([\s\S]*?)\],\s*\};/);
  if (!enBlock || !zhBlock) throw new Error("Could not parse case-content.ts");

  function parseItems(block) {
    const items = [];
    const slugRe = /slug:\s*"([^"]+)"/g;
    const titleRe = /title:\s*"([^"]+)"/g;
    const slugs = [...block.matchAll(slugRe)].map((m) => m[1]);
    const titles = [...block.matchAll(titleRe)].map((m) => m[1]);
    const chunks = block.split(/slug:\s*"/).slice(1);
    for (let i = 0; i < slugs.length; i++) {
      const chunk = chunks[i] ?? "";
      const get = (key) => {
        const m = chunk.match(new RegExp(`${key}:\\s*"([^"]*(?:\\\\.[^"]*)*)"`));
        return m ? m[1].replace(/\\"/g, '"') : "";
      };
      items.push({
        slug: slugs[i],
        title: titles[i] ?? get("title"),
        desc: get("desc"),
        problemSolved: get("problemSolved"),
        customerConcerns: get("customerConcerns"),
        ourCooperation: get("ourCooperation"),
        valueToCustomer: get("valueToCustomer"),
        suitableCustomers: get("suitableCustomers"),
      });
    }
    return items;
  }

  return {
    en: parseItems(enBlock[1]),
    zh: parseItems(zhBlock[1]),
  };
}

async function main() {
  const { en, zh } = await loadCaseContent();
  const zhBySlug = Object.fromEntries(zh.map((i) => [i.slug, i]));

  const rows = SLUGS.map((slug) => {
    const enItem = en.find((i) => i.slug === slug);
    const zhItem = zhBySlug[slug];
    if (!enItem) throw new Error(`Missing EN item: ${slug}`);

    const enWords = wordCount(bodyText(enItem));
    const zhChars = bodyText(zhItem ?? enItem).replace(/\s/g, "").length;

    const hasUniqueIntent =
      enWords >= 80 &&
      enItem.problemSolved.length > 40 &&
      !enItem.problemSolved.startsWith("Overseas buyers");

    return {
      url: `${SITE}/en/cases/${slug}`,
      slug,
      zhTitle: zhItem?.title ?? "—",
      enTitle: enItem.title,
      enWords,
      zhChars,
      uniqueContent: hasUniqueIntent
        ? "部分独立（环节主题不同，但结构相同）"
        : "否（模板化流程说明）",
      similarity: similarityNote(enItem, en),
      internalLinks: "首页 #projects 卡片 + 详情页相关环节互链",
      inSitemap: "否（第一阶段已移除）",
      robots: "noindex, follow",
      recommendation: "noindex",
    };
  });

  const md = `# /cases/* 页面质量审核

**生成时间：** ${new Date().toISOString()}  
**范围：** 8 个可视化跟单 flow 详情页（en 代表 URL；zh/es 结构相同）

## 审核结论

全部 8 页均为**同一五段式模板**下的订单跟单流程说明，环节主题不同但**无独立搜索意图**，不适合作为独立 landing page 争夺排名。首页 \`#projects\` 区块已承载差异化说明，详情页保留 **noindex + follow** 供已进站用户阅读，**已从 sitemap 移除**。

| URL | 中文标题 | 英文标题 | 正文字数(EN) | 独立内容 | 相似度 | 内链 | 在 sitemap | robots | 建议 |
|-----|----------|----------|--------------|----------|--------|------|------------|--------|------|
${rows
  .map(
    (r) =>
      `| \`${r.url}\` | ${r.zhTitle} | ${r.enTitle} | EN ${r.enWords} 词 / ZH ~${r.zhChars} 字 | ${r.uniqueContent} | ${r.similarity} | ${r.internalLinks} | ${r.inSitemap} | ${r.robots} | **${r.recommendation}** |`
  )
  .join("\n")}

## index / noindex 清单

### 建议 **noindex**（8 页 × 3 语言 = 24 URL，均已 noindex）

${rows.map((r) => `- \`/cases/${r.slug}\`（en / zh / es）— ${r.enTitle}`).join("\n")}

### 建议 **index**

无。跟单 flow 详情页不单独 index；核心价值在首页跟单板块与产品/博客/联系页。

---

*由 \`scripts/audit-cases-pages.mjs\` 从 \`case-content.ts\` 生成。*
`;

  await mkdir(path.join(process.cwd(), "docs"), { recursive: true });
  await writeFile(path.join(process.cwd(), "docs/cases-pages-audit.md"), md, "utf8");
  console.log("Wrote docs/cases-pages-audit.md");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
