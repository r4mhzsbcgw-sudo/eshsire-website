"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl, siteConfig } from "@/lib/config";
import type { BlogBlock, BlogPost } from "@/content/blog/types";

function BlogBlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="mt-4 text-base leading-relaxed text-industrial-light">{block.text}</p>;
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
            <Image src={block.src} alt={block.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
        </figure>
      );
    case "cta":
      return null;
    default:
      return null;
  }
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const { locale, dict } = useLocale();

  return (
    <article className="section-padding">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="section-label">{dict.blog.label}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-industrial-mist">
            {post.date} · {post.readMinutes} min read
          </p>
        </FadeIn>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
          <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 800px" />
        </div>

        <div className="prose-invert mt-8">
          {post.blocks.map((block, i) => (
            <BlogBlockView key={i} block={block} />
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
          <h2 className="text-xl font-bold text-white">{dict.blog.ctaTitle}</h2>
          <p className="mt-3 text-sm text-industrial-light">{dict.blog.ctaDesc}</p>
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
      </div>
    </article>
  );
}
