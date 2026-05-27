import type { Locale } from "@/i18n/locales";
import { en } from "@/i18n/dictionaries/en";
import { zh } from "@/i18n/dictionaries/zh";

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
  },
  url: "https://www.eshsiregroup.com",
} as const;

export const navHrefs = [
  { href: "/" as const, key: "home" as const },
  { href: "/spc-flooring" as const, key: "spcFlooring" as const },
  { href: "/wall-panels" as const, key: "wallPanels" as const },
  { href: "/factory" as const, key: "factory" as const },
  { href: "/oem-service" as const, key: "oemService" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/contact" as const, key: "contact" as const },
];

export function getWhatsAppUrl(locale: Locale, message?: string) {
  const dict = locale === "zh" ? zh : en;
  const text = encodeURIComponent(message ?? dict.whatsapp.defaultMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}

export function getAddress(locale: Locale) {
  return siteConfig.address[locale];
}
