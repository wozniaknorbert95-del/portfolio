'use client';

import Link from 'next/link';

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 font-mono text-sm no-underline transition-colors"
      style={{ color: 'var(--color-text-secondary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
    >
      ← {label}
    </Link>
  );
}
