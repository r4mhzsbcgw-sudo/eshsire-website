import { writeFileSync } from "fs";

const pages = [
  { id: "apt-gh17", url: "https://www.e-architect.com/berlin/gh17-apartment-berlin-germany" },
  { id: "office-primarc", url: "https://www.e-architect.com/india/primarc-office-kolkata-india" },
  { id: "aptwall-citadines", url: "https://www.e-architect.com/india/citadines-serviced-apartments-gurugram-india" },
  { id: "hotel-middle", url: "https://www.e-architect.com/shanghai/the-middle-house-hotel-shanghai-china" },
  { id: "medical-pw", url: "https://www.e-architect.com/chicago/renown-south-meadows-specialty-care-center-nevada-usa" },
];

const out = {};
for (const p of pages) {
  const res = await fetch(p.url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const urls = [
    ...html.matchAll(
      /(?:src|data-src|data-lazy-src|href)=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi
    ),
  ]
    .map((m) => m[1].replace(/&amp;/g, "&"))
    .filter((u) => !/logo|icon|avatar|favicon|sprite|bb-plugin\/cache|270x|300x|380x|150x|100x/i.test(u));
  out[p.id] = [...new Set(urls)];
}

writeFileSync("project-gallery-urls.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
