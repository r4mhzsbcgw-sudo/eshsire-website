/**
 * Eshsire Group V2 blog image engine 鈥?classify 鈫?match tags 鈫?select from fixed libraries.
 */
import {
  IMAGE_TYPES,
  libraryForType,
  filterBlogPool,
} from "./blog-image-libraries.mjs";
import { classifyTopic } from "./topic-classifier.mjs";
import { getCaption, getAlt } from "./blog-image-catalog.mjs";

const KEYWORD_MAP = [
  ["installation", /\binstall|installing|laying|fit-out|fit out|鏂藉伐|瀹夎\b/i],
  ["supplier", /\bsupplier|manufacturer|factory|oem|vendor|渚涘簲鍟唡宸ュ巶\b/i],
  ["factory", /\bfactory|production|manufactur|浜ц兘|鐢熶骇\b/i],
  ["hotel", /\bhotel|hospitality|serviced apartment|閰掑簵\b/i],
  ["apartment", /\bapartment|residential|villa|浣忓畢|鍏瘬\b/i],
  ["commercial", /\bcommercial|office|retail|school|鍟嗕笟|鍔炲叕\b/i],
  ["wholesale", /\bwholesale|distributor|dealer|bulk|鎵瑰彂|缁忛攢鍟哱b/i],
  ["container", /\bcontainer|40hq|logistics|freight|export|shipment|闆嗚绠眧鐗╂祦\b/i],
  ["warehouse", /\bwarehouse|inventory|stock|浠撳簱|搴撳瓨\b/i],
  ["quality", /\bquality|qc|inspection|audit|test|璐ㄦ\b/i],
  ["wall", /\bwall panel|wpc wall|wall cladding|interior wall|澧欐澘|澧欓潰\b/i],
];

const FLOOR_KEYWORDS = /\b(floor|flooring|spc|lvt|vinyl|install|installation|supplier|factory|texture|warehouse|office|home|living|鏂藉伐|鍦版澘|鍦拌兌)\b/i;
const WALL_KEYWORDS = /\b(wall panel|wpc|spc wall|panel|decoration|interior wall|澧欐澘|澧欓潰|瑁呴グ)\b/i;

export function classifyArticleImageType(topic) {
  const tag = (topic.productTag ?? "spc").toLowerCase();
  const title = topic.title ?? "";
  const wallHit = WALL_KEYWORDS.test(title);
  const floorHit = FLOOR_KEYWORDS.test(title);

  if (tag === "wall" || (wallHit && !floorHit)) return IMAGE_TYPES.WALL_PANEL;
  return IMAGE_TYPES.SPC_FLOOR;
}

export function extractSemanticKeywords(topic) {
  const text = `${topic.title ?? ""} ${topic.primaryKeyword ?? ""}`;
  const found = new Set();
  for (const [key, re] of KEYWORD_MAP) {
    if (re.test(text)) found.add(key);
  }
  const topicType = topic.topicType ?? classifyTopic(topic.title ?? "");
  if (topicType === "logistics") found.add("container");
  if (topicType === "factory") found.add("factory");
  if (topicType === "project") found.add("commercial");
  if (topicType === "quality") found.add("quality");
  if (topicType === "inventory") found.add("warehouse");
  if (topicType === "distributor") found.add("wholesale");
  return [...found];
}

export function planImageCount(topic) {
  const slot = topic.slot ?? "afternoon";
  const isWall = (topic.productTag ?? "") === "wall";
  const maxWall = 5;
  if (slot === "morning") return isWall ? 4 : 4;
  if (slot === "evening") return isWall ? maxWall : 6;
  return isWall ? 5 : 5;
}

function scoreAsset(asset, keywords, imageType) {
  let score = 0;
  for (const kw of keywords) {
    if (asset.keywords.includes(kw)) score += 3;
  }
  for (const tag of asset.tags) {
    if (keywords.includes("factory") && tag === "factory_production") score += 2;
    if (keywords.includes("container") && tag === "logistics_export") score += 2;
    if (keywords.includes("installation") && tag === "installation_process") score += 4;
    if (keywords.includes("quality") && tag === "close_up_texture") score += 2;
  }
  if (imageType === IMAGE_TYPES.WALL_PANEL && asset.tags.includes("interior_wall")) score += 2;
  if (imageType === IMAGE_TYPES.SPC_FLOOR && asset.tags.includes("interior_flooring")) score += 2;
  return score;
}

