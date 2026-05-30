import { notFound } from 'next/navigation';
import { BrainCircuit, ShieldCheck, FileCode, Database, Zap, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { pillars, getPillarBySlug, type Pillar } from '@/data/methodology';
import BackLink from '@/components/dna/BackLink';

const iconMap: Record<string, LucideIcon> = {
  BrainCircuit, ShieldCheck, FileCode, Database, Zap,
};

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};

  return {
    title: pillar.title,
    description: pillar.description,
    openGraph: {
      title: `${pillar.title} | Engineering DNA | FlexGrafik`,
      description: pillar.tagline,
    },
  };
}

function PillarIcon({ iconName, size }: { iconName: string; size: number }) {
  const Icon = iconMap[iconName];
  if (!Icon) return null;
  return (
    <span style={{ color: 'var(--color-accent)' }}>
      <Icon size={size} />
    </span>
  );
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: pillar.title,
    description: pillar.description,
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
      '@type': 'Thing',
      name: 'AI Systems Architecture',
    },
    genre: 'Engineering Methodology',
    inLanguage: 'en-US',
  };

  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: 720,
        padding: 'var(--section-padding) 1.5rem',
      }}
    >
      <header className="mb-12">
        <p className="font-mono text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
          DNA / <span style={{ color: 'var(--color-accent)' }}>{pillar.title}</span>
        </p>

        <div className="flex items-center gap-4 mb-4">
          <PillarIcon iconName={pillar.icon} size={40} />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {pillar.title}
            </h1>
            <p className="text-lg italic mt-1" style={{ color: 'var(--color-text-muted)' }}>
              {pillar.tagline}
            </p>
          </div>
        </div>

        <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)', maxWidth: 680 }}>
          {pillar.description}
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Key Principles
        </h2>
        <ol className="flex flex-col gap-4">
          {pillar.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span
                className="font-mono text-xs font-bold shrink-0 mt-0.5"
                style={{ color: 'var(--color-accent)', minWidth: 24 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Real Examples from Production
        </h2>
        <div className="flex flex-col gap-4">
          {pillar.realExamples.map((example, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border"
              style={{
                background: 'var(--color-bg-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {example.label}
              </p>
              <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                {example.detail}
              </p>
              {example.file && (
                <p className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {example.file} <span style={{ color: 'var(--color-accent)' }}>→</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Traditional vs AI Systems Architect
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="p-5 rounded-xl border text-sm"
            style={{
              background: 'color-mix(in srgb, var(--color-red) 8%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-red) 20%, transparent)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-red)' }}>
              Traditional Developer
            </p>
            {pillar.vsTraditional.traditional}
          </div>
          <div
            className="p-5 rounded-xl border text-sm"
            style={{
              background: 'color-mix(in srgb, var(--color-green) 8%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-green) 20%, transparent)',
              color: 'var(--color-text-primary)',
            }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-green)' }}>
              AI Systems Architect
            </p>
            {pillar.vsTraditional.architect}
          </div>
        </div>
      </section>

      <BackLink href="/dna" label="Back to DNA" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
