import {
  BA_ASSESSMENT_EXPECTED_MCQ_PER_SET,
  BA_ASSESSMENT_EXPECTED_WRITTEN_CASE_COUNT,
  BA_ASSESSMENT_EXPECTED_SET_COUNT,
  BA_ASSESSMENT_EXPECTED_WRITTEN_PROMPTS_PER_SET,
  BA_ASSESSMENT_PRACTICE_SETS,
} from "../lib/ba-assessment-practice.ts";

function fail(message) {
  console.error(`[ba-assessment-practice] ${message}`);
  process.exit(1);
}

if (BA_ASSESSMENT_PRACTICE_SETS.length !== BA_ASSESSMENT_EXPECTED_SET_COUNT) {
  fail(
    `expected ${BA_ASSESSMENT_EXPECTED_SET_COUNT} sets, got ${BA_ASSESSMENT_PRACTICE_SETS.length}`,
  );
}

const setIds = new Set();
for (const set of BA_ASSESSMENT_PRACTICE_SETS) {
  if (setIds.has(set.id)) fail(`duplicate set id: ${set.id}`);
  setIds.add(set.id);

  if (set.mcq.length !== BA_ASSESSMENT_EXPECTED_MCQ_PER_SET) {
    fail(
      `${set.id} expected ${BA_ASSESSMENT_EXPECTED_MCQ_PER_SET} MCQ questions, got ${set.mcq.length}`,
    );
  }

  if (!set.writtenCase) {
    fail(`${set.id} is missing writtenCase`);
  }

  if (set.writtenCase.prompts.length !== BA_ASSESSMENT_EXPECTED_WRITTEN_PROMPTS_PER_SET) {
    fail(
      `${set.id} expected ${BA_ASSESSMENT_EXPECTED_WRITTEN_PROMPTS_PER_SET} written prompts, got ${set.writtenCase.prompts.length}`,
    );
  }

  if (!set.writtenCase.scenario || set.writtenCase.scenario.length < 900) {
    fail(`${set.id} written case should include a long scenario paper`);
  }

  const questionIds = new Set();
  for (const question of set.mcq) {
    if (questionIds.has(question.id)) fail(`duplicate question id: ${question.id}`);
    questionIds.add(question.id);
    if (question.options.length !== 4) {
      fail(`${question.id} expected 4 options, got ${question.options.length}`);
    }
    if (question.prompt.length < 280) {
      fail(`${question.id} should be a scenario-length MCQ prompt`);
    }
    if (question.correctIndex < 0 || question.correctIndex > 3) {
      fail(`${question.id} has invalid correctIndex ${question.correctIndex}`);
    }
    if (!question.prompt.includes("BA") && !question.prompt.includes("Business Analyst")) {
      fail(`${question.id} should be BA-framed`);
    }
    if (!question.explanation || question.explanation.length < 30) {
      fail(`${question.id} needs a meaningful explanation`);
    }
  }

  const promptTypes = new Map();
  for (const task of set.writtenCase.prompts) {
    promptTypes.set(task.type, (promptTypes.get(task.type) ?? 0) + 1);
    if (!task.prompt || task.prompt.length < 90) {
      fail(`${task.id} needs a realistic written answer prompt`);
    }
    if (task.expectedPoints.length < 4) {
      fail(`${task.id} needs at least 4 expected scoring points`);
    }
  }

  if (promptTypes.get("feature") !== 6) {
    fail(`${set.id} written case should include 6 feature prompts`);
  }
  if (promptTypes.get("overview") !== 2) {
    fail(`${set.id} written case should include 2 system overview prompts`);
  }
  if (promptTypes.get("endToEnd") !== 1) {
    fail(`${set.id} written case should include 1 end-to-end prompt`);
  }
  if (promptTypes.get("bonus") !== 1) {
    fail(`${set.id} written case should include 1 bonus prompt`);
  }
}

console.log(
  `[ba-assessment-practice] ${BA_ASSESSMENT_PRACTICE_SETS.length} sets validated (${BA_ASSESSMENT_PRACTICE_SETS.length * BA_ASSESSMENT_EXPECTED_MCQ_PER_SET} MCQ, ${BA_ASSESSMENT_EXPECTED_WRITTEN_CASE_COUNT} written cases, ${BA_ASSESSMENT_PRACTICE_SETS.length * BA_ASSESSMENT_EXPECTED_WRITTEN_PROMPTS_PER_SET} written prompts)`,
);
