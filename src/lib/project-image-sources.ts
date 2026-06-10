/**
 * Eshsire Group project image registry 鈥?STRICT MODE fixed Pexels URLs (8 projects).
 * Do not substitute IDs outside this file.
 */

export type ImageProvider = "pexels" | "unsplash";

export type SourceSlot = {
  provider: ImageProvider;
  imageId: string;
  sourcePage: string;
  altEn: string;
  downloadUrl?: string;
};

export type ProjectSourceConfig = {
  name: string;
  thumb: SourceSlot;
  banner: SourceSlot;
  content1: SourceSlot;
  content2: SourceSlot;
  content3: SourceSlot;
  ending: SourceSlot;
};

function pexIdFromUrl(url: string): number {
  const m = url.match(/\/photos\/(\d+)\//);
  return m ? Number(m[1]) : 0;
}

function pex(url: string, altEn: string): SourceSlot {
  const id = pexIdFromUrl(url);
  return {
    provider: "pexels",
    imageId: String(id),
    sourcePage: url,
    altEn,
    downloadUrl: url,
  };
}

export const PROJECT_IMAGE_SOURCES: Record<string, ProjectSourceConfig> = {
  "africa-distributor": {
    name: "Africa Warehouse SPC Flooring Project",
    thumb: pex(
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
      "Warehouse distribution center with SPC floor 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
      "Wholesale warehouse interior with installed SPC flooring"
    ),
    content1: pex(
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      "SPC floor planks in warehouse distribution setting"
    ),
    content2: pex(
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      "SPC floor installation detail in commercial space"
    ),
    content3: pex(
      "https://images.pexels.com/photos/776622/pexels-photo-776622.jpeg",
      "SPC floor plank texture and joint close-up"
    ),
    ending: pex(
      "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg",
      "Completed interior with installed SPC wood-look floor"
    ),
  },
  "middle-east-hotel": {
    name: "Middle East Hotel SPC Flooring Project",
    thumb: pex(
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      "Luxury hotel interior SPC floor 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      "Hotel interior with premium SPC flooring"
    ),
    content1: pex(
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "Hotel lobby SPC floor installation"
    ),
    content2: pex(
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg",
      "Hotel guest room SPC wood-look floor"
    ),
    content3: pex(
      "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg",
      "Hotel corridor SPC floor"
    ),
    ending: pex(
      "https://images.pexels.com/photos/1743225/pexels-photo-1743225.jpeg",
      "Hotel SPC floor detail with natural light"
    ),
  },
  "europe-apartment": {
    name: "Europe Apartment SPC Flooring Project",
    // POSITION1 (3153551) downloads as unrelated stock 鈥?use POSITION2 from same list for banner
    thumb: pex(
      "https://images.pexels.com/photos/271631/pexels-photo-271631.jpeg",
      "European apartment living room with SPC floor 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/271631/pexels-photo-271631.jpeg",
      "Apartment interior with SPC floor"
    ),
    content1: pex(
      "https://images.pexels.com/photos/271631/pexels-photo-271631.jpeg",
      "Apartment living room SPC floor"
    ),
    content2: pex(
      "https://images.pexels.com/photos/776622/pexels-photo-776622.jpeg",
      "Bedroom SPC wood-look floor"
    ),
    content3: pex(
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
      "Kitchen with waterproof SPC floor"
    ),
    ending: pex(
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "Finished apartment space with SPC floor"
    ),
  },
  "commercial-office": {
    name: "Commercial Office SPC Flooring Project",
    thumb: pex(
      "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg",
      "Modern office SPC floor 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg",
      "Office interior with SPC flooring"
    ),
    content1: pex(
      "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      "Open office area SPC floor"
    ),
    content2: pex(
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
      "Meeting room SPC floor"
    ),
    content3: pex(
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
      "Office lobby SPC floor"
    ),
    ending: pex(
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg",
      "Commercial SPC floor finish detail"
    ),
  },
  "school-flooring": {
    name: "School SPC Flooring Project",
    // POSITION1 (159775) 404 鈥?use POSITION2 from same list
    thumb: pex(
      "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      "School classroom with SPC floor 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      "School interior with durable SPC flooring"
    ),
    content1: pex(
      "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      "Classroom with installed SPC floor"
    ),
    content2: pex(
      "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg",
      "School corridor SPC floor"
    ),
    content3: pex(
      "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
      "Multi-purpose hall SPC floor"
    ),
    ending: pex(
      "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
      "School hall SPC floor 鈥?finished project view"
    ),
  },
  "hospital-flooring": {
    name: "Hospital SPC Flooring Project",
    // POSITION1/P4/P5 URLs 404 鈥?use working URLs from same project list
    thumb: pex(
      "https://images.pexels.com/photos/4051715/pexels-photo-4051715.jpeg",
      "Hospital ward with SPC floor 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/4051715/pexels-photo-4051715.jpeg",
      "Healthcare facility with SPC flooring"
    ),
    content1: pex(
      "https://images.pexels.com/photos/4051715/pexels-photo-4051715.jpeg",
      "Hospital ward SPC floor"
    ),
    content2: pex(
      "https://images.pexels.com/photos/5274053/pexels-photo-5274053.jpeg",
      "Nursing station SPC floor"
    ),
    content3: pex(
      "https://images.pexels.com/photos/5274053/pexels-photo-5274053.jpeg",
      "Hospital nursing station SPC floor"
    ),
    ending: pex(
      "https://images.pexels.com/photos/4051715/pexels-photo-4051715.jpeg",
      "Healthcare SPC floor finished interior"
    ),
  },
  "villa-wpc-wall-panel": {
    name: "Villa WPC Wall Panel Project",
    // POSITION1 (9843472) downloads as unrelated stock 鈥?use POSITION2 from same list
    thumb: pex(
      "https://images.pexels.com/photos/1029384/pexels-photo-1029384.jpeg",
      "Villa bedroom WPC wall panel 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/1029384/pexels-photo-1029384.jpeg",
      "Living room WPC wall panel installation"
    ),
    content1: pex(
      "https://images.pexels.com/photos/1029384/pexels-photo-1029384.jpeg",
      "Bedroom WPC wall panel finish"
    ),
    content2: pex(
      "https://images.pexels.com/photos/7382910/pexels-photo-7382910.jpeg",
      "Kitchen WPC wall panel finish"
    ),
    content3: pex(
      "https://images.pexels.com/photos/8245871/pexels-photo-8245871.jpeg",
      "Study room WPC wall panels"
    ),
    ending: pex(
      "https://images.pexels.com/photos/4829192/pexels-photo-4829192.jpeg",
      "WPC wall panel installation detail"
    ),
  },
  "southeast-asia-distributor": {
    name: "Commercial WPC Wall Panel Project",
    // POSITION1 (658576) 404 鈥?use POSITION2 from same list
    thumb: pex(
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "Commercial interior WPC wall panel 鈥?project banner"
    ),
    banner: pex(
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "Commercial space with decorative WPC wall panels"
    ),
    content1: pex(
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "Office interior with WPC wall panel feature"
    ),
    content2: pex(
      "https://images.pexels.com/photos/256373/pexels-photo-256373.jpeg",
      "Retail space WPC wall panel cladding"
    ),
    content3: pex(
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
      "Commercial lobby WPC wall panel finish"
    ),
    ending: pex(
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg",
      "WPC wall panel decorative detail in commercial interior"
    ),
  },
};

export function pexelsDownloadUrl(id: number, width = 1200, height = 800) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
}

export function stockDownloadUrl(slot: SourceSlot, width = 1200, height = 800): string {
  if (slot.downloadUrl) {
    const base = slot.downloadUrl.split("?")[0];
    if (base.endsWith(".jpg") && !base.includes("pexels-photo-")) {
      return `${base}?auto=compress&cs=tinysrgb&w=${width}`;
    }
    return `${base}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  }
  if (slot.provider === "pexels") {
    return pexelsDownloadUrl(Number(slot.imageId), width, height);
  }
  return `https://images.unsplash.com/${slot.imageId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}
