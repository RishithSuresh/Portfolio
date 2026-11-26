import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, AudioWaveform, ExternalLink, FileText, ScanFace, Network } from 'lucide-react'
import { researchPapers } from '../data/site'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

const nodeDetails = {
  visual: {
    label: '01 / VISUAL STREAM',
    detail: 'Frame sampling & facial-region spatial-temporal artifact encoding'
  },
  audio: {
    label: '02 / AUDIO STREAM',
    detail: 'Spectral acoustic extraction & vocal synthesis anomaly cues'
  },
  fusion: {
    label: '03 / CROSS-MODAL FUSION',
    detail: 'Joint representation evaluated across FaceForensics++, DF40, Celeb-DF & SDFDC'
  }
}

export default function Research() {
  const [selectedNode, setSelectedNode] = useState('fusion')
  const current = nodeDetails[selectedNode]

  return (
    <section className="section research-section" id="research">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">03 / THE LAB</span>
          <h2>
            Questions worth
            <br />
            <em>investigating.</em>
          </h2>
        </div>
        <p>
          A space for deeper technical explorations — methods, experiments, results and lessons
          learned along the way.
        </p>
      </Reveal>

      <div className="research-panel">
        <div className="research-copy">
          <span className="eyebrow">CURRENT FOCUS / 001</span>
          <h3>
            Multimodal
            <br />
            deepfake detection
          </h3>
          <p>
            Exploring how audio and visual evidence can work together to identify manipulated media,
            with a focus on robust evaluation and cross-dataset generalization.
          </p>
          <div className="dataset-chips" aria-label="Evaluated datasets">
            <span>FaceForensics++</span>
            <span>DF40</span>
            <span>Celeb-DF</span>
            <span>SDFDC</span>
          </div>
          <Link className="text-link" to="/projects/multimodal-deepfake-detection" style={{ marginTop: 22 }}>
            Explore the case study <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="research-visual">
          <div className="oscilloscope-box" aria-hidden="true">
            <span className="osc-label">SIGNAL PHASE // {current.label}</span>
            <svg className="oscilloscope-svg" viewBox="0 0 460 120" preserveAspectRatio="none">
              <path
                className="wave-a"
                d="M0 60 Q 30 22, 60 60 T 120 60 T 180 60 T 240 60 T 300 60 T 360 60 T 420 60 T 460 60"
                style={{ opacity: selectedNode === 'audio' ? 0.3 : 0.95 }}
              />
              <path
                className="wave-b"
                d="M0 60 Q 22 98, 45 60 T 90 60 T 135 60 T 180 60 T 225 60 T 270 60 T 315 60 T 360 60 T 405 60 T 460 60"
                style={{ opacity: selectedNode === 'visual' ? 0.3 : 0.95 }}
              />
            </svg>
          </div>

          <div className="pipeline-nodes">
            <button
              type="button"
              className={`signal ${selectedNode === 'visual' ? 'is-selected' : ''}`}
              onClick={() => setSelectedNode('visual')}
            >
              <ScanFace size={22} color="var(--ice)" />
              <span>VISUAL STREAM</span>
            </button>

            <button
              type="button"
              className={`signal ${selectedNode === 'audio' ? 'is-selected' : ''}`}
              onClick={() => setSelectedNode('audio')}
            >
              <AudioWaveform size={22} color="var(--accent)" />
              <span>AUDIO STREAM</span>
            </button>

            <button
              type="button"
              className={`signal ${selectedNode === 'fusion' ? 'is-selected' : ''}`}
              onClick={() => setSelectedNode('fusion')}
            >
              <Network size={22} color="var(--saffron)" />
              <span>FUSION CORE</span>
            </button>
          </div>

          <div className="pipeline-readout" aria-live="polite">
            <strong>{current.label}</strong>
            <span>{current.detail}</span>
          </div>
        </div>
      </div>

      <div className="papers-heading">
        <span className="eyebrow">RESEARCH PAPERS / ARCHIVE</span>
        <p>Published papers, preprints, posters and technical reports.</p>
      </div>

      <div className="papers-grid">
        {researchPapers.map(paper => {
          const isDraft = paper.status === 'ADD PAPER'
          return (
            <SpotlightCard
              as="article"
              className={`paper-card ${isDraft ? 'is-draft' : ''}`}
              key={paper.title}
            >
              <div>
                <div className="paper-icon">
                  <FileText size={18} />
                  <span className="paper-badge">{paper.status}</span>
                </div>
                <h3>{paper.title}</h3>
                <span className="paper-venue">{paper.venue}</span>
                <p>{paper.summary}</p>
              </div>
              {paper.url ? (
                <a href={paper.url} target="_blank" rel="noreferrer">
                  Read paper <ExternalLink size={14} />
                </a>
              ) : (
                <span className="paper-placeholder">
                  {isDraft ? 'Open research slot' : 'Manuscript in preparation'} <ArrowUpRight size={14} />
                </span>
              )}
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
