import type { Dictionary } from "./en";
import { en } from "./en";

/** Spanish — extends English structure with full UI copy */
export const es: Dictionary = {
  ...en,
  meta: {
    ...en.meta,
    siteTitle: "Fabricante de Suelos SPC y Paneles Murales en China | OEM/ODM | Eshsire Group",
    siteDescription:
      "Eshsire Group fabrica suelos SPC y paneles murales interiores para distribuidores, importadores y compradores de proyectos. OEM/ODM, inspección de calidad, seguimiento de producción, planificación de contenedores mixtos y soporte de exportación.",
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
    tagline: "ESHSIRE GROUP | 30 AÑOS DE EXCELENCIA MANUFACTURERA",
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
      label: "Eshsire Group · Pekín, China",
      title: "Fabricante de Suelos SPC y Paneles Murales en China",
      subtitle:
        "30 años de experiencia en fabricación | OEM/ODM | Inspección de calidad | Carga mixta y soporte de exportación global",
      trustPoints: [
        "Producción de pisos SPC y paneles de pared",
        "Empaque OEM / marca privada",
        "Actualizaciones de producción e inspección",
        "Carga de contenedor y envío mixto",
      ],
      ctaCatalog: "Obtener catálogo",
      ctaQuote: "Solicitar cotización de fábrica",
    },
    applications: {
      label: "Escenarios de suministro",
      title: "Escenarios de Suministro Global y Aplicaciones de Proyecto",
      description:
        "Desde distribución con marca privada hasta suministro de proyectos y entrega en contenedor mixto, apoyamos a compradores globales con flujos de producción, inspección y exportación trazables.",
      exploreSolution: "Ver solución",
      disclaimer:
        "Esta sección presenta aplicaciones típicas de producto y flujos de suministro. Los detalles de proyectos de clientes se comparten solo con autorización.",
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
    projects: en.home.projects,
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
        { title: "Soporte de documentación", desc: "La documentación relevante puede proporcionarse según las especificaciones confirmadas." },
        { title: "Control de costos de fábrica", desc: "La fabricación y coordinación de suministro ayudan a mejorar estabilidad de precio y eficiencia." },
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
    faq: {
      label: "FAQ",
      title: "Preguntas de compra sobre suelos SPC",
      description: "Preguntas clave para distribuidores, importadores y compradores de proyectos al elegir especificaciones SPC.",
      items: [
        { q: "¿Qué espesor deben elegir los distribuidores: 4mm, 5mm o 6mm?", a: "4mm suele servir para mercados sensibles al precio, 5mm es una opción equilibrada de venta mayorista y 6mm encaja en canales premium o proyectos." },
        { q: "¿Qué capa de desgaste es adecuada para mercados residenciales y comerciales?", a: "Los programas residenciales pueden usar capas para uso diario normal; espacios comerciales o de alto tráfico deben confirmar mayor resistencia antes de cotizar." },
        { q: "¿Se puede empacar el suelo SPC con marca privada?", a: "Sí. Apoyamos cajas OEM, etiquetas, códigos de barras, muestrarios y detalles de empaque tras confirmar especificación y cantidad." },
        { q: "¿Cómo controlan la consistencia de color entre muestras y pedidos?", a: "Confirmamos muestras de referencia, datos de lote e hitos de inspección para comparar la muestra aprobada con la producción masiva." },
        { q: "¿Se puede enviar SPC junto con paneles murales o cielorrasos PVC?", a: "Sí. La planificación de contenedor mixto combina SPC pesado con paneles, cielorrasos y accesorios más ligeros para mejorar utilización." },
        { q: "¿Cómo solicito una muestra y cotización?", a: "Envíe a Jason el espesor, capa de desgaste, color, cantidad y mercado destino para preparar opciones de muestra y cotización." },
      ],
    },
  },
  wallPanels: {
    ...en.wallPanels,
    heroSubtitle:
      "Paneles SPC, mármol UV y decorativos para proyectos residenciales y comerciales.",
    title: "Soluciones de pared interior",
    items: [
      {
        name: "Paneles SPC",
        desc: "Paneles rígidos impermeables para paredes interiores con texturas madera o piedra.",
      },
      {
        name: "Paneles WPC",
        desc: "Paneles WPC resistentes a la humedad con acabado madera para decoración interior.",
      },
      {
        name: "Paneles decorativos",
        desc: "Opciones acanaladas, WPC y acústicas para interiores modernos.",
      },
    ],
    galleryTitle: "Colección de paneles murales",
    faq: {
      label: "FAQ",
      title: "Preguntas sobre paneles interiores",
      description: "Preguntas comunes de distribuidores y compradores de proyectos sobre suministro de paneles desde China.",
      items: [
        { q: "¿Qué tipos de paneles de pared ofrecen?", a: "Suministramos paneles SPC, WPC, tipo listón y decorativos con opciones de color, perfiles y accesorios compatibles." },
        { q: "¿Qué espesores y tamaños están disponibles?", a: "Las dimensiones y espesores dependen de la serie. Comparta los requisitos del proyecto para confirmar especificaciones y MOQ." },
        { q: "¿Cuál es la diferencia entre junta plana y micro-ranura?", a: "La junta plana ofrece una superficie más continua; la micro-ranura resalta las líneas entre paneles para un efecto decorativo." },
        { q: "¿Qué accesorios se necesitan para instalar paneles?", a: "Los proyectos pueden requerir esquinas interiores, exteriores, perfiles superiores, remates o clips según el tipo de panel." },
        { q: "¿Se pueden mezclar paneles con suelos SPC en un contenedor?", a: "Sí. Ayudamos a planificar contenedores mixtos con suelos SPC, paneles, cielorrasos PVC y accesorios." },
        { q: "¿Cómo solicito un catálogo de colores y cotización?", a: "Contacte a Jason con el tipo de panel, cantidad, mercado destino y requisitos OEM para preparar catálogo y cotización." },
      ],
    },
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
    quoteForm: {
      ...en.contact.quoteForm,
      label: "Cotización",
      title: "Solicitar precio de fábrica",
      subtitle: "Nuestro equipo de seguimiento responderá en 24 horas.",
      name: "Nombre *",
      email: "Correo *",
      whatsapp: "WhatsApp *",
      country: "País *",
      selectProduct: "Producto de interés *",
      quantity: "Cantidad (m² o contenedores) *",
      targetPrice: "Precio objetivo (opcional)",
      selectCustomerType: "Tipo de cliente *",
      messagePlaceholder: "Detalles del proyecto, especificaciones, mercado... *",
      submit: "Enviar solicitud de cotización",
      submitting: "Enviando...",
      successTitle: "Gracias — recibimos su consulta",
      successMessage: "Nuestro equipo le contactará en 24 horas.",
      fallbackSuccessTitle: "Gracias",
      fallbackSuccessMessage: "Your inquiry has been submitted. Our team will contact you soon.",
      validationErrorTitle: "Revise el formulario",
      validationErrorMessage: "Algunos campos faltan o no son válidos. Corrija e intente de nuevo.",
      deliveryFailedTitle: "No pudimos entregar su consulta",
      deliveryFailedMessage:
        "Su consulta no pudo enviarse en este momento. Contáctenos directamente por WhatsApp o correo.",
      contactWhatsApp: "WhatsApp",
      contactEmail: "Correo",
      submitAnother: "Enviar otra consulta",
    },
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
    requestPriceList: "Solicitar lista de precios de fábrica",
    containerQuotation: "Cotización de contenedor",
    bulkOrderPricing: "Precio por pedido al por mayor",
  },
  productList: [
    "Suelos SPC",
    "Paneles murales SPC",
    "Paneles mármol UV",
    "Materiales decorativos interiores",
  ],
  accessories: {
    ...en.accessories,
    heroSubtitle:
      "Complete proyectos de suelos SPC y paneles con rodapiés, perfiles y accesorios de instalación compatibles.",
    label: "Accesorios",
    title: "Accesorios de instalación y acabado",
    description:
      "Suministramos rodapiés, perfiles de transición, base, narices de escalera y accesorios para proyectos globales.",
    items: [
      { title: "Rodapiés", desc: "Rodapiés PVC y MDF combinados con colores y texturas SPC." },
      { title: "Perfiles de transición", desc: "Molduras T, reductores y remates para puertas y cambios de nivel." },
      { title: "Base acústica", desc: "IXPE y EVA para reducción de sonido y protección contra humedad." },
      { title: "Narices de escalera", desc: "Perfiles de borde y peldaño para instalaciones comerciales." },
    ],
    faq: {
      label: "FAQ",
      title: "Preguntas sobre accesorios",
      description: "Preguntas comunes sobre perfiles, rodapiés, acabados y envíos mixtos.",
      items: [
        { q: "¿Qué accesorios se piden normalmente con suelos SPC?", a: "Rodapiés, perfiles de transición, reductores, narices de escalera, base acústica y remates de acabado." },
        { q: "¿Rodapiés, perfiles y acabados pueden combinarse con los colores del suelo?", a: "Sí. Podemos recomendar colores iguales o coordinados según la colección de suelo y el mercado objetivo." },
        { q: "¿Qué accesorios se necesitan para esquinas y bordes de paneles murales?", a: "Los proyectos de paneles pueden necesitar esquinas interiores, exteriores, líneas superiores, remates o perfiles compatibles." },
        { q: "¿Los accesorios pueden mezclarse en el mismo envío?", a: "Sí. Pueden planificarse con suelos, paneles murales o cielorrasos en un mismo envío para mejorar eficiencia." },
        { q: "¿Pueden ofrecer empaque OEM para accesorios?", a: "Sí. Etiquetas, cajas y códigos de barras OEM están disponibles tras confirmar especificaciones y cantidades." },
      ],
    },
  },
};
