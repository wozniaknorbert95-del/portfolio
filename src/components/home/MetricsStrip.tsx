'use client';

import ecosystem from '../../../public/ecosystem.json';

interface MetricItem {
  value: string;
  label: string;
  isGreen?: boolean;
  note?: string;
}

const metrics: MetricItem[] = [
  {
    value: String(ecosystem.projects.length),
    label: 'systems in production',
  },
  {
    value: String(ecosystem.engineering_patterns.length),
    label: 'engineering patterns',
  },
  {
    value: '2 yrs',
    label: 'production experience',
  },
  {
    value: '0',
    label: 'autonomous deploys',
    isGreen: true,
    note: '(Zasada 11)',
  },
];

export default function MetricsStrip() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '32px 24px',
        gap: 64,
        flexWrap: 'wrap',
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col items-center shrink-0">
          <span
            className="font-mono font-bold"
            style={{
              fontSize: '2.5rem',
              color: metric.isGreen ? 'var(--color-green)' : 'var(--color-accent)',
              fontWeight: 700,
            }}
          >
            {metric.value}
          </span>
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
              marginTop: 4,
            }}
          >
            {metric.label}
          </span>
          {metric.note && (
            <span
              className="font-mono"
              style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                marginTop: 2,
              }}
            >
              {metric.note}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
