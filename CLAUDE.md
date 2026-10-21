# CLAUDE.md

This repo holds one daily AI news digest per weekday. Your job is to add each day's two files
in the right place — that's it. Everything downstream is automated: a PR that passes
`validate-digest` merges itself, the site rebuilds, the README index regenerates, and the Atom
feed goes out to email subscribers.

The digests themselves stay plain markdown with no front matter. The build that publishes them
lives entirely under `site/` and you never need to touch it.

## Where files go

```text
digests/YYYY/MM/YYYY-MM-DD.md          # full digest
digests/YYYY/MM/YYYY-MM-DD-summary.md  # short summary
```

- ISO dates only, zero-padded: `2026-08-05.md`, never `8-5-26.md` or `2026-8-5.md`.
- Create the month folder if today's is the first digest of a new month.
- **Never write a digest to the repo root.** The old flat `daily-digest-M-D-YY.md` naming is
  retired; do not reintroduce it.

## Every new digest: two steps

1. Write `digests/YYYY/MM/YYYY-MM-DD.md`.
2. Write `digests/YYYY/MM/YYYY-MM-DD-summary.md`.

**Do not edit the README index.** It is regenerated from the files on disk after every merge,
and hand edits are overwritten. The hook it shows for each day is the bolded lead clause of
your summary's first bullet — so the way to control it is to write that clause well, not to
edit README.md.

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

Structure, enforced by `validate-digest` — a PR that fails any of these will not merge:

- A `## 1. …` first numbered section.
- A `## Key Themes` section: a few bolded-lead paragraphs connecting the day's stories.
- A closing `*Confidence note: …*` italic paragraph.
- Every `###` story ends with a parenthetical `*(Sources: …, <date>)*` list naming the outlets.

Judgement, which no check can make for you — and which is the whole point of the digest:

- Distinguish original reporting from corroboration ("per Bloomberg's original reporting,
  corroborated by …").
- Flag what is unconfirmed, modeled, or company-reported rather than independently verified.
- The Confidence note states sourcing and verification limits for each major claim.

## Research depth

A digest is only as good as the research behind it. A run that does a handful of searches and
writes from snippets produces a thin digest, even if it passes `validate-digest`.

- Run at least 15 targeted searches across the three sections. Search by company, product and
  outlet (lab blogs and changelogs, Hugging Face, GitHub releases, arXiv, Reuters, Bloomberg,
  The Verge, TechCrunch), not only generic "AI news" queries.
- Open the article for every story you run. Never write from search snippets.
- When a search returns roundups or SEO pages, rephrase and try again.
- Target 6–9 stories, at least two per section, of 120–250 words each.
- Never write a placeholder story ("No new launch surfaced"). If a section is genuinely thin
  after real searching, widen it to policy, funding, research papers, chips and infrastructure,
  or notable open-source releases, and note the gap in the Confidence note instead.
- The no-repeats rule below means finding *other* stories, not running fewer.

## Summary file format

```markdown
# Daily AI Digest — August 13, 2026 (Summary)

- **<Bolded lead clause>** — rest of the sentence with the key numbers.
```

Three to five bullets (recent digests consistently run five), each one or two sentences and each
opening with a bolded lead — both enforced by `validate-digest`. The first bullet must carry the
day's biggest story, because its bolded lead becomes the README index hook and the feed summary.

## The site build

These files are published as a searchable web archive and an Atom feed, built by
`.github/workflows/pages.yml`. Three rules follow from that:

- **Never add YAML front matter.** The site derives everything it needs — the date, the display
  title, the sibling summary, the date range — from the filename and the first heading. A `---`
  on line 1 would be parsed as front matter and break the build.
- **The date comes from the filename, never the heading.** Get `YYYY-MM-DD.md` right and
  everything downstream is right.
- **The first bullet of the summary is load-bearing in three places** — the README index hook,
  the day page's "short version" block, and the summary feed. Keep its bolded lead a complete,
  self-contained claim under ~120 characters; anything longer is truncated with an ellipsis.

The H1 you write is **not** what the site displays — it renders a normalized
`Daily AI Digest — <Month D, YYYY>` and strips yours. Write it anyway for anyone reading the
raw markdown. For a multi-day digest, write the range as `June 16–18, 2026` (en dash): the site
recognizes that shape and shows it as a subtitle.

To reproduce a CI failure locally:

```bash
cd site && npm ci && npm run validate && npm run build
```

## Don't repeat yesterday's news

A story that already ran in an earlier digest does not run again. Include it only if there is a
genuine update — new numbers, a deal closing, a reversal — and when you do, lead with what
changed rather than restating the original story.

Check the [README.md](README.md) index before writing: it carries a one-line hook for every day,
so scanning it is much faster than opening digests. It is generated, so it is always current on
`main`. Then read the last few days' `-summary.md`
files in the current month folder for anything the hooks don't surface.

## Notes

- A digest covering multiple days (a weekend or holiday catch-up) is filed under its last date,
  with the range in the H1 — see `digests/2026/06/2026-06-18.md` ("June 16–18, 2026").
- Digests don't link to each other. Keep it that way; the README is the only index.
