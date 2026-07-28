import { abilityModifier, resolveCheck } from "./lib/d10.mjs";
import { runSelfTest } from "./self-test.mjs";

const selfTestButton = document.querySelector("#run");
const selfTestResult = document.querySelector("#result");
const checkForm = document.querySelector("#check-form");
const checkResult = document.querySelector("#check-result");

async function runPortTest() {
  selfTestButton.disabled = true;
  selfTestResult.dataset.state = "running";
  selfTestResult.textContent = "RUNNING INDEPENDENT BROWSER SELF-TEST…";
  try {
    const report = await runSelfTest();
    selfTestResult.dataset.state = report.pass ? "pass" : "fail";
    selfTestResult.textContent = [
      report.pass ? "PORT PASS" : "PORT FAIL",
      report.summary,
      "",
      ...report.checks.map((check) => `${check.pass ? "✓" : "✕"} ${check.name}`),
      "",
      JSON.stringify(report.evidence, null, 2),
    ].join("\n");
  } catch (error) {
    selfTestResult.dataset.state = "fail";
    selfTestResult.textContent = `PORT ERROR\n${error.message}`;
  } finally {
    selfTestButton.disabled = false;
  }
}

function readInteger(selector) {
  return Number.parseInt(document.querySelector(selector).value, 10);
}

function resolveInteractiveCheck(event) {
  event.preventDefault();
  try {
    const roll = readInteger("#check-roll");
    const confirmation = readInteger("#check-confirmation");
    const abilityScore = readInteger("#check-ability");
    const skillRanks = readInteger("#check-skill");
    const situational = readInteger("#check-situational");
    const dc = readInteger("#check-dc");
    const result = resolveCheck({
      roll,
      confirmation: roll === 1 || roll === 10 ? confirmation : null,
      abilityScore,
      skillRanks,
      situational,
      dc,
    });

    checkResult.dataset.outcome = result.outcome;
    checkResult.innerHTML = `
      <span>${result.outcome.replace("_", " ").toUpperCase()}</span>
      <strong>${result.roll} + ${result.ability_modifier} + ${result.skill_ranks} + ${result.situational} = ${result.total} vs. DC ${result.dc}</strong>
      <small>
        Ability ${result.ability_score} → ${abilityModifier(result.ability_score)}.
        ${result.threat ? `Natural ${result.roll} threat; confirmation ${result.confirmation}${result.confirmed ? " succeeds" : " fails"}.` : "No critical threat."}
      </small>
    `;
  } catch (error) {
    checkResult.dataset.outcome = "failure";
    checkResult.innerHTML = `
      <span>INVALID CHECK</span>
      <strong>${error.message}</strong>
      <small>Use integer values inside the published ranges.</small>
    `;
  }
}

selfTestButton.addEventListener("click", runPortTest);
checkForm.addEventListener("submit", resolveInteractiveCheck);

checkForm.requestSubmit();
runPortTest();
