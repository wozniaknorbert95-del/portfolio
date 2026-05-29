'use client';

import { BrainCircuit, Code2, TestTube, UserCheck, FileText, type LucideIcon } from 'lucide-react';

interface FlowNode {
  icon: LucideIcon;
  label: string;
  hitl?: boolean;
}

const nodes: FlowNode[] = [
  { icon: BrainCircuit, label: 'Planner' },
  { icon: Code2, label: 'Coder' },
  { icon: TestTube, label: 'Tester' },
  { icon: UserCheck, label: 'Reviewer\n(HITL)', hitl: true },
  { icon: FileText, label: 'Summarizer' },
];

export default function AgentFlow() {
  return (
    <section
      className="mx-auto flex flex-col items-center"
      style={{
        maxWidth: 900,
        padding: '80px 24px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <p
        className="font-mono text-xs mb-8"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {'// agent-os pipeline · production'}
      </p>

      <div
        className="flex items-center justify-center"
        style={{ gap: 0, overflowX: 'auto', paddingBottom: 8, width: '100%' }}
      >
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center shrink-0">
            {/* Node */}
            <div
              className="flex flex-col items-center"
              style={{ gap: 8, width: 120 }}
            >
              {node.hitl && (
                <span
                  className="font-mono rounded-full"
                  style={{
                    background: 'var(--color-accent-dim)',
                    color: 'var(--color-accent)',
                    fontSize: 10,
                    padding: '2px 6px',
                    lineHeight: '14px',
                  }}
                >
                  HITL
                </span>
              )}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  border: '1px solid var(--color-border-active)',
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-accent)',
                }}
              >
                <node.icon size={22} />
              </div>
              <span
                className="font-mono text-center"
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.3,
                }}
              >
                {node.label}
              </span>
            </div>

            {/* Arrow between nodes */}
            {i < nodes.length - 1 && (
              <svg
                width={48}
                height={24}
                className="shrink-0"
                style={{ margin: '0 4px' }}
              >
                <line
                  x1={0} y1={12} x2={40} y2={12}
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                  opacity={0.6}
                  className="agent-flow-arrow"
                />
                <polygon
                  points="40,12 34,8 34,16"
                  fill="var(--color-accent)"
                  opacity={0.6}
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes agent-flow-dash { to { stroke-dashoffset: -18; } }
        .agent-flow-arrow { animation: agent-flow-dash 1.5s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .agent-flow-arrow { animation: none; } }
      `}</style>
    </section>
  );
}
