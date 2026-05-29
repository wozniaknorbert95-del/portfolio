You are implementing the LABS section of a world-class AI Systems Architect portfolio.
Project workdir: C:\Users\FlexGrafik\FlexGrafik\github\portfolio
Stack: Next.js 16.2.6, React 19, TypeScript, Tailwind v4, @xyflow/react 12, Framer Motion 12.
All colors use CSS vars. Ecosystem data: public/ecosystem.json (already populated with 8 projects).

---

## TASK 1: /api/ecosystem route

Create src/app/api/ecosystem/route.ts:
```typescript
import { NextResponse } from 'next/server';
import ecosystem from '../../../../public/ecosystem.json';

export async function GET() {
  return NextResponse.json(ecosystem, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
```

---

## TASK 2: src/data/ecosystem.ts — typed data layer

Create src/data/ecosystem.ts:
```typescript
import ecosystemJson from '../../public/ecosystem.json';

export interface Project {
  id: string;
  name: string;
  slug: string;
  role: string;
  description: string;
  status: 'production' | 'staging' | 'development';
  stack: string[];
  stack_layer: string;
  port: number | null;
  health_url: string | null;
  repo: string;
  key_files: string[];
  guardrails: string[];
  highlights: string[];
  last_handoff: string;
}

export interface EngineeringPattern {
  id: string;
  name: string;
  description: string;
}

export interface Ecosystem {
  version: string;
  generated: string;
  owner: {
    name: string;
    alias: string;
    role: string;
    specialization: string[];
    experience: string;
    location: string;
    github: string;
    portfolio: string;
  };
  ecosystem: {
    description: string;
    meta_repo: string;
    orchestrator: string;
    program_office: string;
  };
  projects: Project[];
  engineering_patterns: EngineeringPattern[];
}

export const ecosystem = ecosystemJson as Ecosystem;
export const projects = ecosystem.projects;
export const patterns = ecosystem.engineering_patterns;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getStatusColor(status: Project['status']): string {
  switch (status) {
    case 'production': return 'var(--color-green)';
    case 'staging': return 'var(--color-amber)';
    case 'development': return 'var(--color-text-muted)';
  }
}

export function getStatusLabel(status: Project['status']): string {
  switch (status) {
    case 'production': return 'PROD';
    case 'staging': return 'STAGING';
    case 'development': return 'DEV';
  }
}
```

---

## TASK 3: /labs page with React Flow ecosystem graph

Create src/app/labs/page.tsx:

Page structure:
1. Page header section:
   - Eyebrow: "// labs · ecosystem"
   - Title: "The Ecosystem"
   - Subtitle: "8 projects. One coherent system. Each node is a production component."
   Style: same pattern as HOME sections, padding-top calc(var(--nav-height) + 4rem), text-center

2. React Flow graph component (EcosystemGraph)

3. Below graph: "Project List" — grid of ProjectCard components (fallback for mobile, also works as overview)

### EcosystemGraph component (src/components/labs/EcosystemGraph.tsx)

IMPORTANT: React Flow requires "use client".

Node layout (positions, hardcoded for visual clarity):
  Use this layout — governance at top, products in middle, infra at bottom:
  
  flexgrafik-meta:   x: 350, y: 50    (governance, center-top)
  workflow:          x: 650, y: 50    (governance, right-top)
  flex-vcms:         x: 200, y: 220   (orchestration, left)
  agent-os:          x: 450, y: 220   (orchestration, center)
  agent-os-ui:       x: 450, y: 390   (ui, center — below agent-os)
  zzpackage:         x: 100, y: 390   (product, left)
  app-flexgrafik:    x: 700, y: 390   (product, right)
  jadzia-core:       x: 700, y: 220   (ai-backend, right)

