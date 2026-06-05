import type { Locale } from "@/i18n/locales";
import type { BlogBlock } from "./types";

type BlogLocale = Extract<Locale, "en" | "zh" | "es">;

const internalLinksContent: Record<
  BlogLocale,
  Array<string | { link: string; href: string }>
> = {
  en: [
    "Eshsire Group is a ",
    { link: "SPC flooring supplier", href: "/spc-flooring" },
    " and ",
    { link: "China flooring factory", href: "/factory" },
    " offering ",
    { link: "wholesale wall panel supply", href: "/wall-panels" },
    ". ",
    { link: "Request a quotation", href: "/contact" },
    " for container pricing and bulk orders.",
  ],
  zh: [
    "Eshsire Group 是专业的 ",
    { link: "SPC 地板供应商", href: "/spc-flooring" },
    " 与 ",
    { link: "中国地板工厂", href: "/factory" },
    "，提供 ",
    { link: "墙板批发供应", href: "/wall-panels" },
    "。",
    { link: "索取报价", href: "/contact" },
    " 获取整柜价格与大货批量价。",
  ],
  es: [
    "Eshsire Group es ",
    { link: "proveedor de suelos SPC", href: "/spc-flooring" },
    " y ",
    { link: "fábrica de suelos en China", href: "/factory" },
    " con ",
    { link: "suministro mayorista de paneles murales", href: "/wall-panels" },
    ". ",
    { link: "Solicite cotización", href: "/contact" },
    " para precios de contenedor y pedidos al por mayor.",
  ],
};

const ctaDefaults: Record<BlogLocale, { title: string; text: string }> = {
  en: {
    title: "Factory Direct Pricing for Distributors & Contractors",
    text: "Contact our export team for factory price list, 40HQ container quotation and bulk SPC flooring pricing. Reply within 24 hours.",
  },
  zh: {
    title: "工厂直供价 — 面向经销商与工程承包商",
    text: "联系出口团队索取工厂价目表、40HQ 整柜报价及 SPC 地板大货批量价，24 小时内回复。",
  },
  es: {
    title: "Precio directo de fábrica para distribuidores y contratistas",
    text: "Contacte a nuestro equipo de exportación para lista de precios de fábrica, cotización de contenedor 40HQ y precios mayoristas de suelos SPC. Respuesta en 24 horas.",
  },
};

/** Standard internal-link paragraph for auto-generated B2B articles */
export function internalLinksBlock(locale: BlogLocale = "en"): BlogBlock {
  return { type: "rich-p", segments: internalLinksContent[locale] };
}

export function b2bCtaBlock(locale: BlogLocale = "en", text?: string): BlogBlock {
  const defaults = ctaDefaults[locale];
  return {
    type: "cta",
    variant: "b2b-procurement",
    title: defaults.title,
    text: text ?? defaults.text,
  };
}

export function imgBlock(
  src: string,
  alt: string,
  caption?: string
): BlogBlock {
  return { type: "img", src, alt, caption };
}
