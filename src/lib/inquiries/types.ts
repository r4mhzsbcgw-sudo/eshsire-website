export const CUSTOMER_TYPES = [
  "distributor",
  "wholesaler",
  "contractor",
  "oem-brand",
  "retailer",
  "other",
] as const;

export type CustomerType = (typeof CUSTOMER_TYPES)[number];

export const PRODUCT_INTERESTS = [
  "spc-flooring",
  "wall-panels",
  "uv-panels",
  "accessories",
  "mixed-container",
  "oem",
] as const;

export type ProductInterest = (typeof PRODUCT_INTERESTS)[number];

export type InquiryLeadPayload = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  productInterest: ProductInterest;
  quantity: string;
  targetPort: string;
  oemNeeded: string;
  targetPrice: string;
  customerType: CustomerType;
  message: string;
  locale: string;
  sourcePage: string;
  userAgent?: string;
};

export type StoredInquiryLead = InquiryLeadPayload & {
  id: string;
  createdAt: string;
  nextFollowUpDate: string;
  status: "New" | "synced" | "webhook_failed";
};

/** Flat payload POSTed to INQUIRY_WEBHOOK_URL (Google Sheets / Zapier / Apps Script). */
export type InquiryWebhookPayload = {
  createdAt: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  productInterest: ProductInterest;
  quantity: string;
  targetPort: string;
  oemNeeded: string;
  targetPrice: string;
  customerType: CustomerType;
  message: string;
  locale: string;
  sourcePage: string;
  userAgent: string;
  status: "New";
  nextFollowUpDate: string;
};

export function buildNextFollowUpDate(from = new Date()): string {
  const next = new Date(from);
  next.setDate(next.getDate() + 1);
  return next.toISOString();
}

export function toWebhookPayload(lead: StoredInquiryLead): InquiryWebhookPayload {
  return {
    createdAt: lead.createdAt,
    name: lead.name,
    company: lead.company,
    email: lead.email,
    whatsapp: lead.whatsapp,
    country: lead.country,
    productInterest: lead.productInterest,
    quantity: lead.quantity,
    targetPort: lead.targetPort,
    oemNeeded: lead.oemNeeded,
    targetPrice: lead.targetPrice,
    customerType: lead.customerType,
    message: lead.message,
    locale: lead.locale,
    sourcePage: lead.sourcePage,
    userAgent: lead.userAgent ?? "",
    status: "New",
    nextFollowUpDate: lead.nextFollowUpDate,
  };
}
