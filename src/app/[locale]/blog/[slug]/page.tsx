import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/pages/BlogPostContent";
import { ArticleJsonLd } from "@/components/seo/StructuredData";
import { getBlogPost, getAllBlogSlugs } from "@/content/blog";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  const locales = ["en", "zh", "es"] as const;
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!isLocale(locale)) return {};
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${post.title} | Eshsire Group`,
    description: post.description,
    ogImage: post.ogImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale: localeParam, slug } = params;
  if (!isLocale(localeParam)) notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const locale = localeParam as Locale;
  await getDictionary(locale);

  return (
    <>
      <ArticleJsonLd locale={locale} post={post} />
      <BlogPostContent post={post} />
    </>
  );
}
