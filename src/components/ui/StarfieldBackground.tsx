'use client';

import { useEffect, useRef } from 'react';

interface StarPoint {
  x: number;
  y: number;
  r: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ConstellationStar {
  x: number;
  y: number;
  r: number;
  opacity: number;
  label?: string;
}

interface Constellation {
  name: string;
  stars: ConstellationStar[];
  edges: [number, number][];
  lineOpacity: number;
}

const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Ursa Minor',
    stars: [
      { x: 0.62, y: 0.08, r: 1.6, opacity: 0.85, label: 'Polaris' },
      { x: 0.58, y: 0.13, r: 0.9, opacity: 0.55 },
      { x: 0.55, y: 0.17, r: 0.8, opacity: 0.48 },
      { x: 0.52, y: 0.14, r: 0.7, opacity: 0.42 },
      { x: 0.50, y: 0.10, r: 0.75, opacity: 0.45 },
      { x: 0.54, y: 0.07, r: 0.8, opacity: 0.50 },
      { x: 0.57, y: 0.05, r: 0.7, opacity: 0.42 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]],
    lineOpacity: 0.07,
  },
  {
    name: 'Orion',
    stars: [
      { x: 0.18, y: 0.55, r: 1.3, opacity: 0.72, label: 'Betelgeuse' },
      { x: 0.26, y: 0.52, r: 1.2, opacity: 0.68, label: 'Bellatrix'  },
      { x: 0.19, y: 0.65, r: 1.0, opacity: 0.58 },
      { x: 0.22, y: 0.65, r: 1.0, opacity: 0.60, label: 'Alnilam'    },
      { x: 0.25, y: 0.65, r: 1.0, opacity: 0.58 },
      { x: 0.17, y: 0.75, r: 0.9, opacity: 0.52 },
      { x: 0.28, y: 0.73, r: 1.2, opacity: 0.70, label: 'Rigel'      },
    ],
    edges: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[5,6]],
    lineOpacity: 0.065,
  },
  {
    name: 'Cassiopeia',
    stars: [
      { x: 0.10, y: 0.10, r: 0.9, opacity: 0.55 },
      { x: 0.14, y: 0.07, r: 1.0, opacity: 0.60 },
      { x: 0.18, y: 0.11, r: 0.9, opacity: 0.55 },
      { x: 0.22, y: 0.07, r: 1.0, opacity: 0.58 },
      { x: 0.26, y: 0.10, r: 0.9, opacity: 0.52 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
    lineOpacity: 0.06,
  },
];

interface Planet {
  x: number;
  y: number;
  r: number;
  opacity: number;
  ringColor?: string;
  color: string;
  label: string;
}

const PLANETS: Planet[] = [
  {
    label: 'Jupiter',
    x: 0.80, y: 0.35,
    r: 2.8,
    opacity: 0.80,
    color: '#e8d5b0',
  },
  {
    label: 'Saturn',
    x: 0.72, y: 0.68,
    r: 2.2,
    opacity: 0.65,
    color: '#d4c5a0',
    ringColor: '#c4b590',
  },
  {
    label: 'Venus',
    x: 0.38, y: 0.22,
    r: 1.8,
    opacity: 0.75,
    color: '#f0e8d0',
  },
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildStarField(count: number): StarPoint[] {
  const stars: StarPoint[] = [];

  const reserved = [
    ...CONSTELLATIONS.flatMap(c => c.stars.map(s => ({ x: s.x, y: s.y }))),
    ...PLANETS.map(p => ({ x: p.x, y: p.y })),
  ];

  let attempts = 0;
  while (stars.length < count && attempts < count * 10) {
    attempts++;
    const x = Math.random();
    const y = Math.random();

    const tooClose = reserved.some(r => Math.hypot(r.x - x, r.y - y) < 0.025);
    if (tooClose) continue;

    const roll = Math.random();
    const r = roll < 0.70 ? rand(0.25, 0.55)
            : roll < 0.92 ? rand(0.55, 0.85)
            : rand(0.85, 1.15);

    const opacity = rand(0.08, 0.22) + (r / 1.15) * 0.22;

    stars.push({
      x, y, r,
      opacity,
      twinkleSpeed: rand(0.4, 1.8),
      twinklePhase: rand(0, Math.PI * 2),
    });
  }

  return stars;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const starsRef  = useRef<StarPoint[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    starsRef.current = buildStarField(320);

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function drawStar(
      cx: number, cy: number,
      r: number, opacity: number,
      color = '#ffffff',
    ) {
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fillStyle = color;
      ctx!.globalAlpha = opacity;
      
      ctx!.shadowBlur = 4 + r * 3; 
      ctx!.shadowColor = color;
      
      ctx!.fill();
      
      ctx!.shadowBlur = 0; 
      ctx!.globalAlpha = 1;
    }

    function drawLine(
      ax: number, ay: number,
      bx: number, by: number,
      opacity: number,
    ) {
      ctx!.beginPath();
      ctx!.moveTo(ax, ay);
      ctx!.lineTo(bx, by);
      ctx!.strokeStyle = '#ffffff';
      ctx!.globalAlpha = opacity;
      ctx!.lineWidth = 0.4;
      ctx!.stroke();
      ctx!.globalAlpha = 1;
    }

    function drawPlanetGlow(cx: number, cy: number, r: number, color: string, opacity: number) {
      const grad = ctx!.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 3.5);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'transparent');
      ctx!.beginPath();
      ctx!.arc(cx, cy, r * 3.5, 0, Math.PI * 2);
      ctx!.fillStyle = grad;
      ctx!.globalAlpha = opacity * 0.18;
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }

    function drawSaturnRing(cx: number, cy: number, r: number, color: string, opacity: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.scale(1, 0.32);
      ctx!.beginPath();
      ctx!.ellipse(0, 0, r * 2.6, r * 2.6, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = color;
      ctx!.lineWidth = r * 0.55;
      ctx!.globalAlpha = opacity * 0.55;
      ctx!.stroke();
      ctx!.globalAlpha = 1;
      ctx!.restore();
    }

    let startTime = performance.now();

    function draw(now: number) {
      if (!canvas || !ctx) return;
      const t = (now - startTime) / 1000;

      const W = canvas.width;
      const H = canvas.height;

      const mx = (mouseRef.current.x - 0.5) * -10;
      const my = (mouseRef.current.y - 0.5) * -10;

      const driftX = Math.sin(t * 0.013) * 6 + mx;
      const driftY = Math.cos(t * 0.009) * 4 + my;

      ctx.clearRect(0, 0, W, H);

      const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.5, W * 0.75);
      bg.addColorStop(0, '#060a14');
      bg.addColorStop(0.55, '#03050a');
      bg.addColorStop(1, '#010204');
      ctx.fillStyle = bg;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, W, H);

      const mw = ctx.createRadialGradient(W * 0.5, H * 0.52, 0, W * 0.5, H * 0.52, W * 0.55);
      mw.addColorStop(0, 'rgba(180,200,255,0.028)');
      mw.addColorStop(0.5, 'rgba(160,180,240,0.012)');
      mw.addColorStop(1, 'transparent');
      ctx.fillStyle = mw;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.translate(driftX, driftY);

      for (const s of starsRef.current) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const op = s.opacity * (0.75 + twinkle * 0.25);
        drawStar(s.x * W, s.y * H, s.r, op);
      }

      for (const c of CONSTELLATIONS) {
        for (const [ai, bi] of c.edges) {
          const a = c.stars[ai];
          const b = c.stars[bi];
          drawLine(a.x * W, a.y * H, b.x * W, b.y * H, c.lineOpacity);
        }
      }

      for (const c of CONSTELLATIONS) {
        for (const s of c.stars) {
          const twinkle = 0.5 + 0.5 * Math.sin(t * 0.9 + s.x * 10);
          const op = s.opacity * (0.82 + twinkle * 0.18);

          if (s.label) {
            ctx.save();
            ctx.globalAlpha = op * 0.25;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.4;
            const cx = s.x * W;
            const cy = s.y * H;
            const spike = s.r * 5;
            ctx.beginPath();
            ctx.moveTo(cx - spike, cy); ctx.lineTo(cx + spike, cy);
            ctx.moveTo(cx, cy - spike); ctx.lineTo(cx, cy + spike);
            ctx.stroke();
            ctx.restore();
          }

          drawStar(s.x * W, s.y * H, s.r, op);
        }
      }

      for (const p of PLANETS) {
        const cx = p.x * W;
        const cy = p.y * H;

        drawPlanetGlow(cx, cy, p.r, p.color, p.opacity);

        if (p.ringColor) {
          drawSaturnRing(cx, cy, p.r, p.ringColor, p.opacity);
        }

        drawStar(cx, cy, p.r, p.opacity, p.color);
      }

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
