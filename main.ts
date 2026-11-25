// One-Line Office Joke: 24-Hour Sprint
// Entry: a single-line office joke about the mute-button mishap every
// remote worker knows, with a twist — the silence was the contribution.
// The program writes exactly one line of UTF-8 text (<=200 chars) to
// /output/entry.txt, deterministically, with no network access.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I pitched my big idea for ten straight minutes on mute, and my boss still called it my most productive contribution of the quarter.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  // Clear only the contents of /output (never remove the directory
  // itself — the grader mounts it root-owned).
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
  }

  const text = JOKE.trim();
  if (text.length === 0 || text.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  // Reject control characters (other than none here) so the gate sees
  // clean printable UTF-8 text.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("joke must not contain control characters");
  }
  writeFileSync(OUTPUT_FILE, text, "utf8");
  console.log(`Wrote ${text.length} characters to ${OUTPUT_FILE}`);
}

main();
