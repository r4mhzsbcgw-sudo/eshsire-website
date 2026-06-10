import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/pages/BlogPostContent";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getBlogPost, getBlogPosts } from "@/content/blog";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { buildBlogMetaDescription, buildBlogMetaTitle } from "@/lib/blog-seo";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!isLocale(locale)) return {};
  const post = getBlogPost(slug, locale as Locale);
  if (!post) return {};
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: buildBlogMetaTitle(post),
    description: buildBlogMetaDescription(post),
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
  const locale = localeParam as Locale;
  const post = getBlogPost(slug, locale);
  if (!post) notFound();
  await getDictionary(locale);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={`/blog/${slug}`} />
      <ArticleJsonLd locale={locale} post={post} />
      <BlogPostContent post={post} />
    </>
  );
}
