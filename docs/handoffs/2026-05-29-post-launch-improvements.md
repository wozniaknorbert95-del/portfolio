# Handoff: Post-Launch Improvements

**Date**: 2026-05-29
**Session**: Cascade — post-launch quality pass (plan `portfolio-improvements-33edd9.md` + 2 follow-up sessions)
**Commits**: `498688b` → `38bd3e8` (5 commits on master)

---

## Files Modified

| File | Change |
|------|--------|
| `src/components/labs/EcosystemGraph.tsx` | Edge stroke `#58a6ff40`, label fill `--color-text-secondary` |
| `src/app/globals.css` | Added `.prose-custom` block (97 lines) — MDX styling for log entries |
| `src/app/log/page.tsx` | RSS/JSON `<span>` → working `<a href>` links |
| `src/components/log/LogList.tsx` | Dead code removed (`type === 'ALL' ? type : type` → `{type}`) |
| `src/components/home/Hero.tsx` | LinkedIn CTA link added below main buttons |
| `src/components/shared/Footer.tsx` | GitHub + LinkedIn links added (right side) |

## Files Created

| File | Purpose |
|------|---------|
| `src/app/opengraph-image.tsx` | OG image for root — dark bg, name, title, tags |
| `src/app/labs/[slug]/opengraph-image.tsx` | OG per project — role, name, description, stack |
| `src/app/dna/[pillar]/opengraph-image.tsx` | OG per pillar — title, tagline, key points |
| `src/app/log/[slug]/opengraph-image.tsx` | OG per log entry — type badge, project, title, summary |
| `src/content/log/2026-05-01-jadzia-core-llm-gateway.mdx` | LOG: LLM Gateway (FEAT) |
| `src/content/log/2026-05-05-zzpackage-ssot-guard.mdx` | LOG: SSoT Guard (ARCH) |
| `src/content/log/2026-05-08-workflow-program-office.mdx` | LOG: Program Office (ARCH) |
| `src/content/log/2026-05-12-agent-os-ui-launch.mdx` | LOG: Mission Control launch (DEPLOY) |
| `src/content/log/2026-05-15-app-flexgrafik-advergame.mdx` | LOG: Canvas Engine (FEAT) |
| `src/content/log/2026-05-18-vcms-conflict-detection.mdx` | LOG: Conflict Detection (FEAT) |

## Key Decisions

- **OG images**: `runtime = 'edge'` removed from dynamic routes (`labs/[slug]`, `dna/[pillar]`, `log/[slug]`) — incompatible with `generateStaticParams`. Root stays edge.
- **prose-custom**: Vanilla CSS in `globals.css`, not Tailwind `prose` plugin — keeps zero dependencies, full control over dark theme tokens.
- **LinkedIn URL**: `https://www.linkedin.com/in/norbert-wozniak-172b76367/` — used in Hero + Footer. Update to custom slug once set.
- **Log entries**: 3 → 9 total (6 new covering May 2026 ecosystem milestones)

## Build

`npm run build` — ✅ 45/45 pages (up from 36). TypeScript clean.

---

## Pending (next sessions)

| Task | Plan file | Priority |
|------|-----------|----------|
| Log teaser section on homepage (3 recent entries + CTA) | — | 🟡 medium |
| `generateMetadata` for `/log` and `/dna` list pages | — | 🟡 medium |
| LinkedIn profile overhaul (browser-use script ready) | `linkedin-dual-identity-strategy-7dde27.md` | 🟡 medium |
| Handoff Timeline component (KF-3) | — | 🔵 large, separate session |
| LinkedIn custom URL update in portfolio code | — | 🟢 quick (1 line) once URL is set |

## LinkedIn Automation

Script ready at `c:\Users\FlexGrafik\FlexGrafik\linkedin-updater\update_linkedin.py`.
Requires new `GOOGLE_API_KEY` in `.env` (previous key was shared in chat — regenerate).
Run: `python update_linkedin.py` from that directory.
