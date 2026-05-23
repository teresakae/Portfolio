"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=85&auto=format&fit=crop',
];

const FINAL_GRADIENT = 'linear-gradient(135deg, #050810 0%, #0a0f1e 60%, #050810 100%)';

const SLIDE_MS = 320;
const HOLD_LAST_MS = 380;
const EXPAND_MS = 900;

interface Props {
  onComplete?: () => void;
}

export default function LayoutPreloader({ onComplete }: Props) {
  const [phase, setPhase] = useState<'white' | 'darken' | 'expand' | 'done'>('white');
  const [imgIndex, setImgIndex] = useState(0);
  const [cardSize, setCardSize] = useState({ w: 270, h: 370 });

  useEffect(() => {
    if (phase !== 'white') return;
    const interval = setInterval(() => {
      setImgIndex((i) => {
        const next = i + 1;
        if (next >= IMAGES.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('darken'), 80);
          return i;
        }
        return next;
      });
    }, SLIDE_MS);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'darken') return;
    const t = setTimeout(() => setPhase('expand'), HOLD_LAST_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'expand') return;
    const t = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, EXPAND_MS + 100);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  const isExpanding = phase === 'expand';
  const isDark = phase === 'darken' || phase === 'expand';

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: isDark ? '#050810' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: isDark && !isExpanding
          ? 'background-color 0.35s ease'
          : 'none',
        pointerEvents: 'all',
      }}
    >
      <motion.div
        animate={
          isExpanding
            ? {
                width: '100vw',
                height: '100vh',
                borderRadius: 0,
                x: 0,
                y: 0,
              }
            : {
                width: '270px',
                height: '370px',
                borderRadius: '12px',
                x: 0,
                y: 0,
              }
        }
        transition={
          isExpanding
            ? {
                width:  { duration: EXPAND_MS / 1000, ease: [0.76, 0, 0.24, 1] },
                height: { duration: EXPAND_MS / 1000, ease: [0.76, 0, 0.24, 1] },
                borderRadius: { duration: EXPAND_MS / 1000, ease: [0.76, 0, 0.24, 1] },
              }
            : { duration: 0 }
        }
        initial={{
          width: '270px',
          height: '370px',
          borderRadius: '12px',
        }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: isDark && !isExpanding
            ? '0 40px 100px rgba(0,0,0,0.5)'
            : isExpanding
            ? 'none'
            : '0 20px 60px rgba(0,0,0,0.18)',
        }}
      >
        <AnimatePresence mode="sync">
          {phase === 'white' && imgIndex > 0 && (
            <motion.img
              key={`behind-${imgIndex}`}
              src={IMAGES[imgIndex - 1]}
              alt=""
              initial={{ clipPath: 'inset(0 0 0% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{   clipPath: 'inset(100% 0 0 0)' }}
              transition={{ duration: 0.26, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                zIndex: 1,
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="sync">
          {phase === 'white' && (
            <motion.img
              key={`front-${imgIndex}`}
              src={IMAGES[imgIndex]}
              alt=""
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{   clipPath: 'inset(100% 0 0 0)' }}
              transition={{ duration: 0.26, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                zIndex: 2,
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'white' && (
            <motion.div
              key={`flash-${imgIndex}`}
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#ffffff',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
          )}
        </AnimatePresence>

        {isDark && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: FINAL_GRADIENT,
            }}
          />
        )}

        {phase === 'white' && (
          <motion.div
            style={{
              position: 'absolute',
              inset: '-5%',
              width: '110%',
              height: '110%',
            }}
            animate={{ scale: [1, 1.05], x: [0, -8] }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          />
        )}

        {phase === 'white' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              position: 'absolute',
              bottom: '0.8rem',
              left: '0.85rem',
              zIndex: 2,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: '1rem',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '-0.01em',
              textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            }}>
              Teresa Kae
            </span>
          </motion.div>
        )}

        {phase === 'white' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 1,
          }} />
        )}

        {phase === 'white' && (
          <div style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.85rem',
            display: 'flex',
            gap: '4px',
            zIndex: 3,
          }}>
            {IMAGES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === imgIndex ? '14px' : '4px',
                  backgroundColor: i <= imgIndex
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.28)',
                }}
                transition={{ duration: 0.18 }}
                style={{ height: '4px', borderRadius: '999px' }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {isDark && !isExpanding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-sans, "DM Sans", sans-serif)',
            fontSize: '0.65rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            Loading portfolio
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
