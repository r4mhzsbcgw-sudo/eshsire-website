import type { BlogPost } from "../types";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "../b2b-blocks";
import { blogFactoryImages as img } from "@/lib/blog-images";

export const post: BlogPost = {
  slug: "load-40hq-container-spc-flooring-export",
  slot: "evening",
  title: "我们如何为出口订单装载 40HQ 整柜 SPC 地板",
  metaTitle: "40HQ 整柜 SPC 地板装载 | 中国出口工厂",
  description:
    "SPC 地板工厂出口流程：生产 QC、仓库备货、40HQ 整柜装载及面向全球经销商的稳定出货方案。",
  date: "2026-06-05",
  readMinutes: 6,
  heroImage: img.loading,
  ogImage: img.loading,
  blocks: [
    {
      type: "p",
      text: "评估中国 SPC 地板供应商的经销商，往往不仅关心单价，更关注出货可靠性。整柜装载规范影响货损率、报关文件以及仓库收到的 SKU 配比是否正确。本文说明从北京工厂到全球港口的 40HQ 地板出口装柜流程。",
    },
    { type: "h2", text: "装柜前：生产与 QC" },
    {
      type: "p",
      text: "每批出口货物在挤出环节进行在线 QC，装箱前再次检验后方能进入仓库备货区。我们检查锁扣配合、plank 尺寸、表面缺陷及外箱标签是否与采购单一致。仅放行合格托盘方可装柜。",
    },
    {
      type: "ul",
      items: [
        "每批次随机 plank 尺寸抽检",
        "耐磨层与压纹外观标准检验",
        "外箱强度与护角保护",
        "SKU 标签与装箱单核对",
      ],
    },
    imgBlock(
      img.quality,
      "SPC 地板整柜出口前 QC 检验",
      "纸箱进入出口备货区前的 QC 检验"
    ),
    { type: "h2", text: "仓库备货与整柜规划" },
    {
      type: "p",
      text: "仓库按 SKU 顺序堆码，匹配进口商卸货计划。混色整柜中，较重纸箱先装柜底，较轻 SKU 填充上层，减少海运移位并加快目的仓入库。",
    },
    imgBlock(
      img.warehouse,
      "SPC 地板工厂出口前仓库备货",
      "40HQ 整柜装载前的仓库备货区"
    ),
    { type: "h2", text: "40HQ 整柜装载流程" },
    {
      type: "p",
      text: "装柜在工厂堆场或指定港口仓库进行，使用叉车与人工对齐。我们拍摄空柜、半柜及封柜锁号照片。装箱单、商业发票与原产地证与同一柜号一致，便于清关。",
    },
    { type: "h3", text: "进口商在船开前收到的资料" },
    {
      type: "ul",
      items: [
        "装柜照片与封条号",
        "最终装箱单（含各 SKU 平米数）",
        "提单草稿确认",
        "批次生产与 QC 摘要",
      ],
    },
    imgBlock(
      img.loading,
      "SPC 地板 40HQ 整柜装载出口流程",
      "SPC 地板出口货物的 40HQ 整柜装载"
    ),
    { type: "h2", text: "面向经销商重复订单的稳定供应" },
    {
      type: "p",
      text: "重复订单锁定 BOM 参考，确保多柜之间颜色与厚度一致。非洲、中东和东南亚经销商通常按月或按季补货。工厂直供排产可避免贸易公司换厂导致的批次色差，影响零售端陈列。",
    },
    {
      type: "rich-p",
      segments: [
        "查看我们的 ",
        { link: "全球项目案例", href: "/#projects" },
        " 或了解 ",
        { link: "墙板供应", href: "/wall-panels" },
        " 混合整柜方案。",
        { link: "索取大货批量价", href: "/contact" },
        " 规划下一批出货。",
      ],
    },
    imgBlock(
      img.export,
      "中国地板工厂 SPC 地板出口发运",
      "封柜及单证完成后的出口发运"
    ),
    internalLinksBlock("zh"),
    b2bCtaBlock(
      "zh",
      "计划 40HQ SPC 地板出货？向出口团队索取整柜报价、装柜排期与工厂价目表。"
    ),
  ],
};
