import {
  CUSTOMER_TYPES,
  PRODUCT_INTERESTS,
  type CustomerType,
  type InquiryLeadPayload,
  type ProductInterest,
} from "./types";

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  whatsapp: 32,
  country: 100,
  quantity: 120,
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
    !isNonEmptyString(data.email) ||
    !isNonEmptyString(data.whatsapp) ||
    !isNonEmptyString(data.country) ||
    !isNonEmptyString(data.quantity) ||
    !isNonEmptyString(data.message) ||
    !PRODUCT_INTERESTS.includes(productInterest) ||
    !CUSTOMER_TYPES.includes(customerType)
  ) {
    return { ok: false, reason: "missing_required" };
  }

  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();
  const whatsapp = data.whatsapp.trim();
  const country = data.country.trim();
  const quantity = data.quantity.trim();
  const targetPrice = isNonEmptyString(data.targetPrice) ? data.targetPrice.trim() : "";
  const message = data.message.trim();

  if (!withinLimit(name, FIELD_LIMITS.name)) return { ok: false, reason: "name_too_long" };
  if (!withinLimit(email, FIELD_LIMITS.email) || !EMAIL_RE.test(email)) {
    return { ok: false, reason: "invalid_email" };
  }
  if (!withinLimit(whatsapp, FIELD_LIMITS.whatsapp) || !WHATSAPP_RE.test(whatsapp)) {
    return { ok: false, reason: "invalid_whatsapp" };
  }
  const digitCount = whatsapp.replace(/\D/g, "").length;
  if (digitCount < 8) return { ok: false, reason: "invalid_whatsapp" };
  if (!withinLimit(country, FIELD_LIMITS.country)) return { ok: false, reason: "country_too_long" };
  if (!withinLimit(quantity, FIELD_LIMITS.quantity)) return { ok: false, reason: "quantity_too_long" };
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
      email,
      whatsapp,
      country,
      productInterest,
      quantity,
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
