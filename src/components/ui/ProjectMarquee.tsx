'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { Project } from '@/data/projects';
import ProjectCard from './ProjectCard';

const SPEED = 0.6;
const DRAG_MULTIPLIER = 1.4;

export default function ProjectMarquee({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const velocityRef = useRef(0);
  const lastDragX = useRef(0);
  const [dragging, setDragging] = useState(false);

  const items = [...projects, ...projects, ...projects];

  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!isPausedRef.current && !isDraggingRef.current) {
      xRef.current -= SPEED;
    } else if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.1) {
      xRef.current += velocityRef.current;
      velocityRef.current *= 0.94;
    }

    const setWidth = track.scrollWidth / 3;
    if (xRef.current <= -setWidth) xRef.current += setWidth;
    if (xRef.current >= 0) xRef.current -= setWidth;

    track.style.transform = `translateX(${xRef.current}px)`;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = xRef.current;
    lastDragX.current = e.clientX;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - lastDragX.current;
    velocityRef.current = delta * DRAG_MULTIPLIER;
    xRef.current += delta * DRAG_MULTIPLIER;
    lastDragX.current = e.clientX;
  };

  const onPointerUp = () => {
    isDraggingRef.current = false;
    setDragging(false);
  };

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '6rem',
          background: 'linear-gradient(to right, var(--color-bg), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '6rem',
          background: 'linear-gradient(to left, var(--color-bg), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '1.25rem',
          padding: '1rem 0 1.5rem',
          willChange: 'transform',
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            project={project}
            instanceId={`marquee-${project.id}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
