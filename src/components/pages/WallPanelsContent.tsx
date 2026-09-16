"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { WallPanelFaqSection } from "@/components/seo/WallPanelFaq";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { wallPanelImages } from "@/lib/images";
import { wallPanelCards } from "@/i18n/wall-panel-cards";
import { EnglishWallPanelConversionSection } from "./EnglishConversionBlocks";

export function WallPanelsContent() {
  const { locale, dict } = useLocale();
  const d = dict.wallPanels;
  const products = [...wallPanelCards[locale], ...d.items.slice(3)];
  const productImages = [
    "/images/products/wall-panels/cards/spc-wall-panels.png",
    "/images/products/wall-panels/cards/wpc-wall-panels.png",
    "/images/products/wall-panels/cards/pvc-ceiling-panels.png",
  ];

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
            {products.map((p, i) => (
              <FadeIn key={`${i}-${p.name}`} delay={i * 0.1}>
                <div className="glass-card-hover overflow-hidden">
                  {productImages[i] && <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={productImages[i]}
                      alt={p.name}
                      title={p.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 767px) 100vw, 33vw"
                    />
                  </div>}
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
      <EnglishWallPanelConversionSection />

      <WallPanelFaqSection faq={dict.wallPanels.faq} />
      <RelatedLinks excludePath="/wall-panels" />
      <ContactCTA />
    </>
  );
}
