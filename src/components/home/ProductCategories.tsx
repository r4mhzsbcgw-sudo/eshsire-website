"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { homeImages } from "@/lib/images";

export function ProductCategories() {
  const { locale, dict } = useLocale();
  const p = dict.home.products;

  const categories = [
    {
      title: p.spc.title,
      desc: p.spc.desc,
      href: "/spc-flooring",
      image: homeImages.spcFlooring,
    },
    {
      title: p.wall.title,
      desc: p.wall.desc,
      href: "/wall-panels",
      image: homeImages.wallPanels,
    },
    {
      title: p.accessories.title,
      desc: p.accessories.desc,
      href: "/contact",
      image: homeImages.accessories,
    },
  ];

  return (
    <section className="section-padding bg-industrial-slate/30">
      <div className="mx-auto max-w-7xl">
        <SectionHeader label={p.label} title={p.title} description={p.description} centered />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {categories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.1}>
              <Link href={localizedPath(locale, cat.href)} className="group block glass-card-hover overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent">{cat.title}</h3>
                  <p className="mt-2 text-sm text-industrial-light">{cat.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    {dict.common.learnMore}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
