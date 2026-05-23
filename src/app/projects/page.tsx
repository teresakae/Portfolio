'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import type { Project } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';

type FilterStatus = 'All' | Project['status'];
const FILTERS: FilterStatus[] = ['All', 'Completed', 'In Progress', 'Concept'];

const CATEGORY_ORDER = ['AI/ML', 'iOS', 'Desktop App', 'Web', 'Product', 'Foundational'];

const CATEGORY_ALIAS: Record<string, string> = {
  'AI/ML':                'AI/ML',
  'Accessibility':        'AI/ML',
  'iOS':                  'iOS',
  'Desktop App':          'Desktop App',
  'Web':                  'Web',
  'Product':              'Product',
  'Foundational':         'Foundational',
};

const pageIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const cardStagger: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: {
      duration: 0.38,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const STATUS_STYLES: Record<Project['status'], { color: string; bg: string; border: string; dot: string }> = {
  Completed:     { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.22)',  dot: '#34d399' },
  'In Progress': { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.22)',  dot: '#fbbf24' },
  Concept:       { color: '#699bff', bg: 'rgba(105,155,255,0.12)', border: 'rgba(105,155,255,0.22)', dot: '#699bff' },
};

function getLastUpdated(): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
}

function resolveGroup(project: Project): string {
  const primary = project.category[0] ?? '';
  return CATEGORY_ALIAS[primary] ?? 'Other';
}

