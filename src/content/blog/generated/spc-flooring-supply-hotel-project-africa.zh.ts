import type { BlogPost } from "../types";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "../b2b-blocks";
import { blogFactoryImages as img } from "@/lib/blog-images";

export const post: BlogPost = {
  slug: "spc-flooring-supply-hotel-project-africa",
  slot: "evening",
  title: "SPC Flooring Supply for Hotel Project in Africa — Factory Case Study",
  metaTitle: "SPC Flooring Hotel Project Supply | Africa Case Study",
  description: "How a China SPC flooring factory supports hotel renovation projects in Africa: SKU selection, OEM packaging, QC and container delivery.",
  date: "2026-06-05",
  readMinutes: 7,
  heroImage: img.loading,
  ogImage: "/images/home/factory/04-loading.jpg",
  blocks: [
    { type: "p", text: "SPC Flooring Supply for Hotel Project in Africa — Factory Case Study。评估中国 SPC 地板供应商的经销商，需了解生产 QC、仓库备货与整柜装柜流程——不仅看单价。" },
    { type: "h2", text: "装柜前：生产与 QC" },
    { type: "p", text: "每批出口货物在挤出环节在线 QC，装箱前再次检验后进入仓库备货。仅放行合格托盘方可装柜。" },
    imgBlock("/images/home/factory/01-production.jpg", "中国 SPC 地板工厂生产线", "出口批次放行前的生产线"),
    { type: "h2", text: "仓库备货与整柜规划" },
    { type: "p", text: "仓库按 SKU 顺序堆码，匹配进口商卸货计划。混色整柜先装重箱在柜底，减少海运移位。" },
    imgBlock("/images/home/factory/04-loading.jpg", "SPC 地板 40HQ 整柜装载", "40HQ 整柜装载流程"),
    imgBlock("/images/home/factory/02-quality.jpg", "中国 SPC 地板工厂 QC 检验", "发货前 QC 检验"),
    internalLinksBlock("zh"),
    b2bCtaBlock("zh", "计划 40HQ SPC 地板出货？索取整柜报价、装柜排期与工厂价目表。"),
  ],
};
