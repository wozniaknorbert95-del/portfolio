'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/labs', label: 'Labs' },
  { href: '/dna', label: 'DNA' },
  { href: '/log', label: 'Log' },
];

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.25, ease: 'easeOut' as const },
  }),
};

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--nav-height)',
        background: 'var(--color-bg-elevated)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-between h-full px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            className="font-bold text-lg"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            FG
          </span>
          <span className="hidden sm:inline text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
            FlexGrafik
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <motion.div
                key={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium transition-colors no-underline"
                  style={{
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ background: 'var(--color-accent)', borderRadius: '1px' }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{ color: 'var(--color-text-primary)' }}
        >
          <span className="block w-5 h-0.5 rounded-full transition-transform" style={{ background: 'var(--color-text-primary)', transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
          <span className="block w-5 h-0.5 rounded-full transition-opacity" style={{ background: 'var(--color-text-primary)', opacity: mobileOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 rounded-full transition-transform" style={{ background: 'var(--color-text-primary)', transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0"
            style={{
              background: 'var(--color-bg-elevated)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium no-underline transition-colors"
                    style={{
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
