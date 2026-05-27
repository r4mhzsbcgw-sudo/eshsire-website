"use client";

import { PageHero } from "@/components/ui/PageHero";
import { FactoryStrength } from "@/components/home/FactoryStrength";
import { FactoryVideo } from "@/components/home/FactoryVideo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactCTA } from "@/components/home/ContactCTA";
import { useLocale } from "@/context/LocaleContext";

export function FactoryContent() {
  const { dict } = useLocale();
  const d = dict.factoryPage;

  return (
    <>
      <PageHero title={dict.meta.pages.factory} subtitle={d.heroSubtitle} image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2400&auto=format&fit=crop" />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="glass-card p-8 text-center">
                  <p className="text-4xl font-bold text-accent">{s.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-industrial-light">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-16">
            <SectionHeader label={d.capabilitiesLabel} title={d.capabilitiesTitle} description={d.capabilitiesDesc} />
          </FadeIn>
        </div>
      </section>
      <FactoryStrength />
      <FactoryVideo />
      <ContactCTA />
    </>
  );
}
