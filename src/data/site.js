
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
  linkedin: 'https://www.linkedin.com/',

  cv: '/cv.pdf'
};

export const projects = [
  {
    slug: 'multimodal-deepfake-detection',
    number: '01',
    category: 'AI / ML · RESEARCH',
    title: 'Multimodal Deepfake Detection',
    summary:
      'Investigating manipulated media detection through complementary audio and visual information.',
    description:
      'An AI research project focused on developing a multimodal deepfake detection system that analyses both audio and video signals. The goal is to explore how individual modality features and cross-modal relationships can help identify synthetic and manipulated media.',
    tags: [
      'Python',
      'Deep Learning',
      'Computer Vision',
      'Audio Processing',
      'Multimodal Learning'
    ],
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'The problem',
        body:
          'Deepfake technology is evolving rapidly, making manipulated audio and video increasingly difficult to distinguish from authentic media. Systems that examine only one modality may overlook important evidence present in another.'
      },
      {
        title: 'The approach',
        body:
          'The project explores a multimodal pipeline involving video-frame sampling, face-region processing, audio feature extraction and feature-level fusion. It investigates how visual, acoustic and cross-modal information can contribute to a more reliable prediction.'
      },
      {
        title: 'Datasets',
        body:
          'The research uses multiple deepfake datasets, including FaceForensics++, DF40, Celeb-DF and the Synthetic Deepfake Detection Dataset (SDFDC), to investigate model performance across different sources of manipulated media.'
      },
      {
        title: 'Evaluation',
        body:
          'Model evaluation considers accuracy, precision, recall, F1-score, ROC-AUC and confusion matrices. Cross-dataset testing, class-wise performance and generalisation are important considerations in assessing the system.'
      },
      {
        title: 'Future direction',
        body:
          'Further work focuses on improving generalisation to unseen manipulation methods, reducing overfitting, investigating modality contributions and evaluating robustness under different video and audio conditions.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/multimodal-deepfake-detection'
  },

  {
    slug: 'rule-based-auto-remediation',
    number: '02',
    category: 'SOFTWARE · AUTOMATION',
    title: 'Rule-Based Auto Remediation',
    summary:
      'A Windows-focused application designed to identify known system issues and support automated remediation.',
    description:
      'A campus research project undertaken with Unisys India. The project focused on building an application that brings together known-issue rules, remediation scripts and system event logging to support a more structured approach to Windows troubleshooting.',
    tags: [
      'Python',
      'Windows',
      'PowerShell',
      'SQLite',
      'Automation'
    ],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'The problem',
        body:
          'Repeated Windows system issues can require time-consuming manual diagnosis and intervention. Identifying known problems and following consistent remediation steps can make troubleshooting more structured.'
      },
      {
        title: 'The approach',
        body:
          'The application was designed around known-issue rules, predefined remediation scripts and system event monitoring. It aimed to bring these elements together in a single workflow.'
      },
      {
        title: 'Project experience',
        body:
          'Working as part of a team, I experienced the process of taking an initial application concept and developing it into a more complete software solution. The project involved practical problem-solving and thinking about how automation could simplify repetitive system tasks.'
      },
      {
        title: 'What I learned',
        body:
          'Beyond technical development, the experience helped me understand collaborative research, product-oriented thinking and how to communicate and present a technical solution to an audience.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/rule-based-auto-remediation'
  },

  {
    slug: 'dietingdisk',
    number: '03',
    category: 'DESKTOP · SYSTEMS',
    title: 'DietingDisk',
    summary:
      'A Windows storage auditor that turns disk usage into understandable insights and cautious cleanup recommendations.',
    description:
      'DietingDisk is a Windows storage auditing project that helps users understand how their disk space is being used. It focuses on scanning storage, identifying large folders and presenting recommendations before any potentially destructive cleanup action.',
    tags: [
      'Python',
      'Windows',
      'SQLite',
      'Storage Analytics'
    ],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'The problem',
        body:
          'When storage space becomes limited, users often struggle to understand what is consuming it. Removing files without knowing their purpose can also lead to accidental data loss.'
      },
      {
        title: 'The approach',
        body:
          'DietingDisk inventories storage across drives, records scan results and helps identify folders that consume significant disk space.'
      },
      {
        title: 'Safety first',
        body:
          'The project follows a cautious approach: recommendations are read-only, and destructive cleanup actions require explicit user approval. Access errors and excluded paths are also considered during scanning.'
      },
      {
        title: 'Future direction',
        body:
          'Further improvements can focus on clearer storage visualisations, more detailed folder analysis and a smoother user experience for reviewing cleanup recommendations.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/dietingdisk'
  },

  {
    slug: 'musiclens',
    number: '04',
    category: 'MOBILE · FULL STACK',
    title: 'MusicLens',
    summary:
      'A mobile application project combining a Flutter frontend with a Python backend.',
    description:
      'MusicLens is a mobile application project built using Flutter and a Python-based backend. It explores the integration of a mobile user interface with backend services through API communication.',
    tags: [
      'Flutter',
      'Dart',
      'Python',
      'REST API'
    ],
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'Overview',
        body:
          'The project brings together mobile application development and backend integration, with a focus on building a connected application experience.'
      },
      {
        title: 'Technology',
        body:
          'Flutter is used for the mobile frontend, while Python powers the backend API. The two components communicate through REST-based requests.'
      },
      {
        title: 'Development focus',
        body:
          'The project provides practical experience with application structure, API integration, frontend-backend communication and deployment.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/musiclens'
  },

  {
    slug: 'neruvo',
    number: '05',
    category: 'WEB · PRODUCT',
    title: 'Neruvo',
    summary:
      'A web application project developed using a modern React-based technology stack.',
    description:
      'Neruvo is a web development project built around a React-based frontend and a Node.js backend. It explores modern frontend development, application architecture and full-stack integration.',
    tags: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express'
    ],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    sections: [
      {
        title: 'Overview',
        body:
          'Neruvo is an ongoing product development project focused on building a modern web application.'
      },
      {
        title: 'Technology',
        body:
          'The frontend uses React and Vite, with Tailwind CSS for styling. The backend uses Node.js and Express for server-side functionality.'
      },
      {
        title: 'Development focus',
        body:
          'The project provides experience with component-based development, frontend architecture, backend integration and building responsive web interfaces.'
      }
    ],
    links: [],
    github: 'https://github.com/RishithSuresh/neruvo'
  },

  {
    slug: 'portfolio-lab',
    number: '06',
    category: 'WEB · CREATIVE CODE',
    title: 'Portfolio Lab',
    summary: 'An interactive portfolio exploring motion, WebGL and research-led storytelling.',
    description: 'A personal portfolio experiment combining React, motion design and interactive 3D scenes to make technical work easier to explore.',
    tags: ['React', 'Vite', 'Three.js', 'Motion'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [{ title: 'Overview', body: 'An ongoing design and engineering experiment for presenting projects, research and technical interests.' }],
    links: [],
    github: 'https://github.com/RishithSuresh/Portfolio'
  },

  {
    slug: 'campus-connect',
    number: '07',
    category: 'WEB · COMMUNITY',
    title: 'Campus Connect',
    summary: 'A concept for helping students discover events, resources and collaborative opportunities.',
    description: 'A student-focused application concept that brings campus information and collaboration into one accessible interface.',
    tags: ['JavaScript', 'UI Design', 'Product Thinking'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [{ title: 'Overview', body: 'A product exploration focused on clearer campus communication and student participation.' }],
    links: [],
    github: 'https://github.com/RishithSuresh'
  },

  {
    slug: 'ml-experiments',
    number: '08',
    category: 'AI / ML · EXPERIMENTS',
    title: 'ML Experiments',
    summary: 'A collection of small machine-learning experiments, notebooks and evaluation studies.',
    description: 'A growing collection of focused experiments used to learn, compare approaches and document practical machine-learning workflows.',
    tags: ['Python', 'Jupyter', 'Machine Learning', 'Evaluation'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    sections: [{ title: 'Overview', body: 'A working archive for small experiments and lessons learned while studying machine learning.' }],
    links: [],
    github: 'https://github.com/RishithSuresh'
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
    title: 'Add certification title',
    issuer: 'Issuing organisation',
    date: 'YEAR',
    credential: '',
    detail: 'Add the certification name, issuing organisation and credential link here.'
  },
  {
    title: 'Add certification title',
    issuer: 'Issuing organisation',
    date: 'YEAR',
    credential: '',
    detail: 'Use this card for a technical, cloud, security or professional certification.'
  },
  {
    title: 'Add certification title',
    issuer: 'Issuing organisation',
    date: 'YEAR',
    credential: '',
    detail: 'Replace this placeholder with another certificate or verified achievement.'
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
    period: 'Dec 2025 — Jul 2026',
    role: 'Student Research Project',
    organization: 'Unisys India',
    detail:
      'Collaborated with a team on Rule-Based Auto Remediation for Known Issues, a Windows-focused application exploring known-issue identification, remediation workflows and system event logging.'
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
      'R'
    ]
  },
  {
    group: 'AI & Research',
    items: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
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
      'PowerShell'
    ]
  }
];

export const terminalCommands = {
  help:
    'Available commands: about, projects, research, skills, experience, github, contact, clear',

  about:
    'I am Rishith, a final-year Computer Science and Engineering student at BMSIT, interested in AI, research and software development.',

  projects:
    'Featured projects: Multimodal Deepfake Detection, Rule-Based Auto Remediation, DietingDisk, MusicLens and Neruvo.',

  research:
    'My research interests include AI/ML, computer vision, audio processing and multimodal deepfake detection.',

  skills:
    'Explore the Skills section for my programming languages, AI/ML interests, development technologies and tools.',

  experience:
    'Experience: Intern at LRDE · DRDO; Unisys India campus research project; B.E. Computer Science & Engineering at BMSIT.',

  github:
    `GitHub profile: https://github.com/${profile.github}`,

  contact:
    `Contact: ${profile.email}. Replace the placeholder email in src/data/site.js before publishing.`,

  clear: ''
};
