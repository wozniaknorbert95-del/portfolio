'use client';

import Link from 'next/link';
import { BrainCircuit, ShieldCheck, FileCode, Database, Zap, type LucideIcon } from 'lucide-react';
import type { Pillar } from '@/data/methodology';

const iconMap: Record<string, LucideIcon> = {
  BrainCircuit, ShieldCheck, FileCode, Database, Zap,
};

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = iconMap[pillar.icon];

  return (
    <Link
      href={`/dna/${pillar.slug}`}
      className="group flex flex-col gap-4 p-6 rounded-xl border no-underline transition-all"
      style={{
        background: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="shrink-0" style={{ color: 'var(--color-accent)' }}>
            <Icon size={32} />
          </span>
        )}
        <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {pillar.title}
        </h2>
      </div>
      <p className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
        {pillar.tagline}
      </p>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {pillar.description.length > 120
          ? `${pillar.description.slice(0, 120)}...`
          : pillar.description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <span className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {pillar.keyPoints.length} principles
        </span>
        <span className="font-mono text-xs transition-colors" style={{ color: 'var(--color-accent)' }}>
          Explore →
        </span>
      </div>
    </Link>
  );
}
