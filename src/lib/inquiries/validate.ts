import {
  CUSTOMER_TYPES,
  PRODUCT_INTERESTS,
  type CustomerType,
  type InquiryLeadPayload,
  type ProductInterest,
} from "./types";

export const FIELD_LIMITS = {
  name: 120,
  company: 200,
  email: 254,
  whatsapp: 32,
  country: 100,
  quantity: 120,
  targetPort: 120,
  oemNeeded: 32,
  targetPrice: 80,
  message: 5000,
  sourcePage: 120,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_RE = /^\+?[\d\s().-]{8,32}$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function withinLimit(value: string, max: number): boolean {
  return value.length <= max;
}

export type ValidationResult =
  | { ok: true; payload: InquiryLeadPayload }
  | { ok: false; reason: string };

export function validateInquiryPayload(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, reason: "invalid_body" };
  }

  const data = body as Record<string, unknown>;
  const productInterest = data.productInterest as ProductInterest;
  const customerType = data.customerType as CustomerType;

  if (
    !isNonEmptyString(data.name) ||
    !isNonEmptyString(data.country) ||
    !isNonEmptyString(data.message) ||
    !PRODUCT_INTERESTS.includes(productInterest) ||
    !CUSTOMER_TYPES.includes(customerType)
  ) {
    return { ok: false, reason: "missing_required" };
  }

  const name = data.name.trim();
  const company = isNonEmptyString(data.company) ? data.company.trim() : "";
  const email = isNonEmptyString(data.email) ? data.email.trim().toLowerCase() : "";
  const whatsapp = isNonEmptyString(data.whatsapp) ? data.whatsapp.trim() : "";
  const country = data.country.trim();
  const quantity = isNonEmptyString(data.quantity) ? data.quantity.trim() : "";
  const targetPort = isNonEmptyString(data.targetPort) ? data.targetPort.trim() : "";
  const oemNeeded = isNonEmptyString(data.oemNeeded) ? data.oemNeeded.trim() : "";
  const targetPrice = isNonEmptyString(data.targetPrice) ? data.targetPrice.trim() : "";
  const message = data.message.trim();

  if (!email && !whatsapp) {
    return { ok: false, reason: "contact_required" };
  }

  if (!withinLimit(name, FIELD_LIMITS.name)) return { ok: false, reason: "name_too_long" };
  if (company && !withinLimit(company, FIELD_LIMITS.company)) return { ok: false, reason: "company_too_long" };

  if (email && (!withinLimit(email, FIELD_LIMITS.email) || !EMAIL_RE.test(email))) {
    return { ok: false, reason: "invalid_email" };
  }

  if (whatsapp) {
    if (!withinLimit(whatsapp, FIELD_LIMITS.whatsapp) || !WHATSAPP_RE.test(whatsapp)) {
      return { ok: false, reason: "invalid_whatsapp" };
    }
    const digitCount = whatsapp.replace(/\D/g, "").length;
    if (digitCount < 8) return { ok: false, reason: "invalid_whatsapp" };
  }

  if (!withinLimit(country, FIELD_LIMITS.country)) return { ok: false, reason: "country_too_long" };
  if (quantity && !withinLimit(quantity, FIELD_LIMITS.quantity)) return { ok: false, reason: "quantity_too_long" };
  if (targetPort && !withinLimit(targetPort, FIELD_LIMITS.targetPort)) {
    return { ok: false, reason: "target_port_too_long" };
  }
  if (oemNeeded && !withinLimit(oemNeeded, FIELD_LIMITS.oemNeeded)) {
    return { ok: false, reason: "oem_needed_too_long" };
  }
  if (targetPrice && !withinLimit(targetPrice, FIELD_LIMITS.targetPrice)) {
    return { ok: false, reason: "target_price_too_long" };
  }
  if (!withinLimit(message, FIELD_LIMITS.message)) return { ok: false, reason: "message_too_long" };

  const sourcePage =
    isNonEmptyString(data.sourcePage) ? data.sourcePage.trim()
    : isNonEmptyString(data.source) ? data.source.trim()
    : "website";

  if (!withinLimit(sourcePage, FIELD_LIMITS.sourcePage)) {
    return { ok: false, reason: "source_page_too_long" };
  }

  const userAgent = isNonEmptyString(data.userAgent) ? data.userAgent.trim().slice(0, 512) : undefined;

  return {
    ok: true,
    payload: {
      name,
      company,
      email,
      whatsapp,
      country,
      productInterest,
      quantity,
      targetPort,
      oemNeeded,
      targetPrice,
      customerType,
      message,
      locale: isNonEmptyString(data.locale) ? data.locale.trim().slice(0, 8) : "en",
      sourcePage,
      userAgent,
    },
  };
}

export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  const trap = body.website;
  return typeof trap === "string" && trap.trim().length > 0;
}
