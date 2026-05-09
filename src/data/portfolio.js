// ─────────────────────────────────────────────────────────────
// Single source of truth for portfolio content.
// ─────────────────────────────────────────────────────────────

export const identity = {
  callsign: 'RISHITH',
  name: 'Rishith Suresh',
  role: 'Full-Stack & AI Developer',
  tagline: 'Engineering intelligent systems at the edge of full-stack & AI.',
  location: 'Bengaluru, India',
  status: 'OPEN TO OPPORTUNITIES',
  bio: `B.E. Computer Science student at BMS Institute of Technology (CGPA 8.80),
building full-stack products, blockchain systems, and ML-powered tools.
I blend backend depth with frontend craft — from RESTful APIs to
real-time pipelines and neural networks.`,
};

export const stats = [
  { label: 'Projects shipped', value: 5, suffix: '+' },
  { label: 'APIs built', value: 28, suffix: '+' },
  { label: 'CGPA', value: 8.80, suffix: '' },
  { label: 'Hackathons', value: 3, suffix: '+' },
];

export const attributes = [
  { label: 'Full-Stack Development', value: 90 },
  { label: 'AI / ML Engineering', value: 82 },
  { label: 'Blockchain / Web3', value: 75 },
  { label: 'Database Design', value: 85 },
  { label: 'Security & DevOps', value: 72 },
];

export const zones = [
  { id: 'home', label: 'Origin', subtitle: 'Entry point', glyph: '◇' },
  { id: 'about', label: 'Identity', subtitle: 'Operator profile', glyph: '◉' },
  { id: 'projects', label: 'Vault', subtitle: 'Mission archive', glyph: '◆' },
  { id: 'skills', label: 'Constellation', subtitle: 'Skill matrix', glyph: '✦' },
  { id: 'certifications', label: 'Credentials', subtitle: 'Proof stack', glyph: '⟡' },
  { id: 'experience', label: 'Trajectory', subtitle: 'Mission log', glyph: '⌖' },
  { id: 'contact', label: 'Uplink', subtitle: 'Open channel', glyph: '⌬' },
];

export const credentials = [
  {
    id: 'cred-01',
    label: 'Academic credential',
    issuer: 'BMS Institute of Technology',
    detail: 'B.E. Computer Science · CGPA 8.80',
    status: 'Verified in bio',
  },
  {
    id: 'cred-02',
    label: 'Leadership credential',
    issuer: 'ARVR HUB',
    detail: 'President · Apr 2025 — Present',
    status: 'Ongoing role',
  },
  {
    id: 'cred-03',
    label: 'Technical credentials',
    issuer: 'Portfolio focus',
    detail: 'Full-stack, AI/ML, blockchain, security',
    status: 'Active practice',
  },
];

export const skills = [
  { name: 'Python', group: 'Languages', level: 0.90 },
  { name: 'C', group: 'Languages', level: 0.82 },
  { name: 'Solidity', group: 'Languages', level: 0.74 },
  { name: 'Java', group: 'Languages', level: 0.78 },

  { name: 'HTML', group: 'Front-end', level: 0.92 },
  { name: 'CSS', group: 'Front-end', level: 0.92 },
  { name: 'JavaScript', group: 'Front-end', level: 0.88 },
  { name: 'React', group: 'Front-end', level: 0.85 },
  { name: 'Node.js', group: 'Front-end', level: 0.88 },
  { name: 'Express.js', group: 'Front-end', level: 0.86 },
  { name: 'Flutter', group: 'Front-end', level: 0.72 },

  { name: 'SQL', group: 'Database', level: 0.84 },
  { name: 'MongoDB', group: 'Database', level: 0.80 },

  { name: 'Wireshark', group: 'Networking', level: 0.70 },
  { name: 'Nessus', group: 'Networking', level: 0.68 },
  { name: 'Nmap', group: 'Networking', level: 0.67 },

  { name: 'VS Code', group: 'Tools', level: 0.95 },
  { name: 'Jupyter Notebook', group: 'Tools', level: 0.88 },
  { name: 'Blender', group: 'Tools', level: 0.65 },
  { name: 'Unity', group: 'Tools', level: 0.62 },
  { name: 'Figma', group: 'Tools', level: 0.75 },
  { name: 'Power BI', group: 'Tools', level: 0.66 },
  { name: 'Android Studio', group: 'Tools', level: 0.64 },
  { name: 'Arduino IDE', group: 'Tools', level: 0.60 },
];

