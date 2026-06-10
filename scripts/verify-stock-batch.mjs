#!/usr/bin/env node
import https from "node:https";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), ".pexels-verify2");
mkdirSync(dir, { recursive: true });

const unsplashIds = [
  "photo-1549081231-203e069916f0",
  "photo-1559369064-c4d65141e408",
  "photo-1741655262435-4890ab9918fa",
  "photo-1677617586882-2b494292ebbe",
  "photo-1627554652217-e780779afaf8",
  "photo-1552741775-7817c0c85843",
  "photo-1607332749331-6db303fcbb5d",
  "photo-1645533929330-90578b2cb649",
  "photo-1600534220378-df36338afc40",
];

function dl(id) {
  const url = `https://images.unsplash.com/${id}?w=400&h=300&fit=crop&q=80`;
  return new Promise((resolve, reject) => {
    https
      .get(url, { timeout: 20000 }, (res) => {
        const follow = (r) => {
          if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
            https.get(r.headers.location, { timeout: 20000 }, follow).on("error", reject);
            return;
          }
          if (r.statusCode !== 200) {
            reject(new Error(`HTTP ${r.statusCode}`));
            return;
          }
          const chunks = [];
          r.on("data", (c) => chunks.push(c));
          r.on("end", () => {
            writeFileSync(join(dir, `u_${id}.jpg`), Buffer.concat(chunks));
            resolve(id);
          });
        };
        follow(res);
      })
      .on("error", reject);
  });
}

for (const id of unsplashIds) {
  try {
    await dl(id);
    console.log("ok", id);
  } catch (e) {
    console.log("fail", id, e.message);
  }
}
