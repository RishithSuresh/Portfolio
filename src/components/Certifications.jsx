import { Award, ExternalLink } from 'lucide-react'
import { certifications } from '../data/site'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

export default function Certifications() {
  return (
    <section className="section certifications-section" id="certifications">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">06 / CERTIFICATIONS</span>
          <h2>
            Proof of
            <br />
            <em>continuous learning.</em>
          </h2>
        </div>
        <p>A place to collect verified certifications, courses and credentials as the journey grows.</p>
      </Reveal>

      <div className="certification-grid">
        {certifications.map((cert, idx) => {
          const isDraft = cert.title === 'Add certification title'
          return (
            <SpotlightCard
              as="article"
              className={`certification-card ${isDraft ? 'is-draft' : ''}`}
              key={`${cert.title}-${idx}`}
            >
              <div>
                <div className="certification-top">
                  <Award size={20} />
                  <span>{cert.date}</span>
                </div>
                <h3>{cert.title}</h3>
                <span className="certification-issuer">{cert.issuer}</span>
                <p>{cert.detail}</p>
              </div>
              {cert.credential ? (
                <a href={cert.credential} target="_blank" rel="noreferrer">
                  View credential <ExternalLink size={13} />
                </a>
              ) : (
                <span className="certification-placeholder">
                  {isDraft ? 'Upcoming credential slot' : 'Verified credential'}
                </span>
              )}
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
