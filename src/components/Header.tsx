"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { navHrefs } from "@/lib/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels: Record<(typeof navHrefs)[number]["key"], string> = {
    home: dict.nav.home,
    spcFlooring: dict.nav.spcFlooring,
    wallPanels: dict.nav.wallPanels,
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-12 lg:px-16">
        <Link href={localizedPath(locale, "/")} className="group shrink-0">
          <span className="text-xl font-bold tracking-wide text-white">ESHSIRE</span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-industrial-light group-hover:text-accent">
            Group
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navHrefs.map((link) => {
            const href = localizedPath(locale, link.href);
            const active = pathname === href || (link.href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={link.href}
                href={href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
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
            className="ml-2 border border-accent bg-accent/10 px-5 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-industrial-dark"
          >
            {dict.nav.getCatalog}
          </Link>
        </nav>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={dict.nav.menu}
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-industrial-dark/98 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navHrefs.map((link) => {
                const href = localizedPath(locale, link.href);
                return (
                  <Link
                    key={link.href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 text-sm font-medium ${
                      pathname === href ? "text-accent" : "text-industrial-light"
                    }`}
                  >
                    {navLabels[link.key]}
                  </Link>
                );
              })}
              <Link
                href={localizedPath(locale, "/contact")}
                onClick={() => setMobileOpen(false)}
                className="mt-2 border border-accent py-3 text-center text-sm font-semibold text-accent"
              >
                {dict.nav.getCatalog}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
