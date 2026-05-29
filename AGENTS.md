# AGENTS — portfolio

## Projekt
Portfolio world-class dla AI Systems Architect — FlexGrafik / Norbert Wozniak.
Stack: Next.js 16.2.6, React 19, TypeScript, Tailwind v4, Framer Motion, @xyflow/react, MDX.

## Workflow
- Hermes = orchestrator (planuje, deleguje, weryfikuje)
- OpenCode = executor (implementuje komponenty, pages, API routes)
- Deploy: auto via Vercel CD na push do `main` (wyjątek od Zasady 11 — portfolio, nie produkcja)

## Zasady
1. Jeden komponent per sesja OpenCode — nie mega-diffy.
2. TypeScript strict — zero `any`.
3. Tailwind utility-first — zero inline styles, zero CSS Modules.
4. Dark theme default — CSS vars z `globals.css`.
5. Wszystkie animacje respektują `prefers-reduced-motion`.
6. Mobile-first responsive.
7. Zero secrets w plikach — .env.local dla kluczy.
8. Po każdej sesji: `npm run build` musi przejść bez błędów.

## Struktura
```
src/
  app/          — Next.js App Router pages + API routes
  components/   — React components (ui/, home/, labs/, dna/, log/, shared/)
  content/      — MDX files (labs/, dna/, log/)
  data/         — static JSON data (ecosystem, methodology graph)
  lib/          — utilities, helpers, content loaders
public/
  ecosystem.json  — machine-readable manifest (agent-first)
  llms.txt        — LLM agent discovery file
```

## Design tokens
Źródło prawdy: `src/app/globals.css` — CSS custom properties.
Nie duplikuj wartości. Importuj z tokenów.

## Testy
- `npm run build` — wymagany przed każdym commitem
- TypeScript: `npx tsc --noEmit`

## Handoff
Każda sesja OpenCode kończy się plikiem `docs/handoffs/YYYY-MM-DD-[feature].md`.
