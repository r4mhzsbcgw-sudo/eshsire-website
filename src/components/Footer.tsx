"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { LanguageLinks } from "@/components/LanguageSwitcher";
import { getWhatsAppUrl, navHrefs, siteConfig, getAddress } from "@/lib/config";

export function Footer() {
  const { locale, dict } = useLocale();
  const year = new Date().getFullYear();
  const quickLinks = navHrefs.filter((l) => l.href !== "/");

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
    <footer className="border-t border-white/10 bg-industrial-dark">
      <div className="section-padding mx-auto max-w-7xl pb-8 pt-16">
        <div className="grid grid-cols-4 gap-12">
          <div>
            <p className="text-2xl font-bold tracking-wide">ESHSIRE</p>
            <p className="text-sm text-industrial-light">Group</p>
            <p className="mt-4 text-sm leading-relaxed text-industrial-light">{dict.footer.tagline}</p>
            <div className="mt-6 flex gap-4">
              <a href={getWhatsAppUrl(locale)} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:border-accent hover:text-accent" aria-label={dict.whatsapp.chatLabel}>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:border-accent hover:text-accent" aria-label={dict.common.email}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{dict.common.quickLinks}</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={localizedPath(locale, link.href)} className="text-sm text-industrial-light transition-colors hover:text-accent">
                    {navLabels[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{dict.common.products}</h3>
            <ul className="mt-4 space-y-2 text-sm text-industrial-light">
              {dict.productList.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{dict.common.contactTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm text-industrial-light">
              <li><span className="text-white">{dict.common.contactPerson}:</span> {siteConfig.contactPerson}</li>
              <li>
                <span className="text-white">{dict.common.phone}:</span>{" "}
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-accent">{siteConfig.phone}</a>
              </li>
              <li>
                <span className="text-white">{dict.common.wechat}:</span> {siteConfig.wechat}
              </li>
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-accent">{siteConfig.email}</a></li>
              <li className="leading-relaxed">{getAddress(locale)}</li>
            </ul>
          </div>
        </div>
        <div className="industrial-divider mt-12" />
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-industrial-mist">
            Language
          </p>
          <LanguageLinks />
        </div>
        <p className="mt-8 text-center text-sm text-industrial-light">
          <span className="text-white">{dict.common.whatsapp}:</span>{" "}
          <a
            href={getWhatsAppUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#25D366] hover:underline"
          >
            +86 15313057097
          </a>
        </p>
        <p className="mt-4 text-center text-xs text-industrial-mist">
          © {year} {siteConfig.name}. {dict.footer.copyright} | {dict.footer.seoLine}
        </p>
      </div>
    </footer>
  );
}
