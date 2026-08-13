# CLAUDE.md

This repo holds one daily AI news digest per weekday. It is markdown only — no build, no
dependencies, no tests. The job is to add each day's two files in the right place and keep the
README index current.

## Where files go

```
digests/YYYY/MM/YYYY-MM-DD.md          # full digest
digests/YYYY/MM/YYYY-MM-DD-summary.md  # short summary
```

- ISO dates only, zero-padded: `2026-08-05.md`, never `8-5-26.md` or `2026-8-5.md`.
- Create the month folder if today's is the first digest of a new month.
- **Never write a digest to the repo root.** The old flat `daily-digest-M-D-YY.md` naming is
  retired; do not reintroduce it.

## Every new digest: three steps

1. Write `digests/YYYY/MM/YYYY-MM-DD.md`.
2. Write `digests/YYYY/MM/YYYY-MM-DD-summary.md`.
3. Add one line to the index in [README.md](README.md) — see below. This is not optional; the
   index is maintained by hand as part of writing the digest, so skipping it silently rots it.

## Updating the README index

Add the new day at the **top** of the current month's `###` block, since the index runs
newest-first. If it's the first digest of a month, add a new `### <Month> <Year>` heading
directly under `## Index`, above the previous month.

The line format:

```markdown
- **[Aug 13](digests/2026/08/2026-08-13.md)** · [summary](digests/2026/08/2026-08-13-summary.md) — <hook>
```

The `<hook>` is the bolded lead clause from the summary's first bullet, with any trailing
`:` `,` or `.` removed and truncated to ~120 characters (ending in `…`) if longer. Copy it
verbatim otherwise — don't rewrite it.

## Digest file format

```markdown
# Daily AI Digest — August 13, 2026

---

## 1. Frontier Model News
### <Headline as a full sentence>
<Body paragraph.> *(Sources: Outlet A, Outlet B, August 13)*

## 2. New AI Tools and Software Frameworks
## 3. Real-World AI Implementation
## Key Themes

---

*Confidence note: …*
```

Conventions in the existing digests, worth keeping:

- Every story ends with a parenthetical `*(Sources: …, <date>)*` list naming the outlets.
- Distinguish original reporting from corroboration ("per Bloomberg's original reporting,
  corroborated by …").
- Flag what is unconfirmed, modeled, or company-reported rather than independently verified.
- `## Key Themes` is a few bolded-lead paragraphs connecting the day's stories.
- The closing `*Confidence note: …*` italic paragraph states sourcing and verification limits
  for each major claim.

## Summary file format

```markdown
# Daily AI Digest — August 13, 2026 (Summary)

- **<Bolded lead clause>** — rest of the sentence with the key numbers.
```

Five bullets, each opening with a bolded lead. The first bullet should carry the day's biggest
story, because it becomes the README index hook.

## Notes

- A digest covering multiple days (a weekend or holiday catch-up) is filed under its last date,
  with the range in the H1 — see `digests/2026/06/2026-06-18.md` ("June 16–18, 2026").
- Digests don't link to each other. Keep it that way; the README is the only index.
