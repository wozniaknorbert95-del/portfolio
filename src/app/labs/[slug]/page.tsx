import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects, getProjectBySlug, getStatusColor, getStatusLabel } from '@/data/ecosystem';
import { getLogEntriesByProject } from '@/lib/log';
import HandoffTimeline from '@/components/labs/HandoffTimeline';
import { Shield } from 'lucide-react';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Labs — FlexGrafik`,
    description: project.description,
    authors: [{ name: 'Norbert Wozniak' }],
    openGraph: {
      title: `${project.name} | Labs | FlexGrafik`,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    author: {
      '@type': 'Person',
      name: 'Norbert Wozniak',
      url: 'https://portfolio.flexgrafik.nl',
    },
    url: `https://portfolio.flexgrafik.nl/labs/${project.slug}`,
    codeRepository: project.repo,
    programmingLanguage: project.stack,
    softwareVersion: project.status === 'production' ? '1.0' : '0.1',
    datePublished: project.last_handoff,
    ...(project.status === 'production'
      ? { applicationSubCategory: 'Production System' }
      : { applicationSubCategory: 'In Development' }),
  };

  const statusColor = getStatusColor(project.status);
  const statusLabel = getStatusLabel(project.status);
  const logEntries = getLogEntriesByProject(project.id);

  return (
    <article
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: 'calc(var(--nav-height) + 4rem) 24px var(--section-padding)',
      }}
    >
      <nav
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          marginBottom: 32,
        }}
      >
        <Link
          href="/labs"
          style={{
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
          }}
        >
          Labs
        </Link>
        {' / '}
        <span style={{ color: 'var(--color-text-secondary)' }}>
          {project.name}
        </span>
      </nav>

      <header style={{ marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          <span
            className="font-mono rounded-full"
            style={{
              background:
                project.status === 'production'
                  ? 'var(--color-green-dim)'
                  : project.status === 'staging'
                    ? 'var(--color-amber-dim)'
                    : 'var(--color-bg-elevated)',
            color: statusColor,
            fontSize: 10,
            padding: '2px 8px',
          }}
        >
          {statusLabel}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 10,
            color: 'var(--color-text-muted)',
          }}
        >
          {project.stack_layer}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 10,
            color: 'var(--color-text-muted)',
          }}
        >
          handoff: {project.last_handoff}
        </span>
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}
      >
        {project.name}
      </h1>
      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        {project.role}
      </p>
    </header>

    <section style={{ marginBottom: 40 }}>
      <h2
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Description
      </h2>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
        }}
      >
        {project.description}
      </p>
    </section>

    <section style={{ marginBottom: 40 }}>
      <h2
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Stack
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono rounded-full"
            style={{
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent)',
              fontSize: '0.75rem',
              padding: '2px 10px',
              lineHeight: 1.5,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </section>

    <section style={{ marginBottom: 40 }}>
      <h2
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Highlights
      </h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {project.highlights.map((item) => (
          <li
            key={item}
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.9rem',
              paddingLeft: 20,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                color: 'var(--color-accent)',
              }}
            >
              &rarr;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>

    <section style={{ marginBottom: 40 }}>
      <h2
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Guardrails
      </h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {project.guardrails.map((item) => (
          <li
            key={item}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              color: 'var(--color-text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
            }}
          >
            <Shield
              size={14}
              style={{
                color: 'var(--color-amber)',
                marginTop: 3,
                flexShrink: 0,
              }}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>

    <section style={{ marginBottom: 48 }}>
      <h2
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Key Files
      </h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {project.key_files.map((file) => (
          <li
            key={file}
            className="font-mono"
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            {file}
          </li>
        ))}
      </ul>
    </section>

    {logEntries.length > 0 && (
      <section style={{ marginBottom: 48 }}>
        <h2
          className="font-mono"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          {'// handoff history · '}{logEntries.length}{logEntries.length === 1 ? ' entry' : ' entries'}
        </h2>
        <HandoffTimeline entries={logEntries} />
      </section>
    )}

    <Link
      href="/labs"
      className="hover:underline"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: '0.875rem',
        color: 'var(--color-accent)',
        textDecoration: 'none',
        fontWeight: 500,
      }}
    >
      &larr; Back to Ecosystem
    </Link>

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  </article>
);
}
