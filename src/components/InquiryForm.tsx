"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { getWhatsAppUrl, siteConfig } from "@/lib/config";

export function InquiryForm() {
  const { locale, dict } = useLocale();
  const f = dict.contact.form;
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const wa = dict.whatsapp;
    const text = [
      wa.inquiryHeader,
      "",
      `${wa.name}: ${data.get("name")}`,
      `${wa.company}: ${data.get("company")}`,
      `${wa.product}: ${data.get("product")}`,
      `Email: ${data.get("email")}`,
      "",
      `${wa.message}:`,
      data.get("message"),
    ].join("\n");
    window.open(getWhatsAppUrl(locale, text), "_blank");
    setSent(true);
    e.currentTarget.reset();
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-industrial-mist outline-none backdrop-blur-sm transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder={f.name} className={inputClass} />
        <input name="company" required placeholder={f.company} className={inputClass} />
        <input name="email" type="email" required placeholder={f.email} className={inputClass} />
        <select name="product" required className={inputClass} defaultValue="">
          <option value="" disabled className="bg-industrial-dark">{f.selectProduct}</option>
          <option value={f.products.spc} className="bg-industrial-dark">{f.products.spc}</option>
          <option value={f.products.wall} className="bg-industrial-dark">{f.products.wall}</option>
          <option value={f.products.uv} className="bg-industrial-dark">{f.products.uv}</option>
          <option value={f.products.oem} className="bg-industrial-dark">{f.products.oem}</option>
        </select>
      </div>
      <textarea name="message" required rows={4} placeholder={f.messagePlaceholder} className={`${inputClass} mt-4`} />
      <button type="submit" className="mt-4 w-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wider text-industrial-dark transition-colors hover:bg-accent-hover md:w-auto md:px-10">
        {f.submit}
      </button>
      {sent && (
        <p className="mt-3 text-sm text-industrial-light">
          {f.thanks}{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">{siteConfig.email}</a>
        </p>
      )}
    </form>
  );
}
