const pages = [
  "https://sklim.com/projects/field/interior/redhill-apartment/",
  "https://archello.com/project/citadines-serviced-residence-gurugram",
  "https://groupdca.in/work/citadines/",
];

for (const url of pages) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const urls = [
      ...new Set(
        [...html.matchAll(/https?:\/\/[^"'\\s<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\s<>]*)?/gi)]
          .map((m) => m[0])
          .filter((u) => !/logo|icon|favicon|270x|300x|380x|150x|100x|avatar/i.test(u))
      ),
    ];
    console.log(`\n=== ${url} (${urls.length}) ===`);
    urls.slice(0, 12).forEach((u, i) => console.log(`${i + 1}. ${u}`));
  } catch (e) {
    console.log(`FAIL ${url}: ${e.message}`);
  }
}
