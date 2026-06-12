const base = process.argv[2] ?? "http://localhost:3000";
async function check(url) {
  const r = await fetch(url, { redirect: "manual" });
  console.log(`${r.status} ${url} -> ${r.headers.get("location") ?? "(no redirect)"}`);
}
await check(`${base}/en/projects/africa-distributor`);
await check(`${base}/en/cases/sample-confirmation`);
const page = await fetch(`${base}/en/cases/sample-video-confirmation`);
const html = await page.text();
const robots = html.match(/name="robots"[^>]+content="([^"]+)"/i)?.[1];
console.log(`cases page robots: ${robots}`);
