import type { Metadata } from "next";
import { BlogListContent } from "@/components/pages/BlogListContent";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/locales";
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

export default function BlogPage() {
  return <BlogListContent />;
}
