import type { Locale } from "@/i18n/locales";
import { getDictionarySync } from "@/i18n/get-dictionary";

export const siteConfig = {
  name: "Eshsire Group",
  contactPerson: "Jason",
  email: "jason@eshsiregroup.com",
  phone: "+86 15313057097",
  whatsapp: "8615313057097",
  wechat: "+86 15313057097",
  address: {
    en: "Room 212, Building 1, No.20 Tianyuan Road, Panggezhuang Town, Daxing District, Beijing, China",
    zh: "中国北京市大兴区庞各庄镇天源路20号院1号楼212室",
  } satisfies Partial<Record<Locale, string>>,
  url: "https://www.eshsire.com",
} as const;

export const navHrefs = [
  { href: "/" as const, key: "home" as const },
  { href: "/spc-flooring" as const, key: "spcFlooring" as const },
  { href: "/wall-panels" as const, key: "wallPanels" as const },
  { href: "/accessories" as const, key: "accessories" as const },
  { href: "/factory" as const, key: "factory" as const },
  { href: "/oem-service" as const, key: "oemService" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/contact" as const, key: "contact" as const },
];

export function getWhatsAppUrl(locale: Locale, message?: string) {
  const dict = getDictionarySync(locale);
  const text = encodeURIComponent(message ?? dict.whatsapp.defaultMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}

export function getAddress(locale: Locale) {
  return (
    siteConfig.address[locale as keyof typeof siteConfig.address] ??
    siteConfig.address.en
  );
}
