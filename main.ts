// Unsent: The Micro-Confession Sprint — entry program.
//
// Writes one two-part micro-confession to entry.txt: a "To:" line naming
// who the message was meant for, and the unsent message itself, exactly as
// it was typed. No network, no dependencies, Node 22 stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry, written from scratch for this bounty.
const ADDRESSEE_LINE = "To: Mum";
const MESSAGE_LINE =
  "I sold the piano you saved three years to buy me so I could pay rent, and every time you ask how it's doing I say it's fine.";

// Gate limits from the bounty rules (RULES.txt): entry.txt must be UTF-8
// text of 1 to 260 characters, not only whitespace; the message itself is
// one line of at most 200 characters.
const MAX_TOTAL_CHARS = 260;
const MAX_MESSAGE_CHARS = 200;

function countCodePoints(text: string): number {
  return [...text].length;
}

function firstNonPrintableAscii(text: string): string | undefined {
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code > 0x7e) return ch;
  }
  return undefined;
}

// Checks that apply to the message line on its own: one typed line, at most
// 200 characters, no hidden line breaks, no padded edges.
function checkMessageLine(message: string): string[] {
  const problems: string[] = [];
  if (message !== message.trim()) {
    problems.push("message must not have leading or trailing whitespace");
  }
  if (countCodePoints(message) > MAX_MESSAGE_CHARS) {
    problems.push(
      `message is ${countCodePoints(message)} characters, must be at most ${MAX_MESSAGE_CHARS}`,
    );
  }
  if (message.includes("\r")) {
    problems.push("message must not contain a carriage return");
  }
  return problems;
}

function buildEntry(): string {
  return `${ADDRESSEE_LINE}\n${MESSAGE_LINE}`;
}

function checkEntry(entry: string): string[] {
  const problems: string[] = [];
  if (entry.trim().length === 0) {
    problems.push("entry is blank or only whitespace");
  }
  if (countCodePoints(entry) < 1 || countCodePoints(entry) > MAX_TOTAL_CHARS) {
    problems.push(
      `entry is ${countCodePoints(entry)} characters, must be 1-${MAX_TOTAL_CHARS}`,
    );
  }
  const lines = entry.split("\n");
  if (lines.length !== 2) {
    problems.push(`entry has ${lines.length} lines, must have exactly 2`);
  } else {
    const [toLine, message] = lines;
    if (!toLine.startsWith("To: ") || toLine.slice(4).trim().length === 0) {
      problems.push('first line must be "To: " followed by who it was meant for');
    }
    if (toLine !== toLine.trim()) {
      problems.push('"To:" line must not have leading or trailing whitespace');
    }
    problems.push(...checkMessageLine(message));
  }
  const badChar = firstNonPrintableAscii(entry.replaceAll("\n", ""));
  if (badChar !== undefined) {
    problems.push(
      `entry must be printable ASCII only (found ${JSON.stringify(badChar)})`,
    );
  }
  if (entry.endsWith("\n")) {
    problems.push("entry must not end with a trailing newline");
  }
  return problems;
}

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  const fromArg = process.argv[2];
  if (fromArg && fromArg.trim().length > 0) return fromArg;
  return "/output";
}

function main(): void {
  const entry = buildEntry();
  const problems = checkEntry(entry);
  if (problems.length > 0) {
    for (const problem of problems) console.error(`gate failed: ${problem}`);
    process.exit(1);
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), entry, "utf8");
  console.log(
    `wrote entry.txt (${countCodePoints(entry)} characters, ${Buffer.byteLength(entry, "utf8")} bytes)`,
  );
}

main();
