"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { homeCarouselSlides } from "@/lib/images";
import { trackEvent } from "@/lib/analytics";

const INTERVAL_MS = 6000;
const POSTER_SLIDE_SIZE = {
  width: 1024,
  height: 546,
};

export function Hero() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const hero = dict.home.hero;
  const [index, setIndex] = useState(0);
  const slides = homeCarouselSlides.map((slide) => ({
    image: slide.image,
    alt: locale === "zh" ? slide.altZh : slide.altEn,
  }));
  const isMarketingSlide = index === 0;
  const isPosterSlide = !isMarketingSlide;

  const goTo = useCallback(
    (nextIndex: number) => setIndex((nextIndex + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [next]);

  function onCatalogClick() {
    trackEvent("catalog_request", {
      page_path: pathname,
      language: locale,
      cta_location: "hero",
    });
  }

  function onQuoteClick() {
    trackEvent("request_quote", {
      page_path: pathname,
      language: locale,
      cta_location: "hero",
    });
  }

  return (
    <section className="relative w-full overflow-hidden bg-industrial-dark pt-20">
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div
          className={`relative overflow-hidden rounded-lg border border-white/10 bg-industrial-dark ${
            isPosterSlide ? "aspect-[1024/546]" : "min-h-[320px] md:min-h-[420px]"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={
                isPosterSlide
                  ? "relative flex h-full w-full items-center justify-center"
                  : "absolute inset-0"
              }
            >
              {isPosterSlide ? (
                <Image
                  src={slides[index].image}
                  alt={slides[index].alt}
                  width={POSTER_SLIDE_SIZE.width}
                  height={POSTER_SLIDE_SIZE.height}
                  className="h-auto w-full object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 1280px"
                />
              ) : (
                <Image
                  src={slides[index].image}
                  alt={slides[index].alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 1280px"
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div
            className={
              isMarketingSlide
                ? "absolute inset-0 bg-gradient-to-r from-industrial-dark/95 via-industrial-dark/75 to-industrial-dark/40"
                : "absolute inset-0 bg-gradient-to-t from-industrial-dark/25 via-transparent to-industrial-dark/10"
            }
          />

          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-industrial-dark/55 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            aria-label={locale === "zh" ? "上一屏" : locale === "es" ? "Diapositiva anterior" : "Previous slide"}
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-industrial-dark/55 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            aria-label={locale === "zh" ? "下一屏" : locale === "es" ? "Siguiente diapositiva" : "Next slide"}
          >
            {">"}
          </button>

          {isMarketingSlide ? (
            <div className="relative z-10 flex h-full flex-col justify-center px-6 py-10 md:px-12 md:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent md:text-sm">
                {hero.label}
              </p>
              <h1 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {hero.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-industrial-light md:text-base lg:text-lg">
                {hero.subtitle}
              </p>
              <ul className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
                {hero.trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs text-industrial-light md:text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={localizedPath(locale, "/contact")}
                  onClick={onCatalogClick}
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-industrial-dark transition-colors hover:bg-accent-hover"
                >
                  {hero.ctaCatalog}
                </Link>
                <Link
                  href={`${localizedPath(locale, "/")}#get-quote`}
                  onClick={onQuoteClick}
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {hero.ctaQuote}
                </Link>
              </div>
            </div>
          ) : null}

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, slideIndex) => (
              <button
                key={slideIndex}
                type="button"
                onClick={() => goTo(slideIndex)}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === index ? "w-8 bg-accent" : "w-2 bg-white/55 hover:bg-white"
                }`}
                aria-label={`${locale === "zh" ? "第" : locale === "es" ? "Diapositiva" : "Slide"} ${slideIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