export const projects = [
  {
    id: 'p-01',
    code: 'M-001',
    title: 'Grass-Roots',
    summary: 'A transparent produce & pricing tracking system with 16 pages, 8 REST API routes, and a relational database of 15+ tables. Integrates blockchain payments via Solidity smart contracts and JWT-based auth with bcrypt encryption and 5+ security measures.',
    role: 'Full-Stack Engineer',
    year: 2024,
    stack: ['Node.js', 'Express.js', 'SQL', 'Solidity', 'JWT', 'bcrypt'],
    tags: ['Full-Stack', 'Blockchain'],
    accent: 'emerald',
    link: 'https://github.com/RishithSuresh/Grass-Roots',
  },
  {
    id: 'p-02',
    code: 'M-002',
    title: 'Glow-Wise',
    summary: 'Health metrics platform with 10+ relational tables ensuring 100% data integrity, 60+ pre-loaded food items with calorie tracking, and a Node.js backend with connection pooling (10 concurrent users), bcrypt encryption, and 6+ API endpoints.',
    role: 'Backend Lead',
    year: 2024,
    stack: ['Node.js', 'SQL', 'bcrypt', 'REST API'],
    tags: ['Health', 'Backend'],
    accent: 'cyan',
    link: 'https://github.com/RishithSuresh/Glow-Wise',
  },
  {
    id: 'p-03',
    code: 'M-003',
    title: 'Threat-Analyzer',
    summary: 'AI-powered risk profiling tool processing 300 transactions via rule-based AML scoring, 6 REST APIs for uploads, alerts, patterns, summaries, and CSV exports, plus 3 configurable detection rules including $100K threshold and 24-hour frequency monitoring.',
    role: 'AI / Backend Engineer',
    year: 2024,
    stack: ['Python', 'Node.js', 'REST API', 'ML'],
    tags: ['AI', 'Security'],
    accent: 'silver',
    link: 'https://github.com/RishithSuresh/Threat-Analyzer',
  },
  {
    id: 'p-04',
    code: 'M-004',
    title: 'My-Wallet',
    summary: 'Personal expense tracker with 28 RESTful APIs, 6 interactive modules covering expenses, income, budgets, categories, and analytics, plus a real-time financial health scoring system built with Chart.js.',
    role: 'Full-Stack Developer',
    year: 2024,
    stack: ['Node.js', 'MySQL', 'Chart.js', 'REST API'],
    tags: ['Finance', 'Full-Stack'],
    accent: 'emerald',
    link: 'https://github.com/RishithSuresh/My-Wallet',
  },
  {
    id: 'p-05',
    code: 'M-005',
    title: 'Sign-Language-Recognition-System',
    summary: 'End-to-end ASL recognition using CNN, Random Forest, SVM, and KNN with modular data loading, preprocessing & augmentation, HOG feature extraction, training orchestration, and evaluation visualizations. CNN accuracy: 94–96%; RF/SVM/KNN: 84–89%.',
    role: 'ML Engineer',
    year: 2024,
    stack: ['Python', 'CNN', 'OpenCV', 'scikit-learn', 'Streamlit'],
    tags: ['AI', 'Computer Vision'],
    accent: 'cyan',
    link: 'https://github.com/RishithSuresh/Sign-Language-Recognition-System',
  },
];

export const experience = [
  {
    year: 'Apr 2025 — Present',
    title: 'President',
    org: 'ARVR HUB',
    summary: 'Coordinating workshops and training sessions to elevate AR/VR expertise within college. Showcased the club\'s progress in AR/VR technology at Anveshana. Mentoring students in the field of VR gaming tools.',
  },
  {
    year: 'Nov 2024 — Apr 2025',
    title: 'Chief Secretary',
    org: 'ARVR HUB',
    summary: 'Coordinated and organized all event-related documentation. Collaborated with IEEE AESS to organise mARtian AESSence Event.',
  },
];

export const channels = [
  { label: 'Email', value: 'rishithsuresh10@gmail.com', href: 'mailto:rishithsuresh10@gmail.com' },
  { label: 'Phone', value: '+91 7892379634', href: 'tel:+917892379634' },
  { label: 'GitHub', value: 'github.com/RishithSuresh', href: 'https://github.com/RishithSuresh' },
  { label: 'LinkedIn', value: 'linkedin.com/in/rishith-suresh', href: 'https://linkedin.com/in/rishith-suresh' },
];
