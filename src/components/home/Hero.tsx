'use client';

import { useReducedMotion, motion } from 'framer-motion';
import Link from 'next/link';

const headlineLines = [
  { text: "I don't write code", accent: false },
  { text: 'anymore.', accent: true },
  { text: 'I engineer systems', accent: false },
  { text: 'that think.', accent: true },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay: number) =>
    prefersReducedMotion
      ? { initial: false as const, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: 'easeOut' as const },
        };

  return (
    <section
      className="flex flex-col items-center justify-center text-center"
      style={{
        minHeight: 'calc(100svh - var(--nav-height))',
      }}
    >
      <motion.div
        {...anim(0.1)}
        className="font-mono text-xs rounded-full border inline-block mb-6"
        style={{
          padding: '4px 12px',
          color: 'var(--color-text-secondary)',
          borderColor: 'var(--color-border-active)',
        }}
      >
        AI Systems Architect · Agentic Engineering
      </motion.div>

      <h1
        className="flex flex-col items-center"
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 700,
          lineHeight: 1.05,
        }}
      >
        {headlineLines.map((line, i) => (
          <motion.span
            key={line.text}
            {...(prefersReducedMotion
              ? { initial: false as const, animate: { opacity: 1 } }
              : {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1 + i * 0.15, duration: 0.5, ease: 'easeOut' as const },
                })}
            style={{
              color: line.accent ? 'var(--color-accent)' : 'var(--color-text-primary)',
            }}
          >
            {line.text}
          </motion.span>
        ))}
      </h1>

      <motion.p
        {...anim(0.8)}
        className="text-center"
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.1rem',
          maxWidth: 560,
          marginTop: '1.5rem',
        }}
      >
        Multi-agent orchestration · Context engineering · Spec-driven development · Bounded autonomy systems
      </motion.p>

      <motion.div
        {...anim(1.0)}
        className="flex gap-4"
        style={{ marginTop: '2.5rem' }}
      >
        <Link
          href="/labs"
          className="font-semibold no-underline transition-all"
          style={{
            background: 'var(--color-accent)',
            color: '#090c11',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
        >
          Explore the Ecosystem
        </Link>
        <Link
          href="/dna"
          className="font-semibold no-underline transition-all"
          style={{
            border: '1px solid var(--color-border-active)',
            color: 'var(--color-text-primary)',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-active)';
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
        >
          Read the DNA
        </Link>
      </motion.div>
    </section>
  );
}
