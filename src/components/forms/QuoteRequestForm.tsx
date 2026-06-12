"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { siteConfig } from "@/lib/config";
import { CUSTOMER_TYPES, PRODUCT_INTERESTS } from "@/lib/inquiries/types";

type QuoteRequestFormProps = {
  sourcePage?: string;
  id?: string;
  compact?: boolean;
};

type FormOutcome = "idle" | "submitting" | "success" | "validation_error" | "delivery_failed";

function getWhatsAppHref(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const num = fromEnv || siteConfig.whatsapp;
  return `https://wa.me/${num}`;
}

export function QuoteRequestForm({
  sourcePage = "website",
  id = "quote-form",
  compact = false,
}: QuoteRequestFormProps) {
  const { locale, dict } = useLocale();
  const f = dict.contact.quoteForm;
  const [status, setStatus] = useState<FormOutcome>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      whatsapp: data.get("whatsapp"),
      country: data.get("country"),
      productInterest: data.get("productInterest"),
      quantity: data.get("quantity"),
      targetPrice: data.get("targetPrice"),
      customerType: data.get("customerType"),
      message: data.get("message"),
      website: data.get("website"),
      locale,
      sourcePage,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; userMessage?: string };

      if (json.userMessage === "validation_error" || res.status === 400) {
        setStatus("validation_error");
        return;
      }

      if (!json.ok || json.userMessage === "delivery_failed") {
        setStatus("delivery_failed");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("delivery_failed");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-industrial-mist outline-none backdrop-blur-sm transition-colors focus:border-accent focus:ring-1 focus:ring-accent";
  const selectClass = `${inputClass} appearance-none`;

  if (status === "success") {
    return (
      <div id={id} className="glass-card border border-accent/30 bg-accent/5 p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{f.successLabel}</p>
        <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">{f.successTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-industrial-light md:text-base">{f.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent hover:underline"
        >
          {f.submitAnother}
        </button>
      </div>
    );
  }

  if (status === "validation_error") {
    return (
      <div id={id} className="glass-card border border-amber-500/30 bg-amber-500/5 p-8 text-center">
        <h3 className="text-xl font-bold text-white md:text-2xl">{f.validationErrorTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-industrial-light md:text-base">
          {f.validationErrorMessage}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent hover:underline"
        >
          {f.submitAnother}
        </button>
      </div>
    );
  }

  if (status === "delivery_failed") {
    return (
      <div id={id} className="glass-card border border-red-500/30 bg-red-500/5 p-8 text-center">
        <h3 className="text-xl font-bold text-white md:text-2xl">{f.deliveryFailedTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-industrial-light md:text-base">
          {f.deliveryFailedMessage}
        </p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            {f.contactWhatsApp}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-bold text-white hover:border-accent"
          >
            {f.contactEmail}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent hover:underline"
        >
          {f.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className={`relative glass-card ${compact ? "p-5 md:p-6" : "p-6 md:p-8"}`}>
      {!compact && (
        <>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">{f.label}</p>
          <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">{f.title}</h3>
          <p className="mt-2 text-sm text-industrial-mist">{f.subtitle}</p>
        </>
      )}

      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${compact ? "mt-0" : "mt-6"}`}>
        <input name="name" required placeholder={f.name} className={inputClass} autoComplete="name" />
        <input name="email" type="email" required placeholder={f.email} className={inputClass} autoComplete="email" />
        <input name="whatsapp" required placeholder={f.whatsapp} className={inputClass} autoComplete="tel" />
        <input name="country" required placeholder={f.country} className={inputClass} autoComplete="country-name" />
        <select name="productInterest" required className={selectClass} defaultValue="">
          <option value="" disabled className="bg-industrial-dark">
            {f.selectProduct}
          </option>
          {PRODUCT_INTERESTS.map((key) => (
            <option key={key} value={key} className="bg-industrial-dark">
              {f.products[key]}
            </option>
          ))}
        </select>
        <input name="quantity" required placeholder={f.quantity} className={inputClass} />
        <input name="targetPrice" placeholder={f.targetPrice} className={inputClass} />
        <select name="customerType" required className={selectClass} defaultValue="">
          <option value="" disabled className="bg-industrial-dark">
            {f.selectCustomerType}
          </option>
          {CUSTOMER_TYPES.map((key) => (
            <option key={key} value={key} className="bg-industrial-dark">
              {f.customerTypes[key]}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="message"
        required
        rows={compact ? 3 : 4}
        placeholder={f.messagePlaceholder}
        className={`${inputClass} mt-4`}
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 w-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wider text-industrial-dark transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:px-10"
      >
        {status === "submitting" ? f.submitting : f.submit}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-industrial-mist">{f.privacyNote}</p>
    </form>
  );
}
