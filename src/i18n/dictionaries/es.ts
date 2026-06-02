import type { Dictionary } from "./en";
import { en } from "./en";

/** Spanish — extends English structure with full UI copy */
export const es: Dictionary = {
  ...en,
  meta: {
    ...en.meta,
    siteTitle: "Eshsire Group | Fabricante de Suelos SPC y Paneles Murales en China",
    siteDescription:
      "Eshsire Group — 30 años de fabricación OEM de suelos SPC y paneles murales en Pekín, China. Impermeable, resistente al fuego. Exportación a más de 30 países.",
    pages: {
      home: "Inicio",
      spcFlooring: "Suelos SPC",
      wallPanels: "Paneles Murales",
      factory: "Fábrica",
      oemService: "Servicio OEM",
      about: "Nosotros",
      contact: "Contacto",
    },
    pageDesc: {
      spcFlooring:
        "Suelos SPC impermeables de grado comercial OEM de Eshsire Group. Click-lock, resistente al fuego, exportación mundial.",
      wallPanels:
        "Paneles murales SPC, mármol UV y materiales decorativos interiores de Eshsire Group China.",
      factory:
        "Fábrica de suelos SPC de 6000㎡ en Pekín. Líneas de producción, QC, almacén y experiencia en carga de contenedores.",
      oemService:
        "Fabricación OEM y ODM de suelos SPC y paneles murales. Embalaje personalizado, marca y etiqueta privada.",
      about:
        "Sobre Eshsire Group — 30 años fabricando suelos SPC y materiales decorativos interiores en Pekín.",
      contact:
        "Contacte a Eshsire Group para catálogo y cotización de suelos SPC. Jason — WhatsApp +86 15313057097.",
    },
  },
  nav: {
    home: "Inicio",
    spcFlooring: "Suelos SPC",
    wallPanels: "Paneles",
    factory: "Fábrica",
    oemService: "OEM",
    about: "Nosotros",
    contact: "Contacto",
    getCatalog: "Catálogo",
    menu: "Menú",
  },
  common: {
    ...en.common,
    learnMore: "Más información",
    whatsapp: "WhatsApp",
    whatsappUs: "WhatsApp",
    sendInquiry: "Enviar consulta",
    getCatalog: "Obtener catálogo",
    getQuote: "Cotización",
    requestCatalog: "Solicitar catálogo",
    getSamples: "Muestras",
    contactPerson: "Contacto",
    email: "Correo",
    phone: "Teléfono",
    wechat: "WeChat",
    address: "Dirección",
    products: "Productos",
    quickLinks: "Enlaces",
    contactTitle: "Contacto",
  },
  gallery: {
    expandHint: "Haga clic en una imagen para ampliar",
    close: "Cerrar",
    photoAlt: "Foto",
  },
  companyIntro: {
    tagline: "ESHSIRE GROUP | MÁS DE 30 AÑOS DE EXCELENCIA MANUFACTURERA",
    viewMore: "Ver más",
    title: "Nuestras ventajas",
    description:
      "Eshsire Group opera una planta de 6000㎡ en Pekín con líneas profesionales de suelos SPC y paneles murales, equipos de QC dedicados y personal de exportación con experiencia para socios B2B globales.",
    description2:
      "Nos enfocamos en calidad estable, flexibilidad OEM/ODM y entrega puntual a Europa, Oriente Medio, Sudeste Asiático y más.",
    playVideo: "Reproducir video corporativo",
  },
  whatsapp: {
    defaultMessage:
      "Hola Eshsire Group, estoy interesado en suelos SPC / paneles murales. Por favor envíen catálogo y cotización.",
    inquiryHeader: "*Consulta desde el sitio web Eshsire*",
    name: "Nombre",
    company: "Empresa",
    product: "Producto",
    message: "Mensaje",
    chatLabel: "Chat en WhatsApp",
    contactJason: "WhatsApp Jason",
  },
  home: {
    ...en.home,
    products: {
      label: "Productos",
      title: "Soluciones profesionales de suelos SPC y paneles murales",
      description:
        "Materiales decorativos impermeables y resistentes al desgaste de grado ingeniería para distribuidores globales.",
      spc: {
        title: "Suelos SPC",
        desc: "Suelos de núcleo rígido impermeables de grado comercial para proyectos globales.",
      },
      wall: {
        title: "Paneles murales",
        desc: "Paneles murales SPC y decorativos interiores con acabados modernos.",
      },
      accessories: {
        title: "Accesorios",
        desc: "Rodapiés, perfiles, base y accesorios de instalación.",
      },
    },
    factory: {
      ...en.home.factory,
      label: "Fábrica",
      title: "Fortaleza manufacturera en la que puede confiar",
      description:
        "Instalación de 6000㎡ con líneas profesionales, sistemas de QC y capacidad de exportación global.",
      qualityTitle: "Inspección de calidad",
      qualityTests: [
        "Prueba de fábrica",
        "Prueba de resistencia al rayado",
        "Prueba de resistencia a manchas de aceite",
        "Prueba de resistencia al fuego",
      ],
      items: [
        "Línea de producción",
        "Inspección de calidad",
        "Almacén",
        "Carga de contenedores",
        "Embalaje OEM",
        "Experiencia de exportación",
      ],
    },
    why: {
      label: "Ventajas",
      title: "Por qué elegir Eshsire Group",
      items: [
        { title: "Calidad comercial", desc: "Calidad constante para proyectos a gran escala" },
        { title: "MOQ bajo y pedidos flexibles", desc: "Pedidos de prueba y mixtos, bajo riesgo de inventario" },
        { title: "Certificaciones completas", desc: "CE/Floorscore, listo para mercados globales" },
        { title: "Precio directo de fábrica", desc: "Suministro directo para mejorar su margen" },
        { title: "Soporte técnico experto", desc: "Muestras y guía de instalación para sus proyectos" },
        { title: "Entrega global fiable", desc: "Entrega puntual a más de 30 países" },
      ],
    },
    global: {
      label: "Exportación global",
      title: "Servimos mercados en todo el mundo",
      description:
        "Socio OEM de confianza para distribuidores y contratistas en los principales mercados de suelos.",
      markets: [
        "Europa",
        "Oriente Medio",
        "Sudeste Asiático",
        "África",
        "Norteamérica",
        "Sudamérica",
        "Australia y NZ",
        "Asia Central",
      ],
      countriesLabel: "Países de exportación",
    },
    video: {
      label: "Tour de fábrica",
      title: "Vea nuestra producción en acción",
      description:
        "Líneas avanzadas de suelos SPC y paneles murales con control de calidad estricto en cada etapa.",
    },
    cta: {
      title: "¿Busca un proveedor fiable de suelos SPC?",
      description:
        "Contacte a Jason y nuestro equipo para catálogo, muestras y cotización OEM. Respuesta en 24 horas.",
    },
  },
  spcFlooring: {
    ...en.spcFlooring,
    heroSubtitle:
      "Suelos de núcleo rígido impermeables para proyectos comerciales y residenciales globales.",
    productTitle: "SPC de núcleo rígido premium",
    productDesc:
      "Nuestros suelos SPC combinan tecnología de núcleo piedra-plástico con capas de desgaste de calidad europea para alto tráfico.",
    galleryTitle: "Colección de suelos SPC",
    galleryDesc: "Contáctenos para miles de colores exclusivos personalizables.",
  },
  wallPanels: {
    ...en.wallPanels,
    heroSubtitle:
      "Paneles SPC, mármol UV y decorativos para proyectos residenciales y comerciales.",
    title: "Soluciones de pared interior",
    galleryTitle: "Colección de paneles murales",
  },
  factoryPage: {
    ...en.factoryPage,
    heroSubtitle:
      "Planta avanzada con líneas profesionales, QC estricto y experiencia de exportación global.",
    capabilitiesTitle: "De la producción al contenedor",
  },
  oem: {
    ...en.oem,
    heroSubtitle: "Socio fabricante que entiende los requisitos B2B globales.",
    servicesTitle: "Asociación OEM completa",
    processTitle: "Flujo de trabajo OEM",
    startProject: "Inicie su proyecto OEM",
  },
  about: {
    ...en.about,
    heroSubtitle:
      "Fabricante chino de confianza para socios B2B globales con integridad y excelencia industrial.",
    storyTitle: "30 años de excelencia manufacturera",
  },
  contact: {
    ...en.contact,
    heroSubtitle: "Catálogo, muestras y cotización OEM. Respondemos en 24 horas.",
    getInTouch: "Póngase en contacto",
    sendInquiry: "Envíe su consulta",
    form: {
      ...en.contact.form,
      name: "Su nombre *",
      company: "Empresa *",
      email: "Correo *",
      product: "Producto de interés *",
      selectProduct: "Seleccione producto",
      message: "Detalles del proyecto *",
      messagePlaceholder: "Cantidad, especificaciones, mercado destino...",
      submit: "Enviar consulta por WhatsApp",
      thanks: "¡Gracias! También contáctenos en",
    },
  },
  footer: {
    tagline:
      "Fabricante profesional de suelos SPC y paneles murales de China. OEM y ODM para socios B2B globales desde hace más de 30 años.",
    copyright: "Todos los derechos reservados.",
    seoLine: "Fabricante SPC | OEM paneles murales | Exportación China",
  },
  productList: [
    "Suelos SPC",
    "Paneles murales SPC",
    "Paneles mármol UV",
    "Materiales decorativos interiores",
  ],
};
