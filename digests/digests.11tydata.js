/**
 * Directory data for every digest file.
 *
 * This is the one file the site build adds outside `site/` - Eleventy requires
 * directory data files to sit in the directory they describe. It adds no front
 * matter to any digest and renames nothing.
 */
import fs from "node:fs";
import {
  dateFromPath, displayDate, shortLabel, longMonth,
  dateRange, firstH1, readSiblingSummary, hookFrom, renderBullet,
} from "../site/lib/digest.mjs";

export default {
  layout: "day.njk",

  // MUST be a function: markdownTemplateEngine is false, so a template-string
  // permalink would be emitted literally as a directory named "{{ ... }}".
  permalink(data) {
    const d = dateFromPath(data.page.inputPath);
    return `/${d.y}/${d.m}/${d.d}/`;
  },

  eleventyComputed: {
    day(data) {
      const p = data.page.inputPath;
      const d = dateFromPath(p);
      const raw = fs.readFileSync(p, "utf8");
      const h1 = firstH1(raw);
      const summary = readSiblingSummary(p);

      return {
        iso: d.iso,
        display: displayDate(d),   // "August 31, 2026"
        short: shortLabel(d),      // "Aug 31"
        month: longMonth(d),       // "August 2026"
        monthUrl: `/${d.y}/${d.m}/`,
        yearUrl: `/${d.y}/`,
        sourceH1: h1,              // debugging only; never rendered
        range: dateRange(h1),      // "June 16-18, 2026" or null
        hasSummary: Boolean(summary),
        bullets: summary ? summary.bullets : [],
        // Pre-rendered so templates and the feed never need an async filter.
        bulletsHtml: summary ? summary.bullets.map(renderBullet) : [],
        hook: hookFrom({ summaryRaw: summary?.raw, digestRaw: raw }),
      };
    },

    // Consumed by the Atom feed's virtual template.
    title: (data) => `Daily AI Digest — ${data.day.display}`,
    summary: (data) => data.day.hook || "",
  },
};