function isForbidden() {
  return false;
}

function pickBest(pool, usedInArticle, globalUsed, filterFn) {
  const candidates = pool.filter(filterFn ?? (() => true)).sort((a, b) => b._score - a._score);
  for (const c of candidates) {
    if (usedInArticle.has(c.src)) continue;
    if (globalUsed.has(c.src) && candidates.length > 2) continue;
    return c;
  }
  return candidates.find((c) => !usedInArticle.has(c.src));
}

function captionFor(asset, locale, primaryKeyword) {
  const c = getCaption(asset.key, locale);
  if (c && !c.includes("Industrial manufacturing")) return c;
  return `${primaryKeyword} 鈥?${asset.altEn}`;
}

export function selectBlogImagesV2(topic, locale = "en", globalUsed = new Set()) {
  const imageType = classifyArticleImageType(topic);
  const keywords = extractSemanticKeywords(topic);
  const targetCount = planImageCount(topic);
  const sectionCount = Math.max(1, targetCount - 2);
  const library = libraryForType(imageType);
  const primaryKeyword =
    topic.primaryKeyword ?? (imageType === IMAGE_TYPES.WALL_PANEL ? "WPC wall panel" : "SPC flooring");

  const pool = filterBlogPool(
    Object.values(library).map((a) => ({ ...a, _score: scoreAsset(a, keywords, imageType) })),
    imageType,
    keywords
  );

  const usedInArticle = new Set();
  const reasoning = [];
  const ordered = [];

  const banner =
    pickBest(pool, usedInArticle, globalUsed, (a) => a.roles.includes("banner") || a.roles.includes("finished")) ??
    pickBest(pool, usedInArticle, globalUsed);
  if (!banner) throw new Error(`No blog images available for ${imageType}`);
  usedInArticle.add(banner.src);
  ordered.push(banner);
  reasoning.push({ role: "banner", key: banner.key, tags: banner.tags, reason: `banner|${keywords.slice(0, 3).join(",")}` });

  const requiredMiddle = [
    { filter: (a) => a.roles.includes("application"), reason: "required_application" },
    { filter: (a) => a.roles.includes("detail") || a.tags.includes("close_up_texture"), reason: "required_detail" },
  ];

  for (const req of requiredMiddle) {
    if (ordered.length >= targetCount - 1) break;
    const pick = pickBest(pool, usedInArticle, globalUsed, req.filter);
    if (pick) {
      usedInArticle.add(pick.src);
      ordered.push(pick);
      reasoning.push({ role: "section", key: pick.key, tags: pick.tags, reason: req.reason });
    }
  }

  while (ordered.length < targetCount - 1) {
    const pick = pickBest(pool, usedInArticle, globalUsed);
    if (!pick) break;
    usedInArticle.add(pick.src);
    ordered.push(pick);
    reasoning.push({ role: "section", key: pick.key, tags: pick.tags, reason: `semantic|score=${pick._score}` });
  }

  const ending =
    pickBest(pool, usedInArticle, globalUsed, (a) => a.roles.includes("finished")) ??
    pickBest(pool, usedInArticle, globalUsed) ??
    banner;
  usedInArticle.add(ending.src);
  ordered.push(ending);
  reasoning.push({ role: "ending", key: ending.key, tags: ending.tags, reason: "required_finished" });

  const bannerAsset = ordered[0];
  const endingAsset = ordered[ordered.length - 1];
  const middleAssets = ordered.slice(1, -1).slice(0, sectionCount);

  const urls = [bannerAsset.src, ...middleAssets.map((a) => a.src), endingAsset.src];
  const assets = [bannerAsset, ...middleAssets, endingAsset];

  return {
    banner: urls[0],
    sections: urls.slice(1, -1),
    ending: urls[urls.length - 1],
    imageType,
    imageCount: urls.length,
    meta: {
      themes: assets.map((a) => a.key),
      captions: assets.map((a) => captionFor(a, locale, primaryKeyword)),
      alts: assets.map((a) => {
        const alt = getAlt(a.key, primaryKeyword);
        return alt && !alt.endsWith("undefined") ? alt : `${primaryKeyword} 鈥?${a.altEn}`;
      }),
      sourceUrls: assets.map((a) => a.sourceUrl),
      reasoning,
      keywords,
    },
  };
}
