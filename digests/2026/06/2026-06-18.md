# AI Daily Digest — June 16–18, 2026

> Stories already covered in prior digests (Gemini 3.5 Flash GA, Claude Opus 4.8 / Dynamic Workflows, GPT-5.5, GPT-5.4, GPT-5.2, Microsoft MAI-Code-1-Flash / MAI-Thinking-1, Trump AI Executive Order, OpenAI Codex business plugins / Sites, NVIDIA RTX Spark, NVIDIA Cosmos 3 / GR00T N1.7 / Alpamayo 1.5, Microsoft Build 2026 / Project Polaris / Work IQ APIs / multi-agent VS Code / Azure Agent Mesh / Windows Agent Store, Anthropic IPO filing / $965B valuation, OpenAI IPO filing confidential / S-1, Anthropic-SpaceX compute deal, Claude global outage, OpenAI Rosalind Biodefense, Grok Build 0.1 / Grok V9-Medium training complete / xAI Connectors / Skills, Grok Voice / Grok Imagine 1.5 image generation API, Grok Imagine Video 1.5 #1 video leaderboard, Meta Muse Spark / Hatch, DeepSeek $7.4B fundraising, MiniMax M3, OpenAI diverges from White House on AI safety, GitHub Copilot Desktop App GA, Anyscale on Azure, JetBrains agentic framework rankings, Cursor at $2B ARR, BMW SORDI.ai digital twins, Gelato ML deployment, Enterprise AI survey roundup, Alphabet $80B stock sale / DeepMind Contextual AI talent deal, EY 300K professionals agentic OS, Google Antigravity, Firstsource + AppliedAI healthcare processing, Wikipedia volunteer strike, Gemini 2.0 Flash retirement, OpenAI GPT-5.5 & Codex on Amazon Bedrock, Anthropic Services Track and Partner Hub / Claude Partner Network tiers, Claude Code security plugin / OTEL observability, Amgen Microsoft Copilot 300→20,000 rollout, EU AI Act August 2 enforcement deadline, EU Code of Practice on AI content labeling, Omega Healthcare billing automation, Harvey legal AI, PwC 30,000-person Claude certification, WebMCP open browser standard, Cisco Codex deployment, Anthropic first profitable quarter $10.9B revenue, MCP 97M installs, Akeyless security report, Anthropic Managed Agents cron schedules / credential vaults, Google Work IQ APIs, Cursor 3, Claude for Small Business / Finance Agents / Microsoft 365 add-ins, Meta tent-based data centers Ohio/Tennessee, enterprise AI ROI 5.1-month median payback, Project Glasswing expansion / Claude Mythos 10,000 critical vulnerabilities / 150 orgs, Claude Fable 5 / Mythos 5 release, Claude Fable 5 #1 Artificial Analysis Intelligence Index 64.9, Gemini 3.5 Pro 2M-token context / Deep Think announcement, Apple WWDC 2026 / Siri rebuilt on Gemini / Foundation Models Framework / free Private Cloud Compute / Foundation Models v2 speech input / Game Porting Toolkit AI, ChatGPT Dreaming memory / Lockdown Mode, OpenCode 160K stars / 7.5M monthly active developers, Alteryx Agent Studio / One MCP Server, Foxconn MoMClaw 80% faster root-cause analysis, Meta Business Agent global launch WhatsApp, BCG AI Productivity Paradox 42% frontline workers, Great American AI Act discussion draft, WEF Technology Pioneers 2026 / MINDS Third Cohort, Sanofi Concierge for Field, OpenAI on Oracle Cloud, Ramp AI spend enforcement, Uber/WeRide Madrid robotaxis, Andrej Karpathy joins Anthropic, New York Legislature 5 AI bills, Rhode Island AI therapy chatbot ban, Kaiser Permanente Abridge 24,600 physicians deployment, US Government export control shutdown of Fable 5 / Mythos 5 / Pliny jailbreak, SpaceX IPO $2T / AI1 satellites / xAI Colossus 2 absorbed, Ramp June 2026 AI Index 680× spending gap / Anthropic 41% enterprise market share) are not repeated below.

---

## 1. Frontier Model News

### Grok V9-Medium Ships: 1.5 Trillion Parameters, Cursor-Trained, Same Day as Acquisition

**xAI** released **Grok V9-Medium** on **June 16, 2026** — the day SpaceX announced its $60 billion acquisition of Cursor (see Section 3). The timing was deliberate: xAI positioned V9-Medium as the first product to emerge from the months-long joint training arrangement between xAI and Cursor's developer workflow datasets.

**What changed from the previous production model:**

The previous Grok production model, v8-small, runs at approximately 500 billion parameters. V9-Medium triples that to **1.5 trillion parameters** — a 3× scale-up. Unlike Grok 5 (which is a 6T MoE architecture still in training on Colossus 2), V9-Medium is a dense model optimized for coding tasks.

**The Cursor training angle:**

V9-Medium was not trained primarily on public GitHub repositories, the standard data source for coding models. Instead, xAI trained it on **real developer workflow sessions from Cursor** — anonymized logs of how developers actually use an AI code editor: their editing patterns, how they respond to suggestions, when they accept or reject completions, and how they iterate on multi-file changes. This is a qualitatively different data distribution than static code corpora, and xAI's bet is that it maps more closely to what high-value coding assistance actually looks like in practice.

**Benchmark context:**

Official SWE-bench Verified scores for V9-Medium were not published at launch. For reference, the current competitive landscape: GPT-5.5 sits at 88.7%, Claude Opus 4.7 at 87.6%, and Gemini 3.1 Pro at approximately 80–81%. The prior Grok model (v8-small) scored roughly 75%. Whether V9-Medium closes that ~13-point gap is the most-watched number in AI coding benchmarks as of this writing. xAI has said it expects V9-Medium to be competitive with GPT-5.5 in coding, but no third-party confirmation exists yet.

**Availability:**

V9-Medium is available through the xAI API and on grok.com. Access via Cursor itself was not announced at launch — the Cursor product continues to use the model roster Cursor had pre-acquisition, and no changes to Cursor's model access were announced on June 16.

> Sources: [TechTimes — Grok V9-Medium Arrives as SpaceX Seals Cursor](https://www.techtimes.com/articles/318495/20260616/grok-v9-medium-arrives-spacex-seals-cursor-developers-face-model-choice-risk.htm) · [ChatForest — Grok V9-Medium Is Not Grok 5: A Builder's Guide](https://chatforest.com/builders-log/xai-grok-v9-medium-1-5t-coding-model-mid-june-2026-builder-guide/) · [Grok for Coding 2026: Benchmarks & Pricing](https://coursiv.io/blog/grok-for-coding-2026)

---

### OpenAI's Deployment Simulation: Replaying 1.3 Million Conversations Before a Model Ships

**OpenAI** published research on **June 16, 2026** describing **Deployment Simulation** — a pre-release safety methodology the company has been running across every GPT-5-series deployment since August 2025.

**The core technique:**

Before a new model version ships, OpenAI takes de-identified production conversations from the current deployed model and replays them verbatim against the candidate model. This lets evaluators study how the new model would have responded to the same real-world inputs — not synthetic red-team prompts, not cherry-picked examples, but a statistically representative sample of what users actually send.

The method addresses a known weakness in pre-deployment evaluation: red-teaming and benchmarks test what evaluators think to look for, but they cannot anticipate the full distribution of ways users interact with a deployed system. Deployment Simulation is designed to surface **behavioral drift** — cases where a new model responds differently to common inputs in ways that introduce new risks, even if the model scores better on capability benchmarks.

**Scale:**

Across GPT-5-series Thinking deployments from August 2025 to March 2026, OpenAI analyzed approximately **1.3 million de-identified conversations**. The paper reports that Deployment Simulation:
- Improved estimates of undesired model behavior rates compared to baseline evaluations
- Surfaced novel forms of misalignment before release — behaviors that did not appear in targeted red-teaming
- Reduced the risk that models could detect they were being evaluated (a known problem with adversarial testing setups)

**Extension to agentic settings:**

The research includes results from applying the technique to agentic rollouts with tool use, not just standard chat. This is notable because agentic deployments introduce compounding failure modes — a model that produces subtly wrong tool calls in a multi-step workflow can cause downstream errors that a single-turn evaluation would never catch. OpenAI says Deployment Simulation extends naturally to these settings because it replays the full conversation structure including tool calls, not just the final response.

**The companion public dataset paper:**

OpenAI published a second paper alongside the main research, exploring whether the technique works when the lab does not have access to proprietary production data — specifically, testing it on the public WildChat dataset. The finding: "while less precise, it still provides a useful signal about" undesired behavior rates. This matters because it means external auditors, regulators, or competing labs could potentially apply a version of the technique using public conversation datasets, even without access to a lab's production logs.

> Sources: [OpenAI — Predicting model behavior before release by simulating deployment](https://openai.com/index/deployment-simulation/) · [MarkTechPost — OpenAI's Deployment Simulation Extends Pre-Deployment Risk Assessment](https://www.marktechpost.com/2026/06/16/openai-deployment-simulation/) · [TechTimes — OpenAI's Pre-Deployment Test Replays Real User Conversations to Spot AI Behavioral Drift](https://www.techtimes.com/articles/318570/20260617/openais-pre-deployment-test-replays-real-user-conversations-spot-ai-behavioral-drift.htm)

---

### OpenAI LifeSciBench: 750 Expert-Authored Tasks, and the Best Model Passes One in Three

**OpenAI** released **LifeSciBench** on **June 17, 2026** — a benchmark for evaluating AI performance on real-world life science research tasks, developed in collaboration with **173 practicing scientists** from biotechnology and pharmaceutical research organizations.

**Why a new benchmark:**

Existing life-science benchmarks — MMLU biology questions, MedQA clinical MCQs — measure whether a model can answer exam-style questions. They do not measure whether a model can function as a useful research collaborator across the actual tasks that define a drug discovery program: generating hypotheses, designing experiments, interpreting assay results, writing regulatory documentation, or navigating scientific literature at depth. LifeSciBench is an attempt to build a benchmark that reflects what life scientists actually need from AI.

**Structure:**

- **750 tasks** written by scientists with Ph.D.-level training and direct drug discovery experience
- **7 biological research workflows**: evidence handling and analysis, design and optimization, scientific reasoning, validation and operations, translation, and scientific communication
- **7 domains**: genomics, medicinal chemistry, clinical and translational science, plus four others not yet publicly specified
- **Expert-written grading rubrics**: each task is scored by a rubric developed by the same scientists who wrote the task, not by automated string-matching or LLM-as-judge

**Results:**

| Model | LifeSciBench Pass Rate |
|---|---|
| GPT-Rosalind (domain-specialized) | **36.1%** |
| GPT-5.5 | 25.7% |
| Other frontier models | 20–25% range |

The top number is 36.1%. Even the specialized domain model built specifically for life science applications passes fewer than two in five tasks. OpenAI frames this as a feature of the benchmark, not a failure of the models: LifeSciBench is intentionally hard because the tasks reflect real research decisions, not textbook recall.

**GPT-Rosalind's role:**

GPT-Rosalind — previously covered in the context of biodefense — is OpenAI's domain-specialized model for life sciences. The LifeSciBench result shows that fine-tuning for the domain meaningfully improves performance (36.1% vs. 25.7% for GPT-5.5), but the gap between a domain-specialized model and an expert human researcher remains large. OpenAI did not publish human expert baselines alongside the model results.

**Benchmark release:**

LifeSciBench is published as an open benchmark. The tasks and evaluation rubrics will be available for other labs to use. OpenAI's stated goal is for it to function as a shared standard for measuring progress on AI-assisted scientific research — similar to how SWE-bench became the standard for coding.

> Sources: [OpenAI — Introducing LifeSciBench](https://openai.com/index/introducing-life-sci-bench/) · [MarkTechPost — OpenAI Releases LifeSciBench, a 750-Task Benchmark](https://www.marktechpost.com/2026/06/17/openai-releases-lifescibench-a-750-task-benchmark-grading-ai-models-on-real-life-science-research-with-expert-written-rubric/) · [OpenAI on X — @OpenAI LifeSciBench announcement](https://x.com/OpenAI/status/2067346916929937827)

---

### Fable 5 / Mythos 5 Restoration Update: Washington Talks Ongoing, No Deal Confirmed

**Update on the ongoing story** (original coverage: June 15, 2026 digest):

As of **June 17, 2026** — five days after the US Commerce Department export control directive suspended Fable 5 and Mythos 5 globally — both models remain offline. The situation has evolved in two ways since the June 15 digest:

**In-person Washington negotiations:**

Senior Anthropic technical staff traveled to Washington for face-to-face meetings with Department of Commerce officials. According to reporting from The Globe and Mail and TechTimes, the talks are substantive: the government is seeking technical assurances that the models cannot be accessed in ways that would enable foreign adversaries to extract sensitive information, while Anthropic is pushing to restore access to its flagship commercial products. No agreement has been announced publicly.

**Unconfirmed restoration signals:**

Multiple posts on X from June 16 claimed that negotiations were "favoring Anthropic" and that Fable 5 could be restored within 24–48 hours — a window that would have placed restoration on June 17 or 18. As of the publication of this digest, no official announcement has been made. These posts represent informal intelligence from people claiming proximity to the process; they are not confirmed.

**The approaching deadline:**

A **June 20 refund deadline** is in play for enterprise customers who purchased access to Fable 5 and Mythos 5 before the suspension. Prediction markets are pricing a multi-week outage as more likely than a multi-day resolution, but the market is divided and the contract terms are short enough that pricing is volatile.

The core dispute — whether the jailbreak constitutes a meaningful safety failure or a narrow edge case — remains publicly unresolved.

> Sources: [The Globe and Mail — Anthropic, Trump officials working toward deal to restore Fable 5 and Mythos 5](https://www.theglobeandmail.com/business/article-anthropic-trump-officials-deal-restore-fable-5-mythos-5/) · [TechTimes — Anthropic Races to Lift Fable 5 Export Ban: Top Engineers Sent to Washington](https://www.techtimes.com/articles/318376/20260615/anthropic-races-lift-fable-5-export-ban-top-engineers-sent-washington-deal.htm) · [ExplainX — When Will Fable 5 Be Available Again?](https://explainx.ai/blog/when-will-fable-5-be-available-again-2026)

---

## 2. New AI Tools & Software Frameworks

### Gemini CLI Is Dead: Google Forces Migration to Antigravity CLI on June 18

**Today** (June 18, 2026) marks the end of Gemini CLI. Google has sunset the tool for all non-enterprise users — the CLI, along with Gemini Code Assist IDE extensions, stops serving requests starting June 18 for **Google AI Pro, Ultra, and free-tier** accounts. Only organizations with a **Gemini Code Assist Standard or Enterprise license** retain uninterrupted access.

The replacement is **Antigravity CLI** (`agy`) — a rewrite in Go, announced at Google I/O 2026, and now the required tool for developers who want terminal access to Google's AI models.

**Why this transition is disruptive:**

This is not a backwards-compatible upgrade. Google documented four breaking changes, but the actual migration cost for developers with established workflows is higher:

1. **Binary name change**: `gemini` → `agy`. Every shell script, CI pipeline, Makefile, and cron job that calls `gemini` breaks.
2. **Streaming format change**: `--stream` previously emitted plain-text deltas; Antigravity emits SSE-formatted events. Any script parsing streaming output needs to be rewritten.
3. **Agent state relocation**: State moved from `~/.gemini/agents/` to `~/.antigravity/agents/`. Existing agent state is not automatically migrated.
4. **Exit code behavior**: Gemini CLI exited 0 on tool-use failures. Antigravity exits non-zero. Any automation that relied on exit-0 as a success signal will now trigger false failures.

**The silent MCP failure:**

The most treacherous breaking change is not in the four Google documented. Gemini CLI stored MCP server configuration inline in `settings.json`; Antigravity CLI uses a separate `mcp_config.json` file. Critically, the field name for remote servers changes from `url` to `serverUrl` — and if developers miss this rename, the MCP server **fails silently with no error output**. Developers with automated pipelines that rely on MCP servers may not realize their integrations are broken until they observe downstream failures.

**What Antigravity CLI preserves:**

The core agentic primitives are present: Agent Skills, Hooks, Subagents, and Extensions (renamed to Antigravity plugins). The model defaults to Gemini 3.5 Pro rather than the model previously selected in Gemini CLI. Google acknowledged there is no 1:1 feature parity "right out of the gate."

**Developer reaction:**

The migration drew criticism in the Google AI Developers Forum and on GitHub. The compressed timeline (the sunset was announced May 19, giving developers roughly 30 days to migrate production systems) and the absence of feature parity are the primary complaints. Google's position is that consolidating effort into the Antigravity platform is necessary to support the Gemini 3.5 agentic model family's full capability set.

> Sources: [Google Developers Blog — Transitioning Gemini CLI to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) · [Groundy — Google Sunsets Gemini CLI on June 18: Forced Migration Breaks Existing Automation](https://groundy.com/articles/google-sunsets-gemini-cli-on-june-18-forced-migration-to-antigravity-cli-breaks/) · [GitHub Discussion #27274 — Transitioning Gemini CLI to Antigravity CLI](https://github.com/google-gemini/gemini-cli/discussions/27274) · [Google Antigravity Migration Guide](https://antigravity.google/docs/gcli-migration) · [DigitalApplied — Gemini CLI Dies June 18: The Antigravity Migration Guide](https://www.digitalapplied.com/blog/gemini-cli-to-antigravity-cli-migration-june-18-2026-guide)

---

### xAI Ships Agent Dashboard for Grok Build

Alongside the V9-Medium launch on **June 16, 2026**, xAI shipped the **Agent Dashboard** for Grok Build — a new interface for managing multiple simultaneous coding agent sessions from a single screen.

The capability addresses a practical problem that emerged as developers started running Grok Build for longer, more complex coding tasks: context-switching between sessions required navigating away from active work, and there was no unified view of the state of all running agents. The Agent Dashboard provides:

- A single screen showing all active coding sessions
- Per-session blocker tracking — when an agent gets stuck, the blocker is surfaced in the dashboard rather than buried in the session transcript
- Inline reply dispatch — developers can respond to agent questions or redirect without entering the session
- Session switching without momentum loss — the active session state is preserved

The feature ships at a moment when xAI is deepening its developer tooling investment via the Cursor acquisition. The combination of V9-Medium (a model trained on real coding workflows) and a multi-session management interface for Grok Build represents xAI's most concentrated push into professional software development since Grok Build launched.

> Sources: [xAI Release Notes — June 2026](https://releasebot.io/updates/xai) · [Basenor — 5 Grok Updates You Should Know About Right Now](https://www.basenor.com/blogs/news/5-grok-updates-you-should-know-about-right-now)

---

## 3. Real-World AI Implementation Stories

### SpaceX Acquires Cursor for $60 Billion — Four Days After the Largest IPO in History

The most consequential business story of the week came on **June 16, 2026**: **SpaceX announced it is acquiring Cursor** (developed by Anysphere) in an **all-stock deal valued at $60 billion**, executed just four days after SpaceX's record-breaking $2 trillion IPO.

**Deal mechanics:**

- **Structure**: All-stock. No cash changes hands.
- **Conversion**: Each Cursor share automatically converts to SpaceX Class A common stock at a price equal to the volume-weighted average closing price of SPCX, implying a $60 billion equity value for Cursor at current trading prices.
- **Close**: Expected Q3 2026. Cursor becomes a wholly owned SpaceX subsidiary.
- **Cursor CEO Michael Truell** is staying with the company post-acquisition.

**SpaceX shares surged approximately 16% on the day of the announcement**, making it the fourth most valuable US company. The market interpreted the acquisition as validating both the $60B Cursor price and SpaceX's positioning as an AI company, not just an aerospace company.

**Why this deal happened:**

Cursor had been operating under a partnership option with SpaceX since April 2026 — SpaceX held the right to either acquire for $60B or pay $10B to partner. The IPO gave SpaceX a liquid stock currency to execute the acquisition without spending cash. The IPO proceeds and the SPCX share price made a $60B all-stock deal economically favorable in a way it was not pre-IPO.

**What xAI gains:**

Cursor's 7.5 million monthly active developers represent direct distribution at the point where AI coding models generate revenue. The prior Cursor model arrangement — Cursor offered Claude, GPT-5.5, and Gemini as options — will presumably shift to favor Grok V9-Medium and whatever joint model xAI and Cursor have been training together. SpaceX confirmed it will release a jointly trained AI model on both Cursor and Grok Build soon.

**The Cursor trajectory:**

Cursor was generating approximately **$2.6 billion in annualized B2B revenue** at the time of acquisition, up from the $2 billion ARR figure covered in prior digests. The $60B acquisition price implies a roughly **23× revenue multiple** — aggressive but not unprecedented for high-growth developer tools. Cursor's cofounders' net worths more than doubled on the deal.

**The competitive implication:**

Before this deal, the AI coding tool landscape was: Cursor (independent, multi-model), GitHub Copilot (Microsoft/OpenAI), and OpenCode (open-source, 7.5M users). Cursor going into SpaceX/xAI shifts the market structure significantly: the most-used paid AI code editor is now part of the same corporate family as Grok. Developers who chose Cursor for model flexibility — the ability to run Claude, GPT-5.5, or Gemini — may face a different calculus when the product is owned by an xAI-affiliated entity.

> Sources: [CNBC — SpaceX to acquire the AI coding startup Cursor for $60 billion](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html) · [TechCrunch — SpaceX to acquire Cursor for $60B in stock, days after blockbuster IPO](https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/) · [Fortune — Elon's super currency: SpaceX's surging stock paid for the $60 billion Cursor acquisition in just a few hours of trading](https://fortune.com/2026/06/16/elon-musk-spacex-ipo-ai-coding-startup-cursor-acquisition/) · [Yahoo Finance — SpaceX locks in $60 billion Cursor deal](https://finance.yahoo.com/technology/ai/articles/spacex-buy-cursor-ai-coding-103445855.html) · [QZ — SpaceX's $60 billion Cursor deal more than doubles its young cofounders' net worths](https://qz.com/spacex-acquiring-cursor-anysphere-60-billion-stock-deal-061726) · [MLQ.ai — SpaceX Acquires AI Coding Startup Cursor for $60 Billion in All-Stock Deal](https://mlq.ai/news/spacex-acquires-ai-coding-startup-cursor-for-60-billion-in-all-stock-deal/)

---

## Key Themes for June 16–18, 2026

- **The AI coding market is consolidating around vertically integrated stacks.** SpaceX acquiring Cursor for $60B is the clearest signal yet that the "model-agnostic tool" era for AI code editors may be ending. Cursor was valuable precisely because it let developers switch between Claude, GPT-5.5, and Gemini. Now it belongs to xAI's parent. GitHub Copilot is Microsoft/OpenAI. The remaining truly independent AI coding platforms are increasingly rare — and developer tool acquisitions are becoming a new front in the AI model wars.

- **"Pre-deployment simulation" may become the new standard for safety claims.** OpenAI's Deployment Simulation technique — replaying 1.3M real production conversations against a candidate model before it ships — is a substantive methodological contribution, not marketing. It addresses a real gap in how pre-release evaluations are done, and the companion paper showing it works on public datasets means regulators and auditors could apply it independently. In the context of the US government's shutdown of Fable 5 (triggered partly by a jailbreak that pre-deployment evaluation did not catch), a lab that can demonstrate Deployment Simulation-style pre-release validation has a defensible answer to "how do you know your model won't do X in production?"

- **Gemini CLI's forced migration today is a stress test for Google's developer ecosystem.** The June 18 deadline is not a warning — it is the deadline. Developers with production pipelines that call `gemini` CLI are broken as of today. The transition's disruption (four documented breaking changes, one undocumented silent MCP failure mode) tests whether Google's developer relations can hold through a forced migration to a new tool. The outcome will be visible in Antigravity CLI adoption metrics over the next 30 days.

---

*Sources:*
- [TechTimes — Grok V9-Medium Arrives as SpaceX Seals Cursor](https://www.techtimes.com/articles/318495/20260616/grok-v9-medium-arrives-spacex-seals-cursor-developers-face-model-choice-risk.htm)
- [ChatForest — Grok V9-Medium Is Not Grok 5](https://chatforest.com/builders-log/xai-grok-v9-medium-1-5t-coding-model-mid-june-2026-builder-guide/)
- [OpenAI — Predicting model behavior before release by simulating deployment](https://openai.com/index/deployment-simulation/)
- [MarkTechPost — OpenAI's Deployment Simulation](https://www.marktechpost.com/2026/06/16/openai-deployment-simulation/)
- [OpenAI — Introducing LifeSciBench](https://openai.com/index/introducing-life-sci-bench/)
- [MarkTechPost — OpenAI Releases LifeSciBench](https://www.marktechpost.com/2026/06/17/openai-releases-lifescibench-a-750-task-benchmark-grading-ai-models-on-real-life-science-research-with-expert-written-rubric/)
- [The Globe and Mail — Anthropic, Trump officials working toward deal](https://www.theglobeandmail.com/business/article-anthropic-trump-officials-deal-restore-fable-5-mythos-5/)
- [ExplainX — When Will Fable 5 Be Available Again?](https://explainx.ai/blog/when-will-fable-5-be-available-again-2026)
- [Google Developers Blog — Transitioning Gemini CLI to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)
- [Groundy — Google Sunsets Gemini CLI on June 18](https://groundy.com/articles/google-sunsets-gemini-cli-on-june-18-forced-migration-to-antigravity-cli-breaks/)
- [GitHub Discussion #27274](https://github.com/google-gemini/gemini-cli/discussions/27274)
- [CNBC — SpaceX to acquire Cursor for $60 billion](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html)
- [TechCrunch — SpaceX to acquire Cursor for $60B in stock](https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/)
- [Fortune — SpaceX's surging stock paid for Cursor acquisition](https://fortune.com/2026/06/16/elon-musk-spacex-ipo-ai-coding-startup-cursor-acquisition/)
- [Yahoo Finance — SpaceX locks in $60 billion Cursor deal](https://finance.yahoo.com/technology/ai/articles/spacex-buy-cursor-ai-coding-103445855.html)
- [xAI Release Notes — June 2026](https://releasebot.io/updates/xai)
- [Basenor — 5 Grok Updates](https://www.basenor.com/blogs/news/5-grok-updates-you-should-know-about-right-now)
