"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClickableImageCard, ImageLightbox } from "@/components/ui/ImageLightbox";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { homeImages } from "@/lib/images";

/** Cards that open full-size preview on click */
const PREVIEWABLE_INDICES = new Set([1, 4]);

export function FactoryStrength() {
  const { locale, dict } = useLocale();
  const f = dict.home.factory;
  const images = homeImages.factoryStrength;
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="section-padding bg-industrial-dark">
      <div className="mx-auto max-w-7xl">
        <SectionHeader label={f.label} title={f.title} description={f.description} centered />
        <div className="mt-6 text-center">
          <Link
            href={localizedPath(locale, "/factory")}
            className="text-sm font-semibold text-accent hover:underline"
          >
            {dict.related.factory} →
          </Link>
        </div>
        <div className="mt-16 grid-desktop-3 gap-4">
          {f.items.map((title, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              {PREVIEWABLE_INDICES.has(i) ? (
                <ClickableImageCard
                  src={images[i]}
                  alt={title}
                  title={title}
                  expandHint={dict.gallery.expandHint}
                  imageClassName={
                    i === 1
                      ? "object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                      : "object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  }
                  onOpen={() => setPreview({ src: images[i], alt: title })}
                />
              ) : (
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={images[i]}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1280px) 33vw, 400px"
                    quality={92}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-industrial-dark/90 via-industrial-dark/50 to-transparent p-4 pt-10">
                    <div className="glass-card inline-block px-4 py-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
                    </div>
                  </div>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>

      <ImageLightbox
        open={preview !== null}
        onClose={() => setPreview(null)}
        src={preview?.src ?? ""}
        alt={preview?.alt ?? ""}
        closeLabel={dict.gallery.close}
      />
    </section>
  );
}
