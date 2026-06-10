const urls = [
  "https://www.thedecorjournalindia.com/citadines-gurugram-a-985-sqm-dining-hospitality-experience-by-groupdca",
  "https://rsp.design/project/fakeeh-university-ho/",
];

for (const url of urls) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const imgs = [
    ...new Set(
      [...html.matchAll(/https?:\/\/[^"'\\s<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\s<>]*)?/gi)]
        .map((m) => m[0])
        .filter((u) => !/logo|icon|favicon|270x|300x|150x|100x|avatar|gravatar/i.test(u))
    ),
  ];
  console.log(`\n=== ${url} (${imgs.length}) ===`);
  imgs.slice(0, 10).forEach((u, i) => console.log(`${i + 1}. ${u}`));
}
