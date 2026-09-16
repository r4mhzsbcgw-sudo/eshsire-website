import { test } from "node:test";
import assert from "node:assert/strict";
import { publishingInventory } from "./check-blog-inventory.mjs";
function stock(days) {
  return Array.from({length:days}, (_, i) => {
    const date = new Date(Date.UTC(2026,8,16+i)).toISOString().slice(0,10);
    return ["flooring","wall-panel"].map((slot) => ({
      locale:"en",slug:`${slot}-${date}`,publishDate:date,publishGroupDate:date,
      publishSlot:slot,status:"scheduled",approvedForPublish:true,isPlaceholder:false,body:"word ".repeat(250),
    }));
  }).flat();
}
test("warning thresholds use complete future days", () => {
  for (const [days,level] of [[31,"NORMAL"],[30,"WARNING"],[15,"WARNING"],[14,"CRITICAL"],[0,"CRITICAL"]]) {
    assert.equal(publishingInventory(stock(days),"2026-09-15").level,level);
  }
});
test("gaps, unapproved or duplicate slots cannot inflate inventory", () => {
  const entries=stock(40); entries[4].approvedForPublish=false;
  assert.equal(publishingInventory(entries,"2026-09-15").remainingDays,2);
  const duplicate=stock(40);duplicate.push({...duplicate[0]});
  assert.equal(publishingInventory(duplicate,"2026-09-15").remainingDays,0);
});
