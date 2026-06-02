"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { switchLocalePath } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/locales";
import { useLocale } from "@/context/LocaleContext";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <label className="relative shrink-0">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => {
          const next = e.target.value as Locale;
          router.push(switchLocalePath(pathname, next));
        }}
        className="max-w-[7.5rem] cursor-pointer appearance-none rounded border border-white/20 bg-white/10 py-1.5 pl-2 pr-7 text-xs font-semibold text-white backdrop-blur-sm focus:border-accent focus:outline-none"
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc} className="bg-industrial-dark text-white">
            {localeLabels[loc].short} — {localeLabels[loc].nativeName}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-industrial-light"
        aria-hidden
      >
        ▾
      </span>
    </label>
  );
}

export function LanguageLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const { locale } = useLocale();

  return (
    <ul className={"grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4 " + className}>
      {locales.map((loc) => (
        <li key={loc}>
          <Link
            href={switchLocalePath(pathname, loc)}
            className={
              locale === loc
                ? "text-sm font-semibold text-accent"
                : "text-sm text-industrial-light transition-colors hover:text-white"
            }
            hrefLang={loc}
          >
            {localeLabels[loc].nativeName}
          </Link>
        </li>
      ))}
    </ul>
  );
}
