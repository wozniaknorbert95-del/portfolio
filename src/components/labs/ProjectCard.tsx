'use client';

import Link from 'next/link';
import { getStatusColor, getStatusLabel } from '@/data/ecosystem';
import type { Project } from '@/data/ecosystem';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const statusColor = getStatusColor(project.status);
  const statusLabel = getStatusLabel(project.status);

  return (
    <Link
      href={`/labs/${project.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 24,
        textDecoration: 'none',
        transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-active)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
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
            lineHeight: 1.4,
          }}
        >
          {statusLabel}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 10,
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
          }}
        >
          {project.stack_layer}
        </span>
      </div>

      <div
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 4,
        }}
      >
        {project.name}
      </div>

      <div
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          marginBottom: 16,
        }}
      >
        {project.role}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 16,
        }}
      >
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="font-mono rounded-full"
            style={{
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent)',
              fontSize: '0.75rem',
              padding: '2px 8px',
              lineHeight: 1.4,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-accent)',
          fontWeight: 500,
          marginTop: 'auto',
        }}
      >
        View details &rarr;
      </div>
    </Link>
  );
}
