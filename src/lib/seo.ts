import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { indexableLocales, ogLocaleMap, isIndexableLocale } from "@/i18n/locales";
import { siteConfig } from "@/lib/config";

/** Normalize route suffix: "" for home, "/spc-flooring" for subpages */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function pageUrl(locale: Locale, path: string): string {
  const suffix = normalizePath(path);
  return `${siteConfig.url}/${locale}${suffix}`;
}

export function buildAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const suffix = normalizePath(path);
  return {
    canonical: `${siteConfig.url}/${locale}${suffix}`,
    languages: Object.fromEntries([
      ...indexableLocales.map((loc) => [loc, `${siteConfig.url}/${loc}${suffix}`]),
      ["x-default", `${siteConfig.url}/en${suffix}`],
    ]),
  };
}

export const PAGE_OG_IMAGES: Record<string, string> = {
  "": "/images/home/hero-banner.jpg",
  "/spc-flooring": "/images/products/spc/featured.jpg",
  "/wall-panels": "/images/products/wall-panels/hero.jpg",
  "/accessories": "/images/home/accessories.jpg",
  "/factory": "/images/home/factory/01-production.jpg",
  "/oem-service": "/images/home/factory/05-oem.jpg",
  "/about": "/images/home/factory/06-export.jpg",
  "/contact": "/images/home/spc-flooring.jpg",
  "/faq": "/images/home/factory/02-quality.jpg",
  "/certifications": "/images/home/factory/02-quality.jpg",
  "/blog": "/images/blog/choose-supplier/01.jpg",
  "/spc-flooring/specs": "/images/products/spc/featured.jpg",
};

const TITLE_OVERRIDES: Record<string, string> = {
  "": "Eshsire Group | SPC Flooring Manufacturer in China",
  "/spc-flooring": "SPC Flooring Manufacturer in China | Eshsire Group",
  "/wall-panels": "SPC Wall Panels | Eshsire Group",
  "/accessories": "SPC Flooring Accessories | Eshsire Group",
  "/spc-flooring/specs": "SPC Flooring Specifications | Eshsire Group",
};

const DESCRIPTION_OVERRIDES: Record<string, string> = {
  "":
    "Eshsire Group manufactures SPC flooring and wall panels in China for distributors, importers, contractors, and OEM private label projects.",
  "/spc-flooring":
    "Source waterproof SPC flooring from a China manufacturer with OEM branding, quality control, container loading support, and export documentation.",
  "/wall-panels":
    "Explore SPC wall panels, UV marble panels, and decorative interior panels for distributors, contractors, and OEM projects worldwide.",
  "/accessories":
    "Order SPC flooring accessories including skirting boards, profiles, underlayment, and matching trims for commercial and residential projects.",
  "/spc-flooring/specs":
    "Review SPC flooring thickness, wear layer, plank sizes, click-lock options, MOQ, lead time, certifications, and container order details.",
};

function absoluteImageUrl(imagePath: string): string {
  return imagePath.startsWith("http") ? imagePath : `${siteConfig.url}${imagePath}`;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogImage,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}): Metadata {
  const suffix = normalizePath(path);
  const url = pageUrl(locale, suffix);
  const image = absoluteImageUrl(ogImage ?? PAGE_OG_IMAGES[suffix] ?? PAGE_OG_IMAGES[""]);
  const pageTitle = TITLE_OVERRIDES[suffix] ?? title.replace(/Eshsire Group/g, siteConfig.name);
  const pageDescription =
    DESCRIPTION_OVERRIDES[suffix] ?? description.replace(/Eshsire Group/g, siteConfig.name);

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    robots: isIndexableLocale(locale)
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: buildAlternates(locale, suffix),
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale],
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: [{ url: image, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
  };
}
