import { Link } from 'react-router-dom'
import { ArrowUpRight, AudioWaveform, ScanFace, Network } from 'lucide-react'
import Reveal from './Reveal'

export default function Research() {
  return (
    <section className="section" id="research">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">03 / Research</span>
          <h2>
            Questions worth
            <br />
            <em>investigating.</em>
          </h2>
        </div>
        <p>
          Deep-dive technical explorations — methodology, cross-dataset evaluation, and reproducible
          results.
        </p>
      </Reveal>

      <Reveal className="research-panel">
        <div className="research-copy">
          <span className="eyebrow">Current Focus</span>
          <h3>
            Multimodal
            <br />
            deepfake detection
          </h3>
          <p>
            Exploring how audio and visual evidence work together to identify synthetic and
            manipulated media across FaceForensics++, DF40, Celeb-DF, and SDFDC, with an emphasis
            on cross-dataset generalization.
          </p>
          <Link className="text-link" to="/projects/multimodal-deepfake-detection">
            Explore the case study <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="research-visual" aria-hidden="true">
          <div className="signal-pair">
            <div className="signal-box">
              <ScanFace size={24} />
              <span>Visual Signal</span>
            </div>
            <div className="signal-box">
              <AudioWaveform size={24} />
              <span>Audio Signal</span>
            </div>
          </div>
          <div className="fusion-pill">
            <Network size={20} />
            <span>Cross-Modal Fusion</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
