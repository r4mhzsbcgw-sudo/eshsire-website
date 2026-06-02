import { en } from "../dictionaries/en";

export const factoryItemsEn = en.home.factory.items;

export function navFrom(p: {
  home: string;
  spc: string;
  wall: string;
  factory: string;
  oem: string;
  about: string;
  contact: string;
  catalog: string;
  menu?: string;
}) {
  return {
    home: p.home,
    spcFlooring: p.spc,
    wallPanels: p.wall,
    factory: p.factory,
    oemService: p.oem,
    about: p.about,
    contact: p.contact,
    getCatalog: p.catalog,
    menu: p.menu ?? "Menu",
  };
}

export function commonFrom(p: {
  learnMore: string;
  sendInquiry: string;
  getCatalog: string;
  getQuote: string;
  requestCatalog: string;
  getSamples: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  products: string;
  quickLinks: string;
  contactTitle: string;
}) {
  return {
    ...en.common,
    learnMore: p.learnMore,
    sendInquiry: p.sendInquiry,
    getCatalog: p.getCatalog,
    getQuote: p.getQuote,
    requestCatalog: p.requestCatalog,
    getSamples: p.getSamples,
    contactPerson: p.contactPerson,
    email: p.email,
    phone: p.phone,
    address: p.address,
    products: p.products,
    quickLinks: p.quickLinks,
    contactTitle: p.contactTitle,
  };
}

export function formFrom(p: {
  name: string;
  company: string;
  email: string;
  product: string;
  selectProduct: string;
  message: string;
  placeholder: string;
  submit: string;
  thanks: string;
}) {
  return {
    name: p.name,
    company: p.company,
    email: p.email,
    product: p.product,
    selectProduct: p.selectProduct,
    message: p.message,
    messagePlaceholder: p.placeholder,
    submit: p.submit,
    thanks: p.thanks,
  };
}
