// Ridiculous at First Glance, Real by the Second — entry program.
// Writes one sentence (a startup pitch) to /output/entry.txt.
// Deterministic: the same bytes on every run. No network, no randomness.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const PITCH =
  "We pay you $500 now for your skeleton when you die, because medical schools pay $3,000 for a real one and India banned exports in 1985, so no new skeletons are coming.";

function codePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = codePoints(text);
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  for (const ch of text) {
    const cp = ch.codePointAt(0) as number;
    if (cp < 0x20 || cp === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

assertGate(PITCH);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH, "utf8");
// Read back and verify: what landed on disk must be byte-identical to PITCH.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== PITCH) {
  throw new Error("read-back mismatch: /output/entry.txt differs from PITCH");
}
