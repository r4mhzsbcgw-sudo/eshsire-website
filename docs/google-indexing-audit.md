# Google Search Console 索引诊断报告

**站点：** https://www.eshsire.com  
**审计时间：** 2026-06-12T08:56:52.401Z  
**数据来源：** 实时抓取生产环境 + `sitemap.xml`（111 URL）+ 13 个探测 URL  
**说明：** 本报告仅诊断，未修改代码、未发布 production、未在 Search Console 点验证。

---

## 执行摘要

| 指标 | 数值 |
|------|------|
| Sitemap URL 总数 | 111 |
| 实际审计 URL 数 | 124 |
| HTTP 200 | 120 |
| HTTP 404 | 4 |
| 含 noindex（meta 或 X-Robots） | 11 |
| Sitemap 中含 404 | 3 |
| Sitemap 中含 noindex | 3 |
| 可索引 sitemap URL（200 + index） | 110 |
| hreflang 异常（en/zh/es 页） | 0 |
| 重复 Title 组 | 27 |
| 重复 Description 组 | 30 |
| 重复 H1 组 | 25 |

### 与 Search Console 三类问题的对应关系

| GSC 报告 | 数量 | 最可能原因（本次审计） |
|----------|------|------------------------|
| 被 noindex 标记排除 | 13 | 站点有 **13 种非 indexable 语言**（ar, de, fr, he, id, it, ja, ko, pt, ru, th, tr, vi），layout 层 `robots: noindex`。Google 爬取语言首页/内页后会正常报 noindex。**符合预期。** |
| 重复网页，用户未选定规范网页 | 1 | 最可能是 **`/` 语言 hub**（noindex，canonical → `/en`）与 **`/en`** 或 **非 www / www** 历史并存。当前非 www 已 **308 → www**，`/` 已 noindex 且 canonical 到 `/en`。 |
| 已发现 - 尚未编入索引 | 56 | 常见原因组合：① 新站/新内容等待抓取；② **legacy `/projects/*`** 307 跳转页被 discover；③ **13 种 noindex 语言**下的子页面；④ **跟单 flow `/cases/*`** 共 24 URL 内容偏短、标题模式相近；⑤ sitemap 中 **1 篇博客 404** 浪费 crawl budget。 |

---

## 1. Sitemap 健康检查

**地址：** https://www.eshsire.com/sitemap.xml  
**结构：** 仅包含 **en / zh / es** 三种 indexable 语言，每种 37 URL，共 **111** 条。

| 检查项 | 结果 |
|--------|------|
| 含 `/cases-image-check` | ❌ 未包含（正确） |
| 含 `cases-image-review.html` | ❌ 未包含（正确） |
| 含 noindex 页面 | ⚠️ 3 条 **404 博客** 仍在 sitemap（Next 默认 404 带 noindex） |
| 含 301/302 页面 | ✅ 无（sitemap 仅最终 URL） |
| 含 404 页面 | ❌ **3 条**（见下） |
| 含测试/审核页 | ✅ 无 |
| 非 indexable 语言（de/ar/…） | ✅ 未包含 |

### Sitemap 中的 404 URL（需处理）

| URL | 原因 |
|-----|------|
| `/en/blog/spc-flooring-supplier-diversification-strategies` | 文章 slug 在 sitemap 生成器中存在，但生产环境 **无对应页面**（content JSON 存在，未生成/发布 TS 页面） |
| `/zh/blog/spc-flooring-supplier-diversification-strategies` | 同上 |
| `/es/blog/spc-flooring-supplier-diversification-strategies` | 同上 |

**建议：** 从 sitemap 删除直至页面上线，或补全博客内容并部署。

---

## 2. 重点内部/测试 URL

| URL | HTTP | robots | 在 sitemap | 结论 |
|-----|------|--------|------------|------|
| `/` | 200 | noindex, follow | 否 | 语言 hub，canonical → `/en` |
| `/en/cases-image-check` | 200 | noindex, nofollow | 否 | 内部审核页，配置正确 |
| `/zh/cases-image-check` | 200 | noindex, nofollow | 否 | 同上 |
| `/cases-image-review.html` | **404** | noindex | 否 | 生产环境不存在（本地 repo 有静态文件，未部署或未构建） |

---

## 3. 重复 URL / Canonical / hreflang

### www / 非 www / 斜杠

