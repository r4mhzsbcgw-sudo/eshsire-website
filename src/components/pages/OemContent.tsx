"use client";

import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";

export function OemContent() {
  const { locale, dict } = useLocale();
  const d = dict.oem;

  return (
    <>
      <PageHero title={dict.meta.pages.oemService} subtitle={d.heroSubtitle} image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2400&auto=format&fit=crop" />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.servicesLabel} title={d.servicesTitle} centered />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {d.services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="glass-card-hover h-full p-8">
                  <h3 className="text-lg font-bold text-accent">{s.title}</h3>
                  <p className="mt-3 text-sm text-industrial-light">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-industrial-slate/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.processLabel} title={d.processTitle} centered />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {d.process.map((step, i) => (
              <FadeIn key={step} delay={i * 0.06}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-industrial-dark">{i + 1}</span>
                  <span className="glass-card px-4 py-2 text-sm font-medium">{step}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href={localizedPath(locale, "/contact")} variant="primary">{d.startProject}</Button>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
