"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath, stripLocale } from "@/i18n/navigation";

const PATH_LABEL_KEYS: Record<string, keyof typeof import("@/i18n/dictionaries/en").en.meta.pages> = {
  "/": "home",
  "/spc-flooring": "spcFlooring",
  "/wall-panels": "wallPanels",
  "/factory": "factory",
  "/oem-service": "oemService",
  "/about": "about",
  "/contact": "contact",
  "/accessories": "accessories",
  "/faq": "faq",
  "/certifications": "certifications",
};

export function Breadcrumbs() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const path = stripLocale(pathname);

  if (path === "/") return null;

  const labelKey = PATH_LABEL_KEYS[path];
  const currentLabel = labelKey ? dict.meta.pages[labelKey] : path;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-industrial-light">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={localizedPath(locale, "/")} className="hover:text-accent">
            {dict.meta.pages.home}
          </Link>
        </li>
        <li aria-hidden="true" className="text-industrial-mist">
          /
        </li>
        <li className="font-medium text-white" aria-current="page">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}
