import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { getAllLogEntries, getLogEntryBySlug } from '@/lib/log';
import { formatDate } from '@/lib/utils';
import BackLink from '@/components/dna/BackLink';

export function generateStaticParams() {
  return getAllLogEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLogEntryBySlug(slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.summary,
    authors: [{ name: 'Norbert Wozniak' }],
    openGraph: {
      title: `${entry.title} | FlexGrafik`,
      description: entry.summary,
      type: 'article',
      publishedTime: entry.date,
      tags: [entry.project, entry.type],
    },
  };
}

export default async function LogEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getLogEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    dateModified: entry.date,
    author: {
      '@type': 'Person',
      name: 'Norbert Wozniak',
      url: 'https://portfolio.flexgrafik.nl',
    },
    publisher: {
      '@type': 'Person',
      name: 'Norbert Wozniak',
      url: 'https://portfolio.flexgrafik.nl',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: entry.project,
    },
    articleSection: entry.type,
    genre: 'Engineering Log',
    inLanguage: 'en-US',
  };

  const typeColors: Record<string, string> = {
    HANDOFF: 'var(--color-accent)',
    FEAT: 'var(--color-green)',
    FIX: 'var(--color-amber)',
    DEPLOY: 'var(--color-purple)',
    ARCH: 'var(--color-text-muted)',
  };

  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: 720,
        padding: 'var(--section-padding) 1.5rem',
      }}
    >
      <p className="font-mono text-xs mb-6" style={{ color: 'var(--color-text-muted)' }}>
        Log / <span style={{ color: 'var(--color-accent)' }}>{entry.title}</span>
      </p>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{
              background: `color-mix(in srgb, ${typeColors[entry.type]} 15%, transparent)`,
              color: typeColors[entry.type],
            }}
          >
            {entry.type}
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--color-accent)' }}>
            {entry.project}
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {formatDate(entry.date)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          {entry.title}
        </h1>

        {entry.summary && (
          <p className="text-base italic leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {entry.summary}
          </p>
        )}
      </header>

      <article
        className="prose-custom text-base leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <MDXRemote source={entry.content} />
      </article>

      <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <BackLink href="/log" label="Back to Log" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
