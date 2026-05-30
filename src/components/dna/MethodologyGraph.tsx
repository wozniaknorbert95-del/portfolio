'use client';

import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Link from 'next/link';

interface MNodeData extends Record<string, unknown> {
  kind: 'pillar' | 'impl';
  label: string;
  slug?: string;
  tagline?: string;
  detail?: string;
  href?: string;
}

type MNode = Node<MNodeData>;

function MethodologyNode({ data }: NodeProps<MNode>) {
  if (data.kind === 'pillar') {
    return (
      <Link
        href={`/dna/${data.slug}`}
        style={{
          display: 'block',
          width: 200,
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-accent)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          textDecoration: 'none',
          transition: 'background var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-accent-dim)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-bg-elevated)';
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: '0.8rem',
            color: 'var(--color-accent)',
            marginBottom: 3,
            lineHeight: 1.3,
          }}
        >
          {data.label}
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: '0.65rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.3,
          }}
        >
          {data.tagline}
        </div>
      </Link>
    );
  }

  const inner = (
    <div
      style={{
        width: 186,
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '8px 12px',
        transition: 'border-color var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-active)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 2,
          lineHeight: 1.3,
        }}
      >
        {data.label}
      </div>
      <div
        style={{
          fontSize: '0.65rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.35,
        }}
      >
        {data.detail}
      </div>
    </div>
  );

  if (data.href) {
    return (
      <Link href={data.href} style={{ display: 'block', textDecoration: 'none' }}>
        {inner}
      </Link>
    );
  }
  return inner;
}

const nodeTypes = { methodology: MethodologyNode };

const PILLAR_X = 0;
const IMPL_X = 340;
const ROW = 160;
const IMPL_GAP = 72;

const nodes: MNode[] = [
  { id: 'p-context',   type: 'methodology', position: { x: PILLAR_X, y: ROW * 0 },            data: { kind: 'pillar', label: 'Context Architecture', slug: 'context-architecture', tagline: 'Every agent knows exactly where it is.' } },
  { id: 'p-bounded',   type: 'methodology', position: { x: PILLAR_X, y: ROW * 1 + IMPL_GAP },  data: { kind: 'pillar', label: 'Bounded Autonomy',      slug: 'bounded-autonomy',      tagline: 'AI executes. Human decides.'               } },
  { id: 'p-spec',      type: 'methodology', position: { x: PILLAR_X, y: ROW * 2 + IMPL_GAP },  data: { kind: 'pillar', label: 'Spec-Driven Dev',        slug: 'spec-driven',            tagline: 'Specs are contracts, not suggestions.'      } },
  { id: 'p-ssot',      type: 'methodology', position: { x: PILLAR_X, y: ROW * 3 + IMPL_GAP },  data: { kind: 'pillar', label: 'SSoT Enforcement',       slug: 'ssot-enforcement',       tagline: 'One truth. Zero divergence.'                } },
  { id: 'p-cognitive', type: 'methodology', position: { x: PILLAR_X, y: ROW * 4 + IMPL_GAP },  data: { kind: 'pillar', label: 'Cognitive Leverage',     slug: 'cognitive-leverage',     tagline: 'Not code volume. Decisions compressed.'     } },

  { id: 'i-anchor',   type: 'methodology', position: { x: IMPL_X, y: ROW * 0 },                       data: { kind: 'impl', label: 'SESSION-ANCHOR.md', detail: 'Cold onboard in 60s', href: '/labs/agent-os'    } },
  { id: 'i-brain',    type: 'methodology', position: { x: IMPL_X, y: ROW * 0 + IMPL_GAP },            data: { kind: 'impl', label: 'brain.md',           detail: 'Project intent per repo'                        } },
  { id: 'i-hitl',     type: 'methodology', position: { x: IMPL_X, y: ROW * 1 + IMPL_GAP },            data: { kind: 'impl', label: 'HITL Gate',           detail: 'Human approval before prod', href: '/labs/agent-os' } },
  { id: 'i-zasada',   type: 'methodology', position: { x: IMPL_X, y: ROW * 1 + IMPL_GAP * 2 },       data: { kind: 'impl', label: 'Zasada 11',            detail: 'Zero autonomous deploys'                        } },
  { id: 'i-todo',     type: 'methodology', position: { x: IMPL_X, y: ROW * 2 + IMPL_GAP },            data: { kind: 'impl', label: 'todo.json',            detail: 'Executable spec + acceptance criteria', href: '/labs/workflow' } },
  { id: 'i-verify',   type: 'methodology', position: { x: IMPL_X, y: ROW * 2 + IMPL_GAP * 2 },       data: { kind: 'impl', label: 'Verification Docs',    detail: 'Proof-of-done before deploy'                    } },
  { id: 'i-eco',      type: 'methodology', position: { x: IMPL_X, y: ROW * 3 + IMPL_GAP },            data: { kind: 'impl', label: 'ecosystem.json',       detail: 'Single source for all 8 repos', href: '/labs/flex-vcms' } },
  { id: 'i-vcms',     type: 'methodology', position: { x: IMPL_X, y: ROW * 3 + IMPL_GAP * 2 },       data: { kind: 'impl', label: 'vcms-scan.js',          detail: 'Conflict detection across repos', href: '/labs/flex-vcms' } },
  { id: 'i-handoff',  type: 'methodology', position: { x: IMPL_X, y: ROW * 4 + IMPL_GAP },            data: { kind: 'impl', label: 'Handoff Docs',          detail: 'Session decisions compressed to 10 lines'       } },
  { id: 'i-ritual',   type: 'methodology', position: { x: IMPL_X, y: ROW * 4 + IMPL_GAP * 2 },       data: { kind: 'impl', label: 'Morning Ritual',         detail: 'vcms-scan → todo.json → zero overhead'         } },
];

