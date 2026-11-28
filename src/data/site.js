
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
    'Featured projects: Multimodal Deepfake Detection, Rule-Based Auto Remediation, DietingDisk, MusicLens and Neruvo.',

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
