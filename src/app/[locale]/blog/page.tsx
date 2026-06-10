import type { Metadata } from "next";
import { BlogListContent } from "@/components/pages/BlogListContent";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/StructuredData";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildPageMetadata({
    locale,
    path: "/blog",
    title: dict.meta.seoTitles.blog,
    description: dict.meta.pageDesc.blog,
    ogImage: "/images/blog/choose-supplier/01.jpg",
  });
}

export default async function BlogListPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale: localeParam } = params;
  if (!isLocale(localeParam)) return null;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path="/blog"
        name={dict.meta.seoTitles.blog}
        description={dict.meta.pageDesc.blog}
      />
      <BreadcrumbJsonLd locale={locale} path="/blog" />
      <BlogListContent />
    </>
  );
}
