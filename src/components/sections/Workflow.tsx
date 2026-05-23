'use client';

import { motion, Variants } from 'framer-motion';
import FlipCard, { type FlipCardData } from '@/components/ui/FlipCard';

const CARDS: FlipCardData[] = [
  {
    front: {
      label: '01',
      phase: 'Understand',
      detail: 'Define the real problem before touching a tool.',
    },
    back: {
      heading: 'Research & framing',
      body: 'I start by mapping assumptions, talking to users, and questioning the brief. The problem worth solving is rarely the one first described. I use jobs-to-be-done framing and competitive landscape analysis to find the sharpest angle in.',
    },
    accent: '#699bff',
  },
  {
    front: {
      label: '02',
      phase: 'Shape',
      detail: 'Fast, rough, directional — not precious.',
    },
    back: {
      heading: 'Design & iteration',
      body: 'Low-fi sketches → mid-fi wireframes → high-fi prototypes in Figma. I keep fidelity proportional to confidence. Nothing gets polished until the structure is right. Feedback loops are short and decisions are explicit.',
    },
    accent: '#a78bfa',
  },
  {
    front: {
      label: '03',
      phase: 'Build',
      detail: 'Shipped code that respects the design intent.',
    },
    back: {
      heading: 'Engineering & delivery',
      body: 'I write production code with the same care as the design — typed, tested, and readable. Performance constraints are considered upfront. I prefer incremental delivery: something real in users\' hands beats a perfect roadmap.',
    },
    accent: '#34d399',
  },
];

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Workflow() {
  return (
    <section
      id="process"
      style={{
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Process
          </motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: 0,
              maxWidth: '640px',
            }}
          >
            How I work through a problem
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '420px',
            }}
          >
            Three phases. Each one builds on the last. Flip the cards to see what&apos;s underneath.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
            alignItems: 'start',
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.front.phase}
              variants={cardReveal}
              style={{
                rotate: i === 0 ? -1.5 : i === 2 ? 1.5 : 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FlipCard card={card} index={i} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
