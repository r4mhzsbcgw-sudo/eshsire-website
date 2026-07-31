"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { homeCarouselSlides } from "@/lib/images";

const INTERVAL_MS = 6000;
const SWIPE_THRESHOLD_PX = 40;

export function Hero() {
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const slides = homeCarouselSlides.map((slide) => ({
    image: slide.image,
    fallback: slide.fallback,
    alt: locale === "zh" ? slide.altZh : slide.altEn,
  }));

  const goTo = useCallback(
    (nextIndex: number) => setIndex((nextIndex + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, next]);

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    setIsPaused(true);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    setIsPaused(false);
    if (startX === null || endX === undefined) return;
    const distance = endX - startX;
    if (Math.abs(distance) < SWIPE_THRESHOLD_PX) return;
    if (distance < 0) next();
    else prev();
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-white pt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="ESHSIRE company and product overview"
    >
      <div className="relative mx-auto w-full max-w-7xl px-2 sm:px-4 md:px-8">
        <div className="relative aspect-[1672/941] w-full overflow-hidden rounded-lg bg-white">
          <AnimatePresence mode="wait">
            <motion.picture
              key={slides[index].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 block h-full w-full bg-white"
            >
              <source srcSet={slides[index].image} type="image/webp" />
              {/* Supplied artwork is already optimized; PNG is the WebP fallback. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slides[index].fallback}
                alt={slides[index].alt}
                width={1672}
                height={941}
                className="h-full w-full select-none object-contain object-center"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding={index === 0 ? "sync" : "async"}
                draggable={false}
              />
            </motion.picture>
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-lg font-bold text-blue-900 shadow-md transition-colors hover:border-blue-700 hover:bg-white sm:left-3 sm:h-10 sm:w-10"
            aria-label="Previous slide"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-lg font-bold text-blue-900 shadow-md transition-colors hover:border-blue-700 hover:bg-white sm:right-3 sm:h-10 sm:w-10"
            aria-label="Next slide"
          >
            {">"}
          </button>

          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-white/85 px-3 py-2 shadow-sm sm:bottom-3">
            {slides.map((_, slideIndex) => (
              <button
                key={slideIndex}
                type="button"
                onClick={() => goTo(slideIndex)}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === index
                    ? "w-8 bg-blue-800"
                    : "w-2 bg-slate-400 hover:bg-blue-600"
                }`}
                aria-label={`Slide ${slideIndex + 1}`}
                aria-current={slideIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
