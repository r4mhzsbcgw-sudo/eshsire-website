"use client";

import Image from "next/image";
import { useState } from "react";

type CaseImageProps = {
  src: string;
  alt: string;
  pendingLabel: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
};

/** Fixed case image — shows pending label if file missing (no fallback to old assets). */
export function CaseImage({
  src,
  alt,
  pendingLabel,
  fill = false,
  className = "object-cover",
  sizes,
  priority,
  loading,
  quality,
}: CaseImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-industrial-slate/80 p-4 text-center ${fill ? "absolute inset-0" : "aspect-[4/3] w-full"}`}
        role="img"
        aria-label={pendingLabel}
      >
        <p className="text-xs font-medium leading-relaxed text-industrial-mist sm:text-sm">{pendingLabel}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      unoptimized
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
      quality={quality}
      onError={() => setFailed(true)}
    />
  );
}
