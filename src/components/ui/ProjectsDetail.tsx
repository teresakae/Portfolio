'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Project } from '@/data/projects';
import ProjectLightbox from '@/components/ui/ProjectLightbox';

const tabIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0, y: -6,
    transition: { duration: 0.18 },
  },
};

const STATUS_STYLES: Record<Project['status'], { color: string; bg: string; border: string; dot: string }> = {
  Completed:     { color: '#34d399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.20)',  dot: '#34d399' },
  'In Progress': { color: '#fbbf24', bg: 'rgba(251,191,36,0.10)', border: 'rgba(251,191,36,0.20)',  dot: '#fbbf24' },
  Concept:       { color: '#699bff', bg: 'rgba(105,155,255,0.10)', border: 'rgba(105,155,255,0.20)', dot: '#699bff' },
};

function ExternalLinkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.60rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.30)',
      marginBottom: '0.5rem',
    }}>
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const s = STATUS_STYLES[status];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.75rem',
      fontWeight: 500,
      color: s.color,
      backgroundColor: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: '999px',
      padding: '0.15rem 0.60rem',
    }}>
      {status}
    </span>
  );
}

function RolePill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontSize: '0.75rem',
      fontWeight: 500,
      color: 'var(--color-accent, #699bff)',
      backgroundColor: 'rgba(105,155,255,0.08)',
      border: '1px solid rgba(105,155,255,0.25)',
      borderRadius: '999px',
      padding: '0.15rem 0.60rem',
      whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontSize: '0.75rem',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.75)',
      backgroundColor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: '999px',
      padding: '0.15rem 0.60rem',
      whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </span>
  );
}

function TechPill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontSize: '0.70rem',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.60)',
      backgroundColor: 'transparent',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '6px',
      padding: '0.15rem 0.5rem',
      whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </span>
  );
}

function LinkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.70rem',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.80)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: '6px',
        padding: '0.22rem 0.55rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'color 0.15s, border-color 0.15s, background-color 0.15s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = '#fff';
        el.style.borderColor = 'rgba(255,255,255,0.28)';
        el.style.backgroundColor = 'rgba(255,255,255,0.09)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = 'rgba(255,255,255,0.80)';
        el.style.borderColor = 'rgba(255,255,255,0.13)';
        el.style.backgroundColor = 'rgba(255,255,255,0.05)';
      }}
    >
      {children}
      <ExternalLinkIcon />
    </a>
  );
}

