'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { LogEntry } from '@/lib/log';

const typeColors: Record<string, string> = {
  HANDOFF: 'var(--color-accent)',
  FEAT: 'var(--color-green)',
  FIX: 'var(--color-amber)',
  DEPLOY: 'var(--color-purple)',
  ARCH: 'var(--color-text-muted)',
};

export default function LogTeaser({ entries }: { entries: LogEntry[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 'var(--section-padding) 24px',
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <p
          className="font-mono text-xs"
          style={{ color: 'var(--color-text-muted)', marginBottom: 8 }}
        >
          {'// operating journal'}
        </p>
        <h2
          className="font-bold"
          style={{ fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: 8 }}
        >
          The Log
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: 540 }}>
          Live signals from production systems — deployments, architecture decisions, feature milestones.
        </p>
      </div>

      <div className="flex flex-col" style={{ marginBottom: '2rem' }}>
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/log/${entry.slug}`}
            className="grid items-start no-underline"
            style={{
              gridTemplateColumns: 'auto 1fr',
              gap: '1rem',
              padding: '1rem',
              margin: '0 -1rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: hoveredSlug === entry.slug
                ? '2px solid var(--color-accent)'
                : '2px solid transparent',
              background: hoveredSlug === entry.slug
                ? 'var(--color-bg-surface)'
                : 'transparent',
              transition: 'background var(--transition-base), border-color var(--transition-base)',
            }}
            onMouseEnter={() => setHoveredSlug(entry.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <div className="flex flex-col gap-1" style={{ minWidth: 80 }}>
              <span
                className="font-mono text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {entry.date}
              </span>
              <span
                className="font-mono font-semibold uppercase tracking-wider inline-block w-fit rounded"
                style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  background: `color-mix(in srgb, ${typeColors[entry.type] ?? 'var(--color-text-muted)'} 15%, transparent)`,
                  color: typeColors[entry.type] ?? 'var(--color-text-muted)',
                }}
              >
                {entry.type}
              </span>
            </div>

            <div>
              <span
                className="font-mono text-xs block"
                style={{ color: 'var(--color-accent)', marginBottom: 2 }}
              >
                {entry.project}
              </span>
              <span
                className="font-semibold text-sm block"
                style={{ color: 'var(--color-text-primary)', marginBottom: 4 }}
              >
                {entry.title}
              </span>
              <p
                className="text-sm"
                style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {entry.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/log"
        className="font-medium inline-block"
        style={{
          color: 'var(--color-accent)',
          fontSize: '0.9rem',
          textDecoration: 'none',
        }}
      >
        Read the Log &rarr;
      </Link>
    </section>
  );
}
