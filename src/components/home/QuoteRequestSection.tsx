"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { useLocale } from "@/context/LocaleContext";

export function QuoteRequestSection() {
  const { dict } = useLocale();
  const q = dict.home.quoteSection;

  return (
    <section id="get-quote" className="section-padding bg-industrial-dark" aria-labelledby="quote-section-heading">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="section-label">{q.label}</p>
          <h2 id="quote-section-heading" className="section-heading">
            {q.title}
          </h2>
          <p className="mt-4 text-base text-industrial-light md:text-lg">{q.description}</p>
        </FadeIn>
        <FadeIn delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <QuoteRequestForm sourcePage="homepage-quote" compact />
        </FadeIn>
      </div>
    </section>
  );
}