function HeroBanner({ project }: { project: Project }) {
  const displayRole = project.role || 'Developer';
  const links = project.links ?? [];

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{
        height: '180px',
        width: '100%',
        position: 'relative',
        background: project.coverImage
          ? `url(${project.coverImage}) center / cover no-repeat`
          : project.coverGradient || 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.70rem',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.9)',
          backgroundColor: 'rgba(0,0,0,0.40)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '999px',
          padding: '0.25rem 0.75rem',
          backdropFilter: 'blur(8px)',
        }}>
          {project.platform}
        </span>

        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#fff',
          borderRadius: '14px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          padding: '10px',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#4db6ac' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#ba68c8' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#e57373' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#4fc3f7' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#ffb74d' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#ff8a65' }} />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: 'rgba(255,255,255,0.015)',
      }}>
        <div style={{ padding: '1rem 1.25rem', borderRight: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <MetaLabel>STATUS</MetaLabel>
          <StatusBadge status={project.status} />
        </div>

        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <MetaLabel>{links.length > 0 ? 'LINKS' : 'PLATFORM'}</MetaLabel>
          {links.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {links.map((link, i) => (
                <LinkPill key={i} href={link.url}>{link.label}</LinkPill>
              ))}
            </div>
          ) : (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 500, color: '#fff' }}>
              {project.platform}
            </span>
          )}
        </div>

        <div style={{ padding: '1rem 1.25rem', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <MetaLabel>ROLE & CATEGORY</MetaLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            <RolePill>{displayRole}</RolePill>
            {project.category.map((c) => <Pill key={c}>{c}</Pill>)}
          </div>
        </div>

        <div style={{ padding: '1rem 1.25rem' }}>
          <MetaLabel>TECH STACK</MetaLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tech.map((t) => <TechPill key={t}>{t}</TechPill>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function HookBlock({ project }: { project: Project }) {
  const { hook } = project;
  if (!hook.moment && !hook.decision && !hook.truth) return null;

  const rows: { label: string; text: string }[] = [
    { label: 'MOMENT',   text: hook.moment },
    { label: 'DECISION', text: hook.decision },
    { label: 'TRUTH',    text: hook.truth },
  ];

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem',
      backgroundColor: 'rgba(255,255,255,0.005)',
    }}>
      {rows.map(({ label, text }) => (
        <div key={label} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.3)',
          }}>
            {label}
          </span>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.90rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

const TABS = ['Story', 'Craft', 'Screens'] as const;
type Tab = (typeof TABS)[number];

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      textAlign: 'center',
      backgroundColor: 'rgba(255,255,255,0.01)',
    }}>
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            position: 'relative',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: active === tab ? 'var(--color-accent, #699bff)' : 'rgba(255,255,255,0.4)',
            background: 'none',
            border: 'none',
            padding: '1rem 0',
            cursor: 'pointer',
            transition: 'color 0.18s',
          }}
        >
          {tab}
          {active === tab && (
            <motion.div
              layoutId="tab-indicator"
              style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: 'var(--color-accent, #699bff)',
              }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

function StoryTab({ project }: { project: Project }) {
  return (
    <div style={{
      padding: '2rem 1.5rem',
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <MetaLabel>OVERVIEW</MetaLabel>

      <div className="story-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.tabs.story.content}
        </ReactMarkdown>
      </div>

      <style>{`
        .story-prose p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 400;
          color: rgba(255,255,255,0.70);
          line-height: 1.75;
          margin: 0 0 1.4rem 0;
          text-align: justify;
        }
        .story-prose strong {
          color: rgba(255,255,255,0.96);
          font-weight: 600;
        }
        .story-prose em {
          color: var(--color-accent, #699bff);
          font-style: italic;
        }
        .story-prose h2, .story-prose h3 {
          font-family: var(--font-sans);
          font-weight: 500;
          color: rgba(255,255,255,0.88);
          letter-spacing: -0.01em;
          margin: 2rem 0 0.65rem;
          line-height: 1.3;
        }
        .story-prose h2 { font-size: 1.05rem; }
        .story-prose h3 { font-size: 0.92rem; }
        .story-prose ul, .story-prose ol {
          padding-left: 1.4rem;
          color: rgba(255,255,255,0.68);
          font-size: 0.93rem;
          line-height: 1.75;
          margin: 0.5rem 0 1.4rem;
        }
        .story-prose li {
          margin-bottom: 0.3rem;
        }
        .story-prose li::marker {
          color: rgba(255,255,255,0.25);
        }
        .story-prose blockquote {
          border-left: 2px solid var(--color-accent, #699bff);
          padding: 0.1rem 0 0.1rem 1rem;
          margin: 1.2rem 0;
          font-style: italic;
          color: rgba(255,255,255,0.50);
          font-size: 0.92rem;
        }
        .story-prose code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.80rem;
          color: var(--color-accent, #699bff);
          background: rgba(105,155,255,0.08);
          padding: 0.10em 0.36em;
          border-radius: 4px;
        }
        .story-prose hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}

function CraftTab({ notes }: { notes: string }) {
  return (
    <div style={{
      padding: 'clamp(1.5rem, 3vw, 2rem)',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <div className="craft-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{notes}</ReactMarkdown>
      </div>
      <style>{`
        .craft-prose h2, .craft-prose h3 {
          font-family: var(--font-sans);
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.01em;
          margin: 1.75rem 0 0.65rem;
          line-height: 1.3;
        }
        .craft-prose h2 { font-size: 1.05rem; }
        .craft-prose h3 { font-size: 0.92rem; }
        .craft-prose p {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 400;
          color: rgba(255,255,255,0.60);
          line-height: 1.80;
          margin: 0 0 0.9rem;
        }
        .craft-prose code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.78rem;
          color: var(--color-accent, #699bff);
          background: rgba(105,155,255,0.08);
          padding: 0.12em 0.38em;
          border-radius: 4px;
        }
        .craft-prose pre {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 1rem 1.1rem;
          overflow-x: auto;
          margin: 1.1rem 0;
        }
        .craft-prose pre code {
          color: rgba(255,255,255,0.58);
          background: none;
          padding: 0;
        }
        .craft-prose blockquote {
          border-left: 2px solid var(--color-accent, #699bff);
          padding-left: 1rem;
          margin: 1.1rem 0;
          font-style: italic;
          color: rgba(255,255,255,0.45);
        }
        .craft-prose ul, .craft-prose ol {
          padding-left: 1.3rem;
          color: rgba(255,255,255,0.60);
          line-height: 1.78;
          font-size: 0.88rem;
          margin: 0.65rem 0;
        }
        .craft-prose li { margin-bottom: 0.25rem; }
        .craft-prose li::marker { color: rgba(255,255,255,0.25); }
        .craft-prose strong { color: rgba(255,255,255,0.85); font-weight: 500; }
        .craft-prose hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin: 1.75rem 0;
        }
      `}</style>
    </div>
  );
}

function ScreensTab({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>
          No screens yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        columns: '2 240px',
        columnGap: '0.65rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {images.map((src, i) => (
          <motion.div
            key={src}
            whileHover={{ scale: 1.016 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(i)}
            style={{
              breakInside: 'avoid',
              marginBottom: '0.65rem',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'zoom-in',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <img src={src} alt={`Screen ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ProjectLightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => ((i ?? 0) - 1 + images.length) % images.length)}
            onNext={() => setLightboxIndex((i) => ((i ?? 0) + 1) % images.length)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsDetail({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<Tab>('Story');
  const [hasInteracted, setHasInteracted] = useState(false);

  function handleTabChange(t: Tab) {
    setHasInteracted(true);
    setActiveTab(t);
  }

  return (
    <div style={{ backgroundColor: '#0f1115', minHeight: '100vh', color: '#fff' }}>
      <HeroBanner project={project} />
      <HookBlock project={project} />
      <TabBar active={activeTab} onChange={handleTabChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabIn}
          initial={hasInteracted ? 'hidden' : false}
          animate="visible"
          exit="exit"
        >
          {activeTab === 'Story'   && <StoryTab project={project} />}
          {activeTab === 'Craft'   && <CraftTab notes={project.tabs.craft.notes} />}
          {activeTab === 'Screens' && <ScreensTab images={project.tabs.visuals.images} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}