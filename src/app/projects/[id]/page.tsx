'use client';

import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import ProjectsDetail from '@/components/ui/ProjectsDetail';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <main style={{
        backgroundColor: 'var(--color-bg)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.875rem',
        }}>
          Project not found.
        </p>
      </main>
    );
  }

  return (
    <main style={{
      backgroundColor: 'var(--color-bg, #050810)',
      minHeight: '100vh',
      padding: 'clamp(5rem, 8vw, 6.5rem) clamp(1rem, 3vw, 2rem) clamp(4rem, 8vw, 6rem)',
    }}>

      <motion.button
        onClick={() => router.back()}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        whileHover={{ scale: 1.03 }}
        style={{
          position: 'fixed',
          top: '1.1rem',
          left: '1.5rem',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '0.38rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.60)',
          backgroundColor: 'rgba(255,255,255,0.055)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '999px',
          padding: '0.42rem 1rem 0.42rem 0.7rem',
          cursor: 'pointer',
          letterSpacing: '0.01em',
          transition: 'color 0.18s, border-color 0.18s, background-color 0.18s',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = 'rgba(255,255,255,0.88)';
          el.style.borderColor = 'rgba(255,255,255,0.16)';
          el.style.backgroundColor = 'rgba(255,255,255,0.08)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = 'rgba(255,255,255,0.60)';
          el.style.borderColor = 'rgba(255,255,255,0.09)';
          el.style.backgroundColor = 'rgba(255,255,255,0.055)';
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
          <path d="M8.5 2L3.5 6.5L8.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Projects
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          backgroundColor: 'var(--color-surface, #0d1117)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <ProjectsDetail project={project} />
      </motion.div>
    </main>
  );
}