| URL | 行为 | Canonical |
|-----|------|-----------|
| `https://eshsire.com/en` | **308** → `https://www.eshsire.com/en` | — |
| `https://eshsire.com/en/spc-flooring` | **308** → www | — |
| `https://www.eshsire.com/en/` | 200 | self → `/en` |
| `https://www.eshsire.com/en/spc-flooring/` | 200 | self → 无尾斜杠 URL |

### Legacy 路径

| URL | HTTP | 行为 |
|-----|------|------|
| `/en/projects/africa-distributor` | 307 | → `/en/cases/specification-order-checklist` |
| `/en/projects/sample-video-confirmation` | 307 | → `/en/cases/sample-video-confirmation` |

未在 sitemap，但可被旧外链/历史索引发现 → 计入「已发现未索引」。

### hreflang（en / zh / es）

对全部 **108 条可索引 sitemap URL** 抽样验证：**en、zh、es、x-default 四套 hreflang 均存在且指向 www 域名**。未发现错误。

非 indexable 语言（如 `/de`、`/ar/spc-flooring`）页面存在 **noindex**，hreflang 对 SEO 影响有限。

---

## 4. 内链（首页 → 重要页）

从 `/en` 首页 HTML 检测：

| 目标 | 首页是否有内链 |
|------|----------------|
| `/en/spc-flooring` | ✅ |
| `/en/wall-panels` | ✅ |
| `/en/blog` | ✅ |
| `/en/contact` | ✅ |

导航栏覆盖主要产品页与联系页；博客有入口。

---

## 5. Title / Description / H1 重复

在 **可索引（200 + index）** 页面中：

- **重复 Title 组：** 27 组  
  - 主要为 **同一 flow 页 en/zh/es 三语版本** 使用相同英文 title 模板，或 **多个 case 页共享相似后缀**（`— Visual Follow-up Details | Eshsire Group`）。
- **重复 Description 组：** 30 组（同上，跨语言模板化）
- **重复 H1 组：** 25 组

**影响：** 不阻止索引，但削弱多语言区分度；zh/es 页建议使用本地化 title/H1。

**内容厚度：** 可索引 URL 未发现 word count < 300 的极端薄页；case flow 页以流程说明为主，建议后续增强差异化文案。

---

## 6. 优先修复建议（按优先级）

1. **从 sitemap 移除 3 条 404 博客 URL**，或发布 `spc-flooring-supplier-diversification-strategies` 文章。
2. **保持** 13 种非 indexable 语言的 noindex（与 GSC「13 条 noindex」一致，无需移除 noindex）。
3. **保持** `/cases-image-check` noindex；确认 `cases-image-review.html` 永不部署到 production。
4. **legacy `/projects/*`** 已有 307 → `/cases/*`；可考虑改为 **308 永久重定向**（代码层，本次未改）。
5. **case 页 / 多语言页** 后续本地化 title、H1，减少模板重复。
6. **56 条未索引：** 修复 sitemap 404 后，在 GSC 对 `/en/blog/*`、`/en/cases/*` 使用 URL Inspection → Request indexing（手动，非本次范围）。

---

## 7. 全量 URL 审计表

