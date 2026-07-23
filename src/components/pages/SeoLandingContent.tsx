"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PageHero } from "@/components/ui/PageHero";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import type { LandingPageContent } from "@/content/landing-pages";

export function SeoLandingContent({ page }: { page: LandingPageContent }) {
  const { locale } = useLocale();

  return (
    <>
      <PageHero title={page.title} subtitle={page.description} image={page.image} />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5 md:grid-cols-2">
            {page.sections.map((section) => (
              <article key={section.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
                <ul className="mt-4 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-industrial-light">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-lg border border-accent/30 bg-accent/5 p-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10">
              <Image src={page.image} alt={page.title} fill className="object-cover" sizes="360px" />
            </div>
            <h2 className="mt-6 text-xl font-bold text-white">{page.cta}</h2>
            <p className="mt-3 text-sm leading-relaxed text-industrial-light">
              Share your target specification, quantity, destination and OEM needs. Jason will help confirm the next step.
            </p>
            <Link
              href={localizedPath(locale, "/contact")}
              className="mt-6 inline-flex w-full justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-industrial-dark hover:bg-white"
            >
              {page.cta}
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-padding bg-industrial-slate/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl">FAQ</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {page.faq.map((item) => (
              <article key={item.q} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <h3 className="text-base font-bold text-white">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-industrial-light">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
