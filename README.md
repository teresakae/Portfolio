# Teresa Kae — Portfolio

Personal portfolio site. Showcasing a craft-driven iOS Developer with a product conscience. Currently building at the Apple Developer Academy, Bali Cohort 2026.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16+ (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Smooth Scroll | @studio-freight/react-lenis |
| Fonts | DM Sans + Cormorant Garamond via `next/font/google` |
| Markdown | `react-markdown` + `remark-gfm` |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Home
│   ├── globals.css
│   └── projects/
│       ├── page.tsx              # /projects listing
│       └── [id]/
│           └── page.tsx          # /projects/[id] detail
├── components/
│   ├── layout/
│   │   ├── LenisProvider.tsx
│   │   ├── Navbar.tsx
│   │   └── SiteShell.tsx
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── BeyondCode.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Timeline.tsx
│   │   └── Workflow.tsx
│   └── ui/
│       ├── FlipCard.tsx
│       ├── LayoutPreloader.tsx
│       ├── MagneticGlowButton.tsx
│       ├── ParallaxFloating.tsx
│       ├── ProjectCard.tsx
│       ├── ProjectLightbox.tsx
│       ├── ProjectMarquee.tsx
│       ├── ProjectsDetail.tsx
│       └── TextRotate.tsx
├── data/
│   └── projects.ts               # PROJECTS array + Project interface
├── hooks/
│   ├── useLenis.ts
│   └── useMousePositionRef.ts
└── lib/
    └── utils.ts
```

---

## Design System

### Colors

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `#050810` | Page background |
| `--color-surface` | `#0d1117` | Card surfaces |
| `--color-text` | `rgba(255,255,255,0.92)` | Primary text |
| `--color-text-secondary` | `rgba(255,255,255,0.55)` | Body copy |
| `--color-accent` | `#699bff` | Links, highlights |
| `--color-dot-green` | `#34d399` | Availability indicator |

### Typography

**DM Sans** (`--font-sans`) — weights 300, 400, 500 only.

**Cormorant Garamond** (`--font-display`) — weights 300, 400, 600, always italic. Used for all display headings.

### Spacing

All spacing uses `clamp()` for fluid scaling:

```css
--space-section-y: clamp(6rem, 12vw, 10rem);
--space-section-x: clamp(1.5rem, 6vw, 5rem);
```

---

## Pages

### Home (`/`)

Sections in order: `Hero → Projects (peek) → About → BeyondCode → Timeline`

The `<Projects peek />` prop hides the section header and removes top padding so the first project card peeks above the fold, driving scroll engagement.

### Projects (`/projects`)

Full listing with filter bar: `All · Completed · In Progress · Concept`. Featured editorial block for `featured: true` projects, then category-grouped cards below.

### Project Detail (`/projects/[id]`)

Bento above-the-fold layout with tabbed content: Overview · Blueprint · Visuals.

---

## Data

All project content lives in `src/data/projects.ts`. To add or update a project, edit only this file — no component changes needed.

```typescript
export interface Project {
  id: string;
  title: string;
  tagline: string;
  year: string;
  status: 'Completed' | 'In Progress' | 'Concept';
  category: string[];
  tech: string[];
  coverGradient: string;
  coverImage?: string;
  featured: boolean;
  tabs: {
    overview: { description: string; platform: string; };
    blueprint: { notes: string; };   // Markdown
    visuals: { images: string[]; };
  };
}
```

---

## Architecture Notes

- **Never** use `window.scroll` or `document.scroll` — all scroll detection goes through `useLenis(({ scroll }) => ...)`
- Framer Motion ease tuples must be cast: `ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]`
- Tailwind CSS v4: use `@import "tailwindcss"` only, never `@tailwind` directives
- `<LenisProvider>` wraps the app once in `layout.tsx` — never instantiate Lenis elsewhere

---