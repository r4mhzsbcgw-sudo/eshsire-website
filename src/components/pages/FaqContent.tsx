"use client";

import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactCTA } from "@/components/home/ContactCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { homeImages } from "@/lib/images";

export function FaqContent() {
  const { dict } = useLocale();
  const d = dict.faq;

  return (
    <>
      <PageHero title={dict.meta.headings.faq} subtitle={d.heroSubtitle} image={homeImages.factoryStrength[1]} />
      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <SectionHeader label={d.label} title={d.title} centered />
          <dl className="mt-12 space-y-6">
            {d.items.map((item, i) => (
              <FadeIn key={item.q} delay={i * 0.05}>
                <div className="glass-card p-6">
                  <dt className="text-base font-bold text-white">{item.q}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-industrial-light">{item.a}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>
      <RelatedLinks excludePath="/faq" />
      <ContactCTA />
    </>
  );
}
