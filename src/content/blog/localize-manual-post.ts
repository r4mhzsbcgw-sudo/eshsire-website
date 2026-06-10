import type { Locale } from "@/i18n/locales";
import type { BlogPost } from "./types";

type PostMeta = Pick<BlogPost, "title" | "metaTitle" | "description">;

const localizedMeta: Partial<Record<Locale, Record<string, PostMeta>>> = {
  zh: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "中国 SPC 地板供应商与制造商",
      metaTitle: "中国 SPC 地板供应商与制造商 | Eshsire Group",
      description:
        "了解进口商如何从中国选择 SPC 地板工厂，包括产能、质检、起订量、OEM 支持和整柜出口能力。",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "2026 年如何选择可靠的中国 SPC 地板供应商",
      metaTitle: "如何选择可靠的 SPC 地板供应商 | Eshsire Group",
      description:
        "从工厂产能、样品、证书、价格、交期和出口服务判断中国 SPC 地板供应商是否可靠。",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "从中国进口 SPC 地板的 7 个常见错误",
      metaTitle: "进口 SPC 地板常见错误 | Eshsire Group",
      description:
        "避免从中国进口 SPC 地板时的常见错误，包括规格不清、质检不足、包装失控和装柜计划不完善。",
    },
  },
  es: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Proveedor y fabricante de suelos SPC en China",
      metaTitle: "Proveedor de suelos SPC en China | Eshsire Group",
      description:
        "Compare proveedores chinos de suelos SPC por capacidad de fábrica, control de calidad, MOQ, soporte OEM y exportación por contenedor.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Cómo elegir un proveedor fiable de suelos SPC en China",
      metaTitle: "Proveedor fiable de suelos SPC | Eshsire Group",
      description:
        "Elija un proveedor fiable de suelos SPC revisando capacidad, muestras, certificados, precios, plazos y servicio de exportación.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 errores al importar suelos SPC desde China",
      metaTitle: "Errores al importar suelos SPC | Eshsire Group",
      description:
        "Evite errores frecuentes al importar suelos SPC desde China, desde especificaciones poco claras hasta débil control de calidad.",
    },
  },
};

export function localizeManualPost(post: BlogPost, locale: Locale): BlogPost {
  const meta = localizedMeta[locale]?.[post.slug];
  return meta ? { ...post, ...meta } : post;
}
