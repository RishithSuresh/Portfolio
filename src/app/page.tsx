"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const projects = [
  "Interactive Portfolio Experience",
  "AI Research Assistant",
  "Real-Time Data Dashboard",
  "Mobile-First Product Landing",
  "Cloud Deployment Automation",
  "Design System Starter",
];

const technicalSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "SQL",
  "AWS",
  "Git",
];

const experiences = [
  {
    role: "Software Engineer",
    company: "Product & Platform Team",
    period: "Recent Experience",
  },
  {
    role: "Frontend Developer",
    company: "Web Experience Projects",
    period: "Previous Role",
  },
];

const certificates = [
  "Cloud Fundamentals",
  "Modern Web Development",
  "AI & Data Foundations",
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const leaves = useMemo(
    () =>
      Array.from({ length: 22 }, (_, id) => ({
        id,
        top: `${(id * 13.7) % 100}%`,
        left: `${(id * 19.4) % 100}%`,
        delay: id * 0.4,
        duration: 10 + (id % 6) * 2.2,
      })),
    [],
  );

  return (
    <div className="portfolio-root">
      <div className="forest-overlay" />
      <div className="fog-glow" />
      <div className="wind-lines" />

      <div className="leaves-layer" aria-hidden>
        {leaves.map((leaf) => (
          <motion.span
            key={leaf.id}
            className="leaf-particle"
            style={{ top: leaf.top, left: leaf.left }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 40, -18, 30],
                    y: [0, 18, -12, 8],
                    rotate: [0, 24, -20, 16],
                    opacity: [0.2, 0.95, 0.9, 0.2],
                  }
            }
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <main className="content">
        <section className="hero-section">
          <p className="tag">PORTFOLIO</p>
          <h1>RISHITH SURESH</h1>
          <p className="hero-copy">Software developer building modern, animated, and user-focused digital experiences.</p>

          <div className="hero-grid">
            <article className="glass-card intro-card">
              <h2>Profile</h2>
              <p>I design and develop clean web products with strong engineering basics and polished interfaces.</p>
            </article>
            <div className="compact-stack">
              <article className="glass-card mini-card">Location: India</article>
              <article className="glass-card mini-card">Open to collaboration</article>
              <article className="glass-card mini-card">Focus: Full-Stack + UI</article>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">PROJECTS</h2>
          <div className="grid-2">
            {projects.map((project) => (
              <article key={project} className="glass-card project-card">
                {project}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">TECHNICAL SKILLS</h2>
          <div className="skills-wrap">
            {technicalSkills.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">EXPERIENCE</h2>
          <div className="experience-list">
            {experiences.map((item) => (
              <article key={item.role} className="glass-card experience-card">
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <span>{item.period}</span>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">CERTIFICATIONS &amp; PUBLICATIONS</h2>
          <div className="grid-3">
            {certificates.map((entry) => (
              <article key={entry} className="glass-card cert-card">
                {entry}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">CONTACT ME</h2>
          <div className="contact-grid">
            <a className="glass-card contact-card" href="mailto:rishith@example.com">
              Email
            </a>
            <a className="glass-card contact-card" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
