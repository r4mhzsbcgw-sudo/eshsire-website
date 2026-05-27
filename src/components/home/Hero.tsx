"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { homeCarouselSlides } from "@/lib/images";

const INTERVAL_MS = 6000;
const SLIDE_WIDTH = 1024;
const SLIDE_HEIGHT = 346;

export function Hero() {
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);

  const slides = homeCarouselSlides.map((s) => ({
    src: s.src,
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

  return (
    <section className="relative w-full overflow-hidden bg-industrial-dark pt-16 md:pt-20">
      <div className="relative mx-auto w-full max-w-[1024px] px-0">
        <div
          className="relative w-full"
          style={{ aspectRatio: `${SLIDE_WIDTH} / ${SLIDE_HEIGHT}` }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={slides[index].src}
                alt={slides[index].alt}
                width={SLIDE_WIDTH}
                height={SLIDE_HEIGHT}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                className="h-full w-full object-contain object-center"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:left-3 md:h-11 md:w-11"
            aria-label={locale === "zh" ? "上一张" : "Previous slide"}
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:right-3 md:h-11 md:w-11"
            aria-label={locale === "zh" ? "下一张" : "Next slide"}
          >
            →
          </button>

          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-3">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all shadow-sm ${
                  i === index ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`${locale === "zh" ? "第" : "Slide"} ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
