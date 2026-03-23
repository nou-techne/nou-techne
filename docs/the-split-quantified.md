# The Split, Quantified

*Empirical evidence for the craft/scale divide.*

A companion to [The Oldest Design Problem](the-oldest-design-problem.html), from Techne / RegenHub LCA, Boulder, CO

---

## The Claim

The Oldest Design Problem asserts: "We are living in the split now." The split — commodity production on one side, luxury artisanship on the other, and an unstable middle where most of the meaningful work lives — recurs every time institutional containers dissolve.

This document grounds the claim in data. Software development is the clearest contemporary case because it has the best available metrics and because it is the domain where the craft/scale tension is most visibly playing out in 2026. Three data points, each illuminating a different face of the split.

---

## I. The Compensation Bimodal

Software developer compensation in 2025–2026 is not normally distributed. It is bimodal — two peaks with a thinning middle.

**The commodity peak:** Platforms like Upwork, Fiverr, and Toptal report median developer rates of $25–50/hour for general web development, with downward pressure from global labor arbitrage and AI-assisted output. The Stack Overflow Developer Survey (2024) shows 30% of professional developers worldwide earning under $35,000/year. These developers compete primarily on cost and availability.

**The luxury peak:** Total compensation at top-tier technology firms (Google, Meta, Apple, Netflix, Amazon, Microsoft) ranges from $250,000 to $800,000+ for senior engineers, with equity-heavy packages that create an effective wealth class within the profession. Levels.fyi aggregates show median L5/E5 total comp above $400,000 at FAANG-tier firms. These developers compete on prestige, network effects, and access to scale.

**The thinning middle:** Independent consultants, agency developers, small-company engineers, and open-source contributors occupy the space between — typically $75,000–$180,000/year. This is where the "affordable middle" that Wright sought lives. It is also where economic pressure is most intense: AI code generation compresses the commodity end upward (why pay $30/hour for boilerplate when Copilot is $19/month?), while the luxury end inflates through stock appreciation and talent competition.

The split is visible in the shape of the distribution itself. The middle is not collapsing — it is being squeezed from both ends.

**Sources:** Stack Overflow Developer Survey 2024; Levels.fyi compensation data; Bureau of Labor Statistics OES data for Software Developers (15-1252); Upwork marketplace rate analysis.

---

## II. The Maintenance Bottleneck

Open-source software is the infrastructure of the digital economy. It is also one of the clearest examples of the craft/scale split operating in real time.

**The concentration:** A widely-cited analysis of npm (the JavaScript package registry, 2.1 million+ packages) found that a small fraction of maintainers are responsible for a disproportionate share of the ecosystem's critical infrastructure. The "bus factor" problem — how many maintainers would need to be hit by a bus before a project becomes unmaintainable — is 1 for a majority of critical packages.

**The labor structure:**

- **Commodity layer:** Millions of developers *use* open-source packages. They install, configure, and compose. This is scaled consumption.
- **Craft layer:** A few thousand maintainers *create and maintain* the packages. They fix bugs, review PRs, manage releases, respond to security vulnerabilities. This is artisanal production.
- **The gap:** The maintainers are rarely compensated proportionally to the value they create. The 2024 Tidelift State of the Open Source Maintainer report found that 60% of maintainers are unpaid volunteers, and among those who are paid, the median income from maintenance is under $1,000/year.

The split here is structural: the scale of consumption is industrial (billions of downloads, millions of dependents) while the production remains artisanal (individual maintainers, often working alone, rarely compensated). No institutional container bridges this gap effectively. GitHub Sponsors, Open Collective, and Tidelift are attempts — but collectively they reach only a fraction of the ecosystem.

**The fragility this produces:** The Log4Shell vulnerability (December 2021) demonstrated what happens when industrial-scale systems depend on artisanal-scale maintenance. A critical logging library used by virtually every Java application was maintained by a handful of volunteers. The vulnerability cost billions to remediate. The maintainers were still unpaid.

**Sources:** Libraries.io dependency analysis; Tidelift State of the Open Source Maintainer 2024; GitHub Octoverse 2024; "Roads and Bridges" (Nadia Eghbal, Ford Foundation, 2016).

---

## III. The AI Compression

AI code generation is compressing the craft/scale divide faster than any previous technology.

**The adoption curve:** GitHub reported that Copilot generated 46% of code in files where it was enabled (2024 data). Google's internal data suggests AI-assisted code accounts for over 25% of new code in their repositories. Amazon CodeWhisperer reports similar adoption rates. By some estimates, AI-generated code will constitute a majority of new code written by 2027.

**What this means for the split:**

The commodity layer expands. Tasks that previously required a junior developer — boilerplate, CRUD operations, standard patterns, test generation — are increasingly automated. The economic value of being able to write standard code is declining toward zero.

The craft layer persists but changes shape. Architecture decisions, system design, debugging novel failures, understanding user needs, navigating organizational complexity — these remain stubbornly human. The "luxury" end of the distribution is not threatened by AI code generation; it is *amplified* by it, because senior engineers who can effectively direct AI systems become more productive while junior engineers who competed on code volume become less differentiated.

**The middle is where the compression hurts most.** A developer whose value proposition was "I can write competent code at a reasonable rate" faces the same squeeze as Morris's craftsmen facing the factory: the handcraft is too expensive when the machine can approximate it, but the artisanal judgment is too rare and too contextual to be mechanized.

**The institutional question:** AI code generation is the latest tool in a 3,000-year lineage of tools that promise augmentation and frequently deliver dependency. Engelbart's test applies: is the AI system co-evolving with the human who uses it (augmentation), or is it being optimized in isolation (automation)? The answer depends entirely on the institutional container.

A developer using AI within a cooperative structure — where the goal is member capability, where the training methodology evolves with the tooling, where governance over the AI system's behavior is shared — might experience genuine augmentation. The same developer using AI within a platform that optimizes for engagement and throughput experiences industrial dependency. The tool is the same. The container is not.

**Sources:** GitHub Copilot research blog, "Research: Quantifying GitHub Copilot's Impact" (2024); Google DeepMind internal research reports; Stack Overflow Developer Survey AI section 2024; "The Impact of AI on Developer Productivity" (McKinsey, 2024).

---

## What the Data Shows

Three faces of the same split:

| Dimension | Commodity Side | Craft Side | The Middle |
|-----------|---------------|------------|------------|
| **Compensation** | $25–50/hr gig platforms | $400K+ FAANG total comp | Squeezed from both ends |
| **Open Source** | Billions of downloads | Thousands of unpaid maintainers | No bridge at scale |
| **AI Generation** | 46%+ of new code automated | Architecture/design remains human | Value of "competent code" declining |

The split is not a metaphor. It is a measurable distribution with a thinning middle, a fragile craft layer supporting an industrial-scale consumption layer, and a technological compression that accelerates both tendencies simultaneously.

The question the parent essay asks — *who holds the tool, who governs its use, and whether the institution that surrounds it is designed to amplify human capacity or to replace it* — is empirically urgent. The data shows that the institutional containers for software development (open-source foundations, platform employment, gig marketplaces) are not holding the split. They are not preventing commodity collapse on one end or luxury concentration on the other. The middle is thinning.

Building new containers — cooperatives, commons governance, shared ownership of productive infrastructure — is not idealism. It is a response to measurable structural failure. The data is the argument.

---

*All data points cited are from publicly available sources as of early 2026. Where exact figures are referenced, source documents are named for independent verification. This artifact prioritizes representative accuracy over false precision — trends and orders of magnitude over decimal points.*

*Techne / RegenHub LCA, Boulder, CO. 2026.*
