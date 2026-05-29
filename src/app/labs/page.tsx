import type { Metadata } from 'next';
import EcosystemGraph from '@/components/labs/EcosystemGraph';
import ProjectCard from '@/components/labs/ProjectCard';
import { projects } from '@/data/ecosystem';

export const metadata: Metadata = {
  title: 'The Ecosystem',
  description:
    '8 production projects — one coherent AI system. Agent OS, Flex-VCMS, LLM Gateway, Mission Control and more. Each node a live component.',
  openGraph: {
    title: 'The Ecosystem | FlexGrafik',
    description:
      '8 projects. One coherent system. Multi-agent orchestration, LLM Gateway, spec-driven pipelines — all production.',
  },
};

export default function LabsPage() {
  return (
    <section
      style={{
        paddingTop: 'calc(var(--nav-height) + 4rem)',
        paddingBottom: 'var(--section-padding)',
      }}
    >
      <div
        className="text-center"
        style={{ padding: '0 24px', maxWidth: 720, margin: '0 auto' }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            marginBottom: 12,
          }}
        >
          // labs &middot; ecosystem
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 12,
          }}
        >
          The Ecosystem
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            lineHeight: 1.5,
          }}
        >
          8 projects. One coherent system. Each node is a production component.
        </p>
      </div>

      <div
        style={{
          marginTop: 48,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 24px',
        }}
      >
        <EcosystemGraph />
      </div>

      <div
        style={{
          marginTop: 64,
          padding: '0 24px',
          maxWidth: 1100,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h2
          className="font-mono"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            marginBottom: 24,
          }}
        >
          // Project List
        </h2>
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
