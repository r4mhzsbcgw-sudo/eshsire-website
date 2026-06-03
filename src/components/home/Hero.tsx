"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { homeCarouselSlides } from "@/lib/images";

const INTERVAL_MS = 6000;

export function Hero() {
  const { locale, dict } = useLocale();
  const [index, setIndex] = useState(0);
  const hero = dict.home.hero;

  const slides = homeCarouselSlides.map((s) => ({
    src: s.fallback,
    alt: locale === "zh" ? s.altZh : s.altEn,
  }));

  const goTo = useCallback(
    (i: number) => setIndex((i + slides.length) % slides.length),
    [slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[index];

  return (
    <section className="relative w-full overflow-hidden bg-industrial-dark pt-20">
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="relative aspect-[16/9] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:left-3"
            aria-label={locale === "zh" ? "上一张" : "Previous slide"}
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:right-3"
            aria-label={locale === "zh" ? "下一张" : "Next slide"}
          >
            →
          </button>

          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`${locale === "zh" ? "第" : "Slide"} ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 text-center md:px-12">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
          {hero.title}
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-industrial-light md:text-base">
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
}
