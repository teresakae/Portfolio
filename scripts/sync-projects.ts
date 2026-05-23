import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const SHEET_PATH = path.resolve(__dirname, '../teresa_kae_projects.xlsx');
const OUT_PATH   = path.resolve(__dirname, '../src/data/projects.ts');
const SHEET_NAME = 'All Projects';

const COL: Record<string, string> = {
  'id':                       'id',
  'title':                    'title',
  'tagline':                  'tagline',
  'cardDescriptor':           'cardDescriptor',
  'year':                     'year',
  'status':                   'status',
  'category[ ]':              'category',
  'tech[ ]':                  'tech',
  'platform':                 'platform',
  'featured':                 'featured',
  'coverGradient':            'coverGradient',
  'coverImage':               'coverImage',
  'hook.moment':              'hook_moment',
  'hook.decision':            'hook_decision',
  'hook.truth':               'hook_truth',
  'tabs.story.content':       'story',
  'tabs.craft.notes (markdown)': 'craft',
  'links (JSON)':             'links',
  'role':                     'role',
};

const VALID_STATUSES = new Set(['Completed', 'In Progress', 'Concept']);

function parseCSV(val: string | undefined): string[] {
  if (!val) return [];
  return val.split(',').map((s) => s.trim()).filter(Boolean);
}

function parseLinks(val: string | undefined): { label: string; url: string }[] {
  if (!val) return [];
  try {
    return JSON.parse(val);
  } catch {
    return [];
  }
}

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function bool(val: unknown): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return val.toLowerCase() === 'true';
  return Boolean(val);
}

interface Row {
  id: string;
  title: string;
  tagline: string;
  cardDescriptor: string;
  year: string;
  status: string;
  category: string[];
  tech: string[];
  platform: string;
  featured: boolean;
  coverGradient: string;
  coverImage?: string;
  hook_moment: string;
  hook_decision: string;
  hook_truth: string;
  story: string;
  craft: string;
  links: { label: string; url: string }[];
  role: string;
}

function render(row: Row): string {
  const linksStr = row.links.length
    ? `[${row.links.map((l) => `{ label: '${l.label}', url: '${l.url}' }`).join(', ')}]`
    : '[]';

  const coverImageLine = row.coverImage
    ? `  coverImage: \`${esc(row.coverImage)}\`,\n`
    : '';

  return `  {
    id: '${row.id}',
    title: \`${esc(row.title)}\`,
    tagline: \`${esc(row.tagline)}\`,
    cardDescriptor: \`${esc(row.cardDescriptor)}\`,
    year: '${row.year}',
    status: '${row.status}' as const,
    category: ${JSON.stringify(row.category)},
    tech: ${JSON.stringify(row.tech)},
    platform: \`${esc(row.platform)}\`,
    coverGradient: \`${esc(row.coverGradient)}\`,
${coverImageLine}    featured: ${row.featured},
    role: \`${esc(row.role)}\`,
    links: ${linksStr},
    hook: {
      moment:   \`${esc(row.hook_moment)}\`,
      decision: \`${esc(row.hook_decision)}\`,
      truth:    \`${esc(row.hook_truth)}\`,
    },
    tabs: {
      story:   { content: \`${esc(row.story)}\` },
      craft:   { notes:   \`${esc(row.craft)}\` },
      visuals: { images:  [] },
    },
  }`;
}

const wb = XLSX.readFile(SHEET_PATH);
const ws = wb.Sheets[SHEET_NAME];
if (!ws) throw new Error(`Sheet "${SHEET_NAME}" not found in ${SHEET_PATH}`);

const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
  defval: '',
  raw: false,
  range: 1,
}) as Record<string, string>[];

const rows: Row[] = [];

for (const r of raw) {
  const id = (r['id'] ?? '').toString().trim();
  if (!id || id.startsWith(' ') || !r['title']) continue;
  const status = (r['status'] ?? '').toString().trim();
  if (!VALID_STATUSES.has(status)) continue;

  rows.push({
    id,
    title:           r['title'] ?? '',
    tagline:         r['tagline'] ?? '',
    cardDescriptor:  r['cardDescriptor'] ?? '',
    year:            r['year'] ?? '',
    status,
    category:        parseCSV(r['category[ ]']),
    tech:            parseCSV(r['tech[ ]']),
    platform:        r['platform'] ?? '',
    featured:        bool(r['featured']),
    coverGradient:   r['coverGradient'] ?? '',
    coverImage:      r['coverImage'] || undefined,
    hook_moment:     r['hook.moment'] ?? '',
    hook_decision:   r['hook.decision'] ?? '',
    hook_truth:      r['hook.truth'] ?? '',
    story:           r['tabs.story.content'] ?? '',
    craft:           r['tabs.craft.notes (markdown)'] ?? '',
    links:           parseLinks(r['links (JSON)']),
    role:            r['role'] ?? '',
  });
}

const output = `export interface Link {
  label: string;
  url: string;
}

export interface Hook {
  moment: string;
  decision: string;
  truth: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  cardDescriptor: string;
  year: string;
  status: 'Completed' | 'In Progress' | 'Concept';
  category: string[];
  tech: string[];
  platform: string;
  coverGradient: string;
  coverImage?: string;
  featured: boolean;
  role: string;
  links: Link[];
  hook: Hook;
  tabs: {
    story: { content: string };
    craft: { notes: string };
    visuals: { images: string[] };
  };
}

export const PROJECTS: Project[] = [
${rows.map(render).join(',\n\n')}
];
`;

fs.writeFileSync(OUT_PATH, output, 'utf-8');
console.log(`✓ Wrote ${rows.length} projects to ${OUT_PATH}`);
