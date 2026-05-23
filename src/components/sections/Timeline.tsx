'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EVENTS = [
  {
    year: '2021',
    label: 'University',
    description: 'Started a Computer Science degree — fell in love with human-computer interaction on day one.',
  },
  {
    year: '2022',
    label: 'First Shipped App',
    description: 'Built and launched a study-planner iOS app while taking SwiftUI as an elective. A few hundred downloads, one lesson: shipping beats perfect.',
  },
  {
    year: '2023',
    label: 'Singapore & Malaysia',
    description: 'Immersive tech exchange programme. Spent four months building alongside engineers and designers from across Southeast Asia.',
  },
  {
    year: '2024',
    label: 'Share-Eat',
    description: 'Led design and iOS development on a community food-sharing platform. First project at the real intersection of social impact and product craft.',
  },
  {
    year: '2025',
    label: 'Now',
    description: 'Based in Bali. Building in public, open to meaningful collaborations and full-time roles.',
    isNow: true,
  },
];

function TimelineNode({
  event,
  index,
  isLast,
}: {
  event: (typeof EVENTS)[0];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        display: 'grid',
        gridTemplateColumns: '5rem 1px 1fr',
        gap: '0 1.75rem',
        position: 'relative',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          fontWeight: 500,
          color: event.isNow ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
          letterSpacing: '0.06em',
          paddingTop: '0.1rem',
          textAlign: 'right',
        }}
      >
        {event.year}
      </span>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.35,
            delay: index * 0.1 + 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{
            width: event.isNow ? '10px' : '8px',
            height: event.isNow ? '10px' : '8px',
            borderRadius: '50%',
            backgroundColor: event.isNow ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)',
            border: event.isNow ? '2px solid rgba(105,155,255,0.35)' : '1px solid rgba(255,255,255,0.15)',
            flexShrink: 0,
            marginTop: '0.15rem',
            zIndex: 1,
            boxSizing: 'border-box',
          }}
        />

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1 + 0.3,
              ease: 'easeOut',
            }}
            style={{
              flex: 1,
              width: '1px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              transformOrigin: 'top center',
              marginTop: '0.4rem',
            }}
          />
        )}
      </div>

      <div
        style={{
          paddingBottom: isLast ? 0 : 'clamp(2rem, 4vw, 3rem)',
          paddingTop: '0.05rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            fontWeight: 600,
            color: event.isNow ? 'var(--color-accent)' : 'rgba(255,255,255,0.92)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            margin: '0 0 0.4rem',
          }}
        >
          {event.label}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.50)',
            lineHeight: 1.65,
            margin: 0,
            maxWidth: '480px',
          }}
        >
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: false, amount: 0.4 });

  return (
    <section
      id="achievements"
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(3rem, 8vw, 6rem)',
          alignItems: 'start',
        }}
      >
        <div
          ref={headingRef}
          style={{
            position: 'sticky',
            top: 'clamp(6rem, 10vw, 8rem)',
          }}
        >
          <motion.span
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Achievements
          </motion.span>

          <motion.h2
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '0 0 1.25rem',
            }}
          >
            The path
            <br />
            so far.
          </motion.h2>

          <motion.p
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '320px',
            }}
          >
            From lecture halls to product launches — a few moments that shaped how I think and build.
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {EVENTS.map((event, i) => (
            <TimelineNode
              key={event.year + event.label}
              event={event}
              index={i}
              isLast={i === EVENTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
