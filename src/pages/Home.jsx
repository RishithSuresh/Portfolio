import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { motion } from 'motion/react'
import { profile } from '../data/site'
import HeroBackground from '../components/HeroBackground'
import StickmenName from '../components/StickmenName'
import SectionStickman from '../components/SectionStickman'
import Magnetic from '../components/Magnetic'
import BentoIntro from '../components/BentoIntro'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main id="top">
      <section className="hero-centerpiece">
        <HeroBackground />

        <div className="hero-foreground">
          <motion.span
            className="hero-kicker hero-kicker-framed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            LRDE · DRDO Intern · B.E. CSE &apos;27
          </motion.span>

          <motion.div
            className="hero-name-wrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <StickmenName />
          </motion.div>

          <motion.span
            className="hero-subkicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            BMSIT&amp;M · BENGALURU · AR/VR CHAIR
          </motion.span>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            Computer Science engineer at <strong>BMSIT&amp;M</strong> &amp; technical intern at{' '}
            <strong>LRDE · DRDO</strong> — building multimodal AI, ICRET &apos;26 research, and
            expressive software.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Magnetic>
              <a className="button button-primary" href="#work">
                Explore work <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a className="button button-quiet" href={profile.cv} download>
                <Download size={16} /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          <div className="hero-scroll-wrap">
            <a href="#about" className="hero-scroll-cue" aria-label="Scroll to About">
              <ArrowDown size={14} /> Scroll to explore
            </a>
            <SectionStickman variant="guide" className="stickman-scroll-guide" width={28} height={34} />
          </div>
        </div>
      </section>

      <BentoIntro />
      <Projects />
      <Research />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
