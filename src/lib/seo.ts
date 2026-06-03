import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { locales, ogLocaleMap, isIndexableLocale } from "@/i18n/locales";
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
      ...locales.map((loc) => [loc, `${siteConfig.url}/${loc}${suffix}`]),
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

  return {
    title: { absolute: title },
    description,
    robots: isIndexableLocale(locale)
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: buildAlternates(locale, suffix),
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale],
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
