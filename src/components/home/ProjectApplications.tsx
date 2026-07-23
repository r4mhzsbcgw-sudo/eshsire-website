"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { PROJECT_APPLICATIONS, localizeApplication } from "@/content/project-applications";

export function ProjectApplications() {
  const { locale, dict } = useLocale();
  const a = dict.home.applications;

  return (
    <section
      id="supply-scenarios"
      className="section-padding bg-industrial-dark"
      aria-labelledby="applications-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={a.label}
          title={a.title}
          description={a.description}
          centered
          titleId="applications-heading"
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {PROJECT_APPLICATIONS.map((card, i) => {
            const loc = localizeApplication(card, locale);
            return (
              <FadeIn key={card.id} delay={i * 0.04}>
                <Link
                  href={localizedPath(locale, `/applications/${card.slug}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-glass transition-all duration-300 hover:border-accent/40 hover:shadow-industrial"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={card.cardImage}
                      alt={loc.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                    <span className="absolute left-2 top-2 rounded border border-accent/30 bg-industrial-dark/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                      {loc.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="text-xs font-bold leading-snug text-white transition-colors group-hover:text-accent sm:text-sm md:text-base">
                      {loc.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-[11px] leading-relaxed text-industrial-mist sm:text-xs">
                      {loc.description}
                    </p>
                    <span className="mt-3 text-[11px] font-semibold text-accent sm:text-xs">
                      {a.exploreSolution} →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-industrial-mist sm:text-xs">
          {a.disclaimer}
        </p>
      </div>
    </section>
  );
}
