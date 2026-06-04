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
      ...en.meta.pages,
      home: "Inicio",
      spcFlooring: "Suelos SPC",
      wallPanels: "Paneles Murales",
      factory: "Fábrica",
      oemService: "Servicio OEM",
      about: "Nosotros",
      contact: "Contacto",
      accessories: "Accesorios",
      faq: "FAQ",
      certifications: "Certificaciones",
      blog: "Blog",
      spcSpecs: "Especificaciones SPC",
    },
    seoTitles: {
      ...en.meta.seoTitles,
      spcFlooring: "Fabricante de Suelos SPC en China | OEM Mayorista | Eshsire Group",
      wallPanels: "Proveedor de Paneles SPC China | Mármol UV | Eshsire Group",
      factory: "Fábrica SPC Pekín 6000㎡ | Producción y QC | Eshsire Group",
      oemService: "OEM ODM Suelos SPC | Embalaje Personalizado | Eshsire Group",
      about: "Sobre Eshsire Group | 30 Años Fabricante SPC en China",
      contact: "Contacto Eshsire Group | Catálogo y Cotización SPC | WhatsApp",
      accessories: "Accesorios SPC | Zócalos y Perfiles | Eshsire Group",
      faq: "FAQ Suelos SPC | OEM MOQ y Exportación | Eshsire Group",
      certifications: "Certificaciones ISO CE SGS | Eshsire Group",
    },
    headings: {
      ...en.meta.headings,
      spcFlooring: "Suelos SPC Comerciales — OEM Mayorista desde China",
      wallPanels: "Paneles Murales SPC y Decorativos para Proyectos Globales",
      factory: "Nuestra Planta de Fabricación SPC",
      oemService: "Servicios de Fabricación OEM y ODM",
      about: "Sobre Eshsire Group",
      contact: "Contáctenos para Catálogo y Cotización",
      accessories: "Accesorios para Suelos SPC y Paneles",
      faq: "Preguntas Frecuentes",
      certifications: "Certificaciones y Cumplimiento",
    },
    pageDesc: {
      ...en.meta.pageDesc,
      spcFlooring:
        "Suelos SPC impermeables mayoristas desde fábrica en Pekín. Click-lock, certificado CE, OEM bajo MOQ. Solicite catálogo por WhatsApp — respuesta en 24h.",
      wallPanels:
        "Paneles murales SPC, mármol UV y materiales decorativos de China. Precio directo de fábrica para distribuidores mundiales.",
      factory:
        "Visite nuestra fábrica SPC de 6000㎡ en Pekín: líneas de producción, QC, almacén y carga de contenedores. Socio exportador de confianza.",
      oemService:
        "OEM/ODM personalizado de suelos SPC con marca privada, diseño de embalaje y branding. MOQ bajo para distribuidores globales.",
      about:
        "Eshsire Group — 30 años fabricando suelos SPC y materiales decorativos en Pekín, China. Exportación a más de 30 países.",
      contact:
        "Contacte a Jason para catálogo, muestras y cotización OEM de suelos SPC. WhatsApp +86 15313057097 — respuesta en 24 horas.",
      accessories:
        "Zócalos, perfiles de transición, base y accesorios de instalación para proyectos SPC. Colores OEM disponibles.",
      faq:
        "Respuestas sobre MOQ OEM, plazos, envío, certificaciones y muestras de suelos SPC desde China.",
      certifications:
        "Suelos SPC Eshsire cumplen ISO, CE, SGS y estándares internacionales para exportación global.",
    },
  },
  nav: {
    ...en.nav,
    home: "Inicio",
    spcFlooring: "Suelos SPC",
    wallPanels: "Paneles",
    accessories: "Accesorios",
    factory: "Fábrica",
    oemService: "OEM",
    about: "Nosotros",
    contact: "Contacto",
    faq: "FAQ",
    certifications: "Certificaciones",
    blog: "Blog",
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
    requestQuote: "Solicitar cotización",
    viewProject: "Ver proyecto",
    requestCatalog: "Solicitar catálogo",
    getSamples: "Muestras",
    getFreeSamples: "Muestras gratis",
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
    hero: {
      ...en.home.hero,
      carousel: {
        prev: "Anterior",
        next: "Siguiente",
        slide: "Diapositiva",
        slides: [
          {
            years: "30 Años",
            title: "Exigencias más altas hacia uno mismo son responsabilidad hacia el cliente",
            subtitle:
              "Innovación continua, calidad estable, hacemos lo mejor para satisfacer las necesidades del cliente",
          },
          {
            titleLine1: "SUELOS SPC Y PANELES MURALES WPC",
            titleAccent: "FABRICANTE",
            subtitle: "Ayudamos a distribuidores y contratistas globales a crecer más rápido",
            features: [
              "Exportación a más de 30 países",
              "Servicio OEM y marca privada",
              "Actualizaciones diarias de producción",
              "Inspección estricta de calidad",
            ],
            ctaSamples: "Muestras gratis",
            ctaQuote: "Solicitar cotización",
            stats: [
              { value: "30+", label: "Años de experiencia" },
              { value: "6000m²", label: "Planta de producción" },
              { value: "30+", label: "Países de exportación" },
              { value: "100,000+", label: "Clientes atendidos" },
            ],
          },
          {
            title: "Fuerte capacidad manufacturera",
            subtitle: "Su socio confiable para el éxito a largo plazo",
            stats: [
              { value: "30+", label: "Años de experiencia", desc: "Enfocados en suelos y paneles murales por más de 30 años." },
              { value: "6000m²", label: "Planta de producción", desc: "Fábrica moderna con líneas avanzadas y equipos." },
              { value: "30+", label: "Países de exportación", desc: "Productos exportados a más de 30 países y regiones." },
              { value: "100,000+", label: "Clientes atendidos", desc: "Con la confianza de distribuidores y contratistas globales." },
            ],
            whyTitle: "Por qué nos eligen compradores globales",
            whySubtitle:
              "Fabricación profesional, control de calidad estricto y servicios confiables para hacer crecer su negocio.",
            whyItems: [
              { title: "Actualizaciones de producción", desc: "Fotos y videos en tiempo real durante toda la producción." },
              { title: "Inspección estricta de calidad", desc: "Múltiples inspecciones desde materias primas hasta producto terminado." },
              { title: "Servicio OEM y marca privada", desc: "Diseños, branding, embalaje y etiquetas personalizados." },
              { title: "Entrega confiable", desc: "Entrega puntual con carga de contenedores y seguimiento." },
            ],
          },
        ],
      },
    },
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
    projects: {
      label: "Proyectos globales",
      title: "Proyectos globales y casos de éxito",
      description: "Con la confianza de distribuidores, contratistas y desarrolladores en todo el mundo",
      detailLabel: "Resumen del proyecto",
      galleryLabel: "Galería del proyecto",
      galleryTitle: "Fotos e instalación del proyecto",
      galleryDesc: "Explore todas las imágenes de nuestros casos globales de suelos y paneles murales.",
      relatedTitle: "Más casos de éxito",
      productLinksLabel: "Explore nuestras soluciones de suelos y paneles murales",
      ctaTitle: "¿Necesita un proveedor de suelos confiable?",
      ctaSubtitle: "Muestras gratis, precios OEM y soporte de proyecto desde nuestra fábrica en Pekín.",
      items: [
        {
          slug: "africa-distributor",
          title: "Proyecto distribuidor África",
          tag: "África",
          desc: "Apoyo a distribuidores de suelos con SPC, embalaje OEM y suministro estable.",
          overview:
            "Eshsire Group colaboró con distribuidores de suelos en África para ofrecer suministro estable de SPC, embalaje OEM personalizado y soporte de reposición a largo plazo.",
          highlights: [
            "Embalaje OEM y marca privada para mercados locales",
            "Suministro mensual estable para pedidos mixtos",
            "Colecciones SPC impermeables adaptadas a climas tropicales",
          ],
        },
        {
          slug: "middle-east-hotel",
          title: "Proyecto hotel Oriente Medio",
          tag: "Oriente Medio",
          desc: "Suministro de suelos SPC premium para renovaciones hoteleras con aspecto de lujo y durabilidad.",
          overview:
            "Suministramos suelos SPC de núcleo rígido premium para vestíbulos, pasillos y habitaciones de hoteles en Oriente Medio, combinando estética de lujo y alto tráfico.",
          highlights: [
            "Acabados piedra y madera para interiores hoteleros",
            "Capa de desgaste comercial para zonas públicas",
            "Sistema click-lock para reducir tiempos de obra",
          ],
        },
        {
          slug: "school-flooring",
          title: "Proyecto suelo escolar",
          tag: "Educación",
          desc: "Suelos duraderos para escuelas y centros educativos con alta resistencia al tráfico.",
          overview:
            "Este proyecto educativo requirió suelos SPC resistentes a rayones y fáciles de mantener para aulas, pasillos y áreas de actividad con uso continuo.",
          highlights: [
            "Opciones antideslizantes para zonas de seguridad",
            "Suelo impermeable de bajo mantenimiento",
            "Núcleo rígido resistente a mobiliario y equipos",
          ],
        },
        {
          slug: "europe-apartment",
          title: "Proyecto apartamentos Europa",
          tag: "Residencial",
          desc: "Suelos SPC impermeables para renovación de apartamentos con diseño moderno.",
          overview:
            "Apoyamos a contratistas de renovación en Europa con colecciones SPC impermeables para cocinas, salones y dormitorios en edificios residenciales.",
          highlights: [
            "Núcleo 100% impermeable para cocinas y zonas húmedas",
            "Colores y texturas de estilo europeo",
            "Compatible con base acústica para reducción de ruido",
          ],
        },
        {
          slug: "commercial-office",
          title: "Proyecto oficina comercial",
          tag: "Oficina",
          desc: "Instalación de suelos SPC comerciales para oficinas modernas con alto tráfico.",
          overview:
            "Suelos SPC de grado comercial para oficinas abiertas, salas de reuniones y recepciones donde la imagen profesional y la durabilidad son esenciales.",
          highlights: [
            "Capa de desgaste comercial para tráfico de oficina",
            "Visuales madera y piedra para interiores corporativos",
            "Instalación rápida con mínima interrupción",
          ],
        },
        {
          slug: "southeast-asia-distributor",
          title: "Proyecto distribuidor Sudeste Asiático",
          tag: "Mayorista",
          desc: "Apoyo a distribuidores con embalaje OEM y suministro estable de suelos.",
          overview:
            "Distribuidores regionales en el Sudeste Asiático trabajan con Eshsire para colecciones personalizadas, embalaje localizado y pedidos OEM flexibles.",
          highlights: [
            "Colecciones y relieve adaptados al mercado",
            "Embalaje OEM, etiquetas y material de venta",
            "MOQ flexible para pedidos de prueba y repetición",
          ],
        },
        {
          slug: "hospital-flooring",
          title: "Proyecto suelo hospital",
          tag: "Sanidad",
          desc: "Suelos SPC higiénicos e impermeables para hospitales y centros médicos.",
          overview:
            "Los centros sanitarios requieren suelos higiénicos, impermeables y fáciles de desinfectar. Suministramos SPC para pasillos, salas de espera y zonas administrativas.",
          highlights: [
            "Núcleo rígido impermeable ante derrames",
            "Superficie lisa para limpieza rutinaria",
            "Rendimiento estable en entornos médicos de alto tráfico",
          ],
        },
        {
          slug: "villa-wpc-wall-panel",
          title: "Proyecto paneles WPC villa",
          tag: "Villa",
          desc: "Paneles murales WPC decorativos para proyectos de decoración interior de villas de lujo.",
          overview:
            "Para interiores de villas de lujo, Eshsire entregó paneles murales WPC decorativos con estética moderna y resistencia a la humedad.",
          highlights: [
            "Acabados WPC madera y piedra",
            "Paneles ligeros para renovación rápida",
            "Materiales resistentes a la humedad para villas",
          ],
        },
      ],
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
  blog: {
    ...en.blog,
    label: "Blog",
    listSubtitle: "Guías prácticas para distribuidores que importan suelos SPC y paneles desde China.",
    readTimeUnit: "min de lectura",
    ctaTitle: "Contacte a ESHSIRE para muestras y cotización",
    ctaDesc: "Web: eshsire.com · WhatsApp: +86 15313057097 · Email: jason@eshsiregroup.com",
    whatsappInquiry: "Consulta por WhatsApp",
    emailUs: "Enviar email",
    getFreeQuote: "Cotización gratis",
  },
  productList: [
    "Suelos SPC",
    "Paneles murales SPC",
    "Paneles mármol UV",
    "Materiales decorativos interiores",
  ],
};
