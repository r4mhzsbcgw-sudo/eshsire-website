"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { homeCarouselSlides } from "@/lib/images";

const INTERVAL_MS = 6000;

type CarouselContent = (typeof import("@/i18n/dictionaries/en").en.home.hero.carousel.slides)[number];

function slideCaption(content: CarouselContent): { title: string; subtitle: string } {
  if ("years" in content && content.years) {
    return {
      title: `${content.years} · ${content.title}`,
      subtitle: content.subtitle,
    };
  }
  if ("titleLine1" in content && content.titleLine1) {
    return {
      title: `${content.titleLine1} ${content.titleAccent}`,
      subtitle: content.subtitle,
    };
  }
  if ("whyTitle" in content && content.whyTitle) {
    return {
      title: content.title,
      subtitle: content.subtitle,
    };
  }
  return { title: "", subtitle: "" };
}

export function Hero() {
  const { locale, dict } = useLocale();
  const [index, setIndex] = useState(0);
  const hero = dict.home.hero;
  const carousel = hero.carousel;

  const slides = homeCarouselSlides.map((s, i) => ({
    image: s.image,
    alt: locale === "zh" ? s.altZh : s.altEn,
    caption: slideCaption(carousel.slides[i]),
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
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-industrial-slate/20">
          <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 1280px"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 md:left-4 md:h-10 md:w-10"
              aria-label={carousel.prev}
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 md:right-4 md:h-10 md:w-10"
              aria-label={carousel.next}
            >
              →
            </button>

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`${carousel.slide} ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${locale}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/10 bg-industrial-dark/80 px-5 py-4 text-center md:px-8 md:py-5"
            >
              <p className="text-sm font-bold text-white md:text-base lg:text-lg">{slide.caption.title}</p>
              <p className="mt-1 text-xs text-industrial-light md:text-sm">{slide.caption.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 text-center md:px-12">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">{hero.title}</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-industrial-light md:text-base">{hero.subtitle}</p>
      </div>
    </section>
  );
}
