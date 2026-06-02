"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ImageLightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  closeLabel: string;
}

export function ImageLightbox({ open, onClose, src, alt, closeLabel }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-industrial-dark/95 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label={alt}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
          >
            {closeLabel}
          </button>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative h-[85vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" priority />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ClickableImageCardProps {
  src: string;
  alt: string;
  title: string;
  expandHint: string;
  imageClassName: string;
  onOpen: () => void;
}

export function ClickableImageCard({
  src,
  alt,
  title,
  expandHint,
  imageClassName,
  onOpen,
}: ClickableImageCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 text-left transition-colors hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={`${title} — ${expandHint}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes="(max-width: 1280px) 33vw, 400px"
        quality={92}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/40 to-transparent" />
      <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/20 bg-industrial-dark/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
        +
      </span>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-industrial-dark/90 via-industrial-dark/50 to-transparent p-4 pt-10">
        <div className="glass-card inline-block px-4 py-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
        </div>
      </div>
      <span className="pointer-events-none absolute bottom-14 left-0 right-0 text-center text-[10px] text-industrial-light opacity-0 transition-opacity group-hover:opacity-100">
        {expandHint}
      </span>
    </button>
  );
}
