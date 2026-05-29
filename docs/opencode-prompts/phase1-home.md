You are implementing the HOME page for a world-class AI Systems Architect portfolio.
Project workdir: C:\Users\FlexGrafik\FlexGrafik\github\portfolio
Stack: Next.js 16.2.6, React 19, TypeScript, Tailwind v4, Framer Motion 12, CSS custom properties.
All colors use CSS vars (var(--color-*)) — never hardcode hex values.

DESIGN VISION: Dark, engineering-grade. No flashy colors. Confident and minimal.
Think: GitHub's dark mode meets a mission control dashboard.

---

## TASK: Implement HOME page (src/app/page.tsx) with 4 sections

### SECTION 1: Hero

Full-viewport hero section. Contents:

**Top badge** (small, above headline):
  Pill badge: "AI Systems Architect · Agentic Engineering"
  Style: border 1px var(--color-border-active), text var(--color-text-secondary), font-mono text-xs, padding 4px 12px, rounded-full
  Framer Motion: fade-in from opacity 0, y 20 → y 0, delay 0.1s

**Headline** (h1):
  Line 1: "I don't write code"
  Line 2 (accent): "anymore."
  Line 3: "I engineer systems"
  Line 4 (accent): "that think."
  
  Style: font-size clamp(3rem, 8vw, 6rem), font-weight 700, line-height 1.05
  Line 1+3: color var(--color-text-primary)
  Line 2+4 "anymore." and "that think.": color var(--color-accent) — electric blue
  Framer Motion: each line animates in sequence (stagger 0.15s), from opacity 0 y 30 → opacity 1 y 0

**Subheadline** (p):
  "Multi-agent orchestration · Context engineering · Spec-driven development · Bounded autonomy systems"
  Style: color var(--color-text-secondary), font-size 1.1rem, max-width 560px, margin-top 1.5rem
  Framer Motion: fade in after headline, delay 0.8s

**CTA buttons** (div, flex gap-4, margin-top 2.5rem):
  Primary: "Explore the Ecosystem" → href="/labs"
    Style: background var(--color-accent), color #090c11 (dark text on blue), padding 12px 24px, rounded var(--radius-md), font-weight 600, hover: brightness 110%
  Secondary: "Read the DNA" → href="/dna"
    Style: border 1px var(--color-border-active), color var(--color-text-primary), padding 12px 24px, rounded var(--radius-md), hover: border-color var(--color-accent), color var(--color-accent)
  Framer Motion: fade in with CTAs delay 1.0s

**Layout**: centered column, min-height 100svh, padding top var(--nav-height), justify-center, align-center text-center

---

### SECTION 2: AgentFlow (animated pipeline visualization)

A horizontal flow showing: Planner → Coder → Tester → Reviewer → Summarizer
This is the Agent OS pipeline — the crown jewel of the portfolio.

**Container**: max-width 900px, centered, padding 80px 0, border-top 1px var(--color-border)

**Section label** (above flow):
  "// agent-os pipeline · production"
  Style: font-mono, text-xs, color var(--color-text-muted), margin-bottom 2rem, text-center

**Node design** (5 nodes):
  Each node: 
  - Container: width 120px, display flex flex-col align-center gap-8px
  - Circle: width 56px, height 56px, rounded-full, border 1px var(--color-border-active)
  - Background: var(--color-bg-elevated)
  - Icon: lucide-react icon (BrainCircuit, Code2, TestTube, UserCheck, FileText)
  - Icon color: var(--color-accent)
  - Label below: font-mono text-xs, color var(--color-text-secondary)

  Node labels: "Planner", "Coder", "Tester", "Reviewer\n(HITL)", "Summarizer"

**Arrows between nodes** (4 arrows):
  Use SVG animated arrow lines between nodes.
  Arrow: dashed line with animated dash-offset (moving dots/dashes left to right)
  Color: var(--color-accent), opacity 0.6
  Animation: CSS animation dashMove 2s linear infinite

  CSS for animated dash:
  @keyframes dashMove { to { stroke-dashoffset: -20; } }

**HITL Badge** on Reviewer node:
  Small badge above the circle: "HITL" 
  Style: background var(--color-accent-dim), color var(--color-accent), font-mono text-[10px], padding 2px 6px, rounded-full

**Framer Motion**:
  - Container: fade-in + slide up when in view (useInView, once: true)
  - Each node: stagger animate in (0.1s per node)
  - Arrows: fade in after nodes

