/**
 * Site images 閳?set USE_LOCAL_IMAGES = true after adding files under public/images/
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

// 閳ユ柡鈧柡鈧?Home 閳ユ柡鈧柡鈧?
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
  hero: "/images/home/factory/01-production.jpg",
  heroVideo: null as string | null,
  spcFlooring:
    "/images/home/factory/01-production.jpg",
  wallPanels:
    "/images/home/factory/01-production.jpg",
  accessories:
    "/images/home/factory/01-production.jpg",
} as const;

// 閳ユ柡鈧柡鈧?About / company 閳ユ柡鈧柡鈧?
const aboutRemote = {
  hero: "/images/home/factory/01-production.jpg",
  story: "/images/home/factory/01-production.jpg",
  gallery: [
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
  ],
};

// 閳ユ柡鈧柡鈧?SPC Flooring 閳ユ柡鈧柡鈧?
const spcRemote = {
  hero: "/images/home/factory/01-production.jpg",
  featured: "/images/home/factory/01-production.jpg",
  gallery: [
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
  ],
  applications: [
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
  ],
};

// 閳ユ柡鈧柡鈧?Wall Panels 閳ユ柡鈧柡鈧?
const wallRemote = {
  hero: "/images/home/factory/01-production.jpg",
  gallery: [
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
  ],
  /** One image per product line card (3 items) */
  productLines: [
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
    "/images/home/factory/01-production.jpg",
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

/** Homepage hero carousel */
export const homeCarouselSlides = [
  {
    image: "/images/home/carousel/slide-01.jpg",
    altEn: "Eshsire factory building and 30 years manufacturing",
    altZh: "Eshsire Group factory building and 30 years manufacturing strength",
  },
  {
    image: "/images/home/carousel/slide-02.jpg",
    altEn: "SPC flooring and WPC wall panel manufacturer",
    altZh: "SPC flooring and WPC wall panel manufacturer",
  },
  {
    image: "/images/home/carousel/slide-03.jpg",
    altEn: "Manufacturing capability and global buyer services",
    altZh: "Manufacturing capability and global buyer services",
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
          "/images/home/factory/01-production.jpg",
          "/images/home/factory/01-production.jpg",
          "/images/home/factory/01-production.jpg",
          "/images/home/factory/01-production.jpg",
          "/images/home/factory/01-production.jpg",
          "/images/home/factory/01-production.jpg",
        ];
  },
  localPaths: homeLocal,
};

/** @deprecated Use getCaseImage from @/content/projects/case-images */
export {
  projectImages,
  getProjectImageSet,
  getProjectThumbnail,
  getAllProjectImageSets,
} from "./project-images";

export const aboutImages = {
  get hero() {
    return USE_LOCAL_IMAGES ? localPath("about", "hero.jpg") : aboutRemote.hero;
  },
  get story() {
    return USE_LOCAL_IMAGES ? localPath("about", "gallery", "02.jpg") : aboutRemote.story;
  },
  get gallery() {
    return USE_LOCAL_IMAGES
      ? galleryLocal("about/gallery", 6)
      : aboutRemote.gallery.slice(0, 6);
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
  get applications() {
    if (USE_LOCAL_IMAGES) {
      return [
        localPath("blog", "7-mistakes", "05.jpg"),
        localPath("blog", "7-mistakes", "03.jpg"),
        localPath("blog", "7-mistakes", "01.jpg"),
        localPath("blog", "7-mistakes", "02.jpg"),
        localPath("blog", "7-mistakes", "06.jpg"),
        localPath("blog", "7-mistakes", "04.jpg"),
      ];
    }
    return spcRemote.applications;
  },
};

export const factoryPageImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("home", "factory", "01-production.jpg")
      : "/images/home/factory/01-production.jpg";
  },
};

export const oemImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("home", "factory", "05-oem.jpg")
      : "/images/home/factory/01-production.jpg";
  },
};

export const contactImages = {
  get hero() {
    return USE_LOCAL_IMAGES
      ? localPath("home", "spc-flooring.jpg")
      : "/images/home/factory/01-production.jpg";
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
