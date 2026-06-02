import { en } from "./dictionaries/en";
import type { LocalePack } from "./build-locale-dict";

type Pages = {
  home: string;
  spcFlooring: string;
  wallPanels: string;
  factory: string;
  oemService: string;
  about: string;
  contact: string;
};

type WhyItem = { title: string; desc: string };

export function createLocalePack(input: {
  siteTitle: string;
  siteDescription: string;
  pages: Pages;
  pageDesc: Pages;
  nav: typeof en.nav;
  common: Partial<typeof en.common>;
  gallery: typeof en.gallery;
  companyIntro: typeof en.companyIntro;
  whatsapp: Partial<typeof en.whatsapp> & { defaultMessage: string };
  products: {
    label: string;
    title: string;
    description: string;
    spc: { title: string; desc: string };
    wall: { title: string; desc: string };
    accessories: { title: string; desc: string };
  };
  factory: {
    label: string;
    title: string;
    description: string;
    items: string[];
  };
  why: { label: string; title: string; items: WhyItem[] };
  global: {
    label: string;
    title: string;
    description: string;
    markets: string[];
    countriesLabel: string;
  };
  video: { label: string; title: string; description: string };
  cta: { title: string; description: string };
  footer: typeof en.footer;
  productList: string[];
  contact: {
    heroSubtitle: string;
    getInTouch: string;
    sendInquiry: string;
    form: Partial<typeof en.contact.form>;
  };
  spcHero?: string;
  wallHero?: string;
  factoryHero?: string;
  oemHero?: string;
  aboutHero?: string;
}): LocalePack {
  return {
    meta: {
      ...en.meta,
      siteTitle: input.siteTitle,
      siteDescription: input.siteDescription,
      pages: input.pages,
      pageDesc: input.pageDesc,
    },
    nav: input.nav,
    common: { ...en.common, ...input.common },
    gallery: input.gallery,
    companyIntro: input.companyIntro,
    whatsapp: { ...en.whatsapp, ...input.whatsapp },
    home: {
      ...en.home,
      products: input.products,
      factory: { ...en.home.factory, ...input.factory },
      why: input.why,
      global: input.global,
      video: input.video,
      cta: input.cta,
    },
    spcFlooring: {
      ...en.spcFlooring,
      ...(input.spcHero ? { heroSubtitle: input.spcHero } : {}),
    },
    wallPanels: {
      ...en.wallPanels,
      ...(input.wallHero ? { heroSubtitle: input.wallHero } : {}),
    },
    factoryPage: {
      ...en.factoryPage,
      ...(input.factoryHero ? { heroSubtitle: input.factoryHero } : {}),
    },
    oem: {
      ...en.oem,
      ...(input.oemHero ? { heroSubtitle: input.oemHero } : {}),
    },
    about: {
      ...en.about,
      ...(input.aboutHero ? { heroSubtitle: input.aboutHero } : {}),
    },
    contact: {
      ...en.contact,
      heroSubtitle: input.contact.heroSubtitle,
      getInTouch: input.contact.getInTouch,
      sendInquiry: input.contact.sendInquiry,
      form: { ...en.contact.form, ...input.contact.form },
    },
    footer: input.footer,
    productList: input.productList,
  };
}
