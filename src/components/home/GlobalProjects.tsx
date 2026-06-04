"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl } from "@/lib/config";
import { projectImages } from "@/lib/images";

const PRODUCT_LINKS = [
  { href: "/spc-flooring" as const, key: "spcFlooring" as const },
  { href: "/wall-panels" as const, key: "wallPanels" as const },
  { href: "/oem-service" as const, key: "oemService" as const },
] as const;

export function GlobalProjects() {
  const { locale, dict } = useLocale();
  const p = dict.home.projects;

  return (
    <section id="projects" className="section-padding bg-industrial-slate/20" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader label={p.label} title={p.title} description={p.description} centered titleId="projects-heading" />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {p.items.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.06}>
              <Link
                href={localizedPath(locale, `/projects/${project.slug}`)}
                className="group flex h-full flex-col overflow-hidden rounded-xl glass-card-hover shadow-glass transition-shadow duration-300 hover:shadow-industrial"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={projectImages[i]}
                    alt={project.title}
                    fill
                    loading={i < 2 ? undefined : "lazy"}
                    priority={i < 2}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                  />
                  <span className="absolute left-2 top-2 z-10 rounded-md border border-accent/30 bg-industrial-dark/85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {project.tag}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/80 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-3 md:p-5">
                  <h3 className="text-xs font-bold leading-snug text-white transition-colors group-hover:text-accent sm:text-sm md:text-base lg:text-lg">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-[10px] leading-relaxed text-industrial-light sm:mt-2 sm:text-xs md:text-sm">
                    {project.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-accent sm:mt-4 sm:text-xs md:text-sm">
                    {dict.common.viewProject}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="mt-10 text-center">
          <p className="text-xs text-industrial-mist md:text-sm">{p.productLinksLabel}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs md:text-sm">
            {PRODUCT_LINKS.map((link, idx) => (
              <span key={link.href} className="inline-flex items-center gap-2">
                {idx > 0 && <span className="text-industrial-mist" aria-hidden>|</span>}
                <Link
                  href={localizedPath(locale, link.href)}
                  className="font-semibold text-accent hover:underline"
                >
                  {dict.nav[link.key]}
                </Link>
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16 rounded-2xl border border-white/10 bg-industrial-dark/60 px-6 py-10 text-center md:mt-20 md:px-12 md:py-14">
          <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">{p.ctaTitle}</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-industrial-light md:text-base">{p.ctaSubtitle}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={localizedPath(locale, "/contact")} variant="primary" className="w-full sm:w-auto">
              {dict.common.getFreeSamples}
            </Button>
            <Button href={getWhatsAppUrl(locale)} variant="whatsapp" external className="w-full sm:w-auto">
              {dict.common.whatsappUs}
            </Button>
            <Button href={localizedPath(locale, "/contact")} variant="secondary" className="w-full sm:w-auto">
              {dict.common.requestQuote}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
