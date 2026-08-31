// The site's public URL lives here and in the CNAME file - nowhere else.
// Swap `base` for the real custom domain before going live.
export default {
  title: "Daily AI Digest",
  subtitle:
    "The most important AI news each weekday - frontier model releases, new tools, and real-world implementation - with sourcing for every claim.",
  base: process.env.SITE_BASE_URL || "https://daily-ai-digest.example.com/",
  author: { name: "John Gilliland" },
  language: "en",
};
