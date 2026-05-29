You are implementing the DNA section + LOG section for a world-class AI Systems Architect portfolio.
Project workdir: C:\Users\FlexGrafik\FlexGrafik\github\portfolio
Stack: Next.js 16.2.6, React 19, TypeScript, Tailwind v4, Framer Motion 12.
All colors use CSS vars. Existing structure: src/data/ecosystem.ts, src/lib/utils.ts are already created.

This is a large task. Do one section at a time. Run build after each section.

---

## PART A: DNA Section (src/data/methodology.ts + /dna pages)

### Step 1: Create src/data/methodology.ts

```typescript
export interface Pillar {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  icon: string;  // lucide icon name as string
  description: string;
  keyPoints: string[];
  realExamples: Array<{
    label: string;
    detail: string;
    file?: string;
  }>;
  vsTraditional: {
    traditional: string;
    architect: string;
  };
}

export const pillars: Pillar[] = [
  {
    id: 'context-architecture',
    slug: 'context-architecture',
    title: 'Context Architecture',
    tagline: 'Every agent knows exactly where it is.',
    icon: 'BrainCircuit',
    description: 'Context engineering is the discipline of designing information structures that allow AI agents to operate effectively with minimal ambiguity. SESSION-ANCHOR.md, brain.md, and AGENTS.md form a three-layer context system — project state, project intent, and project rules.',
    keyPoints: [
      'SESSION-ANCHOR.md: compressed state map — any agent can onboard cold in under 60 seconds',
      'brain.md: project context, architectural decisions, and intent per repository',
      'AGENTS.md: guardrails, SOPs, and workflow rules that constrain agent behavior',
      'Context is an asset that compounds — better context = fewer tokens wasted on discovery',
    ],
    realExamples: [
      { label: 'agent-os SESSION-ANCHOR', detail: 'Contains current phase, commands to run, graph pipeline state, and next step. One file replaces a 30-minute onboarding.', file: 'agent-os/SESSION-ANCHOR.md' },
      { label: 'jadzia-core brain.md', detail: 'Records architectural decisions (why FastAPI, why JWT, why Paramiko) so future agents don\'t re-debate them.', file: 'jadzia-core/brain.md' },
      { label: 'AGENTS.md in every repo', detail: '8 repositories, 8 AGENTS.md files. Each one is a behavioral contract for every AI agent that enters that codebase.', file: 'agent-os/AGENTS.md' },
    ],
    vsTraditional: {
      traditional: 'Developer reads README, explores codebase, asks questions for 2 hours before making a change.',
      architect: 'Agent reads SESSION-ANCHOR.md (90 seconds), knows exact state, runs prescribed command, delivers result.',
    },
  },
  {
    id: 'bounded-autonomy',
    slug: 'bounded-autonomy',
    title: 'Bounded Autonomy',
    tagline: 'AI executes. Human decides.',
    icon: 'ShieldCheck',
    description: 'Bounded autonomy is the principle that AI agents should operate within clearly defined boundaries, with human decision points at every meaningful threshold. Not because AI can\'t be trusted — but because accountability requires a human in the loop.',
    keyPoints: [
      'HITL gates: Human-in-the-Loop at every production boundary, not just critical failures',
      'Zasada 11: Zero autonomous production deploys. Every deploy requires explicit human approval',
      'Kill switches: Every agent has a documented way to halt, roll back, or override',
      'Audit trails: Every agent action is logged with handoff docs — reconstructable at any point',
    ],
    realExamples: [
      { label: 'Agent OS Reviewer (HITL)', detail: 'The LangGraph pipeline pauses at the Reviewer node. Code cannot proceed to Summarizer without explicit human approval via the Mission Control UI.', file: 'agent-os/src/graph.py' },
      { label: 'Zasada 11 enforcement', detail: 'No agent in the ecosystem has deploy credentials. GitHub Actions workflows require manual trigger. This is not a limitation — it is architecture.', file: 'WorkFlow/AGENTS.md' },
      { label: 'GHA manual gates (ZZPackage)', detail: 'WordPress/WooCommerce deploys require manual workflow dispatch. GUARD_01-04 validates before any deploy is even permitted.', file: 'zzpackage.flexgrafik.nl/AGENTS.md' },
    ],
    vsTraditional: {
      traditional: 'AI agent runs autonomously, deploys on its own, discovers the bug 3 hours later in production.',
      architect: 'AI agent prepares the deploy. Human reviews the diff. Human triggers the deploy. AI cannot override this.',
    },
  },
  {
    id: 'spec-driven',
    slug: 'spec-driven',
    title: 'Spec-Driven Development',
    tagline: 'Specs are contracts, not suggestions.',
    icon: 'FileCode',
    description: 'Spec-driven development treats every task as a formal contract between intent and execution. todo.json is not a to-do list — it is an executable specification. Each item has acceptance criteria, verification steps, and proof-of-done.',
    keyPoints: [
      'todo.json as executable spec: structured JSON with acceptance criteria, not free-form text',
      'Verification before deploy: every feature has a verification document before production',
      'Proof-of-done: handoff docs contain evidence that specs were met, not just "done" checkboxes',
      'Specs compound: a well-written spec from today becomes a regression test tomorrow',
    ],
    realExamples: [
      { label: 'WorkFlow/todo.json', detail: 'The program office backlog. Each task: id, priority, description, acceptance criteria, current_focus flag. Agents pick tasks by reading this file — no ambiguity.', file: 'WorkFlow/todo.json' },
      { label: 'agent-os verification', detail: 'Before each phase completes, a verification checklist confirms: tests pass, endpoints respond, HITL gate triggers correctly. Not "looks good" — measurable.', file: 'agent-os/docs/checklists/' },
      { label: 'ZZPackage GUARD_01-04', detail: 'Four hard guardrails enforced before any deploy: product schema valid, price logic intact, wizard flow unbroken, no unauthorized endpoints. Spec-as-guardrail.', file: 'zzpackage.flexgrafik.nl/' },
    ],
    vsTraditional: {
      traditional: '"Build a login form." Agent builds something. Developer reviews vaguely. Ships. Bug found in production.',
      architect: '"Build login form. Acceptance: JWT returned on valid creds. Error message on invalid. Rate limit 5/min. Verified by e2e_smoke.py." Agent delivers. Spec verified. Shipped.',
    },
  },
  {
    id: 'ssot-enforcement',
    slug: 'ssot-enforcement',
    title: 'SSoT Enforcement',
    tagline: 'One truth. Zero divergence.',
    icon: 'Database',
    description: 'Single Source of Truth (SSoT) is the principle that every domain has exactly one canonical data source, and all other representations are derived from it. In a multi-agent ecosystem, SSoT prevents the catastrophic divergence that happens when agents have different views of reality.',
    keyPoints: [
      'One file per domain: product-master-table.json, ecosystem.json, repos.yaml — each is the canon',
      'Derived representations only: dashboards, docs, and UI read from SSoT — they never define it',
      'Conflict detection: Flex-vcms scans all repos for divergence from canonical definitions',
      'Agent reads SSoT first: before any agent makes a change, it reads the canonical source',
    ],
    realExamples: [
      { label: 'ecosystem.json', detail: 'Single source for all 8 repos: their status, stack, dependencies, and health endpoints. Every tool that needs to know "what\'s running" reads this file.', file: 'public/ecosystem.json' },
      { label: 'product-master-table.json (ZZPackage)', detail: 'All product definitions, prices, descriptions, and dependencies live here. The WordPress theme, the wizard UI, and the validation scripts all read from this one file.', file: 'zzpackage.flexgrafik.nl/' },
      { label: 'repos.yaml (Flex-vcms)', detail: 'Canonical list of all repositories, their roles, and scan rules. vcms-scan.js reads this to generate ecosystem maps and detect conflicts.', file: 'Flex-vcms/flex-vcms/repos.yaml' },
    ],
    vsTraditional: {
      traditional: 'Product name updated in the UI but not in the database. Price changed in code but not in the CMS. Three months later: three different versions of reality.',
      architect: 'Product name updated in product-master-table.json. All representations auto-derived. One commit. Zero divergence.',
    },
  },
  {
    id: 'cognitive-leverage',
    slug: 'cognitive-leverage',
    title: 'Cognitive Leverage',
    tagline: 'Not how much code. How many decisions compressed.',
    icon: 'Zap',
    description: 'Cognitive leverage is the metric that matters in the post-code era. Not lines of code written, not commits per day — but how many meaningful decisions were compressed, automated, or delegated. One well-designed spec can replace 40 decisions. One AGENTS.md can replace 200 onboarding questions.',
    keyPoints: [
      'Decision compression: a spec that covers 10 edge cases is worth more than 10 separate conversations',
      'Automation ROI: measure what decisions are now made automatically vs. manually',
      'Context as leverage: well-designed context multiplies every agent\'s effectiveness',
      'Program office thinking: WorkFlow repo exists to prevent decision-making overhead, not to track tasks',
    ],
    realExamples: [
      { label: 'Morning ritual → zero cognitive load', detail: 'Open terminal. Run vcms-scan.js. Open todo.json. Pick task by priority. No ambiguity about "what should I work on today" — the system decides.', file: 'Flex-vcms/flex-vcms/README.md' },
      { label: 'AGENTS.md eliminates onboarding', detail: 'Any AI agent entering any of the 8 repos has immediate clarity on: what this repo does, what rules apply, how to deploy, what not to touch. Zero discovery time.', file: 'flexgrafik-meta/docs/core/agents.md' },
      { label: 'Handoff docs as knowledge compression', detail: 'Each handoff doc compresses a session\'s decisions into 10 lines. The next agent reads 10 lines instead of replaying 2 hours of reasoning.', file: 'agent-os/docs/handoffs/' },
    ],
    vsTraditional: {
      traditional: 'Developer spends 3 hours daily deciding what to work on, re-explaining context to collaborators, and recovering from ambiguity.',
      architect: 'System pre-decides priorities (todo.json). Context pre-loaded (brain.md). Agent pre-briefed (AGENTS.md). Developer spends 3 hours building.',
    },
  },
];

export function getPillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
```

