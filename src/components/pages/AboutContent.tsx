"use client";

import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactCTA } from "@/components/home/ContactCTA";
import { useLocale } from "@/context/LocaleContext";
import { aboutImages } from "@/lib/images";

export function AboutContent() {
  const { dict } = useLocale();
  const d = dict.about;

  const galleryItems = aboutImages.gallery.map((src, i) => ({
    src,
    alt: `${d.galleryTitle} ${i + 1}`,
  }));

  return (
    <>
      <PageHero title={dict.meta.pages.about} subtitle={d.heroSubtitle} image={aboutImages.hero} />

      <CompanyIntroSection showViewMore={false} />

      <ImageGallery
        label={d.galleryLabel}
        title={d.galleryTitle}
        description={d.galleryDesc}
        images={galleryItems}
        closeLabel={dict.gallery.close}
        expandHint={dict.gallery.expandHint}
      />

      <section className="section-padding bg-industrial-slate/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.missionLabel} title={d.missionTitle} centered />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {d.mission.map((item, i) => (
              <FadeIn key={item.t} delay={i * 0.1}>
                <div className="glass-card p-8 text-center">
                  <h3 className="text-lg font-bold text-accent">{item.t}</h3>
                  <p className="mt-3 text-sm text-industrial-light">{item.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
