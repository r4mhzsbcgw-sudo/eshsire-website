"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";

type RelatedKey = keyof typeof import("@/i18n/dictionaries/en").en.related;

const DEFAULT_LINKS: { href: string; key: RelatedKey }[] = [
  { href: "/spc-flooring", key: "spcFlooring" },
  { href: "/wall-panels", key: "wallPanels" },
  { href: "/factory", key: "factory" },
  { href: "/oem-service", key: "oemService" },
  { href: "/accessories", key: "accessories" },
  { href: "/certifications", key: "certifications" },
  { href: "/contact", key: "contact" },
];

export function RelatedLinks({
  excludePath,
  links = DEFAULT_LINKS,
}: {
  excludePath?: string;
  links?: { href: string; key: RelatedKey }[];
}) {
  const { locale, dict } = useLocale();
  const items = links.filter((item) => item.href !== excludePath);

  if (items.length === 0) return null;

  return (
    <section className="section-padding border-t border-white/10 bg-industrial-slate/20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-lg font-bold uppercase tracking-wider text-white">
          {dict.common.relatedPages}
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={localizedPath(locale, item.href)}
                className="glass-card-hover block px-5 py-4 text-sm font-semibold text-industrial-light hover:text-accent"
              >
                {dict.related[item.key]} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
