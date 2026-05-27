"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { homeImages } from "@/lib/images";

export function FactoryVideo() {
  const { dict } = useLocale();
  const v = dict.home.video;

  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-video w-full md:aspect-[21/9]">
        <Image
          src={homeImages.factoryVideoBg}
          alt={v.title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-industrial-dark/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="section-padding mx-auto w-full max-w-7xl">
            <FadeIn>
              <SectionHeader label={v.label} title={v.title} description={v.description} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
