/**
 * Site images — set USE_LOCAL_IMAGES = true after adding files under public/images/
 * See public/images/README.md
 */
export const USE_LOCAL_IMAGES = true;

function localPath(...parts: string[]) {
  return `/images/${parts.join("/")}`;
}

function galleryLocal(folder: string, count: number) {
  return Array.from({ length: count }, (_, i) =>
    localPath(folder, `${String(i + 1).padStart(2, "0")}.jpg`)
  );
}

// ——— Home ———
const homeLocal = {
  hero: localPath("home", "hero.jpg"),
  heroVideo: localPath("home", "hero.mp4"),
  heroBanner: localPath("home", "hero-banner.jpg"),
  spcFlooring: localPath("home", "spc-flooring.jpg"),
  wallPanels: localPath("home", "wall-panels.jpg"),
  accessories: localPath("home", "accessories.jpg"),
  factoryVideoBg: localPath("home", "factory-video-bg.jpg"),
  factoryStrength: [
    localPath("home", "factory", "01-production.jpg"),
    localPath("home", "factory", "02-quality.jpg"),
    localPath("home", "factory", "03-warehouse.jpg"),
    localPath("home", "factory", "04-loading.jpg"),
    localPath("home", "factory", "05-oem.jpg"),
    localPath("home", "factory", "06-export.jpg"),
  ],
} as const;

const homeRemote = {
  hero: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2400&auto=format&fit=crop",
  heroVideo: null as string | null,
  spcFlooring:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  wallPanels:
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop",
  accessories:
    "https://images.unsplash.com/photo-1504307653784-8cf7f27f0e51?q=80&w=1200&auto=format&fit=crop",
} as const;

// ——— About / company ———
const aboutRemote = {
  hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop",
  story: "https://images.unsplash.com/photo-1565043666747-69f6446eee2e?q=80&w=1200&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565043666747-69f6446eee2e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acddeaa?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494412574643-ff11f5eec532?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
  ],
};

// ——— SPC Flooring ———
const spcRemote = {
  hero: "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2400&auto=format&fit=crop",
  featured: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600573472592-401b049a0ad2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd7a?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492490-0941a2f05356?q=80&w=1200&auto=format&fit=crop",
  ],
};

// ——— Wall Panels ———
const wallRemote = {
  hero: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2400&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615874959470-d609969a20ed?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-54f46f614f8?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509358-9dc75530773b?q=80&w=1200&auto=format&fit=crop",
  ],
  /** One image per product line card (3 items) */
  productLines: [
    "https://images.unsplash.com/photo-1615874959470-d609969a20ed?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
  ],
};

type HomeSharedKey = keyof typeof homeLocal & keyof typeof homeRemote;
type HomeStringKey = {
  [K in HomeSharedKey]:
    (typeof homeLocal)[K] extends string
      ? (typeof homeRemote)[K] extends string
        ? K
        : never
      : never;
}[HomeSharedKey];

function pickHome<K extends HomeStringKey>(key: K): string {
  return USE_LOCAL_IMAGES ? homeLocal[key] : homeRemote[key];
}

/** Homepage hero carousel — prefer WebP; JPG fallback for older browsers via picture in Hero */
export const homeCarouselSlides = [
  {
    src: "/images/home/carousel/slide-01.webp",
    fallback: "/images/home/hero-banner.jpg",
    altEn: "Eshsire factory and 20 years manufacturing strength",
    altZh: "壹曙科技工厂与 20 年制造实力",
  },
  {
    src: "/images/home/carousel/slide-02.webp",
    fallback: "/images/home/spc-flooring.jpg",
    altEn: "20+ years in building and decor manufacturing",
    altZh: "20+ 年建筑与装饰材料制造经验",
  },
  {
    src: "/images/home/carousel/slide-03.webp",
    fallback: "/images/home/factory/02-quality.jpg",
    altEn: "Certifications including ISO, CE and SGS",
    altZh: "ISO、CE、SGS 等资质认证",
  },
] as const;

export const homeImages = {
  get hero() {
    return pickHome("hero");
  },
  get heroVideo() {
    return USE_LOCAL_IMAGES ? homeLocal.heroVideo : homeRemote.heroVideo;
  },
  get heroBanner() {
    return USE_LOCAL_IMAGES ? homeLocal.heroBanner : homeRemote.hero;
  },
  get spcFlooring() {
    return pickHome("spcFlooring");
  },
  get wallPanels() {
    return pickHome("wallPanels");
  },
  get accessories() {
    return pickHome("accessories");
  },
  get factoryVideoBg() {
    return USE_LOCAL_IMAGES ? homeLocal.factoryVideoBg : homeRemote.hero;
  },
  get factoryStrength() {
    return USE_LOCAL_IMAGES
      ? homeLocal.factoryStrength
      : [
          "https://images.unsplash.com/photo-1565043666747-69f6446eee2e?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581092918056-0c4c3acddeaa?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1494412574643-ff11f5eec532?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
        ];
  },
  localPaths: homeLocal,
};

export const aboutImages = {
  get hero() {
    return USE_LOCAL_IMAGES ? localPath("about", "hero.jpg") : aboutRemote.hero;
  },
  get story() {
    return USE_LOCAL_IMAGES ? localPath("about", "story.jpg") : aboutRemote.story;
  },
  get gallery() {
    return USE_LOCAL_IMAGES
      ? galleryLocal("about/gallery", 8)
      : aboutRemote.gallery;
  },
};

export const spcFlooringImages = {
  get hero() {
    return USE_LOCAL_IMAGES ? localPath("products", "spc", "featured.jpg") : spcRemote.hero;
  },
  get featured() {
    return USE_LOCAL_IMAGES ? localPath("products", "spc", "featured.jpg") : spcRemote.featured;
  },
  get gallery() {
    return USE_LOCAL_IMAGES
      ? galleryLocal("products/spc/gallery", 8)
      : spcRemote.gallery;
  },
};

export const factoryPageImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("home", "factory", "01-production.jpg")
      : "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2400&auto=format&fit=crop";
  },
};

export const oemImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("home", "factory", "05-oem.jpg")
      : "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2400&auto=format&fit=crop";
  },
};

export const contactImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("home", "spc-flooring.jpg")
      : "https://images.unsplash.com/photo-1423666639041-f56000c27a93?q=80&w=2400&auto=format&fit=crop";
  },
};

export const accessoriesImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("home", "accessories.jpg")
      : homeRemote.accessories;
  },
};

export const wallPanelImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("products", "wall-panels", "hero.jpg")
      : wallRemote.hero;
  },
  get gallery() {
    return USE_LOCAL_IMAGES
      ? galleryLocal("products/wall-panels/gallery", 8)
      : wallRemote.gallery;
  },
  get productLines() {
    return USE_LOCAL_IMAGES
      ? [
          localPath("products", "wall-panels", "line-uv.jpg"),
          localPath("products", "wall-panels", "line-decor.jpg"),
          localPath("products", "wall-panels", "line-spc.jpg"),
        ]
      : wallRemote.productLines;
  },
};
