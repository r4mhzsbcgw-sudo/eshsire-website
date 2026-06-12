# Eshsire 官网 Preview 人工验收清单

**分支:** `release/seo-inquiry-finalization`  
**Commit:** `f6db796`（含 `3cc06c2` 主发布提交）  
**Production:** 未发布 — 需您明确回复「批准发布 Production」后才可上线

---

## 获取 Preview URL

1. 打开 [Vercel Dashboard](https://vercel.com/dashboard) → 项目 **eshsire-website**（或对应项目名）
2. 找到分支 `release/seo-inquiry-finalization` 的最新 **Preview** 部署
3. 将下方 `{PREVIEW}` 替换为该部署域名（例如 `https://eshsire-website-xxx.vercel.app`）

> Vercel CLI 在本环境未完成 OAuth 登录，Preview 由 Git push 触发自动构建。若未出现部署，请在 Dashboard 手动 Redeploy 该分支。

---

## Preview 环境变量（Vercel → Settings → Environment Variables → Preview）

| 变量名 | 必填 | 示例 / 说明 |
|--------|------|-------------|
| `RESEND_API_KEY` | 是 | Resend 控制台 API Key（仅 Preview，勿提交仓库） |
| `INQUIRY_NOTIFICATION_TO` | 是 | `jason@eshsiregroup.com` |
| `INQUIRY_FROM_EMAIL` | 是 | `Eshsire Website <website@notify.eshsiregroup.com>` |
| `INQUIRY_WEBHOOK_URL` | 否 | Google Sheet / Apps Script URL（可选） |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | 是 | 例如 `8615313057097`（用于失败时 WhatsApp 按钮） |

配置后 **Redeploy Preview** 使变量生效。

---

## 可点击验收地址

将 `{PREVIEW}` 替换为实际 Preview 域名：

| 页面 | URL |
|------|-----|
| 中文首页 | `{PREVIEW}/zh` |
| 英文首页 | `{PREVIEW}/en` |
| 西班牙语首页 | `{PREVIEW}/es` |
| 中文联系页 | `{PREVIEW}/zh/contact` |
| 英文联系页 | `{PREVIEW}/en/contact` |
| SPC 产品页 | `{PREVIEW}/en/spc-flooring` |
| 墙板产品页 | `{PREVIEW}/en/wall-panels` |
| 英文博客示例 | `{PREVIEW}/en/blog/what-is-spc-flooring-commercial-projects` |
| Sitemap | `{PREVIEW}/sitemap.xml` |
| Robots | `{PREVIEW}/robots.txt` |

### SEO 抽检地址

| 检查项 | URL | 预期 |
|--------|-----|------|
| Cases noindex | `{PREVIEW}/en/cases/sample-video-confirmation` | HTTP 200，`robots: noindex, follow` |
| Legacy 308 | `{PREVIEW}/en/projects/africa-distributor` | 单次 308 → `/en/cases/specification-order-checklist` |
| 非核心语言 noindex | `{PREVIEW}/ar` | `noindex`（13 种非 en/zh/es 语言） |

---

## 人工测试步骤

### 1. 提交英文测试询盘

1. 打开 `{PREVIEW}/en/contact`
2. 填写完整表单（真实或测试邮箱均可）
3. 提交后应看到 **成功** 提示（非 API 错误信息）

### 2. 检查 Jason 管理员邮件

- 收件箱：`jason@eshsiregroup.com`
- 主题格式：`[New Website Inquiry] {Country} | {Product} | {Name}`
- 正文含：提交时间、姓名、国家、邮箱、WhatsApp、客户类型、产品、数量、目标价、留言、语言、来源页、下次跟进时间、询盘 ID
- **Reply-To** 应为客户填写的邮箱

### 3. 邮件内快捷操作

- 点击「Reply to customer email」→ 打开 mailto 客户邮箱
- 点击「Open customer WhatsApp」→ 打开 wa.me 链接
- 复制询盘 ID

### 4. 客户自动确认邮件

- 客户邮箱收到确认信（英文表单 → 英文主题 *We received your inquiry — Eshsire Group*）
- 中文 / 西班牙语表单分别收到对应语言版本

### 5. 重复提交拦截

- 10 分钟内用 **相同 email + WhatsApp + message** 再次提交
- API 返回成功但 **不应** 再次向 Jason 发送通知邮件

### 6. Honeypot（可选）

- 用 API 或 DevTools 向 `website` 字段填入非空值 → 应静默成功，无邮件

### 7. 交付失败 UI（可选）

- 临时移除 Preview 的 `RESEND_API_KEY` 与 `INQUIRY_WEBHOOK_URL` 并 Redeploy
- 提交表单 → 应显示失败提示 + **WhatsApp** + **邮件** 按钮（`mailto:jason@eshsiregroup.com`）
- 恢复环境变量

### 8. 移动端

- 手机或 DevTools 模拟器检查首页、产品页、联系页表单布局

---

## 自动化验证（本地 / Preview）

```bash
npm run build
node scripts/verify-sitemap.mjs {PREVIEW}
node scripts/check-redirects.mjs {PREVIEW}
node scripts/test-inquiry-email-e2e.mjs   # TEST_BASE_URL={PREVIEW}
```

本地已通过：`verify-sitemap` **84/84 URL 200**；`/projects/*` **308**；`/cases/*` **noindex, follow**。

---

## Production 发布门

**在您明确回复「批准发布 Production」之前，不会：**

- 合并到 `main`
- 配置 Production 环境变量
- 发布 `https://www.eshsire.com`
- 提交真实 Production 询盘

批准后需完成：Production 环境变量、合并、线上 sitemap/robots/canonical/hreflang 复检、Search Console 重新提交 sitemap。
