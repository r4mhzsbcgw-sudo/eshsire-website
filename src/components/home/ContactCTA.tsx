"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl } from "@/lib/config";

export function ContactCTA() {
  const { locale, dict } = useLocale();
  const c = dict.home.cta;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.12)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{c.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-industrial-light">{c.description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={getWhatsAppUrl(locale)} variant="whatsapp" external>
              {dict.common.whatsapp}
            </Button>
            <Button href={localizedPath(locale, "/contact")} variant="secondary">
              {dict.common.sendInquiry}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
