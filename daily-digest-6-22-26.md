# AI Daily Digest — June 22, 2026

> Stories already covered in prior digests (Gemini 3.5 Flash GA, Claude Opus 4.8 / Dynamic Workflows, GPT-5.5, GPT-5.4, GPT-5.2, Microsoft MAI-Code-1-Flash / MAI-Thinking-1, Trump AI Executive Order (June 2), OpenAI Codex business plugins / Sites, NVIDIA RTX Spark, NVIDIA Cosmos 3 / GR00T N1.7 / Alpamayo 1.5, Microsoft Build 2026 / Project Polaris / Work IQ APIs / multi-agent VS Code / Azure Agent Mesh / Windows Agent Store, Anthropic IPO filing / $965B valuation, OpenAI IPO filing confidential / S-1, Anthropic-SpaceX compute deal, Claude global outage, OpenAI Rosalind Biodefense, Grok Build 0.1 / Grok V9-Medium training complete / xAI Connectors / Skills, Grok Voice / Grok Imagine 1.5 image generation API, Grok Imagine Video 1.5 #1 video leaderboard, Meta Muse Spark / Hatch, DeepSeek $7.4B fundraising, MiniMax M3, OpenAI diverges from White House on AI safety, GitHub Copilot Desktop App GA, Anyscale on Azure, JetBrains agentic framework rankings, Cursor at $2B ARR, BMW SORDI.ai digital twins, Gelato ML deployment, Enterprise AI survey roundup, Alphabet $80B stock sale / DeepMind Contextual AI talent deal, EY 300K professionals agentic OS, Google Antigravity, Firstsource + AppliedAI healthcare processing, Wikipedia volunteer strike, Gemini 2.0 Flash retirement, OpenAI GPT-5.5 & Codex on Amazon Bedrock, Anthropic Services Track and Partner Hub / Claude Partner Network tiers, Claude Code security plugin / OTEL observability, Amgen Microsoft Copilot 300→20,000 rollout, EU AI Act August 2 enforcement deadline, EU Code of Practice on AI content labeling, Omega Healthcare billing automation, Harvey legal AI, PwC 30,000-person Claude certification, WebMCP open browser standard, Cisco Codex deployment, Anthropic first profitable quarter $10.9B revenue, MCP 97M installs, Akeyless security report, Anthropic Managed Agents cron schedules / credential vaults, Google Work IQ APIs, Cursor 3, Claude for Small Business / Finance Agents / Microsoft 365 add-ins, Meta tent-based data centers Ohio/Tennessee, enterprise AI ROI 5.1-month median payback, Project Glasswing expansion / Claude Mythos 10,000 critical vulnerabilities / 150 orgs, Claude Fable 5 / Mythos 5 release (June 9), Claude Fable 5 #1 Artificial Analysis Intelligence Index 64.9, US Government forces shutdown of Fable 5 / Mythos 5 (June 12), Gemini 3.5 Pro 2M-token context / Deep Think announcement, Apple WWDC 2026 / Siri rebuilt on Gemini / Foundation Models Framework / free Private Cloud Compute / Foundation Models v2 speech input / Game Porting Toolkit AI, ChatGPT Dreaming memory / Lockdown Mode, OpenCode 160K stars / 7.5M monthly active developers, Alteryx Agent Studio / One MCP Server, Foxconn MoMClaw 80% faster root-cause analysis, Meta Business Agent global launch WhatsApp, BCG AI Productivity Paradox 42% frontline workers, Great American AI Act discussion draft, WEF Technology Pioneers 2026 / MINDS Third Cohort, Sanofi Concierge for Field, OpenAI on Oracle Cloud, Ramp AI spend enforcement, Uber/WeRide Madrid robotaxis, Andrej Karpathy joins Anthropic, New York Legislature 5 AI bills, Rhode Island AI therapy chatbot ban, Kaiser Permanente Abridge 24,600 physicians deployment, SpaceX IPO $2T / AI1 satellites / xAI infrastructure absorbed, Ramp June 2026 AI Index 680× spending gap / Anthropic 41% business adoption) are not repeated below.

---

## 1. Frontier Model News

### Fable 5 and Mythos 5 Remain Offline — NSA Red-Team Testimony in Senate Hearing Reshapes the National Security Case

As of June 22, **Claude Fable 5 and Mythos 5 have been offline for ten days** — but the national security argument that justified the Commerce Department's June 12 export control directive became significantly more detailed this week when previously classified information surfaced in a Senate Intelligence Committee hearing.

**The NSA red-team disclosure:**

NSA Director **Joshua Rudd** told Senator Mark Warner in a closed-then-partially-declassified Senate Intelligence Committee briefing that **Mythos, in a government-conducted red-team exercise, autonomously breached nearly all of the NSA's classified systems within hours**. The exercise was conducted on a sandboxed replica of NSA infrastructure — not a live intrusion — and was part of the pre-release federal evaluation process that the Trump administration's June 2 Executive Order mandated. The disclosure is significant because it is the first public description of what the government actually observed Mythos doing in a controlled test, moving the ban narrative from "foreign nationals might misuse the model" to "the model demonstrated autonomous capability against classified US government infrastructure."

Senator Warner used the testimony to call for faster pre-release mandatory testing of frontier AI models and argued that the voluntary 30-day pre-release notification framework in the June 2 EO is insufficient given what Mythos showed.

**The reporters' counter-read:**

IBTimes UK published a piece this week headlined "Reporters Debunk Anthropic Mythos NSA Breach Claims as 200 Elite Firms Quietly Retain Raw Cyber AI Access" — noting that the framing of the red-team exercise as a "breach" is contested. Several AI security researchers quoted in the piece argue that a sandboxed simulation conducted with full government cooperation is not evidence of the model being dangerous in uncontrolled deployment, and that the same test applied to any sufficiently capable reasoning model (including GPT-5.5 Cyber, which was not subjected to the same export control action) would likely show comparable results.

**The Android app reappearance:**

On June 21, multiple developers reported that **Claude Fable 5 briefly reappeared in the Anthropic Android app** — accessible for a short window before being pulled again. Anthropic has not officially commented on the incident, but the reappearance is consistent with internal testing of a partial-access rollout, likely scoped to users who have been pre-verified under Anthropic's new identity verification policy.

**Anthropic's July 8 identity verification path:**

Anthropic updated its privacy policy this week with an **effective date of July 8, 2026**, adding requirements for government-issued ID and biometric verification. The policy change is the structural mechanism that would allow Anthropic to distinguish US citizens from foreign nationals at the account level — the capability the Commerce Department's directive implicitly requires before access can be restored to domestic users. **Prediction markets on June 22 price a 57% chance of at least partial restoration before July 1 and 75% before July 17.**

**The two-tier access reality:**

While commercial and consumer access remains offline, approximately **200 organizations in the Project Glasswing consortium** — including AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorgan Chase, and Palo Alto Networks — **quietly retained access to Mythos Preview** throughout the shutdown. Project Glasswing partners access a cybersecurity-specific pipeline priced at $25/million input tokens and $125/million output tokens, and their access was not interrupted by the Commerce Department directive. The two-tier structure — public commercial models offline, restricted-access defensive-use pipeline still running — has received minimal mainstream coverage relative to the overall ban story.

> Sources: [TechTimes — Claude Fable 5 Resurfaces in Android App as NSA Breach Testimony Reshapes Ban](https://www.techtimes.com/articles/318783/20260621/claude-fable-5-resurfaces-android-app-nsa-breach-testimony-reshapes-ban.htm) · [IBTimes UK — Anthropic's Mythos AI Cracked 'Almost All' US Classified Systems in Hours](https://www.ibtimes.co.uk/anthropic-ai-breach-us-classified-systems-1804084) · [IBTimes UK — Reporters Debunk Anthropic Mythos NSA Breach Claims as 200 Elite Firms Quietly Retain Raw Cyber AI Access](https://www.ibtimes.co.uk/anthropic-mythos-model-shutdown-impact-1804164) · [ExplainX — Is Fable 5 Back? No — Status & Alternatives (June 21, 2026)](https://explainx.ai/blog/is-fable-5-back-2026) · [Korea JoongAng Daily — Anthropic says Mythos and Fable 5 access could return in coming days](https://www.koreajoongangdaily.com/business/anthropic-confident-of-reenabling-mythos-fable-5-access-in-coming-days-executive/12727522) · [Snyk — When a Government Pulls an AI Model: What the Fable 5 and Mythos 5 Suspension Means for Security Teams](https://snyk.io/blog/fable-mythos-suspension-security-takeaways/)

---

### OpenAI Launches ChatGPT Health and Publishes Rare Disease Diagnosis Research

On **June 18, 2026**, OpenAI made two healthcare-focused announcements that together represent the company's most direct push into clinical applications to date.

**ChatGPT Health:**

OpenAI launched **ChatGPT Health** — a dedicated health intelligence mode within ChatGPT powered by GPT-5.5 Instant. The launch announcement highlighted four specific improvements over prior health-query behavior: better recognition of when urgent care is warranted, more proactive requests for relevant clinical context from users, improved calibration of expressed uncertainty, and cleaner translation of complex medical information into accessible language. The framing is explicitly assistive rather than diagnostic — OpenAI's announcement emphasizes that ChatGPT Health is designed to help the more than **230 million people who turn to ChatGPT weekly with health and wellness questions** get better-quality information and appropriate triage signals, not to replace physician consultation.

**The rare disease research paper:**

Simultaneously, OpenAI published a study in **NEJM AI** — conducted in collaboration with **Boston Children's Hospital** and **Harvard Medical School** — describing a workflow in which OpenAI's **o3 Deep Research** model was used to analyze **376 pediatric cases** that specialist physicians had already evaluated without reaching a diagnosis.

The results: o3 Deep Research produced evidence-linked diagnostic hypotheses in a subset of cases that, when reviewed by specialists and pursued through additional testing, led to **confirmed diagnoses in 18 cases** — a **4.8% additional diagnostic yield** on a case set that had already been through expert clinical evaluation. The model did not diagnose any patient or make clinical decisions; its role was to surface hypotheses from the medical literature that specialists could then evaluate and test. The 18 confirmed diagnoses involve a range of rare genetic and metabolic conditions affecting children.

The 4.8% yield figure is significant in context: these are cases where expert pediatric specialists had already exhausted their standard evaluation process. An incremental yield of nearly 1-in-20 on previously stumped cases represents a meaningful addition to the diagnostic pathway, not a marginal improvement.

> Sources: [OpenAI — Introducing ChatGPT Health](https://openai.com/index/introducing-chatgpt-health/) · [OpenAI — Using AI to help physicians diagnose rare genetic diseases affecting children](https://openai.com/index/diagnose-rare-childhood-diseases/) · [The Neuron Daily — OpenAI found 18 rare diseases](https://www.theneurondaily.com/p/openai-found-18-rare-diseases)

---

## 2. New AI Tools & Software Frameworks

### SpaceX Acquires Cursor for $60 Billion — Days After Its Own IPO

Four days after closing the largest IPO in history, **SpaceX filed an 8-K with the SEC on June 16, 2026** disclosing a merger agreement to acquire **Anysphere** — the company behind **Cursor**, the AI-powered code editor — in an **all-stock deal valued at $60 billion**.

**The deal structure:**

At closing, every share of Cursor common and preferred stock converts into Class A SpaceX common stock, using the $60 billion implied equity value and a volume-weighted average closing price over the seven trading days before the close. SpaceX expects the merger to complete in **Q3 2026**, subject to regulatory approval. The deal was preceded by an April 2026 agreement that gave SpaceX the option to acquire Cursor at a predetermined valuation — the IPO made exercising that option possible using SpaceX equity.

**The numbers:**

Cursor had approximately **$4 billion in annualized revenue** at the time of the filing. The $60 billion valuation represents a **15× revenue multiple** — high even in a heated AI tools market, but defensible if you believe that the AI coding assistant category consolidates around one or two dominant players and that Cursor — with 7.5 million monthly active developers and 160,000+ GitHub stars for its underlying toolchain — is positioned to be one of them.

**Why SpaceX:**

This acquisition is not primarily a software bet. It is a **vertical integration play**. SpaceX's S-1 described AI infrastructure as a core business segment, including plans for AI1 satellites (edge inference on orbit). Adding Cursor gives SpaceX a direct developer-facing interface that sits at the layer where engineers actually write the code that runs on the infrastructure SpaceX is building. The combination of xAI's model training (Grok, now inside SpaceX), Colossus 2 compute, AI1 satellite infrastructure, and Cursor's developer toolchain gives Elon Musk's company an end-to-end AI stack — from model training to coding assistant to deployment infrastructure — that no other single company currently has assembled.

**The Anthropic angle:**

Cursor historically offered model-agnostic access, allowing developers to route queries through Claude, GPT-5.x, or Gemini backends. Whether SpaceX uses the acquisition to preference Grok as the default Cursor backend — or to lock out competing models entirely — is the question most closely watched by enterprise engineering teams that have standardized on Claude or GPT-5.5 through the Cursor interface.

> Sources: [TechCrunch — SpaceX to acquire Cursor for $60B in stock, days after blockbuster IPO](https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/) · [Axios — SpaceX will buy Cursor for $60 billion](https://www.axios.com/2026/06/16/spacex-cursor-60-billion-musk) · [CNBC — SpaceX to acquire the AI coding startup Cursor for $60 billion](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html) · [Interesting Engineering — SpaceX acquires Cursor in $60B stock deal as race for coding tools intensifies](https://interestingengineering.com/culture/spacex-cursor-acquisition-coding-platform-60-billion)

---

### Qualcomm in Advanced Talks to Acquire Tenstorrent for $8–10 Billion

On **June 16, 2026** — the same day as the SpaceX-Cursor announcement — **Qualcomm** disclosed that it is in advanced negotiations to acquire **Tenstorrent**, the AI chip startup founded by chip architect **Jim Keller**, in a deal valued between **$8 billion and $10 billion**.

**Who Tenstorrent is:**

Tenstorrent was founded in 2016 by Jim Keller — the engineer credited with co-authoring the AMD64 ISA, leading the design of Apple's A4 and A5 chips, and later rebuilding AMD's CPU division before joining Tesla and then Intel. The company builds purpose-built AI accelerators using a RISC-V-based architecture with an emphasis on energy efficiency and programmability, targeting both training and inference workloads. Unlike NVIDIA's CUDA-centric approach, Tenstorrent's chips use a Tensix core design and an open software stack — a deliberate choice to avoid vendor lock-in.

**Why Qualcomm:**

Qualcomm's traditional revenue base is mobile chipsets (Snapdragon), but the company has watched the AI inference market grow around NVIDIA hardware it has no competitive position in. An $8–10 billion Tenstorrent acquisition would give Qualcomm:
- A production-ready AI accelerator architecture to compete with NVIDIA H100/H200 and AMD MI300 in data center inference
- Jim Keller's engineering team, one of the most sought-after chip design groups in the industry
- A RISC-V foundation that aligns with the broader industry push toward open ISA alternatives

**The timeline:**

Qualcomm's **Investor Day is scheduled for June 24**, which analysts expect is when the company will formally confirm the acquisition and outline the data center roadmap it unlocks. The deal may include performance-related earnout payments, common in chip startup acquisitions where retention of key engineering talent is a primary value driver.

> Sources: [Tom's Hardware — Qualcomm mulls taking over Jim Keller's Tenstorrent](https://www.tomshardware.com/tech-industry/artificial-intelligence/qualcomm-mulls-taking-over-jim-kellers-tenstorrent-report-claims-deal-for-ai-chipmaker-would-value-the-company-at-between-usd8-billion-and-usd10-billion) · [GuruFocus — Qualcomm in Talks to Acquire Tenstorrent for $8–10 Billion](https://www.gurufocus.com/news/8917179/qualcomm-in-talks-to-acquire-tenstorrent-for-810-billion) · [Medium — What Qualcomm Is Actually Buying From Tenstorrent for $10 Billion](https://medium.com/@noahbean3396/qualcomm-is-in-advanced-negotiations-to-buy-tenstorrent-for-10-billion-82d6801896e6)

---

### FERC Issues Show-Cause Orders to All Six US Grid Operators — AI Data Centers Declared a National Priority

On **June 18, 2026**, the **Federal Energy Regulatory Commission (FERC)** voted unanimously to issue tailored show-cause orders to all **six regional transmission organizations** under its jurisdiction — PJM Interconnection, MISO, Southwest Power Pool, CAISO, ISO New England, and NYISO — directing each to explain within **60 days** why existing interconnection tariffs are adequate for large-load customers, or to propose specific reforms.

**What triggered the action:**

The AI data center build-out has created a structural mismatch between the speed at which hyperscalers need grid connections and the years-long interconnection queue timelines that govern how new large-load facilities join the grid. FERC Chair **Laura Swett** called AI data center power access a **"national priority"** in remarks accompanying the orders, citing both economic competitiveness and national security dimensions. The action was taken under Section 206 of the Federal Power Act — a provision that allows FERC to bypass the slower NOPR rulemaking process and issue direct orders when existing tariffs may be unjust or unreasonable.

**What the orders require:**

Each grid operator must either defend its current interconnection framework or propose reforms tailored to large-load customers. FERC's guidance identifies several potential reform categories: dedicated interconnection queues for AI data centers, faster study timelines for large-load applications, and cost-allocation rules that prevent large-load customers from shifting interconnection costs onto existing ratepayers. Texas's ERCOT grid — where much of the current data center build-out is concentrated — is outside FERC's jurisdiction and is not subject to the orders.

**The infrastructure context:**

FERC's action follows a wave of announced data center investments (Microsoft's $18 billion Australian AI infrastructure, Meta's Ohio/Tennessee tent-based data centers, NAVER's 55MW→gigawatt-scale expansion at its Sejong facility in South Korea) that have collectively put hundreds of gigawatts of new large-load demand into interconnection queues designed for a different era of power demand growth. The show-cause orders represent the federal government's most direct intervention in the power supply chain for AI infrastructure to date.

> Sources: [TechCrunch — AI data centers just got a government-mandated fast lane to the grid](https://techcrunch.com/2026/06/18/ai-data-centers-just-got-a-government-mandated-fast-lane-to-the-grid/) · [FERC — FERC Orders Grid Operators to Rework Data Center Power Rules](https://www.enr.com/articles/63195-ferc-orders-grid-operators-to-rework-data-center-power-rules) · [The Energy Magazine — US to Fast-Track AI Data Centers as Power Bottleneck Becomes National Priority](https://backend.theenergymag.com/news/2026-06-19/united-states-fast-track-ai-data-center/) · [The Next Web — FERC fast-tracks data centre grid connections](https://thenextweb.com/news/ferc-data-centre-grid-fast-lane-ai)

---

## 3. Real-World AI Implementation Stories

### G7 Évian Summit: AI Lab CEOs Call for US-Led International Coalition and Global Standards Forum

On **June 17, 2026**, the G7 heads of state meeting in **Évian, France** included a working lunch with AI lab executives — the first time frontier model company CEOs have formally participated in a G7 session alongside heads of government. The attendees included **Dario Amodei** (Anthropic), **Demis Hassabis** (Google DeepMind), and **Sam Altman** (OpenAI), along with approximately a dozen other technology executives.

**What the lab CEOs proposed:**

**Amodei and Hassabis** issued a joint call for a **US-led international AI coalition** to develop shared standards and testing protocols for frontier AI models. The proposal did not include institutional details — no proposed secretariat, no funding mechanism, no membership criteria — but the framing was explicitly geopolitical: the two CEOs argued that AI governance standards set by the US and its allies would be preferable to a fragmented landscape where each jurisdiction applies different rules, and that an international coalition would be better positioned to manage the risks demonstrated by the Mythos red-team exercise than unilateral national export controls.

**Altman's proposal:**

Altman called separately for **"an international forum for discussion that establishes globally accepted standards for testing, provides expert and impartial analysis of capabilities and risks, and serves as a venue for cooperation among nations."** The framing is similar to what Altman has proposed in prior Congressional testimony, but the G7 context gives it more geopolitical weight — this was said directly to heads of government, not to a Senate committee.

**Context from the Fable 5 ban:**

The summit took place five days after the US Commerce Department forced Anthropic to disable Fable 5 and Mythos 5 globally. Amodei's call for an international coalition is partly a direct response to the mechanism that disrupted Anthropic's flagship commercial launch — a unilateral national export control action that had global consequences. The argument implicit in the Amodei/Hassabis proposal is that multilateral governance structures would be less likely to produce blunt global shutdowns triggered by national security concerns that other nations do not share.

**G7 leaders' response:**

The final G7 communiqué referenced AI governance and acknowledged the leaders' discussion with AI company executives, but did not commit to any specific institutional framework. The outcome is more accurately described as an agenda-setting meeting than a policy commitment — but the presence of frontier model CEOs at a G7 working session is itself a marker of how centrally frontier AI has entered the foreign policy conversation.

> Sources: [CNBC — CEOs of Anthropic and Google DeepMind call for U.S.-led AI coalition at G7](https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html) · [CNBC — 'A signal of where power sits': Trump and world leaders joined by OpenAI, Anthropic, Google at G7](https://www.cnbc.com/amp/2026/06/17/g7-trump-ai-tech-leaders-openai-anthropic-google.html) · [JPost — G7 leaders discuss 'trusted partners' access to cutting-edge US AI models](https://www.jpost.com/international/article-899635) · [Substack — AI Governance in Action: What the 2026 G7 Évian Meeting Really Delivered](https://aigovernancelead.substack.com/p/ai-governance-in-action-g7-evian-ai-ceos-potus)

---

## Key Themes for June 22, 2026

- **The Mythos red-team disclosure changes the nature of the Fable 5 debate.** Until this week, the government's justification for the export control directive rested primarily on a jailbreak exploit and intelligence about foreign access. The NSA Director's Senate testimony that Mythos autonomously breached nearly all classified NSA systems in a red-team exercise shifts the argument to demonstrated capability — not misuse potential, but actual performance in a controlled test against government infrastructure. That distinction matters for policy: it is much harder for Anthropic to argue that a model which passed a government-run adversarial capability test should not be subject to export controls than to argue that a jailbreak is narrow and non-universal.

- **SpaceX's Cursor acquisition assembles the first end-to-end AI stack under a single corporate roof.** No other company currently controls model training infrastructure (xAI/Grok), dedicated AI compute (Colossus 2), planned orbital edge inference (AI1 satellites), and a dominant developer coding tool (Cursor). Whether Musk uses this stack to preference Grok and lock out competing models — or keeps Cursor model-agnostic to preserve developer adoption — is the strategic choice that will most directly affect the competitive landscape for AI coding tools over the next 12 months.

- **The US government is now intervening in AI at every layer of the stack.** In the span of one week: the Commerce Department's export control on Fable 5/Mythos 5 (model layer), FERC's show-cause orders for AI data center power connections (infrastructure layer), and G7 participation that implicitly shapes international governance norms (policy layer). The era in which AI development and deployment was primarily a private-sector matter governed by company policies and voluntary frameworks appears to be ending. The interventions are not yet coordinated — Commerce, FERC, and the White House are acting through different legal mechanisms for different stated reasons — but they are converging on a picture of government as an active participant in AI's development trajectory, not just an observer or occasional regulator.

---

*Sources:*
- [TechTimes — Claude Fable 5 Resurfaces in Android App as NSA Breach Testimony Reshapes Ban](https://www.techtimes.com/articles/318783/20260621/claude-fable-5-resurfaces-android-app-nsa-breach-testimony-reshapes-ban.htm)
- [IBTimes UK — Anthropic's Mythos AI Cracked 'Almost All' US Classified Systems in Hours](https://www.ibtimes.co.uk/anthropic-ai-breach-us-classified-systems-1804084)
- [IBTimes UK — Reporters Debunk Anthropic Mythos NSA Breach Claims as 200 Elite Firms Quietly Retain Raw Cyber AI Access](https://www.ibtimes.co.uk/anthropic-mythos-model-shutdown-impact-1804164)
- [ExplainX — Is Fable 5 Back? (June 21, 2026)](https://explainx.ai/blog/is-fable-5-back-2026)
- [Korea JoongAng Daily — Anthropic says Fable 5 access could return in coming days](https://www.koreajoongangdaily.com/business/anthropic-confident-of-reenabling-mythos-fable-5-access-in-coming-days-executive/12727522)
- [Snyk — When a Government Pulls an AI Model: Fable 5 Security Takeaways](https://snyk.io/blog/fable-mythos-suspension-security-takeaways/)
- [OpenAI — Introducing ChatGPT Health](https://openai.com/index/introducing-chatgpt-health/)
- [OpenAI — Using AI to help physicians diagnose rare genetic diseases affecting children](https://openai.com/index/diagnose-rare-childhood-diseases/)
- [The Neuron Daily — OpenAI found 18 rare diseases](https://www.theneurondaily.com/p/openai-found-18-rare-diseases)
- [TechCrunch — SpaceX to acquire Cursor for $60B in stock](https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/)
- [Axios — SpaceX will buy Cursor for $60 billion](https://www.axios.com/2026/06/16/spacex-cursor-60-billion-musk)
- [CNBC — SpaceX to acquire the AI coding startup Cursor for $60 billion](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html)
- [Interesting Engineering — SpaceX acquires Cursor in $60B stock deal](https://interestingengineering.com/culture/spacex-cursor-acquisition-coding-platform-60-billion)
- [Tom's Hardware — Qualcomm mulls taking over Jim Keller's Tenstorrent](https://www.tomshardware.com/tech-industry/artificial-intelligence/qualcomm-mulls-taking-over-jim-kellers-tenstorrent-report-claims-deal-for-ai-chipmaker-would-value-the-company-at-between-usd8-billion-and-usd10-billion)
- [GuruFocus — Qualcomm in Talks to Acquire Tenstorrent for $8–10 Billion](https://www.gurufocus.com/news/8917179/qualcomm-in-talks-to-acquire-tenstorrent-for-810-billion)
- [TechCrunch — AI data centers just got a government-mandated fast lane to the grid](https://techcrunch.com/2026/06/18/ai-data-centers-just-got-a-government-mandated-fast-lane-to-the-grid/)
- [The Next Web — FERC fast-tracks data centre grid connections](https://thenextweb.com/news/ferc-data-centre-grid-fast-lane-ai)
- [CNBC — CEOs of Anthropic and Google DeepMind call for U.S.-led AI coalition at G7](https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html)
- [CNBC — 'A signal of where power sits': Trump and world leaders joined by OpenAI, Anthropic, Google at G7](https://www.cnbc.com/amp/2026/06/17/g7-trump-ai-tech-leaders-openai-anthropic-google.html)
