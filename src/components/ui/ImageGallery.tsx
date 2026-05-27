"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  label: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  closeLabel: string;
  expandHint?: string;
}

export function ImageGallery({
  label,
  title,
  description,
  images,
  closeLabel,
  expandHint = "Click to enlarge",
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, goPrev, goNext]);

  if (images.length === 0) return null;

  return (
    <>
      <section className="section-padding border-t border-white/10 bg-industrial-dark/50">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={label} title={title} description={description} centered />
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-industrial-mist">{expandHint}</p>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {images.map((img, i) => (
              <FadeIn key={img.src + i} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-industrial-slate/30 text-left transition-colors hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-industrial-dark/0 transition-colors group-hover:bg-industrial-dark/20" />
                  <span className="absolute bottom-2 right-2 rounded bg-industrial-dark/80 px-2 py-1 text-[10px] uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                    +
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-industrial-dark/95 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 rounded border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              {closeLabel}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20 md:left-6 md:block"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20 md:right-6 md:block"
              aria-label="Next"
            >
              →
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative h-[70vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <p className="absolute -bottom-10 left-0 right-0 text-center text-sm text-industrial-light">
                {images[activeIndex].alt} · {activeIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
