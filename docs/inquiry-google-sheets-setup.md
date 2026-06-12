# Inquiry Form → Google Sheets Setup

## 1. Google Sheet table headers (Row 1)

Create a sheet named **Inquiries** with these columns in order:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| createdAt | name | email | whatsapp | country | productInterest | quantity | targetPrice | customerType | message | locale | sourcePage | userAgent | status | nextFollowUpDate | followUpOwner | notes |

**Copy-paste header row:**

```
createdAt	name	email	whatsapp	country	productInterest	quantity	targetPrice	customerType	message	locale	sourcePage	userAgent	status	nextFollowUpDate	followUpOwner	notes
```

### Field notes

| Field | Source | Notes |
|-------|--------|-------|
| createdAt | API auto | ISO 8601 UTC timestamp |
| name | Form | Customer name |
| email | Form | Contact email |
| whatsapp | Form | WhatsApp number |
| country | Form | Target market / country |
| productInterest | Form | e.g. `spc-flooring`, `wall-panels` |
| quantity | Form | e.g. `5000 sqm` or `2 containers` |
| targetPrice | Form | Optional target price |
| customerType | Form | `distributor`, `wholesaler`, etc. |
| message | Form | Project details |
| locale | Form | `en`, `zh`, etc. |
| sourcePage | Form | e.g. `homepage-quote`, `contact-page` |
| userAgent | Browser | Client user-agent string |
| status | API auto | Default `New` |
| nextFollowUpDate | API auto | ISO 8601, default +1 day |
| followUpOwner | Manual | Leave empty on intake; assign in Sheet |
| notes | Manual | Internal follow-up notes |

---

## 2. Google Apps Script (`doPost`)

1. Open the Google Sheet → **Extensions → Apps Script**
2. Replace `Code.gs` with the script in `docs/inquiry-apps-script.gs`
3. **Important:** Sheet tab name must be exactly **`Inquiries`** (matches `SHEET_NAME` in script)
4. Row 1 headers must match exactly (see section 1)
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the Web App URL (ends with `/exec`) → set in `.env.local`:
   ```env
   INQUIRY_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
7. Restart dev server: `npm run dev`
8. Run live test: `node scripts/test-google-sheet-live.mjs`

**If you change the script after first deploy:** Deploy → **Manage deployments** → edit → **New version** → Deploy (URL stays the same).

---

## 3. Environment variable

```env
# .env.local — never commit
INQUIRY_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

See `.env.example` for the placeholder only.

---

## 4. End-to-end test checklist

- [ ] Submit test inquiry on `/zh#get-quote` or `/contact`
- [ ] Page shows success message
- [ ] Terminal logs `[inquiries] webhook success`
- [ ] New row in Google Sheet
- [ ] Local backup in `data/inquiries/leads.json` (gitignored)
- [ ] `nextFollowUpDate` populated (+1 day)
- [ ] `sourcePage` and `userAgent` written

Run automated local checks:

```bash
node scripts/test-inquiry-e2e.mjs
```
