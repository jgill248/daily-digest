import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { RenderPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import metadata from "./_data/metadata.js";
import {
  isDigest, isSummary, dateFromPath, longMonth,
  stripLeadingH1, readSiblingSummary,
} from "./lib/digest.mjs";

/** Every full digest, oldest first (getAllSorted's order). */
const dayItems = (api) =>
  api.getAllSorted().filter(
    (item) => isDigest(item.page.inputPath) && !isSummary(item.page.inputPath),
  );

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(RenderPlugin);

  // Must be added HERE, before the feed plugin, and the ordering is load-bearing
  // under a non-root pathPrefix. HtmlBasePlugin is what rewrites root-relative
  // URLs (`/assets/style.css`) to include the prefix, so every page link depends
  // on it running exactly once.
  //
  // The feed plugin adds it internally twice (once itself, once via the RSS
  // plugin it wraps). Eleventy marks the plugin `unique`, but that check reads a
  // list only config-time additions are recorded in - a plugin added *during*
  // plugin execution is run immediately and never recorded - so neither inner
  // add is deduped against the other, and every URL came out as
  // /daily-digest/daily-digest/. Adding it at config time registers it in that
  // list first, so both inner adds are correctly skipped.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // --- keep repo-root files out of the build --------------------------------
  // dir.input is the repo root (see the `config` export), so anything at the
  // root is a candidate input by default.
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add(".github/**");
  eleventyConfig.ignores.add("site/lib/**");
  eleventyConfig.ignores.add("site/scripts/**");
  eleventyConfig.ignores.add("site/README.md");

  // The real guard: any markdown that isn't a digest is not a template. This
  // is what makes a future stray file at the repo root inert rather than a
  // surprise page.
  eleventyConfig.addPreprocessor("digests-only", "md", (data) => {
    if (!isDigest(data.page.inputPath)) return false;
  });

  // Summaries are data, not pages - they're folded into the day page below.
  eleventyConfig.addPreprocessor("drop-summaries", "md", (data) => {
    if (isSummary(data.page.inputPath)) return false;
  });

  // Normalize the day's content: drop the source H1 (six inconsistent shapes
  // across the corpus) and fold the summary in as a TL;DR.
  //
  // This happens in the CONTENT, not the layout, and that is load-bearing: the
  // RSS plugin emits `post.content` with the layout excluded, so a
  // layout-based TL;DR would silently ship every email without it.
  eleventyConfig.addPreprocessor("day-content", "md", (data, content) => {
    const summary = readSiblingSummary(data.page.inputPath);
    const body = stripLeadingH1(content);
    if (!summary) return body;
    return [
      '<div class="tldr">',
      "",
      "## The short version",
      "",
      stripLeadingH1(summary.raw).trim(),
      "",
      "</div>",
      "",
      body,
    ].join("\n");
  });

  // --- collections ----------------------------------------------------------
  eleventyConfig.addCollection("days", dayItems);

  const groupBy = (api, keyOf, build) => {
    const map = new Map();
    for (const item of dayItems(api)) {
      const d = dateFromPath(item.page.inputPath);
      const key = keyOf(d);
      if (!map.has(key)) map.set(key, build(d));
      map.get(key).days.push(item);
    }
    // dayItems is oldest-first; reverse each group and the group list so
    // everything reads newest-first.
    for (const group of map.values()) group.days.reverse();
    return [...map.values()].reverse();
  };

  eleventyConfig.addCollection("months", (api) =>
    groupBy(api, (d) => `${d.y}-${d.m}`, (d) => ({
      y: d.y, m: d.m, label: longMonth(d), url: `/${d.y}/${d.m}/`, days: [],
    })));

  eleventyConfig.addCollection("years", (api) =>
    groupBy(api, (d) => d.y, (d) => ({ y: d.y, url: `/${d.y}/`, days: [] })));

  // --- feed -----------------------------------------------------------------
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "days", limit: 30 },
    metadata: {
      language: "en",
      title: "Daily AI Digest",
      subtitle:
        "The most important AI news each weekday, with sourcing for every claim.",
      base: metadata.origin,
      author: { name: "John Gilliland" },
    },
  });

  eleventyConfig.addFilter("readableDate", (value) => value);
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addWatchTarget("digests/");
}

export const config = {
  dir: {
    input: ".",
    output: "site/_site",
    includes: "site/_includes",
    data: "site/_data",
  },
  templateFormats: ["md", "njk"],
  // Digests are never run through a template engine. The corpus is clean
  // today, but one digest quoting a Jinja/Liquid snippet would hard-fail the
  // build - and with auto-merge on, that day would silently never ship.
  // Consequence: permalinks must be functions, not template strings.
  markdownTemplateEngine: false,
  htmlTemplateEngine: "njk",
  // GitHub Pages project site: served from /daily-digest/, not the root.
  // Root-relative links in templates stay written as `/archive/` - HtmlBasePlugin
  // rewrites them at build time, and the feeds' `htmlBaseUrl` applies this prefix
  // too. Only non-URL attributes Eleventy can't recognize (see `bundle-path` in
  // base.njk) need the `url` filter by hand. Keep in sync with `base` in
  // site/_data/metadata.js.
  pathPrefix: "/daily-digest/",
};
