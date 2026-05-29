import Link from 'next/link';
import { pillars } from '@/data/methodology';
import PillarCard from '@/components/dna/PillarCard';

export default function DNAPage() {
  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: 960,
        padding: 'var(--section-padding) 1.5rem',
      }}
    >
      <header className="mb-16">
        <p className="font-mono text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
          {'// methodology · dna'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Engineering DNA
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: 640 }}>
          Not borrowed from a book. Built through production failures and 2 years of running real systems.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
          vs Traditional Developer
        </h2>

        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="grid grid-cols-2 font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border)' }}
          >
            <div className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>
              Traditional Developer
            </div>
            <div className="px-4 py-3" style={{ color: 'var(--color-accent)' }}>
              AI Systems Architect
            </div>
          </div>

          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className="grid grid-cols-2 text-sm"
              style={{
                background: i % 2 === 0 ? 'transparent' : 'var(--color-bg-surface)',
                borderBottom: i < pillars.length - 1 ? '1px solid var(--color-border)' : undefined,
              }}
            >
              <div className="px-4 py-3 border-r" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                <span className="font-semibold text-xs font-mono block mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  {pillar.title}
                </span>
                {pillar.vsTraditional.traditional}
              </div>
              <div className="px-4 py-3" style={{ color: 'var(--color-text-primary)' }}>
                <span className="font-semibold text-xs font-mono block mb-1" style={{ color: 'var(--color-accent)' }}>
                  {pillar.title}
                </span>
                {pillar.vsTraditional.architect}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
