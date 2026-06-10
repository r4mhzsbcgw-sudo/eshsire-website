const urls = [
  "https://www.jhotel-shanghai.com/file/gallery/gallery_image/101f-lobby-lounge.webp",
  "https://www.jhotel-shanghai.com/file/gallery/gallery_image/101f-lift-corridor.webp",
  "https://www.jhotel-shanghai.com/file/gallery/gallery_image/guestroom-floor-corridor-gallery.webp",
  "https://www.jhotel-shanghai.com/file/gallery/gallery_image/j-suite-living-room-gallery.webp",
  "https://www.jhotel-shanghai.com/file/gallery/gallery_image/j-suite-bedroom-gallery.webp",
  "https://www.jhotel-shanghai.com/file/gallery/gallery_image/shanghai-suite-living-room-gallery.webp",
  "https://images2.dwell.com/photos/6827157857990344704/7234451621148147712/original.jpg",
  "https://images2.dwell.com/photos/6827157857990344704/7234449695758737408/original.jpg",
  "https://images2.dwell.com/photos/6827157857990344704/7234450318472740864/original.jpg",
  "https://images2.dwell.com/photos/6827157857990344704/7234449698896076800/original.jpg",
  "https://images2.dwell.com/photos/6827157857990344704/7234450349976961024/original.jpg",
];

for (const u of urls) {
  const r = await fetch(u, { method: "HEAD", headers: { "User-Agent": "Mozilla/5.0" } });
  console.log(r.status, u);
}

const r2 = await fetch("https://www.archilovers.com/projects/335907/gh17-apartment.html", {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const h = await r2.text();
const imgs = [...new Set([...h.matchAll(/https:\/\/cdn\.archilovers\.com\/projects\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]))];
console.log("\narchilovers", imgs.length);
imgs.forEach((u, i) => console.log(i + 1, u));
