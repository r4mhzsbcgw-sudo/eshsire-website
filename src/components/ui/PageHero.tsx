"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export function PageHero({ title, subtitle, image }: PageHeroProps) {
  const { dict } = useLocale();

  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden">
      <Image src={image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark via-industrial-dark/90 to-industrial-slate/80" />
      <div className="absolute inset-0 bg-metal-texture" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 md:px-12 lg:px-16">
        <FadeIn>
          <p className="section-label">{dict.common.eshsireGroup}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-industrial-light">{subtitle}</p>
        </FadeIn>
      </div>
    </section>
  );
}