function CategoryGroup({ name, projects }: { name: string; projects: Project[] }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.25rem',
      }}>
        <div style={{
          width: '2px',
          height: '14px',
          backgroundColor: 'var(--color-accent, #699bff)',
          borderRadius: '2px',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}>
          {name}
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.62rem',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.20)',
        }}>
          {projects.length}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            custom={i}
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <ProjectCard project={p} instanceId={`listing-${p.id}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterStatus>('All');

  const filtered = useMemo(() =>
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.status === filter),
    [filter]
  );

  const featured = useMemo(() => PROJECTS.filter((p) => p.featured), []);
  const heroProject = featured[0];
  const featuredStack = featured.slice(1, 3);

  const categoryGroups = useMemo(() => {
    const map = new Map<string, Project[]>();

    for (const name of CATEGORY_ORDER) {
      map.set(name, []);
    }

    for (const p of PROJECTS) {
      const group = resolveGroup(p);
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(p);
    }

    return Array.from(map.entries()).filter(([, projects]) => projects.length > 0);
  }, []);

  const isFiltered = filter !== 'All';

  return (
    <motion.main
      variants={pageIn}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: 'var(--color-bg, #050810)',
        minHeight: '100vh',
        padding: 'clamp(5rem, 8vw, 7rem) clamp(1.25rem, 4vw, 3rem) clamp(4rem, 8vw, 6rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >

      <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '0.75rem',
        }}>
          <div style={{
            width: '18px',
            height: '1px',
            backgroundColor: 'var(--color-accent, #699bff)',
            opacity: 0.7,
          }} />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-accent, #699bff)',
            opacity: 0.8,
          }}>
            Selected Work
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 600,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.94)',
          letterSpacing: '-0.02em',
          lineHeight: 1.0,
          margin: '0 0 1rem',
        }}>
          Projects
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.80rem',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.01em',
        }}>
          <span>{PROJECTS.length} Projects</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>Last updated {getLastUpdated()}</span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '0.4rem',
        flexWrap: 'wrap',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
      }}>
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: active ? 500 : 400,
                color: active ? '#fff' : 'rgba(255,255,255,0.40)',
                backgroundColor: active
                  ? 'var(--color-accent, #699bff)'
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '999px',
                padding: '0.38rem 0.9rem',
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.16)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.40)';
                }
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!isFiltered ? (
          <motion.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {heroProject && (
              <div style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '2px',
                    height: '14px',
                    backgroundColor: 'var(--color-accent, #699bff)',
                    borderRadius: '2px',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                  }}>
                    Featured
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: featuredStack.length > 0 ? '7fr 5fr' : '1fr',
                  gap: '1rem',
                  height: '340px',
                  alignItems: 'stretch',
                }}>
                  <Link
                    href={`/projects/${heroProject.id}`}
                    style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.008 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                      style={{
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        borderRadius: 'var(--radius-card, 14px)',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      {heroProject.coverImage ? (
                        <img
                          src={heroProject.coverImage}
                          alt={heroProject.title}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                        />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, background: heroProject.coverGradient }} />
                      )}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(5,8,16,0.96) 0%, rgba(5,8,16,0.40) 50%, rgba(5,8,16,0.08) 100%)',
                      }} />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1 }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.72rem',
                          fontWeight: 500,
                          color: STATUS_STYLES[heroProject.status].color,
                          backgroundColor: STATUS_STYLES[heroProject.status].bg,
                          border: `1px solid ${STATUS_STYLES[heroProject.status].border}`,
                          borderRadius: 'var(--radius-badge, 8px)',
                          padding: '0.20rem 0.55rem',
                        }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: STATUS_STYLES[heroProject.status].dot, flexShrink: 0 }} />
                          {heroProject.status}
                        </span>
                      </div>
                      <div style={{ position: 'relative', zIndex: 1, padding: '1.25rem 1.4rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
                          {heroProject.category.map((c) => (
                            <span key={c} style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.65rem',
                              fontWeight: 500,
                              color: 'rgba(255,255,255,0.40)',
                              backgroundColor: 'rgba(255,255,255,0.07)',
                              border: '1px solid rgba(255,255,255,0.10)',
                              borderRadius: 'var(--radius-pill, 999px)',
                              padding: '0.15rem 0.5rem',
                              letterSpacing: '0.02em',
                            }}>
                              {c}
                            </span>
                          ))}
                        </div>
                        <h2 style={{
                          fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                          fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                          fontWeight: 600,
                          fontStyle: 'italic',
                          color: 'rgba(255,255,255,0.96)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.08,
                          margin: '0 0 0.3rem',
                        }}>
                          {heroProject.title}
                        </h2>
                        <p style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.78rem',
                          fontWeight: 300,
                          color: 'rgba(255,255,255,0.42)',
                          lineHeight: 1.5,
                          margin: '0 0 0.65rem',
                          maxWidth: '340px',
                        }}>
                          {heroProject.tagline}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.70rem', fontWeight: 400, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.04em' }}>
                            {heroProject.year}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: '0.7rem' }}>·</span>
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.70rem', fontWeight: 500, color: 'var(--color-accent, #699bff)' }}>
                            View project →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>

                  {featuredStack.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                      {featuredStack.map((p) => (
                        <Link key={p.id} href={`/projects/${p.id}`} style={{ textDecoration: 'none', flex: 1, minHeight: 0, display: 'block' }}>
                          <motion.div
                            whileHover={{ scale: 1.012 }}
                            transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                            style={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: 'var(--radius-card, 14px)',
                              overflow: 'hidden',
                              border: '1px solid rgba(255,255,255,0.08)',
                              backgroundColor: 'var(--color-surface, #0d1117)',
                              cursor: 'pointer',
                            }}
                          >
                            <div style={{ position: 'relative', height: '90px', flexShrink: 0, overflow: 'hidden' }}>
                              {p.coverImage ? (
                                <img src={p.coverImage} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                              ) : (
                                <div style={{ position: 'absolute', inset: 0, background: p.coverGradient }} />
                              )}
                              <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem' }}>
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.28rem',
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: '0.66rem',
                                  fontWeight: 500,
                                  color: STATUS_STYLES[p.status].color,
                                  backgroundColor: STATUS_STYLES[p.status].bg,
                                  border: `1px solid ${STATUS_STYLES[p.status].border}`,
                                  borderRadius: 'var(--radius-badge, 8px)',
                                  padding: '0.16rem 0.45rem',
                                }}>
                                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: STATUS_STYLES[p.status].dot, flexShrink: 0 }} />
                                  {p.status}
                                </span>
                              </div>
                            </div>
                            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0.65rem 0.9rem', gap: '0.2rem' }}>
                              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 400, color: 'rgba(255,255,255,0.25)', margin: 0, letterSpacing: '0.02em' }}>
                                {p.year} · {p.category[0]}
                              </p>
                              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 500, color: 'rgba(255,255,255,0.90)', margin: 0, lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {p.title}
                              </h3>
                              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>
                                {p.tagline}
                              </p>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {categoryGroups.map(([name, projects]) => (
              <CategoryGroup key={name} name={name} projects={projects} />
            ))}

          </motion.div>
        ) : (
          <motion.div
            key={`filtered-${filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.25)',
              marginBottom: '1.5rem',
              letterSpacing: '0.02em',
            }}>
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} · {filter}
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.20)' }}>
                No projects with status &quot;{filter}&quot; yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                <AnimatePresence>
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      layout
                      custom={i}
                      variants={cardStagger}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
                    >
                      <ProjectCard project={p} instanceId={`filtered-${p.id}`} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}