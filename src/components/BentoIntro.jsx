import { ArrowUpRight, BrainCircuit, FlaskConical, Code2, Compass } from 'lucide-react'
import { profile } from '../data/site'
import Reveal from './Reveal'
import SectionStickman from './SectionStickman'

const pillars = [
  {
    icon: BrainCircuit,
    title: 'AI & Machine Learning',
    text: 'Exploring intelligent systems, computer vision and deep learning.'
  },
  {
    icon: FlaskConical,
    title: 'Research & Inquiry',
    text: 'Testing ideas, running benchmarks and asking sharper questions.'
  },
  {
    icon: Code2,
    title: 'Software Engineering',
    text: 'Turning concepts into practical applications and reliable tools.'
  },
  {
    icon: Compass,
    title: 'Systems Curiosity',
    text: 'Following interesting problems across automation and full-stack craft.'
  }
]

export default function BentoIntro() {
  return (
    <section className="section" id="about">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">01 / About</span>
          <h2>
            Many interests.
            <br />
            <em>One curious mind.</em>
          </h2>
        </div>
        <p>{profile.intro}</p>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-lead-card">
          <SectionStickman variant="laptop" className="stickman-about-ledge" width={48} height={48} />
          <div>
            <span className="eyebrow">Perspective</span>
            <h3>
              Always learning.
              <br />
              Always building.
            </h3>
            <p>
              I like understanding how systems work from first principles, experimenting with new
              approaches, and turning research into tangible tools — from multimodal deepfake
              detection to Windows automation utilities.
            </p>
          </div>
          <a href="#experience" className="text-link">
            View experience &amp; stack <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <div className="pillar-grid">
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
      </div>
    </section>
  )
}
