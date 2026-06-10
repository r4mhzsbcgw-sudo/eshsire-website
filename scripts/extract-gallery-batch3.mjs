const targets = [
  ["hotel", "https://www.marriott.com/en-us/hotels/wuxsk-ac-hotel-suzhou-industrial-park/photos/"],
  ["school-glsn", "https://theglsn.com/the-tagore-school-faridabad-envisage-architects/"],
  ["villa", "https://www.e-architect.com/india/house-of-verandahs-new-delhi-india"],
  ["apt", "https://www.e-architect.com/berlin/gh17-apartment-berlin-germany"],
  ["office", "https://www.e-architect.com/india/primarc-office-kolkata-india"],
  ["medical-pw", "https://perkinswill.com/project/renown-south-meadows-specialty-care-center/"],
];

for (const [name, url] of targets) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const all = [
      ...html.matchAll(/https?:\/\/[^"'\\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\s>]*)?/gi),
    ].map((m) => m[0].replace(/&amp;/g, "&"));
    const filtered = [...new Set(all)].filter(
      (u) =>
        !/logo|icon|avatar|favicon|sprite|1x1|gravatar|facebook|twitter|linkedin|flag|badge|thumb|270x|300x200|380x/i.test(
          u
        )
    );
    console.log(`\n=== ${name} (${filtered.length}) ===`);
    filtered.slice(0, 20).forEach((u, i) => console.log(`${i + 1}. ${u}`));
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
}
