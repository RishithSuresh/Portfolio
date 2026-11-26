import { ArrowUpRight, Download } from 'lucide-react'
import { motion } from 'motion/react'
import { profile } from '../data/site'
import AIArtwork from '../components/AIArtwork'
import BentoIntro from '../components/BentoIntro'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Experience from '../components/Experience'
import GitHubRepos from '../components/GitHubRepos'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main id="top">
      <section className="hero page-shell">
        <div>
          <motion.span
            className="hero-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Computer Science · AI &amp; Systems
          </motion.span>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Curious by nature.
            <em>Building by passion.</em>
          </motion.h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            I&apos;m <strong>{profile.name}</strong> — a final-year Computer Science Engineer
            exploring multimodal AI, systems automation, and clean software.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
          >
            <a className="button button-primary" href="#work">
              Explore work <ArrowUpRight size={16} />
            </a>
            <a className="button button-quiet" href={profile.cv} download>
              <Download size={16} /> Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-stage"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-halo" aria-hidden="true" />
          <AIArtwork />
        </motion.div>
      </section>

      <BentoIntro />
      <Projects />
      <Research />
      <Experience />
      <GitHubRepos />
      <Contact />
      <Footer />
    </main>
  )
}