### Step 2: /dna overview page (src/app/dna/page.tsx)

Page structure:
1. Header: eyebrow "// methodology · dna", Title "Engineering DNA", subtitle "Not borrowed from a book. Built through production failures and 2 years of running real systems."

2. 5 pillar cards in a grid (2 cols desktop, 1 col mobile):
   Each card:
   - Icon (32px, accent color) — use the icon name from pillar.icon, import dynamically or use a mapping
   - Title (pillar.title)
   - Tagline in italic muted text
   - Description (first 120 chars + "...")
   - keyPoints count: "4 principles" in muted font-mono
   - Link: "Explore →" → /dna/[slug]
   - Style: bg-surface, border, hover border-accent translateY -2px

3. Section below cards: "vs Traditional Developer" — 2-column comparison table
   Left header: "Traditional Developer" (muted)
   Right header: "AI Systems Architect" (accent)
   5 rows — one per pillar, showing vsTraditional.traditional vs vsTraditional.architect
   Style: alternating row backgrounds, font-size 0.875rem

4. Icon mapping in the component (no dynamic imports needed, just a Map):
```tsx
import { BrainCircuit, ShieldCheck, FileCode, Database, Zap } from 'lucide-react';
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  BrainCircuit, ShieldCheck, FileCode, Database, Zap,
};
```

