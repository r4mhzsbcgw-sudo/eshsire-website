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
  "/spc-flooring": "SPC Flooring Manufacturer in China | Wholesale SPC Flooring Supplier",
  "/wall-panels": "WPC & Bamboo-Wood Fiber Wall Panels Manufacturer in China | Eshsire Group",
  "/accessories": "SPC Flooring Accessories | Eshsire Group",
  "/spc-flooring/specs": "SPC Flooring Specs Guide | Thickness, Wear Layer, IXPE Padding",
};

const DESCRIPTION_OVERRIDES: Record<string, string> = {
  "":
    "Eshsire Group manufactures SPC flooring and wall panels in China for distributors, importers, contractors, and OEM private label projects.",
  "/spc-flooring":
    "SPC flooring manufacturer in China for importers, distributors and project buyers. Compare 4mm, 5mm and 6mm waterproof SPC flooring with OEM packaging, quality inspection and export support.",
  "/wall-panels":
    "Eshsire supplies WPC and bamboo-wood fiber integrated wall panels from China for distributors, contractors and interior projects, with PVC, fluted and ceiling panels plus matching accessories.",
  "/accessories":
    "Order SPC flooring accessories including skirting boards, profiles, underlayment, and matching trims for commercial and residential projects.",
  "/spc-flooring/specs":
    "Review SPC flooring specifications including thickness, wear layer, 1220 x 184mm plank size and optional IXPE padding for wholesale and project buyers.",
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
  const pageTitle =
    locale === "en"
      ? TITLE_OVERRIDES[suffix] ?? title.replace(/Eshsire Group/g, siteConfig.name)
      : title.replace(/Eshsire Group/g, siteConfig.name);
  const pageDescription =
    locale === "en"
      ? DESCRIPTION_OVERRIDES[suffix] ?? description.replace(/Eshsire Group/g, siteConfig.name)
      : description.replace(/Eshsire Group/g, siteConfig.name);

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
