"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

const eras = [
  { id: "era-1890", year: "1890", title: "Field Notes", subtitle: "Origin of the archive and botanical studies" },
  { id: "era-2026", year: "2026", title: "Active Expeditions", subtitle: "Projects, systems, interfaces, and live explorations" },
  { id: "era-2147", year: "2147", title: "Future Inventions", subtitle: "Speculative prototypes and machine dreams" },
  { id: "era-unknown", year: "Unknown", title: "Anomalies", subtitle: "Fragments, memory glitches, and hidden records" },
  { id: "era-lost", year: "Lost Era", title: "Final Transmission", subtitle: "The journey continues beyond known timelines" },
] as const;

const projectEntries = [
  "Expedition Report: Adaptive AI Knowledge Cartography",
  "Classified Blueprint: Neural Timeline Search Engine",
  "Pinned Photograph: Forest Observatory Interface",
  "Mechanism Diagram: Temporal Event Simulator",
];

const skillGlyphs = ["Systems Craft", "Animation Alchemy", "Frontend Engineering", "Narrative Design", "Creative Coding", "Visual Storytelling"];

const weatherByDepth = ["Lantern Mist", "Wind Through Pines", "Warm Afternoon Dust", "Soft Rain on Glass", "Twilight Archive Glow"];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [weatherLabel, setWeatherLabel] = useState(weatherByDepth[0]);
  const [dialValue, setDialValue] = useState(0);
  const [secretHits, setSecretHits] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(".lantern-flicker", {
        opacity: 0.68,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".timeline-branch", {
        backgroundPositionY: 140,
        duration: 13,
        repeat: -1,
        ease: "none",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const glitchTimer = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 900);
    }, 12000);

    return () => clearInterval(glitchTimer);
  }, [shouldReduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const bucket = Math.min(weatherByDepth.length - 1, Math.floor(latest * weatherByDepth.length));
    setWeatherLabel(weatherByDepth[bucket]);
  });

  const navigateTo = useCallback((index: number) => {
    const target = sectionRefs.current[eras[index].id];
    if (!target) return;

    setDialValue(index);
    setActiveIndex(index);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const entries = eras
        .map((era, i) => {
          const el = sectionRefs.current[era.id];
          if (!el) return { i, score: Number.POSITIVE_INFINITY };
          const rect = el.getBoundingClientRect();
          return { i, score: Math.abs(rect.top - window.innerHeight * 0.22) };
        })
        .sort((a, b) => a.score - b.score);

      const next = entries[0]?.i ?? 0;
      setActiveIndex(next);
      setDialValue(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leaves = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        delay: i * 1.2,
        duration: 22 + (i % 5) * 4,
        left: `${(i * 7.3) % 100}%`,
        scale: 0.4 + (i % 4) * 0.2,
      })),
    [],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: `${(i * 11.4) % 100}%`,
        left: `${(i * 17.8) % 100}%`,
        delay: i * 0.4,
      })),
    [],
  );

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden chrono-root selection:bg-[var(--muted-gold)]/35 selection:text-[var(--aged-paper)]">
      <div className="atmosphere-layer pointer-events-none" />
      <div className="fog-layer pointer-events-none" />
      <div className="paper-noise pointer-events-none" />

      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="dust"
            style={{ top: p.top, left: p.left }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -20, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.7, 1.1, 0.7],
                  }
            }
            transition={{ duration: 8 + (p.id % 5), delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {leaves.map((leaf) => (
          <motion.span
            key={leaf.id}
            className="leaf"
            style={{ left: leaf.left, scale: leaf.scale }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: ["-10%", "120%"],
                    x: [0, 18, -12, 15],
                    rotate: [0, 30, -25, 18],
                    opacity: [0, 0.9, 0.9, 0],
                  }
            }
            transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <aside className="timeline-nav">
        <div className="timeline-head">
          <span className="label">Timeline Navigation System</span>
          <span className="weather">{weatherLabel}</span>
        </div>

        <div className="timeline-branch">
          {eras.map((era, index) => (
            <button
              key={era.id}
              onClick={() => navigateTo(index)}
              className={`marker ${activeIndex === index ? "active" : ""}`}
              aria-label={`Jump to ${era.year}`}
            >
              <span>{era.year}</span>
            </button>
          ))}
        </div>

        <div className="dial-wrap">
          <label className="label" htmlFor="time-dial">
            Interactive Time Dial
          </label>
          <input
            id="time-dial"
            type="range"
            min={0}
            max={eras.length - 1}
            step={1}
            value={dialValue}
            onChange={(e) => {
              const next = Number(e.target.value);
              setDialValue(next);
              navigateTo(next);
            }}
          />
        </div>
      </aside>

      <main className="relative z-20 px-4 py-8 md:px-10">
        <section className="hero notebook-page" ref={(el) => { sectionRefs.current[eras[0].id] = el; }} id={eras[0].id}>
          <div className="opening-shadow" />
          <p className="archive-tag">Recovered from Timeline 7 • Property of The Chrono Archive</p>
          <h1 className="title">Rishith Suresh</h1>
          <p className="subtitle">Explorer of Ideas, Systems & Timelines</p>
          <p className="intro-note">
            In this forgotten observatory ledger, each page reveals experiments, inventions, sketches, and memories collected across shifting eras.
          </p>

          <div className="lantern-flicker lantern" />
          <div className="ink-sketch" />
          <button className="secret-rune" onClick={() => setSecretHits((n) => n + 1)} aria-label="Reveal hidden symbol">
            ⌖
          </button>
        </section>

        <section className="notebook-page" ref={(el) => { sectionRefs.current[eras[1].id] = el; }} id={eras[1].id}>
          <h2>Explorer&rsquo;s Field Notes</h2>
          <p>
            I design expressive software systems where narrative and engineering meet. My work blends robust architecture with emotional interaction design.
          </p>
          <ul className="archive-list">
            <li>Pinned sketches, margin annotations, and layered documentation style storytelling.</li>
            <li>Animated page turns, ink spreads, and tactile paper movement driven by scroll depth.</li>
            <li>Research-first building philosophy with a focus on memorable human experiences.</li>
          </ul>
        </section>

        <section className="notebook-page" ref={(el) => { sectionRefs.current[eras[2].id] = el; }} id={eras[2].id}>
          <h2>Archived Discoveries</h2>
          <p>Projects are presented as expedition records and classified invention files.</p>
          <div className="blueprint-grid">
            {projectEntries.map((project) => (
              <motion.article
                key={project}
                className="archive-file"
                whileHover={shouldReduceMotion ? undefined : { rotate: -0.4, y: -5 }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
              >
                <span className="stamp">CLASSIFIED</span>
                <h3>{project}</h3>
                <p>Open file ▸ unfold notes ▸ inspect diagrams ▸ recover timeline context.</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="notebook-page" ref={(el) => { sectionRefs.current[eras[3].id] = el; }} id={eras[3].id}>
          <h2>Constellation Skills</h2>
          <div className="constellation">
            {skillGlyphs.map((skill, i) => (
              <motion.div
                key={skill}
                className="glyph"
                style={{ left: `${18 + (i % 3) * 30}%`, top: `${12 + Math.floor(i / 3) * 48}%` }}
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        boxShadow: ["0 0 0px rgba(203,167,95,.1)", "0 0 22px rgba(203,167,95,.35)", "0 0 0px rgba(203,167,95,.08)"],
                      }
                }
                transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
              >
                {skill}
              </motion.div>
            ))}
            <svg viewBox="0 0 100 100" className="constellation-lines" aria-hidden="true">
              <path d="M20 20 L50 25 L80 18 L78 62 L48 70 L22 65 Z" />
              <path d="M50 25 L48 70" />
            </svg>
          </div>
        </section>

        <section className="notebook-page final-page" ref={(el) => { sectionRefs.current[eras[4].id] = el; }} id={eras[4].id}>
          <h2>The journey continues…</h2>
          <p>
            If this archive reached you, send a signal. Let us build worlds where code, design, and story breathe together.
          </p>
          <p className="signature">— Rishith, Timekeeper of the Archive</p>
          <div className="sound-indicator" aria-label="ambient sound indicator">
            <span />
            <span />
            <span />
          </div>
        </section>
      </main>

      <AnimatePresence>
        {(secretHits > 2 || glitchActive) && (
          <motion.div
            className="memory-glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p>Fragment recovered: “The Lost Era is not lost. Look between seconds.”</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
