# Site positioning and content plan

The three domains serve three kinds of visitors and three intents. They share the brand, but their information architecture and tone each differ.

---

## thaliox.com — brand site

- **Visitors**: people hearing about THALIOX for the first time (prospective users, investors, press, hiring candidates).
- **Intent**: understand "what this is, why it's different, why it matters" within 30 seconds.
- **Tone**: visionary, confident, restrained; few jargon terms, many metaphors ("vectors replace files, the attention budget replaces CPU time slices").
- **Information architecture**:
  - Hero — a one-line positioning + two CTAs (go to docs / see progress).
  - Why not "Linux + Agent" — three to four contrast points.
  - TAM three primitives at a glance — Vector Message / Attention Budget / Capability Token.
  - A glimpse of the five invariants (humans are the floor).
  - Call to action — GitHub Star, join, contact.
- **Out of scope**: no piling on of API detail, no long docs — that is io's job.

## thaliox.dev — dev site

- **Visitors**: developers and contributors who want to take part or track progress.
- **Intent**: "where are we now, what's next, how do I get involved".
- **Tone**: pragmatic, transparent, engineering-minded; gives real data (test counts, milestones, empirical evidence).
- **Information architecture**:
  - Milestone timeline — H1/H2/H3, **M1 ✅ delivered (v0.1.0)**, M2 in progress.
  - RFC / abstract machine contract — links to `docs/rfcs/0001-abstract-machine.md`.
  - Changelog / Release — synced from `thaliox-os` GitHub Releases.
  - Architecture overview — eight crates in one diagram.
  - How to get involved — repo, issues, discussions, contribution guide.
- **Data source**: sync from the `thaliox-os` repo as much as possible (milestones, Releases, crate list) to reduce manual drift.

## thaliox.io — docs site

- **Visitors**: engineers using or evaluating THALIOX.
- **Intent**: "how to install, how to run the first agent, how to understand the concepts, how to look up the API".
- **Tone**: precise, actionable, example-first.
- **Information architecture** (`@nuxt/content`, Markdown as routes):
  - Getting started — install, run `autonomous_agent`, your first autonomous agent.
  - Core concepts — TAM three primitives, the five invariants, the responsibilities of each of the eight crates.
  - Guides — wiring up an LLM provider, writing tools, capability tokens, attention budget reconciliation.
  - Reference — crate APIs, config options, CLI.
- **Writing conventions**: every page carries `title`/`description` in frontmatter; code blocks are runnable; a term links to its concept page on first appearance.

---

## Content migration notes

The old site (`thaliox/site`, archived) content is the narrative of the early design (VTCP/SFS/CHROMA/NIL) and is **not migrated**.
The content of the new three sites is rewritten around the [TAM three primitives + eight crates](https://github.com/thaliox/thaliox-os).
The homepage's core metaphor ("vectors replace files...") is THALIOX's consistent vision and is kept.

## Content priority (staged)

1. **P0 skeleton** — the three sites can go live, each with a brand-consistent placeholder/above-the-fold, cross-site navigation working. ← current
2. **P1 brand site** — a complete landing page for thaliox.com.
3. **P1 docs site** — thaliox.io getting started + core concepts (aligned with M1).
4. **P2 dev site** — thaliox.dev milestone timeline + Release sync.
