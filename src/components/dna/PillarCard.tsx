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
      className="group flex flex-col gap-4 p-6 rounded-xl border no-underline bg-[var(--color-bg-surface)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:-translate-y-0.5 transition-all duration-150"
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="shrink-0 text-[var(--color-accent)]">
            <Icon size={32} />
          </span>
        )}
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {pillar.title}
        </h2>
      </div>
      <p className="text-sm italic text-[var(--color-text-muted)]">
        {pillar.tagline}
      </p>
      <p className="text-sm text-[var(--color-text-secondary)]">
        {pillar.description.length > 120
          ? `${pillar.description.slice(0, 120)}...`
          : pillar.description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border)]">
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          {pillar.keyPoints.length} principles
        </span>
        <span className="font-mono text-xs text-[var(--color-accent)] transition-colors">
          Explore →
        </span>
      </div>
    </Link>
  );
}
