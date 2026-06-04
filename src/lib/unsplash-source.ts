/**
 * Project portfolio cover images — one per case study, keyword-matched industry context.
 */
const SIZE = "w=1200&h=900&fit=crop&auto=format&q=80";

function photo(id: string): string {
  return `https://images.unsplash.com/${id}?${SIZE}`;
}

/** Primary cover keyword per project (8 items) */
const PROJECT_COVER_KEYWORDS = [
  "warehouse",
  "hotel,interior",
  "school,building",
  "modern,apartment",
  "office,interior",
  "distribution,center",
  "hospital,corridor",
  "luxury,villa",
] as const;

const KEYWORD_PHOTOS: Record<string, string> = {
  warehouse: "photo-1586528116311-ad8dd3c8310d",
  "hotel,interior": "photo-1566073771259-6a8506099945",
  "school,building": "photo-1580582932707-520aed937b7b",
  "modern,apartment": "photo-1505693416388-ac5ce068fe85",
  "office,interior": "photo-1497366754035-f200968a6e72",
  "distribution,center": "photo-1553413077-190dd305871c",
  showroom: "photo-1615529328331-f8917597711f",
  "hospital,corridor": "photo-1519494026892-80bbd2d6fd0d",
  "luxury,villa": "photo-1600607687939-ce8a6c25118c",
};

function coverImage(keyword: string): string {
  const id = KEYWORD_PHOTOS[keyword];
  return id ? photo(id) : `https://source.unsplash.com/1600x900/?${encodeURIComponent(keyword)}`;
}

export const projectImages = PROJECT_COVER_KEYWORDS.map(coverImage) as readonly string[];
