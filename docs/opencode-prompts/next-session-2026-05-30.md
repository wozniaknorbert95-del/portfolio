# Next Session Prompt — 2026-05-30 (post-build)

## Stan

- **Branch**: `master` clean, 4 commity dzisiaj (SEO JSON-LD + Polish + Log entry + Services landing page)
- **Portfolio build**: 47/47 pages, TypeScript clean, Vercel live
- **Services build**: 4/4 pages, TypeScript clean, **NOT deployed yet**
- **KF**: KF 1,3,4,5 ✅ | KF-2 🔴 blocked (VPS) | LinkedIn 🟡 blocked
- **Strategia B2B**: ZATWIERDZONA. Plik: `docs/strategy/B2B-SMB-AUTOMATION-STRATEGY-EN.md`
- **Services landing page**: Built locally. Plik: `docs/handoffs/2026-05-30-services-landing-page.md`

## Decyzje strategiczne (zamrożone do odwołania)

1. **One product**: AI Lead Qualification ("Inbox Killer") — €497 setup + €147/mo, 48h delivery
2. **14-day freeze**: Websites, e-commerce, complex builds. Tylko Inbox Killer.
3. **Portfolio sacred**: `portfolio.flexgrafik.nl` zero zmian pod ZZP/SMB.
4. **Language**: English dla wszystkich B2B assets.
5. **Domain**: `services.flexgrafik.nl` (subdomain, osobny asset).
6. **Track 3 protection**: Track 4 nie zjada godzin Track 3.

## Priorytet #1: 72-Hour Validation Test (USER robi to ręcznie)

**NIE PISZ KODU. Nie buduj landing page. Czysta walidacja.**

1. User pisze ONE LinkedIn post (ręcznie) i DM do 5 friendly business owners
2. Treść: *"Your inbox is 80% noise. I built an AI system that clears the clutter in 48 hours and surfaces only the leads that matter. First 5 demos are free. DM me 'INBOX' and I'll show you your own data."*
3. Czeka 72h, liczy demo requesty
4. **≥3 demos** → Phase 2 (budowa Inbox Killer template)
5. **<3 demos** → Pivot messaging lub KFA-only

**KFA meeting**: 6 czerwca (6 dni). Single-product proposal (Inbox Killer only).

## Opcje następnej sesji (user wybiera)

### A) Deploy — services.flexgrafik.nl na Vercel
- Nowy projekt Vercel dla folderu `services/`
- Skonfigurować subdomain `services.flexgrafik.nl` w DNS
- Production deploy
- Dodać `robots.ts`, `sitemap.ts`, OG image

### B) KFA Meeting Prep
- 1-pager visual proposal (Inbox Killer + Modernization)
- Demo-ready workflow (test na własnym inboxie)
- Objection handling script (price, trust, product fit)
- Landing page może być pokazane KFA jako "live proof"

### C) Build — Inbox Killer MVP (Tylko jeśli 72h test = ✅)
- Make/Zapier workflow template + jadzia-core LLM classification
- Simple dashboard: hot leads queue, noise score, daily summary
- Wymaga dostępu do Make/Zapier + Gmail/Outlook API

### D) Portfolio Polish
- New log entries: Agent OS Phase 5 deep dive, jadzia-core Stage 2
- OG images per dynamic route
- KF-2 Health Strip (gdy VPS endpoints publiczne)

## Start command

```bash
# verify both projects
cd services; npm run build; cd ..
npm run build
```

## Zasada

`npm run build` przed każdym commitem. TypeScript strict, zero `any`.
