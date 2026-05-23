'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { TextRotate } from '@/components/ui/TextRotate';

const SKILLS = [
  'iOS Development', 'SwiftUI', 'Next.js', 'TypeScript',
  'Python', 'Supabase', 'Figma', 'TailwindCSS',
  'Computer Vision', 'Framer Motion',
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};

const badgeContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const badge: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};

function GlowBorder({ hovered, spotPos }: { hovered: boolean; spotPos: { x: number; y: number } }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '-1px',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        borderRadius: '15px',
        background: `radial-gradient(250px circle at ${spotPos.x}% ${spotPos.y}%, rgba(255,255,255,0.15) 0%, transparent 80%)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: '1px',
      }}
    />
  );
}

function PhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 110, damping: 16 });
  const springRotY = useSpring(rotateY, { stiffness: 110, damping: 16 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rotateY.set((nx - 0.5) * 25);
    rotateX.set(-(ny - 0.5) * 25);
    setSpotPos({ x: nx * 100, y: ny * 100 });
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] }}
      style={{ perspective: '1000px', width: '100%' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          borderRadius: '14px',
          cursor: 'crosshair',
          userSelect: 'none',
        }}
      >
        <GlowBorder hovered={hovered} spotPos={spotPos} />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '14px',
            overflow: 'hidden',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: hovered
              ? '0 32px 80px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.10) inset'
              : '0 12px 40px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cat.jpg"
            alt="Teresa Kae"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              background: `radial-gradient(200px circle at ${spotPos.x}% ${spotPos.y}%, rgba(255,255,255,0.08) 0%, transparent 80%)`,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -10, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '12px',
            zIndex: 20,
            background: 'rgba(13,17,23,0.88)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>🏆</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
              Microsoft AI Hackathon
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.50)',
              margin: 0,
              lineHeight: 1.2,
            }}>
              Accessibility Winner
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10, y: -10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-16px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '12px',
            zIndex: 20,
            background: 'rgba(13,17,23,0.88)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>🍎</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
              Apple Developer Academy
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.50)',
              margin: 0,
              lineHeight: 1.2,
            }}>
              Bali Cohort 2026
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(3rem, 7vw, 5rem)',
          alignItems: 'center',
        }}
      >

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: '300px', width: '100%', margin: '0 auto' }}>
            <PhotoCard />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              width: 'fit-content',
              margin: '0 auto',
            }}
          >
            <span style={{
              display: 'block', width: '6px', height: '6px',
              borderRadius: '50%', backgroundColor: '#4ade80', flexShrink: 0,
              boxShadow: '0 0 6px rgba(74,222,128,0.55)',
            }} />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.50)',
              letterSpacing: '0.01em',
            }}>
              Bali, Indonesia · Open to opportunities
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
        >

          <motion.span
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            About
          </motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.04,
              margin: 0,
            }}
          >
            Builder,{' '}
            <span style={{ fontWeight: 300 }}>designer,</span>
            <br />problem solver.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Products at the intersection of design and engineering — thoughtful
            enough to feel human, technical enough to scale. Obsessed with the
            details most people never notice, and the communities that form
            around the things we make.
          </motion.p>

          <motion.div variants={fadeUp}>
            <div style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--color-accent)',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}>
              <TextRotate
                texts={[
                  'Currently building in Bali.',
                  'Open to new roles.',
                  'Obsessing over typography.',
                  'Shipping side projects.',
                  'Learning in public.',
                ]}
                rotationInterval={2800}
                staggerDuration={0.025}
                staggerFrom="last"
                transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                mainClassName="overflow-hidden"
                elementLevelClassName="inline-block"
              />
            </div>
          </motion.div>

          <motion.div
            variants={badgeContainer}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}
          >
            {SKILLS.map((skill) => (
              <motion.span
                key={skill}
                variants={badge}
                whileHover={{ borderColor: 'rgba(105,155,255,0.35)', color: 'rgba(255,255,255,0.92)' }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '999px',
                  padding: '0.3rem 0.85rem',
                  whiteSpace: 'nowrap',
                  cursor: 'default',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
