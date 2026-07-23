"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";
import { getStatsBarItems } from "@/config/companyFacts";

export function FactoryStatsBar() {
  const { locale } = useLocale();
  const items = getStatsBarItems(locale);

  return (
    <section className="border-y border-white/10 bg-industrial-slate/40 py-8 md:py-10" aria-label="Factory strength">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.05}>
              <div className="rounded-xl border border-white/10 bg-industrial-dark/60 px-4 py-5 text-center md:px-6 md:py-6">
                <p className="text-2xl font-bold tabular-nums text-accent md:text-3xl">{item.value}</p>
                <p className="mt-2 text-xs font-medium leading-snug text-industrial-light md:text-sm">{item.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
