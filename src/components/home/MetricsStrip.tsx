'use client';

import { useRef, useState, useEffect } from 'react';
import { useReducedMotion, motion, useInView } from 'framer-motion';
import ecosystem from '../../../public/ecosystem.json';

interface MetricProps {
  value: string;
  label: string;
  isCountUp?: boolean;
  countTarget?: number;
  isGreen?: boolean;
  note?: string;
  delay?: number;
}

function AnimatedMetric({
  value,
  label,
  isCountUp,
  countTarget,
  isGreen,
  note,
  delay = 0,
  isInView,
  prefersReducedMotion,
}: MetricProps & { isInView: boolean; prefersReducedMotion: boolean }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || !isCountUp || hasAnimated || !countTarget) return;
    if (prefersReducedMotion) {
      setCount(countTarget);
      setHasAnimated(true);
      return;
    }

    const timeout = setTimeout(() => {
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = countTarget / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= countTarget) {
          setCount(countTarget);
          setHasAnimated(true);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, isCountUp, countTarget, delay, hasAnimated, prefersReducedMotion]);

  const shouldCountUp = isCountUp && typeof countTarget === 'number';
  const displayValue = shouldCountUp ? String(count) : value;

  return (
    <div className="flex flex-col items-center shrink-0">
      <span
        className="font-mono font-bold"
        style={{
          fontSize: '2.5rem',
          color: isGreen ? 'var(--color-green)' : 'var(--color-accent)',
          fontWeight: 700,
        }}
      >
        {displayValue}
      </span>
      <span
        style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-secondary)',
          marginTop: 4,
        }}
      >
        {label}
      </span>
      {note && (
        <span
          className="font-mono"
          style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            marginTop: 2,
          }}
        >
          {note}
        </span>
      )}
    </div>
  );
}

export default function MetricsStrip() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.1 });

  const metrics: MetricProps[] = [
    {
      value: String(ecosystem.projects.length),
      label: 'systems in production',
      isCountUp: true,
      countTarget: ecosystem.projects.length,
      delay: 0,
    },
    {
      value: String(ecosystem.engineering_patterns.length),
      label: 'engineering patterns',
      isCountUp: true,
      countTarget: ecosystem.engineering_patterns.length,
      delay: 200,
    },
    {
      value: '2 yrs',
      label: 'production experience',
      delay: 400,
    },
    {
      value: '0',
      label: 'autonomous deploys',
      isCountUp: true,
      countTarget: 0,
      isGreen: true,
      note: '(Zasada 11)',
      delay: 600,
    },
  ];

  return (
    <div
      ref={ref}
      className="flex items-center justify-center"
      style={{
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '32px 24px',
        gap: 64,
        flexWrap: 'wrap',
      }}
    >
      {metrics.map((metric) => (
        <motion.div
          key={metric.label}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: (metric.delay ?? 0) / 1000 + 0.2, duration: 0.5 }}
        >
          <AnimatedMetric
            {...metric}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion ?? false}
          />
        </motion.div>
      ))}
    </div>
  );
}
