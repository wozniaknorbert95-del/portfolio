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

      <motion.a
        {...anim(1.2)}
        href="https://www.linkedin.com/in/norbert-wozniak-172b76367/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono no-underline transition-colors"
        style={{
          marginTop: '1.25rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        linkedin.com/in/norbert-wozniak
      </motion.a>
    </section>
  );
}
