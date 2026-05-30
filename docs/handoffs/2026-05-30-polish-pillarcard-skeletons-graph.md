# Handoff: Polish — PillarCard Hover, Skeletons, Mobile Graph Overflow

## Scope
Opcja A z sesji wyboru — UX refinements w sekcji DNA + reusable skeleton system.

## Zmiany

### 1. Skeleton UI System
- `src/app/globals.css`: `@keyframes skeleton-shimmer`, klasy `.skeleton` i `.skeleton-shimmer`
- `src/components/ui/Skeleton.tsx`: nowy komponent z 3 eksportami:
  - `Skeleton` — base shimmer block (parametry: `className`, `shimmer`)
  - `SkeletonText` — multi-line text placeholder (parametry: `lines`, `className`, `lineClassName`, `shimmer`)
  - `SkeletonCard` — card-shaped skeleton z headerem i footerem (parametry: `header`, `lines`, `className`, `shimmer`)
- Animacja automatycznie wyłączona przez `prefers-reduced-motion` (globals.css media query ustawia `animation-duration: 0.01ms`)

### 2. PillarCard Hover Refactor
- `src/components/dna/PillarCard.tsx`:
  - Usunięto `onMouseEnter`/`onMouseLeave` inline handlers + `style.transform`
  - Zastąpione Tailwind utility: `hover:border-[var(--color-accent)] hover:-translate-y-0.5 transition-all duration-150`
  - Wszystkie inline `style={{ color: ... }}` zamienione na `text-[var(--color-...)]`
  - Border top zamienione na `border-t border-[var(--color-border)]`
  - `prefers-reduced-motion` respektowane globalnie

### 3. MethodologyGraph Mobile Overflow Fix
- `src/components/dna/MethodologyGraph.tsx`:
  - Dodano `overflow-x-auto` wrapper
  - Wewnętrzny container ma `min-w-[600px]` — zapobiega page-level horizontal overflow na mobile
  - Graf pozostaje interaktywny, scrolluje w poziomie wewnątrz własnego kontenera

## Weryfikacja
- `npm run build` ✅ 45/45 pages, TypeScript clean

## Files Changed
| File | Action |
|---|---|
| `src/app/globals.css` | + skeleton keyframes i klasy |
| `src/components/ui/Skeleton.tsx` | Nowy komponent |
| `src/components/dna/PillarCard.tsx` | Refaktoryzacja hover + inline styles |
| `src/components/dna/MethodologyGraph.tsx` | Mobile overflow wrapper |
