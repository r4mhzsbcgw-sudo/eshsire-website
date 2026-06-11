"use client";

import type { ComponentType } from "react";
import type { SupplyFlowIconId } from "@/content/projects/supply-flow-icons";

type SupplyFlowIconProps = {
  id: SupplyFlowIconId;
  className?: string;
};

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconVideoSample({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect {...stroke} x="8" y="12" width="32" height="24" rx="3" />
      <path {...stroke} d="M22 18l10 6-10 6V18z" fill="currentColor" stroke="none" />
      <rect {...stroke} x="14" y="38" width="20" height="4" rx="1" />
    </svg>
  );
}

function IconChecklist({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect {...stroke} x="10" y="8" width="28" height="34" rx="2" />
      <path {...stroke} d="M16 18h16M16 24h16M16 30h10" />
      <path {...stroke} d="M32 18l2 2 4-5" strokeWidth={2} />
      <path {...stroke} d="M32 24l2 2 4-5" strokeWidth={2} />
    </svg>
  );
}

function IconCalendarSchedule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect {...stroke} x="8" y="12" width="32" height="28" rx="2" />
      <path {...stroke} d="M8 20h32M16 8v8M32 8v8" />
      <circle {...stroke} cx="18" cy="28" r="2" fill="currentColor" stroke="none" />
      <circle {...stroke} cx="24" cy="28" r="2" fill="currentColor" stroke="none" />
      <circle {...stroke} cx="30" cy="28" r="2" fill="currentColor" stroke="none" />
      <path {...stroke} d="M14 34h20" strokeWidth={2.5} />
    </svg>
  );
}

function IconFactoryVideo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M6 34V20l10-6 10 6v14" />
      <path {...stroke} d="M26 34V16l10-6 6 4v20" />
      <rect {...stroke} x="30" y="22" width="10" height="8" rx="1" />
      <path {...stroke} d="M32 25l5 3-5 3v-6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPackagingBox({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M10 18 24 10l14 8v20l-14 8-14-8V18z" />
      <path {...stroke} d="M24 10v36M10 18l14 8 14-8" />
      <rect {...stroke} x="17" y="24" width="14" height="7" rx="1" />
      <path {...stroke} d="M19 27h10M19 29h6" />
    </svg>
  );
}

function IconMagnifierCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle {...stroke} cx="20" cy="20" r="9" />
      <path {...stroke} d="M27 27l8 8" strokeWidth={2} />
      <path {...stroke} d="M16 20l3 3 6-6" strokeWidth={2} />
    </svg>
  );
}

function IconContainerCamera({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect {...stroke} x="6" y="16" width="26" height="20" rx="2" />
      <path {...stroke} d="M32 22h6v12h-6" />
      <rect {...stroke} x="36" y="12" width="7" height="6" rx="1" />
      <circle {...stroke} cx="39.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
      <path {...stroke} d="M10 24h14M10 28h10" />
    </svg>
  );
}

function IconAfterSalesSupport({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M12 28a12 12 0 1 1 24 0v4H12v-4z" />
      <path {...stroke} d="M18 36h12M20 40h8" />
      <path {...stroke} d="M30 14a8 8 0 1 1-6 17.5" />
      <path {...stroke} d="M18 31.5h6v-5" />
    </svg>
  );
}

const ICONS: Record<SupplyFlowIconId, ComponentType<{ className?: string }>> = {
  "video-sample": IconVideoSample,
  checklist: IconChecklist,
  "calendar-schedule": IconCalendarSchedule,
  "factory-video": IconFactoryVideo,
  "packaging-box": IconPackagingBox,
  "magnifier-check": IconMagnifierCheck,
  "container-camera": IconContainerCamera,
  "after-sales-support": IconAfterSalesSupport,
};

export function SupplyFlowIcon({ id, className = "h-10 w-10" }: SupplyFlowIconProps) {
  const Icon = ICONS[id];
  return <Icon className={className} />;
}
