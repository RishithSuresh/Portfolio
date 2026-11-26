import { useState } from 'react'
import { ArrowUpRight, BrainCircuit, FlaskConical, Code2, Compass } from 'lucide-react'
import { profile } from '../data/site'
import Reveal from './Reveal'

const lenses = [
  {
    id: '01',
    icon: BrainCircuit,
    title: 'AI & Machine Learning',
    summary:
      'Investigating multimodal deep learning, computer vision, and audio-visual fusion for synthetic media forensics.',
    tags: ['Deep Learning', 'Computer Vision', 'Multimodal Fusion', 'ROC-AUC Evaluation']
  },
  {
    id: '02',
    icon: FlaskConical,
    title: 'Research & Inquiry',
    summary:
      'Forming testable hypotheses, running cross-dataset benchmarks, and documenting reproducible experimental pipelines.',
    tags: ['FaceForensics++', 'DF40', 'Celeb-DF', 'Cross-Dataset Generalisation']
  },
  {
    id: '03',
    icon: Code2,
    title: 'Systems & Automation',
    summary:
      'Engineering Windows diagnostic tools, storage auditors, and rule-based remediation workflows with safety-first guards.',
    tags: ['Python', 'PowerShell', 'SQLite', 'Storage Analytics']
  },
  {
    id: '04',
    icon: Compass,
    title: 'Full-Stack Craft',
    summary:
      'Translating ideas into tactile interfaces across React, Three.js WebGL, Flutter mobile apps, and REST APIs.',
    tags: ['React', 'Three.js', 'Flutter', 'Node.js']
  }
]

export default function BentoIntro() {
  const [activeLens, setActiveLens] = useState(0)
  const current = lenses[activeLens]
  const Icon = current.icon

  return (
    <section className="section" id="about">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">01 / THE DOSSIER</span>
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

      <Reveal className="dossier-spread">
        <div className="dossier-manifesto">
          <div>
            <span className="eyebrow">SPECIMEN MANIFESTO</span>
            <h3>
              Always learning.
              <br />
              Always building.
            </h3>
            <p>
              I like understanding how things work from first principles, experimenting with new
              approaches and turning what I learn into working artifacts — from cross-modal
              detection models to cautious systems utilities and interactive web spaces.
            </p>
            <a href="#experience" className="text-link" style={{ marginTop: 22 }}>
              Trace my academic &amp; lab journey <ArrowUpRight size={15} />
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
            <span className="eyebrow">RS // 2026</span>
          </div>
        </div>

        <div className="dossier-lens">
          <div className="lens-tabs" role="tablist" aria-label="Research and engineering domains">
            {lenses.map((lens, idx) => (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={activeLens === idx}
                className={`lens-tab ${activeLens === idx ? 'is-active' : ''}`}
                onClick={() => setActiveLens(idx)}
              >
                <span>FOCUS // {lens.id}</span>
                <strong>{lens.title}</strong>
              </button>
            ))}
          </div>

          <div className="lens-stage" role="tabpanel">
            <div>
              <div className="lens-stage-top">
                <div className="lens-icon-box">
                  <Icon size={22} />
                </div>
                <span className="eyebrow">ACTIVE LENS · {current.id}</span>
              </div>
              <h4>{current.title}</h4>
              <p>{current.summary}</p>
            </div>

            <div className="lens-tags">
              {current.tags.map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
