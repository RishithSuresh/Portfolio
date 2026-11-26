import { useRef } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { profile } from '../data/site'
import AIArtwork from '../components/AIArtwork'
import Magnetic from '../components/Magnetic'
import BentoIntro from '../components/BentoIntro'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Experience from '../components/Experience'
import GitHubRepos from '../components/GitHubRepos'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -56])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 42])

  return (
    <main id="top">
      <section className="hero page-shell" ref={heroRef}>
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          <motion.span
            className="hero-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Computer Science · AI &amp; Systems
          </motion.span>

          <h1 className="hero-title">
            <span className="mask-line">
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                Curious by nature.
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.em
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.78, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                Building by passion.
              </motion.em>
            </span>
          </h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            I&apos;m <strong>{profile.name}</strong> — a final-year Computer Science Engineer
            exploring multimodal AI, systems automation, and expressive software.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
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
        </motion.div>

        <motion.div
          className="hero-stage"
          style={{ scale: stageScale, y: stageY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
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
