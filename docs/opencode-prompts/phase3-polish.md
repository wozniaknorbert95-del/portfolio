You are implementing Phase 3 (Polish) of a world-class AI Systems Architect portfolio.
Project workdir: C:\Users\FlexGrafik\FlexGrafik\github\portfolio
Stack: Next.js 16.2.6, React 19, TypeScript, Tailwind v4.

This phase adds: RSS feed, /api/status, sitemap.xml, robots.txt, JSON-LD, and metadata.

---

## TASK 1: RSS Feed (src/app/log/feed.xml/route.ts)

```typescript
import { getAllLogEntries } from '@/lib/log';

export async function GET() {
  const entries = getAllLogEntries().slice(0, 20);
  const baseUrl = 'https://portfolio.flexgrafik.nl';
  
  const items = entries.map((entry) => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${baseUrl}/log/${entry.slug}</link>
      <guid isPermaLink="true">${baseUrl}/log/${entry.slug}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <category>${entry.type}</category>
      <description><![CDATA[${entry.summary}]]></description>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FlexGrafik — Operating Journal</title>
    <link>${baseUrl}/log</link>
    <description>AI Systems Architect operating journal — generated from git history and handoff docs.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/log/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

Also create src/app/log/feed.json/route.ts — alias that forwards to /api/log:
```typescript
import { getAllLogEntries } from '@/lib/log';

export async function GET() {
  const entries = getAllLogEntries().slice(0, 20).map(({ content: _, ...rest }) => rest);
  return Response.json(
    { entries, total: entries.length, generated: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
```

---

## TASK 2: /api/status health aggregator (src/app/api/status/route.ts)

```typescript
import { NextResponse } from 'next/server';
import { projects } from '@/data/ecosystem';

interface SystemStatus {
  id: string;
  name: string;
  status: 'operational' | 'unknown' | 'degraded';
  last_checked: string;
  health_url: string | null;
}

export async function GET() {
  const now = new Date().toISOString();
  
  const statuses: SystemStatus[] = projects.map((project) => ({
    id: project.id,
    name: project.name,
    status: project.status === 'production' ? 'operational' : 'unknown',
    last_checked: now,
    health_url: project.health_url,
  }));

  const operational = statuses.filter((s) => s.status === 'operational').length;
  
  return NextResponse.json(
    {
      systems: statuses,
      summary: {
        total: statuses.length,
        operational,
        degraded: 0,
        unknown: statuses.length - operational,
      },
      generated: now,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
```

---

## TASK 3: Sitemap (src/app/sitemap.ts)

```typescript
import { MetadataRoute } from 'next';
import { projects } from '@/data/ecosystem';
import { pillars } from '@/data/methodology';
import { getAllLogEntries } from '@/lib/log';

const baseUrl = 'https://portfolio.flexgrafik.nl';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/labs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/dna`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/log`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  const labsRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/labs/${p.slug}`,
    lastModified: new Date(p.last_handoff),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const dnaRoutes: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: `${baseUrl}/dna/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const logRoutes: MetadataRoute.Sitemap = getAllLogEntries().map((e) => ({
    url: `${baseUrl}/log/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: 'never' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...labsRoutes, ...dnaRoutes, ...logRoutes];
}
```

---

## TASK 4: robots.txt (src/app/robots.ts)

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: 'https://portfolio.flexgrafik.nl/sitemap.xml',
    host: 'https://portfolio.flexgrafik.nl',
  };
}
```

---

## TASK 5: JSON-LD + improved metadata in layout.tsx

Update src/app/layout.tsx to add:

1. Better metadata export:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.flexgrafik.nl'),
  title: {
    default: 'FlexGrafik — AI Systems Architect',
    template: '%s | FlexGrafik',
  },
  description: 'Norbert Wozniak — AI Systems Architect. Multi-agent orchestration, context engineering, spec-driven development, bounded autonomy systems. 2 years of production AI systems.',
  keywords: ['AI Systems Architect', 'multi-agent orchestration', 'context engineering', 'LangGraph', 'agentic engineering', 'bounded autonomy', 'spec-driven development'],
  authors: [{ name: 'Norbert Wozniak', url: 'https://portfolio.flexgrafik.nl' }],
  creator: 'Norbert Wozniak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio.flexgrafik.nl',
    siteName: 'FlexGrafik — AI Systems Architect',
    title: 'FlexGrafik — AI Systems Architect',
    description: 'Multi-agent orchestration · Context engineering · Spec-driven development · Bounded autonomy systems',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlexGrafik — AI Systems Architect',
    description: 'Multi-agent orchestration · Context engineering · Spec-driven development',
    creator: '@flexgrafik',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
```

2. Add JSON-LD script inside the body (before closing), as a <script> tag:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Norbert Wozniak',
  alternateName: 'FlexGrafik',
  url: 'https://portfolio.flexgrafik.nl',
  jobTitle: 'AI Systems Architect',
  description: 'AI Systems Architect specializing in multi-agent orchestration, context engineering, spec-driven development, and bounded autonomy systems.',
  knowsAbout: [
    'Multi-agent orchestration',
    'Context engineering',
    'LangGraph',
    'FastAPI',
    'Next.js',
    'Spec-driven development',
    'Bounded autonomy',
    'AI systems architecture',
  ],
  sameAs: ['https://github.com/FlexGrafik'],
  workExample: [
    {
      '@type': 'SoftwareApplication',
      name: 'Agent OS',
      description: 'Multi-agent LangGraph orchestration system with HITL gates',
      applicationCategory: 'DeveloperApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Flex-VCMS',
      description: 'Ecosystem orchestrator and LLM Gateway',
      applicationCategory: 'DeveloperApplication',
    },
  ],
};
```

In the JSX, add:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```
Place it inside `<body>` before closing `</body>`.

---

## TASK 6: 404 not-found page (src/app/not-found.tsx)

Create a styled 404 page:
```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100svh',
      gap: '1rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        // 404 · route not found
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
        This path doesn't exist.
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
        Every system has defined boundaries. This URL is outside them.
      </p>
      <Link href="/" style={{
        marginTop: '1.5rem',
        color: 'var(--color-accent)',
        textDecoration: 'none',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        ← Return to base
      </Link>
    </main>
  );
}
```

---

## FINAL: Run npm run build

All files created, then: npm run build
Fix all errors. Build must pass clean.
Create handoff: docs/handoffs/2026-05-29-phase3-polish.md

## RULES
- No `any` TypeScript
- CSS vars for colors
- Build must pass clean
