import { Resend } from "resend";
import type { StoredInquiryLead } from "./types";

export type EmailSendResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string; errorCode?: string };

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function adminTo(): string {
  return process.env.INQUIRY_NOTIFICATION_TO?.trim() || "jason@eshsiregroup.com";
}

function fromAddress(): string | null {
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  return from || null;
}

function whatsappDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

function productLabel(lead: StoredInquiryLead): string {
  return lead.productInterest.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function adminSubject(lead: StoredInquiryLead): string {
  return `[New Website Inquiry] ${lead.country} | ${productLabel(lead)} | ${lead.name}`;
}

function adminHtml(lead: StoredInquiryLead): string {
  const wa = whatsappDigits(lead.whatsapp);
  const waLink = wa ? `https://wa.me/${wa}` : "#";
  const mailto = `mailto:${encodeURIComponent(lead.email)}`;
  const rows = [
    ["Submitted at", lead.createdAt],
    ["Inquiry ID", lead.id],
    ["Name", lead.name],
    ["Country", lead.country],
    ["Email", lead.email],
    ["WhatsApp", lead.whatsapp],
    ["Customer type", lead.customerType],
    ["Product interest", productLabel(lead)],
    ["Quantity", lead.quantity],
    ["Target price", lead.targetPrice || "—"],
    ["Message", lead.message],
    ["Locale", lead.locale],
    ["Source page", lead.sourcePage],
    ["Next follow-up", lead.nextFollowUpDate],
  ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;width:180px;">${label}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5;">
<h2 style="margin:0 0 16px;">New website inquiry</h2>
<table style="border-collapse:collapse;width:100%;max-width:640px;">${table}</table>
<p style="margin:24px 0 8px;"><strong>Quick actions</strong></p>
<p style="margin:0 0 8px;"><a href="${mailto}">Reply to customer email</a></p>
<p style="margin:0 0 8px;"><a href="${waLink}">Open customer WhatsApp</a></p>
<p style="margin:0 0 8px;">Inquiry ID: <code>${escapeHtml(lead.id)}</code> (copy from subject line or this email)</p>
</body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CUSTOMER_CONFIRM = {
  en: {
    subject: "We received your inquiry — Eshsire Group",
    html: `<p>Thank you for contacting Eshsire Group.</p>
<p>We have received your product requirements. Our team will review the requested product, quantity, target price, packaging and shipping requirements, and contact you as soon as possible.</p>
<p>Once an order is confirmed, our team can provide visual production follow-up through photos and videos, including samples, production, packaging, inspection and container loading.</p>
<p>We do not focus only on one-time transactions. Once we accept an order, we take responsibility until the end.</p>
<p>Best regards,<br/>Eshsire Group</p>`,
  },
  zh: {
    subject: "我们已收到您的询价 — Eshsire Group",
    html: `<p>感谢您联系 Eshsire Group。</p>
<p>我们已收到您的产品需求。团队将审核您所需的产品、数量、目标价格、包装与运输要求，并尽快与您联系。</p>
<p>订单确认后，我们的跟单团队可通过图片和视频同步样品、生产、包装、质检和装柜等关键节点进度。</p>
<p>我们不仅关注一次性交易。一旦接单，我们会负责到底。</p>
<p>此致<br/>Eshsire Group</p>`,
  },
  es: {
    subject: "Hemos recibido su consulta — Eshsire Group",
    html: `<p>Gracias por contactar a Eshsire Group.</p>
<p>Hemos recibido sus requisitos de producto. Nuestro equipo revisará el producto, cantidad, precio objetivo, empaque y envío, y se pondrá en contacto lo antes posible.</p>
<p>Una vez confirmado el pedido, podemos ofrecer seguimiento visual con fotos y videos: muestras, producción, empaque, inspección y carga de contenedor.</p>
<p>No nos limitamos a una sola transacción. Una vez aceptamos un pedido, asumimos la responsabilidad hasta el final.</p>
<p>Saludos cordiales,<br/>Eshsire Group</p>`,
  },
} as const;

function confirmLocale(locale: string): keyof typeof CUSTOMER_CONFIRM {
  const base = locale.trim().toLowerCase().split("-")[0];
  if (base === "zh" || base === "es") return base;
  return "en";
}

function redactEmail(email: string): string {
  const at = email.indexOf("@");
  if (at <= 1) return "redacted";
  return `${email[0]}***${email.slice(at)}`;
}

export function logCustomerEmailResult(
  inquiryId: string,
  customerEmail: string,
  locale: string,
  result: EmailSendResult
): void {
  const loc = confirmLocale(locale);
  const to = redactEmail(customerEmail);

  if (result.ok) {
    console.info(
      `[inquiries] customerEmailSent id=${inquiryId} customerEmailAttempted=true customerEmailSent=true messageId=${result.messageId ?? "unknown"} to=${to} locale=${loc}`
    );
    return;
  }

  console.warn(
    `[inquiries] customerEmailFailed id=${inquiryId} customerEmailAttempted=true customerEmailSent=false errorCode=${result.errorCode ?? "unknown"} error=${result.error.slice(0, 200)} to=${to} locale=${loc}`
  );
}

export async function sendAdminInquiryEmail(lead: StoredInquiryLead): Promise<EmailSendResult> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "missing_resend_api_key" };
  }

  const from = fromAddress();
  if (!from) {
    return { ok: false, error: "missing_inquiry_from_email" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [adminTo()],
      replyTo: lead.email,
      subject: adminSubject(lead),
      html: adminHtml(lead),
    });

    if (error) {
      console.error(`[inquiries] admin email failed: id=${lead.id} code=${error.name}`);
      return { ok: false, error: error.message || "send_failed", errorCode: error.name };
    }

    console.info(`[inquiries] admin email sent: id=${lead.id} to=redacted messageId=${data?.id ?? "unknown"}`);
    return { ok: true, messageId: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error(`[inquiries] admin email error: id=${lead.id} message=${message.slice(0, 120)}`);
    return { ok: false, error: message };
  }
}

export async function sendCustomerConfirmationEmail(lead: StoredInquiryLead): Promise<EmailSendResult> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "missing_resend_api_key", errorCode: "missing_resend_api_key" };
  }

  const from = fromAddress();
  if (!from) {
    return { ok: false, error: "missing_inquiry_from_email", errorCode: "missing_inquiry_from_email" };
  }

  const loc = confirmLocale(lead.locale);
  const copy = CUSTOMER_CONFIRM[loc];

  console.info(
    `[inquiries] customerEmailAttempted id=${lead.id} customerEmailAttempted=true locale=${loc} to=${redactEmail(lead.email)}`
  );

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [lead.email],
      replyTo: adminTo(),
      subject: copy.subject,
      html: copy.html,
    });

    if (error) {
      return { ok: false, error: error.message || "send_failed", errorCode: error.name };
    }

    return { ok: true, messageId: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    const errorCode = err instanceof Error && "name" in err ? String(err.name) : "exception";
    return { ok: false, error: message, errorCode };
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.INQUIRY_FROM_EMAIL?.trim());
}
