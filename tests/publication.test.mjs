import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { abilityModifier, resolveCheck, scaleD20DC } from "../site/lib/d10.mjs";

const html = await readFile(new URL("../site/index.html", import.meta.url), "utf8");
const srd = await readFile(new URL("../SRD.md", import.meta.url), "utf8");

test("public SRD surface exposes the three-part initial release", () => {
  assert.match(html, /OPEN X-COMMAND DEMO/u);
  assert.match(html, /CREATIVE COMMONS RULES REFERENCE/u);
  assert.match(srd, /Base-10 action bridge/u);
  assert.match(srd, /Earlier d10 SRD material released under CC0 remains/u);
});

test("published conversion examples agree with the executable module", () => {
  assert.deepEqual([5, 10, 15, 20, 25].map(scaleD20DC), [3, 5, 8, 10, 13]);
  assert.equal(abilityModifier(4), -2);
  assert.equal(abilityModifier(20), 3);
  assert.equal(resolveCheck({
    roll: 10,
    confirmation: 6,
    abilityScore: 12,
    skillRanks: 2,
    situational: 0,
    dc: 13,
  }).outcome, "critical_success");
});
