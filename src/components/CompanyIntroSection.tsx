"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { aboutImages } from "@/lib/images";

const COMPANY_VIDEO = "/videos/company-intro.mp4";

export function CompanyIntroSection({ showViewMore = true }: { showViewMore?: boolean }) {
  const { locale, dict } = useLocale();
  const c = dict.companyIntro;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#1a1d21]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20 lg:px-16">
        {/* Top bar */}
        <FadeIn className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-industrial-light md:text-sm">
            {c.tagline}
          </p>
          {showViewMore && (
            <Link
              href={localizedPath(locale, "/about")}
              className="inline-flex w-fit rounded-full border border-white/20 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-industrial-dark transition-colors hover:bg-accent hover:text-industrial-dark"
            >
              {c.viewMore}
            </Link>
          )}
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-stretch">
          {/* Left — copy */}
          <FadeIn className="relative flex flex-col justify-center lg:pl-2">
            <p
              className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-y-1/2 select-none font-serif text-6xl font-bold leading-none tracking-tight text-white/[0.06] lg:block lg:text-7xl"
              aria-hidden
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              ESHSIRE
            </p>
            <h2 className="relative font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {c.title}
            </h2>
            <p className="relative mt-6 text-sm leading-relaxed text-industrial-light md:text-base">
              {c.description}
            </p>
            <p className="relative mt-4 text-sm leading-relaxed text-industrial-mist">{c.description2}</p>
          </FadeIn>

          {/* Right — video */}
          <FadeIn delay={0.15} className="relative min-h-[240px] lg:min-h-[320px]">
            <div className="relative h-full min-h-[240px] overflow-hidden rounded-sm bg-[#2a2d32] lg:min-h-[320px]">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                preload="metadata"
                poster={aboutImages.story}
                controls={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              >
                <source src={COMPANY_VIDEO} type="video/mp4" />
              </video>

              {!playing && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-industrial-dark/30 transition-colors hover:bg-industrial-dark/40"
                  aria-label={c.playVideo}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-industrial-dark shadow-lg transition-transform hover:scale-105 md:h-20 md:w-20">
                    <svg className="ml-1 h-8 w-8 md:h-10 md:w-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-white/90">
                    {c.playVideo}
                  </span>
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
