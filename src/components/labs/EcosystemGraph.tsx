'use client';

import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Link from 'next/link';
import { projects, getStatusColor, getStatusLabel } from '@/data/ecosystem';
import type { Project } from '@/data/ecosystem';

interface EcosystemNodeData extends Record<string, unknown> {
  project: Project;
}

type EcosystemNode = Node<EcosystemNodeData>;

function EcosystemNode({ data }: NodeProps<EcosystemNode>) {
  const { project } = data;
  const statusColor = getStatusColor(project.status);
  const statusLabel = getStatusLabel(project.status);

  return (
    <Link
      href={`/labs/${project.slug}`}
      style={{
        display: 'block',
        width: 160,
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        textDecoration: 'none',
        transition: 'border-color var(--transition-fast)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: statusColor,
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span
          className="font-mono"
          style={{ fontSize: 10, color: statusColor, lineHeight: 1 }}
        >
          {statusLabel}
        </span>
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: '0.85rem',
          color: 'var(--color-text-primary)',
          marginBottom: 4,
          lineHeight: 1.3,
        }}
      >
        {project.name}
      </div>
      <div
        style={{
          fontSize: '0.7rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {project.role}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 9,
          color: 'var(--color-text-muted)',
          marginTop: 8,
          lineHeight: 1,
        }}
      >
        [{project.stack_layer}]
      </div>
    </Link>
  );
}

const nodeTypes = { ecosystem: EcosystemNode };

export default function EcosystemGraph() {
  const nodes = useMemo<EcosystemNode[]>(() => {
    const p = Object.fromEntries(projects.map((x) => [x.slug, x]));
    return [
      { id: 'flexgrafik-meta', type: 'ecosystem', position: { x: 350, y: 50 }, data: { project: p['flexgrafik-meta'] } },
      { id: 'workflow', type: 'ecosystem', position: { x: 650, y: 50 }, data: { project: p['workflow'] } },
      { id: 'flex-vcms', type: 'ecosystem', position: { x: 200, y: 220 }, data: { project: p['flex-vcms'] } },
      { id: 'agent-os', type: 'ecosystem', position: { x: 450, y: 220 }, data: { project: p['agent-os'] } },
      { id: 'agent-os-ui', type: 'ecosystem', position: { x: 450, y: 390 }, data: { project: p['agent-os-ui'] } },
      { id: 'zzpackage', type: 'ecosystem', position: { x: 100, y: 390 }, data: { project: p['zzpackage'] } },
      { id: 'app-flexgrafik', type: 'ecosystem', position: { x: 700, y: 390 }, data: { project: p['app-flexgrafik'] } },
      { id: 'jadzia-core', type: 'ecosystem', position: { x: 700, y: 220 }, data: { project: p['jadzia-core'] } },
    ];
  }, []);

  const edges = useMemo<Edge[]>(() => [
    {
      id: 'e-meta-vcms',
      source: 'flexgrafik-meta',
      target: 'flex-vcms',
      type: 'smoothstep',
      label: 'governs',
    },
    {
      id: 'e-meta-agentos',
      source: 'flexgrafik-meta',
      target: 'agent-os',
      type: 'smoothstep',
      label: 'governs',
    },
    {
      id: 'e-vcms-agentos',
      source: 'flex-vcms',
      target: 'agent-os',
      type: 'smoothstep',
      label: 'orchestrates',
    },
    {
      id: 'e-agentos-ui',
      source: 'agent-os',
      target: 'agent-os-ui',
      type: 'smoothstep',
      label: 'drives UI',
    },
    {
      id: 'e-workflow-agentos',
      source: 'workflow',
      target: 'agent-os',
      type: 'smoothstep',
      label: 'backlog',
    },
    {
      id: 'e-jadzia-agentos',
      source: 'jadzia-core',
      target: 'agent-os',
      type: 'smoothstep',
      label: 'LLM backend',
    },
  ], []);

  return (
    <div style={{ height: 520, width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          style: { stroke: '#58a6ff40', strokeWidth: 1.5 },
          labelStyle: {
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fill: 'var(--color-text-secondary)',
          },
          labelBgStyle: { fill: 'var(--color-bg)' },
          labelBgPadding: [4, 2],
          labelBgBorderRadius: 2,
        }}
      >
        <Background color="var(--color-border)" gap={24} size={1} />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
