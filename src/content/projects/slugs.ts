export const PROJECT_SLUGS = [
  "africa-distributor",
  "middle-east-hotel",
  "school-flooring",
  "europe-apartment",
  "commercial-office",
  "southeast-asia-distributor",
  "hospital-flooring",
  "villa-wpc-wall-panel",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export function isProjectSlug(value: string): value is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}
