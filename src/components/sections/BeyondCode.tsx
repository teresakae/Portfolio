'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, MotionValue, animate } from 'framer-motion';
import { useLenis } from '@/hooks/useLenis';

const IMAGES = [
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=70&auto=format&fit=crop',
];

const CARD_W = 400;
const CARD_H = 260;

const DIRECTIONS = [
  { x:  0,      y: -1     },
  { x:  0.707,  y: -0.707 },
  { x:  1,      y:  0     },
  { x:  0.707,  y:  0.707 },
  { x:  0,      y:  1     },
  { x: -0.707,  y:  0.707 },
  { x: -1,      y:  0     },
  { x: -0.707,  y: -0.707 },
];

const SCROLL_LIFESPAN = 1600;
const PX_PER_CARD = 280;

let imgCursor = 0;
let dirCursor = 0;

const STACK_ROTATIONS = Array.from({ length: 6 }, () =>
  (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 8)
);

interface CardData {
  id: string;
  src: string;
  tx: number;
  ty: number;
  startScroll: number;
}

function spawnCard(currentScroll: number): CardData {
  const baseDir = DIRECTIONS[dirCursor];
  dirCursor = (dirCursor + 3) % DIRECTIONS.length;
  const noiseX = (Math.random() - 0.5) * 0.2;
  const noiseY = (Math.random() - 0.5) * 0.2;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dist = Math.max(vw, vh) * 0.85;
  return {
    id: `${Date.now()}-${Math.random()}`,
    src: IMAGES[imgCursor++ % IMAGES.length],
    tx: (baseDir.x + noiseX) * dist,
    ty: (baseDir.y + noiseY) * dist,
    startScroll: currentScroll,
  };
}

function FlyCard({ card, globalScroll }: { card: CardData; globalScroll: MotionValue<number> }) {
  const { startScroll, tx, ty } = card;
  const endScroll = startScroll + SCROLL_LIFESPAN;
  const x = useTransform(globalScroll, [startScroll, endScroll], [0, tx]);
  const y = useTransform(globalScroll, [startScroll, endScroll], [0, ty]);
  const scale = useTransform(globalScroll, [startScroll, endScroll], [0.05, 2.5]);
  const opacity = useTransform(
    globalScroll,
    [startScroll, startScroll + SCROLL_LIFESPAN * 0.05, endScroll - SCROLL_LIFESPAN * 0.1, endScroll],
    [0, 1, 1, 0]
  );
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        marginLeft: `-${CARD_W / 2}px`,
        marginTop: `-${CARD_H / 2}px`,
        zIndex: 10,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        x, y, scale, opacity,
      }}
    >
      <img src={card.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </motion.div>
  );
}

// ── Mobile swipe stack ────────────────────────────────────────────────────
function SwipeCard({
  src, index, stackY, stackRotate, isFlung, isTop, onFling, isInView,
}: {
  src: string;
  index: number;
  stackY: number;
  stackRotate: number;
  isFlung: boolean;
  isTop: boolean;
  onFling: () => void;
  isInView: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-18, stackRotate, 18]);

  useEffect(() => {
    if (isTop) x.set(0);
  }, [isTop, x]);

  return (
    <motion.div
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      style={{
        position: 'absolute',
        width: '75vw',
        maxWidth: '300px',
        height: '200px',
        cursor: isTop ? 'grab' : 'default',
        x,
        rotate,
        y: isFlung ? 0 : stackY,
        zIndex: 6 - index,
        willChange: 'transform',
        pointerEvents: isFlung ? 'none' : 'auto',
      }}
      initial={{ opacity: 0, scale: 1, y: stackY }}
      animate={
        isInView && !isFlung
          ? { opacity: 1, scale: 1, y: stackY }
          : isFlung
          ? { scale: 1 }
          : { opacity: 0 }
      }
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 200) {
          const direction = info.offset.x > 0 ? 1 : -1;
          animate(x, direction * (window.innerWidth + 200), {
            duration: 0.4,
            ease: 'easeOut',
          });
          onFling();
        } else {
          animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
        }
      }}
    >
      <div style={{ position: 'absolute', inset: '-30px', background: 'transparent' }} />
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    </motion.div>
  );
}

