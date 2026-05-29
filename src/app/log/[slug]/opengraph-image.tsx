import { ImageResponse } from 'next/og';
import { getAllLogEntries, getLogEntryBySlug } from '@/lib/log';

export const alt = 'FlexGrafik Log — Entry';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const typeColors: Record<string, string> = {
  HANDOFF: '#58a6ff',
  FEAT: '#3fb950',
  FIX: '#d29922',
  DEPLOY: '#bc8cff',
  ARCH: '#484f58',
};

export function generateStaticParams() {
  return getAllLogEntries().map((e) => ({ slug: e.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLogEntryBySlug(slug);

  const title = entry?.title ?? 'Log Entry';
  const project = entry?.project ?? '';
  const type = entry?.type ?? 'FEAT';
  const summary = entry?.summary ?? '';
  const date = entry?.date ?? '';
  const typeColor = typeColors[type] ?? '#58a6ff';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#090c11',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#58a6ff',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              color: '#58a6ff',
              fontSize: 16,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            FlexGrafik / Log
          </div>
          <div
            style={{
              background: `${typeColor}26`,
              border: `1px solid ${typeColor}66`,
              color: typeColor,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              padding: '4px 12px',
              borderRadius: 6,
              display: 'flex',
            }}
          >
            {type}
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              color: '#58a6ff',
              fontSize: 20,
              display: 'flex',
            }}
          >
            {project}
          </div>
          <div
            style={{
              color: '#e6edf3',
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              display: 'flex',
              maxWidth: 960,
            }}
          >
            {title.length > 60 ? title.slice(0, 60) + '…' : title}
          </div>
          {summary ? (
            <div
              style={{
                color: '#8b949e',
                fontSize: 22,
                lineHeight: 1.5,
                display: 'flex',
                maxWidth: 900,
              }}
            >
              {summary.length > 100 ? summary.slice(0, 100) + '…' : summary}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            color: '#484f58',
            fontSize: 16,
          }}
        >
          <span style={{ display: 'flex' }}>{date}</span>
          <span style={{ display: 'flex', color: '#21262d' }}>|</span>
          <span style={{ display: 'flex' }}>portfolio.flexgrafik.nl/log</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
