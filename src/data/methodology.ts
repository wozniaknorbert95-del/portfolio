export interface Pillar {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  icon: string;
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