### Step 3: /dna/[pillar] dynamic pages (src/app/dna/[pillar]/page.tsx)

generateStaticParams from pillars array.

Page sections:
1. Breadcrumb: DNA / [pillar.title]
2. Header: icon + title + tagline
3. Description paragraph
4. "Key Principles" section: numbered list of pillar.keyPoints
5. "Real Examples from Production" section:
   Each example card:
   - Label (font-weight 600)
   - Detail text
   - If file: monospace file path with a small "→" link (just display, no actual link since repo is local)
6. "Traditional vs AI Systems Architect" section:
   Two columns side by side:
   Left (red tinted bg): traditional approach
   Right (green tinted bg): architect approach
7. Back link: "← Back to DNA" → /dna

---

## PART B: LOG Section

### Step 4: Content for LOG

Create src/content/log/2026-05-29-agent-os-phase5.mdx:
```mdx
---
title: "Agent OS Phase 5 — DONE"
date: "2026-05-29"
project: "agent-os"
type: "HANDOFF"
summary: "LangGraph pipeline Planner→Coder→Tester→Reviewer(HITL)→Summarizer fully operational. E2E tests pass."
---

## What happened

Phase 5 of Agent OS marked the completion of the full LangGraph pipeline.

The pipeline now runs end-to-end:
- **Planner** — decomposes tasks from todo.json into executable steps
- **Coder (OpenCode)** — implements code changes autonomously
- **Tester** — runs pytest suite, reports failures
- **Reviewer (HITL)** — pauses for human approval before proceeding
- **Summarizer** — produces handoff doc and updates SESSION-ANCHOR.md

## Evidence

- `e2e_smoke.py` passes on all 5 graph nodes
- `verify_reject_flow.py` confirms HITL gate fires correctly
- Mission Control UI (agent-os-ui) shows live task status at :3000

## Next step

Deploy to VPS (manual, Zasada 11). Monitor first 3 production runs.
```

Create src/content/log/2026-05-27-advergame-mvp.mdx:
```mdx
---
title: "FlexGrafik App — Canvas Engine MVP"
date: "2026-05-27"
project: "app-flexgrafik"
type: "FEAT"
summary: "Custom Canvas side-scroller engine live. Playwright E2E suite passing."
---

## What happened

The FlexGrafik advergame reached MVP. A custom Canvas engine built in React — not a game framework, a purpose-built renderer for this specific lead magnet.

Key decisions:
- **No Phaser/Three.js** — overhead not justified for a 2D side-scroller
- **Feature flags** — all new features behind flags, prod never gets unstable code
- **Proxy to WordPress** — game reads product data from WP API via Next.js proxy

## Evidence

- Playwright E2E: 12 test cases, all passing
- Vitest unit tests: canvas rendering, collision detection, asset loading
- Feature flags verified in production (3 flags active)

## Next step

A/B test as lead magnet. Measure conversion vs. static landing.
```

