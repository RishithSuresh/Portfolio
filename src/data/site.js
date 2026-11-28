
export const profile = {
  name: 'Rishith Suresh',
  shortName: 'rishith.',
  role: 'Computer Science & Engineering Student',
  tagline: 'Curious by nature. Building with purpose.',
  photo: '',
  intro:
    'I am a final-year Computer Science and Engineering student at BMSIT, interested in the intersection of artificial intelligence, research and software development. From exploring multimodal deepfake detection to building practical applications, I enjoy turning ideas into working solutions through experimentation and engineering.',
  location: 'Bengaluru, India',

  // Replace these with your actual contact details before publishing.
  email: 'rishithsuresh10@gmail.com',
  github: 'https://github.com/RishithSuresh',
  linkedin: 'https://www.linkedin.com/in/rishith-suresh-10173nh/',

  cv: '/cv.pdf'
};

export const projects = [
  {
    slug: 'multimodal-deepfake-detection',
    number: '01',
    category: 'AI / ML · RESEARCH',
    title: 'Multimodal Deepfake Detection',
    summary:
      'Audio-visual fusion pipeline investigating cross-dataset generalisation across FaceForensics++, DF40, Celeb-DF, and SDFDC.',
    description:
      'An AI research project exploring multimodal deepfake detection across complementary audio and visual signals. Combines face-region feature extraction, temporal video sampling, acoustic embeddings, and feature-level fusion to identify manipulated media across unseen generators.',
    highlights: ['Audio-visual fusion', '4 benchmark datasets', 'ROC-AUC evaluation'],
    deployed: '',
    tags: ['Python', 'Deep Learning', 'Computer Vision', 'Audio Processing', 'Research'],
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'The problem',
        body:
          'Deepfake technology evolves rapidly, making single-modality detectors vulnerable when synthetic voice or facial reenactment artefacts only stand out in another stream.'
      },
      {
        title: 'Methodology & fusion pipeline',
        body:
          'Explores synchronized video-frame sampling, aligned face-region processing, acoustic feature extraction, and feature-level cross-modal fusion.'
      },
      {
        title: 'Cross-dataset evaluation',
        body:
          'Benchmarked across FaceForensics++, DF40, Celeb-DF, and SDFDC tracking accuracy, precision, recall, F1-score, ROC-AUC, and confusion matrices.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh'
  },

  {
    slug: 'rule-based-auto-remediation',
    number: '02',
    category: 'ENTERPRISE SYSTEMS · UNISYS',
    title: 'Rule-Based Auto Remediation',
    summary:
      'Campus research system developed with Unisys India pairing Windows event log monitoring with deterministic recovery rules.',
    description:
      'A Windows auto-remediation platform built in collaboration with Unisys India that pairs known system issue signatures, structured PowerShell remediation scripts, and SQLite event logging for repeatable diagnostics.',
    highlights: ['Unisys Campus Research', 'PowerShell recovery', 'SQLite event audit'],
    deployed: '',
    tags: ['Python', 'Windows', 'PowerShell', 'SQLite', 'Automation'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'Structured Windows diagnostics',
        body:
          'Eliminates slow manual troubleshooting of recurring Windows issues by matching event-log triggers against curated remediation rules.'
      },
      {
        title: 'End-to-end engineering',
        body:
          'Developed collaboratively with Unisys mentors, combining automated PowerShell recovery workflows with auditable execution logs and technical presentation.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh'
  },

  {
    slug: 'lexifix-ai',
    number: '03',
    category: 'AI / NLP · TRANSFORMERS',
    title: 'LexiFix AI',
    summary:
      'Explainable spelling & grammar intelligence platform benchmarking deterministic multi-signal NLP against Seq2Seq Transformers.',
    description:
      'An explainable NLP studio comparing a sub-millisecond multi-signal deterministic correction engine against CUDA-accelerated Seq2Seq Transformers (T5-base, Flan-T5, and GEC-T5) with transparent candidate rankings and WER/CER evaluation.',
    highlights: ['Sub-ms NLP baseline', 'T5 / Flan-T5 models', '24 passing tests'],
    deployed: '',
    tags: ['Python', 'PyTorch', 'Transformers', 'Levenshtein', 'REST API'],
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'Transparent NLP vs. black-box correction',
        body:
          'Rather than hiding how edits are chosen, LexiFix AI exposes candidate rankings across Damerau-Levenshtein edit distance, American Soundex phonetic codes, QWERTY key proximity, and contextual bigram probabilities.'
      },
      {
        title: 'Transformer benchmarking',
        body:
          'Includes automated CLI and REST benchmarking comparing deterministic heuristics directly against `t5-base-grammar-correction`, `gec-t5_small`, and `flan-t5-small` on Precision, Recall, F1, CER, and WER.'
      },
      {
        title: 'Validation & quality',
        body:
          'Backed by a 24-test automated validation suite covering phonological edge cases, batch evaluation pipelines, and deterministic-vs-neural latency profiling.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/LexiFix-AI'
  },

  {
    slug: 'musiclens',
    number: '04',
    category: 'AUDIO AI · FLUTTER + FASTAPI',
    title: 'MusicLens',
    summary:
      'Interactive visual music explainer and AI prompt-to-composition studio with a FastAPI engine and Flutter glass UI.',
    description:
      'A full-stack audio analysis and music generation studio combining a FastAPI backend with a Flutter dashboard. Upload audio to visualize tempo, pitch curves, energy, and lyrics insights, or compose multi-track arrangements from text prompts with MIDI & MP3 export.',
    highlights: ['Analyze & Compose modes', 'Piano-roll visualizer', 'Self-contained MP3/MIDI'],
    deployed: 'https://music-lens-red.vercel.app/',
    tags: ['Flutter', 'Dart', 'FastAPI', 'Python', 'Audio DSP'],
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'Analyze & Compose workflows',
        body:
          'Analyze mode decomposes uploaded tracks into tempo, pitch contours, spectral energy, and rule-based structural insights; Compose mode turns descriptive prompts into editable multi-track piano-roll arrangements.'
      },
      {
        title: 'Self-contained audio pipeline',
        body:
          'The FastAPI backend integrates DSP feature extraction, best-effort lyrics transcription, and a bundled MP3 encoder so previews and downloads work cleanly without external system ffmpeg dependencies.'
      },
      {
        title: 'Cross-platform Flutter frontend',
        body:
          'Built around responsive glass cards and typed REST models (`audio_api_service.dart`), deployed live for instant browser exploration.'
      }
    ],
    links: [{ label: 'Launch MusicLens', url: 'https://music-lens-red.vercel.app/' }],
    github: 'https://github.com/RishithSuresh/MusicLens'
  },

  {
    slug: 'neruvo',
    number: '05',
    category: '3D WEB · COMPUTATIONAL MODELING',
    title: 'Neruvo — Brain Visualizer',
    summary:
      'Interactive 3D visualization of human brain region activation driven by emotional stimuli and intensity telemetry.',
    description:
      'A full-stack computational neuroscience visualization app built with React Three Fiber and Three.js. Lets users trigger emotional states, adjust stimulus intensity, inspect glowing 3D brain regions in real time, and review intensity trends via Chart.js.',
    highlights: ['React Three Fiber 3D', 'Live emotion mapping', 'Chart.js telemetry'],
    deployed: 'https://neruvo-xmqr.vercel.app',
    tags: ['React Three Fiber', 'Three.js', 'React', 'Node.js', 'Chart.js'],
    image:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'Interactive 3D neural scene',
        body:
          'Renders an inspectable 3D brain anatomy model with dynamic activation overlays, labeled anatomical regions, smooth camera orbiting, and keyboard shortcuts for rapid stimulus switching.'
      },
      {
        title: 'Stimulus & analytics dashboard',
        body:
          'Pairs real-time stimulus intensity sliders with an Express REST backend logging session history and Chart.js visualizations tracking activation frequency and intensity patterns.'
      }
    ],
    links: [{ label: 'Explore 3D Brain', url: 'https://neruvo-xmqr.vercel.app' }],
    github: 'https://github.com/RishithSuresh/Neruvo'
  },

  {
    slug: 'pitchpulse',
    number: '06',
    category: 'TYPESCRIPT · LIVE UTILITY',
    title: 'PitchPulse (KickSplit)',
    summary:
      'Mobile-first football matchday organizer with weighted skill balancing, Fisher-Yates draws, and built-in match timer.',
    description:
      'A snappy TypeScript + React web app designed right for pitch-side match setup. Supports bulk player entry, decimal 0.0–10.0 skill weighting, fair Fisher-Yates draws, captain assignment, preset match countdown timers, and local match history.',
    highlights: ['0.0–10.0 skill balance', 'Match timer presets', 'Zero-backend local sync'],
    deployed: 'https://chaos11.vercel.app',
    tags: ['TypeScript', 'React', 'Vite', 'Fisher-Yates', 'PWA-Ready'],
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'Fair pitch-side splits',
        body:
          'Uses unbiased Fisher-Yates randomization combined with optional 0.0–10.0 player ratings and unassigned player reporting to form balanced squads in seconds.'
      },
      {
        title: 'Matchday ergonomics',
        body:
          'Includes bulk roster pasting, captain selection, live match countdown presets, local persistence across refreshes, and one-tap copy/native share for team sheets.'
      }
    ],
    links: [{ label: 'Open PitchPulse', url: 'https://chaos11.vercel.app' }],
    github: 'https://github.com/RishithSuresh/PitchPulse'
  },

  {
    slug: 'studyflow',
    number: '07',
    category: 'FULL STACK · POSTGRESQL',
    title: 'StudyFlow',
    summary:
      'Multi-user study workspace syncing mock paper analytics and mistake logs across Express, Better Auth, and Neon PostgreSQL.',
    description:
      'A multi-user academic workspace built for tracking mock papers, structured mistake logs, and study progress. Combines session-isolated Express APIs, Better Auth authentication, Neon PostgreSQL JSONB persistence, and local IndexedDB paper storage.',
    highlights: ['Better Auth sessions', 'Neon PostgreSQL', 'IndexedDB papers'],
    deployed: 'https://studyflow35.vercel.app',
    tags: ['JavaScript', 'Express', 'Better Auth', 'Neon PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      {
        title: 'Architecture & storage split',
        body:
          'StudyFlow cleanly separates heavy exam PDFs from synchronized workspace telemetry: paper binaries stay instant in browser IndexedDB, while mistake logs and paper metadata sync safely across devices via `/api/workspace` backed by Neon PostgreSQL.'
      },
      {
        title: 'Multi-user isolation',
        body:
          'Authentication, sign-in, and cookie-scoped sessions are managed by Better Auth under `/api/auth/*`, ensuring every workspace read and mutation filters strictly by the authenticated user ID.'
      },
      {
        title: 'Engineering choices',
        body:
          'Leverages PostgreSQL `user_settings.settings` JSONB alongside user-namespaced LocalStorage caching so the interface loads immediately while treating the protected API as the single source of truth.'
      }
    ],
    links: [{ label: 'Live Workspace', url: 'https://studyflow35.vercel.app' }],
    github: 'https://github.com/RishithSuresh/StudyFlow'
  },

  {
    slug: 'dietingdisk',
    number: '08',
    category: 'DESKTOP SYSTEMS · PYTHON',
    title: 'DietingDisk',
    summary:
      'Read-only Windows storage auditor featuring SQLite WAL indexing, interactive drill-down treemaps, and explainable advice.',
    description:
      'A strictly non-destructive Windows disk auditor built with Python, FastAPI, SQLite, and pywebview. Inventories drives, renders one-level-at-a-time treemaps, and classifies files with explicit confidence reasoning without ever altering user data.',
    highlights: ['Strictly read-only', 'One-level treemap', 'SQLite WAL + pywebview'],
    deployed: '',
    tags: ['Python', 'FastAPI', 'SQLite WAL', 'pywebview'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      {
        title: 'Safety-first architecture',
        body:
          'Zero code paths delete, move, or rename scanned files. Game directories, databases, model checkpoints, and documents are conservatively protected with explainable rule classifications.'
      },
      {
        title: 'Scalable treemap exploration',
        body:
          'Queries SQLite metadata one directory depth at a time to keep memory lean across multi-terabyte drives, paired with searchable inventories and CSV export.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/DietingDisk'
  },

  {
    slug: 'risklens',
    number: '09',
    category: 'DATA SCIENCE · CAPSTONE',
    title: 'RiskLens — Credit Default ML',
    summary:
      'Imbalanced classification study evaluating Histogram Gradient Boosting across UCI credit default telemetry.',
    description:
      'An IDRA capstone machine-learning study profiling 22.12% imbalanced credit default risk on the UCI Taiwan dataset, identifying repayment history (PAY_0) signals and optimizing precision-recall tradeoffs.',
    highlights: ['HistGradientBoosting', 'Imbalanced ML', 'IDRA Capstone'],
    deployed: '',
    tags: ['Python', 'Scikit-Learn', 'Jupyter', 'Model Evaluation'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      {
        title: 'Modeling & threshold analysis',
        body:
          'Benchmarked tree ensembles against baselines on imbalanced default classification, generating correlation, confusion matrix, and threshold trade-off curves.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/RiskLens'
  },

  {
    slug: 'bloomsight',
    number: '10',
    category: 'SECURITY · CRYPTOGRAPHY',
    title: 'BloomSight Visual Crypto',
    summary:
      'Zero-dependency Python HTTP visual cryptography application splitting secrets into visual share overlays.',
    description:
      'A visual cryptography showcase running on Python’s standard-library HTTP server with a browser UI demonstrating secret-sharing image reconstruction.',
    highlights: ['Stdlib HTTP server', 'Visual shares', 'Zero dependencies'],
    deployed: '',
    tags: ['Python', 'Cryptography', 'HTTP Server', 'Web UI'],
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      {
        title: 'Visual secret sharing',
        body:
          'Demonstrates how encoded visual shares appear indistinguishable from static noise individually until overlaid in the browser.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/BloomSight'
  },

  {
    slug: 'threat-analyzer',
    number: '11',
    category: 'FINTECH SECURITY · WEB',
    title: 'Threat Analyzer (AML)',
    summary:
      'Anti-money-laundering analytics UI mapping structuring, layering, and cross-border spider graphs across bank accounts.',
    description:
      'An investigative analytics dashboard built to flag suspicious AML typologies—including smurfing, five-layer laundering trails, and shell-company transfers—via interactive network graphs.',
    highlights: ['5-layer trail map', 'Customer risk scoring', 'Spider graph view'],
    deployed: '',
    tags: ['JavaScript', 'Network Graphs', 'Risk Scoring', 'Analytics'],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      {
        title: 'Laundering topology detection',
        body:
          'Visualizes placement, structuring, layering, cross-border hops, and integration across customer accounts with exportable network snapshots.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/Threat-Analyzer'
  },

  {
    slug: 'lifequest',
    number: '12',
    category: 'CREATIVE TECH · 3D UI',
    title: 'LifeQuest',
    summary:
      'Gamified productivity dashboard built with Next.js App Router, Tailwind v4, Supabase, GSAP, and Three.js.',
    description:
      'A stylized habit and productivity platform blending Next.js App Router and Supabase auth/migrations with Three.js visuals, Framer Motion, and GSAP choreography.',
    highlights: ['Next.js + Supabase', 'GSAP + Three.js', 'Gamified workflows'],
    deployed: '',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Three.js', 'GSAP'],
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [
      {
        title: 'Interactive architecture',
        body:
          'Combines persistent PostgreSQL state in Supabase with hardware-accelerated Three.js and GSAP transitions.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/LifeQuest'
  }
];

export const researchPapers = [
  {
    title: 'Multimodal Deepfake Detection',
    venue: 'Research paper / In preparation',
    summary: 'Audio-visual fusion for detecting manipulated media across diverse datasets.',
    status: 'IN PROGRESS',
    url: ''
  },
  {
    title: 'Add your next paper',
    venue: 'Conference, journal or preprint',
    summary: 'Use this slot for a published paper, preprint, poster or technical report.',
    status: 'ADD PAPER',
    url: ''
  },
  {
    title: 'Add another investigation',
    venue: 'Research project',
    summary: 'A second space for documenting a question, methodology and key findings.',
    status: 'ADD PAPER',
    url: ''
  }
];

export const certifications = [
  {
    id: 'unisys-auto-remediation',
    title: 'Rule-Based Auto Remediation for Known Issues',
    issuer: 'Unisys India',
    date: 'Dec 2025 — Jul 2026',
    category: 'Recognition',
    preview: '/certificates/unisys-auto-remediation.jpeg',
    file: '/certificates/unisys-auto-remediation.jpeg',
    verifyUrl: '',
    credential: '',
    detail:
      'Certificate of Recognition awarded by Unisys India for campus research and engineering on Windows rule-based auto remediation workflows.'
  },
  {
    id: 'icret-2026-deep-kernel',
    title: 'Deep Kernel Learning for Diabetic Retinopathy Detection',
    issuer: 'SVIT × Samarkand State University (ICRET 2026)',
    date: 'May 2026',
    category: 'Research',
    preview: '/certificates/icret-2026-deep-kernel.jpeg',
    file: '/certificates/icret-2026-deep-kernel.jpeg',
    verifyUrl: '',
    credential: '',
    detail:
      'Certificate of Presentation at the 17th International Conference on Recent Engineering and Technology (ICRET 2026) for presenting research using retinal fundus images.'
  },
  {
    id: 'infosys-cuda-10',
    title: 'Learning CUDA 10 Programming',
    issuer: 'Infosys Springboard',
    date: 'Nov 2026',
    category: 'AI & Systems',
    preview: '/certificates/previews/infosys-cuda-10.png',
    file: '/certificates/infosys-cuda-10.pdf',
    verifyUrl: 'https://verify.onwingspan.com',
    credential: 'Infosys Verified',
    detail:
      'Course completion certificate covering GPU parallel computing and CUDA 10 programming fundamentals.'
  },
  {
    id: 'idra-data-science-ai',
    title: 'Data Science & AI Training & Internship Program',
    issuer: 'India Data Research Academy (IDRA)',
    date: 'Jul — Sep 2026',
    category: 'AI & Systems',
    preview: '/certificates/idra-data-science-ai.jpeg',
    file: '/certificates/idra-data-science-ai.jpeg',
    verifyUrl: 'https://www.idra.co.in/verify.html?id=IDRA-2026-898126',
    credential: 'IDRA-2026-898126',
    detail:
      'Completed intensive data science & AI sessions, practical deliverables, and a supervised capstone project.'
  },
  {
    id: 'nptel-organizational-behaviour',
    title: 'Organizational Behaviour (Elite — 81%)',
    issuer: 'NPTEL · IIT Hyderabad (SWAYAM)',
    date: 'Jul — Oct 2026',
    category: 'Coursework',
    preview: '/certificates/previews/nptel-organizational-behaviour.png',
    file: '/certificates/nptel-organizational-behaviour.pdf',
    verifyUrl: '',
    credential: 'NPTEL26MG113S852104944',
    detail:
      '12-week IIT Hyderabad NPTEL certification achieving Elite distinction with a consolidated score of 81%.'
  },
  {
    id: 'coursera-prompt-engineering',
    title: 'Prompt Engineering for ChatGPT',
    issuer: 'Vanderbilt University · Coursera',
    date: 'Dec 2024',
    category: 'AI & Systems',
    preview: '/certificates/previews/coursera-prompt-engineering.png',
    file: '/certificates/coursera-prompt-engineering.pdf',
    verifyUrl: 'https://coursera.org/verify/TX256PIXCBSU',
    credential: 'TX256PIXCBSU',
    detail:
      'Authorized by Vanderbilt University covering structured prompt patterns, reasoning workflows, and LLM systems design.'
  },
  {
    id: 'cisco-pcap-python',
    title: 'PCAP: Programming Essentials in Python',
    issuer: 'Cisco Networking Academy · OpenEDG',
    date: 'Jun 2024',
    category: 'Coursework',
    preview: '/certificates/previews/cisco-pcap-python.png',
    file: '/certificates/cisco-pcap-python.pdf',
    verifyUrl: '',
    credential: 'OpenEDG / NetAcad',
    detail:
      'Statement of Achievement covering Python syntax, algorithms, modules, file I/O, and object-oriented programming.'
  },
  {
    id: 'cyseck-ctf-volunteer',
    title: 'CySecK Cybersecurity Bootcamp & CTF Volunteer',
    issuer: 'CySecK · K-Tech CoE & BMSIT&M',
    date: 'Feb 2026',
    category: 'Recognition',
    preview: '/certificates/cyseck-ctf-volunteer.jpeg',
    file: '/certificates/cyseck-ctf-volunteer.jpeg',
    verifyUrl: '',
    credential: '',
    detail:
      'Certificate of Appreciation for serving as a volunteer during the 2-day Women-Only Cybersecurity Bootcamp & CTF competition.'
  },
  {
    id: 'incseption-hackathon-3rd',
    title: '3rd Place — <InCSEption> 8-Hour Hackathon',
    issuer: 'Dept. of CSE & IEEE CS · BMSIT&M',
    date: 'BMSIT&M',
    category: 'Competitions',
    preview: '/certificates/incseption-hackathon-3rd.jpeg',
    file: '/certificates/incseption-hackathon-3rd.jpeg',
    verifyUrl: '',
    credential: 'Team Quantum Leapers',
    detail:
      'Secured 3rd position with team Quantum Leapers in the 8-hour internal hackathon hosted by CSE & IEEE Computer Society.'
  },
  {
    id: 'empirex-ecell-3rd',
    title: '3rd Place — EmpireX Pitch & Presentation Challenge',
    issuer: 'E-Cell · BMSIT&M',
    date: 'Mar 2026',
    category: 'Competitions',
    preview: '/certificates/empirex-ecell-3rd.jpeg',
    file: '/certificates/empirex-ecell-3rd.jpeg',
    verifyUrl: '',
    credential: 'Team CashOverflow',
    detail:
      'Secured 3rd place with Team CashOverflow in EmpireX, focused on product strategy, creativity, and pitching.'
  },
  {
    id: 'anveshana-arvr-award',
    title: 'Best Entertainment Award — ARVR Club Showcase',
    issuer: 'IIC-BICEP · ANVESHANA’25, BMSIT&M',
    date: 'Mar 2025',
    category: 'Recognition',
    preview: '/certificates/anveshana-arvr-award.jpeg',
    file: '/certificates/anveshana-arvr-award.jpeg',
    verifyUrl: '',
    credential: 'ARVR Club',
    detail:
      'Certificate of Achievement awarded to the ARVR Club for winning Best Entertainment at the ANVESHANA’25 Club Showcase.'
  },
  {
    id: 'skillnation-powerbi-advanced',
    title: 'Basic to Advanced Microsoft Power BI',
    issuer: 'Skill Nation',
    date: 'Masterclass',
    category: 'AI & Systems',
    preview: '/certificates/previews/skillnation-powerbi-advanced.png',
    file: '/certificates/skillnation-powerbi-advanced.pdf',
    verifyUrl: '',
    credential: '2D0FACE5901D-2D0FA779EE29-2D01B4FA3A06',
    detail:
      'Completed the Advanced Masterclass on business intelligence modeling, DAX, and interactive analytics with Microsoft Power BI.'
  },
  {
    id: 'skillnation-powerbi-ai-dashboards',
    title: 'AI Dashboards using Microsoft Power BI',
    issuer: 'Skill Nation',
    date: 'Nov 2024',
    category: 'AI & Systems',
    preview: '/certificates/previews/skillnation-powerbi-ai-dashboards.png',
    file: '/certificates/skillnation-powerbi-ai-dashboards.pdf',
    verifyUrl: '',
    credential: '',
    detail:
      'Certified workshop focused on building AI-assisted decision dashboards and visual storytelling in Power BI.'
  },
  {
    id: 'access-denied-digital-forensics',
    title: 'Trail of Data: Digital Forensics in Action²',
    issuer: 'Access Denied Club · BMSIT&M',
    date: 'Dec 2024',
    category: 'Coursework',
    preview: '/certificates/access-denied-digital-forensics.jpeg',
    file: '/certificates/access-denied-digital-forensics.jpeg',
    verifyUrl: '',
    credential: '',
    detail:
      'Hands-on seminar covering core principles, investigation workflows, and practices in digital forensics.'
  }
];

export const experience = [
  {
    period: 'Aug 2026 — Present',
    role: 'Intern',
    organization: 'LRDE · DRDO',
    detail:
      'Currently undertaking a technical internship at the Electronics and Radar Development Establishment (LRDE), DRDO, Bengaluru. Add your specific team, technologies and responsibilities here.'
  },
  {
    period: 'Jul 2026 — Sep 2026',
    role: 'Data Science & AI Trainee',
    organization: 'India Data Research Academy (IDRA)',
    detail:
      'Completed a structured Data Science and Artificial Intelligence training and internship program combining academic sessions, practical learning activities, and project-based work.'
  },
  {
    period: 'Dec 2025 — Jul 2026',
    role: 'Student Research Project',
    organization: 'Unisys India',
    detail:
      'Collaborated with a team on Rule-Based Auto Remediation for Known Issues, a Windows-focused application exploring known-issue identification, remediation workflows and system event logging.'
  },
  {
    period: 'Nov 2024 — Sep 2026',
    role: 'Chair',
    organization: 'AR VR HUB BMSIT',
    detail:
      'Coordinated workshops and training sessions to elevate AR/VR expertise within college and mentored students in the field of VR gaming tools.'
  },
  {
    period: '2023 — 2027',
    role: 'B.E. Computer Science & Engineering',
    organization: 'BMS Institute of Technology and Management',
    detail:
      'Pursuing an undergraduate degree in Computer Science and Engineering, with interests in artificial intelligence, machine learning, software development and research.'
  }
];

export const skills = [
  {
    group: 'Programming Languages',
    items: [
      'C',
      'Python',
      'SQL',
      'C++',
      'Java',
      'R'
    ]
  },
  {
    group: 'AI & Research',
    items: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Neural Network',
      'Audio Processing',
      'Multimodal Learning'
    ]
  },
  {
    group: 'Development',
    items: [
      'React',
      'Flutter',
      'Node.js',
      'Express',
      'REST APIs'
    ]
  },
  {
    group: 'Databases & Tools',
    items: [
      'MySQL',
      'SQLite',
      'MongoDB',
      'Git',
      'GitHub',
      'PowerBI',
      'PowerShell'
    ]
  }
];

export const getGithubUsername = (value = '') => {
  const cleaned = value.trim().replace(/\/+$/, '')
  if (!cleaned) return ''
  return cleaned.includes('github.com/') ? cleaned.split('github.com/').pop().split('/')[0] : cleaned
}

export const getGithubUrl = (value = '') => {
  const cleaned = value.trim()
  if (!cleaned) return 'https://github.com'
  return /^https?:\/\//i.test(cleaned) ? cleaned : `https://github.com/${cleaned}`
}

export const terminalCommands = {
  help:
    'Available commands: about, projects, research, skills, experience, whoami, github, contact, theme, clear',

  whoami:
    `${profile.name} — ${profile.role} · ${profile.location}`,

  about:
    'I am Rishith, a final-year Computer Science and Engineering student at BMSIT, interested in AI, research and software development.',

  projects:
    'Featured projects: Multimodal Deepfake Detection, Rule-Based Auto Remediation, LexiFix AI, MusicLens, Neruvo and PitchPulse (plus StudyFlow & DietingDisk).',

  research:
    'My research interests include AI/ML, computer vision, audio processing and multimodal deepfake detection.',

  skills:
    'Explore the Skills section for my programming languages, AI/ML interests, development technologies and tools.',

  experience:
    'Experience: Intern at LRDE · DRDO; Unisys India campus research project; B.E. Computer Science & Engineering at BMSIT.',

  github:
    `GitHub profile: ${getGithubUrl(profile.github)}`,

  contact:
    `Email: ${profile.email} · Based in ${profile.location}`,

  clear: ''
};
