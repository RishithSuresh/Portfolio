// ─────────────────────────────────────────────────────────────
// Single source of truth for portfolio content.
// Replace these values with your own — everything in the UI
// reads from here.
// ─────────────────────────────────────────────────────────────

export const identity = {
  callsign: 'AETHER',
  name: 'Rishith Suresh',
  role: 'AI / Full-Stack Developer',
  tagline: 'Architecting intelligent systems & cinematic interfaces.',
  location: 'Earth · Remote',
  status: 'AVAILABLE FOR MISSIONS',
  bio: `I design and build intelligent products at the intersection of AI, full-stack
engineering and motion design. From neural pipelines to choreographed
interfaces, I treat every system as an experience.`,
};

export const stats = [
  { label: 'Years in field', value: 6, suffix: '+' },
  { label: 'Projects shipped', value: 42, suffix: '' },
  { label: 'Models deployed', value: 17, suffix: '' },
  { label: 'Cups of coffee', value: 9001, suffix: '' },
];

export const attributes = [
  { label: 'Architecture', value: 92 },
  { label: 'AI / ML', value: 88 },
  { label: 'Frontend craft', value: 95 },
  { label: 'Motion design', value: 84 },
  { label: 'DevOps', value: 76 },
];

export const zones = [
  { id: 'home', label: 'Origin', subtitle: 'Entry point', glyph: '◇' },
  { id: 'about', label: 'Identity', subtitle: 'Operator profile', glyph: '◉' },
  { id: 'projects', label: 'Vault', subtitle: 'Mission archive', glyph: '◆' },
  { id: 'skills', label: 'Constellation', subtitle: 'Skill matrix', glyph: '✦' },
  { id: 'experience', label: 'Trajectory', subtitle: 'Mission log', glyph: '⌖' },
  { id: 'contact', label: 'Uplink', subtitle: 'Open channel', glyph: '⌬' },
];

export const skills = [
  { name: 'TypeScript', group: 'Frontend', level: 0.95 },
  { name: 'React', group: 'Frontend', level: 0.96 },
  { name: 'Three.js / R3F', group: 'Frontend', level: 0.88 },
  { name: 'GSAP', group: 'Frontend', level: 0.86 },
  { name: 'GLSL', group: 'Frontend', level: 0.72 },
  { name: 'Node.js', group: 'Backend', level: 0.9 },
  { name: 'Python', group: 'Backend', level: 0.92 },
  { name: 'Postgres', group: 'Backend', level: 0.84 },
  { name: 'Redis', group: 'Backend', level: 0.78 },
  { name: 'PyTorch', group: 'AI', level: 0.86 },
  { name: 'LangChain', group: 'AI', level: 0.82 },
  { name: 'Vector DBs', group: 'AI', level: 0.8 },
  { name: 'Docker', group: 'Cloud', level: 0.84 },
  { name: 'AWS', group: 'Cloud', level: 0.78 },
  { name: 'Kubernetes', group: 'Cloud', level: 0.7 },
];

export const projects = [
  {
    id: 'p-01',
    code: 'M-001',
    title: 'Helios Neural Engine',
    summary: 'Realtime multi-agent orchestration platform for autonomous research workflows.',
    role: 'Lead Engineer',
    year: 2025,
    stack: ['TypeScript', 'Node', 'LangGraph', 'Postgres', 'Redis'],
    tags: ['AI', 'Infra'],
    accent: 'emerald',
  },
  {
    id: 'p-02',
    code: 'M-002',
    title: 'Aurora Interface Kit',
    summary: 'A cinematic React component system with shader-driven motion primitives.',
    role: 'Creator',
    year: 2025,
    stack: ['React', 'R3F', 'GLSL', 'Framer Motion'],
    tags: ['Design Systems', 'Motion'],
    accent: 'cyan',
  },
  {
    id: 'p-03',
    code: 'M-003',
    title: 'Obsidian Vault OS',
    summary: 'Encrypted personal knowledge OS with semantic search and live-graph navigation.',
    role: 'Solo build',
    year: 2024,
    stack: ['Rust', 'SvelteKit', 'Qdrant'],
    tags: ['Tooling', 'AI'],
    accent: 'silver',
  },
  {
    id: 'p-04',
    code: 'M-004',
    title: 'Lumen Live',
    summary: 'Sub-100ms streaming inference for collaborative creative tooling.',
    role: 'Backend Lead',
    year: 2024,
    stack: ['Go', 'gRPC', 'WebRTC', 'Triton'],
    tags: ['AI', 'Realtime'],
    accent: 'emerald',
  },
];

export const experience = [
  { year: '2024 — Now', title: 'Principal Engineer', org: 'Independent Studio', summary: 'Designing autonomous systems & cinematic product surfaces for selected partners.' },
  { year: '2022 — 2024', title: 'Staff Engineer', org: 'Stealth AI', summary: 'Led model serving infrastructure powering multi-tenant inference at scale.' },
  { year: '2020 — 2022', title: 'Senior Full-Stack', org: 'Northwind Labs', summary: 'Shipped flagship realtime collaboration product end-to-end.' },
  { year: '2018 — 2020', title: 'Software Engineer', org: 'Helios Systems', summary: 'Built data pipelines and internal tooling for ML research teams.' },
];

export const channels = [
  { label: 'Email', value: 'hello@yourdomain.dev', href: 'mailto:hello@yourdomain.dev' },
  { label: 'GitHub', value: 'github.com/yourname', href: 'https://github.com/' },
  { label: 'LinkedIn', value: 'linkedin.com/in/yourname', href: 'https://linkedin.com/' },
  { label: 'X', value: '@yourname', href: 'https://x.com/' },
];
