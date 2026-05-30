# Handoff: SEO JSON-LD + Dynamic Sitemap

## Scope
Opcja D z sesji wyboru — rozbudowa SEO foundations dla live portfolio.

## Zmiany

### 1. Sitemap (`src/app/sitemap.ts`)
- Dodano `/log/feed.json` i `/log/feed.xml` jako statyczne routes (priority 0.4, daily)

### 2. Root Layout JSON-LD (`src/app/layout.tsx`)
- Dodano `WebSite` schema z `SearchAction` (Sitelinks Searchbox) — target: `/log?q={search_term_string}`

### 3. Log Entry Pages (`src/app/log/[slug]/page.tsx`)
- `generateMetadata`: title, description, authors, OG (article + publishedTime + tags)
- `TechArticle` JSON-LD: headline, datePublished, author, publisher, about→SoftwareApplication, articleSection, genre

### 4. DNA Pillar Pages (`src/app/dna/[pillar]/page.tsx`)
- `generateMetadata`: title, description, OG
- `TechArticle` JSON-LD: headline, description, author, publisher, about, genre: Engineering Methodology

### 5. Labs Project Pages (`src/app/labs/[slug]/page.tsx`)
- Rozszerzony `generateMetadata`: title, description, authors, OG
- `SoftwareApplication` JSON-LD: name, description, applicationCategory, codeRepository, programmingLanguage, softwareVersion, datePublished, applicationSubCategory

## Schema.org Coverage
| Page | Schema |
|---|---|
| / | Person + WebSite (SearchAction) |
| /log/[slug] | TechArticle |
| /dna/[pillar] | TechArticle |
| /labs/[slug] | SoftwareApplication |

## Weryfikacja
- `npm run build` ✅ 45/45 pages, TypeScript clean
- Sitemap dynamiczny obejmuje: static routes + 8 labs + 5 dna pillars + 9 log entries + 2 feeds

## Next Steps
- Opcja A (Polish) lub B (Content) — w zależności od priorytetów
