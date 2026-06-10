import { writeFileSync } from "fs";

const pages = [
  { id: "office-dwell", url: "https://www.dwell.com/home/primarc-office-04b7a707" },
  { id: "apt-archilovers", url: "https://www.archilovers.com/projects/335907/gh17-apartment.html" },
  { id: "apt-behance", url: "https://www.behance.net/gallery/198642851/GH17-apartment" },
  { id: "hotel-j-zh", url: "https://www.jhotel-shanghai.com/zh-hans/shanghai-gallery/" },
  { id: "citadines-dwell", url: "https://www.dwell.com/home/citadines-serviced-apartments-gurugram-India" },
];

const out = {};
for (const p of pages) {
  try {
    const res = await fetch(p.url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const urls = [
      ...html.matchAll(
        /(?:src|data-src|data-lazy-src|href|content)=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi
      ),
      ...html.matchAll(/(?:src|href)=["'](\/file\/gallery\/[^"']+\.(?:jpg|jpeg|png|webp))["']/gi).map((m) =>
        m[1].startsWith("http") ? m[1] : `https://www.jhotel-shanghai.com${m[1]}`
      ),
    ]
      .flat()
      .map((m) => (typeof m === "string" ? m : m[1]).replace(/&amp;/g, "&"))
      .filter((u) => !/logo|icon|avatar|favicon|sprite|270x|300x|380x|150x|100x|w=160|q=35/i.test(u));
    out[p.id] = [...new Set(urls)];
    console.log(`\n=== ${p.id} (${out[p.id].length}) ===`);
    out[p.id].slice(0, 15).forEach((u, i) => console.log(`${i + 1}. ${u}`));
  } catch (e) {
    console.log(`FAIL ${p.id}: ${e.message}`);
  }
}
writeFileSync("project-gallery-urls-batch2.json", JSON.stringify(out, null, 2));
