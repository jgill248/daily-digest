#!/usr/bin/env node
/**
 * Gate for digest pull requests.
 *
 *   node validate-digest.mjs [--base <ref>]
 *
 * Two tiers of rules, and the split matters:
 *
 *   Repo-wide rules hold for every file that has ever been committed. They
 *   cover layout, naming and pairing - things that were always true.
 *
 *   Structural rules apply only to files ADDED by this PR. Digest structure
 *   tightened over time: 43 historical digests predate the Confidence note,
 *   7 predate Key Themes, and 62 of 90 have at least one story with no
 *   Sources trailer. Holding a touched historical file to today's contract is
 *   the same mistake as a repo-wide rule, just deferred - and it fires the
 *   first time anyone fixes a typo in an old digest.
 *
 *   This does not weaken the daily gate: the diff is computed against
 *   origin/main, so both files of a new digest are always "added" no matter
 *   how many commits the PR carries.
 *
 *   Hygiene rules apply to added OR modified files - they are cheap and hold
 *   for any file anyone touches.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  LEGACY_NO_SUMMARY, allDays, dateFromPath, hookFrom,
  isSummary, bulletsOf, summaryPathFor,
} from "../lib/digest.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
process.chdir(ROOT);

const problems = [];
const fail = (file, message) => problems.push({ file, message });

const RE_DIGEST_PATH = /^digests\/(\d{4})\/(\d{2})\/\1-\2-\d{2}(-summary)?\.md$/;
const RETIRED_NAMING = /(^|\/)daily-digest-\d+-\d+-\d+\.md$/;

const argOf = (flag) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : null;
};

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

const allTracked = () => git("ls-files").split("\n").filter(Boolean);

/** Files changed relative to the base ref; null means "not a PR". */
function changedFiles(base, diffFilter) {
  if (!base) return null;
  try {
    const out = git("diff", "--name-only", `--diff-filter=${diffFilter}`, `${base}...HEAD`);
    return out ? out.split("\n").filter(Boolean) : [];
  } catch {
    console.warn(`! could not diff against ${base}; skipping PR-scoped rules`);
    return null;
  }
}

