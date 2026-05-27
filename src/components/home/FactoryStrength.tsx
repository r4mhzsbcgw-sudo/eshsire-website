"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { homeImages } from "@/lib/images";

export function FactoryStrength() {
  const { dict } = useLocale();
  const f = dict.home.factory;
  const images = homeImages.factoryStrength;

  return (
    <section className="section-padding bg-industrial-dark">
      <div className="mx-auto max-w-7xl">
        <SectionHeader label={f.label} title={f.title} description={f.description} centered />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.items.map((title, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                <Image src={images[i]} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="glass-card inline-block px-4 py-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
