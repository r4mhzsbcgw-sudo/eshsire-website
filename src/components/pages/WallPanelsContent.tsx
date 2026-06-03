"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { wallPanelImages } from "@/lib/images";

export function WallPanelsContent() {
  const { locale, dict } = useLocale();
  const d = dict.wallPanels;

  const galleryItems = wallPanelImages.gallery.map((src, i) => ({
    src,
    alt: `${d.galleryTitle} ${i + 1}`,
  }));

  return (
    <>
      <PageHero title={dict.meta.headings.wallPanels} subtitle={d.heroSubtitle} image={wallPanelImages.hero} />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.label} title={d.title} description={d.description} centered />
          <div className="mt-16 grid-desktop-3">
            {d.items.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}>
                <div className="glass-card-hover overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={wallPanelImages.productLines[i]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="mt-2 text-sm text-industrial-light">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href={localizedPath(locale, "/contact")} variant="primary">
              {dict.common.getSamples}
            </Button>
          </div>
        </div>
      </section>

      <ImageGallery
        label={d.galleryLabel}
        title={d.galleryTitle}
        description={d.galleryDesc}
        images={galleryItems}
        closeLabel={dict.gallery.close}
        expandHint={dict.gallery.expandHint}
      />

      <RelatedLinks excludePath="/wall-panels" />
      <ContactCTA />
    </>
  );
}
