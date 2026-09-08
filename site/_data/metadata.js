// The site's public URL lives here and in `pathPrefix` (site/eleventy.config.js)
// - nowhere else. This is a GitHub Pages *project* site, so the URL carries a
// `/daily-digest/` path segment and `pathPrefix` must mirror it exactly.
const base = process.env.SITE_BASE_URL || "https://jgill248.github.io/daily-digest/";

export default {
  title: "Daily AI Digest",
  subtitle:
    "The most important AI news each weekday - frontier model releases, new tools, and real-world implementation - with sourcing for every claim.",
  base,
  // What the feeds are built against, and deliberately NOT `base`: Eleventy
  // applies `pathPrefix` itself when it resolves a URL to an absolute one, so
  // feeding it the full `base` produces /daily-digest/daily-digest/.
  origin: new URL(base).origin + "/",
  author: { name: "John Gilliland" },
  language: "en",
};
