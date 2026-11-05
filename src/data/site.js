export const profile = {
  name: 'Rishith Suresh',
  shortName: 'rishith.',
  role: 'Computer Science Engineer',
  tagline: 'Curious by nature. Building by passion.',
  intro: 'I explore the intersection of technology, research and innovation — turning ideas into useful things through experimentation and engineering.',
  location: 'India',
  email: 'hello@example.com', // TODO: replace with your preferred contact email
  github: 'RishithSuresh',
  linkedin: 'https://www.linkedin.com/', // TODO: replace with your profile URL
  cv: '/cv.pdf'
}

export const projects = [
  {
    slug: 'multimodal-deepfake-detection',
    number: '01',
    category: 'AI / ML · RESEARCH',
    title: 'Multimodal Deepfake Detection',
    summary: 'Exploring manipulated media detection through complementary audio and visual signals.',
    description: 'A multimodal research project investigating how visual features, audio representations and cross-modal information can be combined to identify manipulated media.',
    tags: ['Python', 'Deep Learning', 'Computer Vision', 'Audio Processing'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      { title: 'The problem', body: 'Synthetic media is becoming increasingly convincing. Relying on a single modality can leave important clues unused, so this project explores complementary audio and visual evidence.' },
      { title: 'The approach', body: 'The workflow explores video-frame sampling, face-region processing, audio feature extraction and multimodal fusion. Dataset handling and split strategy are important to reduce leakage and overfitting.' },
      { title: 'Evaluation', body: 'Evaluate with precision, recall, F1-score, ROC-AUC and confusion matrices. Report results alongside dataset, split, threshold and training configuration so the numbers are reproducible.' },
      { title: 'Next steps', body: 'Improve cross-dataset generalization, conduct modality ablations and test robustness against compression and unseen manipulation methods.' }
    ],
    links: [{ label: 'GitHub', url: `https://github.com/${profile.github}` }]
  },
  {
    slug: 'rule-based-auto-remediation',
    number: '02',
    category: 'SOFTWARE · AUTOMATION',
    title: 'Rule-Based Auto Remediation',
    summary: 'A Windows-focused application for identifying known issues and applying predefined remediation workflows.',
    description: 'A campus research project with Unisys India focused on rule-based remediation for known Windows issues, event monitoring and automation.',
    tags: ['Python', 'Windows', 'PowerShell', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      { title: 'The problem', body: 'Known system issues can consume time when they require repeated manual diagnosis and intervention.' },
      { title: 'The approach', body: 'The application brings together known-issue rules, remediation scripts and event logging to support a more structured workflow.' },
      { title: 'My contribution', body: 'Describe your exact responsibilities, implementation choices and team contribution here. Add screenshots and architecture diagrams before publishing.' },
      { title: 'What I learned', body: 'The project strengthened practical problem-solving, automation thinking and the ability to communicate a technical product.' }
    ],
    links: [{ label: 'Project repository', url: `https://github.com/${profile.github}` }]
  },
  {
    slug: 'dietingdisk',
    number: '03',
    category: 'DESKTOP · SYSTEMS',
    title: 'DietingDisk',
    summary: 'A Windows storage auditor that turns disk usage into understandable insights and cautious cleanup recommendations.',
    description: 'A Windows storage auditing project designed to inspect storage usage, identify large folders and provide recommendations before any cleanup action.',
    tags: ['Python', 'Windows', 'SQLite', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      { title: 'The problem', body: 'Low disk space is frustrating, and deleting files without understanding their purpose can be risky.' },
      { title: 'The approach', body: 'DietingDisk inventories storage, records scan results and surfaces read-only recommendations before cleanup.' },
      { title: 'Safety principle', body: 'The application should require explicit user approval before destructive actions and clearly explain access errors and exclusions.' }
    ],
    links: [{ label: 'GitHub', url: `https://github.com/${profile.github}` }]
  },
  {
    slug: 'musiclens',
    number: '04',
    category: 'MOBILE · FULL STACK',
    title: 'MusicLens',
    summary: 'A Flutter application supported by a Python backend.',
    description: 'A cross-platform app project combining a Flutter frontend with a Python API. Add the actual product story, features and screenshots here.',
    tags: ['Flutter', 'Python', 'REST API'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      { title: 'Overview', body: 'Explain the user problem, core experience and how the mobile app communicates with the backend.' },
      { title: 'Implementation', body: 'Document the API contract, application state, error handling and deployment setup.' }
    ],
    links: [{ label: 'GitHub', url: `https://github.com/${profile.github}` }]
  },
  {
    slug: 'neruvo',
    number: '05',
    category: 'WEB · PRODUCT',
    title: 'Neruvo',
    summary: 'A web application built with a modern React-based stack.',
    description: 'A product development project using React, Vite and a Node/Express backend. Add verified product details and screenshots.',
    tags: ['React', 'Vite', 'Node.js', 'Express'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      { title: 'Overview', body: 'Describe what the product does and who it is for.' },
      { title: 'Technical decisions', body: 'Explain the frontend architecture, API design, state management and deployment.' }
    ],
    links: [{ label: 'GitHub', url: `https://github.com/${profile.github}` }]
  }
]

export const experience = [
  { period: '2026', role: 'Intern', organization: 'LRDE · DRDO', detail: 'Research and technical internship in Bengaluru. Add your exact team, dates and responsibilities.' },
  { period: '2025 — 2026', role: 'Student Research Project', organization: 'Unisys India', detail: 'Worked with a team on Rule-Based Auto Remediation for Known Issues.' },
  { period: '2023 — 2027', role: 'B.E. Computer Science & Engineering', organization: 'BMS Institute of Technology', detail: 'Undergraduate studies, technical projects and campus activities.' }
]

export const skills = [
  { group: 'Languages', items: ['C', 'Python', 'SQL', 'R'] },
  { group: 'AI & Research', items: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Audio Processing'] },
  { group: 'Development', items: ['React', 'Flutter', 'Node.js', 'REST APIs'] },
  { group: 'Data & Tools', items: ['MySQL', 'SQLite', 'MongoDB', 'Git', 'GitHub'] }
]

export const terminalCommands = {
  help: 'Available commands: about, projects, research, skills, experience, github, contact, clear',
  about: 'I am a Computer Science Engineer exploring technology, research and innovation.',
  projects: 'Featured work: Multimodal Deepfake Detection, Rule-Based Auto Remediation, DietingDisk, MusicLens and Neruvo.',
  research: 'Research interests include AI/ML, computer vision, audio processing and robust multimodal systems.',
  skills: 'Explore the Skills section for languages, AI/ML, development and data tools.',
  experience: 'Experience includes LRDE · DRDO, a Unisys India campus research project and BMSIT.',
  github: `Opening GitHub profile: https://github.com/${profile.github}`,
  contact: `You can reach me at ${profile.email}. Replace this placeholder email in src/data/site.js.`,
  clear: ''
}