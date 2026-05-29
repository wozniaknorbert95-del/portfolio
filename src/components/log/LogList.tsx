'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { LogEntry } from '@/lib/log';

const types = ['ALL', 'HANDOFF', 'FEAT', 'FIX', 'DEPLOY', 'ARCH'] as const;

const typeColors: Record<string, string> = {
  HANDOFF: 'var(--color-accent)',
  FEAT: 'var(--color-green)',
  FIX: 'var(--color-amber)',
  DEPLOY: 'var(--color-purple)',
  ARCH: 'var(--color-text-muted)',
};

export default function LogList({ entries: all }: { entries: LogEntry[] }) {
  const [activeType, setActiveType] = useState<string>('ALL');
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filtered = activeType === 'ALL' ? all : all.filter((e) => e.type === activeType);
  const typesWithCount = types.map((t) => ({
    type: t,
    count: t === 'ALL' ? all.length : all.filter((e) => e.type === t).length,
  }));

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {typesWithCount.map(({ type, count }) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className="font-mono text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer"
            style={{
              background:
                activeType === type
                  ? 'color-mix(in srgb, var(--color-accent) 15%, transparent)'
                  : 'transparent',
              borderColor:
                activeType === type ? 'var(--color-accent)' : 'var(--color-border)',
              color:
                activeType === type
                  ? 'var(--color-accent)'
                  : 'var(--color-text-secondary)',
            }}
          >
            {type}
            <span className="ml-1" style={{ opacity: 0.6 }}>{count}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {filtered.map((entry) => (
          <Link
            key={entry.slug}
            href={`/log/${entry.slug}`}
            className="grid grid-cols-[auto_1fr_auto] gap-4 items-start py-4 px-4 -mx-4 rounded-lg border border-transparent no-underline transition-all"
            style={{
              borderLeft: hoveredSlug === entry.slug
                ? '2px solid var(--color-accent)'
                : '2px solid transparent',
              background: hoveredSlug === entry.slug
                ? 'var(--color-bg-surface)'
                : 'transparent',
            }}
            onMouseEnter={() => setHoveredSlug(entry.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <div className="flex flex-col gap-1 min-w-[80px]">
              <span className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {entry.date}
              </span>
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded inline-block w-fit"
                style={{
                  background: `color-mix(in srgb, ${typeColors[entry.type]} 15%, transparent)`,
                  color: typeColors[entry.type],
                }}
              >
                {entry.type}
              </span>
            </div>
            <div>
              <span className="font-mono text-xs block" style={{ color: 'var(--color-accent)' }}>
                {entry.project}
              </span>
              <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                {entry.title}
              </span>
            </div>
            <p
              className="text-sm text-right max-w-[200px] lg:max-w-[300px] truncate hidden md:block"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {entry.summary}
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm py-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
          No entries for this type.
        </p>
      )}
    </>
  );
}
