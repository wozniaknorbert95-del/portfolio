import { ImageResponse } from 'next/og';
import { getPillarBySlug } from '@/data/methodology';

export const alt = 'FlexGrafik DNA — Engineering Pillar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;
  const data = getPillarBySlug(pillar);

  const title = data?.title ?? 'Engineering Pillar';
  const tagline = data?.tagline ?? '';
  const keyPoints = data?.keyPoints?.slice(0, 3) ?? [];

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

        {/* Header: DNA label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              color: '#58a6ff',
              fontSize: 16,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            FlexGrafik / DNA
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              color: '#e6edf3',
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: '#58a6ff',
              fontSize: 28,
              display: 'flex',
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Key points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {keyPoints.map((point, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                color: '#8b949e',
                fontSize: 18,
              }}
            >
              <span style={{ color: '#58a6ff', display: 'flex' }}>→</span>
              <span style={{ display: 'flex' }}>
                {point.length > 80 ? point.slice(0, 80) + '…' : point}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
