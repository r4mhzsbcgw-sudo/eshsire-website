const targets = [
  ["groupdca-villa", "https://groupdca.in/work/house-of-verandah-2/"],
  ["groupdca-office", "https://groupdca.in/work/primarc-office/"],
  ["groupdca-citadines", "https://groupdca.in/work/citadines/"],
  ["glsn-tagore", "https://theglsn.com/the-tagore-school-faridabad-envisage-architects/"],
  ["marvel-kipp", "https://marveldesigns.com/project/kipp-inquire-elementary-school/"],
];

for (const [name, url] of targets) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const all = [...html.matchAll(/https:\/\/[^"'\\s<>]+/gi)].map((m) => m[0].replace(/&amp;/g, "&"));
    const imgs = [...new Set(all)].filter(
      (u) =>
        /wp-content\/uploads/i.test(u) &&
        /\.(jpg|jpeg|png|webp)/i.test(u) &&
        !/logo|icon|favicon|270x|300x|380x|150x|100x/i.test(u)
    );
    console.log(`\n=== ${name} (${imgs.length}) ===`);
    imgs.forEach((u, i) => console.log(`${i + 1}. ${u}`));
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
}
