"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const projectPlaceholders = Array.from({ length: 6 }, (_, id) => id);
const skillPlaceholders = Array.from({ length: 9 }, (_, id) => id);
const certificatePlaceholders = Array.from({ length: 3 }, (_, id) => id);

export default function Home() {
  const reduceMotion = useReducedMotion();
  const leaves = useMemo(
    () =>
      Array.from({ length: 30 }, (_, id) => ({
        id,
        top: `${(id * 11.5) % 100}%`,
        left: `${(id * 17.2) % 100}%`,
        delay: id * 0.22,
        duration: 8 + (id % 5) * 1.8,
      })),
    [],
  );

  return (
    <div className="portfolio-root">
      <div className="portfolio-overlay" />
      <div className="portfolio-glow" />
      <div className="portfolio-lines" />

      <div className="portfolio-leaves" aria-hidden>
        {leaves.map((leaf) => (
          <motion.span
            key={leaf.id}
            className="leaf-dot"
            style={{ top: leaf.top, left: leaf.left }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 18, -10, 24],
                    y: [0, 10, -7, 5],
                    rotate: [0, 22, -14, 17],
                    opacity: [0.18, 0.88, 0.85, 0.15],
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

      <main className="portfolio-content">
        <p className="logo-mark" aria-hidden>
          ✻
        </p>

        <section className="name-shell">
          <h1>RISHITH SURESH</h1>
        </section>

        <section className="intro-shell">
          <article className="ref-card resume-card">Resume</article>
          <div className="quick-cards">
            <article className="ref-card quick-card" />
            <article className="ref-card quick-card" />
            <article className="ref-card quick-card" />
          </div>
        </section>

        <section className="portfolio-section">
          <h2 className="portfolio-title">PROJECTS</h2>
          <div className="project-grid">
            {projectPlaceholders.map((project) => (
              <article key={project} className="ref-card project-card" />
            ))}
          </div>
        </section>

        <section className="portfolio-section">
          <h2 className="portfolio-title">TECHNICAL SKILLS</h2>
          <div className="skills-row">
            {skillPlaceholders.map((skill) => (
              <span key={skill} className="skill-orb" />
            ))}
          </div>
        </section>

        <section className="portfolio-section">
          <h2 className="portfolio-title">EXPERIENCE</h2>
          <div className="experience-shell">
            <article className="ref-card experience-card" />
            <article className="ref-card experience-card" />
          </div>
        </section>

        <section className="portfolio-section">
          <h2 className="portfolio-title">CERTIFICATIONS &amp; PUBLICATIONS</h2>
          <div className="cert-grid">
            {certificatePlaceholders.map((certificate) => (
              <article key={certificate} className="ref-card certificate-card" />
            ))}
          </div>
        </section>

        <section className="portfolio-section">
          <h2 className="portfolio-title">CONTACT ME</h2>
          <div className="contact-grid">
            <article className="ref-card contact-card" />
            <article className="ref-card contact-card" />
          </div>
        </section>
      </main>
    </div>
  );
}
