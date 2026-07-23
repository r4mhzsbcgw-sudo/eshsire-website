"use client";

import { PageHero } from "@/components/ui/PageHero";
import { FactoryStrength } from "@/components/home/FactoryStrength";
import { FactoryVideo } from "@/components/home/FactoryVideo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactCTA } from "@/components/home/ContactCTA";
import { useLocale } from "@/context/LocaleContext";
import { getFactoryPageStats } from "@/config/companyFacts";
import { factoryPageImages } from "@/lib/images";
import { RelatedLinks } from "@/components/ui/RelatedLinks";

export function FactoryContent() {
  const { locale, dict } = useLocale();
  const d = dict.factoryPage;
  const stats = getFactoryPageStats(locale);

  return (
    <>
      <PageHero title={dict.meta.headings.factory} subtitle={d.heroSubtitle} image={factoryPageImages.hero} />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid-desktop-4 gap-6">
            {stats.map((s, i) => (
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
      <RelatedLinks excludePath="/factory" />
      <ContactCTA />
    </>
  );
}
