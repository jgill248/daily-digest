/**
 * Shared content model for the daily digest.
 *
 * Imported by the Eleventy config, the README index generator, and the PR
 * validator. Keep it dependency-free (node builtins only) so the scripts can
 * run without an Eleventy build.
 *
 * Rule zero: the canonical date of a digest comes from its FILENAME, never
 * from its H1. The corpus has six different H1 shapes and one file with no
 * date in the heading at all.
 */
import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true, typographer: false });

/** Render a summary bullet's inline markdown (`**bold**`, links) to HTML. */
export const renderBullet = (bullet) => md.renderInline(bullet);

const MON_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MON_LONG = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

const RE_DAY = /(\d{4})-(\d{2})-(\d{2})\.md$/;
const RE_SUMMARY = /(\d{4})-(\d{2})-(\d{2})-summary\.md$/;

/** Digests that predate the summary convention and legitimately have no sibling. */
export const LEGACY_NO_SUMMARY = ["2026-04-15", "2026-04-16"];

const posix = (p) => p.replace(/\\/g, "/");

export const isSummary = (p) => RE_SUMMARY.test(posix(p));

export const isDigest = (p) =>
  posix(p).includes("digests/") && (RE_DAY.test(posix(p)) || RE_SUMMARY.test(posix(p)));

/** ISO date parts from the filename. Returns null for anything unrecognized. */
export function dateFromPath(p) {
  const s = posix(p);
  const m = RE_SUMMARY.exec(s) || RE_DAY.exec(s);
  if (!m) return null;
  return { iso: `${m[1]}-${m[2]}-${m[3]}`, y: m[1], m: m[2], d: m[3] };
}

// Labels are built by indexing a hardcoded array with the filename's month.
// No Date object, no toLocaleString: no timezone can shift a digest by a day.
export const shortLabel = ({ m, d }) => `${MON_SHORT[+m - 1]} ${+d}`;
export const longMonth = ({ y, m }) => `${MON_LONG[+m - 1]} ${y}`;
export const displayDate = ({ y, m, d }) => `${MON_LONG[+m - 1]} ${+d}, ${y}`;

/** The H1 is always line 1 in this corpus. Returns null if line 1 isn't one. */
export function firstH1(src) {
  const line = src.split("\n", 1)[0];
  return /^#\s+/.test(line) ? line.replace(/^#\s+/, "").trim() : null;
}

/**
 * A date range, only when the H1 actually carries one ("June 16-18, 2026").
 * Matches the one real shape in the corpus plus the cross-month variant, and
 * nothing else. Degrades to null rather than guessing.
 */
export function dateRange(h1) {
  const m = /([A-Z][a-z]+ \d{1,2}\s*[–—-]\s*(?:[A-Z][a-z]+ )?\d{1,2},?\s*\d{4})/
    .exec(h1 || "");
  return m ? m[1].replace(/\s*[–—-]\s*/, "–") : null;
}

/** Drop the source H1 and the `---` rule that usually follows it. */
export function stripLeadingH1(src) {
  const lines = src.split("\n");
  if (!/^#\s+/.test(lines[0])) return src;
  lines.shift();
  while (lines.length && lines[0].trim() === "") lines.shift();
  if (lines.length && /^-{3,}\s*$/.test(lines[0])) {
    lines.shift();
    while (lines.length && lines[0].trim() === "") lines.shift();
  }
  return lines.join("\n");
}

/** Pairing is mechanical: the summary path is derived from the digest path. */
export const summaryPathFor = (digestPath) => digestPath.replace(/\.md$/, "-summary.md");

export const bulletsOf = (src) =>
  src.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim());

/** Null when the day has no summary file (2026-04-15, 2026-04-16). */
export function readSiblingSummary(digestPath) {
  const p = summaryPathFor(digestPath);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, "utf8");
  return { path: p, raw, h1: firstH1(raw), bullets: bulletsOf(raw) };
}

export const HOOK_MAX = 120;

/**
 * The README index hook: the bolded lead clause of the summary's first bullet.
 *
 * Validated against all 90 existing index lines - 86 of the 88 summary-backed
 * entries reproduce byte-for-byte. The two that don't are slips in the
 * hand-written README, not rule failures.
 *
 * Days with no summary fall back to the digest's first `### ` heading, which
 * is what the two April 2026 entries already use.
 */
export function hookFrom({ summaryRaw, digestRaw }) {
  let hook = null;

  if (summaryRaw) {
    const first = summaryRaw.split("\n").find((l) => l.startsWith("- "));
    const bold = first && /^- \*\*(.+?)\*\*/.exec(first);
    if (bold) hook = bold[1];
  }
  if (!hook && digestRaw) {
    const h3 = digestRaw.split("\n").find((l) => l.startsWith("### "));
    if (h3) hook = h3.slice(4);
  }
  if (!hook) return null;

  hook = hook.trim().replace(/[:,.]+$/, "").trim();
  if (hook.length > HOOK_MAX) {
    // Cut at HOOK_MAX, back off to a word boundary, then strip punctuation the
    // cut left dangling ("...Model 2," would otherwise become "...Model 2,...").
    hook = hook.slice(0, HOOK_MAX).replace(/\s+\S*$/, "").replace(/[,.:;]+$/, "") + "…";
  }
  return hook;
}

/**
 * Every digest day on disk, newest first.
 * ISO strings are zero-padded, so a plain string sort is correct.
 */
export function allDays(root = ".") {
  const base = path.join(root, "digests");
  const out = [];
  if (!fs.existsSync(base)) return out;

  for (const y of fs.readdirSync(base).sort()) {
    const yDir = path.join(base, y);
    if (!fs.statSync(yDir).isDirectory()) continue;

    for (const m of fs.readdirSync(yDir).sort()) {
      const mDir = path.join(yDir, m);
      if (!fs.statSync(mDir).isDirectory()) continue;

      for (const f of fs.readdirSync(mDir).sort()) {
        if (!RE_DAY.test(f) || RE_SUMMARY.test(f)) continue;
        const digestPath = path.join(mDir, f);
        const date = dateFromPath(digestPath);
        const summary = readSiblingSummary(digestPath);
        out.push({
          ...date,
          digestPath,
          summaryPath: summary ? summary.path : null,
          hasSummary: Boolean(summary),
          summaryRaw: summary ? summary.raw : null,
          digestRaw: fs.readFileSync(digestPath, "utf8"),
        });
      }
    }
  }
  return out.sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));
}
