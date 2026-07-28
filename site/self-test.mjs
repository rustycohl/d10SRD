import { abilityModifier, resolveCheck, scaleD20DC } from "./lib/d10.mjs";

export async function runSelfTest() {
  const tableValid = abilityModifier(5) === -2
    && abilityModifier(12) === 1
    && abilityModifier(20) === 3;
  const tiersValid = [5, 10, 15, 20, 25]
    .map(scaleD20DC)
    .join(",") === "3,5,8,10,13";
  const result = resolveCheck({
    roll: 10,
    confirmation: 6,
    abilityScore: 12,
    skillRanks: 2,
    dc: 13,
  });
  const criticalValid = result.outcome === "critical_success";
  return {
    pass: tableValid && tiersValid && criticalValid,
    summary: "Published table → scaled tiers → confirmed threat",
    checks: [
      { name: "Ability table", pass: tableValid },
      { name: "DC 3/5/8/10/13", pass: tiersValid },
      { name: "Natural 10 confirms on 6+", pass: criticalValid },
    ],
    evidence: result,
  };
}
