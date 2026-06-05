"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/i18n/locales";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl, siteConfig } from "@/lib/config";
import { getBlogProcurementLabels } from "@/content/blog/b2b-blocks";
import type { BlogBlock, BlogPost } from "@/content/blog/types";

function resolveHref(locale: Locale, href: string) {
  if (href.startsWith("/#")) {
    return `${localizedPath(locale, "/")}${href.slice(1)}`;
  }
  if (href.startsWith("/")) {
    return localizedPath(locale, href);
  }
  return href;
}

function RichParagraph({
  segments,
  locale,
}: {
  segments: Array<string | { link: string; href: string }>;
  locale: Locale;
}) {
  return (
    <p className="mt-4 text-base leading-relaxed text-industrial-light">
      {segments.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <Link
            key={i}
            href={resolveHref(locale, seg.href)}
            className="font-semibold text-accent hover:underline"
          >
            {seg.link}
          </Link>
        )
      )}
    </p>
  );
}

function BlogBlockView({
  block,
  locale,
  lazyImage,
}: {
  block: BlogBlock;
  locale: Locale;
  lazyImage: boolean;
}) {
  switch (block.type) {
    case "p":
      return <p className="mt-4 text-base leading-relaxed text-industrial-light">{block.text}</p>;
    case "rich-p":
      return <RichParagraph segments={block.segments} locale={locale} />;
    case "h2":
      return <h2 className="mt-10 text-2xl font-bold text-white md:text-3xl">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-6 text-lg font-bold text-accent">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2 pl-5">
          {block.items.map((item) => (
            <li key={item} className="list-disc text-industrial-light">
              {item}
            </li>
          ))}
        </ul>
      );
    case "img":
      return (
        <figure className="mt-8 overflow-hidden rounded-xl border border-white/10">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              loading={lazyImage ? "lazy" : undefined}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {block.caption && (
            <figcaption className="border-t border-white/10 bg-industrial-dark/60 px-4 py-3 text-center text-sm text-industrial-mist">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "cta":
      return null;
    default:
      return null;
  }
}

function ArticleCta({
  block,
  locale,
  dict,
}: {
  block: Extract<BlogBlock, { type: "cta" }>;
  locale: Locale;
  dict: ReturnType<typeof useLocale>["dict"];
}) {
  const title = block.title ?? dict.blog.ctaTitle;
  const text = block.text ?? dict.blog.ctaDesc;

  if (block.variant === "b2b-procurement") {
    const labels = getBlogProcurementLabels(locale);
    return (
      <div className="mt-12 rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
        <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-industrial-light md:text-base">{text}</p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-block border border-accent bg-accent px-6 py-3 text-sm font-semibold text-industrial-dark hover:bg-white"
          >
            {labels.requestPriceList}
          </Link>
          <a
            href={getWhatsAppUrl(locale, "Hello, I need a 40HQ container quotation for SPC flooring.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-accent hover:text-accent"
          >
            {labels.containerQuotation}
          </a>
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-block border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-accent hover:text-accent"
          >
            {labels.bulkOrderPricing}
          </Link>
        </div>
      </div>
    );
  }

  if (block.variant === "factory-quote") {
    return (
      <div className="mt-12 rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
        <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-industrial-light md:text-base">{text}</p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={getWhatsAppUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-accent bg-accent px-6 py-3 text-sm font-semibold text-industrial-dark hover:bg-white"
          >
            {dict.blog.whatsappInquiry}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-block border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-accent hover:text-accent"
          >
            {dict.blog.emailUs}
          </a>
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-block border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-accent hover:text-accent"
          >
            {dict.blog.getFreeQuote}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-sm text-industrial-light">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={localizedPath(locale, "/contact")}
          className="inline-block border border-accent bg-accent px-6 py-3 text-sm font-semibold text-industrial-dark hover:bg-white"
        >
          {dict.common.requestCatalog}
        </Link>
        <a
          href={getWhatsAppUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-accent hover:text-accent"
        >
          WhatsApp {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const { locale, dict } = useLocale();
  let imageIndex = 0;

  return (
    <article className="section-padding">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="section-label">{dict.blog.label}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-industrial-mist">
            {post.date} · {post.readMinutes} {dict.blog.readTimeUnit}
          </p>
        </FadeIn>

        {!post.hideTopHero && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        <div className="prose-invert mt-8">
          {post.blocks.map((block, i) => {
            if (block.type === "cta") {
              return <ArticleCta key={i} block={block} locale={locale} dict={dict} />;
            }
            const lazyImage = block.type === "img" ? imageIndex++ > 0 : false;
            return <BlogBlockView key={i} block={block} locale={locale} lazyImage={lazyImage} />;
          })}
        </div>
      </div>
    </article>
  );
}
