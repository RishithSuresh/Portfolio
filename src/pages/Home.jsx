import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
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

function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date())
        setTime(`${formatted} IST`)
      } catch {
        setTime('IST')
      }
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="live-time">{time}</span>
}

const marqueeItems = ['LEARN', 'EXPERIMENT', 'BUILD', 'RESEARCH', 'ITERATE']

export default function Home() {
  return (
    <main id="top">
      <section className="hero page-shell">
        <div className="hero-copy">
          <motion.div
            className="hero-telemetry"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <span>BENGALURU, IN</span>
            <span className="sep">/</span>
            <LiveClock />
          </motion.div>

          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            COMPUTER SCIENCE · AI RESEARCH · SYSTEMS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Curious by nature.
            <br />
            <em>Building by passion.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            I'm <strong>{profile.name}</strong> — a Computer Science Engineer exploring the
            intersection of artificial intelligence, multimodal research and practical software.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
          >
            <a className="button button-dark" href="#work">
              Explore my work <ArrowUpRight size={16} />
            </a>
            <a className="button button-quiet" href={profile.cv} download>
              <Download size={16} /> Download CV
            </a>
          </motion.div>

          <div className="hero-foot">
            <span>
              <i className="status-dot" /> OPEN TO INTERESTING OPPORTUNITIES
            </span>
            <span>
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </span>
          </div>
        </div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AIArtwork />
        </motion.div>
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
      <TerminalSection />
      <Contact />
      <Footer />
    </main>
  )
}
