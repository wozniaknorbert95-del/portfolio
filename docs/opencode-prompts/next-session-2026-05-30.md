# Next Session Prompt — 2026-05-30

## Stan

- **Branch**: `master` clean, zpushowany na origin (2 commity dzisiaj)
- **Build**: 45/45 pages, TypeScript clean, Vercel live
- **Feature-complete**: KF 1,3,4,5 ✅ | KF-2 🔴 blocked (VPS) | LinkedIn URL 🟡 blocked
- **CI/CD**: Vercel auto-deploy on push, GitHub Actions CI pass

## Zaległości szybkie (1 minuta każda gdy odblokowane)

1. **LinkedIn custom URL** — jeśli ustawiony: `Hero.tsx:127` + `Footer.tsx:55` zmienić URL
2. **Więcej log entries** — dodać MDX do `src/content/log/` → timeline automatycznie zyska entries

## Opcje następnej sesji

### A) Polish / UX micro
- Hover states na `PillarCard` (teraz brak interakcji)
- Loading state / skeleton dla EcosystemGraph / MethodologyGraph
- OG image per `/dna/[pillar]` (teraz tylko ogólna)
- Mobile: MethodologyGraph overflow na małych ekranach

### B) Content
- 2-3 nowe log entries (projekty z 0 entries: `flexgrafik-meta`, może `agent-os-ui` więcej)
- Więcej handoff docs w `docs/handoffs/` — portfolio jako living dokument

### C) Infrastructure
- KF-2: Live Health Strip — wymaga publicznych health endpoints z VPS
  - `agent-os` :8080/health, `agent-os-ui` :3000/health — czy są dostępne z internetu?
  - Jeśli tak: nowy komponent + API route `/api/health` + section na homepage

### D) Exploration
- `/api` discovery endpoints — czy `llms.txt` i `ecosystem.json` są discoverable przez AI agents?
- SEO: sitemap dynamiczny, structured data JSON-LD

## Start command

```bash
# verify state
git status && npm run build
```

## Zasada

`npm run build` musi przejść przed każdym commitem. TypeScript strict, zero `any`.
