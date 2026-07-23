"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export function ContactCTA() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const c = dict.home.cta;

  function onWhatsAppClick() {
    trackEvent("whatsapp_click", {
      page_path: pathname,
      language: locale,
      cta_location: "final_cta",
    });
  }

  function onInquiryClick() {
    trackEvent("generate_lead", {
      page_path: pathname,
      language: locale,
      cta_location: "final_cta_inquiry",
    });
  }

  const btnBase =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300";

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.12)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
        <FadeIn>
          <h2 className="text-5xl font-bold tracking-tight">{c.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-industrial-light">{c.description}</p>
          <div className="mt-10 flex flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick}
              className={`${btnBase} border border-[#25D366] bg-[#25D366] text-white hover:bg-[#20bd5a]`}
            >
              {dict.common.whatsapp}
            </a>
            <Link
              href={localizedPath(locale, "/contact")}
              onClick={onInquiryClick}
              className={`${btnBase} border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`}
            >
              {dict.common.sendInquiry}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
