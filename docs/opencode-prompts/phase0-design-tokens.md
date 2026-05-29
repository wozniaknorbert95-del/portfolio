You are implementing Phase 0 of a world-class AI Systems Architect portfolio.
Project: Next.js 16.2.6 + React 19 + TypeScript + Tailwind v4 + Framer Motion.
Workdir: C:\Users\FlexGrafik\FlexGrafik\github\portfolio

TASK: Replace the default Next.js boilerplate with a professional dark-theme foundation.

## 1. src/app/globals.css — REPLACE entirely

Write a comprehensive globals.css with:

CSS custom properties (design tokens) on :root:
  /* Colors — dark engineering theme */
  --color-bg: #090c11;           /* near-black blue */
  --color-bg-surface: #0f1318;   /* card/surface */
  --color-bg-elevated: #161b22;  /* elevated surfaces, nav */
  --color-border: #21262d;       /* subtle borders */
  --color-border-active: #30363d;
  
  --color-text-primary: #e6edf3;
  --color-text-secondary: #8b949e;
  --color-text-muted: #484f58;
  
  --color-accent: #58a6ff;        /* electric blue */
  --color-accent-glow: #1f6feb;
  --color-accent-dim: #388bfd1a;  /* 10% accent for backgrounds */
  
  --color-green: #3fb950;
  --color-green-dim: #3fb9501a;
  --color-amber: #d29922;
  --color-amber-dim: #d299221a;
  --color-red: #f85149;
  --color-red-dim: #f851491a;
  --color-purple: #bc8cff;
  
  /* Typography */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  
  /* Spacing */
  --nav-height: 64px;
  --section-padding: clamp(4rem, 8vw, 8rem);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

Base styles:
  - html: scroll-behavior smooth
  - body: background var(--color-bg), color var(--color-text-primary), font-family var(--font-sans)
  - ::selection: background var(--color-accent-dim), color var(--color-accent)
  - Scrollbar: thin, dark track, accent thumb
  - @media prefers-reduced-motion: disable transitions/animations

Google Fonts import at top:
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

## 2. src/app/layout.tsx — REPLACE entirely

Full RootLayout with:
- metadata: title "FlexGrafik — AI Systems Architect", description "Multi-agent orchestration · Context engineering · Spec-driven development · Bounded autonomy systems", viewport, themeColor "#090c11", openGraph basics
- Import globals.css
- Nav component import (create placeholder inline if needed)
- Main content area with min-height: calc(100vh - var(--nav-height))
- Footer component import (create placeholder inline if needed)
- font-sans class on body

## 3. src/components/shared/Nav.tsx — CREATE

Professional navigation:
- Fixed top, height var(--nav-height), background var(--color-bg-elevated) with backdrop-blur
- Border-bottom: 1px solid var(--color-border)
- Left: Logo — "FG" monogram in accent color + "FlexGrafik" text
- Right links: Labs / DNA / Log (Next.js Link)
- Mobile: hamburger menu (useState toggle), full-height drawer
- Active link detection via usePathname
- Framer Motion: nav items fade-in on mount (stagger 0.05s)
- TypeScript: no any

## 4. src/components/shared/Footer.tsx — CREATE

Minimal engineering footer:
- Background var(--color-bg-elevated), border-top var(--color-border)
- Left: "© 2026 FlexGrafik — Engineering the Post-Code Era"
- Center: links: /api/ecosystem, /log/feed.json, /llms.txt (machine-readable)
- Right: "AI Systems Architect" badge in accent
- One line, padding 24px vertical

## 5. src/lib/utils.ts — CREATE

Utility functions:
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  });
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}
```

## 6. src/app/page.tsx — REPLACE with placeholder

Simple placeholder (will be replaced in Phase 1):
```tsx
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-[var(--color-text-secondary)] font-mono text-sm">
        // Phase 0 scaffold — Phase 1 coming
      </p>
    </main>
  );
}
```

## 7. tailwind.config + postcss

Check if tailwind.config.ts exists. If it's empty/default:
- Ensure content paths include src/**/*.{ts,tsx}
- No other changes needed (Tailwind v4 handles most via CSS)

## VERIFICATION
After implementing all files, run: npm run build
Fix any TypeScript errors. The build MUST pass clean.

## RULES
- TypeScript strict — no `any`
- Use CSS variables (var(--token)) for ALL colors, not hardcoded hex
- Tailwind classes only for layout/spacing, CSS vars for theming
- All interactive elements: focus-visible outline in accent color
- Comments in English
