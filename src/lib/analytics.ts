type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type CtaEventName =
  | "generate_lead"
  | "request_quote"
  | "catalog_request"
  | "whatsapp_click"
  | "sample_request";

export function trackEvent(
  eventName: CtaEventName,
  params: {
    page_path: string;
    language: string;
    cta_location: string;
    product_interest?: string;
  }
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const payload: AnalyticsParams = {
    page_path: params.page_path,
    language: params.language,
    cta_location: params.cta_location,
  };
  if (params.product_interest) {
    payload.product_interest = params.product_interest;
  }

  window.gtag("event", eventName, payload);
}
