# AI Daily Digest — June 12, 2026

> Stories already covered in prior digests (Gemini 3.5 Flash GA, Claude Opus 4.8 / Dynamic Workflows, GPT-5.5, GPT-5.4, GPT-5.2, Microsoft MAI-Code-1-Flash / MAI-Thinking-1, Trump AI Executive Order, OpenAI Codex business plugins / Sites, NVIDIA RTX Spark, NVIDIA Cosmos 3 / GR00T N1.7 / Alpamayo 1.5, Microsoft Build 2026 / Project Polaris / Work IQ APIs / multi-agent VS Code / Azure Agent Mesh / Windows Agent Store, Anthropic IPO filing / $965B valuation, OpenAI IPO filing confidential / S-1, Anthropic-SpaceX compute deal, Claude global outage, OpenAI Rosalind Biodefense, Grok Build 0.1 / Grok V9-Medium training complete / xAI Connectors / Skills, Grok Voice / Grok Imagine 1.5 image generation API, Meta Muse Spark / Hatch, DeepSeek $7.4B fundraising, MiniMax M3, OpenAI diverges from White House on AI safety, GitHub Copilot Desktop App GA, Anyscale on Azure, JetBrains agentic framework rankings, Cursor at $2B ARR, BMW SORDI.ai digital twins, Gelato ML deployment, Enterprise AI survey roundup, Alphabet $80B stock sale / DeepMind Contextual AI talent deal, EY 300K professionals agentic OS, Google Antigravity, Firstsource + AppliedAI healthcare processing, Wikipedia volunteer strike, Gemini 2.0 Flash retirement, OpenAI GPT-5.5 & Codex on Amazon Bedrock, Anthropic Services Track and Partner Hub / Claude Partner Network tiers, Claude Code security plugin / OTEL observability, Amgen Microsoft Copilot 300→20,000 rollout, EU AI Act August 2 enforcement deadline, EU Code of Practice on AI content labeling, Omega Healthcare billing automation, Harvey legal AI, PwC 30,000-person Claude certification, WebMCP open browser standard, Cisco Codex deployment, Anthropic first profitable quarter $10.9B revenue, MCP 97M installs, Akeyless security report, Anthropic Managed Agents cron schedules / credential vaults, Google Work IQ APIs, Cursor 3, Claude for Small Business / Finance Agents / Microsoft 365 add-ins, Meta tent-based data centers Ohio/Tennessee, enterprise AI ROI 5.1-month median payback, Project Glasswing expansion / Claude Mythos 10,000 critical vulnerabilities / 150 orgs, Claude Fable 5 / Mythos 5 release, Claude Fable 5 #1 Artificial Analysis Intelligence Index 64.9, Gemini 3.5 Pro 2M-token context / Deep Think announcement, Apple WWDC 2026 / Siri rebuilt on Gemini / Foundation Models Framework / free Private Cloud Compute, ChatGPT Dreaming memory / Lockdown Mode, OpenCode 160K stars / 7.5M monthly active developers, Alteryx Agent Studio / One MCP Server, Foxconn MoMClaw 80% faster root-cause analysis, Meta Business Agent global launch WhatsApp, BCG AI Productivity Paradox 42% frontline workers, Great American AI Act discussion draft, WEF Technology Pioneers 2026 / MINDS Third Cohort, Sanofi Concierge for Field, OpenAI on Oracle Cloud, Ramp AI spend enforcement, Uber/WeRide Madrid robotaxis, Andrej Karpathy joins Anthropic) are not repeated below.

---

## 1. Frontier Model News

### xAI Ships Grok Imagine Video 1.5 — #1 on AI Video Leaderboard, Native Audio, API-Accessible

On **June 3, 2026**, xAI made **Grok Imagine Video 1.5 Preview** available via API — a full video generation model distinct from the still-image Grok Imagine 1.5 product covered in this digest on June 11. Within days of its API launch, the model debuted at **#1 on the Artificial Analysis Video Arena Image-to-Video leaderboard** with an Elo rating of **1,404**, surpassing Runway Gen-4.5, Kling 2.5 Turbo, and Google Veo 3.1. On **June 11**, Elon Musk demonstrated the capability publicly on X with an AI-generated full-length trailer for Homer's *Iliad*, showcasing cinematic composition and synchronized narration audio.

**What Grok Imagine Video 1.5 does:**

The model's most differentiating capability is **native synchronized audio** — audio is generated in the same inference pass as video tokens, rather than as a separate post-processing step. This produces audio that is compositionally consistent with the scene rather than overlaid afterward. Competing models (including Runway Gen-4.5 and Veo 3.1) handle audio as a separate generation step, producing occasional sync artifacts at scene transitions.

**Technical specifications:**
- **Input**: Single image (image-to-video; text-to-video not yet supported in preview)
- **Output**: H.264 MP4, 24fps, seven aspect ratios, 480p or 720p resolution
- **Clip length**: Up to **15 seconds** — a 50% increase over Grok Imagine Video 1.0's 10-second limit
- **API pricing**: $0.01 image input + $0.08/sec (480p) or $0.14/sec (720p) — a 5-second 720p clip costs approximately $0.70
- **Rate limit**: 60 requests per minute
- **Access**: api.x.ai using the same xAI API key as Grok text models; model alias `grok-imagine-video-1.5-2026-05-30`
- Consumer rollout across X Premium tiers is ongoing, not yet complete

**From zero to #1 in under a year:**

xAI had no video generation product twelve months ago. The progression — from no video capability to leading the Artificial Analysis Video Arena leaderboard — is among the fastest category entries by any frontier lab. Musk's live demonstration of an AI-generated *Iliad* trailer on June 11 functions as a product launch event, driving developer awareness among X's technical user base in a way a traditional press release would not.

**What the #1 ranking does not mean:**

The Artificial Analysis Video Arena uses human preference voting, which favors visual quality and coherence in single-scene prompts. Long-form narrative consistency, complex scene transitions, and nuanced character motion — the hard problems in cinematic video generation — are not well-represented in current leaderboard evaluations. The ranking is a valid signal for developer-facing creative production tasks (brand content, concept visualization, marketing material) but does not necessarily generalize to all video generation applications.

**Why this matters for AI video competition:**

The video generation market in mid-2026 has been dominated by Runway, Kling (Kuaishou), and Google Veo across different task types. A frontier AI lab entering — and immediately topping — the Image-to-Video leaderboard compresses competitive timelines. OpenAI Sora has not yet posted competitive AA leaderboard results. Midjourney Video and Stability Video Diffusion remain specialized tools. The Grok Imagine video launch signals that the video generation market is consolidating toward the same frontier labs competing in text and image — and that xAI's unified API strategy (text, image, and video under a single key) is an intentional distribution advantage.

> Sources: [Basenor — Grok Imagine Video 1.5: 7 Things Developers Need to Know](https://www.basenor.com/blogs/news/grok-imagine-video-1-5-7-things-developers-need-to-know) · [Gigazine — Grok Imagine 1.5 Preview Achieves Top Rankings in Video Generation Benchmark](https://gigazine.net/gsc_news/en/20260609-grok-imagine-1-5-preview-artificial-analysis-video-arena/) · [xAI Docs — Grok Imagine Video 1.5 Preview](https://docs.x.ai/developers/models/grok-imagine-video-1.5-preview) · [Artificial Analysis — Image-to-Video Leaderboard](https://artificialanalysis.ai/video/leaderboard/image-to-video) · [Latent Space — SpaceXai Grok Imagine API: #1 Video Model, Best Pricing and Latency](https://www.latent.space/p/ainews-spacexai-grok-imagine-api)

---

### Gemini 3.5 Pro — GA Window Enters Its Final Stretch

**Google Gemini 3.5 Pro** — announced at Google I/O on May 19, 2026 — is now twelve days into its "next month" delivery window with no GA announcement. Based on current signals, here is the complete picture of what is known and what is still pending.

**What was confirmed at I/O (May 19):**
- **2-million-token context window** working natively across text, image, audio, and video — the largest announced context window of any frontier model
- **"Deep Think" reasoning mode** — a dedicated extended reasoning budget for hard problems, closing the gap where Gemini 3.5 Flash regressed relative to Gemini 3.1 Pro
- Full replacement of the former Gemini Ultra tier — 3.5 Pro is Google's unambiguous flagship positioning
- Available via Gemini API and Vertex AI; Gemini app users will get access following API GA

**Current status:**
- Still in limited Vertex AI preview as of June 12
- Prediction markets are pricing approximately 40% probability of GA before June 30 — not yet a sure thing
- No public benchmark scores available until GA; Google has only shared that internal evals show competitive performance with Claude Fable 5 and GPT-5.5

**Expected pricing:**
- Approximately $15 per million input tokens and $60 per million output tokens — roughly 10× Gemini 3.5 Flash ($1.50/$9.00)
- This places 3.5 Pro at the premium tier alongside Claude Fable 5 ($10/$50) and GPT-5.5 ($5/$30), though Fable 5 and GPT-5.5 remain cheaper per token at launch

**Why the wait matters:**

Gemini 3.5 Pro's delay is commercially meaningful. Claude Fable 5 launched June 9 to immediate enterprise availability across GitHub Copilot, Amazon Bedrock, and Databricks — giving it a first-mover advantage in enterprise procurement conversations that 3.5 Pro cannot participate in until it reaches GA. Every enterprise evaluation cycle that completes before 3.5 Pro launches is a potential Fable 5 win that Google cannot compete for. The "audible groans" Sundar Pichai's "give us until next month" line drew from the Google I/O audience reflect a developer community that understood this dynamic in real time.

> Sources: [TechTimes — Google Gemini 3.5 Pro Nears June Launch With 2 Million Token Context And Deep Think Reasoning](https://www.techtimes.com/articles/317919/20260606/google-gemini-35-pro-nears-june-launch-2-million-token-context-deep-think-reasoning.htm) · [Codersera — Gemini 3.5 Pro: The June 2026 Launch Guide](https://codersera.com/blog/gemini-3-5-pro-launch-guide-2026/) · [WaveSpeed Blog — Gemini 3.5 Pro Is Coming Next Month](https://wavespeed.ai/blog/posts/gemini-3-5-pro-coming-next-month/)

---

## 2. New AI Tools & Software Frameworks

### New York Legislature Passes Five AI Bills — From Chatbot Safety to Data Centers, All Heading to Governor Hochul

The New York state legislature wrapped up its 2026 session on the evening of **June 5, 2026**, passing **five separate AI-related bills** that together constitute the most aggressive single-session state AI legislative package in the country. All five bills are now on Governor Kathy Hochul's desk awaiting signature.

**The five bills:**

**1. NY FAIR News Act (S.8451-B / A.8962-B)**

The most significant of the five from a media industry perspective. The bill mandates that news organizations operating in New York include **clear disclaimers on any published content substantially or wholly generated by artificial intelligence**, with specific requirements:
- All AI-generated stories, articles, audio, visuals, or images must be reviewed by a human employee with editorial control before publication
- News organizations must fully disclose to journalists and media professionals how and when AI is used in the workplace
- Passed with bipartisan support in both chambers; the Writers Guild of America East championed the bill

**2. Kids Chatbot Safety Bill**

Sponsored by Sen. Kristen Gonzalez and Assemblymember Alex Bores, this bill **prohibits AI companies from offering companion chatbots to minors**. The vote: **137-0** in the Assembly and **60-0** in the Senate — unanimous in both chambers. This is among the most lopsided AI votes in any US legislature and effectively forecloses the AI companion market for under-18 users in New York regardless of how Governor Hochul acts on the other four bills.

**3. Responsible Data Center Development Act**

Imposes a **one-year moratorium on new permits** for data center computing facilities requiring 20 megawatts or more. The pause is framed as giving regulators time to assess the environmental and infrastructure impact of the AI build-out. Critics argue this will delay AI infrastructure investment in New York at exactly the moment when data center capacity is the primary bottleneck for AI deployment. Supporters argue the moratorium creates space for the state to develop permanent siting rules rather than approving projects without a consistent framework.

**4. One Fair Price Act**

Prohibits retailers and businesses from using consumers' personal data to generate **customized prices based on individual characteristics** — the practice commonly called surveillance pricing or dynamic personalization pricing. This is a broader consumer protection bill that captures AI-driven price discrimination without naming AI explicitly.

**5. AI Training Data Transparency Act**

Requires developers to disclose what data was used to train AI models, with specific focus on whether copyrighted content was included. The bill is aligned with broader national debates about whether AI training on copyrighted works without license constitutes infringement.

**Context — how this compares to the Great American AI Act debate:**

The federal Great American AI Act discussion draft (covered June 11) includes a provision to preempt state laws targeting AI *development* for three years. If that bill passes with the preemption clause intact, at least some of these New York bills — particularly the Training Data Transparency Act — could be preempted before they take effect. Governor Hochul signed the RAISE Act (frontier model safety frameworks) in December 2025; her approach to these five bills will signal whether she sees state-level AI regulation as complementary to federal action or contingent upon it.

**Rhode Island joins the trend:**

Separately, Rhode Island passed a **ban on AI therapy chatbots** this week — a narrower bill targeting AI-powered mental health applications specifically, rather than AI companion chatbots broadly. This is the first state-level ban in the US specifically targeting therapeutic AI applications.

> Sources: [NY Senate Press Release — New York Legislature Passes Landmark Bill to Disclose AI-Generated News](https://www.nysenate.gov/newsroom/press-releases/2026/patricia-fahy/new-york-legislature-passes-landmark-bill-disclose-ai) · [Transparency Coalition — New York Lawmakers Wrap Up by Passing Kids Chatbot Safety Bill and Two AI Transparency Acts](https://www.transparencycoalition.ai/news/new-york-lawmakers-pass-kids-ai-chatbot-safety-bill-and-two-transparency-acts) · [WGA East — New York Legislature Passes Landmark Bill to Disclose AI-Generated News](https://www.wgaeast.org/new-york-legislature-passes-landmark-bill-to-disclose-ai-generated-news-to-the-public/) · [The Wrap — New York Passes Legislation Requiring AI Disclosures in News Content](https://www.thewrap.com/industry-news/public-policy-legal/new-york-fair-news-act-ai-disclosure/) · [News10 — New York Passes Data Center Moratorium and Consumer Protections](https://www.news10.com/capitol/data-center-pricing-bills-2026-legislature/)

---

### WWDC 2026 Closes — Apple Foundation Models v2 Confirmed, Game Porting Toolkit Gains AI Coding Skills

Apple's **WWDC 2026** wraps up today after five days of developer labs, sessions, and workshops (June 8–12). The keynote announcements (covered in this digest on June 10) — Siri rebuilt on Gemini, free Private Cloud Compute for small developers, and the Foundation Models framework expansion — generated the headlines. The week's developer sessions have added several specifics worth noting for developers building on Apple's AI platform.

**Foundation Models v2 — speech input confirmed:**

The second major version of the Apple Foundation Models framework adds **speech input** alongside text and image, making the on-device model fully multimodal for input. Developers building on iOS 27 and macOS 27 can now route voice, text, and image inputs through a single framework call — without a separate speech-to-text transcription step or routing to a third-party service. The model handles understanding across all three modalities natively on-device, with server-side fallback through Private Cloud Compute for workloads exceeding device capacity.

**Game Porting Toolkit — AI coding skills integrated:**

Apple updated the **Game Porting Toolkit** during the conference with **AI coding agent skills** — tools designed to help developers migrate games from other platforms to Apple platforms more efficiently. New Metal command line tools accompany the update. This is a narrower but commercially relevant addition: game porting is one of the most friction-intensive development workflows on Apple platforms, and AI-assisted migration is a direct response to developer feedback about the tooling gap.

**Developer lab reception:**

Session attendance data and developer social media signal that the free Private Cloud Compute access (for apps under 2 million downloads) is the breakout feature — more discussed than Siri and the Foundation Models v2 specifics combined. For independent developers, the removal of cloud inference cost as a barrier to shipping AI-powered features is a structural change to the economics of App Store development. The open-source commitment for Foundation Models (expected "later this summer") has also generated significant discussion in the developer community, with early questions about whether the open-source release will include model weights or only the framework/SDK.

> Sources: [MacRumors — Apple Outlines Major AI and Developer Tool Updates at WWDC 2026](https://www.macrumors.com/2026/06/09/apple-outlines-major-ai-and-developer-tool-updates/) · [Analytics Insight — WWDC 2026 Recap: Apple Doubles Down on AI Across iPhone, Mac, and More](https://www.analyticsinsight.net/tech-news/wwdc-2026-recap-apple-doubles-down-on-ai-across-iphone-mac-and-more) · [Apple Developer — WWDC26 Schedule](https://developer.apple.com/wwdc26/schedule/)

---

## 3. Real-World AI Implementation Stories

### Kaiser Permanente + Abridge — The Largest Generative AI Deployment in US Healthcare

**Kaiser Permanente** has completed the rollout of **Abridge's ambient documentation AI** across its entire hospital system — **40 hospitals, 600+ medical offices, 8 states and Washington D.C.** — deploying to **24,600 physicians** and completing what healthcare industry analysts are describing as the largest generative AI implementation in US healthcare history.

**How the system works:**

Abridge's platform uses **ambient listening** technology. With patient consent, the system captures the natural conversation during a clinical visit — no scripted phrasing, no specific documentation workflow required of the physician. Post-visit, the AI:
1. Transcribes the full encounter
2. Drafts structured clinical notes in the appropriate EHR format
3. Presents the draft to the physician for review and edit before it enters the medical record

The physician never types notes during the visit and spends a fraction of the prior time on post-visit documentation. Patients interact with a physician giving full eye contact and attention rather than one typing into a screen.

**Measured outcomes from Northern California year-one results:**

| Metric | Result |
|---|---|
| AI-assisted clinical visits | **2.5 million+** |
| Documentation hours saved (Northern CA Permanente alone) | **~16,000 hours** |
| Physician adoption | Majority of enrolled physicians used the tool for more than half of their patient visits within 90 days |

**The NVIDIA dimension:**

NVIDIA has recently partnered with Abridge to train future clinical AI models on **real doctor visit data** — the same encounter recordings the ambient documentation system generates. This creates a training data feedback loop: Abridge's deployed system generates real-world clinical language data; NVIDIA uses that data to improve the models; improved models make the documentation system more accurate. For healthcare AI, where training data quality is the primary constraint on model performance, this pipeline is a meaningful structural advantage.

**Scale and context:**

Kaiser Permanente is one of the largest integrated health systems in the United States: approximately 12.7 million health plan members, 39 medical centers, 622 medical offices. The 24,600-physician deployment is not a pilot program — it is a system-wide operational change. At the rate of visits across that physician base, Abridge's AI is now a participant in millions of clinical encounters per year.

**Why the documentation burden matters:**

Physician burnout driven by administrative documentation load — particularly EHR note-taking — is among the most-cited quality-of-care issues in US healthcare. Studies consistently show physicians spend more time on documentation than on direct patient care. The 2.5 million AI-assisted visits and 16,000 saved hours represent a reversal of that ratio at scale — and they do so without requiring a change in how clinical encounters are conducted. The AI inserts into the existing workflow rather than replacing it.

**Why this matters beyond Kaiser:**

Every major health system in the US faces the same documentation problem that Kaiser just solved at scale. Abridge has raised $212.5 million, including a $150 million Series C in early 2026. With the Kaiser deployment as proof of scale and NVIDIA as an infrastructure partner, the company is positioned to expand to other health systems with a production-validated implementation model.

> Sources: [Fierce Healthcare — Kaiser Permanente Rolls Out Abridge's Gen AI Clinical Tech Across 40-Hospital System](https://www.fiercehealthcare.com/health-tech/kaiser-permanente-rolls-out-abridges-gen-ai-clinical-tech-across-40-hospitals-60) · [Healthcare Dive — Kaiser Permanente Rolls Out Abridge's AI Documentation Tool](https://www.healthcaredive.com/news/kaiser-permanente-abridge-ai-clinical-documentation-rollout/724311/) · [Becker's Hospital Review — Kaiser Launches Largest Generative AI Project in Healthcare](https://www.beckershospitalreview.com/innovation/kaiser-permanente-expands-ai-scribes-across-40-hospitals-8-states.html) · [Kaiser Permanente — Kaiser Permanente Improves Member Experience With AI-Enabled Clinical Technology](https://about.kaiserpermanente.org/news/press-release-archive/kaiser-permanente-improves-member-experience-with-ai-enabled-clinical-technology) · [PYMNTS — Nvidia Taps Abridge to Train AI on Real Doctor Visits](https://www.pymnts.com/news/artificial-intelligence/2026/nvidia-taps-abridge-to-train-ai-on-real-doctor-visits/)

---

## Key Themes for June 12, 2026

- **xAI's video pivot redraws the AI product map.** Grok Imagine Video 1.5 debuting at #1 on the Artificial Analysis video leaderboard — above Runway, Kling, and Veo — demonstrates that the video generation category is no longer dominated by media-native companies. The same frontier labs competing on text and image reasoning are now competing on video, and xAI's unified API (text, image, and video on a single key) is a distribution architecture designed to capture developers before category-specific providers can consolidate. The absence of OpenAI Sora from the leaderboard top positions is the quietly significant data point here.

- **State-level AI regulation is not waiting for Congress.** New York passed five AI bills in its final session day, covering children, journalism, data centers, pricing, and training data simultaneously. Rhode Island separately banned AI therapy chatbots. Both states acted before the Great American AI Act resolves the preemption debate. The pattern — states moving on child safety and consumer protection while federal legislation negotiates broader frameworks — mirrors how GDPR influenced US state privacy law. Even if the federal preemption clause passes, the political pressure these state actions demonstrate will shape the final bill.

- **The healthcare AI proof point is complete.** Kaiser Permanente's 24,600-physician, 40-hospital deployment of Abridge is not an experiment — it is a production system processing millions of encounters per year with documented outcomes. For every other major health system evaluating AI documentation tools, this is now the reference implementation. The 16,000 hours saved at one regional division is a number that CFOs can convert directly to cost-per-encounter calculations; the combination of operational scale and measurable outcome data removes the category from "early adopter" and places it squarely in "standard of care" territory.

---

*Sources:*
- [Basenor — Grok Imagine Video 1.5: 7 Things Developers Need to Know](https://www.basenor.com/blogs/news/grok-imagine-video-1-5-7-things-developers-need-to-know)
- [Gigazine — Grok Imagine 1.5 Preview Achieves Top Rankings in Video Generation Benchmark](https://gigazine.net/gsc_news/en/20260609-grok-imagine-1-5-preview-artificial-analysis-video-arena/)
- [xAI Docs — Grok Imagine Video 1.5 Preview](https://docs.x.ai/developers/models/grok-imagine-video-1.5-preview)
- [Artificial Analysis — Image-to-Video Leaderboard](https://artificialanalysis.ai/video/leaderboard/image-to-video)
- [Latent Space — Grok Imagine API: #1 Video Model](https://www.latent.space/p/ainews-spacexai-grok-imagine-api)
- [TechTimes — Google Gemini 3.5 Pro Nears June Launch](https://www.techtimes.com/articles/317919/20260606/google-gemini-35-pro-nears-june-launch-2-million-token-context-deep-think-reasoning.htm)
- [Codersera — Gemini 3.5 Pro Launch Guide 2026](https://codersera.com/blog/gemini-3-5-pro-launch-guide-2026/)
- [WaveSpeed Blog — Gemini 3.5 Pro Is Coming Next Month](https://wavespeed.ai/blog/posts/gemini-3-5-pro-coming-next-month/)
- [NY Senate — New York Legislature Passes Landmark Bill to Disclose AI-Generated News](https://www.nysenate.gov/newsroom/press-releases/2026/patricia-fahy/new-york-legislature-passes-landmark-bill-disclose-ai)
- [Transparency Coalition — NY Lawmakers Pass Kids Chatbot Safety Bill and Two AI Transparency Acts](https://www.transparencycoalition.ai/news/new-york-lawmakers-pass-kids-ai-chatbot-safety-bill-and-two-transparency-acts)
- [WGA East — New York Legislature Passes Landmark Bill on AI-Generated News](https://www.wgaeast.org/new-york-legislature-passes-landmark-bill-to-disclose-ai-generated-news-to-the-public/)
- [The Wrap — New York Passes Legislation Requiring AI Disclosures in News Content](https://www.thewrap.com/industry-news/public-policy-legal/new-york-fair-news-act-ai-disclosure/)
- [News10 — New York Passes Data Center Moratorium and Consumer Protections](https://www.news10.com/capitol/data-center-pricing-bills-2026-legislature/)
- [MacRumors — Apple Outlines Major AI and Developer Tool Updates at WWDC 2026](https://www.macrumors.com/2026/06/09/apple-outlines-major-ai-and-developer-tool-updates/)
- [Analytics Insight — WWDC 2026 Recap](https://www.analyticsinsight.net/tech-news/wwdc-2026-recap-apple-doubles-down-on-ai-across-iphone-mac-and-more)
- [Fierce Healthcare — Kaiser Permanente Rolls Out Abridge Across 40-Hospital System](https://www.fiercehealthcare.com/health-tech/kaiser-permanente-rolls-out-abridges-gen-ai-clinical-tech-across-40-hospitals-60)
- [Healthcare Dive — Kaiser Permanente Rolls Out Abridge's AI Documentation Tool](https://www.healthcaredive.com/news/kaiser-permanente-abridge-ai-clinical-documentation-rollout/724311/)
- [Becker's Hospital Review — Kaiser Launches Largest Generative AI Project in Healthcare](https://www.beckershospitalreview.com/innovation/kaiser-permanente-expands-ai-scribes-across-40-hospitals-8-states.html)
- [Kaiser Permanente — AI-Enabled Clinical Technology Press Release](https://about.kaiserpermanente.org/news/press-release-archive/kaiser-permanente-improves-member-experience-with-ai-enabled-clinical-technology)
- [PYMNTS — Nvidia Taps Abridge to Train AI on Real Doctor Visits](https://www.pymnts.com/news/artificial-intelligence/2026/nvidia-taps-abridge-to-train-ai-on-real-doctor-visits/)
