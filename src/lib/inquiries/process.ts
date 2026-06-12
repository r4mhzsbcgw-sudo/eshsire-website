import { appendInquiryLead, markInquiryWebhookFailed, markInquiryWebhookSynced } from "./store";
import { sendAdminInquiryEmail, sendCustomerConfirmationEmail, logCustomerEmailResult } from "./email";
import { syncInquiryLead } from "./sync";
import { buildNextFollowUpDate, type InquiryLeadPayload, type StoredInquiryLead } from "./types";
import { isDuplicateSubmission } from "./guard";

export type ProcessResult =
  | { ok: true; lead: StoredInquiryLead; duplicate?: boolean; adminEmail: boolean; webhook: boolean }
  | { ok: false; reason: "delivery_failed" };

function createLead(payload: InquiryLeadPayload): StoredInquiryLead {
  const createdAt = new Date().toISOString();
  return {
    ...payload,
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt,
    nextFollowUpDate: buildNextFollowUpDate(new Date(createdAt)),
    status: "New",
  };
}

function isDevLocalStore(): boolean {
  return process.env.NODE_ENV === "development";
}

export async function processInquirySubmission(payload: InquiryLeadPayload): Promise<ProcessResult> {
  if (isDuplicateSubmission(payload.email, payload.whatsapp, payload.message)) {
    console.warn("[inquiries] duplicate submission suppressed");
    const lead = createLead(payload);
    return { ok: true, lead, duplicate: true, adminEmail: false, webhook: false };
  }

  let lead = createLead(payload);

  if (isDevLocalStore()) {
    try {
      lead = await appendInquiryLead(payload);
      console.info(`[inquiries] saved locally: id=${lead.id}`);
    } catch (err) {
      console.error("[inquiries] local save failed:", err instanceof Error ? err.message : err);
    }
  }

  const adminResult = await sendAdminInquiryEmail(lead);
  const webhookResult = await syncInquiryLead(lead);

  const webhookOk = webhookResult.ok && !webhookResult.skipped;
  const webhookSkipped = webhookResult.ok && webhookResult.skipped;

  if (webhookOk) {
    console.info(`[inquiries] webhook delivered: id=${lead.id}`);
    if (isDevLocalStore()) await markInquiryWebhookSynced(lead.id).catch(() => {});
  } else if (!webhookSkipped) {
    console.error(`[inquiries] webhook delivery failed: id=${lead.id}`);
    if (isDevLocalStore()) await markInquiryWebhookFailed(lead.id).catch(() => {});
  }

  const delivered = adminResult.ok || webhookOk;

  if (!delivered) {
    console.error(`[inquiries] delivery failed: id=${lead.id} admin=${adminResult.ok} webhook=${webhookOk}`);
    return { ok: false, reason: "delivery_failed" };
  }

  const customerResult = await sendCustomerConfirmationEmail(lead);
  logCustomerEmailResult(lead.id, lead.email, lead.locale, customerResult);

  return {
    ok: true,
    lead,
    adminEmail: adminResult.ok,
    webhook: webhookOk,
  };
}