Create src/content/log/2026-05-22-ecosystem-orchestrator.mdx:
```mdx
---
title: "Flex-VCMS — Ecosystem Orchestrator Operational"
date: "2026-05-22"
project: "flex-vcms"
type: "HANDOFF"
summary: "vcms-scan.js generates ecosystem maps, conflict detection working across 8 repos."
---

## What happened

Flex-VCMS reached operational status as the daily driver for ecosystem management.

The morning ritual is now:
1. `cd Flex-vcms/flex-vcms`
2. `node tools/vcms-scan.js`
3. Read `docs/ecosystem/map.md`
4. Check `docs/ecosystem/conflicts.md` → expected: Conflicts: 0
5. Open `WorkFlow/todo.json`

## What vcms-scan.js does

- Reads `repos.yaml` (canonical repo list)
- Scans each repo for: AGENTS.md presence, brain.md presence, todo.json status
- Detects: missing files, version conflicts, divergent SSoT references
- Outputs: `docs/ecosystem/map.md` (human-readable) + `docs/ecosystem/conflicts.md`

## Evidence

- All 8 repos scanned: 0 conflicts on clean state
- Ecosystem map generated: accurate status for all repos
- LLM Gateway operational: routes to Anthropic/Google GenAI

## Next step

Extend scan-rules.json to detect package.json dependency drift across repos.
```

### Step 5: LOG data types + loader (src/lib/log.ts)

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LogEntry {
  slug: string;
  title: string;
  date: string;
  project: string;
  type: 'HANDOFF' | 'FEAT' | 'FIX' | 'DEPLOY' | 'ARCH';
  summary: string;
  content: string;
}

export function getAllLogEntries(): LogEntry[] {
  const logDir = path.join(process.cwd(), 'src/content/log');
  
  if (!fs.existsSync(logDir)) return [];
  
  const files = fs.readdirSync(logDir)
    .filter((f) => f.endsWith('.mdx'))
    .sort()
    .reverse();  // newest first
  
  return files.map((filename) => {
    const filePath = path.join(logDir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = filename.replace('.mdx', '');
    
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      project: data.project as string,
      type: data.type as LogEntry['type'],
      summary: data.summary as string,
      content,
    };
  });
}

export function getLogEntryBySlug(slug: string): LogEntry | undefined {
  return getAllLogEntries().find((e) => e.slug === slug);
}
```

### Step 6: /api/log route (src/app/api/log/route.ts)

```typescript
import { NextResponse } from 'next/server';
import { getAllLogEntries } from '@/lib/log';

export async function GET() {
  const entries = getAllLogEntries().slice(0, 20).map(({ content: _, ...rest }) => rest);
  return NextResponse.json(
    { entries, total: entries.length, generated: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
```

### Step 7: /log page (src/app/log/page.tsx)

Page sections:
1. Header: eyebrow "// operating journal", Title "The Log", subtitle "Generated from git history + handoff docs. Machine-readable feeds: /api/log · /log/feed.json"
2. Type filter pills (ALL / HANDOFF / FEAT / FIX / DEPLOY) — client-side filter, useState
3. Log entries list (reverse chronological):
   Each entry row:
   - Left: date (font-mono text-xs color muted) + type badge (HANDOFF=accent, FEAT=green, FIX=amber, DEPLOY=purple)
   - Center: project name (font-mono text-xs color accent) + title (font-weight 600)
   - Right: summary (color text-secondary, 1-line truncate)
   - Full row is clickable → /log/[slug]
   - Hover: border-left 2px var(--color-accent), background var(--color-bg-surface)
4. Feed links at bottom: "Subscribe: RSS · JSON"

Note: log page needs "use client" for the filter state. Or split: server renders list, client renders filter. 
Use a LogList client component for the filter, page.tsx is server component that passes entries as props.

### Step 8: /log/[slug] page (src/app/log/[slug]/page.tsx)

generateStaticParams from getAllLogEntries().

Page sections:
1. Breadcrumb: Log / [entry.title]
2. Header: type badge + project + date
3. Title (h1)
4. Summary (italic, lead text)
5. Content (render MDX — use next-mdx-remote/rsc for server components)
6. Back link: "← Back to Log" → /log

For MDX rendering, use next-mdx-remote:
```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
// ...
<MDXRemote source={entry.content} />
```

---

## FINAL STEP: Run npm run build

After all parts are done, run: npm run build
Fix ALL TypeScript and build errors.
Create handoff doc: docs/handoffs/2026-05-29-dna-log-sections.md

## RULES
- TypeScript strict — no `any`
- "use client" only on components that use hooks
- CSS vars for all colors
- After build passes: create handoff doc
- Report all files created and any issues fixed
