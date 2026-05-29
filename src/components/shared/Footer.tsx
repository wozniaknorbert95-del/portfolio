'use client';

import Link from 'next/link';

const machineLinks = [
  { href: '/api/ecosystem', label: 'ecosystem.json' },
  { href: '/log/feed.json', label: 'feed.json' },
  { href: '/llms.txt', label: 'llms.txt' },
];

const LINKEDIN_URL = 'https://www.linkedin.com/in/norbert-wozniak-172b76367/';

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

      <div className="hidden md:flex items-center gap-4">
        <a
          href="https://github.com/FlexGrafik"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono transition-colors"
          style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
        >
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono transition-colors"
          style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
        >
          LinkedIn →
        </a>
      </div>
    </footer>
  );
}
