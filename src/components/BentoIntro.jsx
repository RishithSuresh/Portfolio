import { ArrowUpRight, BrainCircuit, Code2, Cpu, Glasses } from 'lucide-react'
import { profile } from '../data/site'
import Reveal from './Reveal'
import SectionStickman from './SectionStickman'
import PortraitShowcase from './PortraitShowcase'

const pillars = [
  {
    icon: BrainCircuit,
    title: 'Multimodal AI & Vision',
    text: 'Researching audio-visual deepfake detection (FF++, DF40) and Deep Kernel Learning presented at ICRET ’26.'
  },
  {
    icon: Cpu,
    title: 'Defense & Systems R&D',
    text: 'Interning at LRDE · DRDO, collaborating with Unisys India on Windows auto-remediation, and building DietingDisk.'
  },
  {
    icon: Code2,
    title: 'Full-Stack & 3D Web',
    text: 'Shipping live software with FastAPI + Flutter (MusicLens), Express + Neon Postgres (StudyFlow), and Three.js (Neruvo).'
  },
  {
    icon: Glasses,
    title: 'AR/VR & Campus Craft',
    text: 'Chairing AR VR HUB BMSIT, mentoring VR game tooling workshops, competing in hackathons, and volunteering for CySecK CTFs.'
  }
]

const facts = [
  'LRDE · DRDO Intern',
  'ICRET ’26 Presenter',
  'Unisys & IDRA Alumni',
  'AR VR HUB Chair'
]

export default function BentoIntro() {
  return (
    <section className="section" id="about">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">01 / About Me</span>
          <h2>
            Curious engineer.
            <br />
            <em>Builder across domains.</em>
          </h2>
        </div>
        <p>{profile.intro}</p>
      </Reveal>

      <div className="about-spotlight">
        <Reveal className="about-lead-card">
          <SectionStickman variant="laptop" className="stickman-about-ledge" width={48} height={48} />
          <div>
            <span className="eyebrow">From Research to Shipping</span>
            <h3>
              Where theory meets
              <br />
              tangible software.
            </h3>
            <p>
              Currently pursuing B.E. in Computer Science &amp; Engineering at BMSIT&amp;M (2023–2027)
              in Bengaluru alongside a technical internship at LRDE · DRDO. Whether training multimodal
              detectors, benchmarking CUDA &amp; transformer pipelines, or mentoring peers in AR/VR, I
              love bridging algorithmic depth with clean interfaces.
            </p>

            <div className="about-fact-row">
              {facts.map(f => (
                <span key={f} className="about-fact-pill">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="about-lead-links">
            <a href="#experience" className="text-link">
              Journey &amp; experience <ArrowUpRight size={16} />
            </a>
            <a href="#certifications" className="text-link">
              14 verified credentials <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="about-portrait-col">
          <PortraitShowcase />
        </Reveal>
      </div>

      <div className="pillar-grid-4">
        {pillars.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.06}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="pillar-card"
          >
            {i === 1 && (
              <SectionStickman variant="curious" className="stickman-pillar-corner" width={42} height={42} />
            )}
            {i === 3 && (
              <SectionStickman variant="yoyo" className="stickman-pillar-yoyo" width={38} height={52} />
            )}
            <p.icon size={22} />
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
