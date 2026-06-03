import { headers } from "next/headers";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { htmlLangMap } from "@/i18n/locales";
import { stripLocale } from "@/i18n/navigation";
import { pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import type { BlogPost } from "@/content/blog/types";

const PATH_LABEL_KEYS: Record<
  string,
  keyof Awaited<ReturnType<typeof getDictionary>>["meta"]["pages"]
> = {
  "/spc-flooring": "spcFlooring",
  "/spc-flooring/specs": "spcSpecs",
  "/wall-panels": "wallPanels",
  "/factory": "factory",
  "/oem-service": "oemService",
  "/about": "about",
  "/contact": "contact",
  "/accessories": "accessories",
  "/faq": "faq",
  "/certifications": "certifications",
  "/blog": "blog",
};

export async function BreadcrumbJsonLd({ locale }: { locale: Locale }) {
  const pathname = headers().get("x-pathname") ?? `/${locale}`;
  const path = stripLocale(pathname);
  if (path === "/") return null;

  const dict = await getDictionary(locale);
  const labelKey = PATH_LABEL_KEYS[path];
  if (!labelKey) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.meta.pages.home,
        item: pageUrl(locale, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.meta.pages[labelKey],
        item: pageUrl(locale, path),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export async function FaqJsonLd({ locale }: { locale: Locale }) {
  const pathname = headers().get("x-pathname") ?? "";
  if (!pathname.includes("/faq")) return null;

  const dict = await getDictionary(locale);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: htmlLangMap[locale],
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({
  locale,
  name,
  description,
  image,
  path,
}: {
  locale: Locale;
  name: string;
  description: string;
  image: string;
  path: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: pageUrl(locale, path),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ locale, post }: { locale: Locale; post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.heroImage}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: htmlLangMap[locale],
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: pageUrl(locale, `/blog/${post.slug}`),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
