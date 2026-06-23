import {
  REQ_GYM_OFFICIAL_AREAS,
  REQ_GYM_QUESTION_TARGET,
  REQ_GYM_QUESTIONS,
} from "../lib/req-gym-bank.ts";

function fail(message) {
  throw new Error(message);
}

if (REQ_GYM_QUESTIONS.length !== REQ_GYM_QUESTION_TARGET) {
  fail(`expected ${REQ_GYM_QUESTION_TARGET} Req Gym questions, got ${REQ_GYM_QUESTIONS.length}`);
}

const ids = new Set();
const prompts = new Set();
const areaCounts = new Map(REQ_GYM_OFFICIAL_AREAS.map((area) => [area, 0]));
const difficultyCounts = new Map([
  ["easy", 0],
  ["medium", 0],
  ["hard", 0],
]);

for (const question of REQ_GYM_QUESTIONS) {
  if (ids.has(question.id)) fail(`duplicate question id: ${question.id}`);
  ids.add(question.id);

  if (prompts.has(question.promptTh)) fail(`duplicate prompt: ${question.promptTh}`);
  prompts.add(question.promptTh);

  if (!areaCounts.has(question.area)) fail(`unknown knowledge area on ${question.id}: ${question.area}`);
  areaCounts.set(question.area, areaCounts.get(question.area) + 1);

  if (!difficultyCounts.has(question.difficulty)) {
    fail(`unknown difficulty on ${question.id}: ${question.difficulty}`);
  }
  difficultyCounts.set(question.difficulty, difficultyCounts.get(question.difficulty) + 1);

  if (!Array.isArray(question.options) || question.options.length !== 4) {
    fail(`${question.id} must have exactly 4 answer options`);
  }

  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
    fail(`${question.id} answer index is out of range`);
  }

  if (question.promptTh.trim().length < 80) fail(`${question.id} prompt is too short`);
  if (question.explanationTh.trim().length < 80) fail(`${question.id} explanation is too short`);

  const optionSet = new Set(question.options);
  if (optionSet.size !== question.options.length) fail(`${question.id} has duplicate options`);
}

for (const [area, count] of areaCounts) {
  if (count < 150) fail(`${area} has too few questions: ${count}`);
}

for (const [difficulty, count] of difficultyCounts) {
  if (count < 200) fail(`${difficulty} difficulty has too few questions: ${count}`);
}

console.log(
  JSON.stringify(
    {
      total: REQ_GYM_QUESTIONS.length,
      areas: Object.fromEntries(areaCounts),
      difficulties: Object.fromEntries(difficultyCounts),
    },
    null,
    2,
  ),
);
