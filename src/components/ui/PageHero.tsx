"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useLocale } from "@/context/LocaleContext";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image?: string;
  imageCaption?: string;
  icon?: ReactNode;
  step?: number;
  unoptimized?: boolean;
  showBreadcrumbs?: boolean;
  breadcrumbParent?: { label: string; href: string };
  breadcrumbLabel?: string;
}

export function PageHero({
  title,
  subtitle,
  image,
  imageCaption,
  icon,
  step,
  showBreadcrumbs = true,
  breadcrumbParent,
  breadcrumbLabel,
  unoptimized = false,
}: PageHeroProps) {
  const { dict } = useLocale();
  const hasImage = Boolean(image);

  return (
    <section
      className={`relative flex min-h-[40vh] items-center overflow-hidden ${hasImage ? "" : "bg-industrial-dark"}`}
    >
      {hasImage && (
        <Image src={image!} alt={title} fill className="object-cover" priority sizes="100vw" unoptimized={unoptimized} />
      )}
      <div
        className={`absolute inset-0 ${
          hasImage
            ? "bg-gradient-to-r from-industrial-dark via-industrial-dark/90 to-industrial-slate/80"
            : "bg-gradient-to-br from-industrial-dark via-industrial-slate/40 to-industrial-dark"
        }`}
      />
      <div className="absolute inset-0 bg-metal-texture opacity-60" />
      {imageCaption && (
        <p className="absolute bottom-3 right-4 z-10 max-w-xs text-right text-[10px] leading-snug text-industrial-mist/90 sm:text-xs">
          {imageCaption}
        </p>
      )}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <FadeIn>
          {showBreadcrumbs && <Breadcrumbs parent={breadcrumbParent} currentLabel={breadcrumbLabel} />}
          <div className="flex items-start gap-5">
            {icon && (
              <div className="mt-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 md:h-20 md:w-20">
                {icon}
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="section-label">{dict.common.eshsireGroup}</p>
                {step !== undefined && (
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold tabular-nums text-industrial-mist">
                    {String(step).padStart(2, "0")}
                  </span>
                )}
              </div>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-4 max-w-2xl text-base text-industrial-light md:text-lg">{subtitle}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
