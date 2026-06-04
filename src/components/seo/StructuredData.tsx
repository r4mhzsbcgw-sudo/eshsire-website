import { headers } from "next/headers";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { htmlLangMap } from "@/i18n/locales";
import { stripLocale } from "@/i18n/navigation";
import { pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import type { BlogPost } from "@/content/blog/types";
import { PROJECT_SLUGS } from "@/content/projects";
import { projectImages } from "@/lib/images";

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
  const page = pageUrl(locale, path);
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: imageUrl,
    inLanguage: htmlLangMap[locale],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: page,
    offers: {
      "@type": "AggregateOffer",
      url: pageUrl(locale, "/contact"),
      priceCurrency: "USD",
      lowPrice: "3.00",
      highPrice: "15.00",
      offerCount: "1",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ locale, post }: { locale: Locale; post: BlogPost }) {
  const imageUrl = post.heroImage.startsWith("http")
    ? post.heroImage
    : `${siteConfig.url}${post.heroImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: imageUrl,
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

export async function ProjectsSectionJsonLd({ locale }: { locale: Locale }) {
  const pathname = headers().get("x-pathname") ?? "";
  const path = stripLocale(pathname);
  if (path !== "/") return null;

  const dict = await getDictionary(locale);
  const items = dict.home.projects.items;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.home.projects.title,
    description: dict.home.projects.description,
    inLanguage: htmlLangMap[locale],
    numberOfItems: items.length,
    itemListElement: items.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": pageUrl(locale, `/projects/${project.slug}`),
        name: project.title,
        description: project.desc,
        image: projectImages[i],
        url: pageUrl(locale, `/projects/${project.slug}`),
        about: project.tag,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
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

export function ProjectJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  tag,
  gallery,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  gallery: readonly string[];
}) {
  if (!PROJECT_SLUGS.includes(slug as (typeof PROJECT_SLUGS)[number])) return null;

  const page = pageUrl(locale, `/projects/${slug}`);
  const images = gallery.length > 0 ? gallery : [image];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": page,
    name: title,
    description,
    image: images,
    url: page,
    inLanguage: htmlLangMap[locale],
    about: tag,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
