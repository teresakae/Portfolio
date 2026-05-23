'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

const STATUS_STYLES: Record<Project['status'], React.CSSProperties> = {
  Completed: {
    color: '#34d399',
    backgroundColor: 'rgba(52,211,153,0.12)',
    borderColor: 'rgba(52,211,153,0.25)',
  },
  'In Progress': {
    color: '#fbbf24',
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderColor: 'rgba(251,191,36,0.25)',
  },
  Concept: {
    color: '#699bff',
    backgroundColor: 'rgba(105,155,255,0.12)',
    borderColor: 'rgba(105,155,255,0.25)',
  },
};

export default function ProjectCard({
  project,
  instanceId,
}: {
  project: Project;
  instanceId: string;
}) {
  const statusStyle = STATUS_STYLES[project.status];

  return (
    <Link
      href={`/projects/${project.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <motion.article
        layoutId={`project-card-${project.id}-${instanceId}`}
        whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.14)' }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        style={{
          width: '100%',
          flexShrink: 0,
          borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.03)',
          overflow: 'hidden',
          cursor: 'pointer',
          willChange: 'transform',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            height: '180px',
            background: project.coverImage
              ? `url(${project.coverImage}) center / cover no-repeat`
              : project.coverGradient,
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              padding: '0.25rem 0.65rem',
              borderRadius: '8px',
              border: '1px solid',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              ...statusStyle,
            }}
          >
            {project.status}
          </span>
        </div>

        <div
          style={{
            padding: '1.1rem 1.25rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.30)',
            }}
          >
            {project.year}
          </span>

          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: '-0.015em',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {project.tagline}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              marginTop: '0.25rem',
            }}
          >
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.45)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.6rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.30)',
                  padding: '0.2rem 0',
                }}
              >
                +{project.tech.length - 5} more
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
