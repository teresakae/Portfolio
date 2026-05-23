'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface FlipCardData {
  front: { label: string; phase: string; detail: string };
  back: { heading: string; body: string };
  accent: string;
}

function accentToHue(accent: string): number {
  if (accent.startsWith('#69') || accent.startsWith('#6')) return 220;
  if (accent.startsWith('#a7') || accent.startsWith('#a')) return 260;
  if (accent.startsWith('#34') || accent.startsWith('#3')) return 160;
  return 220;
}

export default function FlipCard({ card, index }: { card: FlipCardData; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hue = accentToHue(card.accent);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  const x = useSpring(rawX, { stiffness: 180, damping: 20 });
  const y = useSpring(rawY, { stiffness: 180, damping: 20 });

  const gradX = useTransform(x, (v) => `${v}%`);
  const gradY = useTransform(y, (v) => `${v}%`);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    rawX.set(px);
    rawY.set(py);
    x.set(px);
    y.set(py);
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handleFlip = () => {
    setFlipped((f) => !f);
  };

  const glowVisible = isHovered && !flipped;

  return (
    <motion.div
      style={{
        perspective: '1200px',
        width: '100%',
        maxWidth: '340px',
        aspectRatio: '3 / 4',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      onClick={handleFlip}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      role="button"
      aria-label={`Flip card: ${card.front.phase}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '14px',
        }}
      >
        <motion.div
          aria-hidden
          animate={{ opacity: glowVisible ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '14px',
            pointerEvents: 'none',
            zIndex: 10,
            background: useTransform(
              [gradX, gradY],
              ([gx, gy]) =>
                `radial-gradient(120px 120px at ${gx} ${gy}, hsl(${hue} 100% 68% / 0.9) 0%, transparent 100%)`
            ),
            WebkitMask: `
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0)
            `,
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1.5px',
          }}
        />

        <motion.div
          aria-hidden
          animate={{ opacity: glowVisible ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '13px',
            pointerEvents: 'none',
            zIndex: 3,
            background: useTransform(
              [gradX, gradY],
              ([gx, gy]) =>
                `radial-gradient(90px 90px at ${gx} ${gy}, hsl(${hue} 80% 65% / 0.15) 0%, transparent 100%)`
            ),
          }}
        />

        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '13px',
              border: '1.5px solid rgba(255,255,255,0.08)',
              backgroundColor: 'var(--color-surface, #0d1117)',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: card.accent,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {card.front.label}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {card.front.phase}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.40)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {card.front.detail}
              </p>
              <span
                style={{
                  marginTop: '0.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.20)',
                  letterSpacing: '0.05em',
                }}
              >
                Tap to flip →
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: card.accent,
                opacity: 0.06,
                pointerEvents: 'none',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '13px',
              border: '1.5px solid rgba(255,255,255,0.08)',
              backgroundColor: 'var(--color-surface, #0d1117)',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2px',
                backgroundColor: card.accent,
                borderRadius: '999px',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '-0.015em',
                  margin: 0,
                }}
              >
                {card.back.heading}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.back.body}
              </p>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.20)',
                letterSpacing: '0.05em',
              }}
            >
              ← Tap to flip back
            </span>

            <div
              style={{
                position: 'absolute',
                bottom: '-50px',
                left: '-30px',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: card.accent,
                opacity: 0.07,
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
