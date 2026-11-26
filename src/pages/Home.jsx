import { useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Download, Layers, Pause, Play, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { profile } from '../data/site'
import AIArtwork from '../components/AIArtwork'
import BentoIntro from '../components/BentoIntro'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Experience from '../components/Experience'
import GitHubRepos from '../components/GitHubRepos'
import Certifications from '../components/Certifications'
import TerminalSection from '../components/Terminal'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const marqueeItems = ['LEARN', 'EXPERIMENT', 'BUILD', 'RESEARCH', 'ITERATE']

export default function Home() {
  const [paused, setPaused] = useState(false)
  const [exploded, setExploded] = useState(false)
  const heroRef = useRef(null)

  const handleHeroPointer = e => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--hx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--hy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <main id="top">
      <section className="hero-immersive" ref={heroRef} onPointerMove={handleHeroPointer}>
        <div className="hero-aurora" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-editorial">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <i className="status-dot" />
              <span>AVAILABLE FOR RESEARCH &amp; ENGINEERING · BENGALURU</span>
            </motion.div>

            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Curious by nature.
              <span className="hero-headline-serif">Building by passion.</span>
            </motion.h1>

            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              I&apos;m <strong>{profile.name}</strong> — a final-year Computer Science Engineer
              researching multimodal deepfake detection, systems automation, and expressive
              software.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
            >
              <a className="button button-primary" href="#work">
                Explore Archive <ArrowUpRight size={16} />
              </a>
              <a className="button button-glass" href={profile.cv} download>
                <Download size={15} /> Download CV
              </a>
              <a className="button button-ghost" href="#about">
                Scroll <ArrowDown size={15} />
              </a>
            </motion.div>

            <motion.div
              className="hero-metrics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34 }}
            >
              <div className="metric-item">
                <span>CURRENT ROLE</span>
                <strong>Intern · LRDE, DRDO</strong>
              </div>
              <div className="metric-item">
                <span>RESEARCH FOCUS</span>
                <strong>Multimodal AI &amp; Vision</strong>
              </div>
              <div className="metric-item">
                <span>DEGREE</span>
                <strong>B.E. CSE · BMSIT &apos;27</strong>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-sculpture"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              className="sculpture-orbit-svg"
              viewBox="0 0 600 600"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="heroHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                  <stop offset="55%" stopColor="var(--ice)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="300" cy="300" r="260" fill="url(#heroHalo)" />
              <circle cx="300" cy="300" r="245" className="reticle-ring" />
              <circle cx="300" cy="300" r="210" className="reticle-ring-dashed" />
            </svg>

            <AIArtwork paused={paused} exploded={exploded} />

            <div className="sculpture-dock">
              <span className="dock-label">
                <Sparkles size={12} /> FIG 01 · DRAG TO ORBIT
              </span>
              <div className="dock-actions">
                <button
                  type="button"
                  className={`dock-btn ${exploded ? 'is-active' : ''}`}
                  onClick={() => setExploded(e => !e)}
                >
                  <Layers size={13} />
                  {exploded ? 'Assemble' : 'Explode Core'}
                </button>
                <button
                  type="button"
                  className={`dock-btn ${paused ? 'is-active' : ''}`}
                  onClick={() => setPaused(p => !p)}
                >
                  {paused ? <Play size={13} /> : <Pause size={13} />}
                  {paused ? 'Play' : 'Pause'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(group => (
            <div className="marquee-group" key={group}>
              {marqueeItems.map(word => (
                <span key={`${group}-${word}`}>
                  {word} <i>✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <BentoIntro />
      <Projects />
      <Research />
      <Experience />
      <GitHubRepos />
      <Certifications />

      <section className="section" id="terminal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">07 / COMMAND &amp; DISPATCH</span>
            <h2>
              Terminal &amp;
              <br />
              <em>direct dispatch.</em>
            </h2>
          </div>
          <p>
            Explore the portfolio via the interactive CLI on the left or send a direct note on the
            right.
          </p>
        </div>
        <div className="command-diptych">
          <TerminalSection embedded />
          <Contact embedded />
        </div>
      </section>

      <Footer />
    </main>
  )
}
