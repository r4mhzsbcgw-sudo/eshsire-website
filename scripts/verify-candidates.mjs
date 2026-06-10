#!/usr/bin/env node
import https from "node:https";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), ".stock-verify");
mkdirSync(dir, { recursive: true });

const pex = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop`;
const uns = (id) => `https://images.unsplash.com/${id}?w=400&h=300&fit=crop&q=80`;

const candidates = [
  { label: "office-6794929", url: pex(6794929) },
  { label: "office-2294135", url: pex(2294135) },
  { label: "office-7688336", url: pex(7688336) },
  { label: "office-1181406", url: pex(1181406) },
  { label: "office-3184292", url: pex(3184292) },
  { label: "office-3184296", url: pex(3184296) },
  { label: "office-3184418", url: pex(3184418) },
  { label: "office-3184465", url: pex(3184465) },
  { label: "office-3183150", url: pex(3183150) },
  { label: "office-3183153", url: pex(3183153) },
  { label: "office-3182773", url: pex(3182773) },
  { label: "office-3184290", url: pex(3184290) },
  { label: "hospital-4021779", url: pex(4021779) },
  { label: "hospital-4021775", url: pex(4021775) },
  { label: "hospital-8460126", url: pex(8460126) },
  { label: "hospital-8460128", url: pex(8460128) },
  { label: "hospital-8460130", url: pex(8460130) },
  { label: "hospital-8460132", url: pex(8460132) },
  { label: "hospital-8460134", url: pex(8460134) },
  { label: "hospital-8460136", url: pex(8460136) },
  { label: "hospital-8460138", url: pex(8460138) },
  { label: "hospital-8460140", url: pex(8460140) },
  { label: "hospital-8460142", url: pex(8460142) },
  { label: "hospital-8460144", url: pex(8460144) },
  { label: "hospital-8460146", url: pex(8460146) },
  { label: "warehouse-8760709", url: pex(8760709) },
  { label: "floor-159306", url: pex(159306) },
  { label: "floor-159358", url: pex(159358) },
  { label: "floor-1249611", url: pex(1249611) },
  { label: "uns-lobby", url: uns("photo-1774192620890-f61475279725") },
  { label: "uns-office-149736", url: uns("photo-1497366216548-37526070297c") },
  { label: "uns-office-149736b", url: uns("photo-1497366754035-f200968a6e72") },
  { label: "uns-office-149721", url: uns("photo-1497215844904-f222acb1-465d") },
  { label: "uns-hospital-151949", url: uns("photo-1519494026892-80bbd2d6fd0d") },
  { label: "uns-hospital-157609", url: uns("photo-1576091160399-112ba8d25d1d") },
  { label: "uns-hospital-157968", url: uns("photo-1579684385127-1ef15d508118") },
  { label: "uns-hospital-158028", url: uns("photo-1580281657527-47f249ebc71b") },
  { label: "uns-hospital-158271", url: uns("photo-1582719478250-c89cae4dc85b") },
  { label: "uns-office-160088", url: uns("photo-1600880292203-757bb62b4baf") },
  { label: "uns-office-160088b", url: uns("photo-1600880292089-90a7e086ee0c") },
  { label: "uns-office-161822", url: uns("photo-1618221195710-dd6b41faaea6") },
  { label: "uns-office-161587", url: uns("photo-1615874959470-d609969a20ed") },
  { label: "uns-office-160058", url: uns("photo-1600585154340-be6161a56a0c") },
  { label: "uns-office-160060", url: uns("photo-1600607687644-c7171b42498f") },
  { label: "uns-office-160056", url: uns("photo-1600566753190-17f683be8802") },
  { label: "uns-office-160057", url: uns("photo-1600570912355-3599a58c3a4a") },
  { label: "uns-office-160058b", url: uns("photo-1600585154526-990dced4db0d") },
  { label: "uns-office-160058c", url: uns("photo-1600585152915-d208bec867a1") },
  { label: "uns-office-160058d", url: uns("photo-1600585154340-be6161a56a0c") },
  { label: "uns-hospital-175599", url: uns("photo-1755995083683-50d08cd83d09") },
  { label: "uns-hospital-176434", url: uns("photo-1764345676856-eaf84d541dc9") },
];

function dl(label, url) {
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
            const buf = Buffer.concat(chunks);
            writeFileSync(join(dir, `${label}.jpg`), buf);
            resolve(buf.length);
          });
        };
        follow(res);
      })
      .on("error", reject);
  });
}

for (const c of candidates) {
  try {
    const size = await dl(c.label, c.url);
    console.log("ok", c.label, size);
  } catch (e) {
    console.log("fail", c.label, e.message);
  }
}
