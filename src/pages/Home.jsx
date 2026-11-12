import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { motion } from 'motion/react'
import { profile } from '../data/site'
import AIArtwork from '../components/AIArtwork'
import BentoIntro from '../components/BentoIntro'
import Projects from '../components/Projects'
import Research from '../components/Research'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import TerminalSection from '../components/Terminal'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
export default function Home() {
  return <main id="top">
    <section className="hero page-shell">
      <div className="hero-copy"><motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>COMPUTER SCIENCE · TECHNOLOGY · RESEARCH</motion.span><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15 }}>Curious by nature.<br/><em>Building by passion.</em></motion.h1><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>I'm <strong>{profile.name}</strong> — a Computer Science Engineer exploring the intersection of technology, research and innovation.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}><a className="button button-dark" href="#work">Explore my work <ArrowUpRight size={16}/></a><a className="button button-quiet" href={profile.cv} download><Download size={16}/> Download CV</a></motion.div><div className="hero-foot"><span><i className="status-dot"/> OPEN TO INTERESTING OPPORTUNITIES</span><span>SCROLL TO EXPLORE <ArrowDown size={13}/></span></div></div>
      <div className="hero-art"><AIArtwork/><span className="art-caption">FIG 01. / IDEAS IN MOTION</span></div>
    </section>
    <div className="marquee" aria-hidden="true"><div>LEARN <i>✳</i> EXPERIMENT <i>✳</i> BUILD <i>✳</i> ITERATE <i>✳</i> LEARN <i>✳</i> EXPERIMENT <i>✳</i> BUILD <i>✳</i> ITERATE <i>✳</i></div></div>
    <BentoIntro/><Projects/><Research/><Experience/><Certifications/><TerminalSection/><Contact/><Footer/>
  </main>
}