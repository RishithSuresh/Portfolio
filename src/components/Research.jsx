import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, AudioWaveform, ExternalLink, FileText, ScanFace, Network } from 'lucide-react'
import { researchPapers } from '../data/site'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

const nodeDetails = {
  visual: {
    label: 'VISUAL STREAM',
    detail: 'Frame sampling & facial-region spatial-temporal artifact encoding'
  },
  audio: {
    label: 'AUDIO STREAM',
    detail: 'Spectral acoustic extraction & vocal synthesis anomaly cues'
  },
  fusion: {
    label: 'CROSS-MODAL FUSION',
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
          <span className="eyebrow">03 / THE RESEARCH LAB</span>
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
          <Link className="text-link" to="/projects/multimodal-deepfake-detection">
            Explore the case study <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="research-visual">
          <svg className="pipeline-svg" viewBox="0 0 500 380" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M 140 120 C 140 210, 210 210, 250 250"
              className={`pipeline-path ${selectedNode === 'visual' || selectedNode === 'fusion' ? 'is-active' : ''}`}
            />
            <path
              d="M 360 120 C 360 210, 290 210, 250 250"
              className={`pipeline-path ${selectedNode === 'audio' || selectedNode === 'fusion' ? 'is-active' : ''}`}
            />
          </svg>

          <div className="pipeline-nodes">
            <button
              type="button"
              className={`signal signal-a ${selectedNode === 'visual' ? 'is-selected' : ''}`}
              onClick={() => setSelectedNode('visual')}
              onMouseEnter={() => setSelectedNode('visual')}
            >
              <ScanFace size={24} color="var(--cyan)" />
              <span>VISUAL SIGNAL</span>
            </button>

            <button
              type="button"
              className={`signal signal-b ${selectedNode === 'audio' ? 'is-selected' : ''}`}
              onClick={() => setSelectedNode('audio')}
              onMouseEnter={() => setSelectedNode('audio')}
            >
              <AudioWaveform size={24} color="var(--coral)" />
              <div className="waveform-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <span>AUDIO SIGNAL</span>
            </button>

            <button
              type="button"
              className={`fusion-node ${selectedNode === 'fusion' ? 'is-selected' : ''}`}
              onClick={() => setSelectedNode('fusion')}
              onMouseEnter={() => setSelectedNode('fusion')}
            >
              <Network size={26} />
              <b>FUSION CORE</b>
              <small>ROC-AUC · F1</small>
            </button>
          </div>

          <div className="pipeline-readout" aria-live="polite">
            <strong>{current.label}</strong>
            <span>{current.detail}</span>
          </div>
        </div>
      </div>

      <div className="research-foot">
        <span>METHOD · EXPERIMENT · EVALUATE · ITERATE</span>
        <span>Research is a process, not just a result.</span>
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
                  <span className="status-pill">{paper.status}</span>
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