**Implementation note**: 
  Create this as src/components/home/AgentFlow.tsx
  For the arrows, use a simple div with CSS border-top dashed and the animation.
  Or use an SVG with animated strokeDashoffset.
  Keep it clean — if SVG is complex, use a simple CSS approach.

---

### SECTION 3: MetricsStrip (live system metrics)

A horizontal strip showing ecosystem health and scale.
Source data from: /public/ecosystem.json (read at build time via import or fetch)

**Container**: 
  Background: var(--color-bg-elevated)
  Border-top + border-bottom: 1px solid var(--color-border)
  Padding: 32px 0

**4 metrics** (flex row, justify-center, gap 64px, flex-wrap):

  1. "8" + "systems in production"
  2. "5" + "engineering patterns"  
  3. "2 yrs" + "production experience"
  4. "0" + "autonomous deploys"  ← This is the bold one. Shows "0" auto-deploys (Zasada 11 = manual only)

  Each metric:
  - Number/value: font-size 2.5rem, font-weight 700, color var(--color-accent), font-mono
  - Label: font-size 0.85rem, color var(--color-text-secondary), margin-top 4px

  Last metric "0 autonomous deploys": 
  - Number color: var(--color-green) — green zero = intentional restraint
  - Add small "(Zasada 11)" in muted text below

**Framer Motion**: 
  Each metric counts up from 0 to final value on scroll-into-view (useInView)
  Use a simple counter animation with useState + useEffect

  Create as src/components/home/MetricsStrip.tsx

---

### SECTION 4: ThreePillars (teaser for DNA section)

3 cards teasing the methodology DNA section.

**Section header**: 
  "Engineering DNA"
  Subtitle: "Not a methodology borrowed from a book. Built through production failures."

**3 Cards** (grid 3 cols on desktop, 1 col mobile):

  Card 1 — Context Architecture:
    Icon: BrainCircuit (lucide)
    Title: "Context Architecture"
    Body: "SESSION-ANCHOR, brain.md, AGENTS.md — every repo has a compressed state map that agents can load cold."
    Link: "Explore →" → href="/dna/context-architecture"

  Card 2 — Bounded Autonomy:
    Icon: ShieldCheck (lucide)
    Title: "Bounded Autonomy"
    Body: "AI executes. Human decides. HITL gates at every production boundary. Zasada 11: zero autonomous deploys."
    Link: "Explore →" → href="/dna/bounded-autonomy"
    Badge: "Enterprise-Ready" (small accent badge)

  Card 3 — Spec-Driven:
    Icon: FileCode (lucide)
    Title: "Spec-Driven Development"
    Body: "todo.json as executable spec. Verification before deploy. Specs are contracts, not suggestions."
    Link: "Explore →" → href="/dna/spec-driven"

  Card style:
    Background: var(--color-bg-surface)
    Border: 1px solid var(--color-border)
    Padding: 32px
    Radius: var(--radius-lg)
    Hover: border-color var(--color-accent), transform translateY(-2px), transition 250ms
    Icon: 32px, color var(--color-accent), margin-bottom 16px
    Title: font-size 1.25rem, font-weight 600, color var(--color-text-primary)
    Body: color var(--color-text-secondary), font-size 0.9rem, margin-top 8px, line-height 1.6
    Link: color var(--color-accent), font-size 0.875rem, margin-top 16px, hover underline

  Create as src/components/home/ThreePillars.tsx

---

## ASSEMBLY in src/app/page.tsx

```tsx
import Hero from '@/components/home/Hero'
import AgentFlow from '@/components/home/AgentFlow'
import MetricsStrip from '@/components/home/MetricsStrip'
import ThreePillars from '@/components/home/ThreePillars'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AgentFlow />
      <MetricsStrip />
      <ThreePillars />
    </main>
  )
}
```

Create src/components/home/Hero.tsx for the hero section.
Create src/components/home/AgentFlow.tsx for the pipeline.
Create src/components/home/MetricsStrip.tsx for metrics.
Create src/components/home/ThreePillars.tsx for the 3 cards.

---

## RULES
- TypeScript strict — no `any`
- "use client" only on components that use hooks/animations (Framer Motion requires it)
- Use Next.js Link for all internal navigation
- All colors: CSS vars only
- prefers-reduced-motion: wrap all Framer Motion in `const prefersReducedMotion = useReducedMotion()` — if true, skip animations
- After all files created: run `npm run build` — must pass with zero errors

## VERIFICATION
Run npm run build. Fix all TypeScript errors before finishing.
Report: which files created, any issues found and fixed.
