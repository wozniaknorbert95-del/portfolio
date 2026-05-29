'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LogEntry } from '@/lib/log';

const typeDotColor: Record<string, string> = {
  HANDOFF: 'var(--color-accent)',
  FEAT: 'var(--color-green)',
  FIX: 'var(--color-amber)',
  DEPLOY: 'var(--color-purple)',
  ARCH: 'var(--color-text-muted)',
};

const typeBadgeColor: Record<string, string> = {
  HANDOFF: 'var(--color-accent)',
  FEAT: 'var(--color-green)',
  FIX: 'var(--color-amber)',
  DEPLOY: 'var(--color-purple)',
  ARCH: 'var(--color-text-muted)',
};

function TimelineEntry({
  entry,
  index,
  isLast,
  animate,
}: {
  entry: LogEntry;
  index: number;
  isLast: boolean;
  animate: boolean;
}) {
  const dotColor = typeDotColor[entry.type] ?? 'var(--color-text-muted)';
  const badgeColor = typeBadgeColor[entry.type] ?? 'var(--color-text-muted)';

  const variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={animate ? variants : undefined}
      initial={animate ? 'hidden' : false}
      animate={animate ? 'visible' : false}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
      style={{
        position: 'relative',
        paddingLeft: 28,
        paddingBottom: isLast ? 0 : 24,
      }}
    >
      {/* Vertical line segment */}
      {!isLast && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 7,
            top: 16,
            bottom: 0,
            width: 1,
            background: 'var(--color-border)',
          }}
        />
      )}

      {/* Dot */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 3,
          top: 4,
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: dotColor,
          flexShrink: 0,
        }}
      />

      {/* Content */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginBottom: 4 }}>
        <span
          className="font-mono text-xs"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {entry.date}
        </span>
        <span
          className="font-mono font-semibold uppercase tracking-wider rounded inline-block"
          style={{
            fontSize: 9,
            padding: '1px 5px',
            background: `color-mix(in srgb, ${badgeColor} 15%, transparent)`,
            color: badgeColor,
          }}
        >
          {entry.type}
        </span>
      </div>

      <Link
        href={`/log/${entry.slug}`}
        className="font-semibold text-sm no-underline block"
        style={{
          color: 'var(--color-text-primary)',
          marginBottom: 3,
          transition: 'color var(--transition-fast)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
      >
        {entry.title}
      </Link>

      <p
        className="text-xs"
        style={{
          color: 'var(--color-text-secondary)',
          lineHeight: 1.55,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {entry.summary}
      </p>
    </motion.div>
  );
}

export default function HandoffTimeline({ entries }: { entries: LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  if (entries.length === 0) return null;

  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {entries.map((entry, i) => (
        <TimelineEntry
          key={entry.slug}
          entry={entry}
          index={i}
          isLast={i === entries.length - 1}
          animate={shouldAnimate}
        />
      ))}
    </div>
  );
}