const edgeDefaults = { type: 'smoothstep' as const };

const edges: Edge[] = [
  { ...edgeDefaults, id: 'e1',  source: 'p-context',   target: 'i-anchor',  label: 'produces'    },
  { ...edgeDefaults, id: 'e2',  source: 'p-context',   target: 'i-brain',   label: 'produces'    },
  { ...edgeDefaults, id: 'e3',  source: 'p-bounded',   target: 'i-hitl',    label: 'implements'  },
  { ...edgeDefaults, id: 'e4',  source: 'p-bounded',   target: 'i-zasada',  label: 'implements'  },
  { ...edgeDefaults, id: 'e5',  source: 'p-spec',      target: 'i-todo',    label: 'uses'        },
  { ...edgeDefaults, id: 'e6',  source: 'p-spec',      target: 'i-verify',  label: 'requires'    },
  { ...edgeDefaults, id: 'e7',  source: 'p-ssot',      target: 'i-eco',     label: 'defines'     },
  { ...edgeDefaults, id: 'e8',  source: 'p-ssot',      target: 'i-vcms',    label: 'enforces'    },
  { ...edgeDefaults, id: 'e9',  source: 'p-cognitive', target: 'i-handoff', label: 'produces'    },
  { ...edgeDefaults, id: 'e10', source: 'p-cognitive', target: 'i-ritual',  label: 'enables'     },
];

export default function MethodologyGraph() {
  const memoNodes = useMemo(() => nodes, []);
  const memoEdges = useMemo(() => edges, []);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]" style={{ height: 680 }}>
        <ReactFlow
          nodes={memoNodes}
          edges={memoEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          defaultEdgeOptions={{
            style: { stroke: '#58a6ff40', strokeWidth: 1.5 },
            labelStyle: {
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              fill: 'var(--color-text-secondary)',
            },
            labelBgStyle: { fill: 'var(--color-bg)' },
            labelBgPadding: [4, 2] as [number, number],
            labelBgBorderRadius: 2,
          }}
        >
          <Background color="var(--color-border)" gap={28} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
