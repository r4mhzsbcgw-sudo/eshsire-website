"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import { useLocale } from "@/context/LocaleContext";

const labels: Record<Locale, string> = { en: "EN", zh: "中文" };

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const other: Locale = locale === "en" ? "zh" : "en";

  return (
    <div className="flex items-center gap-1 rounded border border-white/20 bg-white/5 p-0.5 text-xs font-semibold backdrop-blur-sm">
      {(["en", "zh"] as const).map((loc) => (
        <Link
          key={loc}
          href={switchLocalePath(pathname, loc)}
          className={`rounded px-2.5 py-1 transition-colors ${
            locale === loc
              ? "bg-accent text-industrial-dark"
              : "text-industrial-light hover:text-white"
          }`}
        >
          {labels[loc]}
        </Link>
      ))}
    </div>
  );
}
