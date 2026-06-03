"use client";

import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { accessoriesImages } from "@/lib/images";

export function AccessoriesContent() {
  const { locale, dict } = useLocale();
  const d = dict.accessories;

  return (
    <>
      <PageHero title={dict.meta.headings.accessories} subtitle={d.heroSubtitle} image={accessoriesImages.hero} />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.label} title={d.title} description={d.description} centered />
          <div className="mt-16 grid-desktop-3 gap-6">
            {d.items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="glass-card-hover h-full p-8">
                  <h2 className="text-lg font-bold text-accent">{item.title}</h2>
                  <p className="mt-3 text-sm text-industrial-light">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href={localizedPath(locale, "/contact")} variant="primary">
              {dict.common.requestCatalog}
            </Button>
          </div>
        </div>
      </section>
      <RelatedLinks excludePath="/accessories" />
      <ContactCTA />
    </>
  );
}
