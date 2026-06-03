"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { navHrefs } from "@/lib/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels: Record<(typeof navHrefs)[number]["key"], string> = {
    home: dict.nav.home,
    spcFlooring: dict.nav.spcFlooring,
    wallPanels: dict.nav.wallPanels,
    accessories: dict.nav.accessories,
    factory: dict.nav.factory,
    oemService: dict.nav.oemService,
    about: dict.nav.about,
    contact: dict.nav.contact,
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-industrial-dark/90 shadow-industrial backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4 md:px-12 lg:px-16">
        <Link href={localizedPath(locale, "/")} className="group shrink-0">
          <span className="text-xl font-bold tracking-wide text-white">ESHSIRE</span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-industrial-light group-hover:text-accent">
            Group
          </span>
        </Link>

        <nav className="flex min-w-0 flex-1 items-center justify-end gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navHrefs.map((link) => {
            const href = localizedPath(locale, link.href);
            const active = pathname === href || (link.href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={link.href}
                href={href}
                className={`shrink-0 whitespace-nowrap px-2.5 py-2 text-xs font-medium transition-colors md:px-3 md:text-sm ${
                  active ? "text-accent" : "text-industrial-light hover:text-white"
                }`}
              >
                {navLabels[link.key]}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <Link
            href={localizedPath(locale, "/contact")}
            className="ml-1 shrink-0 whitespace-nowrap border border-accent bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-industrial-dark md:ml-2 md:px-5 md:text-sm"
          >
            {dict.nav.getCatalog}
          </Link>
        </nav>
      </div>
    </header>
  );
}