// --------------------------------------------------------------------------
// Repo-wide
// --------------------------------------------------------------------------
function checkRepoWide() {
  const tracked = allTracked();

  // 1. No digest written to the repo root.
  for (const f of tracked) {
    if (!f.includes("/") && f.endsWith(".md") && !["README.md", "CLAUDE.md"].includes(f)) {
      fail(f, "markdown at the repo root - digests belong in digests/YYYY/MM/");
    }
  }

  // 2. The retired flat naming has not come back.
  for (const f of tracked) {
    if (RETIRED_NAMING.test(f)) fail(f, "retired flat `daily-digest-M-D-YY.md` naming");
  }

  // 3. ISO naming, zero padding, and the file sitting in the folder its own
  //    date implies (this is what catches 2026-09-01.md filed under 08/).
  for (const f of tracked) {
    if (!f.startsWith("digests/") || !f.endsWith(".md")) continue;
    if (!RE_DIGEST_PATH.test(f)) {
      fail(f, "does not match digests/YYYY/MM/YYYY-MM-DD[-summary].md");
    }
  }

  // 4. Pairing.
  const days = allDays(".");
  for (const day of days) {
    if (!day.hasSummary && !LEGACY_NO_SUMMARY.includes(day.iso)) {
      fail(day.digestPath, "full digest has no -summary.md sibling");
    }
  }
  const digestPaths = new Set(days.map((d) => d.digestPath.replace(/\\/g, "/")));
  for (const f of tracked) {
    if (!f.startsWith("digests/") || !isSummary(f)) continue;
    if (!digestPaths.has(f.replace(/-summary\.md$/, ".md"))) {
      fail(f, "summary has no matching full digest");
    }
  }

  // 5/6. Exactly one H1, on line 1; nothing that gray-matter would eat as
  //      front matter.
  for (const f of tracked) {
    if (!f.startsWith("digests/") || !f.endsWith(".md")) continue;
    const lines = fs.readFileSync(f, "utf8").split("\n");
    if (!/^#\s+\S/.test(lines[0])) fail(f, "line 1 is not an H1");
    const h1s = lines.filter((l) => /^#\s+\S/.test(l)).length;
    if (h1s !== 1) fail(f, `expected exactly 1 H1, found ${h1s}`);
    if (lines[0].trim() === "---") fail(f, "starts with `---` - would parse as front matter");
  }
}

// --------------------------------------------------------------------------
// PR-scoped
// --------------------------------------------------------------------------
function checkChanged(added, touched) {
  const digests = added.filter((f) => RE_DIGEST_PATH.test(f) && !isSummary(f));
  const summaries = added.filter((f) => RE_DIGEST_PATH.test(f) && isSummary(f));

  // Hygiene: any digest file this PR touches, new or not. Stray closing tags
  // are an LLM artifact that has reached main before.
  for (const f of touched.filter((f) => RE_DIGEST_PATH.test(f))) {
    for (const line of fs.readFileSync(f, "utf8").split("\n")) {
      if (/^<\/[a-z]+>$/.test(line.trim())) fail(f, `stray closing tag: ${line.trim()}`);
    }
  }

  // 7. A new day brings both files.
  for (const f of digests) {
    if (!fs.existsSync(summaryPathFor(f))) fail(f, "new digest has no summary file");
  }
  for (const f of summaries) {
    const digest = f.replace(/-summary\.md$/, ".md");
    if (!fs.existsSync(digest)) fail(f, "new summary has no full digest");
  }

  for (const f of digests) {
    const src = fs.readFileSync(f, "utf8");

    // 8. Required structure.
    if (!/^## 1\./m.test(src)) fail(f, "missing a `## 1. ...` first numbered section");
    if (!/^## Key Themes\s*$/m.test(src)) fail(f, "missing the `## Key Themes` section");
    if (!/\*Confidence note:/.test(src)) fail(f, "missing the closing `*Confidence note: ...*`");

    // 10. Every story cites its sources.
    const blocks = src.split(/^### /m).slice(1);
    for (const block of blocks) {
      const headline = block.split("\n", 1)[0].trim();
      if (!/\*\(Sources:/.test(block)) {
        fail(f, `story "${headline}" has no *(Sources: ...)* trailer`);
      }
    }

    // 11. The README hook must be derivable.
    const summaryPath = summaryPathFor(f);
    const summaryRaw = fs.existsSync(summaryPath)
      ? fs.readFileSync(summaryPath, "utf8") : null;
    if (!hookFrom({ summaryRaw, digestRaw: src })) {
      fail(f, "could not derive a README index hook");
    }
  }

  for (const f of summaries) {
    const src = fs.readFileSync(f, "utf8");

    // 9. Bullet shape.
    const bullets = bulletsOf(src);
    if (bullets.length < 3 || bullets.length > 5) {
      fail(f, `expected 3-5 bullets, found ${bullets.length}`);
    }
    const first = src.split("\n").find((l) => l.startsWith("- "));
    if (!first || !/^- \*\*(.+?)\*\*/.test(first)) {
      fail(f, "first bullet must open with a **bolded lead clause** - it becomes the README hook");
    }
  }

  return digests.length + summaries.length;
}


// --------------------------------------------------------------------------

checkRepoWide();

const base = argOf("--base");
const added = changedFiles(base, "A");
const touched = changedFiles(base, "AM");
if (added === null || touched === null) {
  console.log("· no --base given; ran repo-wide rules only");
} else {
  const scoped = checkChanged(added, touched);
  const newDigests = added.filter((f) => RE_DIGEST_PATH.test(f)).length;
  console.log(`· ${newDigests} new digest file(s) held to the full structure rules`);
  console.log(`· ${touched.filter((f) => RE_DIGEST_PATH.test(f)).length} touched digest file(s) checked for hygiene`);
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ${p.file}\n    ${p.message}`);
  console.error("");
  process.exit(1);
}

console.log(`✓ ${allDays(".").length} digest days validated.`);
