# /cases/* 页面质量审核

**生成时间：** 2026-06-12T09:07:03.843Z  
**范围：** 8 个可视化跟单 flow 详情页（en 代表 URL；zh/es 结构相同）

## 审核结论

全部 8 页均为**同一五段式模板**下的订单跟单流程说明，环节主题不同但**无独立搜索意图**，不适合作为独立 landing page 争夺排名。首页 `#projects` 区块已承载差异化说明，详情页保留 **noindex + follow** 供已进站用户阅读，**已从 sitemap 移除**。

| URL | 中文标题 | 英文标题 | 正文字数(EN) | 独立内容 | 相似度 | 内链 | 在 sitemap | robots | 建议 |
|-----|----------|----------|--------------|----------|--------|------|------------|--------|------|
| `https://www.eshsire.com/en/cases/sample-video-confirmation` | 样品视频确认 | Sample Video Confirmation | EN 137 词 / ZH ~270 字 | 否（模板化流程说明） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 27%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |
| `https://www.eshsire.com/en/cases/specification-order-checklist` | 规格与订单清单确认 | Specification & Order Checklist Confirmation | EN 121 词 / ZH ~259 字 | 部分独立（环节主题不同，但结构相同） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 26%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |
| `https://www.eshsire.com/en/cases/production-schedule-updates` | 生产排期同步 | Production Schedule Updates | EN 117 词 / ZH ~246 字 | 部分独立（环节主题不同，但结构相同） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 23%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |
| `https://www.eshsire.com/en/cases/production-process-video-updates` | 生产过程视频更新 | Production Process Video Updates | EN 129 词 / ZH ~256 字 | 部分独立（环节主题不同，但结构相同） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 30%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |
| `https://www.eshsire.com/en/cases/packaging-label-checking` | 包装与标签检查 | Packaging & Label Checking | EN 121 词 / ZH ~238 字 | 部分独立（环节主题不同，但结构相同） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 32%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |
| `https://www.eshsire.com/en/cases/pre-shipment-quality-confirmation` | 发货前质量确认 | Pre-shipment Quality Confirmation | EN 114 词 / ZH ~235 字 | 部分独立（环节主题不同，但结构相同） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 33%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |
| `https://www.eshsire.com/en/cases/loading-photos-video-records` | 装柜照片与视频记录 | Loading Photos & Video Records | EN 121 词 / ZH ~219 字 | 部分独立（环节主题不同，但结构相同） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 24%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |
| `https://www.eshsire.com/en/cases/after-sales-reorder-follow-up` | 售后与复购跟进 | After-sales & Reorder Follow-up | EN 132 词 / ZH ~250 字 | 部分独立（环节主题不同，但结构相同） | 中（五段式模板（问题/顾虑/协作/价值/适合客户），与最相近页词汇重叠约 26%） | 首页 #projects 卡片 + 详情页相关环节互链 | 否（第一阶段已移除） | noindex, follow | **noindex** |

## index / noindex 清单

### 建议 **noindex**（8 页 × 3 语言 = 24 URL，均已 noindex）

- `/cases/sample-video-confirmation`（en / zh / es）— Sample Video Confirmation
- `/cases/specification-order-checklist`（en / zh / es）— Specification & Order Checklist Confirmation
- `/cases/production-schedule-updates`（en / zh / es）— Production Schedule Updates
- `/cases/production-process-video-updates`（en / zh / es）— Production Process Video Updates
- `/cases/packaging-label-checking`（en / zh / es）— Packaging & Label Checking
- `/cases/pre-shipment-quality-confirmation`（en / zh / es）— Pre-shipment Quality Confirmation
- `/cases/loading-photos-video-records`（en / zh / es）— Loading Photos & Video Records
- `/cases/after-sales-reorder-follow-up`（en / zh / es）— After-sales & Reorder Follow-up

### 建议 **index**

无。跟单 flow 详情页不单独 index；核心价值在首页跟单板块与产品/博客/联系页。

---

*由 `scripts/audit-cases-pages.mjs` 从 `case-content.ts` 生成。*
