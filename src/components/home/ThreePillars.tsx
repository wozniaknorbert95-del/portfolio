'use client';

import Link from 'next/link';
import { BrainCircuit, ShieldCheck, FileCode, type LucideIcon } from 'lucide-react';

interface Pillar {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  badge?: string;
}

const pillars: Pillar[] = [
  {
    icon: BrainCircuit,
    title: 'Context Architecture',
    body: 'SESSION-ANCHOR, brain.md, AGENTS.md — every repo has a compressed state map that agents can load cold.',
    href: '/dna/context-architecture',
  },
  {
    icon: ShieldCheck,
    title: 'Bounded Autonomy',
    body: 'AI executes. Human decides. HITL gates at every production boundary. Zasada 11: zero autonomous deploys.',
    href: '/dna/bounded-autonomy',
    badge: 'Enterprise-Ready',
  },
  {
    icon: FileCode,
    title: 'Spec-Driven Development',
    body: 'todo.json as executable spec. Verification before deploy. Specs are contracts, not suggestions.',
    href: '/dna/spec-driven',
  },
];

export default function ThreePillars() {
  return (
    <section
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 'var(--section-padding) 24px',
      }}
    >
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h2
          className="font-bold"
          style={{
            fontSize: '2rem',
            color: 'var(--color-text-primary)',
            marginBottom: 8,
          }}
        >
          Engineering DNA
        </h2>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '1rem',
            maxWidth: 540,
            margin: '0 auto',
          }}
        >
          Not a methodology borrowed from a book. Built through production failures.
        </p>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="flex flex-col"
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 32,
              transition: 'border-color 250ms ease, transform 250ms ease',
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
            <div style={{ marginBottom: 16, color: 'var(--color-accent)' }}>
              <pillar.icon size={32} />
            </div>

            <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
              <h3
                className="font-semibold"
                style={{
                  fontSize: '1.25rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                {pillar.title}
              </h3>
              {pillar.badge && (
                <span
                  className="font-mono rounded-full"
                  style={{
                    background: 'var(--color-accent-dim)',
                    color: 'var(--color-accent)',
                    fontSize: 10,
                    padding: '2px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pillar.badge}
                </span>
              )}
            </div>

            <p
              className="flex-1"
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                marginTop: 8,
                lineHeight: 1.6,
              }}
            >
              {pillar.body}
            </p>

            <Link
              href={pillar.href}
              className="font-medium inline-block"
              style={{
                color: 'var(--color-accent)',
                fontSize: '0.875rem',
                marginTop: 16,
                textDecoration: 'none',
              }}
            >
              Explore &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
