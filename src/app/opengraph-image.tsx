import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FlexGrafik — AI Systems Architect';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#090c11',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Accent line */}
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

        {/* Top label */}
        <div
          style={{
            color: '#58a6ff',
            fontSize: 18,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 32,
            display: 'flex',
          }}
        >
          portfolio.flexgrafik.nl
        </div>

        {/* Name */}
        <div
          style={{
            color: '#e6edf3',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            display: 'flex',
          }}
        >
          FlexGrafik
        </div>

        {/* Title */}
        <div
          style={{
            color: '#8b949e',
            fontSize: 36,
            marginTop: 20,
            display: 'flex',
          }}
        >
          AI Systems Architect
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 48,
          }}
        >
          {['Multi-agent orchestration', 'Context engineering', 'Bounded autonomy'].map((tag) => (
            <div
              key={tag}
              style={{
                background: '#388bfd1a',
                border: '1px solid #58a6ff40',
                color: '#58a6ff',
                padding: '8px 20px',
                borderRadius: 6,
                fontSize: 18,
                display: 'flex',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: '#21262d',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
