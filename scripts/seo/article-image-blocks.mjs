/**
 * Insert blog images after h2 sections 鈥?dynamic count (V2).
 */
export function insertSectionImages(blocks, images, meta, localeDefaults = {}) {
  const sectionImgs = images.sections ?? [];
  const maxSections = sectionImgs.length;
  let sectionCount = 0;
  const out = [];

  for (const block of blocks) {
    out.push(block);
    if (block.type === "h2" && sectionCount < maxSections && sectionImgs[sectionCount]) {
      const capIdx = sectionCount + 1;
      out.push({
        type: "img",
        src: sectionImgs[sectionCount],
        alt:
          images.alts?.[capIdx] ??
          `${meta.primaryKeyword ?? "SPC flooring"} ${(meta.title ?? "").slice(0, 30)} ${sectionCount + 1}`,
        caption:
          images.captions?.[capIdx] ??
          localeDefaults.imgCaption ??
          "Eshsire Group project reference 鈥?B2B supply",
      });
      sectionCount++;
    }
  }

  const endingIdx = images.imageCount ? images.imageCount - 1 : maxSections + 1;
  out.push({
    type: "img",
    src: images.ending,
    alt: images.alts?.[endingIdx] ?? `${meta.primaryKeyword ?? "SPC flooring"} finished project`,
    caption: images.captions?.[endingIdx] ?? localeDefaults.imgEnding ?? "Finished project reference",
  });

  return out;
}

export function minImageCountForTopic(topic) {
  const slot = topic?.slot ?? "afternoon";
  if (slot === "morning") return 4;
  if (slot === "evening") return 6;
  return 5;
}
