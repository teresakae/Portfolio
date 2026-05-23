'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const BODY_TEXT =
  "I learned design the hard way — through curiosity that wouldn't rest, mistakes that wouldn't be ignored, and iteration that wouldn't stop. What pulled me in was never just the surface, but the machinery beneath it. The patterns, the systems, the logic that makes everything else possible.";

const sectionVariants: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const headingVariants: Variants = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.1 },
  },
};

const bodyVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.28 },
  },
};

const SOCIALS = [
  {
    label: 'Email',
    href: 'mailto:hello@tereskaae.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 9.1 6.1a1.5 1.5 0 0 0 1.8 0L22 7"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
];

export default function CTA() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<string>(
    'radial-gradient(circle 0px at -999px -999px, black 0%, transparent 100%)'
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMask(
      `radial-gradient(circle 200px at ${x}px ${y}px, black 0%, black 12%, transparent 75%)`
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMask('radial-gradient(circle 0px at -999px -999px, black 0%, transparent 100%)');
  }, []);

  const bodyStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    fontSize: 'clamp(1.25rem, 2.8vw, 3rem)',
    lineHeight: 1.28,
    letterSpacing: '-0.03em',
    textAlign: 'justify',
    textAlignLast: 'left',
    margin: 0,
    hyphens: 'auto',
    WebkitHyphens: 'auto',
  };

  return (
    <motion.section
      id="contact"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-80px' }}
      style={{
        position: 'relative',
        zIndex: 2,
        paddingTop:    'clamp(8rem, 15vw, 14rem)',
        paddingBottom: 'clamp(6rem, 10vw, 10rem)',
        paddingLeft:   'clamp(0.75rem, 1.5vw, 1.5rem)',
        paddingRight:  'clamp(0.75rem, 1.5vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <motion.h2
        variants={headingVariants}
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.92)',
          margin: '0 0 clamp(1.25rem, 2.5vw, 2rem)',
        }}
      >
        Let's build something.
      </motion.h2>

      <motion.div
        variants={bodyVariants}
        ref={containerRef}
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        style={{
          position: 'relative',
          width: '100%',
          cursor: isMobile ? 'default' : 'crosshair',
          marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        <p style={{
          ...bodyStyle,
          color: isMobile ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.11)',
          userSelect: 'none',
        }}>
          {BODY_TEXT}
        </p>

        {!isMobile && (
          <p
            aria-hidden="true"
            style={{
              ...bodyStyle,
              color: 'rgba(255,255,255,0.82)',
              position: 'absolute',
              inset: 0,
              WebkitMaskImage: mask,
              maskImage: mask,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {BODY_TEXT}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.45 }}
        style={{
          width: '1px',
          height: '56px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          transformOrigin: 'top',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.55 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
          letterSpacing: '0.01em',
          color: 'rgba(255,255,255,0.55)',
          margin: 0,
        }}>
          If any of this resonates —
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          {SOCIALS.map(({ label, href, icon }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              initial={{ scale: 1, opacity: 0.18 }}
              whileHover={{ scale: 1.18, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 16 } }}
              whileTap={{ scale: 0.92, transition: { type: 'spring', stiffness: 500, damping: 24 } }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.9)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                textDecoration: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}