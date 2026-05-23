'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { useLenis } from '@/hooks/useLenis';

const IMAGES = [
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop',
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

  const vw   = window.innerWidth;
  const vh   = window.innerHeight;
  const dist = Math.max(vw, vh) * 0.85; 

  return {
    id:  `${Date.now()}-${Math.random()}`,
    src: IMAGES[imgCursor++ % IMAGES.length],
    tx:  (baseDir.x + noiseX) * dist,
    ty:  (baseDir.y + noiseY) * dist,
    startScroll: currentScroll,
  };
}

function FlyCard({ card, globalScroll }: { card: CardData, globalScroll: MotionValue<number> }) {
  const { startScroll, tx, ty } = card;
  const endScroll = startScroll + SCROLL_LIFESPAN;

  const x = useTransform(globalScroll, [startScroll, endScroll], [0, tx]);
  const y = useTransform(globalScroll, [startScroll, endScroll], [0, ty]);
  const scale = useTransform(globalScroll, [startScroll, endScroll], [0.05, 2.5]);
  const opacity = useTransform(globalScroll, 
    [startScroll, startScroll + SCROLL_LIFESPAN * 0.05, endScroll - SCROLL_LIFESPAN * 0.1, endScroll], 
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width:      `${CARD_W}px`,
        height:     `${CARD_H}px`,
        marginLeft: `-${CARD_W / 2}px`,
        marginTop:  `-${CARD_H / 2}px`,
        zIndex: 10,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        x, y, scale, opacity
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  );
}

export default function BeyondCode() {
  const sectionRef  = useRef<HTMLElement>(null);
  const isInView    = useInView(sectionRef, { amount: 0.2 });
  const isInViewRef = useRef(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const cardsRef = useRef<CardData[]>([]); 
  
  const globalScroll = useMotionValue(0);
  const lastScroll   = useRef(0);
  const accumulator  = useRef(0); 

  useEffect(() => { isInViewRef.current = isInView; }, [isInView]);

  useLenis(({ scroll }: { scroll: number }) => {
    globalScroll.set(scroll);

    if (!isInViewRef.current) return;

    const delta = scroll - lastScroll.current;
    lastScroll.current = scroll;

    if (delta > 0) {
      accumulator.current += delta;
      let shouldUpdateState = false;

      while (accumulator.current >= PX_PER_CARD) {
        accumulator.current -= PX_PER_CARD;
        const newCard = spawnCard(scroll);
        cardsRef.current.push(newCard);
        shouldUpdateState = true;
      }

      const activeCards = cardsRef.current.filter(c => scroll <= c.startScroll + SCROLL_LIFESPAN + 100);
      
      if (activeCards.length !== cardsRef.current.length) {
        cardsRef.current = activeCards;
        shouldUpdateState = true;
      }

      if (shouldUpdateState) {
        setCards([...cardsRef.current]);
      }
    }
  });

  const barRef = useRef<HTMLDivElement>(null);
  useLenis(({ scroll }: { scroll: number }) => {
    if (!sectionRef.current || !barRef.current) return;
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const p = scrollable > 0
      ? Math.min(1, Math.max(0, -sectionRef.current.getBoundingClientRect().top / scrollable))
      : 0;
    barRef.current.style.transform = `scaleX(${p})`;
  });

  return (
    <>
      <section
        ref={sectionRef}
        id="beyond"
        style={{
          position: 'relative',
          height: '400vh', 
          backgroundColor: 'transparent',
          zIndex: 1,
        }}
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
          <div
            ref={barRef}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '1.5px',
              backgroundColor: 'var(--color-accent)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
              zIndex: 100,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 18, filter: 'blur(10px)' }
            }
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            style={{
              position: 'relative',
              zIndex: 60,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
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
                color: 'rgba(255,255,255,0.18)',
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
        
        <AnimatePresence>
          {isInView && cards.map(card => (
            <FlyCard key={card.id} card={card} globalScroll={globalScroll} />
          ))}
        </AnimatePresence>
      </section>
    </>
  );
}
