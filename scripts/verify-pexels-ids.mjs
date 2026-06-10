#!/usr/bin/env node
/** Fetch Pexels photo page title for ID verification */
import https from "node:https";

const ids = process.argv.slice(2).map(Number).filter(Boolean);

function fetchTitle(id) {
  return new Promise((resolve) => {
    https
      .get(`https://www.pexels.com/photo/x-${id}/`, { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchTitleFromUrl(id, res.headers.location).then(resolve);
          return;
        }
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve(parseTitle(id, body)));
      })
      .on("error", () => resolve({ id, title: "ERROR", ok: false }));
  });
}

function fetchTitleFromUrl(id, url) {
  return new Promise((resolve) => {
    https
      .get(url, { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve(parseTitle(id, body)));
      })
      .on("error", () => resolve({ id, title: "ERROR", ok: false }));
  });
}

function parseTitle(id, html) {
  const og = html.match(/property="og:title"\s+content="([^"]+)"/);
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = (og?.[1] || h1?.[1] || "UNKNOWN").replace(/ · Free Stock Photo$/, "").trim();
  return { id, title, ok: title !== "UNKNOWN" && title !== "ERROR" };
}

for (const id of ids) {
  const r = await fetchTitle(id);
  console.log(`${r.id}\t${r.title}`);
}
