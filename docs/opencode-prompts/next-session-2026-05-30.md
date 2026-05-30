# Next Session Prompt — 2026-05-30 (post-strategy)

## Stan

- **Branch**: `master` clean, 3 commity dzisiaj (SEO JSON-LD + Polish + Log entry)
- **Build**: 47/47 pages, TypeScript clean, Vercel live
- **KF**: KF 1,3,4,5 ✅ | KF-2 🔴 blocked (VPS) | LinkedIn 🟡 blocked
- **Strategia B2B**: ZATWIERDZONA. Plik: `docs/strategy/B2B-SMB-AUTOMATION-STRATEGY-EN.md`

## Decyzje strategiczne (zamrożone do odwołania)

1. **One product**: AI Lead Qualification ("Inbox Killer") — €497 setup + €147/mo, 48h delivery
2. **14-day freeze**: Websites, e-commerce, complex builds. Tylko Inbox Killer.
3. **Portfolio sacred**: `portfolio.flexgrafik.nl` zero zmian pod ZZP/SMB.
4. **Language**: English dla wszystkich B2B assets.
5. **Domain**: `services.flexgrafik.nl` (subdomain, osobny asset).
6. **Track 3 protection**: Track 4 nie zjada godzin Track 3.

## Priorytet #1: 72-Hour Validation Test

**NIE PISZ KODU. Nie buduj landing page. Czysta walidacja.**

1. User pisze ONE LinkedIn post (ręcznie) i DM do 5 friendly business owners
2. Treść: *"Your inbox is 80% noise. I built an AI system that clears the clutter in 48 hours and surfaces only the leads that matter. First 5 demos are free. DM me 'INBOX' and I'll show you your own data."*
3. Czeka 72h, liczy demo requesty
4. **≥3 demos** → Phase 2 (budowa template + landing page)
5. **<3 demos** → Pivot messaging lub KFA-only

**KFA meeting**: 6 czerwca. Single-product proposal (Inbox Killer only). Jeśli user chce przygotować 1-pager na spotkanie — to jest scoped task.

## Opcje następnej sesji (user wybiera)

### A) Build — Inbox Killer MVP (Tylko jeśli 72h test = ✅)
- Make/Zapier workflow template + jadzia-core LLM classification
- Simple dashboard: hot leads queue, noise score, daily summary
- Landing page: `services.flexgrafik.nl` — hero + product + pricing + CTA

### B) Content — Portfolio log entries
- Nowe MDX w `src/content/log/` (auto-timeline, auto-sitemap, auto-JSON-LD)
- Tematy: Agent OS Phase 5 details, jadzia-core Stage 2, Flex-VCMS scan ritual

### C) Infrastructure — Portfolio polish
- KF-2: Live Health Strip (wymaga publicznych VPS endpoints)
- OG image per `/dna/[pillar]` i `/labs/[slug]`
- LinkedIn CTA w Footer/Hero (gdy URL odblokowany)

### D) Strategy — KFA meeting prep
- 1-pager visual proposal dla Inbox Killer
- Demo-ready workflow (test na własnym inboxie)
- Objection handling script (price, trust, product fit)

## Start command

```bash
git status; npm run build
```

## Zasada

`npm run build` przed każdym commitem. TypeScript strict, zero `any`.
