"use client";

import Image from "next/image";
import Link from "next/link";
import { getLegacyCaseImageEntries } from "@/content/projects/case-images";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";

/** Internal dev page — archived scenario stock images (no longer used on homepage). */
export function CasesImageCheckContent() {
  const { locale } = useLocale();
  const entries = getLegacyCaseImageEntries();

  return (
    <main className="min-h-screen bg-industrial-dark px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {locale === "zh" ? "开发用" : "Dev only"}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          {locale === "zh" ? "已归档场景图（不再用于首页）" : "Archived Scenario Images (Not Used on Homepage)"}
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-industrial-mist md:text-base">
          {locale === "zh"
            ? "首页供应能力板块已改为 SVG 流程卡片，不再引用以下图库图片。本页仅供开发归档查看。"
            : "The homepage supply capability section now uses SVG flow cards and no longer references the stock images below. This page is kept for internal archive review only."}
        </p>
        <Link
          href={localizedPath(locale, "/")}
          className="mt-4 inline-block text-sm text-accent hover:underline"
        >
          ← {locale === "zh" ? "返回首页" : "Back to home"}
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {entries.map((entry, i) => (
            <article
              key={entry.slug}
              className="overflow-hidden rounded-xl border border-white/10 bg-industrial-slate/30"
            >
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-xs text-industrial-mist">#{i + 1} · {locale === "zh" ? "已归档" : "Archived"}</p>
                <h2 className="mt-1 text-lg font-bold text-white">{entry.slug}</h2>
                <p className="mt-1 font-mono text-xs text-accent">{entry.image}</p>
              </div>
              <div className="relative aspect-[4/3] bg-industrial-slate/50">
                <Image
                  src={entry.image}
                  alt={locale === "zh" ? entry.altZh : entry.altEn}
                  fill
                  unoptimized
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <dl className="space-y-2 px-4 py-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase text-industrial-mist">
                    {locale === "zh" ? "图片来源" : "Source"}
                  </dt>
                  <dd className="mt-1 break-all text-industrial-light">
                    {entry.sourcePage.startsWith("http") ? (
                      <a
                        href={entry.sourcePage}
                        className="text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.sourcePage}
                      </a>
                    ) : (
                      entry.sourcePage
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-industrial-mist">
                    {locale === "zh" ? "说明" : "Note"}
                  </dt>
                  <dd className="mt-1 text-industrial-light">{entry.sourceNote}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-industrial-mist">
          {entries.length} {locale === "zh" ? "张归档图片" : "archived images"} · /public/images/cases/
        </p>
      </div>
    </main>
  );
}
