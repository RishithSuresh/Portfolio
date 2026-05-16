import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import RubiksCube from './components/RubiksCube.jsx';

const education = [
  {
    title: 'B.E. in Computer Science and Engineering',
    place: 'B.M.S Institute of Technology and Management, Bengaluru',
    detail: 'CGPA: 8.90 · Sep 2023 — Present',
  },
  {
    title: 'Class 12',
    place: "St. Mary\'s International School, Chikmagalur",
    detail: 'Percentage: 99.7% · 2023',
  },
  {
    title: 'Class 10',
    place: "St. Mary\'s International School, Chikmagalur",
    detail: 'Percentage: 97% · 2021',
  },
];

const experience = [
  {
    role: 'President · AR/VR Hub',
    period: 'Apr 2025 — Present',
    points: [
      'Coordinated workshops and training sessions on AR/VR inside the college community.',
      'Mentored students on immersive design and practical development workflows.',
    ],
  },
  {
    role: 'Chief Secretary',
    period: 'Nov 2024 — Apr 2025',
    points: [
      'Coordinated technical and event documentation for large student initiatives.',
      'Collaborated with IEEE AESS to organize and execute cross-team events.',
    ],
  },
];

const projects = [
  {
    name: 'Transparent Produce and Pricing Tracking System',
    stack: 'React · Node.js · SQL',
    summary:
      'Built a supply-chain tracking platform for produce batches, quality metrics, and role-based updates with secure data handling.',
  },
  {
    name: 'Health Metrics Platform',
    stack: 'Flask · React · MongoDB',
    summary:
      'Designed a dashboard for health signals with secure authentication, role controls, and analytics-driven visual insights.',
  },
  {
    name: 'AI-Powered Risk Profiling & Threat Analysis',
    stack: 'Python · ML · APIs',
    summary:
      'Created an AI risk-scoring workflow that detects anomalies and highlights threat patterns for faster decision-making.',
  },
  {
    name: 'Personal Expense Tracker',
    stack: 'React · JavaScript · Charts',
    summary:
      'Implemented expense tracking with smart categorization, budget targets, and interactive month-wise insights.',
  },
  {
    name: 'Sign Language Recognition System',
    stack: 'Python · CNN · OpenCV',
    summary:
      'Trained a gesture-recognition model for sign-language inputs and built a responsive interface for real-time prediction.',
  },
];

const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript'],
  },
  {
    title: 'Web',
    items: ['HTML', 'CSS', 'React', 'Node.js', 'Express', 'REST APIs'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Linux', 'Figma', 'Firebase', 'Power BI', 'Android Studio'],
  },
];

const highlights = [
  '3rd place in CSEathon L-Hack internal hackathon',
  'Finalist in InNove 2024 at CSE Department',
  'Research and industry collaboration work with Linyx',
  'Curator and coordinator for multiple inter-college tech events',
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

export default function App() {
  const [activeProject, setActiveProject] = useState(projects[0].name);
  const [pointer, setPointer] = useState({ x: 50, y: 25 });

  const activeProjectData = useMemo(
    () => projects.find((project) => project.name === activeProject) ?? projects[0],
    [activeProject]
  );

  return (
    <div
      className="page"
      onMouseMove={(event) => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        setPointer({ x, y });
      }}
    >
      <RubiksCube />
      <div
        className="pointer-glow"
        style={{ '--x': `${pointer.x}%`, '--y': `${pointer.y}%` }}
        aria-hidden="true"
      />

      <header className="topbar container glass">
        <a className="brand" href="#home">
          RISHITH SURESH
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="container">
        <motion.section id="home" className="hero" {...fadeInUp}>
          <div className="hero-copy glass">
            <p className="hero-tag">Immersive Portfolio</p>
            <h1>
              I design <span>intelligent</span>, interactive digital systems.
            </h1>
            <p>
              I&apos;m Rishith, a CSE student and builder focused on AI-driven products, full-stack engineering, and
              3D-first web experiences that feel alive.
            </p>
            <div className="hero-actions">
              <a className="btn btn-lime" href="#projects">
                Explore Work
              </a>
              <a className="btn btn-ghost" href="#contact">
                Connect
              </a>
            </div>
            <div className="quick-meta">
              <span>Bengaluru / Chikmagalur</span>
              <span>AR/VR Hub President</span>
              <span>Open to impactful collaborations</span>
            </div>
          </div>

          <motion.article className="hero-stat glass" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <h2>Now Building</h2>
            <p>AI + vision products, immersive interfaces, and practical tools that solve real-world workflows.</p>
            <ul>
              <li>Full-stack web apps</li>
              <li>Machine learning systems</li>
              <li>Interactive 3D interfaces</li>
            </ul>
          </motion.article>
        </motion.section>

        <motion.section id="about" className="grid-2" {...fadeInUp}>
          <article className="panel glass">
            <h2>Education</h2>
            <div className="timeline">
              {education.map((item) => (
                <div key={item.title} className="timeline-item">
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel glass">
            <h2>Experience</h2>
            <div className="timeline">
              {experience.map((item) => (
                <div key={item.role} className="timeline-item">
                  <h3>{item.role}</h3>
                  <span>{item.period}</span>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section id="projects" className="panel projects glass" {...fadeInUp}>
          <h2>Featured Projects</h2>
          <p className="section-copy">
            Tap through projects to inspect each system. The selected card updates the detail view in real time.
          </p>

          <div className="project-layout">
            <div className="project-list">
              {projects.map((project) => (
                <button
                  className={`project-item ${activeProject === project.name ? 'active' : ''}`}
                  key={project.name}
                  onClick={() => setActiveProject(project.name)}
                  type="button"
                >
                  <h3>{project.name}</h3>
                  <span>{project.stack}</span>
                </button>
              ))}
            </div>

            <motion.div
              className="project-detail"
              key={activeProjectData.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <h3>{activeProjectData.name}</h3>
              <p>{activeProjectData.summary}</p>
              <div className="chip-row">
                {activeProjectData.stack.split(' · ').map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="skills" className="grid-2" {...fadeInUp}>
          <article className="panel glass">
            <h2>Technical Skills</h2>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div key={group.title} className="skill-group">
                  <h3>{group.title}</h3>
                  <div className="chip-row">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel glass">
            <h2>Participation & Achievements</h2>
            <ul className="achievement-list">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </motion.section>

        <motion.section id="contact" className="panel glass contact" {...fadeInUp}>
          <h2>Let&apos;s Build Something Meaningful</h2>
          <p>
            Reach out for internships, research collaborations, product builds, and cross-disciplinary innovation.
          </p>
          <div className="contact-links">
            <a href="mailto:rishithsuresh10@gmail.com">rishithsuresh10@gmail.com</a>
            <a href="https://github.com/RishithSuresh" rel="noreferrer" target="_blank">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com" rel="noreferrer" target="_blank">
              LinkedIn ↗
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
