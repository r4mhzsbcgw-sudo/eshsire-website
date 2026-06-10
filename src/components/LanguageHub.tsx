import Link from "next/link";
import { indexableLocales, localeLabels } from "@/i18n/locales";
import { localizedPath } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config";

export function LanguageHub() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-industrial-dark px-8 py-12">
      <div className="w-full max-w-3xl text-center">
        <p className="text-3xl font-bold tracking-wide text-white">ESHSIRE</p>
        <p className="mt-1 text-sm uppercase tracking-[0.3em] text-industrial-light">Group</p>
        <p className="mt-6 text-sm text-industrial-mist">{siteConfig.name}</p>
        <p className="mt-2 text-xs text-industrial-light">
          SPC Flooring · Wall Panels · OEM Export
        </p>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Choose your language / 选择语言
        </p>
        <ul className="mt-8 grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
          {indexableLocales.map((loc) => (
            <li key={loc}>
              <Link
                href={localizedPath(loc, "/")}
                className="glass-card-hover block px-4 py-4 text-sm font-semibold text-white transition-colors hover:text-accent"
              >
                <span className="block">{localeLabels[loc].nativeName}</span>
                <span className="mt-1 block text-[10px] font-normal uppercase tracking-wider text-industrial-mist">
                  {localeLabels[loc].name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[10px] text-industrial-mist">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </div>
  );
}
