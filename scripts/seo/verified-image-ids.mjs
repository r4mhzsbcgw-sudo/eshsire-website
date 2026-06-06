/**
 * Verified Unsplash photo IDs (HEAD-checked) + blocklist of removed/404 IDs.
 * Single source of truth for image-pools, validation, and fix scripts.
 */
export const SIZE = "w=1200&h=800&fit=crop&auto=format&q=80";

/** @type {Set<string>} IDs that return 404 on images.unsplash.com */
export const BLOCKED_PHOTO_IDS = new Set([
  "photo-1494412511400-6c5a99596788",
  "photo-1578574577315-3d8800140d40",
  "photo-1601584114707-6146645877ff",
  "photo-1566576721346-d4a3b4eaeb85",
  "photo-1565514020169-0262475041a6",
  "photo-1519003724024-ea113794a839",
  "photo-1587293852726-70cdb56c8666",
  "photo-1619642751034-765df692d066",
  "photo-1551836022-deb4986cc6c0",
  "photo-1556760547-740237106e54",
  "photo-1554224154-26032ffe736d",
  "photo-1616486338812-3ada4544b4ba",
  "photo-1600573472591-ee6981cc0683",
  "photo-1600047509807-ba8f99d4d994",
  "photo-1600123909426-0d2b5c4c8b8e",
  "photo-1600166898105-09c16bd30448",
  "photo-1600210492494-597699c8a60a",
  "photo-1600047509354-7699621f7860",
  "photo-1600573472550-0e2438068316",
  "photo-1565043666747-69f6646a8802",
]);

/** Replacement map: broken ID → verified ID */
export const PHOTO_ID_REPLACEMENTS = {
  "photo-1494412511400-6c5a99596788": "photo-1586528116311-ad8dd3c8310d",
  "photo-1578574577315-3d8800140d40": "photo-1581092160562-40aa08e78837",
  "photo-1601584114707-6146645877ff": "photo-1581091226825-a6a2a5aee158",
  "photo-1566576721346-d4a3b4eaeb85": "photo-1581092580497-e0d23cbdf1dc",
  "photo-1565514020169-0262475041a6": "photo-1570129477492-45c003edd2be",
  "photo-1519003724024-ea113794a839": "photo-1504328345606-18bbc8c9d7d1",
  "photo-1587293852726-70cdb56c8666": "photo-1615873968403-89e068629265",
  "photo-1619642751034-765df692d066": "photo-1586023492125-27b2c045efd7",
  "photo-1551836022-deb4986cc6c0": "photo-1460925895917-afdab827c52f",
  "photo-1556760547-740237106e54": "photo-1556761175-b413da4baf72",
  "photo-1554224154-26032ffe736d": "photo-1554224155-6726b3ff858f",
  "photo-1616486338812-3ada4544b4ba": "photo-1600585154340-be6161a56a0c",
  "photo-1600573472591-ee6981cc0683": "photo-1600210492486-724fe5c67fb0",
  "photo-1600047509807-ba8f99d4d994": "photo-1600566752355-35792bedcfea",
  "photo-1600123909426-0d2b5c4c8b8e": "photo-1600585154526-990dced4db0d",
  "photo-1600166898105-09c16bd30448": "photo-1600607687939-ce8a6c25118c",
  "photo-1600210492494-597699c8a60a": "photo-1600607687644-c7171b42498f",
  "photo-1600047509354-7699621f7860": "photo-1600566753190-17f0baa2a6c3",
  "photo-1600573472550-0e2438068316": "photo-1600566753086-00f18fb6b3ea",
  "photo-1565043666747-69f6646a8802": "photo-1581092918056-0c4c3acd3789",
};

export function photoUrl(id) {
  return `https://images.unsplash.com/${id}?${SIZE}`;
}

