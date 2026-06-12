import { toWebhookPayload, type StoredInquiryLead } from "./types";

export type WebhookSyncResult =
  | { ok: true; skipped?: false }
  | { ok: true; skipped: true; reason: "missing_webhook_url" }
  | { ok: false; error: string; statusCode?: number };

/**
 * POST inquiry to INQUIRY_WEBHOOK_URL (Google Sheets / Zapier / Apps Script).
 */
export async function syncInquiryLead(lead: StoredInquiryLead): Promise<WebhookSyncResult> {
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return { ok: true, skipped: true, reason: "missing_webhook_url" };
  }

  const payload = toWebhookPayload(lead);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[inquiries] webhook failed: id=${lead.id} status=${response.status} detail=${detail.slice(0, 200)}`
      );
      return { ok: false, error: `HTTP ${response.status}`, statusCode: response.status };
    }

    console.info(`[inquiries] webhook success: id=${lead.id} sourcePage=${lead.sourcePage}`);
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown webhook error";
    console.error(`[inquiries] webhook error: id=${lead.id} message=${message.slice(0, 120)}`);
    return { ok: false, error: message };
  }
}