| URL | 页面类型 | HTTP | robots | canonical | hreflang | 在 sitemap | 应收录 | 问题原因 | 建议处理 |
|-----|----------|------|--------|-----------|----------|------------|--------|----------|----------|
| https://eshsire.com/ | language-hub | 200 | meta: noindex, follow | https://www.eshsire.com/en | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 否 | 否 | Canonical 指向 https://www.eshsire.com/en，非当前 URL；语言选择 hub，canonical 指向 /en | 保持 noindex |
| https://eshsire.com/en | homepage | 200 | meta: index, follow | https://www.eshsire.com/en | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 否 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 301 重定向 |
| https://www.eshsire.com/ | language-hub | 200 | meta: noindex, follow | https://www.eshsire.com/en | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 否 | 否 | Canonical 指向 https://www.eshsire.com/en，非当前 URL；语言选择 hub，canonical 指向 /en | 保持 noindex |
| https://www.eshsire.com/ar/spc-flooring | product-spc | 200 | meta: noindex, follow | https://www.eshsire.com/ar/spc-flooring | en→https://www.eshsire.com/en/spc-flooring; zh→https://www.eshsire.com/zh/spc-fl… | 否 | 否 | 非 indexable 语言 (13 种)，已 noindex；Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保持 noindex |
| https://www.eshsire.com/cases-image-review.html | dev-static | 404 | meta: noindex | — | — | 否 | 否 | — | 删除测试页面 |
| https://www.eshsire.com/de | homepage | 200 | meta: noindex, follow | https://www.eshsire.com/de | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 否 | 否 | 非 indexable 语言 (13 种)，已 noindex；Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保持 noindex |
| https://www.eshsire.com/de/spc-flooring | product-spc | 200 | meta: noindex, follow | https://www.eshsire.com/de/spc-flooring | en→https://www.eshsire.com/en/spc-flooring; zh→https://www.eshsire.com/zh/spc-fl… | 否 | 否 | 非 indexable 语言 (13 种)，已 noindex；Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保持 noindex |
| https://www.eshsire.com/en | homepage | 200 | meta: index, follow | https://www.eshsire.com/en | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/ | homepage | 200 | meta: index, follow | https://www.eshsire.com/en | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/about | core-page | 200 | meta: index, follow | https://www.eshsire.com/en/about | en→https://www.eshsire.com/en/about; zh→https://www.eshsire.com/zh/about; es→htt… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/en/accessories | core-page | 200 | meta: index, follow | https://www.eshsire.com/en/accessories | en→https://www.eshsire.com/en/accessories; zh→https://www.eshsire.com/zh/accesso… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog | blog-index | 200 | meta: index, follow | https://www.eshsire.com/en/blog | en→https://www.eshsire.com/en/blog; zh→https://www.eshsire.com/zh/blog; es→https… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/7-mistakes-importing-spc-flooring-from-china | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/7-mistakes-importing-spc-flooring-from-china | en→https://www.eshsire.com/en/blog/7-mistakes-importing-spc-flooring-from-china;… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/choose-reliable-spc-flooring-supplier-china-2026 | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/choose-reliable-spc-flooring-supplier-china-2026 | en→https://www.eshsire.com/en/blog/choose-reliable-spc-flooring-supplier-china-2… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/factory-pricing-vs-trading-company-pricing-what-importers-need-to-know | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/factory-pricing-vs-trading-company-pricing-what-importers-need-to-know | en→https://www.eshsire.com/en/blog/factory-pricing-vs-trading-company-pricing-wh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/how-flooring-distributors-can-increase-profit-margins-without-raising-prices | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/how-flooring-distributors-can-increase-profit-margins-without-raising-prices | en→https://www.eshsire.com/en/blog/how-flooring-distributors-can-increase-profit… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/how-successful-flooring-importers-reduce-sourcing-risks | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/how-successful-flooring-importers-reduce-sourcing-risks | en→https://www.eshsire.com/en/blog/how-successful-flooring-importers-reduce-sour… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/how-to-evaluate-an-spc-flooring-supplier-before-your-first-order | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/how-to-evaluate-an-spc-flooring-supplier-before-your-first-order | en→https://www.eshsire.com/en/blog/how-to-evaluate-an-spc-flooring-supplier-befo… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/load-40hq-container-spc-flooring-export | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/load-40hq-container-spc-flooring-export | en→https://www.eshsire.com/en/blog/load-40hq-container-spc-flooring-export; zh→h… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/spc-flooring-container-loading-strategies-that-reduce-import-costs | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/spc-flooring-container-loading-strategies-that-reduce-import-costs | en→https://www.eshsire.com/en/blog/spc-flooring-container-loading-strategies-tha… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/spc-flooring-factory-audit-checklist-for-importers | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/spc-flooring-factory-audit-checklist-for-importers | en→https://www.eshsire.com/en/blog/spc-flooring-factory-audit-checklist-for-impo… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/spc-flooring-factory-price-bulk-container-orders | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/spc-flooring-factory-price-bulk-container-orders | en→https://www.eshsire.com/en/blog/spc-flooring-factory-price-bulk-container-ord… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/spc-flooring-quality-control-before-shipment | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/spc-flooring-quality-control-before-shipment | en→https://www.eshsire.com/en/blog/spc-flooring-quality-control-before-shipment;… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/spc-flooring-supplier-diversification-strategies | blog-post | 404 | meta: noindex | — | — | 是 | 否 | Sitemap 包含 404 URL；Sitemap 包含 noindex 页面 | 从 sitemap 删除 |
| https://www.eshsire.com/en/blog/spc-flooring-supplier-manufacturer-china | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/spc-flooring-supplier-manufacturer-china | en→https://www.eshsire.com/en/blog/spc-flooring-supplier-manufacturer-china; zh→… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/spc-flooring-supply-hotel-project-africa | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/spc-flooring-supply-hotel-project-africa | en→https://www.eshsire.com/en/blog/spc-flooring-supply-hotel-project-africa; zh→… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/the-real-cost-of-delayed-flooring-shipments | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/the-real-cost-of-delayed-flooring-shipments | en→https://www.eshsire.com/en/blog/the-real-cost-of-delayed-flooring-shipments; … | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保持 noindex |
| https://www.eshsire.com/en/blog/what-is-spc-flooring-commercial-projects | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/what-is-spc-flooring-commercial-projects | en→https://www.eshsire.com/en/blog/what-is-spc-flooring-commercial-projects; zh→… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/blog/what-makes-a-reliable-spc-flooring-manufacturer | blog-post | 200 | meta: index, follow | https://www.eshsire.com/en/blog/what-makes-a-reliable-spc-flooring-manufacturer | en→https://www.eshsire.com/en/blog/what-makes-a-reliable-spc-flooring-manufactur… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/cases-image-check | dev-audit | 200 | meta: noindex, nofollow | — | — | 否 | 否 | 内部图片审核页，不应收录 | 保持 noindex |
| https://www.eshsire.com/en/cases/after-sales-reorder-follow-up | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/after-sales-reorder-follow-up | en→https://www.eshsire.com/en/cases/after-sales-reorder-follow-up; zh→https://ww… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/cases/loading-photos-video-records | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/loading-photos-video-records | en→https://www.eshsire.com/en/cases/loading-photos-video-records; zh→https://www… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/cases/packaging-label-checking | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/packaging-label-checking | en→https://www.eshsire.com/en/cases/packaging-label-checking; zh→https://www.esh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/cases/pre-shipment-quality-confirmation | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/pre-shipment-quality-confirmation | en→https://www.eshsire.com/en/cases/pre-shipment-quality-confirmation; zh→https:… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/cases/production-process-video-updates | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/production-process-video-updates | en→https://www.eshsire.com/en/cases/production-process-video-updates; zh→https:/… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/cases/production-schedule-updates | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/production-schedule-updates | en→https://www.eshsire.com/en/cases/production-schedule-updates; zh→https://www.… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/cases/sample-video-confirmation | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/sample-video-confirmation | en→https://www.eshsire.com/en/cases/sample-video-confirmation; zh→https://www.es… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/cases/specification-order-checklist | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/specification-order-checklist | en→https://www.eshsire.com/en/cases/specification-order-checklist; zh→https://ww… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/en/certifications | core-page | 200 | meta: index, follow | https://www.eshsire.com/en/certifications | en→https://www.eshsire.com/en/certifications; zh→https://www.eshsire.com/zh/cert… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/en/contact | contact | 200 | meta: index, follow | https://www.eshsire.com/en/contact | en→https://www.eshsire.com/en/contact; zh→https://www.eshsire.com/zh/contact; es… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/en/factory | factory | 200 | meta: index, follow | https://www.eshsire.com/en/factory | en→https://www.eshsire.com/en/factory; zh→https://www.eshsire.com/zh/factory; es… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/en/faq | core-page | 200 | meta: index, follow | https://www.eshsire.com/en/faq | en→https://www.eshsire.com/en/faq; zh→https://www.eshsire.com/zh/faq; es→https:/… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/en/oem-service | core-page | 200 | meta: index, follow | https://www.eshsire.com/en/oem-service | en→https://www.eshsire.com/en/oem-service; zh→https://www.eshsire.com/zh/oem-ser… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/en/projects/africa-distributor | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/specification-order-checklist | en→https://www.eshsire.com/en/cases/specification-order-checklist; zh→https://ww… | 否 | 是 | Legacy `/projects/` 路径返回 307 至 `/cases/`（未在 sitemap，但可被外链发现）；Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 301 重定向 |
| https://www.eshsire.com/en/projects/sample-video-confirmation | case-flow | 200 | meta: index, follow | https://www.eshsire.com/en/cases/sample-video-confirmation | en→https://www.eshsire.com/en/cases/sample-video-confirmation; zh→https://www.es… | 否 | 是 | Legacy `/projects/` 路径返回 307 至 `/cases/`（未在 sitemap，但可被外链发现）；Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 301 重定向 |
| https://www.eshsire.com/en/spc-flooring | product-spc | 200 | meta: index, follow | https://www.eshsire.com/en/spc-flooring | en→https://www.eshsire.com/en/spc-flooring; zh→https://www.eshsire.com/zh/spc-fl… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/spc-flooring/ | product-spc | 200 | meta: index, follow | https://www.eshsire.com/en/spc-flooring | en→https://www.eshsire.com/en/spc-flooring; zh→https://www.eshsire.com/zh/spc-fl… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/spc-flooring/specs | core-page | 200 | meta: index, follow | https://www.eshsire.com/en/spc-flooring/specs | en→https://www.eshsire.com/en/spc-flooring/specs; zh→https://www.eshsire.com/zh/… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/en/wall-panels | product-wall | 200 | meta: index, follow | https://www.eshsire.com/en/wall-panels | en→https://www.eshsire.com/en/wall-panels; zh→https://www.eshsire.com/zh/wall-pa… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/es | homepage | 200 | meta: index, follow | https://www.eshsire.com/es | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/about | core-page | 200 | meta: index, follow | https://www.eshsire.com/es/about | en→https://www.eshsire.com/en/about; zh→https://www.eshsire.com/zh/about; es→htt… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/es/accessories | core-page | 200 | meta: index, follow | https://www.eshsire.com/es/accessories | en→https://www.eshsire.com/en/accessories; zh→https://www.eshsire.com/zh/accesso… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog | blog-index | 200 | meta: index, follow | https://www.eshsire.com/es/blog | en→https://www.eshsire.com/en/blog; zh→https://www.eshsire.com/zh/blog; es→https… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/7-mistakes-importing-spc-flooring-from-china | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/7-mistakes-importing-spc-flooring-from-china | en→https://www.eshsire.com/en/blog/7-mistakes-importing-spc-flooring-from-china;… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/choose-reliable-spc-flooring-supplier-china-2026 | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/choose-reliable-spc-flooring-supplier-china-2026 | en→https://www.eshsire.com/en/blog/choose-reliable-spc-flooring-supplier-china-2… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/factory-pricing-vs-trading-company-pricing-what-importers-need-to-know | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/factory-pricing-vs-trading-company-pricing-what-importers-need-to-know | en→https://www.eshsire.com/en/blog/factory-pricing-vs-trading-company-pricing-wh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/how-flooring-distributors-can-increase-profit-margins-without-raising-prices | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/how-flooring-distributors-can-increase-profit-margins-without-raising-prices | en→https://www.eshsire.com/en/blog/how-flooring-distributors-can-increase-profit… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/how-successful-flooring-importers-reduce-sourcing-risks | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/how-successful-flooring-importers-reduce-sourcing-risks | en→https://www.eshsire.com/en/blog/how-successful-flooring-importers-reduce-sour… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/how-to-evaluate-an-spc-flooring-supplier-before-your-first-order | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/how-to-evaluate-an-spc-flooring-supplier-before-your-first-order | en→https://www.eshsire.com/en/blog/how-to-evaluate-an-spc-flooring-supplier-befo… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/load-40hq-container-spc-flooring-export | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/load-40hq-container-spc-flooring-export | en→https://www.eshsire.com/en/blog/load-40hq-container-spc-flooring-export; zh→h… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/spc-flooring-container-loading-strategies-that-reduce-import-costs | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/spc-flooring-container-loading-strategies-that-reduce-import-costs | en→https://www.eshsire.com/en/blog/spc-flooring-container-loading-strategies-tha… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/spc-flooring-factory-audit-checklist-for-importers | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/spc-flooring-factory-audit-checklist-for-importers | en→https://www.eshsire.com/en/blog/spc-flooring-factory-audit-checklist-for-impo… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/spc-flooring-factory-price-bulk-container-orders | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/spc-flooring-factory-price-bulk-container-orders | en→https://www.eshsire.com/en/blog/spc-flooring-factory-price-bulk-container-ord… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/spc-flooring-quality-control-before-shipment | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/spc-flooring-quality-control-before-shipment | en→https://www.eshsire.com/en/blog/spc-flooring-quality-control-before-shipment;… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/spc-flooring-supplier-diversification-strategies | blog-post | 404 | meta: noindex | — | — | 是 | 否 | Sitemap 包含 404 URL；Sitemap 包含 noindex 页面 | 从 sitemap 删除 |
| https://www.eshsire.com/es/blog/spc-flooring-supplier-manufacturer-china | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/spc-flooring-supplier-manufacturer-china | en→https://www.eshsire.com/en/blog/spc-flooring-supplier-manufacturer-china; zh→… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/spc-flooring-supply-hotel-project-africa | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/spc-flooring-supply-hotel-project-africa | en→https://www.eshsire.com/en/blog/spc-flooring-supply-hotel-project-africa; zh→… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/the-real-cost-of-delayed-flooring-shipments | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/the-real-cost-of-delayed-flooring-shipments | en→https://www.eshsire.com/en/blog/the-real-cost-of-delayed-flooring-shipments; … | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保持 noindex |
| https://www.eshsire.com/es/blog/what-is-spc-flooring-commercial-projects | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/what-is-spc-flooring-commercial-projects | en→https://www.eshsire.com/en/blog/what-is-spc-flooring-commercial-projects; zh→… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/blog/what-makes-a-reliable-spc-flooring-manufacturer | blog-post | 200 | meta: index, follow | https://www.eshsire.com/es/blog/what-makes-a-reliable-spc-flooring-manufacturer | en→https://www.eshsire.com/en/blog/what-makes-a-reliable-spc-flooring-manufactur… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/cases/after-sales-reorder-follow-up | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/after-sales-reorder-follow-up | en→https://www.eshsire.com/en/cases/after-sales-reorder-follow-up; zh→https://ww… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/cases/loading-photos-video-records | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/loading-photos-video-records | en→https://www.eshsire.com/en/cases/loading-photos-video-records; zh→https://www… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/cases/packaging-label-checking | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/packaging-label-checking | en→https://www.eshsire.com/en/cases/packaging-label-checking; zh→https://www.esh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/cases/pre-shipment-quality-confirmation | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/pre-shipment-quality-confirmation | en→https://www.eshsire.com/en/cases/pre-shipment-quality-confirmation; zh→https:… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/cases/production-process-video-updates | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/production-process-video-updates | en→https://www.eshsire.com/en/cases/production-process-video-updates; zh→https:/… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/cases/production-schedule-updates | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/production-schedule-updates | en→https://www.eshsire.com/en/cases/production-schedule-updates; zh→https://www.… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/cases/sample-video-confirmation | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/sample-video-confirmation | en→https://www.eshsire.com/en/cases/sample-video-confirmation; zh→https://www.es… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/cases/specification-order-checklist | case-flow | 200 | meta: index, follow | https://www.eshsire.com/es/cases/specification-order-checklist | en→https://www.eshsire.com/en/cases/specification-order-checklist; zh→https://ww… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保留并增强内容 |
| https://www.eshsire.com/es/certifications | core-page | 200 | meta: index, follow | https://www.eshsire.com/es/certifications | en→https://www.eshsire.com/en/certifications; zh→https://www.eshsire.com/zh/cert… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/es/contact | contact | 200 | meta: index, follow | https://www.eshsire.com/es/contact | en→https://www.eshsire.com/en/contact; zh→https://www.eshsire.com/zh/contact; es… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/es/factory | factory | 200 | meta: index, follow | https://www.eshsire.com/es/factory | en→https://www.eshsire.com/en/factory; zh→https://www.eshsire.com/zh/factory; es… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/es/faq | core-page | 200 | meta: index, follow | https://www.eshsire.com/es/faq | en→https://www.eshsire.com/en/faq; zh→https://www.eshsire.com/zh/faq; es→https:/… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/es/oem-service | core-page | 200 | meta: index, follow | https://www.eshsire.com/es/oem-service | en→https://www.eshsire.com/en/oem-service; zh→https://www.eshsire.com/zh/oem-ser… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/es/spc-flooring | product-spc | 200 | meta: index, follow | https://www.eshsire.com/es/spc-flooring | en→https://www.eshsire.com/en/spc-flooring; zh→https://www.eshsire.com/zh/spc-fl… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/spc-flooring/specs | core-page | 200 | meta: index, follow | https://www.eshsire.com/es/spc-flooring/specs | en→https://www.eshsire.com/en/spc-flooring/specs; zh→https://www.eshsire.com/zh/… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/es/wall-panels | product-wall | 200 | meta: index, follow | https://www.eshsire.com/es/wall-panels | en→https://www.eshsire.com/en/wall-panels; zh→https://www.eshsire.com/zh/wall-pa… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh | homepage | 200 | meta: index, follow | https://www.eshsire.com/zh | en→https://www.eshsire.com/en; zh→https://www.eshsire.com/zh; es→https://www.esh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/about | core-page | 200 | meta: index, follow | https://www.eshsire.com/zh/about | en→https://www.eshsire.com/en/about; zh→https://www.eshsire.com/zh/about; es→htt… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/accessories | core-page | 200 | meta: index, follow | https://www.eshsire.com/zh/accessories | en→https://www.eshsire.com/en/accessories; zh→https://www.eshsire.com/zh/accesso… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog | blog-index | 200 | meta: index, follow | https://www.eshsire.com/zh/blog | en→https://www.eshsire.com/en/blog; zh→https://www.eshsire.com/zh/blog; es→https… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/7-mistakes-importing-spc-flooring-from-china | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/7-mistakes-importing-spc-flooring-from-china | en→https://www.eshsire.com/en/blog/7-mistakes-importing-spc-flooring-from-china;… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/choose-reliable-spc-flooring-supplier-china-2026 | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/choose-reliable-spc-flooring-supplier-china-2026 | en→https://www.eshsire.com/en/blog/choose-reliable-spc-flooring-supplier-china-2… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/factory-pricing-vs-trading-company-pricing-what-importers-need-to-know | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/factory-pricing-vs-trading-company-pricing-what-importers-need-to-know | en→https://www.eshsire.com/en/blog/factory-pricing-vs-trading-company-pricing-wh… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/how-flooring-distributors-can-increase-profit-margins-without-raising-prices | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/how-flooring-distributors-can-increase-profit-margins-without-raising-prices | en→https://www.eshsire.com/en/blog/how-flooring-distributors-can-increase-profit… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/how-successful-flooring-importers-reduce-sourcing-risks | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/how-successful-flooring-importers-reduce-sourcing-risks | en→https://www.eshsire.com/en/blog/how-successful-flooring-importers-reduce-sour… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/how-to-evaluate-an-spc-flooring-supplier-before-your-first-order | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/how-to-evaluate-an-spc-flooring-supplier-before-your-first-order | en→https://www.eshsire.com/en/blog/how-to-evaluate-an-spc-flooring-supplier-befo… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/load-40hq-container-spc-flooring-export | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/load-40hq-container-spc-flooring-export | en→https://www.eshsire.com/en/blog/load-40hq-container-spc-flooring-export; zh→h… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/spc-flooring-container-loading-strategies-that-reduce-import-costs | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/spc-flooring-container-loading-strategies-that-reduce-import-costs | en→https://www.eshsire.com/en/blog/spc-flooring-container-loading-strategies-tha… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/spc-flooring-factory-audit-checklist-for-importers | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/spc-flooring-factory-audit-checklist-for-importers | en→https://www.eshsire.com/en/blog/spc-flooring-factory-audit-checklist-for-impo… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/spc-flooring-factory-price-bulk-container-orders | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/spc-flooring-factory-price-bulk-container-orders | en→https://www.eshsire.com/en/blog/spc-flooring-factory-price-bulk-container-ord… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/spc-flooring-quality-control-before-shipment | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/spc-flooring-quality-control-before-shipment | en→https://www.eshsire.com/en/blog/spc-flooring-quality-control-before-shipment;… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/spc-flooring-supplier-diversification-strategies | blog-post | 404 | meta: noindex | — | — | 是 | 否 | Sitemap 包含 404 URL；Sitemap 包含 noindex 页面 | 从 sitemap 删除 |
| https://www.eshsire.com/zh/blog/spc-flooring-supplier-manufacturer-china | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/spc-flooring-supplier-manufacturer-china | en→https://www.eshsire.com/en/blog/spc-flooring-supplier-manufacturer-china; zh→… | 是 | 是 | Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/spc-flooring-supply-hotel-project-africa | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/spc-flooring-supply-hotel-project-africa | en→https://www.eshsire.com/en/blog/spc-flooring-supply-hotel-project-africa; zh→… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/the-real-cost-of-delayed-flooring-shipments | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/the-real-cost-of-delayed-flooring-shipments | en→https://www.eshsire.com/en/blog/the-real-cost-of-delayed-flooring-shipments; … | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 保持 noindex |
| https://www.eshsire.com/zh/blog/what-is-spc-flooring-commercial-projects | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/what-is-spc-flooring-commercial-projects | en→https://www.eshsire.com/en/blog/what-is-spc-flooring-commercial-projects; zh→… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/blog/what-makes-a-reliable-spc-flooring-manufacturer | blog-post | 200 | meta: index, follow | https://www.eshsire.com/zh/blog/what-makes-a-reliable-spc-flooring-manufacturer | en→https://www.eshsire.com/en/blog/what-makes-a-reliable-spc-flooring-manufactur… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复；H1 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/cases-image-check | dev-audit | 200 | meta: noindex, nofollow | — | — | 否 | 否 | 内部图片审核页，不应收录 | 保持 noindex |
| https://www.eshsire.com/zh/cases/after-sales-reorder-follow-up | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/after-sales-reorder-follow-up | en→https://www.eshsire.com/en/cases/after-sales-reorder-follow-up; zh→https://ww… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/cases/loading-photos-video-records | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/loading-photos-video-records | en→https://www.eshsire.com/en/cases/loading-photos-video-records; zh→https://www… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/cases/packaging-label-checking | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/packaging-label-checking | en→https://www.eshsire.com/en/cases/packaging-label-checking; zh→https://www.esh… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/cases/pre-shipment-quality-confirmation | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/pre-shipment-quality-confirmation | en→https://www.eshsire.com/en/cases/pre-shipment-quality-confirmation; zh→https:… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/cases/production-process-video-updates | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/production-process-video-updates | en→https://www.eshsire.com/en/cases/production-process-video-updates; zh→https:/… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/cases/production-schedule-updates | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/production-schedule-updates | en→https://www.eshsire.com/en/cases/production-schedule-updates; zh→https://www.… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/cases/sample-video-confirmation | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/sample-video-confirmation | en→https://www.eshsire.com/en/cases/sample-video-confirmation; zh→https://www.es… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/cases/specification-order-checklist | case-flow | 200 | meta: index, follow | https://www.eshsire.com/zh/cases/specification-order-checklist | en→https://www.eshsire.com/en/cases/specification-order-checklist; zh→https://ww… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/certifications | core-page | 200 | meta: index, follow | https://www.eshsire.com/zh/certifications | en→https://www.eshsire.com/en/certifications; zh→https://www.eshsire.com/zh/cert… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/contact | contact | 200 | meta: index, follow | https://www.eshsire.com/zh/contact | en→https://www.eshsire.com/en/contact; zh→https://www.eshsire.com/zh/contact; es… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/factory | factory | 200 | meta: index, follow | https://www.eshsire.com/zh/factory | en→https://www.eshsire.com/en/factory; zh→https://www.eshsire.com/zh/factory; es… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/faq | core-page | 200 | meta: index, follow | https://www.eshsire.com/zh/faq | en→https://www.eshsire.com/en/faq; zh→https://www.eshsire.com/zh/faq; es→https:/… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/oem-service | core-page | 200 | meta: index, follow | https://www.eshsire.com/zh/oem-service | en→https://www.eshsire.com/en/oem-service; zh→https://www.eshsire.com/zh/oem-ser… | 是 | 是 | — | 暂时无需处理 |
| https://www.eshsire.com/zh/spc-flooring | product-spc | 200 | meta: index, follow | https://www.eshsire.com/zh/spc-flooring | en→https://www.eshsire.com/en/spc-flooring; zh→https://www.eshsire.com/zh/spc-fl… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/spc-flooring/specs | core-page | 200 | meta: index, follow | https://www.eshsire.com/zh/spc-flooring/specs | en→https://www.eshsire.com/en/spc-flooring/specs; zh→https://www.eshsire.com/zh/… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |
| https://www.eshsire.com/zh/wall-panels | product-wall | 200 | meta: index, follow | https://www.eshsire.com/zh/wall-panels | en→https://www.eshsire.com/en/wall-panels; zh→https://www.eshsire.com/zh/wall-pa… | 是 | 是 | Title 与其他可索引 URL 重复；Meta description 重复 | 暂时无需处理 |

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
| `npm run build`（上次询盘联调） | ✅ |

**结论：** SEO 索引逻辑整体健康，**建议先修复 sitemap 404 后再做 Vercel Preview 部署**；GSC 中 13 条 noindex 为预期行为，无需 panic。

---

*报告由 `scripts/google-indexing-audit.mjs` 自动生成，原始数据见 `docs/google-indexing-audit-data.json`。*
