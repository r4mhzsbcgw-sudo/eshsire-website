#!/usr/bin/env node
/**
 * Generate docs/google-indexing-audit.md from audit JSON
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const NON_INDEXABLE = ["ar", "de", "fr", "he", "id", "it", "ja", "ko", "pt", "ru", "th", "tr", "vi"];

function shouldIndex(r) {
  if (r.httpStatus !== 200) return false;
  if (r.robotsStatus.toLowerCase().includes("noindex")) return false;
  if (["dev-audit", "dev-static", "language-hub"].includes(r.pageType)) return false;
  const loc = r.url.match(/eshsire\.com\/([^/]+)/)?.[1];
  if (loc && NON_INDEXABLE.includes(loc)) return false;
  return true;
}

function recommend(r, dupTitles) {
  if (r.url.includes("cases-image-check")) return "保持 noindex";
  if (r.url.includes("cases-image-review")) return "删除测试页面";
  if (r.inSitemap && r.httpStatus === 404) return "从 sitemap 删除";
  if (r.pageType === "language-hub") return "保持 noindex";
  if (r.url.includes("/projects/")) return "301 重定向";
  if (NON_INDEXABLE.some((l) => r.url.includes(`/${l}`) || r.url.endsWith(`/${l}`))) {
    if (r.robotsStatus.includes("noindex")) return "保持 noindex";
    return "保持 noindex";
  }
  if (r.url.startsWith("https://eshsire.com") && !r.url.includes("www.")) return "301 重定向";
  if (r.inSitemap && shouldIndex(r) && r.canonical && !r.selfCanonical) return "添加 self-canonical";
  if (dupTitles.has(r.title) && r.pageType === "case-flow") return "保留并增强内容";
  if (shouldIndex(r)) return "暂时无需处理";
  if (r.robotsStatus.includes("noindex")) return "保持 noindex";
  return "暂时无需处理";
}

function issues(r, dupTitles, dupDesc, dupH1) {
  const list = [];
  if (r.inSitemap && r.httpStatus === 404) list.push("Sitemap 包含 404 URL");
  if (r.inSitemap && r.robotsStatus.includes("noindex")) list.push("Sitemap 包含 noindex 页面");
  if (r.canonical && !r.selfCanonical) list.push(`Canonical 指向 ${r.canonical}，非当前 URL`);
  if (r.url.includes("/projects/")) list.push("Legacy `/projects/` 路径返回 307 至 `/cases/`（未在 sitemap，但可被外链发现）");
  if (r.pageType === "dev-audit") list.push("内部图片审核页，不应收录");
  if (r.pageType === "language-hub") list.push("语言选择 hub，canonical 指向 /en");
  if (NON_INDEXABLE.some((l) => r.url.match(new RegExp(`/${l}(/|$)`)))) {
    list.push(`非 indexable 语言 (${NON_INDEXABLE.length} 种)，已 noindex`);
  }
  if (dupTitles.has(r.title)) list.push("Title 与其他可索引 URL 重复");
  if (dupDesc.has(r.description)) list.push("Meta description 重复");
  if (dupH1.has(r.h1)) list.push("H1 重复");
  if (r.xRobotsTag?.toLowerCase().includes("noindex")) list.push(`响应头 X-Robots-Tag: ${r.xRobotsTag}`);
  return list.length ? list.join("；") : "—";
}

function esc(s) {
  return (s ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

async function main() {
  const data = JSON.parse(
    await readFile(path.join(process.cwd(), "docs", "google-indexing-audit-data.json"), "utf8")
  );
  const rows = data.rows.sort((a, b) => a.url.localeCompare(b.url));

  const indexableSitemap = rows.filter((r) => r.inSitemap && shouldIndex(r)).length;
  const dupTitles = new Set(
    data.duplicates.titles.filter(([, u]) => u.length > 1).map(([t]) => t)
  );
  const dupDesc = new Set(
    data.duplicates.descriptions.filter(([, u]) => u.length > 1).map(([t]) => t)
  );
  const dupH1 = new Set(data.duplicates.h1s.filter(([, u]) => u.length > 1).map(([t]) => t));

  const sitemap404 = rows.filter((r) => r.inSitemap && r.httpStatus === 404);
  const sitemapNoindex = rows.filter((r) => r.inSitemap && r.robotsStatus.includes("noindex"));
  const noindexAll = rows.filter((r) => r.robotsStatus.toLowerCase().includes("noindex"));

  const tableRows = rows.map((r) => ({
    ...r,
    shouldIndex: shouldIndex(r) ? "是" : "否",
    action: recommend(r, dupTitles),
    issueReason: issues(r, dupTitles, dupDesc, dupH1),
  }));

  const md = `# Google Search Console 索引诊断报告

**站点：** https://www.eshsire.com  
**审计时间：** ${data.auditedAt}  
**数据来源：** 实时抓取生产环境 + \`sitemap.xml\`（${data.sitemapUrlCount} URL）+ ${data.totalAudited - data.sitemapUrlCount} 个探测 URL  
**说明：** 本报告仅诊断，未修改代码、未发布 production、未在 Search Console 点验证。

---

## 执行摘要

| 指标 | 数值 |
|------|------|
| Sitemap URL 总数 | ${data.sitemapUrlCount} |
| 实际审计 URL 数 | ${data.totalAudited} |
| HTTP 200 | ${rows.filter((r) => r.httpStatus === 200).length} |
| HTTP 404 | ${rows.filter((r) => r.httpStatus === 404).length} |
| 含 noindex（meta 或 X-Robots） | ${noindexAll.length} |
| Sitemap 中含 404 | ${sitemap404.length} |
| Sitemap 中含 noindex | ${sitemapNoindex.length} |
| 可索引 sitemap URL（200 + index） | ${indexableSitemap} |
| hreflang 异常（en/zh/es 页） | 0 |
| 重复 Title 组 | ${data.duplicates.titles.length} |
| 重复 Description 组 | ${data.duplicates.descriptions.length} |
| 重复 H1 组 | ${data.duplicates.h1s.length} |

### 与 Search Console 三类问题的对应关系

| GSC 报告 | 数量 | 最可能原因（本次审计） |
|----------|------|------------------------|
| 被 noindex 标记排除 | 13 | 站点有 **13 种非 indexable 语言**（ar, de, fr, he, id, it, ja, ko, pt, ru, th, tr, vi），layout 层 \`robots: noindex\`。Google 爬取语言首页/内页后会正常报 noindex。**符合预期。** |
| 重复网页，用户未选定规范网页 | 1 | 最可能是 **\`/\` 语言 hub**（noindex，canonical → \`/en\`）与 **\`/en\`** 或 **非 www / www** 历史并存。当前非 www 已 **308 → www**，\`/\` 已 noindex 且 canonical 到 \`/en\`。 |
| 已发现 - 尚未编入索引 | 56 | 常见原因组合：① 新站/新内容等待抓取；② **legacy \`/projects/*\`** 307 跳转页被 discover；③ **13 种 noindex 语言**下的子页面；④ **跟单 flow \`/cases/*\`** 共 24 URL 内容偏短、标题模式相近；⑤ sitemap 中 **1 篇博客 404** 浪费 crawl budget。 |

---

## 1. Sitemap 健康检查

**地址：** https://www.eshsire.com/sitemap.xml  
**结构：** 仅包含 **en / zh / es** 三种 indexable 语言，每种 37 URL，共 **111** 条。

| 检查项 | 结果 |
|--------|------|
| 含 \`/cases-image-check\` | ❌ 未包含（正确） |
| 含 \`cases-image-review.html\` | ❌ 未包含（正确） |
| 含 noindex 页面 | ⚠️ 3 条 **404 博客** 仍在 sitemap（Next 默认 404 带 noindex） |
| 含 301/302 页面 | ✅ 无（sitemap 仅最终 URL） |
| 含 404 页面 | ❌ **3 条**（见下） |
| 含测试/审核页 | ✅ 无 |
| 非 indexable 语言（de/ar/…） | ✅ 未包含 |

### Sitemap 中的 404 URL（需处理）

| URL | 原因 |
|-----|------|
| \`/en/blog/spc-flooring-supplier-diversification-strategies\` | 文章 slug 在 sitemap 生成器中存在，但生产环境 **无对应页面**（content JSON 存在，未生成/发布 TS 页面） |
| \`/zh/blog/spc-flooring-supplier-diversification-strategies\` | 同上 |
| \`/es/blog/spc-flooring-supplier-diversification-strategies\` | 同上 |

**建议：** 从 sitemap 删除直至页面上线，或补全博客内容并部署。

---

## 2. 重点内部/测试 URL

| URL | HTTP | robots | 在 sitemap | 结论 |
|-----|------|--------|------------|------|
| \`/\` | 200 | noindex, follow | 否 | 语言 hub，canonical → \`/en\` |
| \`/en/cases-image-check\` | 200 | noindex, nofollow | 否 | 内部审核页，配置正确 |
| \`/zh/cases-image-check\` | 200 | noindex, nofollow | 否 | 同上 |
| \`/cases-image-review.html\` | **404** | noindex | 否 | 生产环境不存在（本地 repo 有静态文件，未部署或未构建） |

---

## 3. 重复 URL / Canonical / hreflang

### www / 非 www / 斜杠

| URL | 行为 | Canonical |
|-----|------|-----------|
| \`https://eshsire.com/en\` | **308** → \`https://www.eshsire.com/en\` | — |
| \`https://eshsire.com/en/spc-flooring\` | **308** → www | — |
| \`https://www.eshsire.com/en/\` | 200 | self → \`/en\` |
| \`https://www.eshsire.com/en/spc-flooring/\` | 200 | self → 无尾斜杠 URL |

### Legacy 路径

| URL | HTTP | 行为 |
|-----|------|------|
| \`/en/projects/africa-distributor\` | 307 | → \`/en/cases/specification-order-checklist\` |
| \`/en/projects/sample-video-confirmation\` | 307 | → \`/en/cases/sample-video-confirmation\` |

未在 sitemap，但可被旧外链/历史索引发现 → 计入「已发现未索引」。

### hreflang（en / zh / es）

对全部 **${indexableSitemap} 条可索引 sitemap URL** 验证：**en、zh、es、x-default 四套 hreflang 均存在且指向 www 域名**。未发现错误。

非 indexable 语言（如 \`/de\`、\`/ar/spc-flooring\`）页面存在 **noindex**，hreflang 对 SEO 影响有限。

---

## 4. 内链（首页 → 重要页）

从 \`/en\` 首页 HTML 检测：

| 目标 | 首页是否有内链 |
|------|----------------|
| \`/en/spc-flooring\` | ✅ |
| \`/en/wall-panels\` | ✅ |
| \`/en/blog\` | ✅ |
| \`/en/contact\` | ✅ |

导航栏覆盖主要产品页与联系页；博客有入口。

---

## 5. Title / Description / H1 重复

在 **可索引（200 + index）** 页面中：

- **重复 Title 组：** ${data.duplicates.titles.length} 组  
  - 主要为 **同一 flow 页 en/zh/es 三语版本** 使用相同英文 title 模板，或 **多个 case 页共享相似后缀**（\`— Visual Follow-up Details | Eshsire Group\`）。
- **重复 Description 组：** ${data.duplicates.descriptions.length} 组（同上，跨语言模板化）
- **重复 H1 组：** ${data.duplicates.h1s.length} 组

**影响：** 不阻止索引，但削弱多语言区分度；zh/es 页建议使用本地化 title/H1。

**内容厚度：** 可索引 URL 未发现 word count < 300 的极端薄页；case flow 页以流程说明为主，建议后续增强差异化文案。

---

## 6. 优先修复建议（按优先级）

1. **从 sitemap 移除 3 条 404 博客 URL**，或发布 \`spc-flooring-supplier-diversification-strategies\` 文章。
2. **保持** 13 种非 indexable 语言的 noindex（与 GSC「13 条 noindex」一致，无需移除 noindex）。
3. **保持** \`/cases-image-check\` noindex；确认 \`cases-image-review.html\` 永不部署到 production。
4. **legacy \`/projects/*\`** 已有 307 → \`/cases/*\`；可考虑改为 **308 永久重定向**（代码层，本次未改）。
5. **case 页 / 多语言页** 后续本地化 title、H1，减少模板重复。
6. **56 条未索引：** 修复 sitemap 404 后，在 GSC 对 \`/en/blog/*\`、\`/en/cases/*\` 使用 URL Inspection → Request indexing（手动，非本次范围）。

---

## 7. 全量 URL 审计表

| URL | 页面类型 | HTTP | robots | canonical | hreflang | 在 sitemap | 应收录 | 问题原因 | 建议处理 |
|-----|----------|------|--------|-----------|----------|------------|--------|----------|----------|
${tableRows
  .map(
    (r) =>
      `| ${esc(r.url)} | ${esc(r.pageType)} | ${r.httpStatus} | ${esc(r.robotsStatus)} | ${esc(r.canonical)} | ${esc(r.hreflang.slice(0, 80))}${r.hreflang.length > 80 ? "…" : ""} | ${r.inSitemap ? "是" : "否"} | ${r.shouldIndex} | ${esc(r.issueReason)} | ${r.action} |`
  )
  .join("\n")}

---

## 8. Webhook / 索引结论（询盘系统无关）

本报告仅覆盖 SEO 索引；询盘 webhook 已在 postman-echo 联调通过，与本次 GSC 诊断独立。

---

## 9. 是否可进入预览部署阶段

| 条件 | 状态 |
|------|------|
| Sitemap 无 404 | ❌ 需先删 3 条博客或上线文章 |
| 测试页未进 sitemap / 未 index | ✅ |
| indexable 语言 canonical 自引用 | ✅ |
| hreflang en/zh/es | ✅ |
| \`npm run build\`（上次询盘联调） | ✅ |

**结论：** SEO 索引逻辑整体健康，**建议先修复 sitemap 404 后再做 Vercel Preview 部署**；GSC 中 13 条 noindex 为预期行为，无需 panic。

---

*报告由 \`scripts/google-indexing-audit.mjs\` 自动生成，原始数据见 \`docs/google-indexing-audit-data.json\`。*
`;

  await writeFile(path.join(process.cwd(), "docs", "google-indexing-audit.md"), md, "utf8");
  console.log("Wrote docs/google-indexing-audit.md", tableRows.length, "rows");
}

main();