function MobileVersion() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [flung, setFlung] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isInView) setFlung(new Set());
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="beyond"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 12vw, 8rem) clamp(1.5rem, 6vw, 3rem)',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.30)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Beyond the screen
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
          fontSize: 'clamp(2.8rem, 10vw, 4rem)',
          fontWeight: 600,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '-0.025em',
          lineHeight: 1.0,
          margin: '0 0 0.75rem',
        }}>
          Community
          <br />
          <span style={{ fontWeight: 300 }}>Driven.</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.60)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Swipe to explore
        </p>
      </motion.div>

      <div style={{
        position: 'relative',
        height: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {IMAGES.slice(0, 6).map((src, i) => (
          <SwipeCard
            key={src}
            src={src}
            index={i}
            stackY={(5 - i) * 6}
            stackRotate={STACK_ROTATIONS[i]}
            isFlung={flung.has(i)}
            isTop={!flung.has(i) && IMAGES.slice(0, 6).findIndex((_, j) => !flung.has(j)) === i}
            onFling={() => setFlung(prev => new Set(prev).add(i))}
            isInView={isInView}
          />
        ))}

        {flung.size === 6 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            onClick={() => setFlung(new Set())}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.55)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '999px',
              padding: '0.5rem 1.25rem',
              cursor: 'pointer',
            }}
          >
            again →
          </motion.button>
        )}
      </div>

      {flung.size < 6 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.4rem',
          marginTop: '1.25rem',
        }}>
          {IMAGES.slice(0, 6).map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: i < flung.size
                ? 'rgba(255,255,255,0.55)'
                : 'rgba(255,255,255,0.15)',
              transition: 'background-color 0.3s ease',
            }} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function BeyondCode() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;
  if (isMobile) return <MobileVersion />;
  return <DesktopVersion />;
}

function DesktopVersion() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.05 });
  const isInViewRef = useRef(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const cardsRef = useRef<CardData[]>([]);
  const globalScroll = useMotionValue(0);
  const lastScroll = useRef(0);
  const accumulator = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => { isInViewRef.current = isInView; }, [isInView]);

  useLenis(({ scroll }: { scroll: number }) => {
    globalScroll.set(scroll);

    if (!isInViewRef.current) {
      if (cardsRef.current.length > 0) {
        cardsRef.current = [];
        setCards([]);
      }
      lastScroll.current = scroll;
      accumulator.current = 0;
      return;
    }

    const delta = scroll - lastScroll.current;
    lastScroll.current = scroll;

    if (delta > 0) {
      accumulator.current += delta;
      let shouldUpdateState = false;

      while (accumulator.current >= PX_PER_CARD) {
        accumulator.current -= PX_PER_CARD;
        cardsRef.current.push(spawnCard(scroll));
        shouldUpdateState = true;
      }

      const activeCards = cardsRef.current.filter(
        c => scroll <= c.startScroll + SCROLL_LIFESPAN + 100
      );

      if (activeCards.length !== cardsRef.current.length) {
        cardsRef.current = activeCards;
        shouldUpdateState = true;
      }

      if (shouldUpdateState) setCards([...cardsRef.current]);
    }
  });

  useLenis(({ scroll }: { scroll: number }) => {
    if (!sectionRef.current || !barRef.current) return;
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const p = scrollable > 0
      ? Math.min(1, Math.max(0, -sectionRef.current.getBoundingClientRect().top / scrollable))
      : 0;
    barRef.current.style.transform = `scaleX(${p})`;
  });

  return (
    <section
      ref={sectionRef}
      id="beyond"
      style={{ position: 'relative', height: '400vh', backgroundColor: 'transparent', zIndex: 1 }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 100,
      }}>
        {/* Progress bar — inside sticky container so it moves with it */}
        <div
          ref={barRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1.5px',
            backgroundColor: 'var(--color-accent)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            zIndex: 110,
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(10px)' }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          style={{ position: 'relative', zIndex: 60, textAlign: 'center', pointerEvents: 'none' }}
        >
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Beyond the screen
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 600,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            margin: 0,
          }}>
            Community
            <br />
            <span style={{ fontWeight: 300 }}>Driven.</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.60)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: '1.5rem',
            }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 38% 45% at 50% 50%, rgba(5,8,16,0.90) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 55,
        }} />
      </div>

      {cards.map(card => (
        <FlyCard key={card.id} card={card} globalScroll={globalScroll} />
      ))}
    </section>
  );
}