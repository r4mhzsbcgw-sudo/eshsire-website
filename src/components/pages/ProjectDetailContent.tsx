"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl } from "@/lib/config";
import { projectImages } from "@/lib/images";
import type { ProjectSlug } from "@/content/projects";

interface ProjectDetailContentProps {
  slug: ProjectSlug;
}

export function ProjectDetailContent({ slug }: ProjectDetailContentProps) {
  const { locale, dict } = useLocale();
  const p = dict.home.projects;
  const index = p.items.findIndex((item) => item.slug === slug);
  const project = index >= 0 ? p.items[index] : null;

  if (!project) return null;

  const image = projectImages[index];

  return (
    <>
      <PageHero
        title={project.title}
        subtitle={project.desc}
        image={image}
        breadcrumbParent={{ label: p.title, href: `${localizedPath(locale, "/")}#projects` }}
        breadcrumbLabel={project.title}
      />

      <section className="section-padding bg-industrial-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <span className="inline-flex rounded-md border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {project.tag}
              </span>
              <p className="section-label mt-6">{p.detailLabel}</p>
              <h2 className="section-heading">{project.title}</h2>
              <p className="mt-6 text-base leading-relaxed text-industrial-light md:text-lg">
                {project.overview}
              </p>
              <ul className="mt-8 space-y-3">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-industrial-light md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href={localizedPath(locale, "/contact")} variant="primary">
                  {dict.common.getFreeSamples}
                </Button>
                <Button href={getWhatsAppUrl(locale)} variant="whatsapp" external>
                  {dict.common.whatsappUs}
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/10 bg-industrial-slate/20">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{p.ctaTitle}</h3>
            <p className="mt-3 text-base text-industrial-light md:text-lg">{p.ctaSubtitle}</p>
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

          <FadeIn delay={0.1} className="mt-16">
            <p className="section-label text-center">{p.label}</p>
            <h3 className="mt-3 text-center text-2xl font-bold text-white md:text-3xl">{p.relatedTitle}</h3>
            <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
              {p.items
                .filter((item) => item.slug !== slug)
                .slice(0, 4)
                .map((item) => {
                  const itemIndex = p.items.findIndex((i) => i.slug === item.slug);
                  const itemImage = projectImages[itemIndex];
                  return (
                    <Link
                      key={item.slug}
                      href={localizedPath(locale, `/projects/${item.slug}`)}
                      className="group overflow-hidden rounded-xl glass-card-hover"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={itemImage}
                          alt={item.title}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{item.tag}</p>
                        <h4 className="mt-2 text-sm font-bold text-white group-hover:text-accent md:text-base">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