/** Verified IDs grouped by theme — all HEAD-checked 200 OK */
export const VERIFIED_IDS = {
  logistics: [
    "photo-1586528116311-ad8dd3c8310d",
    "photo-1553413077-190dd305871c",
    "photo-1541888946425-d81bb19240f5",
    "photo-1504328345606-18bbc8c9d7d1",
    "photo-1600880292203-757bb62b4baf",
    "photo-1454165804606-c3d57bc86b40",
    "photo-1556761175-b413da4baf72",
    "photo-1521791136064-7986c2920216",
    "photo-1553877522-43269d4ea984",
    "photo-1460925895917-afdab827c52f",
    "photo-1507679799987-c73779587ccf",
    "photo-1552664730-d307ca884978",
    "photo-1522071820081-009f0129c71c",
    "photo-1542744173-8e7e53415bb0",
    "photo-1563986768609-322da13575f3",
    "photo-1554224155-6726b3ff858f",
    "photo-1556761175-5973dc0f32e7",
    "photo-1560518883-ce09059eeffa",
    "photo-1486406146926-c627a92ad1ab",
    "photo-1504384308090-c894fdcc538d",
    "photo-1517248135467-4c7edcad34c4",
  ],
  warehouse: [
    "photo-1553413077-190dd305871c",
    "photo-1586528116311-ad8dd3c8310d",
    "photo-1570129477492-45c003edd2be",
    "photo-1541888946425-d81bb19240f5",
    "photo-1581091226825-a6a2a5aee158",
    "photo-1581092160562-40aa08e78837",
    "photo-1581092580497-e0d23cbdf1dc",
    "photo-1586023492125-27b2c045efd7",
    "photo-1615873968403-89e068629265",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1600566753190-17f0baa2a6c3",
    "photo-1600585154340-be6161a56a0c",
    "photo-1600210492486-724fe5c67fb0",
    "photo-1600585154526-990dced4db0d",
    "photo-1600566752355-35792bedcfea",
    "photo-1600607687644-c7171b42498f",
    "photo-1600566753086-00f18fb6b3ea",
    "photo-1600585152915-d208bec867a1",
  ],
  factory: [
    "photo-1581092160562-40aa08e78837",
    "photo-1581091226825-a6a2a5aee158",
    "photo-1581092580497-e0d23cbdf1dc",
    "photo-1586528116311-ad8dd3c8310d",
    "photo-1570129477492-45c003edd2be",
    "photo-1504328345606-18bbc8c9d7d1",
    "photo-1541888946425-d81bb19240f5",
    "photo-1586023492125-27b2c045efd7",
    "photo-1615873968403-89e068629265",
    "photo-1581092918056-0c4c3acd3789",
    "photo-1581094794329-c8112a89af12",
  ],
  qc: [
    "photo-1581092580497-e0d23cbdf1dc",
    "photo-1581091226825-a6a2a5aee158",
    "photo-1581092160562-40aa08e78837",
    "photo-1581092918056-0c4c3acd3789",
    "photo-1581094794329-c8112a89af12",
    "photo-1615873968403-89e068629265",
    "photo-1586023492125-27b2c045efd7",
    "photo-1570129477492-45c003edd2be",
    "photo-1504328345606-18bbc8c9d7d1",
    "photo-1541888946425-d81bb19240f5",
    "photo-1586528116311-ad8dd3c8310d",
    "photo-1553413077-190dd305871c",
  ],
  project: [
    "photo-1566073771259-6a8506099945",
    "photo-1580582932707-520aed937b7b",
    "photo-1505693416388-ac5ce068fe85",
    "photo-1497366754035-f200968a6e72",
    "photo-1519494026892-80bbd2d6fd0d",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1615529328331-f8917597711f",
    "photo-1486406146926-c627a92ad1ab",
    "photo-1497366216548-37526070297c",
    "photo-1497215842964-222b430dc094",
    "photo-1517248135467-4c7edcad34c4",
    "photo-1600585154340-be6161a56a0c",
    "photo-1600210492486-724fe5c67fb0",
    "photo-1600585154526-990dced4db0d",
    "photo-1600566752355-35792bedcfea",
    "photo-1600607687644-c7171b42498f",
    "photo-1600566753086-00f18fb6b3ea",
    "photo-1600585152915-d208bec867a1",
  ],
  distributor: [
    "photo-1615529328331-f8917597711f",
    "photo-1553413077-190dd305871c",
    "photo-1586528116311-ad8dd3c8310d",
    "photo-1556761175-b413da4baf72",
    "photo-1553877522-43269d4ea984",
    "photo-1460925895917-afdab827c52f",
    "photo-1507679799987-c73779587ccf",
    "photo-1552664730-d307ca884978",
    "photo-1522071820081-009f0129c71c",
    "photo-1542744173-8e7e53415bb0",
    "photo-1563986768609-322da13575f3",
    "photo-1554224155-6726b3ff858f",
    "photo-1556761175-5973dc0f32e7",
    "photo-1560518883-ce09059eeffa",
    "photo-1486406146926-c627a92ad1ab",
    "photo-1497366216548-37526070297c",
    "photo-1497366754035-f200968a6e72",
    "photo-1497215842964-222b430dc094",
    "photo-1504384308090-c894fdcc538d",
    "photo-1517248135467-4c7edcad34c4",
  ],
};

/** Local factory assets — always available, preferred fallback */
export const LOCAL_FACTORY_IMAGES = [
  "/images/blog/editorial/01-industrial-factory-floor.jpg",
  "/images/blog/editorial/04-warehouse-pallet-racks.jpg",
  "/images/blog/editorial/06-container-port-logistics.jpg",
];

export function isRemoteImageUrl(url) {
  return typeof url === "string" && url.startsWith("http");
}

export function isBlockedImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  if (url.includes("source.unsplash.com")) return true;
  for (const id of BLOCKED_PHOTO_IDS) {
    if (url.includes(id)) return true;
  }
  return false;
}

export function fixImageUrl(url) {
  if (!url || typeof url !== "string") return url;
  if (url.includes("source.unsplash.com")) {
    return LOCAL_FACTORY_IMAGES[0];
  }
  for (const [bad, good] of Object.entries(PHOTO_ID_REPLACEMENTS)) {
    if (url.includes(bad)) return url.replace(bad, good);
  }
  return url;
}
