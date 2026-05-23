'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ProjectLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.18 } },
};

const btnStyle: React.CSSProperties = {
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.14)',
  backgroundColor: 'rgba(255,255,255,0.06)',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
};

export default function ProjectLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ProjectLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const hasMultiple = images.length > 1;

  if (!mounted) return null;

  return createPortal(
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          src={images[currentIndex]}
          alt={`Visual ${currentIndex + 1}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '10px',
            display: 'block',
          }}
        />
      </AnimatePresence>

      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.14)',
          backgroundColor: 'rgba(255,255,255,0.06)',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          lineHeight: 1,
        }}
      >
        ✕
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            style={{ ...btnStyle, left: '1.25rem' }}
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            style={{ ...btnStyle, right: '1.25rem', left: 'auto' }}
          >
            →
          </button>
        </>
      )}

      {hasMultiple && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.40)',
            letterSpacing: '0.06em',
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </motion.div>,
    document.body
  );
}
