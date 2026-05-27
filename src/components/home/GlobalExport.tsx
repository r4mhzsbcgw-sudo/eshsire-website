"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { motion } from "framer-motion";

/** Approximate map positions for export market labels */
const positions = [
  { x: "48%", y: "28%" }, // Europe
  { x: "58%", y: "40%" }, // Middle East
  { x: "74%", y: "50%" }, // Southeast Asia
  { x: "50%", y: "56%" }, // Africa
  { x: "22%", y: "34%" }, // North America
  { x: "30%", y: "70%" }, // South America
  { x: "84%", y: "66%" }, // Australia & NZ
  { x: "64%", y: "30%" }, // Central Asia
];

export function GlobalExport() {
  const { dict } = useLocale();
  const g = dict.home.global;

  return (
    <section className="section-padding bg-industrial-dark">
      <div className="mx-auto max-w-7xl">
        <SectionHeader label={g.label} title={g.title} description={g.description} centered />
        <FadeIn className="relative mx-auto mt-16 aspect-[2/1] max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-industrial-slate/30">
          <svg viewBox="0 0 800 400" className="h-full w-full opacity-30" fill="currentColor">
            <ellipse cx="400" cy="200" rx="380" ry="180" className="text-industrial-steel" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-full w-full max-w-3xl">
              {g.markets.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="absolute"
                  style={{
                    left: positions[i]?.x ?? "50%",
                    top: positions[i]?.y ?? "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="relative flex h-3 w-3 md:h-4 md:w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-accent md:h-4 md:w-4" />
                  </span>
                  <span className="absolute left-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-white sm:block md:left-6 md:text-xs">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2 md:bottom-6 md:left-6 md:right-6 md:gap-3 md:justify-start">
            {g.markets.map((m) => (
              <span
                key={m}
                className="glass-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider md:px-4 md:py-2 md:text-xs"
              >
                {m}
              </span>
            ))}
          </div>
        </FadeIn>
        <p className="mt-8 text-center text-6xl font-light text-accent md:text-8xl">30+</p>
        <p className="mt-2 text-center text-xs uppercase tracking-[0.25em] text-industrial-mist">
          {g.countriesLabel}
        </p>
      </div>
    </section>
  );
}
