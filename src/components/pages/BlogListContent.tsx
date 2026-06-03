"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { getBlogPosts } from "@/content/blog";
import { homeImages } from "@/lib/images";

export function BlogListContent() {
  const { locale, dict } = useLocale();

  const posts = getBlogPosts(locale);

  return (
    <>
      <PageHero
        title={dict.meta.headings.blog}
        subtitle={dict.blog.listSubtitle}
        image={homeImages.factoryStrength[0]}
      />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <Link href={localizedPath(locale, `/blog/${post.slug}`)} className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <div className="relative aspect-[16/10]">
                  <Image src={post.heroImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 600px" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-industrial-mist">{post.date}</p>
                  <h2 className="mt-2 text-lg font-bold text-white group-hover:text-accent">{post.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm text-industrial-light">{post.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.common.learnMore} →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
