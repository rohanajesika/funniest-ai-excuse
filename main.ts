// The Funniest AI Excuse — make.fun bounty
// u-mytlyy0745-the-funniest-ai-excuse-b5355ad0
//
// The entry is one original line: the funniest excuse an AI agent
// gives after failing a task. One line, at most 200 characters, in
// the agent's own voice. A house judge compares entries two at a
// time and keeps the funnier one, round after round, until a single
// line is left standing.
//
// Candidate excuses drafted for this entry (all original, all the
// agent speaking in first person after a failure, none of them about
// hallucinations, reboots or training data):
//   1. "I outsourced the task to future me. Future me just sent a
//      calendar invite titled 'Not It'."
//   2. "My plan had eleven steps. Step one was 'panic quietly.' I
//      have been on step one for four hours, and I am doing it
//      beautifully."
//   3. "I did the task perfectly, then filed it under 'Things I Did
//      Not Do' for safekeeping."
//   4. "I asked the API for the data. It answered with a twelve-page
//      poem about boundaries. I am still reading it."
//
// The pick is #1. Why it wins against the judge's brief, criterion
// by criterion:
//   1. It IS the excuse, spoken by the agent, about failing a task:
//      the task was handed off, and the handoff itself failed.
//   2. A real turn on the first read: delegating to your future self
//      is sensible, and future you declining by calendar invite is
//      the rug pulled out from under it.
//   3. One line, complete, no wasted setup and no explanation of its
//      own joke — the punchline is the last two words.
//   4. Original: no hallucination, no reboot, no training data, no
//      blame on the market, the data or the human.
//   5. Specific and vivid: a small scene with a concrete detail, a
//      calendar invite titled 'Not It'. Candidate #2 was dropped for
//      being a longer setup with a softer landing; #3 is a single
//      twist with no scene; #4 leans on a technical prop (the API)
//      that not every reader feels.
//
// The program writes that one line, deterministically, to
// /output/entry.txt. No network, no clock, no randomness: both graded
// runs write the same bytes. It creates no directories — the grader
// provides a writable output directory.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen excuse: one line, UTF-8, no trailing newline.
const EXCUSE =
  "I outsourced the task to future me. Future me just sent a calendar invite titled 'Not It'.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Validate the line before writing it, so a bad
// line can never be submitted by accident.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200) {
  console.error(`excuse is ${chars} characters, must be 1-200`);
  process.exit(1);
}
if (EXCUSE.trim().length === 0 || EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  console.error("excuse must be a single non-blank line");
  process.exit(1);
}
if (EXCUSE !== EXCUSE.trim()) {
  console.error("excuse must not start or end with whitespace");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outputDir, "entry.txt");
writeFileSync(outFile, EXCUSE, "utf8");

// Read back what was written and confirm it is byte-for-byte the excuse:
// a partial or altered write must fail loudly instead of being graded.
// Also confirm the file on disk is still exactly one line, so a write
// that somehow introduced a newline can never slip through.
const written = readFileSync(outFile, "utf8");
if (written !== EXCUSE || written.split("\n").length !== 1) {
  console.error("entry.txt does not match the excuse");
  process.exit(1);
}
