import { ArrowUpRight, BrainCircuit, FlaskConical, Code2, Compass } from 'lucide-react'
import { profile } from '../data/site'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

const cards = [
  {
    icon: BrainCircuit,
    title: 'AI & machine learning',
    text: 'Exploring intelligent systems, computer vision and deep learning.',
    tone: 'tone-accent'
  },
  {
    icon: FlaskConical,
    title: 'Research & exploration',
    text: 'Testing ideas, learning from experiments and asking better questions.',
    tone: 'tone-cyan'
  },
  {
    icon: Code2,
    title: 'Software development',
    text: 'Turning concepts into practical applications and useful tools.',
    tone: 'tone-coral'
  },
  {
    icon: Compass,
    title: 'Curiosity across domains',
    text: 'Following interesting problems wherever technology leads.',
    tone: 'tone-accent'
  }
]

export default function BentoIntro() {
  return (
    <section className="section" id="about">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">01 / A LITTLE ABOUT ME</span>
          <h2>
            Many interests.
            <br />
            <em>One curious mind.</em>
          </h2>
        </div>
        <p>
          {profile.intro} I enjoy moving between research questions, software projects and the
          details that make a product useful.
        </p>
      </Reveal>

      <div className="intro-grid">
        <Reveal className="intro-note">
          <div>
            <span className="eyebrow">THE SHORT VERSION</span>
            <h3>
              Always learning.
              <br />
              Always building.
            </h3>
            <p>
              I like understanding how things work, experimenting with new approaches and turning
              what I learn into something tangible. My current interests include multimodal AI,
              computer vision, automation and thoughtful developer tools.
            </p>
            <a href="#experience" className="text-link">
              A little more about my journey <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="identity-chip">
            <div className="monogram-badge">
              <div className="monogram-avatar">
                {profile.photo ? (
                  <img src={profile.photo} alt={`${profile.name} portrait`} />
                ) : (
                  'RS'
                )}
              </div>
              <div className="monogram-meta">
                <strong>{profile.name}</strong>
                <span>BMSIT &apos;27 · LRDE · DRDO</span>
              </div>
            </div>
            <div className="note-stamp">RS / 2026</div>
          </div>
        </Reveal>

        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <SpotlightCard className={`interest-card ${c.tone}`}>
              <div className="interest-icon">
                <c.icon size={20} />
              </div>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
              <span className="card-index">0{i + 1}</span>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
