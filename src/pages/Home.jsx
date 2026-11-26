import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Download, Layers, Pause, Play } from 'lucide-react'
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

  return (
    <main id="top">
      <section className="hero-chamber">
        <div className="hero-top-row">
          <div className="hero-kicker">
            <span className="eyebrow">00 / SPECIMEN CHAMBER · CSE &apos;27</span>
            <motion.h1
              className="hero-display-top"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              Curious by nature.
            </motion.h1>
          </div>

          <motion.div
            className="hero-bio-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
          >
            <p>
              <strong>{profile.name}</strong> — Computer Science Engineer researching multimodal AI,
              computer vision, and resilient software systems in Bengaluru.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="hero-stage"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <svg className="reticle-svg" viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <circle cx="500" cy="230" r="190" className="reticle-ring" />
            <circle cx="500" cy="230" r="156" className="reticle-ring-dashed" />
            <line x1="60" y1="230" x2="290" y2="230" className="reticle-ring" />
            <line x1="710" y1="230" x2="940" y2="230" className="reticle-ring" />
            <line x1="500" y1="20" x2="500" y2="62" className="reticle-ring" />
            <line x1="500" y1="398" x2="500" y2="440" className="reticle-ring" />
          </svg>

          <span className="stage-corner tl">FIG 01. // COMBINATORIAL ENGINE</span>
          <span className="stage-corner tr">4.3×10¹⁹ STATES · DRAG TO ORBIT</span>
          <span className="stage-corner bl">12.9716° N / 77.5946° E</span>

          <AIArtwork paused={paused} exploded={exploded} />

          <div className="stage-controls">
            <button
              type="button"
              className={`art-btn ${exploded ? 'is-active' : ''}`}
              onClick={() => setExploded(e => !e)}
            >
              <Layers size={12} />
              {exploded ? 'ASSEMBLE' : 'EXPLODE VIEW'}
            </button>
            <button
              type="button"
              className={`art-btn ${paused ? 'is-active' : ''}`}
              onClick={() => setPaused(p => !p)}
            >
              {paused ? <Play size={12} /> : <Pause size={12} />}
              {paused ? 'RESUME' : 'PAUSE'}
            </button>
          </div>
        </motion.div>

        <div className="hero-bottom-row">
          <motion.h2
            className="hero-display-bottom"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            Building by passion.
          </motion.h2>

          <div className="hero-cta-cluster">
            <span className="status-pill">
              <i className="status-dot" /> OPEN TO RESEARCH &amp; ENGINEERING ROLES
            </span>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Enter Archive <ArrowUpRight size={15} />
              </a>
              <a className="button button-quiet" href={profile.cv} download>
                <Download size={15} /> CV
              </a>
              <a className="button button-quiet" href="#about">
                Scroll <ArrowDown size={15} />
              </a>
            </div>
          </div>
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
        <RevealHeader />
        <div className="command-diptych">
          <TerminalSection embedded />
          <Contact embedded />
        </div>
      </section>

      <Footer />
    </main>
  )
}

function RevealHeader() {
  return (
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
  )
}
