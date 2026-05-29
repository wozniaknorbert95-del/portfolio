import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100svh',
        gap: '1rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        // 404 · route not found
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
        This path doesn&apos;t exist.
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
        Every system has defined boundaries. This URL is outside them.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '1.5rem',
          color: 'var(--color-accent)',
          textDecoration: 'none',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        ← Return to base
      </Link>
    </main>
  );
}
