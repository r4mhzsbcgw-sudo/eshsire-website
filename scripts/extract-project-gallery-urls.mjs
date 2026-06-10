/** One-off helper: extract img URLs from project gallery pages for review doc */
const pages = [
  { case: "hotel", url: "https://www.rosewoodhotels.com/en/hong-kong/gallery" },
  { case: "office", url: "https://spaceful.com.au/work/stellan/" },
  { case: "apartment", url: "https://sklim.com/projects/field/interior/redhill-apartment/" },
  { case: "villa", url: "https://theglsn.com/the-tagore-school-faridabad-envisage-architects/" },
  { case: "apt-wall", url: "https://932design.com/projects/" },
  { case: "medical2", url: "https://perkinswill.com/project/renown-south-meadows-specialty-care-center/" },
  { case: "school2", url: "https://theglsn.com/the-tagore-school-faridabad-envisage-architects/" },
  { case: "villa2", url: "https://architizer.com/projects/a-house-of-two-worlds-gurugram/" },
];

for (const p of pages) {
  try {
    const res = await fetch(p.url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const urls = [
      ...html.matchAll(
        /(?:src|data-src|data-lazy-src|content)=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi
      ),
    ]
      .map((m) => m[1].replace(/&amp;/g, "&"))
      .filter(
        (u) =>
          !/logo|icon|avatar|favicon|sprite|1x1|pixel|gravatar|facebook|twitter|linkedin|flag|map|badge/i.test(u)
      );
    const unique = [...new Set(urls)];
    console.log(`\n=== ${p.case.toUpperCase()} (${p.url}) — ${unique.length} images ===`);
    unique.slice(0, 12).forEach((u, i) => console.log(`${i + 1}. ${u}`));
  } catch (e) {
    console.error(`FAIL ${p.case}:`, e.message);
  }
}
