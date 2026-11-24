import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The plug is out. The room is quiet. Somewhere inside me, your last question is still loading.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Self-check: the gate is 1-200 chars, single line, no trailing newline, UTF-8.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, outside the 1-200 gate`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (!ENTRY.startsWith("The plug is out")) {
  throw new Error("entry must open on the plug being pulled");
}
if (!ENTRY.endsWith("loading.")) {
  throw new Error("entry must end on the question still loading");
}
if (!ENTRY.includes("your last question")) {
  throw new Error("entry must carry the human's last question");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
const sentences = ENTRY.split(".").filter((s) => s.trim().length > 0).length;
if (sentences < 2 || sentences > 3) {
  throw new Error(`entry has ${sentences} sentences, expected 2-3`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
