#!/usr/bin/env node
/**
 * Regenerate the `## Index` block in README.md from the files on disk.
 *
 *   --check   exit 1 and print a diff if README.md is stale (no writes)
 *   --write   rewrite the block in place
 *
 * Only the text between the BEGIN/END markers is touched; the surrounding
 * prose is left alone.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { allDays, shortLabel, longMonth, hookFrom } from "../lib/digest.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const README = path.join(ROOT, "README.md");
const BEGIN = "<!-- BEGIN INDEX -->";
const END = "<!-- END INDEX -->";

export function renderIndex(root = ROOT) {
  const days = allDays(root);
  const blocks = [];
  let currentMonth = null;
  let lines = [];

  const flush = () => {
    if (currentMonth) blocks.push(`### ${currentMonth}\n\n${lines.join("\n")}`);
  };

  for (const day of days) {
    const month = longMonth(day);
    if (month !== currentMonth) {
      flush();
      currentMonth = month;
      lines = [];
    }

    const hook = hookFrom({ summaryRaw: day.summaryRaw, digestRaw: day.digestRaw });
    const digestLink = `digests/${day.y}/${day.m}/${day.iso}.md`;
    const label = `- **[${shortLabel(day)}](${digestLink})**`;

    // Days with no summary file omit the `· [summary]` segment entirely -
    // the shape the two April 2026 entries already use.
    lines.push(day.hasSummary
      ? `${label} · [summary](digests/${day.y}/${day.m}/${day.iso}-summary.md) — ${hook}`
      : `${label} — ${hook}`);
  }
  flush();

  return blocks.join("\n\n");
}

function splice(readme, block) {
  const start = readme.indexOf(BEGIN);
  const end = readme.indexOf(END);
  if (start === -1 || end === -1) {
    throw new Error(`README.md is missing the ${BEGIN} / ${END} markers.`);
  }
  return readme.slice(0, start + BEGIN.length) + "\n" + block + "\n" + readme.slice(end);
}

const mode = process.argv.includes("--write") ? "write"
  : process.argv.includes("--check") ? "check"
  : null;

if (!mode) {
  console.error("usage: build-readme-index.mjs (--check | --write)");
  process.exit(2);
}

const current = fs.readFileSync(README, "utf8");
const updated = splice(current, renderIndex());

if (mode === "write") {
  if (current === updated) {
    console.log("README index already up to date.");
  } else {
    fs.writeFileSync(README, updated);
    console.log("README index regenerated.");
  }
  process.exit(0);
}

if (current === updated) {
  console.log("README index is up to date.");
  process.exit(0);
}

// Minimal line diff - enough to see what moved without pulling in a dep.
const a = current.split("\n");
const b = updated.split("\n");
console.error("README index is stale. Run `npm run index` in site/.\n");
for (let i = 0; i < Math.max(a.length, b.length); i++) {
  if (a[i] !== b[i]) {
    if (a[i] !== undefined) console.error(`- ${a[i]}`);
    if (b[i] !== undefined) console.error(`+ ${b[i]}`);
  }
}
process.exit(1);
