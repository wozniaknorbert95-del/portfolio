import { getAllLogEntries } from '@/lib/log';
import LogList from '@/components/log/LogList';

export default function LogPage() {
  const entries = getAllLogEntries();

  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: 800,
        padding: 'var(--section-padding) 1.5rem',
      }}
    >
      <header className="mb-10">
        <p className="font-mono text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
          {'// operating journal'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          The Log
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)', maxWidth: 560 }}>
          Generated from git history + handoff docs. Machine-readable feeds:{' '}
          <a href="/api/log" className="underline" style={{ color: 'var(--color-accent)' }}>/api/log</a>
          {' · '}
          <a href="/log/feed.json" className="underline" style={{ color: 'var(--color-accent)' }}>/log/feed.json</a>
        </p>
      </header>

      <LogList entries={entries} />

      <footer className="mt-16 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <p className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Subscribe: <span style={{ color: 'var(--color-accent)' }}>RSS</span> ·{' '}
          <span style={{ color: 'var(--color-accent)' }}>JSON</span>
        </p>
      </footer>
    </div>
  );
}
