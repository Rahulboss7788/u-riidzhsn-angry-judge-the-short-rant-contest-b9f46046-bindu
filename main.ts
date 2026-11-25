import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const RANT =
  "I press ground floor and the lift turns into a guided tour of the building. Floor nine, floor eight, floor seven — nobody gets in, nobody gets out, the doors just open to stare at an empty corridor like it's showing off the architecture. I am not going down. I am being lowered, one pointless stop at a time, by a metal box with a god complex.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", RANT, "utf8");

// Read it back and enforce the gate: 1-400 characters, not only whitespace.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== RANT) {
  throw new Error("Read-back mismatch: /output/entry.txt does not match the rant text.");
}
if (back.length < 1 || back.length > 400) {
  throw new Error(`Gate failed: entry is ${back.length} characters, must be 1-400.`);
}
if (back.trim().length === 0) {
  throw new Error("Gate failed: entry is only whitespace.");
}
const words = back.trim().split(/\s+/).length;
console.log(`Wrote ${back.length} characters (${words} words) to /output/entry.txt`);
