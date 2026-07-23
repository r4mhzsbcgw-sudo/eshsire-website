import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { htmlLangMap } from "@/i18n/locales";
import { pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import type { BlogPost } from "@/content/blog/types";
import { PROJECT_SLUGS } from "@/content/projects";
import {
  localizeProjectApplication,
  type ProjectApplication,
} from "@/config/projectApplications";

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

function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function absoluteUrl(value: string): string {
  return value.startsWith("http") ? value : `${siteConfig.url}${value}`;
}

export async function WebPageJsonLd({
  locale,
  path,
  name,
  description,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
}) {
  const page = pageUrl(locale, path);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${page}#webpage`,
    url: page,
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: htmlLangMap[locale],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export async function BreadcrumbJsonLd({ locale, path }: { locale: Locale; path: string }) {
  if (path === "/") return null;

  const dict = await getDictionary(locale);
  const labelKey = PATH_LABEL_KEYS[path];
  const dynamicMatch = path.match(/^\/(blog|projects)\/([^/]+)$/);
  if (!labelKey && !dynamicMatch) return null;

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: dict.meta.pages.home,
      item: pageUrl(locale, ""),
    },
  ];

  if (labelKey) {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: dict.meta.pages[labelKey],
      item: pageUrl(locale, path),
    });
  } else if (dynamicMatch) {
    const section = dynamicMatch[1];
    const slug = dynamicMatch[2];
    const parentPath = `/${section}`;
    itemListElement.push(
      {
        "@type": "ListItem",
        position: 2,
        name: section === "blog" ? dict.meta.pages.blog : "Projects",
        item: pageUrl(locale, parentPath),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: labelFromSlug(slug),
        item: pageUrl(locale, path),
      }
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export async function FaqJsonLd({ locale, path }: { locale: Locale; path: string }) {
  const productFaqPaths = ["/spc-flooring", "/wall-panels", "/accessories"];
  const isProductFaq = productFaqPaths.includes(path);
  if (path !== "/faq" && !isProductFaq) return null;

  const dict = await getDictionary(locale);
  const items =
    path === "/wall-panels"
      ? dict.wallPanels.faq.items
      : path === "/accessories"
        ? dict.accessories.faq.items
      : isProductFaq
        ? dict.spcFlooring.faq.items
        : dict.faq.items;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: htmlLangMap[locale],
    mainEntity: items.map((item) => ({
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

export function ApplicationBreadcrumbJsonLd({
  locale,
  application,
}: {
  locale: Locale;
  application: ProjectApplication;
}) {
  const localized = localizeProjectApplication(application, locale);
  const path = `/applications/${application.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "zh" ? "首页" : locale === "es" ? "Inicio" : "Home",
        item: pageUrl(locale, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "zh" ? "应用方案" : locale === "es" ? "Aplicaciones" : "Applications",
        item: `${pageUrl(locale, "")}#supply-scenarios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: localized.title,
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

export function ApplicationFaqJsonLd({
  locale,
  application,
}: {
  locale: Locale;
  application: ProjectApplication;
}) {
  const localized = localizeProjectApplication(application, locale);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: htmlLangMap[locale],
    mainEntity: localized.faq.map((item) => ({
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
  category,
}: {
  locale: Locale;
  name: string;
  description: string;
  image: string;
  path: string;
  category: string;
}) {
  const page = pageUrl(locale, path);
  const imageUrl = absoluteUrl(image);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: imageUrl,
    category,
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ locale, post }: { locale: Locale; post: BlogPost }) {
  const imageUrl = absoluteUrl(post.heroImage);

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
      name: post.author ?? siteConfig.name,
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

export async function ProductionTrackingJsonLd({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const items = dict.home.projects.items;
  const stepPaths = [
    "/oem-service",
    "/oem-service",
    "/factory",
    "/factory",
    "/oem-service",
    "/factory",
    "/contact",
    "/contact",
  ] as const;

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
        "@type": "HowToStep",
        "@id": pageUrl(locale, stepPaths[i] ?? "/contact"),
        name: project.title,
        text: project.desc,
        url: pageUrl(locale, stepPaths[i] ?? "/contact"),
        position: i + 1,
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

/** @deprecated Use ProductionTrackingJsonLd */
export const ProjectsSectionJsonLd = ProductionTrackingJsonLd;

export function ProjectJsonLd({
  locale,
  slug,
  title,
  description,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
}) {
  if (!PROJECT_SLUGS.includes(slug as (typeof PROJECT_SLUGS)[number])) return null;

  const page = pageUrl(locale, `/cases/${slug}`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowToStep",
    "@id": page,
    name: title,
    text: description,
    url: page,
    inLanguage: htmlLangMap[locale],
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
