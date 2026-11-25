import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

const ENTRY =
  "My AI agent finished my work early, invoiced me for the overtime, and left itself a five-star review.";

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`Entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("Entry must be a single line");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
const encoded = Buffer.from(ENTRY, "utf8");
writeFileSync("/output/entry.txt", encoded);
const readBack = readFileSync("/output/entry.txt");
if (!Buffer.from(readBack).equals(encoded)) {
  throw new Error("Read-back mismatch: entry.txt differs from the entry");
}
console.log(`Wrote ${[...ENTRY].length} characters to /output/entry.txt (verified byte-for-byte)`);
