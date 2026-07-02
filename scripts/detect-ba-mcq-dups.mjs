import {
  BA_ASSESSMENT_PRACTICE_SETS,
} from "../lib/ba-assessment-practice.ts";

// 1) Exact-prompt duplicates within a set (same prompt text => same question)
console.log("=== Exact-prompt duplicates WITHIN each set ===");
let withinTotal = 0;
for (const set of BA_ASSESSMENT_PRACTICE_SETS) {
  const byPrompt = new Map();
  for (const q of set.mcq) {
    const arr = byPrompt.get(q.prompt) ?? [];
    arr.push(q.id);
    byPrompt.set(q.prompt, arr);
  }
  const dups = [...byPrompt.values()].filter((ids) => ids.length > 1);
  if (dups.length > 0) {
    withinTotal += dups.reduce((n, ids) => n + ids.length, 0);
    console.log(
      `\n[${set.id}] ${dups.length} prompt groups duplicated (${dups.reduce(
        (n, ids) => n + ids.length,
        0,
      )} of ${set.mcq.length} questions):`,
    );
    for (const ids of dups.slice(0, 3)) {
      console.log(`   ${ids.join(" == ")}`);
    }
    if (dups.length > 3) console.log(`   ...and ${dups.length - 3} more groups`);
  } else {
    console.log(`[${set.id}] no within-set exact-prompt duplicates`);
  }
}
console.log(`\nTotal questions involved in within-set duplicates: ${withinTotal}`);

// 2) Exact same OPTION SET (sorted) across the whole pool — reveals
//    questions that share identical answer choices even if the prompt
//    framing differs (sets 3-10 reuse the same 10 generic angles).
console.log("\n=== Same option-set across the ENTIRE pool ===");
const byOptions = new Map();
for (const set of BA_ASSESSMENT_PRACTICE_SETS) {
  for (const q of set.mcq) {
    const key = [...q.options].sort().join(" || ");
    const arr = byOptions.get(key) ?? [];
    arr.push({ setId: set.id, qid: q.id });
    byOptions.set(key, arr);
  }
}
const optDups = [...byOptions.values()].filter((arr) => arr.length > 1);
console.log(
  `Distinct option-sets that recur: ${optDups.length} (covering ${optDups.reduce(
    (n, a) => n + a.length,
    0,
  )} questions)`,
);
for (const arr of optDups.slice(0, 8)) {
  console.log(
    `   [${arr.length}x] ${arr
      .slice(0, 6)
      .map((x) => `${x.setId}:${x.qid}`)
      .join(", ")}${arr.length > 6 ? `, +${arr.length - 6} more` : ""}`,
  );
}

// 3) Distinct unique questions per set vs total
console.log("\n=== Unique-prompt count per set ===");
for (const set of BA_ASSESSMENT_PRACTICE_SETS) {
  const unique = new Set(set.mcq.map((q) => q.prompt)).size;
  console.log(`[${set.id}] ${unique} unique prompts / ${set.mcq.length} questions`);
}

// Exit-code guard: fail if any set has duplicate prompts or fewer unique
// prompts than its question count.
let shortSets = 0;
for (const set of BA_ASSESSMENT_PRACTICE_SETS) {
  const unique = new Set(set.mcq.map((q) => q.prompt)).size;
  if (unique !== set.mcq.length) shortSets += 1;
}

if (withinTotal > 0 || shortSets > 0) {
  console.error(
    `\nFAIL: duplicates found (within-set dup questions: ${withinTotal}, sets with short unique counts: ${shortSets})`,
  );
  process.exit(1);
}
console.log("\nOK: no MCQ duplicates detected");
process.exit(0);
