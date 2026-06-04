"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useLocale } from "@/context/LocaleContext";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  showBreadcrumbs?: boolean;
  breadcrumbParent?: { label: string; href: string };
  breadcrumbLabel?: string;
}

export function PageHero({
  title,
  subtitle,
  image,
  showBreadcrumbs = true,
  breadcrumbParent,
  breadcrumbLabel,
}: PageHeroProps) {
  const { dict } = useLocale();

  return (
    <section className="relative flex min-h-[40vh] items-center overflow-hidden md:min-h-[50vh]">
      <Image src={image} alt={title} fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark via-industrial-dark/90 to-industrial-slate/80" />
      <div className="absolute inset-0 bg-metal-texture" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <FadeIn>
          {showBreadcrumbs && (
            <Breadcrumbs parent={breadcrumbParent} currentLabel={breadcrumbLabel} />
          )}
          <p className="section-label">{dict.common.eshsireGroup}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-industrial-light md:text-lg">{subtitle}</p>
        </FadeIn>
      </div>
    </section>
  );
}
