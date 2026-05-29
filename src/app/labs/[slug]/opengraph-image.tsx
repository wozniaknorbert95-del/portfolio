import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/data/ecosystem';

export const alt = 'FlexGrafik Labs — Project';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const name = project?.name ?? 'Project';
  const role = project?.role ?? '';
  const description = project?.description ?? '';
  const stack = project?.stack?.slice(0, 4) ?? [];

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

        {/* Header: Labs label */}
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
            FlexGrafik / Labs
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              color: '#8b949e',
              fontSize: 20,
              display: 'flex',
            }}
          >
            {role}
          </div>
          <div
            style={{
              color: '#e6edf3',
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            {name}
          </div>
          <div
            style={{
              color: '#8b949e',
              fontSize: 24,
              lineHeight: 1.5,
              display: 'flex',
              maxWidth: 900,
            }}
          >
            {description.length > 120 ? description.slice(0, 120) + '…' : description}
          </div>
        </div>

        {/* Footer: stack tags */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                background: '#161b22',
                border: '1px solid #21262d',
                color: '#8b949e',
                padding: '6px 16px',
                borderRadius: 6,
                fontSize: 16,
                display: 'flex',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
