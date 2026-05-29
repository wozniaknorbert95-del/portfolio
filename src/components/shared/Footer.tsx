'use client';

import Link from 'next/link';

const machineLinks = [
  { href: '/api/ecosystem', label: 'ecosystem.json' },
  { href: '/log/feed.json', label: 'feed.json' },
  { href: '/llms.txt', label: 'llms.txt' },
];

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-6 md:px-12"
      style={{
        height: 'var(--nav-height)',
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        &copy; 2026 FlexGrafik &mdash; Engineering the Post-Code Era
      </p>

      <div className="hidden sm:flex items-center gap-4">
        {machineLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <span
        className="text-xs font-mono hidden md:inline"
        style={{ color: 'var(--color-accent)' }}
      >
        AI Systems Architect
      </span>
    </footer>
  );
}