Edges (data flows / dependencies):
  flexgrafik-meta → flex-vcms (type: "smoothstep", label: "governs")
  flexgrafik-meta → agent-os (type: "smoothstep", label: "governs")
  flex-vcms → agent-os (type: "smoothstep", label: "orchestrates")
  agent-os → agent-os-ui (type: "smoothstep", label: "drives UI")
  workflow → agent-os (type: "smoothstep", label: "backlog")
  jadzia-core → agent-os (type: "smoothstep", label: "LLM backend")

Custom node component (inline in EcosystemGraph.tsx):
  Width: 160px
  Background: var(--color-bg-elevated)
  Border: 1px solid var(--color-border)
  Border-radius: var(--radius-md)
  Padding: 12px 16px
  On hover: border-color var(--color-accent)
  
  Content:
  - Top: status dot (8px circle, colored by status) + status text (font-mono, text-[10px])
  - Middle: project name (font-weight 600, font-size 0.85rem, color var(--color-text-primary))
  - Bottom: role text (font-size 0.7rem, color var(--color-text-secondary), 2-line max)
  
  Stack layer badge at bottom (font-mono text-[9px], color var(--color-text-muted)):
  orchestration → "[orchestration]"
  product → "[product]"
  ui → "[ui]"
  ai-backend → "[ai-backend]"
  governance → "[governance]"

  When clicked: navigate to /labs/[slug]

React Flow wrapper:
  Height: 520px on desktop (500px on mobile → show list instead)
  Background: transparent
  Controls: show (bottom-left)
  MiniMap: hidden (too cluttered)
  Fit view on init
  
  Edge style: stroke var(--color-border-active), strokeWidth 1.5
  Edge label style: font-mono text-[10px], color var(--color-text-muted), background var(--color-bg)

  IMPORTANT for Next.js SSR: Wrap the entire ReactFlow in a div and use dynamic import or check typeof window. ReactFlow needs "use client" and will fail SSR.
  
  Actually — since the component already has "use client", it's fine. Just make sure the parent page doesn't have SSR issues.

### ProjectCard component (src/components/labs/ProjectCard.tsx)

Used in the grid below the graph.

Props: project: Project

Design:
  Background: var(--color-bg-surface)
  Border: 1px solid var(--color-border)
  Padding: 24px
  Radius: var(--radius-md)
  Hover: border-color var(--color-border-active), translateY -2px

Content:
  Top row: status badge + stack_layer tag
  Title: project.name (font-size 1.1rem, font-weight 600)
  Description: project.role (color var(--color-text-secondary), font-size 0.875rem)
  Stack pills: first 3 stack items (font-mono text-xs, background var(--color-accent-dim), color var(--color-accent), padding 2px 8px, rounded-full)
  Bottom: "View details →" link in accent color

Status badge:
  PROD: green background (var(--color-green-dim)), green text
  STAGING: amber background, amber text
  DEV: muted

Wrap entire card in Next.js Link to /labs/[project.slug]

---

## TASK 4: /labs/[slug] project detail page

Create src/app/labs/[slug]/page.tsx:

Static params:
```typescript
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

Page sections:
1. Breadcrumb: "Labs / [project.name]"
2. Header: name, role, status badge, last_handoff date
3. Description block
4. Stack pills (all of them)
5. "Highlights" section: bullet list of project.highlights
6. "Guardrails" section: bullet list of project.guardrails with a shield icon per item
7. "Key Files" section: monospaced list of key files
8. Back link: "← Back to Ecosystem" → /labs

Style: single-column, max-width 720px, centered, generous padding.
Section labels: font-mono text-xs color var(--color-text-muted), uppercase, margin-bottom 12px.
Content: color var(--color-text-secondary).

---

## RULES
- TypeScript strict — no `any`  
- React Flow nodes must be memoized (useMemo for nodes/edges arrays)
- "use client" on EcosystemGraph and ProjectCard (if it uses hover state)
- After all files created: run `npm run build` — must pass with zero errors
- Create handoff doc: docs/handoffs/2026-05-29-labs-section.md

## VERIFICATION
Run npm run build. Fix all errors. Report files created and any issues fixed.
