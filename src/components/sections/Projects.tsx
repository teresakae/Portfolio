'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { PROJECTS } from '@/data/projects';

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  Completed:     { color: '#34d399', backgroundColor: 'rgba(52,211,153,0.12)',  borderColor: 'rgba(52,211,153,0.25)'  },
  'In Progress': { color: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.12)', borderColor: 'rgba(251,191,36,0.25)'  },
  Concept:       { color: '#699bff', backgroundColor: 'rgba(105,155,255,0.12)', borderColor: 'rgba(105,155,255,0.25)' },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const rowVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function Projects() {
  const topProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      id="projects"
      style={{
        marginTop: '-30vh',
        paddingTop: 0,
        paddingBottom: 0,
        overflow: 'visible',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        variants={rowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          paddingLeft:  'clamp(1.5rem, 4vw, 3rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
          alignItems: 'stretch',
        }}
      >
        {topProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            style={{ display: 'flex' }}
          >
            <Link href={`/projects/${project.id}`} style={{ display: 'flex', flex: 1, textDecoration: 'none' }}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] }}
                style={{
                  flex:            1,
                  display:         'flex',
                  flexDirection:   'column',
                  borderRadius:    '16px',
                  overflow:        'hidden',
                  border:          '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  cursor:          'pointer',
                  willChange:      'transform',
                }}
              >
                <div style={{
                  height:     'clamp(280px, 35vw, 420px)',
                  flexShrink: 0,
                  background: project.coverImage
                    ? `url(${project.coverImage}) center / cover no-repeat`
                    : project.coverGradient,
                  position:   'relative',
                }}>
                  <span style={{
                    position:             'absolute',
                    top:                  '1rem',
                    right:                '1rem',
                    fontFamily:           'var(--font-sans)',
                    fontSize:             '0.72rem',
                    fontWeight:           500,
                    padding:              '0.3rem 0.75rem',
                    borderRadius:         '999px',
                    border:               '1px solid',
                    backdropFilter:       'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    ...STATUS_STYLES[project.status],
                  }}>
                    {project.status}
                  </span>

                  <div style={{
                    position:   'absolute',
                    inset:      0,
                    background: 'linear-gradient(to top, rgba(5,8,16,0.9) 0%, transparent 55%)',
                  }} />

                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '1.5rem' }}>
                    <p style={{
                      fontFamily:    'var(--font-sans)',
                      fontSize:      '0.7rem',
                      fontWeight:    400,
                      color:         'rgba(255,255,255,0.4)',
                      margin:        '0 0 0.3rem',
                      letterSpacing: '0.08em',
                    }}>
                      {project.year}
                    </p>
                    <h3 style={{
                      fontFamily:    'var(--font-display)',
                      fontStyle:     'italic',
                      fontSize:      'clamp(1.2rem, 2vw, 1.75rem)',
                      fontWeight:    300,
                      color:         'rgba(255,255,255,0.95)',
                      letterSpacing: '-0.02em',
                      lineHeight:    1.05,
                      margin:        0,
                    }}>
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div style={{
                  padding:         '1.1rem 1.5rem 1.5rem',
                  display:         'flex',
                  flexDirection:   'column',
                  gap:             '0.75rem',
                  flex:            1,
                  backgroundColor: 'var(--color-surface)',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize:   '0.85rem',
                    fontWeight: 400,
                    color:      'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin:     0,
                    flex:       1,
                  }}>
                    {project.cardDescriptor}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} style={{
                        fontFamily:      'var(--font-sans)',
                        fontSize:        '0.72rem',
                        fontWeight:      500,
                        color:           'var(--color-text-tertiary)',
                        backgroundColor: 'var(--color-surface-2)',
                        border:          '1px solid var(--color-border)',
                        borderRadius:    '999px',
                        padding:         '0.2rem 0.6rem',
                      }}>
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize:   '0.72rem',
                        color:      'var(--color-text-tertiary)',
                        padding:    '0.2rem 0.4rem',
                      }}>
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          display:        'flex',
          justifyContent: 'center',
          paddingTop:     '2rem',
          paddingBottom:  '1rem',
        }}
      >
        <Link
          href="/projects"
          style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '0.85rem',
            fontWeight:    500,
            color:         'var(--color-text-secondary)',
            letterSpacing: '0.06em',
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '0.5rem',
            padding:       '0.6rem 1.4rem',
            borderRadius:  '999px',
            border:        '1px solid var(--color-border)',
            transition:    'color 0.2s, border-color 0.2s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--color-text)';
            e.currentTarget.style.borderColor = 'var(--color-border-hover)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          View all projects →
        </Link>
      </motion.div>
    </section>
  );
}
